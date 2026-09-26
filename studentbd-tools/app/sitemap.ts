import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/seo/toolsData";
import { SITE } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url.replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/calculators",
    "/study-tools",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}${tool.href.startsWith("/") ? tool.href : `/${tool.href}`}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...toolEntries];
}