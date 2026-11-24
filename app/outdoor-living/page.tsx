import { LandingPage } from "@/components/landing-page";
import { landingMetadata } from "@/lib/landing-pages";
export const metadata = landingMetadata("outdoor-living");
export default function OutdoorLivingPage() {
  return <LandingPage kind="outdoor-living" />;
}
