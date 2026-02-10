import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { fetchPages, loadPages } from "@/admin/lib/pagesStorage";
import { fetchMedia, loadMedia } from "@/admin/lib/mediaStorage";
import { fetchSEOConfig, loadSEOConfig } from "@/admin/lib/seoStorage";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";

type PageSEOProps = {
  slug: string;
  fallback?: {
    title?: string;
    description?: string;
    image?: string;
  };
};

const PageSEO = ({ slug, fallback }: PageSEOProps) => {
  const [pages, setPages] = useState(loadPages());
  const [config, setConfig] = useState(loadSEOConfig());
  const [media, setMedia] = useState(loadMedia());
  const resolvedMediaItems = useResolvedMediaItems(media);

  useEffect(() => {
    fetchPages().then(setPages).catch(() => undefined);
    fetchMedia().then(setMedia).catch(() => undefined);
    fetchSEOConfig().then(setConfig).catch(() => undefined);
  }, []);

  const page = useMemo(() => pages.find((p) => p.slug === slug), [pages, slug]);
  const seo = page?.seo;

  const title = seo?.metaTitle || fallback?.title || "Bella Hasias";
  const description = seo?.metaDescription || fallback?.description || "";
  const ogImageId = seo?.ogImageId;
  const mediaItem = ogImageId
    ? resolvedMediaItems.find((m) => m.id === ogImageId)
    : null;
  const base = config.siteUrl.replace(/\/$/, "");
  const ogImage = mediaItem?.src
    ? mediaItem.src.startsWith("http")
      ? mediaItem.src
      : `${base}${mediaItem.src.startsWith("/") ? "" : "/"}${mediaItem.src}`
    : fallback?.image || `${base}/og-image.jpg`;

  const robots = seo?.index === false ? "noindex, nofollow" : "index, follow";
  const url = slug === "home" ? config.siteUrl : `${config.siteUrl}/${slug}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default PageSEO;
