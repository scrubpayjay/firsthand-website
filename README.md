# Firsthand Lawns — Marketing Site

Production-ready Next.js 16 marketing site for Firsthand Lawns, replacing the existing WordPress site at firsthandlawns.com. Currently live on Vercel staging at https://firsthand-website.vercel.app.

---

## What's built

**25 routes, all rendering**

- 11 static pages: `/`, `/about`, `/contact`, `/contact/thanks`, `/reviews`, `/portfolio`, `/financing`, `/blog`, `/services` (index), `/service-areas` (index), `/privacy`, `/terms`
- 8 dynamic service pages: `/services/{lawn-maintenance,landscape-design,sod-installation,irrigation,hardscape-installation,tree-trimming-removal,stump-grinding-removal,bamboo-trimming-removal}` — 800–1200 words each, real Central Florida specifics (St. Augustine, Zoysia, hurricane prep, sandy soil, native palettes, OUC restrictions)
- 5 dynamic service-area pages: `/service-areas/{winter-park,orlando,college-park,windermere,bay-hill}` — Winter Park anchored as primary, each with neighborhood/landmark refs, city-specific FAQs, embedded Google Map
- 1 API route: `/api/contact` (validation + console.log + Resend TODO)

**Production Lighthouse**

| Page | Perf | A11y | Best Practices | SEO |
|------|-----:|-----:|---------------:|----:|
| `/` | 93 | 100 | 100 | 100 |
| `/services/landscape-design` | 100 | 100 | 100 | 100 |
| `/service-areas/winter-park` | 100 | 100 | 100 | 100 |

**SEO infrastructure**

- LocalBusiness / LandscapeService JSON-LD on home with full NAP + AggregateRating + areaServed
- Service + FAQPage JSON-LD on every service page
- LocalBusiness + areaServed + GeoCoordinates + FAQPage JSON-LD on every service-area page
- BreadcrumbList JSON-LD on every non-home page
- sitemap.xml (auto-generated postbuild) — 25 URLs, prioritized by conversion value
- robots.txt allowing all crawlers, disallowing `/api/` and `/contact/thanks`
- Open Graph + Twitter card defaults via Next.js Metadata API, per-page overrides
- Internal linking: each service page cross-links to all 5 areas; each area page cross-links to all 8 services
- 301 redirect map for every legacy WordPress URL (in `next.config.ts`)

**Conversion infrastructure**

- Sticky header with mobile drawer and `Get a quote` CTA
- Contact form with react-hook-form + zod validation, honeypot, inline errors, loading state
- Reviews carousel with auto-rotate, pause on hover, swipe, prev/next, dot indicators (respects prefers-reduced-motion)
- TrustBar (4.9 ★ / 154 reviews / Family-owned / Insured / Residential + Commercial)
- Cookie consent banner gating Meta Pixel + Tidio behind explicit opt-in
- Financing call-out on home, dedicated `/financing` page, sidebar callout on every service page

**Photo coverage** (real CompanyCam photos via the manifest at `lib/photos-manifest.ts`)

| Surface | Status | Source |
|---|---|---|
| Home hero | ✓ | landscape-design backyard, Orlando |
| Home financing callout | ✓ | hardscape-1 (Bay Hill travertine pool) |
| Home "Where we work" | ✓ | winter-park-1 (oak-shaded Spanish home) |
| Home recent-work grid | ✓ | 4 service heroes |
| `/services/lawn-maintenance` | ✓ | lawn-1 hero |
| `/services/landscape-design` | ✓ | landscape-1 hero |
| `/services/sod-installation` | ✓ | sod-1 hero |
| `/services/hardscape-installation` | ✓ | hardscape-1 hero |
| `/services/stump-grinding-removal` | ✓ | stump-1 hero |
| `/services/bamboo-trimming-removal` | ✓ | bamboo-1 hero |
| `/services/irrigation` | ✗ | [RYAN: photo needed] — pool didn't include irrigation shots |
| `/services/tree-trimming-removal` | ✗ | [RYAN: photo needed] |
| `/service-areas/winter-park` | ✓ | winter-park-1 |
| `/service-areas/windermere` | ✓ | windermere-1 |
| `/service-areas/bay-hill` | ✓ | bay-hill-1 |
| `/service-areas/orlando` | ✓ | sod-2 (re-roled area-hero) |
| `/service-areas/college-park` | ✗ | [RYAN: photo needed] — gap-fill pull confirmed CompanyCam has no clean post-finish College Park residential photos in recent project pool |
| `/portfolio` gallery | ✓ | 18-photo curated grid |
| `/about` recent work | ✓ | 8-photo grid |
| `/about` credentials photo | ✓ | hardscape-1 |
| `/about` Ryan + team photos | ✗ | placeholders (CompanyCam doesn't have these) |
| `public/og-image.jpg` (1200×630) | ✓ | derived from home hero |

**Gap-fill pull (round 2):** A second targeted pull scanned 300 projects looking specifically for irrigation, tree-trimming, College Park, and Orlando-neighborhood photos. Net additions:

- `commercial-3.jpg` (Park Lake Dental — Orlando commercial frontage with new gravel beds)
- `landscape-5.jpg` (fresh mulch + plant install along residential side yard)
- `sod-2.jpg` re-roled to `area-hero` for `/service-areas/orlando` so the page now picks up a clean residential Orlando shot

**Categories still missing** after both pulls (verified, not fixable from current CompanyCam content):
- Irrigation: Firsthand has no projects in CompanyCam named or described with irrigation/sprinkler keywords — irrigation work is included in broader landscape projects and not separately photographed
- Tree-trimming: recent project pool has no clean post-trim wide-angle "after" shots — most tree work photos are in-progress or focused on debris/equipment
- College Park residential: most College Park projects in the pool are Ivanhoe-corner remodels with interior-only photos

**Tracking**

- Google Tag Manager: **GTM-5T6BXSR7** (the existing WordPress container — preserved, not regenerated)
- Meta Pixel: placeholder `PLACEHOLDER_FB_PIXEL_ID` in `app/layout.tsx`, fires PageView + Lead event after consent
- Tidio chat: placeholder `PLACEHOLDER_TIDIO_ID` in `app/layout.tsx`, lazy-loaded after consent

---

## Regenerating photos from CompanyCam

The photo pull is reproducible. Pullers + finalizer live at `/tmp/cc-pull/`
(see `pull.mjs`, `resize.mjs`, `finalize.mjs`). To refresh:

```bash
# 1. Pull recent project photos and download candidates
export CC_API_KEY=$(doppler secrets get COMPANYCAM_API_KEY \
  --project firsthand-ops --config prd --plain)
node /tmp/cc-pull/pull.mjs            # → /tmp/cc-pull/raw + photos-meta.json

# 2. Resize to web sizes (max 1600px, mozjpeg q=78, EXIF stripped)
node /tmp/cc-pull/resize.mjs          # → /tmp/cc-pull/staging

# 3. Curate KEEPERS list in finalize.mjs (visual review of staging/)
# 4. Run finalize to copy + rename + emit manifest + og-image
node /tmp/cc-pull/finalize.mjs        # → public/photos/* + lib/photos-manifest.ts
```

Inspecting candidates: open `/tmp/cc-pull/staging/cand-*.jpg` in Preview
and update `KEEPERS` in `finalize.mjs` with chosen filenames, target
category prefix, area, service, role, and alt text override.

---

## Placeholders to replace before launch

| Placeholder | Location | Replace with |
|---|---|---|
| `PLACEHOLDER_FB_PIXEL_ID` | `app/layout.tsx` | Real Meta Pixel ID (create in Meta Ads Manager) |
| `PLACEHOLDER_TIDIO_ID` | `app/layout.tsx` | Tidio public key (see Tidio setup below) |
| `ryan@firsthandlawns.com` | `lib/site-config.ts` | Confirm with Ryan whether this is the right inbound address |
| Hours (`Mon-Fri 8am-6pm · Sat-Sun 9am-2pm`) | `lib/site-config.ts` | Real hours from Ryan |
| Financing partner URL (`https://example.com/apply`) | `lib/site-config.ts` | Real partner application URL (Wisetack, Sunbit, GreenSky, etc.) |
| Social URLs (Facebook, Instagram, Google) | `lib/site-config.ts` | Real social profile URLs |
| Email service in `/api/contact` | `app/api/contact/route.ts` | Wire Resend (recommended — Vercel-native) |
| `public/firsthand-logo.png` | `public/` | Higher-res SVG when available |
| ~30 photo placeholders | sprinkled across pages | Real CompanyCam photos (each is marked `[RYAN: ...]`) |
| 15 review excerpts | `lib/reviews-data.ts` | Real Google reviews via Places API or paste manually — search `TODO_REPLACE_REVIEW` |

---

## [RYAN: ...] markers grouped by page

Search the codebase for `[RYAN:` to find every spot where Ryan's voice, real content, or confirmation is required. Roughly 33 textual markers + 30+ photo placeholders.

**`/` (Home)**
- Photo placeholder: hero shot
- Photo placeholder: mid-build financing image
- Photo placeholder: Central Florida map
- 4× before/after photo pairs
- `[RYAN: confirm year-founded and add a line about the team]` in Why-Firsthand card

**`/about`**
- Ryan's story (3 paragraphs)
- Photo placeholder: Ryan on a job site
- Team list (Crew lead #1, Crew lead #2, Estimator/Designer)
- 4× team headshot placeholders
- License/insurance coverage amounts (3 markers)
- 8× recent-work gallery placeholders

**`/contact`** — nothing to replace (real NAP wired in)

**`/portfolio`**
- Note about replacing CompanyCam callout with on-site gallery
- 6× before/after pairs (12 photo placeholders)

**`/financing`**
- 3× FAQ confirmations (turnaround time, eligible services, finance partner name)
- Financing partner apply URL

**`/blog`**
- Phase-2 note about wiring email capture to dedicated newsletter list

**`/privacy` and `/terms`**
- Attorney review recommendation
- Document last-updated dates

**`/services/{hardscape-installation,tree-trimming-removal,stump-grinding-removal,bamboo-trimming-removal}`**
- Banner on each: `[RYAN: Confirm Firsthand currently offers this service]` (4 services NEW to this site vs. old WordPress)
- Tree-trimming page: ISA certification confirmation in FAQ
- Photo placeholder per service hero

**`/service-areas/{winter-park,orlando,college-park,windermere,bay-hill}`** (×5)
- 2× local testimonial slots per city (10 testimonial placeholders)
- Hero photo placeholder per city

**`lib/site-config.ts`**
- Email address confirmation
- Hours confirmation
- Social URLs
- Financing partner URL

**`lib/reviews-data.ts`**
- 15 review excerpts marked `TODO_REPLACE_REVIEW`

---

## Tidio account setup (do this in Tidio dashboard)

When Justin or Ryan creates the Tidio account:

1. Sign up at tidio.com (free tier supports basic chat; paid $29/mo unlocks AI flows)
2. Copy the public key, paste into `app/layout.tsx` replacing `PLACEHOLDER_TIDIO_ID`
3. Configure the greeting:
   > "Hi! I'm Ryan's assistant. I can help with quotes, scheduling, or general questions about lawn care in Winter Park and Central Florida. What can I help with?"
4. Set up 5 quick-reply buttons:
   - "Get a free estimate"
   - "Service areas you cover"
   - "Financing options"
   - "Emergency tree/storm cleanup"
   - "Schedule a callback"
5. Route unanswered messages to `ryan@firsthandlawns.com`
6. Office hours: M–F 8am–6pm, S–Su 9am–2pm (or whatever Ryan confirms)
7. Outside hours: collect contact info, promise callback next business day

**Phase 2 (future):** replace Tidio with custom Drafted-integrated chat that routes through Agent 10 (lead reply) for unified triage. ~2-day build, defer until customer base justifies it.

---

## 301 redirect map (active now)

Every legacy WordPress URL redirects to the new equivalent at the moment DNS cuts over. Verified live:

```
/services/                  → /services
/services/lawn-care/        → /services/lawn-maintenance
/services/landscaping/      → /services/landscape-design
/projects/                  → /portfolio
/about-us/                  → /about
/where-we-service/          → /service-areas
/contact-us/                → /contact
/privacy-policy/            → /privacy
/terms-and-conditions/      → /terms
```

All return final 200 after the redirect chain.

---

## Before-launch checklist

- [ ] All `PLACEHOLDER_*` strings above replaced
- [ ] Real Firsthand logo (SVG preferred) — currently using PNG from old site
- [ ] All `[RYAN: ...]` markers resolved (search the codebase)
- [ ] Real photos in place (~30 needed — pull from CompanyCam gallery)
- [ ] Tidio account created with chat flows configured per spec above
- [ ] GTM-5T6BXSR7 verified in layout (DO NOT generate a new container — preserve continuity from WordPress)
- [ ] Financing partner URL added to `/financing` page and `lib/site-config.ts`
- [ ] Resend (or SendGrid) account created and wired into `/api/contact`
- [ ] Resend domain verification done for firsthandlawns.com
- [ ] Google Search Console verification meta tag added to root layout
- [ ] Submit new sitemap.xml to Search Console
- [ ] Verify every old URL hits 301 (use `curl -ILs <url>` or Search Console URL Inspection)
- [ ] Confirm new services (Hardscape, Tree, Stump, Bamboo) are services Firsthand actually offers — remove or de-index any that aren't
- [ ] CompanyCam portfolio gallery link still resolves on `/portfolio`
- [ ] Test contact form end-to-end with real email delivery
- [ ] Google Business Profile NAP matches new site exactly (phone, address, hours)
- [ ] Tell Evergrow Marketing they're being phased out (handle contract / WordPress handoff gracefully)
- [ ] **DNS cutover from firsthandlawns.com → Vercel (LAST step, only after everything above)**

---

## How to maintain

- **Content updates**: edit `lib/services-data.ts`, `lib/service-areas-data.ts`, `lib/reviews-data.ts`, `lib/site-config.ts`. Rebuilds on push.
- **New blog post**: create `app/blog/[slug]/page.tsx` (blog index already exists).
- **New service page**: append an object to `lib/services-data.ts`, then add to `SERVICES` in `lib/site-config.ts`. Page auto-generates from `generateStaticParams`.
- **New service area**: append an object to `lib/service-areas-data.ts`, then add to `SERVICE_AREAS` in `lib/site-config.ts`. Page auto-generates.
- **Lighthouse audit**: `pnpm build && pnpm start` then run Lighthouse via Chrome DevTools or `npx lighthouse <url>`.

---

## Stack

- Next.js 16.2.6 (App Router, Turbopack)
- TypeScript strict
- Tailwind CSS 4 with `@theme inline` palette in `app/globals.css`
- shadcn/ui (`base-nova` preset, Base UI primitives)
- next/font for Inter + Playfair Display
- react-hook-form + zod for the contact form
- next-sitemap (postbuild)
- lucide-react for icons
- Hosted on Vercel free tier under team `mindaro`

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build + sitemap
pnpm start        # serve the production build
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
```

If pnpm complains about ignored build scripts on first install, run `pnpm approve-builds` or check `pnpm-workspace.yaml` (sharp, unrs-resolver, msw are already whitelisted).

## Deployment

- GitHub: https://github.com/scrubpayjay/firsthand-website
- Vercel project: `mindaro/firsthand-website`
- Auto-deploys from `main` branch on every push
- Preview deploys on PRs
- Production: https://firsthand-website.vercel.app (DNS cutover to firsthandlawns.com is the LAST pre-launch step)
