import { createHash, createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { landingLeadSchema } from "@/lib/landing-lead-schema";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Best-effort burst protection per instance. Durable deduplication is enforced by the existing CRM.
const bursts = new Map<string, { count: number; expires: number }>();
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 12000) return NextResponse.json({ error: "Request too large" }, { status: 413 });
  let raw: string;
  try { raw = await request.text(); } catch { return NextResponse.json({error:"Invalid request"},{status:400}); }
  if (Buffer.byteLength(raw) > 12000) return NextResponse.json({error:"Request too large"},{status:413});
  let json: unknown;
  try { json = JSON.parse(raw); } catch { return NextResponse.json({error:"Invalid request"},{status:400}); }
  const parsed = landingLeadSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  const data = parsed.data;
  const ip = createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0] || "local").digest("hex");
  const now = Date.now();
  for (const [key, value] of bursts) if (value.expires <= now) bursts.delete(key);
  const burst = bursts.get(ip) || { count: 0, expires: now + 60000 };
  if (burst.count >= 6) return NextResponse.json({error:"Please wait a minute before trying again."},{status:429,headers:{"Retry-After":"60"}});
  if (bursts.size >= 10000) bursts.delete(bursts.keys().next().value!);
  burst.count++; bursts.set(ip, burst);
  const url = process.env.JOBBER_WEBHOOK_URL;
  const secret = process.env.WEBSITE_LEAD_WEBHOOK_SECRET;
  if (!url || !secret) return unavailable();
  const attribution = data.trackingConsent ? data.attribution : {};
  const submittedAt = new Date().toISOString();
  // Keep all project and attribution details in the CRM's persisted message field;
  // its receiver strips unknown top-level keys. No invented email or address.
  const message = ["Website estimate request", `Landing page: /${data.landingPage}`, `Project: ${data.projectType}`, `ZIP: ${data.zip}`, data.squareFootage ? `Approximate square footage: ${data.squareFootage}` : "", data.budget ? `Estimated budget: ${data.budget}` : "", data.startDate ? `Anticipated start: ${data.startDate}` : "", `Submitted at: ${submittedAt}`, `Tracking consent: ${data.trackingConsent ? "granted" : "not granted"}`, `Campaign attribution: ${JSON.stringify(attribution)}`].filter(Boolean).join("\n");
  // A stable hash collapses repeated identical inquiries within a day, even across
  // reloads or concurrent instances. CRM status and timestamp are stored downstream.
  const identity = [data.email, data.phone.replace(/\D/g,""), data.zip, data.landingPage, data.projectType, data.squareFootage, data.budget, data.startDate, Math.floor(now/86400000)].join("|");
  const key = "estimate-" + createHash("sha256").update(identity).digest("hex");
  const body = JSON.stringify({ idempotency_key:key, name:data.name, email:data.email, phone:data.phone, services:[data.projectType], message, source_address:{zip:data.zip,state:"FL"}, sms_consent:false });
  try {
    const response = await fetch(url, { method:"POST", headers:{"Content-Type":"application/json","X-Hub-Signature-256":createHmac("sha256",secret).update(body).digest("base64")}, body, signal:AbortSignal.timeout(25000) });
    const result = await response.json();
    // HTTP 200 can also mean an earlier attempt is still pending or failed.
    if (!response.ok || result.ok !== true || !result.jobber_request_id || (result.status && result.status !== "request_created")) return unavailable();
    return NextResponse.json({ok:true, reference:key.slice(0,21)});
  } catch { console.error("[estimate] CRM delivery not confirmed"); return unavailable(); }
}
function unavailable() { return NextResponse.json({error:"We couldn’t confirm receipt. Please try again or call (407) 337-5191."},{status:503}); }
