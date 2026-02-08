import type { CaseItem } from "@/admin/types/case";
import casesSeed from "@/data/cases.json";

export const CASES_STORAGE_KEY = "cms_cases";

export const loadCases = (): CaseItem[] => {
  try {
    const stored = localStorage.getItem(CASES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as CaseItem[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return casesSeed as CaseItem[];
};

export const saveCases = (items: CaseItem[]) => {
  localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(items));
};
