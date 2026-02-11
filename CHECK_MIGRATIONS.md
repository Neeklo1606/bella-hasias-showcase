# Проверка миграций после деплоя

## Проблема: "Nothing to migrate"

Если после выполнения `php8.2 artisan migrate --force` вы видите сообщение "Nothing to migrate", это может означать:

1. **Миграции уже выполнены** - таблица `audit_logs` уже существует
2. **Миграции не найдены** - файл миграции не попал на сервер
3. **Проблема с базой данных** - миграции не могут быть применены

## Команды для проверки

### 1. Проверка статуса миграций

```bash
cd ~/bellahasias.ru/public_html/laravel
php8.2 artisan migrate:status
```

Это покажет список всех миграций и их статус (выполнена/не выполнена).

### 2. Проверка наличия таблицы audit_logs

```bash
php8.2 artisan tinker --execute="echo \Illuminate\Support\Facades\Schema::hasTable('audit_logs') ? '✅ Таблица audit_logs существует' : '❌ Таблица audit_logs не найдена';"
```

### 3. Проверка наличия файла миграции

```bash
ls -la database/migrations/*audit*
```

Должен быть файл типа: `2026_02_12_000000_create_audit_logs_table.php`

### 4. Принудительное выполнение миграций (если нужно)

```bash
# Сброс всех миграций (ОСТОРОЖНО: удалит данные!)
# php8.2 artisan migrate:fresh

# Или выполнить конкретную миграцию
php8.2 artisan migrate --path=database/migrations/2026_02_12_000000_create_audit_logs_table.php
```

### 5. Проверка через SQL (если есть доступ к БД)

```bash
php8.2 artisan tinker
>>> \Illuminate\Support\Facades\DB::select("SHOW TABLES LIKE 'audit_logs'");
>>> \Illuminate\Support\Facades\Schema::hasTable('audit_logs');
```

## Если таблица не существует

1. **Проверьте, что файл миграции есть на сервере:**
   ```bash
   cd ~/bellahasias.ru/public_html/laravel
   ls -la database/migrations/ | grep audit
   ```

2. **Если файла нет, обновите код:**
   ```bash
   cd ~/bellahasias.ru/public_html
   git pull origin main
   ```

3. **Выполните миграции снова:**
   ```bash
   cd laravel
   php8.2 artisan migrate --force
   ```

## Если таблица уже существует

Если таблица `audit_logs` уже существует, но миграции показывают "Nothing to migrate", возможно:

1. Миграция была выполнена ранее
2. Таблица была создана вручную

В этом случае всё в порядке, можно продолжать работу.
