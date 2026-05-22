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
      // 0.5px border per audit spec — on retina renders as a true hairline;
      // on standard-density displays it rounds to the nearest physical pixel.
      className={`rounded-xl overflow-hidden border-[0.5px] border-border-strong shadow-card ${className ?? ""}`}
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
