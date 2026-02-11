import { useMemo, useState } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ServiceCard from "@/admin/components/ServiceCard";
import ServiceForm, { type ServiceFormData } from "@/admin/components/ServiceForm";
import ConfirmDialog from "@/admin/components/ConfirmDialog";
import Pagination from "@/admin/components/Pagination";
import { servicesApi } from "@/lib/api/services.api";
import { mediaApi } from "@/lib/api/media.api";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";
import type { Service } from "@/admin/types/service";
import type { MediaItem } from "@/admin/types/media";

const Services = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [formOpen, setFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  const params = { per_page: perPage, page, ...(search.trim() && { q: search.trim() }) };

  const { data: servicesResponse, isLoading: servicesLoading } = useQuery({
    queryKey: ['services', 'admin', params],
    queryFn: () => servicesApi.adminList(params),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: mediaResponse, isLoading: mediaLoading } = useQuery({
    queryKey: ['media', 'admin', { per_page: 100 }],
    queryFn: () => mediaApi.adminList({ per_page: 100 }),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const items = servicesResponse?.data || [];
  const mediaItems = mediaResponse?.data || [];
  const loading = servicesLoading || mediaLoading;
  const pagination = servicesResponse
    ? {
        currentPage: servicesResponse.current_page,
        lastPage: servicesResponse.last_page,
        perPage: servicesResponse.per_page,
        total: servicesResponse.total,
      }
    : null;

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

  const createMutation = useMutation({
    mutationFn: (data: ServiceFormData) => servicesApi.adminCreate({
      title: data.title,
      description: data.description,
      category: data.category,
      imageId: data.imageId ? Number(data.imageId) : undefined,
      coverId: data.coverId ? Number(data.coverId) : undefined,
      tags: data.tags || [],
      ctaLabel: data.ctaLabel,
      ctaLink: data.ctaLink,
      status: "published",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', 'admin'] });
      toast.success("Услуга создана");
      setFormOpen(false);
      setEditingService(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ServiceFormData }) => servicesApi.adminUpdate(id, {
      title: data.title,
      description: data.description,
      category: data.category,
      imageId: data.imageId ? Number(data.imageId) : undefined,
      coverId: data.coverId ? Number(data.coverId) : undefined,
      tags: data.tags || [],
      ctaLabel: data.ctaLabel,
      ctaLink: data.ctaLink,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', 'admin'] });
      toast.success("Услуга обновлена");
      setFormOpen(false);
      setEditingService(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => servicesApi.adminDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', 'admin'] });
      toast.success("Услуга удалена");
      setDeleteTarget(null);
    },
  });

  const handleSubmit = async (data: ServiceFormData) => {
    if (editingService) {
      await updateMutation.mutateAsync({ id: Number(editingService.id), data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleDeleteClick = (service: Service) => {
    setDeleteTarget(service);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteMutation.mutate(Number(deleteTarget.id));
    }
  };

  // Search is handled on backend, but we can add client-side filtering if needed
  // For now, just use items directly since backend handles search via 'q' parameter
  const filtered = items;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-sm text-muted-foreground ml-3">Загрузка услуг...</div>
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
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset to first page on search
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // Trigger refetch with search query
              queryClient.invalidateQueries({ queryKey: ['services', 'admin'] });
            }
          }}
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
            setPage(1); // Reset to first page when changing per_page
          }}
        />
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
