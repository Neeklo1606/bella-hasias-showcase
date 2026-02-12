export type Service = {
  id: string;
  title: string;
  slug?: string;
  description: string;
  category?: string;
  imageId: string;
  coverId?: string;
  tags: string[];
  ctaLabel: string;
  ctaLink: string;
  updatedAt: string;
};
