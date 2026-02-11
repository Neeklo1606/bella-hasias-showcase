import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
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
import { loadPages, savePages } from "@/admin/lib/pagesStorage";
import { loadMedia } from "@/admin/lib/mediaStorage";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";
import type { PageItem, BlockItem } from "@/admin/types/page";

const generateId = () =>
  `page-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const Pages = () => {
  const [items, setItems] = useState<PageItem[]>([]);
  const [mediaItems, setMediaItems] = useState<import("@/admin/types/media").MediaItem[]>([]);
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");

  useEffect(() => {
    setItems(loadPages());
    setMediaItems(loadMedia());
  }, []);

  const persist = useCallback((next: PageItem[]) => {
    setItems(next);
    savePages(next);
  }, []);

  const handleEdit = (page: PageItem) => {
    setEditingPage(page);
    setEditorOpen(true);
  };

  const handleBlocksChange = (blocks: BlockItem[]) => {
    if (!editingPage) return;
    const now = new Date().toISOString();
    persist(
      items.map((p) =>
        p.id === editingPage.id ? { ...p, blocks, updatedAt: now } : p
      )
    );
    setEditingPage((prev) => (prev ? { ...prev, blocks, updatedAt: now } : null));
  };

  const handleCreate = () => {
    const slug = newSlug.trim() || slugify(newTitle) || "page";
    const now = new Date().toISOString();
    const newPage: PageItem = {
      id: generateId(),
      slug,
      title: newTitle.trim() || "Новая страница",
      blocks: [],
      updatedAt: now,
    };
    persist([...items, newPage]);
    setCreateOpen(false);
    setNewTitle("");
    setNewSlug("");
    setEditingPage(newPage);
    setEditorOpen(true);
  };

  const resolvedMediaItems = useResolvedMediaItems(mediaItems);

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
          {items.map((page) => (
            <PageCard key={page.id} page={page} onEdit={handleEdit} />
          ))}
        </AnimatePresence>
      </div>

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
