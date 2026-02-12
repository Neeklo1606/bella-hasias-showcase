import apiClient from "../apiClient";
import type { Service } from "@/admin/types/service";

export interface ServiceListParams {
  q?: string;
  status?: string;
  sort?: string;
  per_page?: number;
  page?: number;
}

export interface ServiceListResponse {
  data: Service[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface CreateServiceRequest {
  title: string;
  description: string;
  category?: string;
  imageId?: number;
  coverId?: number;
  tags?: string[];
  ctaLabel: string;
  ctaLink: string;
  sortOrder?: number;
  status: "draft" | "published";
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {
  id: number;
}

export const servicesApi = {
  /**
   * Get single service by slug (public)
   */
  getBySlug: async (slug: string): Promise<Service & { image?: any; cover?: any }> => {
    const response = await apiClient.get<any>(`/api/services/${slug}`);
    const s = response.data;
    return {
      ...s,
      id: String(s.id),
      imageId: s.image?.id ? String(s.image.id) : s.imageId || "",
      coverId: s.cover?.id ? String(s.cover.id) : s.coverId || "",
      image: s.image, // Preserve full image object
      cover: s.cover, // Preserve full cover object
    };
  },

  /**
   * Get list of services (public)
   */
  list: async (params?: ServiceListParams): Promise<ServiceListResponse> => {
    const response = await apiClient.get<any>("/api/services", { params });
    // Transform API response to match Service type
    const transformedData = response.data.data.map((s: any) => ({
      ...s,
      id: String(s.id),
      imageId: s.image?.id ? String(s.image.id) : s.imageId || "",
      coverId: s.cover?.id ? String(s.cover.id) : s.coverId || "",
    }));
    return {
      ...response.data,
      data: transformedData,
    };
  },

  /**
   * Get list of services (admin)
   */
  adminList: async (params?: ServiceListParams): Promise<ServiceListResponse> => {
    const response = await apiClient.get<any>("/api/admin/services", { params });
    // Transform API response to match Service type
    const transformedData = response.data.data.map((s: any) => ({
      ...s,
      id: String(s.id),
      imageId: s.image?.id ? String(s.image.id) : s.imageId || "",
      coverId: s.cover?.id ? String(s.cover.id) : s.coverId || "",
    }));
    return {
      ...response.data,
      data: transformedData,
    };
  },

  /**
   * Get single service (admin)
   */
  adminGet: async (id: number): Promise<Service> => {
    const response = await apiClient.get<any>(`/api/admin/services/${id}`);
    const s = response.data;
    return {
      ...s,
      id: String(s.id),
      imageId: s.image?.id ? String(s.image.id) : s.imageId || "",
      coverId: s.cover?.id ? String(s.cover.id) : s.coverId || "",
    };
  },

  /**
   * Create service (admin)
   */
  adminCreate: async (data: CreateServiceRequest): Promise<Service> => {
    // Transform camelCase to snake_case for API
    const payload: any = {
      title: data.title,
      description: data.description,
      category: data.category,
      image_id: data.imageId,
      cover_id: data.coverId,
      tags: data.tags || [],
      cta_label: data.ctaLabel,
      cta_link: data.ctaLink,
      sort_order: data.sortOrder,
      status: data.status,
    };
    const response = await apiClient.post<any>("/api/admin/services", payload);
    const s = response.data;
    return {
      ...s,
      id: String(s.id),
      imageId: s.image?.id ? String(s.image.id) : s.imageId || "",
      coverId: s.cover?.id ? String(s.cover.id) : s.coverId || "",
    };
  },

  /**
   * Update service (admin)
   */
  adminUpdate: async (id: number, data: Partial<CreateServiceRequest>): Promise<Service> => {
    // Transform camelCase to snake_case for API
    const payload: any = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.description !== undefined) payload.description = data.description;
    if (data.category !== undefined) payload.category = data.category;
    if (data.imageId !== undefined) payload.image_id = data.imageId;
    if (data.coverId !== undefined) payload.cover_id = data.coverId;
    if (data.tags !== undefined) payload.tags = data.tags;
    if (data.ctaLabel !== undefined) payload.cta_label = data.ctaLabel;
    if (data.ctaLink !== undefined) payload.cta_link = data.ctaLink;
    if (data.sortOrder !== undefined) payload.sort_order = data.sortOrder;
    if (data.status !== undefined) payload.status = data.status;

    const response = await apiClient.put<any>(`/api/admin/services/${id}`, payload);
    const s = response.data;
    return {
      ...s,
      id: String(s.id),
      imageId: s.image?.id ? String(s.image.id) : s.imageId || "",
      coverId: s.cover?.id ? String(s.cover.id) : s.coverId || "",
    };
  },

  /**
   * Delete service (admin)
   */
  adminDelete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/services/${id}`);
  },
};
