import type { MediaItem } from "@/admin/types/media";
import mediaSeed from "@/data/media.json";
import { apiDelete, apiGet, apiPost, apiPostForm } from "@/admin/lib/apiClient";

const staticAssets = import.meta.glob("@/assets/**/*.{jpg,JPG,jpeg,JPEG,webp,WEBP,png,PNG}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const toStaticMediaItems = (): MediaItem[] => {
  const now = "2026-02-08T12:00:00.000Z";
  return Object.entries(staticAssets)
    .filter(([path]) => /assets\/portfolio\/IMG_/i.test(path) || /assets\/service-/i.test(path) || /assets\/hero\//i.test(path))
    .map(([path, src]) => {
      const filename = path.split("/").pop() ?? "asset";
      let category: MediaItem["category"] = "Прочее";
      if (/assets\/portfolio\/IMG_/i.test(path)) category = "Портфолио";
      else if (/assets\/service-/i.test(path)) category = "Услуги";
      else if (/assets\/hero\//i.test(path)) category = "Главная страница";
      return {
        id: `static-${filename}`,
        filename,
        src,
        category,
        alt: filename.replace(/\.[^.]+$/, ""),
        createdAt: now,
      };
    });
};

let mediaCache: MediaItem[] = [];

const mergeStatic = (items: MediaItem[]) => {
  const staticItems = toStaticMediaItems();
  const map = new Map(staticItems.map((item) => [item.id, item]));
  items.forEach((item) => map.set(item.id, item));
  return Array.from(map.values());
};

export const loadMedia = (): MediaItem[] => {
  if (!mediaCache.length) {
    mediaCache = mergeStatic(mediaSeed as MediaItem[]);
  }
  return mediaCache;
};

export const fetchMedia = async (): Promise<MediaItem[]> => {
  try {
    const data = await apiGet<MediaItem[]>("/media");
    if (Array.isArray(data)) {
      mediaCache = mergeStatic(data);
    }
  } catch {
    // ignore, keep cache
  }
  return mediaCache;
};

export const saveMedia = async (items: MediaItem[]) => {
  mediaCache = mergeStatic(items);
  const payload = items.filter((item) => !item.id.startsWith("static-"));
  await apiPost<MediaItem[], MediaItem[]>("/media", payload);
  return mediaCache;
};

export const uploadMediaFile = async (
  file: File,
  category: MediaItem["category"],
  alt?: string
): Promise<MediaItem> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);
  if (alt) formData.append("alt", alt);
  const item = await apiPostForm<MediaItem>("/media", formData);
  return item;
};

export const deleteMediaItem = async (id: string) => {
  await apiDelete(`/media/${id}`);
};
