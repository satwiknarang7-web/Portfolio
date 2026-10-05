"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

import { HudCorners } from "./HudCorners";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Tilt the card in 3D toward the pointer. */
  tilt?: boolean;
};

/** Glass card with a pointer-following glow and optional 3D tilt. */
export function SpotlightCard({ children, className, tilt = false }: SpotlightCardProps) {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const rotateX = useSpring(0, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 18 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgb(227 99 127 / 0.16), transparent 70%)`;

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    mouseX.set(px);
    mouseY.set(py);
    if (tilt) {
      rotateY.set((px / rect.width - 0.5) * 10);
      rotateX.set((0.5 - py / rect.height) * 10);
    }
  };

  const onPointerLeave = () => {
    mouseX.set(-999);
    mouseY.set(-999);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn(
        "group glass relative overflow-hidden rounded-2xl transition-colors duration-500 hover:border-camel/30",
        className,
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: glow }}
      />
      <HudCorners className="m-2 border-camel/40 transition-colors duration-500 group-hover:border-rose" />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
