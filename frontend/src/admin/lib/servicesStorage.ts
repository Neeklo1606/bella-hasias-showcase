import type { Service } from "@/admin/types/service";
import servicesSeed from "@/data/services.json";

export const SERVICES_STORAGE_KEY = "cms_services";

const normalizeCategory = (category?: string) => {
  switch (category) {
    case "styling":
      return "stylist";
    case "ugc":
    case "photo":
    case "brand":
    case "shoot":
      return "creator";
    default:
      return category;
  }
};

export const loadServices = (): Service[] => {
  try {
    const stored = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Service[];
      if (Array.isArray(parsed)) {
        return parsed.map((item) => ({
          ...item,
          category: normalizeCategory(item.category),
        }));
      }
    }
  } catch {
    // ignore
  }
  return (servicesSeed as Service[]).map((item) => ({
    ...item,
    category: normalizeCategory(item.category),
  }));
};

export const saveServices = (items: Service[]) => {
  localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(items));
};
