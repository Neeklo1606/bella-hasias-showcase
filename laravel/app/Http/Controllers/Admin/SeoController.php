<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SeoMeta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    public function index(): JsonResponse
    {
        $siteUrl = SeoMeta::getValue('siteUrl', 'https://bellahasias.ru');

        return response()->json([
            'siteUrl' => $siteUrl,
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'siteUrl' => ['required', 'string', 'url', 'max:255'],
        ]);

        SeoMeta::setValue('siteUrl', $request->siteUrl);

        return response()->json([
            'siteUrl' => $request->siteUrl,
            'message' => 'SEO config updated successfully',
        ]);
    }
}
