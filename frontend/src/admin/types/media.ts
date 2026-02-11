export type MediaCategory =
  | "Услуги"
  | "Кейсы"
  | "Баннеры"
  | "Главная страница"
  | "Прочее";

export type MediaItem = {
  id: string;
  filename: string;
  src: string;
  category: MediaCategory;
  alt: string;
  createdAt: string;
};

export const MEDIA_CATEGORIES: MediaCategory[] = [
  "Услуги",
  "Кейсы",
  "Баннеры",
  "Главная страница",
  "Прочее",
];

export const ACCEPTED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".mp4",
  ".webm",
];

export const ACCEPTED_TYPES =
  "image/jpeg,image/png,image/webp,video/mp4,video/webm";
