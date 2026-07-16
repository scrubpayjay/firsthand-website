import { z } from "zod";

// Inbound message from the chat widget. We cap message length to keep
// per-turn cost bounded and limit history depth on the route side.
export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(40),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

// Lead capture from inside the chat. Looser than the main contact-schema:
// chat is exploratory, so address/services aren't required — Ryan still
// gets a usable email + Jobber row from name + at-least-one-contact.
export const chatLeadSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z
      .union([
        z.string().trim().toLowerCase().email().max(200),
        z.literal(""),
      ])
      .optional(),
    phone: z
      .union([
        z
          .string()
          .trim()
          .min(7)
          .max(40)
          .regex(/[\d().+\-\s]+/i),
        z.literal(""),
      ])
      .optional(),
    interest: z.string().trim().max(500).optional().or(z.literal("")),
    // First ~6 turns of the conversation that led to the capture — useful
    // context for Ryan when he replies. Capped on the client.
    transcript: z.string().trim().max(8000).optional().or(z.literal("")),
  })
  .refine(
    (v) => (v.email && v.email.length > 0) || (v.phone && v.phone.length > 0),
    { message: "Provide an email or phone number" },
  );

export type ChatLeadInput = z.infer<typeof chatLeadSchema>;
