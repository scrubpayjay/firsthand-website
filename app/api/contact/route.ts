import { createHash, createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import {
  forwardPhotosToFieldShot,
  type JobberIdsFromWebhook,
} from "@/lib/fieldshot-lead-media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const JOBBER_WEBHOOK_URL = process.env.JOBBER_WEBHOOK_URL;
const WEBSITE_LEAD_WEBHOOK_SECRET = process.env.WEBSITE_LEAD_WEBHOOK_SECRET;

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

type Attachment = { filename: string; content: ArrayBuffer; type: string };

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const body = {
    name: form.get("name") ?? "",
    email: form.get("email") ?? "",
    phone: form.get("phone") ?? "",
    address: form.get("address") ?? "",
    city: form.get("city") ?? "",
    state: form.get("state") ?? "",
    zip: form.get("zip") ?? "",
    placeId: form.get("placeId") ?? "",
    services: form.getAll("services").filter((v): v is string => typeof v === "string"),
    message: form.get("message") ?? "",
    // FormData carries the checkbox as the literal string "true"/"false".
    // Coerce here so the zod boolean field parses cleanly.
    smsConsent: form.get("smsConsent") === "true",
    website: form.get("website") ?? "",
  };

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 400 }
    );
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    console.warn("[contact] honeypot tripped — dropping submission");
    return NextResponse.json({ ok: true });
  }

  const rawFiles = form
    .getAll("photos")
    .filter((v): v is File => v instanceof File && v.size > 0);

  if (rawFiles.length > MAX_PHOTOS) {
    return NextResponse.json(
      { error: `At most ${MAX_PHOTOS} photos allowed.` },
      { status: 400 }
    );
  }
  const attachments: Attachment[] = [];
  for (const file of rawFiles) {
    if (file.size > MAX_PHOTO_BYTES) {
      return NextResponse.json(
        { error: `"${file.name}" exceeds 10MB.` },
        { status: 400 }
      );
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: `"${file.name}" is not an image.` },
        { status: 400 }
      );
    }
    attachments.push({
      filename: file.name,
      content: await file.arrayBuffer(),
      type: file.type,
    });
  }

  // Stamp SMS consent server-side. If we trusted a client-supplied timestamp
  // we couldn't defend it in a TCR / carrier dispute. Only set when the user
  // actually checked the box — an unchecked submission has no consent event.
  const smsConsentTimestamp = parsed.data.smsConsent
    ? new Date().toISOString()
    : null;

  console.log(
    "[contact] new submission:",
    JSON.stringify(
      {
        ...parsed.data,
        smsConsentTimestamp,
        attachmentCount: attachments.length,
      },
      null,
      2
    )
  );

  // Signed Jobber webhook → firsthand-ops admin is the sole notification
  // path. Ryan gets Jobber's native push notification on every new request.
  // The prior Web3Forms email path was removed because Web3Forms is now
  // fronted by a Cloudflare JS-interstitial challenge that no server-side
  // HTTP client can pass.
  const idempotencyKey = computeIdempotencyKey(parsed.data);
  let jobberIds: JobberIdsFromWebhook = {};
  try {
    jobberIds = await sendJobberWebhook(
      parsed.data,
      smsConsentTimestamp,
      idempotencyKey,
      attachments.length
    );
  } catch (err) {
    console.error("[contact] jobber-webhook failed:", err);
  }

  // Photos → FieldShot, so the lead's request arrives WITH its photos for the
  // AI quote drafter. Keyed by the same idempotency key as the webhook; the
  // Jobber ids from the webhook response let FieldShot pre-create the project
  // the Jobber sync will converge on. Best-effort: a FieldShot failure must
  // never fail the form — the Jobber request is the lead's system of record.
  if (attachments.length > 0) {
    try {
      const result = await forwardPhotosToFieldShot({
        idempotencyKey,
        lead: {
          name: parsed.data.name,
          street: parsed.data.address || undefined,
          city: parsed.data.city || undefined,
          state: parsed.data.state || undefined,
          zip: parsed.data.zip || undefined,
        },
        jobber: jobberIds,
        photos: attachments,
      });
      console.log("[contact] fieldshot photo forward:", JSON.stringify(result));
    } catch (err) {
      console.error("[contact] fieldshot photo forward failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

// Returns the Jobber ids from the ops webhook response (client/request always
// on success; property once the ops side ships it) so the photo forward can
// key FieldShot's project to the exact objects this submission created. An
// empty object on skip — the photo pipe degrades to an unlinked pending-lead
// project rather than dropping the photos.
async function sendJobberWebhook(
  data: ContactInput,
  smsConsentTimestamp: string | null,
  idempotencyKey: string,
  photoCount: number
): Promise<JobberIdsFromWebhook> {
  if (!JOBBER_WEBHOOK_URL) {
    console.warn("[contact] JOBBER_WEBHOOK_URL not set — skipping webhook");
    return {};
  }
  if (!WEBSITE_LEAD_WEBHOOK_SECRET) {
    // Fail-loud counterpart to the ops side. Without the secret we cannot
    // sign the request and the ops endpoint would 401 every call — skip
    // entirely rather than burn a round-trip for an inevitable rejection.
    console.warn(
      "[contact] WEBSITE_LEAD_WEBHOOK_SECRET not set — skipping Jobber webhook"
    );
    return {};
  }
  const payload = buildJobberPayload(
    data,
    smsConsentTimestamp,
    idempotencyKey,
    photoCount
  );
  // Sign and send the EXACT bytes we send; the ops side computes HMAC over
  // request.text(), so any re-stringification between sign and send breaks
  // verification. JSON.stringify on an object literal we construct is
  // deterministic in V8 (insertion-order keys).
  const body = JSON.stringify(payload);
  const signature = createHmac("sha256", WEBSITE_LEAD_WEBHOOK_SECRET)
    .update(body)
    .digest("base64");
  const res = await fetch(JOBBER_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Hub-Signature-256": signature,
    },
    body,
  });
  if (!res.ok) {
    const responseBody = await res.text().catch(() => "");
    throw new Error(
      `Jobber webhook returned ${res.status} ${res.statusText}: ${responseBody.slice(0, 200)}`
    );
  }
  const responseJson = (await res.json().catch(() => ({}))) as {
    jobber_client_id?: string | null;
    jobber_request_id?: string | null;
    jobber_property_id?: string | null;
  };
  return {
    clientId: responseJson.jobber_client_id ?? undefined,
    requestId: responseJson.jobber_request_id ?? undefined,
    propertyId: responseJson.jobber_property_id ?? undefined,
  };
}

function computeIdempotencyKey(data: ContactInput): string {
  // Collapses retries within the same minute. Normalisation prevents trivial
  // differences (case, phone formatting, services order) from breaking dedup.
  const email = data.email.toLowerCase().trim();
  const phone = (data.phone ?? "").replace(/\D/g, "");
  const name = data.name.trim().toLowerCase();
  const address = data.address;
  const services = [...data.services].sort().join(",");
  const minuteBucket = Math.floor(Date.now() / 60000);
  const input = `${email}|${phone}|${name}|${address}|${services}|${minuteBucket}`;
  return createHash("sha256").update(input).digest("hex");
}

function buildJobberPayload(
  data: ContactInput,
  smsConsentTimestamp: string | null,
  idempotencyKey: string,
  photoCount: number
) {
  // Shape matches the zod schema on the ops side at
  // apps/admin/app/api/webhooks/website-lead/route.ts. Photos travel on a
  // separate leg — the FieldShot lead-media pipe (lib/fieldshot-lead-media.ts),
  // keyed by the same idempotency_key as this payload.
  //
  // sms_consent + sms_consent_timestamp are the audit record for TCR / A2P
  // 10DLC. Always include sms_consent so the ops side stores a definitive
  // boolean per lead; timestamp is only present when consent was granted.
  return {
    idempotency_key: idempotencyKey,
    name: data.name,
    email: data.email,
    phone: data.phone || undefined,
    services: data.services,
    // Photos ride a separate pipe to FieldShot (they are too large for this
    // JSON webhook), so the Jobber request previously gave no sign they
    // existed — Ryan saw a request with no photos and no hint that any were
    // uploaded. Say so in the note. Wording describes what the CUSTOMER did,
    // which stays true even if the FieldShot forward later fails.
    message: photoCount > 0
      ? `${data.message}\n\n---\nCustomer attached ${photoCount} photo${photoCount === 1 ? "" : "s"} — view them in FieldShot (ref ${idempotencyKey.slice(0, 12)}).`
      : data.message || undefined,
    sms_consent: data.smsConsent,
    sms_consent_timestamp: smsConsentTimestamp ?? undefined,
    source_address: {
      street: data.address || undefined,
      city: data.city || undefined,
      state: data.state || undefined,
      zip: data.zip || undefined,
      placeId: data.placeId || undefined,
    },
  };
}
