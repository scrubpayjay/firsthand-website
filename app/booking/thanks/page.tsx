import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Thanks for booking",
  description:
    "Thank you for booking with Firsthand Lawn and Landscape. Follow us on social to stay in the know.",
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
          Thank you for booking with us!
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
              className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
            >
              <InstagramIcon className="h-14 w-14 sm:h-16 sm:w-16" />
              <span className="sr-only">Instagram</span>
            </a>
          </li>
          <li>
            <a
              href={BOOKING_SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Firsthand Lawn and Landscape on Facebook (opens in new tab)"
              className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
            >
              <FacebookIcon className="h-14 w-14 sm:h-16 sm:w-16" />
              <span className="sr-only">Facebook</span>
            </a>
          </li>
          <li>
            <a
              href={BOOKING_SOCIAL.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Firsthand Lawn and Landscape on TikTok (opens in new tab)"
              className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
            >
              <TikTokIcon className="h-14 w-14 sm:h-16 sm:w-16" />
              <span className="sr-only">TikTok</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient
          id="ig-grad"
          cx="0.3"
          cy="1.1"
          r="1.2"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#FFDD55" />
          <stop offset="0.1" stopColor="#FFDD55" />
          <stop offset="0.5" stopColor="#FF543E" />
          <stop offset="1" stopColor="#C837AB" />
        </radialGradient>
        <linearGradient
          id="ig-grad-2"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#3771C8" />
          <stop offset="0.5" stopColor="#3771C8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#ig-grad)" />
      <rect width="64" height="64" rx="14" fill="url(#ig-grad-2)" />
      <g fill="none" stroke="#fff" strokeWidth="3.5">
        <rect x="14" y="14" width="36" height="36" rx="10" />
        <circle cx="32" cy="32" r="9" />
      </g>
      <circle cx="43" cy="21" r="2.5" fill="#fff" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect width="64" height="64" rx="14" fill="#1877F2" />
      <g transform="translate(8 8) scale(2)" fill="#fff">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.99 22 12z" />
      </g>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  // Black rounded square with the music-note glyph in three overlapping
  // layers — cyan offset NW, magenta offset SE, white on top — matching
  // TikTok's official chromatic-shift brand mark. Glyph path is the
  // 24-viewBox path shared with components/social-icons.tsx, scaled 2x
  // to fill the 64-square.
  const glyphPath =
    "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.4 20.1a6.34 6.34 0 0 0 10.86-4.43V8.75a8.16 8.16 0 0 0 4.77 1.52V6.86a4.83 4.83 0 0 1-1.44-.17z";
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect width="64" height="64" rx="14" fill="#000" />
      <g transform="translate(7 7) scale(2)">
        <path d={glyphPath} fill="#25F4EE" transform="translate(-1 1)" />
        <path d={glyphPath} fill="#FE2C55" transform="translate(1 -1)" />
        <path d={glyphPath} fill="#fff" />
      </g>
    </svg>
  );
}
