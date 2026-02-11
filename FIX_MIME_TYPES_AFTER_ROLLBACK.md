# Исправление MIME типов после отката

## Проблемы:
1. MIME type для JS файлов пустой ("") - файлы не находятся или .htaccess не работает
2. manifest.json имеет синтаксическую ошибку - отдается HTML вместо JSON

## Решение:

### 1. Проверить структуру сборки на сервере

```bash
cd ~/bellahasias.ru/public_html

# Проверить, где находится сборка
ls -la dist/ 2>/dev/null || ls -la build/ 2>/dev/null || echo "Сборка не найдена"

# Проверить наличие manifest.json
find . -name "manifest.json" -type f 2>/dev/null

# Проверить наличие index.html
find . -name "index.html" -type f 2>/dev/null | grep -v node_modules
```

### 2. Если сборка в dist/, настроить .htaccess для dist/

```bash
cd ~/bellahasias.ru/public_html

# Создать .htaccess в dist/ если его нет
if [ -d "dist" ]; then
    cat > dist/.htaccess << 'EOF'
Options -Indexes

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  RewriteRule ^ index.html [L]
</IfModule>

# Настройка MIME типов
<IfModule mod_mime.c>
    AddType application/javascript js mjs
    AddType application/json json
    AddType text/css css
</IfModule>
EOF
    chmod 644 dist/.htaccess
fi
```

### 3. Обновить корневой .htaccess для правильной обработки

```bash
cd ~/bellahasias.ru/public_html

# Если DocumentRoot в корне, а сборка в dist/
cat > .htaccess << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Если запрос к файлу в dist/, отдать его
    RewriteCond %{REQUEST_URI} ^/(dist|assets|icons|uploads|videos|favicon\.png|logo3\.(png|svg)|manifest\.json|robots\.txt|sitemap\.xml|og-image\.jpg|placeholder\.svg)(/.*)?$
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f
    RewriteRule ^ - [L]

    # Если запрос к файлу в public/, отдать его
    RewriteCond %{REQUEST_URI} ^/public/(.*)$
    RewriteCond %{DOCUMENT_ROOT}/public/%1 -f
    RewriteRule ^public/(.*)$ public/$1 [L]

    # Если файл существует, отдать его
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # SPA fallback - все запросы на index.html
    # Сначала проверяем dist/index.html, потом public/index.html, потом index.html
    RewriteCond %{DOCUMENT_ROOT}/dist/index.html -f
    RewriteRule ^ dist/index.html [L]
    
    RewriteCond %{DOCUMENT_ROOT}/public/index.html -f
    RewriteRule ^ public/index.html [L]
    
    RewriteRule ^ index.html [L]
</IfModule>

# Настройка MIME типов для правильной загрузки модулей
<IfModule mod_mime.c>
    AddType application/javascript js mjs
    AddType application/json json
    AddType text/css css
    AddType image/svg+xml svg
    AddType image/png png
    AddType image/jpeg jpg jpeg
    AddType image/webp webp
</IfModule>
EOF

chmod 644 .htaccess
```

### 4. Проверить manifest.json

```bash
# Проверить содержимое manifest.json
cat dist/manifest.json 2>/dev/null || cat public/manifest.json 2>/dev/null || cat manifest.json 2>/dev/null

# Если manifest.json отдается как HTML, значит файл не найден
# Нужно убедиться, что он копируется при сборке
```

### 5. Если сборки нет, собрать локально

```bash
# На локальной машине
npm run build

# Проверить, что manifest.json скопировался
ls -la dist/manifest.json

# Добавить в git
git add dist/
git commit -m "Add build files"
git push origin main
```

## Проверка после исправления:

```bash
# 1. Проверить MIME типы
curl -I https://bellahasias.ru/dist/assets/index-*.js 2>/dev/null | grep -i content-type | head -1
curl -I https://bellahasias.ru/manifest.json 2>/dev/null | grep -i content-type

# 2. Проверить работу сайта
curl -I https://bellahasias.ru/ 2>/dev/null | head -3
```

## Важно:

- Сборка должна быть в `dist/` (по умолчанию для Vite)
- `manifest.json` должен быть скопирован в `dist/` при сборке
- `.htaccess` должен быть настроен для правильных MIME типов
- Если используется nginx, `.htaccess` не работает - нужен `index.php` в корне
