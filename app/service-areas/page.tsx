import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { SERVICE_AREA_PAGES } from "@/lib/service-areas-data";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Service Areas — Winter Park, Windermere, Bay Hill, College Park, Orlando",
  description:
    "Firsthand Lawns serves Central Florida — Winter Park (primary), Bay Hill, Bella Collina, Lake Nona, and more. Pick your area for local specifics.",
  alternates: { canonical: `${SITE_URL}/service-areas` },
};

export default function ServiceAreasIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Service areas" }]} />

      <section className="container-wide pt-6 pb-10 lg:pt-8 lg:pb-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Service areas
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
            Central Florida, anchored in Winter Park.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We don&apos;t take jobs we&apos;d have to drive 45 minutes to.
            That keeps the crew on schedule and response times short. Pick
            your area below for the neighborhoods we serve, local plant
            recommendations, and city-specific FAQs.
          </p>
        </div>
      </section>

      <section className="container-wide pb-16 lg:pb-20">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICE_AREA_PAGES.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/service-areas/${a.slug}`}
                className="group flex flex-col h-full rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  {a.primary && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                      <Star className="h-3 w-3 fill-primary" strokeWidth={0} />
                      Primary
                    </span>
                  )}
                </div>
                <h2 className="font-display text-xl font-semibold tracking-tight mb-2">
                  {a.fullName}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {a.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {a.neighborhoods.slice(0, 3).map((n) => (
                    <li
                      key={n}
                      className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 pt-4 border-t border-border inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  See {a.name} services
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaSection />
    </>
  );
}
