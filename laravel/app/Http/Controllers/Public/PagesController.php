<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Models\Page;
use App\Models\SeoMeta;
use Illuminate\Http\JsonResponse;

class PagesController extends Controller
{
    public function show(string $slug): JsonResponse
    {
        $page = Page::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return (new PageResource($page))->response();
    }

    public function seo(): JsonResponse
    {
        $siteUrl = SeoMeta::getValue('siteUrl', 'https://bellahasias.ru');

        return response()->json([
            'siteUrl' => $siteUrl,
        ]);
    }
}
