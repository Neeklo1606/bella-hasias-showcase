# Bella Hasias — Стилист и контент-креатор

Сайт-визитка с Headless CMS админкой на стеке **Laravel 12 API + React SPA**.

## Архитектура

- **Backend:** Laravel 12 (API)
- **Frontend:** React 18 + Vite 6 + TypeScript
- **UI:** TailwindCSS, ShadCN UI, Framer Motion
- **Роутинг:** React Router v6 (SPA) + Laravel routes (API)
- **CMS:** Локальная админка с хранением в localStorage + JSON-файлы в `frontend/src/data/`

## Структура проекта

```
/ (корень репозитория = public_html на сервере)
├── index.php              # Точка входа Laravel
├── .htaccess              # Apache конфигурация
├── build/                 # Собранный React (коммитится в git)
│   ├── .vite/
│   │   └── manifest.json  # Vite manifest
│   ├── assets/            # JS, CSS, изображения
│   └── index.html
├── laravel/               # Laravel проект (не публичный)
│   ├── app/
│   ├── routes/
│   │   ├── web.php        # SPA fallback
│   │   └── api.php        # API роуты
│   ├── resources/
│   │   └── views/
│   │       └── app.blade.php  # Blade шаблон для React
│   └── ...
└── frontend/              # Исходники React (не публичный)
    ├── src/
    │   ├── admin/         # Админ-панель
    │   ├── components/    # Публичные компоненты
    │   ├── pages/         # Публичные страницы
    │   └── data/          # JSON-данные
    ├── public/
    └── vite.config.ts     # Сборка в ../build
```

## Локальная разработка

### Установка зависимостей

```bash
# Frontend (React)
cd frontend
npm install

# Backend (Laravel)
cd ../laravel
composer install
```

### Запуск в режиме разработки

```bash
# Frontend (в отдельном терминале)
cd frontend
npm run dev
# Откроется на http://localhost:8080

# Backend (в отдельном терминале)
cd laravel
php artisan serve
# Откроется на http://localhost:8000
```

### Сборка для продакшена

```bash
cd frontend
npm run build
# Сборка будет в /build (корень репозитория)
```

## Админ-панель

- **URL:** `/admin` (редирект на `/admin/dashboard`)
- **Логин:** `/admin/login`
- **Учётные данные:** `anastasirezepova@yandex.ru` / `123123123`

### Разделы админки

| Раздел    | Маршрут             | Описание                          |
|-----------|---------------------|-----------------------------------|
| Dashboard | /admin/dashboard    | Панель управления, метрики        |
| Медиа     | /admin/media        | Медиатеки, загрузка файлов        |
| Услуги    | /admin/services     | CRUD услуг                        |
| Кейсы     | /admin/cases        | Портфолио и кейсы                 |
| Страницы  | /admin/pages        | Редактор блоков страниц           |
| SEO       | /admin/seo          | Мета-теги, sitemap, robots        |
| Статистика| /admin/stats        | Заглушка                          |
| Настройки | /admin/settings     | Заглушка                          |

## API

Laravel API доступен по маршруту `/api/*`:

```bash
# Тестовый endpoint
GET /api/ping
# Возвращает: {"ok": true, "message": "API is working"}
```

## Деплой на Beget

### Подготовка (локально)

```bash
# 1. Собрать React
cd frontend
npm install
npm run build

# 2. Закоммитить сборку
git add build/
git commit -m "Build: обновлена сборка React"
git push origin main
```

### На сервере (SSH)

```bash
cd ~/bellahasias.ru/public_html

# Обновить код
git pull origin main

# Установить зависимости Laravel
cd laravel
php8.2 composer.phar install --no-dev --optimize-autoloader

# Применить миграции
php8.2 artisan migrate --force

# Очистить и пересобрать кеши
php8.2 artisan config:clear
php8.2 artisan route:clear
php8.2 artisan view:clear
php8.2 artisan cache:clear
php8.2 artisan config:cache
php8.2 artisan route:cache
php8.2 artisan view:cache

# Права доступа
chmod -R 755 storage bootstrap/cache
```

**Подробные инструкции:**
- `SERVER_STEPS.md` — пошаговая настройка
- `README_DEPLOY.md` — полная документация деплоя
- `FIX_COMPOSER_PHP82.md` — решение проблем с Composer

## Конфигурация

- **Vite:** `base: "/build/"` — сборка в `/build` с manifest
- **Laravel:** SPA fallback через `Route::fallback()` для всех маршрутов кроме `/api/*`
- **Данные CMS:** `frontend/src/data/*.json` — начальные данные; изменения сохраняются в localStorage браузера

## Важные замечания

- **DocumentRoot** на Beget строго указывает на `~/DOMAIN/public_html` — менять нельзя
- **PHP версия:** требуется PHP >= 8.2.0 для Laravel 12
- **Build коммитится:** `/build` коммитится в репозиторий, так как на сервере может не быть Node.js
- **Пути:** Все пути в React должны начинаться с `/build/`

## Troubleshooting

### Ошибка "Build not found"
- Убедитесь, что `/build` существует и содержит `.vite/manifest.json`
- Проверьте, что сборка выполнена: `cd frontend && npm run build`

### Ошибка 500 Internal Server Error
- Проверьте логи: `laravel/storage/logs/laravel.log`
- Убедитесь, что PHP версия >= 8.2.0
- Проверьте права доступа: `chmod -R 755 storage bootstrap/cache`

### API не работает
- Проверьте, что `laravel/routes/api.php` существует
- Убедитесь, что в `laravel/bootstrap/app.php` включен API роутинг
- Проверьте `.htaccess` — он должен пропускать `/api/*` через `index.php`

## Лицензия

Private.
