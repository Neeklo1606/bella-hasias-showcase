# Команды для деплоя на сервере

## ✅ Изменения закоммичены

Коммит создан с описанием всех изменений:
- Система аудита действий
- Страница Audit logs в админке
- Обновление документации
- Feature тесты
- Усиление безопасности

## 🚀 Деплой на Beget сервере

### Вариант 1: Быстрый деплой (одна команда)

```bash
cd ~/DOMAIN/public_html && \
git pull origin main && \
cd laravel && \
composer install --no-dev --optimize-autoloader && \
php artisan migrate --force && \
php artisan config:cache && \
php artisan route:cache && \
php artisan view:cache
```

### Вариант 2: Пошаговый деплой

#### 1. Обновление кода
```bash
cd ~/DOMAIN/public_html
git pull origin main
```

#### 2. Установка зависимостей
```bash
cd laravel
composer install --no-dev --optimize-autoloader
```

**Если нужно указать версию PHP:**
```bash
php8.2 ~/composer.phar install --no-dev --optimize-autoloader
```

#### 3. Миграции (новая таблица audit_logs)
```bash
php artisan migrate --force
```

#### 4. Кэширование
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Проверка после деплоя

#### 1. Health endpoints
```bash
# Ping
curl https://bellahasias.ru/api/ping

# Health
curl https://bellahasias.ru/api/health
```

#### 2. Проверка новой таблицы
```bash
cd laravel
php artisan tinker
>>> \Illuminate\Support\Facades\Schema::hasTable('audit_logs')
# Должно вернуть true
```

#### 3. Проверка страницы Audit
- Открыть `/admin/audit` в браузере
- Должна отображаться таблица логов (может быть пустой, если еще нет действий)

#### 4. Проверка API
```bash
# Сначала авторизуйтесь (cookie-based)
curl -X GET https://bellahasias.ru/sanctum/csrf-cookie \
  -c cookies.txt -b cookies.txt

curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  -c cookies.txt -b cookies.txt

# Проверить audit endpoint
curl -X GET https://bellahasias.ru/api/admin/audit \
  -b cookies.txt \
  -H "Accept: application/json"
```

## 📋 Что было добавлено

### Backend
- ✅ Таблица `audit_logs` (миграция)
- ✅ Модель `AuditLog`
- ✅ Сервис `AuditService` для логирования
- ✅ Контроллер `AuditController` для API
- ✅ Логирование в контроллерах: Services, Cases, Pages, Media
- ✅ API endpoint: `GET /api/admin/audit`, `GET /api/admin/audit/{id}`

### Frontend
- ✅ Типы для audit (`frontend/src/admin/types/audit.ts`)
- ✅ API сервис (`frontend/src/lib/api/audit.api.ts`)
- ✅ Страница Audit (`frontend/src/admin/pages/Audit.tsx`)
- ✅ Route `/admin/audit`
- ✅ Ссылка в навигации

### Тесты
- ✅ Feature тесты: Auth, Access Control, Public API
- ✅ Factories: UserFactory (admin), ServiceFactory

### Документация
- ✅ Обновлены примеры API (cookie-based auth вместо Bearer)
- ✅ Добавлена документация по безопасности
- ✅ Добавлена документация по тестам

### Безопасность
- ✅ Rate limiting на auth endpoints
- ✅ Усиленная валидация загрузки файлов
- ✅ CORS настройки
- ✅ Cookies security

## ⚠️ Важно

1. **Миграция обязательна:** Новая таблица `audit_logs` должна быть создана
2. **Кэширование:** После деплоя обязательно выполнить `config:cache`, `route:cache`, `view:cache`
3. **React build:** Убедитесь, что `npm run build` выполнен локально и `/build` закоммичен

## 🔍 Проверка логов аудита

После деплоя можно проверить, что логирование работает:

```bash
# Создать/обновить/удалить что-то через админку
# Затем проверить логи в БД:
php artisan tinker
>>> \App\Models\AuditLog::latest()->take(5)->get()
```

## 📝 Примечания

- Все изменения обратно совместимы
- API контракты не изменены
- Существующие endpoints работают как раньше
