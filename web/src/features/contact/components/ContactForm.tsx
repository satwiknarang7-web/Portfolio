"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, RotateCcw, Send, TriangleAlert } from "lucide-react";
import { useActionState, useState, type FormEvent } from "react";

import { HudCorners } from "@/shared/components/ui/HudCorners";
import { siteConfig } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";

import { submitContact } from "../actions";
import { emailDeliveryEnabled, sendViaWeb3Forms } from "../web3forms";
import { initialContactState, type ContactField, type ContactFormState } from "../schema";

type FieldConfig = {
  name: ContactField;
  code: string;
  label: string;
  placeholder: string;
  type?: "text" | "email";
  autoComplete?: string;
  multiline?: boolean;
  maxLength: number;
};

const fields: FieldConfig[] = [
  {
    name: "name",
    code: "01",
    label: "Your name",
    placeholder: "Ada Lovelace",
    autoComplete: "name",
    maxLength: 80,
  },
  {
    name: "email",
    code: "02",
    label: "Your email",
    placeholder: "you@company.com",
    type: "email",
    autoComplete: "email",
    maxLength: 254,
  },
  {
    name: "subject",
    code: "03",
    label: "What's it about?",
    placeholder: "Role, collaboration or idea",
    maxLength: 120,
  },
  {
    name: "message",
    code: "04",
    label: "Your message",
    placeholder: "Tell me what you're building…",
    multiline: true,
    maxLength: 5000,
  },
];

const inputClasses =
  "w-full rounded-lg border bg-ink/70 px-4 py-3 text-cream placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-rose/70 focus:bg-ink/90 focus:shadow-[0_0_0_3px] focus:shadow-rose/15 focus-visible:outline-none";

const firstName = siteConfig.name.split(" ")[0];

/** Lit bars showing how complete the message is. */
function SignalMeter({ strength, transmitting }: { strength: number; transmitting: boolean }) {
  return (
    <div className="flex items-center gap-2" aria-hidden>
      <span className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">Signal</span>
      <div className="flex items-end gap-[3px]">
        {[0, 1, 2, 3].map((bar) => (
          <span
            key={bar}
            className={cn(
              "w-1 rounded-sm transition-colors duration-300",
              bar < strength || transmitting ? "bg-rose" : "bg-line",
              transmitting && "animate-pulse",
            )}
            style={{ height: `${6 + bar * 3}px`, animationDelay: `${bar * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Validates and records the message on the server, then emails it from the
 * browser via Web3Forms. Email still goes out if only the API was unreachable,
 * but never for invalid input, rate-limited senders or bots.
 */
async function deliver(previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const result = await submitContact(previous, formData);
  if (!emailDeliveryEnabled) return result;

  const isBot = String(formData.get("website") ?? "") !== "";
  const blocked = result.status === "error" && result.reason !== "unavailable";
  if (isBot || blocked) return result;

  const emailed = await sendViaWeb3Forms(formData);
  if (emailed) return { status: "success", message: "Message sent! I'll get back to you soon." };
  return result;
}

function ContactConsole({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(deliver, initialContactState);
  const [filled, setFilled] = useState<Record<ContactField, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [messageLength, setMessageLength] = useState(0);

  const onInput = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const name = target.name as ContactField;
    if (!(name in filled)) return;
    setFilled((current) => ({ ...current, [name]: target.value.trim().length > 0 }));
    if (name === "message") setMessageLength(target.value.length);
  };

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        className="relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-ink-2/90 p-10 text-center sm:p-14"
      >
        <HudCorners className="m-3 border-emerald-400/60" />
        <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" />
        <p className="mt-5 font-mono text-[10px] tracking-[0.3em] text-emerald-400 uppercase">
          Message received
        </p>
        <p className="mt-4 font-display text-4xl">Thank you!</p>
        <p className="mt-3 text-muted">{state.message}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-cream uppercase transition-colors hover:border-camel/60 hover:bg-cream/5"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Send another
        </button>
      </motion.div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const values = state.status === "error" ? state.values : undefined;
  const strength = Object.values(filled).filter(Boolean).length;

  return (
    <form
      action={formAction}
      onInput={onInput}
      noValidate
      className="relative overflow-hidden rounded-2xl border border-line bg-ink-2/90"
    >
      <HudCorners className="m-2" />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-20" />

      {/* Progress beam while sending */}
      <AnimatePresence>
        {pending && (
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-wine via-rose to-camel"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Console header */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4 sm:px-8">
        <p className="font-mono text-[10px] tracking-[0.25em] text-camel uppercase">
          Write {firstName} a note
        </p>
        <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-emerald-400 uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Inbox open
        </p>
      </div>

      <div className="relative grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
        {fields.map((field) => {
          const error = errors?.[field.name]?.[0];
          const id = `contact-${field.name}`;
          const describedBy = [error ? `${id}-error` : null, field.multiline ? `${id}-count` : null]
            .filter(Boolean)
            .join(" ");
          const shared = {
            id,
            name: field.name,
            placeholder: field.placeholder,
            required: true,
            maxLength: field.maxLength,
            defaultValue: values?.[field.name],
            "aria-invalid": Boolean(error),
            "aria-describedby": describedBy || undefined,
            className: cn(inputClasses, error ? "border-rose" : "border-line"),
          };

          return (
            <div
              key={field.name}
              className={cn(field.name === "subject" || field.multiline ? "sm:col-span-2" : "")}
            >
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor={id}
                  className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase"
                >
                  <span className="text-camel">[{field.code}]</span> {field.label}
                </label>
                {field.multiline && (
                  <span
                    id={`${id}-count`}
                    className="font-mono text-[10px] tracking-wider text-muted tabular-nums"
                  >
                    {messageLength}/{field.maxLength}
                  </span>
                )}
              </div>
              {field.multiline ? (
                <textarea {...shared} rows={6} className={cn(shared.className, "resize-y")} />
              ) : (
                <input {...shared} type={field.type ?? "text"} autoComplete={field.autoComplete} />
              )}
              {error && (
                <p
                  id={`${id}-error`}
                  className="mt-2 font-mono text-[11px] tracking-wide text-rose"
                >
                  ✕ {error}
                </p>
              )}
            </div>
          );
        })}

        {/* Honeypot: invisible to people, tempting to bots. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <AnimatePresence>
          {state.status === "error" && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5 rounded-lg border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-rose sm:col-span-2"
            >
              <TriangleAlert className="h-4 w-4 shrink-0" />
              <span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
                  Couldn&apos;t send ·{" "}
                </span>
                {state.message}
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Console footer */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-4 sm:px-8">
        <SignalMeter strength={strength} transmitting={pending} />
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-wine to-rose px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase shadow-[0_10px_40px_-10px] shadow-rose/60 transition-all duration-300 hover:shadow-rose/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send it
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/** The contact form, styled as a console card. */
export function ContactForm() {
  // Bumping the key remounts the console, giving a fresh form after a successful send.
  const [attempt, setAttempt] = useState(0);
  return <ContactConsole key={attempt} onReset={() => setAttempt((count) => count + 1)} />;
}
