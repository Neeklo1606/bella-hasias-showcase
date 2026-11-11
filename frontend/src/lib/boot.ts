/**
 * Данные, встроенные сервером в HTML (window.__BOOT__): услуги и кейсы.
 * Используются как initialData React Query — первый рендер сразу с карточками,
 * без скелетона и без перерисовки после ответа API.
 */
type RawList = { data: any[]; [key: string]: unknown };

const boot = (typeof window !== "undefined" ? (window as any).__BOOT__ : undefined) as
  | { services?: RawList; cases?: RawList }
  | undefined;

export const bootServices = () => {
  const raw = boot?.services;
  if (!raw?.data) return undefined;
  return {
    ...raw,
    data: raw.data.map((s: any) => ({
      ...s,
      id: String(s.id),
      imageId: s.image?.id ? String(s.image.id) : s.imageId || "",
      coverId: s.cover?.id ? String(s.cover.id) : s.coverId || "",
    })),
  } as any;
};

export const bootCases = () => {
  const raw = boot?.cases;
  if (!raw?.data) return undefined;
  return {
    ...raw,
    data: raw.data.map((c: any) => ({
      ...c,
      id: String(c.id),
      serviceId: c.serviceId ? String(c.serviceId) : "",
      mediaIds: c.mediaIds ? c.mediaIds.map((id: number) => String(id)) : [],
      media: c.media || [],
    })),
  } as any;
};

export const bootServiceBySlug = (slug?: string) => {
  const s = boot?.services?.data?.find((x: any) => x.slug === slug);
  if (!s) return undefined;
  return {
    ...s,
    id: String(s.id),
    imageId: s.image?.id ? String(s.image.id) : "",
    coverId: s.cover?.id ? String(s.cover.id) : "",
  } as any;
};
