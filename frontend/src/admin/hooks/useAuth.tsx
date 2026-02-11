import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "@/lib/api/auth.api";
import type { LoginResponse } from "@/lib/api/auth.api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isReady: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authApi.me();
        setUser({
          id: String(userData.id),
          name: userData.name,
          email: userData.email,
          role: userData.role,
        });
      } catch (error) {
        // Not authenticated
        setUser(null);
      } finally {
        setIsReady(true);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, remember = false): Promise<{ ok: boolean; error?: string }> => {
    try {
      const userData = await authApi.login({ email, password, remember });
      setUser({
        id: String(userData.id),
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });
      return { ok: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Неверный email или пароль.";
      return { ok: false, error: errorMessage };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authApi.logout();
    } catch (error) {
      // Ignore errors on logout
    } finally {
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      isReady,
      login,
      logout,
    }),
    [user, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
