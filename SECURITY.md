# Security Measures - Production Configuration

## Обзор

Документ описывает принятые меры безопасности для продакшен-окружения.

## 1. Rate Limiting

### Auth Endpoints

**`POST /api/auth/login`**
- Лимит: **5 попыток в минуту** на комбинацию IP + email
- Middleware: `throttle:5,1`
- Цель: Защита от brute-force атак

**`POST /api/auth/forgot-password`**
- Лимит: **3 попытки в 10 минут** на IP
- Middleware: `throttle:3,10`
- Цель: Предотвращение спама и перебора email

**`POST /api/auth/reset-password`**
- Лимит: **3 попытки в 10 минут** на IP
- Middleware: `throttle:3,10`
- Цель: Защита от перебора токенов сброса

### Upload Endpoint

**`POST /api/admin/media/upload`**
- Лимит: **30 загрузок в минуту** на авторизованного пользователя
- Middleware: `throttle:30,1`
- Цель: Предотвращение злоупотребления и DoS

### Настройка

Rate limiting использует встроенный Laravel throttle middleware, который хранит счетчики в кэше (по умолчанию `file` или `database`).

Для продакшена рекомендуется использовать `redis` или `memcached` для rate limiting:

```env
CACHE_DRIVER=redis
```

## 2. Upload Security (MediaController)

### Валидация файлов

**Разрешенные MIME типы:**
- `image/jpeg`
- `image/jpg`
- `image/png`
- `image/webp`
- `application/pdf`

**Разрешенные расширения:**
- `jpg`, `jpeg`, `png`, `webp`, `pdf`

**Максимальный размер:**
- **5MB** (5120 KB)

### Безопасность имени файла

1. **Нормализация:**
   - Удаление опасных символов
   - Преобразование в безопасный slug
   - Ограничение длины (100 символов)

2. **Генерация уникального имени:**
   - Формат: `{timestamp}-{random8}-{safe-basename}.{ext}`
   - Пример: `1704067200-a1b2c3d4-my-image.png`

3. **Защита от path traversal:**
   - Использование `basename()` для финального имени
   - Хранение только в `storage/app/public/media/`

### Хранение файлов

- Файлы хранятся в `laravel/storage/app/public/media/`
- Доступ через симлинк: `storage -> storage/app/public`
- Файлы отдаются как статика через Apache/Nginx
- **Важно:** PHP не выполняется для файлов в `storage/`

### Проверка безопасности

```bash
# Проверить, что файлы не выполняются как PHP
curl -I https://bellahasias.ru/storage/media/test.php
# Должен вернуть 404 или Content-Type: image/png (не text/html)
```

## 3. CORS Configuration

### Настройки

**Файл:** `laravel/config/cors.php`

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => [
    'https://bellahasias.ru',
    'https://www.bellahasias.ru',
],
'supports_credentials' => true, // Требуется для Sanctum cookies
```

### Разрешенные домены

- `https://bellahasias.ru` (основной домен)
- `https://www.bellahasias.ru` (www версия)

**Важно:** Все остальные домены блокируются.

## 4. Cookies Security

### Настройки Session

**Файл:** `laravel/config/session.php` (через `.env`)

```env
SESSION_SECURE_COOKIE=true    # Только HTTPS
SESSION_SAME_SITE=lax         # Защита от CSRF
SESSION_HTTP_ONLY=true         # Недоступно через JavaScript
SESSION_DOMAIN=.bellahasias.ru # Для поддоменов (с точкой)
```

### Sanctum Cookies

Sanctum использует те же настройки сессии для cookie-based auth.

**Проверка:**
```bash
# В браузере (DevTools -> Application -> Cookies)
# Должны быть установлены:
# - Secure: true
# - HttpOnly: true
# - SameSite: Lax
```

## 5. Дополнительные меры

### .htaccess защита

- Блокировка доступа к `/laravel/.env`
- Блокировка доступа к `/laravel/vendor/`
- Блокировка доступа к служебным файлам

### API Authentication

- Все `/api/admin/*` endpoints защищены `auth:sanctum` + `admin` middleware
- CSRF защита через Sanctum для SPA

### Error Handling

- `APP_DEBUG=false` в продакшене
- Детальные ошибки не показываются пользователям
- Логирование ошибок в `laravel/storage/logs/`

## 6. Проверка безопасности

### Rate Limiting

```bash
# Проверить rate limit на login (должен вернуть 429 после 5 попыток)
for i in {1..6}; do
  curl -X POST https://bellahasias.ru/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}' \
    -w "\nHTTP Status: %{http_code}\n"
done
```

### Upload Security

```bash
# Сначала авторизуйтесь (получите CSRF cookie и выполните login)
curl -X GET https://bellahasias.ru/sanctum/csrf-cookie \
  -c cookies.txt -b cookies.txt

curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  -c cookies.txt -b cookies.txt

# Попытка загрузить недопустимый файл (должен вернуть 422)
curl -X POST https://bellahasias.ru/api/admin/media/upload \
  -F "file=@malicious.php" \
  -b cookies.txt \
  -w "\nHTTP Status: %{http_code}\n"

# Попытка загрузить файл > 5MB (должен вернуть 422)
curl -X POST https://bellahasias.ru/api/admin/media/upload \
  -F "file=@large-file.jpg" \
  -b cookies.txt \
  -w "\nHTTP Status: %{http_code}\n"
```

**Примечание:** Bearer tokens не используются, т.к. SPA auth cookie-based (Sanctum).

### CORS

```bash
# Запрос с неразрешенного домена (должен быть заблокирован)
curl -X GET https://bellahasias.ru/api/services \
  -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

### Cookies

```bash
# Проверить, что cookies устанавливаются с правильными флагами
curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  -c cookies.txt -v

# Проверить содержимое cookies.txt
cat cookies.txt
# Должны быть: Secure, HttpOnly, SameSite=Lax
```

## 7. Рекомендации для продакшена

### Обязательные настройки .env

```env
APP_ENV=production
APP_DEBUG=false
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
SESSION_HTTP_ONLY=true
```

### Мониторинг

1. **Логи rate limiting:**
   - Проверять `laravel/storage/logs/laravel.log` на 429 ошибки
   - Настроить алерты при частых блокировках

2. **Мониторинг загрузок:**
   - Отслеживать размер и количество загруженных файлов
   - Проверять подозрительные имена файлов

3. **CORS violations:**
   - Логировать попытки доступа с неразрешенных доменов

### Обновления

- Регулярно обновлять Laravel и зависимости
- Мониторить security advisories
- Применять security patches немедленно

## 8. Контакты

При обнаружении уязвимостей:
1. Не публиковать информацию публично
2. Связаться с администратором проекта
3. Предоставить детали для воспроизведения
