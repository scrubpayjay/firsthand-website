export const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"] as const;
export function hasTrackingConsent() {
  try { return localStorage.getItem("firsthand:cookie-consent") === "granted"; } catch { return false; }
}
export function captureAttribution(): Record<string, string> {
  if (!hasTrackingConsent()) return {};
  try {
    const params = new URLSearchParams(location.search);
    const current = Object.fromEntries(ATTRIBUTION_KEYS.flatMap(key => { const value = params.get(key); return value ? [[key, value.slice(0, 250)]] : []; }));
    if (Object.keys(current).length) sessionStorage.setItem("firsthand:attribution", JSON.stringify(current));
    return Object.keys(current).length ? current : JSON.parse(sessionStorage.getItem("firsthand:attribution") || "{}");
  } catch { return {}; }
}
export function landingEvent(event: string, kind: string, extra: Record<string, string> = {}) {
  if (!hasTrackingConsent()) return;
  window.dataLayer = window.dataLayer || [];
  if (event === "form_start" || event === "cta_click") {
    // These events have no GA4 tag in container version 14. Reuse the loaded
    // measurement destination without adding another bootstrap or page view.
    const command = function(...args: unknown[]) { window.dataLayer.push(args as unknown as Record<string, unknown>); };
    command("event", event, {send_to:"G-D7SGCGNJEP",page_path:location.pathname,landing_page:kind,...extra});
  }
  window.dataLayer.push({ event, page_path: location.pathname, landing_page: kind, ...extra });
}
