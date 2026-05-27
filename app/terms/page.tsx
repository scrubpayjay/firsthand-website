import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SITE_NAME, NAP, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Terms governing the use of firsthandlawns.com.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  const lastUpdated = "May 22, 2026"; // [RYAN: bump when terms materially change]

  return (
    <>
      <Breadcrumbs items={[{ label: "Terms" }]} />

      <article className="container-prose py-12 lg:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
          Terms
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
          Terms of service
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-10 space-y-8 text-base text-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              Acceptance of terms
            </h2>
            <p>
              By using this website, you agree to these terms. If you
              don&apos;t agree, please don&apos;t use the site. These terms
              apply to information published here and the contact and estimate
              forms — separate contracts govern work we perform on a property.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              About {SITE_NAME}
            </h2>
            <p>
              {SITE_NAME} is a Florida landscape company located at{" "}
              {NAP.street}, {NAP.city}, {NAP.state} {NAP.zip}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              Estimates and quotes
            </h2>
            <p>
              Any prices, timelines, or service descriptions on this site are
              for general information. An actual estimate requires a site visit
              and is delivered in a separate written quote. Web content does
              not constitute a contract.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              Photo and project content
            </h2>
            <p>
              Photographs of completed projects shown on this site are from
              actual {SITE_NAME} work. Customer names are shown only with
              consent. If you&apos;re a customer and want a photo of your
              property removed, email {NAP.email} and we&apos;ll take it down.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              Intellectual property
            </h2>
            <p>
              All content on this site — text, photos, design — belongs to{" "}
              {SITE_NAME} unless otherwise noted. Don&apos;t republish or
              reuse without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              No warranties on site content
            </h2>
            <p>
              We try to keep this site accurate, but we don&apos;t guarantee
              that information is current or error-free. Always confirm
              specifics with us by phone or written quote before relying on
              them.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of the State of Florida.
              Any disputes are subject to courts in Orange County, FL.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              Contact
            </h2>
            <p>
              Questions about these terms? Email {NAP.email} or call{" "}
              {NAP.phone}.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
