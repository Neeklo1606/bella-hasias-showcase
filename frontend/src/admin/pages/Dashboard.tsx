import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/admin/components/DashboardCard";
import RecentMedia from "@/admin/components/RecentMedia";
import type { MediaItem } from "@/admin/types/media";
import ActivityFeed, { ActivityItem } from "@/admin/components/ActivityFeed";
import { useAuth } from "@/admin/hooks/useAuth";
import { servicesApi } from "@/lib/api/services.api";
import { casesApi } from "@/lib/api/cases.api";
import { mediaApi } from "@/lib/api/media.api";
import bannersData from "@/data/banners.json";

type BannerJson = { id: string; title: string; updatedAt: string };

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Доброе утро";
  if (hour >= 12 && hour < 18) return "Добрый день";
  return "Добрый вечер";
};

const buildActivityItems = (
  servicesData: { id: string; title: string; updatedAt: string }[],
  casesData: { id: string; title: string; updatedAt: string }[]
): ActivityItem[] => {
  const services: ActivityItem[] = servicesData.map((s) => ({
    id: String(s.id),
    type: "service" as const,
    title: s.title,
    updatedAt: s.updatedAt,
  }));
  const cases: ActivityItem[] = casesData.map((c) => ({
    id: String(c.id),
    type: "case" as const,
    title: c.title,
    updatedAt: c.updatedAt,
  }));
  const banners: ActivityItem[] = (bannersData as BannerJson[]).map((b) => ({
    id: b.id,
    type: "banner" as const,
    title: b.title,
    updatedAt: b.updatedAt,
  }));

  return [...services, ...cases, ...banners].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const greeting = getGreeting();
  const [services, setServices] = useState<{ id: number; title: string; updatedAt: string }[]>([]);
  const [cases, setCases] = useState<{ id: number; title: string; updatedAt: string }[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesRes, casesRes, mediaRes] = await Promise.all([
          servicesApi.adminList({ per_page: 100 }),
          casesApi.adminList({ per_page: 100 }),
          mediaApi.adminList({ per_page: 100 }),
        ]);

        setServices(
          servicesRes.data.map((s) => ({
            id: Number(s.id),
            title: s.title,
            updatedAt: s.updatedAt,
          }))
        );
        setCases(
          casesRes.data.map((c) => ({
            id: Number(c.id),
            title: c.title,
            updatedAt: c.updatedAt,
          }))
        );
        setMedia(mediaRes.data);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const activityItems = buildActivityItems(services, cases);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-sm text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Панель управления</h1>
          <p className="mt-1 text-muted-foreground">
            {greeting}, {user?.name ?? "Пользователь"}
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="w-fit">
          <Link to="/" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Перейти на сайт
          </Link>
        </Button>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Услуги"
          value={services.length}
          icon={FileText}
        />
        <DashboardCard
          title="Кейсы"
          value={cases.length}
          icon={Briefcase}
        />
        <DashboardCard
          title="Заявки"
          value="—"
          icon={LayoutGrid}
        />
        <DashboardCard
          title="Медиа-файлы"
          value={media.length}
          icon={ImageIcon}
        />
      </div>

      {/* Chart placeholder + Activity feed */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <BarChart3 className="h-4 w-4" />
              Просмотры сайта за последние 7 дней
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
              <p className="text-sm text-muted-foreground">
                График (заглушка)
              </p>
            </div>
          </CardContent>
        </Card>

        <ActivityFeed items={activityItems} limit={6} />
      </div>

      {/* Recent media */}
      <RecentMedia items={media} limit={4} />
    </div>
  );
};

export default Dashboard;
