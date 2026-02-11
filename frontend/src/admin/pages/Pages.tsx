import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence } from "framer-motion";
import PageCard from "@/admin/components/PageCard";
import BlockEditor from "@/admin/components/BlockEditor";
import Pagination from "@/admin/components/Pagination";
import { pagesApi } from "@/lib/api/pages.api";
import { mediaApi } from "@/lib/api/media.api";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";
import { toast } from "sonner";
import type { PageItem, BlockItem } from "@/admin/types/page";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const Pages = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");

  const params = { per_page: perPage, page };

  const { data: pagesResponse, isLoading: pagesLoading } = useQuery({
    queryKey: ['pages', 'admin', params],
    queryFn: () => pagesApi.adminList(params),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: mediaResponse, isLoading: mediaLoading } = useQuery({
    queryKey: ['media', 'admin', { per_page: 100 }],
    queryFn: () => mediaApi.adminList({ per_page: 100 }),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const items = pagesResponse?.data || [];
  const mediaItems = mediaResponse?.data || [];
  const loading = pagesLoading || mediaLoading;
  const pagination = pagesResponse
    ? {
        currentPage: pagesResponse.current_page,
        lastPage: pagesResponse.last_page,
        perPage: pagesResponse.per_page,
        total: pagesResponse.total,
      }
    : null;

  const createMutation = useMutation({
    mutationFn: ({ title, slug }: { title: string; slug: string }) => 
      pagesApi.adminCreate({
        title,
        slug,
        blocks: [],
        status: "published",
      }),
    onSuccess: (newPage) => {
      queryClient.invalidateQueries({ queryKey: ['pages', 'admin'] });
      toast.success("Страница создана");
      setCreateOpen(false);
      setNewTitle("");
      setNewSlug("");
      setEditingPage(newPage);
      setEditorOpen(true);
    },
  });

  const updateBlocksMutation = useMutation({
    mutationFn: ({ id, blocks }: { id: number; blocks: BlockItem[] }) =>
      pagesApi.adminUpdate(id, { blocks }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['pages', 'admin'] });
      // Update local editing state
      if (editingPage && editingPage.id === String(variables.id)) {
        setEditingPage({ ...editingPage, blocks: variables.blocks });
      }
      toast.success("Блоки страницы обновлены");
    },
  });

  const handleEdit = (page: PageItem) => {
    setEditingPage(page);
    setEditorOpen(true);
  };

  const handleBlocksChange = (blocks: BlockItem[]) => {
    if (!editingPage) return;
    updateBlocksMutation.mutate({ id: Number(editingPage.id), blocks });
  };

  const handleCreate = () => {
    const slug = newSlug.trim() || slugify(newTitle) || "page";
    const title = newTitle.trim() || "Новая страница";
    createMutation.mutate({ title, slug });
  };

  const resolvedMediaItems = useResolvedMediaItems(mediaItems);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-sm text-muted-foreground ml-3">Загрузка страниц...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Страницы</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Управление контентом страниц: блоки, порядок, видимость
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Новая страница
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((pageItem) => (
            <PageCard key={pageItem.id} page={pageItem} onEdit={handleEdit} />
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && !loading && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {pagination?.total === 0
            ? "Нет страниц. Добавьте первую."
            : "Нет результатов."}
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

      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPage?.title ?? "Редактирование"}</DialogTitle>
          </DialogHeader>
          {editingPage && (
            <BlockEditor
              blocks={editingPage.blocks}
              onChange={handleBlocksChange}
              mediaItems={resolvedMediaItems}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новая страница</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newTitle">Название</Label>
              <Input
                id="newTitle"
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                  if (!newSlug) setNewSlug(slugify(e.target.value));
                }}
                placeholder="О нас"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newSlug">Slug (URL)</Label>
              <Input
                id="newSlug"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="about"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newTitle.trim() && !newSlug.trim()}
            >
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pages;
