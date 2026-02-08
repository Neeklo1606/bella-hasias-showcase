import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Footer from "@/components/Footer";
import { loadCases } from "@/admin/lib/casesStorage";
import { loadServices } from "@/admin/lib/servicesStorage";
import { loadMedia } from "@/admin/lib/mediaStorage";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";

const isVideo = (src: string) =>
  /\.(mp4|webm)$/i.test(src) || src.startsWith("data:video/");

const CasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const cases = loadCases();
  const services = loadServices();
  const media = loadMedia();
  const resolvedMedia = useResolvedMediaItems(media);

  const caseItem = cases.find((c) => c.slug === slug);
  const service = caseItem
    ? services.find((s) => s.id === caseItem.serviceId)
    : null;
  const mediaMap = new Map(resolvedMedia.map((m) => [m.id, m]));

  if (!caseItem) {
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

  const caseMedia = caseItem.mediaIds
    .map((id) => mediaMap.get(id))
    .filter(Boolean);

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
            {caseItem.tags.length > 0 && (
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
              {caseMedia.map((item) =>
                item ? (
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
                ) : null
              )}
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
