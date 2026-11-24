# Firsthand implementation report

Report date: November 23, 2026, America/New_York. Implementation is on a dedicated branch; production has not been changed.

## Authoritative project

- Repository: https://github.com/scrubpayjay/firsthand-website
- Local project: `/Users/JGrant 1/code/firsthand-website`
- Branch: `codex/firsthand-outdoor-turf`
- Base/rollback commit: `b2e7d0f70` (see `git rev-parse origin/main` for full hash; exact hash recorded in release evidence)
- Existing Vercel project: `prj_jsLxTw8PThxR1ZkL5584sj4QfAG9`, team `team_m5YDilrP62GNe0RgPUYi2e62` (mindaro)
- Production: https://firsthandlawns.com (redirects to www.firsthandlawns.com)
- Existing production deployment: `dpl_2sXkRQERnPPPA83C8N6zx59j6t1s`, `firsthand-website-hzwdc8kwh-mindaro.vercel.app`
- Planned production URLs: https://www.firsthandlawns.com/outdoor-living and https://www.firsthandlawns.com/artificial-turf

## Delivered

Two premium landing pages using the existing logo, lime actions, green palette, Inter/Playfair fonts, and authentic owner-curated project archive. Includes required lead fields, installation content, qualified FAQs, mobile call/estimate controls, cross-links, navigation integration, canonical/OG metadata, Service/LocalBusiness/FAQ/breadcrumb structured data, and sitemap entries.

The backend reuses the existing HMAC-signed Firsthand ops receiver and its Jobber pipeline. All project and campaign details are embedded in the existing persisted message, because the receiver strips unknown top-level fields. The receiver persists lead timestamp and status. A confirmation requires a genuine Jobber request ID, including on idempotent retries. Missing configuration, timeouts, network failures, pending rows, and failed rows return an actionable error. The pre-existing contact form's false-success behavior was also fixed.

Existing CRM requires email, so both forms include an additional email field. No fictitious email, street address, reviews, or installation evidence is generated. SMS opt-in stays false.

## Verification

- `pnpm lint`: pass after fixing two pre-existing lint errors and an unused import encountered in the required checks.
- `pnpm typecheck`: pass.
- `pnpm build`: pass; both new routes and sitemap generated.
- `node --test scripts/landing-leads.test.cjs`: 9 tests pass. Covers invalid fields, honeypot, unconfirmed specialty service, cross-origin/body limits, HMAC bytes, attribution with/without consent, durable deduplication, outdoor fields, upstream failures/pending responses, missing credentials, and throttling.
- Browser widths and screenshots: evidence stored in `screenshots/`; final results appended below.
- Actual turf QA form submission accepted by CRM: reference `estimate-591a00233253`. Clearly labeled test name and example.com email; fictional 202-555 test phone, no SMS opt-in. No claim of phone push notification receipt.
- Two Vercel CLI preview uploads failed with `fetch failed`; Git integration deployment is the fallback.

## Advertising configuration

Published GTM container v14 was inspected directly. GA4 is `G-D7SGCGNJEP`; Google Ads is `AW-18285479572`; Meta pixel is `5294875050737022`. The form sends `lead_form_submit` to the existing GA4 + Ads rules, and `generate_lead` to Meta's standard Lead mapping. Direct Meta Lead duplication is removed. Form start and CTA events use the existing GA4 destination. Contact/phone behavior uses existing event names. Entire GTM container waits for affirmative consent because its custom Meta tag does not honor Google consent defaults. Vercel's existing cookieless analytics stays in place.

Attribution includes UTMs, GCLID, GBRAID, WBRAID, and FBCLID only after consent; refused consent forwards an empty attribution object. Analytics dashboard ingestion and ad account attribution require live account observation after launch; local emitted-event evidence does not prove ad platform reporting. CAPI has no established integration here and remains unconfigured.

## Business publication gates

Confirm pergolas/covered patios, outdoor kitchens, fire features, pool decks, and custom putting greens, including qualified trades/subcontractors and applicable permits/licensing. These offerings exist in configuration but are hidden from public page copy, schema, and form options. Confirm Dr. Phillips, Winter Garden, Maitland, and Clermont coverage before including them. Supply verified turf installation before/after images and approved authentic customer review excerpts. Current turf imagery is explicitly labeled natural-lawn landscape work. Review sections link to Google; they contain no fabricated quotes.

## Rollback

Before release, keep production at `dpl_2sXkRQERnPPPA83C8N6zx59j6t1s`. To discard the preview, close the implementation PR; the production branch and domain are untouched. After an approved release, use Vercel Instant Rollback to that deployment, or run `vercel rollback firsthand-website-hzwdc8kwh-mindaro.vercel.app --scope mindaro`. Rollback disables auto-assignment until a later `vercel promote`; restore the intended Git state with a reviewed revert rather than a force push.
