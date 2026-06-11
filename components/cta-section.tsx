import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { NAP } from "@/lib/site-config";
import { TrackedContactLink } from "@/components/tracked-contact-link";

interface CtaSectionProps {
  heading?: string;
  subheading?: string;
  primaryHref?: string;
  primaryLabel?: string;
}

export function CtaSection({
  heading = "Ready to start a project?",
  subheading = "Tell us about the property. We'll come out, walk it with you, and give you a real estimate — usually within two business days.",
  primaryHref = "/contact",
  primaryLabel = "Get a free estimate",
}: CtaSectionProps) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-wide py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] font-semibold tracking-tight">
              {heading}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/85 max-w-2xl">
              {subheading}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:items-end">
            <Link
              href={primaryHref}
              className="cta-pill inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold whitespace-nowrap"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <TrackedContactLink
              href={`tel:${NAP.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 bg-transparent px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 whitespace-nowrap"
            >
              <Phone className="h-4 w-4" />
              {NAP.phone}
            </TrackedContactLink>
          </div>
        </div>
      </div>
    </section>
  );
}
