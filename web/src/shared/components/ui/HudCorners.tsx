import { cn } from "@/shared/lib/cn";

const corners = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
];

/** Sci-fi targeting brackets in each corner of the nearest positioned parent. */
export function HudCorners({ className, size = "h-3 w-3" }: { className?: string; size?: string }) {
  return (
    <>
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden
          className={cn(
            "pointer-events-none absolute z-10 border-camel/70",
            size,
            position,
            className,
          )}
        />
      ))}
    </>
  );
}
