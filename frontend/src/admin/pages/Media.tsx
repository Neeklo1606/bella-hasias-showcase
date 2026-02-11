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
import { mediaApi } from "@/lib/api/media.api";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";

const Media = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const mediaRes = await mediaApi.adminList({ per_page: 100 });
      setItems(mediaRes.data);
    } catch (error) {
      console.error("Failed to load media:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить медиа-файлы.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      try {
        const uploadPromises = files.map((file) =>
          mediaApi.adminUpload({
            file,
            category: "Прочее",
            alt: file.name.replace(/\.[^.]+$/, ""),
          })
        );

        await Promise.all(uploadPromises);
        toast({
          title: "Успешно",
          description: `Загружено ${files.length} файл(ов).`,
        });
        await loadData(); // Reload data
      } catch (error) {
        console.error("Failed to upload files:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить файлы.",
          variant: "destructive",
        });
      }
    },
    [loadData]
  );

  const handleEdit = useCallback((item: MediaItem) => {
    setEditingItem(item);
    setEditOpen(true);
  }, []);

  const handleSaveEdit = useCallback(
    async (id: string, data: { alt: string; category: MediaCategory }) => {
      try {
        await mediaApi.adminUpdate(Number(id), {
          alt: data.alt,
          category: data.category,
        });
        setEditOpen(false);
        setEditingItem(null);
        await loadData(); // Reload data
        toast({
          title: "Сохранено",
          description: "Медиа-файл обновлён.",
        });
      } catch (error) {
        console.error("Failed to update media:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось обновить медиа-файл.",
          variant: "destructive",
        });
      }
    },
    [loadData]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await mediaApi.adminDelete(Number(id));
        await loadData(); // Reload data
        toast({
          title: "Удалено",
          description: "Медиа-файл удалён.",
        });
      } catch (error) {
        console.error("Failed to delete media:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось удалить медиа-файл.",
          variant: "destructive",
        });
      }
    },
    [loadData]
  );

  const handleCategoryChange = useCallback(
    async (id: string, category: MediaCategory) => {
      try {
        await mediaApi.adminUpdate(Number(id), { category });
        await loadData(); // Reload data
      } catch (error) {
        console.error("Failed to update category:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось обновить категорию.",
          variant: "destructive",
        });
      }
    },
    [loadData]
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-sm text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Медиа</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Загрузка и управление изображениями и видео
          </p>
        </div>
      </div>

      <MediaUploader onFilesSelected={handleFilesSelected} />

      <p className="text-xs text-muted-foreground">
        Файлы загружаются на сервер и сохраняются в базе данных.
      </p>

      <MediaFilter
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
      />

      <MediaGrid
        items={filtered}
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
