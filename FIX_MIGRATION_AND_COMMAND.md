# Исправление миграции и команды на сервере

## Проблема 1: Миграция personal_access_tokens не помечена как выполненная

Таблица существует, но миграция не записана в таблицу `migrations`. Нужно пометить её вручную.

## Проблема 2: Команда cms:import-json не видна

Команда должна автоматически обнаруживаться Laravel, но иногда нужна дополнительная очистка кеша.

## Решение - выполните на сервере:

```bash
cd ~/bellahasias.ru/public_html/laravel

# 1. Пометить миграцию personal_access_tokens как выполненную
php8.2 artisan tinker --execute="
DB::table('migrations')->insert([
    'migration' => '2026_02_11_191541_create_personal_access_tokens_table',
    'batch' => DB::table('migrations')->max('batch') + 1
]);
echo 'Migration marked as completed';
"

# 2. Применить остальные миграции
php8.2 artisan migrate --force

# 3. Полностью очистить все кеши и перегенерировать autoload
php8.2 artisan optimize:clear
php8.2 composer.phar dump-autoload -o

# 4. Проверить, что команда видна (должна показать cms:import-json)
php8.2 artisan list cms

# 5. Если команда все еще не видна, проверить файл
ls -la app/Console/Commands/ImportJsonCommand.php

# 6. Запустить импорт
php8.2 artisan cms:import-json

# 7. Пересобрать кеши
php8.2 artisan config:cache
php8.2 artisan route:cache
```

## Альтернативный способ (если tinker не работает):

```bash
# Вручную через SQL
php8.2 artisan db
# Затем выполните:
INSERT INTO migrations (migration, batch) 
SELECT '2026_02_11_191541_create_personal_access_tokens_table', COALESCE(MAX(batch), 0) + 1 
FROM migrations;
```

## Или через прямой SQL запрос:

```bash
# Узнать текущий batch
php8.2 artisan tinker --execute="echo DB::table('migrations')->max('batch');"

# Затем добавить запись (замените X на полученный batch + 1)
mysql -u your_user -p your_database -e "
INSERT INTO migrations (migration, batch) 
VALUES ('2026_02_11_191541_create_personal_access_tokens_table', X);
"
```

## Если команда все еще не видна:

```bash
# Проверить, что файл существует и имеет правильный namespace
cat app/Console/Commands/ImportJsonCommand.php | head -20

# Перезагрузить все команды
php8.2 artisan clear-compiled
php8.2 artisan optimize:clear
php8.2 composer.phar dump-autoload -o

# Проверить все команды
php8.2 artisan list

# Если команда есть в списке, но не работает, попробовать напрямую
php8.2 artisan cms:import-json --help
```

## Проверка после исправления:

```bash
# 1. Проверить статус миграций (все должны быть Ran)
php8.2 artisan migrate:status

# 2. Проверить команду
php8.2 artisan list cms

# 3. Запустить импорт
php8.2 artisan cms:import-json

# 4. Проверить API
curl https://bellahasias.ru/api/ping
curl https://bellahasias.ru/api/services
```
