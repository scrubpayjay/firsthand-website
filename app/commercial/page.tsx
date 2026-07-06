import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Home,
  Store,
  Briefcase,
  Sprout,
  Pencil,
  Layers,
  Droplets,
  TreePine,
  Flower2,
  Sparkles,
  Camera,
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { TrustBar } from "@/components/trust-bar";
import { SitePhoto } from "@/components/site-photo";
import { FaqAccordion } from "@/components/faq-accordion";
import { TrackedContactLink } from "@/components/tracked-contact-link";
import { PHOTOS } from "@/lib/photos-manifest";
import {
  NAP,
  SERVICE_AREAS,
  SITE_NAME,
  SITE_URL,
  REVIEWS_SUMMARY,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Commercial Landscaping in Orlando & Central Florida",
  description:
    "Professional grounds maintenance and landscape services for HOAs, property managers, offices, and retail across Winter Park, Orlando, Windermere, and Central Florida. One crew, one contract, documented every visit.",
  alternates: { canonical: `${SITE_URL}/commercial` },
  openGraph: {
    title: "Commercial Landscaping in Orlando & Central Florida",
    description:
      "Grounds maintenance, landscape design, irrigation, and tree care for HOAs, property managers, offices, and retail across Central Florida.",
    url: `${SITE_URL}/commercial`,
    type: "website",
  },
};

const COMMERCIAL_SERVICES = [
  {
    icon: Sprout,
    name: "Commercial Lawn Maintenance",
    slug: "lawn-maintenance",
    body: "Weekly or biweekly mow, edge, trim, blow — cut at the right height for St. Augustine and Zoysia so the turf holds through summer.",
  },
  {
    icon: Pencil,
    name: "Landscape Design & Installation",
    slug: "landscape-design",
    body: "Plans built around Central Florida sun, drainage, and HOA rules — installed by the same crew that drew them.",
  },
  {
    icon: Droplets,
    name: "Irrigation",
    slug: "irrigation",
    body: "Smart controllers, zone audits, broken heads, leaking valves. Water waste on a commercial site is a monthly line-item — we fix it once.",
  },
  {
    icon: TreePine,
    name: "Tree & Palm Care",
    slug: "tree-trimming-removal",
    body: "Hurricane-season thinning, dead-limb removal, palm trimming, full takedowns with proper rigging. Certified and insured.",
  },
  {
    icon: Layers,
    name: "Sod Installation",
    slug: "sod-installation",
    body: "Floratam, Palmetto, and Zoysia laid over a properly graded base. The prep is what makes it root — and stay rooted.",
  },
  {
    icon: Flower2,
    name: "Seasonal Color & Bed Refresh",
    slug: "landscape-design",
    body: "Rotating annual color, fresh mulch, plant swap-outs. Keeps entryways, monument signs, and lobbies looking intentional year-round.",
  },
  {
    icon: Sparkles,
    name: "Grounds Management",
    slug: "lawn-maintenance",
    body: "Full-scope contract that bundles mow, beds, irrigation checks, and seasonal work into one monthly line item — with one point of contact.",
  },
  {
    icon: Briefcase,
    name: "Property Cleanups",
    slug: "property-cleanup",
    body: "Storm cleanup, transition cleanups between tenants, pre-listing curb appeal. Before/after documented in CompanyCam.",
  },
];

const WHO_ITS_FOR = [
  {
    icon: Home,
    title: "HOAs & residential communities",
    body: "Common areas, entryways, monument signs, retention ponds, and clubhouse grounds. Boards get consistent monthly service and one document trail — not three vendor invoices.",
  },
  {
    icon: Building2,
    title: "Property management companies",
    body: "Multi-site coverage across Central Florida. Same-day CompanyCam reports mean you close work orders without driving out to verify.",
  },
  {
    icon: Store,
    title: "Retail, restaurants & mixed-use",
    body: "First impressions at the front door. Rotating color, tight bed lines, and off-hours scheduling that doesn't get in the way of customers.",
  },
  {
    icon: Briefcase,
    title: "Offices & professional buildings",
    body: "Class A finishes for entries, courtyards, and parking-lot islands. Consistent crews so your tenants see the same faces every week.",
  },
];

const WHY_FIRSTHAND = [
  {
    icon: Camera,
    title: "Every visit, documented",
    body: "We photograph every commercial visit in CompanyCam — before, during, after. Property managers and HOA boards get a same-day report, not a month-end summary.",
  },
  {
    icon: ShieldCheck,
    title: "Fully licensed and insured",
    body: "General liability and workers' comp certificates available on request — with your management company or HOA named as additional insured when required.",
  },
  {
    icon: Star,
    title: `${REVIEWS_SUMMARY.rating.toFixed(1)} stars across ${REVIEWS_SUMMARY.count} reviews`,
    body: "Most of our work comes from referrals inside the same Central Florida ZIP codes. That's the standard we hold ourselves to on every commercial account.",
  },
  {
    icon: Sprout,
    title: "One crew. One contract. The whole property.",
    body: "Mow, beds, irrigation, trees, seasonal color — all in-house. No finger-pointing between vendors when something needs a fix.",
  },
];

const COMMERCIAL_FAQS = [
  {
    q: "Do you sign multi-year grounds-management contracts?",
    a: "Yes. Most commercial and HOA accounts run on a 12-month grounds-management agreement with a monthly flat rate covering mow, edge, bed work, and quarterly irrigation checks. Tree work, seasonal color, and one-off projects are quoted separately so nothing is buried.",
  },
  {
    q: "Can you name our management company or HOA as additional insured?",
    a: "Yes. We carry general liability and workers' comp and can furnish a COI with your management company, HOA, or ownership entity listed as additional insured before the first visit.",
  },
  {
    q: "How do you handle multi-site portfolios?",
    a: "We route the same crew to the same properties on the same day each week. Property managers get a single point of contact for all sites and same-day CompanyCam reports so you can close work orders without a site visit.",
  },
  {
    q: "Can you work outside of business hours to avoid disrupting tenants?",
    a: "For retail, restaurants, and offices where mid-day mowing isn't workable, we schedule early-morning or after-hours service. Ask when we walk the property.",
  },
  {
    q: "What's included in a commercial estimate?",
    a: "A walk of the property with you or your representative, a scope broken out by service line (mow, beds, irrigation, trees, seasonal color), a monthly rate, and any recommended one-time cleanups or improvements. Usually within two business days of the walk.",
  },
  {
    q: "Do you offer financing on larger commercial projects?",
    a: `Yes — landscape installations, hardscape, and irrigation overhauls up to $100,000 can be financed on 2–12 year terms with no prepayment penalty. Details on our financing page.`,
  },
];

function commercialJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/commercial#service`,
    name: "Commercial Landscaping",
    provider: {
      "@type": "LandscapeService",
      name: SITE_NAME,
      url: SITE_URL,
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
    serviceType: "Commercial Landscaping",
    description:
      "Grounds maintenance, landscape design, irrigation, and tree care for HOAs, property managers, offices, and retail properties across Central Florida.",
    url: `${SITE_URL}/commercial`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: REVIEWS_SUMMARY.rating,
      reviewCount: REVIEWS_SUMMARY.count,
    },
    mainEntityOfPage: {
      "@type": "FAQPage",
      mainEntity: COMMERCIAL_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  };
}

export default function CommercialPage() {
  const heroPhoto =
    PHOTOS.find((p) => p.src === "/photos/commercial-2.jpg") ??
    PHOTOS.find((p) => p.category === "commercial") ??
    PHOTOS[0];
  const galleryPhotos = PHOTOS.filter((p) => p.category === "commercial");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(commercialJsonLd()) }}
      />

      <Breadcrumbs items={[{ label: "Commercial" }]} />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="container-wide pt-6 pb-12 lg:pt-8 lg:pb-16">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-12 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Commercial landscaping
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
              Grounds maintenance for{" "}
              <span className="italic text-primary">Central Florida</span>{" "}
              properties.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              HOAs, property managers, offices, and retail across Winter Park,
              Orlando, Windermere, and the Central Florida metro. One crew,
              one contract, photographed every visit — so your board or
              management office can see the work without driving out to
              check.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="cta-pill inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold"
              >
                Request a commercial estimate
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

          <SitePhoto
            photo={heroPhoto}
            aspect="aspect-[4/5]"
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            rounded="rounded-2xl"
          />
        </div>
      </section>

      <TrustBar />

      {/* ── Intro / value prop ─────────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Why Firsthand for commercial
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              Professional grounds care, without the vendor juggling.
            </h2>
            <div className="mt-6 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Most commercial properties in Central Florida end up with a
                stack of vendors — one for the mow, one for irrigation, one
                for tree work, someone else for seasonal color. When
                something goes wrong at the entryway, no one owns it.
              </p>
              <p>
                We run every service in-house. That means one monthly line
                item, one point of contact, and a single crew that knows the
                property. Every visit is documented in CompanyCam and sent
                to you the same day, so boards, property managers, and
                owners can close work orders without a site visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Commercial services grid ───────────────────────────────── */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <div className="max-w-3xl mb-10 lg:mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              What we do on commercial sites
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              Every service, under one contract.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Bundle any combination for a single monthly rate, or start
              with grounds maintenance and add lines as the property needs
              them.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {COMMERCIAL_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.name}
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
                    {s.body}
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

      {/* ── Who it's for ───────────────────────────────────────────── */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Who we work with
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              Built for commercial and community properties.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {WHO_ITS_FOR.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-6 sm:p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground mb-5">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
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
              The standards we hold on every commercial account.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {WHY_FIRSTHAND.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-6 sm:p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground mb-5">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Commercial work gallery ────────────────────────────────── */}
      {galleryPhotos.length > 0 && (
        <section className="section bg-background">
          <div className="container-wide">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Recent commercial work
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
                Central Florida properties, documented.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                Every commercial visit is photographed in CompanyCam. The
                full portfolio lives on the{" "}
                <Link
                  href="/portfolio"
                  className="underline text-foreground font-medium"
                >
                  portfolio page
                </Link>
                .
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryPhotos.slice(0, 3).map((photo) => (
                <SitePhoto
                  key={photo.src}
                  photo={photo}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  rounded="rounded-xl"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Service area ───────────────────────────────────────────── */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <div className="max-w-3xl mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Where we work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight">
              Commercial coverage across Central Florida.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              We route the same crews across a tight Orlando-metro footprint
              so response times stay short. Managing a portfolio outside
              this list? Ask us — we&apos;ll tell you straight whether
              we&apos;re a fit.
            </p>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {SERVICE_AREAS.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/service-areas/${a.slug}`}
                  className="group flex items-center gap-2.5 rounded-lg border border-border bg-card px-3.5 py-3 hover:border-primary/40 transition-colors"
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
      </section>

      {/* ── What's included in a commercial estimate ───────────────── */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Getting started
              </p>
              <h2 className="font-display text-3xl sm:text-4xl leading-tight font-semibold tracking-tight">
                What a commercial estimate looks like.
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                No satellite-guessed per-square-foot quotes. We walk the
                property with you or your representative, scope each
                service line, and put a real number on paper — usually
                within two business days.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "On-site property walk with a Firsthand estimator",
                  "Scope broken out by service line (mow, beds, irrigation, trees, color)",
                  "Monthly grounds-management rate — flat, not per-visit surprises",
                  "Any recommended one-time cleanups or improvements listed separately",
                  "COI with your entity named as additional insured, on request",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="cta-pill inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
                >
                  Request a commercial estimate
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
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
                {REVIEWS_SUMMARY.rating.toFixed(1)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Across {REVIEWS_SUMMARY.count} verified Google reviews from
                Central Florida customers.
              </p>
              <Link
                href="/reviews"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Read all reviews
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ───────────────────────────────────────────────────── */}
      <section className="section bg-elevated">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              FAQ
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold tracking-tight mb-8">
              Commercial questions we get asked.
            </h2>
            <FaqAccordion items={COMMERCIAL_FAQS} />
          </div>
        </div>
      </section>

      <CtaSection
        heading="Tell us about the property."
        subheading="We'll come out, walk it with you or your representative, and write up an honest commercial estimate — usually within two business days."
        primaryLabel="Request a commercial estimate"
      />
    </>
  );
}
