import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SitePhoto as SitePhotoType } from "@/lib/photos-manifest";

interface SitePhotoProps {
  photo: SitePhotoType;
  /** Tailwind aspect class (default keeps original ratio) */
  aspect?: string;
  /** Tailwind sizes / width hint for responsive loading */
  sizes?: string;
  /** Mark as the LCP candidate */
  priority?: boolean;
  className?: string;
  /** Optional rounded utility (default rounded-xl) */
  rounded?: string;
}

/**
 * Wraps next/image with the bits the manifest already knows about a photo:
 * src, alt, width, height. Caller picks aspect ratio (via aspect prop or by
 * letting Image use intrinsic w/h), priority, and sizes for responsive loads.
 */
export function SitePhoto({
  photo,
  aspect,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className,
  rounded = "rounded-xl",
}: SitePhotoProps) {
  if (aspect) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden bg-muted",
          aspect,
          rounded,
          className
        )}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      className={cn(rounded, "w-full h-auto", className)}
    />
  );
}
