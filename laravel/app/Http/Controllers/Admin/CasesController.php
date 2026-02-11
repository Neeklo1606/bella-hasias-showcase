<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCaseRequest;
use App\Http\Requests\UpdateCaseRequest;
use App\Http\Resources\CaseResource;
use App\Models\CaseItem;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CasesController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = CaseItem::query()->with(['service', 'media']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by service
        if ($request->has('service_id')) {
            $query->where('service_id', $request->service_id);
        }

        // Search
        if ($request->has('q')) {
            $q = $request->q;
            $query->where(function ($qry) use ($q) {
                $qry->where('title', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%")
                    ->orWhere('slug', 'like', "%{$q}%");
            });
        }

        // Sort
        $sort = $request->get('sort', '-updated_at');
        if (str_starts_with($sort, '-')) {
            $query->orderBy(substr($sort, 1), 'desc');
        } else {
            $query->orderBy($sort, 'asc');
        }

        $perPage = $request->get('per_page', 15);
        $cases = $query->paginate($perPage);

        return CaseResource::collection($cases)->response();
    }

    public function store(StoreCaseRequest $request): JsonResponse
    {
        $data = $request->validated();
        // Transform camelCase to snake_case if needed
        if (isset($data['service_id'])) {
            $data['service_id'] = $data['service_id'];
        }
        $data['tags'] = $data['tags'] ?? [];
        $mediaIds = $data['media_ids'] ?? [];
        unset($data['media_ids']);
        
        $case = CaseItem::create($data);
        
        // Sync media with sort order
        if (!empty($mediaIds)) {
            $syncData = [];
            foreach ($mediaIds as $index => $mediaId) {
                $syncData[$mediaId] = ['sort_order' => $index];
            }
            $case->media()->sync($syncData);
        }
        
        // Log audit
        AuditService::logCreate($case, $request);

        return (new CaseResource($case->load(['service', 'media'])))
            ->response()
            ->setStatusCode(201);
    }

    public function show(CaseItem $case): JsonResponse
    {
        return (new CaseResource($case->load(['service', 'media'])))->response();
    }

    public function update(UpdateCaseRequest $request, CaseItem $case): JsonResponse
    {
        $data = $request->validated();
        if (isset($data['tags'])) {
            $data['tags'] = $data['tags'] ?? [];
        }
        
        $mediaIds = $data['media_ids'] ?? null;
        unset($data['media_ids']);
        
        // Get original values before update
        $original = $case->getOriginal();
        $case->update($data);
        
        // Sync media if provided
        if ($mediaIds !== null) {
            $syncData = [];
            foreach ($mediaIds as $index => $mediaId) {
                $syncData[$mediaId] = ['sort_order' => $index];
            }
            $case->media()->sync($syncData);
        }
        
        // Get changed fields after update
        $case->refresh();
        $newAttributes = $case->getAttributes();
        $oldValues = [];
        $newValues = [];
        
        foreach ($data as $key => $value) {
            if (isset($original[$key]) && $original[$key] !== $newAttributes[$key]) {
                $oldValues[$key] = $original[$key];
                $newValues[$key] = $newAttributes[$key];
            }
        }
        
        // Log audit if there are changes
        if (!empty($newValues)) {
            AuditService::logUpdate($case, $newValues, $request, $oldValues);
        }

        return (new CaseResource($case->load(['service', 'media'])))->response();
    }

    public function destroy(CaseItem $case, Request $request): JsonResponse
    {
        // Log audit before deletion
        AuditService::logDelete($case, $request);
        
        $case->delete();

        return response()->json(['message' => 'Case deleted successfully']);
    }
}
