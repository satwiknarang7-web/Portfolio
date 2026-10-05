import type { MetadataRoute } from "next";

import { projects } from "@/features/projects";
import { siteConfig } from "@/shared/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = siteConfig.nav.map((item) => ({
    url: new URL(item.href, siteConfig.url).toString(),
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const projectPages = projects.map((project) => ({
    url: new URL(`/projects/${project.slug}`, siteConfig.url).toString(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...projectPages];
}
