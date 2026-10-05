import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/shared/components/ui/Reveal";
import { SpotlightCard } from "@/shared/components/ui/SpotlightCard";

const destinations = [
  { href: "/about", title: "About", blurb: "Who I am, how I work and the tools I reach for." },
  { href: "/skills", title: "Skills", blurb: "Every skill, big and small — plus my AI toolkit." },
  { href: "/hobbies", title: "Hobbies", blurb: "What keeps me curious outside of code." },
  { href: "/contact", title: "Contact", blurb: "Got an idea or a role? Let's talk." },
] as const;

/** Grid of large tiles linking to every section of the site. */
export function Explore() {
  return (
    <section aria-labelledby="explore-heading" className="mt-32">
      <Reveal>
        <h2 id="explore-heading" className="font-display text-5xl sm:text-7xl">
          Explore
        </h2>
      </Reveal>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2">
        {destinations.map((item, index) => (
          <Reveal as="li" key={item.href} delay={index * 0.08}>
            <SpotlightCard className="h-full">
              <Link
                href={item.href}
                className="flex h-full items-end justify-between gap-6 p-8 sm:p-10"
              >
                <div>
                  <span className="font-mono text-xs text-camel">0{index + 1}</span>
                  <h3 className="mt-10 font-display text-5xl">{item.title}</h3>
                  <p className="mt-2 text-muted">{item.blurb}</p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-camel group-hover:bg-camel group-hover:text-ink">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            </SpotlightCard>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
