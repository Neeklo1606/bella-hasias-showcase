import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Download, FileCode, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SEOForm from "@/admin/components/SEOForm";
import {
  loadPages,
  savePages,
} from "@/admin/lib/pagesStorage";
import { loadMedia } from "@/admin/lib/mediaStorage";
import { loadCases } from "@/admin/lib/casesStorage";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";
import {
  loadSEOConfig,
  saveSEOConfig,
  type SEOConfig,
} from "@/admin/lib/seoStorage";
import { downloadSitemap } from "@/admin/lib/sitemapGenerator";
import { downloadRobots } from "@/admin/lib/robotsGenerator";
import type { PageItem, PageSEO } from "@/admin/types/page";

const GOOGLE_VALIDATOR = "https://search.google.com/test/rich-results";
const YANDEX_WEBMASTER = "https://webmaster.yandex.ru/";

const SEO = () => {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [mediaItems, setMediaItems] = useState<import("@/admin/types/media").MediaItem[]>([]);
  const [search, setSearch] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

  useEffect(() => {
    setPages(loadPages());
    setMediaItems(loadMedia());
    setSiteUrl(loadSEOConfig().siteUrl);
  }, []);

  const persist = useCallback((next: PageItem[]) => {
    setPages(next);
    savePages(next);
  }, []);

  const handleSaveSEO = useCallback(
    (pageId: string, seo: PageSEO) => {
      persist(
        pages.map((p) => (p.id === pageId ? { ...p, seo } : p))
      );
    },
    [pages, persist]
  );

  const handleSaveSiteUrl = () => {
    saveSEOConfig({ siteUrl: siteUrl.trim() || "https://example.com" });
  };

  const handleDownloadSitemap = () => {
    downloadSitemap(pages, loadCases());
  };

  const handleDownloadRobots = () => {
    downloadRobots(pages);
  };

  const resolvedMediaItems = useResolvedMediaItems(mediaItems);

  const filteredPages = useMemo(() => {
    if (!search.trim()) return pages;
    const q = search.trim().toLowerCase();
    return pages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
    );
  }, [pages, search]);

  const getPublicPath = (page: PageItem) =>
    page.slug === "home" ? "/" : `/${page.slug}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">SEO</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Мета-информация страниц, sitemap и robots.txt
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>URL сайта</CardTitle>
          <CardDescription>
            Базовый URL для sitemap.xml и robots.txt
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="siteUrl">Site URL</Label>
            <Input
              id="siteUrl"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://your-site.com"
            />
          </div>
          <Button onClick={handleSaveSiteUrl}>Сохранить</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Генерация файлов</CardTitle>
          <CardDescription>
            Скачайте sitemap.xml и robots.txt и поместите в папку public/
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button variant="outline" onClick={handleDownloadSitemap}>
            <Download className="mr-2 h-4 w-4" />
            Скачать sitemap.xml
          </Button>
          <Button variant="outline" onClick={handleDownloadRobots}>
            <Download className="mr-2 h-4 w-4" />
            Скачать robots.txt
          </Button>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по странице..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 max-w-md"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={GOOGLE_VALIDATOR} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1 h-3 w-3" />
              Google Rich Results
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={YANDEX_WEBMASTER} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1 h-3 w-3" />
              Яндекс Вебмастер
            </a>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPages.map((page) => (
          <SEOForm
            key={page.id}
            page={page}
            mediaItems={resolvedMediaItems}
            onSave={(seo) => handleSaveSEO(page.id, seo)}
            publicPath={getPublicPath(page)}
          />
        ))}
      </div>

      {filteredPages.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {pages.length === 0
            ? "Нет страниц. Добавьте страницы в разделе Страницы."
            : "Нет результатов по поиску."}
        </p>
      )}
    </div>
  );
};

export default SEO;
