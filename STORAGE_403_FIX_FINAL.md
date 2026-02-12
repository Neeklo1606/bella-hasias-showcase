# Исправление 403 ошибок для загруженных media файлов

## Проблема
После загрузки файла через админку (`/admin/media`), браузер получает 403 при попытке загрузить файл из `/storage/media/1770858942-GUFA1TaP-logo.png`.

## Причина
Символическая ссылка `storage` создана в `laravel/public/storage`, но браузер ищет файлы в корне `/storage/`.

## Решение

### Вариант 1: Создать символическую ссылку в корне (рекомендуется)

На сервере выполните:
```bash
cd ~/bellahasias.ru/public_html

# Удалить старую ссылку если есть
rm -f storage

# Создать новую ссылку в корне
ln -s laravel/storage/app/public storage

# Проверить
ls -la storage
```

### Вариант 2: Изменить конфигурацию Laravel

Если вариант 1 не работает, нужно изменить `laravel/config/filesystems.php`:

```php
'links' => [
    // Создать ссылку в корне public_html (не в laravel/public)
    base_path('../storage') => storage_path('app/public'),
],
```

Но это требует изменения `public_path()` или использования `base_path()`.

### Вариант 3: Использовать Laravel route для отдачи файлов

Создать маршрут в `laravel/routes/web.php`:
```php
Route::get('/storage/{path}', function ($path) {
    $filePath = storage_path('app/public/' . $path);
    if (!file_exists($filePath)) {
        abort(404);
    }
    return response()->file($filePath);
})->where('path', '.*');
```

Но это менее эффективно чем статические файлы.

## Проверка после исправления

1. Загрузите файл через `/admin/media`
2. Проверьте что файл существует:
   ```bash
   ls -la ~/bellahasias.ru/public_html/laravel/storage/app/public/media/
   ```
3. Проверьте символическую ссылку:
   ```bash
   ls -la ~/bellahasias.ru/public_html/storage
   ```
   Должно быть: `storage -> laravel/storage/app/public`
4. Проверьте доступ через браузер:
   ```
   https://bellahasias.ru/storage/media/1770858942-GUFA1TaP-logo.png
   ```

## Права доступа

Убедитесь что права правильные:
```bash
chmod -R 755 ~/bellahasias.ru/public_html/laravel/storage/app/public
chmod 755 ~/bellahasias.ru/public_html/storage
```

## .htaccess

Убедитесь что `.htaccess` в корне разрешает доступ к `/storage/`:
```apache
# Storage files - отдавать как статику (без выполнения PHP)
RewriteCond %{REQUEST_URI} ^/storage/
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]
```

Это правило уже есть в `.htaccess`, но нужно убедиться что файл доступен через символическую ссылку.
