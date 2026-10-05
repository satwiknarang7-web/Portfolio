import { Cpu, Crown, Medal, Palette, Trophy, type LucideIcon } from "lucide-react";

import Image from "next/image";

import { Reveal } from "@/shared/components/ui/Reveal";
import { SpotlightCard } from "@/shared/components/ui/SpotlightCard";
import { cn } from "@/shared/lib/cn";

import type { Hobby, HobbyIcon } from "../data";

const hobbyIcons: Record<HobbyIcon, LucideIcon> = {
  medal: Medal,
  trophy: Trophy,
  crown: Crown,
  palette: Palette,
  cpu: Cpu,
};

const sizeClasses: Record<Hobby["size"], string> = {
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  normal: "",
};

/** Bento-style grid of hobby tiles. */
export function HobbyGrid({ hobbies }: { hobbies: readonly Hobby[] }) {
  return (
    <ul className="grid auto-rows-[minmax(240px,auto)] gap-5 md:grid-cols-3">
      {hobbies.map((hobby, index) => {
        const Icon = hobbyIcons[hobby.icon];
        return (
          <Reveal
            as="li"
            key={hobby.title}
            delay={index * 0.06}
            className={sizeClasses[hobby.size]}
          >
            <SpotlightCard className="h-full">
              {hobby.photo && (
                <>
                  <Image
                    src={hobby.photo.src}
                    alt={hobby.photo.alt}
                    fill
                    sizes={
                      hobby.size === "wide"
                        ? "(min-width: 768px) 66vw, 100vw"
                        : "(min-width: 768px) 33vw, 100vw"
                    }
                    className="object-cover opacity-55 transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:opacity-70"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-wine/20"
                  />
                  <div aria-hidden className="scanlines absolute inset-0 opacity-20" />
                </>
              )}
              <div className="relative flex h-full flex-col justify-between p-8">
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-wine to-camel shadow-lg shadow-wine/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                </div>
                <div className={cn(hobby.size === "tall" ? "mt-auto" : "mt-10")}>
                  <h2 className="font-display text-4xl">{hobby.title}</h2>
                  <p className="mt-3 leading-relaxed text-cream/75">{hobby.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {hobby.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-cream/5 px-3 py-1 text-xs text-cream/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                {hobby.photo && (
                  <p className="mt-6 text-right font-mono text-[9px] tracking-[0.2em] text-cream/40 uppercase">
                    Photo ·{" "}
                    <a
                      href={`https://unsplash.com/@${hobby.photo.username}?utm_source=satwik_portfolio&utm_medium=referral`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-camel"
                    >
                      {hobby.photo.photographer}
                    </a>{" "}
                    /{" "}
                    <a
                      href="https://unsplash.com/?utm_source=satwik_portfolio&utm_medium=referral"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-camel"
                    >
                      Unsplash
                    </a>
                  </p>
                )}
              </div>
            </SpotlightCard>
          </Reveal>
        );
      })}
    </ul>
  );
}
