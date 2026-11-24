"use client";

import { useState, useSyncExternalStore, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { X } from "lucide-react";

const CONSENT_KEY = "firsthand:cookie-consent";

type StoredConsent = "granted" | "denied" | null;

interface CookieBannerProps {
  tidioKey: string;
}

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSnapshot = (): StoredConsent => {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "granted" || stored === "denied") return stored;
    return null;
  } catch {
    return null;
  }
};

// Server-side render: treat as "not yet decided" — banner is suppressed by
// the local `hydrated` flag, so we never render mismatched content.
const getServerSnapshot = (): StoredConsent => null;

/**
 * Cookie consent banner. Gates Meta Pixel + Tidio chat behind explicit user
 * consent. Decline only fires PageView (no advertising/profiling pixels).
 * Stores choice in localStorage so we don't nag returning visitors.
 *
 * Reads consent via useSyncExternalStore so localStorage stays the source of
 * truth (other tabs can update it, etc.) and we don't violate the
 * react-hooks/set-state-in-effect lint.
 */
export function CookieBanner({ tidioKey }: CookieBannerProps) {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  useEffect(() => {
    const reopen = () => setPreferencesOpen(true);
    window.addEventListener("firsthand:privacy-choices", reopen);
    return () => window.removeEventListener("firsthand:privacy-choices", reopen);
  }, []);
  const storedConsent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Local override so we can update consent immediately without waiting on a
  // storage event (which only fires for *other* tabs).
  const [overrideConsent, setOverrideConsent] = useState<StoredConsent>(null);

  const consent = overrideConsent ?? storedConsent;

  const decide = (choice: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // ignore — private browsing
    }
    setOverrideConsent(choice);
    setPreferencesOpen(false);
    window.dispatchEvent(new Event("firsthand:consent"));
    window.dataLayer = window.dataLayer || [];
    const consentCommand = function(...args: unknown[]) { window.dataLayer.push(args as unknown as Record<string, unknown>); };
    consentCommand("consent", "update", { analytics_storage: choice, ad_storage: choice, ad_user_data: choice, ad_personalization: choice });
    if (choice === "denied") {
      try { sessionStorage.removeItem("firsthand:attribution"); } catch {}
      // Reload on withdrawal to unload custom marketing templates that do
      // not understand Google consent updates. Stored refusal prevents reload tags.
      if (consent === "granted") window.location.reload();
    }
  };

  const accepted = consent === "granted";
  const showBanner = consent === null || preferencesOpen;
  const placeholderTidio = tidioKey.startsWith("PLACEHOLDER");

  return (
    <>
      {/* GTM already owns GA4, Google Ads, and Meta. Gate the entire container
          because its custom Meta template does not honor Google consent mode. */}
      {accepted && <Script id="firsthand-gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{__html:`
        (function(w,d,s,l,i){if(w.__fhGtmLoaded)return;w.__fhGtmLoaded=true;
        w[l]=w[l]||[];function consent(){w[l].push(arguments)}
        consent('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
        w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5T6BXSR7');
      `}}/>}

      {/* Tidio — only fires after consent AND once real public key is configured.
          See README for full Tidio account setup checklist (greeting, quick replies, hours). */}
      {accepted && !placeholderTidio && (
        <Script
          src={`//code.tidio.co/${tidioKey}.js`}
          strategy="lazyOnload"
        />
      )}

      {showBanner && (
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
            We use cookies to measure site traffic, measure advertising, and enable live chat for
            customer questions. We don&apos;t sell your data.{" "}
            <Link href="/privacy-policy" className="underline text-foreground">
              Read our privacy policy
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

export function PrivacyChoices() {
  return <button type="button" className="hover:text-foreground underline" onClick={() => window.dispatchEvent(new Event("firsthand:privacy-choices"))}>Privacy choices</button>;
}
