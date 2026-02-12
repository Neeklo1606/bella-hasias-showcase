# Исправление авторизации: Инструкции

## Проблема
После успешного логина происходил редирект на `/admin/dashboard`, но затем сразу же редирект обратно на `/admin/login`.

## Причина
`AuthController::login` создавал токен, но не устанавливал сессию. Для SPA cookie-based authentication Sanctum нужно использовать `Auth::login($user)` для установки сессии.

## Исправления

### 1. Backend: AuthController
- ✅ Использует `Auth::login($user)` вместо создания токена
- ✅ Регенерирует session ID для безопасности
- ✅ `logout()` использует `Auth::logout()` и инвалидирует сессию

### 2. Frontend: Login.tsx
- ✅ Улучшена обработка ошибок
- ✅ Редирект происходит через `useEffect` после обновления состояния

## Проверка на сервере

### 1. Обновить код
```bash
cd ~/bellahasias.ru/public_html
git pull origin main
```

### 2. Проверить настройки .env
Убедитесь, что в `laravel/.env` установлены:

```env
# Session
SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
SESSION_HTTP_ONLY=true
SESSION_DOMAIN=bellahasias.ru  # или .bellahasias.ru для поддоменов

# Sanctum
SANCTUM_STATEFUL_DOMAINS=bellahasias.ru,www.bellahasias.ru
```

### 3. Очистить и пересоздать кэши
```bash
cd ~/bellahasias.ru/public_html/laravel
php8.2 artisan config:clear
php8.2 artisan config:cache
php8.2 artisan route:cache
php8.2 artisan view:cache
```

### 4. Проверить таблицу sessions
Убедитесь, что таблица `sessions` существует:
```bash
php8.2 artisan migrate:status
```

Если таблицы нет:
```bash
php8.2 artisan migrate --force
```

## Проверка работы

1. **Откройте `/admin/login`**
   - Должна отображаться форма входа

2. **Введите данные и войдите**
   - После успешного логина должен произойти редирект на `/admin/dashboard`
   - НЕ должно быть повторного редиректа на `/admin/login`

3. **Проверьте cookies в DevTools**
   - Откройте DevTools → Application → Cookies
   - Должна быть cookie с именем сессии (например, `laravel_session`)
   - Cookie должна иметь флаги: `HttpOnly`, `Secure`, `SameSite=Lax`

4. **Проверьте запросы в Network**
   - `POST /api/auth/login` должен вернуть 200
   - `GET /api/auth/me` должен вернуть данные пользователя
   - Все запросы должны иметь `Cookie` header с session cookie

## Отладка

Если проблема сохраняется:

1. **Проверьте логи Laravel:**
   ```bash
   tail -f ~/bellahasias.ru/public_html/laravel/storage/logs/laravel.log
   ```

2. **Проверьте cookies в браузере:**
   - DevTools → Application → Cookies → `https://bellahasias.ru`
   - Должна быть session cookie после логина

3. **Проверьте SANCTUM_STATEFUL_DOMAINS:**
   ```bash
   cd ~/bellahasias.ru/public_html/laravel
   php8.2 artisan tinker
   >>> config('sanctum.stateful')
   ```
   Должен вернуть массив с `bellahasias.ru` и `www.bellahasias.ru`

4. **Проверьте SESSION_SECURE_COOKIE:**
   ```bash
   php8.2 artisan tinker
   >>> config('session.secure')
   ```
   Должно быть `true` для HTTPS

## Важные моменты

1. **CSRF cookie** устанавливается автоматически через `apiClient` перед POST запросами
2. **Session cookie** устанавливается через `Auth::login()` в `AuthController::login`
3. **Sanctum** проверяет session cookie для аутентификации в SPA режиме
4. **Все запросы** должны иметь `withCredentials: true` (уже настроено в `apiClient`)

## Если проблема не решена

1. Проверьте, что `SANCTUM_STATEFUL_DOMAINS` включает ваш домен
2. Проверьте, что `SESSION_SECURE_COOKIE=true` для HTTPS
3. Проверьте, что cookies не блокируются браузером или расширениями
4. Проверьте CORS настройки в `laravel/config/cors.php`
