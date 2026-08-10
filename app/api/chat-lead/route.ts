import { createHash, createHmac } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

import { chatLeadSchema, type ChatLeadInput } from "@/lib/chat-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const JOBBER_WEBHOOK_URL = process.env.JOBBER_WEBHOOK_URL;
const WEBSITE_LEAD_WEBHOOK_SECRET = process.env.WEBSITE_LEAD_WEBHOOK_SECRET;

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = chatLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_input", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  console.log(
    "[chat-lead] new submission:",
    JSON.stringify({ ...parsed.data, transcript_len: parsed.data.transcript?.length ?? 0 }, null, 2),
  );

  // Signed Jobber webhook → firsthand-ops admin is the sole notification
  // path. The prior email-to-Ryan path via Web3Forms was removed because
  // Web3Forms is now fronted by a Cloudflare JS-interstitial challenge
  // that no server-side HTTP client can pass.
  try {
    await sendJobberWebhook(parsed.data);
  } catch (err) {
    console.error("[chat-lead] jobber-webhook failed:", err);
    // Still return 200 — the lead is logged above so it isn't lost, and a
    // visitor shouldn't see an error after they hit Send.
  }

  return NextResponse.json({ ok: true });
}

async function sendJobberWebhook(data: ChatLeadInput) {
  if (!JOBBER_WEBHOOK_URL || !WEBSITE_LEAD_WEBHOOK_SECRET) {
    console.warn("[chat-lead] Jobber webhook not configured — skipping");
    return { skipped: true };
  }
  // The ops side validates a stricter schema (services array, address fields).
  // Chat leads almost never have those, so we synthesize defaults rather than
  // build a parallel webhook just for chat — Ryan sees the same row pattern.
  const payload = {
    idempotency_key: computeIdempotencyKey(data),
    name: data.name,
    email: data.email && data.email.length > 0 ? data.email : "no-email@chat.firsthandlawns.com",
    phone: data.phone || undefined,
    services: ["Other"],
    message: [data.interest, data.transcript ? `--- chat transcript ---\n${data.transcript}` : null]
      .filter(Boolean)
      .join("\n\n") || undefined,
    source_address: {},
  };
  const bodyString = JSON.stringify(payload);
  const signature = createHmac("sha256", WEBSITE_LEAD_WEBHOOK_SECRET)
    .update(bodyString)
    .digest("base64");
  const res = await fetch(JOBBER_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Hub-Signature-256": signature },
    body: bodyString,
  });
  if (!res.ok) {
    const responseBody = await res.text().catch(() => "");
    throw new Error(
      `Jobber webhook returned ${res.status} ${res.statusText}: ${responseBody.slice(0, 200)}`,
    );
  }
  return { ok: true, status: res.status };
}

function computeIdempotencyKey(data: ChatLeadInput): string {
  const email = (data.email ?? "").toLowerCase().trim();
  const phone = (data.phone ?? "").replace(/\D/g, "");
  const name = data.name.trim().toLowerCase();
  const minuteBucket = Math.floor(Date.now() / 60000);
  const input = `chat|${email}|${phone}|${name}|${minuteBucket}`;
  return createHash("sha256").update(input).digest("hex");
}
