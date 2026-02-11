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

# Попытка найти composer
if command -v composer &> /dev/null; then
    composer install --no-dev --optimize-autoloader
elif [ -f ~/composer.phar ]; then
    php8.2 ~/composer.phar install --no-dev --optimize-autoloader
elif [ -f /usr/local/bin/composer ]; then
    php8.2 /usr/local/bin/composer install --no-dev --optimize-autoloader
else
    echo "❌ Composer не найден. Установите composer или укажите путь вручную."
    exit 1
fi

echo "🗄️  Выполнение миграций..."
php artisan migrate --force

echo "🧹 Очистка кэшей..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo "💾 Создание кэшей..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Деплой завершен!"
echo ""
echo "📊 Статус миграций:"
php artisan migrate:status

echo ""
echo "🔍 Проверка таблицы audit_logs:"
php artisan tinker --execute="echo \Illuminate\Support\Facades\Schema::hasTable('audit_logs') ? '✅ Таблица audit_logs существует' : '❌ Таблица audit_logs не найдена';"
