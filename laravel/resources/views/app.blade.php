@php
    /** @var array $seo */
    $seo = $seo ?? app(\App\Services\SeoResolver::class)->resolve(request()->path() === '/' ? '' : request()->path());

    // Vite manifest находится в /build/.vite/manifest.json
    $manifestPath = base_path('../build/.vite/manifest.json');
    $manifest = file_exists($manifestPath) ? json_decode(file_get_contents($manifestPath), true) : null;
    $entry = $manifest['index.html'] ?? null;
    $iconVersion = '3';
@endphp
<!doctype html>
<html lang="ru" prefix="og: https://ogp.me/ns#">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

    {{-- SEO: теги с data-rh перехватываются react-helmet-async после загрузки SPA --}}
    <title>{{ $seo['title'] }}</title>
    <meta name="description" content="{{ $seo['description'] }}" data-rh="true" />
    <meta name="robots" content="{{ $seo['robots'] }}" data-rh="true" />
    @if($seo['canonical'])
    <link rel="canonical" href="{{ $seo['canonical'] }}" data-rh="true" />
    @endif
    <meta name="author" content="Bella Hasias" />
    <meta name="geo.region" content="RU-MOW" />
    <meta name="geo.placename" content="Москва" />

    <meta property="og:type" content="website" data-rh="true" />
    <meta property="og:site_name" content="Bella Hasias" />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:title" content="{{ $seo['title'] }}" data-rh="true" />
    <meta property="og:description" content="{{ $seo['description'] }}" data-rh="true" />
    @if($seo['canonical'])
    <meta property="og:url" content="{{ $seo['canonical'] }}" data-rh="true" />
    @endif
    <meta property="og:image" content="{{ $seo['image'] }}" data-rh="true" />
    <meta property="og:image:alt" content="{{ $seo['h1'] }}" />
    <meta name="twitter:card" content="summary_large_image" data-rh="true" />
    <meta name="twitter:title" content="{{ $seo['title'] }}" data-rh="true" />
    <meta name="twitter:description" content="{{ $seo['description'] }}" data-rh="true" />
    <meta name="twitter:image" content="{{ $seo['image'] }}" data-rh="true" />
    <meta property="telegram:channel" content="@bellahasias" />

    {{-- PWA / иконки --}}
    <meta name="theme-color" content="#FBF9F7" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Bella Hasias" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="format-detection" content="telephone=no" />
    <link rel="icon" href="/favicon.ico?v={{ $iconVersion }}" sizes="48x48" />
    <link rel="icon" href="/build/favicon.svg?v={{ $iconVersion }}" type="image/svg+xml" />
    <link rel="icon" href="/build/favicon-32.png?v={{ $iconVersion }}" type="image/png" sizes="32x32" />
    <link rel="icon" href="/build/icons/icon-192.png?v={{ $iconVersion }}" type="image/png" sizes="192x192" />
    <link rel="apple-touch-icon" href="/build/icons/apple-touch-icon.png?v={{ $iconVersion }}" sizes="180x180" />
    <link rel="manifest" href="/build/manifest.webmanifest?v={{ $iconVersion }}" />
    <meta name="msapplication-TileColor" content="#1F2121" />

    @foreach($seo['jsonld'] as $schema)
    <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG) !!}</script>
    @endforeach

    {{-- Текст для роботов без JS не показываем пользователям с JS: React отрисует страницу сам --}}
    <script>document.documentElement.classList.add('js')</script>
    <style>html{background:#FBF9F7}.js #seo-fallback{display:none}</style>

    @if(request()->path() === '/')
    <link rel="preload" as="image" href="/build/videos/hero-poster.webp" type="image/webp" fetchpriority="high">
    @endif

    @if($entry)
        @foreach(($entry['css'] ?? []) as $css)
        <link rel="stylesheet" href="/build/{{ $css }}">
        @endforeach
        <link rel="modulepreload" href="/build/{{ $entry['file'] }}">
    @else
        <style>body { font-family: system-ui, sans-serif; padding: 2rem; text-align: center; } .error { color: #dc2626; }</style>
    @endif
</head>
<body>
    {{-- Контент для поисковых роботов и пользователей без JS; React заменяет его при монтировании --}}
    <div id="root"><main id="seo-fallback" style="max-width:720px;margin:0 auto;padding:48px 20px;font-family:system-ui,sans-serif;color:#1F2121">
        <h1>{{ $seo['h1'] }}</h1>
        @if($seo['text'])<p>{{ $seo['text'] }}</p>@endif
        @if(count($seo['links']))
        <ul>
            @foreach($seo['links'] as $link)
            <li><a href="{{ $link['href'] }}">{{ $link['label'] }}</a></li>
            @endforeach
        </ul>
        @endif
        <nav><a href="/">Главная</a> · <a href="/services">Услуги</a> · <a href="/portfolio">Портфолио</a> · <a href="/contacts">Контакты</a></nav>
    </main></div>
    @if($entry)
        <script type="module" src="/build/{{ $entry['file'] }}"></script>
    @else
        <div class="error"><h1>Build not found</h1><p>Run <code>npm run build</code> in <code>frontend/</code>.</p></div>
    @endif
</body>
</html>
