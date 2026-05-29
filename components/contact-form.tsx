"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { z } from "zod";
import { Loader2, ArrowRight, X } from "lucide-react";
import {
  contactSchema,
  type ContactInput,
  SERVICE_OPTIONS,
} from "@/lib/contact-schema";
import { AddressAutocomplete } from "@/components/address-autocomplete";

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

// Schema uses `.trim()` and `.toLowerCase()` transforms, so zod's input
// (pre-transform) and output (post-transform) types diverge. Pass both to
// useForm's generics; handleSubmit then types its callback as the OUTPUT type.
type ContactFormInput = z.input<typeof contactSchema>;

export function ContactForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      placeId: "",
      services: [],
      message: "",
      website: "",
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files ?? []);
    if (incoming.length === 0) return;

    const next = [...photos, ...incoming];
    if (next.length > MAX_PHOTOS) {
      setPhotoError(`You can attach at most ${MAX_PHOTOS} photos.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const tooBig = incoming.find((f) => f.size > MAX_PHOTO_BYTES);
    if (tooBig) {
      setPhotoError(`"${tooBig.name}" is over 10MB.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const notImage = incoming.find((f) => !f.type.startsWith("image/"));
    if (notImage) {
      setPhotoError(`"${notImage.name}" isn't an image.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setPhotoError(null);
    setPhotos(next);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoError(null);
  };

  const onSubmit = async (data: ContactInput) => {
    setSubmitError(null);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      if (data.city) formData.append("city", data.city);
      if (data.state) formData.append("state", data.state);
      if (data.zip) formData.append("zip", data.zip);
      if (data.placeId) formData.append("placeId", data.placeId);
      for (const s of data.services) formData.append("services", s);
      if (data.message) formData.append("message", data.message);
      if (data.website) formData.append("website", data.website);
      for (const file of photos) formData.append("photos", file);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
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
          hint="Start typing — we'll suggest matches from Google."
        >
          <AddressAutocomplete
            {...register("address")}
            type="text"
            autoComplete="street-address"
            className={inputClass(!!errors.address)}
            placeholder="1234 Magnolia Ave, Winter Park, FL 32789"
            onPlaceSelected={(sel) => {
              setValue("address", sel.formattedAddress, {
                shouldValidate: true,
                shouldDirty: true,
              });
              setValue("city", sel.city);
              setValue("state", sel.state);
              setValue("zip", sel.zip);
              setValue("placeId", sel.placeId);
            }}
          />
        </Field>
        <input type="hidden" {...register("city")} />
        <input type="hidden" {...register("state")} />
        <input type="hidden" {...register("zip")} />
        <input type="hidden" {...register("placeId")} />

        <fieldset className="block">
          <legend className="block text-sm font-medium text-foreground mb-1.5">
            Services you&apos;re interested in
            <span className="text-primary ml-1" aria-hidden="true">
              *
            </span>
          </legend>
          <div className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5">
            {SERVICE_OPTIONS.map((option) => (
              <label
                key={option}
                className="flex items-start gap-2.5 text-sm text-foreground cursor-pointer"
              >
                <input
                  {...register("services")}
                  type="checkbox"
                  value={option}
                  className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring/30"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.services && (
            <span className="block text-xs text-destructive mt-1.5">
              {errors.services.message}
            </span>
          )}
        </fieldset>

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

        <div className="block">
          <label
            htmlFor="contact-photos"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Photos (optional)
          </label>
          <input
            ref={fileInputRef}
            id="contact-photos"
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoChange}
            className="block w-full text-sm text-foreground file:mr-3 file:rounded-md file:border file:border-border file:bg-background file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground hover:file:bg-muted/40"
          />
          <span className="block text-xs text-muted-foreground mt-1.5">
            Up to {MAX_PHOTOS} photos, 10MB each. Helps us spot trouble before
            we visit.
          </span>
          {photoError && (
            <span className="block text-xs text-destructive mt-1.5">
              {photoError}
            </span>
          )}
          {photos.length > 0 && (
            <ul className="mt-2.5 space-y-1.5">
              {photos.map((file, i) => (
                <li
                  key={`${file.name}-${i}`}
                  className="flex items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs"
                >
                  <span className="truncate text-foreground">
                    {file.name}
                    <span className="ml-2 text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="inline-flex items-center text-muted-foreground hover:text-destructive"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

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
