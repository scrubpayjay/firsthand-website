import { SITE_URL } from "./site-config";

export interface AreaFaq {
  q: string;
  a: string;
}

export interface ServiceAreaPage {
  slug: string;
  /** Short name — used in nav and breadcrumbs */
  name: string;
  /** Full name with state — for headings and schema */
  fullName: string;
  /** Page title under 60 chars */
  title: string;
  /** Meta description 140-155 chars */
  description: string;
  /** H1 keyword-led headline */
  h1: string;
  /** True for the primary city anchor (Winter Park). Drives lead-anchor copy and Primary badge. */
  primary: boolean;
  /** 2-3 paragraph local intro */
  intro: string[];
  /** Specific neighborhoods, streets, landmarks — for local search relevance */
  neighborhoods: string[];
  /** 3-4 reasons local homeowners specifically choose Firsthand */
  whyLocal: { title: string; body: string }[];
  /** 5-6 questions specific to this city */
  faqs: AreaFaq[];
  /** Google Maps embed query — passed directly to ?q= */
  mapQuery: string;
  /** Lat/lng for schema.org GeoCoordinates */
  geo: { lat: number; lng: number };
}

export const SERVICE_AREA_PAGES: ServiceAreaPage[] = [
  // ── Winter Park — PRIMARY ───────────────────────────────────────────
  {
    slug: "winter-park",
    name: "Winter Park",
    fullName: "Winter Park, FL",
    title: "Landscaping in Winter Park, FL",
    description:
      "Landscape design, lawn care, sod, irrigation, and hardscape for Winter Park, FL — Park Avenue, Hannibal Square, Olde Winter Park, Comstock Park, Windsong. Family-owned.",
    h1: "Landscaping in Winter Park, FL",
    primary: true,
    intro: [
      "Winter Park yards are different. The mature oak canopies — many of them planted when these homes were built in the 1920s and 30s — throw shade most landscape companies don't know how to plant under. The historic bungalows on Comstock and around Mead Botanical Garden hold their character in part because of the landscape; lose that and the property's curb appeal goes with it. And properties along Park Avenue, the lakes, and Windsong have a long memory: a landscape job done badly here gets talked about for years.",
      "We've spent most of our service history in Winter Park. Most of our crew lives in this part of Orange County. We mow under Palmetto-tolerant shade on Henkel Circle, install drainage solutions on the slope-y lots near Lake Maitland, and put together HOA-free designs that nonetheless meet the unspoken standard of streets like Pennsylvania and Lyman. Most of our new work in Winter Park still comes from referrals on the same five streets.",
      "Whether you're refreshing a small front bed on a bungalow lot or designing a full backyard renovation on a lakefront property, we work the same way. Site walk first. Honest estimate. Same crew through the project. Documentation in CompanyCam.",
    ],
    neighborhoods: [
      "Park Avenue & Central Park",
      "Hannibal Square",
      "Olde Winter Park",
      "Comstock Park",
      "Windsong",
      "Around Rollins College",
      "Lake Maitland & Lake Virginia waterfront",
      "Mead Botanical Garden neighborhood",
    ],
    whyLocal: [
      {
        title: "We know oak shade.",
        body: "Most Winter Park lots are under significant oak canopy. Floratam fails here within a year. We install Palmetto or Empire Zoysia, recommend shade-tolerant ground covers in the deepest spots, and design beds around the established root structures of trees we don't want to disturb.",
      },
      {
        title: "Historic-home landscape sensibility.",
        body: "A 1925 Mediterranean Revival on Lyman doesn't want the same plant palette as a new build in Windermere. We respect the period — boxwood hedges, formal lines, restrained color — when the house calls for it.",
      },
      {
        title: "Lakefront drainage and grading.",
        body: "Lots that slope to Lake Maitland, Lake Virginia, or Lake Killarney have specific drainage needs — water has to be moved away from the foundation without dumping it into the lake. We grade for that on every install.",
      },
      {
        title: "Crew lives here.",
        body: "Most of the team lives within 15 minutes of Park Avenue. That makes response times short and makes us neighbors, not vendors driving in from a county over.",
      },
    ],
    faqs: [
      {
        q: "My yard is 80% shade from oak canopy — what grass should I plant?",
        a: "St. Augustine Palmetto handles partial shade better than Floratam, but deep oak shade (less than 4 hours sun) won't support any St. Augustine variety long-term. In the deepest shade we recommend mulched beds with shade-tolerant ground covers (perennial peanut, Asiatic jasmine, mondo grass) rather than fighting to keep turf alive.",
      },
      {
        q: "Are there HOAs in Winter Park I should know about?",
        a: "Most of historic Winter Park is non-HOA, but neighborhood pride keeps standards high informally. Windsong, Comstock Park, and a few of the newer subdivisions have HOAs with landscape rules. We handle ARC submittals when needed.",
      },
      {
        q: "Lakefront property — anything special?",
        a: "Yes. Drainage has to be planned so water flows away from the house without scouring the lake shore. We also recommend native plants for the riparian zone (pickerel weed, swamp lily, native iris) which stabilize the bank and don't require fertilizer that would run into the lake.",
      },
      {
        q: "Can you work in historic neighborhoods with mature trees?",
        a: "Yes. Older Winter Park lots often have heritage oaks we're careful around — we trench by hand near root flares, use low-impact equipment, and avoid heavy compaction within drip lines. We've never lost a tree on a Winter Park install.",
      },
      {
        q: "Do you do small front-bed refreshes or only full projects?",
        a: "Both. We don't have a minimum project size for residential work in our core service area. A bed refresh + mulch + plant install might run $800–$2,500; full property designs run $20K–$60K. Either is welcome.",
      },
      {
        q: "Park Avenue commercial — do you handle storefront landscape?",
        a: "Yes — both ongoing maintenance and one-time installs for restaurants, retail, and office. Park Avenue has stricter aesthetic expectations than typical commercial, which we're set up for.",
      },
    ],
    mapQuery: "Winter Park, FL",
    geo: { lat: 28.6, lng: -81.3392 },
  },

  // ── Orlando ─────────────────────────────────────────────────────────
  {
    slug: "orlando",
    name: "Orlando",
    fullName: "Orlando, FL",
    title: "Landscaping in Orlando, FL",
    description:
      "Landscape design, lawn care, sod, irrigation, and hardscape in Orlando — Audubon Park, Mills 50, Thornton Park, Baldwin Park, SoDo, College Park. Residential + commercial.",
    h1: "Landscaping in Orlando, FL",
    primary: false,
    intro: [
      "Orlando isn't one landscape — it's many. The mid-century block houses around Audubon Park and Mills 50 have different lot characteristics than the newer planned communities like Baldwin Park; the high-rise residential downtown has different needs again from the office parks along Sand Lake. We work across all of it, residential and commercial, with the same crew running everything from a single-bed refresh in Thornton Park to a multi-property maintenance contract for a property management firm.",
      "What stays consistent across Orlando is the climate: heavy summer rain, sandy soil that drains too fast for thirsty plants, watering restrictions enforced by Orange County, and chinch bug pressure that takes out St. Augustine in unprotected lawns every August. We adapt the plant palette and the maintenance schedule to each property, but the fundamentals carry across the region.",
      "Most of our Orlando work flows from properties in our existing Winter Park / Windermere / Bay Hill service triangle. We don't take jobs we'd have to drive 45 minutes to — that keeps the crew on schedule and keeps response times tight.",
    ],
    neighborhoods: [
      "Audubon Park",
      "Mills 50",
      "Thornton Park",
      "Lake Eola Heights",
      "Baldwin Park",
      "SoDo / South Orange",
      "Conway / Lake Conway",
      "Lake Highland",
    ],
    whyLocal: [
      {
        title: "Both sides of the residential/commercial line.",
        body: "We handle single-family bungalows in Audubon Park, planned-community homes in Baldwin Park, and office park / restaurant row commercial accounts. Same insurance, same documentation, same contracts — different scope.",
      },
      {
        title: "Baldwin Park ARC fluency.",
        body: "Baldwin Park's landscape rules (approved plant lists, hardscape restrictions, lighting placement) are strict. We've worked through them enough to know what gets approved.",
      },
      {
        title: "Downtown access logistics.",
        body: "Working downtown — Thornton Park, SoDo, Lake Eola — means tight parking and street access. We schedule deliveries and crew arrival so we're not blocking the street for an hour at 8am.",
      },
      {
        title: "Property management ready.",
        body: "We hold the insurance and licensing required to onboard with property management firms. Certificates available, additional-insured endorsements available, monthly reporting in CompanyCam.",
      },
    ],
    faqs: [
      {
        q: "I'm in Baldwin Park — do you know the ARC rules?",
        a: "Yes. Baldwin Park has a specific approved plant list and rules around hardscape, lighting, and fence treatments. We draft submittals that align with the current ARC requirements; rejections are rare when we do the package.",
      },
      {
        q: "Can you maintain my office park or restaurant location?",
        a: "Yes — commercial maintenance is a meaningful share of our Orlando work. We can handle the contract, the COI requirements, and provide monthly reporting through CompanyCam. Sand Lake Restaurant Row, Lake Mary Boulevard corridor, and office parks off I-4 are all in our service area.",
      },
      {
        q: "Watering restrictions are different in Orlando — what's the rule?",
        a: "Orange County (which includes Orlando proper) follows the SJRWMD schedule: one watering day per week during EST, two days during DST, before 10am or after 4pm. We program every controller to your address's day. Some properties (well water, hand-watering) have exemptions — we'll tell you if yours qualifies.",
      },
      {
        q: "How does urban heat affect plant choices downtown?",
        a: "Urban heat islands run a few degrees hotter than suburban yards. We lean toward heat-tolerant natives — firebush, dwarf yaupon, muhly grass — and away from species that struggle in concentrated sun reflection. Downtown lots also tend to have compacted soil; we amend more aggressively.",
      },
      {
        q: "I have a small lot downtown — is it worth the visit?",
        a: "Yes. We don't have a minimum project size in Orlando. Smaller lots often need more thoughtful design than larger ones — there's no room to hide a mistake.",
      },
      {
        q: "What's your service radius from downtown?",
        a: "Our core service area is the Winter Park / Windermere / Bay Hill triangle, with Orlando proper inside that triangle. Anything outside roughly 20 miles of Park Avenue we'll evaluate case by case but usually decline — short response times matter more to us than expanding the map.",
      },
    ],
    mapQuery: "Orlando, FL",
    geo: { lat: 28.5383, lng: -81.3792 },
  },

  // ── College Park ────────────────────────────────────────────────────
  {
    slug: "college-park",
    name: "College Park",
    fullName: "College Park, FL",
    title: "Landscaping in College Park, Orlando",
    description:
      "Lawn care, landscape design, sod, and irrigation in College Park (Orlando) — Princeton Street, Edgewater Drive, Dubsdread, Lake Adair, Lake Concord. Older homes a specialty.",
    h1: "Landscaping in College Park, Orlando",
    primary: false,
    intro: [
      "College Park is one of the older neighborhoods in Orlando, and most of our work here is on lots that were built between the 1920s and 1950s. Smaller lots than what you'll find in Windermere or Bay Hill, but with mature oak canopies, characterful bungalows, and a walkable corridor along Edgewater Drive that gives the neighborhood its identity. The landscape that works here is one that respects the period — formal-leaning, restrained, anchored by the trees the neighborhood already has.",
      "We work both the residential streets — Princeton, Yale, Edgewater, Smith — and the commercial frontage along Edgewater Drive's retail strip. Lots along Lake Adair, Lake Concord, and the rest of College Park's small lakes have specific drainage and shore-treatment considerations we plan into every project.",
      "Properties backing onto Dubsdread Country Club have an interesting constraint: golf course association rules govern what can be done along the property line. We've worked enough Dubsdread lots to know what the course allows and what gets a polite letter from the club.",
    ],
    neighborhoods: [
      "Princeton Street corridor",
      "Edgewater Drive",
      "Dubsdread Country Club perimeter",
      "Lake Adair / Lake Adair Park",
      "Lake Concord",
      "Lake Highland",
      "Smith Street / Yale Street bungalows",
      "Ivanhoe / North Orange Avenue",
    ],
    whyLocal: [
      {
        title: "Older homes, period-appropriate plantings.",
        body: "1920s and 30s College Park bungalows don't want the same plant palette as a new build. We lean traditional here — boxwood, viburnum, camellia, sometimes formal allées — and away from the casual native style that fits other neighborhoods.",
      },
      {
        title: "Small lots, careful work.",
        body: "Most College Park lots are under a quarter acre. There's no room for sloppy edges or mismatched bed lines. We mow, edge, and trim with the level of finish the smaller lot needs.",
      },
      {
        title: "Dubsdread perimeter expertise.",
        body: "Golf course property lines have rules — what can be planted, what fencing is allowed, how close to the cart path you can build. We've worked these enough to know.",
      },
      {
        title: "Lake-adjacent grading.",
        body: "Lake Adair and Lake Concord lots need water moved away from the foundation without dumping it into the lake. We design grading and drainage to satisfy both.",
      },
    ],
    faqs: [
      {
        q: "My College Park bungalow is on a tiny lot — can you still maintain it?",
        a: "Yes. We don't have a minimum lot size. Smaller lots actually take a bit more time per visit because edges and trim work need more attention; the rate reflects that.",
      },
      {
        q: "I back onto Dubsdread — anything I should know about the property line?",
        a: "Dubsdread has rules about fencing, planting close to the course property line, and golf-ball-strike risk to plant material near tees and greens. We've worked enough of these lots to know what flies and what doesn't.",
      },
      {
        q: "What about the heritage oaks on my street?",
        a: "We're careful around mature oaks. Trenching by hand near the drip line, avoiding compaction with heavy equipment, no fill within 10 feet of the trunk. Most of our Winter Park / College Park experience is exactly this kind of careful work around established trees.",
      },
      {
        q: "Is Edgewater commercial different from residential?",
        a: "Different scope (more visibility, faster turnover on plant material, irrigation has to handle pedestrian traffic), but we run both. Most of our Edgewater work is restaurants and small retail.",
      },
      {
        q: "Watering restrictions are the same as Orlando?",
        a: "Yes — College Park is in Orange County, so SJRWMD's one-day (EST) / two-day (DST) schedule applies, before 10am or after 4pm. We program controllers accordingly.",
      },
      {
        q: "I want to update without losing the period character — possible?",
        a: "That's most of what we do here. The updates are usually subtle — refreshed beds, better lighting, irrigation overhaul, a single specimen tree — rather than a wholesale redesign. The bones of College Park landscapes are usually worth keeping.",
      },
    ],
    mapQuery: "College Park, Orlando, FL",
    geo: { lat: 28.572, lng: -81.392 },
  },

  // ── Windermere ──────────────────────────────────────────────────────
  {
    slug: "windermere",
    name: "Windermere",
    fullName: "Windermere, FL",
    title: "Landscaping in Windermere, FL",
    description:
      "Premium landscape design, hardscape, and irrigation for Windermere homes — Butler Chain of Lakes, Isleworth, Keene's Pointe, Tildens Grove. ARC-fluent. HOA-approved.",
    h1: "Landscaping in Windermere, FL",
    primary: false,
    intro: [
      "Windermere is mostly large-lot estate properties, HOA-controlled communities, and lakefront homes on the Butler Chain. The landscape work that fits here is different from the rest of our service area — bigger budgets, stricter HOA review committees, and higher expectations for finish quality. A 4-acre Isleworth lot doesn't get treated like a 1/4-acre College Park lot, and the work product reflects that.",
      "Most of our Windermere projects start with an ARC submittal. We've worked through the architectural review processes at Isleworth, Keene's Pointe, Tildens Grove, Reserve at Lake Butler, and the smaller subdivisions enough that we know which boards approve which plant species and what level of detail the package needs. First-round approvals are the norm.",
      "Lakefront lots on the Butler Chain need riparian-zone treatment that satisfies both the homeowner and Florida's water-management rules. Deer pressure on plant material is a real consideration in the less-densely-developed sections. We plan both into every Windermere design.",
    ],
    neighborhoods: [
      "Butler Chain of Lakes",
      "Isleworth",
      "Keene's Pointe",
      "Tildens Grove",
      "Reserve at Lake Butler",
      "Casa Del Lago",
      "Lake Bessie / Lake Down lakefront",
      "Conroy / Windermere downtown",
    ],
    whyLocal: [
      {
        title: "ARC submittal fluency.",
        body: "Isleworth, Keene's Pointe, Tildens Grove — we know which committees are picky about what. Our submittals usually clear on first review because we've already filtered the plant list, materials, and lighting against the current ARC standards.",
      },
      {
        title: "Lakefront riparian-zone treatment.",
        body: "Butler Chain lots have shore-stabilization needs that aren't optional. We use natives (pickerel weed, swamp lily, native iris) that stabilize the bank without contributing fertilizer runoff to the lake.",
      },
      {
        title: "Deer-resistant plant selection.",
        body: "Less-developed Windermere properties have real deer pressure. We avoid hosta, daylilies, and other deer candy in exposed beds, and lean on plants that deer leave alone — lantana, plumbago, ixora, holly, juniper.",
      },
      {
        title: "Scale-appropriate equipment.",
        body: "A 2-acre lot needs equipment that won't take three days to mow. We bring zero-turn commercial mowers and the right transport for larger properties.",
      },
    ],
    faqs: [
      {
        q: "How do you handle the Isleworth ARC submittal?",
        a: "We draft the submittal package — site plan, plant schedule with photos, hardscape and material specs, lighting layout — and submit on your behalf. We follow up with the committee if revisions are requested. First-round approvals are typical because we already know what the committee will and won't accept.",
      },
      {
        q: "Will deer eat my new plants?",
        a: "If your lot has deer pressure (the less-developed sections of Windermere especially), yes — they'll go for hostas, daylilies, tulips, and roses. We design around it: lantana, plumbago, ixora, holly, beautyberry, muhly grass, and most herbs are deer-resistant.",
      },
      {
        q: "My lot is 2+ acres — different rate?",
        a: "Different scope, not necessarily different per-acre rate. Larger lots actually get more efficient pricing because the setup time is similar regardless of acreage. The plant material and labor scale linearly.",
      },
      {
        q: "Lake Butler frontage — what about shore treatment?",
        a: "Most lakefront Windermere properties need riparian-zone plantings to stabilize the shore. The St. Johns River Water Management District has specific rules about what can be planted in the littoral zone. We design within those rules.",
      },
      {
        q: "Can you handle a full-property landscape redesign?",
        a: "Yes. Full-property Windermere projects typically run $30K–$120K depending on scope (full irrigation, hardscape, lighting, planting). We phase them when budget calls for it, but the design is drawn as a single cohesive plan.",
      },
      {
        q: "Do you work in gated communities?",
        a: "Yes — Isleworth, Keene's Pointe, and the other gated communities in Windermere are regular service areas for us. We have the COI, vendor onboarding paperwork, and gate-access protocols sorted.",
      },
    ],
    mapQuery: "Windermere, FL",
    geo: { lat: 28.4945, lng: -81.5345 },
  },

  // ── Bay Hill ────────────────────────────────────────────────────────
  {
    slug: "bay-hill",
    name: "Bay Hill",
    fullName: "Bay Hill / Doctor Phillips, FL",
    title: "Landscaping in Bay Hill & Doctor Phillips",
    description:
      "Landscape design, lawn care, and hardscape for Bay Hill, Doctor Phillips, and Restaurant Row — residential and commercial. Country club perimeter expertise. ARC-fluent.",
    h1: "Landscaping in Bay Hill & Doctor Phillips, FL",
    primary: false,
    intro: [
      "Bay Hill is a country-club community wrapped around the Bay Hill Club & Lodge — most properties either back onto the golf course, sit along the Butler Chain of Lakes, or both. The landscape standard is high; you don't move into Bay Hill expecting to settle for a 'good enough' yard. Most of our work here is full-property maintenance contracts, landscape redesigns to update homes purchased in the last few years, and hardscape work for outdoor entertaining areas.",
      "Doctor Phillips covers the broader area — neighborhoods like Phillips Bay, Sand Lake Hills, Sand Lake Cove, and the residential streets off Apopka-Vineland Road. Restaurant Row along Sand Lake Road is the commercial spine, and we run maintenance contracts for several of the restaurants and office sites there.",
      "Mature trees are everywhere in Bay Hill and Doctor Phillips — live oaks, magnolias, palms — and most pre-hurricane season work for us in May and June is right here, thinning canopies before the storms come through.",
    ],
    neighborhoods: [
      "Bay Hill Club & Lodge perimeter",
      "Phillips Bay",
      "Sand Lake Hills",
      "Sand Lake Cove",
      "Doctor Phillips Boulevard",
      "Restaurant Row (Sand Lake Road)",
      "Apopka-Vineland Road corridor",
      "Big Sand Lake waterfront",
    ],
    whyLocal: [
      {
        title: "Golf-course perimeter work.",
        body: "Bay Hill homes that back onto the course have rules: setback from cart paths, restrictions on what can be planted along the fairway, occasional golf-ball-strike considerations. We've worked these lots enough to know.",
      },
      {
        title: "Restaurant Row commercial maintenance.",
        body: "Sand Lake Road restaurants have high foot traffic, high turnover on plant material, and strict timing windows (you can't run a chipper during the dinner rush). We schedule around it.",
      },
      {
        title: "Hurricane-season tree work.",
        body: "Mature live oaks and laurel oaks are everywhere in Bay Hill and Doctor Phillips. May and June pre-season crown thinning is one of our biggest work pushes here. We trim ahead of storm season, not after a limb lands on the roof.",
      },
      {
        title: "Estate-scale landscape redesigns.",
        body: "Many Bay Hill homes are bought and sold every few years, and new owners frequently want to redo the landscape. We've handled enough full-property redesigns here to scope, draft, and execute quickly.",
      },
    ],
    faqs: [
      {
        q: "I'm right on the Bay Hill course — what are the rules?",
        a: "Bay Hill Club has rules about fencing along the property line, what can be planted within a certain distance of the cart path, and lighting that might affect course play. We coordinate with the club when projects touch the perimeter.",
      },
      {
        q: "Sand Lake Road restaurant — when can you do the work?",
        a: "Restaurant Row maintenance is usually done early morning before opening or weekday afternoons between lunch and dinner service. We don't run loud equipment during peak service hours.",
      },
      {
        q: "When should I trim trees before hurricane season here?",
        a: "April through early June. The big live oaks and laurel oaks around Bay Hill catch a lot of wind in a storm; thinning the canopy reduces the chance of branch failure. Booking by mid-May is recommended — we run out of slots in June.",
      },
      {
        q: "My Doctor Phillips home has heavy oak shade — what grass works?",
        a: "Palmetto St. Augustine for partial shade, mulched beds with ground covers (perennial peanut, Asiatic jasmine, mondo grass) in deep shade. Don't try to keep Floratam alive under heavy canopy — it won't last.",
      },
      {
        q: "Can you do a full-property landscape redesign in Bay Hill?",
        a: "Yes — and we do them regularly. Full-property Bay Hill redesigns typically run $30K–$150K depending on scope. We can phase the install over two seasons if the budget calls for it.",
      },
      {
        q: "Both residential and commercial — same crew?",
        a: "Same crew model — we don't subcontract between residential and commercial. The team you meet on a residential install is the team you meet on a Restaurant Row maintenance visit, with the licensing and insurance to cover both.",
      },
    ],
    mapQuery: "Bay Hill, Orlando, FL",
    geo: { lat: 28.4575, lng: -81.5089 },
  },

  // ── Montverde / Bella Collina ───────────────────────────────────────
  {
    slug: "montverde",
    name: "Montverde",
    fullName: "Montverde, FL",
    title: "Bella Collina & Montverde Landscape Design",
    description:
      "Landscape design, installation, and hardscape for Bella Collina and Montverde near Lake Apopka — custom patios, outdoor living, Tuscan-style plantings.",
    h1: "Landscape Design & Hardscape in Montverde, FL",
    primary: false,
    intro: [
      "We design and install estate-scale landscape projects in Montverde and Bella Collina — custom patios on hilltop lots, mature Mediterranean plantings, outdoor living spaces that take advantage of central Florida's only real rolling hills. The homes here are Mediterranean and Tuscan villas spread across the hilltops above Lake Apopka, built for views, and the landscape has to match that ambition. Most of our Montverde work is full redesigns, custom hardscape, and plantings that last thirty years.",
      "Bella Collina especially has architectural and landscape standards that mirror the Tuscan theme of the community — olive trees, lavender, cypress, stonework, fountains. We design within that language when projects call for it, and we know which plant material holds up to Florida summers despite looking Italian in concept.",
      "Most of our Montverde work is initiated when a homeowner buys a property and wants to take the landscape from builder-grade to estate-grade. That's a full-property design conversation: site walk, hand-drawn concept, refined plan, then phased install over a season.",
    ],
    neighborhoods: [
      "Bella Collina",
      "Bella Collina Sotto",
      "Hills of Montverde",
      "Lake Apopka shoreline estates",
      "Montverde Academy area",
      "Stoneybrook West (adjacent)",
      "CR-455 estate corridor",
      "Old Highway 50 / SR-50 frontage",
    ],
    whyLocal: [
      {
        title: "Hilltop estate design.",
        body: "Bella Collina's elevation is unusual for Florida — sight lines from the hilltops out toward Lake Apopka and Sugarloaf Mountain are the property's biggest visual asset. We design landscapes that frame those views rather than block them, and we lay hardscape that takes advantage of the topography: terraced patios, retaining walls, view-aligned outdoor living.",
      },
      {
        title: "Tuscan / Mediterranean plant palette.",
        body: "The architectural standard at Bella Collina calls for plant material that reads as Mediterranean — olive, rosemary, lavender, cypress, ornamental grasses, citrus. We know which of these actually thrive in central Florida heat and humidity and which only look right for one season before declining.",
      },
      {
        title: "Hardscape that fits the architecture.",
        body: "Stone patios, travertine pool decks, retaining walls, outdoor kitchens, fire features — we install hardscape sized and finished for the architectural scale of estate homes. We don't do builder-grade pavers on homes that cost what these cost.",
      },
      {
        title: "Full-property design from concept to install.",
        body: "Most Montverde work starts with a blank slate or builder-grade landscape and ends as a designed estate property. We carry the project from site walk to concept to revised plan to phased install, with the same team through all of it.",
      },
      {
        title: "Hilltop irrigation and drainage engineering.",
        body: "Bella Collina's elevation creates real irrigation challenges most central Florida landscape companies aren't set up for — pressure variation between the top of the lot and the bottom can be 20+ PSI, and runoff from the high side can scour beds or undermine retaining walls if it isn't engineered out. We design irrigation zones around the actual grade, spec pressure-regulating heads where elevation calls for them, and grade so water moves where we want it instead of where gravity wants it.",
      },
    ],
    faqs: [
      {
        q: "Does Bella Collina's HOA require landscape plan approval?",
        a: "Yes. Bella Collina has architectural review for landscape and hardscape changes that affect the property exterior. We prepare the submittal package — site plan, plant schedule with photos, material specs, lighting layout — and walk it through the review on your behalf.",
      },
      {
        q: "Can Mediterranean / Tuscan plant material survive a Florida summer?",
        a: "Some of it, with the right siting. True olive and lavender struggle in our humidity unless they're in raised, well-drained beds with morning sun. Rosemary, ornamental grasses, citrus, and dwarf cypress all thrive. We pick the parts of the Mediterranean palette that actually work here and substitute Florida-friendly look-alikes where they don't.",
      },
      {
        q: "I want a custom outdoor living space — patio, fire feature, outdoor kitchen — what does that cost in Montverde?",
        a: "Estate-scale outdoor living projects in Bella Collina and similar properties typically run $40K–$200K depending on hardscape material, kitchen scope, and lighting. Travertine pool deck plus covered outdoor kitchen with grill, fridge, and bar seating sits in the upper half of that range.",
      },
      {
        q: "Can you redo our pool deck as part of the landscape project?",
        a: "Yes — pool deck replacements are a regular part of Bella Collina project scope. Travertine and porcelain pavers in 18×36 or 24×24 formats are the typical finish at this price point. Pool deck plus surrounding landscape designed and installed together usually runs $50K–$120K depending on square footage, material, and whether coping and tile need replacement. The deck and the landscape grading interact, so scoping them as one job is cleaner than sequencing two contractors.",
      },
      {
        q: "We just bought a property — when should we start the landscape design?",
        a: "Before you move in if possible. Builder-grade landscape on a $2M home looks out of place from day one. Most Montverde redesigns are scoped during the closing window and start installation within 30–60 days of move-in. Design phase is usually two to four weeks.",
      },
      {
        q: "How long does a full Montverde landscape project take from first call to finished install?",
        a: "Design phase is typically two to four weeks: site walk, hand-drawn concept, then refined plan. Bella Collina ARC submittal adds another one to three weeks depending on the committee's calendar. Install is six to twelve weeks for a full-property project — longer if pool deck or covered outdoor structures are part of scope. Total timeline from first conversation to finished yard is usually three to five months for a standard estate-scale project.",
      },
      {
        q: "Do you handle the retaining wall and grading on hilltop lots?",
        a: "Yes. Bella Collina's elevation means many lots have real grading challenges — terraced gardens, retaining walls, drainage off the high side of the lot. We engineer and install those as part of the landscape package rather than subcontracting them out.",
      },
      {
        q: "Will my crew be the same from design through install?",
        a: "Yes. The designer who walks the property is on the install. The same hardscape crew handles every project from start to finish. No bait-and-switch between sales and execution.",
      },
    ],
    mapQuery: "Montverde, FL",
    geo: { lat: 28.5961, lng: -81.6736 },
  },

  // ── Heathrow / Alaqua Lakes ─────────────────────────────────────────
  {
    slug: "heathrow",
    name: "Heathrow",
    fullName: "Heathrow, FL",
    title: "Landscape Design in Heathrow & Alaqua Lakes",
    description:
      "Landscape design, installation, and hardscape for Heathrow and Alaqua Lakes — custom outdoor living, ARC-fluent estate landscape work in Seminole County.",
    h1: "Landscape Design & Hardscape in Heathrow, FL",
    primary: false,
    intro: [
      "Heathrow is a master-planned community of large lots, custom homes, and the Heathrow Country Club at its center. The residential work that fits here is custom: full-property landscape redesigns when a home changes hands, hardscape upgrades to backyard living areas, and pool-deck rebuilds when the original 90s-era pavers have aged out. Heathrow is a design-and-install practice for us, not a routine-maintenance market.",
      "Alaqua Lakes, the adjacent gated community along Markham Woods Road, has even higher landscape standards — Tom Fazio golf course, mature live oaks, half-to-full-acre lots, and an architectural review committee that takes plant selection seriously. Most of our Alaqua Lakes work is ARC-submitted up front and built to ARC-spec from day one.",
      "The Markham Woods Road corridor between the two communities is some of the most expensive residential real estate in north Orlando. The landscape standard reflects that. We're brought in when builder-grade plantings need to be replaced with an estate-grade design that holds up for fifteen-plus years.",
    ],
    neighborhoods: [
      "Heathrow Country Club",
      "Alaqua Lakes",
      "Alaqua (original)",
      "Markham Woods Road estates",
      "Reserve at Alaqua",
      "Heathrow Woods",
      "Sanctuary at Alaqua Lakes",
      "Lake Mary / I-4 corridor north",
    ],
    whyLocal: [
      {
        title: "Heathrow Country Club perimeter work.",
        body: "Homes along the Heathrow course have setback rules from cart paths and fairway-facing planting restrictions. We've worked these lots enough to know which side of the lot line the cart path is on and which plant heights are acceptable along the course.",
      },
      {
        title: "Alaqua Lakes ARC fluency.",
        body: "Alaqua Lakes has a thorough architectural review process for landscape and hardscape changes. We draft the submittal — site plan, plant schedule with photos, hardscape material specs, lighting layout — and walk it through the committee. First-round approvals are typical.",
      },
      {
        title: "Estate-scale hardscape and outdoor living.",
        body: "Markham Woods properties have the lot size and budget for full outdoor living buildouts — covered loggias, summer kitchens, fire features, pool-deck rebuilds in travertine or porcelain pavers, integrated landscape lighting. We design and install all of it in-house.",
      },
      {
        title: "Mature canopy redesigns.",
        body: "Alaqua and the Markham Woods corridor are heavy live-oak shade. Builder-installed plant material from twenty years ago has often outgrown the design — overgrown ligustrum, leggy azaleas, foundation plantings blocking windows. We rip out and replant with a fresh design tuned to the current canopy.",
      },
    ],
    faqs: [
      {
        q: "How does the Alaqua Lakes ARC process work for landscape projects?",
        a: "Alaqua Lakes' ARC requires submittal for any landscape or hardscape change that alters the property exterior — including bed expansions, hardscape additions, lighting, and significant plant-material changes. We draft the package on your behalf, attend the committee meeting if needed, and handle any revisions.",
      },
      {
        q: "What does a full backyard redesign typically cost in Heathrow?",
        a: "Estate-scale Heathrow and Alaqua Lakes backyards typically run $60K–$250K for a full redesign including hardscape, planting, irrigation, and landscape lighting. Pool-deck rebuilds with travertine or porcelain are usually $35K–$80K depending on square footage.",
      },
      {
        q: "Can you handle a complete outdoor kitchen and covered loggia build?",
        a: "Yes. Our hardscape crew handles concrete and paver foundations, structural framing for covered roofs, plumbing and gas rough-in for grills and sinks, electrical for lighting and appliances, and the finish work. We coordinate with a GC when structural roof work requires permitting.",
      },
      {
        q: "Heavy oak shade — what works for ground cover and beds?",
        a: "Under deep oak canopy, St. Augustine grass fails fast. We replace turf with mulched beds, perennial peanut, Asiatic jasmine, or mondo grass in the deepest shade, and reserve the grass for the sunnier perimeter. The design intentionally moves the eye away from the dead-zone-under-the-oaks rather than fighting it.",
      },
      {
        q: "Do you work in gated communities like Heathrow Country Club and Alaqua Lakes?",
        a: "Yes. Both are regular work areas for us. We have the COI, vendor paperwork, and gate-access protocols in place. The HOA office knows the company name.",
      },
      {
        q: "How long does a full Heathrow landscape redesign take from first conversation to finished install?",
        a: "Design phase is typically three to five weeks (site walk, concept, refined plan, ARC submittal if needed). Install is four to ten weeks depending on hardscape scope. Total project timeline from first walk to finished yard is usually two to four months.",
      },
    ],
    mapQuery: "Heathrow, FL",
    geo: { lat: 28.7745, lng: -81.3601 },
  },

  // ── Lake Nona ───────────────────────────────────────────────────────
  {
    slug: "lake-nona",
    name: "Lake Nona",
    fullName: "Lake Nona, FL",
    title: "Landscape Design in Lake Nona, FL",
    description:
      "Landscape design, installation, and hardscape for Lake Nona — Laureate Park, Lake Nona Golf & Country Club, Medical City. New-construction specialists.",
    h1: "Landscape Design & Hardscape in Lake Nona, FL",
    primary: false,
    intro: [
      "Lake Nona is mostly new construction — the master-planned community has grown faster than almost any other in Florida, and the landscape opportunities reflect that. Most new homes here close with builder-grade landscape: a sod yard, a row of foundation hedges, three palms, done. The transformation from that starting point to a designed estate landscape is the work we do most often in Lake Nona — full-property design, custom hardscape, mature plantings, irrigation tuned to the new lot.",
      "Laureate Park, the wellness-focused master-planned village inside Lake Nona, has design guidelines that emphasize walkable streetscapes and front-yard porches. Backyards are private and that's where most of the project work happens — pool decks, outdoor kitchens, fire features, screened lanais with integrated landscape. We design within Laureate Park's overall aesthetic while pushing the backyard ambition higher than what came with the house.",
      "Lake Nona Golf & Country Club is a different category — invitation-only, hilltop hideaways adjacent to the Lake Nona Golf Course, custom estate homes at price points that don't show up on Zillow. The landscape standard there is whatever the homeowner wants it to be. Most of that work is full-property redesign or hardscape addition rather than maintenance.",
    ],
    neighborhoods: [
      "Laureate Park",
      "Lake Nona Golf & Country Club",
      "Lake Nona Estates",
      "Northlake Park at Lake Nona",
      "Medical City corridor",
      "Eagle Creek (adjacent)",
      "VillageWalk at Lake Nona",
      "Storey Park (adjacent)",
    ],
    whyLocal: [
      {
        title: "New-construction landscape redesigns.",
        body: "Builder-grade landscape on a $1M Lake Nona home shows up as a row of viburnum and three sabal palms. We replace it with a designed front entry, full backyard outdoor living, mature plant material that doesn't look like it was planted yesterday, and irrigation tuned for the actual plant palette rather than for sod.",
      },
      {
        title: "Lake Nona Golf & Country Club estate work.",
        body: "Hilltop homes adjacent to the golf course have the budget and the room for full-scale landscape projects — large hardscape, mature live oak and crape myrtle plantings, integrated outdoor kitchens, fire features, dock and shoreline landscape on the lakefront sections. We design and install at that scale.",
      },
      {
        title: "Hardscape for backyard outdoor living.",
        body: "Most Lake Nona homes have larger-than-average backyards by Orlando standards. The transformation from sod-and-screen-cage to designed outdoor room is the most common Lake Nona project: travertine or porcelain pool deck, covered loggia, outdoor kitchen, fire feature, integrated landscape lighting. We handle all of it in-house.",
      },
      {
        title: "Laureate Park front-yard streetscape sensibility.",
        body: "Laureate Park's design guidelines push for walkable front-yard streetscapes — porch-facing landscape, restrained plant palette, paver walks. We design within that aesthetic so the front of the house fits the community character, then do whatever the homeowner wants in the back.",
      },
    ],
    faqs: [
      {
        q: "Lake Nona is mostly new homes — when's the right time for a landscape redesign?",
        a: "Most Lake Nona homeowners we work with start a redesign within the first 1–2 years of move-in. The builder-grade landscape looks fine on the listing but starts looking thin by year two, and that's when most homeowners realize they want to take it from default to designed.",
      },
      {
        q: "Laureate Park has design guidelines — can I do hardscape and a new front-yard design within them?",
        a: "Yes. Laureate Park's guidelines focus on the public-facing streetscape — front yard, porch, walk to the door. We design within those rules (restrained palette, walkable paths, porch-friendly heights) and the backyard is unrestricted. Most Laureate Park projects are split that way: respectful front, ambitious back.",
      },
      {
        q: "What does a full backyard transformation cost in Lake Nona?",
        a: "Builder-grade backyard to designed outdoor living typically runs $50K–$200K depending on hardscape scope and outdoor kitchen ambition. A travertine pool deck plus covered loggia with a basic kitchen is in the $80K–$140K range. A full outdoor living complex with summer kitchen, fire feature, water feature, and landscape lighting runs higher.",
      },
      {
        q: "Do you work in Lake Nona Golf & Country Club?",
        a: "Yes. Lake Nona Golf properties are regular work for us. We have the COI, vendor onboarding, and gate-access protocols set up with the community. Project scope is whatever the homeowner wants — most are full-property estate-scale designs.",
      },
      {
        q: "My yard is brand-new — should I wait for the sod to mature before redesigning?",
        a: "Most of the time, no. If the design calls for removing parts of the sod for beds, hardscape, or new plant areas, doing it early saves the cost of removing established turf later. Most Lake Nona redesigns happen within 12–24 months of closing, which is the right window.",
      },
      {
        q: "Can you handle the pool deck rebuild at the same time as the landscape?",
        a: "Yes. Pool deck replacements (travertine, porcelain pavers, or stamped concrete) are usually scoped together with the surrounding landscape so the materials, finish, and transitions are designed as one. Pool deck plus landscape together is typical scope, not an exception.",
      },
    ],
    mapQuery: "Lake Nona, FL",
    geo: { lat: 28.3925, lng: -81.2436 },
  },
];

export const SERVICE_AREA_PAGES_MAP: Record<string, ServiceAreaPage> =
  Object.fromEntries(SERVICE_AREA_PAGES.map((a) => [a.slug, a]));

export function getServiceArea(slug: string): ServiceAreaPage | undefined {
  return SERVICE_AREA_PAGES_MAP[slug];
}

export function areaUrl(slug: string): string {
  return `${SITE_URL}/service-areas/${slug}`;
}
