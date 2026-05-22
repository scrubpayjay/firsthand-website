interface GoogleMapsEmbedProps {
  /** Either a query (address/place name) or full embed URL */
  query: string;
  ariaLabel: string;
  className?: string;
}

/**
 * iframe-based embed — no API key needed. Lazy-loaded so it doesn't block LCP.
 */
export function GoogleMapsEmbed({
  query,
  ariaLabel,
  className,
}: GoogleMapsEmbedProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    query
  )}&output=embed`;

  return (
    <div
      className={`rounded-xl overflow-hidden border border-border shadow-card ${className ?? ""}`}
    >
      <iframe
        src={src}
        title={ariaLabel}
        aria-label={ariaLabel}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[300px] sm:h-[400px] lg:h-[450px] block"
        allowFullScreen
      />
    </div>
  );
}
