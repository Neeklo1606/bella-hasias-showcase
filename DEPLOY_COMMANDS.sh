#!/bin/bash
# Скрипт для деплоя на сервере Beget
# Использование: bash DEPLOY_COMMANDS.sh

set -e  # Остановка при ошибке

echo "🚀 Начало деплоя..."

# Переход в директорию проекта
cd ~/bellahasias.ru/public_html

echo "📥 Обновление кода из репозитория..."
git pull origin main

echo "📦 Установка зависимостей..."
cd laravel

# Попытка найти composer (используем PHP 8.2)
PHP_CMD="php8.2"

if [ -f ~/composer.phar ]; then
    echo "📦 Использование composer из ~/composer.phar"
    $PHP_CMD ~/composer.phar install --no-dev --optimize-autoloader
elif [ -f /usr/local/bin/composer ]; then
    echo "📦 Использование composer из /usr/local/bin/composer"
    $PHP_CMD /usr/local/bin/composer install --no-dev --optimize-autoloader
elif command -v composer &> /dev/null; then
    echo "📦 Использование composer из PATH (проверьте версию PHP!)"
    $PHP_CMD composer install --no-dev --optimize-autoloader
else
    echo "❌ Composer не найден. Установите composer или укажите путь вручную."
    exit 1
fi

echo "🗄️  Выполнение миграций..."
$PHP_CMD artisan migrate --force

echo "🧹 Очистка кэшей..."
$PHP_CMD artisan config:clear
$PHP_CMD artisan route:clear
$PHP_CMD artisan view:clear

echo "💾 Создание кэшей..."
$PHP_CMD artisan config:cache
$PHP_CMD artisan route:cache
$PHP_CMD artisan view:cache

echo "✅ Деплой завершен!"
echo ""
echo "📊 Статус миграций:"
$PHP_CMD artisan migrate:status

echo ""
echo "🔍 Проверка таблицы audit_logs:"
$PHP_CMD artisan tinker --execute="echo \Illuminate\Support\Facades\Schema::hasTable('audit_logs') ? '✅ Таблица audit_logs существует' : '❌ Таблица audit_logs не найдена';"
