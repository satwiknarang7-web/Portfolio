import type { Metadata } from "next";

import { Bio, Principles } from "@/features/about";
import { ExperienceLog, roles } from "@/features/experience";
import { SkillsTeaser } from "@/features/skills";
import { Container } from "@/shared/components/ui/Container";
import { PageHeader } from "@/shared/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, where I've worked, how I work and the tools I use.",
};

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        note="the short version: I like building things"
        module="01"
        eyebrow="About me"
        title="Curious by nature, builder by habit."
        description="A little about the person behind the projects."
      />
      <Bio />
      <ExperienceLog roles={roles} />
      <Principles />
      <SkillsTeaser />
    </Container>
  );
}
