export type Service = {
  id: string;
  title: string;
  description: string;
  category?: string;
  imageId: string;
  coverId?: string;
  tags: string[];
  ctaLabel: string;
  ctaLink: string;
  updatedAt: string;
};
