# Bella Hasias — Стилист и контент-креатор

Сайт-визитка с Headless CMS админкой на стеке React + Vite + TypeScript + TailwindCSS + ShadCN UI.

## Технологии

- **Frontend:** React 18, Vite 6, TypeScript
- **UI:** TailwindCSS, ShadCN UI, Framer Motion
- **Роутинг:** React Router v6
- **CMS:** Локальная админка с хранением в localStorage + JSON-файлы в `src/data/`

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Режим разработки
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр собранного проекта
npm run preview
```

## Админ-панель

- **URL:** `/admin` (редирект на `/admin/dashboard`)
- **Логин:** `/admin/login`
- **Учётные данные:** `anastasirezepova@yandex.ru` / `123123123`

### Разделы админки

| Раздел    | Маршрут             | Описание                          |
|-----------|---------------------|-----------------------------------|
| Dashboard | /admin/dashboard    | Панель управления, метрики        |
| Медиа     | /admin/media        | Медиатеки, загрузка файлов        |
| Услуги    | /admin/services     | CRUD услуг                        |
| Кейсы     | /admin/cases        | Портфолио и кейсы                 |
| Страницы  | /admin/pages        | Редактор блоков страниц           |
| SEO       | /admin/seo          | Мета-теги, sitemap, robots        |
| Статистика| /admin/stats        | Заглушка                          |
| Настройки | /admin/settings     | Заглушка                          |

## Деплой на Бегет (Beget)

### 1. Сборка проекта

```bash
npm run build
```

Папка `dist/` будет содержать готовый статический сайт.

### 2. Загрузка на хостинг

- Подключитесь к хостингу по FTP/SFTP
- Загрузите **содержимое** папки `dist/` в `public_html`
- Структура на сервере должна быть примерно такой:

```
public_html/
├── index.html
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── [изображения и шрифты]
├── favicon.png
├── icons/
├── manifest.json
├── og-image.jpg
├── robots.txt
├── sitemap.xml
├── videos/
└── uploads/
```

### 3. Обновление sitemap.xml и robots.txt

- Сгенерируйте файлы в админке: `/admin/seo` → «Скачать sitemap.xml» и «Скачать robots.txt»
- Замените соответствующие файлы в `public_html` на скачанные
- В `src/data/seo.json` (или через админку) укажите актуальный **Site URL** (например, `https://yourdomain.ru`)

### 4. Настройка .htaccess (SPA)

Для корректной работы React Router на хостинге убедитесь, что в `public_html` есть `.htaccess`:

```apache
Options -Indexes

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  RewriteRule ^ index.html [L]
</IfModule>
```

### 5. Проверка после деплоя

- [ ] Главная страница открывается
- [ ] Маршруты `/contacts`, `/portfolio`, `/services` работают
- [ ] Страницы кейсов `/portfolio/:slug` открываются
- [ ] Админка `/admin/login` доступна
- [ ] Файлы `sitemap.xml` и `robots.txt` доступны по URL

## Конфигурация

- **Vite:** `base: "./"` — относительные пути для корректной работы на хостинге
- **Данные CMS:** `src/data/*.json` — начальные данные; изменения сохраняются в localStorage браузера

## Структура проекта

```
src/
├── admin/           # Админ-панель
│   ├── components/  # UI-компоненты CMS
│   ├── hooks/       # useAuth
│   ├── layout/      # Layout админки
│   ├── lib/         # Хранилища (media, services, cases, pages, seo)
│   ├── pages/       # Страницы админки
│   └── types/       # Типы
├── components/      # Публичные компоненты
├── data/            # JSON-данные (users, media, services, cases, pages, seo)
├── pages/           # Публичные страницы
└── ...
```

## Лицензия

Private.
