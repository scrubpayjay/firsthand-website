"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Review } from "@/lib/reviews-data";
import { cn } from "@/lib/utils";

interface ReviewsCarouselProps {
  reviews: Review[];
  /** Auto-advance interval in ms. 0 disables. */
  intervalMs?: number;
}

const formatDate = (d: string) => {
  const [y, m] = d.split("-");
  const month = new Date(Number(y), Number(m) - 1, 1).toLocaleString("en-US", {
    month: "long",
  });
  return `${month} ${y}`;
};

/**
 * Reviews carousel.
 * - Mobile: 1 card visible
 * - Tablet/Desktop: 3 cards visible
 * - Auto-rotates every 5s; pauses on hover/focus and respects prefers-reduced-motion
 * - Manual chevron nav + dot indicators
 *
 * Implemented as a horizontally-scrolled flex container with snap points so it
 * works without an external carousel dep and stays responsive.
 */
export function ReviewsCarousel({
  reviews,
  intervalMs = 5000,
}: ReviewsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Slide count visible at once — used for dot indicators and stop point math
  const total = reviews.length;

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback(
    (i: number, behavior: ScrollBehavior = "smooth") => {
      const el = scrollerRef.current;
      if (!el) return;
      const target = el.children[i] as HTMLElement | undefined;
      if (!target) return;
      const targetLeft = target.offsetLeft - el.offsetLeft;
      el.scrollTo({ left: targetLeft, behavior });
      setIndex(i);
    },
    []
  );

  const next = useCallback(() => {
    setIndex((current) => {
      const nextIndex = (current + 1) % total;
      requestAnimationFrame(() => goTo(nextIndex));
      return nextIndex;
    });
  }, [goTo, total]);

  const prev = useCallback(() => {
    setIndex((current) => {
      const prevIndex = (current - 1 + total) % total;
      requestAnimationFrame(() => goTo(prevIndex));
      return prevIndex;
    });
  }, [goTo, total]);

  // Auto-rotate
  useEffect(() => {
    if (intervalMs <= 0 || paused || reducedMotion || total <= 1) return;
    const id = window.setInterval(next, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, paused, reducedMotion, next, total]);

  // Keep `index` in sync with manual horizontal scroll/swipe
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let timer: number | undefined;
    const onScroll = () => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const children = Array.from(el.children) as HTMLElement[];
        const scrollLeft = el.scrollLeft;
        // Find the child whose offsetLeft is closest to current scrollLeft
        let closest = 0;
        let closestDist = Infinity;
        children.forEach((c, i) => {
          const dist = Math.abs(c.offsetLeft - el.offsetLeft - scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setIndex(closest);
      }, 80);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
    >
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <figure
            key={`${r.name}-${r.date}-${i}`}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            className="snap-start shrink-0 w-[85%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] rounded-xl border border-border bg-card p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-cta text-cta"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDate(r.date)}
              </span>
            </div>
            <blockquote className="text-sm text-foreground leading-relaxed flex-1">
              &ldquo;{r.excerpt}&rdquo;
            </blockquote>
            <figcaption className="mt-4 pt-4 border-t border-border">
              <p className="text-sm font-semibold text-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {r.area} · {r.service}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5" aria-label="Carousel position">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              aria-current={index === i ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === i
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-border hover:bg-text-faint"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous review"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next review"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
