import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SpotlightCard } from "@/shared/components/ui/SpotlightCard";

import type { Project } from "../data";
import { ProjectCover } from "./ProjectCover";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard tilt className="h-full">
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
        <ProjectCover project={project} className="h-52 rounded-t-2xl" />
        <div className="flex flex-1 flex-col p-7">
          <div className="flex items-center justify-between text-xs tracking-[0.2em] text-muted uppercase">
            <span>
              {project.category}
              {project.company && <span className="text-camel"> · {project.company}</span>}
            </span>
            {project.year && <span className="font-mono">{project.year}</span>}
          </div>
          <h3 className="mt-4 flex items-start justify-between gap-4 font-display text-3xl">
            {project.title}
            <ArrowUpRight className="mt-1 h-6 w-6 shrink-0 text-camel transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </h3>
          <p className="mt-3 flex-1 leading-relaxed text-muted">{project.tagline}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tech) => (
              <li key={tech} className="rounded-full bg-cream/5 px-3 py-1 text-xs text-cream/70">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </SpotlightCard>
  );
}
