# Исправление ошибок 403 для storage файлов

## Проблема
Файлы в `/storage/` возвращают 403 Forbidden, также есть двойные слэши в путях (`/storage//og-image.jpg`).

## Исправления

### 1. MediaFile.php
- ✅ Добавлена проверка на уже существующий `/storage/` в пути
- ✅ Удаление двойных слэшей в URL

### 2. PageSEO.tsx
- ✅ Удаление множественных слэшей в URL

## Что нужно проверить на сервере

### 1. Символическая ссылка storage
```bash
cd ~/bellahasias.ru/public_html
ls -la storage
```

Должна быть символическая ссылка `storage -> laravel/storage/app/public`

Если нет:
```bash
cd ~/bellahasias.ru/public_html/laravel
php8.2 artisan storage:link
```

### 2. Права доступа к storage
```bash
cd ~/bellahasias.ru/public_html
chmod -R 755 storage
chmod -R 755 laravel/storage/app/public
```

### 3. Статические файлы
Файлы `og-image.jpg`, `placeholder.svg`, `icon-192x192.png`, `hero-video.mp4`, `favicon.png` должны быть:
- В `public/` директории (корень сайта)
- ИЛИ в `laravel/storage/app/public/` (если через storage:link)

Проверка:
```bash
ls -la ~/bellahasias.ru/public_html/og-image.jpg
ls -la ~/bellahasias.ru/public_html/videos/hero-video.mp4
ls -la ~/bellahasias.ru/public_html/icons/icon-192x192.png
```

### 4. .htaccess для storage
Убедитесь что `.htaccess` в корне разрешает доступ к `/storage/`:

```apache
# Storage files - отдавать как статику (без выполнения PHP)
RewriteCond %{REQUEST_URI} ^/storage/
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]
```

### 5. Проверка доступа
После исправлений проверьте:
```bash
curl -I https://bellahasias.ru/storage/media/some-file.jpg
```

Должен вернуть 200 или 404 (но не 403).

## Если файлы не существуют

Если статические файлы (`og-image.jpg`, `placeholder.svg` и т.д.) не существуют, их нужно создать или загрузить в `public/` директорию.

## Проверка после исправлений

1. Откройте сайт в браузере
2. Проверьте консоль - не должно быть 403 ошибок для `/storage/` файлов
3. Проверьте что изображения загружаются правильно
