import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence } from "framer-motion";
import ServiceCard from "@/admin/components/ServiceCard";
import ServiceForm, { type ServiceFormData } from "@/admin/components/ServiceForm";
import ConfirmDialog from "@/admin/components/ConfirmDialog";
import { servicesApi } from "@/lib/api/services.api";
import { mediaApi } from "@/lib/api/media.api";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";
import type { Service } from "@/admin/types/service";
import type { MediaItem } from "@/admin/types/media";

const Services = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [servicesRes, mediaRes] = await Promise.all([
        servicesApi.adminList({ per_page: 100 }),
        mediaApi.adminList({ per_page: 100 }),
      ]);

      setItems(servicesRes.data);
      setMediaItems(mediaRes.data);
    } catch (error) {
      console.error("Failed to load services:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const resolvedMediaItems = useResolvedMediaItems(mediaItems);

  const mediaMap = useMemo(
    () => new Map(resolvedMediaItems.map((m) => [m.id, m])),
    [resolvedMediaItems]
  );

  const handleCreate = () => {
    setEditingService(null);
    setFormOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormOpen(true);
  };

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      if (editingService) {
        await servicesApi.adminUpdate(Number(editingService.id), {
          title: data.title,
          description: data.description,
          category: data.category,
          imageId: data.imageId ? Number(data.imageId) : undefined,
          coverId: data.coverId ? Number(data.coverId) : undefined,
          tags: data.tags || [],
          ctaLabel: data.ctaLabel,
          ctaLink: data.ctaLink,
          status: data.status || "published",
        });
      } else {
        await servicesApi.adminCreate({
          title: data.title,
          description: data.description,
          category: data.category,
          imageId: data.imageId ? Number(data.imageId) : undefined,
          coverId: data.coverId ? Number(data.coverId) : undefined,
          tags: data.tags || [],
          ctaLabel: data.ctaLabel,
          ctaLink: data.ctaLink,
          status: data.status || "published",
        });
      }
      setFormOpen(false);
      setEditingService(null);
      await loadData(); // Reload data
    } catch (error) {
      console.error("Failed to save service:", error);
      // TODO: Show error toast
    }
  };

  const handleDeleteClick = (service: Service) => {
    setDeleteTarget(service);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      try {
        await servicesApi.adminDelete(Number(deleteTarget.id));
        setDeleteTarget(null);
        await loadData(); // Reload data
      } catch (error) {
        console.error("Failed to delete service:", error);
        // TODO: Show error toast
      }
    }
  };

  const filtered = useMemo(() => {
    let list = items;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return [...list].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [items, search]);

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
          <h1 className="text-2xl font-bold tracking-tight">Услуги</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Управление услугами и связь с медиа
          </p>
        </div>
        <Button onClick={handleCreate} className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Добавить услугу
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по заголовку или тегам..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              mediaMap={mediaMap}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {items.length === 0
            ? "Нет услуг. Добавьте первую."
            : "Нет результатов по поиску."}
        </p>
      )}

      <ServiceForm
        open={formOpen}
        onOpenChange={setFormOpen}
        service={editingService}
        mediaItems={resolvedMediaItems}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Удалить услугу?"
        description={
          deleteTarget
            ? `Услуга «${deleteTarget.title}» будет удалена. Продолжить?`
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

export default Services;
