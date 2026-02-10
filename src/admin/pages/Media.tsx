import { useCallback, useEffect, useMemo, useState } from "react";
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
import { fetchMedia, loadMedia, saveMedia, uploadMediaFile, deleteMediaItem } from "@/admin/lib/mediaStorage";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";

const generateId = () =>
  `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

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
    fetchMedia().then(setItems).catch(() => undefined);
  }, []);

  const persist = useCallback(async (next: MediaItem[]) => {
    setItems(next);
    await saveMedia(next);
  }, []);

  const handleSaveAll = useCallback(async () => {
    try {
      await saveMedia(items);
      toast({
        title: "Сохранено",
        description: "Медиа обновлено в админке.",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить медиа.",
        variant: "destructive",
      });
    }
  }, [items]);

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      const created: MediaItem[] = [];

      for (const file of files) {
        try {
          const uploaded = await uploadMediaFile(file, "Прочее", file.name.replace(/\.[^.]+$/, ""));
          created.push(uploaded);
        } catch {
          try {
            const src = await readFileAsDataUrl(file);
            created.push({
              id: generateId(),
              filename: file.name,
              src,
              category: "Прочее",
              alt: file.name.replace(/\.[^.]+$/, ""),
              createdAt: new Date().toISOString(),
            });
          } catch {
            continue;
          }
        }
      }
      if (created.length) {
        persist([...created, ...items]);
      }
    },
    [items, persist]
  );

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
    async (id: string) => {
      try {
        if (!id.startsWith("static-")) {
          await deleteMediaItem(id);
        }
      } catch {
        // ignore
      }
      persist(items.filter((it) => it.id !== id));
    },
    [items, persist]
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

  const displayItems = useMemo(() => filtered, [filtered]);

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
