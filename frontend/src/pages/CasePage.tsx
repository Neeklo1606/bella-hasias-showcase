import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
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

  const { data: caseData, isLoading: caseLoading, isError: caseError } = useQuery({
    queryKey: ['case', 'public', slug],
    queryFn: () => {
      if (!slug) throw new Error("Slug не указан");
      return casesApi.getBySlug(slug);
    },
    enabled: !!slug,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: servicesResponse } = useQuery({
    queryKey: ['services', 'public', { per_page: 100 }],
    queryFn: () => servicesApi.list({ per_page: 100 }),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!caseData?.serviceId, // Only fetch if we need to find service
  });

  const service = caseData?.serviceId && servicesResponse?.data
    ? servicesResponse.data.find((s) => s.id === caseData.serviceId)
    : null;

  // Extract media from caseData (API returns media array)
  const mediaItems: MediaItem[] = caseData
    ? ((caseData as any).media || []).map((m: any) => ({
        id: String(m.id),
        filename: m.filename,
        src: m.url || m.src,
        category: m.category || "Прочее",
        alt: m.alt || "",
        createdAt: m.createdAt || new Date().toISOString(),
      }))
    : [];

  const resolvedMedia = useResolvedMediaItems(mediaItems);
  const mediaMap = new Map(resolvedMedia.map((m) => [m.id, m]));

  if (caseLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  if (caseError || !caseData) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold">Кейс не найден</h1>
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

  const caseMedia = caseData.mediaIds
    .map((id) => mediaMap.get(id))
    .filter(Boolean) as MediaItem[];

  return (
    <>
      <Helmet>
        <title>{caseData.title} — Bella Hasias | Портфолио</title>
        <meta name="description" content={caseData.description.slice(0, 160)} />
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
              {caseData.title}
            </h1>
            {caseData.tags && caseData.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {caseData.tags.map((tag) => (
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

          {caseData.description && (
            <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
              <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {caseData.description}
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
                      alt={item.alt || caseData.title}
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
