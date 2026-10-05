"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { contactSchema, type ContactField, type ContactFormState } from "./schema";

const REQUEST_TIMEOUT_MS = 10_000;

/**
 * Where the contact API lives. On Vercel, the `api` service binding injects
 * CONTACT_API_URL at runtime; locally it comes from .env.local or defaults to
 * the uvicorn dev server. Read per request, since bindings resolve at runtime.
 */
function contactEndpoint(): URL {
  const base = process.env.CONTACT_API_URL ?? "http://127.0.0.1:8000";
  return new URL("api/contact", base.endsWith("/") ? base : `${base}/`);
}

function pickValues(formData: FormData): Partial<Record<ContactField, string>> {
  const fields: ContactField[] = ["name", "email", "subject", "message"];
  return Object.fromEntries(fields.map((field) => [field, String(formData.get(field) ?? "")]));
}

/** Validates the contact form and forwards it to the Python API. */
export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = pickValues(formData);
  const parsed = contactSchema.safeParse({ ...values, website: formData.get("website") ?? "" });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const requestHeaders = await headers();
  const clientIp = requestHeaders.get("x-forwarded-for") ?? requestHeaders.get("x-real-ip") ?? "";

  try {
    const response = await fetch(contactEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(clientIp && { "X-Forwarded-For": clientIp }),
      },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (response.status === 429) {
      return {
        status: "error",
        message: "You've sent a few messages already — please try again later.",
        values,
      };
    }
    if (!response.ok) {
      return {
        status: "error",
        message: "Something went wrong on my side. Please try again.",
        values,
      };
    }

    return { status: "success", message: "Message sent! I'll get back to you soon." };
  } catch {
    return {
      status: "error",
      message: "Couldn't reach the server. Please try again, or email me directly.",
      values,
    };
  }
}
