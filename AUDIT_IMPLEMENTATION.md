# Audit Log Implementation - Итоговый отчет

## ✅ Выполненные изменения

### 1. Database Schema

**Миграция:** `laravel/database/migrations/2026_02_12_000000_create_audit_logs_table.php`

**Таблица `audit_logs`:**
- `id` - primary key
- `user_id` - foreign key to users (nullable)
- `action` - created/updated/deleted/uploaded
- `entity_type` - полное имя класса модели (App\Models\Service, etc.)
- `entity_id` - ID сущности
- `payload` - JSON с данными (diff или snapshot)
- `ip` - IP адрес (поддержка IPv6)
- `user_agent` - User-Agent браузера
- `created_at`, `updated_at` - timestamps

**Индексы:**
- `['entity_type', 'entity_id']` - для поиска по сущности
- `['user_id', 'created_at']` - для поиска по пользователю
- `['action']` - для фильтрации по действию
- `['created_at']` - для сортировки

### 2. Model

**Файл:** `laravel/app/Models/AuditLog.php`

- Связь с User (`belongsTo`)
- MorphTo связь с сущностями
- Cast `payload` как array

### 3. Audit Service

**Файл:** `laravel/app/Services/AuditService.php`

**Методы:**
- `log()` - базовый метод логирования
- `logCreate()` - логирование создания
- `logUpdate()` - логирование обновления с diff
- `logDelete()` - логирование удаления со snapshot
- `logUpload()` - логирование загрузки файла
- `filterSensitiveData()` - фильтрация чувствительных данных

**Безопасность:**
- Автоматическая фильтрация паролей, токенов, секретов
- Рекурсивная фильтрация вложенных массивов

### 4. Интеграция в контроллеры

**Обновлены контроллеры:**
- `ServicesController` - логирование create/update/delete
- `CasesController` - логирование create/update/delete
- `PagesController` - логирование create/update/delete
- `MediaController` - логирование upload/update/delete

**Особенности:**
- Логирование происходит после успешной операции
- Для update логируются только измененные поля
- Для delete сохраняется snapshot перед удалением
- IP и User-Agent записываются автоматически

### 5. API Endpoint

**Файл:** `laravel/app/Http/Controllers/Admin/AuditController.php`

**Endpoints:**
- `GET /api/admin/audit` - список логов с пагинацией
- `GET /api/admin/audit/{id}` - детали одного лога

**Фильтры:**
- `action` - фильтр по действию
- `entity_type` - фильтр по типу сущности
- `user_id` - фильтр по пользователю
- `q` - поиск по entity_type, имени/email пользователя

**Resource:** `AuditLogResource` - форматированный вывод

## 📋 Структура payload

### Created
```json
{
  "title": "Service Title",
  "description": "...",
  "category": "...",
  ...
}
```

### Updated
```json
{
  "changes": {
    "title": "New Title",
    "status": "published"
  },
  "old": {
    "title": "Old Title",
    "status": "draft"
  }
}
```

### Deleted
```json
{
  "snapshot": {
    "id": 1,
    "title": "Service Title",
    ...
  }
}
```

### Uploaded
```json
{
  "id": 1,
  "filename": "...",
  "path": "...",
  "mime_type": "image/jpeg",
  ...
}
```

## 📁 Измененные файлы

1. **`laravel/database/migrations/2026_02_12_000000_create_audit_logs_table.php`** (новый)
   - Миграция для таблицы audit_logs

2. **`laravel/app/Models/AuditLog.php`** (новый)
   - Модель для audit logs

3. **`laravel/app/Services/AuditService.php`** (новый)
   - Сервис для логирования действий

4. **`laravel/app/Http/Controllers/Admin/AuditController.php`** (новый)
   - Контроллер для просмотра логов

5. **`laravel/app/Http/Resources/AuditLogResource.php`** (новый)
   - Resource для форматирования логов

6. **`laravel/app/Http/Controllers/Admin/ServicesController.php`**
   - Добавлено логирование create/update/delete

7. **`laravel/app/Http/Controllers/Admin/CasesController.php`**
   - Добавлено логирование create/update/delete

8. **`laravel/app/Http/Controllers/Admin/PagesController.php`**
   - Добавлено логирование create/update/delete

9. **`laravel/app/Http/Controllers/Admin/MediaController.php`**
   - Добавлено логирование upload/update/delete

10. **`laravel/routes/api.php`**
    - Добавлены routes для audit logs

## 🔍 Как проверить, что лог создаётся

### 1. Создание сущности

```bash
# Сначала авторизуйтесь (получите CSRF cookie и выполните login)
curl -X GET https://bellahasias.ru/sanctum/csrf-cookie \
  -c cookies.txt -b cookies.txt

curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  -c cookies.txt -b cookies.txt

# Создать услугу через API
curl -X POST https://bellahasias.ru/api/admin/services \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Service",
    "description": "Test",
    "ctaLabel": "Contact",
    "ctaLink": "/contact",
    "status": "published"
  }' \
  -b cookies.txt

# Проверить лог в БД
php artisan tinker
>>> \App\Models\AuditLog::latest()->first()
# Должен вернуть запись с action='created', entity_type='App\Models\Service'
```

**Примечание:** Bearer tokens не используются, т.к. SPA auth cookie-based (Sanctum).

### 2. Обновление сущности

```bash
# Обновить услугу
curl -X PUT https://bellahasias.ru/api/admin/services/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}' \
  -b cookies.txt

# Проверить лог
php artisan tinker
>>> $log = \App\Models\AuditLog::where('action', 'updated')->latest()->first();
>>> $log->payload
# Должен содержать 'changes' и 'old' с измененными полями
```

### 3. Удаление сущности

```bash
# Удалить услугу
curl -X DELETE https://bellahasias.ru/api/admin/services/1 \
  -b cookies.txt

# Проверить лог
php artisan tinker
>>> $log = \App\Models\AuditLog::where('action', 'deleted')->latest()->first();
>>> $log->payload['snapshot']
# Должен содержать snapshot удаленной сущности
```

### 4. Загрузка файла

```bash
# Загрузить файл
curl -X POST https://bellahasias.ru/api/admin/media/upload \
  -F "file=@test.jpg" \
  -b cookies.txt

# Проверить лог
php artisan tinker
>>> $log = \App\Models\AuditLog::where('action', 'uploaded')->latest()->first();
>>> $log->entity_type
# Должен быть 'App\Models\MediaFile'
```

### 5. Просмотр через API

```bash
# Получить список логов
curl -X GET https://bellahasias.ru/api/admin/audit \
  -H "Accept: application/json" \
  -b cookies.txt

# С фильтрами
curl -X GET "https://bellahasias.ru/api/admin/audit?action=created&entity_type=App\Models\Service" \
  -H "Accept: application/json" \
  -b cookies.txt

# Получить конкретный лог
curl -X GET https://bellahasias.ru/api/admin/audit/1 \
  -H "Accept: application/json" \
  -b cookies.txt
```

### 6. Проверка в БД напрямую

```bash
# Через tinker
php artisan tinker

# Последние 10 логов
>>> \App\Models\AuditLog::with('user')->latest()->take(10)->get()

# Логи конкретного пользователя
>>> \App\Models\AuditLog::where('user_id', 1)->latest()->get()

# Логи по типу сущности
>>> \App\Models\AuditLog::where('entity_type', 'App\Models\Service')->get()

# Статистика по действиям
>>> \App\Models\AuditLog::selectRaw('action, count(*) as count')->groupBy('action')->get()
```

## ⚙️ Настройка

### Миграция

```bash
cd laravel
php artisan migrate
```

### Проверка таблицы

```bash
php artisan tinker
>>> \Illuminate\Support\Facades\Schema::hasTable('audit_logs')
# Должно вернуть true
```

## 🔒 Безопасность

- **Фильтрация чувствительных данных:**
  - Пароли, токены, секреты автоматически исключаются
  - Рекурсивная фильтрация вложенных массивов

- **Доступ:**
  - Только авторизованные админы могут просматривать логи
  - Endpoint защищен `auth:sanctum` + `admin` middleware

- **Хранение:**
  - IP адреса хранятся (для расследований)
  - User-Agent хранится (для анализа)
  - Данные не удаляются автоматически (нужна ручная очистка)

## 📊 Примеры использования

### Поиск всех изменений конкретной услуги

```php
$serviceId = 1;
$logs = AuditLog::where('entity_type', Service::class)
    ->where('entity_id', $serviceId)
    ->with('user')
    ->orderBy('created_at', 'desc')
    ->get();
```

### История действий пользователя

```php
$userId = 1;
$logs = AuditLog::where('user_id', $userId)
    ->with('user')
    ->orderBy('created_at', 'desc')
    ->get();
```

### Все удаления за период

```php
$logs = AuditLog::where('action', 'deleted')
    ->whereBetween('created_at', [$startDate, $endDate])
    ->with('user')
    ->get();
```

## ✅ Checklist

- [x] Миграция создана
- [x] Модель создана
- [x] AuditService создан
- [x] Логирование в ServicesController
- [x] Логирование в CasesController
- [x] Логирование в PagesController
- [x] Логирование в MediaController
- [x] API endpoint для просмотра логов
- [x] Фильтрация чувствительных данных
- [x] Документация создана
