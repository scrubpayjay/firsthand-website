# Firsthand website handoff

Updated November 24, 2026 (America/New_York).

## Objective and authorization

The user authorized launching the outdoor-living and artificial-turf pages, retaining hidden unconfirmed services/expanded coverage, publishing the generated turf concept with a clear illustrative label, using genuine Google review excerpts, and pushing all current work live and to GitHub with updated README/handoff notes. No additional publication approval is pending for this work.

## Completed work

- **VERIFIED:** `/outdoor-living` and `/artificial-turf` are production routes on `https://www.firsthandlawns.com`, with existing navigation, sitemap, and lead infrastructure integrated.
- **VERIFIED:** The turf concept board is published uncropped at `public/photos/turf-design-concept-illustrative.png`, retaining its baked-in disclosure and visible HTML caption. It is illustrative, not an actual Firsthand project.
- **VERIFIED:** Former placeholder testimonials were replaced with three short genuine Google excerpts. Attribution, source links, and the dated 4.8/177 aggregate snapshot are in `lib/reviews-data.ts` and `lib/site-config.ts`.
- **VERIFIED:** Mobile chat now occupies the reserved third slot of the opaque Estimate / Call / Chat bar rather than floating over page text. Both the initial deferred launcher and the launcher after closing chat share the same accessible name and positioning rule. Implementation: `components/landing-interactions.tsx`, `components/chat-launcher.tsx`, `components/chat-widget.tsx`, `app/landing.css`.
- **VERIFIED:** README now documents the actual production setup, content sources, signed CRM delivery, consent-gated tracking, mobile dock, deployment workflow, and remaining scope gates. It replaces obsolete staging/placeholder claims.

## Verification

- Lint: PASS.
- TypeScript: PASS.
- Production build and sitemap: PASS.
- Existing lead/consent contract tests: 10 PASS.
- Local production-server visual/geometry checks at 390 and 375 pixels: chat button fully inside the dock; **0 square pixels of caption overlap**, including after closing the assistant.
- Chat opens and reopens: PASS.
- Desktop at 1440 pixels: mobile dock hidden; launcher retains its existing 20px left offset.
- **VERIFIED on production:** 390px and 375px both show the chat launcher completely inside the bottom bar with zero caption overlap. The live assistant opens and reopens. No error/fatal groups were returned in the release runtime-log query.
- Production evidence: `docs/firsthand-implementation/mobile-chat-production-verification.json` and `docs/firsthand-implementation/screenshots/mobile-chat-production-375.jpg`.
- Detailed local geometry evidence: `docs/firsthand-implementation/mobile-chat-local-verification.json`.
- Earlier production lead tests accepted both labeled QA inquiries through the existing CRM. Do not create unnecessary fresh customer-like test records; reuse the documented QA details if a delivery change needs testing.

## Git and deployment state

**VERIFIED live:** PR #6 is merged into `main`. UI release commit: `a46cfa29edc762c96b5bf44d4d93144bd9251af1`. Vercel production deployment: `dpl_CAWSsfqf1Ks357UhhRAuJyYQRLW7`, READY, `firsthand-website-nri4fcc4p-mindaro.vercel.app`. Both live landing routes are available. Final handoff/evidence updates are documentation-only follow-ups to that tested UI release.

Git is on `main`, synced with GitHub after delivery, with no pending implementation changes. The temporary verification server on port 3230 was stopped; no new local server is left by this fix. Other project processes were not changed.

Previous production rollback: `88691d10f066629a6ed25135dd143ee660f052db`, Vercel `dpl_CYXGaedz6ab9QQ6BnE68gZfxGvDp`. Use it only with an explicit rollback request or a verified release failure.

Repository: `scrubpayjay/firsthand-website`. Vercel: `mindaro/firsthand-website`, project `prj_jsLxTw8PThxR1ZkL5584sj4QfAG9`, team `team_m5YDilrP62GNe0RgPUYi2e62`. Main pushes deploy production; feature branches deploy protected previews. Re-read live Git and Vercel state when resuming rather than trusting old status notes.

## Remaining issues and boundaries

- **VERIFIED:** Specialty offerings and expanded landing-page service areas remain hidden in `lib/landing-pages.ts`. Do not enable them without business confirmation.
- **VERIFIED:** Generated imagery has a clear disclosure. Never replace it with a project-completion claim or remove/crop its label.
- **VERIFIED:** The verified Google excerpts describe landscaping, not artificial turf installations. Do not recast them as turf-specific testimonials or invent precise review dates.
- **UNKNOWN:** Advertising-dashboard conversion reporting and Meta CAPI remain independently unverified/unconfigured. Existing GTM mappings and consent behavior have contract-level evidence; do not claim platform ingestion from that alone.
- **VERIFIED:** Historical local mobile Lighthouse baseline was 89 outdoor / 87 turf performance, with 100 accessibility, best practices, and SEO. Not rerun for this mobile-positioning change; no claim of a current 90+ score.
- **UNKNOWN:** Unrelated legacy `[RYAN: ...]` claims, financing partner setup, and placeholder integrations still require their own audit. See README; do not expand this fix into unrelated infrastructure changes.

## Next safe action

The requested mobile fix, GitHub push, production release, README update, and handoff are complete. No approval or implementation step remains for this request. For future work, inspect current Git and Vercel state first; business-scope gates and unrelated UNKNOWN items above are separate follow-up work.
