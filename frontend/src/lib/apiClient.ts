import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

let csrfTokenEnsured = false;

const apiClient: AxiosInstance = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

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

// Response interceptor: handle 419 (CSRF token mismatch) and 401 (Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 419: CSRF token mismatch - refresh and retry once
    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;
      csrfTokenEnsured = false; // Reset to force refresh

      try {
        await ensureCsrf();
        return apiClient(originalRequest);
      } catch (csrfError) {
        return Promise.reject(csrfError);
      }
    }

    // Handle 401: Unauthorized - redirect to login if admin route
    if (error.response?.status === 401) {
      const url = originalRequest.url || "";
      if (url.includes("/api/admin/") || url.includes("/api/auth/me")) {
        // Clear auth state by redirecting to login
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
