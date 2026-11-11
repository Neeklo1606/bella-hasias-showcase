/**
 * Фото из репозитория — запасной вариант, пока в админке (база) нет загруженных картинок.
 * vite-imagetools на этапе сборки делает уменьшенные WebP-копии, поэтому браузер
 * не качает исходники по 2000 px ради карточки шириной 400 px.
 */
import brandStyling from "@/assets/service-brand-styling.jpg?w=800&format=webp";
import clientShoot from "@/assets/service-client-shoot.jpg?w=800&format=webp";
import photographer from "@/assets/service-photographer.jpg?w=800&format=webp";
import stylist from "@/assets/service-stylist.jpg?w=800&format=webp";
import ugc from "@/assets/service-ugc.jpg?w=800&format=webp";
import wardrobe from "@/assets/service-wardrobe.jpg?w=800&format=webp";
import portfolio1 from "@/assets/portfolio-1.jpg?w=800&format=webp";
import portfolio2 from "@/assets/portfolio-2.jpg?w=800&format=webp";
import portfolio3 from "@/assets/portfolio-3.jpg?w=800&format=webp";

/** Картинка услуги по slug (используется, если у услуги в админке нет обложки). */
export const SERVICE_IMAGES: Record<string, string> = {
  "brand-styling": brandStyling,
  "wardrobe-audit": stylist,
  "personal-shopping": portfolio3,
  "capsule-wardrobe": wardrobe,
  "event-look": portfolio1,
  "client-shoot": clientShoot,
  ugc,
  "ai-content": portfolio2,
  "photo-video": photographer,
};

export const serviceImage = (slug?: string | null) => (slug && SERVICE_IMAGES[slug]) || "";

type Work = { id: string; thumb: string; full: string; alt: string };

const thumbs = import.meta.glob("@/assets/portfolio/IMG_*.{JPG,jpg,PNG,png,WEBP,webp}", {
  eager: true,
  import: "default",
  query: "?w=640&format=webp",
}) as Record<string, string>;

const fulls = import.meta.glob("@/assets/portfolio/IMG_*.{JPG,jpg,PNG,png,WEBP,webp}", {
  eager: true,
  import: "default",
  query: "?w=1600&format=webp",
}) as Record<string, string>;

/** Все работы портфолио из репозитория, отсортированные по имени файла. */
export const PORTFOLIO_WORKS: Work[] = Object.keys(thumbs)
  .map((path) => {
    const filename = path.split("/").pop() ?? path;
    return { id: filename, thumb: thumbs[path], full: fulls[path] ?? thumbs[path], alt: "Работа стилиста Bella Hasias" };
  })
  .sort((a, b) => a.id.localeCompare(b.id, "en", { numeric: true }));
