"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  BarChart3,
  Brain,
  Briefcase,
  Cloud,
  Code2,
  Database,
  FlaskConical,
  LayoutTemplate,
  Palette,
  Search,
  Server,
  ShieldCheck,
  Sigma,
  Star,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import { HandNote } from "@/shared/components/ui/Doodles";
import { SpotlightCard } from "@/shared/components/ui/SpotlightCard";
import { cn } from "@/shared/lib/cn";

import type { SkillCategory, SkillIcon } from "../data";

const icons: Record<SkillIcon, LucideIcon> = {
  code: Code2,
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  chart: BarChart3,
  brain: Brain,
  cloud: Cloud,
  shield: ShieldCheck,
  flask: FlaskConical,
  palette: Palette,
  briefcase: Briefcase,
  sigma: Sigma,
};

/** Every skill by category, with a search box and a "core only" filter. */
export function SkillMatrix({ categories }: { categories: readonly SkillCategory[] }) {
  const [query, setQuery] = useState("");
  const [coreOnly, setCoreOnly] = useState(false);

  const total = useMemo(
    () => categories.reduce((sum, category) => sum + category.skills.length, 0),
    [categories],
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        skills: category.skills.filter(
          (skill) =>
            (!coreOnly || skill.core) &&
            (!needle ||
              skill.name.toLowerCase().includes(needle) ||
              category.title.toLowerCase().includes(needle)),
        ),
      }))
      .filter((category) => category.skills.length > 0);
  }, [categories, coreOnly, query]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative block">
            <span className="sr-only">Search skills</span>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a skill — try “SQL”"
              className="w-72 rounded-full border border-line bg-ink-2/70 py-2.5 pr-4 pl-10 text-sm text-cream placeholder:text-muted/60 focus:border-camel/60 focus:outline-none"
            />
          </label>
          <button
            type="button"
            aria-pressed={coreOnly}
            onClick={() => setCoreOnly((value) => !value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors",
              coreOnly
                ? "border-camel bg-camel text-ink"
                : "border-line text-muted hover:border-camel/60 hover:text-cream",
            )}
          >
            <Star className="h-3.5 w-3.5" fill={coreOnly ? "currentColor" : "none"} />
            Daily drivers only
          </button>
        </div>
        <HandNote rotate={-3} className="text-2xl">
          {total} skills across {categories.length} categories
        </HandNote>
      </div>

      {/* Categories */}
      <motion.ul layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((category, index) => {
            const Icon = icons[category.icon];
            return (
              <motion.li
                key={category.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
              >
                <SpotlightCard className="h-full p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-wine to-camel shadow-lg shadow-wine/30 transition-transform duration-500 group-hover:-rotate-6">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {String(category.skills.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-3xl">{category.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{category.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs",
                          skill.core
                            ? "bg-camel/90 font-medium text-ink"
                            : "border border-line text-cream/75",
                        )}
                      >
                        {skill.core && <Star className="h-3 w-3" fill="currentColor" />}
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="mt-10 text-center font-hand text-3xl text-camel">
          nothing for “{query}” yet — but give me a week
        </p>
      )}
    </div>
  );
}
