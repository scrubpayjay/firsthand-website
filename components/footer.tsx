import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { SocialIcons } from "@/components/social-icons";
import {
  NAP,
  SERVICES,
  SERVICE_AREAS,
  SITE_TAGLINE,
  HOURS_DISPLAY,
  PHONE_HOURS_DISPLAY,
  LEAVE_REVIEW_URL,
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

            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <SocialIcons />
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
            <span className="ml-2 inline-block font-semibold text-foreground">
              · {PHONE_HOURS_DISPLAY}
            </span>
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
