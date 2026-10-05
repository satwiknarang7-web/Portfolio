import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/shared/components/ui/Reveal";

import { getFeaturedProjects } from "../data";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section aria-labelledby="featured-heading" className="mt-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs tracking-[0.35em] text-camel uppercase">Selected work</p>
          <h2 id="featured-heading" className="mt-4 font-display text-5xl sm:text-7xl">
            Featured projects
          </h2>
        </div>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cream"
        >
          View all projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
