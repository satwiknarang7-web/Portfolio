"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/shared/lib/cn";

import type { Project, ProjectCategory } from "../data";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | ProjectCategory;

type ProjectExplorerProps = {
  projects: readonly Project[];
  categories: readonly ProjectCategory[];
};

/** Filterable, animated project grid. */
export function ProjectExplorer({ projects, categories }: ProjectExplorerProps) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...categories];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {filters.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
            className={cn(
              "relative rounded-full px-5 py-2 text-sm transition-colors",
              filter === option ? "text-ink" : "text-muted hover:text-cream",
            )}
          >
            {filter === option && (
              <motion.span
                layoutId="project-filter"
                className="absolute inset-0 -z-10 rounded-full bg-cream"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {option}
          </button>
        ))}
      </div>

      <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
