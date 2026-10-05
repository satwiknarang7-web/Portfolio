import { HandNote, ScribbleUnderline } from "./Doodles";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

type PageHeaderProps = {
  /** Two-digit chapter number, e.g. "02". */
  module: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** A handwritten aside pencilled beside the title. */
  note?: string;
};

export function PageHeader({ module, eyebrow, title, description, note }: PageHeaderProps) {
  return (
    <header className="relative pt-40 pb-16 sm:pt-44">
      <Reveal className="flex items-end gap-5">
        <span aria-hidden className="text-outline font-display text-7xl leading-none sm:text-8xl">
          {module}
        </span>
        <p className="pb-3 font-mono text-xs tracking-[0.3em] text-camel uppercase">{eyebrow}</p>
      </Reveal>

      <div className="relative mt-8 inline-block max-w-5xl">
        <h1 className="font-display text-6xl leading-[0.95] tracking-tight sm:text-8xl">
          <SplitText text={title} delay={0.1} />
        </h1>
        <ScribbleUnderline className="mt-3 w-2/3 max-w-md" />
      </div>

      {note && (
        <Reveal delay={0.9} className="mt-6 sm:absolute sm:top-48 sm:right-0 sm:mt-0">
          <HandNote rotate={-6} className="text-3xl">
            {note}
          </HandNote>
        </Reveal>
      )}

      {description && (
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
        </Reveal>
      )}
    </header>
  );
}
