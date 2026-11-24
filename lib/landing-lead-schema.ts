import { z } from "zod";
import { ATTRIBUTION_KEYS } from "./landing-tracking";
import { landingServices } from "./landing-pages";
export const landingLeadSchema = z
  .object({
    landingPage: z.enum(["outdoor-living", "artificial-turf"]),
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().toLowerCase().email().max(200),
    phone: z
      .string()
      .trim()
      .max(40)
      .regex(/^\+?[\d().\-\s]+$/)
      .refine((v) => {
        const digits = v.replace(/\D/g, "");
        return (
          digits.length === 10 ||
          (digits.length === 11 && digits.startsWith("1"))
        );
      }, "Enter a US phone number"),
    zip: z.string().regex(/^\d{5}(?:-\d{4})?$/),
    projectType: z.string().max(100),
    squareFootage: z
      .string()
      .max(8)
      .regex(/^\d{1,7}$/)
      .optional(),
    budget: z
      .enum([
        "Under $10,000",
        "$10,000–$25,000",
        "$25,000–$50,000",
        "$50,000+",
        "Help me plan",
      ])
      .optional(),
    startDate: z
      .enum([
        "As soon as possible",
        "1–3 months",
        "3–6 months",
        "Planning ahead",
      ])
      .optional(),
    website: z.string().max(0),
    submissionId: z.string().uuid(),
    trackingConsent: z.boolean(),
    attribution: z
      .partialRecord(z.enum(ATTRIBUTION_KEYS), z.string().max(250))
      .default({}),
  })
  .superRefine((v, ctx) => {
    if (!landingServices(v.landingPage).some((s) => s.title === v.projectType))
      ctx.addIssue({
        code: "custom",
        path: ["projectType"],
        message: "Choose a project type",
      });
    if (
      v.landingPage === "artificial-turf" &&
      (!v.squareFootage || Number(v.squareFootage) < 1)
    )
      ctx.addIssue({
        code: "custom",
        path: ["squareFootage"],
        message: "Enter approximate square footage",
      });
    if (v.landingPage === "outdoor-living" && (!v.budget || !v.startDate))
      ctx.addIssue({
        code: "custom",
        path: ["budget"],
        message: "Choose budget and timing",
      });
  });
