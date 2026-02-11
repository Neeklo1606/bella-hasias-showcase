import type { PageItem } from "@/admin/types/page";
import { loadSEOConfig } from "./seoStorage";

const SLUG_TO_PATH: Record<string, string> = {
  home: "/",
  contacts: "/contacts",
  portfolio: "/portfolio",
  services: "/services",
};

export const generateRobots = (pages: PageItem[], baseUrl?: string): string => {
  const config = loadSEOConfig();
  const siteUrl = (baseUrl ?? config.siteUrl).replace(/\/$/, "");

  const disallow: string[] = ["/admin", "/admin/"];
  for (const page of pages) {
    if (page.seo?.index === false) {
      const path = SLUG_TO_PATH[page.slug] ?? `/${page.slug}`;
      if (path !== "/") disallow.push(path);
    }
  }

  const lines = [
    "User-agent: *",
    "Allow: /",
    ...disallow.map((p) => `Disallow: ${p}`),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    `Host: ${siteUrl}`,
  ];

  return lines.join("\n");
};

export const downloadRobots = (pages: PageItem[]) => {
  const txt = generateRobots(pages);
  const blob = new Blob([txt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "robots.txt";
  a.click();
  URL.revokeObjectURL(url);
};
