import type { MediaItem } from "@/admin/types/media";
import mediaSeed from "@/data/media.json";

export const MEDIA_STORAGE_KEY = "cms_media";

export const loadMedia = (): MediaItem[] => {
  try {
    const stored = localStorage.getItem(MEDIA_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as MediaItem[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return mediaSeed as MediaItem[];
};

export const saveMedia = (items: MediaItem[]) => {
  localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(items));
};
