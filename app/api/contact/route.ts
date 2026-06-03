import { NextResponse } from "next/server";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const JOBBER_WEBHOOK_URL = process.env.JOBBER_WEBHOOK_URL;
const JOBBER_WEBHOOK_SECRET = process.env.JOBBER_WEBHOOK_SECRET;

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
    sendJobberWebhook(parsed.data, submittedAt, attachments.length),
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

  const res = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: fd });
  if (!res.ok) {
    const responseBody = await res.text().catch(() => "");
    throw new Error(
      `Web3Forms returned ${res.status} ${res.statusText}: ${responseBody.slice(0, 200)}`
    );
  }
  return { ok: true, status: res.status };
}

async function sendJobberWebhook(
  data: ContactInput,
  submittedAt: string,
  attachmentCount: number
) {
  if (!JOBBER_WEBHOOK_URL) {
    console.warn("[contact] JOBBER_WEBHOOK_URL not set — skipping webhook");
    return { skipped: true };
  }
  const payload = buildJobberPayload(data, submittedAt, attachmentCount);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (JOBBER_WEBHOOK_SECRET) {
    headers["X-Webhook-Secret"] = JOBBER_WEBHOOK_SECRET;
  }
  const res = await fetch(JOBBER_WEBHOOK_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const responseBody = await res.text().catch(() => "");
    throw new Error(
      `Jobber webhook returned ${res.status} ${res.statusText}: ${responseBody.slice(0, 200)}`
    );
  }
  return { ok: true, status: res.status };
}

function buildJobberPayload(
  data: ContactInput,
  submittedAt: string,
  attachmentCount: number
) {
  return {
    source: "firsthand-website",
    submittedAt,
    contact: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
    property: {
      address: data.address,
      city: data.city || undefined,
      state: data.state || undefined,
      zip: data.zip || undefined,
      placeId: data.placeId || undefined,
    },
    services: data.services,
    message: data.message ?? "",
    hasAttachments: attachmentCount > 0,
    attachmentCount,
  };
}
