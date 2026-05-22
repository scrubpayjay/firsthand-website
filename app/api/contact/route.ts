import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { NAP } from "@/lib/site-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  // Honeypot tripped — silently return success so bots don't probe.
  if (parsed.data.website && parsed.data.website.length > 0) {
    console.warn("[contact] honeypot tripped — dropping submission");
    return NextResponse.json({ ok: true });
  }

  // TODO before launch: wire up Resend (recommended — Vercel-native, dirt-cheap
  // for transactional sends, supports React Email templates). Two emails:
  //   1. Internal notification → ${NAP.email}
  //   2. Auto-reply confirmation → submitter's email
  // Resend setup:
  //   pnpm add resend
  //   const resend = new Resend(process.env.RESEND_API_KEY)
  //   await resend.emails.send({ from: "Firsthand Lawns <hello@firsthandlawns.com>", to: NAP.email, ... })
  // Requires domain verification of firsthandlawns.com in Resend dashboard.
  console.log(
    `[contact] new submission → ${NAP.email}:`,
    JSON.stringify(parsed.data, null, 2)
  );

  return NextResponse.json({ ok: true });
}
