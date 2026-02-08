import type { PageItem } from "@/admin/types/page";
import pagesSeed from "@/data/pages.json";

export const PAGES_STORAGE_KEY = "cms_pages";

export const loadPages = (): PageItem[] => {
  try {
    const stored = localStorage.getItem(PAGES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as PageItem[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return pagesSeed as PageItem[];
};

export const savePages = (items: PageItem[]) => {
  localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(items));
};
