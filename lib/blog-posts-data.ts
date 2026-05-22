import { SITE_URL } from "./site-config";

/**
 * Blog post content schema. Body is an array of typed nodes that the
 * template at app/blog/[slug]/page.tsx walks and renders. Paragraphs and
 * list items support inline Markdown-style links written as `[text](url)`
 * — see parseInlineLinks() in the template.
 */

export interface BlogAuthor {
  name: string;
  bio?: string;
  // [RYAN: replace this default bio with your own voice — a sentence on background, why Firsthand, etc.]
}

export interface BlogSource {
  label: string;
  url: string;
  /** Short attribution that displays beside the link */
  publisher?: string;
}

export interface BlogRelated {
  href: string;
  label: string;
  blurb?: string;
}

export type BlogNode =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; body: string }
  | { type: "photo"; label: string; aspect?: string }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string };

export interface BlogPost {
  slug: string;
  title: string;
  /** Meta description, 140–155 chars */
  description: string;
  /** Display H1; can differ from <title> */
  h1: string;
  publishedAt: string;
  updatedAt?: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  readTimeMinutes: number;
  /** Photo placeholder description for the hero image */
  heroPhotoLabel: string;
  /** Outbound authority links for credibility — surfaced in a Sources section */
  sources: BlogSource[];
  /** Internal cross-links surfaced at the foot of the post */
  related: BlogRelated[];
  body: BlogNode[];
}

const RYAN_AUTHOR: BlogAuthor = {
  name: "Ryan Hanus, Firsthand Lawn and Landscape",
  bio: "Ryan founded Firsthand Lawns in Winter Park and runs design, install, and crew operations across Central Florida. [RYAN: revise this bio in your own voice — a sentence or two about your background, why you started Firsthand, what you specialize in.]",
};

export const BLOG_POSTS: BlogPost[] = [
  // ── Post 1 ─────────────────────────────────────────────────────────
  {
    slug: "when-to-resod-winter-park-floratam-vs-empire-zoysia",
    title:
      "When to Resod Your Winter Park Lawn: Floratam vs Empire Zoysia",
    description:
      "When Winter Park lawns need resodding and how Floratam St. Augustine compares to Empire Zoysia on cost, shade, drought tolerance, and long-term maintenance.",
    h1: "When to resod your Winter Park lawn: Floratam vs Empire Zoysia",
    publishedAt: "2026-05-22",
    author: RYAN_AUTHOR,
    category: "Lawn care",
    tags: ["sod", "Winter Park", "Floratam", "Empire Zoysia", "St Augustine"],
    readTimeMinutes: 8,
    heroPhotoLabel:
      "Side-by-side Winter Park front yards — left half worn-out chinch-bug-damaged St. Augustine, right half freshly laid Empire Zoysia. Morning light if possible.",
    sources: [
      {
        label: "St. Augustinegrass for Florida Lawns (UF/IFAS ENH5)",
        url: "https://edis.ifas.ufl.edu/publication/LH010",
        publisher: "UF/IFAS Extension",
      },
      {
        label: "Zoysiagrass for Florida Lawns (UF/IFAS ENH11)",
        url: "https://edis.ifas.ufl.edu/publication/LH011",
        publisher: "UF/IFAS Extension",
      },
      {
        label: "Florida-Friendly Landscaping — Right Plant, Right Place",
        url: "https://ffl.ifas.ufl.edu/principles/right-plant-right-place/",
        publisher: "UF/IFAS",
      },
    ],
    related: [
      {
        href: "/services/sod-installation",
        label: "Sod installation",
        blurb:
          "How we run a sod install — prep, install, watering schedule, follow-ups",
      },
      {
        href: "/services/lawn-maintenance",
        label: "Lawn maintenance",
        blurb:
          "Weekly mowing at the right height for whichever turf you pick",
      },
      {
        href: "/service-areas/winter-park",
        label: "Winter Park service area",
        blurb: "Neighborhood-specific landscape work in 32789 and 32792",
      },
    ],
    body: [
      {
        type: "p",
        text: "The decision to resod a Winter Park lawn usually comes down to one of three things: chinch bugs ate the front yard, fungus took out the back, or a previous owner planted the wrong variety under heavy oak shade and the lawn has been browning out a little more every year. Whatever the cause, by the time most homeowners call, the question isn't whether to resod — it's whether to put down the same variety that just failed or upgrade to something more durable. The most common comparison we run in Winter Park is [Floratam St. Augustine](https://edis.ifas.ufl.edu/publication/LH010) against [Empire Zoysia](https://edis.ifas.ufl.edu/publication/LH011), so this is the head-to-head.",
      },
      {
        type: "h2",
        text: "How to tell when a lawn needs resodding (not just reseeding)",
      },
      {
        type: "p",
        text: "St. Augustine and Zoysia don't seed well — both spread by stolons and rhizomes, so over-the-counter grass seed isn't an option for either. If patches are coming back from the edges and the underlying soil looks healthy, you can usually let the grass spread back on its own with proper watering and fertilizer. If patches have been bare for more than a season, or if more than about 30 percent of the lawn is gone, sodding is the cheaper long-term answer.",
      },
      {
        type: "p",
        text: "The signs that say resod (not patch) on a Winter Park lawn:",
      },
      {
        type: "ul",
        items: [
          "Chinch-bug damage that's hit more than one area and the existing variety is Floratam — bugs come back to Floratam, and a half-killed Floratam lawn rarely fully recovers",
          "Take-All Root Rot patches that have widened over multiple wet seasons — fungus persists in the soil, replacement variety matters",
          "Heavy thatch buildup (more than ¾ inch) that mowing won't bring back",
          "Lawn was originally laid 12+ years ago and has thinned generally without a single dramatic cause",
          "Significant changes to the property — new pool, drainage rework, oak removed, irrigation overhaul — make this the right moment to start fresh",
        ],
      },
      {
        type: "p",
        text: "If only one bed-sized area is bad and the rest is healthy, a sod patch (a few rolls, $400–$900 installed) is usually the right call. If it's the whole front yard, you're in resod territory.",
      },
      {
        type: "h2",
        text: "Floratam vs Empire Zoysia at a glance",
      },
      {
        type: "table",
        headers: ["", "Floratam St. Augustine", "Empire Zoysia"],
        rows: [
          ["Installed cost (Central FL, 2026)", "~$1.50–$2.00/sq ft", "~$2.25–$3.00/sq ft"],
          ["Sun requirement", "6+ hours direct", "4–5 hours direct"],
          ["Drought tolerance", "Moderate — wilts visibly in 5–7 dry days", "Strong — holds color 10–14 dry days"],
          ["Foot traffic", "Soft, dents easily", "Springs back; better for kids and dogs"],
          ["Mowing height", "3.5–4 inches", "1.5–2 inches"],
          ["Mowing frequency (peak season)", "Weekly", "Every 7–10 days"],
          ["Chinch-bug pressure", "High — Floratam is a known target", "Low — Zoysia is rarely affected"],
          ["Brown patch (cool wet weather)", "Common", "Moderate"],
          ["Establishment time", "2–3 weeks to first mow", "3–4 weeks to first mow"],
          ["Repair / patching cost later", "Cheaper rolls, more common", "Pricier, must be ordered"],
        ],
        caption:
          "Costs reflect installed prices we've quoted in Winter Park, Windermere, and Bay Hill in spring 2026. Site conditions move these numbers up or down.",
      },
      {
        type: "h2",
        text: "Why Winter Park specifically tips toward Empire Zoysia",
      },
      {
        type: "p",
        text: "Three things about Winter Park yards push our recommendation toward Empire Zoysia more often than not: the oak canopy, the chinch-bug history on Floratam in older neighborhoods, and the foot-traffic profile of established homes.",
      },
      {
        type: "p",
        text: "The oak canopy in Winter Park is real. Heritage live oaks and laurel oaks line most streets in 32789 — Pennsylvania, Lyman, Comstock, Henkel — and the canopy throws partial shade across at least one bed of most front yards. Floratam needs 6+ hours of direct sun to thrive. Once it drops below that, the lawn thins gradually and chinch bugs find it. Empire Zoysia handles 4–5 hours of sun without obvious decline. For homeowners who can't decide between Palmetto (the shadier St. Augustine variety) and Empire, the Empire usually wins on traffic and disease pressure.",
      },
      {
        type: "p",
        text: "Chinch bugs are the other Winter Park reality. We've replaced a lot of Floratam lawns in Olde Winter Park and the Windsong area where the front yard was on its third or fourth chinch infestation. Each time it's an insecticide treatment, a few weeks of recovery, and the bugs are back the following August. Empire Zoysia doesn't have the same pest pressure — chinch bugs prefer St. Augustine. Moving from Floratam to Zoysia takes the bug problem off the table for most homeowners.",
      },
      {
        type: "p",
        text: "Foot traffic matters more than people think. Empire holds up to dogs, kids, and outdoor entertaining; Floratam dents visibly under repeated use. If you have a Lab who patrols the same line along the fence every day, the answer is Zoysia.",
      },
      {
        type: "h2",
        text: "Where Floratam still wins",
      },
      {
        type: "p",
        text: "Two scenarios where Floratam is still the right call:",
      },
      {
        type: "ul",
        items: [
          "**Full-sun, low-traffic front yards on a tight budget.** If you're replacing 4,000 square feet of dead lawn and the lot gets 8 hours of sun, Floratam saves you roughly $3,000 over Empire. Maintenance demands and aesthetics aside, that math works for a lot of homeowners.",
          "**Existing healthy Floratam elsewhere on the property.** Don't mix turf types unless there's a hard boundary (driveway, bed line). Floratam next to Empire next to Floratam looks patchy. If three-quarters of your lawn is healthy Floratam and only the front strip needs replacing, replace with Floratam to match.",
        ],
      },
      {
        type: "h2",
        text: "When to put fresh sod down in Central Florida",
      },
      {
        type: "p",
        text: "Both Floratam and Empire Zoysia root best in moderate temperatures with predictable rainfall. In Central Florida that means roughly March through May (the spring window) and September through November (the fall window). Either window gives the sod 4–6 weeks of establishment time before the next stress event — peak summer heat or the first cool snap.",
      },
      {
        type: "p",
        text: "Summer installs work but require more aggressive watering and more frequent mowing in establishment. Winter installs (December–February) work for both varieties in Central Florida — frost is rare enough that root strike still happens — but the lawn won't really fill in until temperatures climb back up. If you're not in a hurry, spring or fall every time.",
      },
      {
        type: "callout",
        title: "Watering — don't skip this part",
        body: "New sod fails for watering reasons more often than for any other cause. Both Floratam and Empire need the same first-week schedule: three short cycles per day for the first 7 days, two cycles per day for week two, then taper to normal. We walk every customer through this and program the controller on install day. If your irrigation isn't set up to run multiple short cycles, fix that before the sod goes down — see [Florida-Friendly Landscaping watering guidance](https://ffl.ifas.ufl.edu/principles/water-efficiently/).",
      },
      {
        type: "h2",
        text: "Real cost ranges in Winter Park (spring 2026)",
      },
      {
        type: "p",
        text: "For a representative quarter-acre Winter Park lot with about 4,000 square feet of turf area, the all-in install (existing turf removal, light grading, fresh sod, starter fertilizer, two follow-up visits at days 7 and 30):",
      },
      {
        type: "ul",
        items: [
          "Floratam St. Augustine: roughly $7,000–$9,500",
          "Palmetto St. Augustine (shade-tolerant variety): roughly $7,500–$10,000",
          "Empire Zoysia: roughly $10,500–$13,500",
          "Bermuda (rare for residential): roughly $6,500–$8,500",
        ],
      },
      {
        type: "p",
        text: "Sites that need significant irrigation repair, drainage work, or heavy debris removal can add $1,000–$3,000. Sites with great existing irrigation and minimal prep needed run closer to the lower end. Bigger lots scale roughly linearly per square foot.",
      },
      {
        type: "h2",
        text: "Quick decision tree",
      },
      {
        type: "ol",
        items: [
          "If your lawn gets less than 6 hours of direct sun → don't replant Floratam. Palmetto or Empire Zoysia.",
          "If chinch bugs have hit you twice in five years → go Zoysia. The math says you save money long-term on insecticide treatments alone.",
          "If you have kids or dogs that use the lawn daily → Empire Zoysia.",
          "If the lot is full sun and you want classic Florida green at the lowest cost → Floratam.",
          "If you're matching existing healthy turf → match the variety. Don't mix.",
        ],
      },
      {
        type: "p",
        text: "If you're not sure which direction to go, the cheapest move is a site walk. We'll measure the lawn, check sun exposure across the day, look at your irrigation, and tell you honestly what we'd put down on our own house. Free, takes 20–30 minutes — book one from our [contact page](/contact) or call (407) 584-3784.",
      },
    ],
  },

  // ── Post 2 ─────────────────────────────────────────────────────────
  {
    slug: "hurricane-prep-central-florida-landscape-checklist",
    title:
      "Hurricane Prep for Central Florida Landscapes: A Homeowner's Checklist",
    description:
      "What to do — and when — to get your Central Florida yard ready for hurricane season. Tree thinning, palm care, drainage, post-storm cleanup, and what to avoid.",
    h1: "Hurricane prep for Central Florida landscapes: a homeowner's checklist",
    publishedAt: "2026-05-22",
    author: RYAN_AUTHOR,
    category: "Seasonal",
    tags: [
      "hurricane",
      "storm prep",
      "tree trimming",
      "Central Florida",
      "Winter Park",
    ],
    readTimeMinutes: 9,
    heroPhotoLabel:
      "Crew working on a mature laurel oak in a Winter Park backyard — bucket truck visible, climber in the canopy with rigging visible. Pre-season trim shot.",
    sources: [
      {
        label: "Hurricane Preparedness — Be Ready",
        url: "https://www.nhc.noaa.gov/prepare/ready.php",
        publisher: "NOAA National Hurricane Center",
      },
      {
        label: "Selecting and Maintaining Wind-Resistant Trees (UF/IFAS FOR118)",
        url: "https://edis.ifas.ufl.edu/publication/FR173",
        publisher: "UF/IFAS Extension",
      },
      {
        label: "Florida Forest Service — Storm Recovery",
        url: "https://www.fdacs.gov/Divisions-Offices/Florida-Forest-Service",
        publisher: "Florida Department of Agriculture",
      },
    ],
    related: [
      {
        href: "/services/tree-trimming-removal",
        label: "Tree trimming & removal",
        blurb:
          "Pre-season thinning, dead-limb removal, and full takedowns with proper rigging",
      },
      {
        href: "/services/stump-grinding-removal",
        label: "Stump grinding & removal",
        blurb:
          "Post-storm stump grinding after emergency tree removals — 6 to 12 inches below grade",
      },
      {
        href: "/service-areas/winter-park",
        label: "Winter Park service area",
        blurb: "Oak-canopy neighborhoods that benefit most from pre-season work",
      },
    ],
    body: [
      {
        type: "p",
        text: "Hurricane season runs June 1 through November 30 in the Atlantic basin, and Central Florida sits in the cone every year. By the time a system is named and approaching, the landscape work that actually prevents damage is largely too late to start. The real prep window is April and May — thinning canopies, dropping dead limbs, clearing drainage, and staking the trees that need it. The window after that is shorter and more expensive.",
      },
      {
        type: "p",
        text: "This is the checklist we run with customers across Winter Park, Windermere, Bay Hill, and the rest of our service area. It's organized by timeframe — what to do months out, weeks out, days out, and after — so you can use it as a working punch list. Specific cost ranges and timing throughout. For broader household prep (water, supplies, evacuation), [NOAA's preparedness page](https://www.nhc.noaa.gov/prepare/ready.php) is the canonical resource.",
      },
      {
        type: "h2",
        text: "Pre-season (April–early June): the work that matters most",
      },
      {
        type: "p",
        text: "Storm damage is mostly tree damage. The trees most likely to fail under hurricane winds in Central Florida are laurel oaks (shallow-rooted, brittle), water oaks, and overgrown live oaks with one-sided or top-heavy canopies. Selective crown thinning — removing roughly 10–20 percent of interior branches to let wind pass through — has been studied extensively by [UF/IFAS](https://edis.ifas.ufl.edu/publication/FR173) and reduces failure rates substantially. April and May are the ideal window because the trees are leafing in but the crown isn't yet at full density.",
      },
      {
        type: "p",
        text: "What to schedule in April–May:",
      },
      {
        type: "ul",
        items: [
          "**Crown thinning** on any oak over about 30 feet, especially laurel oaks and one-sided live oaks. Cuts should be made at branch collars, not flush. Avoid 'topping' — it actually weakens the tree long-term.",
          "**Dead-wood removal** on every mature tree on the property. Dead limbs come down first in a storm.",
          "**Crown raising** to lift lower limbs that are rubbing the roofline or scraping a structure. A swinging limb in 80 mph wind takes shingles off.",
          "**Palm trimming** on Sabal palms, Queen palms, and Foxtails. Trim back dead and brown fronds, but don't 'hurricane cut' — over-trimmed palms are weaker, not stronger, because the fronds protect the bud.",
          "**Vine and climber removal** from any structure — wisteria, climbing fig, Boston ivy. Vines hold water and pull on siding when wind catches them.",
          "**Staking review** on any tree planted within the last 24 months. Replace rotted or broken ties; remove stakes from trees over 3 years old (they're a hazard, not a help, once the root flare is established).",
          "**Drainage clearing** — French drains, swales, downspout splash blocks. Heavy storm rainfall is often as damaging as the wind.",
        ],
      },
      {
        type: "callout",
        title: "Booking note",
        body: "Tree-service capacity in Central Florida runs short in late May. Storm-chaser crews come in only after a named storm. If you want pre-season work done by a local crew that will still be here in October, book by early May.",
      },
      {
        type: "h2",
        text: "Two to three days out: the 48–72-hour window",
      },
      {
        type: "p",
        text: "Once a storm enters the cone and Central Florida is on the path, you have roughly two to three days to lock the property down. This is the time to handle everything outside the house that could become a projectile.",
      },
      {
        type: "ul",
        items: [
          "Bring in patio furniture, grills, planters, decorative pots, garden art, hose reels, kids' toys",
          "Move lighter trash bins and recycling carts into the garage",
          "Stow umbrellas and umbrella bases — heavy bases break windows like nothing else",
          "Roll up retractable awnings; if you have fixed awnings, photograph them now for insurance",
          "Trim any obviously swinging branches over the roof or driveway — call us only if it's an actual hazard; non-hazard work doesn't get scheduled in a storm window",
          "Photograph the yard with a phone — every angle, every elevation. Time-stamped insurance evidence",
          "Turn off the irrigation system at the controller (saturated soil under high wind increases root-failure risk)",
          "Move vehicles away from large trees and into the garage if possible",
          "Charge phones and portable batteries — power loss is the norm, not the exception",
        ],
      },
      {
        type: "h2",
        text: "Day-of: stay inside",
      },
      {
        type: "p",
        text: "Once sustained winds cross about 40 mph, don't go outside. Don't open windows or doors to 'equalize pressure' — that's a myth, and broken interior pressure is a much smaller risk than a window failure caused by debris. Wait for winds to drop before assessing damage.",
      },
      {
        type: "h2",
        text: "After the storm: what to do, what to avoid",
      },
      {
        type: "h3",
        text: "First 24 hours",
      },
      {
        type: "ul",
        items: [
          "Wait for sustained wind to drop below 30–40 mph before walking the property",
          "Watch for downed power lines — assume every line is live. Call Duke Energy (or your utility) before touching anything near a line",
          "Document everything with photos and short videos — before you move a single limb. Insurance adjusters need pre-cleanup documentation",
          "Clear safe access paths (front door, driveway entrance) so emergency services can reach you if needed",
          "Don't burn debris. Burn bans are common after storms, air quality is poor, and the [Florida Forest Service](https://www.fdacs.gov/Divisions-Offices/Florida-Forest-Service) tracks fire risk closely in dry post-storm conditions",
        ],
      },
      {
        type: "h3",
        text: "First 72 hours",
      },
      {
        type: "ul",
        items: [
          "Triage damage: tree on a structure first, tree blocking the driveway second, hanging branches third, ground debris last",
          "If a tree is on a roof or fence, photograph it from multiple angles before moving anything. Call your insurance carrier before you call a contractor — they may dispatch their own adjuster",
          "Avoid storm-chaser contractors. Out-of-state crews with no local presence often show up in Central Florida after major storms, take deposits, and disappear. Verify any contractor with a Florida business license number, a local phone number that answers, and a Florida COI on file",
          "Cleanup permits aren't usually required for residential tree work after a declared storm, but Orange County may issue separate guidance — check current rules before burning, hauling, or open dumping",
          "If insurance is involved, save every receipt and document every visit",
        ],
      },
      {
        type: "h3",
        text: "Weeks 2–4: the real cleanup",
      },
      {
        type: "p",
        text: "The initial cleanup gets the property safe and functional. The deeper work — stump grinding, fence repair, sod replacement on damaged turf, drainage repair, replanting lost specimens — happens over the next 2–6 weeks. We schedule this work as a phased project, partially because crews are stretched after a major storm and partially because some assessments (whether a damaged tree will recover, whether the soil under a fallen oak needs to be amended) take time.",
      },
      {
        type: "h2",
        text: "Real costs to expect",
      },
      {
        type: "p",
        text: "Rough Central Florida 2026 pricing for the most common post-storm services:",
      },
      {
        type: "table",
        headers: ["Service", "Typical range", "Notes"],
        rows: [
          ["Trim mid-size tree (20–40 ft)", "$300–$700", "Higher in storm-emergency windows"],
          ["Full tree removal", "$400–$3,000+", "Depends on size, access, rigging requirements"],
          ["Storm cleanup (per yard, debris)", "$400–$2,500", "Volume-based; insurance often covers if tied to documented damage"],
          ["Stump grinding (per stump)", "$150–$400", "Less for multi-stump bulk jobs"],
          ["Fence section repair", "$150–$600/section", "Material- and length-dependent"],
          ["Sod patch (per pallet, installed)", "$400–$900", "Floratam cheaper; Palmetto / Empire higher"],
          ["Pre-season crown thinning", "$300–$1,200/tree", "Cheaper than the same work post-failure"],
        ],
      },
      {
        type: "h2",
        text: "The case for pre-season work",
      },
      {
        type: "p",
        text: "The arithmetic on pre-season tree work is straightforward. A pre-season crown thinning on a 50-foot laurel oak runs $500–$900. The same tree, after a partial failure (broken limb on the roof, dangling branches), runs $1,500–$3,500 to make safe and clean up — and that's not counting the cost of the actual roof, fence, or pool-cage damage it caused on the way down. Most years no single property needs the pre-season work to pay off. Over a five-year window of storms, most properties with significant tree cover do.",
      },
      {
        type: "p",
        text: "We typically book pre-season work from early April through the third week of May. After Memorial Day, our schedule fills with established customers and we start turning new requests down. If you want pre-season tree work for the current hurricane season, the time to call is now — book a site walk from our [contact page](/contact) or call (407) 584-3784.",
      },
    ],
  },

  // ── Post 3 added in subsequent commit ───────────────────────────────
];

export const BLOG_POSTS_MAP: Record<string, BlogPost> = Object.fromEntries(
  BLOG_POSTS.map((p) => [p.slug, p])
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS_MAP[slug];
}

export function blogPostUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}
