import type { Metadata } from "next";

import { ProjectExplorer, projectCategories, projects } from "@/features/projects";
import { Container } from "@/shared/components/ui/Container";
import { PageHeader } from "@/shared/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of things I've designed and built.",
};

export default function ProjectsPage() {
  return (
    <Container>
      <PageHeader
        note="every screen here is real ↓"
        module="04"
        eyebrow="Projects"
        title="Things I've built."
        description="From AI tooling to data platforms and web apps — a selection of projects I'm proud of."
      />
      <ProjectExplorer projects={projects} categories={projectCategories} />
    </Container>
  );
}
