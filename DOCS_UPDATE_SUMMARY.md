# Обновление документации: Cookie-based Sanctum Auth

## ✅ Обновленные файлы

### 1. SECURITY_TESTS.md
- ✅ Заменены все примеры с `Authorization: Bearer TOKEN` на cookie flow
- ✅ Добавлено примечание о cookie-based auth в начале файла
- ✅ Обновлены примеры для:
  - Upload Rate Limit
  - Invalid MIME Type
  - Invalid File Extension
  - File Size Limit
  - Path Traversal Protection
  - Valid Upload

### 2. SECURITY.md
- ✅ Обновлены примеры Upload Security
- ✅ Добавлено примечание о cookie-based auth

### 3. SECURITY_IMPLEMENTATION.md
- ✅ Обновлены примеры Upload Security (Invalid File, File Size)
- ✅ Добавлено примечание о cookie-based auth

### 4. AUDIT_IMPLEMENTATION.md
- ✅ Заменены все примеры с Bearer токенами на cookie flow
- ✅ Добавлено примечание о cookie-based auth
- ✅ Обновлены примеры для:
  - Создание сущности
  - Обновление сущности
  - Удаление сущности
  - Загрузка файла
  - Просмотр через API

### 5. TESTS_IMPLEMENTATION.md
- ✅ Обновлен раздел "Аутентификация в тестах"
- ✅ Добавлено примечание, что Bearer tokens используются только в тестах для удобства

## 📝 Изменения в примерах

### Старый формат (Bearer token):
```bash
curl -X POST https://bellahasias.ru/api/admin/services \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'
```

### Новый формат (Cookie-based):
```bash
# Сначала авторизуйтесь
curl -X GET https://bellahasias.ru/sanctum/csrf-cookie \
  -c cookies.txt -b cookies.txt

curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  -c cookies.txt -b cookies.txt

# Затем используйте cookies для запросов
curl -X POST https://bellahasias.ru/api/admin/services \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}' \
  -b cookies.txt
```

## 🔍 Добавленные примечания

Во всех обновленных файлах добавлено примечание:
> **Примечание:** Bearer tokens не используются, т.к. SPA auth cookie-based (Sanctum).

## 📋 Файлы, где были правки

1. ✅ **SECURITY_TESTS.md** - полностью обновлен
2. ✅ **SECURITY.md** - обновлены примеры Upload Security
3. ✅ **SECURITY_IMPLEMENTATION.md** - обновлены примеры Upload Security
4. ✅ **AUDIT_IMPLEMENTATION.md** - полностью обновлен
5. ✅ **TESTS_IMPLEMENTATION.md** - обновлен раздел аутентификации

## ⚠️ Файлы, которые НЕ требуют изменений

- **BEGET_DEPLOY_COMMANDS.md** - нет примеров с Bearer токенами
- **DEPLOY_PROD.md** - нет примеров с Bearer токенами (есть пример с Cookie, но он правильный)
- **ENV_PRODUCTION.md** - нет примеров API запросов
- **FIX_MIGRATION_AND_COMMAND.md** - техническая документация, не содержит примеров API
- **FIX_SERVER_ISSUES.md** - техническая документация, не содержит примеров API
- **STAGE_1_2_IMPLEMENTATION.md** - историческая документация
- **AUDIT_REPORT.md** - отчет аудита, не содержит примеров API

## ✅ Итог

Все примеры API в документации обновлены на cookie-based Sanctum auth. Bearer tokens больше не используются в примерах, кроме случаев, где явно указано, что это только для тестов.
