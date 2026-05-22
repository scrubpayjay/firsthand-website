import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.99 22 12z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import { Star } from "lucide-react";
import {
  NAP,
  SOCIAL,
  SERVICES,
  SERVICE_AREAS,
  SITE_TAGLINE,
  HOURS_DISPLAY,
  LEAVE_REVIEW_URL,
  SITE_NAME,
} from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container-wide py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand column — spans 2 on lg */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center mb-4" aria-label="Firsthand Lawns — home">
              <Image
                src="/firsthand-logo.png"
                alt="Firsthand Lawns"
                width={225}
                height={100}
                className="h-12 w-auto"
              />
            </Link>
            <p className="font-display italic text-muted-foreground mb-5">
              {SITE_TAGLINE}
            </p>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${NAP.phoneTel}`}
                  className="flex items-start gap-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  {NAP.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${NAP.email}`}
                  className="flex items-start gap-2.5 text-muted-foreground hover:text-foreground break-all"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  {NAP.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  {NAP.street}
                  <br />
                  {NAP.city}, {NAP.state} {NAP.zip}
                </span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE_NAME} on Facebook (opens in new tab)`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <FacebookIcon className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE_NAME} on Instagram (opens in new tab)`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href={LEAVE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:border-primary/40 transition-colors"
              >
                <Star className="h-3.5 w-3.5 fill-cta text-cta" strokeWidth={0} />
                Leave a Google review
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3.5 font-sans tracking-normal">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3.5 font-sans tracking-normal">
              Service areas
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICE_AREAS.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-areas/${a.slug}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3.5 font-sans tracking-normal">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-foreground">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/financing" className="text-muted-foreground hover:text-foreground">
                  Financing
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-muted-foreground hover:text-foreground">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Hours strip */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Hours: </span>
            {HOURS_DISPLAY}
          </p>
          <p className="text-muted-foreground">
            Family-owned · Fully licensed and insured · Central Florida since 2018
          </p>
        </div>

        {/* Legal row */}
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Firsthand Lawns. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
