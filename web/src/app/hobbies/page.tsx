import type { Metadata } from "next";

import { CurrentlyInto, HobbyGrid, hobbies } from "@/features/hobbies";
import { Container } from "@/shared/components/ui/Container";
import { PageHeader } from "@/shared/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Hobbies & Interests",
  description: "What I get up to when I'm away from the keyboard (and sometimes when I'm not).",
};

export default function HobbiesPage() {
  return (
    <Container>
      <PageHeader
        note="yes, all nine of them"
        module="05"
        eyebrow="Hobbies & interests"
        title="Life beyond the terminal."
        description="Nine sports, a design canvas and an AI toolkit — the things that keep me competitive, curious and creative."
      />
      <HobbyGrid hobbies={hobbies} />
      <CurrentlyInto />
    </Container>
  );
}
