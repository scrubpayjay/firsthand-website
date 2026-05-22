import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-posts-data";

export default function BlogPostNotFound() {
  return (
    <section className="container-wide py-20 lg:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
          Not found
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
          That post doesn&apos;t exist.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Here&apos;s what we&apos;ve published.
        </p>
        <ul className="mt-8 space-y-3">
          {BLOG_POSTS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:border-primary/40"
              >
                {p.title}
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
