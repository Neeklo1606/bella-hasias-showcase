import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MediaUploader from "@/admin/components/MediaUploader";
import MediaFilter from "@/admin/components/MediaFilter";
import MediaGrid from "@/admin/components/MediaGrid";
import MediaEditDialog from "@/admin/components/MediaEditDialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  MEDIA_CATEGORIES,
  type MediaItem,
  type MediaCategory,
} from "@/admin/types/media";
import { loadMedia, saveMedia } from "@/admin/lib/mediaStorage";
import {
  deleteMediaFile,
  getIdbMediaId,
  isIdbMedia,
  saveMediaFile,
} from "@/lib/mediaFilesStorage";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";

const generateId = () =>
  `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const isVideo = (filename: string) =>
  /\.(mp4|webm)$/i.test(filename);

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const Media = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setItems(loadMedia());
  }, []);

  const persist = useCallback((next: MediaItem[]) => {
    setItems(next);
    saveMedia(next);
  }, []);

  const handleSaveAll = useCallback(() => {
    saveMedia(items);
    toast({
      title: "Сохранено",
      description: "Медиа обновлено в админке.",
    });
  }, [items]);

  const [videoObjectUrls, setVideoObjectUrls] = useState<Record<string, string>>({});
  const videoUrlsRef = useRef(videoObjectUrls);
  videoUrlsRef.current = videoObjectUrls;

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      const created: MediaItem[] = [];
      const newVideoUrls: Record<string, string> = {};

      for (const file of files) {
        const id = generateId();
        const filename = file.name;
        const createdAt = new Date().toISOString();

        if (isVideo(filename)) {
          const src = `/uploads/${filename}`;
          const objectUrl = URL.createObjectURL(file);
          newVideoUrls[id] = objectUrl;
          created.push({
            id,
            filename,
            src,
            category: "Прочее",
            alt: filename.replace(/\.[^.]+$/, ""),
            createdAt,
          });
        } else {
          try {
            const src = `idb://${id}`;
            await saveMediaFile(id, file);
            created.push({
              id,
              filename,
              src,
              category: "Прочее",
              alt: filename.replace(/\.[^.]+$/, ""),
              createdAt,
            });
          } catch {
            try {
              const src = await readFileAsDataUrl(file);
              created.push({
                id,
                filename,
                src,
                category: "Прочее",
                alt: filename.replace(/\.[^.]+$/, ""),
                createdAt,
              });
            } catch {
              continue;
            }
          }
        }
      }
      if (created.length) {
        setVideoObjectUrls((prev) => ({ ...prev, ...newVideoUrls }));
        persist([...created, ...items]);
      }
    },
    [items, persist]
  );

  useEffect(() => {
    return () => {
      Object.values(videoUrlsRef.current).forEach(URL.revokeObjectURL);
    };
  }, []);

  const handleEdit = useCallback((item: MediaItem) => {
    setEditingItem(item);
    setEditOpen(true);
  }, []);

  const handleSaveEdit = useCallback(
    (id: string, data: { alt: string; category: MediaCategory }) => {
      persist(
        items.map((it) =>
          it.id === id ? { ...it, alt: data.alt, category: data.category } : it
        )
      );
      setEditOpen(false);
      setEditingItem(null);
    },
    [items, persist]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const target = items.find((it) => it.id === id);
      if (target?.src && isIdbMedia(target.src)) {
        deleteMediaFile(getIdbMediaId(target.src)).catch(() => undefined);
      }
      if (videoObjectUrls[id]) {
        URL.revokeObjectURL(videoObjectUrls[id]);
        setVideoObjectUrls((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
      persist(items.filter((it) => it.id !== id));
    },
    [items, persist, videoObjectUrls]
  );

  const handleCategoryChange = useCallback(
    (id: string, category: MediaCategory) => {
      persist(
        items.map((it) => (it.id === id ? { ...it, category } : it))
      );
    },
    [items, persist]
  );

  const resolvedItems = useResolvedMediaItems(items);

  const filtered = useMemo(() => {
    let list = items;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (it) =>
          it.filename.toLowerCase().includes(q) ||
          it.alt.toLowerCase().includes(q)
      );
    }
    if (category !== "all") {
      list = list.filter((it) => it.category === category);
    }
    const resolvedMap = new Map(resolvedItems.map((it) => [it.id, it]));
    return [...list]
      .map((it) => resolvedMap.get(it.id) ?? it)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [items, resolvedItems, search, category]);

  const displayItems = useMemo(
    () =>
      filtered.map((it) =>
        videoObjectUrls[it.id] ? { ...it, src: videoObjectUrls[it.id] } : it
      ),
    [filtered, videoObjectUrls]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Медиа</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Загрузка и управление изображениями и видео
          </p>
        </div>
        <Button onClick={handleSaveAll}>Сохранить</Button>
      </div>

      <MediaUploader onFilesSelected={handleFilesSelected} />

      <p className="text-xs text-muted-foreground">
        Изображения сохраняются в браузере. Видео (MP4, WebM) храните как файлы в <code className="rounded bg-muted px-1">public/uploads/</code> — в админке указывайте имя файла, а предпросмотр появится в текущей сессии.
      </p>

      <MediaFilter
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
      />

      <MediaGrid
        items={displayItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCategoryChange={handleCategoryChange}
      />

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {items.length === 0
            ? "Нет медиа. Загрузите файлы выше."
            : "Нет результатов по фильтру."}
        </p>
      )}

      <MediaEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        item={editingItem}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Media;
