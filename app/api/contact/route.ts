import { createHash, createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
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

  const submittedAt = new Date().toISOString();

  console.log(
    "[contact] new submission:",
    JSON.stringify(
      { ...parsed.data, attachmentCount: attachments.length },
      null,
      2
    )
  );

  // Web3Forms (email to Ryan) + Jobber webhook dispatched in parallel; both
  // failures are non-blocking. Customer still gets a successful redirect —
  // a logged failure is preferable to making them retry while we debug.
  const results = await Promise.allSettled([
    sendWeb3FormsEmail(parsed.data, submittedAt, attachments),
    sendJobberWebhook(parsed.data),
  ]);

  results.forEach((r, i) => {
    const label = i === 0 ? "web3forms" : "jobber-webhook";
    if (r.status === "rejected") {
      console.error(`[contact] ${label} failed:`, r.reason);
    }
  });

  return NextResponse.json({ ok: true });
}

async function sendWeb3FormsEmail(
  data: ContactInput,
  submittedAt: string,
  attachments: Attachment[]
) {
  if (!WEB3FORMS_ACCESS_KEY) {
    console.warn(
      "[contact] WEB3FORMS_ACCESS_KEY not set — skipping email send"
    );
    return { skipped: true };
  }

  const cityStateZip = [data.city, data.state, data.zip]
    .filter((v) => v && v.length > 0)
    .join(", ");

  const fd = new FormData();
  fd.append("access_key", WEB3FORMS_ACCESS_KEY);
  fd.append("subject", `New Firsthand Lead — ${data.name}`);
  fd.append("from_name", "Firsthand Lawns Website");
  fd.append("replyto", data.email);
  // Web3Forms convention: empty botcheck field. Honeypot already filtered above.
  fd.append("botcheck", "");

  fd.append("name", data.name);
  fd.append("email", data.email);
  fd.append("phone", data.phone);
  fd.append("address", data.address);
  if (cityStateZip) fd.append("locality", cityStateZip);
  if (data.placeId) fd.append("place_id", data.placeId);
  fd.append("services", data.services.join(", "));
  fd.append("message", data.message ?? "");
  fd.append("submitted_at", submittedAt);

  for (const att of attachments) {
    fd.append(
      "attachments",
      new Blob([att.content], { type: att.type }),
      att.filename
    );
  }

  // Web3Forms sits behind Cloudflare, which 403s requests with no
  // User-Agent (Node fetch default). Send a real-looking UA + Accept.
  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    body: fd,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; FirsthandLawnsWebsite/1.0; +https://firsthandlawns.com)",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const responseBody = await res.text().catch(() => "");
    throw new Error(
      `Web3Forms returned ${res.status} ${res.statusText}: ${responseBody.slice(0, 200)}`
    );
  }
  return { ok: true, status: res.status };
}

async function sendJobberWebhook(data: ContactInput) {
  if (!JOBBER_WEBHOOK_URL) {
    console.warn("[contact] JOBBER_WEBHOOK_URL not set — skipping webhook");
    return { skipped: true };
  }
  if (!WEBSITE_LEAD_WEBHOOK_SECRET) {
    // Fail-loud counterpart to the ops side. Without the secret we cannot
    // sign the request and the ops endpoint would 401 every call — skip
    // entirely rather than burn a round-trip for an inevitable rejection.
    console.warn(
      "[contact] WEBSITE_LEAD_WEBHOOK_SECRET not set — skipping Jobber webhook"
    );
    return { skipped: true };
  }
  const payload = buildJobberPayload(data);
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
  return { ok: true, status: res.status };
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

function buildJobberPayload(data: ContactInput) {
  // Shape matches the zod schema on the ops side at
  // apps/admin/app/api/webhooks/website-lead/route.ts. Photos are not
  // forwarded — they continue via the Web3Forms email path.
  return {
    idempotency_key: computeIdempotencyKey(data),
    name: data.name,
    email: data.email,
    phone: data.phone || undefined,
    services: data.services,
    message: data.message || undefined,
    source_address: {
      street: data.address || undefined,
      city: data.city || undefined,
      state: data.state || undefined,
      zip: data.zip || undefined,
      placeId: data.placeId || undefined,
    },
  };
}
