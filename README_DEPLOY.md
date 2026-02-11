# Деплой на Beget

## Структура проекта

```
/ (корень репозитория = public_html на сервере)
  index.php              # Точка входа Laravel
  .htaccess              # Apache конфигурация
  build/                 # Собранный React (коммитится в git)
  laravel/               # Laravel проект (не публичный)
  frontend/              # Исходники React (не публичный)
```

## Команды деплоя на сервере (SSH)

```bash
# 1. Перейти в директорию проекта
cd ~/bellahasias.ru/public_html

# 2. Обновить код из репозитория
git pull origin main

# 3. Установить/обновить зависимости Laravel
cd laravel
composer install --no-dev --optimize-autoloader

# 4. Применить миграции (если есть новые)
php8.2 artisan migrate --force

# 5. Очистить и пересобрать кеш
php8.2 artisan config:clear
php8.2 artisan route:clear
php8.2 artisan view:clear
php8.2 artisan cache:clear

# 6. Создать оптимизированные кеши
php8.2 artisan config:cache
php8.2 artisan route:cache
php8.2 artisan view:cache

# 7. Установить права доступа (если нужно)
chmod -R 755 storage bootstrap/cache
chmod -R 644 .env
```

## Локальная сборка React (перед коммитом)

```bash
# Перейти в директорию frontend
cd frontend

# Установить зависимости (если еще не установлены)
npm install

# Собрать проект
npm run build

# Сборка будет в /build (корень репозитория)
# Коммитить /build в git
```

## Проверка после деплоя

1. Открыть главную страницу: `https://bellahasias.ru/`
   - Должна открыться React SPA

2. Проверить API: `https://bellahasias.ru/api/ping`
   - Должен вернуть: `{"ok": true, "message": "API is working"}`

3. Проверить SPA роутинг: `https://bellahasias.ru/test-route`
   - Должна открыться та же React SPA (fallback)

4. Проверить статические файлы: `https://bellahasias.ru/build/manifest.json`
   - Должен вернуться JSON файл

## Важные замечания

- **DocumentRoot** на Beget строго указывает на `~/DOMAIN/public_html` - менять нельзя
- **PHP версия**: требуется PHP >= 8.2.0 для Laravel 12
- **Build коммитится**: `/build` коммитится в репозиторий, так как на сервере может не быть Node.js
- **Пути**: Все пути в React должны быть относительными или начинаться с `/build/`

## Troubleshooting

### Ошибка "Build not found"
- Убедитесь, что `/build` существует и содержит `manifest.json`
- Проверьте, что сборка выполнена: `cd frontend && npm run build`

### Ошибка 500 Internal Server Error
- Проверьте логи: `laravel/storage/logs/laravel.log`
- Убедитесь, что PHP версия >= 8.2.0
- Проверьте права доступа: `chmod -R 755 storage bootstrap/cache`

### API не работает
- Проверьте, что `laravel/routes/api.php` существует
- Убедитесь, что в `laravel/bootstrap/app.php` включен API роутинг
- Проверьте `.htaccess` - он должен пропускать `/api/*` через `index.php`
