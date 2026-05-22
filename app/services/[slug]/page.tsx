import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Clock,
  Tag,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  SERVICE_PAGES,
  getServicePage,
  type ServicePage,
} from "@/lib/services-data";
import {
  NAP,
  SERVICE_AREAS,
  SITE_NAME,
  SITE_URL,
  FINANCING,
} from "@/lib/site-config";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `${SITE_URL}/services/${service.slug}`,
      type: "website",
    },
  };
}

function serviceJsonLd(s: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${s.slug}#service`,
    name: s.name,
    description: s.description,
    provider: {
      "@type": "LandscapeService",
      name: SITE_NAME,
      "@id": `${SITE_URL}/#business`,
      telephone: NAP.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: NAP.street,
        addressLocality: NAP.city,
        addressRegion: NAP.state,
        postalCode: NAP.zip,
        addressCountry: NAP.country,
      },
    },
    areaServed: SERVICE_AREAS.map((a) => ({ "@type": "City", name: a.name })),
    serviceType: s.name,
    url: `${SITE_URL}/services/${s.slug}`,
    mainEntityOfPage: {
      "@type": "FAQPage",
      mainEntity: s.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  };
}

export default async function ServiceDetailPage({ params }: RouteProps) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service)),
        }}
      />

      <Breadcrumbs
        items={[
          { href: "/services/lawn-maintenance", label: "Services" },
          { label: service.name },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="container-wide pt-6 pb-12 lg:pt-8 lg:pb-16">
        {service.needsConfirm && (
          <div
            role="note"
            className="mb-6 rounded-xl border border-cta/30 bg-cta/8 px-5 py-4"
            style={{ backgroundColor: "rgba(101, 163, 13, 0.06)" }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-cta shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-foreground mb-1">
                  Pre-launch confirmation needed
                </p>
                <p className="text-muted-foreground">
                  [RYAN: Confirm Firsthand currently offers {service.name.toLowerCase()}.
                  If not, remove from menu and de-index this page before
                  cutover. If yes, delete this banner.]
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-12 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              {service.name}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
              {service.h1}
            </h1>
            <div className="mt-7 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {service.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="cta-pill inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold"
              >
                Get a free estimate
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`tel:${NAP.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-muted"
              >
                Call {NAP.phone}
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold tracking-tight mb-4">
                Quick facts
              </h2>
              <ul className="space-y-3.5 text-sm">
                {service.priceRange && (
                  <li className="flex items-start gap-2.5">
                    <Tag className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Typical cost
                      </p>
                      <p className="text-foreground">{service.priceRange}</p>
                    </div>
                  </li>
                )}
                {service.timeline && (
                  <li className="flex items-start gap-2.5">
                    <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Timeline
                      </p>
                      <p className="text-foreground">{service.timeline}</p>
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Service area
                    </p>
                    <p className="text-foreground">
                      Winter Park · Windermere · Bay Hill · Orlando
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-primary text-primary-foreground p-6">
              <h3 className="font-display text-lg font-semibold tracking-tight mb-2">
                Financing available
              </h3>
              <p className="text-sm text-primary-foreground/85 mb-4 leading-relaxed">
                Projects from ${FINANCING.minAmount.toLocaleString()} to $
                {FINANCING.maxAmount.toLocaleString()}, terms{" "}
                {FINANCING.minTermYears}–{FINANCING.maxTermYears} years, no
                prepayment penalty.
              </p>
              <Link
                href="/financing"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground hover:underline"
              >
                See financing
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── What's included ────────────────────────────────────────── */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                What&apos;s included
              </p>
              <h2 className="font-display text-3xl sm:text-4xl leading-tight font-semibold tracking-tight mb-6">
                Every {service.name.toLowerCase()} job, the full scope.
              </h2>
              <ul className="space-y-3">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                    <CheckCircle2 className="h-5 w-5 text-cta shrink-0 mt-0.5" />
                    <span className="text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <PhotoPlaceholder
              label={`Mid-project photo of a ${service.name.toLowerCase()} job in progress — crew in branded shirts, equipment visible, work area clean. Choose the most "in-action" shot from CompanyCam.`}
              aspect="aspect-[4/5]"
              variant="primary"
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              How it works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              Our process for {service.name.toLowerCase()}.
            </h2>
          </div>

          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {service.process.map((step, i) => (
              <li
                key={i}
                className="rounded-xl border border-border bg-card p-6 sm:p-7"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-base font-bold">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Why Firsthand ──────────────────────────────────────────── */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Why Firsthand
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              What separates our {service.name.toLowerCase()} from the rest.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {service.why.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 sm:p-7"
              >
                <h3 className="font-display text-xl font-semibold tracking-tight mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ───────────────────────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              FAQ
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight mb-8">
              Questions we hear a lot.
            </h2>
            <FaqAccordion items={service.faqs} />
          </div>
        </div>
      </section>

      {/* ── Service areas cross-link ───────────────────────────────── */}
      <section className="bg-elevated section-tight">
        <div className="container-wide">
          <div className="max-w-3xl mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              {service.name} where we work.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              We run {service.name.toLowerCase()} projects across Central
              Florida. Pick your area for local specifics.
            </p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SERVICE_AREAS.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/service-areas/${a.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:border-primary/40"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {a.name}
                  </span>
                  {a.primary && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      ★
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Related services ───────────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container-wide">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-8 max-w-2xl">
            Related services.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.related.map((relatedSlug) => {
              const rel = getServicePage(relatedSlug);
              if (!rel) return null;
              return (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-card-hover transition-all"
                >
                  <h3 className="font-display text-lg font-semibold tracking-tight mb-2">
                    {rel.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {rel.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection
        heading={`Ready to talk about ${service.name.toLowerCase()}?`}
        subheading="Tell us about the property. We'll come out, walk it with you, and write up an honest estimate — usually within two business days."
      />
    </>
  );
}
