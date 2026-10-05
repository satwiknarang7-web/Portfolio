import { ArrowUpRight, Mail, MapPin, Radio, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { HudCorners } from "@/shared/components/ui/HudCorners";
import { Reveal } from "@/shared/components/ui/Reveal";
import { siteConfig } from "@/shared/config/site";

import { CopyEmailButton } from "./CopyEmailButton";

type ChannelRowProps = {
  code: string;
  label: string;
  icon: LucideIcon;
  children: ReactNode;
  action?: ReactNode;
};

function ChannelRow({ code, label, icon: Icon, children, action }: ChannelRowProps) {
  return (
    <li className="group flex items-center gap-4 px-5 py-4 sm:px-6">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-wine to-camel">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
          <span className="text-camel">{code}</span> · {label}
        </p>
        <div className="mt-1 truncate">{children}</div>
      </div>
      {action}
    </li>
  );
}

/** Every way to reach the owner, in one card. */
export function ContactDetails() {
  const socials = siteConfig.socials.filter((social) => social.label !== "Email");

  return (
    <div className="space-y-10">
      <Reveal>
        <p className="font-display text-3xl leading-snug sm:text-4xl">
          Whether it&apos;s a role, a collaboration or just a good idea — the channel is open.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-2/90">
          <HudCorners className="m-2" />
          <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-6">
            <p className="font-mono text-[10px] tracking-[0.25em] text-camel uppercase">Find me</p>
            <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
              {2 + socials.length} ways
            </p>
          </div>
          <ul className="divide-y divide-line">
            <ChannelRow
              code="01"
              label="Email"
              icon={Mail}
              action={<CopyEmailButton email={siteConfig.email} />}
            >
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-camel">
                {siteConfig.email}
              </a>
            </ChannelRow>
            <ChannelRow code="02" label="Base" icon={MapPin}>
              {siteConfig.location}
            </ChannelRow>
            {socials.map((social, index) => (
              <ChannelRow
                key={social.label}
                code={String(index + 3).padStart(2, "0")}
                label={social.label}
                icon={Radio}
                action={
                  <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-camel" />
                }
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-camel"
                >
                  {social.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </ChannelRow>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Status · open to opportunities
        </p>
      </Reveal>
    </div>
  );
}
