# Исправление проблемы с миграцией audit_logs

## Проблема

Файл миграции `2026_02_12_000000_create_audit_logs_table.php` не попал на сервер, потому что изменения не были отправлены в удаленный репозиторий.

## Решение

### 1. Отправка изменений в репозиторий (выполнено)

```bash
git push origin main
```

### 2. Обновление кода на сервере

Выполните на сервере:

```bash
cd ~/bellahasias.ru/public_html
git pull origin main
```

### 3. Выполнение миграции

```bash
cd laravel
php8.2 artisan migrate --force
```

### 4. Проверка

```bash
# Проверить статус миграций
php8.2 artisan migrate:status

# Проверить наличие таблицы
php8.2 artisan tinker --execute="echo \Illuminate\Support\Facades\Schema::hasTable('audit_logs') ? '✅ Таблица audit_logs существует' : '❌ Таблица audit_logs не найдена';"
```

## Полная последовательность команд на сервере

```bash
cd ~/bellahasias.ru/public_html
git pull origin main
cd laravel
php8.2 artisan migrate --force
php8.2 artisan migrate:status
```

После этого таблица `audit_logs` должна быть создана.
