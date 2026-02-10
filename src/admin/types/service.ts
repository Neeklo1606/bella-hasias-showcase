export type Service = {
  id: string;
  title: string;
  description: string;
  category?: string;
  order?: number;
  imageId: string;
  coverId?: string;
  tags: string[];
  ctaLabel: string;
  ctaLink: string;
  updatedAt: string;
};
