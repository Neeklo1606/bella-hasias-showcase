import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, Briefcase, Image } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export type ActivityItem = {
  id: string;
  type: "service" | "case" | "banner";
  title: string;
  updatedAt: string;
};

type ActivityFeedProps = {
  items: ActivityItem[];
  limit?: number;
};

const typeConfig = {
  service: { label: "Услуга", icon: FileText },
  case: { label: "Кейс", icon: Briefcase },
  banner: { label: "Баннер", icon: Image },
} as const;

const ActivityFeed = ({ items, limit = 6 }: ActivityFeedProps) => {
  const displayItems = items.slice(0, limit);

  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-base font-semibold">Последние изменения</h3>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {displayItems.map((item) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            return (
              <li
                key={`${item.type}-${item.id}`}
                className="flex items-start gap-3"
              >
                <div className="rounded-md bg-secondary p-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-0.5 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {config.label} ·{" "}
                    {formatDistanceToNow(new Date(item.updatedAt), {
                      addSuffix: true,
                      locale: ru,
                    })}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        {items.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-6">
            Нет изменений
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
