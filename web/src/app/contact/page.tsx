import type { Metadata } from "next";

import { ContactDetails, ContactForm } from "@/features/contact";
import { Container } from "@/shared/components/ui/Container";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { Reveal } from "@/shared/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about roles, collaborations or ideas.",
};

export default function ContactPage() {
  return (
    <Container>
      <PageHeader
        note="my inbox is open ✉"
        module="06"
        eyebrow="Contact"
        title="Let's build something great."
      />
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <ContactDetails />
        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </Container>
  );
}
