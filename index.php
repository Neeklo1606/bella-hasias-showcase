<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/laravel/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/laravel/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/laravel/bootstrap/app.php';

// Set public path to root directory (webroot = repository root)
// This makes public_path() return the repository root instead of laravel/public
$app->bind('path.public', fn() => __DIR__);

$app->handleRequest(Request::capture());
