import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/shared/components/ui/Reveal";
import { SplitText } from "@/shared/components/ui/SplitText";

import { getNextProject, type Project } from "../data";
import { ProjectArt } from "./ProjectArt";
import { ScreenshotGallery } from "./ScreenshotGallery";

export function ProjectDetail({ project }: { project: Project }) {
  const next = getNextProject(project.slug);

  return (
    <article className="pt-36">
      <Reveal>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cream"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All projects
        </Link>
      </Reveal>

      <header className="mt-10">
        <p className="text-xs tracking-[0.35em] text-camel uppercase">
          {project.category}
          {project.year && ` · ${project.year}`}
          {project.company && ` · Built at ${project.company}`}
        </p>
        <h1 className="mt-5 font-display text-6xl leading-[0.95] sm:text-8xl">
          <SplitText text={project.title} />
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-xl text-muted">{project.tagline}</p>
        </Reveal>
      </header>

      <Reveal delay={0.3} className="group mt-14">
        {project.screenshots?.length ? (
          <ScreenshotGallery
            slug={project.slug}
            title={project.title}
            screenshots={project.screenshots}
          />
        ) : (
          <ProjectArt
            monogram={project.monogram ?? project.title.charAt(0)}
            accent={project.accent}
            className="h-72 rounded-2xl sm:h-96"
          />
        )}
      </Reveal>

      <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Reveal>
          <h2 className="font-display text-4xl">Overview</h2>
          <p className="mt-5 text-lg leading-relaxed text-cream/80">{project.description}</p>
          <h2 className="mt-12 font-display text-4xl">Highlights</h2>
          <ul className="mt-5 space-y-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-lg text-cream/80">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                {highlight}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="glass h-fit space-y-8 rounded-2xl p-8">
          <div>
            <h2 className="text-xs tracking-[0.25em] text-muted uppercase">Stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-line px-3 py-1.5 text-sm">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          {project.links && (
            <div className="flex flex-col gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-camel hover:underline"
                >
                  Live site <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.links.source && (
                <a
                  href={project.links.source}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-camel hover:underline"
                >
                  Source code <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </Reveal>
      </div>

      <Reveal className="mt-28 border-t border-line pt-10">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-center justify-between gap-6"
        >
          <div>
            <p className="text-xs tracking-[0.3em] text-muted uppercase">Next project</p>
            <p className="mt-3 font-display text-5xl transition-colors group-hover:text-camel sm:text-6xl">
              {next.title}
            </p>
          </div>
          <ArrowRight className="h-10 w-10 shrink-0 text-camel transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </Reveal>
    </article>
  );
}
