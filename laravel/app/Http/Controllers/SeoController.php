<?php

namespace App\Http\Controllers;

use App\Models\CaseItem;
use App\Models\Page;
use App\Models\Service;
use App\Services\SeoResolver;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class SeoController extends Controller
{
    public function __construct(private SeoResolver $seo)
    {
    }

    /** SPA shell with server-rendered meta for every public route. */
    public function app(Request $request): Response
    {
        $seo = $this->seo->resolve($request->path() === '/' ? '' : $request->path());

        return response()->view('app', ['seo' => $seo], $seo['status']);
    }

    public function sitemap(): Response
    {
        $xml = Cache::remember('seo:sitemap', 3600, function () {
            $base = $this->seo->siteUrl();
            $urls = [];
            $static = [
                '' => ['1.0', 'weekly'],
                'services' => ['0.9', 'weekly'],
                'portfolio' => ['0.8', 'weekly'],
                'contacts' => ['0.7', 'monthly'],
                'feedback' => ['0.4', 'yearly'],
                'privacy' => ['0.2', 'yearly'],
                'terms' => ['0.2', 'yearly'],
                'consent' => ['0.2', 'yearly'],
            ];
            $pages = Page::whereIn('slug', array_merge(['home'], array_keys($static)))->get()->keyBy('slug');
            foreach ($static as $path => [$priority, $freq]) {
                $page = $pages[$path === '' ? 'home' : $path] ?? null;
                if ($page && (($page->seo['index'] ?? true) === false || $page->status !== 'published')) {
                    continue;
                }
                $urls[] = [$base.'/'.$path, $page?->updated_at, $freq, $priority];
            }
            foreach (Service::where('status', 'published')->orderBy('sort_order')->get() as $s) {
                $urls[] = [$base.'/services/'.$s->slug, $s->updated_at, 'monthly', '0.8'];
            }
            foreach (CaseItem::where('status', 'published')->orderBy('sort_order')->get() as $c) {
                $urls[] = [$base.'/portfolio/'.$c->slug, $c->updated_at, 'monthly', '0.6'];
            }

            $out = '<?xml version="1.0" encoding="UTF-8"?>'."\n".'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";
            foreach ($urls as [$loc, $lastmod, $freq, $priority]) {
                $out .= '  <url><loc>'.e($loc).'</loc>'
                    .($lastmod ? '<lastmod>'.$lastmod->toDateString().'</lastmod>' : '')
                    ."<changefreq>{$freq}</changefreq><priority>{$priority}</priority></url>\n";
            }

            return $out.'</urlset>'."\n";
        });

        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }

    public function robots(): Response
    {
        $base = $this->seo->siteUrl();
        $body = implode("\n", [
            // /api/ не закрываем: SPA подгружает данные из API, иначе боты не смогут отрисовать страницы
            'User-agent: *',
            'Disallow: /admin',
            '',
            'User-agent: Yandex',
            'Disallow: /admin',
            'Clean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term&yclid&gclid&fbclid',
            '',
            "Sitemap: {$base}/sitemap.xml",
            '',
        ]);

        return response($body, 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }

    /** llms.txt — concise site description for AI assistants / generative search (GEO). */
    public function llms(): Response
    {
        $body = Cache::remember('seo:llms', 3600, function () {
            $base = $this->seo->siteUrl();
            $lines = [
                '# Bella Hasias — стилист и контент-креатор в Москве',
                '',
                '> '.SeoResolver::DEFAULT_DESCRIPTION.' Работает в Москве и онлайн. Связь — Telegram, телефон или email.',
                '',
                '## Услуги',
            ];
            foreach (Service::where('status', 'published')->orderBy('sort_order')->get() as $s) {
                $desc = Str::limit(trim(preg_replace('/\s+/u', ' ', strip_tags((string) $s->description))), 200, '…');
                $lines[] = "- [{$s->title}]({$base}/services/{$s->slug})".($desc ? ": {$desc}" : '');
            }
            $lines = array_merge($lines, [
                '',
                '## Основные страницы',
                "- [Главная]({$base}/)",
                "- [Все услуги]({$base}/services)",
                "- [Портфолио]({$base}/portfolio)",
                "- [Контакты]({$base}/contacts)",
                '',
                '## Контакты',
                '- Telegram: https://t.me/bellahasias',
                '- Телефон: '.SeoResolver::PHONE,
                '- Email: '.SeoResolver::EMAIL,
                '- VK: https://vk.com/bella_hasias',
                '- Город: Москва (возможна работа онлайн)',
                '',
            ]);

            return implode("\n", $lines);
        });

        return response($body, 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }
}
