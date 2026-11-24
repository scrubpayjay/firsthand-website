import { LandingPage } from "@/components/landing-page";
import { landingMetadata } from "@/lib/landing-pages";
export const metadata = landingMetadata("artificial-turf");
export default function ArtificialTurfPage() {
  return <LandingPage kind="artificial-turf" />;
}
