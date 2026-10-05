import type { Metadata } from "next";

import { Certifications, Timeline, certifications, education } from "@/features/education";
import { Container } from "@/shared/components/ui/Container";
import { PageHeader } from "@/shared/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Education",
  description: "Academic background, coursework and certifications.",
};

export default function EducationPage() {
  return (
    <Container>
      <PageHeader
        note="maths & physics did the heavy lifting"
        module="03"
        eyebrow="Education"
        title="Always learning."
        description="Where I studied computer science, and the certifications I have picked up since."
      />
      <Timeline entries={education} />
      <Certifications items={certifications} />
    </Container>
  );
}
