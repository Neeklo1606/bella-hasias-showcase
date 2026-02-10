export type CaseItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  serviceId: string;
  mediaIds: string[];
  tags: string[];
  order?: number;
  createdAt: string;
  updatedAt: string;
};
