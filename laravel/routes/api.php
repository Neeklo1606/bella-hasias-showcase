<?php

use App\Http\Controllers\Admin\AuditController;
use App\Http\Controllers\Admin\CasesController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\PagesController;
use App\Http\Controllers\Admin\SeoController;
use App\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\Public\CasesController as PublicCasesController;
use App\Http\Controllers\Public\MediaController as PublicMediaController;
use App\Http\Controllers\Public\PagesController as PublicPagesController;
use App\Http\Controllers\Public\ServicesController as PublicServicesController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/ping', function () {
    return response()->json(['ok' => true, 'message' => 'API is working']);
});

Route::get('/health', [HealthController::class, 'health']);

// Auth routes with rate limiting
// Note: These routes need session middleware for cookie-based auth
// Using 'web' middleware group to enable sessions, cookies, and CSRF protection
Route::prefix('auth')->middleware(['web'])->group(function () {
    // Login: 5 attempts per minute per IP+email
    Route::post('/login', [AuthController::class, 'login'])
        ->middleware('throttle:5,1');
    
    // Forgot password: 3 attempts per 10 minutes per IP
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])
        ->middleware('throttle:3,10');
    
    // Reset password: 3 attempts per 10 minutes per IP
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])
        ->middleware('throttle:3,10');
    
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

Route::prefix('media')->group(function () {
    Route::get('/{id}', [PublicMediaController::class, 'show']);
});

Route::get('/seo', [PublicPagesController::class, 'seo']);

// Admin API (protected)
Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('services', ServicesController::class);
    Route::apiResource('cases', CasesController::class);
    Route::apiResource('pages', PagesController::class);
    
        Route::prefix('media')->group(function () {
            Route::get('/', [MediaController::class, 'index']);
            // Upload: 30 attempts per minute per user
            Route::post('/upload', [MediaController::class, 'upload'])
                ->middleware('throttle:30,1');
            Route::put('/{media}', [MediaController::class, 'update']);
            Route::delete('/{media}', [MediaController::class, 'destroy']);
        });
    
        Route::prefix('seo')->group(function () {
            Route::get('/', [SeoController::class, 'index']);
            Route::put('/', [SeoController::class, 'update']);
        });
        
        Route::prefix('audit')->group(function () {
            Route::get('/', [AuditController::class, 'index']);
            Route::get('/{auditLog}', [AuditController::class, 'show']);
        });
    });
