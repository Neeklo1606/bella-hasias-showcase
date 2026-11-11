<?php

use App\Http\Controllers\SeoController;
use Illuminate\Support\Facades\Route;

Route::get('/sitemap.xml', [SeoController::class, 'sitemap']);
Route::get('/robots.txt', [SeoController::class, 'robots']);
Route::get('/llms.txt', [SeoController::class, 'llms']);

// SPA fallback: все маршруты кроме /api/* отдают React-приложение
// с серверными мета-тегами (title, description, canonical, JSON-LD) и корректным HTTP-статусом.
Route::fallback([SeoController::class, 'app']);
