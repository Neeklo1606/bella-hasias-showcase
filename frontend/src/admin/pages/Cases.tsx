import { useState } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import CaseCard from "@/admin/components/CaseCard";
import CaseForm, { type CaseFormData } from "@/admin/components/CaseForm";
import ConfirmDialog from "@/admin/components/ConfirmDialog";
import Pagination from "@/admin/components/Pagination";
import { casesApi } from "@/lib/api/cases.api";
import { servicesApi } from "@/lib/api/services.api";
import { mediaApi } from "@/lib/api/media.api";
import { useResolvedMediaItems } from "@/hooks/use-resolved-media";
import type { CaseItem } from "@/admin/types/case";
import type { MediaItem } from "@/admin/types/media";
import type { Service } from "@/admin/types/service";

const Cases = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CaseItem | null>(null);

  const params = { per_page: perPage, page, ...(search.trim() && { q: search.trim() }) };

  const { data: casesResponse, isLoading: casesLoading } = useQuery({
    queryKey: ['cases', 'admin', params],
    queryFn: () => casesApi.adminList(params),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: servicesResponse, isLoading: servicesLoading } = useQuery({
    queryKey: ['services', 'admin', { per_page: 100 }],
    queryFn: () => servicesApi.adminList({ per_page: 100 }),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: mediaResponse, isLoading: mediaLoading } = useQuery({
    queryKey: ['media', 'admin', { per_page: 100 }],
    queryFn: () => mediaApi.adminList({ per_page: 100 }),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const items = casesResponse?.data || [];
  const services = servicesResponse?.data || [];
  const mediaItems = mediaResponse?.data || [];
  const loading = casesLoading || servicesLoading || mediaLoading;
  const pagination = casesResponse
    ? {
        currentPage: casesResponse.current_page,
        lastPage: casesResponse.last_page,
        perPage: casesResponse.per_page,
        total: casesResponse.total,
      }
    : null;

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

  const createMutation = useMutation({
    mutationFn: (data: CaseFormData) => casesApi.adminCreate({
      title: data.title,
      slug: data.slug,
      description: data.description,
      serviceId: data.serviceId ? Number(data.serviceId) : undefined,
      mediaIds: data.mediaIds ? data.mediaIds.map((id) => Number(id)) : [],
      tags: data.tags || [],
      status: data.status || "published",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases', 'admin'] });
      toast.success("Кейс создан");
      setFormOpen(false);
      setEditingCase(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CaseFormData }) => casesApi.adminUpdate(id, {
      title: data.title,
      slug: data.slug,
      description: data.description,
      serviceId: data.serviceId ? Number(data.serviceId) : undefined,
      mediaIds: data.mediaIds ? data.mediaIds.map((id) => Number(id)) : [],
      tags: data.tags || [],
      status: data.status || "published",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases', 'admin'] });
      toast.success("Кейс обновлён");
      setFormOpen(false);
      setEditingCase(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => casesApi.adminDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases', 'admin'] });
      toast.success("Кейс удалён");
      setDeleteTarget(null);
    },
  });

  const handleEdit = (caseItem: CaseItem) => {
    setEditingCase(caseItem);
    setFormOpen(true);
  };

  const handleSubmit = async (data: CaseFormData) => {
    if (editingCase) {
      await updateMutation.mutateAsync({ id: Number(editingCase.id), data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleDeleteClick = (caseItem: CaseItem) => {
    setDeleteTarget(caseItem);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteMutation.mutate(Number(deleteTarget.id));
    }
  };

  // Search is handled on backend
  const filtered = items;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-sm text-muted-foreground ml-3">Загрузка кейсов...</div>
      </div>
    );
  }

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
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset to first page on search
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              queryClient.invalidateQueries({ queryKey: ['cases', 'admin'] });
            }
          }}
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

      {filtered.length === 0 && !loading && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {pagination?.total === 0
            ? "Нет кейсов. Добавьте первый."
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
            setPage(1);
          }}
        />
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
