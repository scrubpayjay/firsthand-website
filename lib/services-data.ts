import { SITE_URL } from "./site-config";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface ServicePage {
  slug: string;
  name: string;
  /** Page title — kept under 60 chars including " | Firsthand Lawns" template suffix */
  title: string;
  /** Meta description — 140–155 chars */
  description: string;
  /** H1 keyword-led headline */
  h1: string;
  /** 2-3 intro paragraphs, no AI-slop */
  intro: string[];
  /** "What's included" — specific bulleted items */
  includes: string[];
  /** 4-6 ordered process steps */
  process: ProcessStep[];
  /** 3-4 specific differentiators for this service */
  why: ProcessStep[];
  faqs: ServiceFaq[];
  /** Slugs of related services to cross-link to */
  related: string[];
  /** Display strings for cost + timeline (price/range) — surfaced in sidebar */
  priceRange?: string;
  timeline?: string;
  /**
   * Sidebar label for the timeline field. Defaults to "Timeline" — most
   * services describe a project duration. Recurring services like lawn
   * maintenance override to "Frequency" since the value describes cadence,
   * not how long a one-off project takes.
   */
  timelineLabel?: string;
  /** True if this service was added in the new build and Ryan hasn't confirmed
   * the company is currently offering it. Shows a [RYAN: confirm] banner. */
  needsConfirm: boolean;
  /**
   * Optional dedicated gallery section rendered below "What's Included".
   * For services where the single What's-Included photo isn't enough proof
   * — e.g. Property Cleanup, where before/after composites are the core
   * sales argument. Photo srcs match entries in lib/photos-manifest.ts.
   */
  gallery?: {
    heading: string;
    intro?: string;
    photoSrcs: string[];
  };
}

export const SERVICE_PAGES: ServicePage[] = [
  // ── 1. Lawn Maintenance ───────────────────────────────────────────────
  {
    slug: "lawn-maintenance",
    name: "Lawn Maintenance",
    title: "Lawn Maintenance in Winter Park & Orlando",
    description:
      "Weekly or biweekly lawn maintenance for Winter Park, Windermere, Bay Hill, College Park, and Orlando. Cut at the right height for St. Augustine and Zoysia. Same crew, same day.",
    h1: "Lawn Maintenance in Winter Park & Central Florida",
    intro: [
      "Most lawn services in Central Florida treat every yard the same — same blade height, same edging, same speed. That works on a six-month timeline. Then your St. Augustine starts scalping out, the curb edges get gouged, and by the time you notice the damage you're a year and a couple thousand dollars into the wrong relationship.",
      "We mow Floratam and Palmetto at 3.5 to 4 inches, Empire Zoysia at 1.5 to 2 inches, and we sharpen blades on a fixed rotation so the cut is clean every visit. The crew that shows up at your property in May is the same crew that's there in October. Property managers get CompanyCam reports the same day, not at month-end.",
      "Residential service runs weekly or biweekly. Commercial and HOA contracts get scoped to whatever your property and budget call for — we'll write up a real proposal after a walk-through, not a flat per-square-foot rate guessed from satellite.",
    ],
    includes: [
      "Mowing at the correct height for your specific turf type",
      "String trimming around foundations, fences, and tree rings",
      "Edging walkways, driveways, and curbs with a steel blade — not a string",
      "Blowing all hardscape and walkways clean before we leave",
      "Quick visual inspection of irrigation runs (broken heads, dry spots, fungus)",
      "Bed weeding (light, ongoing) — bigger pulls quoted separately",
      "Seasonal mowing-height adjustments for winter dormancy and summer growth",
      "Shrub touch-ups during regular visits (formal pruning quoted as needed)",
      "Hauling all clippings off-property — no mulched piles left behind",
      "CompanyCam visit log: time-stamped photos so you see the work whether you're home or not",
    ],
    process: [
      {
        title: "Initial walk-through",
        body: "We come out to look at the property, measure turf area, and check irrigation. Takes 20–30 minutes. No charge.",
      },
      {
        title: "Written proposal",
        body: "We send a per-visit price (weekly or biweekly), what's included, what's billed separately. Usually within two business days.",
      },
      {
        title: "First visit",
        body: "First mow is usually scheduled within a week of signing. We confirm a day-of-week slot and stick to it.",
      },
      {
        title: "Ongoing service",
        body: "Same crew, same day, year-round. Mowing frequency drops in winter for dormant St. Augustine — the contract reflects that, you're not paying for visits we don't need to make.",
      },
      {
        title: "Quarterly check-in",
        body: "We flag bigger needs — bed refreshes, shrub pruning, irrigation issues, fertilizer windows — before they become problems.",
      },
    ],
    why: [
      {
        title: "Right blade height, every time.",
        body: "Mowing St. Augustine below 3.5 inches stresses the runners and opens the door to chinch bugs and weeds. Most landscape crews mow everything at 2.5 because it's faster. We don't.",
      },
      {
        title: "Same crew, on the same day.",
        body: "We don't subcontract. The team that learned your property in week one is the team that mows it in week fifty-two. That's how curb edges stop getting scalped.",
      },
      {
        title: "Documented every visit.",
        body: "Every visit is logged in CompanyCam with photos. Property managers can pull a report by site in two clicks; homeowners can scroll back and see what their yard looked like in April.",
      },
      {
        title: "We flag problems early.",
        body: "Brown patch in winter, Take-All Root Rot in summer rains, chinch bugs in August — we tell you before it spreads, not after the patch is dead.",
      },
    ],
    faqs: [
      {
        q: "Weekly or biweekly?",
        a: "Weekly through the growing season (roughly March through October in Central Florida); biweekly is fine for shaded lots or zoysia lawns that grow slower. We'll recommend the right cadence after walking the property.",
      },
      {
        q: "What does it cost?",
        a: "Residential lots in our service area run $175–$350 per month, depending on lot size and access. Larger properties, HOAs, and commercial contracts get custom-scoped. We don't quote without seeing the yard.",
      },
      {
        q: "Do you handle fertilizer and pest control?",
        a: "We handle ongoing fertilization on a separate schedule (we don't bundle it into mowing because the timing's different). For chemical pest applications, we partner with a licensed FL pest-control company — turf insect treatment requires a different license than landscape.",
      },
      {
        q: "What about Orange County watering restrictions?",
        a: "We follow the SJRWMD schedule for your address (currently one day per week during EST, two days per week during DST), and we don't recommend running zones outside your allowed days. If we see overwatering during a visit, we tell you.",
      },
      {
        q: "What if you skip a week because of weather?",
        a: "Florida thunderstorms shut down mowing days a few times a year. We reschedule to later in the same week if possible. If we miss outright, you don't pay for that visit.",
      },
      {
        q: "Do you mow commercial properties or HOAs?",
        a: "Yes — that's a big share of our work. We manage multi-property contracts for property management firms across Orlando, and we hold the licensing and insurance commercial vendors need. Certificates available on request.",
      },
      {
        q: "Can I cancel?",
        a: "Yes. Maintenance contracts are month-to-month after a 30-day initial period — we don't lock you in on a yearly contract. If we're not the right fit, we'd rather know.",
      },
    ],
    related: ["sod-installation", "irrigation", "landscape-design", "property-cleanup"],
    priceRange: "$175–$350/month (residential)",
    timeline: "Weekly in summer, bi-weekly in winter",
    timelineLabel: "Frequency",
    needsConfirm: false,
  },

  // ── 2. Landscape Design ───────────────────────────────────────────────
  {
    slug: "landscape-design",
    name: "Landscape Design & Installation",
    title: "Landscape Design & Installation in Winter Park, FL",
    description:
      "Custom landscape design and installation for Central Florida homes. Plant palettes, hardscape, lighting, and irrigation — designed and installed by the same team in Winter Park, Windermere, and Bay Hill.",
    h1: "Landscape Design & Installation in Winter Park & Central Florida",
    intro: [
      "A landscape design that wins a Pinterest board doesn't necessarily survive Central Florida. Plants that thrive in a Connecticut garden book bake in our July sun; plants that don't tolerate sandy, fast-draining soil sulk for a year and die. The design itself is the part you remember — the plant selection is what makes it last.",
      "Most of our designs lean heavily on plants that already belong here: firebush, plumbago, ixora, dwarf yaupon, muhly grass, coontie, saw palmetto, native viburnum. They're drought-tolerant, pollinator-friendly, and most of them don't care if we get a freak January freeze. We layer them with the right specimen trees (live oak, magnolia, palms) and finish with bed lines that won't migrate when the rains hit.",
      "We design and install in-house. That means the renderings you sign off on are the renderings the same crew builds — no handoff to a separate contractor who reads the drawings differently. And if you're in an HOA-controlled community (Windermere, Bay Hill, Doctor Phillips), we draft the ARC submittal package for you.",
    ],
    includes: [
      "On-site walk-through and measurement (we don't design from a satellite image)",
      "Conceptual plan with plant schedule, hardscape callouts, and lighting locations",
      "Optional 3D rendering for backyard renovations and full-property designs",
      "Plant palette built around Central Florida sun exposure and your soil type",
      "Irrigation tie-in design — new zones, drip lines, controller adjustments",
      "Low-voltage landscape lighting layout (paths, uplighting, accent)",
      "HOA submittal package — Architectural Review Committee–ready drawings",
      "Drainage and grading review (sandy soil is fast-draining, but low spots still pool)",
      "Hardscape callouts: bed edges, walkways, patio, retaining walls",
      "Material specification (mulch type, sod variety, plant container sizes)",
      "Install by the same crew that drew the plan",
      "Six-month plant warranty on installed material",
    ],
    process: [
      {
        title: "Site walk",
        body: "Ryan (or our designer) walks the property with you — usually 60–90 minutes. We look at sun exposure, drainage, existing trees, sightlines, and what you're actually using each part of the yard for.",
      },
      {
        title: "Concept + budget alignment",
        body: "We sketch a concept and walk it back to you with a budget range. This is where we calibrate scope — full design install, phased over two years, just front yard, etc.",
      },
      {
        title: "Detailed plan",
        body: "Once direction is locked in, we draft the detailed plan: plant schedule with sizes and quantities, hardscape callouts, lighting plan, irrigation revisions. 3D rendering if you want one.",
      },
      {
        title: "HOA submittal (if needed)",
        body: "For Windermere, Bay Hill, Doctor Phillips, Isleworth and other ARC communities, we package and submit on your behalf. We know which boards are picky about what.",
      },
      {
        title: "Install",
        body: "Crew goes in. Typical full install runs 3–8 days depending on scope. We protect existing turf, haul all debris, and clean up daily before leaving the site.",
      },
      {
        title: "Walk-through and warranty",
        body: "We walk the finished install with you, point out what to water and how often, and put the warranty on file. We check back at 30 days and again at 90.",
      },
    ],
    why: [
      {
        title: "Designed for the climate you actually have.",
        body: "Our plant palettes lean toward natives and FL-Friendly material — firebush, plumbago, ixora, muhly grass, coontie. They handle our heat and rainfall patterns without supplemental watering after establishment.",
      },
      {
        title: "Same hands draw it and install it.",
        body: "Designs that look good in CAD sometimes fall apart in execution. Because the crew that builds the install was part of the conversation when we drew it, the plan we sign matches the yard we deliver.",
      },
      {
        title: "HOA-fluent.",
        body: "We've gotten approvals through Isleworth, Keene's Pointe, Eagle Creek, Doctor Phillips Country Club, and most of Bay Hill. We know which plants and materials will sail through and which will get kicked back.",
      },
      {
        title: "Phased pricing if you want it.",
        body: "Full property designs can land in the $10K–$60K range. We routinely phase the install over two seasons so you can spread the spend — front yard year one, backyard year two — without losing the cohesion of a single plan.",
      },
    ],
    faqs: [
      {
        q: "What does a landscape design cost?",
        a: "Design fees usually run $500–$2,500 depending on scope (single bed refresh vs. full property). Larger designs roll the design fee into the install when you move forward. Full installs in our service area typically run $5K–$50K.",
      },
      {
        q: "How long does it take?",
        a: "From first walk to install start, plan on 2–4 weeks for residential design. ARC-submitted projects add 2–6 weeks depending on the community's review schedule.",
      },
      {
        q: "Do you do 3D renderings?",
        a: "On request, especially for backyard renovations and projects above $20K. They're useful for spousal sign-off and HOA submittals; not strictly necessary for a single-bed refresh.",
      },
      {
        q: "What about HOA submittals?",
        a: "We submit on your behalf. We draft the ARC package — drawings, plant list with photos, materials, color samples — and send it in. We know which boards are sticklers about what.",
      },
      {
        q: "Native plants only, or are non-natives OK?",
        a: "We lean native and FL-Friendly because they survive better and need less water, but we'll use the right plant for the spot — not just the most native one. Customers who want a strict native palette get one; customers who want camellias get camellias.",
      },
      {
        q: "Do you handle the irrigation as part of the design?",
        a: "Yes. Most full-property designs include irrigation review or replacement. New beds usually need drip added; new trees need temporary bubblers for the first year. It all lives in one quote.",
      },
      {
        q: "What's the warranty?",
        a: "Six months on installed plant material — replacement if it dies under normal care. Hardscape carries the manufacturer's structural warranty (paver, travertine, etc.) plus our workmanship warranty.",
      },
    ],
    related: ["sod-installation", "irrigation", "hardscape-installation", "property-cleanup"],
    priceRange: "$500–$2,500 design · installs $5K–$50K",
    timeline: "2–4 weeks consult to install",
    needsConfirm: false,
  },

  // ── 3. Sod Installation ───────────────────────────────────────────────
  {
    slug: "sod-installation",
    name: "Sod Installation",
    title: "Sod Installation in Winter Park, FL — Floratam, Palmetto, Zoysia",
    description:
      "Sod installation in Winter Park, Windermere, and Orlando. Floratam, Palmetto, and Empire Zoysia laid over a properly graded base. The prep is what makes it root.",
    h1: "Sod Installation in Winter Park & Central Florida",
    intro: [
      "The reason most new sod browns out in the first 60 days has almost nothing to do with the sod itself. Floratam, Palmetto, and Zoysia all root fine when they're laid on the right base, watered the right way, and rolled in the first week. Most failed installs we get called to fix were either dropped on dead old turf, laid over uneven dirt, or never watered enough in the first ten days.",
      "Our sod jobs are a one-day install most of the time, but the prep is the day before. We strip the old turf, run a quick grade so water actually moves toward your drainage, check your irrigation coverage on every zone, and then lay fresh sod with tight seams. Roller passes the same afternoon. Watering schedule handed to you in writing.",
      "We mostly install Floratam (full sun, the Central Florida default), Palmetto (handles partial shade better), and Empire Zoysia (premium, drought-tolerant, finer blade). We'll tell you straight which one fits your yard — Floratam in 70% shade is a $4,000 mistake.",
    ],
    includes: [
      "Removal and disposal of existing turf (sod cutter pass, not just kill-and-cover)",
      "Light grading to correct low spots and move water toward drainage",
      "Irrigation coverage check across every zone before we lay",
      "Fresh sod cut from FL farms — typically within 24 hours of harvest",
      "Tight-seam installation, edges trimmed clean against beds and hardscape",
      "Roller pass to set the sod against the soil and eliminate air pockets",
      "Starter fertilizer broadcast over the install",
      "Written watering schedule for the first 14 days",
      "Two follow-up site visits (day 7 and day 30) to check root strike",
      "Haul-off of all old turf — your dumpster doesn't fill up",
    ],
    process: [
      {
        title: "Walk-through and turf-type recommendation",
        body: "We look at sun exposure, slope, irrigation coverage, and what you're using the space for. Then we recommend Floratam, Palmetto, Empire Zoysia, or in rare cases, Bermuda.",
      },
      {
        title: "Quote and schedule",
        body: "We send a quote with square footage, turf type, and prep included. Once approved, we schedule install — usually within one to two weeks depending on time of year.",
      },
      {
        title: "Day before: prep",
        body: "Sod cutter removes the old turf, we grade low spots, and we run every irrigation zone to confirm coverage. Anything broken gets flagged before the new sod goes down.",
      },
      {
        title: "Install day",
        body: "Fresh sod delivered same morning. Crew lays seams tight, trims edges, runs the roller, broadcasts starter fertilizer.",
      },
      {
        title: "Watering — first 14 days",
        body: "We hand you a printed schedule. Typical pattern: three short cycles per day for the first week, two cycles for week two, then taper to normal. We come back at day 7 to verify root strike.",
      },
      {
        title: "30-day follow-up",
        body: "We come back at 30 days, walk the yard with you, check that everything's rooted and there are no thin spots. Anything that's not establishing gets replaced.",
      },
    ],
    why: [
      {
        title: "We don't skip the grade.",
        body: "Most sod failures we see weren't sod problems — they were base problems. A 2-inch low spot pools water and rots the runners; a high spot dries out and yellows. We grade before we lay, every job.",
      },
      {
        title: "Fresh from the farm.",
        body: "We buy sod from FL farms within 24 hours of cut and install it the same day. Sod that sits on a pallet for three days under shrink-wrap is sod that won't establish.",
      },
      {
        title: "Water plan in writing.",
        body: "We hand you a printed schedule so the watering question isn't a guess. We also set your controller if you'd like.",
      },
      {
        title: "We come back at 7 and 30 days.",
        body: "Two no-charge follow-up visits to verify root strike. Anything thin gets replaced under our warranty.",
      },
    ],
    faqs: [
      {
        q: "How much does sod cost in Central Florida?",
        a: "Installed cost typically runs $1.50–$3.50 per square foot. Floratam is the cheapest, Empire Zoysia roughly 50–80% more. Prep work — old turf removal, grading, irrigation fixes — is the variable that moves a quote up or down.",
      },
      {
        q: "How long does it take?",
        a: "Standard residential sod install is one day. If we're also fixing irrigation or doing significant grading, we add a half- to full-day of prep the day before.",
      },
      {
        q: "Floratam, Palmetto, or Zoysia — which one?",
        a: "Floratam if your yard is full sun and you want classic St. Augustine; Palmetto if you have partial shade (under oak canopy especially); Empire Zoysia if you want a finer-bladed, more drought-tolerant lawn and you'll pay roughly 50% more for it. We walk through this on the site visit.",
      },
      {
        q: "When can I walk on the new sod?",
        a: "Light foot traffic after the first watering. Heavy traffic (kids playing, dog runs) wait until day 14. First mow at day 14 with the blade set high.",
      },
      {
        q: "Do I need to fix irrigation first?",
        a: "Yes, before we lay. Sod can't establish without consistent water in the first two weeks. If we find broken heads or zone issues during prep, we'll quote the fix; we won't lay sod over a broken zone and hope.",
      },
      {
        q: "What's your warranty?",
        a: "We replace any sod that fails to establish under our watering schedule within 30 days. Failures from underwatering, overwatering after the schedule ends, or pest damage outside our control aren't covered — but we'll diagnose with you and quote a fix.",
      },
      {
        q: "Best time of year to install sod in Central Florida?",
        a: "Spring (March–May) and fall (September–November) are ideal — moderate temperatures and predictable rain. Summer installs work but need more aggressive watering; winter installs work for Floratam and Zoysia but root strike is slower.",
      },
    ],
    related: ["lawn-maintenance", "irrigation", "landscape-design"],
    priceRange: "$1.50–$3.50 / sq ft installed",
    timeline: "1–2 days (prep + install)",
    needsConfirm: false,
  },

  // ── 4. Irrigation ──────────────────────────────────────────────────────
  {
    slug: "irrigation",
    name: "Irrigation",
    title: "Irrigation Installation & Repair in Winter Park, FL",
    description:
      "Irrigation install, repair, and zone audits in Winter Park, Windermere, and Orlando. Smart controllers, broken-head fixes, leaky valves. Most upgrades pay back in a billing cycle.",
    h1: "Irrigation in Winter Park & Central Florida",
    intro: [
      "A lot of Central Florida lawns are watered to death by systems nobody's looked at in a decade. Heads are mismatched, zones are timed for the season they were installed in, valves leak quietly through the meter. The owner sees a green yard and pays the OUC bill and assumes everything's fine. The audit usually finds three things wrong on a system that's been running for 15 years.",
      "We install, repair, and audit irrigation across Winter Park, Windermere, Bay Hill, College Park, and the rest of Central Florida. New installs lean on Hunter and Rain Bird hardware, smart controllers from Rachio or Hunter Hydrawise, drip in beds, and proper pressure regulation. Repairs are usually fast — a broken lateral, a stuck valve, a controller that lost its programming after a power blip.",
      "Most homes that bring us in for an upgrade see the water bill drop measurably the next cycle. Smart controllers pull from local rain data and skip cycles automatically. That's required in Florida now (rain sensor mandate) but most systems we touch don't have one wired correctly.",
    ],
    includes: [
      "Full system audit — every zone tested, every head checked, coverage mapped",
      "Catch-can uniformity test on request (commercial / large residential)",
      "Smart controller install (Rachio, Hunter Hydrawise) with weather-based skip",
      "Rain sensor install (required by FL law; surprising how often it's missing)",
      "Broken head and lateral repairs",
      "Valve replacement and rebuild — leaking solenoids, stuck valves",
      "Pressure regulation — adjusting heads or installing pressure-reducing valves",
      "Backflow preventer install and rebuild (RPZ and PVB)",
      "Drip irrigation install in beds — better for plants, lower runoff",
      "Zone splits — adding zones where coverage is uneven or property has expanded",
      "Controller programming for current water-restriction schedule",
      "Coordinated install with new sod or landscape projects",
    ],
    process: [
      {
        title: "Audit visit",
        body: "We run every zone and check every head. Takes 60–90 minutes on a typical residential system. We send you a written report with what's working, what's broken, and what we'd change.",
      },
      {
        title: "Quote",
        body: "If it's a quick repair, we can usually do it same-visit. Larger projects (controller swap, new zones, full overhaul) get a written quote within 24–48 hours.",
      },
      {
        title: "Install / repair",
        body: "Most residential repairs are same-day. Smart controller installs and zone additions usually run a full day. We mark every head we touch so you can see exactly what changed.",
      },
      {
        title: "Programming and walk-through",
        body: "We program the controller for your specific zones and the current Orange County watering schedule, then walk you through the app if you've got a smart unit.",
      },
      {
        title: "Follow-up",
        body: "After 30 days we check back to make sure everything's running clean. Most issues that surface are minor — a head that drifted out of pattern, a controller schedule that needs a tweak for the season change.",
      },
    ],
    why: [
      {
        title: "We diagnose before we replace.",
        body: "A lot of irrigation companies push a controller swap on every call. We start with an audit. Sometimes the answer is one new valve and a controller reprogram — $200, not $2,000.",
      },
      {
        title: "Smart controllers we actually configure.",
        body: "Installing a Rachio is the easy part. Getting the zones, soil type, plant type, and sun exposure entered correctly is what makes it skip the right cycles. We do that part too.",
      },
      {
        title: "We work with FL water rules.",
        body: "Orange County enforces one-day-per-week watering during EST, two days during DST, with restrictions on time of day. We program every controller for compliance — and we'll tell you if your system is set up for an unrealistic schedule.",
      },
      {
        title: "Coordinated with sod and design work.",
        body: "If you're installing new sod or new beds, the irrigation needs to be set up before the sod goes down. Because we run sod, design, and irrigation in-house, we coordinate it as one project, not three.",
      },
    ],
    faqs: [
      {
        q: "What does irrigation work cost?",
        a: "Repairs typically run $150–$800 depending on what's broken (a single head replacement is $150; a valve replacement with new wiring runs $300–$600). New full-system installs for a typical 1/4-acre residential lot run $3,000–$8,000. Smart controller swap is $400–$900 installed.",
      },
      {
        q: "How fast can you come for a repair?",
        a: "Most repair calls in our service area get scheduled within 2–5 business days. Urgent issues (water pouring out, system stuck on) we try to get out same-day if we can.",
      },
      {
        q: "Will a smart controller really lower my water bill?",
        a: "On most properties we audit, yes — meaningfully. The biggest gains come from skipping cycles after rain (which most old controllers do badly or not at all) and from getting zones programmed for actual run times instead of a default 20 minutes.",
      },
      {
        q: "Do I need a rain sensor?",
        a: "Yes — Florida law requires one on residential irrigation. We install one with every smart controller install and replace failed sensors as part of audits. Most failures are quiet — the sensor stops cutting the system off after rain.",
      },
      {
        q: "What about Orange County watering days?",
        a: "Currently one day per week during Eastern Standard Time (roughly November to March), two days per week during Daylight Saving Time. Watering allowed before 10am or after 4pm. We program every controller to match.",
      },
      {
        q: "Can you install irrigation in just a new bed?",
        a: "Yes — and we usually recommend drip lines in beds rather than spray heads. Drip waters the root zone, lowers runoff, and doesn't spray water on plant leaves (which encourages fungus in our humidity).",
      },
      {
        q: "Do you do well-water systems?",
        a: "Yes. Well systems have different pressure characteristics — sometimes too high, sometimes too low — and the heads need to be matched accordingly. We adjust as needed.",
      },
    ],
    related: ["sod-installation", "lawn-maintenance", "landscape-design"],
    priceRange: "Repairs $150–$800 · new install $3K–$8K",
    timeline: "Same-day repairs · 1–3 day installs",
    needsConfirm: false,
  },

  // ── 5. Hardscape Installation [needs Ryan confirm] ────────────────────
  {
    slug: "hardscape-installation",
    name: "Hardscape Installation",
    title: "Paver Patios & Hardscape Installation in Winter Park, FL",
    description:
      "Paver patios, walkways, and retaining walls in Winter Park, Windermere, and Orlando. Properly compacted base, polymeric sand joints. The base is what makes them last.",
    h1: "Hardscape Installation in Winter Park & Central Florida",
    intro: [
      "Hardscape failures in Central Florida are almost always base failures. Sandy soil settles, drainage moves the substrate around, and a paver patio installed on an inadequate base will rock and tilt within three years. The pavers themselves are the easy part — sourcing them takes a phone call. The four inches of compacted base under them is what separates a patio that lasts ten years from one that needs to be relaid after five.",
      "Our hardscape work is mostly paver patios, walkways, driveways, and retaining walls. We do travertine, concrete paver, and natural stone. Standard base depth on patios runs 4–6 inches of compacted limerock with a 1-inch sand setting bed. Joints get polymeric sand, which locks the pavers in place and resists weed growth and washout.",
      "We don't subcontract hardscape work to a separate crew. The team that ran your landscape install also runs the patio install. That matters when the two pieces have to fit together — bed lines that hit a patio edge, irrigation that has to be re-routed under a walkway, slope that has to drain water away from the foundation.",
    ],
    includes: [
      "Site marking and elevation review (we check slope away from foundation)",
      "Excavation to design depth (typically 6–10\" for patios)",
      "Geotextile fabric over native soil to prevent migration",
      "Compacted limerock base in 2\" lifts — proper compaction at each lift",
      "1\" sand setting bed, screeded level",
      "Paver, travertine, or natural stone install (your choice of material)",
      "Polymeric sand joints — locks pavers, resists weed growth and washout",
      "Edge restraint (snap-down or concrete haunch)",
      "Final sweep and water-in of polymeric sand",
      "Drainage tie-in: French drain or surface drain if grading requires",
      "Full cleanup — no spoils or pallets left on site",
      "Manufacturer's structural warranty on materials + our workmanship warranty",
    ],
    process: [
      {
        title: "Site walk and material selection",
        body: "We walk the area, look at slope and drainage, and pull material samples. Travertine vs. paver vs. natural stone gets decided here. Patio shape and size get sketched.",
      },
      {
        title: "Design and quote",
        body: "We send a quote with material, square footage, base depth, and timeline. Larger projects get a sketched layout or 3D rendering.",
      },
      {
        title: "Permits if required",
        body: "Most residential patios don't require a permit, but some HOAs and larger projects do. If it's required, we pull it.",
      },
      {
        title: "Excavation and base",
        body: "Day one and two: excavate, lay geotextile, build the compacted base. This is the part nobody can see once we're done. It's also the part that matters most.",
      },
      {
        title: "Install",
        body: "Pavers go in. Pattern, cuts at edges, polymeric sand in joints. Edge restraint locked. Final sweep and a controlled water-in to activate the polymeric.",
      },
      {
        title: "Walk-through",
        body: "We walk the finished patio with you and put the warranty on file. Polymeric sand needs 24 hours dry to fully cure before heavy use.",
      },
    ],
    why: [
      {
        title: "Base depth nobody else quotes.",
        body: "Our standard patio base is 4–6 inches of compacted limerock. The cheapest quotes you'll get from competitors are usually skimping here — 2 inches uncompacted. You won't see the difference at install. You'll see it in three years.",
      },
      {
        title: "Polymeric sand, not regular sand.",
        body: "Regular silica sand washes out of paver joints in our rainy season. Polymeric sand sets up with water, locks pavers in place, and resists weed growth. Worth the upcharge.",
      },
      {
        title: "Drainage planned into the design.",
        body: "Sandy soil drains fast, but a patio is impervious — water has to go somewhere. We plan slope and drainage before we excavate, not after we notice puddling.",
      },
      {
        title: "Tied into your landscape.",
        body: "Bed lines, irrigation, lighting, and patio edges all have to land cleanly together. Because we run hardscape and landscape together, the seams come out clean.",
      },
    ],
    faqs: [
      {
        q: "What does a paver patio cost?",
        a: "Installed cost typically runs $10–$15 per square foot depending on material and base requirements. Travertine and large-format pavers run higher. A 300 sq ft patio with proper base lands roughly $3,000–$4,500.",
      },
      {
        q: "How long does it take?",
        a: "Most residential patios install in 1–5 days from excavation to final sweep. Larger projects with retaining walls or outdoor kitchen bases take 7–14 days. Weather can add a day here and there.",
      },
      {
        q: "Travertine, concrete paver, or natural stone?",
        a: "Travertine stays cooler underfoot (matters for pool decks), but it's more porous and stains faster. Concrete pavers are the durable workhorse — broadest color range, lowest cost. Natural stone is the most expensive and the most unique.",
      },
      {
        q: "Will my pavers shift over time?",
        a: "Properly installed pavers (proper base depth, polymeric sand joints, edge restraint) should hold for 10–15+ years before any real movement. Cheap installs we've been called to fix start shifting in 2–4 years.",
      },
      {
        q: "Do I need a permit?",
        a: "For most residential patios in our service area, no. Larger projects, structural retaining walls over 3 feet, or HOA-controlled communities can require a permit or HOA approval. We pull what's needed.",
      },
      {
        q: "What about pool decks?",
        a: "Yes — paver and travertine pool decks are a big part of our work. Travertine is the popular choice for pool decks because it stays cooler underfoot.",
      },
      {
        q: "What's the warranty?",
        a: "Manufacturer's structural warranty on the paver/travertine material (usually 20+ years) plus our 2-year workmanship warranty on installation. Settlement issues from improper base get fixed under workmanship.",
      },
    ],
    related: ["landscape-design", "irrigation", "lawn-maintenance"],
    priceRange: "$10–$15 / sq ft installed",
    timeline: "1–5 days typical install",
    needsConfirm: true,
  },

  // ── 6. Tree Trimming & Removal [needs Ryan confirm] ───────────────────
  {
    slug: "tree-trimming-removal",
    name: "Tree Trimming & Removal",
    title: "Tree Trimming & Removal in Winter Park & Orlando",
    description:
      "Tree trimming, removal, and hurricane-season prep across Winter Park, Windermere, Bay Hill, College Park, and Orlando. Proper rigging, no roof scrapes, full debris haul.",
    h1: "Tree Trimming & Removal in Winter Park & Central Florida",
    intro: [
      "Hurricane season in Central Florida runs June through November. The work that prevents storm damage happens in April and May — thinning out laurel oaks before they catch wind, dropping the dead limbs that will fall first, balancing the canopy on trees that have grown one-sided. The work that responds to storm damage happens between mid-June and the end of November and looks completely different.",
      "We do both. Pre-season trimming is mostly preventive — crown thinning to reduce wind load, dead-wood removal, raising lower limbs that have started rubbing the roof. Storm response is reactive — limbs on roofs, trees across driveways, root-ball failures. Both need proper rigging, ground protection, and disposal.",
      "We use bucket trucks where access allows, climbing rigs where it doesn't. Every limb above a structure gets rigged down, not dropped. We protect turf with plywood under access points. Debris hauled off in a single trip — nothing left on the curb for the city to bill you for.",
    ],
    includes: [
      "Crown thinning — reduce density to lower wind load before hurricane season",
      "Crown raising — lift lower limbs off rooflines, walkways, sightlines",
      "Dead-wood removal — pull dead limbs before they fall on their own",
      "Structural pruning — corrective cuts on younger trees, balance asymmetric growth",
      "Full removals with proper rigging — no drops onto turf or hardscape",
      "Storm-damage response — hung limbs, root-failure leaners, blocked access",
      "Palm trimming (Sabal, Queen, Foxtail) including nutrient deficiency assessment",
      "Coordination with Duke Energy for limbs near power lines (when required)",
      "Ground protection during operations (plywood paths, turf protection)",
      "Full debris haul-off — no piles left on the curb",
      "Stump grinding tie-in (see separate service for stump-only work)",
      "Documentation in CompanyCam for HOA / insurance claims",
    ],
    process: [
      {
        title: "Site assessment",
        body: "We walk the property and look at each tree you're concerned about. We tell you what should come down, what should stay, and what can be trimmed back instead of removed. Honest answer, even if it loses us the bigger job.",
      },
      {
        title: "Quote",
        body: "Written quote with tree-by-tree scope (trim, remove, dead-wood) and price. Storm emergencies skip this step — we mobilize first and confirm scope on-site.",
      },
      {
        title: "Schedule",
        body: "Pre-season trimming gets scheduled 1–2 weeks out. Storm response is same-day to 48-hour depending on volume. Emergency hazards (tree on a structure) we triage first.",
      },
      {
        title: "Work day",
        body: "Crew arrives with bucket truck or climbing gear, ground protection, and chipper. Limbs above structures get rigged down. Cuts are made at proper collars, not flush.",
      },
      {
        title: "Cleanup",
        body: "All debris chipped or hauled. Turf raked clean of sawdust. Stumps left at grade unless you've also booked grinding (we recommend it — the alternative is a 5-year wait for natural decay).",
      },
    ],
    why: [
      {
        title: "Proper rigging on every limb above a structure.",
        body: "We don't drop limbs onto roofs or pool cages. Every overhead cut gets rigged down with a climber or bucket operator controlling the descent. It's slower. It's why nothing gets damaged.",
      },
      {
        title: "Cuts at the collar, not flush.",
        body: "Flush cuts open the tree to fungal infection. Stub cuts leave dead wood that won't heal. We cut at the branch collar, which is the only cut that lets the tree compartmentalize the wound.",
      },
      {
        title: "Hurricane-season triage.",
        body: "Storm response we triage by hazard level — tree on a structure first, blocking driveway second, hanging limbs third. We tell you straight where you are in the queue.",
      },
      {
        title: "We don't oversell removals.",
        body: "A lot of tree services lead with removal because removals are bigger tickets than trim work. We trim when trimming is the right call and only recommend removal when the tree is hazardous or beyond saving.",
      },
    ],
    faqs: [
      {
        q: "What does tree work cost?",
        a: "Trimming a mid-size tree (20–40 feet) typically runs $300–$700 depending on access and waste volume. Removals run $400–$3,000+ depending on size, proximity to structures, and rigging requirements. Storm damage we quote on-site after triage.",
      },
      {
        q: "When should I trim trees before hurricane season?",
        a: "April through early June is ideal. You want the canopy thinned before the first storms but not so early that new growth fills back in. Live oaks and laurel oaks especially benefit from a pre-season thin.",
      },
      {
        q: "Will you work on trees near power lines?",
        a: "We work up to a limited clearance from Duke Energy lines. Anything closer than that, we coordinate with Duke — they have a tree-trim program that handles primary lines at no cost to homeowners.",
      },
      {
        q: "What about palm trees?",
        a: "Yes — palm trimming is a big part of summer work. We trim fronds back to natural shape (not over-trimmed “hurricane cuts” that stress the tree), and we'll flag nutrient deficiencies (boron, potassium) that show up in palms.",
      },
      {
        q: "Can you handle a tree that's already fallen?",
        a: "Yes — storm cleanup is a big part of our June–November work. We clear, cut, haul, and grind stumps. We document everything in CompanyCam for your insurance claim if you need it.",
      },
      {
        q: "What about stump grinding?",
        a: "Separate service but we usually bundle it. Grinding a stump down 6–12 inches below grade lets you replant or re-sod over it. See our stump grinding page for details.",
      },
    ],
    related: ["stump-grinding-removal", "bamboo-trimming-removal", "landscape-design", "property-cleanup"],
    priceRange: "Trim $300–$700 · removal $400–$3,000+",
    timeline: "Same-day storm response · 1–2 weeks scheduled",
    needsConfirm: true,
  },

  // ── 7. Stump Grinding & Removal [needs Ryan confirm] ──────────────────
  {
    slug: "stump-grinding-removal",
    name: "Stump Grinding & Removal",
    title: "Stump Grinding & Removal in Winter Park & Orlando",
    description:
      "Stump grinding in Winter Park, Windermere, and Orlando. Ground 6–12 inches below grade so you can replant, re-sod, or pour over. Same-day work on most jobs.",
    h1: "Stump Grinding & Removal in Winter Park & Central Florida",
    intro: [
      "After a tree comes down, the stump is what's left to deal with. You can wait five years for it to rot on its own — bad call, because in Central Florida humidity it becomes a termite condo first — or you can grind it down below grade and move on. Most jobs we grind 6 to 12 inches under the surface, which is enough to replant a tree, lay new sod, or pour a slab right over.",
      "Grinding's faster than digging out the entire root ball. Digging usually means a small excavator, replacing a couple yards of fill dirt, and tearing up surrounding turf in the process. Grinding leaves a controlled hole, the chips can be left on site or hauled, and the surrounding area stays untouched. The roots stay in the ground and decay naturally over the next several years.",
      "Most stumps we grind are leftovers from our own tree removals. We also get a lot of calls from homeowners who removed a tree a year ago and finally got tired of mowing around the stump. Same job either way.",
    ],
    includes: [
      "Grinding 6–12 inches below grade (deeper for replants)",
      "Removal of all visible root flare and surface roots within reach",
      "Cleanup of chips — left on-site to backfill the hole, or hauled away",
      "Backfill with native soil and topsoil if you're re-sodding or replanting",
      "Surrounding turf protection during grinding",
      "Marking utilities (Sunshine 811 call) before any deep grind",
      "Multiple-stump pricing — discounted per stump after the first",
      "Documentation photos for HOA records if required",
      "Same-day completion on most single-stump jobs",
      "Coordination with sod or replant scheduling if you're refilling the spot",
    ],
    process: [
      {
        title: "Quote",
        body: "Send us a photo with a tape measure or just the diameter. We can usually quote off a photo for single stumps. Larger or multi-stump jobs get a site visit.",
      },
      {
        title: "Utility marking",
        body: "We call Sunshine 811 before any grinding that requires depth (typically 48 hours ahead). This is a free service and it's how we avoid hitting buried lines.",
      },
      {
        title: "Grind day",
        body: "Grinder rolled in, area marked. Stump ground to target depth. Most single stumps take 30–90 minutes depending on size and root spread.",
      },
      {
        title: "Cleanup",
        body: "Chips either backfilled into the hole (if you're not replanting) or hauled off. If you're re-sodding or replanting, we backfill with topsoil instead.",
      },
    ],
    why: [
      {
        title: "We grind below the replant zone.",
        body: "Standard grind depth is 6 inches. We go 8–12 inches if you're planning to replant a tree or shrub there. The deeper grind lets the new root ball establish without competing with old wood.",
      },
      {
        title: "Sunshine 811 every time.",
        body: "Buried irrigation, low-voltage lighting, sprinkler control wires — all common at stump depths. We call before we grind, every time. The 48-hour wait isn't optional.",
      },
      {
        title: "Multi-stump bulk pricing.",
        body: "If you've got three or more stumps to grind, the per-stump price drops significantly because we're already on-site with the equipment.",
      },
      {
        title: "Coordinated with re-sod or replant.",
        body: "If you're refilling the spot with sod or a new tree, we can schedule the grinding and the replanting together. Backfill goes in clean, no dead chips mixed in.",
      },
    ],
    faqs: [
      {
        q: "What does stump grinding cost?",
        a: "Most single stumps in our service area run $150–$400 depending on diameter and access. Stumps over 30 inches across or in tight access spots can run higher. Multi-stump jobs price drop after the first — usually $75–$150 per additional stump.",
      },
      {
        q: "How long does it take?",
        a: "Most single-stump jobs are 30–90 minutes on site, same-day. Multi-stump jobs take a half-day to full-day depending on count and size.",
      },
      {
        q: "How deep do you grind?",
        a: "Standard grind is 6 inches below grade — enough for sod and shallow plantings. If you're replanting a tree there, we go 8–12 inches so the new root ball isn't competing with old wood.",
      },
      {
        q: "What happens to the chips?",
        a: "Your call. If you're not replanting, we backfill the hole with the chips and top with native soil — costs you nothing. If you're replanting or you want it gone, we haul them off (small extra charge).",
      },
      {
        q: "Will the roots that stay in the ground cause problems?",
        a: "Almost never. Tree roots decompose naturally over 3–7 years underground without surfacing problems. The exception is if you're planting a tree directly into the old root zone — that's why we grind deeper for replants.",
      },
      {
        q: "Do you grind palm stumps?",
        a: "Yes — palm stumps actually grind out easier than hardwood because the fibrous structure breaks down faster. Same pricing as hardwood for similar diameters.",
      },
      {
        q: "What about Sunshine 811 — does that delay the work?",
        a: "It's a 48-hour wait for the utility companies to mark buried lines, by law. We call as soon as you book so the wait runs concurrent with our schedule. Emergency situations (storm cleanup, hazard removal) have an expedited process.",
      },
    ],
    related: ["tree-trimming-removal", "sod-installation", "landscape-design"],
    priceRange: "$150–$400 per stump typical",
    timeline: "Same-day after Sunshine 811 wait",
    needsConfirm: true,
  },

  // ── 8. Bamboo Trimming & Removal [needs Ryan confirm] ─────────────────
  {
    slug: "bamboo-trimming-removal",
    name: "Bamboo Trimming & Removal",
    title: "Bamboo Removal & Trimming in Winter Park & Orlando",
    description:
      "Running and clumping bamboo removal in Winter Park, Windermere, and Orlando. We pull the rhizome network, not just the canes. Containment barriers on request.",
    h1: "Bamboo Trimming & Removal in Winter Park & Central Florida",
    intro: [
      "Bamboo problems in Central Florida usually start the same way — somebody planted a privacy hedge along a fence line a decade ago without knowing whether it was running or clumping bamboo, and the running variety did what running bamboo does. The canes you see are five percent of the problem. The rhizome network underground is the other ninety-five — and it can extend 20 to 30 feet beyond the visible stand into your neighbor's yard, under hardscape, into beds.",
      "Removing bamboo isn't a one-visit job. We dig out the rhizomes mechanically, install root barriers along property lines where the homeowner wants to keep some of the stand, and come back twice to pull the new shoots that always come up after the initial removal. Skip the follow-up visits and it comes back. We've seen DIY removals where the bamboo was back to 6 feet tall within 18 months.",
      "Clumping bamboo is a different conversation entirely — it stays put, doesn't spread aggressively, and the work is mostly cosmetic trimming or thinning. We do both, but the project look completely different.",
    ],
    includes: [
      "Identification — running (Phyllostachys, etc.) vs. clumping (Bambusa, Fargesia)",
      "Initial mechanical removal of all visible canes",
      "Mechanical rhizome excavation — typically 12–18 inches deep, full root zone",
      "Root barrier installation if you're keeping part of the stand",
      "Sheet mulching or solarization where machinery can't access",
      "Two follow-up visits at 60 and 120 days to pull new shoots",
      "Disposal of all bamboo material (it's not standard yard waste — it doesn't compost normally)",
      "Coordination with neighbors when the rhizome network has crossed property lines",
      "Replanting recommendation for the cleared zone",
      "For clumping bamboo: thinning, height management, cosmetic trim",
    ],
    process: [
      {
        title: "Walk-through and identification",
        body: "We confirm whether you've got running or clumping bamboo (it matters — the project is different). We probe to see how far the rhizome network has spread, including across property lines if any.",
      },
      {
        title: "Scope and quote",
        body: "Removal scope depends on stand size and rhizome spread. We send a quote with the initial removal, root barrier installation if needed, and the two follow-up visits already priced in.",
      },
      {
        title: "Initial removal",
        body: "Canes cut, rhizome network excavated mechanically. This is the heavy day — typically 1–3 days depending on stand size and machinery access. Site looks like a construction zone briefly.",
      },
      {
        title: "Root barrier (if applicable)",
        body: "If you're keeping part of the stand, we install a 30 or 60 mil HDPE root barrier along the boundary. Properly installed, it stops the rhizomes from re-establishing where you removed them.",
      },
      {
        title: "60-day follow-up",
        body: "We come back at 60 days. New shoots from missed rhizome fragments will be 6–12 inches tall — we pull them all and re-probe for active spread.",
      },
      {
        title: "120-day follow-up",
        body: "Second follow-up at 120 days. By this point most healthy rhizomes are exhausted; remaining shoots are weak. Final pull, walk-through, and the area is ready for replanting.",
      },
    ],
    why: [
      {
        title: "We dig the rhizome network, not just the canes.",
        body: "Cutting canes is what 90% of homeowners try first. It doesn't work — the rhizome network is the plant, the canes are just expressions of it. We dig.",
      },
      {
        title: "Root barriers that actually work.",
        body: "Cheap barrier material fails within a few years. We use 30–60 mil HDPE barrier rated for bamboo containment. Properly installed (vertical, 30+ inches deep, sealed at seams), it stops re-establishment.",
      },
      {
        title: "Two follow-ups built into the price.",
        body: "Without the 60 and 120-day follow-up visits, the bamboo comes back. We price them in upfront so they happen — the alternative is doing the whole job twice.",
      },
      {
        title: "Honest about timelines and outcomes.",
        body: "Some stands are decades old and the rhizome network has crossed under a driveway or into a neighbor's yard. We'll tell you straight whether we can get all of it or just the bulk. Sometimes the answer is containment, not eradication.",
      },
    ],
    faqs: [
      {
        q: "How much does bamboo removal cost?",
        a: "Small clumping bamboo trim or thin: $300–$800. Running bamboo removal varies dramatically by stand size — small backyard stand $1,500–$4,000, established 20-foot stand $4,000–$10,000+. Rhizome barriers add $40–$80 per linear foot installed.",
      },
      {
        q: "Can't I just cut it down myself?",
        a: "You can cut the canes, but if it's running bamboo the rhizome network underground will send up new shoots — sometimes within weeks. Mechanical removal of the rhizomes is what actually ends it.",
      },
      {
        q: "How do I know if it's running or clumping bamboo?",
        a: "Running bamboo (Phyllostachys species) spreads aggressively underground, often comes up 10+ feet from the original planting. Clumping bamboo (Bambusa, Fargesia) stays in tight clumps and expands very slowly. We identify on the first visit.",
      },
      {
        q: "Will it come back after removal?",
        a: "Without follow-up visits, often yes. With our two follow-up visits at 60 and 120 days, recurrence is rare. If new shoots appear after our final visit, we come back at no charge — that's covered.",
      },
      {
        q: "What if it's crossed onto my neighbor's yard?",
        a: "We coordinate with the neighbor. Sometimes that means doing both sides at once (combined quote), sometimes it means installing a root barrier along the property line to contain it on the source side.",
      },
      {
        q: "Can I keep part of the bamboo and remove the rest?",
        a: "Yes — with a properly installed root barrier between the section you're keeping and the section you're removing. Without a barrier, the rhizomes will recolonize the cleared zone within a year.",
      },
      {
        q: "Can I replant where the bamboo was?",
        a: "Yes, but wait until after the second follow-up visit (120 days) to be sure the rhizomes are exhausted. The soil itself is usually fine — bamboo doesn't deplete it significantly.",
      },
    ],
    related: ["tree-trimming-removal", "stump-grinding-removal", "landscape-design"],
    priceRange: "Trim $300–$800 · removal $1.5K–$10K+",
    timeline: "Initial 1–3 days · two follow-ups across 120 days",
    needsConfirm: true,
  },

  // ── 9. Property Cleanup ───────────────────────────────────────────────
  {
    slug: "property-cleanup",
    name: "Property Cleanup",
    title: "Property Cleanup Services in Central Florida",
    description:
      "Fast, professional property cleanup services across Central Florida. Overgrown property cleanup, foreclosure turnover, storm debris removal. Licensed, insured, hauling included. Free quotes.",
    h1: "Property Cleanup Services in Central Florida",
    intro: [
      "Property cleanup is the work nobody wants to do twice — clearing a yard that's been swallowed by vines and overgrowth, prepping a foreclosure for sale, hauling out storm debris before the HOA fines start. Whether you're calling it property cleanup, property clean up, or property clean-up, the job is the same: get the place from unrentable, unsellable, or out-of-compliance back to presentable. Fast.",
      "Most of our property cleanup services don't require sourcing materials, so we can usually start within the week. Overgrown property cleanup, foreclosure and rental turnover prep, post-storm debris removal, HOA violation cure work — we treat each one as time-sensitive because that's how they usually arrive. Quote on Monday, walking the property by Wednesday, hauling debris by Friday is a typical timeline.",
      "Everything we cut, pull, or pile up leaves with us. Hauling and disposal are always included; you don't end up with a brush pile on the curb waiting for a separate trip. Property managers, real estate investors, and individual owners get the same fast response and the same photo-documented before/after record.",
    ],
    includes: [
      "Overgrown vegetation and brush removal — fast clearing of yards reclaimed by nature",
      "Foreclosure and rental turnover cleanup — get properties rent-ready or sale-ready",
      "Post-storm debris removal — fallen branches, downed trees, scattered debris",
      "HOA violation cure work — bring properties into compliance quickly",
      "Land clearing and brush removal — for new construction prep or yard restoration",
      "Hauling and disposal included — we don't leave piles for you to deal with",
      "Photo documentation in CompanyCam — before and after, every job",
      "Direct invoicing to property management companies and out-of-state owners",
    ],
    process: [
      {
        title: "Same-day quote response",
        body: "Call or send the contact form with property address and a few photos if you've got them. Most property cleanup quotes go out within 24 hours; urgent foreclosure-closing or HOA-violation situations get prioritized.",
      },
      {
        title: "On-site walk if scope warrants it",
        body: "For larger overgrown property cleanup jobs or commercial lots we walk the property first to scope the equipment and crew size needed. Smaller residential cleanups we can scope from photos.",
      },
      {
        title: "Schedule fast — usually within 5-7 days",
        body: "Standard property cleanup work books within a week of quote acceptance. Storm response, HOA violation cure, and foreclosure-closing-date work gets squeezed into the next 48 hours when needed.",
      },
      {
        title: "Crew, equipment, and debris haul",
        body: "Crew arrives with the right combination of mowers, brush cutters, chainsaws, and trailers for the job. Everything we cut leaves with us — no piles waiting for a separate trip.",
      },
      {
        title: "Before/after photo record",
        body: "Every property cleanup job is documented in CompanyCam: before, during, and after. Property managers get the report the day the job closes; out-of-state owners get a clean visual confirmation.",
      },
      {
        title: "Bundle anything else if you need it",
        body: "Property cleanup often pairs with sod installation, tree removal, or a fresh landscape design install. We can quote the whole job at once and stage the work to avoid a second mobilization.",
      },
    ],
    why: [
      {
        title: "Fast turnaround.",
        body: "Property cleanup doesn't require sourcing materials. We can typically start within the week, and storm/foreclosure/HOA work often within 48 hours.",
      },
      {
        title: "Licensed and insured.",
        body: "Fully covered for property work including foreclosure cleanouts, rental turnover, and storm cleanup. Certificates of insurance available on request for property management contracts.",
      },
      {
        title: "Same-week scheduling.",
        body: "Most overgrown property cleanup jobs scheduled and completed within 5–7 business days of quote acceptance. We hold capacity in the schedule for time-sensitive cleanup work.",
      },
      {
        title: "Clean haul-away included.",
        body: "Every branch, leaf, brush pile, and storm-tossed debris pile leaves with us. No separate disposal fee, no curbside pile waiting for a second trip.",
      },
    ],
    faqs: [
      {
        q: "What does property cleanup cost?",
        a: "Costs vary based on property size, condition, and scope. Typical residential property cleanup ranges from $500 to $5,000+. Severely overgrown or commercial lots run higher. Every quote is free — call (407) 337-5191 for an accurate estimate.",
      },
      {
        q: "How fast can you start property clean up work?",
        a: "Most jobs scheduled within 5–7 business days of quote acceptance. For urgent situations — foreclosure closing dates, post-storm, HOA violation cure — we can often start within 48 hours.",
      },
      {
        q: "Do you handle foreclosure and rental turnover cleanups?",
        a: "Yes. We work with property managers, real estate investors, and individual owners on foreclosure cleanouts, rental turnovers, and pre-sale property prep. Quick turnaround, photo documentation, direct invoicing to property management.",
      },
      {
        q: "Do you remove fallen trees and storm debris?",
        a: "Yes. Property cleanup includes hauling away fallen branches, downed trees, and storm-damaged vegetation. Active tree removal coordinates with our tree trimming service.",
      },
      {
        q: "Do you do overgrown property cleanup on commercial lots?",
        a: "Yes — overgrown vacant lots, neglected commercial landscaping, HOA-managed common areas. Pricing scales with property size.",
      },
      {
        q: "What's included in your property cleanup services?",
        a: "Every property cleanup includes vegetation removal, brush clearing, debris haul-away, and disposal. Standard service does not include tree removal (priced separately), sod installation, or new landscape installation — though we can bundle those into the same job.",
      },
    ],
    related: ["lawn-maintenance", "tree-trimming-removal", "landscape-design"],
    priceRange: "$500–$5,000+ typical residential",
    timeline: "Start within 5–7 days · 48hr for urgent",
    needsConfirm: false,
    gallery: {
      heading: "Recent property cleanup transformations",
      intro:
        "Two before/after composites from recent jobs — overgrown to manicured, dirt to fresh sod. Every transformation lives in CompanyCam alongside the rest of the project archive.",
      photoSrcs: [
        "/photos/property-cleanup-hero.jpg",
        "/photos/sod-installation-ryan-1.jpg",
      ],
    },
  },

  // ── 10. Pressure Washing [needs Ryan confirm] ─────────────────────────
  // Off-season service line — pressure washing runs year-round / shoulder
  // season and keeps the crew working. Copy adapted to the site's real NAP
  // (Firsthand Lawns) and actual service areas (Winter Park primary).
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    title: "Pressure Washing in Winter Park & Orlando",
    description:
      "Pressure washing and soft-wash for driveways, pavers, pool decks, and home exteriors across Winter Park, Orlando, Windermere, and Central Florida. Free estimates.",
    h1: "Pressure Washing in Winter Park & Central Florida",
    intro: [
      "Central Florida's heat and humidity are hard on every exterior surface. Algae, mold, mildew, and grime build up fast on driveways, walkways, pavers, and siding — and left alone they don't just look bad. Black streaking eats into concrete, algae makes pool decks slick, and organic growth works its way under paver sealer until the joints let go.",
      "The mistake most people make is treating pressure washing as one setting. A driveway can take 3,000 PSI; stucco, painted siding, and screen enclosures cannot — hit those with a pressure tip and you've stripped paint or driven water behind the wall. We soft-wash the surfaces that need it (low pressure plus a cleaning solution that kills the growth at the root) and reserve high pressure for the hardscape that can take it. Right method, right surface, nothing damaged in the name of getting clean.",
      "You already know us for your lawn and landscape. Pressure washing is the same insured crew you trust on your property, keeping the whole exterior cared for through the shoulder season — one company for the yard and the hardscape, not another vendor to vet.",
    ],
    includes: [
      "Driveways & walkways — lift oil stains, tire marks, algae, and the black streaking that comes back every summer",
      "Paver patios & pool decks — cleaned at safe pressure so joints, sand, and sealer aren't blown out",
      "House exteriors & siding — soft-wash methods that protect stucco, vinyl, and painted surfaces",
      "Fences & wood/composite decks — restored before the staining sets in permanently",
      "Pavers & retaining walls — the hardscape features we install and maintain",
      "Sidewalks, entryways, and curbs — the first thing anyone sees",
      "Rust, irrigation, and fertilizer staining lifted from concrete",
      "Surrounding plants and beds pre-wet and rinsed so cleaning-solution runoff never burns your landscaping",
    ],
    process: [
      {
        title: "Walk-through & estimate",
        body: "We look at the surfaces, note what's hardscape vs. what needs soft-washing, and give you a clear price. Free, usually same visit if we're already on the property.",
      },
      {
        title: "Surface-by-surface plan",
        body: "Concrete and pavers get pressure; stucco, siding, screens, and painted trim get soft-wash. We tell you which is which before we start so there are no surprises.",
      },
      {
        title: "Protect the landscaping",
        body: "Beds, foundation plants, and turf near the work get pre-wet so nothing is exposed to cleaning solution. This is the step most one-truck outfits skip.",
      },
      {
        title: "Wash & rinse",
        body: "We clean the surface, then rinse everything down — including the plants and beds around it. Most single-family homes are done in one visit, two to four hours.",
      },
      {
        title: "Final walk",
        body: "We walk it with you (or send CompanyCam photos if you're not home) so you sign off on the result, not a promise.",
      },
    ],
    why: [
      {
        title: "Right pressure for every surface.",
        body: "Soft-wash for stucco, siding, and screens; high pressure for concrete and pavers. Blasting everything at max PSI is faster and it's how driveways get etched and paint gets stripped — we don't work that way.",
      },
      {
        title: "We protect your landscaping.",
        body: "We already maintain the beds around these surfaces, so we pre-wet and rinse them. The cleaning solution that kills algae will also brown out a foundation planting if nobody's paying attention.",
      },
      {
        title: "One company for the whole exterior.",
        body: "Same insured crew that mows and maintains your property. Adding a wash is a text, not a new vendor, a new estimate, and a new set of strangers on your property.",
      },
      {
        title: "It holds longer.",
        body: "Killing the algae and mold at the root with a soft-wash solution keeps it from growing back in weeks the way a plain water-blast does.",
      },
    ],
    faqs: [
      {
        q: "What's the difference between pressure washing and soft washing?",
        a: "Pressure washing uses high-PSI water — right for concrete driveways, sidewalks, and most pavers. Soft washing uses low pressure plus a cleaning solution that kills algae, mold, and mildew at the root — right for stucco, vinyl and painted siding, screen enclosures, and roofs. Using high pressure on a soft-wash surface is how paint gets stripped and stucco gets damaged, so we match the method to the surface.",
      },
      {
        q: "Will pressure washing damage my pavers or stucco?",
        a: "Not the way we do it. Pavers get cleaned at a pressure that lifts growth without blowing out the joint sand or sealer, and stucco and siding get soft-washed, never blasted. We install and maintain hardscape ourselves, so we know exactly how much a paver patio can take.",
      },
      {
        q: "How often should I have my house and driveway washed in Florida?",
        a: "Most Central Florida homes benefit from a house soft-wash once a year and driveways/pool decks once or twice a year — our heat, humidity, and summer rain grow algae faster than most of the country. North-facing and shaded surfaces green up faster and may want it more often.",
      },
      {
        q: "What does pressure washing cost?",
        a: "Driveways typically start around $99; a full house soft-wash runs roughly $250–$600 depending on size and stories. We quote off the actual surfaces, not a flat rate — ask us for a number after we've seen it.",
      },
      {
        q: "Do you pressure wash roofs?",
        a: "We soft-wash roofs (never high pressure — that strips granules off shingles and voids warranties). If your roof has black streaks or algae, that's a soft-wash job and we'll flag whether it's a good candidate on the walk-through.",
      },
      {
        q: "I'm already a lawn client — can you just add it?",
        a: "Yes, that's the easy path. We're already on your property, we already know the landscaping to protect, and adding a wash is a text. No new vendor, no new estimate visit.",
      },
    ],
    related: ["hardscape-installation", "gutter-cleaning", "property-cleanup"],
    priceRange: "Driveways from $99 · house soft-wash $250–$600",
    timeline: "Most homes done in 2–4 hours, one visit",
    needsConfirm: true,
  },

  // ── 11. Gutter Cleaning [needs Ryan confirm] ──────────────────────────
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    title: "Gutter Cleaning in Winter Park & Orlando",
    description:
      "Gutter cleaning that protects your home from water damage — hand debris removal, downspout flushing, haul-away. Serving Winter Park, Orlando, and Central Florida.",
    h1: "Gutter Cleaning in Winter Park & Central Florida",
    intro: [
      "Clogged gutters are one of the most overlooked causes of expensive home damage. When leaves, pine needles, and oak debris block the channel, water backs up — spilling over the edge, seeping toward the foundation, rotting fascia boards, and pooling in the beds right where you don't want it. In Central Florida's storm season, that's not a someday problem; it's a next-afternoon problem.",
      "Between live-oak leaf drop, pine straw, oak catkins in spring, and the sheer volume of water a Florida thunderstorm dumps in twenty minutes, Orlando-area gutters fill faster than most homeowners expect. A gutter that's fine in April is overflowing by July. We clear the whole run by hand, flush the downspouts to confirm they actually drain, and haul the debris off — we don't leave wet piles in your beds.",
      "It's also the natural cold-weather add-on for the crew you already trust with your lawn. Heading into fall and winter, keeping the crew working and your property protected is one text — not a separate vendor you have to find, vet, and schedule.",
    ],
    includes: [
      "Full debris removal — leaves, twigs, pine needles, oak catkins, and shingle grit cleared by hand, not just blown around",
      "Downspout flushing — we run water through and confirm it flows free all the way to the outlet",
      "Debris haul-away — nothing left piled in your yard or beds",
      "Problem-spotting — sagging runs, loose fasteners, separated seams, and early fascia rot flagged before they become repairs",
      "Ground-level check of splash blocks and downspout extensions so water actually leaves the foundation",
      "Gutter-guard/screen check and clear-off if you have them installed",
      "CompanyCam photos of before and after, so you can see the work whether you're home or not",
    ],
    process: [
      {
        title: "Quick quote",
        body: "We size it up by stories, roofline length, and tree cover, and give you a flat price. Usually same-visit if we're already there for the lawn.",
      },
      {
        title: "Inspect the roofline",
        body: "We check the full gutter run and the roof edge before we start — noting any sagging, pulled fasteners, or damage so you hear about it before it turns into a repair bill.",
      },
      {
        title: "Clear by hand",
        body: "Debris comes out by hand and gets bagged, not flung onto the roof or into the beds. Hand-clearing is the only way to actually empty a Florida gutter packed with wet pine straw.",
      },
      {
        title: "Flush & test downspouts",
        body: "We run water through every downspout and watch it exit the bottom. A clear gutter with a clogged downspout still floods — so we confirm the whole path drains.",
      },
      {
        title: "Report & haul-away",
        body: "We bag and remove all debris, and send you a short note (with photos) on anything we spotted that's worth watching.",
      },
    ],
    why: [
      {
        title: "Built for the Florida debris load.",
        body: "Oak leaves, pine straw, spring catkins, and 2-inch-in-20-minute storms fill gutters here faster than almost anywhere. We clear the whole run by hand because a leaf-blower just moves the top layer.",
      },
      {
        title: "We flag damage before it's a repair.",
        body: "Sagging runs, loose fasteners, soft fascia — we tell you while it's a $20 fastener, not after water has been running behind it for a season and rotted the board.",
      },
      {
        title: "Haul-away included.",
        body: "The debris leaves with us. No wet mound of pine straw sitting in your bed or driveway for you to deal with after we go.",
      },
      {
        title: "The easy cold-weather add-on.",
        body: "We're already at your property for the lawn. Adding gutters heading into storm and leaf-drop season means one less vendor to schedule and one less thing on your list.",
      },
    ],
    faqs: [
      {
        q: "How often should gutters be cleaned in Central Florida?",
        a: "Twice a year is the right baseline for most Orlando-area homes — once heading into summer storm season and once after fall/winter leaf drop. If you're under live oaks or pines, three times a year keeps you ahead of it; those trees shed year-round.",
      },
      {
        q: "What does gutter cleaning cost?",
        a: "Single-story homes typically start around $99; two-story or steep-roof homes run roughly $150–$300 depending on roofline length and tree cover. We give you a flat price before we start.",
      },
      {
        q: "Do you repair gutters, or just clean them?",
        a: "Cleaning is the service — but we flag anything we find (sagging sections, loose fasteners, separated seams, fascia rot) so you can get ahead of it. Minor re-securing we can often handle on the spot; larger gutter replacement we'll refer or scope separately.",
      },
      {
        q: "Do you clean gutters with gutter guards installed?",
        a: "Yes. Guards slow debris but don't eliminate it, especially with pine needles, which slip right through most screens. We clear the top of the guards and check that water's still getting into the gutter underneath.",
      },
      {
        q: "Can you clean two-story gutters?",
        a: "Yes — two-story and steep-pitch roofs are routine for us, with the right ladders and fall protection. It's priced a bit higher than single-story for the added setup and time.",
      },
      {
        q: "Can you add gutter cleaning to my regular lawn visit?",
        a: "Absolutely, and it's the simplest way to do it. We're already scheduled at your property — ask us to add gutters to the next visit and it's handled.",
      },
    ],
    related: ["pressure-washing", "tree-trimming-removal", "property-cleanup"],
    priceRange: "Single-story from $99 · two-story $150–$300",
    timeline: "Most homes done same visit, under 2 hours",
    needsConfirm: true,
  },

  // ── 12. Christmas Light Installation [needs Ryan confirm] ─────────────
  {
    slug: "christmas-lights",
    name: "Christmas Light Installation",
    title: "Christmas Light Installation in Orlando",
    description:
      "Christmas light design, installation, takedown, and storage in Winter Park, Orlando, and Central Florida. Commercial-grade lights — book early, spots fill fast.",
    h1: "Professional Christmas Light Installation in Orlando",
    intro: [
      "Make your home the best-looking house on the block — without spending a weekend on a ladder. Firsthand designs, installs, maintains, and takes down your holiday lighting, then stores it until next year. You get a clean, custom display and none of the tangled-strand, blown-fuse, ladder-on-a-wet-roof hassle.",
      "This is full-service, not a box of lights and a handshake. We plan a display scaled to your roofline and landscaping, cut the runs to fit so there are no gaps or dangling extras, install with commercial-grade materials that actually survive a season, and come back if a bulb or run goes dark. In January we take it all down and store it labeled — so next year is a phone call, not a project.",
      "It's also how the crew you trust with your yard stays working through the one stretch Florida landscaping slows down. Same insured team, same standard, keeping your property looking its best right through the holidays.",
    ],
    includes: [
      "Design consultation — a display scaled to your rooflines, trees, columns, and style, not a one-size template",
      "Professional installation — rooflines and ridges, trees and shrubs, walkways, columns, and wreaths or garland",
      "Commercial-grade lights and materials — brighter, weather-rated, and color-stable all season (we provide them; you're not re-buying tangled boxes every year)",
      "Custom-cut light runs sized to your roof — no gaps, no dangling extra strand",
      "Timers or smart plugs set so it comes on at dusk on its own",
      "Season-long maintenance — a bulb or run goes out, we come fix it",
      "Takedown in January — everything removed cleanly, no leftover clips or hooks",
      "Labeled storage — we store your display so next year's install is even faster",
    ],
    process: [
      {
        title: "Design consultation",
        body: "We walk the property, talk through what you want lit — roofline, trees, entry, columns — and design a display that fits the house and your budget.",
      },
      {
        title: "Measure & quote",
        body: "We measure the runs, spec the materials, and send a clear quote covering design, install, season-long maintenance, takedown, and storage — all of it, one price.",
      },
      {
        title: "Pre-season install",
        body: "We install on your scheduled date (most go up November into early December), custom-cutting runs to fit and setting the timer so it comes on at dusk.",
      },
      {
        title: "Maintain all season",
        body: "If a bulb or section goes out, we come fix it — you shouldn't be back on the ladder in December because one run failed.",
      },
      {
        title: "Takedown & storage",
        body: "In January we remove everything, clean up every clip, and store your display labeled so next year we're back up faster.",
      },
    ],
    why: [
      {
        title: "You never touch a ladder.",
        body: "Hanging lights is genuinely dangerous — tangled strands, burnt-out bulbs, and ladders on wet roofs send people to the ER every December. We do it every day with the right equipment and crews.",
      },
      {
        title: "We already know your property.",
        body: "We maintain your landscape, so we know the rooflines, the trees worth lighting, and how to make the house shine without guessing.",
      },
      {
        title: "Commercial-grade, and maintained.",
        body: "Bright, durable, weather-rated lights that hold up all season — plus we come back if anything fails. Not the string-store lights that dim and drop bulbs by mid-December.",
      },
      {
        title: "One less thing, every year.",
        body: "Design, install, maintenance, takedown, and storage in one price. Next year is a phone call, because your display is already labeled and stored.",
      },
    ],
    faqs: [
      {
        q: "Do you provide the lights, or do I?",
        a: "We provide commercial-grade lights and materials as part of the service — brighter and far more durable than retail strands, and cut to fit your roof. You're not buying, storing, and re-untangling boxes every year. We store the display for you between seasons.",
      },
      {
        q: "What does Christmas light installation cost?",
        a: "Most residential displays start around $500 and run to $2,500+ depending on roofline length, how much of the landscaping you light, and the design. That price covers install, season-long maintenance, takedown, and storage — not just the hang.",
      },
      {
        q: "Do you take the lights down and store them too?",
        a: "Yes — full service. We take everything down in January, remove every clip, and store your display labeled so next year's install is faster and easier. Takedown and storage are included in the quote.",
      },
      {
        q: "Can you light trees and landscaping, not just the roofline?",
        a: "Absolutely. Rooflines and ridges, wrapped trees and shrubs, walkways, columns, and wreaths or garland — we design the whole property, and because we maintain your landscape we know which trees will look best lit.",
      },
      {
        q: "Do you do commercial properties and HOAs?",
        a: "Yes. We handle commercial storefronts, entrances, and HOA common areas on the same full-service model — design, install, maintain, take down, store. Reach out early; commercial calendars fill first.",
      },
      {
        q: "When should I book?",
        a: "Early. Holiday lighting is our most in-demand seasonal service and installation dates fill through November. Reserve early to lock in your spot and your preferred install date — the earlier you book, the better your options.",
      },
    ],
    related: ["landscape-design", "lawn-maintenance", "pressure-washing"],
    priceRange: "Installs from $500–$2,500+ (install, maintenance, takedown, storage)",
    timeline: "Book by early Nov · installs Nov–early Dec",
    timelineLabel: "Season",
    needsConfirm: true,
  },
];

export const SERVICE_PAGES_MAP: Record<string, ServicePage> = Object.fromEntries(
  SERVICE_PAGES.map((s) => [s.slug, s])
);

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES_MAP[slug];
}

export function serviceUrl(slug: string): string {
  return `${SITE_URL}/services/${slug}`;
}
