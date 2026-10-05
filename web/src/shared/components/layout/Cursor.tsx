"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A trailing ring that follows the pointer and swells over anything clickable.
 * The native cursor stays visible; this only decorates it, and only on devices
 * with a fine pointer and no reduced-motion preference.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    const onMove = (event: PointerEvent) => {
      setEnabled(true);
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest("a, button, [role=button], input, textarea, select")));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] h-[54px] w-[54px] rounded-full border border-camel/70 will-change-transform"
      style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      // Scale instead of width/height so hovering never triggers layout.
      animate={{
        scale: (hovering ? 1 : 0.56) * (pressed ? 0.8 : 1),
        backgroundColor: hovering ? "rgba(227,99,127,0.18)" : "rgba(0,0,0,0)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
    />
  );
}
