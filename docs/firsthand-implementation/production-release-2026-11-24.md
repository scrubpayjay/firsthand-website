# Production release — November 24, 2026

The user approved deploying the current pages with unconfirmed services and expanded coverage hidden. PR #3 was merged as `4db11f716bf2be1353a1b9d17d3e204bfe038f6e` and Vercel production deployment `dpl_7q2P8rowPTq1ZmGwoyxBYFACQjkR` became READY at `firsthand-website-1g2iosmq6-mindaro.vercel.app`.

Live pages:
- https://www.firsthandlawns.com/outdoor-living
- https://www.firsthandlawns.com/artificial-turf

Both pages return HTTP 200. Production HTML excludes unconfirmed specialty services and Dr. Phillips, Winter Garden, Maitland, and Clermont. Sitemap includes both routes. Home and services remain available.

Both production form endpoints accepted labeled QA submissions through the existing CRM. Turf reference: `estimate-591a00233253`; outdoor reference: `estimate-74beefd55ffd`. The same references were returned for the identical previously tested inquiries, avoiding duplicate requests. No SMS consent. Evidence: `production-smoke-tests-2026-11-24.json` and `production-lead-tests-2026-11-24.json`.

## Genuine Google review update

The user authorized using actual Google reviews. The matching Google Maps profile was opened directly and verified against business name, street address, and the firsthandlawns.com website link:
https://www.google.com/maps/place/Firsthand+Lawn+and+Landscape,+LLC/data=!4m2!3m1!1s0x88e77bc82a6698bb:0x5465c4d72841fa70

Observed November 24, 2026: 4.8 rating, 177 reviews. Three five-star customer reviews by Sharon Briggs, Kerry Ezzo, and Taghrid Ebeid were verified. Only short verbatim excerpts are used (under 25 words combined), with attribution and Google source links. These describe landscaping/landscape installation and are explicitly not represented as turf testimonials. Google exposed relative review dates, so exact posting dates are not fabricated. Source screenshot: `screenshots/google-review-source-2026-11-24.jpg`.

The pre-existing `lib/reviews-data.ts` explicitly identified its former testimonials as placeholders. Those entries were removed and replaced with the genuine excerpts. Homepage, reviews page, shared carousel, service-area aggregate figures, and landing-page review sections use the verified data consistently. The obsolete Google short profile URL was replaced by the observed Maps business URL.

## Generated turf concept

The generated two-view concept board is stored at `concepts/turf-concept-not-a-firsthand-project.png`. Its disclosure is baked into the image: “AI-generated concept — not a Firsthand project”. Initially delivered separately; the user subsequently authorized publishing it with a clear illustrative label. It now appears only on the artificial-turf page in a dedicated concept figure, with the entire baked-in disclosure preserved, an accessible HTML caption, and descriptive alt text. The generated concept is separate from authentic project photography. Existing authentic archive imagery remains live.

## Validation and rollback

Lint, TypeScript, production build, and the ten existing lead/consent tests pass for the review update. The review update has its own dedicated Git change and Vercel deployment; final identifiers are available in the associated GitHub PR and deployment checks.

Pre-launch rollback point remains `dpl_2sXkRQERnPPPA83C8N6zx59j6t1s`, `firsthand-website-hzwdc8kwh-mindaro.vercel.app`. To roll back only the Google review update, use initial approved landing-page deployment `dpl_7q2P8rowPTq1ZmGwoyxBYFACQjkR`. No secrets, DNS, CRM configuration, or tracking IDs were changed.

Prior mobile Lighthouse baseline remains outdoor 89 and turf 87 performance, with 100 accessibility, best practices, and SEO; not rerun for this short review-content update. No new claim of platform attribution/dashboard verification or Meta CAPI support.

Post-deploy runtime-log check: no error/fatal groups returned for the initial production deployment in the queried 30-minute window. No claim about unrelated deployments or periods.

## Mobile caption-overlap fix and handoff

PR #6 moved the shared mobile chat launcher into the third slot of the opaque Estimate / Call / Chat bar. Both initial and reopened launchers stay inside the bar, rather than floating over the turf caption. Live code commit: `a46cfa29edc762c96b5bf44d4d93144bd9251af1`; Vercel production: `dpl_CAWSsfqf1Ks357UhhRAuJyYQRLW7` (READY). Production checks at 390px and 375px show zero caption intersection, and chat opens/reopens. Desktop positioning is unchanged. Lint, TypeScript, production build, and all 10 contract tests pass. README and root HANDOFF.md now describe the actual current site and delivery state. The temporary local verification server was stopped. See `mobile-chat-production-verification.json` and `screenshots/mobile-chat-production-375.jpg`.
