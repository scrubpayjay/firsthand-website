/**
 * Genuine, short Google Maps review excerpts verified November 24, 2026.
 * The matching profile lists Firsthand's website and 3720 N Orange Blossom Trl.
 * These are general landscaping reviews, not artificial turf testimonials.
 * Google exposed relative dates only; no exact review month is invented.
 */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Firsthand+Lawn+and+Landscape,+LLC/data=!4m2!3m1!1s0x88e77bc82a6698bb:0x5465c4d72841fa70";
export interface Review {
  name: string;
  area: string;
  rating: 5;
  date: string;
  service: string;
  excerpt: string;
  sourceUrl: string;
  verifiedAt: string;
}
export const REVIEWS: Review[] = [
  {
    name: "Sharon Briggs",
    area: "Google reviewer",
    rating: 5,
    date: "",
    service: "Landscaping",
    excerpt: "My landscaping looks absolutely gorgeous!",
    sourceUrl: GOOGLE_REVIEWS_URL,
    verifiedAt: "2026-11-24",
  },
  {
    name: "Kerry Ezzo",
    area: "Google reviewer",
    rating: 5,
    date: "",
    service: "Landscaping",
    excerpt: "Great landscaping service.",
    sourceUrl: GOOGLE_REVIEWS_URL,
    verifiedAt: "2026-11-24",
  },
  {
    name: "Taghrid Ebeid",
    area: "Google reviewer",
    rating: 5,
    date: "",
    service: "Landscape installation",
    excerpt: "He’s very nice, responds to texts quickly",
    sourceUrl: GOOGLE_REVIEWS_URL,
    verifiedAt: "2026-11-24",
  },
];
