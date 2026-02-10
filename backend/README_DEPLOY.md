# Деплой (без npm/composer на сервере)

Сборка React выполняется локально, build коммитится в git и пушится. Сервер по запросу делает `git pull` и artisan-команды.

## Настройка

### backend/.env

```env
DEPLOY_BRANCH=main
DEPLOY_REMOTE=origin
DEPLOY_TOKEN=your-secret-token
DEPLOY_ENDPOINT=https://bellahasias.ru/api/deploy
DEPLOY_FRONTEND_DIR=          # опционально, по умолчанию родитель backend/
DEPLOY_PUBLIC_BUILD_DIR=      # опционально, по умолчанию public/build
```

На сервере `DEPLOY_TOKEN` должен совпадать с тем, что передаётся в заголовке `X-Deploy-Token`.

## Frontend: basename для SPA

React Router использует `basename` из `VITE_APP_BASE`. Для деплоя в `/build/` создайте `.env.production` в корне проекта:

```
VITE_APP_BASE=/build
```

Иначе в dev (npm run dev) basename будет пустым.

## Локальный запуск

Из корня репозитория:

```bash
cd backend
php artisan deploy
```

### Флаги

- `--no-build` — пропустить npm ci, npm run build и синхронизацию
- `--no-push` — не делать git add/commit/push
- `--no-notify` — не отправлять POST на сервер
- `--message="msg"` — своё сообщение коммита
- `--branch=main` — ветка для push

Примеры:

```bash
php artisan deploy --no-build --no-push   # только синк (если build уже есть)
php artisan deploy --no-notify            # собрать, закоммитить, пушить, но не триггерить сервер
```

## Ограничения

- Перед деплоем `git status` должен быть чистым
- На сервере: только git, php, php artisan (без npm/composer)
- Rate limit: 5 запросов в минуту на POST /api/deploy
