import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, Trash2, ImageIcon, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import type { CaseItem } from "@/admin/types/case";
import type { MediaItem } from "@/admin/types/media";
import type { Service } from "@/admin/types/service";

type CaseCardProps = {
  caseItem: CaseItem;
  mediaMap: Map<string, MediaItem>;
  serviceMap: Map<string, Service>;
  onEdit: (caseItem: CaseItem) => void;
  onDelete: (caseItem: CaseItem) => void;
};

const CaseCard = ({
  caseItem,
  mediaMap,
  serviceMap,
  onEdit,
  onDelete,
}: CaseCardProps) => {
  const firstMediaId = caseItem.mediaIds[0];
  const media = firstMediaId ? mediaMap.get(firstMediaId) : null;
  const service = caseItem.serviceId ? serviceMap.get(caseItem.serviceId) : null;
  const isVideo = media?.src && /\.(mp4|webm)$/i.test(media.src);

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
            {media && !isVideo ? (
              <img
                src={media.src}
                alt={caseItem.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : media && isVideo ? (
              <video
                src={media.src}
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
            {service && (
              <Badge className="absolute left-2 top-2" variant="secondary">
                {service.title}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3 border-t p-4">
          <div className="w-full">
            <h3 className="font-semibold truncate">{caseItem.title}</h3>
            {caseItem.tags.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {caseItem.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Обновлено:{" "}
              {formatDistanceToNow(new Date(caseItem.updatedAt), {
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
              onClick={() => onEdit(caseItem)}
            >
              <Pencil className="mr-1 h-3 w-3" />
              Редактировать
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/portfolio/${caseItem.slug}`} target="_blank">
                <ExternalLink className="mr-1 h-3 w-3" />
                Смотреть
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => onDelete(caseItem)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CaseCard;
