# Настройка PHP 8.2 на сервере Beget

## Проблема
Composer и команда `php` используют PHP 5.6.40 вместо PHP 8.2, который требуется для Laravel 12.

## Решение 1: Использовать php8.2 для всех команд (рекомендуется)

### Шаг 1: Проверить доступность PHP 8.2
```bash
php8.2 --version
# Должно показать: PHP 8.2.x
```

### Шаг 2: Настроить Composer для использования PHP 8.2
```bash
cd ~/bellahasias.ru/public_html/laravel

# Вариант A: Использовать php8.2 с composer напрямую
php8.2 /usr/local/bin/composer install --no-dev --optimize-autoloader

# Вариант B: Если composer установлен локально
php8.2 composer.phar install --no-dev --optimize-autoloader
```

### Шаг 3: Обновить команды деплоя
Используйте `php8.2` для всех Artisan и Composer команд:

```bash
cd ~/bellahasias.ru/public_html
git pull origin main
cd laravel

# Установить зависимости через php8.2
php8.2 /usr/local/bin/composer install --no-dev --optimize-autoloader

# Все Artisan команды через php8.2
php8.2 artisan migrate --force
php8.2 artisan config:clear
php8.2 artisan route:clear
php8.2 artisan view:clear
php8.2 artisan cache:clear
php8.2 artisan config:cache
php8.2 artisan route:cache
php8.2 artisan view:cache

chmod -R 755 storage bootstrap/cache
cd ..
```

## Решение 2: Создать алиасы (удобнее для работы)

Добавьте в `~/.bashrc` или `~/.bash_profile`:

```bash
# Добавить в конец файла
alias php='php8.2'
alias composer='php8.2 /usr/local/bin/composer'
```

Затем примените изменения:
```bash
source ~/.bashrc
# или
source ~/.bash_profile
```

После этого можно использовать просто `php` и `composer`:
```bash
cd ~/bellahasias.ru/public_html/laravel
composer install --no-dev --optimize-autoloader
php artisan migrate --force
```

## Решение 3: Обновить Composer до версии 2

Composer 1.x устарел. Обновите до версии 2:

```bash
# Обновить Composer до версии 2
php8.2 /usr/local/bin/composer self-update --2

# Или установить Composer 2 локально
cd ~
php8.2 -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php8.2 composer-setup.php --install-dir=~/.local/bin --filename=composer2
php8.2 -r "unlink('composer-setup.php');"

# Использовать
~/.local/bin/composer2 install --no-dev --optimize-autoloader
```

## Быстрая команда обновления (с php8.2)

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

## Проверка после настройки

```bash
# Проверить версию PHP
php8.2 --version
# Должно быть: PHP 8.2.x

# Проверить версию Composer
php8.2 /usr/local/bin/composer --version
# Должно быть: Composer version 2.x.x

# Проверить API
curl https://bellahasias.ru/api/ping
# Должен вернуть: {"ok": true, "message": "API is working"}
```
