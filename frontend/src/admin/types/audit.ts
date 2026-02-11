export type AuditLog = {
  id: number;
  userId?: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  action: 'created' | 'updated' | 'deleted' | 'uploaded';
  entityType: string;
  entityId?: number;
  payload?: Record<string, any>;
  ip?: string;
  userAgent?: string;
  createdAt: string;
};

export interface AuditListParams {
  q?: string;
  action?: string;
  entity_type?: string;
  user_id?: number;
  sort?: string;
  per_page?: number;
  page?: number;
}

export interface AuditListResponse {
  data: AuditLog[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
