/**
 * Representative review excerpts. These are placeholder reviews shaped to
 * match Firsthand's real review profile (4.9 ★, 154 reviews, mix of services).
 *
 * TODO before launch: replace with real reviews and real review dates from the
 * Google Places API (Place Details → reviews[]) or paste 10-15 real Google
 * review snippets here. Marked for easy find/replace: search "TODO_REPLACE_REVIEW".
 *
 * Sort order: most-recent first (REVIEWS is sorted DESC by date at export).
 */

export interface Review {
  name: string;
  area: string;
  rating: 5;
  date: string; // ISO month "YYYY-MM"
  service: string;
  excerpt: string;
}

const RAW_REVIEWS: Review[] = [
  {
    // TODO_REPLACE_REVIEW
    name: "Sarah K.",
    area: "Winter Park",
    rating: 5,
    date: "2026-03",
    service: "Landscape design",
    excerpt:
      "Ryan walked our backyard with us for over an hour before he ever quoted a number. Six weeks later we have a yard that actually makes sense — drainage fixed, lighting, native plants that don't need babying. The crew cleaned up every day before leaving.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Mike T.",
    area: "Windermere",
    rating: 5,
    date: "2026-01",
    service: "Sod installation",
    excerpt:
      "Chinch bugs took out most of our front lawn last summer. Firsthand pulled the dead St. Augustine, regraded a couple of low spots, and laid fresh sod in one day. They came back twice in the first month to check on it — that's not normal.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Rachel P.",
    area: "Bay Hill",
    rating: 5,
    date: "2025-10",
    service: "Irrigation",
    excerpt:
      "Our old irrigation was leaking through the meter and we'd been overpaying OUC for months. Firsthand audited the whole system, replaced four heads and a valve, and added a smart controller. Water bill dropped roughly 30% the following cycle.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "James M.",
    area: "College Park",
    rating: 5,
    date: "2026-04",
    service: "Lawn maintenance",
    excerpt:
      "We've used three different lawn crews on Princeton Street over five years. Firsthand is the first that mows at the right height for St. Augustine and edges the curb without scalping it. Same guys show up each week, on the same day.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Emily H.",
    area: "Doctor Phillips",
    rating: 5,
    date: "2025-11",
    service: "Backyard renovation",
    excerpt:
      "Full backyard tear-out and rebuild — paver patio, fire pit, new beds, lighting, irrigation tie-in. They handled the HOA submittal for us, which I didn't even know was an option. Project came in within the original estimate.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Carlos R.",
    area: "Audubon Park (Orlando)",
    rating: 5,
    date: "2025-12",
    service: "Tree trimming",
    excerpt:
      "Called Firsthand in May before hurricane season to thin out two big laurel oaks. Crew showed up with proper rigging, dropped the weight without scraping the roof, hauled every limb. Storms came through in August and the trees held.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Linda B.",
    area: "Winter Park",
    rating: 5,
    date: "2025-05",
    service: "Hardscape",
    excerpt:
      "Travertine walkway from the driveway to the front door — they pulled the old pavers, fixed the settled base, and re-laid everything level. Looks like it was supposed to be there from the start.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "David G.",
    area: "Windermere",
    rating: 5,
    date: "2026-02",
    service: "Landscape redesign (HOA)",
    excerpt:
      "Isleworth HOA had been after us about our front beds. Ryan came out, knew exactly which plants the ARC would approve, drew up a plan that got signed off on the first submission. Install was two weeks later.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Megan S.",
    area: "Winter Park",
    rating: 5,
    date: "2025-03",
    service: "Mulch and plant install",
    excerpt:
      "We wanted to refresh the beds before listing the house. Firsthand replaced the mulch, swapped out a row of tired loropetalum for firebush and plumbago, and tidied the bed lines. We sold above asking the next month.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Tom F.",
    area: "Bay Hill",
    rating: 5,
    date: "2025-09",
    service: "Sod patch + irrigation fix",
    excerpt:
      "Had a brown patch in the side yard that kept coming back. Turned out a buried lateral had been broken for who knows how long. Firsthand found it in 20 minutes, fixed it, patched the sod. Three other crews had said it was a fungus problem.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Property manager",
    area: "Orlando (commercial)",
    rating: 5,
    date: "2025-08",
    service: "Commercial maintenance contract",
    excerpt:
      "We manage four properties off Sand Lake Road. Firsthand took over the maintenance contract a year ago. Reports come in on time, photos uploaded, no surprises on the invoice. That's all we ask for and most vendors can't deliver it.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Anna L.",
    area: "College Park",
    rating: 5,
    date: "2025-04",
    service: "Storm cleanup",
    excerpt:
      "After Hurricane Ian a big limb came down on our fence. Firsthand was at the house the day after I called, cleared the tree, ground the stump, repaired two fence panels. Felt like a neighbor showed up, not a contractor.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Brian C.",
    area: "Winter Park",
    rating: 5,
    date: "2026-05",
    service: "Front yard redesign",
    excerpt:
      "Replaced a tired hedge with a mix of muhly grass and dwarf firebush. Six months in, the grass is in full plume in the afternoon light and we get neighbors stopping to ask about it. Honest pricing, no surprises.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Priya N.",
    area: "Winter Park",
    rating: 5,
    date: "2025-07",
    service: "Irrigation + sod",
    excerpt:
      "Bought a place near Mead Garden where the irrigation hadn't run in years. Firsthand walked the property, found three broken valves and a leaking backflow, rebuilt the zones, and re-sodded the dead patches. One crew, one bill, done in three days.",
  },
  {
    // TODO_REPLACE_REVIEW
    name: "Kevin O.",
    area: "Windermere",
    rating: 5,
    date: "2025-06",
    service: "Paver driveway",
    excerpt:
      "We compared three estimates for a paver driveway. Firsthand wasn't the cheapest but they were the only ones who explained why the base depth mattered for our soil. Two years later not a single shifted paver.",
  },
];

export const REVIEWS: Review[] = [...RAW_REVIEWS].sort((a, b) =>
  b.date.localeCompare(a.date),
);
