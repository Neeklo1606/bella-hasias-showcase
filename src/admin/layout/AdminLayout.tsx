import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Sidebar, { SidebarItem } from "@/admin/components/Sidebar";
import { useAuth } from "@/admin/hooks/useAuth";

const navItems: SidebarItem[] = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Медиа", to: "/admin/media" },
  { label: "Услуги", to: "/admin/services" },
  { label: "Кейсы", to: "/admin/cases" },
  { label: "Страницы", to: "/admin/pages" },
  { label: "SEO", to: "/admin/seo" },
  { label: "Статистика", to: "/admin/stats" },
  { label: "Настройки", to: "/admin/settings" },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Headless CMS
            </p>
            <h1 className="text-lg font-semibold">Bella Hasias Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Пользователь</p>
              <p className="text-sm font-medium">{user?.name}</p>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row md:px-6">
        <aside className="w-full md:w-64">
          <div className="rounded-2xl border border-border bg-card p-3">
            <Sidebar items={navItems} />
          </div>
        </aside>
        <main className="min-h-[60vh] flex-1 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
