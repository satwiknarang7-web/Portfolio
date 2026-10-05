import { z } from "zod";

/** Mirrors ContactMessageIn in the Python API so both sides agree on the rules. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.email("Please enter a valid email address.").trim(),
  subject: z.string().trim().min(3, "Subject is too short.").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (at least 10 characters).")
    .max(5000, "Please keep it under 5000 characters."),
  // Honeypot field, hidden from humans.
  website: z.string().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string[]>>;
      values?: Partial<Record<ContactField, string>>;
    };

export const initialContactState: ContactFormState = { status: "idle" };
