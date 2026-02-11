# React Query Migration - Итоговый отчет

## ✅ Выполненные изменения

Все admin pages переведены на консистентное использование React Query с `useQuery` и `useMutation`.

### Переведенные страницы:

1. **Cases.tsx** - полностью переведен на React Query
2. **Pages.tsx** - полностью переведен на React Query
3. **Media.tsx** - полностью переведен на React Query
4. **SEO.tsx** - полностью переведен на React Query
5. **Services.tsx** - обновлен для использования `useMutation` (уже использовал `useQuery`)

## 📋 Query Keys (единообразные)

Все query keys следуют единому паттерну:

```typescript
// Список сущностей (с параметрами)
['cases', 'admin', params]      // params = { per_page: 100 }
['pages', 'admin', params]       // params = { per_page: 100 }
['media', 'admin', params]       // params = { per_page: 100 }
['services', 'admin', params]   // params = { per_page: 100 }

// SEO конфигурация (без параметров)
['seo', 'admin']
```

### Invalidate Queries

После мутаций используются правильные ключи для инвалидации:

```typescript
// Cases
queryClient.invalidateQueries({ queryKey: ['cases', 'admin'] });

// Pages
queryClient.invalidateQueries({ queryKey: ['pages', 'admin'] });

// Media
queryClient.invalidateQueries({ queryKey: ['media', 'admin'] });

// Services
queryClient.invalidateQueries({ queryKey: ['services', 'admin'] });

// SEO
queryClient.invalidateQueries({ queryKey: ['seo', 'admin'] });
```

## 🔄 Использование useMutation

Все create/update/delete операции используют `useMutation`:

### Cases.tsx
- `createMutation` - создание кейса
- `updateMutation` - обновление кейса
- `deleteMutation` - удаление кейса

### Pages.tsx
- `createMutation` - создание страницы
- `updateBlocksMutation` - обновление блоков страницы

### Media.tsx
- `uploadMutation` - загрузка файлов
- `updateMutation` - обновление медиа
- `deleteMutation` - удаление медиа
- `categoryChangeMutation` - изменение категории

### SEO.tsx
- `updatePageSEOMutation` - обновление SEO страницы
- `updateSiteUrlMutation` - обновление URL сайта

### Services.tsx
- `createMutation` - создание услуги
- `updateMutation` - обновление услуги
- `deleteMutation` - удаление услуги

## 🎯 Toast Notifications

### Правило:
- **Ошибки** - показываются автоматически через `apiClient` interceptor
- **Успех** - показываются вручную через `toast.success()` в `onSuccess` callback мутаций

### Примеры:

```typescript
// ✅ Правильно - success toast в onSuccess
const createMutation = useMutation({
  mutationFn: (data) => api.create(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['items', 'admin'] });
    toast.success("Элемент создан"); // Success toast
  },
});

// ❌ Неправильно - не нужно показывать error toast
// Ошибки уже обрабатываются в apiClient interceptor
```

## 📁 Измененные файлы

1. **frontend/src/admin/pages/Cases.tsx**
   - Удалены: `useState`, `useEffect`, `useCallback` для загрузки данных
   - Добавлены: `useQuery` для cases, services, media
   - Добавлены: `useMutation` для create, update, delete
   - Добавлен: `Loader2` для loading состояния

2. **frontend/src/admin/pages/Pages.tsx**
   - Удалены: `useState`, `useEffect`, `useCallback` для загрузки данных
   - Добавлены: `useQuery` для pages, media
   - Добавлены: `useMutation` для create, updateBlocks
   - Добавлен: `Loader2` для loading состояния

3. **frontend/src/admin/pages/Media.tsx**
   - Удалены: `useState`, `useEffect`, `useCallback` для загрузки данных
   - Добавлены: `useQuery` для media
   - Добавлены: `useMutation` для upload, update, delete, categoryChange
   - Добавлен: `Loader2` для loading состояния

4. **frontend/src/admin/pages/SEO.tsx**
   - Удалены: `useState`, `useEffect`, `useCallback` для загрузки данных
   - Добавлены: `useQuery` для pages, media, seo
   - Добавлены: `useMutation` для updatePageSEO, updateSiteUrl
   - Добавлен: `useEffect` для синхронизации siteUrlInput
   - Добавлен: `Loader2` для loading состояния

5. **frontend/src/admin/pages/Services.tsx**
   - Обновлен: добавлены `useMutation` для create, update, delete
   - Обновлен: query keys для единообразия
   - Добавлен: `Loader2` для loading состояния

## 🔍 Query Keys Summary

### Все используемые query keys:

```typescript
// Cases
['cases', 'admin', { per_page: 100 }]

// Pages
['pages', 'admin', { per_page: 100 }]

// Media
['media', 'admin', { per_page: 100 }]

// Services
['services', 'admin', { per_page: 100 }]

// SEO
['seo', 'admin']
```

### Invalidate patterns:

```typescript
// После мутаций инвалидируются все запросы с префиксом ключа
queryClient.invalidateQueries({ queryKey: ['cases', 'admin'] }); // Инвалидирует все ['cases', 'admin', ...]
queryClient.invalidateQueries({ queryKey: ['pages', 'admin'] });  // Инвалидирует все ['pages', 'admin', ...]
queryClient.invalidateQueries({ queryKey: ['media', 'admin'] });  // Инвалидирует все ['media', 'admin', ...]
queryClient.invalidateQueries({ queryKey: ['services', 'admin'] }); // Инвалидирует все ['services', 'admin', ...]
queryClient.invalidateQueries({ queryKey: ['seo', 'admin'] });    // Инвалидирует ['seo', 'admin']
```

## ✅ Проверки

- [x] Все страницы используют `useQuery` для загрузки данных
- [x] Все мутации используют `useMutation`
- [x] Query keys единообразны
- [x] `invalidateQueries` вызывается после успешных мутаций
- [x] Success toasts показываются в `onSuccess` callback
- [x] Error toasts НЕ дублируются (обрабатываются в `apiClient`)
- [x] Loading состояния используют `Loader2` компонент
- [x] Build проходит успешно (`npm run build`)

## 🎨 Улучшения UX

1. **Единообразные loading состояния** - все страницы используют `Loader2` с текстом
2. **Автоматическая инвалидация** - данные обновляются после мутаций
3. **Нет дублирования toasts** - ошибки показываются один раз через interceptor
4. **Кэширование** - React Query кэширует данные между переходами

## 📝 Примечания

- Все query используют `refetchOnWindowFocus: false` для предотвращения лишних запросов
- Все query используют `retry: 1` для быстрого отображения ошибок
- Параметры запросов вынесены в константу `params` для единообразия
- `useMutation` использует `mutateAsync` только когда нужно await (в формах), иначе `mutate`
