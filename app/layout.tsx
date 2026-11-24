import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatLauncher } from "@/components/chat-launcher";
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

const TIDIO_PUBLIC_KEY = "PLACEHOLDER_TIDIO_ID";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head><Script id="consent-defaults" strategy="beforeInteractive" dangerouslySetInnerHTML={{__html:`window.dataLayer=window.dataLayer||[];(function(){function consent(){window.dataLayer.push(arguments)}consent('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});})();`}}/></head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatLauncher />
        <CookieBanner tidioKey={TIDIO_PUBLIC_KEY} />
        {/* Vercel Web Analytics — first-party, cookieless, same-origin beacons
            (/_vercel/insights/*), so it needs no consent gate and is unaffected
            by the cookie banner above. */}
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}
