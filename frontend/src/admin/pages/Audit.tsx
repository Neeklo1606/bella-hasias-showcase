import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/admin/components/Pagination";
import { auditApi } from "@/lib/api/audit.api";
import type { AuditLog } from "@/admin/types/audit";

const Audit = () => {
  const [search, setSearch] = useState("");
  const [action, setAction] = useState<string>("all");
  const [entityType, setEntityType] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const params: Record<string, any> = {
    per_page: perPage,
    page,
    ...(search.trim() && { q: search.trim() }),
    ...(action !== "all" && { action }),
    ...(entityType !== "all" && { entity_type: entityType }),
  };

  const { data: auditResponse, isLoading: auditLoading } = useQuery({
    queryKey: ['audit', 'admin', params],
    queryFn: () => auditApi.adminList(params),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: selectedLogDetail, isLoading: detailLoading } = useQuery({
    queryKey: ['audit', 'admin', 'detail', selectedLog?.id],
    queryFn: () => auditApi.adminGet(selectedLog!.id),
    enabled: !!selectedLog && detailOpen,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const logs = auditResponse?.data || [];
  const loading = auditLoading;
  const pagination = auditResponse
    ? {
        currentPage: auditResponse.current_page,
        lastPage: auditResponse.last_page,
        perPage: auditResponse.per_page,
        total: auditResponse.total,
      }
    : null;

  const handleRowClick = (log: AuditLog) => {
    setSelectedLog(log);
    setDetailOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatEntityType = (entityType: string) => {
    return entityType.replace('App\\Models\\', '').replace(/\\/g, '');
  };

  const actionLabels: Record<string, string> = {
    created: 'Создано',
    updated: 'Обновлено',
    deleted: 'Удалено',
    uploaded: 'Загружено',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-sm text-muted-foreground ml-3">Загрузка логов...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Журнал действий</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            История изменений в системе
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по типу сущности, имени или email пользователя..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={action}
          onValueChange={(value) => {
            setAction(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Действие" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все действия</SelectItem>
            <SelectItem value="created">Создано</SelectItem>
            <SelectItem value="updated">Обновлено</SelectItem>
            <SelectItem value="deleted">Удалено</SelectItem>
            <SelectItem value="uploaded">Загружено</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={entityType}
          onValueChange={(value) => {
            setEntityType(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Тип сущности" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все типы</SelectItem>
            <SelectItem value="App\\Models\\Service">Service</SelectItem>
            <SelectItem value="App\\Models\\CaseItem">CaseItem</SelectItem>
            <SelectItem value="App\\Models\\Page">Page</SelectItem>
            <SelectItem value="App\\Models\\MediaFile">MediaFile</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Пользователь</TableHead>
              <TableHead>Действие</TableHead>
              <TableHead>Тип сущности</TableHead>
              <TableHead>ID сущности</TableHead>
              <TableHead className="w-[100px]">Детали</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Нет записей
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log: AuditLog) => (
                <TableRow
                  key={log.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(log)}
                >
                  <TableCell className="font-mono text-sm">
                    {formatDate(log.createdAt)}
                  </TableCell>
                  <TableCell>
                    {log.user ? (
                      <div>
                        <div className="font-medium">{log.user.name}</div>
                        <div className="text-xs text-muted-foreground">{log.user.email}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary">
                      {actionLabels[log.action] || log.action}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {formatEntityType(log.entityType)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.entityId || '—'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(log);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          perPage={pagination.perPage}
          total={pagination.total}
          onPageChange={(newPage) => {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onPerPageChange={(newPerPage) => {
            setPerPage(newPerPage);
            setPage(1);
          }}
        />
      )}

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Детали записи журнала</DialogTitle>
            <DialogDescription>
              ID: {selectedLog?.id} | {selectedLog && formatDate(selectedLog.createdAt)}
            </DialogDescription>
          </DialogHeader>
          {detailLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : selectedLogDetail ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Пользователь</div>
                  <div className="mt-1">
                    {selectedLogDetail.user ? (
                      <>
                        <div className="font-medium">{selectedLogDetail.user.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedLogDetail.user.email}</div>
                      </>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Действие</div>
                  <div className="mt-1">
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary">
                      {actionLabels[selectedLogDetail.action] || selectedLogDetail.action}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Тип сущности</div>
                  <div className="mt-1 font-mono text-sm">
                    {formatEntityType(selectedLogDetail.entityType)}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">ID сущности</div>
                  <div className="mt-1 font-mono text-sm">
                    {selectedLogDetail.entityId || '—'}
                  </div>
                </div>
                {selectedLogDetail.ip && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">IP адрес</div>
                    <div className="mt-1 font-mono text-sm">{selectedLogDetail.ip}</div>
                  </div>
                )}
                {selectedLogDetail.userAgent && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">User Agent</div>
                    <div className="mt-1 text-sm break-all">{selectedLogDetail.userAgent}</div>
                  </div>
                )}
              </div>
              {selectedLogDetail.payload && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">Payload (JSON)</div>
                  <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
                    {JSON.stringify(selectedLogDetail.payload, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Audit;
