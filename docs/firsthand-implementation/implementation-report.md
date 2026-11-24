# Firsthand implementation report

Work began November 23 and report finalized November 24, 2026, America/New_York. Implementation is on a dedicated branch; production has not been changed.

## Authoritative project

- Repository: https://github.com/scrubpayjay/firsthand-website
- Local project: `/Users/JGrant 1/code/firsthand-website`
- Branch: `codex/firsthand-outdoor-turf`
- Base/rollback commit: `b2e7d0f0042e60af3f43142ef485feb138c2cad3`
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
- `node --test scripts/landing-leads.test.cjs`: 10 tests pass. Covers invalid fields, honeypot, unconfirmed specialty service, cross-origin/body limits, HMAC bytes, attribution with/without consent, durable deduplication, outdoor fields, upstream failures/pending responses, missing credentials, and throttling.
- Browser widths and screenshots: evidence stored in `screenshots/`; final results appended below.
- Actual turf QA form submission accepted by CRM: reference `estimate-591a00233253`. Clearly labeled test name and example.com email; fictional 202-555 test phone, no SMS opt-in. No claim of phone push notification receipt.
- Two Vercel CLI preview uploads failed with `fetch failed`; Git integration successfully built and deployed the implementation previews.

## Advertising configuration

Published GTM container v14 was inspected directly. GA4 is `G-D7SGCGNJEP`; Google Ads is `AW-18285479572`; Meta pixel is `5294875050737022`. The form sends `lead_form_submit` to the existing GA4 + Ads rules, and `generate_lead` to Meta's standard Lead mapping. Direct Meta Lead duplication is removed. Form start and CTA events use the existing GA4 destination. Contact/phone behavior uses existing event names. Entire GTM container waits for affirmative consent because its custom Meta tag does not honor Google consent defaults. Vercel's existing cookieless analytics stays in place.

Attribution includes UTMs, GCLID, GBRAID, WBRAID, and FBCLID only after consent; refused consent forwards an empty attribution object. Analytics dashboard ingestion and ad account attribution require live account observation after launch; local emitted-event evidence does not prove ad platform reporting. CAPI has no established integration here and remains unconfigured.

## Business publication gates

Confirm pergolas/covered patios, outdoor kitchens, fire features, pool decks, and custom putting greens, including qualified trades/subcontractors and applicable permits/licensing. These offerings exist in configuration but are hidden from public page copy, schema, and form options. Confirm Dr. Phillips, Winter Garden, Maitland, and Clermont coverage before including them. Supply verified turf installation before/after images and approved authentic customer review excerpts. Current turf imagery is explicitly labeled natural-lawn landscape work. Review sections link to Google; they contain no fabricated quotes.

## Rollback

Before release, keep production at `dpl_2sXkRQERnPPPA83C8N6zx59j6t1s`. To discard the preview, close the implementation PR; the production branch and domain are untouched. After an approved release, use Vercel Instant Rollback to that deployment, or run `vercel rollback firsthand-website-hzwdc8kwh-mindaro.vercel.app --scope mindaro`. Rollback disables auto-assignment until a later `vercel promote`; restore the intended Git state with a reviewed revert rather than a force push.


## Final verification evidence

- Draft review: https://github.com/scrubpayjay/firsthand-website/pull/3 . Branch is pushed; production is not merged or promoted.
- Local lint and TypeScript checks: PASS (`lint-results.txt`, `typecheck-results.txt`).
- Contract and consent tests: 10 PASS (`lead-contract-tests.txt`).
- Production build: PASS (`build-results.txt`); Vercel Git preview builds also passed.
- Browser tests at 1440, 768, 390, and 375 pixels: both routes have no horizontal overflow. Sticky call/estimate controls appear on mobile. See `screenshots/preview-outdoor-responsive.json` and `screenshots/preview-turf-responsive.json`.
- Mobile navigation switches to the correct landing route; estimate CTA scrolls to the form with header clearance; all new page call links use `tel:+14073375191`. Native FAQ disclosure opens and displays the source heat qualification.
- Deferred assistant opens and closes on the optimized preview; conversation generation was not retested because this change only defers loading of the existing assistant.
- Both actual deployed preview forms accepted the labeled QA inquiries: turf `estimate-591a00233253`, outdoor `estimate-74beefd55ffd`. Reusing the same details returned the same references, demonstrating downstream duplicate protection. The outdoor local test included consented campaign parameters; propagation is additionally verified by the signed payload contract tests. This does not claim a human saw Jobber's notification.
- Smoke tests: home, services, contact, portfolio, privacy, and both landing pages return 200; legacy `/services/landscaping` redirects correctly; sitemap includes both pages. See `route-smoke-tests.json`.
- Each new page has exactly one H1, canonical metadata, Service schema and FAQ schema. Screenshot and DOM review confirmed heat/maintenance qualifications and accurately labeled project imagery.
- Mobile Lighthouse, production build on localhost, default simulated throttling, before marketing consent: outdoor **89 performance / 100 accessibility / 100 best practices / 100 SEO**; turf **87 / 100 / 100 / 100**. Full audits: `lighthouse-outdoor-living-final.json` and `lighthouse-artificial-turf-final.json`. Initial runs were 40 and 66 for performance. A lower-quality hero experiment produced 87/83, so the final code retains quality 60 for better photography; those experimental measurements are retained separately as `*-release.json`. Performance remains below the requested 90 mobile target; deployed/field performance and consented advertising-tag overhead are not claimed from these local measurements.
- Existing analytics uses one consent-gated GTM container; separate Meta bootstrap is removed. No new account credentials or duplicate trackers. Event-emission and consent paths are tested; platform dashboard conversion attribution and Meta CAPI remain outstanding.
- Production check: the new outdoor URL still returns 404 before release, as expected. Existing production deployment/domain remain untouched.

## Screenshot index

- Existing production homepage: `screenshots/before-home-1440.jpg`.
- New desktop outdoor/turf: `screenshots/optimized-outdoor-living-1440.jpg`, `screenshots/optimized-artificial-turf-1440.jpg`.
- Mobile turf hero: `screenshots/preview-artificial-turf-mobile-390.jpg`.
- Both pages at tablet and both mobile widths: `screenshots/preview-<route>-<width>.jpg`.
- Actual deployed confirmations: `screenshots/preview-turf-lead-confirmation.jpg`, `screenshots/preview-outdoor-lead-confirmation.jpg`.
- Mobile form: `screenshots/preview-mobile-estimate-form-375.jpg`.

## Commit history and release decision

Implementation: `4172f2d1462b189892bf2890b472739a7d870697`.
Hydration/privacy fix: `4b65bc874e5e469a92ff46b6a8fd99755c627716`.
Assistant/media/tracking improvements: `4d034b9dcdd8da6d9781ba936b18e5c59c6adc3e`.
Hero experiment: `c907395488d360c982b9ab45d9b7842126b06555` (superseded by final quality choice).
Final commit is the branch tip after the documentation/formatting commit; obtain it with `git rev-parse codex/firsthand-outdoor-turf` or from the PR. The final deployment URL and commit are also recorded in Vercel/GitHub checks.

**Release withheld:** the user's request explicitly requires service-scope confirmations and production approval. Specialty services and expanded coverage stay hidden. Verified turf before/after evidence and approved real review excerpts are still needed to satisfy the full original brief. Current public-safe preview does not fabricate either.
