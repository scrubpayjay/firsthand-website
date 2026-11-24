# Source requirements and implementation matrix

Source documents read in full on November 23, 2026 (America/New_York):
- `/Users/JGrant 1/Downloads/Firsthand_Outdoor_Living_Landing_Page.docx`
- `/Users/JGrant 1/Downloads/Firsthand_Artificial_Turf_Landing_Page.docx`

The separate pasted implementation request defines the task and deployment authority. The DOCX files supply content requirements; they do not independently authorize external actions.

| Requirement | Implementation / evidence | Status |
|---|---|---|
| Existing site and production identity | scrubpayjay/firsthand-website; matching local Git remote, Vercel project prj_jsLxTw8PThxR1ZkL5584sj4QfAG9, live firsthandlawns.com content | Verified |
| Preserve existing site and URLs | Additive routes and service links; existing service catalog and redirects retained | Implemented |
| Outdoor hero, premium positioning | Exact headline/subheadline; description omits unconfirmed pergolas pending scope confirmation | Implemented with publication gate |
| Seven outdoor offerings | All seven modeled in lib/landing-pages.ts; currently only transformations, pavers/hardscape, and landscape installation public | Specialty scope confirmation pending |
| Pergolas, kitchens, fire features, pool decks | Stored but hidden in cards, forms, and structured data until owner confirms delivery/licensing/permits as applicable | Pending confirmation |
| Turf headline, description, primary/secondary CTA, phone | Hero and estimate sections use verified site phone (407) 337-5191 | Implemented |
| Six turf service categories | All six modeled; five public, custom putting greens hidden | Putting green availability pending |
| Installation checklist | All nine source items, including conditional drainage/barrier/infill | Implemented |
| Benefits | All six, without absolute water, hygiene, safety, or maintenance guarantees | Implemented |
| Four turf process steps | All four source steps and descriptions | Implemented |
| Turf FAQs | All five source Q&As; 10–15-year estimate, heat, hygiene, and upkeep qualifications preserved | Implemented |
| Turf page order | Hero → project photos → services → why → benefits → inclusions → process → reviews → areas → FAQ → form | Implemented |
| Authentic images | Existing curated CompanyCam/owner archive only; no AI images on new pages | Implemented |
| Turf installation before/after | No verified turf pair found in website archive or focused local asset search; existing natural-lawn and cleanup images explicitly labeled | Pending authentic turf photography |
| Before/after comparison | Existing genuine cleanup pair displayed with explicit project category; no claim it is a turf conversion | Partial; relevant project pair needed |
| Testimonials | Existing lib/reviews-data.ts explicitly says placeholders; not reused. New sections link to Google customer reviews without invented quotes or ratings | Verified excerpts pending |
| Service areas | Orlando, Winter Park, Windermere, Bay Hill, Lake Nona from existing site coverage; Dr. Phillips, Winter Garden, Maitland, Clermont withheld | Additional coverage confirmation pending |
| Outdoor form fields | Name, phone, ZIP, project type, budget, start timing | Implemented |
| Turf form fields | Name, phone, ZIP, approximate area, project type | Implemented |
| Email requirement | Extra email field required by existing CRM receiver; no fake email generated | Deliberate integration constraint |
| CRM routing | Signed existing website-lead receiver → durable websiteLeadSubmissions record → Jobber request | Implemented |
| Lead details/attribution/timestamp/status | Existing email/phone/services/address contract; full project, landing page, consent, attribution, submission time stored in persisted message; downstream status tracking retained | Implemented; no unrelated schema migration |
| Real acceptance and error handling | Success requires backend ok and a Jobber request ID; pending/failed/empty acknowledgements rejected. Same issue corrected in existing contact endpoint | Implemented |
| Spam/deduplication | Honeypot, validation, same-origin check, 12 KB limit, per-instance burst throttle, stable CRM-enforced idempotency | Implemented; throttle is best-effort per instance |
| UTM/click IDs | All five UTMs + GCLID/GBRAID/WBRAID/FBCLID; session persistence only after existing explicit consent | Implemented |
| Form/CTA/phone tracking | form_start, cta_click, phone_click; lead_form_submit for existing GA4/Ads, generate_lead for existing Meta Lead mapping | Implemented |
| Existing tracking audit | GTM-5T6BXSR7 container v14: GA4 G-D7SGCGNJEP; Ads AW-18285479572; Meta 5294875050737022. No extra tag bootstrap | Verified published configuration |
| Consent and duplicates | Entire GTM container gated because its Meta template is not Google-consent-aware; redundant standalone Meta bootstrap removed | Implemented |
| Meta Conversions API | No established CAPI implementation found in the website; no secret or new server tracker invented | Not configured |
| SEO | Canonicals, titles/descriptions, OG/Twitter, H1/H2/H3, LocalBusiness + Service + visible FAQ + breadcrumbs, alt text, sitemap priorities | Implemented |
| Navigation | Top navigation, keyboard-accessible Services hover/focus menu, mobile navigation, services index, home cards, footer, cross-links | Implemented |
| Responsive/accessibility | Responsive grids, semantic details, labels, focus styles, reduced motion, mobile sticky controls | Testing recorded in report |
| Production release | Preview and checks first; scope confirmation and production approval required by user's request | Pending |
