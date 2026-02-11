<?php

/**
 * Direct import script - альтернатива команде artisan
 * Использование: php8.2 import-json-direct.php
 */

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$command = new \App\Console\Commands\ImportJsonCommand();
$command->handle();
