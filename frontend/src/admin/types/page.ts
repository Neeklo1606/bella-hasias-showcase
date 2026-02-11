export type BlockType =
  | "hero"
  | "text"
  | "cta"
  | "services"
  | "portfolio"
  | "contacts"
  | "custom";

export type BlockItem = {
  id: string;
  type: BlockType;
  visible: boolean;
  data: Record<string, unknown>;
};

export type PageSEO = {
  metaTitle: string;
  metaDescription: string;
  ogImageId?: string;
  index: boolean;
};

export type PageItem = {
  id: string;
  slug: string;
  title: string;
  blocks: BlockItem[];
  seo?: PageSEO;
  updatedAt: string;
};

export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  hero: "Hero",
  text: "Текст (Markdown)",
  cta: "CTA-блок",
  services: "Услуги",
  portfolio: "Портфолио",
  contacts: "Контакты",
  custom: "Произвольный блок",
};
