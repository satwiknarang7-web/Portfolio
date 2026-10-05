"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

const draw = {
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: "-40px" },
};

/** A hand-drawn arrow that sketches itself in when it scrolls into view. */
export function HandArrow({
  className,
  delay = 0.4,
  variant = "curve",
}: {
  className?: string;
  delay?: number;
  variant?: "curve" | "loop";
}) {
  const shaft =
    variant === "loop"
      ? "M6 60 C 20 20, 60 10, 58 40 C 56 62, 30 52, 44 30 C 58 10, 90 14, 112 26"
      : "M6 52 C 28 18, 66 8, 110 24";
  return (
    <svg aria-hidden viewBox="0 0 124 70" fill="none" className={cn("h-14 w-28", className)}>
      <motion.path
        d={shaft}
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        {...draw}
        transition={{ duration: 0.9, delay, ease: "easeInOut" }}
      />
      <motion.path
        d="M98 14 L112 25 L97 33"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw}
        transition={{ duration: 0.3, delay: delay + 0.85 }}
      />
    </svg>
  );
}

/** A loose, wobbly underline that draws itself beneath a heading. */
export function ScribbleUnderline({
  className,
  delay = 0.6,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 18"
      preserveAspectRatio="none"
      fill="none"
      className={cn("h-4 w-full text-rose", className)}
    >
      <motion.path
        d="M3 12 C 50 4, 95 15, 150 8 S 250 4, 297 10"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        {...draw}
        transition={{ duration: 1.1, delay, ease: "easeInOut" }}
      />
      <motion.path
        d="M30 15 C 90 9, 170 16, 270 12"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        opacity={0.6}
        {...draw}
        transition={{ duration: 0.9, delay: delay + 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
}

/** A highlighter stroke swiped behind a word or two. */
export function Marker({
  children,
  className,
  delay = 0.8,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className="relative isolate inline-block whitespace-nowrap">
      <motion.span
        aria-hidden
        className={cn(
          "absolute -inset-x-1 bottom-[0.1em] -z-10 h-[0.5em] origin-left -rotate-1 rounded-[3px] bg-rose/40",
          className,
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      {children}
    </span>
  );
}

/** A handwritten aside, slightly tilted, as if pencilled into the margin. */
export function HandNote({
  children,
  className,
  rotate = -4,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      className={cn("inline-block font-hand text-2xl leading-tight text-camel", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

/** A die-cut sticker slapped on at an angle; wobbles when hovered. */
export function Sticker({
  children,
  className,
  rotate = 6,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-camel px-4 py-1.5 font-hand text-xl leading-none text-ink shadow-[3px_4px_0_0] shadow-ink/80",
        className,
      )}
      initial={{ rotate, scale: 0 }}
      animate={{ rotate, scale: 1 }}
      whileHover={{ rotate: rotate - 8, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 260, damping: 14 }}
    >
      {children}
    </motion.span>
  );
}
