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
import MediaSelect from "./MediaSelect";
import type { BlockItem } from "@/admin/types/page";
import type { MediaItem } from "@/admin/types/media";

type BlockItemEditorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  block: BlockItem | null;
  mediaItems: MediaItem[];
  onSave: (data: Record<string, unknown>) => void;
};

const BlockItemEditor = ({
  open,
  onOpenChange,
  block,
  mediaItems,
  onSave,
}: BlockItemEditorProps) => {
  const [data, setData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (block) setData({ ...(block.data ?? {}) });
  }, [block, open]);

  if (!block) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(data);
    onOpenChange(false);
  };

  const update = (key: string, value: unknown) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const renderFields = () => {
    switch (block.type) {
      case "hero":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                value={String(data.title ?? "")}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Подзаголовок</Label>
              <Input
                id="subtitle"
                value={String(data.subtitle ?? "")}
                onChange={(e) => update("subtitle", e.target.value)}
              />
            </div>
            <MediaSelect
              label="Изображение"
              value={String(data.imageId ?? "")}
              onChange={(id) => update("imageId", id)}
              items={mediaItems}
              allowEmpty
            />
          </>
        );
      case "text":
      case "custom":
        return (
          <div className="space-y-2">
            <Label htmlFor="markdown">Markdown</Label>
            <Textarea
              id="markdown"
              value={String(data.markdown ?? "")}
              onChange={(e) => update("markdown", e.target.value)}
              rows={8}
              className="font-mono text-sm"
            />
          </div>
        );
      case "cta":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                value={String(data.title ?? "")}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="markdown">Текст (Markdown)</Label>
              <Textarea
                id="markdown"
                value={String(data.markdown ?? "")}
                onChange={(e) => update("markdown", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaLabel">Подпись кнопки</Label>
              <Input
                id="ctaLabel"
                value={String(data.ctaLabel ?? "")}
                onChange={(e) => update("ctaLabel", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaLink">Ссылка</Label>
              <Input
                id="ctaLink"
                value={String(data.ctaLink ?? "")}
                onChange={(e) => update("ctaLink", e.target.value)}
              />
            </div>
          </>
        );
      case "services":
      case "portfolio":
      case "contacts":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                value={String(data.title ?? "")}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Подзаголовок</Label>
              <Input
                id="subtitle"
                value={String(data.subtitle ?? "")}
                onChange={(e) => update("subtitle", e.target.value)}
              />
            </div>
          </>
        );
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="markdown">Содержимое (Markdown)</Label>
            <Textarea
              id="markdown"
              value={String(data.markdown ?? "")}
              onChange={(e) => update("markdown", e.target.value)}
              rows={6}
            />
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Редактировать блок</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="sticky top-0 z-10 flex justify-end bg-background/95 py-2 backdrop-blur-sm">
            <Button type="submit" size="sm">
              Сохранить
            </Button>
          </div>
          {renderFields()}
          <DialogFooter className="sticky bottom-0 bg-background pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlockItemEditor;
