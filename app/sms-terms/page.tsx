import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "SMS terms & conditions",
  description:
    "SMS program terms for text messages from Firsthand Lawn and Landscape, LLC — message types, frequency, opt-out, and help instructions.",
  alternates: { canonical: `${SITE_URL}/sms-terms` },
};

const LAST_UPDATED = "July 8, 2026";

export default function SmsTermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "SMS terms & conditions" }]} />

      <article className="container-prose py-12 lg:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
          SMS
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
          SMS terms &amp; conditions
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Firsthand Lawn and Landscape, LLC — Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-8 text-base text-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              1. Program description
            </h2>
            <p>
              By opting into SMS from a web form or other medium, you are
              agreeing to receive SMS messages from Firsthand Lawn and
              Landscape, LLC (&ldquo;Firsthand&rdquo;). The types of messages
              you can expect to receive include:
            </p>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-muted-foreground">
              <li>Appointment and service visit reminders</li>
              <li>Quote and estimate follow-ups</li>
              <li>Scheduling confirmations and updates</li>
              <li>Billing and invoice notifications</li>
              <li>
                Customer care and conversational messages responding to your
                inquiries
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              2. Message frequency
            </h2>
            <p>
              Message frequency may vary depending on your service activity
              and communications with us.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              3. Message and data rates
            </h2>
            <p>
              Message and data rates may apply. Charges depend on your mobile
              carrier and plan. Please contact your wireless provider with
              questions about your plan.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              4. Opting out
            </h2>
            <p>
              <strong>To opt out at any time, text STOP</strong> in reply to
              any message you receive from us. After you send STOP, we will
              send a final message confirming you have been unsubscribed, and
              you will no longer receive SMS messages from us unless you opt
              in again.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              5. Help and support
            </h2>
            <p>
              <strong>
                For assistance, text HELP or visit www.firsthandlawns.com
              </strong>
              . You can also email us at{" "}
              <a
                href="mailto:firsthand@firsthandlawns.com"
                className="text-primary underline underline-offset-2 hover:text-primary-hover"
              >
                firsthand@firsthandlawns.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              6. Privacy
            </h2>
            <p>
              Visit{" "}
              <Link
                href="/privacy-policy"
                className="text-primary underline underline-offset-2 hover:text-primary-hover"
              >
                https://www.firsthandlawns.com/privacy-policy
              </Link>{" "}
              for our Privacy Policy and{" "}
              <Link
                href="/sms-terms"
                className="text-primary underline underline-offset-2 hover:text-primary-hover"
              >
                https://www.firsthandlawns.com/sms-terms
              </Link>{" "}
              for these SMS Terms &amp; Conditions. SMS consent is not shared
              with third parties or affiliates for marketing or promotional
              purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              7. Carrier disclaimer
            </h2>
            <p>Carriers are not liable for any delayed or undelivered messages.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              8. Eligibility and changes
            </h2>
            <p>
              You must be the account holder of the mobile number provided,
              or have the account holder&rsquo;s permission, and be 18 years
              of age or older to opt in. We may update these SMS Terms
              &amp; Conditions from time to time; the &ldquo;Last
              updated&rdquo; date above reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
              9. Contact
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
