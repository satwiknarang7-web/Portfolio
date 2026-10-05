import { ArrowDown, ArrowRight } from "lucide-react";

import { HandArrow, HandNote, Marker } from "@/shared/components/ui/Doodles";
import { MagneticButton } from "@/shared/components/ui/MagneticButton";
import { Reveal } from "@/shared/components/ui/Reveal";
import { SplitText } from "@/shared/components/ui/SplitText";
import { siteConfig } from "@/shared/config/site";

import { HeroPortrait } from "./HeroPortrait";

const facts = [
  { label: "what I do", value: "Engineering × Business" },
  { label: "based in", value: siteConfig.location },
  { label: "right now", value: "Building @ SegueIT" },
] as const;

export function Hero() {
  const [firstName, ...rest] = siteConfig.name.split(" ");

  return (
    <section className="relative grid min-h-svh items-center gap-14 pt-28 pb-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
      <div className="relative">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-2/70 px-4 py-1.5 text-sm text-cream/80 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to new opportunities
          </p>
        </Reveal>

        <h1 className="mt-10 font-display text-[clamp(3.5rem,8.5vw,8rem)] leading-[0.88] tracking-tight">
          <SplitText text={`Hi, I'm ${firstName}`} delay={0.1} />
          <br />
          <span className="text-gradient italic">
            <SplitText text={rest.join(" ") || siteConfig.role} delay={0.35} />
          </span>
        </h1>

        {/* Margin note pointing across to the photo */}
        <div className="pointer-events-none absolute top-[15.5rem] right-2 hidden items-end gap-1 text-camel xl:flex">
          <HandNote rotate={-8}>that&apos;s me</HandNote>
          <HandArrow className="h-12 w-24 translate-y-3" delay={1.2} />
        </div>

        <Reveal delay={0.5}>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-cream/75">
            An AI-native engineer who lives right at the bridge of{" "}
            <Marker delay={1}>engineering</Marker> and <Marker delay={1.25}>business</Marker>. I
            build full-stack products, the dashboards that measure them and the designs that sell
            them.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <dl className="mt-9 grid max-w-xl grid-cols-3 gap-4">
            {facts.map((fact) => (
              <div key={fact.label} className="border-l border-camel/40 pl-3">
                <dt className="font-hand text-xl leading-none text-camel">{fact.label}</dt>
                <dd className="mt-1.5 text-sm text-cream">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.7} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="/projects">
            See my work <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="/contact" variant="ghost">
            Get in touch
          </MagneticButton>
        </Reveal>
      </div>

      <Reveal delay={0.2} y={40} className="w-full">
        <HeroPortrait />
      </Reveal>

      <a
        href="#highlights"
        aria-label="Scroll to highlights"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-cream lg:flex"
      >
        <span className="font-hand text-lg">scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
