# ЭТАП 1-2: Реализация БД + Auth + API каркас

## ✅ Выполнено

### 1. Laravel Sanctum установлен и настроен
- ✅ Установлен пакет `laravel/sanctum`
- ✅ Опубликована конфигурация
- ✅ Создана миграция `personal_access_tokens`
- ✅ Настроен для SPA cookie-based auth

### 2. Миграции БД созданы
- ✅ `add_role_and_external_id_to_users_table` - добавлены поля `role` и `external_id` в users
- ✅ `create_media_files_table` - таблица медиафайлов
- ✅ `create_services_table` - таблица услуг
- ✅ `create_cases_table` - таблица кейсов
- ✅ `create_case_media_table` - pivot таблица для связи cases ↔ media_files
- ✅ `create_pages_table` - таблица страниц с блоками
- ✅ `create_seo_meta_table` - таблица SEO настроек

### 3. Eloquent модели созданы
- ✅ `User` - обновлена (добавлен HasApiTokens, метод isAdmin(), связь mediaFiles())
- ✅ `MediaFile` - создана (связь user(), accessor url)
- ✅ `Service` - создана (связи image(), cover(), cases())
- ✅ `CaseItem` - создана (связи service(), media())
- ✅ `Page` - создана (casts для blocks и seo)
- ✅ `SeoMeta` - создана (методы getValue/setValue)

### 4. API Resources созданы
- ✅ `UserResource` - формат ответа для пользователя
- ✅ `ServiceResource` - формат ответа для услуги
- ✅ `CaseResource` - формат ответа для кейса
- ✅ `PageResource` - формат ответа для страницы
- ✅ `MediaFileResource` - формат ответа для медиафайла

### 5. Form Requests созданы
- ✅ `StoreServiceRequest` / `UpdateServiceRequest` - валидация услуг
- ✅ `StoreCaseRequest` / `UpdateCaseRequest` - валидация кейсов
- ✅ `StorePageRequest` / `UpdatePageRequest` - валидация страниц

### 6. Controllers созданы
- ✅ `AuthController` - login, logout, me, forgotPassword, resetPassword
- ✅ `Admin/ServicesController` - полный CRUD с фильтрами
- ✅ `Admin/CasesController` - создан (нужно заполнить)
- ✅ `Admin/PagesController` - создан (нужно заполнить)
- ✅ `Admin/MediaController` - создан (нужно заполнить)
- ✅ `Admin/SeoController` - создан (нужно заполнить)
- ✅ `Public/ServicesController` - создан (нужно заполнить)
- ✅ `Public/CasesController` - создан (нужно заполнить)
- ✅ `Public/PagesController` - создан (нужно заполнить)

### 7. Middleware создан
- ✅ `EnsureUserIsAdmin` - проверка роли admin
- ✅ Зарегистрирован в `bootstrap/app.php` как alias `admin`

### 8. API Routes настроены
- ✅ `/api/auth/*` - auth endpoints
- ✅ `/api/services` - public read-only
- ✅ `/api/cases` - public read-only
- ✅ `/api/pages/{slug}` - public read-only
- ✅ `/api/seo` - public read-only
- ✅ `/api/admin/*` - protected admin endpoints (auth:sanctum + admin middleware)

### 9. Команда импорта создана
- ✅ `php artisan cms:import-json` - импорт из `frontend/src/data/*.json`
- ✅ Идемпотентная (по external_id)
- ✅ Импортирует: users, media, services, cases, pages, seo

---

## 📋 Список созданных/изменённых файлов

### Миграции
- `laravel/database/migrations/2026_02_11_191559_add_role_and_external_id_to_users_table.php`
- `laravel/database/migrations/2026_02_11_191606_create_media_files_table.php`
- `laravel/database/migrations/2026_02_11_191617_create_services_table.php`
- `laravel/database/migrations/2026_02_11_191625_create_cases_table.php`
- `laravel/database/migrations/2026_02_11_191634_create_case_media_table.php`
- `laravel/database/migrations/2026_02_11_191642_create_pages_table.php`
- `laravel/database/migrations/2026_02_11_191650_create_seo_meta_table.php`

### Модели
- `laravel/app/Models/User.php` (обновлена)
- `laravel/app/Models/MediaFile.php`
- `laravel/app/Models/Service.php`
- `laravel/app/Models/CaseItem.php`
- `laravel/app/Models/Page.php`
- `laravel/app/Models/SeoMeta.php`

### Resources
- `laravel/app/Http/Resources/UserResource.php`
- `laravel/app/Http/Resources/ServiceResource.php`
- `laravel/app/Http/Resources/CaseResource.php`
- `laravel/app/Http/Resources/PageResource.php`
- `laravel/app/Http/Resources/MediaFileResource.php`

### Requests
- `laravel/app/Http/Requests/StoreServiceRequest.php`
- `laravel/app/Http/Requests/UpdateServiceRequest.php`
- `laravel/app/Http/Requests/StoreCaseRequest.php`
- `laravel/app/Http/Requests/UpdateCaseRequest.php`
- `laravel/app/Http/Requests/StorePageRequest.php`
- `laravel/app/Http/Requests/UpdatePageRequest.php`

### Controllers
- `laravel/app/Http/Controllers/AuthController.php`
- `laravel/app/Http/Controllers/Admin/ServicesController.php` (полностью)
- `laravel/app/Http/Controllers/Admin/CasesController.php` (заглушка)
- `laravel/app/Http/Controllers/Admin/PagesController.php` (заглушка)
- `laravel/app/Http/Controllers/Admin/MediaController.php` (заглушка)
- `laravel/app/Http/Controllers/Admin/SeoController.php` (заглушка)
- `laravel/app/Http/Controllers/Public/ServicesController.php` (заглушка)
- `laravel/app/Http/Controllers/Public/CasesController.php` (заглушка)
- `laravel/app/Http/Controllers/Public/PagesController.php` (заглушка)

### Middleware
- `laravel/app/Http/Middleware/EnsureUserIsAdmin.php`

### Routes
- `laravel/routes/api.php` (обновлён)

### Команды
- `laravel/app/Console/Commands/ImportJsonCommand.php`

### Конфигурация
- `laravel/bootstrap/app.php` (обновлён - зарегистрирован middleware)
- `laravel/config/sanctum.php` (опубликован)

---

## 🗄️ Схема БД

### Таблицы

**users**
- `id` (bigint, PK)
- `external_id` (string, unique, nullable)
- `name` (string)
- `email` (string, unique)
- `password` (string, hashed)
- `role` (string, default: 'user')
- `email_verified_at` (timestamp, nullable)
- `remember_token`
- `created_at`, `updated_at`

**media_files**
- `id` (bigint, PK)
- `external_id` (string, unique, nullable)
- `filename` (string)
- `original_filename` (string, nullable)
- `path` (string)
- `mime_type` (string)
- `size` (bigint)
- `category` (string)
- `alt` (string, nullable)
- `user_id` (bigint, FK → users, nullable)
- `created_at`, `updated_at`

**services**
- `id` (bigint, PK)
- `external_id` (string, unique, nullable)
- `title` (string)
- `description` (text)
- `category` (string, nullable)
- `image_id` (bigint, FK → media_files, nullable)
- `cover_id` (bigint, FK → media_files, nullable)
- `tags` (json)
- `cta_label` (string)
- `cta_link` (string)
- `sort_order` (int, default: 0)
- `status` (string, default: 'published')
- `created_at`, `updated_at`

**cases**
- `id` (bigint, PK)
- `external_id` (string, unique, nullable)
- `title` (string)
- `slug` (string, unique)
- `description` (text)
- `service_id` (bigint, FK → services, nullable)
- `tags` (json)
- `sort_order` (int, default: 0)
- `status` (string, default: 'published')
- `created_at`, `updated_at`

**case_media** (pivot)
- `id` (bigint, PK)
- `case_id` (bigint, FK → cases)
- `media_file_id` (bigint, FK → media_files)
- `sort_order` (int, default: 0)
- `created_at`, `updated_at`
- Unique: `[case_id, media_file_id]`

**pages**
- `id` (bigint, PK)
- `external_id` (string, unique, nullable)
- `slug` (string, unique)
- `title` (string)
- `blocks` (json)
- `seo` (json, nullable)
- `status` (string, default: 'published')
- `created_at`, `updated_at`

**seo_meta**
- `id` (bigint, PK)
- `key` (string, unique)
- `value` (json)
- `updated_at` (timestamp)

---

## 🔌 API Endpoints

### Public (read-only)

```
GET  /api/services          - список услуг
GET  /api/cases             - список кейсов
GET  /api/cases/{slug}      - кейс по slug
GET  /api/pages/{slug}      - страница по slug
GET  /api/seo               - SEO конфигурация
```

### Auth

```
POST /api/auth/login        - вход
POST /api/auth/logout       - выход (требует auth)
GET  /api/auth/me           - текущий пользователь (требует auth)
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Admin (требует auth:sanctum + admin)

```
GET    /api/admin/services       - список услуг
POST   /api/admin/services       - создать услугу
GET    /api/admin/services/{id}  - получить услугу
PUT    /api/admin/services/{id}  - обновить услугу
DELETE /api/admin/services/{id}  - удалить услугу

GET    /api/admin/cases          - список кейсов
POST   /api/admin/cases          - создать кейс
GET    /api/admin/cases/{id}    - получить кейс
PUT    /api/admin/cases/{id}    - обновить кейс
DELETE /api/admin/cases/{id}    - удалить кейс

GET    /api/admin/pages          - список страниц
POST   /api/admin/pages          - создать страницу
GET    /api/admin/pages/{id}    - получить страницу
PUT    /api/admin/pages/{id}    - обновить страницу
DELETE /api/admin/pages/{id}    - удалить страницу

GET    /api/admin/media          - список медиа
POST   /api/admin/media/upload   - загрузить файл
PUT    /api/admin/media/{id}     - обновить медиа
DELETE /api/admin/media/{id}     - удалить медиа

GET    /api/admin/seo            - получить SEO настройки
PUT    /api/admin/seo             - обновить SEO настройки
```

---

## 🚀 Команды для локального запуска

### 1. Установить зависимости
```bash
cd laravel
composer install
```

### 2. Настроить .env
```bash
# Убедитесь, что в .env есть:
DB_CONNECTION=sqlite
# или
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Для Sanctum SPA:
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:8080,127.0.0.1,127.0.0.1:8000
SESSION_DOMAIN=localhost
```

### 3. Запустить миграции
```bash
php artisan migrate
# или
php artisan migrate:fresh
```

### 4. Импортировать данные из JSON
```bash
php artisan cms:import-json
```

### 5. Запустить сервер
```bash
php artisan serve
```

---

## ✅ Smoke-check (проверка)

### 1. Проверить миграции
```bash
php artisan migrate:status
```

### 2. Проверить импорт
```bash
php artisan cms:import-json
# Должен вывести:
# ✓ Imported X users
# ✓ Imported X media files
# ✓ Imported X services
# ✓ Imported X cases
# ✓ Imported X pages
# ✓ Imported SEO config
```

### 3. Проверить API (curl/Postman)

**Public endpoints:**
```bash
curl http://localhost:8000/api/ping
curl http://localhost:8000/api/services
curl http://localhost:8000/api/cases
```

**Auth:**
```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"anastasirezepova@yandex.ru","password":"123123123"}' \
  -c cookies.txt

# Me (с cookies)
curl http://localhost:8000/api/auth/me -b cookies.txt
```

**Admin endpoints (требуют auth):**
```bash
# Сначала login (получить cookies)
# Затем:
curl http://localhost:8000/api/admin/services -b cookies.txt
```

---

## ⚠️ Что осталось сделать

### Контроллеры (заглушки нужно заполнить)

1. **Admin/CasesController** - реализовать CRUD по аналогии с ServicesController
2. **Admin/PagesController** - реализовать CRUD
3. **Admin/MediaController** - реализовать index, upload, update, destroy
4. **Admin/SeoController** - реализовать index, update
5. **Public/ServicesController** - реализовать index (только published, с фильтрами)
6. **Public/CasesController** - реализовать index и show (только published)
7. **Public/PagesController** - реализовать show и seo (только published)

### Дополнительно

- Настроить CORS для фронтенда (если нужно)
- Добавить фильтры по категориям в Public endpoints
- Реализовать загрузку файлов в MediaController
- Добавить пагинацию в Public endpoints
- Реализовать forgot/reset password (если нужно)

---

## 📝 Примечания

- Все пароли хранятся хешированными (bcrypt)
- Роль админа проверяется через `isAdmin()` метод в User модели
- `external_id` используется для идемпотентного импорта из JSON
- JSON поля (tags, blocks, seo) автоматически кастуются в массивы через casts
- Связи загружаются через `with()` для оптимизации запросов
- Фильтры поддерживают: `q` (поиск), `status`, `sort`, `per_page`

---

**Готово к следующему этапу: переписывание React админки на API**
