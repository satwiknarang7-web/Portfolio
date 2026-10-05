import { Portrait } from "@/shared/components/ui/Portrait";
import { Reveal } from "@/shared/components/ui/Reveal";

import { bio, stats } from "../data";

export function Bio() {
  return (
    <section className="grid items-start gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <Reveal className="mx-auto w-full max-w-sm lg:sticky lg:top-32">
        <Portrait />
      </Reveal>

      <div>
        {bio.map((paragraph, index) => (
          <Reveal key={paragraph} delay={index * 0.1}>
            <p
              className={
                index === 0
                  ? "font-display text-3xl leading-snug sm:text-4xl"
                  : "mt-8 text-lg leading-relaxed text-muted"
              }
            >
              {paragraph}
            </p>
          </Reveal>
        ))}

        <dl className="mt-14 grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={0.1 * index} className="glass rounded-2xl p-5 sm:p-6">
              <dt className="text-xs tracking-wider text-muted uppercase">{stat.label}</dt>
              <dd className="text-gradient mt-2 font-display text-4xl sm:text-5xl">{stat.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
