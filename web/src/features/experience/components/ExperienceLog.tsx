import { Briefcase, MapPin, Rocket } from "lucide-react";

import { Reveal } from "@/shared/components/ui/Reveal";
import { SpotlightCard } from "@/shared/components/ui/SpotlightCard";

import { careerNote, type Role } from "../data";
import { CompanyMark } from "./CompanyMark";

/** Career history, newest first. */
export function ExperienceLog({ roles }: { roles: readonly Role[] }) {
  return (
    <section aria-labelledby="experience-heading" className="mt-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="experience-heading" className="font-display text-5xl sm:text-6xl">
          Experience
        </h2>
        <p className="font-hand text-2xl text-camel">{roles.length} chapters so far</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mt-10 flex gap-5 overflow-hidden rounded-2xl border border-rose/30 bg-gradient-to-r from-wine/25 via-ink-2/60 to-ink-2/30 p-6 sm:p-8">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-wine to-rose shadow-lg shadow-rose/30">
            <Rocket className="h-5 w-5" />
          </span>
          <div>
            <p className="font-hand text-2xl text-camel">why startups?</p>
            <p className="mt-3 font-display text-2xl leading-snug sm:text-3xl">{careerNote}</p>
          </div>
        </div>
      </Reveal>

      <ol className="mt-8 space-y-6">
        {roles.map((role, index) => (
          <Reveal as="li" key={`${role.company}-${role.period}`} delay={index * 0.08}>
            <SpotlightCard className="p-7 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.2em] uppercase">
                <p className="flex items-center gap-2 text-camel">
                  <Briefcase className="h-3.5 w-3.5" />
                  {role.period}
                </p>
                <div className="flex items-center gap-4">
                  {role.startup && (
                    <p className="flex items-center gap-1.5 rounded-sm border border-rose/40 bg-rose/10 px-2 py-0.5 text-rose">
                      <Rocket className="h-3 w-3" />
                      Startup
                    </p>
                  )}
                  {role.current ? (
                    <p className="flex items-center gap-2 text-emerald-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Right now
                    </p>
                  ) : (
                    <p className="text-muted">Wrapped up</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-5">
                <CompanyMark role={role} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-display text-4xl sm:text-5xl">{role.company}</h3>
                    {role.location && (
                      <p className="flex items-center gap-1.5 text-sm text-muted">
                        <MapPin className="h-3.5 w-3.5" /> {role.location}
                      </p>
                    )}
                  </div>
                  <p className="mt-1 text-lg text-cream/80">{role.title}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-muted">
                {role.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 leading-relaxed">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-rose" />
                    {achievement}
                  </li>
                ))}
              </ul>

              {role.stack && role.stack.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-cream/5 px-3 py-1 text-xs text-cream/70"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
