<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'admin' => \App\Http\Middleware\EnsureUserIsAdmin::class,
        ]);
        
        // Маршрута "login" нет: гостей API не редиректим (будет 401 JSON), остальных — на вход в админку
        $middleware->redirectGuestsTo(fn ($request) => $request->is('api/*') ? null : '/admin/login');

        // Configure CORS for API
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);
        
        // Exclude CSRF verification for /api/auth/login (Sanctum handles CSRF via cookie)
        $middleware->validateCsrfTokens(except: [
            'api/auth/login',
            'api/auth/logout',
            'api/auth/forgot-password',
            'api/auth/reset-password',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // API всегда отвечает JSON: без этого неавторизованный запрос к /api/admin/* давал 500
        // (редирект на несуществующий маршрут login) вместо 401.
        $exceptions->shouldRenderJsonWhen(fn ($request) => $request->is('api/*') || $request->expectsJson());
    })->create();
