import { SOCIAL, SITE_NAME } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// All three marks inlined — lucide-react v1.x doesn't ship the brand
// icons (removed for trademark cleanup). Matched stroke + viewBox so
// they render at the same visual weight inside the icon buttons below.

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.99 22 12z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.4 20.1a6.34 6.34 0 0 0 10.86-4.43V8.75a8.16 8.16 0 0 0 4.77 1.52V6.86a4.83 4.83 0 0 1-1.44-.17z" />
    </svg>
  );
}

interface SocialIconsProps {
  /** Tailwind class overrides on the wrapper. */
  className?: string;
  /** Visual size of each icon button. Default "md" (h-9 w-9). */
  size?: "sm" | "md";
}

export function SocialIcons({ className, size = "md" }: SocialIconsProps) {
  const btnSize = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const platforms = [
    { href: SOCIAL.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: SOCIAL.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: SOCIAL.tiktok, label: "TikTok", Icon: TikTokIcon },
  ];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {platforms.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${SITE_NAME} on ${label} (opens in new tab)`}
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors",
            btnSize,
          )}
        >
          <Icon className={iconSize} />
          <span className="sr-only">{label}</span>
        </a>
      ))}
    </div>
  );
}
