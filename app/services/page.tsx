import type { Metadata } from "next";
import Link from "next/link";
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
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { SERVICE_PAGES } from "@/lib/services-data";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Landscape Services — Lawn, Sod, Design, Irrigation",
  description:
    "Lawn maintenance, landscape design, sod, irrigation, hardscape, and tree work for Winter Park, Windermere, Bay Hill, and Orlando. One crew, the whole yard.",
  alternates: { canonical: `${SITE_URL}/services` },
};

const ICONS: Record<string, typeof Sprout> = {
  "lawn-maintenance": Sprout,
  "landscape-design": Pencil,
  "sod-installation": Layers,
  irrigation: Droplets,
  "hardscape-installation": Square,
  "tree-trimming-removal": TreePine,
  "stump-grinding-removal": Axe,
  "bamboo-trimming-removal": Scissors,
};

export default function ServicesIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Services" }]} />

      <section className="container-wide pt-6 pb-10 lg:pt-8 lg:pb-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Services
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
            One crew. The whole yard.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We run every service in-house — mow crew, design, sod, irrigation,
            hardscape, tree work — across Winter Park, Windermere, Bay Hill,
            and Orlando. That means no handoffs between contractors when
            something needs a fix.
          </p>
        </div>
      </section>

      <section className="container-wide pb-16 lg:pb-20">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICE_PAGES.map((s) => {
            const Icon = ICONS[s.slug] ?? Sprout;
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex flex-col h-full rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-card-hover transition-all"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h2 className="font-display text-xl font-semibold tracking-tight mb-2">
                    {s.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {s.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {s.priceRange ?? s.timeline}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-primary">
                      Details
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaSection />
    </>
  );
}
