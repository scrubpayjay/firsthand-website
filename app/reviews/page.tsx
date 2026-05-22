import type { Metadata } from "next";
import { Star, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { REVIEWS } from "@/lib/reviews-data";
import { REVIEWS_SUMMARY, SITE_URL, SOCIAL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Reviews — what our customers say | Firsthand Lawns",
  description: `Read ${REVIEWS_SUMMARY.count}+ verified Google reviews of Firsthand Lawns from Winter Park, Windermere, Bay Hill, College Park, and Orlando customers. 5.0 ★ average.`,
  alternates: { canonical: `${SITE_URL}/reviews` },
};

const formatDate = (d: string) => {
  const [y, m] = d.split("-");
  const month = new Date(Number(y), Number(m) - 1, 1).toLocaleString("en-US", {
    month: "long",
  });
  return `${month} ${y}`;
};

export default function ReviewsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Reviews" }]} />

      <section className="container-wide pt-6 pb-12 lg:pt-8 lg:pb-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Reviews
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
            What our customers say.
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-6 w-6 fill-cta text-cta" strokeWidth={0} />
              ))}
              <span className="ml-2 text-2xl font-display font-bold text-foreground">
                {REVIEWS_SUMMARY.rating.toFixed(1)}
              </span>
            </div>
            <p className="text-base text-muted-foreground">
              <span className="font-semibold text-foreground">
                {REVIEWS_SUMMARY.count} verified Google reviews
              </span>{" "}
              · {REVIEWS_SUMMARY.source}
            </p>
            <a
              href={SOCIAL.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View on Google
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            Below are excerpts from a representative cross-section of our
            reviews — by service, by neighborhood, by year. We&apos;ve never
            paid for a review or asked a customer to remove one. If something
            goes wrong on a job, the right answer is to fix it, not to bury it.
          </p>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="container-wide pb-16 lg:pb-20">
        <ul
          aria-label="Customer reviews"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {REVIEWS.map((r) => (
            <li
              key={`${r.name}-${r.date}-${r.service}`}
              className="rounded-xl border border-border bg-card p-6 flex flex-col"
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-cta text-cta"
                    strokeWidth={0}
                  />
                ))}
                <span className="ml-2 text-xs text-muted-foreground">
                  {formatDate(r.date)}
                </span>
              </div>
              <blockquote className="text-sm text-foreground leading-relaxed flex-1">
                &ldquo;{r.excerpt}&rdquo;
              </blockquote>
              <figcaption className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-semibold text-foreground">
                  {r.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {r.area} · {r.service}
                </p>
              </figcaption>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center text-center">
          <p className="text-sm text-muted-foreground mb-3">
            These are a representative cross-section. Read every review on Google.
          </p>
          <a
            href={SOCIAL.google}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Read all {REVIEWS_SUMMARY.count} reviews on Google
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <CtaSection
        heading="Want your name on the list next year?"
        subheading="Tell us about your property and we'll write up an honest estimate. The reviews above mostly started with a five-minute phone call."
      />
    </>
  );
}
