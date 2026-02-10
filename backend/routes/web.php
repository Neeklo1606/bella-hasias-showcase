<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $path = public_path('build/index.html');
    if (file_exists($path)) {
        return redirect('/build/');
    }
    return view('welcome');
});

Route::get('/build/{any?}', function () {
    $path = public_path('build/index.html');
    if (file_exists($path)) {
        return response()->file($path);
    }
    abort(404);
})->where('any', '.*');
