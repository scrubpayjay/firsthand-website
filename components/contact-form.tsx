"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { z } from "zod";
import { Loader2, ArrowRight } from "lucide-react";
import {
  contactSchema,
  type ContactInput,
  CITY_OPTIONS,
  SERVICE_OPTIONS,
} from "@/lib/contact-schema";

// Schema uses `.trim()` and `.toLowerCase()` transforms, so zod's input
// (pre-transform) and output (post-transform) types diverge. Pass both to
// useForm's generics; handleSubmit then types its callback as the OUTPUT type.
type ContactFormInput = z.input<typeof contactSchema>;

export function ContactForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "" as ContactFormInput["city"],
      service: "" as ContactFormInput["service"],
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submit failed");
      // Fire Meta Pixel Lead event if pixel loaded (cookie-consent gated)
      if (typeof window !== "undefined") {
        const w = window as typeof window & {
          fbq?: (event: string, name: string) => void;
        };
        if (typeof w.fbq === "function") {
          w.fbq("track", "Lead");
        }
      }
      router.push("/contact/thanks");
    } catch {
      setSubmitError(
        "Something went wrong. Please call us at (407) 337-5191 — we'll pick up faster anyway."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset disabled={isSubmitting} className="space-y-5 group">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            label="Name"
            error={errors.name?.message}
            required
          >
            <input
              {...register("name")}
              type="text"
              autoComplete="name"
              className={inputClass(!!errors.name)}
              placeholder="Sarah Kim"
            />
          </Field>
          <Field
            label="Phone"
            error={errors.phone?.message}
            required
          >
            <input
              {...register("phone")}
              type="tel"
              autoComplete="tel"
              className={inputClass(!!errors.phone)}
              placeholder="(407) 555-0123"
            />
          </Field>
        </div>

        <Field label="Email" error={errors.email?.message} required>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            placeholder="you@example.com"
          />
        </Field>

        <Field
          label="Property address"
          error={errors.address?.message}
          required
        >
          <input
            {...register("address")}
            type="text"
            autoComplete="street-address"
            className={inputClass(!!errors.address)}
            placeholder="1234 Magnolia Ave, Winter Park, FL 32789"
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="City" error={errors.city?.message} required>
            <select
              {...register("city")}
              className={selectClass(!!errors.city)}
              defaultValue=""
            >
              <option value="" disabled>
                Pick the closest
              </option>
              {CITY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Service interest"
            error={errors.service?.message}
            required
          >
            <select
              {...register("service")}
              className={selectClass(!!errors.service)}
              defaultValue=""
            >
              <option value="" disabled>
                What are you thinking?
              </option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="Tell us about the project"
          error={errors.message?.message}
          hint="Lot size, what's there now, what you're hoping to fix — whatever helps us scope it. Optional."
        >
          <textarea
            {...register("message")}
            rows={5}
            className={inputClass(!!errors.message)}
            placeholder="Roughly 1/4 acre, the front lawn is half dead from chinch bugs and the irrigation needs an overhaul…"
          />
        </Field>

        {/* Honeypot — visually hidden but in DOM for bots */}
        <div className="hidden" aria-hidden="true">
          <label>
            Website (leave empty)
            <input
              {...register("website")}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {submitError && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="cta-pill inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <p className="text-xs text-muted-foreground">
          We&apos;ll never share your info. Expect a reply within one business
          day — usually sooner.
        </p>
      </fieldset>
    </form>
  );
}

function Field({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-foreground mb-1.5">
        {label}
        {required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
      </span>
      {children}
      {hint && !error && (
        <span className="block text-xs text-muted-foreground mt-1.5">
          {hint}
        </span>
      )}
      {error && (
        <span className="block text-xs text-destructive mt-1.5">{error}</span>
      )}
    </label>
  );
}

function inputClass(hasError: boolean): string {
  return `block w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition-colors ${
    hasError ? "border-destructive" : "border-border"
  }`;
}

function selectClass(hasError: boolean): string {
  return `block w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition-colors ${
    hasError ? "border-destructive" : "border-border"
  }`;
}
