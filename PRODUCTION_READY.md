# Production Deployment - Итоговый отчет

## ✅ Выполненные изменения

### 1. Health Endpoints
- ✅ `/api/ping` - уже был, оставлен
- ✅ `/api/health` - новый endpoint (проверка DB + Cache)
- ✅ `/api/auth/me` - уже был, используется как auth health

### 2. .htaccess - Защита и роутинг
- ✅ Защита от доступа к `/laravel/.env`, `/laravel/vendor/`, служебным файлам
- ✅ SPA роуты работают (fallback на `index.php`)
- ✅ `/api/*` и `/sanctum/csrf-cookie` работают через `index.php`
- ✅ Статические файлы из `/build/` отдаются напрямую

### 3. Storage/Media
- ✅ Media upload использует disk 'public' (проверено)
- ✅ `storage:link` создаст симлинк в корне (через `public_path()`)
- ✅ Альтернативы для symlink описаны в DEPLOY_PROD.md

### 4. Документация
- ✅ `DEPLOY_PROD.md` - полное руководство по деплою
- ✅ `ENV_PRODUCTION.md` - настройки .env для продакшена
- ✅ `BEGET_DEPLOY_COMMANDS.md` - быстрые команды для Beget

## 📝 Измененные файлы

1. **`.htaccess`** (обновлен)
   - Добавлена защита от доступа к служебным файлам
   - Правила для SPA роутов и API

2. **`laravel/app/Http/Controllers/HealthController.php`** (новый)
   - Health check endpoint
   - Проверка DB connection и Cache

3. **`laravel/routes/api.php`** (обновлен)
   - Добавлен route `/api/health`

4. **`laravel/config/filesystems.php`** (обновлен)
   - Комментарий о storage link

5. **`DEPLOY_PROD.md`** (новый)
   - Полное руководство по деплою

6. **`ENV_PRODUCTION.md`** (новый)
   - Настройки .env для продакшена

7. **`BEGET_DEPLOY_COMMANDS.md`** (новый)
   - Быстрые команды для Beget

## 🚀 Команды для Beget сервера

### Первоначальная настройка (один раз)

```bash
# 1. Перейти в директорию
cd ~/DOMAIN/public_html

# 2. Клонировать репозиторий (если еще нет)
git clone <repository-url> .

# 3. Настроить .env
cd laravel
cp .env.example .env
# Отредактировать .env (см. ENV_PRODUCTION.md)
php artisan key:generate

# 4. Установить зависимости
composer install --no-dev --optimize-autoloader

# 5. Применить миграции
php artisan migrate --force

# 6. Создать storage link
php artisan storage:link

# 7. Установить права
cd ..
chmod -R 775 laravel/storage
chmod -R 775 laravel/bootstrap/cache

# 8. Создать кэши
cd laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Стандартный деплой (после каждого git push)

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

### Откат на предыдущий коммит

```bash
cd ~/DOMAIN/public_html && \
git reset --hard HEAD~1 && \
cd laravel && \
php artisan config:cache && \
php artisan route:cache && \
php artisan view:cache
```

## ⚙️ Обязательные настройки .env

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://bellahasias.ru

SESSION_DRIVER=database
SESSION_DOMAIN=.bellahasias.ru  # С точкой для поддоменов
SESSION_SECURE_COOKIE=true      # true для HTTPS!
SESSION_SAME_SITE=lax

SANCTUM_STATEFUL_DOMAINS=bellahasias.ru,www.bellahasias.ru
```

**Полный список:** см. `ENV_PRODUCTION.md`

## ✅ Проверки после деплоя

1. **Health endpoints:**
   ```bash
   curl https://bellahasias.ru/api/ping
   curl https://bellahasias.ru/api/health
   ```

2. **Публичные страницы:**
   - Главная `/` работает
   - `/api/services` возвращает данные
   - `/api/cases` возвращает данные

3. **Админка:**
   - `/admin/login` доступна
   - Логин работает
   - `/admin/*` защищено

4. **Storage:**
   - Загрузка файлов работает
   - Файлы доступны по URL

5. **Безопасность:**
   - `/laravel/.env` недоступен (403)
   - `/laravel/vendor/` недоступен

## 📋 Чеклист перед деплоем

- [ ] Локально собран React build: `cd frontend && npm run build`
- [ ] Build закоммичен: `git add build/ && git commit && git push`
- [ ] `.env` настроен на сервере (см. ENV_PRODUCTION.md)
- [ ] База данных создана и доступна
- [ ] PHP >= 8.2 на сервере
- [ ] Composer установлен

## 🔒 Безопасность

- ✅ `.env` защищен через `.htaccess`
- ✅ `/laravel/` директория защищена
- ✅ `APP_DEBUG=false` в продакшене
- ✅ `SESSION_SECURE_COOKIE=true` для HTTPS
- ✅ Sanctum настроен для SPA auth

## 📚 Дополнительная документация

- **DEPLOY_PROD.md** - полное руководство по деплою
- **ENV_PRODUCTION.md** - настройки .env
- **BEGET_DEPLOY_COMMANDS.md** - быстрые команды
