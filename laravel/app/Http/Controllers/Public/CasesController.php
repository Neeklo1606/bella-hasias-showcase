<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\CaseResource;
use App\Models\CaseItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CasesController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = CaseItem::query()
            ->where('status', 'published')
            ->with(['service', 'media']);

        // Filter by service
        if ($request->has('service_id')) {
            $query->where('service_id', $request->service_id);
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
        $sort = $request->get('sort', '-created_at');
        if (str_starts_with($sort, '-')) {
            $query->orderBy(substr($sort, 1), 'desc');
        } else {
            $query->orderBy($sort, 'asc');
        }

        $perPage = $request->get('per_page', 50);
        $cases = $query->paginate($perPage);

        return CaseResource::collection($cases)->response();
    }

    public function show(string $slug): JsonResponse
    {
        $case = CaseItem::where('slug', $slug)
            ->where('status', 'published')
            ->with(['service', 'media'])
            ->firstOrFail();

        return (new CaseResource($case))->response();
    }
}
