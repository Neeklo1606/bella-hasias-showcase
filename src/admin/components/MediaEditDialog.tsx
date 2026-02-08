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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MEDIA_CATEGORIES, type MediaItem, type MediaCategory } from "@/admin/types/media";

type MediaEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MediaItem | null;
  onSave: (id: string, data: { alt: string; category: MediaCategory }) => void;
};

const MediaEditDialog = ({
  open,
  onOpenChange,
  item,
  onSave,
}: MediaEditDialogProps) => {
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState<MediaCategory>("Прочее");

  useEffect(() => {
    if (item) {
      setAlt(item.alt);
      setCategory(item.category);
    }
  }, [item]);

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(item.id, { alt: alt.trim() || item.alt, category });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать медиа</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="sticky top-0 z-10 flex justify-end bg-background/95 py-2 backdrop-blur-sm">
            <Button type="submit" size="sm">
              Сохранить
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="alt">Alt-текст</Label>
            <Input
              id="alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Описание изображения"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Категория</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as MediaCategory)}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MEDIA_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export default MediaEditDialog;
