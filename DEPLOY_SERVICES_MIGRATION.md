# Деплой миграции услуг в админ панель

## Команды для выполнения на сервере

```bash
cd ~/bellahasias.ru/public_html && \
git pull origin main && \
cd laravel && \
php8.2 artisan migrate && \
php8.2 artisan db:seed --class=ServiceSeeder && \
php8.2 artisan config:clear && \
php8.2 artisan config:cache && \
php8.2 artisan route:clear && \
php8.2 artisan route:cache
```

## Что будет сделано

1. **Миграция базы данных** - добавлено поле `slug` в таблицу `services`
2. **Заполнение данных** - созданы 9 услуг из статических страниц:
   - Стилизация съёмки (brand-styling)
   - Разбор гардероба (wardrobe-audit)
   - Персональный шоппинг (personal-shopping)
   - Капсульный гардероб (capsule-wardrobe)
   - Образ на мероприятие (event-look)
   - Съёмка для клиента (client-shoot)
   - UGC-контент (ugc)
   - AI-контент (ai-content)
   - Фото и видео (photo-video)

## Проверка после деплоя

### 1. Проверить данные в базе
```bash
cd ~/bellahasias.ru/public_html/laravel
php8.2 artisan tinker
```

В tinker выполнить:
```php
\App\Models\Service::count(); // Должно вернуть 9
\App\Models\Service::pluck('slug', 'title'); // Проверить все slug
exit
```

### 2. Проверить страницы в браузере

- ✅ `/services` - должна отображаться страница со списком услуг из API
- ✅ `/services/brand-styling` - должна загрузиться страница услуги
- ✅ `/services/wardrobe-audit` - должна загрузиться страница услуги
- ✅ `/services/personal-shopping` - должна загрузиться страница услуги
- ✅ `/services/capsule-wardrobe` - должна загрузиться страница услуги
- ✅ `/services/event-look` - должна загрузиться страница услуги
- ✅ `/services/client-shoot` - должна загрузиться страница услуги
- ✅ `/services/ugc` - должна загрузиться страница услуги
- ✅ `/services/ai-content` - должна загрузиться страница услуги
- ✅ `/services/photo-video` - должна загрузиться страница услуги

### 3. Проверить админ панель

- ✅ `/admin/services` - должны отображаться все 9 услуг
- ✅ Можно редактировать услуги через админ панель
- ✅ Можно добавлять изображения к услугам через `image_id` и `cover_id`

## Важные изменения

1. **Все статические компоненты услуг удалены из роутов**
   - Теперь используется один универсальный компонент `ServicePage`
   - Данные загружаются из API по slug

2. **Страница `/services` теперь загружает данные из API**
   - Больше нет hardcoded массива `allServices`
   - Фильтрация по категориям работает с данными из базы

3. **Управление услугами через админ панель**
   - Все услуги можно редактировать в `/admin/services`
   - Можно добавлять изображения, менять описания, теги и т.д.

## Если что-то пошло не так

### Проблема: Услуги не отображаются
```bash
# Проверить что seeder выполнился
php8.2 artisan tinker
\App\Models\Service::count();

# Если 0, выполнить seeder вручную
php8.2 artisan db:seed --class=ServiceSeeder
```

### Проблема: Страница услуги не загружается
```bash
# Проверить что slug существует
php8.2 artisan tinker
\App\Models\Service::pluck('slug');

# Проверить роуты
php8.2 artisan route:list | grep services
```

### Проблема: Ошибка 404 на `/services/:slug`
- Убедитесь что миграция выполнена: `php8.2 artisan migrate:status`
- Убедитесь что seeder выполнен: проверьте количество услуг в базе
- Очистите кеш: `php8.2 artisan route:clear && php8.2 artisan route:cache`
