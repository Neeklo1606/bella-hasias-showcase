# Security Tests - Команды для проверки

## 1. Rate Limiting Tests

### Login Rate Limit (5 attempts/minute)

```bash
# Тест 1: 5 попыток должны пройти, 6-я должна вернуть 429
for i in {1..6}; do
  echo "Attempt $i:"
  curl -X POST https://bellahasias.ru/api/auth/login \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}' \
    -w "\nHTTP Status: %{http_code}\n\n" \
    -s
  sleep 1
done

# Ожидаемый результат:
# Attempts 1-5: HTTP Status: 422 (validation error)
# Attempt 6: HTTP Status: 429 (Too Many Requests)
```

### Forgot Password Rate Limit (3 attempts/10 minutes)

```bash
# Тест 2: 3 попытки должны пройти, 4-я должна вернуть 429
for i in {1..4}; do
  echo "Attempt $i:"
  curl -X POST https://bellahasias.ru/api/auth/forgot-password \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"email":"test@example.com"}' \
    -w "\nHTTP Status: %{http_code}\n\n" \
    -s
  sleep 1
done

# Ожидаемый результат:
# Attempts 1-3: HTTP Status: 200 или 422
# Attempt 4: HTTP Status: 429 (Too Many Requests)
```

### Upload Rate Limit (30 uploads/minute)

```bash
# Тест 3: Сначала авторизуйтесь (cookie-based auth)
# Получите CSRF cookie
curl -X GET https://bellahasias.ru/sanctum/csrf-cookie \
  -c cookies.txt -b cookies.txt

# Выполните login
curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  -c cookies.txt -b cookies.txt

# Затем попробуйте загрузить 31 файл
for i in {1..31}; do
  echo "Upload attempt $i:"
  curl -X POST https://bellahasias.ru/api/admin/media/upload \
    -H "Accept: application/json" \
    -F "file=@test-image.jpg" \
    -b cookies.txt \
    -w "\nHTTP Status: %{http_code}\n\n" \
    -s
done

# Ожидаемый результат:
# Uploads 1-30: HTTP Status: 201 (Created)
# Upload 31: HTTP Status: 429 (Too Many Requests)
```

## 2. Upload Security Tests

### Invalid MIME Type

```bash
# Тест 4: Попытка загрузить PHP файл (должен быть отклонен)
cat > test.php << 'EOF'
<?php phpinfo(); ?>
EOF

curl -X POST https://bellahasias.ru/api/admin/media/upload \
  -H "Accept: application/json" \
  -F "file=@test.php" \
  -b cookies.txt \
  -w "\nHTTP Status: %{http_code}\n" \
  -v

# Ожидаемый результат:
# HTTP Status: 422
# Response: {"message":"Invalid file type. Allowed: JPEG, PNG, WebP, PDF"}
```

### Invalid File Extension

```bash
# Тест 5: Попытка загрузить файл с опасным расширением
echo "malicious content" > test.exe

curl -X POST https://bellahasias.ru/api/admin/media/upload \
  -H "Accept: application/json" \
  -F "file=@test.exe" \
  -b cookies.txt \
  -w "\nHTTP Status: %{http_code}\n" \
  -v

# Ожидаемый результат:
# HTTP Status: 422
# Response: {"message":"Invalid file extension..."}
```

### File Size Limit (5MB)

```bash
# Тест 6: Создать файл > 5MB
dd if=/dev/zero of=large-file.jpg bs=1M count=6

curl -X POST https://bellahasias.ru/api/admin/media/upload \
  -H "Accept: application/json" \
  -F "file=@large-file.jpg" \
  -b cookies.txt \
  -w "\nHTTP Status: %{http_code}\n" \
  -v

# Ожидаемый результат:
# HTTP Status: 422
# Response: {"errors":{"file":["The file may not be greater than 5120 kilobytes."]}}
```

### Path Traversal Protection

```bash
# Тест 7: Попытка использовать path traversal в имени файла
curl -X POST https://bellahasias.ru/api/admin/media/upload \
  -H "Accept: application/json" \
  -F "file=@test.jpg;filename=../../../etc/passwd" \
  -b cookies.txt \
  -w "\nHTTP Status: %{http_code}\n" \
  -v

# Ожидаемый результат:
# Файл должен быть сохранен с безопасным именем в media/
# Имя должно быть нормализовано (без ../)
```

### Valid Upload

```bash
# Тест 8: Валидная загрузка (должна пройти)
curl -X POST https://bellahasias.ru/api/admin/media/upload \
  -H "Accept: application/json" \
  -F "file=@valid-image.jpg" \
  -F "category=Прочее" \
  -F "alt=Test image" \
  -b cookies.txt \
  -w "\nHTTP Status: %{http_code}\n" \
  -v

# Ожидаемый результат:
# HTTP Status: 201
# Response: {"id":..., "filename":"1704067200-abc123-test-image.jpg", ...}
```

## 3. CORS Tests

### Allowed Origin

```bash
# Тест 9: Запрос с разрешенного домена (должен пройти)
curl -X GET https://bellahasias.ru/api/services \
  -H "Origin: https://bellahasias.ru" \
  -H "Access-Control-Request-Method: GET" \
  -v

# Ожидаемый результат:
# Access-Control-Allow-Origin: https://bellahasias.ru
# Access-Control-Allow-Credentials: true
```

### Disallowed Origin

```bash
# Тест 10: Запрос с неразрешенного домена (должен быть заблокирован)
curl -X GET https://bellahasias.ru/api/services \
  -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: GET" \
  -v

# Ожидаемый результат:
# Нет заголовка Access-Control-Allow-Origin
# Или Access-Control-Allow-Origin не содержит evil.com
```

### Preflight Request

```bash
# Тест 11: OPTIONS preflight запрос
curl -X OPTIONS https://bellahasias.ru/api/services \
  -H "Origin: https://bellahasias.ru" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v

# Ожидаемый результат:
# HTTP Status: 204 или 200
# Access-Control-Allow-Origin: https://bellahasias.ru
# Access-Control-Allow-Methods: *
# Access-Control-Allow-Credentials: true
```

## 4. Cookies Security Tests

### Login and Check Cookies

```bash
# Тест 12: Логин и проверка cookies
curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  -c cookies.txt \
  -v

# Проверить cookies.txt
cat cookies.txt

# Ожидаемый результат:
# Cookies должны иметь:
# - Secure флаг (для HTTPS)
# - HttpOnly флаг
# - SameSite=Lax
```

### Cookie Flags Verification

```bash
# Тест 13: Проверить, что cookies устанавливаются правильно
curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  -c cookies.txt \
  -v 2>&1 | grep -i "set-cookie"

# Ожидаемый результат:
# Set-Cookie: ...; Secure; HttpOnly; SameSite=Lax
```

## 5. Storage Security Tests

### PHP Execution Prevention

```bash
# Тест 14: Попытка выполнить PHP файл из storage (должен быть заблокирован)
# Сначала загрузите файл test.php (если получится)
# Затем попробуйте обратиться к нему

curl -I https://bellahasias.ru/storage/media/test.php

# Ожидаемый результат:
# HTTP Status: 404 или 403
# Content-Type: не должен быть text/html (не должен выполняться как PHP)
```

### Static File Serving

```bash
# Тест 15: Проверка, что валидные файлы отдаются как статика
curl -I https://bellahasias.ru/storage/media/valid-image.jpg

# Ожидаемый результат:
# HTTP Status: 200
# Content-Type: image/jpeg (или соответствующий MIME type)
# Нет заголовков, указывающих на выполнение PHP
```

## 6. .htaccess Protection Tests

### .env Access Block

```bash
# Тест 16: Попытка доступа к .env (должен быть заблокирован)
curl -I https://bellahasias.ru/laravel/.env

# Ожидаемый результат:
# HTTP Status: 403 Forbidden
```

### Vendor Access Block

```bash
# Тест 17: Попытка доступа к vendor (должен быть заблокирован)
curl -I https://bellahasias.ru/laravel/vendor/

# Ожидаемый результат:
# HTTP Status: 403 Forbidden
```

## 7. Quick Security Checklist

```bash
# Быстрая проверка всех основных мер безопасности

echo "=== Security Checklist ==="
echo ""

echo "1. Rate Limiting:"
curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test","password":"test"}' \
  -w "Status: %{http_code}\n" -s -o /dev/null

echo ""
echo "2. CORS:"
curl -X GET https://bellahasias.ru/api/services \
  -H "Origin: https://bellahasias.ru" \
  -I -s | grep -i "access-control"

echo ""
echo "3. .env Protection:"
curl -I https://bellahasias.ru/laravel/.env -s | head -1

echo ""
echo "4. Storage Protection:"
curl -I https://bellahasias.ru/storage/media/.htaccess -s | head -1

echo ""
echo "=== Tests Complete ==="
```

## Примечания

- **Важно:** Bearer tokens не используются, т.к. SPA auth cookie-based (Sanctum).
- Для авторизации используйте cookie flow:
  1. Получите CSRF cookie: `GET /sanctum/csrf-cookie`
  2. Выполните login: `POST /api/auth/login` (cookies сохранятся автоматически)
  3. Используйте `-b cookies.txt` для последующих запросов
- Замените `admin@example.com` и `password` на реальные учетные данные
- Некоторые тесты требуют создания тестовых файлов
- Для полной проверки rate limiting может потребоваться время (особенно для 10-минутных лимитов)
