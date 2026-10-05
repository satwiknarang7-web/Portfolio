import { Reveal } from "@/shared/components/ui/Reveal";
import { SpotlightCard } from "@/shared/components/ui/SpotlightCard";

import { principles } from "../data";

export function Principles() {
  return (
    <section aria-labelledby="principles-heading" className="mt-32">
      <Reveal>
        <h2 id="principles-heading" className="font-display text-5xl sm:text-6xl">
          How I work
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {principles.map((principle, index) => (
          <Reveal key={principle.title} delay={index * 0.1}>
            <SpotlightCard className="h-full p-8">
              <span className="font-mono text-sm text-camel">0{index + 1}</span>
              <h3 className="mt-6 font-display text-3xl">{principle.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{principle.description}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
