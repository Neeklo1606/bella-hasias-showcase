<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    /**
     * Health check endpoint
     * Checks database connection and cache
     */
    public function health(): JsonResponse
    {
        $status = 'ok';
        $checks = [];

        // Check database connection
        try {
            DB::connection()->getPdo();
            $checks['database'] = 'ok';
        } catch (\Exception $e) {
            $status = 'error';
            $checks['database'] = 'error: ' . $e->getMessage();
        }

        // Check cache
        try {
            $testKey = 'health_check_' . time();
            Cache::put($testKey, 'test', 10);
            $value = Cache::get($testKey);
            Cache::forget($testKey);
            
            if ($value === 'test') {
                $checks['cache'] = 'ok';
            } else {
                $status = 'error';
                $checks['cache'] = 'error: cache not working';
            }
        } catch (\Exception $e) {
            $status = 'error';
            $checks['cache'] = 'error: ' . $e->getMessage();
        }

        $response = [
            'status' => $status,
            'timestamp' => now()->toISOString(),
            'checks' => $checks,
        ];

        return response()->json($response, $status === 'ok' ? 200 : 503);
    }
}
