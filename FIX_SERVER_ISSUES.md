# Исправление проблем на сервере

## Проблема 1: Таблица personal_access_tokens уже существует

Это нормально - таблица была создана ранее. Нужно проверить статус миграций и применить только новые.

## Проблема 2: Команда cms:import-json не найдена

Команда не видна после git pull. Нужно перегенерировать autoload.

## Решение - выполните на сервере:

```bash
cd ~/bellahasias.ru/public_html/laravel

# 1. Перегенерировать autoload
php8.2 composer.phar dump-autoload

# 2. Проверить статус миграций
php8.2 artisan migrate:status

# 3. Применить только новые миграции (пропустит уже существующие)
php8.2 artisan migrate --force

# 4. Очистить кеш команд
php8.2 artisan clear-compiled
php8.2 artisan optimize:clear

# 5. Проверить, что команда видна
php8.2 artisan list | grep cms

# 6. Запустить импорт
php8.2 artisan cms:import-json

# 7. Пересобрать кеши
php8.2 artisan config:cache
php8.2 artisan route:cache
```

## Альтернативное решение (если миграции не применяются)

Если миграция personal_access_tokens мешает, можно временно пометить её как выполненную:

```bash
# Проверить, какие миграции не применены
php8.2 artisan migrate:status

# Если personal_access_tokens уже существует, пометить миграцию как выполненную
php8.2 artisan migrate --pretend

# Или вручную в БД:
# INSERT INTO migrations (migration, batch) VALUES ('2026_02_11_191541_create_personal_access_tokens_table', (SELECT COALESCE(MAX(batch), 0) + 1 FROM (SELECT batch FROM migrations) AS m));
```

## Проверка после исправления

```bash
# 1. Проверить API
curl https://bellahasias.ru/api/ping

# 2. Проверить импорт
php8.2 artisan cms:import-json
# Должен показать:
# ✓ Imported X users
# ✓ Imported X media files
# ✓ Imported X services
# ✓ Imported X cases
# ✓ Imported X pages
# ✓ Imported SEO config

# 3. Проверить endpoints
curl https://bellahasias.ru/api/services
curl https://bellahasias.ru/api/cases
```
