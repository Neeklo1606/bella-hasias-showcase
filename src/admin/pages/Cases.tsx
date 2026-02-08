import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence } from "framer-motion";
import CaseCard from "@/admin/components/CaseCard";
import CaseForm, { type CaseFormData } from "@/admin/components/CaseForm";
import ConfirmDialog from "@/admin/components/ConfirmDialog";
import { loadCases, saveCases } from "@/admin/lib/casesStorage";
import { loadServices } from "@/admin/lib/servicesStorage";
import { loadMedia } from "@/admin/lib/mediaStorage";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";
import type { CaseItem } from "@/admin/types/case";
import type { MediaItem } from "@/admin/types/media";
import type { Service } from "@/admin/types/service";

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
  }, []);

  const persist = useCallback((next: CaseItem[]) => {
    setItems(next);
    saveCases(next);
  }, []);

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

  const handleSubmit = (data: CaseFormData) => {
    const now = new Date().toISOString();
    if (editingCase) {
      persist(
        items.map((it) =>
          it.id === editingCase.id
            ? { ...data, id: it.id, createdAt: it.createdAt, updatedAt: now }
            : it
        )
      );
    } else {
      persist([
        { ...data, id: generateId(), createdAt: now, updatedAt: now },
        ...items,
      ]);
    }
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
    return [...list].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [items, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Кейсы</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Управление портфолио и кейсами, связь с услугами
          </p>
        </div>
        <Button onClick={handleCreate} className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Добавить кейс
        </Button>
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
            ? "Нет кейсов. Добавьте первый."
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
        title="Удалить кейс?"
        description={
          deleteTarget
            ? `Кейс «${deleteTarget.title}» будет удалён. Продолжить?`
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
