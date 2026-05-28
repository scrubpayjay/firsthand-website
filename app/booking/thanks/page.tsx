import type { Metadata } from "next";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Thanks for your inquiry",
  description:
    "Thank you for your inquiry to Firsthand Lawn and Landscape. Follow us on social to stay in the know.",
  alternates: { canonical: `${SITE_URL}/booking/thanks` },
  robots: { index: false, follow: true },
};

const BOOKING_SOCIAL = {
  instagram:
    "https://www.instagram.com/firsthandlawnandlandscape?igsh=NzlhMzg0YW80M2hy&utm_source=qr",
  facebook:
    "https://www.facebook.com/share/14fJcF4AhWF/?mibextid=wwXIfr",
  tiktok:
    "https://www.tiktok.com/@firsthand_lawn_landscape?_r=1&_t=ZT-96e1xnrhYh4",
};

export default function BookingThanksPage() {
  return (
    <section className="container-wide py-20 lg:py-28">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl leading-tight font-semibold tracking-tight">
          Thank you for your inquiry!
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          Give us a follow on all your social media platforms to stay
          in&nbsp;the&#8209;know.
        </p>

        <ul className="mt-10 flex items-center justify-center gap-5 sm:gap-6">
          <li>
            <a
              href={BOOKING_SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Firsthand Lawn and Landscape on Instagram (opens in new tab)"
              style={{ color: "#E1306C" }}
              className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
            >
              <SiInstagram className="h-14 w-14 sm:h-16 sm:w-16" />
              <span className="sr-only">Instagram</span>
            </a>
          </li>
          <li>
            <a
              href={BOOKING_SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Firsthand Lawn and Landscape on Facebook (opens in new tab)"
              style={{ color: "#1877F2" }}
              className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
            >
              <SiFacebook className="h-14 w-14 sm:h-16 sm:w-16" />
              <span className="sr-only">Facebook</span>
            </a>
          </li>
          <li>
            <a
              href={BOOKING_SOCIAL.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Firsthand Lawn and Landscape on TikTok (opens in new tab)"
              style={{ color: "#000000" }}
              className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
            >
              <SiTiktok className="h-14 w-14 sm:h-16 sm:w-16" />
              <span className="sr-only">TikTok</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
