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
import MediaSelect from "./MediaSelect";
import TagsInput from "./TagsInput";
import type { Service } from "@/admin/types/service";
import type { MediaItem } from "@/admin/types/media";

export type ServiceFormData = Omit<Service, "id" | "updatedAt">;

const SERVICE_CATEGORIES = [
  { value: "stylist", label: "Стилист" },
  { value: "creator", label: "Креатор" },
];

type ServiceFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  mediaItems: MediaItem[];
  onSubmit: (data: ServiceFormData) => void;
};

const emptyForm: ServiceFormData = {
  title: "",
  description: "",
  category: "stylist",
  imageId: "",
  tags: [],
  ctaLabel: "",
  ctaLink: "",
};

const ServiceForm = ({
  open,
  onOpenChange,
  service,
  mediaItems,
  onSubmit,
}: ServiceFormProps) => {
  const [form, setForm] = useState<ServiceFormData>(emptyForm);

  useEffect(() => {
    if (service) {
      setForm({
        title: service.title,
        description: service.description,
        category: service.category,
        imageId: service.imageId,
        coverId: service.coverId,
        tags: service.tags ?? [],
        ctaLabel: service.ctaLabel,
        ctaLink: service.ctaLink,
      });
    } else {
      setForm({
        ...emptyForm,
        imageId: mediaItems[0]?.id ?? "",
      });
    }
  }, [service, mediaItems, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (!form.imageId && mediaItems.length > 0) {
      setForm((f) => ({ ...f, imageId: mediaItems[0].id }));
    }
    onSubmit(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {service ? "Редактировать услугу" : "Новая услуга"}
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
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Название услуги"
              required
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
              placeholder="Описание услуги. Поддерживается Markdown."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Категория</Label>
            <Select
              value={form.category ?? "stylist"}
              onValueChange={(value) =>
                setForm((f) => ({ ...f, category: value }))
              }
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Теги</Label>
            <TagsInput
              value={form.tags}
              onChange={(tags) => setForm((f) => ({ ...f, tags }))}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <MediaSelect
              label="Превью (imageId)"
              value={form.imageId}
              onChange={(id) => setForm((f) => ({ ...f, imageId: id }))}
              items={mediaItems}
              placeholder="Выберите изображение"
            />
            <MediaSelect
              label="Обложка (опционально)"
              value={form.coverId ?? ""}
              onChange={(id) =>
                setForm((f) => ({ ...f, coverId: id || undefined }))
              }
              items={mediaItems}
              placeholder="Без обложки"
              allowEmpty
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaLabel">CTA — Подпись кнопки</Label>
            <Input
              id="ctaLabel"
              value={form.ctaLabel}
              onChange={(e) =>
                setForm((f) => ({ ...f, ctaLabel: e.target.value }))
              }
              placeholder="Записаться"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaLink">CTA — Ссылка</Label>
            <Input
              id="ctaLink"
              value={form.ctaLink}
              onChange={(e) =>
                setForm((f) => ({ ...f, ctaLink: e.target.value }))
              }
              placeholder="/services/stylist"
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

export default ServiceForm;
