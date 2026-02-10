import seoSeed from "@/data/seo.json";
import { apiGet, apiPost } from "@/admin/lib/apiClient";

export type SEOConfig = {
  siteUrl: string;
};

let seoCache = seoSeed as SEOConfig;

export const loadSEOConfig = (): SEOConfig => {
  return seoCache;
};

export const fetchSEOConfig = async (): Promise<SEOConfig> => {
  try {
    const data = await apiGet<SEOConfig | SEOConfig[]>("/seo");
    const config = Array.isArray(data) ? data[0] : data;
    if (config?.siteUrl) {
      seoCache = config;
    }
  } catch {
    // ignore, keep cache
  }
  return seoCache;
};

export const saveSEOConfig = async (config: SEOConfig) => {
  seoCache = config;
  await apiPost<SEOConfig, SEOConfig>("/seo", config);
  return seoCache;
};
