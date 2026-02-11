<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CaseItem extends Model
{
    use HasFactory;

    protected $table = 'cases';

    protected $fillable = [
        'external_id',
        'title',
        'slug',
        'description',
        'service_id',
        'tags',
        'sort_order',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
        ];
    }

    /**
     * Get the service that owns the case
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Get the media files for the case
     */
    public function media(): BelongsToMany
    {
        return $this->belongsToMany(MediaFile::class, 'case_media')
            ->withPivot('sort_order')
            ->withTimestamps()
            ->orderByPivot('sort_order');
    }
}
