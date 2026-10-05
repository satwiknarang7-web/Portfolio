import Image from "next/image";

import { siteConfig } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";
import { hasPortrait } from "@/shared/lib/portrait";

import { HudCorners } from "./HudCorners";

type PortraitProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/** The owner's photo with a rotating gradient ring; falls back to a monogram if the file is absent. */
export function Portrait({
  className,
  priority = false,
  sizes = "(min-width: 1024px) 420px, 80vw",
}: PortraitProps) {
  return (
    <div className={cn("relative aspect-[4/5] w-full", className)}>
      <div aria-hidden className="absolute -inset-[2px] overflow-hidden rounded-[1.35rem]">
        <div className="absolute -inset-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,var(--color-wine),var(--color-camel),var(--color-rose),var(--color-wine))]" />
      </div>
      <div className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-ink-3">
        {hasPortrait() ? (
          <Image
            src={siteConfig.portrait}
            alt={`Portrait of ${siteConfig.name}`}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-top transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-wine/40 via-ink-3 to-camel/30">
            <span className="font-display text-8xl text-cream/80">{siteConfig.initials}</span>
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
        />
        {/* Biometric scan overlay */}
        <div aria-hidden className="scanlines absolute inset-0 opacity-30" />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-full animate-scan will-change-transform"
        >
          <div className="h-0.5 bg-rose shadow-[0_0_18px_4px] shadow-rose/60" />
        </div>
        <HudCorners size="h-6 w-6" className="m-4 border-cream/70" />
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between font-mono text-[10px] tracking-[0.25em] uppercase">
          <p className="font-hand text-3xl tracking-normal text-cream normal-case">
            yep, that&apos;s me
          </p>
        </div>
      </div>
    </div>
  );
}
