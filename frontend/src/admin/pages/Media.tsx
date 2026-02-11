import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MediaUploader from "@/admin/components/MediaUploader";
import MediaFilter from "@/admin/components/MediaFilter";
import MediaGrid from "@/admin/components/MediaGrid";
import MediaEditDialog from "@/admin/components/MediaEditDialog";
import Pagination from "@/admin/components/Pagination";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  MEDIA_CATEGORIES,
  type MediaItem,
  type MediaCategory,
} from "@/admin/types/media";
import { mediaApi } from "@/lib/api/media.api";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";

const Media = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const params = {
    per_page: perPage,
    page,
    ...(search.trim() && { q: search.trim() }),
    ...(category !== "all" && { category }),
  };

  const { data: mediaResponse, isLoading: mediaLoading } = useQuery({
    queryKey: ['media', 'admin', params],
    queryFn: () => mediaApi.adminList(params),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const items = mediaResponse?.data || [];
  const loading = mediaLoading;
  const pagination = mediaResponse
    ? {
        currentPage: mediaResponse.current_page,
        lastPage: mediaResponse.last_page,
        perPage: mediaResponse.per_page,
        total: mediaResponse.total,
      }
    : null;

  const uploadMutation = useMutation({
    mutationFn: (files: File[]) =>
      Promise.all(
        files.map((file) =>
          mediaApi.adminUpload({
            file,
            category: "Прочее",
            alt: file.name.replace(/\.[^.]+$/, ""),
          })
        )
      ),
    onSuccess: (_, files) => {
      queryClient.invalidateQueries({ queryKey: ['media', 'admin'] });
      toast.success(`Загружено ${files.length} файл(ов)`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { alt: string; category: MediaCategory } }) =>
      mediaApi.adminUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media', 'admin'] });
      toast.success("Медиа-файл обновлён");
      setEditOpen(false);
      setEditingItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => mediaApi.adminDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media', 'admin'] });
      toast.success("Медиа-файл удалён");
    },
  });

  const categoryChangeMutation = useMutation({
    mutationFn: ({ id, category }: { id: number; category: MediaCategory }) =>
      mediaApi.adminUpdate(id, { category }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media', 'admin'] });
    },
  });

  const handleFilesSelected = (files: File[]) => {
    uploadMutation.mutate(files);
  };

  const handleEdit = (item: MediaItem) => {
    setEditingItem(item);
    setEditOpen(true);
  };

  const handleSaveEdit = (id: string, data: { alt: string; category: MediaCategory }) => {
    updateMutation.mutate({ id: Number(id), data });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(Number(id));
  };

  const handleCategoryChange = (id: string, category: MediaCategory) => {
    categoryChangeMutation.mutate({ id: Number(id), category });
  };

  // Filtering is handled on backend, but we still need to resolve media items
  const resolvedItems = useResolvedMediaItems(items);
  const filtered = resolvedItems;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-sm text-muted-foreground ml-3">Загрузка медиа...</div>
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
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1); // Reset to first page on search
        }}
        category={category}
        onCategoryChange={(value) => {
          setCategory(value);
          setPage(1); // Reset to first page on category change
        }}
      />

      <MediaGrid
        items={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCategoryChange={handleCategoryChange}
      />

      {filtered.length === 0 && !loading && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {pagination?.total === 0
            ? "Нет медиа. Загрузите файлы выше."
            : "Нет результатов по фильтру."}
        </p>
      )}

      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          perPage={pagination.perPage}
          total={pagination.total}
          onPageChange={(newPage) => {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onPerPageChange={(newPerPage) => {
            setPerPage(newPerPage);
            setPage(1);
          }}
        />
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
