import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { GoogleMapsEmbed } from "@/components/google-maps-embed";
import { SocialIcons } from "@/components/social-icons";
import {
  NAP,
  SITE_URL,
  HOURS,
  HOURS_DISPLAY,
  SERVICE_AREAS,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Firsthand Lawns — Get a free landscape estimate",
  description:
    "Call (407) 337-5191, email, or send a quick form. Free estimates for Winter Park, Windermere, Bay Hill, College Park, and Orlando. Usually back within one business day.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="container-wide pt-6 pb-12 lg:pt-8 lg:pb-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Get in touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold tracking-tight">
            Tell us about the property.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            The fastest way to a quote is the form below — or call us
            directly. We&apos;ll come out, walk the property with you, and
            write up an honest estimate. Usually within one business day.
          </p>
        </div>
      </section>

      <section className="container-wide pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-12 items-start">
          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-card">
            <ContactForm />
          </div>

          {/* Direct contact */}
          <aside className="space-y-7">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight mb-5">
                Reach us directly
              </h2>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${NAP.phoneTel}`}
                    className="group flex items-start gap-3"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                        Call
                      </span>
                      <span className="block text-base font-semibold text-foreground">
                        {NAP.phone}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${NAP.email}`}
                    className="group flex items-start gap-3"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                        Email
                      </span>
                      <span className="block text-base font-semibold text-foreground break-all">
                        {NAP.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                        Office
                      </span>
                      <span className="block text-sm text-foreground">
                        {NAP.street}
                        <br />
                        {NAP.city}, {NAP.state} {NAP.zip}
                      </span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Clock className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                        Hours
                      </span>
                      <span className="block text-sm text-foreground">
                        {HOURS_DISPLAY}
                      </span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-5">
              <h3 className="font-semibold text-foreground mb-2 text-sm">
                Service areas
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                We work across Central Florida, primarily in:
              </p>
              <ul className="flex flex-wrap gap-2">
                {SERVICE_AREAS.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/service-areas/${a.slug}`}
                      className="inline-flex items-center rounded-full bg-card border border-border px-3 py-1 text-xs font-medium text-foreground hover:border-primary/40"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-3">
                Outside this area? Ask us — we&apos;ll tell you straight
                whether we&apos;re a fit.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className="container-wide pb-16 lg:pb-24">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-5">
          Where to find us
        </h2>
        <GoogleMapsEmbed
          query={`${NAP.street}, ${NAP.city}, ${NAP.state} ${NAP.zip}`}
          ariaLabel={`Map showing ${NAP.street}, ${NAP.city}, ${NAP.state}`}
        />
      </section>

      {/* Hours detail */}
      <section className="bg-elevated section-tight">
        <div className="container-wide">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
            Office hours
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 max-w-4xl">
            {HOURS.map((h) => (
              <li
                key={h.day}
                className="rounded-lg border border-border bg-card px-3 py-3 text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  {h.day.slice(0, 3)}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {formatTime(h.open)}&ndash;{formatTime(h.close)}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Storm cleanup and emergency tree work: outside-hours response on
            request, billed at after-hours rate.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <p className="text-sm font-semibold text-foreground">
              Follow Firsthand
            </p>
            <SocialIcons />
          </div>
        </div>
      </section>
    </>
  );
}

function formatTime(t: string): string {
  const [hStr, m] = t.split(":");
  const h = Number(hStr);
  const period = h >= 12 ? "pm" : "am";
  const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${display}${m === "00" ? "" : ":" + m}${period}`;
}
