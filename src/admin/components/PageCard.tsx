import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, ExternalLink, FileText } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import type { PageItem } from "@/admin/types/page";

type PageCardProps = {
  page: PageItem;
  onEdit: (page: PageItem) => void;
};

const PageCard = ({ page, onEdit }: PageCardProps) => {
  const path = page.slug === "home" ? "/" : `/${page.slug}`;
  const blockCount = page.blocks?.length ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold">{page.title}</h3>
            <p className="text-sm text-muted-foreground">
              /{page.slug} · {blockCount} блоков
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Обновлено:{" "}
              {formatDistanceToNow(new Date(page.updatedAt), {
                addSuffix: true,
                locale: ru,
              })}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 border-t p-4">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(page)}>
            <Pencil className="mr-1 h-3 w-3" />
            Редактировать
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to={path} target="_blank">
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PageCard;
