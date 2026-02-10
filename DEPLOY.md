# Подготовка к деплою

## Чек-лист перед выкладкой

Перед деплоем выполните одну команду:

```bash
npm run predeploy
```

Она по очереди запускает:

1. **ESLint** — проверка кода
2. **TypeScript** — проверка типов (`tsc --noEmit`)
3. **Production build** — сборка в `dist/`

Если все три шага завершились без ошибок, папка `dist/` готова к загрузке на хостинг.

## Ручная проверка (по желанию)

| Шаг | Команда | Описание |
|-----|---------|----------|
| Линт | `npm run lint` | Проверка стиля и ошибок ESLint |
| Типы | `npm run typecheck` | Проверка TypeScript без сборки |
| Сборка | `npm run build` | Сборка в `dist/` |
| Превью | `npm run preview` | Локальный просмотр собранного сайта |

## Что должно быть в `dist/` после сборки

- `index.html` — точка входа
- `assets/` — JS, CSS, изображения (с хешами в именах)
- `.htaccess` — правила для SPA (Apache)
- `manifest.json`, `robots.txt`, `sitemap.xml` — из `public/`
- `icons/`, `videos/`, `uploads/` — статика из `public/`
- `logo3.svg`, `og-image.jpg` и т.п.

Пути в `index.html` должны быть относительными (`./assets/...`) — так настроен `base: "./"` в Vite.

## Деплой на хостинг

Подробная инструкция по загрузке на Beget и настройке .htaccess — в [README.md](./README.md#деплой-на-бегет-beget).

## После деплоя

- Откройте главную и несколько маршрутов (/contacts, /portfolio, /services).
- Проверьте админку: /admin/login.
- Убедитесь, что sitemap.xml и robots.txt отдаются с сервера.
