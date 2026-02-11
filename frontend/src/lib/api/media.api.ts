import apiClient from "../apiClient";
import type { MediaItem } from "@/admin/types/media";

export interface MediaListParams {
  q?: string;
  category?: string;
  sort?: string;
  per_page?: number;
  page?: number;
}

export interface MediaListResponse {
  data: MediaItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface UploadMediaRequest {
  file: File;
  category?: string;
  alt?: string;
}

export interface UpdateMediaRequest {
  category?: string;
  alt?: string;
}

export const mediaApi = {
  /**
   * Get list of media (admin)
   */
  adminList: async (params?: MediaListParams): Promise<MediaListResponse> => {
    const response = await apiClient.get<any>("/api/admin/media", { params });
    // Transform API response to match MediaItem type
    const transformedData = response.data.data.map((m: any) => ({
      ...m,
      id: String(m.id),
    }));
    return {
      ...response.data,
      data: transformedData,
    };
  },

  /**
   * Upload media file (admin)
   */
  adminUpload: async (data: UploadMediaRequest): Promise<MediaItem> => {
    const formData = new FormData();
    formData.append("file", data.file);
    if (data.category) {
      formData.append("category", data.category);
    }
    if (data.alt) {
      formData.append("alt", data.alt);
    }

    const response = await apiClient.post<any>("/api/admin/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const m = response.data;
    return {
      ...m,
      id: String(m.id),
    };
  },

  /**
   * Update media (admin)
   */
  adminUpdate: async (id: number, data: UpdateMediaRequest): Promise<MediaItem> => {
    const payload: any = {};
    if (data.category !== undefined) payload.category = data.category;
    if (data.alt !== undefined) payload.alt = data.alt;

    const response = await apiClient.put<any>(`/api/admin/media/${id}`, payload);
    const m = response.data;
    return {
      ...m,
      id: String(m.id),
    };
  },

  /**
   * Delete media (admin)
   */
  adminDelete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/media/${id}`);
  },
};
