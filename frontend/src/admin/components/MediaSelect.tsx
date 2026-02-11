import { useState } from "react";
import { Check, ChevronsUpDown, ImageIcon } from "lucide-react";
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

type MediaSelectProps = {
  value: string;
  onChange: (id: string) => void;
  items: MediaItem[];
  placeholder?: string;
  label?: string;
  filterImagesOnly?: boolean;
  allowEmpty?: boolean;
};

const MediaSelect = ({
  value,
  onChange,
  items,
  placeholder = "Выберите медиа",
  label = "Изображение",
  filterImagesOnly = true,
  allowEmpty = false,
}: MediaSelectProps) => {
  const [open, setOpen] = useState(false);

  const filtered = filterImagesOnly
    ? items.filter((m) => !isVideo(m.src))
    : items;

  const selected = filtered.find((m) => m.id === value);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            <span className="flex items-center gap-2 truncate">
              {selected ? (
                <>
                  <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded bg-muted">
                    {isVideo(selected.src) ? (
                      <ImageIcon className="absolute inset-0 m-auto h-4 w-4 text-muted-foreground" />
                    ) : (
                      <img
                        src={selected.src}
                        alt={selected.alt}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </span>
                  <span className="truncate">{selected.alt || selected.filename}</span>
                </>
              ) : (
                placeholder
              )}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Поиск..." />
            <CommandList>
              <CommandEmpty>Медиа не найдено</CommandEmpty>
              <CommandGroup>
                {allowEmpty && (
                  <CommandItem
                    value="без выбора нет empty"
                    onSelect={() => {
                      onChange("");
                      setOpen(false);
                    }}
                  >
                    <span className="text-muted-foreground">Без выбора</span>
                    <Check className={cn("h-4 w-4 shrink-0", !value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                )}
                {filtered.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.alt} ${item.filename}`}
                    onSelect={() => {
                      onChange(item.id);
                      setOpen(false);
                    }}
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
                        value === item.id ? "opacity-100" : "opacity-0"
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
  );
};

export default MediaSelect;
