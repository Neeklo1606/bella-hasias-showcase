<?php

namespace App\Services;

use App\Models\CaseItem;
use App\Models\Page;
use App\Models\SeoMeta;
use App\Models\Service;
use Illuminate\Support\Str;
use Throwable;

/**
 * Builds per-route SEO data (title, description, canonical, OG, JSON-LD and a
 * plain-text fallback) for the server-rendered SPA shell, so crawlers that do
 * not execute JavaScript still see unique, meaningful content on every URL.
 */
class SeoResolver
{
    public const PHONE = '+7 977 588-74-70';
    public const EMAIL = 'anastasirezepova@yandex.ru';
    public const BRAND = 'Bella Hasias';

    public const DEFAULT_DESCRIPTION = 'Стилист и контент-креатор в Москве. Стилизация съёмок, разбор и капсульный гардероб, персональный шопинг, UGC и AI-контент для брендов и людей.';

    public const SAME_AS = [
        'https://t.me/bellahasias',
        'https://vk.com/bella_hasias',
        'https://instagram.com/bellahasias',
    ];

    /** Static routes: path => [slug in `pages` table, title, description, h1, breadcrumb name] */
    private const STATIC = [
        '' => ['home', 'Стилист и контент-креатор в Москве | Bella Hasias', self::DEFAULT_DESCRIPTION, 'Bella Hasias — стилист и контент-креатор в Москве', null],
        'services' => ['services', 'Услуги стилиста в Москве | Bella Hasias', 'Услуги стилиста и контент-креатора в Москве: стилизация съёмки, разбор гардероба, капсульный гардероб, персональный шопинг, образ на мероприятие, UGC и AI-контент.', 'Услуги стилиста', 'Услуги'],
        'portfolio' => ['portfolio', 'Портфолио стилиста — работы и кейсы | Bella Hasias', 'Портфолио Bella Hasias: съёмки, стилизация брендов, образы и контент. Реальные проекты стилиста и контент-креатора из Москвы.', 'Портфолио', 'Портфолио'],
        'contacts' => ['contacts', 'Контакты стилиста в Москве | Bella Hasias', 'Свяжитесь со стилистом Bella Hasias в Telegram, чтобы обсудить съёмку, разбор гардероба или контент для бренда. Москва и онлайн.', 'Контакты', 'Контакты'],
        'feedback' => ['feedback', 'Оставить заявку | Bella Hasias', 'Оставьте заявку стилисту Bella Hasias — отвечу в течение дня.', 'Оставить заявку', 'Заявка'],
        'privacy' => ['privacy', 'Политика конфиденциальности | Bella Hasias', 'Политика обработки персональных данных сайта bellahasias.ru.', 'Политика конфиденциальности', 'Политика конфиденциальности'],
        'terms' => ['terms', 'Пользовательское соглашение | Bella Hasias', 'Пользовательское соглашение сайта bellahasias.ru.', 'Пользовательское соглашение', 'Соглашение'],
        'consent' => ['consent', 'Согласие на обработку персональных данных | Bella Hasias', 'Согласие на обработку персональных данных на сайте bellahasias.ru.', 'Согласие на обработку данных', 'Согласие'],
        'vk' => ['vk', 'Стилист Bella Hasias | Москва', self::DEFAULT_DESCRIPTION, 'Bella Hasias — стилист в Москве', null],
    ];

    public function siteUrl(): string
    {
        $url = 'https://bellahasias.ru';
        try {
            $value = SeoMeta::getValue('siteUrl');
            if (is_string($value) && str_starts_with($value, 'http')) {
                $url = $value;
            }
        } catch (Throwable) {
            // DB unavailable — keep default
        }

        return rtrim($url, '/');
    }

    /**
     * @return array{status:int,title:string,description:string,canonical:?string,robots:string,image:string,h1:string,text:string,links:array,jsonld:array}
     */
    public function resolve(string $path): array
    {
        $path = trim($path, '/');
        $base = $this->siteUrl();
        $segments = $path === '' ? [] : explode('/', $path);

        $seo = [
            'status' => 200,
            'title' => self::STATIC[''][1],
            'description' => self::DEFAULT_DESCRIPTION,
            'canonical' => $base.'/'.($path === '' ? '' : $path),
            'robots' => 'index, follow, max-image-preview:large',
            'image' => $base.'/build/og-image.jpg',
            'h1' => self::STATIC[''][3],
            'text' => self::DEFAULT_DESCRIPTION,
            'links' => [],
            'jsonld' => [$this->websiteSchema($base), $this->personSchema($base)],
        ];

        // Admin & auth screens: never index
        if (($segments[0] ?? null) === 'admin') {
            return array_merge($seo, [
                'title' => 'Админ-панель | '.self::BRAND,
                'robots' => 'noindex, nofollow',
                'canonical' => null,
                'jsonld' => [],
                'h1' => 'Админ-панель',
                'text' => '',
            ]);
        }

        try {
            if (count($segments) <= 1 && array_key_exists($path, self::STATIC)) {
                return $this->staticPage($seo, $path, $base);
            }

            if (count($segments) === 2 && $segments[0] === 'services') {
                return $this->servicePage($seo, $segments[1], $base);
            }

            if (count($segments) === 2 && $segments[0] === 'portfolio') {
                return $this->casePage($seo, $segments[1], $base);
            }
        } catch (Throwable $e) {
            report($e);

            return $seo; // fail open: never break the page because of SEO
        }

        return $this->notFound($seo);
    }

    private function staticPage(array $seo, string $path, string $base): array
    {
        [$slug, $title, $description, $h1, $crumb] = self::STATIC[$path];

        $page = Page::where('slug', $slug)->where('status', 'published')->first();
        $meta = $page?->seo ?? [];

        $seo['title'] = $this->clean($meta['metaTitle'] ?? '') ?: $title;
        $seo['description'] = $this->clean($meta['metaDescription'] ?? '') ?: $description;
        $seo['h1'] = $h1;
        $seo['text'] = $seo['description'];
        if (($meta['index'] ?? true) === false) {
            $seo['robots'] = 'noindex, follow';
        }

        if ($path === '' || $path === 'services') {
            $services = Service::where('status', 'published')->orderBy('sort_order')->get(['title', 'slug', 'description']);
            foreach ($services as $service) {
                $seo['links'][] = ['href' => '/services/'.$service->slug, 'label' => $service->title];
            }
            if ($path === 'services' && $services->isNotEmpty()) {
                $seo['jsonld'][] = [
                    '@context' => 'https://schema.org',
                    '@type' => 'ItemList',
                    'name' => 'Услуги стилиста Bella Hasias',
                    'itemListElement' => $services->values()->map(fn ($s, $i) => [
                        '@type' => 'ListItem',
                        'position' => $i + 1,
                        'url' => $base.'/services/'.$s->slug,
                        'name' => $s->title,
                    ])->all(),
                ];
            }
        }

        if ($path === 'portfolio') {
            foreach (CaseItem::where('status', 'published')->orderBy('sort_order')->get(['title', 'slug']) as $case) {
                $seo['links'][] = ['href' => '/portfolio/'.$case->slug, 'label' => $case->title];
            }
        }

        if ($crumb) {
            $seo['jsonld'][] = $this->breadcrumbs($base, [[$crumb, $base.'/'.$path]]);
        }

        return $seo;
    }

    private function servicePage(array $seo, string $slug, string $base): array
    {
        $service = Service::with('cover', 'image')->where('slug', $slug)->where('status', 'published')->first();
        if (! $service) {
            return $this->notFound($seo);
        }

        $description = $this->summary($service->description) ?: "{$service->title} — услуга стилиста Bella Hasias в Москве.";
        $seo['title'] = "{$service->title} — стилист в Москве | ".self::BRAND;
        $seo['description'] = $description;
        $seo['h1'] = $service->title;
        $seo['text'] = $this->clean($service->description) ?: $description;
        $seo['image'] = $this->absolute($base, ($service->cover ?? $service->image)?->url) ?? $seo['image'];
        $seo['links'] = [['href' => '/services', 'label' => 'Все услуги'], ['href' => '/contacts', 'label' => 'Записаться']];
        $seo['jsonld'][] = [
            '@context' => 'https://schema.org',
            '@type' => 'Service',
            'name' => $service->title,
            'description' => $description,
            'serviceType' => $service->title,
            'url' => $base.'/services/'.$service->slug,
            'image' => $seo['image'],
            'areaServed' => ['@type' => 'City', 'name' => 'Москва'],
            'provider' => ['@id' => $base.'/#person'],
        ];
        $seo['jsonld'][] = $this->breadcrumbs($base, [
            ['Услуги', $base.'/services'],
            [$service->title, $base.'/services/'.$service->slug],
        ]);

        return $seo;
    }

    private function casePage(array $seo, string $slug, string $base): array
    {
        $case = CaseItem::with('media')->where('slug', $slug)->where('status', 'published')->first();
        if (! $case) {
            return $this->notFound($seo);
        }

        $description = $this->summary($case->description) ?: "{$case->title} — проект стилиста Bella Hasias.";
        $seo['title'] = "{$case->title} — портфолио | ".self::BRAND;
        $seo['description'] = $description;
        $seo['h1'] = $case->title;
        $seo['text'] = $this->clean($case->description) ?: $description;
        $seo['image'] = $this->absolute($base, $case->media->first()?->url) ?? $seo['image'];
        $seo['links'] = [['href' => '/portfolio', 'label' => 'Всё портфолио']];
        $seo['jsonld'][] = [
            '@context' => 'https://schema.org',
            '@type' => 'CreativeWork',
            'name' => $case->title,
            'description' => $description,
            'url' => $base.'/portfolio/'.$case->slug,
            'image' => $seo['image'],
            'creator' => ['@id' => $base.'/#person'],
        ];
        $seo['jsonld'][] = $this->breadcrumbs($base, [
            ['Портфолио', $base.'/portfolio'],
            [$case->title, $base.'/portfolio/'.$case->slug],
        ]);

        return $seo;
    }

    private function notFound(array $seo): array
    {
        return array_merge($seo, [
            'status' => 404,
            'title' => 'Страница не найдена | '.self::BRAND,
            'description' => 'Такой страницы нет. Перейдите на главную или в раздел услуг.',
            'robots' => 'noindex, follow',
            'canonical' => null,
            'h1' => 'Страница не найдена',
            'text' => 'Такой страницы нет.',
            'links' => [['href' => '/', 'label' => 'На главную'], ['href' => '/services', 'label' => 'Услуги']],
            'jsonld' => [],
        ]);
    }

    public function websiteSchema(string $base): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            '@id' => $base.'/#website',
            'url' => $base.'/',
            'name' => self::BRAND,
            'inLanguage' => 'ru-RU',
            'publisher' => ['@id' => $base.'/#person'],
        ];
    }

    public function personSchema(string $base): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Person',
            '@id' => $base.'/#person',
            'name' => self::BRAND,
            'jobTitle' => 'Стилист и контент-креатор',
            'url' => $base.'/',
            'image' => $base.'/build/og-image.jpg',
            'description' => self::DEFAULT_DESCRIPTION,
            'address' => ['@type' => 'PostalAddress', 'addressLocality' => 'Москва', 'addressCountry' => 'RU'],
            'knowsAbout' => ['Стилизация съёмок', 'Капсульный гардероб', 'Персональный шопинг', 'UGC-контент', 'AI-контент', 'Визуальный стиль бренда'],
            'telephone' => self::PHONE,
            'email' => self::EMAIL,
            'sameAs' => self::SAME_AS,
        ];
    }

    private function breadcrumbs(string $base, array $items): array
    {
        $list = [['@type' => 'ListItem', 'position' => 1, 'name' => 'Главная', 'item' => $base.'/']];
        foreach ($items as $i => [$name, $url]) {
            $list[] = ['@type' => 'ListItem', 'position' => $i + 2, 'name' => $name, 'item' => $url];
        }

        return ['@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => $list];
    }

    private function clean(?string $text): string
    {
        return trim(preg_replace('/\s+/u', ' ', strip_tags((string) $text)));
    }

    private function summary(?string $text): string
    {
        return Str::limit($this->clean($text), 160, '…');
    }

    private function absolute(string $base, ?string $url): ?string
    {
        if (! $url) {
            return null;
        }

        return str_starts_with($url, 'http') ? $url : $base.'/'.ltrim($url, '/');
    }
}
