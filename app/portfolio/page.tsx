import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Camera } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { SitePhoto } from "@/components/site-photo";
import { PHOTOS } from "@/lib/photos-manifest";
import {
  COMPANYCAM_GALLERIES,
  COMPANYCAM_GALLERY_URL,
  SITE_URL,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Portfolio — Recent landscape projects",
  description:
    "Browse Firsthand's recent landscape projects across Winter Park, Windermere, Bay Hill, College Park, and Orlando — sod, hardscape, irrigation, design installs.",
  alternates: { canonical: `${SITE_URL}/portfolio` },
};

// Three discipline-specific category cards at top, each deep-linking to
// Ryan's CompanyCam gallery for that category. Photo src is hand-picked
// from Ryan's 2026-05-24 curated batch.
const CATEGORY_CARDS = [
  {
    key: "lawnLandscape",
    photoSrc: "/photos/lawn-landscape-card-1.jpg",
    ...COMPANYCAM_GALLERIES.lawnLandscape,
  },
  {
    key: "hardscape",
    photoSrc: "/photos/hardscape-ryan-1.jpg",
    ...COMPANYCAM_GALLERIES.hardscape,
  },
  {
    key: "concrete",
    photoSrc: "/photos/concrete-ryan-1.jpg",
    ...COMPANYCAM_GALLERIES.concrete,
  },
] as const;

// Curated subset for the on-page gallery — order chosen for visual rhythm
// (mix of wide, square-ish, and portrait photos across services). Leads
// with 4 before/after composites, then Ryan's 2026-05-24 curated batch,
// then 2 older auto-pulled shots. Three weak photos removed 2026-05-25
// per Ryan's red-X feedback (landscape-1 yucca-overgrowth, winter-park-1
// oak-shadow-patchy-lawn, sod-2 white-ranch-concrete-walk).
const GALLERY_ORDER: string[] = [
  // 4 before/after composites lead the gallery
  "/photos/portfolio-before-after-1.jpg",
  "/photos/sod-installation-ryan-1.jpg",
  "/photos/portfolio-before-after-2.jpg",
  "/photos/portfolio-before-after-4.jpg",
  // Ryan-curated batch
  "/photos/landscape-ryan-3.jpg",
  "/photos/hardscape-ryan-3.jpg",
  "/photos/lawn-ryan-1.jpg",
  "/photos/hardscape-ryan-7.jpg",
  "/photos/landscape-ryan-7.jpg",
  "/photos/concrete-ryan-2.jpg",
  "/photos/landscape-ryan-10.jpg",
  "/photos/hardscape-ryan-11.jpg",
  "/photos/landscape-ryan-6.jpg",
  "/photos/hardscape-ryan-5.jpg",
  "/photos/concrete-ryan-3.jpg",
  "/photos/hardscape-ryan-12.jpg",
  // Older auto-pulled CompanyCam shots remaining (bamboo before/after
  // composite kept; windermere-1 + bay-hill-1 dropped 2026-05-26 per
  // Ryan's red-X feedback — see commit history).
  "/photos/bamboo-1.jpg",
  // New Ryan-curated tail
  "/photos/portfolio-ryan-replacement-1.jpg",
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
        </div>
      </section>

      {/* Category cards — each deep-links to Ryan's CompanyCam gallery
          for that discipline. Photo on each card is hand-picked from
          his 2026-05-24 curated batch. */}
      <section className="container-wide pb-12 lg:pb-16">
        <div className="mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Browse by category
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
            Three separate live galleries on CompanyCam — pick the
            discipline you&apos;re shopping for and the photos open in
            a new tab.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORY_CARDS.map((card) => {
            const photo = PHOTOS.find((p) => p.src === card.photoSrc);
            return (
              <a
                key={card.key}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-card transition-all"
              >
                {photo ? (
                  <SitePhoto
                    photo={photo}
                    aspect="aspect-[4/3]"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    rounded="rounded-none"
                  />
                ) : (
                  <div className="aspect-[4/3] bg-muted" aria-hidden />
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {card.label}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                  <p className="mt-3 text-xs font-medium text-primary">
                    Open CompanyCam gallery ↗
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Featured projects */}
      <section className="container-wide pb-16 lg:pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Recent projects
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            A selection of finished work from the last twelve months across
            Winter Park, Windermere, Bay Hill, College Park, and the rest of
            Central Florida.
          </p>
        </div>

        {(() => {
          const ordered = GALLERY_ORDER.map((src) =>
            PHOTOS.find((p) => p.src === src)
          ).filter((p): p is NonNullable<typeof p> => Boolean(p));
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {ordered.map((photo) => (
                <SitePhoto
                  key={photo.src}
                  photo={photo}
                  aspect="aspect-square"
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 48vw"
                  rounded="rounded-xl"
                />
              ))}
            </div>
          );
        })()}
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
