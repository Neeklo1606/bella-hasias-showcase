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

**⚠️ ВАЖНО: Используйте PHP 8.2 для всех команд!**

```bash
cd ~/bellahasias.ru/public_html && \
git pull origin main && \
cd laravel && \
php8.2 ~/composer.phar install --no-dev --optimize-autoloader && \
php8.2 artisan migrate --force && \
php8.2 artisan config:cache && \
php8.2 artisan route:cache && \
php8.2 artisan view:cache
```

**Или если composer в PATH:**
```bash
cd ~/bellahasias.ru/public_html && \
git pull origin main && \
cd laravel && \
php8.2 /usr/local/bin/composer install --no-dev --optimize-autoloader && \
php8.2 artisan migrate --force && \
php8.2 artisan config:cache && \
php8.2 artisan route:cache && \
php8.2 artisan view:cache
```

### Вариант 2: Пошаговый деплой

#### 1. Обновление кода
```bash
cd ~/bellahasias.ru/public_html
git pull origin main
```

#### 2. Установка зависимостей
**⚠️ ВАЖНО: Используйте PHP 8.2!**

```bash
cd laravel
```

**Выберите один вариант (в зависимости от расположения composer):**

**Вариант 1: composer локально в домашней директории**
```bash
php8.2 ~/composer.phar install --no-dev --optimize-autoloader
```

**Вариант 2: composer установлен глобально**
```bash
php8.2 /usr/local/bin/composer install --no-dev --optimize-autoloader
```

**Вариант 3: если composer в PATH (проверьте версию PHP)**
```bash
# Сначала проверьте версию PHP
php8.2 -v
# Если версия 8.2+, то можно использовать:
php8.2 composer install --no-dev --optimize-autoloader
```

#### 3. Миграции (новая таблица audit_logs)
**⚠️ Используйте PHP 8.2!**
```bash
php8.2 artisan migrate --force
```

#### 4. Кэширование
**⚠️ Используйте PHP 8.2!**
```bash
php8.2 artisan config:cache
php8.2 artisan route:cache
php8.2 artisan view:cache
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
php8.2 artisan tinker
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

1. **PHP версия:** На сервере используется PHP 5.6 по умолчанию, но Laravel требует PHP >= 8.2. **ВСЕГДА используйте `php8.2` для всех команд!**
2. **Миграция обязательна:** Новая таблица `audit_logs` должна быть создана
3. **Кэширование:** После деплоя обязательно выполнить `config:cache`, `route:cache`, `view:cache`
4. **React build:** Убедитесь, что `npm run build` выполнен локально и `/build` закоммичен

### Проверка версии PHP на сервере:

```bash
# Проверка версии PHP по умолчанию
php -v
# Вероятно покажет PHP 5.6.40

# Проверка версии PHP 8.2
php8.2 -v
# Должно показать PHP 8.2.x
```

## 🔍 Проверка логов аудита

После деплоя можно проверить, что логирование работает:

```bash
# Создать/обновить/удалить что-то через админку
# Затем проверить логи в БД:
php8.2 artisan tinker
>>> \App\Models\AuditLog::latest()->take(5)->get()
```

## 📝 Полная последовательность команд для копирования

### Скопируйте и выполните на сервере:

```bash
# Переход в директорию проекта
cd ~/bellahasias.ru/public_html

# Обновление кода из репозитория
git pull origin main

# Переход в Laravel директорию
cd laravel

# Установка зависимостей (выберите один вариант)
# ⚠️ ВАЖНО: Используйте PHP 8.2 для всех команд!

# Вариант 1: composer локально в домашней директории
php8.2 ~/composer.phar install --no-dev --optimize-autoloader

# Вариант 2: если composer установлен глобально
php8.2 /usr/local/bin/composer install --no-dev --optimize-autoloader

# Вариант 3: если composer в PATH (проверьте версию PHP)
# php8.2 composer install --no-dev --optimize-autoloader

# Выполнение миграций (создание таблицы audit_logs)
php8.2 artisan migrate --force

# Очистка и пересоздание кэшей
php8.2 artisan config:clear
php8.2 artisan route:clear
php8.2 artisan view:clear
php8.2 artisan config:cache
php8.2 artisan route:cache
php8.2 artisan view:cache

# Проверка статуса
php8.2 artisan migrate:status
```

### Или используйте готовый скрипт:

```bash
# Скачайте скрипт на сервер
cd ~/bellahasias.ru/public_html
wget https://raw.githubusercontent.com/YOUR_REPO/main/DEPLOY_COMMANDS.sh
# Или скопируйте содержимое DEPLOY_COMMANDS.sh вручную

# Сделайте скрипт исполняемым
chmod +x DEPLOY_COMMANDS.sh

# Запустите скрипт
bash DEPLOY_COMMANDS.sh
```

## 📝 Примечания

- Все изменения обратно совместимы
- API контракты не изменены
- Существующие endpoints работают как раньше
- Путь на сервере: `~/bellahasias.ru/public_html`