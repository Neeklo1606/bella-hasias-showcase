<?php

use Illuminate\Support\Facades\Route;

// SPA fallback: все маршруты кроме /api/* отдают React приложение
Route::fallback(function () {
    return view('app');
});
