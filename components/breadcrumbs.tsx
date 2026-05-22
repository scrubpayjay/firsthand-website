import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_URL } from "@/lib/site-config";

export interface Crumb {
  href?: string;
  label: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

/**
 * Visible breadcrumbs + BreadcrumbList JSON-LD in one component.
 * Renders the home link automatically as the first crumb.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const fullTrail: Crumb[] = [{ href: "/", label: "Home" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullTrail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="border-b border-border bg-muted/30"
      >
        <div className="container-wide py-3.5">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            {fullTrail.map((c, i) => {
              const isLast = i === fullTrail.length - 1;
              return (
                <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-text-faint" />
                  )}
                  {c.href && !isLast ? (
                    <Link
                      href={c.href}
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      {i === 0 && <Home className="h-3.5 w-3.5" />}
                      <span>{c.label}</span>
                    </Link>
                  ) : (
                    <span
                      aria-current={isLast ? "page" : undefined}
                      className={`inline-flex items-center gap-1 ${
                        isLast ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {i === 0 && <Home className="h-3.5 w-3.5" />}
                      {c.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
