import { useEffect, useMemo, useRef, useState } from "react";
import type { MediaItem } from "@/admin/types/media";
import { getIdbMediaId, getMediaFile, isIdbMedia } from "@/lib/mediaFilesStorage";

export const useResolvedMediaItems = (items: MediaItem[]) => {
  const [objectUrls, setObjectUrls] = useState<Record<string, string>>({});
  const objectUrlsRef = useRef(objectUrls);

  useEffect(() => {
    objectUrlsRef.current = objectUrls;
  }, [objectUrls]);

  useEffect(() => {
    let cancelled = false;
    const missing = items.filter(
      (item) => isIdbMedia(item.src) && !objectUrls[item.id]
    );
    if (!missing.length) return;

    const load = async () => {
      const next: Record<string, string> = {};
      for (const item of missing) {
        try {
          const blobId = getIdbMediaId(item.src);
          const blob = await getMediaFile(blobId);
          if (!blob) continue;
          next[item.id] = URL.createObjectURL(blob);
        } catch {
          // ignore
        }
      }
      if (!cancelled && Object.keys(next).length > 0) {
        setObjectUrls((prev) => ({ ...prev, ...next }));
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [items, objectUrls]);

  useEffect(
    () => () => {
      Object.values(objectUrlsRef.current).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    },
    []
  );

  return useMemo(
    () =>
      items.map((item) =>
        objectUrls[item.id] ? { ...item, src: objectUrls[item.id] } : item
      ),
    [items, objectUrls]
  );
};
