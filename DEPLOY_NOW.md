# Команды для деплоя на сервере

## Обновление кода
```bash
cd ~/bellahasias.ru/public_html && \
git pull origin main && \
cd laravel && \
php8.2 artisan config:clear && \
php8.2 artisan config:cache && \
php8.2 artisan route:clear && \
php8.2 artisan route:cache
```

## Создание символической ссылки storage (если нужно)
```bash
cd ~/bellahasias.ru/public_html

# Удалить старую ссылку если есть
rm -f storage
rm -f laravel/public/storage

# Создать новую ссылку в корне через artisan
cd laravel
php8.2 artisan storage:link

# Проверить что ссылка создана в корне
cd ..
ls -la storage
```

Должно быть: `storage -> laravel/storage/app/public`

## Права доступа
```bash
chmod -R 755 ~/bellahasias.ru/public_html/laravel/storage/app/public
chmod 755 ~/bellahasias.ru/public_html/storage 2>/dev/null || true
```

## Проверка после деплоя
1. Откройте `/admin/cases` - не должно быть ошибки `useMemo is not defined`
2. Откройте `/admin/media` - загруженные файлы должны отображаться без 403 ошибок
3. Проверьте что статические файлы (`/og-image.jpg`, `/videos/hero-video.mp4`) загружаются

## Последние изменения
- ✅ Исправлена ошибка `useMemo is not defined` в `Cases.tsx`
- ✅ Исправлена конфигурация storage symlink для создания ссылки в корне `public_html`
- ✅ Исправлена обработка путей к статическим файлам в `MediaFile.php`
