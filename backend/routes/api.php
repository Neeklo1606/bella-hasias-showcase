<?php

use App\Http\Controllers\DeployController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/deploy', DeployController::class)->middleware('throttle:5,1');
