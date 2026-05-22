import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock, ExternalLink, Tag } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { parseInline } from "@/components/blog-prose";
import {
  BLOG_POSTS,
  getBlogPost,
  type BlogPost,
  type BlogNode,
} from "@/lib/blog-posts-data";
import { SITE_URL, SITE_NAME, NAP } from "@/lib/site-config";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

function blogJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      worksFor: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      "@id": `${SITE_URL}/#business`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/firsthand-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    image: `${SITE_URL}/firsthand-logo.png`,
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function renderNode(node: BlogNode, index: number) {
  switch (node.type) {
    case "p":
      return (
        <p
          key={index}
          className="text-base sm:text-lg text-foreground leading-relaxed mb-5"
        >
          {parseInline(node.text)}
        </p>
      );
    case "h2":
      return (
        <h2
          key={index}
          className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mt-12 mb-5"
        >
          {parseInline(node.text)}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-8 mb-4"
        >
          {parseInline(node.text)}
        </h3>
      );
    case "ul":
      return (
        <ul
          key={index}
          className="list-disc pl-5 sm:pl-6 mb-6 space-y-2.5 marker:text-text-faint"
        >
          {node.items.map((item, i) => (
            <li
              key={i}
              className="text-base text-foreground leading-relaxed pl-1"
            >
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={index}
          className="list-decimal pl-5 sm:pl-6 mb-6 space-y-2.5 marker:text-text-faint marker:font-semibold"
        >
          {node.items.map((item, i) => (
            <li
              key={i}
              className="text-base text-foreground leading-relaxed pl-1"
            >
              {parseInline(item)}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside
          key={index}
          className="my-8 rounded-2xl border-l-4 border-primary bg-primary/5 px-5 py-5 sm:px-6"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-1.5">
            {node.title}
          </p>
          <p className="text-base text-foreground leading-relaxed">
            {parseInline(node.body)}
          </p>
        </aside>
      );
    case "photo":
      return (
        <div key={index} className="my-8">
          <PhotoPlaceholder
            label={node.label}
            aspect={node.aspect ?? "aspect-[3/2]"}
            className="rounded-2xl"
          />
        </div>
      );
    case "table":
      return (
        <figure key={index} className="my-8 -mx-5 sm:mx-0">
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {node.headers.map((h, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="text-left font-semibold text-foreground px-4 py-3 align-bottom"
                    >
                      {parseInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {node.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className="border-b last:border-b-0 border-border"
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-3 align-top ${
                          ci === 0
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {node.caption && (
            <figcaption className="text-xs text-muted-foreground mt-3 px-5 sm:px-0 italic">
              {parseInline(node.caption)}
            </figcaption>
          )}
        </figure>
      );
  }
}

export default async function BlogPostPage({ params }: RouteProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd(post)) }}
      />

      <Breadcrumbs
        items={[
          { href: "/blog", label: "Blog" },
          { label: post.title },
        ]}
      />

      <article>
        {/* Header */}
        <header className="container-prose pt-8 lg:pt-12 pb-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] font-semibold tracking-tight">
            {post.h1}
          </h1>

          <p className="mt-5 text-base text-muted-foreground">
            By{" "}
            <span className="font-medium text-foreground">
              {post.author.name}
            </span>
          </p>
        </header>

        {/* Hero photo */}
        <div className="container-prose pb-8">
          <PhotoPlaceholder
            label={post.heroPhotoLabel}
            aspect="aspect-[3/2]"
            variant="primary"
            className="rounded-2xl"
          />
        </div>

        {/* Body */}
        <div className="container-prose pb-12">
          {post.body.map((node, i) => renderNode(node, i))}
        </div>

        {/* Sources */}
        {post.sources.length > 0 && (
          <div className="container-prose pb-12">
            <div className="rounded-xl border border-border bg-muted/40 px-5 py-5 sm:px-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">
                Sources &amp; further reading
              </h2>
              <ul className="space-y-2.5 text-sm">
                {post.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1.5 text-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5 mt-1 shrink-0 text-muted-foreground" />
                      <span>
                        <span className="underline underline-offset-4">
                          {s.label}
                        </span>
                        {s.publisher && (
                          <span className="text-muted-foreground">
                            {" "}— {s.publisher}
                          </span>
                        )}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Related */}
        {post.related.length > 0 && (
          <div className="container-prose pb-12">
            <h2 className="font-display text-xl font-semibold tracking-tight mb-5">
              Related
            </h2>
            <ul className="space-y-3">
              {post.related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
                  >
                    <span>
                      <span className="block font-semibold text-foreground group-hover:text-primary">
                        {r.label}
                      </span>
                      {r.blurb && (
                        <span className="block text-sm text-muted-foreground mt-0.5">
                          {r.blurb}
                        </span>
                      )}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Author bio */}
        {post.author.bio && (
          <div className="container-prose pb-16">
            <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg font-bold"
                >
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </article>

      <CtaSection
        heading="Working on a project we should look at?"
        subheading={`Tell us about the property. We'll come out, walk it with you, and write up an honest estimate — usually within two business days. Call ${NAP.phone} or use the form.`}
      />
    </>
  );
}
