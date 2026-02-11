import { motion, AnimatePresence } from "framer-motion";
import MediaCard from "./MediaCard";
import type { MediaItem } from "@/admin/types/media";

type MediaGridProps = {
  items: MediaItem[];
  onEdit: (item: MediaItem) => void;
  onDelete: (id: string) => void;
  onCategoryChange: (id: string, category: import("@/admin/types/media").MediaCategory) => void;
};

const MediaGrid = ({
  items,
  onEdit,
  onDelete,
  onCategoryChange,
}: MediaGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            layout
          >
            <MediaCard
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onCategoryChange={onCategoryChange}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MediaGrid;
