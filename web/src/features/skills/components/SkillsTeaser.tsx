import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { HandNote } from "@/shared/components/ui/Doodles";
import { Reveal } from "@/shared/components/ui/Reveal";
import { SpotlightCard } from "@/shared/components/ui/SpotlightCard";

import { aiToolkit, skillCategories } from "../data";

/** A compact preview of the Skills page: the core skills, and a link to everything. */
export function SkillsTeaser() {
  const coreSkills = skillCategories.flatMap((category) =>
    category.skills.filter((skill) => skill.core).map((skill) => skill.name),
  );
  const total = skillCategories.reduce((sum, category) => sum + category.skills.length, 0);
  const tools = aiToolkit.reduce((sum, group) => sum + group.tools.length, 0);

  return (
    <section aria-labelledby="skills-teaser-heading" className="mt-32">
      <Reveal>
        <SpotlightCard>
          <Link href="/skills" className="block p-8 sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="skills-teaser-heading" className="font-display text-5xl sm:text-6xl">
                Toolkit
              </h2>
              <HandNote rotate={-4}>
                {total} skills + {tools} AI tools →
              </HandNote>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {[...new Set(coreSkills)].map((name) => (
                <li
                  key={name}
                  className="rounded-full bg-camel/90 px-3 py-1 text-xs font-medium text-ink"
                >
                  {name}
                </li>
              ))}
            </ul>
            <p className="mt-8 inline-flex items-center gap-2 text-sm text-camel">
              See every skill and the full AI toolkit
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </p>
          </Link>
        </SpotlightCard>
      </Reveal>
    </section>
  );
}
