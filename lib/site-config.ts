/**
 * Canonical NAP + brand strings. Edit once, propagates site-wide.
 * Verified against current firsthandlawns.com WordPress site (May 2026).
 */

export const SITE_NAME = "Firsthand Lawns";
export const SITE_TAGLINE = "Building Trust Firsthand…";
export const SITE_URL = "https://firsthand-website.vercel.app";

export const SITE_DESCRIPTION =
  "Landscape design, lawn maintenance, sod, and irrigation for Winter Park, Orlando, Windermere, and Central Florida. Family-owned, fully insured, financing up to $100,000 available.";

export const NAP = {
  legalName: "Firsthand Lawns LLC",
  phone: "(407) 337-5191",
  phoneTel: "+14073375191",
  email: "ryan@firsthandlawns.com", // [RYAN: confirm this is the right inbound address]
  street: "3720 N Orange Blossom Trail",
  city: "Orlando",
  state: "FL",
  zip: "32804",
  country: "US",
  // Geo: 3720 N Orange Blossom Trail, Orlando, FL 32804
  latitude: 28.5786,
  longitude: -81.4001,
} as const;

export const SOCIAL = {
  // [RYAN: replace these with your real social profile URLs]
  facebook: "https://www.facebook.com/firsthandlawns",
  instagram: "https://www.instagram.com/firsthandlawns",
  google: "https://g.page/firsthand-lawns",
} as const;

// Direct Google review prompt URL. Newer format is https://g.page/r/<unique-id>
// which opens the "Write a review" panel directly. The /review suffix on the
// legacy short name also works but is less reliable.
// TODO before launch: replace with Ryan's actual GBP review URL — get it from
// Google Business Profile → Get more reviews → Share review form.
export const LEAVE_REVIEW_URL = "https://g.page/firsthand-lawns/review";

export const REVIEWS_SUMMARY = {
  rating: 4.9,
  count: 154,
  source: "Google",
  // [RYAN: update count as new reviews come in. Will be pulled live via Places API later.]
} as const;

/**
 * Business hours — used in footer, /contact, LocalBusiness schema.
 * [RYAN: confirm these match your actual operating hours]
 */
export const HOURS = [
  { day: "Monday", open: "08:00", close: "18:00" },
  { day: "Tuesday", open: "08:00", close: "18:00" },
  { day: "Wednesday", open: "08:00", close: "18:00" },
  { day: "Thursday", open: "08:00", close: "18:00" },
  { day: "Friday", open: "08:00", close: "18:00" },
  { day: "Saturday", open: "09:00", close: "14:00" },
  { day: "Sunday", open: "09:00", close: "14:00" },
] as const;

export const HOURS_DISPLAY = "Mon–Fri 8am–6pm · Sat–Sun 9am–2pm";

/**
 * Financing program — surface prominently. Real offering, not aspirational.
 */
export const FINANCING = {
  minAmount: 1000,
  maxAmount: 100_000,
  minTermYears: 2,
  maxTermYears: 12,
  prepaymentPenalty: false,
  // [RYAN: provide actual financing partner URL — likely Wisetack, Sunbit, or GreenSky]
  partnerApplyUrl: "https://example.com/apply",
} as const;

/**
 * CompanyCam portfolio — link until on-site gallery is built.
 */
export const COMPANYCAM_GALLERY_URL =
  "https://app.companycam.com/galleries/72h2J7F9";

/**
 * Service catalog — drives header nav, footer, sitemap, internal linking.
 * The slug is the URL segment for /services/[slug].
 *
 * The `confirm` flag marks services NEW to this site (not on the current WordPress site).
 * Pages render a [RYAN: confirm] marker for these so they're easy to find before launch.
 */
export const SERVICES = [
  { slug: "lawn-maintenance", name: "Lawn Maintenance", confirm: false },
  { slug: "landscape-design", name: "Landscape Design & Installation", confirm: false },
  { slug: "sod-installation", name: "Sod Installation", confirm: false },
  { slug: "irrigation", name: "Irrigation", confirm: false },
  { slug: "hardscape-installation", name: "Hardscape Installation", confirm: true },
  { slug: "tree-trimming-removal", name: "Tree Trimming & Removal", confirm: true },
  { slug: "stump-grinding-removal", name: "Stump Grinding & Removal", confirm: true },
  { slug: "bamboo-trimming-removal", name: "Bamboo Trimming & Removal", confirm: true },
] as const;

export const SERVICE_AREAS = [
  { slug: "winter-park", name: "Winter Park", primary: true },
  { slug: "orlando", name: "Orlando", primary: false },
  { slug: "college-park", name: "College Park", primary: false },
  { slug: "windermere", name: "Windermere", primary: false },
  { slug: "bay-hill", name: "Bay Hill", primary: false },
] as const;
