import Image from "next/image";

import { cn } from "@/shared/lib/cn";

import { screenshotSrc, type Project } from "../data";
import { ProjectArt } from "./ProjectArt";

type ProjectCoverProps = {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * A project's cover: its first real screenshot framed like a lab monitor feed,
 * or the generative artwork when no screenshots exist.
 */
export function ProjectCover({
  project,
  className,
  sizes = "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw",
  priority = false,
}: ProjectCoverProps) {
  const cover = project.screenshots?.[0];

  if (!cover) {
    return (
      <ProjectArt
        monogram={project.monogram ?? project.title.charAt(0)}
        accent={project.accent}
        className={className}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-ink-3", className)}>
      <Image
        src={screenshotSrc(project.slug, cover)}
        alt={`${project.title}: ${cover.caption}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
      />
      {/* Monitor treatment: tint, scanlines, a fade into the card and a live-feed tag. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink/10 to-wine/10"
      />
      <div aria-hidden className="scanlines absolute inset-0 opacity-25" />
      <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-sm border border-cream/15 bg-ink/70 px-2 py-1 font-mono text-[9px] tracking-[0.25em] text-cream/80 uppercase backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose" />
        Real screens
      </span>
    </div>
  );
}
