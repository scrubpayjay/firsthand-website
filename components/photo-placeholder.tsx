import { cn } from "@/lib/utils";

interface PhotoPlaceholderProps {
  /** What Ryan should drop in here from CompanyCam */
  label: string;
  /** Tailwind aspect ratio class — default 4:3 (landscape-typical) */
  aspect?: string;
  /** Optional muted variant */
  variant?: "primary" | "muted" | "dark";
  className?: string;
}

/**
 * Gray gradient placeholder that doubles as a [RYAN: ...] marker for which
 * CompanyCam photo to swap in pre-launch. No image files needed.
 */
export function PhotoPlaceholder({
  label,
  aspect = "aspect-[4/3]",
  variant = "muted",
  className,
}: PhotoPlaceholderProps) {
  const variants = {
    primary:
      "from-primary/15 via-primary/8 to-primary/20 text-primary border-primary/20",
    muted:
      "from-muted via-elevated to-muted text-muted-foreground border-border",
    dark:
      "from-primary/90 via-primary/80 to-primary/95 text-primary-foreground border-primary",
  } as const;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border bg-gradient-to-br flex items-center justify-center text-center p-5",
        aspect,
        variants[variant],
        className
      )}
      role="img"
      aria-label={`Photo placeholder: ${label}`}
    >
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        {/* Subtle diagonal stripe so the placeholder reads as "to be replaced" not "broken image" */}
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <pattern id="ph-stripes" patternUnits="userSpaceOnUse" width="6" height="6">
              <path d="M-1,1 l2,-2 M0,6 l6,-6 M5,7 l2,-2" stroke="currentColor" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#ph-stripes)" />
        </svg>
      </div>
      {/* No visible label — the diagonal stripe + muted gradient read as
          "placeholder, image coming soon" without exposing the internal
          authoring instruction to customers. The `aria-label` on the
          wrapper still carries the original label for assistive tech and
          for content auditing via the browser inspector. */}
      <div className="sr-only">{label}</div>
    </div>
  );
}
