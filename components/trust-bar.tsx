import { Star, ShieldCheck, Home, Users } from "lucide-react";
import { REVIEWS_SUMMARY } from "@/lib/site-config";

const items = [
  {
    icon: Star,
    label: `${REVIEWS_SUMMARY.rating.toFixed(1)} ★ Google`,
    sub: `${REVIEWS_SUMMARY.count} reviews`,
  },
  {
    icon: Home,
    label: "Family-owned",
    sub: "Local in Winter Park",
  },
  {
    icon: ShieldCheck,
    label: "Fully insured",
    sub: "License & insurance on request",
  },
  {
    icon: Users,
    label: "Residential + commercial",
    sub: "Homes, HOAs, property managers",
  },
];

export function TrustBar() {
  return (
    <div className="border-y border-border bg-card">
      <div className="container-wide py-6 sm:py-7">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                    {item.sub}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
