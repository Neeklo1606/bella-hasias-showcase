# Исправление путей к статическим файлам

## Проблема
Статические файлы (`og-image.jpg`, `placeholder.svg`, `icon-192x192.png`, `hero-video.mp4`, `favicon.png`) должны быть в корне `public_html/`, но браузер пытается загрузить их из `/storage//og-image.jpg` (с двойным слэшем).

## Исправление

### MediaFile.php
- ✅ Добавлена проверка: если путь начинается с `/` (корень), возвращать как есть
- ✅ Статические файлы в корне (`/og-image.jpg`, `/videos/hero-video.mp4`) не будут проходить через `Storage::url()`

## Что нужно проверить на сервере

### 1. Статические файлы должны быть в корне
Файлы должны находиться в `~/bellahasias.ru/public_html/`:
- `/og-image.jpg`
- `/placeholder.svg`
- `/icons/icon-192x192.png`
- `/icons/icon-512x512.png`
- `/videos/hero-video.mp4`
- `/favicon.png`

Проверка:
```bash
cd ~/bellahasias.ru/public_html
ls -la og-image.jpg
ls -la videos/hero-video.mp4
ls -la icons/icon-192x192.png
```

Если файлов нет, их нужно создать или скопировать из другого места.

### 2. Символическая ссылка storage
Ссылка должна быть в `laravel/public/storage` (не в корне):
```bash
cd ~/bellahasias.ru/public_html/laravel
ls -la public/storage
```

Если нет:
```bash
cd ~/bellahasias.ru/public_html/laravel
php8.2 artisan storage:link
```

### 3. Права доступа
```bash
cd ~/bellahasias.ru/public_html
chmod -R 755 laravel/storage/app/public
chmod 644 og-image.jpg videos/hero-video.mp4 icons/*.png favicon.png 2>/dev/null || true
```

### 4. Проверка после исправлений
После деплоя проверьте:
1. Откройте сайт в браузере
2. Проверьте консоль - не должно быть 403 ошибок для статических файлов
3. Проверьте что изображения загружаются правильно

## Важно
- Статические файлы (`/og-image.jpg` и т.д.) должны быть в корне `public_html/`
- Media файлы из базы данных будут иметь пути типа `/storage/media/filename.jpg`
- Пути, начинающиеся с `/`, не будут проходить через `Storage::url()`
