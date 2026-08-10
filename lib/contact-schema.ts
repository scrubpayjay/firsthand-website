import { z } from "zod";
import { SERVICES, SERVICE_AREAS } from "./site-config";

export const CITY_OPTIONS = [
  ...SERVICE_AREAS.map((a) => a.name),
  "Other Central Florida",
  "Not in service area",
] as const;

export const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.name),
  "Other",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .max(200),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(40)
    .regex(/[\d().+\-\s]+/i, "Enter a valid phone number"),
  address: z
    .string()
    .trim()
    .min(5, "Enter the property address")
    .max(200, "Address is too long"),
  city: z.string().trim().max(100).optional().or(z.literal("")),
  state: z.string().trim().max(50).optional().or(z.literal("")),
  zip: z.string().trim().max(20).optional().or(z.literal("")),
  placeId: z.string().trim().max(255).optional().or(z.literal("")),
  services: z
    .array(z.enum(SERVICE_OPTIONS))
    .min(1, "Pick at least one service"),
  // Required: Ryan uses this to scope the job before calling, and it is what
  // the automated quote drafter reads. An empty box means a phone call just
  // to ask "what do you need?".
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a bit about the project")
    .max(2000, "That is a bit long — 2000 characters max"),
  // TCR / A2P 10DLC opt-in. Optional and unchecked by default — carriers
  // require that granting SMS consent is not a condition of submitting the
  // form. `false` means the lead has NOT opted into SMS from this submission.
  smsConsent: z.boolean().default(false),
  // Honeypot — should always be empty. Bots tend to fill every field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
