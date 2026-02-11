import apiClient from "../apiClient";
import type { PageItem } from "@/admin/types/page";

export interface PageListParams {
  q?: string;
  status?: string;
  sort?: string;
  per_page?: number;
  page?: number;
}

export interface PageListResponse {
  data: PageItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface CreatePageRequest {
  title: string;
  slug: string;
  blocks?: PageItem["blocks"];
  seo?: PageItem["seo"];
  status: "draft" | "published";
}

export interface UpdatePageRequest extends Partial<CreatePageRequest> {
  id: number;
}

export const pagesApi = {
  /**
   * Get single page by slug (public)
   */
  getBySlug: async (slug: string): Promise<PageItem> => {
    const response = await apiClient.get<any>(`/api/pages/${slug}`);
    const p = response.data;
    return {
      ...p,
      id: String(p.id),
    };
  },

  /**
   * Get list of pages (admin)
   */
  adminList: async (params?: PageListParams): Promise<PageListResponse> => {
    const response = await apiClient.get<any>("/api/admin/pages", { params });
    // Transform API response to match PageItem type
    const transformedData = response.data.data.map((p: any) => ({
      ...p,
      id: String(p.id),
    }));
    return {
      ...response.data,
      data: transformedData,
    };
  },

  /**
   * Get single page (admin)
   */
  adminGet: async (id: number): Promise<PageItem> => {
    const response = await apiClient.get<any>(`/api/admin/pages/${id}`);
    const p = response.data;
    return {
      ...p,
      id: String(p.id),
    };
  },

  /**
   * Create page (admin)
   */
  adminCreate: async (data: CreatePageRequest): Promise<PageItem> => {
    const payload: any = {
      title: data.title,
      slug: data.slug,
      blocks: data.blocks || [],
      seo: data.seo,
      status: data.status,
    };
    const response = await apiClient.post<any>("/api/admin/pages", payload);
    const p = response.data;
    return {
      ...p,
      id: String(p.id),
    };
  },

  /**
   * Update page (admin)
   */
  adminUpdate: async (id: number, data: Partial<CreatePageRequest>): Promise<PageItem> => {
    const payload: any = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.slug !== undefined) payload.slug = data.slug;
    if (data.blocks !== undefined) payload.blocks = data.blocks;
    if (data.seo !== undefined) payload.seo = data.seo;
    if (data.status !== undefined) payload.status = data.status;

    const response = await apiClient.put<any>(`/api/admin/pages/${id}`, payload);
    const p = response.data;
    return {
      ...p,
      id: String(p.id),
    };
  },

  /**
   * Delete page (admin)
   */
  adminDelete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/pages/${id}`);
  },
};
