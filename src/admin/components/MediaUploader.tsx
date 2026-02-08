import { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPTED_TYPES } from "@/admin/types/media";

type MediaUploaderProps = {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
};

const MediaUploader = ({ onFilesSelected, disabled }: MediaUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      const accepted = Array.from(files).filter((f) => {
        const ext = "." + f.name.split(".").pop()?.toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp", ".mp4", ".webm"].includes(ext);
      });
      if (accepted.length) onFilesSelected(accepted);
    },
    [onFilesSelected]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles, disabled]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false);
  }, []);

  const onBrowse = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={onBrowse}
      className={cn(
        "relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 transition-colors",
        "hover:border-primary/50 hover:bg-muted/50",
        isDragging && "border-primary bg-primary/5",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_TYPES}
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <div className="rounded-full bg-muted p-3">
        <Upload className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="text-center text-sm font-medium text-foreground">
        Перетащите файлы сюда или нажмите для выбора
      </p>
      <p className="text-center text-xs text-muted-foreground">
        JPG, PNG, WebP, MP4, WebM
      </p>
    </div>
  );
};

export default MediaUploader;
