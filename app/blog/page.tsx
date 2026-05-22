import type { Metadata } from "next";
import { Mail, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The Firsthand Journal — Central Florida landscape tips & seasonal guides",
  description:
    "Notes from the field on Central Florida landscape care — seasonal guides, project showcases, hurricane prep, grass type tradeoffs. Coming soon.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

const PLANNED_TOPICS = [
  "Florida grass types — Floratam vs. Palmetto vs. Empire Zoysia",
  "Hurricane season checklist — what to trim, what to stake, what to drain",
  "Why your St. Augustine keeps browning out (it's usually one of three things)",
  "Watering restrictions in Orange County — what changed in 2025",
  "HOA-friendly plant palettes for Windermere and Bay Hill",
  "How we run a paver patio install — base prep through final sweep",
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <section className="container-wide pt-6 pb-16 lg:pt-8 lg:pb-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Notes from the field
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
            The Firsthand Journal.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Coming soon. We&apos;re putting together short, useful posts on
            Central Florida landscape care — seasonal guides, project
            showcases, the kind of stuff we end up explaining to customers
            twice a week anyway. Sign up below and we&apos;ll send the first
            few when they&apos;re live.
          </p>
        </div>

        {/* Email capture */}
        <div className="mt-10 max-w-xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
          <div className="flex items-start gap-3 mb-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Get notified when posts go live
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                No spam. We&apos;ll email when we publish, which won&apos;t be
                often.
              </p>
            </div>
          </div>

          <form
            action="/api/contact"
            method="post"
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* For now this routes to the same /api/contact handler. Phase 2 swaps in a dedicated newsletter list. */}
            <input
              type="hidden"
              name="service"
              value="Multiple / Not sure"
            />
            <input type="hidden" name="city" value="Other Central Florida" />
            <input type="hidden" name="name" value="Newsletter signup" />
            <input type="hidden" name="phone" value="0000000000" />
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
            />
            <button
              type="submit"
              className="cta-pill inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
            >
              Notify me
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            [RYAN: Phase 2 — wire this to a dedicated newsletter list (Mailchimp,
            Buttondown, ConvertKit, etc.). Right now it just sends to Ryan&apos;s
            inbox via /api/contact.]
          </p>
        </div>

        {/* Coming-soon topic list */}
        <div className="mt-14">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-5">
            On the docket.
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            These are the posts we&apos;re working on. If any of them would be
            useful to you sooner rather than later, tell us when you sign up
            and we&apos;ll prioritize that one.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl">
            {PLANNED_TOPICS.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3"
              >
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cta shrink-0" />
                <span className="text-sm text-foreground leading-snug">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        heading="Don't want to wait for a blog post?"
        subheading="If you've got a question about your property right now, ask us. We answer most messages within one business day."
      />
    </>
  );
}
