# Деплой Этапа 1-2 на сервер

## Команды для выполнения на сервере (SSH)

```bash
cd ~/bellahasias.ru/public_html

# 1. Обновить код из репозитория
git pull origin main

# 2. Перейти в Laravel
cd laravel

# 3. Установить новые зависимости (Sanctum)
php8.2 composer.phar install --no-dev --optimize-autoloader

# 4. Запустить миграции
php8.2 artisan migrate

# 5. Импортировать данные из JSON
php8.2 artisan cms:import-json

# 6. Очистить кеши
php8.2 artisan config:clear
php8.2 artisan route:clear
php8.2 artisan cache:clear

# 7. Пересобрать кеши
php8.2 artisan config:cache
php8.2 artisan route:cache

# 8. Проверить работу API
curl https://bellahasias.ru/api/ping
```

## Проверка после деплоя

### 1. Проверить миграции
```bash
cd ~/bellahasias.ru/public_html/laravel
php8.2 artisan migrate:status
```

### 2. Проверить импорт данных
```bash
php8.2 artisan cms:import-json
# Должен показать:
# ✓ Imported X users
# ✓ Imported X media files
# ✓ Imported X services
# ✓ Imported X cases
# ✓ Imported X pages
# ✓ Imported SEO config
```

### 3. Проверить API endpoints

**Public:**
```bash
curl https://bellahasias.ru/api/ping
curl https://bellahasias.ru/api/services
curl https://bellahasias.ru/api/cases
```

**Auth (тест):**
```bash
# Login
curl -X POST https://bellahasias.ru/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"anastasirezepova@yandex.ru","password":"123123123"}' \
  -c cookies.txt -v

# Me (с cookies)
curl https://bellahasias.ru/api/auth/me -b cookies.txt -v
```

## Важные замечания

1. **Composer:** Используйте `php8.2 composer.phar` (локальный composer.phar)
2. **Миграции:** Если БД уже существует, миграции применятся безопасно
3. **Импорт:** Команда `cms:import-json` идемпотентна - можно запускать несколько раз
4. **Кеши:** После изменений в routes/config обязательно очистите и пересоберите кеши

## Возможные проблемы

### Ошибка "Class not found"
```bash
# Перегенерировать autoload
php8.2 composer.phar dump-autoload
```

### Ошибка миграции
```bash
# Проверить статус
php8.2 artisan migrate:status

# Если нужно откатить и применить заново
php8.2 artisan migrate:rollback --step=1
php8.2 artisan migrate
```

### Ошибка импорта JSON
```bash
# Проверить путь к файлам
ls -la ../frontend/src/data/*.json

# Если файлов нет, они должны быть в репозитории
git pull origin main
```

## После успешного деплоя

API готов к использованию:
- ✅ Public endpoints работают
- ✅ Auth endpoints работают
- ✅ Admin endpoints защищены
- ✅ Данные импортированы из JSON

**Следующий шаг:** Переписать React админку на использование API (Этап 3-4)
