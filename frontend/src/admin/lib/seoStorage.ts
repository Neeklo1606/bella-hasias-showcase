import seoSeed from "@/data/seo.json";

export type SEOConfig = {
  siteUrl: string;
};

const SEO_STORAGE_KEY = "cms_seo_config";

export const loadSEOConfig = (): SEOConfig => {
  try {
    const stored = localStorage.getItem(SEO_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as SEOConfig;
      if (parsed?.siteUrl) return parsed;
    }
  } catch {
    // ignore
  }
  return seoSeed as SEOConfig;
};

export const saveSEOConfig = (config: SEOConfig) => {
  localStorage.setItem(SEO_STORAGE_KEY, JSON.stringify(config));
};
