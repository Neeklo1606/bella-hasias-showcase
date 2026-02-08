import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

type CMSMediaUploaderProps = {
  title?: string;
  description?: string;
};

const CMSMediaUploader = ({
  title = "Загрузка медиа",
  description = "Перетащите файлы или выберите вручную.",
}: CMSMediaUploaderProps) => {
  return (
    <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-background">
        <Upload className="h-5 w-5 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      <Button type="button" variant="outline" className="mt-4">
        Выбрать файлы
      </Button>
    </div>
  );
};

export default CMSMediaUploader;
