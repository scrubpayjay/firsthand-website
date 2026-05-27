import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SITE_NAME, NAP, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Firsthand Lawns collects, uses, and protects your information.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  const lastUpdated = "May 22, 2026"; // [RYAN: bump when policy materially changes]

  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy" }]} />

      <article className="container-prose py-12 lg:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
          Privacy
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
          Privacy policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>

        <div className="prose-section mt-10 space-y-8 text-base text-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              Who we are
            </h2>
            <p>
              This site is operated by {SITE_NAME}, located at {NAP.street},{" "}
              {NAP.city}, {NAP.state} {NAP.zip}. You can reach us at{" "}
              {NAP.phone} or {NAP.email}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              What we collect
            </h2>
            <p>We collect two categories of information:</p>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-muted-foreground">
              <li>
                <strong className="text-foreground">Information you give us</strong> —
                name, email, phone number, address, and any details about
                your property you share when you contact us or request an
                estimate.
              </li>
              <li>
                <strong className="text-foreground">Automatic information</strong> —
                standard site analytics (pages visited, referring site,
                approximate location, browser type). We use this to improve
                the site and to measure where customers find us.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              Cookies and tracking
            </h2>
            <p>
              When you accept cookies, we use Google Tag Manager (which loads
              Google Analytics) and Meta Pixel to measure traffic and conversion
              performance. We also use Tidio for live chat. You can decline
              cookies and we won&apos;t load these — site functionality and
              the contact form still work either way.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              How we use your information
            </h2>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-muted-foreground">
              <li>To respond to estimate requests and customer questions.</li>
              <li>To schedule and run jobs you&apos;ve hired us for.</li>
              <li>To send occasional updates if you&apos;ve subscribed.</li>
              <li>To improve the site and our service offerings.</li>
            </ul>
            <p className="mt-3">
              We don&apos;t sell your information. We don&apos;t share it
              with third parties for marketing.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              Service providers
            </h2>
            <p>
              We use a small number of third-party providers to operate this
              site: hosting (Vercel), email delivery (Resend), analytics
              (Google), advertising measurement (Meta), and live chat (Tidio).
              These providers process information under their own privacy
              terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              Your choices
            </h2>
            <p>
              You can ask us to delete the information you&apos;ve given us by
              emailing {NAP.email}. You can also disable cookies in your
              browser or in our consent banner.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              Changes
            </h2>
            <p>
              If we change this policy in a material way, we&apos;ll update
              the date at the top. If you&apos;d like a copy of an older
              version, just ask.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
