# Firsthand Lawns — Production Website

Next.js marketing website for Firsthand Lawn and Landscape, deployed from this repository to Vercel.

- Production: [firsthandlawns.com](https://www.firsthandlawns.com)
- Outdoor Living: [/outdoor-living](https://www.firsthandlawns.com/outdoor-living)
- Artificial Turf: [/artificial-turf](https://www.firsthandlawns.com/artificial-turf)
- GitHub: [scrubpayjay/firsthand-website](https://github.com/scrubpayjay/firsthand-website)
- Vercel: `mindaro/firsthand-website` (`prj_jsLxTw8PThxR1ZkL5584sj4QfAG9`)
- Production branch: `main`; feature branches receive protected previews.

## Local development

Use the existing authorized environment configuration. `.env.local` and credentials must stay out of Git. Variable names and setup comments are in `.env.example`; some legacy comments there predate the current CRM delivery path.

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm typecheck
node --test scripts/landing-leads.test.cjs
pnpm build
pnpm start
```

`pnpm build` runs Next.js and generates the XML sitemap through its postbuild hook. Vercel uses its configured Node.js runtime; check project settings before changing runtime versions.

## Current functionality

- Existing home, service, service-area, commercial, portfolio, review, financing, blog, contact, and legal pages remain available. Legacy redirects are in `next.config.ts`.
- `/outdoor-living` and `/artificial-turf` include dedicated estimate forms, responsive layouts, FAQs, canonical/social metadata, and LocalBusiness/Service/FAQ/breadcrumb structured data.
- Landing-page estimates use `/api/estimate`, server validation, a honeypot, origin/body checks, a per-instance burst limit, and durable CRM idempotency.
- On mobile landing pages, Estimate, Call, and Chat occupy the bottom action bar. The shared chat launcher uses the third reserved slot, so it does not float over the image disclosure or other page content. Both initial and reopened launcher states use the same positioning.
- The existing assistant loads on demand. Lead delivery and advertising consent are independent of opening the assistant.

## Content and business scope

| Concern | Source |
|---|---|
| Brand, phone, address, existing service catalog, service areas | `lib/site-config.ts` |
| Landing copy, FAQs, installation checklist, confirmed offerings | `lib/landing-pages.ts` |
| Landing-page rendering and mobile action bar | `components/landing-page.tsx`, `components/landing-interactions.tsx`, `app/landing.css` |
| Existing service and area page content | `lib/services-data.ts`, `lib/service-areas-data.ts` |
| Genuine Google review excerpts and source links | `lib/reviews-data.ts` |
| Project-image provenance | `lib/photos-manifest.ts` |
| Blog content | `lib/blog-posts-data.ts` |

Unconfirmed pergolas/covered patios, kitchens, fire features, pool decks, and putting greens remain hidden from landing-page cards, forms, and structured data. Dr. Phillips, Winter Garden, Maitland, and Clermont remain excluded from the new landing-page coverage lists. Obtain business confirmation before changing these gates.

The turf page includes `public/photos/turf-design-concept-illustrative.png`, a generated two-view concept board. Keep the image uncropped and retain its baked-in disclosure, visible HTML caption, and descriptive alt text: **AI-generated concept — not a Firsthand project.** It is design inspiration, not installation evidence. Authentic archive photographs are identified separately.

Three short, attributed Google review excerpts were verified on the matching business profile on November 24, 2026. The former placeholder testimonials were removed. These reviews describe landscaping, not turf installations. The observed aggregate was 4.8 from 177 reviews; this is a dated snapshot, not a live feed. Verify directly on Google before refreshing it. Do not invent review dates or customer/project claims.

## Lead delivery

`/api/estimate` and the existing contact endpoint send signed requests to the established Firsthand ops receiver, which persists submissions and creates Jobber requests. A successful form confirmation requires backend acceptance and a real Jobber request ID; missing configuration, network failures, and pending/failed acknowledgements do not display success.

The CRM contract requires an email address, so landing forms include email alongside the requested project fields. Project details, landing page, consent state, attribution, and submission timestamp are included in the persisted message. SMS consent defaults to false. The existing contact-photo pipeline uses FieldShot where configured.

Required server configuration uses the existing `JOBBER_WEBHOOK_URL` and `WEBSITE_LEAD_WEBHOOK_SECRET`. Never print, commit, or replace their values casually. The burst throttle is per instance; durable deduplication is enforced downstream by the CRM.

## Analytics and privacy

Reuse the existing GTM container `GTM-5T6BXSR7`; do not add another GA/Ads/Meta bootstrap. The audited configuration includes GA4 `G-D7SGCGNJEP`, Ads `AW-18285479572`, and Meta `5294875050737022`.

- GTM loads after affirmative consent; Privacy choices can reopen the consent dialog.
- `lead_form_submit` uses the existing GA4/Ads mapping, and `generate_lead` uses the Meta Lead mapping.
- Form-start, CTA, and phone-click events are consent-gated.
- UTMs, GCLID, GBRAID, WBRAID, and FBCLID are captured/persisted only after consent.
- Existing Vercel cookieless analytics remains enabled on Vercel.
- Meta CAPI and advertising-dashboard attribution have not been independently configured/verified by this implementation.

## Verification and releases

Use lint, TypeScript, the lead/consent contract tests, and a production build before release. Visually inspect desktop and 390/375-pixel mobile layouts, including the full turf disclosure and chat open/close behavior. On a release, confirm the actual production domain, asset loading, source labels, and retained business-scope gates.

`main` pushes trigger Vercel production deployments. Wait for READY and verify the domain; a push alone is not proof of a successful release. Never disable deployment protection to test previews.

The previously recorded local mobile Lighthouse baseline was outdoor 89 and turf 87 performance, with 100 accessibility, best practices, and SEO. These are historical measurements, not current field-performance claims.

- [Current handoff](HANDOFF.md)
- [Implementation report](docs/firsthand-implementation/implementation-report.md)
- [Production release and provenance](docs/firsthand-implementation/production-release-2026-11-24.md)
- [Requirements matrix](docs/firsthand-implementation/requirements-matrix.md)

Rollback to a known deployment through Vercel or a reviewed Git revert. The pre-landing-page rollback is `dpl_2sXkRQERnPPPA83C8N6zx59j6t1s`; the prior release with the labeled turf concept is `dpl_CYXGaedz6ab9QQ6BnE68gZfxGvDp` (`88691d10f066629a6ed25135dd143ee660f052db`). Vercel rollback disables automatic domain assignment until a subsequent promotion restores it. Check current state before acting.

## Stack

Next.js 16.2.6, React 19, TypeScript, Tailwind CSS 4, Inter/Playfair Display, React Hook Form, Zod, next-sitemap, and Vercel. Treat remaining `[RYAN: ...]`, placeholder integration settings, and financing-partner details elsewhere in the repository as items to audit against current business evidence; this landing-page release does not establish those unrelated claims.
