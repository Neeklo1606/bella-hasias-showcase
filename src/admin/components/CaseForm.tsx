import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MediaMultiSelect from "./MediaMultiSelect";
import TagsInput from "./TagsInput";
import type { CaseItem } from "@/admin/types/case";
import type { MediaItem } from "@/admin/types/media";
import type { Service } from "@/admin/types/service";

export type CaseFormData = Omit<CaseItem, "id" | "createdAt" | "updatedAt">;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

type CaseFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseItem: CaseItem | null;
  services: Service[];
  mediaItems: MediaItem[];
  onSubmit: (data: CaseFormData) => void;
};

const emptyForm: CaseFormData = {
  title: "",
  slug: "",
  description: "",
  serviceId: "",
  mediaIds: [],
  tags: [],
};

const CaseForm = ({
  open,
  onOpenChange,
  caseItem,
  services,
  mediaItems,
  onSubmit,
}: CaseFormProps) => {
  const [form, setForm] = useState<CaseFormData>(emptyForm);
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    if (caseItem) {
      setForm({
        title: caseItem.title,
        slug: caseItem.slug,
        description: caseItem.description,
        serviceId: caseItem.serviceId,
        mediaIds: caseItem.mediaIds ?? [],
        tags: caseItem.tags ?? [],
      });
      setSlugEdited(true);
    } else {
      setForm({
        ...emptyForm,
        serviceId: services[0]?.id ?? "",
      });
      setSlugEdited(false);
    }
  }, [caseItem, services, open]);

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title }));
    if (!slugEdited) {
      setForm((f) => ({ ...f, slug: slugify(title) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (!form.slug.trim()) {
      setForm((f) => ({ ...f, slug: slugify(form.title) }));
    }
    onSubmit(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {caseItem ? "Редактировать кейс" : "Новый кейс"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="sticky top-0 z-10 flex justify-end bg-background/95 py-2 backdrop-blur-sm">
            <Button type="submit" size="sm">
              Сохранить
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Название кейса"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => {
                setForm((f) => ({ ...f, slug: e.target.value }));
                setSlugEdited(true);
              }}
              placeholder="editorial-portrait"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание (Markdown)</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Описание кейса"
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Услуга</Label>
            <Select
              value={form.serviceId}
              onValueChange={(v) => setForm((f) => ({ ...f, serviceId: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите услугу" />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <MediaMultiSelect
            label="Медиа (изображения и видео)"
            value={form.mediaIds}
            onChange={(ids) => setForm((f) => ({ ...f, mediaIds: ids }))}
            items={mediaItems}
            placeholder="Добавьте изображения или видео"
          />

          <div className="space-y-2">
            <Label>Теги</Label>
            <TagsInput
              value={form.tags}
              onChange={(tags) => setForm((f) => ({ ...f, tags }))}
            />
          </div>

          <DialogFooter className="sticky bottom-0 bg-background pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CaseForm;
