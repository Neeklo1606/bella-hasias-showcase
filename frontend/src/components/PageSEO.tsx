import { Helmet } from "react-helmet-async";
import { loadPages } from "@/admin/lib/pagesStorage";
import { loadMedia } from "@/admin/lib/mediaStorage";
import { loadSEOConfig } from "@/admin/lib/seoStorage";

type PageSEOProps = {
  slug: string;
  fallback?: {
    title?: string;
    description?: string;
    image?: string;
  };
};

const PageSEO = ({ slug, fallback }: PageSEOProps) => {
  const pages = loadPages();
  const config = loadSEOConfig();
  const media = loadMedia();

  const page = pages.find((p) => p.slug === slug);
  const seo = page?.seo;

  const title = seo?.metaTitle || fallback?.title || "Bella Hasias";
  const description = seo?.metaDescription || fallback?.description || "";
  const ogImageId = seo?.ogImageId;
  const mediaItem = ogImageId ? media.find((m) => m.id === ogImageId) : null;
  const base = config.siteUrl.replace(/\/$/, "");
  const ogImage = mediaItem?.src?.startsWith("http")
    ? mediaItem.src
    : mediaItem?.src
      ? `${base}${mediaItem.src.startsWith("/") ? "" : "/"}${mediaItem.src}`
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
