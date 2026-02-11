# Команды для обновления на сервере (Beget)

## Важно: перед обновлением

Если на сервере нет Node.js, нужно сначала собрать React локально и закоммитить `/build`:

```bash
# Локально (на вашем компьютере):
cd frontend
npm install
npm run build
git add build/
git commit -m "Build: добавлена сборка React"
git push origin main
```

## Команды для выполнения на сервере (SSH)

```bash
# 1. Перейти в директорию проекта
cd ~/bellahasias.ru/public_html

# 2. Обновить код из репозитория
git pull origin main

# 3. Перейти в Laravel и установить зависимости
cd laravel
composer install --no-dev --optimize-autoloader

# 4. Скопировать .env.example в .env (если .env еще не существует)
if [ ! -f .env ]; then
    cp .env.example .env
    php8.2 artisan key:generate
fi

# 5. Применить миграции (если есть новые)
php8.2 artisan migrate --force

# 6. Очистить все кеши
php8.2 artisan config:clear
php8.2 artisan route:clear
php8.2 artisan view:clear
php8.2 artisan cache:clear

# 7. Создать оптимизированные кеши
php8.2 artisan config:cache
php8.2 artisan route:cache
php8.2 artisan view:cache

# 8. Установить права доступа
chmod -R 755 storage bootstrap/cache
chmod -R 644 .env 2>/dev/null || true

# 9. Вернуться в корень и проверить структуру
cd ..
ls -la index.php
ls -la build/manifest.json 2>/dev/null || echo "⚠️  ВНИМАНИЕ: /build не найден! Нужно собрать React локально."
```

## Если на сервере есть Node.js (опционально)

```bash
# Собрать React на сервере
cd ~/bellahasias.ru/public_html/frontend
npm install
npm run build
cd ..
```

## Проверка после обновления

```bash
# Проверить API
curl https://bellahasias.ru/api/ping
# Должен вернуть: {"ok": true, "message": "API is working"}

# Проверить главную страницу
curl -I https://bellahasias.ru/
# Должен вернуть HTTP 200

# Проверить manifest
curl https://bellahasias.ru/build/manifest.json
# Должен вернуть JSON файл
```

## Быстрая команда (все в одном)

```bash
cd ~/bellahasias.ru/public_html && \
git pull origin main && \
cd laravel && \
composer install --no-dev --optimize-autoloader && \
php8.2 artisan migrate --force && \
php8.2 artisan config:clear && \
php8.2 artisan route:clear && \
php8.2 artisan view:clear && \
php8.2 artisan cache:clear && \
php8.2 artisan config:cache && \
php8.2 artisan route:cache && \
php8.2 artisan view:cache && \
chmod -R 755 storage bootstrap/cache && \
cd .. && \
echo "✅ Обновление завершено"
```
