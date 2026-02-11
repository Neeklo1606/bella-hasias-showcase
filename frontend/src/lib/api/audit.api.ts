import apiClient from "../apiClient";
import type { AuditLog, AuditListParams, AuditListResponse } from "@/admin/types/audit";

export const auditApi = {
  /**
   * Get list of audit logs (admin)
   */
  adminList: async (params?: AuditListParams): Promise<AuditListResponse> => {
    const response = await apiClient.get<any>("/api/admin/audit", { params });
    // Laravel pagination returns data in response.data.data
    const paginationData = response.data;
    return {
      data: paginationData.data || [],
      current_page: paginationData.current_page ?? 1,
      last_page: paginationData.last_page ?? 1,
      per_page: paginationData.per_page ?? 25,
      total: paginationData.total ?? 0,
    };
  },

  /**
   * Get single audit log (admin)
   */
  adminGet: async (id: number): Promise<AuditLog> => {
    const response = await apiClient.get<any>(`/api/admin/audit/${id}`);
    return response.data;
  },
};
