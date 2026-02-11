import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import type { MediaItem } from "@/admin/types/media";

const isVideo = (src: string) =>
  /\.(mp4|webm)$/i.test(src) || src.startsWith("data:video/");

type RecentMediaProps = {
  items: MediaItem[];
  limit?: number;
};

const RecentMedia = ({ items, limit = 4 }: RecentMediaProps) => {
  const recent = items.slice(0, limit);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-base font-semibold">Последние медиа</h3>
        <Link
          to="/admin/media"
          className="text-xs text-primary hover:underline"
        >
          Все медиа
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {recent.map((item) => (
            <a
              key={item.id}
              href={item.src.startsWith("data:") ? "#" : item.src}
              target={item.src.startsWith("data:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-secondary"
            >
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
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="truncate text-xs font-medium text-white">
                  {item.alt || item.filename}
                </p>
              </div>
            </a>
          ))}
        </div>
        {items.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-6">
            Нет загруженных медиа
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentMedia;
