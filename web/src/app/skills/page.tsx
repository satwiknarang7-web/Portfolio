import type { Metadata } from "next";

import { AiToolkit, SkillMatrix, aiToolkit, skillCategories } from "@/features/skills";
import { Container } from "@/shared/components/ui/Container";
import { PageHeader } from "@/shared/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Every skill — engineering, data, AI, business and design — plus the AI toolkit I use every day.",
};

export default function SkillsPage() {
  return (
    <Container>
      <PageHeader
        module="02"
        eyebrow="Skills"
        title="Everything in the toolbox."
        note="the starred ones I use every day"
        description="Engineering, data, AI, business and design — the big skills and the small ones that quietly make the difference."
      />
      <SkillMatrix categories={skillCategories} />
      <AiToolkit groups={aiToolkit} />
    </Container>
  );
}
