"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { HudCorners } from "@/shared/components/ui/HudCorners";
import { cn } from "@/shared/lib/cn";

import { screenshotSize, screenshotSrc, type Screenshot } from "../data";

type ScreenshotGalleryProps = {
  slug: string;
  title: string;
  screenshots: readonly Screenshot[];
};

/** A lab "monitor" showing one screen at a time, thumbnails to switch, and a fullscreen viewer. */
export function ScreenshotGallery({ slug, title, screenshots }: ScreenshotGalleryProps) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const count = screenshots.length;
  const current = screenshots[active];
  // The frame keeps the first screenshot's proportions so it doesn't jump between shots.
  const frame = screenshotSize(screenshots[0]);
  const frameRatio = `${frame.width} / ${frame.height}`;

  const step = useCallback(
    (delta: number) => setActive((index) => (index + delta + count) % count),
    [count],
  );

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fullscreen, step]);

  return (
    <div>
      {/* Monitor */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-2xl shadow-black/50">
        <HudCorners className="m-2" />
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-camel/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-cream/30" />
          </div>
          <p className="truncate font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
            <span className="text-camel">
              {String(active + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
            </span>{" "}
            · {current.caption}
          </p>
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            aria-label="View screenshot fullscreen"
            className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="group relative" style={{ aspectRatio: frameRatio }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.button
              key={current.file}
              type="button"
              onClick={() => setFullscreen(true)}
              aria-label={`Open "${current.caption}" fullscreen`}
              className="absolute inset-0 cursor-zoom-in"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={screenshotSrc(slug, current)}
                alt={`${title}: ${current.caption}`}
                fill
                sizes="(min-width: 1152px) 1100px, 100vw"
                className="object-cover object-top"
                priority={active === 0}
              />
            </motion.button>
          </AnimatePresence>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous screenshot"
                className="absolute top-1/2 left-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/70 text-cream opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next screenshot"
                className="absolute top-1/2 right-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/70 text-cream opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <ul className="mt-4 flex gap-3 overflow-x-auto pb-2" aria-label="Screenshots">
          {screenshots.map((shot, index) => (
            <li key={shot.file} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${shot.caption}`}
                aria-current={index === active}
                className={cn(
                  "relative block w-32 overflow-hidden rounded-lg border transition-all sm:w-40",
                  index === active
                    ? "border-rose shadow-[0_0_0_3px] shadow-rose/20"
                    : "border-line opacity-60 hover:opacity-100",
                )}
                style={{ aspectRatio: frameRatio }}
              >
                <Image
                  src={screenshotSrc(slug, shot)}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover object-top"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshots`}
            className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreen(false)}
          >
            <div className="flex items-center justify-between px-4 py-4 sm:px-8">
              <p className="font-mono text-[11px] tracking-[0.25em] text-muted uppercase">
                <span className="text-camel">
                  {active + 1}/{count}
                </span>{" "}
                · {current.caption}
              </p>
              <button
                type="button"
                onClick={() => setFullscreen(false)}
                aria-label="Close fullscreen"
                autoFocus
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-cream hover:bg-cream/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16">
              <Image
                key={current.file}
                src={screenshotSrc(slug, current)}
                alt={`${title}: ${current.caption}`}
                {...screenshotSize(current)}
                sizes="100vw"
                className="max-h-full w-auto rounded-xl border border-line object-contain shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              />
              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      step(-1);
                    }}
                    aria-label="Previous screenshot"
                    className="absolute left-2 grid h-12 w-12 place-items-center rounded-full border border-line bg-ink/70 text-cream hover:bg-cream/10 sm:left-4"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      step(1);
                    }}
                    aria-label="Next screenshot"
                    className="absolute right-2 grid h-12 w-12 place-items-center rounded-full border border-line bg-ink/70 text-cream hover:bg-cream/10 sm:right-4"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
