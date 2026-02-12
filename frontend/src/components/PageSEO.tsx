import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { pagesApi } from "@/lib/api/pages.api";
import { seoApi } from "@/lib/api/seo.api";
import { mediaApi } from "@/lib/api/media.api";
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

        // Get OG image from media if ogImageId is present
        if (pageData?.seo?.ogImageId) {
          try {
            // ogImageId can be string or number, convert to number
            const imageId = typeof pageData.seo.ogImageId === 'string' 
              ? parseInt(pageData.seo.ogImageId, 10) 
              : pageData.seo.ogImageId;
            
            if (!isNaN(imageId) && imageId > 0) {
              const mediaItem = await mediaApi.get(imageId);
              
              // Form absolute URL
              const base = seoConfig.siteUrl.replace(/\/$/, "");
              const imageUrl = mediaItem.src || "";
              
              // If URL is already absolute (starts with http), use it as is
              if (imageUrl && (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))) {
                setOgImage(imageUrl);
              } else if (imageUrl) {
                // If relative, make it absolute
                // Remove any double slashes
                let cleanUrl = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
                cleanUrl = cleanUrl.replace(/\/+/g, '/'); // Replace multiple slashes with single
                setOgImage(`${base}${cleanUrl}`);
              } else {
                setOgImage(null);
              }
            } else {
              setOgImage(null);
            }
          } catch (error) {
            // If media not found or error, fallback will be used
            console.warn("Failed to load OG image media:", error);
            setOgImage(null);
          }
        } else {
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
