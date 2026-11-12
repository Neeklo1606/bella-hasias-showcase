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
    public const TELEGRAM = 'https://t.me/Bella_hasias';
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
        'feedback' => ['feedback', 'Оставить заявку | Bella Hasias', 'Оставьте заявку стилисту Bella Hasias: съёмка, разбор гардероба, шопинг или контент для бренда. Отвечу в течение дня, Москва и онлайн.', 'Оставить заявку', 'Заявка'],
        'privacy' => ['privacy', 'Политика конфиденциальности | Bella Hasias', 'Политика конфиденциальности сайта bellahasias.ru: какие персональные данные собираются, зачем и как они защищены.', 'Политика конфиденциальности', 'Политика конфиденциальности'],
        'terms' => ['terms', 'Пользовательское соглашение | Bella Hasias', 'Пользовательское соглашение сайта bellahasias.ru: условия использования сайта, заявок и услуг стилиста Bella Hasias.', 'Пользовательское соглашение', 'Соглашение'],
        'consent' => ['consent', 'Согласие на обработку персональных данных | Bella Hasias', 'Согласие на обработку персональных данных при отправке заявки на сайте bellahasias.ru стилисту Bella Hasias.', 'Согласие на обработку данных', 'Согласие'],
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

        // Слишком короткий заголовок из админки («Контакты») хуже стандартного — берём стандартный
        $adminTitle = $this->clean($meta['metaTitle'] ?? '');
        $seo['title'] = mb_strlen($adminTitle) >= 25 ? $adminTitle : $title;
        $seo['description'] = $this->clean($meta['metaDescription'] ?? '') ?: $description;
        $seo['h1'] = $h1;
        $seo['text'] = $seo['description'];
        // Факты для поисковиков и ИИ-ассистентов, видимые без JavaScript
        $extra = [
            '' => 'Bella Hasias — стилист и контент-креатор из Москвы. Работаю лично и онлайн. Для записи напишите в Telegram @Bella_hasias или в Instagram @bellahasias.',
            'contacts' => 'Написать можно в Telegram @Bella_hasias ('.self::TELEGRAM.') или в Instagram @bellahasias. Город: Москва, консультации также онлайн. Обычно отвечаю в течение дня. Чтобы записаться, напишите, какая услуга нужна, удобные даты и бюджет.',
            'portfolio' => 'Здесь собраны реальные проекты стилиста Bella Hasias: стилизация съёмок для брендов и людей, образы на мероприятия, капсульные гардеробы, UGC и AI-контент. Каждая работа — от идеи и подбора образа до готовых фото и видео.',
            'feedback' => 'Опишите задачу: съёмка, разбор гардероба, шопинг, образ на мероприятие или контент для бренда. Укажите удобные даты и способ связи. Связь: Telegram @Bella_hasias.',
            'privacy' => 'Сайт собирает только данные, которые вы указываете в заявке (имя, телефон, e-mail, сообщение), и использует их, чтобы связаться с вами по вашему запросу. Данные не передаются третьим лицам. Вопросы по данным: Telegram @Bella_hasias.',
            'terms' => 'Сайт bellahasias.ru носит информационный характер. Условия, сроки и стоимость услуг согласуются индивидуально после заявки. Материалы сайта (фото, тексты) принадлежат автору. Связь: Telegram @Bella_hasias.',
            'consent' => 'Отправляя заявку, вы соглашаетесь на обработку имени, телефона, e-mail и текста сообщения стилистом Bella Hasias для ответа на ваш запрос. Согласие можно отозвать, написав в Telegram @Bella_hasias.',
        ];
        if (isset($extra[$path])) {
            $seo['text'] .= ' '.$extra[$path];
        }
        if (($meta['index'] ?? true) === false) {
            $seo['robots'] = 'noindex, follow';
        }

        // GEO: карточка местного бизнеса (Москва) — для Яндекса, Google и AI-поиска
        if ($path === '' || $path === 'contacts') {
            $seo['jsonld'][] = $this->localBusinessSchema($base);
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
            'sameAs' => self::SAME_AS,
        ];
    }

    public function localBusinessSchema(string $base): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'ProfessionalService',
            '@id' => $base.'/#business',
            'name' => self::BRAND.' — стилист в Москве',
            'url' => $base.'/',
            'image' => $base.'/build/og-image.jpg',
            'logo' => $base.'/build/icons/icon-512.png',
            'description' => self::DEFAULT_DESCRIPTION,
            'address' => ['@type' => 'PostalAddress', 'addressLocality' => 'Москва', 'addressRegion' => 'Москва', 'addressCountry' => 'RU'],
            'areaServed' => [
                ['@type' => 'City', 'name' => 'Москва'],
                ['@type' => 'Country', 'name' => 'Россия'],
            ],
            'founder' => ['@id' => $base.'/#person'],
            'sameAs' => self::SAME_AS,
            'contactPoint' => [[
                '@type' => 'ContactPoint',
                'url' => self::TELEGRAM,
                'contactType' => 'customer service',
                'availableLanguage' => ['ru'],
            ]],
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
