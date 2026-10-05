import { Reveal } from "@/shared/components/ui/Reveal";

import { currentlyInto } from "../data";

export function CurrentlyInto() {
  return (
    <section aria-labelledby="now-heading" className="mt-32">
      <Reveal>
        <h2 id="now-heading" className="flex items-center gap-4 font-display text-5xl sm:text-6xl">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-rose" />
          </span>
          Right now
        </h2>
      </Reveal>
      <dl className="mt-12 divide-y divide-line border-y border-line">
        {currentlyInto.map((item, index) => (
          <Reveal
            key={item.label}
            delay={index * 0.08}
            className="grid gap-2 py-7 sm:grid-cols-[200px_1fr]"
          >
            <dt className="text-sm tracking-[0.25em] text-camel uppercase">{item.label}</dt>
            <dd className="font-display text-3xl">{item.value}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
