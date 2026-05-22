import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Camera } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { COMPANYCAM_GALLERY_URL, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Portfolio — Recent landscape projects | Firsthand Lawns",
  description:
    "Browse Firsthand's recent landscape projects across Winter Park, Windermere, Bay Hill, and Orlando — sod, hardscape, irrigation, design installs.",
  alternates: { canonical: `${SITE_URL}/portfolio` },
};

interface ProjectFeature {
  area: string;
  scope: string;
  before: string;
  after: string;
}

const FEATURED: ProjectFeature[] = [
  {
    area: "Winter Park",
    scope: "Full front-yard redesign — beds, sod, lighting",
    before: "Tired hedge along the walkway, patchy St. Augustine, no plant variety",
    after: "Muhly grass + dwarf firebush mix, fresh Floratam sod, low-voltage path lighting",
  },
  {
    area: "Windermere (Isleworth HOA)",
    scope: "HOA-compliant front bed redesign with submittal",
    before: "Overgrown beds, ARC violation notice on file",
    after: "Plumbago, ixora, and dwarf yaupon — submitted and approved on first pass",
  },
  {
    area: "Bay Hill",
    scope: "Travertine patio + outdoor kitchen base",
    before: "Failing concrete slab, no shade structure",
    after: "16x22 travertine patio, properly graded base, kitchen utilities stubbed",
  },
  {
    area: "College Park",
    scope: "Sod replacement + irrigation overhaul",
    before: "Chinch-bug-damaged front lawn, irrigation leaking through meter",
    after: "Fresh Floratam, four zones rebuilt, smart controller installed",
  },
  {
    area: "Doctor Phillips",
    scope: "Backyard renovation — design + install in 11 days",
    before: "Bare-dirt yard from pool removal",
    after: "Zoysia sod, paver border, four palm clusters, drip irrigation in beds",
  },
  {
    area: "Audubon Park (Orlando)",
    scope: "Pre-hurricane tree thinning",
    before: "Two heavy laurel oaks overhanging the roof",
    after: "Crowns thinned and balanced — held through 2024 storm season",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Portfolio" }]} />

      <section className="container-wide pt-6 pb-12 lg:pt-8 lg:pb-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Portfolio
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
            Recent projects across Central Florida.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Every project we run is photographed in CompanyCam — before,
            during, after, every visit. Below is a selection of recent
            installs and overhauls. The complete project archive lives on our
            CompanyCam gallery (updated continuously, no curation).
          </p>
        </div>

        {/* CompanyCam callout */}
        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Camera className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-1">
                Browse the full live gallery
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our complete project archive — every photo, every site, every
                update — lives on CompanyCam. No filtering, no curation. It&apos;s
                the same view our property-management clients see.
              </p>
            </div>
            <a
              href={COMPANYCAM_GALLERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pill inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap"
            >
              Open gallery
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground sm:pl-[3.5rem]">
            [RYAN: Once we&apos;ve built the on-site portfolio gallery, swap
            this callout for the inline grid. CompanyCam stays as the
            permanent project archive either way.]
          </p>
        </div>
      </section>

      {/* Featured projects */}
      <section className="container-wide pb-16 lg:pb-20">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-10">
          Featured projects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((p, i) => (
            <article
              key={i}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <div className="grid grid-cols-2">
                <PhotoPlaceholder
                  label={`BEFORE — ${p.before}`}
                  aspect="aspect-square"
                  className="rounded-none border-0 border-r"
                />
                <PhotoPlaceholder
                  label={`AFTER — ${p.after}`}
                  aspect="aspect-square"
                  variant="primary"
                  className="rounded-none border-0"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                  {p.area}
                </p>
                <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">
                  {p.scope}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Project mix */}
      <section className="bg-elevated section-tight">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                What we work on
              </p>
              <h2 className="font-display text-3xl sm:text-4xl leading-tight font-semibold tracking-tight">
                Residential and commercial. Anything in between.
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Most of our portfolio is single-family homes in Winter Park,
                Windermere, Bay Hill, and the surrounding neighborhoods. We
                also work with HOAs, property management firms, and a handful
                of high-rise residentials and commercial sites across Orlando.
              </p>
            </div>

            <div>
              <ul className="space-y-3">
                {[
                  ["Single-family homes", "Front yards, full backyard renovations, ongoing maintenance"],
                  ["HOAs & ARC submittals", "Designs that get approved on the first round — Windermere, Bay Hill, Doctor Phillips"],
                  ["Property managers", "Multi-property maintenance contracts with CompanyCam reporting"],
                  ["Commercial sites", "Office parks, mixed-use, restaurants — Sand Lake Road and Restaurant Row"],
                  ["High-rise residential", "Common-area landscape, planter rebuilds, irrigation tie-ins"],
                ].map(([title, body]) => (
                  <li
                    key={title}
                    className="rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Have a project in mind?"
        subheading="The fastest way to a quote is a site walk. We'll come out, look at what's there, and tell you what's actually possible — including what it'll cost."
      />
    </>
  );
}
