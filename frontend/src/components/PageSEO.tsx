import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { pagesApi } from "@/lib/api/pages.api";
import { seoApi } from "@/lib/api/seo.api";
import type { PageItem } from "@/admin/types/page";

type PageSEOProps = {
  slug: string;
  fallback?: {
    title?: string;
    description?: string;
    image?: string;
  };
};

const PageSEO = ({ slug, fallback }: PageSEOProps) => {
  const [page, setPage] = useState<PageItem | null>(null);
  const [siteUrl, setSiteUrl] = useState("https://bellahasias.ru");
  const [ogImage, setOgImage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [seoConfig, pageData] = await Promise.all([
          seoApi.get(),
          pagesApi.getBySlug(slug).catch(() => null),
        ]);

        setSiteUrl(seoConfig.siteUrl);
        setPage(pageData);

        // Get OG image
        if (pageData?.seo?.ogImageId) {
          // OG image ID is stored in seo.ogImageId
          // We need to construct the URL - for now use fallback
          setOgImage(null);
        }
      } catch (error) {
        console.error("Failed to load SEO data:", error);
      }
    };

    loadData();
  }, [slug]);

  const seo = page?.seo;
  const title = seo?.metaTitle || fallback?.title || "Bella Hasias";
  const description = seo?.metaDescription || fallback?.description || "";
  const base = siteUrl.replace(/\/$/, "");
  const finalOgImage = ogImage || fallback?.image || `${base}/og-image.jpg`;

  const robots = seo?.index === false ? "noindex, nofollow" : "index, follow";
  const url = slug === "home" ? siteUrl : `${siteUrl}/${slug}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default PageSEO;
