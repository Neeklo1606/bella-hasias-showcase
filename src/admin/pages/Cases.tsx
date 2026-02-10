import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence } from "framer-motion";
import CaseCard from "@/admin/components/CaseCard";
import CaseForm, { type CaseFormData } from "@/admin/components/CaseForm";
import ConfirmDialog from "@/admin/components/ConfirmDialog";
import { fetchCases, loadCases, saveCases } from "@/admin/lib/casesStorage";
import { fetchServices, loadServices } from "@/admin/lib/servicesStorage";
import { fetchMedia, loadMedia } from "@/admin/lib/mediaStorage";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";
import type { CaseItem } from "@/admin/types/case";
import type { MediaItem } from "@/admin/types/media";
import type { Service } from "@/admin/types/service";
import { toast } from "@/components/ui/use-toast";

const generateId = () =>
  `case-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const Cases = () => {
  const [items, setItems] = useState<CaseItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CaseItem | null>(null);

  useEffect(() => {
    setItems(loadCases());
    setServices(loadServices());
    setMediaItems(loadMedia());
    fetchCases().then(setItems).catch(() => undefined);
    fetchServices().then(setServices).catch(() => undefined);
    fetchMedia().then(setMediaItems).catch(() => undefined);
  }, []);

  const persist = useCallback(async (next: CaseItem[]) => {
    setItems(next);
    await saveCases(next);
  }, []);

  const handleSaveAll = useCallback(async () => {
    try {
      await saveCases(items);
      toast({
        title: "Сохранено",
        description: "Портфолио обновлено на сервере.",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить портфолио.",
        variant: "destructive",
      });
    }
  }, [items]);

  const resolvedMediaItems = useResolvedMediaItems(mediaItems);

  const mediaMap = useMemo(
    () => new Map(resolvedMediaItems.map((m) => [m.id, m])),
    [resolvedMediaItems]
  );

  const serviceMap = useMemo(
    () => new Map(services.map((s) => [s.id, s])),
    [services]
  );

  const handleCreate = () => {
    setEditingCase(null);
    setFormOpen(true);
  };

  const handleEdit = (caseItem: CaseItem) => {
    setEditingCase(caseItem);
    setFormOpen(true);
  };

  const handleSubmit = async (data: CaseFormData) => {
    const now = new Date().toISOString();
    if (editingCase) {
      await persist(
        items.map((it) =>
          it.id === editingCase.id
            ? { ...data, id: it.id, createdAt: it.createdAt, updatedAt: now }
            : it
        )
      );
    } else {
      await persist([
        { ...data, id: generateId(), createdAt: now, updatedAt: now },
        ...items,
      ]);
    }
    toast({
      title: "Сохранено",
      description: "Работа обновлена на сервере.",
    });
    setFormOpen(false);
    setEditingCase(null);
  };

  const handleDeleteClick = (caseItem: CaseItem) => {
    setDeleteTarget(caseItem);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      persist(items.filter((it) => it.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const filtered = useMemo(() => {
    let list = items;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.slug.toLowerCase().includes(q) ||
          it.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => {
      const ao = a.order ?? 0;
      const bo = b.order ?? 0;
      if (ao !== bo) return ao - bo;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [items, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Портфолио</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Управление работами портфолио и связью с услугами
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={handleSaveAll}>
            Сохранить
          </Button>
          <Button onClick={handleCreate} className="w-fit">
            <Plus className="mr-2 h-4 w-4" />
            Добавить работу
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по заголовку, slug или тегам..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              mediaMap={mediaMap}
              serviceMap={serviceMap}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {items.length === 0
            ? "Нет работ. Добавьте первую."
            : "Нет результатов по поиску."}
        </p>
      )}

      <CaseForm
        open={formOpen}
        onOpenChange={setFormOpen}
        caseItem={editingCase}
        services={services}
        mediaItems={resolvedMediaItems}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Удалить работу?"
        description={
          deleteTarget
            ? `Работа «${deleteTarget.title}» будет удалена. Продолжить?`
            : ""
        }
        confirmLabel="Удалить"
        cancelLabel="Отмена"
        variant="destructive"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Cases;
