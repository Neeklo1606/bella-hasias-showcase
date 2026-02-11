import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

let csrfTokenEnsured = false;
let sessionExpiredShown = false;

/**
 * Extract error message from API response
 */
const getErrorMessage = (error: AxiosError): string => {
  const response = error.response;
  
  if (!response) {
    return "Ошибка сети. Проверьте подключение к интернету.";
  }

  // Laravel validation errors
  if (response.data && typeof response.data === 'object') {
    const data = response.data as any;
    
    // Laravel validation: { errors: { field: ["message"] } }
    if (data.errors && typeof data.errors === 'object') {
      const errors = Object.values(data.errors).flat() as string[];
      if (errors.length > 0) {
        return errors[0]; // Show first error
      }
    }
    
    // Generic message
    if (data.message) {
      return data.message;
    }
  }

  // Status-based messages
  switch (response.status) {
    case 403:
      return "Доступ запрещен. У вас нет прав для выполнения этого действия.";
    case 404:
      return "Ресурс не найден.";
    case 422:
      return "Ошибка валидации данных.";
    case 429:
      return "Слишком много запросов. Попробуйте позже.";
    case 500:
      return "Внутренняя ошибка сервера. Попробуйте позже.";
    case 503:
      return "Сервис временно недоступен. Попробуйте позже.";
    default:
      return `Ошибка ${response.status}: ${response.statusText || "Неизвестная ошибка"}`;
  }
};

/**
 * Ensure CSRF cookie is set before making authenticated requests
 */
export const ensureCsrf = async (): Promise<void> => {
  if (csrfTokenEnsured) {
    return;
  }

  try {
    await axios.get("/sanctum/csrf-cookie", {
      baseURL: "/",
      withCredentials: true,
    });
    csrfTokenEnsured = true;
  } catch (error) {
    console.error("Failed to get CSRF cookie:", error);
    throw error;
  }
};

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor: ensure CSRF for authenticated requests
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Only ensure CSRF for POST/PUT/DELETE requests
    if (["post", "put", "delete", "patch"].includes(config.method?.toLowerCase() || "")) {
      await ensureCsrf();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle errors and show toast notifications
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    // Handle 419: CSRF token mismatch - refresh and retry once (silently)
    if (status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;
      csrfTokenEnsured = false; // Reset to force refresh

      try {
        await ensureCsrf();
        return apiClient(originalRequest);
      } catch (csrfError) {
        return Promise.reject(csrfError);
      }
    }

    // Handle 401: Unauthorized - redirect to login only for admin routes
    if (status === 401) {
      const url = originalRequest.url || "";
      const currentPath = window.location.pathname;
      
      // Only redirect if:
      // a) Current page is in /admin/* OR
      // b) Request is to /api/admin/* (but NOT /api/auth/me for guests on public pages)
      const isAdminRoute = currentPath.startsWith("/admin");
      const isAdminApiRequest = url.includes("/api/admin/");
      const isAuthMeRequest = url.includes("/api/auth/me");
      
      // Redirect only if:
      // 1. We're on admin route (any /admin/* page), OR
      // 2. Making admin API request (but NOT /api/auth/me which is used by AuthProvider on public pages)
      // Do NOT redirect for /api/auth/me on public pages (guests checking auth status)
      if (isAdminRoute || (isAdminApiRequest && !isAuthMeRequest)) {
        if (!sessionExpiredShown) {
          sessionExpiredShown = true;
          toast.error("Сессия истекла", {
            description: "Пожалуйста, войдите снова.",
          });
          // Reset flag after 5 seconds
          setTimeout(() => {
            sessionExpiredShown = false;
          }, 5000);
        }
        // Clear auth state by redirecting to login
        window.location.href = "/admin/login";
      }
      // For public routes (/api/auth/me for guests), just reject without redirect/toast
      return Promise.reject(error);
    }

    // Handle other errors (4xx, 5xx) - show toast
    if (status && status >= 400 && status !== 401 && status !== 419) {
      const message = getErrorMessage(error);
      toast.error("Ошибка", {
        description: message,
        duration: 5000,
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
