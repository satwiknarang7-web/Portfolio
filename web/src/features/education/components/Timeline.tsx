"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { GraduationCap, MapPin } from "lucide-react";
import { useRef } from "react";

import { Reveal } from "@/shared/components/ui/Reveal";
import { SpotlightCard } from "@/shared/components/ui/SpotlightCard";

import type { EducationEntry } from "../data";

/** Vertical timeline whose spine draws itself as the visitor scrolls. */
export function Timeline({ entries }: { entries: readonly EducationEntry[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative space-y-14 pl-10 sm:pl-16">
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-[11px] w-px bg-line sm:left-[19px]"
      />
      <motion.span
        aria-hidden
        className="absolute top-0 bottom-0 left-[11px] w-px origin-top bg-gradient-to-b from-rose via-camel to-wine sm:left-[19px]"
        style={{ scaleY }}
      />

      {entries.map((entry) => (
        <li key={entry.institution} className="relative">
          <span
            aria-hidden
            className="absolute top-8 -left-10 grid h-6 w-6 place-items-center rounded-full border border-camel/50 bg-ink sm:-left-16 sm:h-10 sm:w-10"
          >
            <GraduationCap className="h-3 w-3 text-camel sm:h-4 sm:w-4" />
          </span>
          <Reveal>
            <SpotlightCard className="p-7 sm:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-mono text-sm text-camel">{entry.period ?? "Degree"}</p>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="h-3.5 w-3.5" /> {entry.location}
                </p>
              </div>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">{entry.institution}</h2>
              <p className="mt-2 text-lg text-cream/80">{entry.qualification}</p>
              <ul className="mt-6 space-y-2 text-muted">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-rose" />
                    {highlight}
                  </li>
                ))}
              </ul>
              {entry.focus && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {entry.focus.map((subject) => (
                    <li
                      key={subject}
                      className="rounded-full bg-cream/5 px-3 py-1 text-xs text-cream/70"
                    >
                      {subject}
                    </li>
                  ))}
                </ul>
              )}
            </SpotlightCard>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
