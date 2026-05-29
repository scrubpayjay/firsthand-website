import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { NAP } from "@/lib/site-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM =
  process.env.RESEND_FROM ?? "Firsthand Lawns <hello@firsthandlawns.com>";
const CONTACT_INTERNAL_TO = process.env.CONTACT_INTERNAL_TO ?? NAP.email;
const JOBBER_WEBHOOK_URL = process.env.JOBBER_WEBHOOK_URL;
const JOBBER_WEBHOOK_SECRET = process.env.JOBBER_WEBHOOK_SECRET;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

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

  const submittedAt = new Date().toISOString();

  // Always log — gives us a fallback when env vars aren't set yet, and
  // a Vercel-function record even when delivery succeeds downstream.
  console.log(
    `[contact] new submission → ${CONTACT_INTERNAL_TO}:`,
    JSON.stringify(parsed.data, null, 2)
  );

  // Email + Jobber dispatched in parallel; both failures are non-blocking.
  // The user sees a successful redirect either way — we'd rather have a
  // logged failure than make the customer retry while we debug delivery.
  const results = await Promise.allSettled([
    sendInternalEmail(parsed.data, submittedAt),
    sendJobberWebhook(parsed.data, submittedAt),
  ]);

  results.forEach((r, i) => {
    const label = i === 0 ? "resend-email" : "jobber-webhook";
    if (r.status === "rejected") {
      console.error(`[contact] ${label} failed:`, r.reason);
    }
  });

  return NextResponse.json({ ok: true });
}

async function sendInternalEmail(data: ContactInput, submittedAt: string) {
  if (!RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY not set — skipping email send");
    return { skipped: true };
  }
  const resend = new Resend(RESEND_API_KEY);
  const subject = `New website inquiry — ${data.name} (${data.city})`;
  const text = renderInternalEmailText(data, submittedAt);
  const html = renderInternalEmailHtml(data, submittedAt);
  return resend.emails.send({
    from: RESEND_FROM,
    to: CONTACT_INTERNAL_TO,
    replyTo: data.email,
    subject,
    text,
    html,
  });
}

async function sendJobberWebhook(data: ContactInput, submittedAt: string) {
  if (!JOBBER_WEBHOOK_URL) {
    console.warn("[contact] JOBBER_WEBHOOK_URL not set — skipping webhook");
    return { skipped: true };
  }
  const payload = buildJobberPayload(data, submittedAt);
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

function renderInternalEmailText(
  data: ContactInput,
  submittedAt: string
): string {
  return [
    "New inquiry from the Firsthand Lawns website.",
    "",
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    `Phone:    ${data.phone}`,
    `Address:  ${data.address}`,
    `City:     ${data.city}`,
    `Service:  ${data.service}`,
    "",
    "Message:",
    data.message && data.message.length > 0 ? data.message : "(none)",
    "",
    `Submitted at ${submittedAt}`,
  ].join("\n");
}

function renderInternalEmailHtml(
  data: ContactInput,
  submittedAt: string
): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#666;font-size:14px;">${label}</td><td style="padding:4px 0;font-size:14px;color:#111;"><strong>${escapeHtml(value)}</strong></td></tr>`;
  const messageBlock =
    data.message && data.message.length > 0
      ? `<p style="margin:0 0 8px 0;font-size:14px;color:#666;">Message</p><div style="padding:12px;background:#f6f6f6;border-radius:8px;font-size:14px;color:#111;white-space:pre-wrap;">${escapeHtml(data.message)}</div>`
      : "";
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;background:#fff;color:#111;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <h2 style="margin:0 0 16px 0;font-size:18px;">New website inquiry</h2>
    <table style="border-collapse:collapse;margin-bottom:16px;">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Address", data.address)}
      ${row("City", data.city)}
      ${row("Service", data.service)}
    </table>
    ${messageBlock}
    <p style="margin:24px 0 0 0;font-size:12px;color:#999;">Submitted at ${submittedAt}</p>
  </div>
</body></html>`;
}

function buildJobberPayload(data: ContactInput, submittedAt: string) {
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
      city: data.city,
    },
    serviceInterest: data.service,
    message: data.message ?? "",
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
