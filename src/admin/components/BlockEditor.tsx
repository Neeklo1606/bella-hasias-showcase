import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Pencil,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, Reorder } from "framer-motion";
import type { BlockItem, BlockType } from "@/admin/types/page";
import { BLOCK_TYPE_LABELS } from "@/admin/types/page";
import BlockItemEditor from "./BlockItemEditor";
import ConfirmDialog from "./ConfirmDialog";

type BlockEditorProps = {
  blocks: BlockItem[];
  onChange: (blocks: BlockItem[]) => void;
  mediaItems: import("@/admin/types/media").MediaItem[];
};

const generateBlockId = () => `b-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const BlockEditor = ({ blocks, onChange, mediaItems }: BlockEditorProps) => {
  const [editingBlock, setEditingBlock] = useState<BlockItem | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [addType, setAddType] = useState<BlockType>("text");
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BlockItem | null>(null);

  const move = (index: number, dir: 1 | -1) => {
    const next = [...blocks];
    const ni = index + dir;
    if (ni < 0 || ni >= next.length) return;
    [next[index], next[ni]] = [next[ni], next[index]];
    onChange(next);
  };

  const toggleVisible = (id: string) => {
    onChange(
      blocks.map((b) => (b.id === id ? { ...b, visible: !b.visible } : b))
    );
  };

  const handleEdit = (block: BlockItem) => {
    setEditingBlock(block);
    setEditorOpen(true);
  };

  const handleSaveBlock = (data: Record<string, unknown>) => {
    if (!editingBlock) return;
    onChange(
      blocks.map((b) =>
        b.id === editingBlock.id ? { ...b, data } : b
      )
    );
    setEditorOpen(false);
    setEditingBlock(null);
  };

  const handleAdd = () => {
    const defaults: Record<BlockType, Record<string, unknown>> = {
      hero: { title: "", subtitle: "" },
      text: { markdown: "" },
      cta: { title: "", markdown: "", ctaLabel: "", ctaLink: "" },
      services: { title: "Услуги", subtitle: "" },
      portfolio: { title: "Портфолио", subtitle: "" },
      contacts: { title: "Контакты", subtitle: "" },
      custom: { markdown: "" },
    };
    const newBlock: BlockItem = {
      id: generateBlockId(),
      type: addType,
      visible: true,
      data: defaults[addType],
    };
    onChange([...blocks, newBlock]);
    setAddOpen(false);
  };

  const handleDelete = (block: BlockItem) => {
    setDeleteTarget(block);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      onChange(blocks.filter((b) => b.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Блоки</span>
        <Button type="button" variant="outline" size="sm" onClick={() => setAddOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Добавить
        </Button>
      </div>

      <Reorder.Group
        axis="y"
        values={blocks}
        onReorder={onChange}
        className="space-y-2"
      >
        <AnimatePresence>
          {blocks.map((block, index) => (
            <Reorder.Item
              key={block.id}
              value={block}
              className="flex items-center gap-2 rounded-lg border bg-card p-3"
            >
              <div className="flex cursor-grab touch-none items-center text-muted-foreground">
                <GripVertical className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {BLOCK_TYPE_LABELS[block.type]}
                  {block.data?.title && ` — ${String(block.data.title)}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {block.visible ? "Видим" : "Скрыт"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => toggleVisible(block.id)}
                  title={block.visible ? "Скрыть" : "Показать"}
                >
                  {block.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => move(index, 1)}
                  disabled={index === blocks.length - 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(block)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(block)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      <BlockItemEditor
        open={editorOpen}
        onOpenChange={setEditorOpen}
        block={editingBlock}
        mediaItems={mediaItems}
        onSave={handleSaveBlock}
      />

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить блок</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Тип блока</Label>
              <Select value={addType} onValueChange={(v) => setAddType(v as BlockType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(BLOCK_TYPE_LABELS) as [BlockType, string][]).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAdd}>Добавить</Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Удалить блок?"
        description="Блок будет удалён со страницы."
        confirmLabel="Удалить"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default BlockEditor;
