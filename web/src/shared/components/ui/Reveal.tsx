"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  /** Render as a list item when used directly inside <ul>/<ol>. */
  as?: "div" | "li";
};

/** Fades and lifts its children into view the first time they scroll on screen. */
export function Reveal({ delay = 0, y = 28, as = "div", children, ...props }: RevealProps) {
  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...(props as HTMLMotionProps<"div"> & HTMLMotionProps<"li">)}
    >
      {children}
    </Component>
  );
}
