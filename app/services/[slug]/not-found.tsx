import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/site-config";

export default function ServiceNotFound() {
  return (
    <section className="container-wide py-20 lg:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
          Not found
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
          We couldn&apos;t find that service.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Here&apos;s the full list of what we do — pick the closest match and
          we&apos;ll go from there.
        </p>
        <ul className="mt-8 grid sm:grid-cols-2 gap-3">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:border-primary/40"
              >
                {s.name}
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
