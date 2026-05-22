"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAP, SERVICES, SERVICE_AREAS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const primaryNav: Array<{ href: string; label: string }> = [
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service areas" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/financing", label: "Financing" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border"
          : "bg-background border-b border-transparent"
      )}
    >
      <div className="container-wide flex h-16 sm:h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="Firsthand Lawns — home"
        >
          {/* Logo pulled from the WordPress site — replace with higher-res SVG when available */}
          <Image
            src="/firsthand-logo.png"
            alt="Firsthand Lawns"
            width={225}
            height={100}
            priority
            className="h-9 sm:h-11 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side: phone + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${NAP.phoneTel}`}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Call ${NAP.phone}`}
          >
            <Phone className="h-3.5 w-3.5" />
            {NAP.phone}
          </a>
          <Link
            href="/contact"
            className="cta-pill inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold"
          >
            Get a free quote
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/contact"
            className="cta-pill inline-flex items-center justify-center px-4 py-2 text-sm font-semibold"
          >
            Quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-wide py-6 space-y-6">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-border pt-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 px-3">
                All services
              </div>
              <ul className="grid grid-cols-1 gap-0.5">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 px-3">
                Service areas
              </div>
              <ul className="grid grid-cols-2 gap-0.5">
                {SERVICE_AREAS.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/service-areas/${a.slug}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-4 flex flex-col gap-3">
              <a
                href={`tel:${NAP.phoneTel}`}
                className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted"
              >
                <Phone className="h-4 w-4" />
                Call {NAP.phone}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="cta-pill inline-flex items-center justify-center px-5 py-3 text-sm font-semibold"
              >
                Get a free quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
