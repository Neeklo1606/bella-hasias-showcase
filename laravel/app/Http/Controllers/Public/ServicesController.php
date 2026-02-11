<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Service::query()
            ->where('status', 'published')
            ->with(['image', 'cover']);

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
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
        $sort = $request->get('sort', 'sort_order');
        if (str_starts_with($sort, '-')) {
            $query->orderBy(substr($sort, 1), 'desc');
        } else {
            $query->orderBy($sort, 'asc');
        }

        $perPage = $request->get('per_page', 50);
        $services = $query->paginate($perPage);

        return ServiceResource::collection($services)->response();
    }
}
