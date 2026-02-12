import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/admin/hooks/useAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin, isReady } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated and is admin (on mount or when state changes)
  useEffect(() => {
    if (isReady && isAuthenticated && isAdmin) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, isAdmin, isReady, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await login(email.trim(), password);
      if (!result.ok) {
        setError(result.error ?? "Ошибка авторизации.");
        setIsLoading(false);
        return;
      }
      // If ok, state will update and useEffect will handle redirect
      // Don't set isLoading to false here - let useEffect handle navigation
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Ошибка авторизации. Попробуйте еще раз.";
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Dialog open>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Вход в админку</DialogTitle>
            <DialogDescription>
              Введите данные администратора, чтобы открыть CMS.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@bella.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLogin;
