import type { PageItem } from "@/admin/types/page";
import pagesSeed from "@/data/pages.json";
import { apiGet, apiPost } from "@/admin/lib/apiClient";

let pagesCache: PageItem[] = pagesSeed as PageItem[];

export const loadPages = (): PageItem[] => {
  return pagesCache;
};

export const fetchPages = async (): Promise<PageItem[]> => {
  try {
    const data = await apiGet<PageItem[]>("/pages");
    if (Array.isArray(data)) {
      pagesCache = data;
    }
  } catch {
    // ignore, keep cache
  }
  return pagesCache;
};

export const savePages = async (items: PageItem[]) => {
  pagesCache = items;
  await apiPost<PageItem[], PageItem[]>("/pages", items);
  return pagesCache;
};
