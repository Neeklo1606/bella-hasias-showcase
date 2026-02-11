import apiClient from "../apiClient";
import type { CaseItem } from "@/admin/types/case";

export interface CaseListParams {
  q?: string;
  status?: string;
  service_id?: number;
  sort?: string;
  per_page?: number;
  page?: number;
}

export interface CaseListResponse {
  data: CaseItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface CreateCaseRequest {
  title: string;
  slug: string;
  description: string;
  serviceId?: number;
  mediaIds?: number[];
  tags?: string[];
  sortOrder?: number;
  status: "draft" | "published";
}

export interface UpdateCaseRequest extends Partial<CreateCaseRequest> {
  id: number;
}

export const casesApi = {
  /**
   * Get list of cases (public)
   */
  list: async (params?: CaseListParams): Promise<CaseListResponse> => {
    const response = await apiClient.get<any>("/api/cases", { params });
    // Transform API response to match CaseItem type
    const transformedData = response.data.data.map((c: any) => ({
      ...c,
      id: String(c.id),
      serviceId: c.serviceId ? String(c.serviceId) : "",
      mediaIds: c.mediaIds ? c.mediaIds.map((id: number) => String(id)) : [],
      // Preserve media array for image URLs
      media: c.media || [],
    }));
    return {
      ...response.data,
      data: transformedData,
    };
  },

  /**
   * Get single case by slug (public)
   */
  getBySlug: async (slug: string): Promise<CaseItem> => {
    const response = await apiClient.get<any>(`/api/cases/${slug}`);
    const c = response.data;
    return {
      ...c,
      id: String(c.id),
      serviceId: c.serviceId ? String(c.serviceId) : "",
      mediaIds: c.mediaIds ? c.mediaIds.map((id: number) => String(id)) : [],
    };
  },

  /**
   * Get list of cases (admin)
   */
  adminList: async (params?: CaseListParams): Promise<CaseListResponse> => {
    const response = await apiClient.get<any>("/api/admin/cases", { params });
    // Transform API response to match CaseItem type
    const transformedData = response.data.data.map((c: any) => ({
      ...c,
      id: String(c.id),
      serviceId: c.serviceId ? String(c.serviceId) : "",
      mediaIds: c.mediaIds ? c.mediaIds.map((id: number) => String(id)) : [],
    }));
    return {
      ...response.data,
      data: transformedData,
    };
  },

  /**
   * Get single case (admin)
   */
  adminGet: async (id: number): Promise<CaseItem> => {
    const response = await apiClient.get<any>(`/api/admin/cases/${id}`);
    const c = response.data;
    return {
      ...c,
      id: String(c.id),
      serviceId: c.serviceId ? String(c.serviceId) : "",
      mediaIds: c.mediaIds ? c.mediaIds.map((id: number) => String(id)) : [],
    };
  },

  /**
   * Create case (admin)
   */
  adminCreate: async (data: CreateCaseRequest): Promise<CaseItem> => {
    // Transform camelCase to snake_case for API
    const payload: any = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      service_id: data.serviceId,
      media_ids: data.mediaIds || [],
      tags: data.tags || [],
      sort_order: data.sortOrder,
      status: data.status,
    };
    const response = await apiClient.post<any>("/api/admin/cases", payload);
    const c = response.data;
    return {
      ...c,
      id: String(c.id),
      serviceId: c.serviceId ? String(c.serviceId) : "",
      mediaIds: c.mediaIds ? c.mediaIds.map((id: number) => String(id)) : [],
    };
  },

  /**
   * Update case (admin)
   */
  adminUpdate: async (id: number, data: Partial<CreateCaseRequest>): Promise<CaseItem> => {
    // Transform camelCase to snake_case for API
    const payload: any = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.slug !== undefined) payload.slug = data.slug;
    if (data.description !== undefined) payload.description = data.description;
    if (data.serviceId !== undefined) payload.service_id = data.serviceId;
    if (data.mediaIds !== undefined) payload.media_ids = data.mediaIds;
    if (data.tags !== undefined) payload.tags = data.tags;
    if (data.sortOrder !== undefined) payload.sort_order = data.sortOrder;
    if (data.status !== undefined) payload.status = data.status;

    const response = await apiClient.put<any>(`/api/admin/cases/${id}`, payload);
    const c = response.data;
    return {
      ...c,
      id: String(c.id),
      serviceId: c.serviceId ? String(c.serviceId) : "",
      mediaIds: c.mediaIds ? c.mediaIds.map((id: number) => String(id)) : [],
    };
  },

  /**
   * Delete case (admin)
   */
  adminDelete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/cases/${id}`);
  },
};
