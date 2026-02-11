# Команды для деплоя на Beget сервере

## Быстрый деплой (одна команда)

```bash
cd ~/DOMAIN/public_html && git pull origin main && cd laravel && composer install --no-dev --optimize-autoloader && php artisan migrate --force && php artisan config:cache && php artisan route:cache && php artisan view:cache
```

## Пошаговый деплой

### 1. Обновление кода
```bash
cd ~/DOMAIN/public_html
git pull origin main
```

### 2. Установка зависимостей
```bash
cd laravel
composer install --no-dev --optimize-autoloader
```

**Если нужно указать версию PHP:**
```bash
php8.2 ~/composer.phar install --no-dev --optimize-autoloader
```

### 3. Миграции
```bash
php artisan migrate --force
```

### 4. Кэширование
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 5. Storage link (если еще не создан)
```bash
php artisan storage:link
```

### 6. Права на папки
```bash
cd ..
chmod -R 775 laravel/storage
chmod -R 775 laravel/bootstrap/cache
```

## Откат (Rollback)

### Откат кода
```bash
cd ~/DOMAIN/public_html
git log --oneline -5  # Посмотреть последние коммиты
git reset --hard HEAD~1  # Откатиться на один коммит назад
# или
git reset --hard <commit-hash>  # Откатиться на конкретный коммит
```

### Откат миграций (если нужно)
```bash
cd laravel
php artisan migrate:rollback --step=1
```

### Восстановление кэшей
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Проверка после деплоя

### Health endpoints
```bash
# Ping
curl https://bellahasias.ru/api/ping

# Health (DB + Cache)
curl https://bellahasias.ru/api/health
```

### Проверка логов
```bash
tail -f laravel/storage/logs/laravel.log
```

## Первоначальная настройка (только один раз)

```bash
cd ~/DOMAIN/public_html

# 1. Клонирование (если еще нет)
git clone <repository-url> .

# 2. Настройка .env
cd laravel
cp .env.example .env
# Отредактировать .env (см. ENV_PRODUCTION.md)
php artisan key:generate

# 3. Установка зависимостей
composer install --no-dev --optimize-autoloader

# 4. Миграции
php artisan migrate --force

# 5. Storage
php artisan storage:link
chmod -R 775 storage bootstrap/cache

# 6. Кэширование
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
