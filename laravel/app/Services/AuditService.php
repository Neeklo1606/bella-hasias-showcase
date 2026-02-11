<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class AuditService
{
    /**
     * Log an action
     */
    public static function log(
        string $action,
        Model $entity,
        ?array $payload = null,
        ?Request $request = null
    ): void {
        // Filter sensitive data from payload
        $safePayload = self::filterSensitiveData($payload ?? []);

        AuditLog::create([
            'user_id' => $request?->user()?->id,
            'action' => $action,
            'entity_type' => get_class($entity),
            'entity_id' => $entity->id,
            'payload' => $safePayload,
            'ip' => $request?->ip(),
            'user_agent' => $request?->userAgent(),
        ]);
    }

    /**
     * Log creation
     */
    public static function logCreate(Model $entity, Request $request): void
    {
        $payload = $entity->getAttributes();
        self::log('created', $entity, $payload, $request);
    }

    /**
     * Log update with diff
     * Note: $changes should contain only changed fields with new values
     * $old should be passed separately if needed
     */
    public static function logUpdate(Model $entity, array $changes, Request $request, ?array $old = null): void
    {
        $payload = [
            'changes' => $changes,
        ];
        
        if ($old !== null) {
            $payload['old'] = $old;
        }
        
        self::log('updated', $entity, $payload, $request);
    }

    /**
     * Log deletion with snapshot
     */
    public static function logDelete(Model $entity, Request $request): void
    {
        $payload = $entity->getAttributes();
        self::log('deleted', $entity, ['snapshot' => $payload], $request);
    }

    /**
     * Log upload
     */
    public static function logUpload(Model $entity, Request $request): void
    {
        $payload = $entity->getAttributes();
        self::log('uploaded', $entity, $payload, $request);
    }

    /**
     * Filter sensitive data from payload
     */
    private static function filterSensitiveData(array $data): array
    {
        $sensitiveKeys = [
            'password',
            'password_confirmation',
            'token',
            'api_token',
            'remember_token',
            'secret',
            'key',
            'access_token',
            'refresh_token',
        ];

        $filtered = [];
        foreach ($data as $key => $value) {
            // Skip sensitive keys
            if (in_array(strtolower($key), $sensitiveKeys, true)) {
                continue;
            }

            // Recursively filter nested arrays
            if (is_array($value)) {
                $filtered[$key] = self::filterSensitiveData($value);
            } else {
                $filtered[$key] = $value;
            }
        }

        return $filtered;
    }
}
