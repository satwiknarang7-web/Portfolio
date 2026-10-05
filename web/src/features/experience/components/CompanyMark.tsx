import Image from "next/image";

import type { Role } from "../data";

/** The company's logo in a framed tile, or a monogram badge when there is none. */
export function CompanyMark({ role }: { role: Role }) {
  if (role.logo) {
    return (
      <div className="flex h-16 shrink-0 items-center rounded-xl border border-line bg-ink/60 px-4">
        <Image
          src={role.logo.src}
          alt={`${role.company} logo`}
          width={role.logo.width}
          height={role.logo.height}
          className="h-7 w-auto"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-camel/40 bg-gradient-to-br from-wine/60 via-ink-3 to-camel/30"
    >
      <span className="font-display text-2xl text-cream">{role.monogram ?? role.company[0]}</span>
      <span className="scanlines absolute inset-0 opacity-30" />
    </div>
  );
}
