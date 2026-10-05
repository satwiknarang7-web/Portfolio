import { marqueeItems } from "@/features/about";
import { Explore, Hero } from "@/features/home";
import { FeaturedProjects } from "@/features/projects";
import { Container } from "@/shared/components/ui/Container";
import { Marquee } from "@/shared/components/ui/Marquee";

export default function HomePage() {
  return (
    <>
      <Container>
        <Hero />
      </Container>
      <div id="highlights" className="scroll-mt-24">
        <Marquee items={marqueeItems} />
      </div>
      <Container>
        <FeaturedProjects />
        <Explore />
      </Container>
    </>
  );
}
