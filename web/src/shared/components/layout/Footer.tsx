import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/shared/config/site";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-hand text-2xl text-camel">got an idea worth building?</p>
            <Link
              href="/contact"
              className="group mt-3 inline-flex items-center gap-3 font-display text-5xl sm:text-7xl"
            >
              <span className="text-gradient">Let&apos;s talk</span>
              <ArrowUpRight className="h-10 w-10 text-camel transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-14 sm:w-14" />
            </Link>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {siteConfig.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-14 font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
          © {new Date().getFullYear()} {siteConfig.name} · designed & built by hand in{" "}
          {siteConfig.location.split(",")[0]}
        </p>
      </div>
    </footer>
  );
}
