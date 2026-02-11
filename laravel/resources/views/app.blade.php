<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Стилист и контент-креатор в Москве | Bella Hasias</title>
    <meta name="description" content="Профессиональный стилист и контент-креатор в Москве. Создаю визуальный стиль и контент, который раскрывает индивидуальность брендов и людей." />
    <meta name="keywords" content="стилист Москва, визуальный контент, стилизация съёмки, контент-креатор Москва, персональный шопинг, стилист бренда, контент для Instagram, UGC-контент" />
    <meta name="author" content="Bella Hasias" />

    <!-- PWA Meta Tags -->
    <meta name="theme-color" content="#FBF9F7" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Bella Hasias" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-TileColor" content="#1F2121" />
    <meta name="msapplication-tap-highlight" content="no" />

    <!-- Favicon & Icons -->
    <link rel="icon" type="image/png" href="/build/logo3.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/build/logo3.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/build/logo3.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/build/logo3.png" />
    <link rel="mask-icon" href="/build/logo3.png" color="#1F2121" />
    <meta name="msapplication-TileImage" content="/build/logo3.png" />

    <!-- Web App Manifest -->
    <link rel="manifest" href="/build/manifest.json" />

    <!-- Canonical -->
    <link rel="canonical" href="{{ config('app.url', 'https://bellahasias.ru') }}/" />

    <!-- Open Graph (Facebook, VK, Telegram) -->
    <meta property="og:title" content="Bella Hasias — стилист и контент-креатор в Москве" />
    <meta property="og:description" content="Создаю визуальный стиль и контент, который раскрывает индивидуальность бренда или личности." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ config('app.url', 'https://bellahasias.ru') }}/" />
    <meta property="og:image" content="{{ config('app.url', 'https://bellahasias.ru') }}/build/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="640" />
    <meta property="og:image:alt" content="Bella Hasias — Стилист и Контент-Креатор в Москве" />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:site_name" content="Bella Hasias" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Bella Hasias — стилист и контент-креатор в Москве" />
    <meta name="twitter:description" content="Создаю визуальный стиль и контент, который раскрывает индивидуальность бренда или личности." />
    <meta name="twitter:image" content="{{ config('app.url', 'https://bellahasias.ru') }}/build/og-image.jpg" />

    <!-- Telegram -->
    <meta property="telegram:channel" content="@bellahasias" />

    <!-- Fonts Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

    @php
        // Manifest находится в корне репозитория в /build/manifest.json
        // Используем прямой путь, так как public_path() может не работать корректно
        $manifestPath = base_path('../build/manifest.json');
        $manifest = null;
        if (file_exists($manifestPath)) {
            $manifestContent = file_get_contents($manifestPath);
            $manifest = json_decode($manifestContent, true);
        }
    @endphp

    @if($manifest && isset($manifest['index.html']))
        @php
            $indexEntry = $manifest['index.html'];
            $cssFile = isset($indexEntry['css'][0]) ? '/build/' . $indexEntry['css'][0] : null;
            $jsFile = isset($indexEntry['file']) ? '/build/' . $indexEntry['file'] : null;
        @endphp
        @if($cssFile)
            <link rel="stylesheet" href="{{ $cssFile }}">
        @endif
    @else
        <style>
            body { font-family: system-ui, sans-serif; padding: 2rem; text-align: center; }
            .error { color: #dc2626; }
        </style>
    @endif
</head>
<body>
    <div id="root"></div>
    @if($manifest && isset($manifest['index.html']) && isset($manifest['index.html']['file']))
        <script type="module" src="/build/{{ $manifest['index.html']['file'] }}"></script>
    @else
        <div class="error">
            <h1>Build not found</h1>
            <p>Please run <code>npm run build</code> in the <code>frontend/</code> directory.</p>
        </div>
    @endif
</body>
</html>
