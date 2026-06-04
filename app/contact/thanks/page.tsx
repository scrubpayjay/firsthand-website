import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Thanks for your inquiry",
  description:
    "Thank you for your inquiry to Firsthand Lawn and Landscape. A customer service representative will be in touch shortly.",
  alternates: { canonical: `${SITE_URL}/contact/thanks` },
  robots: { index: false, follow: true },
};

const CONTACT_SOCIAL = {
  instagram:
    "https://www.instagram.com/firsthandlawnandlandscape?igsh=NzlhMzg0YW80M2hy&utm_source=qr",
  facebook:
    "https://www.facebook.com/share/14fJcF4AhWF/?mibextid=wwXIfr",
  tiktok:
    "https://www.tiktok.com/@firsthand_lawn_landscape?_r=1&_t=ZT-96e1xnrhYh4",
};

export default function ThanksPage() {
  return (
    <section className="container-wide py-20 lg:py-28">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cta/15 text-cta mb-6">
          <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
        </span>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight font-semibold tracking-tight">
          Thanks for your inquiry
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          A customer service representative will be in touch shortly. In the
          meantime, give us a follow on your favorite social media platforms!
        </p>

        <ul className="mt-10 flex items-center justify-center gap-6 sm:gap-8">
          <li>
            <a
              href={CONTACT_SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Firsthand Lawn and Landscape on Instagram (opens in new tab)"
              style={{ color: "#E1306C" }}
              className="inline-flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
            >
              <SiInstagram className="h-20 w-20 sm:h-24 sm:w-24" />
              <span className="sr-only">Instagram</span>
            </a>
          </li>
          <li>
            <a
              href={CONTACT_SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Firsthand Lawn and Landscape on Facebook (opens in new tab)"
              style={{ color: "#1877F2" }}
              className="inline-flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
            >
              <SiFacebook className="h-20 w-20 sm:h-24 sm:w-24" />
              <span className="sr-only">Facebook</span>
            </a>
          </li>
          <li>
            <a
              href={CONTACT_SOCIAL.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Firsthand Lawn and Landscape on TikTok (opens in new tab)"
              style={{ color: "#000000" }}
              className="inline-flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
            >
              <SiTiktok className="h-20 w-20 sm:h-24 sm:w-24" />
              <span className="sr-only">TikTok</span>
            </a>
          </li>
        </ul>

        <div className="mt-10 rounded-xl border border-border bg-card p-6 sm:p-8 text-left">
          <h2 className="font-semibold text-foreground mb-3 text-base">
            What happens next
          </h2>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </span>
              <span>
                A representative will reach out to gather any additional
                information and schedule an on-site assessment.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                2
              </span>
              <span>
                An on-site assessment will be performed to fully understand
                the scope of work, answer any questions, and provide any
                recommendations.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                3
              </span>
              <span>
                A formal proposal will be submitted the same day or up to 3
                business days depending on the scope of work requested.
              </span>
            </li>
          </ol>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Back to home
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            See recent projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
