"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import type { PointerEvent } from "react";

import { HandNote, Sticker } from "@/shared/components/ui/Doodles";
import { HudCorners } from "@/shared/components/ui/HudCorners";
import { siteConfig } from "@/shared/config/site";

// Fixed positions so server and client render the same dust.
const DUST = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 2 + (i % 3),
  delay: (i % 7) * 0.9,
  duration: 7 + (i % 5) * 1.6,
}));

/** The owner's photo, taped up like a print, with gentle parallax, drifting dust and stickers. */
export function HeroPortrait() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 20 });
  const imageX = useSpring(useTransform(x, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 20,
  });
  const imageY = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="mx-auto w-full max-w-[460px]" style={{ perspective: 1200 }}>
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY }}
        className="relative aspect-[3/4] w-full"
      >
        {/* Warm glow behind the frame */}
        <div
          aria-hidden
          className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-camel/30 via-wine/25 to-rose/20 blur-2xl"
        />

        <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-camel/30 bg-ink-3 shadow-2xl shadow-black/60">
          <motion.div className="absolute -inset-4" style={{ x: imageX, y: imageY }}>
            <Image
              src={siteConfig.portrait}
              alt={`Portrait of ${siteConfig.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 460px, 90vw"
              className="object-cover object-[50%_20%]"
            />
          </motion.div>

          {/* Light breathing through the window, plus floating dust motes */}
          <div
            aria-hidden
            className="absolute inset-0 animate-[glow_6s_ease-in-out_infinite] bg-gradient-to-bl from-[#ffd9a0]/25 via-transparent to-transparent"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {DUST.map((mote, index) => (
              <span
                key={index}
                className="absolute animate-[float_var(--d)_ease-in-out_infinite] rounded-full bg-[#ffe0a8] shadow-[0_0_8px_2px] shadow-[#ffd38a]/60"
                style={
                  {
                    left: `${mote.left}%`,
                    top: `${mote.top}%`,
                    width: mote.size,
                    height: mote.size,
                    animationDelay: `${mote.delay}s`,
                    "--d": `${mote.duration}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div aria-hidden className="scanlines absolute inset-0 opacity-15" />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/85 to-transparent"
          />

          <HudCorners size="h-6 w-6" className="m-4 border-cream/70" />

          <div className="absolute inset-x-6 bottom-5">
            <HandNote rotate={-3} className="text-3xl text-cream">
              hey, I&apos;m Satwik ✌
            </HandNote>
          </div>
        </div>

        {/* Strips of tape holding the print up */}
        <span
          aria-hidden
          className="absolute -top-3 left-8 h-7 w-24 -rotate-12 bg-cream/25 backdrop-blur-sm"
        />
        <span
          aria-hidden
          className="absolute -top-2 right-10 h-7 w-20 rotate-[9deg] bg-cream/20 backdrop-blur-sm"
        />

        {/* Stickers */}
        <div className="absolute -top-6 -right-6 sm:-right-10">
          <Sticker rotate={10}>96th %ile JEE ✦</Sticker>
        </div>
        <div className="absolute top-1/2 -left-8 sm:-left-14">
          <Sticker rotate={-9} className="bg-rose text-ink">
            FIDE 1700 ♞
          </Sticker>
        </div>
        <div className="absolute -right-4 bottom-16 sm:-right-12">
          <Sticker rotate={-5} className="bg-cream">
            AI-native ⚡
          </Sticker>
        </div>
      </motion.div>
    </div>
  );
}
