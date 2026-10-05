import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail, getProjectBySlug, projects } from "@/features/projects";
import { Container } from "@/shared/components/ui/Container";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <Container>
      <ProjectDetail project={project} />
    </Container>
  );
}
