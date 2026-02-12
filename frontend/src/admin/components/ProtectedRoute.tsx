import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/admin/hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, isAdmin, isReady, user } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (!isReady) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  // Only redirect to login if we're sure user is not authenticated
  // Check both isAuthenticated and user to be safe
  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  // Check admin role
  if (!isAdmin || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Доступ запрещен</h1>
          <p className="text-muted-foreground">У вас нет прав администратора.</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
