import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ShieldCheck,
  HandHeart,
  Eye,
  Hammer,
} from "lucide-react";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { CtaSection } from "@/components/cta-section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SITE_TAGLINE, SITE_URL, NAP } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Firsthand Lawns — Family-owned landscaping in Winter Park, FL",
  description:
    "Firsthand Lawns is a family-owned landscape company serving Winter Park, Windermere, Bay Hill, and Central Florida. Meet the team, see our values, browse recent work.",
  alternates: { canonical: `${SITE_URL}/about` },
};

const VALUES = [
  {
    icon: Eye,
    title: "Show, don't tell.",
    body:
      "Every project gets photographed in CompanyCam — before, during, and after. You see what we did, when we did it, and what it looks like cleaned up. No mystery line items on the invoice.",
  },
  {
    icon: Hammer,
    title: "Do the base work right.",
    body:
      "Sandy Central Florida soil punishes shortcuts. A sod job that didn't get a 4-inch graded base will brown out in a year. A paver patio without proper sub-base will rock in three. We don't compete on price by cutting the part you can't see.",
  },
  {
    icon: HandHeart,
    title: "The crew you meet is the crew you get.",
    body:
      "We don't subcontract. The same team that walks the property with you is the team that runs the install. That makes accountability simple — there's no second number to call if something needs a fix.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed, insured, on the record.",
    body:
      "Fully licensed and insured. We carry general liability and workers' comp on every crew member. Insurance certificates available on request for HOA and commercial work.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />

      {/* Hero */}
      <section className="container-wide pt-6 pb-14 lg:pt-8 lg:pb-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            About Firsthand Lawns
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
            A landscape company built around the customers we&apos;d see at the
            soccer field.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Firsthand Lawns is a family-owned landscape company based out of{" "}
            {NAP.city}, FL. We work across Winter Park, Windermere, Bay Hill,
            College Park, and the rest of Orange County — and the vast
            majority of our work comes from neighbors referring neighbors.
            That&apos;s the only reputation we&apos;re trying to protect.
          </p>
          <p className="mt-4 font-display italic text-muted-foreground">
            {SITE_TAGLINE}
          </p>
        </div>
      </section>

      {/* Ryan's story */}
      <section className="bg-elevated section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
            <div>
              <PhotoPlaceholder
                label="Photo of Ryan Hanus on a job site — outdoors, in-progress shot, looks natural not staged. Could be him walking a property with a clipboard, or with the crew mid-install."
                aspect="aspect-[4/5]"
                variant="muted"
                className="rounded-2xl"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Ryan&apos;s story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl leading-tight font-semibold tracking-tight">
                Meet Ryan Hanus.
              </h2>
              <div className="mt-5 space-y-4 text-base text-muted-foreground leading-relaxed">
                <p className="text-text-faint italic">
                  [RYAN: Replace this whole block with 2–3 paragraphs in your
                  own voice. The structure that converts best is:
                </p>
                <p className="text-text-faint italic">
                  (1) one sentence on why you started Firsthand — what was
                  broken about the way landscape work was being done in
                  Central Florida that you wanted to fix.
                </p>
                <p className="text-text-faint italic">
                  (2) one paragraph on what makes your approach different —
                  could be the crew loyalty (same guys for years), CompanyCam
                  documentation, the time you spend walking a property before
                  quoting, anything that&apos;s actually true and specific.
                </p>
                <p className="text-text-faint italic">
                  (3) one short paragraph on what matters to you outside of
                  work — family, where you live, why you stayed in Central
                  Florida. The point isn&apos;t to be cute, it&apos;s to
                  remind the customer there&apos;s an actual human running
                  this thing.]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              What we hold ourselves to
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              Four things we don&apos;t cut corners on.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-xl border border-border bg-card p-6 sm:p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight mb-2.5">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              The team
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              People you&apos;ll actually see on the property.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              [RYAN: List 3–6 key crew members here with first name + role +
              one sentence (years on the team, what they specialize in). This
              section is one of the highest-converting elements on landscape
              sites because customers want to know who&apos;s walking onto
              their property.]
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Ryan Hanus — Owner",
              "[RYAN: Crew lead #1]",
              "[RYAN: Crew lead #2]",
              "[RYAN: Estimator / Designer]",
            ].map((label, i) => (
              <div key={i}>
                <PhotoPlaceholder
                  label={`Team headshot — ${label}. Outdoor or job-site background, smiling, name + role in caption.`}
                  aspect="aspect-square"
                  variant="muted"
                  className="rounded-2xl"
                />
                <p className="mt-3 text-sm font-medium text-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Credentials &amp; insurance
              </p>
              <h2 className="font-display text-3xl sm:text-4xl leading-tight font-semibold tracking-tight">
                On the record.
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                We carry the licensing and insurance that property managers
                and HOAs need to onboard a vendor. Certificates available on
                request — and we&apos;ll add your management company as an
                additional insured if your contract requires it.
              </p>
              {/* RYAN: confirm exact policy figures before launch. Defaults
                  below reflect typical FL contractor coverage — replace with
                  your actual numbers and carrier when convenient. */}
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">General liability insurance</p>
                    <p className="text-muted-foreground">
                      $1M per occurrence / $2M aggregate. Certificate of
                      insurance available on request — we&apos;ll add your HOA
                      or management company as additional insured if your
                      contract requires it.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Workers&apos; compensation</p>
                    <p className="text-muted-foreground">
                      Full workers&apos; compensation coverage on every crew
                      member. COI available on request.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Florida landscape contractor license</p>
                    <p className="text-muted-foreground">
                      Licensed Florida landscape contractor. License number
                      provided on request.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Local business license</p>
                    <p className="text-muted-foreground">
                      Orange County, FL — current on file.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <PhotoPlaceholder
              label="Photo of certifications/licenses framed in the office, OR a clean shot of a crew member in branded shirt with truck in background. Builds 'real business' credibility."
              aspect="aspect-[4/5]"
              variant="primary"
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Recent work
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
                What it looks like when it&apos;s done.
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              See full portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Winter Park front yard — full landscape design",
              "Windermere paver patio with fire pit",
              "Bay Hill irrigation overhaul",
              "College Park sod replacement",
              "Doctor Phillips backyard renovation",
              "Orlando commercial property maintenance",
              "Winter Park tree thinning before hurricane season",
              "Windermere HOA-compliant front bed redesign",
            ].map((label, i) => (
              <PhotoPlaceholder
                key={i}
                label={label}
                aspect="aspect-square"
                variant={i % 3 === 0 ? "primary" : "muted"}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
