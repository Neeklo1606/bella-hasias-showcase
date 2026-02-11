# Security Implementation - Итоговый отчет

## ✅ Выполненные изменения

### 1. Rate Limiting

#### Auth Endpoints
- **`POST /api/auth/login`**: 5 попыток в минуту (IP + email)
- **`POST /api/auth/forgot-password`**: 3 попытки в 10 минут (IP)
- **`POST /api/auth/reset-password`**: 3 попытки в 10 минут (IP)

#### Upload Endpoint
- **`POST /api/admin/media/upload`**: 30 загрузок в минуту (авторизованный пользователь)

**Реализация:** Использован встроенный Laravel `throttle` middleware.

### 2. Upload Security (MediaController)

#### Валидация
- **MIME типы:** `image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `application/pdf`
- **Расширения:** `jpg`, `jpeg`, `png`, `webp`, `pdf`
- **Максимальный размер:** 5MB (5120 KB)
- **Двойная проверка:** MIME type + расширение

#### Безопасность имени файла
- Нормализация через `Str::slug()`
- Удаление опасных символов
- Ограничение длины (100 символов)
- Уникальное имя: `{timestamp}-{random8}-{safe-basename}.{ext}`
- Защита от path traversal через `basename()`

#### Хранение
- Файлы в `storage/app/public/media/`
- Отдача как статика (без выполнения PHP)
- Защита через `.htaccess` в `storage/`

### 3. CORS Configuration

**Файл:** `laravel/config/cors.php`

- **Разрешенные origins:** `https://bellahasias.ru`, `https://www.bellahasias.ru`
- **Paths:** `api/*`, `sanctum/csrf-cookie`
- **supports_credentials:** `true` (для Sanctum cookies)
- **Allowed methods:** `*`
- **Allowed headers:** `*`

### 4. Cookies Security

**Настройки (через .env):**
- `SESSION_SECURE_COOKIE=true` (только HTTPS)
- `SESSION_SAME_SITE=lax` (защита от CSRF)
- `SESSION_HTTP_ONLY=true` (недоступно через JS)
- `SESSION_DOMAIN=.bellahasias.ru` (для поддоменов)

### 5. Storage Protection

**Файл:** `laravel/storage/.htaccess`

- Запрет выполнения PHP скриптов
- Запрет выполнения других скриптов (`.php`, `.pl`, `.py`, `.jsp`, `.asp`, `.sh`, `.cgi`)
- Разрешение только статических файлов
- Отключение directory listing

## 📁 Измененные файлы

1. **`laravel/routes/api.php`**
   - Добавлен rate limiting для auth endpoints
   - Добавлен rate limiting для upload endpoint

2. **`laravel/app/Http/Controllers/AuthController.php`**
   - Улучшена валидация (max length для email/password)
   - Единое сообщение об ошибке (предотвращение user enumeration)

3. **`laravel/app/Http/Controllers/Admin/MediaController.php`**
   - Строгая валидация MIME типов и расширений
   - Двойная проверка безопасности
   - Нормализация и безопасное именование файлов
   - Защита от path traversal
   - Уменьшен лимит размера до 5MB

4. **`laravel/bootstrap/app.php`**
   - Добавлен CORS middleware для API

5. **`laravel/config/cors.php`** (новый)
   - Конфигурация CORS с разрешенными доменами
   - `supports_credentials=true` для Sanctum

6. **`laravel/storage/.htaccess`** (новый)
   - Защита от выполнения скриптов
   - Разрешение только статических файлов

7. **`.htaccess`** (обновлен)
   - Добавлено правило для `/storage/` (отдача как статика)

8. **`SECURITY.md`** (новый)
   - Документация по мерам безопасности

9. **`SECURITY_TESTS.md`** (новый)
   - Команды для проверки безопасности

## 🔍 Команды для проверки

### 1. Rate Limiting - Login

```bash
# Проверить rate limit (5 попыток/минуту)
for i in {1..6}; do
  curl -X POST https://bellahasias.ru/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}' \
    -w "\nHTTP: %{http_code}\n" -s
done
# Ожидается: 6-я попытка вернет 429
```

### 2. Rate Limiting - Forgot Password

```bash
# Проверить rate limit (3 попытки/10 минут)
for i in {1..4}; do
  curl -X POST https://bellahasias.ru/api/auth/forgot-password \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com"}' \
    -w "\nHTTP: %{http_code}\n" -s
done
# Ожидается: 4-я попытка вернет 429
```

### 3. Upload Security - Invalid MIME Type

```bash
# Сначала авторизуйтесь (cookie-based auth)
curl -X GET https://bellahasias.ru/sanctum/csrf-cookie \
  -c cookies.txt -b cookies.txt

curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  -c cookies.txt -b cookies.txt

# Создать PHP файл
echo '<?php phpinfo(); ?>' > test.php

# Попытка загрузки (должна быть отклонена)
curl -X POST https://bellahasias.ru/api/admin/media/upload \
  -F "file=@test.php" \
  -b cookies.txt \
  -w "\nHTTP: %{http_code}\n" -s

# Ожидается: HTTP 422 с сообщением об ошибке
```

**Примечание:** Bearer tokens не используются, т.к. SPA auth cookie-based (Sanctum).

### 4. Upload Security - File Size

```bash
# Создать файл > 5MB
dd if=/dev/zero of=large.jpg bs=1M count=6

# Попытка загрузки (должна быть отклонена)
curl -X POST https://bellahasias.ru/api/admin/media/upload \
  -F "file=@large.jpg" \
  -b cookies.txt \
  -w "\nHTTP: %{http_code}\n" -s

# Ожидается: HTTP 422 (validation error)
```

### 5. CORS - Allowed Origin

```bash
# Запрос с разрешенного домена
curl -X GET https://bellahasias.ru/api/services \
  -H "Origin: https://bellahasias.ru" \
  -I -s | grep -i "access-control"

# Ожидается: Access-Control-Allow-Origin: https://bellahasias.ru
```

### 6. CORS - Disallowed Origin

```bash
# Запрос с неразрешенного домена
curl -X GET https://bellahasias.ru/api/services \
  -H "Origin: https://evil.com" \
  -I -s | grep -i "access-control"

# Ожидается: Нет заголовка или другой origin
```

### 7. Cookies Security

```bash
# Логин и проверка cookies
curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  -c cookies.txt -v 2>&1 | grep -i "set-cookie"

# Проверить cookies.txt
cat cookies.txt

# Ожидается: Secure, HttpOnly, SameSite=Lax флаги
```

### 8. Storage Protection

```bash
# Проверить, что PHP файлы не выполняются
curl -I https://bellahasias.ru/storage/media/test.php

# Ожидается: 404 или 403, не должен выполняться как PHP
```

### 9. .env Protection

```bash
# Попытка доступа к .env
curl -I https://bellahasias.ru/laravel/.env

# Ожидается: HTTP 403 Forbidden
```

### 10. Vendor Protection

```bash
# Попытка доступа к vendor
curl -I https://bellahasias.ru/laravel/vendor/

# Ожидается: HTTP 403 Forbidden
```

## ⚙️ Настройки .env для продакшена

```env
APP_ENV=production
APP_DEBUG=false

SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
SESSION_HTTP_ONLY=true
SESSION_DOMAIN=.bellahasias.ru

# Для rate limiting рекомендуется Redis
CACHE_DRIVER=redis
# или
CACHE_DRIVER=database
```

## 📋 Checklist безопасности

- [x] Rate limiting на auth endpoints
- [x] Rate limiting на upload endpoint
- [x] Строгая валидация загрузки файлов
- [x] Защита от опасных расширений
- [x] Нормализация имен файлов
- [x] Защита storage от выполнения PHP
- [x] CORS настроен (только разрешенные домены)
- [x] Cookies с правильными флагами
- [x] .htaccess защита служебных файлов
- [x] Документация создана

## 🔒 Дополнительные рекомендации

1. **Мониторинг:**
   - Отслеживать 429 ошибки в логах
   - Мониторить подозрительные загрузки
   - Проверять CORS violations

2. **Обновления:**
   - Регулярно обновлять Laravel
   - Применять security patches
   - Мониторить security advisories

3. **Логирование:**
   - Все security events должны логироваться
   - Настроить алерты на частые блокировки
