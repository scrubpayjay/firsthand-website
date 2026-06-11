import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  Star,
  Sprout,
  Pencil,
  Layers,
  Droplets,
  Square,
  TreePine,
  Axe,
  Scissors,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { SitePhoto } from "@/components/site-photo";
import { TrackedContactLink } from "@/components/tracked-contact-link";
import { photosByArea } from "@/lib/photos-manifest";
import { FaqAccordion } from "@/components/faq-accordion";
import { GoogleMapsEmbed } from "@/components/google-maps-embed";
import {
  SERVICE_AREA_PAGES,
  getServiceArea,
  type ServiceAreaPage,
} from "@/lib/service-areas-data";
import { SERVICE_PAGES } from "@/lib/services-data";
import {
  NAP,
  SITE_NAME,
  SITE_URL,
  REVIEWS_SUMMARY,
} from "@/lib/site-config";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICE_AREA_PAGES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) return { title: "Service area not found" };

  return {
    title: area.title,
    description: area.description,
    alternates: { canonical: `${SITE_URL}/service-areas/${area.slug}` },
    openGraph: {
      title: area.title,
      description: area.description,
      url: `${SITE_URL}/service-areas/${area.slug}`,
      type: "website",
    },
  };
}

const SERVICE_ICONS: Record<string, typeof Sprout> = {
  "lawn-maintenance": Sprout,
  "landscape-design": Pencil,
  "sod-installation": Layers,
  irrigation: Droplets,
  "hardscape-installation": Square,
  "tree-trimming-removal": TreePine,
  "stump-grinding-removal": Axe,
  "bamboo-trimming-removal": Scissors,
};

function localBusinessJsonLd(a: ServiceAreaPage) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/service-areas/${a.slug}#localbusiness`,
    name: `${SITE_NAME} — ${a.name}`,
    description: a.description,
    url: `${SITE_URL}/service-areas/${a.slug}`,
    telephone: NAP.phone,
    image: `${SITE_URL}/firsthand-logo.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.street,
      addressLocality: NAP.city,
      addressRegion: NAP.state,
      postalCode: NAP.zip,
      addressCountry: NAP.country,
    },
    areaServed: {
      "@type": "City",
      name: a.name,
      sameAs: `https://en.wikipedia.org/wiki/${a.name.replace(/\s+/g, "_")},_Florida`,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: a.geo.lat,
      longitude: a.geo.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: REVIEWS_SUMMARY.rating,
      reviewCount: REVIEWS_SUMMARY.count,
    },
    mainEntityOfPage: {
      "@type": "FAQPage",
      mainEntity: a.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  };
}

export default async function ServiceAreaPage({ params }: RouteProps) {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd(area)),
        }}
      />

      <Breadcrumbs
        items={[
          { href: "/service-areas", label: "Service areas" },
          { label: area.name },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="container-wide pt-6 pb-12 lg:pt-8 lg:pb-16">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-12 items-start">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {area.fullName}
              </p>
              {area.primary && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <Star className="h-3 w-3 fill-primary" strokeWidth={0} />
                  Primary
                </span>
              )}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
              {area.h1}
            </h1>
            <div className="mt-7 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {area.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="cta-pill inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold"
              >
                Get a free estimate in {area.name}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <TrackedContactLink
                href={`tel:${NAP.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-muted"
              >
                Call {NAP.phone}
              </TrackedContactLink>
            </div>
          </div>

          {(() => {
            const photos = photosByArea(area.slug);
            const hero =
              photos.find((p) => p.role === "area-hero") ?? photos[0];
            if (hero) {
              return (
                <SitePhoto
                  photo={hero}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  rounded="rounded-2xl"
                />
              );
            }
            return (
              <PhotoPlaceholder
                label={`${area.fullName} project photo coming soon`}
                aspect="aspect-[4/5]"
                variant="primary"
                className="rounded-2xl"
              />
            );
          })()}
        </div>
      </section>

      {/* ── Neighborhoods strip ────────────────────────────────────── */}
      <section className="bg-elevated section-tight">
        <div className="container-wide">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
            Where we work in {area.name}.
          </h2>
          <ul className="flex flex-wrap gap-2">
            {area.neighborhoods.map((n) => (
              <li
                key={n}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
              >
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Services we offer here ─────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              What we do here
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              Every service, in {area.name}.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              The full Firsthand service lineup is available across {area.name}.
              Click any service for details, pricing range, and FAQ.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_PAGES.map((s) => {
              const Icon = SERVICE_ICONS[s.slug] ?? Sprout;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-card-hover transition-all"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-base font-semibold tracking-tight mb-1">
                    {s.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {s.priceRange ?? s.timeline}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why locals choose Firsthand ────────────────────────────── */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Why {area.name}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              What {area.name} homeowners hire us for.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {area.whyLocal.map((item, i) => (
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

      {/* ── Local testimonial placeholder ──────────────────────────── */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                From {area.name} customers
              </p>
              <h2 className="font-display text-3xl sm:text-4xl leading-tight font-semibold tracking-tight">
                Reviews from your neighborhood.
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Customers across {area.name} have rated Firsthand 4.9 stars
                on Google. Browse all 154 reviews to see what neighbors are
                saying about recent work in the area.
              </p>
              <Link
                href="/reviews"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                See all reviews
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 sm:p-8 text-center">
              <div className="inline-flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-5 w-5 fill-cta text-cta"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                4.9
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Across 154 verified Google reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ─────────────────────────────────────────────────────── */}
      <section className="bg-elevated section-tight">
        <div className="container-wide">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
            {area.name} on the map.
          </h2>
          <GoogleMapsEmbed
            query={area.mapQuery}
            ariaLabel={`Map of ${area.fullName}`}
          />
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
              Questions specific to {area.name}.
            </h2>
            <FaqAccordion items={area.faqs} />
          </div>
        </div>
      </section>

      {/* ── Other areas ────────────────────────────────────────────── */}
      <section className="bg-elevated section-tight">
        <div className="container-wide">
          <div className="max-w-3xl mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Other service areas.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              We work across Central Florida. Pick another area for local
              specifics.
            </p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SERVICE_AREA_PAGES.filter((a) => a.slug !== area.slug).map((a) => (
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

      <CtaSection
        heading={`Working on a property in ${area.name}?`}
        subheading={`Tell us where and what you're thinking. We'll come out, walk it with you, and write up an honest estimate — usually within two business days.`}
      />
    </>
  );
}
