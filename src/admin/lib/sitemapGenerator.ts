import type { PageItem } from "@/admin/types/page";
import type { CaseItem } from "@/admin/types/case";
import { loadSEOConfig } from "./seoStorage";

const SLUG_TO_PATH: Record<string, string> = {
  home: "/",
  contacts: "/contacts",
  portfolio: "/portfolio",
  services: "/services",
};

const STATIC_ROUTES: { path: string; priority: number; changefreq: string }[] = [
  { path: "/services", priority: 0.9, changefreq: "weekly" },
  { path: "/portfolio", priority: 0.8, changefreq: "weekly" },
  { path: "/privacy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms", priority: 0.3, changefreq: "yearly" },
  { path: "/consent", priority: 0.3, changefreq: "yearly" },
  { path: "/services/brand-styling", priority: 0.6, changefreq: "monthly" },
  { path: "/services/wardrobe-audit", priority: 0.6, changefreq: "monthly" },
  { path: "/services/personal-shopping", priority: 0.6, changefreq: "monthly" },
  { path: "/services/capsule-wardrobe", priority: 0.6, changefreq: "monthly" },
  { path: "/services/event-look", priority: 0.6, changefreq: "monthly" },
  { path: "/services/client-shoot", priority: 0.6, changefreq: "monthly" },
  { path: "/services/ugc", priority: 0.6, changefreq: "monthly" },
  { path: "/services/photo-video", priority: 0.6, changefreq: "monthly" },
  { path: "/services/ai-content", priority: 0.6, changefreq: "monthly" },
];

export const generateSitemap = (
  pages: PageItem[],
  cases: CaseItem[],
  baseUrl?: string
): string => {
  const config = loadSEOConfig();
  const siteUrl = (baseUrl ?? config.siteUrl).replace(/\/$/, "");

  const formatDate = (d: string) =>
    new Date(d).toISOString().slice(0, 10);

  const urls: string[] = [];

  for (const page of pages) {
    if (page.seo?.index === false) continue;
    const path = SLUG_TO_PATH[page.slug] ?? `/${page.slug}`;
    const lastmod = formatDate(page.updatedAt);
    const priority = page.slug === "home" ? "1.0" : "0.8";
    const changefreq = page.slug === "home" ? "weekly" : "monthly";
    urls.push(
      `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    );
  }

  for (const caseItem of cases) {
    urls.push(
      `  <url>\n    <loc>${siteUrl}/portfolio/${caseItem.slug}</loc>\n    <lastmod>${formatDate(caseItem.updatedAt)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    );
  }

  for (const route of STATIC_ROUTES) {
    if (urls.some((u) => u.includes(`<loc>${siteUrl}${route.path}</loc>`)))
      continue;
    urls.push(
      `  <url>\n    <loc>${siteUrl}${route.path}</loc>\n    <lastmod>${formatDate(new Date().toISOString())}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
};

export const downloadSitemap = (
  pages: PageItem[],
  cases: CaseItem[]
) => {
  const xml = generateSitemap(pages, cases);
  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sitemap.xml";
  a.click();
  URL.revokeObjectURL(url);
};
