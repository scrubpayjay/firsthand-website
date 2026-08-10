import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { CookieBanner } from "@/components/cookie-banner";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_TAGLINE,
} from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Landscaping in Winter Park & Central Florida`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "landscaping Winter Park",
    "landscaping Orlando",
    "Central Florida landscaping",
    "lawn care Winter Park",
    "landscape design Orlando",
    "sod installation Central Florida",
    "irrigation Winter Park",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Landscaping in Winter Park & Central Florida`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Landscaping in Winter Park & Central Florida`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Real GTM container from the existing firsthandlawns.com WordPress site — DO NOT regenerate.
const GTM_ID = "GTM-5T6BXSR7";

// Replace these placeholders when the corresponding accounts are provisioned.
const TIDIO_PUBLIC_KEY = "PLACEHOLDER_TIDIO_ID";
// Env-driven in production (NEXT_PUBLIC_META_PIXEL_ID in Vercel env vars);
// PLACEHOLDER fallback so local dev without the env var still passes the
// `pixelId.startsWith("PLACEHOLDER")` gate in components/cookie-banner.tsx
// and the pixel script stays dormant.
const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "PLACEHOLDER_FB_PIXEL_ID";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Google Tag Manager — preserves existing GTM-5T6BXSR7 from the WordPress site so
            tagging continuity (GA4, conversion pixels) is maintained at DNS cutover. */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
        <CookieBanner pixelId={META_PIXEL_ID} tidioKey={TIDIO_PUBLIC_KEY} />
        {/* Vercel Web Analytics — first-party, cookieless, same-origin beacons
            (/_vercel/insights/*), so it needs no consent gate and is unaffected
            by the cookie banner above. */}
        <Analytics />
      </body>
    </html>
  );
}
