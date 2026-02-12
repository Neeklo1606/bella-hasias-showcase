# Миграция статических данных услуг в админ панель

## Выполненные изменения

### Backend

1. **Миграция `add_slug_to_services_table`**
   - Добавлено поле `slug` в таблицу `services`
   - Поле уникальное, после `title`

2. **ServiceSeeder**
   - Создан seeder с данными всех 9 услуг из статических страниц
   - Каждая услуга содержит:
     - `title` - название
     - `slug` - уникальный идентификатор для URL
     - `description` - описание (первый абзац = intro, остальные = caseBlocks)
     - `category` - категория (stylist/creator)
     - `tags` - теги
     - `cta_label` и `cta_link` - кнопка призыва к действию
     - `sort_order` - порядок сортировки
     - `status` - статус (published)

3. **Обновлен PublicServicesController**
   - Добавлен метод `show(string $slug)` для получения услуги по slug

4. **Обновлен ServiceResource**
   - Добавлено поле `slug` в ответ API

5. **Обновлен Service Model**
   - Добавлено поле `slug` в `$fillable`

6. **Обновлен DatabaseSeeder**
   - Добавлен вызов `ServiceSeeder::class`

### Frontend

1. **Создан универсальный компонент `ServicePage.tsx`**
   - Загружает данные услуги по slug из API
   - Разделяет description на intro и caseBlocks (по `\n\n`)
   - Использует `ServicePageLayout` для отображения

2. **Обновлена страница `/services`**
   - Удален статический массив `allServices`
   - Загрузка данных из API через `servicesApi.list()`
   - Фильтрация по категориям работает с данными из API
   - Использует изображения из API (cover или image)

3. **Обновлены роуты в `App.tsx`**
   - Удалены все статические роуты услуг (`/services/brand-styling`, `/services/wardrobe-audit` и т.д.)
   - Добавлен один динамический роут `/services/:slug`
   - Удалены импорты статических компонентов услуг

4. **Обновлен `ServicesSection`**
   - Использует `slug` для навигации вместо `getServiceHref()`

5. **Обновлен `services.api.ts`**
   - Добавлен метод `getBySlug(slug: string)`
   - Сохраняет полные объекты `image` и `cover` в ответах

6. **Обновлен тип `Service`**
   - Добавлено опциональное поле `slug`

## Команды для деплоя

### 1. Обновление кода
```bash
cd ~/bellahasias.ru/public_html && \
git pull origin main && \
cd laravel && \
php8.2 artisan migrate && \
php8.2 artisan db:seed --class=ServiceSeeder && \
php8.2 artisan config:clear && \
php8.2 artisan config:cache && \
php8.2 artisan route:clear && \
php8.2 artisan route:cache
```

### 2. Проверка данных
```bash
cd ~/bellahasias.ru/public_html/laravel
php8.2 artisan tinker
```

В tinker:
```php
\App\Models\Service::count(); // Должно быть 9
\App\Models\Service::pluck('slug'); // Проверить все slug
```

### 3. Проверка после деплоя

1. Откройте `/services` - должны отображаться услуги из базы данных
2. Откройте `/services/brand-styling` - должна загрузиться страница услуги из API
3. Проверьте все slug:
   - `/services/brand-styling`
   - `/services/wardrobe-audit`
   - `/services/personal-shopping`
   - `/services/capsule-wardrobe`
   - `/services/event-look`
   - `/services/client-shoot`
   - `/services/ugc`
   - `/services/ai-content`
   - `/services/photo-video`

## Структура данных в seeder

Каждая услуга содержит:
- **title** - название услуги
- **slug** - уникальный идентификатор для URL (например, `brand-styling`)
- **description** - полное описание, разделенное на абзацы через `\n\n`:
  - Первый абзац = intro (краткое описание)
  - Остальные абзацы = caseBlocks (детальное описание)
- **category** - `stylist` или `creator`
- **tags** - массив тегов
- **cta_label** - текст кнопки (обычно "Записаться")
- **cta_link** - ссылка для кнопки (обычно Telegram)
- **sort_order** - порядок сортировки (1-9)
- **status** - `published` для публикации

## Важно

- Все статические компоненты услуг (`BrandStyling.tsx`, `WardrobeAudit.tsx` и т.д.) больше не используются, но оставлены в репозитории для справки
- Данные теперь управляются через админ панель (`/admin/services`)
- Для добавления изображений к услугам нужно загрузить их через `/admin/media` и привязать к услуге через `image_id` или `cover_id`
