# Финальная проверка после настройки

## ✅ Что уже работает

1. ✅ PHP 8.2 установлен и работает
2. ✅ Composer установлен локально и использует PHP 8.2
3. ✅ Зависимости Laravel установлены
4. ✅ .env создан и ключ приложения сгенерирован
5. ✅ Миграции выполнены
6. ✅ Кеши созданы
7. ✅ API работает: `https://bellahasias.ru/api/ping` возвращает `{"ok":true,"message":"API is working"}`

## Проверка главной страницы

```bash
# Проверить главную страницу
curl -I https://bellahasias.ru/

# Должен вернуть HTTP 200
```

## Проверка React SPA

```bash
# Проверить наличие сборки
ls -la build/.vite/manifest.json

# Проверить доступность manifest
curl https://bellahasias.ru/build/.vite/manifest.json

# Должен вернуть JSON файл
```

## Проверка в браузере

1. Откройте `https://bellahasias.ru/` в браузере
   - Должна открыться React SPA
   - Не должно быть ошибок в консоли (F12)

2. Проверьте API: `https://bellahasias.ru/api/ping`
   - Должен вернуть: `{"ok": true, "message": "API is working"}`

3. Проверьте SPA роутинг: `https://bellahasias.ru/test-route`
   - Должна открыться та же React SPA (fallback)

## Если главная страница не работает

### Проверка структуры файлов
```bash
cd ~/bellahasias.ru/public_html

# Проверить наличие index.php
ls -la index.php

# Проверить наличие build
ls -la build/.vite/manifest.json

# Проверить .htaccess
cat .htaccess
```

### Проверка логов Laravel
```bash
cd ~/bellahasias.ru/public_html/laravel
tail -50 storage/logs/laravel.log
```

### Проверка прав доступа
```bash
chmod 644 index.php
chmod 644 .htaccess
chmod -R 755 build/
```

## Команды для быстрой проверки

```bash
cd ~/bellahasias.ru/public_html

# Проверить API
curl https://bellahasias.ru/api/ping

# Проверить главную
curl -I https://bellahasias.ru/

# Проверить manifest
curl -I https://bellahasias.ru/build/.vite/manifest.json

# Проверить структуру
ls -la index.php build/.vite/manifest.json
```
