<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Service::query()->with(['image', 'cover']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->has('q')) {
            $q = $request->q;
            $query->where(function ($qry) use ($q) {
                $qry->where('title', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%");
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
        $services = $query->paginate($perPage);

        return ServiceResource::collection($services)->response();
    }

    public function store(StoreServiceRequest $request): JsonResponse
    {
        $data = $request->validated();
        // Transform camelCase to snake_case if needed
        if (isset($data['imageId'])) {
            $data['image_id'] = $data['imageId'];
            unset($data['imageId']);
        }
        if (isset($data['coverId'])) {
            $data['cover_id'] = $data['coverId'];
            unset($data['coverId']);
        }
        $data['tags'] = $data['tags'] ?? [];
        
        $service = Service::create($data);

        return (new ServiceResource($service->load(['image', 'cover'])))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Service $service): JsonResponse
    {
        return (new ServiceResource($service->load(['image', 'cover'])))->response();
    }

    public function update(UpdateServiceRequest $request, Service $service): JsonResponse
    {
        $data = $request->validated();
        // Transform camelCase to snake_case if needed
        if (isset($data['imageId'])) {
            $data['image_id'] = $data['imageId'];
            unset($data['imageId']);
        }
        if (isset($data['coverId'])) {
            $data['cover_id'] = $data['coverId'];
            unset($data['coverId']);
        }
        if (isset($data['tags'])) {
            $data['tags'] = $data['tags'] ?? [];
        }
        
        $service->update($data);

        return (new ServiceResource($service->load(['image', 'cover'])))->response();
    }

    public function destroy(Service $service): JsonResponse
    {
        $service->delete();

        return response()->json(['message' => 'Service deleted successfully']);
    }
}
