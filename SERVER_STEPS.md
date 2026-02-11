# Пошаговые команды для настройки сервера

## Шаг 1: Проверить доступность PHP 8.2

```bash
php8.2 --version
```

**Ожидаемый результат:** `PHP 8.2.x`

Если команда не найдена, обратитесь в поддержку Beget для установки PHP 8.2.

---

## Шаг 2: Перейти в директорию проекта

```bash
cd ~/bellahasias.ru/public_html
```

---

## Шаг 3: Обновить код из репозитория

```bash
git pull origin main
```

---

## Шаг 4: Перейти в папку Laravel

```bash
cd laravel
```

---

## Шаг 5: Установить зависимости Composer (ВАЖНО: через php8.2)

**Проблема:** `/usr/local/bin/composer` автоматически использует php5.6.

**Решение: Скачать Composer локально**

```bash
# Скачать Composer installer
php8.2 -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

# Установить Composer локально
php8.2 composer-setup.php

# Удалить installer
php8.2 -r "unlink('composer-setup.php');"

# Установить зависимости через локальный composer
php8.2 composer.phar install --no-dev --optimize-autoloader
```

**Альтернатива: Если composer.phar уже есть в системе**
```bash
php8.2 /usr/local/bin/composer-phar install --no-dev --optimize-autoloader
```

---

## Шаг 6: Создать файл .env (если его нет)

```bash
if [ ! -f .env ]; then
    cp .env.example .env
    php8.2 artisan key:generate
fi
```

---

## Шаг 7: Применить миграции базы данных

```bash
php8.2 artisan migrate --force
```

---

## Шаг 8: Очистить все кеши

```bash
php8.2 artisan config:clear
php8.2 artisan route:clear
php8.2 artisan view:clear
php8.2 artisan cache:clear
```

---

## Шаг 9: Создать оптимизированные кеши

```bash
php8.2 artisan config:cache
php8.2 artisan route:cache
php8.2 artisan view:cache
```

---

## Шаг 10: Установить права доступа

```bash
chmod -R 755 storage bootstrap/cache
chmod -R 644 .env 2>/dev/null || true
```

---

## Шаг 11: Вернуться в корень и проверить структуру

```bash
cd ..
ls -la index.php
ls -la build/.vite/manifest.json 2>/dev/null || echo "⚠️  ВНИМАНИЕ: /build не найден!"
```

---

## Шаг 12: Проверка работы

```bash
# Проверить API
curl https://bellahasias.ru/api/ping

# Проверить главную страницу
curl -I https://bellahasias.ru/
```

---

## Если возникли ошибки

### Ошибка: "composer: command not found"
```bash
# Найти где установлен composer
which composer
# или
whereis composer

# Использовать полный путь
php8.2 /путь/к/composer install --no-dev --optimize-autoloader
```

### Ошибка: "PHP version 5.6.40"
Убедитесь, что используете `php8.2`, а не просто `php`:
```bash
# НЕПРАВИЛЬНО:
php artisan migrate

# ПРАВИЛЬНО:
php8.2 artisan migrate
```

### Ошибка: "Composer 1.x is deprecated"
Обновите Composer до версии 2:
```bash
php8.2 /usr/local/bin/composer self-update --2
```

---

## Полная команда (все в одном, для копирования)

```bash
cd ~/bellahasias.ru/public_html && \
git pull origin main && \
cd laravel && \
php8.2 /usr/local/bin/composer install --no-dev --optimize-autoloader && \
php8.2 artisan migrate --force && \
php8.2 artisan config:clear && \
php8.2 artisan route:clear && \
php8.2 artisan view:clear && \
php8.2 artisan cache:clear && \
php8.2 artisan config:cache && \
php8.2 artisan route:cache && \
php8.2 artisan view:cache && \
chmod -R 755 storage bootstrap/cache && \
cd .. && \
echo "✅ Обновление завершено"
```
