import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Footer from "@/components/Footer";
import { casesApi } from "@/lib/api/cases.api";
import { servicesApi } from "@/lib/api/services.api";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";
import type { CaseItem } from "@/admin/types/case";
import type { Service } from "@/admin/types/service";
import type { MediaItem } from "@/admin/types/media";

const isVideo = (src: string) =>
  /\.(mp4|webm)$/i.test(src) || src.startsWith("data:video/") || src.startsWith("http") && /\.(mp4|webm)/i.test(src);

const CasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [caseItem, setCaseItem] = useState<CaseItem | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) {
        setError("Slug не указан");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [caseData, servicesRes] = await Promise.all([
          casesApi.getBySlug(slug),
          servicesApi.list({ per_page: 100 }),
        ]);

        setCaseItem(caseData);
        
        // Find service
        if (caseData.serviceId) {
          const foundService = servicesRes.data.find(
            (s) => s.id === caseData.serviceId
          );
          setService(foundService || null);
        }

        // Extract media from caseData (API returns media array)
        const media = (caseData as any).media || [];
        setMediaItems(media.map((m: any) => ({
          id: String(m.id),
          filename: m.filename,
          src: m.url || m.src,
          category: m.category || "Прочее",
          alt: m.alt || "",
          createdAt: m.createdAt || new Date().toISOString(),
        })));
      } catch (err: any) {
        console.error("Failed to load case:", err);
        setError(err.response?.status === 404 ? "Кейс не найден" : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug]);

  const resolvedMedia = useResolvedMediaItems(mediaItems);
  const mediaMap = new Map(resolvedMedia.map((m) => [m.id, m]));

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  if (error || !caseItem) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold">{error || "Кейс не найден"}</h1>
        <Link
          to="/portfolio"
          className="mt-4 text-primary hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к портфолио
        </Link>
      </div>
    );
  }

  const caseMedia = caseItem.mediaIds
    .map((id) => mediaMap.get(id))
    .filter(Boolean) as MediaItem[];

  return (
    <>
      <Helmet>
        <title>{caseItem.title} — Bella Hasias | Портфолио</title>
        <meta name="description" content={caseItem.description.slice(0, 160)} />
      </Helmet>

      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
          <Link
            to="/portfolio"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к портфолио
          </Link>

          <header className="mb-10">
            {service && (
              <p className="text-sm font-medium text-primary mb-2">
                {service.title}
              </p>
            )}
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {caseItem.title}
            </h1>
            {caseItem.tags && caseItem.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {caseItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {caseItem.description && (
            <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
              <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {caseItem.description}
              </p>
            </div>
          )}

          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Галерея</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {caseMedia.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-muted aspect-[4/3]"
                >
                  {isVideo(item.src) ? (
                    <video
                      src={item.src}
                      controls
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt || caseItem.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>

            {caseMedia.length === 0 && (
              <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed bg-muted/30">
                <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
              </div>
            )}
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default CasePage;
