import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/admin/hooks/useAuth";
import { useRef, useEffect } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated, isAdmin, isReady, user } = useAuth();
  const location = useLocation();
  const hasCheckedOnce = useRef(false);

  // Show loading while checking auth (only on first mount)
  if (!isReady && !hasCheckedOnce.current) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  // Mark that we've checked at least once
  useEffect(() => {
    if (isReady) {
      hasCheckedOnce.current = true;
    }
  }, [isReady]);

  // Only redirect to login if we're sure user is not authenticated
  // Check both isAuthenticated and user to be safe
  // But only after we've checked at least once
  if (hasCheckedOnce.current && (!isAuthenticated || !user)) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  // Check admin role (only if we have user data)
  if (user && (!isAdmin || user.role !== "admin")) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Доступ запрещен</h1>
          <p className="text-muted-foreground">У вас нет прав администратора.</p>
        </div>
      </div>
    );
  }

  // If we have user and isAdmin, allow access
  if (user && isAdmin && isReady) {
    return <Outlet />;
  }

  // Still loading or checking
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-sm text-muted-foreground">Загрузка...</div>
    </div>
  );
};

export default ProtectedRoute;
