import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";

import { siteConfig } from "@/shared/config/site";

/** True once the owner has dropped their photo into /public. Checked at build/render time. */
export function hasPortrait(): boolean {
  return existsSync(path.join(process.cwd(), "public", siteConfig.portrait));
}
