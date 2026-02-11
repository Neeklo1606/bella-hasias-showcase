import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SEOForm from "@/admin/components/SEOForm";
import { pagesApi } from "@/lib/api/pages.api";
import { casesApi } from "@/lib/api/cases.api";
import { mediaApi } from "@/lib/api/media.api";
import { seoApi } from "@/lib/api/seo.api";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";
import { toast } from "@/components/ui/use-toast";
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
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [pagesRes, mediaRes, seoRes] = await Promise.all([
        pagesApi.adminList({ per_page: 100 }),
        mediaApi.adminList({ per_page: 100 }),
        seoApi.adminGet(),
      ]);

      setPages(pagesRes.data);
      setMediaItems(mediaRes.data);
      setSiteUrl(seoRes.siteUrl);
    } catch (error) {
      console.error("Failed to load SEO data:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSaveSEO = useCallback(
    async (pageId: string, seo: PageSEO) => {
      try {
        const page = pages.find((p) => p.id === pageId);
        if (!page) return;

        await pagesApi.adminUpdate(Number(pageId), {
          seo,
        });

        // Update local state
        setPages(pages.map((p) => (p.id === pageId ? { ...p, seo } : p)));
        toast({
          title: "Сохранено",
          description: "SEO настройки страницы обновлены.",
        });
      } catch (error) {
        console.error("Failed to save SEO:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить SEO настройки.",
          variant: "destructive",
        });
      }
    },
    [pages]
  );

  const handleSaveSiteUrl = async () => {
    try {
      await seoApi.adminUpdate({
        siteUrl: siteUrl.trim() || "https://bellahasias.ru",
      });
      toast({
        title: "Сохранено",
        description: "URL сайта обновлён.",
      });
    } catch (error) {
      console.error("Failed to save site URL:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить URL сайта.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadSitemap = async () => {
    try {
      const casesRes = await casesApi.adminList({ per_page: 100 });
      downloadSitemap(pages, casesRes.data);
    } catch (error) {
      console.error("Failed to load cases for sitemap:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить кейсы для sitemap.",
        variant: "destructive",
      });
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-sm text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

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
