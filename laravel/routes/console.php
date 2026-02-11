<?php

use App\Console\Commands\ImportJsonCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Explicitly register the import command
Artisan::registerCommand(new ImportJsonCommand());
