import type { Service } from "@/admin/types/service";
import servicesSeed from "@/data/services.json";
import { apiGet, apiPost } from "@/admin/lib/apiClient";

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

let servicesCache: Service[] = (servicesSeed as Service[]).map((item) => ({
  ...item,
  category: normalizeCategory(item.category),
}));

export const loadServices = (): Service[] => {
  return servicesCache;
};

export const fetchServices = async (): Promise<Service[]> => {
  try {
    const data = await apiGet<Service[]>("/services");
    if (Array.isArray(data)) {
      servicesCache = data.map((item) => ({
        ...item,
        category: normalizeCategory(item.category),
      }));
    }
  } catch {
    // ignore, keep cache
  }
  return servicesCache;
};

export const saveServices = async (items: Service[]) => {
  servicesCache = items.map((item) => ({
    ...item,
    category: normalizeCategory(item.category),
  }));
  await apiPost<Service[], Service[]>("/services", servicesCache);
  return servicesCache;
};
