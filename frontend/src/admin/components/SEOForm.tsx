import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, ExternalLink } from "lucide-react";
import MediaSelect from "./MediaSelect";
import type { PageItem, PageSEO } from "@/admin/types/page";
import type { MediaItem } from "@/admin/types/media";

const META_TITLE_MAX = 60;
const META_DESC_MAX = 160;

type SEOFormProps = {
  page: PageItem;
  mediaItems: MediaItem[];
  onSave: (seo: PageSEO) => void;
  publicPath: string;
};

const SEOForm = ({
  page,
  mediaItems,
  onSave,
  publicPath,
}: SEOFormProps) => {
  const seo = page.seo ?? {
    metaTitle: "",
    metaDescription: "",
    index: true,
  };

  const [metaTitle, setMetaTitle] = useState(seo.metaTitle);
  const [metaDescription, setMetaDescription] = useState(seo.metaDescription);
  const [ogImageId, setOgImageId] = useState(seo.ogImageId ?? "");
  const [index, setIndex] = useState(seo.index);

  useEffect(() => {
    setMetaTitle(seo.metaTitle);
    setMetaDescription(seo.metaDescription);
    setOgImageId(seo.ogImageId ?? "");
    setIndex(seo.index);
  }, [page.id, seo.metaTitle, seo.metaDescription, seo.ogImageId, seo.index]);

  const handleSave = () => {
    onSave({
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
      ogImageId: ogImageId || undefined,
      index,
    });
  };

  const titleLen = metaTitle.length;
  const descLen = metaDescription.length;
  const titleOk = titleLen <= META_TITLE_MAX;
  const descOk = descLen <= META_DESC_MAX;

  return (
    <TooltipProvider>
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{page.title}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={publicPath} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3 w-3" />
                На сайте
              </a>
            </Button>
            <Button size="sm" onClick={handleSave}>
              Сохранить
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor={`metaTitle-${page.id}`}>Meta Title</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                Заголовок для поисковой выдачи. Рекомендуется до 60 символов.
              </TooltipContent>
            </Tooltip>
            <span
              className={`ml-auto text-xs ${titleOk ? "text-muted-foreground" : "text-destructive"}`}
            >
              {titleLen}/{META_TITLE_MAX}
            </span>
          </div>
          <Input
            id={`metaTitle-${page.id}`}
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="Заголовок страницы | Bella Hasias"
            className={!titleOk ? "border-destructive" : ""}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor={`metaDesc-${page.id}`}>Meta Description</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                Описание для сниппета в поиске. Рекомендуется до 160 символов.
              </TooltipContent>
            </Tooltip>
            <span
              className={`ml-auto text-xs ${descOk ? "text-muted-foreground" : "text-destructive"}`}
            >
              {descLen}/{META_DESC_MAX}
            </span>
          </div>
          <Textarea
            id={`metaDesc-${page.id}`}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Краткое описание страницы для поисковых систем"
            rows={2}
            className={!descOk ? "border-destructive" : ""}
          />
        </div>

        <MediaSelect
          label="OG Image"
          value={ogImageId}
          onChange={setOgImageId}
          items={mediaItems}
          allowEmpty
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor={`index-${page.id}`}>Индексация</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                index — страница в поиске. noindex — не индексировать.
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium ${index ? "text-green-600" : "text-amber-600"}`}
            >
              {index ? "index" : "noindex"}
            </span>
            <Switch
              id={`index-${page.id}`}
              checked={index}
              onCheckedChange={setIndex}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SEOForm;
