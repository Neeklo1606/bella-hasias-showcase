# Production .env Configuration

## Обязательные настройки для продакшена

Создайте файл `laravel/.env` на основе этого шаблона:

```env
APP_NAME="Bella Hasias"
APP_ENV=production
APP_KEY=base64:...  # Сгенерировать: php artisan key:generate
APP_DEBUG=false
APP_URL=https://bellahasias.ru

LOG_CHANNEL=stack
LOG_LEVEL=error

# База данных
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

# Session для Sanctum SPA Auth
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_DOMAIN=.bellahasias.ru  # С точкой для поддоменов (www, admin и т.д.)
SESSION_SECURE_COOKIE=true      # true для HTTPS (обязательно!)
SESSION_SAME_SITE=lax
SESSION_HTTP_ONLY=true
SESSION_PATH=/

# Sanctum Stateful Domains
# Список доменов через запятую, которые могут использовать cookie-based auth
SANCTUM_STATEFUL_DOMAINS=bellahasias.ru,www.bellahasias.ru

# Cache
CACHE_DRIVER=file
CACHE_PREFIX=

# Queue (если используется)
QUEUE_CONNECTION=sync

# Mail (если используется)
MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="noreply@bellahasias.ru"
MAIL_FROM_NAME="${APP_NAME}"
```

## Важные пояснения

### SESSION_DOMAIN

**С точкой (`.bellahasias.ru`):**
- Работает для всех поддоменов: `bellahasias.ru`, `www.bellahasias.ru`, `admin.bellahasias.ru`
- Используйте если планируете поддомены

**Без точки (`bellahasias.ru`):**
- Работает только для основного домена
- Используйте если поддомены не нужны

### SESSION_SECURE_COOKIE

- **`true`** — cookies отправляются только по HTTPS (обязательно для продакшена!)
- **`false`** — cookies работают и по HTTP (только для разработки)

### SANCTUM_STATEFUL_DOMAINS

Должен включать все домены, с которых будет идти запрос к API:
- Основной домен: `bellahasias.ru`
- www версия (если используется): `www.bellahasias.ru`
- Локальная разработка: `localhost,localhost:3000`

**Пример:**
```env
SANCTUM_STATEFUL_DOMAINS=bellahasias.ru,www.bellahasias.ru,localhost,localhost:3000
```

### APP_DEBUG

**ВСЕГДА `false` в продакшене!**

Если `true`:
- Показываются детальные ошибки (опасно для безопасности)
- Раскрывается структура приложения
- Может привести к утечке данных

## Проверка конфигурации

После настройки `.env` проверьте:

```bash
cd laravel
php artisan config:clear
php artisan config:cache

# Проверить что конфиг загружен правильно
php artisan tinker
>>> config('session.domain')
>>> config('sanctum.stateful')
>>> config('app.url')
```

## CORS (если нужен)

Если API используется с другого домена, настройте CORS в `laravel/bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->validateCsrfTokens(except: [
        'api/*',
    ]);
    
    // CORS для API
    $middleware->api(prepend: [
        \Illuminate\Http\Middleware\HandleCors::class,
    ]);
})
```

И создайте `laravel/config/cors.php`:
```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['https://bellahasias.ru'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,  // Важно для Sanctum cookies!
];
```
