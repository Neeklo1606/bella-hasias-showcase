import { motion } from "framer-motion";
import { Pencil, Trash2, ImageIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import type { Service } from "@/admin/types/service";
import type { MediaItem } from "@/admin/types/media";

type ServiceCardProps = {
  service: Service;
  mediaMap: Map<string, MediaItem>;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
};

const ServiceCard = ({
  service,
  mediaMap,
  onEdit,
  onDelete,
}: ServiceCardProps) => {
  const media = mediaMap.get(service.imageId);
  const categoryLabel =
    service.category === "stylist"
      ? "Стилист"
      : service.category === "creator"
      ? "Креатор"
      : service.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card className="group overflow-hidden transition-shadow hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] bg-muted">
            {media && !media.src.startsWith("data:video") ? (
              <img
                src={media.src}
                alt={service.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3 border-t p-4">
          <div className="w-full">
            <h3 className="font-semibold truncate">{service.title}</h3>
            {categoryLabel && (
              <div className="mt-1.5">
                <Badge variant="outline" className="text-xs">
                  {categoryLabel}
                </Badge>
              </div>
            )}
            {service.tags.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {service.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Обновлено:{" "}
              {formatDistanceToNow(new Date(service.updatedAt), {
                addSuffix: true,
                locale: ru,
              })}
            </p>
          </div>
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onEdit(service)}
            >
              <Pencil className="mr-1 h-3 w-3" />
              Редактировать
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => onDelete(service)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
