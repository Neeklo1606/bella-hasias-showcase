<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Http\Resources\PageResource;
use App\Models\Page;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Page::query();

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->has('q')) {
            $q = $request->q;
            $query->where(function ($qry) use ($q) {
                $qry->where('title', 'like', "%{$q}%")
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
        $pages = $query->paginate($perPage);

        return PageResource::collection($pages)->response();
    }

    public function store(StorePageRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['blocks'] = $data['blocks'] ?? [];
        $data['seo'] = $data['seo'] ?? null;
        
        $page = Page::create($data);
        
        // Log audit
        AuditService::logCreate($page, $request);

        return (new PageResource($page))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Page $page): JsonResponse
    {
        return (new PageResource($page))->response();
    }

    public function update(UpdatePageRequest $request, Page $page): JsonResponse
    {
        $data = $request->validated();
        if (isset($data['blocks'])) {
            $data['blocks'] = $data['blocks'] ?? [];
        }
        
        // Get original values before update
        $original = $page->getOriginal();
        $page->update($data);
        
        // Get changed fields after update
        $page->refresh();
        $newAttributes = $page->getAttributes();
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
            AuditService::logUpdate($page, $newValues, $request, $oldValues);
        }

        return (new PageResource($page))->response();
    }

    public function destroy(Page $page, Request $request): JsonResponse
    {
        // Log audit before deletion
        AuditService::logDelete($page, $request);
        
        $page->delete();

        return response()->json(['message' => 'Page deleted successfully']);
    }
}
