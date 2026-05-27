import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { BLOG_POSTS } from "@/lib/blog-posts-data";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "The Firsthand Journal — Central Florida landscape notes & guides",
  description:
    "Notes from the field on Central Florida landscape care — seasonal guides, sod comparisons, hurricane prep, HOA-friendly designs. Written by Ryan Hanus.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
  const [featured, ...rest] = sorted;

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <section className="container-wide pt-6 pb-12 lg:pt-8 lg:pb-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Notes from the field
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
            The Firsthand Journal.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Short, practical writing on Central Florida landscape care —
            seasonal guides, sod comparisons, hurricane prep, HOA-friendly
            plant palettes, project showcases. The kind of stuff we end up
            explaining to customers twice a week anyway.
          </p>
        </div>

        {featured && (
          <article className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-stretch rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  <Tag className="h-3 w-3" />
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(featured.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readTimeMinutes} min read
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-tight font-semibold tracking-tight">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                {featured.description}
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline self-start"
              >
                Read the post
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div
              className="lg:order-last min-h-[260px] bg-gradient-to-br from-primary/15 via-primary/8 to-primary/20"
              aria-hidden="true"
            />
          </article>
        )}
      </section>

      {/* Post grid */}
      {rest.length > 0 && (
        <section className="container-wide pb-16 lg:pb-20">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
            More posts.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-card-hover transition-all"
              >
                <div
                  className="aspect-[3/2] bg-gradient-to-br from-muted via-elevated to-muted"
                  aria-hidden="true"
                />
                <div className="flex-1 flex flex-col p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5">
                    <span className="font-semibold uppercase tracking-wider text-primary">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.readTimeMinutes} min</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Read
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Email capture */}
      <section className="bg-elevated section-tight">
        <div className="container-wide">
          <div className="max-w-xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
            <div className="flex items-start gap-3 mb-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Get notified when new posts go live
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  No spam. We&apos;ll email when we publish, which won&apos;t
                  be often.
                </p>
              </div>
            </div>

            <form
              action="/api/contact"
              method="post"
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="hidden"
                name="service"
                value="Multiple / Not sure"
              />
              <input
                type="hidden"
                name="city"
                value="Other Central Florida"
              />
              <input type="hidden" name="name" value="Newsletter signup" />
              <input type="hidden" name="phone" value="0000000000" />
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
                className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
              />
              <button
                type="submit"
                className="cta-pill inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
              >
                Notify me
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Reading this because you have a project in mind?"
        subheading="Skip to the part where we walk your property and write up an honest estimate. Usually within two business days."
      />
    </>
  );
}
