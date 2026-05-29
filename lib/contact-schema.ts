import { z } from "zod";
import { SERVICES, SERVICE_AREAS } from "./site-config";

export const CITY_OPTIONS = [
  ...SERVICE_AREAS.map((a) => a.name),
  "Other Central Florida",
  "Not in service area",
] as const;

export const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.name),
  "Multiple / Not sure",
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
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot — should always be empty. Bots tend to fill every field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
