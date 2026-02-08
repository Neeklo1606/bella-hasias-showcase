import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MEDIA_CATEGORIES, type MediaItem, type MediaCategory } from "@/admin/types/media";

type MediaCardProps = {
  item: MediaItem;
  onEdit: (item: MediaItem) => void;
  onDelete: (id: string) => void;
  onCategoryChange: (id: string, category: MediaCategory) => void;
};

const isVideo = (src: string) =>
  /\.(mp4|webm)$/i.test(src) || src.startsWith("data:video/");

const MediaCard = ({
  item,
  onEdit,
  onDelete,
  onCategoryChange,
}: MediaCardProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(item.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <Card className="group overflow-hidden transition-shadow hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative aspect-square bg-muted">
            {isVideo(item.src) ? (
              <video
                src={item.src}
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t p-3">
          <p
            className="line-clamp-2 text-sm font-medium"
            title={item.alt || item.filename}
          >
            {item.alt || item.filename}
          </p>
          <Select
            value={item.category}
            onValueChange={(v) => onCategoryChange(item.id, v as MediaCategory)}
          >
            <SelectTrigger className="h-8 text-xs">
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onEdit(item)}
            >
              <Pencil className="mr-1 h-3 w-3" />
              Редактировать
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить медиа?</AlertDialogTitle>
            <AlertDialogDescription>
              Файл «{item.filename}» будет удалён из медиатеки. Продолжить?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MediaCard;
