import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { NAP, HOURS_DISPLAY, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Thanks — we'll be in touch",
  description: "Your message reached Ryan. We'll be back to you within one business day.",
  alternates: { canonical: `${SITE_URL}/contact/thanks` },
  robots: { index: false, follow: true },
};

export default function ThanksPage() {
  return (
    <section className="container-wide py-20 lg:py-28">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cta/15 text-cta mb-6">
          <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
        </span>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight font-semibold tracking-tight">
          Thanks — message received.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          Ryan will be in touch within one business day (
          {HOURS_DISPLAY}). If you&apos;re mid-emergency — fallen limb,
          burst irrigation — call us directly at{" "}
          <a
            href={`tel:${NAP.phoneTel}`}
            className="font-semibold text-foreground underline"
          >
            {NAP.phone}
          </a>
          .
        </p>

        <div className="mt-10 rounded-xl border border-border bg-card p-6 sm:p-8 text-left">
          <h2 className="font-semibold text-foreground mb-3 text-base">
            What happens next
          </h2>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </span>
              <span>
                We&apos;ll call or email to schedule a site walk — usually
                within one business day.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                2
              </span>
              <span>
                Ryan or a designer walks the property with you. Takes
                30&ndash;60 minutes depending on scope. Bring questions.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                3
              </span>
              <span>
                You get a written estimate within 2&ndash;5 business days, with
                line items you can actually read. Financing options included if
                you want them.
              </span>
            </li>
          </ol>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Back to home
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            See recent projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
