import { useState } from "react";
import { Check, ChevronsUpDown, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { MediaItem } from "@/admin/types/media";

const isVideo = (src: string) =>
  /\.(mp4|webm)$/i.test(src) || src.startsWith("data:video/");

type MediaMultiSelectProps = {
  value: string[];
  onChange: (ids: string[]) => void;
  items: MediaItem[];
  placeholder?: string;
  label?: string;
  filterImagesOnly?: boolean;
};

const MediaMultiSelect = ({
  value,
  onChange,
  items,
  placeholder = "Выберите медиа",
  label = "Медиа",
  filterImagesOnly = false,
}: MediaMultiSelectProps) => {
  const [open, setOpen] = useState(false);

  const filtered = filterImagesOnly
    ? items.filter((m) => !isVideo(m.src))
    : items;

  const selected = filtered.filter((m) => value.includes(m.id));

  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((x) => x !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const remove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((x) => x !== id));
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="flex flex-wrap gap-2">
        {selected.map((item) => (
          <span
            key={item.id}
            className="group relative inline-flex h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted"
          >
            {isVideo(item.src) ? (
              <div className="flex h-full w-full items-center justify-center">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
              />
            )}
            <button
              type="button"
              onClick={(e) => remove(item.id, e)}
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Удалить"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 shrink-0"
              type="button"
            >
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Поиск..." />
              <CommandList>
                <CommandEmpty>Медиа не найдено</CommandEmpty>
                <CommandGroup>
                  {filtered.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.alt} ${item.filename}`}
                      onSelect={() => toggle(item.id)}
                    >
                      <span className="relative mr-3 h-10 w-10 shrink-0 overflow-hidden rounded bg-muted">
                        {isVideo(item.src) ? (
                          <ImageIcon className="absolute inset-0 m-auto h-5 w-5 text-muted-foreground" />
                        ) : (
                          <img
                            src={item.src}
                            alt={item.alt}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </span>
                      <span className="truncate flex-1">{item.alt || item.filename}</span>
                      <Check
                        className={cn(
                          "h-4 w-4 shrink-0",
                          value.includes(item.id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {selected.length === 0 && (
        <p className="text-xs text-muted-foreground">{placeholder}</p>
      )}
    </div>
  );
};

export default MediaMultiSelect;
