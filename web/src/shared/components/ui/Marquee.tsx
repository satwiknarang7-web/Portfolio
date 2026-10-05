type MarqueeProps = {
  items: readonly string[];
};

/** Infinite horizontal ticker. The list is rendered twice so the loop is seamless. */
export function Marquee({ items }: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div
      className="relative flex overflow-hidden border-y border-line py-6"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <ul className="flex w-max shrink-0 animate-marquee gap-12 pr-12 hover:[animation-play-state:paused]">
        {loop.map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="flex items-center gap-12 font-display text-3xl whitespace-nowrap text-cream/80 sm:text-4xl"
          >
            {item}
            <span className="text-xl text-rose">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
