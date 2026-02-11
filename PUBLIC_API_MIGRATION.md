# Миграция главной страницы на Public API

## Выполненные изменения

### 1. ServicesSection.tsx
- ✅ Убран хардкод массива `services`
- ✅ Загрузка данных через `servicesApi.list()` с фильтром `status: 'published'`
- ✅ Фильтрация по категориям на клиенте (маппинг API category → UI category)
- ✅ Использование изображений из API (`image.url` или `cover.url`)
- ✅ Добавлен loading skeleton
- ✅ Добавлена обработка ошибок с toast уведомлениями
- ✅ Ограничение до 6 услуг на категорию

### 2. PortfolioSection.tsx
- ✅ Убран хардкод массива `featuredWorks`
- ✅ Загрузка данных через `casesApi.list()` с фильтром `status: 'published'`
- ✅ Выбор featured кейсов: первые N по `sort_order` (если есть) или `updated_at` (новые первыми)
- ✅ Использование первого media из массива для изображения
- ✅ Фильтрация кейсов без изображений
- ✅ Добавлен loading skeleton
- ✅ Добавлена обработка ошибок с toast уведомлениями

### 3. API сервисы
- ✅ Обновлен `servicesApi.list()` для преобразования данных (как в `adminList`)
- ✅ Обновлен `casesApi.list()` для сохранения `media` массива в ответе

## Измененные файлы

1. **frontend/src/components/ServicesSection.tsx**
   - Заменен хардкод на загрузку через API
   - Добавлены loading/error states
   - Маппинг категорий API → UI

2. **frontend/src/components/PortfolioSection.tsx**
   - Заменен хардкод на загрузку через API
   - Добавлены loading/error states
   - Логика выбора featured кейсов

3. **frontend/src/lib/api/services.api.ts**
   - Обновлен `list()` для преобразования данных (image/cover URLs)

4. **frontend/src/lib/api/cases.api.ts**
   - Обновлен `list()` для сохранения `media` массива

## Логика выбора featured кейсов

### Алгоритм сортировки:
1. **Приоритет 1:** `sort_order` (ascending) - если поле заполнено
2. **Приоритет 2:** `updated_at` (descending) - если `sort_order` одинаковый или отсутствует
3. **Результат:** Первые `FEATURED_COUNT` (6) кейсов после сортировки

### Код:
```typescript
const getFeaturedCases = (cases: CaseItem[]): CaseItem[] => {
  return [...cases]
    .sort((a, b) => {
      // First sort by sortOrder if available
      const aOrder = (a as any).sortOrder ?? 0;
      const bOrder = (b as any).sortOrder ?? 0;
      if (aOrder !== bOrder) return aOrder - bOrder;
      // Then by updated_at (newest first)
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .slice(0, FEATURED_COUNT);
};
```

### Использование изображений:
- Берется первый элемент из массива `media` (который возвращает API)
- Используется `media[0].url` или `media[0].src`
- Кейсы без изображений фильтруются (не показываются)

## Проверка

### Build
```bash
cd frontend
npm run build
# ✅ Успешно
```

### Ручная проверка
1. Откройте главную страницу `/`
2. Проверьте, что ServicesSection показывает услуги из API
3. Проверьте, что PortfolioSection показывает кейсы из API
4. Проверьте переключение категорий в ServicesSection
5. Проверьте lightbox в PortfolioSection
6. Проверьте loading states (откройте в медленной сети)
7. Проверьте error handling (отключите backend)

## Особенности реализации

### ServicesSection
- **Маппинг категорий:** API возвращает строки (например, "styling", "ugc"), которые маппятся на UI категории ("stylist", "creator")
- **Изображения:** Используется `image.url` или `cover.url` из API, если нет - пустая строка (компонент должен обработать)
- **Href:** Генерируется на основе заголовка услуги (можно улучшить, добавив slug в API)

### PortfolioSection
- **Featured выбор:** Первые 6 по `sort_order` или `updated_at`
- **Изображения:** Первое media из массива, если нет - кейс не показывается
- **Lightbox:** Работает с динамическими данными из API

## Известные ограничения

1. **ServicesSection href:** Генерируется на основе заголовка, лучше было бы использовать slug из API
2. **Изображения без fallback:** Если у услуги нет изображения, показывается пустое (можно добавить placeholder)
3. **Кейсы без изображений:** Полностью скрываются (можно показывать с placeholder)

## Следующие шаги (опционально)

1. Добавить slug в Service API для правильных href
2. Добавить placeholder изображения для услуг/кейсов без медиа
3. Добавить кеширование данных (React Query)
4. Оптимизировать загрузку (lazy loading для изображений)
