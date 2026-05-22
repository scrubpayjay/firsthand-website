"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { X } from "lucide-react";

const CONSENT_KEY = "firsthand:cookie-consent";

type ConsentState = "granted" | "denied" | null;

interface CookieBannerProps {
  pixelId: string;
  tidioKey: string;
}

/**
 * Cookie consent banner. Gates Meta Pixel + Tidio chat behind explicit user
 * consent. Decline only fires PageView (no advertising/profiling pixels).
 * Stores choice in localStorage so we don't nag returning visitors.
 */
export function CookieBanner({ pixelId, tidioKey }: CookieBannerProps) {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === "granted" || stored === "denied") {
        setConsent(stored);
      }
    } catch {
      // Private browsing or storage disabled — banner stays hidden, no pixels fire.
    }
  }, []);

  const decide = (choice: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // ignore
    }
    setConsent(choice);
  };

  const accepted = consent === "granted";
  const placeholderPixel = pixelId.startsWith("PLACEHOLDER");
  const placeholderTidio = tidioKey.startsWith("PLACEHOLDER");

  return (
    <>
      {/* Meta Pixel — only fires after explicit consent AND once real ID is configured */}
      {hydrated && accepted && !placeholderPixel && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
              n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* Tidio — only fires after consent AND once real public key is configured.
          See README for full Tidio account setup checklist (greeting, quick replies, hours). */}
      {hydrated && accepted && !placeholderTidio && (
        <Script
          src={`//code.tidio.co/${tidioKey}.js`}
          strategy="lazyOnload"
        />
      )}

      {hydrated && consent === null && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md z-[60] rounded-2xl border border-border bg-card text-card-foreground shadow-card-hover p-5"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <h2 className="font-semibold text-base text-foreground">
              We use cookies
            </h2>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => decide("denied")}
              className="-mr-1 -mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            We use cookies to measure site traffic and enable live chat for
            customer questions. We don&apos;t sell your data.{" "}
            <Link href="/privacy" className="underline text-foreground">
              Read more
            </Link>
            .
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="cta-pill px-4 py-2 text-sm font-semibold"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
