# Production Deployment Guide для Beget/Apache

## Структура проекта

```
/ (repository root = public_html на сервере)
  index.php                    # Laravel entry point
  .htaccess                    # Apache rewrite rules
  build/                       # React build (коммитится в репо)
  laravel/                     # Laravel приложение (НЕ публичный доступ)
  frontend/                    # React исходники (НЕ публичный доступ)
```

## Предварительные требования

1. **PHP >= 8.2** (проверить: `php -v`)
2. **Composer** установлен (проверить: `composer --version`)
3. **Node.js и npm** (для локальной сборки, на сервере не обязательны)
4. **Git** доступ к репозиторию
5. **MySQL/MariaDB** база данных создана

## Шаг 1: Первоначальная настройка на сервере

### 1.1. Клонирование репозитория

```bash
cd ~/DOMAIN/public_html
git clone <repository-url> .
# или если уже есть репо:
git pull origin main
```

### 1.2. Установка PHP зависимостей

```bash
cd ~/DOMAIN/public_html/laravel
composer install --no-dev --optimize-autoloader
```

**Важно:** Используйте правильную версию PHP для Composer:
```bash
# Если на сервере несколько версий PHP:
php8.2 ~/composer.phar install --no-dev --optimize-autoloader
# или
/usr/bin/php8.2 ~/composer.phar install --no-dev --optimize-autoloader
```

### 1.3. Настройка .env

```bash
cd ~/DOMAIN/public_html/laravel
cp .env.example .env
# Отредактировать .env (см. раздел "Конфигурация .env")
php artisan key:generate
```

### 1.4. Настройка базы данных

```bash
cd ~/DOMAIN/public_html/laravel
php artisan migrate --force
php artisan db:seed  # Опционально, если есть seeders
```

### 1.5. Настройка storage

```bash
cd ~/DOMAIN/public_html/laravel

# Создать симлинк для storage (если разрешено)
php artisan storage:link

# Если симлинк не работает, создать альтернативу:
# Вариант 1: Копирование (одноразово)
# mkdir -p ../storage/app/public
# ln -s ../laravel/storage/app/public ../storage/app/public

# Вариант 2: Через .htaccess (см. раздел "Storage без symlink")
```

### 1.6. Установка прав на папки

```bash
cd ~/DOMAIN/public_html

# Права на storage и cache
chmod -R 775 laravel/storage
chmod -R 775 laravel/bootstrap/cache

# Права на владельца (замените USER на вашего пользователя)
chown -R USER:USER laravel/storage
chown -R USER:USER laravel/bootstrap/cache
```

## Шаг 2: Конфигурация .env для продакшена

### Обязательные настройки для Sanctum SPA Auth

```env
APP_NAME="Bella Hasias"
APP_ENV=production
APP_KEY=base64:...  # Сгенерировать через php artisan key:generate
APP_DEBUG=false
APP_URL=https://bellahasias.ru

# База данных
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Session для Sanctum
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_DOMAIN=.bellahasias.ru  # С точкой для поддоменов (www, admin и т.д.)
SESSION_SECURE_COOKIE=true      # true для HTTPS
SESSION_SAME_SITE=lax
SESSION_HTTP_ONLY=true

# Sanctum
SANCTUM_STATEFUL_DOMAINS=bellahasias.ru,www.bellahasias.ru,localhost,localhost:3000
```

### Важные моменты:

1. **SESSION_DOMAIN**: 
   - Если используете поддомены: `.bellahasias.ru` (с точкой)
   - Если только основной домен: `bellahasias.ru` (без точки)

2. **SESSION_SECURE_COOKIE**: 
   - `true` для HTTPS (обязательно в продакшене)
   - `false` только для локальной разработки

3. **SANCTUM_STATEFUL_DOMAINS**: 
   - Список доменов через запятую
   - Должен включать основной домен и www (если используется)

4. **APP_DEBUG**: 
   - Всегда `false` в продакшене!

## Шаг 3: Кэширование для продакшена

```bash
cd ~/DOMAIN/public_html/laravel

# Очистить все кэши
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Создать оптимизированные кэши
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

**Важно:** После изменения `.env` или `config/*.php` нужно пересоздать кэши:
```bash
php artisan config:clear && php artisan config:cache
```

## Шаг 4: Storage без symlink (альтернатива)

Если `php artisan storage:link` не работает (нет прав на symlink), используйте один из вариантов:

### Вариант 1: .htaccess правило (рекомендуется)

Создать файл `storage/.htaccess`:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /storage/
    RewriteRule ^(.*)$ ../laravel/storage/app/public/$1 [L]
</IfModule>
```

### Вариант 2: Копирование при деплое

Добавить в скрипт деплоя:
```bash
# Копировать файлы из storage в публичную папку
cp -r laravel/storage/app/public/* storage/ 2>/dev/null || true
```

### Вариант 3: Alias в Apache (если есть доступ к конфигу)

```apache
Alias /storage /path/to/public_html/laravel/storage/app/public
```

## Шаг 5: Стандартный процесс деплоя

### 5.1. Локальная сборка React (перед push)

```bash
cd frontend
npm install  # Если изменились зависимости
npm run build
git add build/
git commit -m "Build React for production"
git push origin main
```

### 5.2. На сервере: обновление кода

```bash
cd ~/DOMAIN/public_html

# Получить последние изменения
git pull origin main

# Обновить PHP зависимости
cd laravel
composer install --no-dev --optimize-autoloader
```

### 5.3. Миграции базы данных

```bash
cd ~/DOMAIN/public_html/laravel

# Проверить статус миграций
php artisan migrate:status

# Применить новые миграции
php artisan migrate --force
```

### 5.4. Обновление кэшей

```bash
cd ~/DOMAIN/public_html/laravel

# Пересоздать кэши
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 5.5. Очистка кэша приложения (опционально)

```bash
php artisan cache:clear
```

## Шаг 6: Откат на предыдущий коммит (Rollback)

### 6.1. Откат кода

```bash
cd ~/DOMAIN/public_html

# Посмотреть историю коммитов
git log --oneline -10

# Откатиться на предыдущий коммит
git reset --hard HEAD~1

# Или на конкретный коммит
git reset --hard <commit-hash>
```

### 6.2. Откат миграций (если нужно)

```bash
cd ~/DOMAIN/public_html/laravel

# Откатить последнюю миграцию
php artisan migrate:rollback --step=1

# Или откатить все миграции до конкретной
php artisan migrate:rollback --step=5
```

### 6.3. Восстановление кэшей

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Шаг 7: Проверки после деплоя

### 7.1. Health endpoints

```bash
# Проверить базовый ping
curl https://bellahasias.ru/api/ping

# Проверить health (DB + Cache)
curl https://bellahasias.ru/api/health

# Проверить auth health (требует авторизации)
curl -X GET https://bellahasias.ru/api/auth/me \
  -H "Cookie: laravel_session=..." \
  --cookie-jar cookies.txt
```

### 7.2. Проверка публичных страниц

- [ ] Главная страница `/` загружается
- [ ] React SPA работает (переходы между страницами)
- [ ] `/api/services` возвращает данные
- [ ] `/api/cases` возвращает данные
- [ ] `/api/pages/{slug}` работает

### 7.3. Проверка админки

- [ ] `/admin/login` доступна
- [ ] Логин работает (Sanctum cookies)
- [ ] `/admin/*` защищено (редирект на login без авторизации)
- [ ] CRUD операции работают

### 7.4. Проверка storage

- [ ] Загрузка файлов работает (`/api/admin/media/upload`)
- [ ] Загруженные файлы доступны по URL
- [ ] Проверить `laravel/storage/app/public/` содержит файлы

### 7.5. Проверка безопасности

- [ ] `/laravel/.env` недоступен (403 Forbidden)
- [ ] `/laravel/vendor/` недоступен
- [ ] `/laravel/storage/logs/` недоступен
- [ ] `.env` в корне недоступен

## Шаг 8: Очереди (если используются)

Если в проекте есть очереди:

```bash
cd ~/DOMAIN/public_html/laravel

# Запустить worker (через supervisor или cron)
php artisan queue:work --daemon

# Или через supervisor (рекомендуется)
# Создать конфиг /etc/supervisor/conf.d/laravel-worker.conf
```

**Supervisor конфиг:**
```ini
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/public_html/laravel/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/path/to/public_html/laravel/storage/logs/worker.log
```

## Шаг 9: Мониторинг и логи

### Просмотр логов

```bash
cd ~/DOMAIN/public_html/laravel

# Логи приложения
tail -f storage/logs/laravel.log

# Логи ошибок PHP (если настроено)
tail -f /var/log/apache2/error.log
# или
tail -f ~/logs/error.log
```

### Проверка размера storage

```bash
du -sh laravel/storage/app/public
du -sh laravel/storage/logs
```

## Шаг 10: Оптимизация для продакшена

### 10.1. Composer autoloader

```bash
composer install --no-dev --optimize-autoloader
```

### 10.2. Laravel оптимизации

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache  # Если используется
```

### 10.3. Очистка неиспользуемых файлов

```bash
# Очистить старые логи (опционально)
find laravel/storage/logs -name "*.log" -mtime +30 -delete
```

## Быстрые команды для Beget

### Полный деплой одной командой

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

### Быстрый откат

```bash
cd ~/DOMAIN/public_html && \
git reset --hard HEAD~1 && \
cd laravel && \
php artisan config:cache && \
php artisan route:cache
```

## Troubleshooting

### Проблема: 500 Internal Server Error

1. Проверить логи: `tail -f laravel/storage/logs/laravel.log`
2. Проверить права: `chmod -R 775 laravel/storage laravel/bootstrap/cache`
3. Очистить кэши: `php artisan config:clear && php artisan cache:clear`

### Проблема: Sanctum auth не работает

1. Проверить `.env`: `SESSION_DOMAIN`, `SANCTUM_STATEFUL_DOMAINS`, `SESSION_SECURE_COOKIE`
2. Проверить cookies в браузере (DevTools → Application → Cookies)
3. Проверить CORS headers (если есть)

### Проблема: Storage файлы не доступны

1. Проверить `php artisan storage:link` выполнен
2. Проверить права: `chmod -R 775 laravel/storage/app/public`
3. Проверить URL: должен быть `/storage/...` (через symlink)

### Проблема: React роуты не работают

1. Проверить `.htaccess` — все запросы должны идти в `index.php`
2. Проверить `laravel/routes/web.php` — должен быть `Route::fallback()`
3. Проверить build: `ls -la build/` должен содержать файлы

## Контакты и поддержка

При проблемах проверьте:
1. Логи Laravel: `laravel/storage/logs/laravel.log`
2. Логи Apache: `~/logs/error.log` (или `/var/log/apache2/error.log`)
3. Health endpoint: `/api/health`
