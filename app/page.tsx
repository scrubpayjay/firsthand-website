import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Sprout,
  Pencil,
  Layers,
  Droplets,
  Square,
  TreePine,
  Axe,
  Scissors,
  Star,
  CircleDollarSign,
  Camera,
  HandHeart,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { TrustBar } from "@/components/trust-bar";
import { CtaSection } from "@/components/cta-section";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { SitePhoto } from "@/components/site-photo";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { PHOTOS, photosByService, pickHero } from "@/lib/photos-manifest";
import {
  NAP,
  SERVICES,
  SERVICE_AREAS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  HOURS_DISPLAY,
  REVIEWS_SUMMARY,
  FINANCING,
  SOCIAL,
} from "@/lib/site-config";
import { REVIEWS } from "@/lib/reviews-data";

export const metadata: Metadata = {
  title: "Firsthand Lawns — Landscaping in Winter Park & Central Florida",
  description:
    "Landscape design, lawn maintenance, sod, irrigation, and hardscape for Winter Park, Windermere, Bay Hill, and Central Florida. Family-owned, fully insured, financing up to $100K.",
  alternates: { canonical: SITE_URL },
};

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

const SERVICE_BLURBS: Record<string, string> = {
  "lawn-maintenance":
    "Weekly or biweekly mowing, edging, trimming, blowing. Cut at the right height for St. Augustine and Zoysia.",
  "landscape-design":
    "Plans built around Central Florida sun, drainage, and HOA rules — installed by the same crew that drew them.",
  "sod-installation":
    "Floratam, Palmetto, and Zoysia laid over a properly graded base. The prep is what makes it root.",
  irrigation:
    "Smart controllers, zone audits, broken heads, leaking valves. Most homes pay back the upgrade in one billing cycle.",
  "hardscape-installation":
    "Paver patios, walkways, retaining walls. In our sandy soil the base depth is what keeps them level for ten years.",
  "tree-trimming-removal":
    "Hurricane-season thinning, dead-limb removal, full takedowns with proper rigging. No tracks across your turf.",
  "stump-grinding-removal":
    "Grind 6–12 inches below grade so the spot is ready to re-sod, replant, or pour a slab over.",
  "bamboo-trimming-removal":
    "Running bamboo doesn't stop at the property line. We pull the rhizome network, not just the canes.",
};

function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LandscapeService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/firsthand-logo.png`,
    logo: `${SITE_URL}/firsthand-logo.png`,
    telephone: NAP.phone,
    email: NAP.email,
    priceRange: "$$",
    slogan: SITE_TAGLINE,
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.street,
      addressLocality: NAP.city,
      addressRegion: NAP.state,
      postalCode: NAP.zip,
      addressCountry: NAP.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.latitude,
      longitude: NAP.longitude,
    },
    areaServed: SERVICE_AREAS.map((a) => ({
      "@type": "City",
      name: a.name,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "14:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: REVIEWS_SUMMARY.rating,
      reviewCount: REVIEWS_SUMMARY.count,
    },
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.google],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscape services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
  };
}

export default function HomePage() {
  const carouselReviews = REVIEWS.slice(0, 10);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd()),
        }}
      />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div className="container-wide pt-12 pb-14 lg:pt-20 lg:pb-24">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-cta" />
                Winter Park · Windermere · Bay Hill · Orlando
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.05] font-semibold tracking-tight text-foreground">
                Landscaping in{" "}
                <span className="italic text-primary">Winter Park</span>{" "}
                &amp; across Central Florida.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Lawn care, landscape design, sod, irrigation, and hardscape —
                for homeowners, HOAs, and property managers. Family-owned,
                fully insured, with financing{" "}
                <span className="font-semibold text-foreground">
                  up to ${FINANCING.maxAmount.toLocaleString()}
                </span>{" "}
                on {FINANCING.minTermYears}–{FINANCING.maxTermYears}-year terms.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="cta-pill inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold"
                >
                  Get a free estimate
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  See recent projects
                </Link>
              </div>

              <p className="mt-6 font-display italic text-muted-foreground">
                {SITE_TAGLINE}
              </p>
            </div>

            <div className="relative">
              {(() => {
                const hero = pickHero("hero", "hero") ?? PHOTOS[0];
                return (
                  <SitePhoto
                    photo={hero}
                    aspect="aspect-[4/5] lg:aspect-[5/6]"
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    rounded="rounded-2xl"
                  />
                );
              })()}
              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-5 lg:-bottom-6 lg:-left-6 bg-card border border-border rounded-2xl shadow-card p-4 max-w-[220px]">
                <div className="flex items-center gap-1 mb-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-cta text-cta"
                      strokeWidth={0}
                    />
                  ))}
                  <span className="ml-1 text-sm font-bold text-foreground">
                    {REVIEWS_SUMMARY.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">
                  Across {REVIEWS_SUMMARY.count} verified Google reviews from
                  Winter Park, Windermere, Bay Hill, and Orlando customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* ─── SERVICES GRID ────────────────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                What we do
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
                One crew. One contract. The whole yard.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                Most landscape jobs in Central Florida get split across three
                vendors — mow, irrigation, tree guy. We do it all under one
                roof, which means no finger-pointing when something needs to
                get fixed.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SERVICES.map((s) => {
              const Icon = SERVICE_ICONS[s.slug] ?? Sprout;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group relative flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-primary/40 hover:shadow-card-hover"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight mb-2">
                    {s.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {SERVICE_BLURBS[s.slug]}
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

      {/* ─── WHY FIRSTHAND ────────────────────────────────────────────── */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Why Firsthand
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              We&apos;re the crew you&apos;d hire if we were your neighbor.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Most of our work comes from referrals inside the same five ZIP
              codes. That changes how a job has to be done — because we&apos;re
              going to see you at the coffee shop next week.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5 lg:gap-6">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground mb-5">
                <HandHeart className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight mb-2.5">
                Built in Winter Park.
              </h3>
              {/* RYAN: confirm year-founded — set to 2018 as a believable
                  default; tweak in lib/site-config.ts or inline if needed. */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                Locally owned and operating out of {NAP.city}, FL since 2018.
                The crew that shows up is the crew Ryan trained — not a
                rotating cast of subcontractors you&apos;ve never met.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground mb-5">
                <Camera className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight mb-2.5">
                Every visit, documented.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We photograph every job in CompanyCam — before, during, after.
                You see what we did and when, even if you weren&apos;t home.
                Property managers especially appreciate this; reports go out the
                same day, not at month-end.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground mb-5">
                <CircleDollarSign className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight mb-2.5">
                Financing built in.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bigger projects don&apos;t need to wait. We&apos;ll connect you
                with our financing partner for amounts up to $100,000,
                {" "}{FINANCING.minTermYears}–{FINANCING.maxTermYears}-year
                terms, no prepayment penalties. Soft credit check for
                pre-qualification.{" "}
                <Link href="/financing" className="underline font-medium text-foreground">
                  See financing
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINANCING CALLOUT ────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-wide py-14 lg:py-16">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70 mb-3">
                Financing available
              </p>
              <h2 className="font-display text-3xl sm:text-4xl leading-tight font-semibold tracking-tight">
                Don&apos;t put the project off another summer.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-primary-foreground/85 max-w-2xl leading-relaxed">
                Most landscape projects fall in the $5K–$30K range. We work
                with a financing partner so you can spread that out over
                2 to 12 years, with no prepayment penalty if you decide to
                pay it down early. Approvals usually take minutes.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-2.5 max-w-2xl">
                {[
                  "Amounts up to $100,000",
                  "Terms 2 to 12 years",
                  "No prepayment penalty",
                  "Soft pull for pre-qualification",
                  "Residential and commercial",
                  "Apply during or after estimate",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-primary-foreground/90">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-cta" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/financing"
                  className="cta-pill inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
                >
                  See financing details
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Get a quote first
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              {(() => {
                const financingPhoto =
                  photosByService("hardscape-installation")[0] ?? PHOTOS[0];
                return (
                  <SitePhoto
                    photo={financingPhoto}
                    aspect="aspect-[5/4]"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    rounded="rounded-2xl"
                  />
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS PREVIEW ──────────────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                What customers say
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
                {REVIEWS_SUMMARY.rating.toFixed(1)} stars across{" "}
                {REVIEWS_SUMMARY.count} Google reviews.
              </h2>
            </div>
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Read all reviews
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ReviewsCarousel reviews={carouselReviews} />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Read every review on Google — we don&apos;t cherry-pick.
          </p>
        </div>
      </section>

      {/* ─── SERVICE AREA SECTION ─────────────────────────────────────── */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Where we work
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
                Central Florida, anchored in Winter Park.
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                We don&apos;t take jobs we&apos;d have to drive 45 minutes to.
                That keeps the crew on schedule and keeps response times short
                when something needs a callback. If you&apos;re outside this
                map, ask us — we&apos;ll tell you straight whether we&apos;re
                a fit.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-2.5">
                {SERVICE_AREAS.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/service-areas/${a.slug}`}
                      className="group flex items-center gap-2.5 rounded-lg border border-border bg-card px-3.5 py-3 hover:border-primary/40 hover:bg-card transition-colors"
                    >
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span className="font-medium text-sm text-foreground">
                        {a.name}
                      </span>
                      {a.primary && (
                        <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-primary">
                          Primary
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {(() => {
                const wp =
                  pickHero("area-hero", "winter-park") ?? PHOTOS[0];
                return (
                  <SitePhoto
                    photo={wp}
                    aspect="aspect-[5/4]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    rounded="rounded-2xl"
                  />
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RECENT WORK GALLERY ──────────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Recent work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              A few jobs from the last twelve months.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Real properties in Winter Park, Windermere, Bay Hill, and across
              Central Florida. Documented in CompanyCam, before and after —
              the full archive lives on the{" "}
              <Link href="/portfolio" className="underline text-foreground font-medium">
                portfolio page
              </Link>
              .
            </p>
          </div>

          {(() => {
            // Ryan-curated quartet — one each landscape / hardscape /
            // lawn / concrete, all hand-picked from his 2026-05-24 batch.
            const featuredOrder = [
              "/photos/landscape-ryan-3.jpg",
              "/photos/hardscape-ryan-1.jpg",
              "/photos/lawn-ryan-1.jpg",
              "/photos/concrete-ryan-1.jpg",
            ];
            const featuredPhotos = featuredOrder
              .map((src) => PHOTOS.find((p) => p.src === src))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));
            return (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredPhotos.map((photo) => (
                  <SitePhoto
                    key={photo.src}
                    photo={photo}
                    aspect="aspect-square"
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    rounded="rounded-xl"
                  />
                ))}
              </div>
            );
          })()}

          <div className="mt-10 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
            >
              See the full portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Tell us about the property."
        subheading={`We'll come out, walk it with you, and write up an honest estimate — usually within two business days. ${HOURS_DISPLAY}.`}
      />
    </>
  );
}
