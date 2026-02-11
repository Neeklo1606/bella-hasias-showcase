import apiClient from "../apiClient";

export interface SEOConfig {
  siteUrl: string;
}

export interface UpdateSEORequest {
  siteUrl: string;
}

export const seoApi = {
  /**
   * Get SEO config (public)
   */
  get: async (): Promise<SEOConfig> => {
    const response = await apiClient.get<SEOConfig>("/api/seo");
    return response.data;
  },

  /**
   * Get SEO config (admin)
   */
  adminGet: async (): Promise<SEOConfig> => {
    const response = await apiClient.get<SEOConfig>("/api/admin/seo");
    return response.data;
  },

  /**
   * Update SEO config (admin)
   */
  adminUpdate: async (data: UpdateSEORequest): Promise<SEOConfig> => {
    const response = await apiClient.put<SEOConfig>("/api/admin/seo", data);
    return response.data;
  },
};
