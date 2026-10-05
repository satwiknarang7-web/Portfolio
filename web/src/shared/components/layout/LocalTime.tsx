"use client";

import { useEffect, useState } from "react";

import { siteConfig } from "@/shared/config/site";

/** "Noida · 15:14" in the owner's own timezone, so visitors know when they'd catch him. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: siteConfig.timeZone,
      });
    const update = () => setTime(format());
    const first = window.setTimeout(update, 0);
    const timer = window.setInterval(update, 15_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);

  const city = siteConfig.location.split(",")[0];

  return (
    <p className="hidden items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-muted uppercase lg:flex">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
      {city}
      <span className="text-cream tabular-nums">{time ?? "--:--"}</span>
    </p>
  );
}
