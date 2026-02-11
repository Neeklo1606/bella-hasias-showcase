# АУДИТ ПРОЕКТА: Миграция с localStorage/JSON на Laravel API

**Дата:** 2025-02-11  
**Цель:** Полный аудит текущей архитектуры данных перед миграцией на Laravel API

---

## 1. МАРШРУТЫ (ROUTES)

### 1.1. Admin Routes (`/admin/*`)

| Маршрут | Компонент | Описание |
|---------|-----------|----------|
| `/admin/login` | `AdminLogin` | Страница входа |
| `/admin` | `AdminLayout` | Layout админки (редирект на `/admin/dashboard`) |
| `/admin/dashboard` | `AdminDashboard` | Панель управления |
| `/admin/media` | `AdminMedia` | Управление медиафайлами |
| `/admin/services` | `AdminServices` | CRUD услуг |
| `/admin/cases` | `AdminCases` | CRUD кейсов/портфолио |
| `/admin/pages` | `AdminPages` | Редактор страниц с блоками |
| `/admin/seo` | `AdminSEO` | SEO настройки, sitemap, robots |
| `/admin/stats` | `AdminStats` | Статистика (заглушка) |
| `/admin/settings` | `AdminSettings` | Настройки (заглушка) |

**Файл:** `frontend/src/App.tsx` (строки 77-89)

### 1.2. Public Routes

| Маршрут | Компонент | Описание |
|---------|-----------|----------|
| `/` | `Index` | Главная страница |
| `/portfolio` | `Portfolio` | Портфолио (галерея) |
| `/portfolio/:slug` | `CasePage` | Страница кейса |
| `/services` | `Services` | Список услуг |
| `/contacts` | `Contacts` | Контакты |
| `/services/stylist` | `ServiceStylist` | Услуга: стилист |
| `/services/ugc` | `ServiceUgc` | Услуга: UGC |
| `/services/photographer` | `ServicePhotographer` | Услуга: фотограф |
| `/services/brand-styling` | `BrandStyling` | Услуга: стилизация бренда |
| `/services/client-shoot` | `ClientShoot` | Услуга: клиентская съёмка |
| `/services/wardrobe-audit` | `WardrobeAudit` | Услуга: разбор гардероба |
| `/services/personal-shopping` | `PersonalShopping` | Услуга: персональный шоппинг |
| `/services/capsule-wardrobe` | `CapsuleWardrobe` | Услуга: капсульный гардероб |
| `/services/event-look` | `EventLook` | Услуга: образ на мероприятие |
| `/services/photo-video` | `PhotoVideo` | Услуга: фото/видео |
| `/services/ai-content` | `AIContent` | Услуга: AI-контент |
| `/privacy` | `Privacy` | Политика конфиденциальности |
| `/terms` | `Terms` | Условия использования |
| `/consent` | `Consent` | Согласие |
| `/feedback` | `Feedback` | Обратная связь |
| `/vk` | `VKLanding` | VK лендинг |

**Файл:** `frontend/src/App.tsx` (строки 60-97)

---

## 2. LOCALSTORAGE: ГДЕ ЧИТАЕТСЯ/ПИШЕТСЯ

### 2.1. Storage Keys

| Key | Файл | Описание |
|-----|------|----------|
| `cms_services` | `frontend/src/admin/lib/servicesStorage.ts` | Услуги |
| `cms_cases` | `frontend/src/admin/lib/casesStorage.ts` | Кейсы/портфолио |
| `cms_pages` | `frontend/src/admin/lib/pagesStorage.ts` | Страницы с блоками |
| `cms_media` | `frontend/src/admin/lib/mediaStorage.ts` | Медиафайлы |
| `cms_seo_config` | `frontend/src/admin/lib/seoStorage.ts` | SEO конфигурация (siteUrl) |
| `cms_auth_token` | `frontend/src/admin/hooks/useAuth.tsx` | Токен авторизации |
| `cms_auth_user` | `frontend/src/admin/hooks/useAuth.tsx` | Данные пользователя |

### 2.2. Функции чтения/записи

#### Services
- **Файл:** `frontend/src/admin/lib/servicesStorage.ts`
- `loadServices()`: читает из localStorage, fallback на `@/data/services.json`
- `saveServices(items)`: пишет в localStorage
- **Используется в:**
  - `frontend/src/admin/pages/Services.tsx` (строки 9, 27, 33)
  - `frontend/src/pages/CasePage.tsx` (строка 16)
  - `frontend/src/admin/pages/Cases.tsx` (строка 31)
  - `frontend/src/admin/lib/sitemapGenerator.ts` (косвенно)

#### Cases
- **Файл:** `frontend/src/admin/lib/casesStorage.ts`
- `loadCases()`: читает из localStorage, fallback на `@/data/cases.json`
- `saveCases(items)`: пишет в localStorage
- **Используется в:**
  - `frontend/src/admin/pages/Cases.tsx` (строки 9, 30, 37)
  - `frontend/src/pages/CasePage.tsx` (строка 15)
  - `frontend/src/admin/pages/SEO.tsx` (строка 13, 58)
  - `frontend/src/admin/lib/sitemapGenerator.ts` (косвенно)

#### Pages
- **Файл:** `frontend/src/admin/lib/pagesStorage.ts`
- `loadPages()`: читает из localStorage, fallback на `@/data/pages.json`
- `savePages(items)`: пишет в localStorage
- **Используется в:**
  - `frontend/src/admin/pages/Pages.tsx` (строки 16, 42, 48)
  - `frontend/src/components/PageSEO.tsx` (строка 16)
  - `frontend/src/admin/pages/SEO.tsx` (строки 9, 34, 39, 58, 62)
  - `frontend/src/admin/lib/sitemapGenerator.ts` (косвенно)
  - `frontend/src/admin/lib/robotsGenerator.ts` (косвенно)

#### Media
- **Файл:** `frontend/src/admin/lib/mediaStorage.ts`
- `loadMedia()`: читает из localStorage, fallback на `@/data/media.json`
- `saveMedia(items)`: пишет в localStorage
- **Используется в:**
  - `frontend/src/admin/pages/Media.tsx` (строки 13, 44, 49)
  - `frontend/src/admin/pages/Services.tsx` (строки 10, 28)
  - `frontend/src/admin/pages/Cases.tsx` (строка 32)
  - `frontend/src/admin/pages/Pages.tsx` (строка 43)
  - `frontend/src/pages/CasePage.tsx` (строка 17)
  - `frontend/src/components/PageSEO.tsx` (строка 18)

#### SEO Config
- **Файл:** `frontend/src/admin/lib/seoStorage.ts`
- `loadSEOConfig()`: читает из localStorage, fallback на `@/data/seo.json`
- `saveSEOConfig(config)`: пишет в localStorage
- **Используется в:**
  - `frontend/src/components/PageSEO.tsx` (строка 17)
  - `frontend/src/admin/pages/SEO.tsx` (строки 16, 36, 54)
  - `frontend/src/admin/lib/sitemapGenerator.ts` (строка 34)
  - `frontend/src/admin/lib/robotsGenerator.ts` (строка 12)

#### Auth
- **Файл:** `frontend/src/admin/hooks/useAuth.tsx`
- `localStorage.getItem(AUTH_TOKEN_KEY)` / `setItem(AUTH_TOKEN_KEY)`
- `localStorage.getItem(AUTH_USER_KEY)` / `setItem(AUTH_USER_KEY)`
- `localStorage.removeItem()` при logout
- **Используется в:**
  - `frontend/src/admin/hooks/useAuth.tsx` (строки 35-36, 65-66, 72-73)
  - `frontend/src/admin/components/ProtectedRoute.tsx` (через `useAuth()`)

---

## 3. ИМПОРТЫ ИЗ JSON ФАЙЛОВ

### 3.1. Прямые импорты JSON

| Файл | Импорт | Использование |
|------|--------|---------------|
| `frontend/src/admin/lib/servicesStorage.ts` | `@/data/services.json` | Fallback при отсутствии в localStorage |
| `frontend/src/admin/lib/casesStorage.ts` | `@/data/cases.json` | Fallback при отсутствии в localStorage |
| `frontend/src/admin/lib/pagesStorage.ts` | `@/data/pages.json` | Fallback при отсутствии в localStorage |
| `frontend/src/admin/lib/mediaStorage.ts` | `@/data/media.json` | Fallback при отсутствии в localStorage |
| `frontend/src/admin/lib/seoStorage.ts` | `@/data/seo.json` | Fallback при отсутствии в localStorage |
| `frontend/src/admin/hooks/useAuth.tsx` | `@/data/users.json` | Проверка логина/пароля (хардкод) |
| `frontend/src/admin/pages/Dashboard.tsx` | `@/data/banners.json` | Отображение баннеров (не используется в storage) |

### 3.2. Структура JSON файлов

#### `frontend/src/data/services.json`
```json
[
  {
    "id": "svc-1",
    "title": "Персональный стилист",
    "description": "...",
    "category": "stylist",
    "imageId": "m1",
    "coverId": "m1",
    "tags": ["стилизация", "гардероб"],
    "ctaLabel": "Записаться",
    "ctaLink": "/services/stylist",
    "updatedAt": "2025-02-08T10:30:00.000Z"
  }
]
```

#### `frontend/src/data/cases.json`
```json
[
  {
    "id": "case-1",
    "title": "Editorial Portrait",
    "slug": "editorial-portrait",
    "description": "...",
    "serviceId": "svc-3",
    "mediaIds": ["m1", "m2"],
    "tags": ["фото", "портрет"],
    "createdAt": "2025-02-01T10:00:00.000Z",
    "updatedAt": "2025-02-08T12:00:00.000Z"
  }
]
```

#### `frontend/src/data/pages.json`
```json
[
  {
    "id": "page-home",
    "slug": "home",
    "title": "Главная",
    "blocks": [{"id":"b1","type":"hero","visible":true,"data":{...}}],
    "seo": {
      "metaTitle": "...",
      "metaDescription": "...",
      "ogImageId": "m1",
      "index": true
    },
    "updatedAt": "2025-02-08T12:00:00.000Z"
  }
]
```

#### `frontend/src/data/media.json`
```json
[
  {
    "id": "m1",
    "filename": "og-image.jpg",
    "src": "/og-image.jpg",
    "category": "Баннеры",
    "alt": "Hero Banner",
    "createdAt": "2025-02-08T15:20:00.000Z"
  }
]
```

#### `frontend/src/data/seo.json`
```json
{
  "siteUrl": "https://bellahasias.ru"
}
```

#### `frontend/src/data/users.json`
```json
[
  {
    "id": "admin-1",
    "name": "Anastasia Rezepova",
    "email": "anastasirezepova@yandex.ru",
    "password": "123123123"
  }
]
```

---

## 4. ТАБЛИЦА СУЩНОСТЕЙ: ГДЕ ХРАНИТСЯ → ГДЕ ДОЛЖНА ХРАНИТЬСЯ

| Сущность | Где хранится сейчас | Где должна храниться (БД) | Поля (типы) |
|----------|---------------------|---------------------------|-------------|
| **services** | `localStorage: cms_services` + `data/services.json` | `services` | `id` (bigint, PK), `title` (string), `description` (text), `category` (string, nullable), `image_id` (bigint, FK → media_files), `cover_id` (bigint, FK → media_files, nullable), `tags` (json), `cta_label` (string), `cta_link` (string), `sort_order` (int, default 0), `status` (enum: draft/published), `created_at`, `updated_at` |
| **cases** | `localStorage: cms_cases` + `data/cases.json` | `cases` | `id` (bigint, PK), `title` (string), `slug` (string, unique), `description` (text), `service_id` (bigint, FK → services), `tags` (json), `status` (enum: draft/published), `sort_order` (int, default 0), `created_at`, `updated_at` |
| **pages** | `localStorage: cms_pages` + `data/pages.json` | `pages` | `id` (bigint, PK), `slug` (string, unique), `title` (string), `blocks` (json), `seo` (json), `status` (enum: draft/published), `created_at`, `updated_at` |
| **media_files** | `localStorage: cms_media` + `data/media.json` + IndexedDB (через `lib/mediaFilesStorage.ts`) | `media_files` | `id` (bigint, PK), `filename` (string), `original_filename` (string), `path` (string), `mime_type` (string), `size` (bigint), `category` (string), `alt` (string, nullable), `user_id` (bigint, FK → users, nullable), `created_at`, `updated_at` |
| **seo_meta** | `localStorage: cms_seo_config` + `data/seo.json` | `seo_meta` (или `settings`) | `id` (bigint, PK), `key` (string, unique), `value` (json), `updated_at` |
| **users** | `data/users.json` (хардкод) | `users` | `id` (bigint, PK), `name` (string), `email` (string, unique), `password` (string, hashed), `role` (enum: admin/user), `email_verified_at` (timestamp, nullable), `created_at`, `updated_at` |
| **case_media** | В `cases.mediaIds` (массив ID) | `case_media` (pivot) | `id` (bigint, PK), `case_id` (bigint, FK → cases), `media_file_id` (bigint, FK → media_files), `sort_order` (int, default 0), `created_at` |

**Примечания:**
- `pages.blocks` и `pages.seo` хранятся как JSON (гибкая структура блоков)
- `services.tags` и `cases.tags` хранятся как JSON массивы
- `seo_meta` можно объединить с `settings` или сделать отдельной таблицей для ключ-значение
- `case_media` — pivot таблица для связи many-to-many между cases и media_files

---

## 5. ФАЙЛЫ, КОТОРЫЕ НУЖНО ПЕРЕПИСАТЬ

### 5.1. Storage Layer (полная замена на API)

| Файл | Действие |
|------|----------|
| `frontend/src/admin/lib/servicesStorage.ts` | Удалить, заменить на API вызовы |
| `frontend/src/admin/lib/casesStorage.ts` | Удалить, заменить на API вызовы |
| `frontend/src/admin/lib/pagesStorage.ts` | Удалить, заменить на API вызовы |
| `frontend/src/admin/lib/mediaStorage.ts` | Удалить, заменить на API вызовы |
| `frontend/src/admin/lib/seoStorage.ts` | Удалить, заменить на API вызовы |

### 5.2. Admin Pages (переписать на API)

| Файл | Изменения |
|------|-----------|
| `frontend/src/admin/pages/Services.tsx` | Заменить `loadServices()`/`saveServices()` на API, добавить пагинацию/фильтры |
| `frontend/src/admin/pages/Cases.tsx` | Заменить `loadCases()`/`saveCases()` на API, добавить пагинацию/фильтры |
| `frontend/src/admin/pages/Pages.tsx` | Заменить `loadPages()`/`savePages()` на API |
| `frontend/src/admin/pages/Media.tsx` | Заменить `loadMedia()`/`saveMedia()` на API, добавить загрузку файлов через API |
| `frontend/src/admin/pages/SEO.tsx` | Заменить `loadSEOConfig()`/`saveSEOConfig()` на API |

### 5.3. Public Pages (переписать на Public API)

| Файл | Изменения |
|------|-----------|
| `frontend/src/pages/CasePage.tsx` | Заменить `loadCases()`/`loadServices()`/`loadMedia()` на GET `/api/cases/{slug}` |
| `frontend/src/components/PageSEO.tsx` | Заменить `loadPages()`/`loadMedia()`/`loadSEOConfig()` на GET `/api/pages/{slug}` или `/api/seo` |

### 5.4. Auth (переписать на Sanctum)

| Файл | Изменения |
|------|-----------|
| `frontend/src/admin/hooks/useAuth.tsx` | Полностью переписать: убрать localStorage, добавить Sanctum cookie auth, CSRF flow |
| `frontend/src/admin/components/ProtectedRoute.tsx` | Обновить проверку авторизации через `useAuth()` |

### 5.5. Новые файлы (создать)

| Файл | Описание |
|------|----------|
| `frontend/src/lib/apiClient.ts` | Axios instance с withCredentials, CSRF interceptor, 401 → redirect |
| `frontend/src/admin/lib/api/services.ts` | API функции для services (CRUD) |
| `frontend/src/admin/lib/api/cases.ts` | API функции для cases (CRUD) |
| `frontend/src/admin/lib/api/pages.ts` | API функции для pages (CRUD) |
| `frontend/src/admin/lib/api/media.ts` | API функции для media (CRUD + upload) |
| `frontend/src/admin/lib/api/seo.ts` | API функции для SEO |
| `frontend/src/admin/lib/api/auth.ts` | API функции для auth (login/logout/me) |

### 5.6. Laravel Backend (создать)

| Файл/Директория | Описание |
|----------------|----------|
| `laravel/database/migrations/xxxx_create_services_table.php` | Миграция services |
| `laravel/database/migrations/xxxx_create_cases_table.php` | Миграция cases |
| `laravel/database/migrations/xxxx_create_pages_table.php` | Миграция pages |
| `laravel/database/migrations/xxxx_create_media_files_table.php` | Миграция media_files |
| `laravel/database/migrations/xxxx_create_case_media_table.php` | Миграция pivot case_media |
| `laravel/database/migrations/xxxx_create_seo_meta_table.php` | Миграция seo_meta (или settings) |
| `laravel/app/Models/Service.php` | Eloquent модель |
| `laravel/app/Models/Case.php` | Eloquent модель |
| `laravel/app/Models/Page.php` | Eloquent модель |
| `laravel/app/Models/MediaFile.php` | Eloquent модель |
| `laravel/app/Models/SeoMeta.php` | Eloquent модель |
| `laravel/app/Http/Controllers/Admin/ServicesController.php` | Admin CRUD controller |
| `laravel/app/Http/Controllers/Admin/CasesController.php` | Admin CRUD controller |
| `laravel/app/Http/Controllers/Admin/PagesController.php` | Admin CRUD controller |
| `laravel/app/Http/Controllers/Admin/MediaController.php` | Admin CRUD + upload controller |
| `laravel/app/Http/Controllers/Admin/SeoController.php` | Admin SEO controller |
| `laravel/app/Http/Controllers/AuthController.php` | Auth controller (login/logout/me) |
| `laravel/app/Http/Controllers/Public/ServicesController.php` | Public read-only controller |
| `laravel/app/Http/Controllers/Public/CasesController.php` | Public read-only controller |
| `laravel/app/Http/Controllers/Public/PagesController.php` | Public read-only controller |
| `laravel/app/Http/Requests/StoreServiceRequest.php` | Валидация |
| `laravel/app/Http/Requests/UpdateServiceRequest.php` | Валидация |
| `laravel/app/Http/Resources/ServiceResource.php` | API Resource |
| `laravel/app/Http/Resources/CaseResource.php` | API Resource |
| `laravel/app/Http/Resources/PageResource.php` | API Resource |
| `laravel/app/Http/Resources/MediaFileResource.php` | API Resource |
| `laravel/routes/api.php` | API routes (public + admin) |
| `laravel/database/seeders/ServicesSeeder.php` | Seeder из JSON |
| `laravel/database/seeders/CasesSeeder.php` | Seeder из JSON |
| `laravel/database/seeders/PagesSeeder.php` | Seeder из JSON |
| `laravel/database/seeders/MediaFilesSeeder.php` | Seeder из JSON |
| `laravel/app/Console/Commands/ImportJsonCommand.php` | Команда импорта из JSON |

---

## 6. ДОПОЛНИТЕЛЬНЫЕ ЗАМЕЧАНИЯ

### 6.1. IndexedDB для Media
- Файл `frontend/src/lib/mediaFilesStorage.ts` использует IndexedDB для хранения загруженных файлов
- При миграции на API нужно:
  - Загружать файлы через `POST /api/admin/media/upload`
  - Хранить файлы на сервере в `laravel/storage/app/public/media/`
  - Возвращать URL через `Storage::url()`

### 6.2. Sitemap и Robots генерация
- `frontend/src/admin/lib/sitemapGenerator.ts` и `robotsGenerator.ts` генерируют файлы на клиенте
- После миграции:
  - Генерировать на сервере через Laravel routes: `GET /sitemap.xml`, `GET /robots.txt`
  - Или через Artisan команды: `php artisan sitemap:generate`

### 6.3. Публичные компоненты
- `ServicesSection.tsx` и `PortfolioSection.tsx` используют хардкод массивы услуг/портфолио
- После миграции нужно получать данные через Public API

### 6.4. Статические страницы услуг
- Страницы `/services/*` (BrandStyling, ClientShoot и т.д.) — статические компоненты
- Можно оставить как есть или перевести на динамические страницы через `pages` с блоками

---

## 7. ПРИОРИТЕТЫ МИГРАЦИИ

1. **Высокий приоритет:**
   - Auth (Sanctum)
   - Services CRUD
   - Cases CRUD
   - Media upload/CRUD

2. **Средний приоритет:**
   - Pages CRUD
   - SEO config
   - Public API endpoints

3. **Низкий приоритет:**
   - Sitemap/robots генерация на сервере
   - Миграция статических страниц услуг

---

## 8. СПИСОК ФАЙЛОВ ДЛЯ ИЗМЕНЕНИЯ (ИТОГО)

**Frontend (React):**
- 5 storage файлов (удалить/заменить)
- 5 admin pages (переписать)
- 2 public pages (переписать)
- 1 auth hook (переписать)
- 1-2 компонента (обновить)
- 6+ новых API файлов (создать)

**Backend (Laravel):**
- 6+ миграций (создать)
- 5+ моделей (создать)
- 8+ контроллеров (создать)
- 10+ Request классов (создать)
- 4+ Resource классов (создать)
- API routes (обновить)
- 4+ seeders (создать)
- 1 команда импорта (создать)

**Итого:** ~50+ файлов для изменения/создания

---

**Конец отчёта**
