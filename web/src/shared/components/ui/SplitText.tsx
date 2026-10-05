"use client";

import { motion } from "motion/react";

import { cn } from "@/shared/lib/cn";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

/** Reveals a headline word by word, each word sliding up from behind a mask. */
export function SplitText({ text, className, delay = 0 }: SplitTextProps) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden
          className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {index < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
