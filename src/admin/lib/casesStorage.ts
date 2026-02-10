import type { CaseItem } from "@/admin/types/case";
import casesSeed from "@/data/cases.json";
import { apiGet, apiPost } from "@/admin/lib/apiClient";

let casesCache: CaseItem[] = casesSeed as CaseItem[];

export const loadCases = (): CaseItem[] => {
  return casesCache;
};

export const fetchCases = async (): Promise<CaseItem[]> => {
  try {
    const data = await apiGet<CaseItem[]>("/cases");
    if (Array.isArray(data)) {
      casesCache = data;
    }
  } catch {
    // ignore, keep cache
  }
  return casesCache;
};

export const saveCases = async (items: CaseItem[]) => {
  casesCache = items;
  await apiPost<CaseItem[], CaseItem[]>("/cases", items);
  return casesCache;
};
