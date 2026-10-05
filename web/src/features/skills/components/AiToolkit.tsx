import { HandArrow, HandNote } from "@/shared/components/ui/Doodles";
import { Reveal } from "@/shared/components/ui/Reveal";
import { SpotlightCard } from "@/shared/components/ui/SpotlightCard";
import { cn } from "@/shared/lib/cn";

import type { AiToolGroup } from "../data";

/** Two-letter badge drawn from a tool's name, standing in for its logo. */
function ToolMark({ name, core }: { name: string; core?: boolean }) {
  const words = name.split(/\s+/);
  // Acronyms keep their letters ("MCP"); multi-word names use initials; single words their first two.
  const letters = /^[A-Z0-9]{2,4}$/.test(words[0])
    ? words[0]
    : words.length > 1
      ? words
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
      : name.slice(0, 2);
  return (
    <span
      aria-hidden
      className={cn(
        "grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-xl",
        core
          ? "bg-gradient-to-br from-rose to-camel text-ink"
          : "border border-line bg-ink/60 text-cream/80",
      )}
    >
      {letters}
    </span>
  );
}

/** The AI tools used day to day, grouped by the job they do. */
export function AiToolkit({ groups }: { groups: readonly AiToolGroup[] }) {
  const count = groups.reduce((sum, group) => sum + group.tools.length, 0);

  return (
    <section aria-labelledby="ai-toolkit-heading" className="mt-36">
      <Reveal className="relative flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-camel uppercase">
            {count} tools · {groups.length} jobs
          </p>
          <h2 id="ai-toolkit-heading" className="mt-4 font-display text-6xl sm:text-7xl">
            My AI <span className="text-gradient italic">toolkit</span>
          </h2>
        </div>
        <div className="flex items-end gap-1 text-camel">
          <HandNote rotate={-5} className="text-3xl">
            the stack behind the speed
          </HandNote>
          <HandArrow className="h-12 w-20 rotate-90" delay={0.6} />
        </div>
      </Reveal>

      <div className="mt-12 space-y-12">
        {groups.map((group) => (
          <div key={group.title}>
            <Reveal className="flex items-center gap-4">
              <h3 className="font-hand text-3xl text-cream">{group.title}</h3>
              <span className="h-px flex-1 bg-line" />
            </Reveal>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.tools.map((tool, index) => (
                <Reveal as="li" key={tool.name} delay={index * 0.05}>
                  <SpotlightCard className="h-full p-5">
                    <div className="flex items-start gap-4">
                      <ToolMark name={tool.name} core={tool.core} />
                      <div className={cn("min-w-0", tool.core && "pr-12")}>
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <p className="font-display text-2xl leading-tight">{tool.name}</p>
                          <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                            {tool.maker}
                          </p>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-cream/70">{tool.use}</p>
                      </div>
                    </div>
                    {tool.core && (
                      <span className="absolute -top-1 right-3 rotate-6 rounded-full bg-rose px-2.5 py-0.5 font-hand text-base leading-tight text-ink">
                        daily
                      </span>
                    )}
                  </SpotlightCard>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
