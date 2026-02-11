# Миграция на Laravel API завершена

## Выполненные изменения

### Backend (Laravel)
1. ✅ Реализованы Admin CRUD контроллеры:
   - `CasesController` - CRUD с media pivot
   - `PagesController` - CRUD
   - `MediaController` - list/upload/update/delete
   - `SeoController` - get/update
   - `ServicesController` - обновлен для поддержки camelCase

### React API инфраструктура
1. ✅ Создан `apiClient.ts` с CSRF flow для Sanctum
2. ✅ Созданы API сервисы:
   - `auth.api.ts` - login/logout/me/forgot/reset
   - `services.api.ts` - с преобразованием данных
   - `cases.api.ts` - с преобразованием данных
   - `pages.api.ts` - с преобразованием данных
   - `media.api.ts` - с преобразованием данных
   - `seo.api.ts`

### Auth система
1. ✅ Переписан `AuthProvider` на Sanctum (cookie-based)
2. ✅ Обновлен `ProtectedRoute` для проверки роли admin

### Admin страницы (переписаны на API)
1. ✅ `Dashboard.tsx` - использует API для загрузки данных
2. ✅ `Services.tsx` - полный CRUD через API
3. ✅ `Cases.tsx` - полный CRUD через API с media pivot
4. ✅ `Pages.tsx` - полный CRUD через API
5. ✅ `Media.tsx` - upload/list/update/delete через API
6. ✅ `SEO.tsx` - get/update через API

### Public страницы (переписаны на API)
1. ✅ `CasePage.tsx` - загрузка кейса через API
2. ✅ `PageSEO.tsx` - загрузка SEO данных через API

## Измененные файлы

### Backend
- `laravel/app/Http/Controllers/Admin/CasesController.php`
- `laravel/app/Http/Controllers/Admin/MediaController.php`
- `laravel/app/Http/Controllers/Admin/PagesController.php`
- `laravel/app/Http/Controllers/Admin/SeoController.php`
- `laravel/app/Http/Controllers/Admin/ServicesController.php`
- `laravel/app/Http/Resources/CaseResource.php`

### Frontend - API инфраструктура
- `frontend/src/lib/apiClient.ts` (новый)
- `frontend/src/lib/api/auth.api.ts` (новый)
- `frontend/src/lib/api/services.api.ts` (новый)
- `frontend/src/lib/api/cases.api.ts` (новый)
- `frontend/src/lib/api/pages.api.ts` (новый)
- `frontend/src/lib/api/media.api.ts` (новый)
- `frontend/src/lib/api/seo.api.ts` (новый)

### Frontend - Auth
- `frontend/src/admin/hooks/useAuth.tsx`
- `frontend/src/admin/components/ProtectedRoute.tsx`

### Frontend - Admin страницы
- `frontend/src/admin/pages/Dashboard.tsx`
- `frontend/src/admin/pages/Services.tsx`
- `frontend/src/admin/pages/Cases.tsx`
- `frontend/src/admin/pages/Pages.tsx`
- `frontend/src/admin/pages/Media.tsx`
- `frontend/src/admin/pages/SEO.tsx`

### Frontend - Public страницы
- `frontend/src/pages/CasePage.tsx`
- `frontend/src/components/PageSEO.tsx`

### Dependencies
- `frontend/package.json` - добавлен axios
- `frontend/package-lock.json`

## Инструкции по проверке

### 1. Локальная проверка

```bash
# 1. Убедиться, что backend работает
cd laravel
php artisan serve

# 2. В другом терминале - запустить frontend dev server
cd frontend
npm run dev

# 3. Проверить сборку
npm run build
```

### 2. Проверка авторизации

1. Откройте `/admin/login`
2. Войдите с учетными данными из БД (email/password из users.json)
3. Проверьте, что после логина доступны все разделы админки
4. Проверьте, что `/api/auth/me` возвращает данные пользователя
5. Выйдите и проверьте, что `/admin/*` недоступны

### 3. Проверка Admin CRUD

#### Services
1. Откройте `/admin/services`
2. Создайте новую услугу
3. Отредактируйте существующую
4. Удалите услугу
5. Проверьте поиск и фильтрацию

#### Cases
1. Откройте `/admin/cases`
2. Создайте новый кейс
3. Привяжите медиа-файлы к кейсу
4. Отредактируйте кейс
5. Удалите кейс

#### Pages
1. Откройте `/admin/pages`
2. Создайте новую страницу
3. Добавьте блоки через BlockEditor
4. Сохраните изменения
5. Проверьте, что блоки сохраняются

#### Media
1. Откройте `/admin/media`
2. Загрузите файл (изображение/видео)
3. Проверьте, что файл появился в списке
4. Отредактируйте alt/category
5. Удалите файл

#### SEO
1. Откройте `/admin/seo`
2. Измените Site URL
3. Сохраните
4. Проверьте SEO настройки для страниц

### 4. Проверка Public API

```bash
# Проверить public endpoints
curl http://localhost:8000/api/services
curl http://localhost:8000/api/cases
curl http://localhost:8000/api/cases/{slug}
curl http://localhost:8000/api/pages/{slug}
curl http://localhost:8000/api/seo
```

### 5. Проверка Public страниц

1. Откройте главную страницу `/`
2. Проверьте, что ServicesSection и PortfolioSection отображаются
3. Откройте `/portfolio`
4. Откройте конкретный кейс `/portfolio/{slug}`
5. Проверьте, что данные загружаются из API

### 6. Проверка на сервере

```bash
# На сервере
cd ~/bellahasias.ru/public_html
git pull origin main
cd laravel
php8.2 composer.phar install --no-dev --optimize-autoloader
php8.2 artisan config:cache
php8.2 artisan route:cache
php8.2 artisan view:cache
```

## Важные замечания

1. **localStorage больше не используется** для хранения данных сущностей (services/cases/pages/media/seo)
2. **JSON файлы** в `frontend/src/data/` остаются только для команды `cms:import-json`
3. **CSRF защита** работает автоматически через `apiClient.ts`
4. **Авторизация** основана на Sanctum cookie-based SPA auth
5. **Все данные** теперь хранятся в БД и загружаются через API

## Известные ограничения

1. ServicesSection и PortfolioSection на главной странице используют хардкод данные (можно переписать позже)
2. Media upload требует правильной настройки storage в Laravel (disk: 'public')
3. OG images в PageSEO требуют доработки для получения URL из media API

## Следующие шаги (опционально)

1. Переписать ServicesSection и PortfolioSection на API
2. Добавить обработку ошибок с toast уведомлениями
3. Добавить loading states для всех async операций
4. Оптимизировать загрузку данных (React Query или SWR)
5. Добавить кеширование на уровне API
