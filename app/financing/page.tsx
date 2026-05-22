import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Home,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FINANCING, SERVICES, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Financing — $1K–$100K landscape financing | Firsthand Lawns",
  description:
    "Spread landscape projects over 2–12 years with no prepayment penalty. Amounts from $1,000 to $100,000. Soft credit pull for pre-qualification. Residential and commercial.",
  alternates: { canonical: `${SITE_URL}/financing` },
};

const BENEFITS = [
  {
    icon: CircleDollarSign,
    title: "Projects from $1,000 to $100,000",
    body: "From a single irrigation overhaul to a full backyard rebuild — covered.",
  },
  {
    icon: Clock,
    title: "Terms 2 to 12 years",
    body: "Spread it out as long as you'd like; pay less per month.",
  },
  {
    icon: ShieldCheck,
    title: "No prepayment penalty",
    body: "Pay it off whenever you'd like. No early-payoff penalty.",
  },
  {
    icon: CheckCircle2,
    title: "Approval in minutes",
    body: "Soft credit pull for pre-qualification. Doesn't affect your score.",
  },
  {
    icon: Home,
    title: "Residential",
    body: "Homeowners can finance any landscape project with us.",
  },
  {
    icon: Building2,
    title: "Commercial",
    body: "HOAs, property managers, and commercial sites can finance large projects.",
  },
];

export default function FinancingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Financing" }]} />

      <section className="container-wide pt-6 pb-12 lg:pt-8 lg:pb-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Financing
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
            Financing for your landscape project.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Most landscape projects in our service area land between $5,000 and
            $30,000. That&apos;s real money — but it doesn&apos;t need to be a
            reason to wait. We work with a financing partner so you can spread
            the project over 2 to 12 years, with no penalty for paying it down
            early.
          </p>
        </div>

        {/* Hero callout */}
        <div className="mt-10 rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 lg:p-10">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-2">
                Loan range
              </p>
              <p className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                ${FINANCING.minAmount.toLocaleString()}–
                <span className="block sm:inline">
                  ${FINANCING.maxAmount.toLocaleString()}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-2">
                Terms
              </p>
              <p className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                {FINANCING.minTermYears}–{FINANCING.maxTermYears}
                <span className="text-2xl sm:text-3xl text-primary-foreground/70">
                  {" "}years
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-2">
                Prepayment penalty
              </p>
              <p className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                None
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-10 max-w-2xl">
            How it works.
          </h2>

          <ol className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {[
              {
                step: "1",
                title: "Get your free estimate",
                body: "We come out, walk the property, and write up a real estimate — usually within two business days.",
              },
              {
                step: "2",
                title: "Apply through our partner",
                body: "We&apos;ll send a short application link from our financing partner. Soft credit pull — doesn&apos;t affect your score for pre-qualification.",
              },
              {
                step: "3",
                title: "Start the project this month",
                body: "Approvals usually take minutes. Once you&apos;re in, we put the project on the schedule and get moving.",
              },
            ].map((s) => (
              <li
                key={s.step}
                className="rounded-xl border border-border bg-card p-6 sm:p-7"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg font-bold mb-4">
                  {s.step}
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight mb-2.5">
                  {s.title}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-background">
        <div className="container-wide">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-10 max-w-2xl">
            What you get.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-xl border border-border bg-card p-5 sm:p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-semibold text-foreground mb-1.5 text-base">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What qualifies */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <h2 className="font-display text-3xl sm:text-4xl leading-tight font-semibold tracking-tight">
              What can you finance?
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Any service we offer. Most customers use financing for larger
              installs — a full landscape design, paver patio, irrigation
              overhaul, or sod replacement — but you can finance ongoing
              maintenance too.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="block rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:border-primary/40 transition-colors"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-background">
        <div className="container-wide">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-10 max-w-2xl">
            Financing questions.
          </h2>

          <dl className="space-y-6 max-w-3xl">
            {[
              {
                q: "Will applying affect my credit?",
                a: "Pre-qualification uses a soft pull, which doesn't affect your credit score. If you decide to move forward with the loan, the partner will do a hard pull at that point — same as any other loan.",
              },
              {
                q: "How long does approval take?",
                a: "Most applicants hear back within a few minutes for pre-qualification. Larger amounts ($50K+) can take one to two business days for underwriting review.",
              },
              {
                q: "Can I finance any service?",
                a: "Yes — any landscape work we do qualifies. Most customers finance bigger projects (designs, patios, full backyard rebuilds), but ongoing maintenance contracts can be set up on a payment plan as well. We'll walk through the structure that fits.",
              },
              {
                q: "What if I want to pay it off early?",
                a: "No prepayment penalties. Pay it down on your schedule.",
              },
              {
                q: "Is this only for homeowners?",
                a: "No — commercial properties, HOAs, and property managers can finance larger projects too. Underwriting is slightly different on the commercial side; we'll walk you through it.",
              },
              {
                q: "Who handles the loan?",
                a: "We work with a vetted financing partner that specializes in home-improvement and landscape projects. We'll introduce you when we send your estimate and walk you through the application together.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-border bg-card p-6"
              >
                <dt className="font-display text-lg font-semibold text-foreground mb-2 tracking-tight">
                  {item.q}
                </dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-wide py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] leading-tight font-semibold tracking-tight">
                Two ways to start.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-primary-foreground/85 max-w-xl">
                Either start with a site walk (recommended — we&apos;ll know
                exactly what to apply for) or jump straight to pre-qualification.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="cta-pill inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold"
              >
                Start with a free estimate
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={FINANCING.partnerApplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-4 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                Apply for financing
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-xs text-primary-foreground/60 mt-1">
                [RYAN: replace the apply link with your actual financing
                partner&apos;s application URL.]
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
