<?php

use App\Http\Controllers\Admin\CasesController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\PagesController;
use App\Http\Controllers\Admin\SeoController;
use App\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Public\CasesController as PublicCasesController;
use App\Http\Controllers\Public\PagesController as PublicPagesController;
use App\Http\Controllers\Public\ServicesController as PublicServicesController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/ping', function () {
    return response()->json(['ok' => true, 'message' => 'API is working']);
});

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// Public API (read-only)
Route::prefix('services')->group(function () {
    Route::get('/', [PublicServicesController::class, 'index']);
});

Route::prefix('cases')->group(function () {
    Route::get('/', [PublicCasesController::class, 'index']);
    Route::get('/{slug}', [PublicCasesController::class, 'show']);
});

Route::prefix('pages')->group(function () {
    Route::get('/{slug}', [PublicPagesController::class, 'show']);
});

Route::get('/seo', [PublicPagesController::class, 'seo']);

// Admin API (protected)
Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('services', ServicesController::class);
    Route::apiResource('cases', CasesController::class);
    Route::apiResource('pages', PagesController::class);
    
    Route::prefix('media')->group(function () {
        Route::get('/', [MediaController::class, 'index']);
        Route::post('/upload', [MediaController::class, 'upload']);
        Route::put('/{media}', [MediaController::class, 'update']);
        Route::delete('/{media}', [MediaController::class, 'destroy']);
    });
    
    Route::prefix('seo')->group(function () {
        Route::get('/', [SeoController::class, 'index']);
        Route::put('/', [SeoController::class, 'update']);
    });
});
