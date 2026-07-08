import type { NextConfig } from "next";
import path from "node:path";

/**
 * 301 redirect map — preserves SEO equity from the existing
 * firsthandlawns.com WordPress site after DNS cutover.
 * Source paths come from the old WordPress URL structure.
 */
const legacyRedirects = [
  { source: "/services/", destination: "/services", permanent: true },
  { source: "/services/lawn-care", destination: "/services/lawn-maintenance", permanent: true },
  { source: "/services/lawn-care/", destination: "/services/lawn-maintenance", permanent: true },
  { source: "/services/landscaping", destination: "/services/landscape-design", permanent: true },
  { source: "/services/landscaping/", destination: "/services/landscape-design", permanent: true },
  { source: "/projects", destination: "/portfolio", permanent: true },
  { source: "/projects/", destination: "/portfolio", permanent: true },
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/about-us/", destination: "/about", permanent: true },
  { source: "/where-we-service", destination: "/service-areas", permanent: true },
  { source: "/where-we-service/", destination: "/service-areas", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
  { source: "/contact-us/", destination: "/contact", permanent: true },
  // Old short URL now redirects to the canonical /privacy-policy — that
  // route ships the TCR/A2P 10DLC-compliant policy (SMS opt-in language,
  // sharing carve-out) referenced from the compliance filing.
  { source: "/privacy", destination: "/privacy-policy", permanent: true },
  { source: "/privacy/", destination: "/privacy-policy", permanent: true },
  { source: "/terms-and-conditions", destination: "/terms", permanent: true },
  { source: "/terms-and-conditions/", destination: "/terms", permanent: true },
];

const nextConfig: NextConfig = {
  // Pin Turbopack to this project so it ignores stray lockfiles in parent dirs.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      // CompanyCam-hosted photos that we link out to from /portfolio
      { protocol: "https", hostname: "app.companycam.com" },
      // Existing WordPress logo until replaced with on-site SVG
      { protocol: "https", hostname: "firsthandlawns.com" },
    ],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
