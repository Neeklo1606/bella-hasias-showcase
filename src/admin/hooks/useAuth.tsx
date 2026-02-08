import { createContext, useContext, useEffect, useMemo, useState } from "react";
import users from "@/data/users.json";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AUTH_TOKEN_KEY = "cms_auth_token";
const AUTH_USER_KEY = "cms_auth_user";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    if (token && storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as AuthUser;
        setUser(parsed);
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
      }
    }
    setIsReady(true);
  }, []);

  const login = (email: string, password: string) => {
    const match = (users as StoredUser[]).find(
      (item) => item.email === email && item.password === password
    );

    if (!match) {
      return { ok: false, error: "Неверный email или пароль." };
    }

    const safeUser: AuthUser = {
      id: match.id,
      name: match.name,
      email: match.email,
    };

    setUser(safeUser);
    localStorage.setItem(AUTH_TOKEN_KEY, "true");
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(safeUser));

    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
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
