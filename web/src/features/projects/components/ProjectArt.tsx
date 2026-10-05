import { cn } from "@/shared/lib/cn";

/** Generative cover art for a project: gradient field, orbit rings and a giant monogram. */
export function ProjectArt({
  monogram,
  accent,
  className,
}: {
  monogram: string;
  accent: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden bg-gradient-to-br", accent, className)}
    >
      <div className="grain absolute inset-0 opacity-10" />
      <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full border border-cream/20 transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute -right-4 -bottom-4 h-40 w-40 rounded-full border border-cream/30 transition-transform duration-700 group-hover:scale-110" />
      <span className="absolute bottom-2 left-6 font-display text-[9rem] leading-none text-cream/15 transition-transform duration-700 group-hover:-translate-y-2">
        {monogram}
      </span>
    </div>
  );
}
