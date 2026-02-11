# Решение проблемы с Composer и PHP 8.2

## Проблема
`/usr/local/bin/composer` автоматически запускает `php5.6`, что несовместимо с Laravel 12.

## Решение 1: Скачать Composer локально (рекомендуется)

```bash
cd ~/bellahasias.ru/public_html/laravel

# Скачать Composer installer
php8.2 -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

# Установить Composer локально
php8.2 composer-setup.php

# Удалить installer
php8.2 -r "unlink('composer-setup.php');"

# Использовать локальный composer
php8.2 composer.phar install --no-dev --optimize-autoloader
```

## Решение 2: Использовать composer.phar напрямую (если уже установлен)

```bash
cd ~/bellahasias.ru/public_html/laravel

# Если composer.phar уже есть в системе
php8.2 /usr/local/bin/composer-phar install --no-dev --optimize-autoloader
```

## Решение 3: Создать алиас для composer с php8.2

```bash
# Добавить в ~/.bashrc или ~/.bash_profile
alias composer='php8.2 ~/bellahasias.ru/public_html/laravel/composer.phar'

# Применить изменения
source ~/.bashrc
```

## Полная команда установки зависимостей

```bash
cd ~/bellahasias.ru/public_html/laravel

# Скачать и установить composer локально
php8.2 -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php8.2 composer-setup.php
php8.2 -r "unlink('composer-setup.php');"

# Установить зависимости
php8.2 composer.phar install --no-dev --optimize-autoloader
```

## После установки зависимостей - продолжить настройку

```bash
# Создать .env (если нет)
if [ ! -f .env ]; then
    cp .env.example .env
    php8.2 artisan key:generate
fi

# Применить миграции
php8.2 artisan migrate --force

# Очистить кеши
php8.2 artisan config:clear
php8.2 artisan route:clear
php8.2 artisan view:clear
php8.2 artisan cache:clear

# Создать кеши
php8.2 artisan config:cache
php8.2 artisan route:cache
php8.2 artisan view:cache

# Права доступа
chmod -R 755 storage bootstrap/cache
```
