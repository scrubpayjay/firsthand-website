import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

export type LandingKind = "outdoor-living" | "artificial-turf";
export type LandingService = { title: string; copy: string; photo?: string; confirmed: boolean };
// Specialty scope stays out of public copy and form options until the owner confirms it.
export const OUTDOOR_SERVICES: LandingService[] = [
  { title: "Custom Outdoor Living Spaces", copy: "A considered plan for the whole backyard. Bring hardscaping, entertaining areas, and landscape design together in one cohesive outdoor space.", photo: "lawn-landscape-card-1.jpg", confirmed: true },
  { title: "Paver Patios & Hardscaping", copy: "Create room to gather with paver patios, travertine, walkways, retaining walls, and decorative stonework.", photo: "hardscape-ryan-1.jpg", confirmed: true },
  { title: "Pergolas & Covered Patios", copy: "Custom pergolas, shade structures, covered patios, and comfortable outdoor seating.", photo: "landscape-ryan-10.jpg", confirmed: false },
  { title: "Outdoor Kitchens & Entertainment Areas", copy: "Built-in grilling stations, kitchen islands, countertops, and bar seating for outdoor entertaining.", confirmed: false },
  { title: "Fire Pits & Outdoor Fire Features", copy: "Fire pits, fire bowls, seating walls, and inviting gathering spaces.", confirmed: false },
  { title: "Landscape Design & Installation", copy: "Finish your space with tropical plantings, privacy hedges, decorative rock, mulch, sod, and a landscape plan tailored to your property.", photo: "landscape-ryan-2.jpg", confirmed: true },
  { title: "Pool Decks & Outdoor Surrounds", copy: "Pool deck pavers, travertine surfaces, decorative borders, drainage, and surrounding landscaping.", confirmed: false },
];
export const TURF_SERVICES: LandingService[] = [
  { title: "Residential Artificial Turf Installation", copy: "Professionally installed synthetic grass for front yards, backyards, side yards, and residential landscapes, with less traditional lawn upkeep.", confirmed: true },
  { title: "Backyard Artificial Turf Installation", copy: "Make your backyard a clean, functional space for recreation, entertaining, and everyday outdoor living.", confirmed: true },
  { title: "Pet-Friendly Artificial Turf Installation", copy: "Pet-specific turf options with appropriate drainage and installation techniques to support routine cleaning and everyday use.", confirmed: true },
  { title: "Artificial Turf for Patios, Pool Areas & Pavers", copy: "Integrate synthetic turf around patios, pool decks, walkways, and between pavers for a considered landscape design.", confirmed: true },
  { title: "Custom Backyard Putting Greens", copy: "A dedicated golf practice area with professionally prepared surfaces and finishing details.", confirmed: false },
  { title: "Artificial Turf Replacement & Lawn Conversion", copy: "Replace existing grass or worn artificial turf. Removal, ground preparation, base installation, and finishing are part of the plan.", confirmed: true },
];
export const TURF_FAQS = [
  { question: "How much does artificial turf installation cost in Orlando?", answer: "Pricing depends on square footage, turf selection, existing surface conditions, drainage requirements, and site preparation. Contact Firsthand for a customized estimate." },
  { question: "How long does artificial turf last in Florida?", answer: "Quality artificial turf can last approximately 10–15 years or longer depending on the product, UV exposure, traffic, maintenance, and installation quality." },
  { question: "Is artificial turf safe for dogs?", answer: "Pet-specific turf products are designed for use by dogs. Proper drainage and routine cleaning are important for hygiene and odor management." },
  { question: "Does artificial turf get hot in Florida?", answer: "Yes. Artificial turf can become significantly hotter than natural grass in direct sunlight. Product selection, shade, and occasional cooling with water can help manage surface temperatures." },
  { question: "Does artificial turf require maintenance?", answer: "Yes, but generally less than natural grass. Occasional rinsing, debris removal, brushing, and pet-waste cleanup help maintain its appearance." },
];
export const OUTDOOR_FAQS = [
  { question: "Where do we start with a backyard transformation?", answer: "Start with a free estimate. Tell us how you want to use your space, your budget, and your timing. We review the property and define a design and installation scope before work begins." },
  { question: "Can you combine a paver patio and new landscaping?", answer: "Yes. Paver patios, walkways, and landscape installation can be planned together for a cohesive outdoor space. Your estimate will identify the work included." },
  { question: "How much does an outdoor living project cost?", answer: "Cost depends on the size of the space, materials, site preparation, access, drainage, and the agreed scope. Request a property-specific estimate to explore the options." },
  { question: "Will my project need permits or HOA approval?", answer: "Requirements depend on your property and proposed work. Applicable permits, HOA approvals, and any specialist trade requirements should be confirmed in the project scope before installation begins." },
];
export const TURF_INCLUSIONS = ["Existing grass and vegetation removal", "Excavation and ground preparation", "Base material installation and compaction", "Drainage preparation as needed", "Weed barrier installation when appropriate", "Premium artificial turf installation", "Turf cutting, seaming, and securing", "Infill application when required", "Final grooming, inspection, and cleanup"];
export const LANDING_AREAS = ["Orlando", "Winter Park", "Windermere", "Bay Hill", "Lake Nona"];
export function landingServices(kind: LandingKind) { return (kind === "artificial-turf" ? TURF_SERVICES : OUTDOOR_SERVICES).filter(s => s.confirmed); }
export function landingMetadata(kind: LandingKind): Metadata {
  const turf = kind === "artificial-turf";
  const title = turf ? "Artificial Turf Installation in Orlando, FL" : "Outdoor Living & Backyard Transformations in Orlando";
  const description = turf ? "Residential, backyard, and pet-friendly artificial turf installation in Orlando. Explore preparation, drainage, maintenance, and a free property-specific estimate." : "Custom outdoor living design and installation in Orlando. Plan your backyard transformation with paver patios, hardscaping, and landscape installation. Free estimates.";
  return { title, description, alternates: { canonical: `${SITE_URL}/${kind}` }, openGraph: { type: "website", title, description, url: `${SITE_URL}/${kind}`, images: [{ url: `${SITE_URL}/photos/${turf ? "lawn-landscape-card-1.jpg" : "hardscape-ryan-1.jpg"}`, alt: turf ? "Firsthand landscape project; natural lawn shown" : "Firsthand paver patio project" }] }, twitter: { card: "summary_large_image", title, description } };
}
