/// <reference types="vite/client" />

// vite-imagetools: импорт картинки с параметрами (?w=800&format=webp) возвращает URL
declare module "*&format=webp" {
  const src: string;
  export default src;
}
