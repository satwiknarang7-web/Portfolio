/**
 * Fixed backdrop: drifting glow, blueprint grid, scanlines, a slow sweep and
 * brackets framing the viewport. Every moving layer animates `transform` only
 * and the glows are radial gradients rather than blur filters, so the browser
 * can composite them on the GPU without repainting.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-1/3 -left-1/3 h-[90vmax] w-[90vmax] animate-aurora will-change-transform"
        style={{
          background: "radial-gradient(circle, rgb(155 34 66 / 0.28), transparent 60%)",
        }}
      />
      <div
        className="absolute -right-1/3 -bottom-1/2 h-[80vmax] w-[80vmax] animate-aurora will-change-transform"
        style={{
          animationDelay: "-9s",
          background: "radial-gradient(circle, rgb(208 161 115 / 0.14), transparent 60%)",
        }}
      />

      {/* Blueprint grid: fine cells with heavier major lines */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: [
            "linear-gradient(var(--color-cream) 1px, transparent 1px)",
            "linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)",
            "linear-gradient(rgb(242 232 220 / 0.35) 1px, transparent 1px)",
            "linear-gradient(90deg, rgb(242 232 220 / 0.35) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "160px 160px, 160px 160px, 32px 32px, 32px 32px",
          maskImage: "radial-gradient(ellipse at center, black 15%, transparent 75%)",
        }}
      />

      <div className="scanlines absolute inset-0 opacity-40" />
      <div className="absolute inset-x-0 top-0 h-40 animate-sweep bg-gradient-to-b from-transparent via-rose/[0.05] to-transparent will-change-transform" />
      <div className="grain absolute inset-0 opacity-[0.04]" />

      {/* Viewport HUD brackets */}
      <div className="absolute inset-4 hidden lg:block">
        <span className="absolute top-20 left-0 h-6 w-6 border-t border-l border-camel/30" />
        <span className="absolute top-20 right-0 h-6 w-6 border-t border-r border-camel/30" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-camel/30" />
        <span className="absolute right-0 bottom-0 h-6 w-6 border-r border-b border-camel/30" />
      </div>
    </div>
  );
}
