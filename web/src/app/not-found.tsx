import { ArrowLeft } from "lucide-react";

import { Container } from "@/shared/components/ui/Container";
import { MagneticButton } from "@/shared/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <Container className="grid min-h-[80svh] place-items-center pt-32 text-center">
      <div>
        <p className="text-gradient font-display text-[clamp(7rem,25vw,16rem)] leading-none">404</p>
        <h1 className="mt-4 font-display text-4xl">This page wandered off.</h1>
        <p className="mt-3 text-muted">The link may be broken, or the page may have moved.</p>
        <div className="mt-10">
          <MagneticButton href="/">
            <ArrowLeft className="h-4 w-4" /> Back home
          </MagneticButton>
        </div>
      </div>
    </Container>
  );
}
