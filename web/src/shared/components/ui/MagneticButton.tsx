"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import type { ComponentProps, PointerEvent, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const variants = {
  primary:
    "bg-gradient-to-r from-wine to-rose text-cream shadow-[0_10px_40px_-10px] shadow-rose/60 hover:shadow-rose/90",
  ghost: "border border-line text-cream hover:border-camel/60 hover:bg-cream/5",
};

/** A link-button that leans toward the pointer, for a tactile hover. */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="inline-block"
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}
