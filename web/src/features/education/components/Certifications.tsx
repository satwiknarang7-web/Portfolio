import { Award } from "lucide-react";

import { Reveal } from "@/shared/components/ui/Reveal";

import type { Certification } from "../data";

export function Certifications({ items }: { items: readonly Certification[] }) {
  return (
    <section aria-labelledby="certs-heading" className="mt-32">
      <Reveal>
        <h2 id="certs-heading" className="font-display text-5xl sm:text-6xl">
          Certifications
        </h2>
      </Reveal>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((cert, index) => (
          <Reveal
            as="li"
            key={cert.title}
            delay={index * 0.08}
            className="glass flex h-full items-start gap-4 rounded-2xl p-6"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-wine to-camel">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-medium">{cert.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {cert.issuer}
                {cert.year && ` · ${cert.year}`}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
