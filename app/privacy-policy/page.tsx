import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Firsthand Lawn and Landscape, LLC collects, uses, shares, and protects your personal information — including SMS opt-in data.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

// Bump when the policy materially changes. TCR/carrier reviewers check the
// visible "Last updated" date against filed campaign dates.
const LAST_UPDATED = "July 8, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy policy" }]} />

      <article className="container-prose py-12 lg:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
          Privacy
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
          Privacy policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Firsthand Lawn and Landscape, LLC — Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-8 text-base text-foreground leading-relaxed">
          <p>
            Firsthand Lawn and Landscape, LLC (&ldquo;Firsthand,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
            the website firsthandlawns.com and provides lawn care and
            landscaping services in the greater Orlando, Florida area. This
            Privacy Policy explains what personal information we collect, how
            we use it, and who we share it with.
          </p>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              1. Personal information we collect
            </h2>
            <p>
              We collect the following personal information when you request a
              quote, fill out a form on our website, communicate with us, or
              become a customer:
            </p>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-muted-foreground">
              <li>
                <strong className="text-foreground">Contact information:</strong>{" "}
                your name, email address, phone number, and mailing/service
                address.
              </li>
              <li>
                <strong className="text-foreground">Service information:</strong>{" "}
                details about your property and the services you request,
                including notes, photos, quotes, appointments, and invoices.
              </li>
              <li>
                <strong className="text-foreground">Communications:</strong>{" "}
                the contents of messages you send us by web form, email,
                phone, or text message.
              </li>
              <li>
                <strong className="text-foreground">Website usage data:</strong>{" "}
                standard analytics information such as pages visited, device
                and browser type, and approximate location, collected via
                cookies and similar technologies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              2. How we use personal information
            </h2>
            <p>We use your personal information to:</p>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-muted-foreground">
              <li>Respond to quote requests and inquiries.</li>
              <li>
                Schedule, perform, and follow up on lawn care and landscaping
                services.
              </li>
              <li>
                Send appointment reminders, quote and estimate follow-ups,
                service updates, and billing or invoice notifications.
              </li>
              <li>
                Communicate with you by phone, email, or text message (SMS)
                where you have consented to receive text messages.
              </li>
              <li>Improve our website and services.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              3. Who we share personal information with
            </h2>
            <p>
              We do not sell your personal information. We share personal
              information only with service providers who help us operate our
              business — such as scheduling and invoicing software, payment
              processors, website hosting providers, and communications
              platforms — and only to the extent necessary for them to
              perform services on our behalf. These providers are not
              permitted to use your information for their own marketing
              purposes. We may also disclose information where required by
              law.
            </p>

            {/* Visually prominent SMS-consent callout. Carrier / TCR reviewers
                specifically look for the literal sentence "SMS consent is not
                shared with third parties." — do not rephrase. */}
            <div className="mt-5 rounded-lg border-l-4 border-primary bg-accent/40 px-5 py-4">
              <p className="font-semibold text-foreground">
                SMS consent is not shared with third parties.
              </p>
              <p className="mt-2 text-foreground">
                Text messaging originator opt-in data and consent will not be
                shared with or sold to any third parties or affiliates for
                marketing or promotional purposes. Mobile phone numbers
                collected for SMS purposes are used solely to deliver the
                messages you have consented to receive from Firsthand Lawn
                and Landscape, LLC.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              4. Text messaging (SMS)
            </h2>
            <p>
              If you opt in to receive text messages from us — for example,
              by checking the SMS consent box on a form on our website — we
              will use your phone number to send you messages such as
              appointment reminders, quote follow-ups, service updates, and
              billing notifications. Message frequency varies. Message and
              data rates may apply. You can opt out at any time by replying{" "}
              <strong>STOP</strong> to any message, and you can get help by
              replying <strong>HELP</strong>. For full details, see our{" "}
              <Link
                href="/sms-terms"
                className="text-primary underline underline-offset-2 hover:text-primary-hover"
              >
                SMS Terms &amp; Conditions
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              5. Cookies and analytics
            </h2>
            <p>
              Our website uses cookies and similar technologies to understand
              how visitors use the site and to improve our services. You can
              control cookies through your browser settings or through our
              cookie consent banner. When you accept cookies, we use Google
              Tag Manager (which loads Google Analytics) and Meta Pixel to
              measure traffic and conversion performance. We also use a live
              chat provider on the site. If you decline cookies, these are
              not loaded and the contact form still works.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              6. Data retention and security
            </h2>
            <p>
              We retain personal information for as long as needed to provide
              services, meet legal and accounting requirements, and resolve
              disputes. We use reasonable administrative and technical
              safeguards to protect your information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              7. Your choices
            </h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information by contacting us at the email below. You
              may opt out of text messages at any time by replying{" "}
              <strong>STOP</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              8. Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The
              &ldquo;Last updated&rdquo; date at the top reflects the most
              recent revision.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              9. Contact us
            </h2>
            <address className="not-italic">
              Firsthand Lawn and Landscape, LLC
              <br />
              Orlando, Florida
              <br />
              Email:{" "}
              <a
                href="mailto:firsthand@firsthandlawns.com"
                className="text-primary underline underline-offset-2 hover:text-primary-hover"
              >
                firsthand@firsthandlawns.com
              </a>
              <br />
              Website:{" "}
              <a
                href="https://www.firsthandlawns.com"
                className="text-primary underline underline-offset-2 hover:text-primary-hover"
              >
                www.firsthandlawns.com
              </a>
            </address>
          </section>
        </div>
      </article>
    </>
  );
}
