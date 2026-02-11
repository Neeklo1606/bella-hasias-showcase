<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'title',
        'description',
        'category',
        'image_id',
        'cover_id',
        'tags',
        'cta_label',
        'cta_link',
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
     * Get the image media file
     */
    public function image(): BelongsTo
    {
        return $this->belongsTo(MediaFile::class, 'image_id');
    }

    /**
     * Get the cover media file
     */
    public function cover(): BelongsTo
    {
        return $this->belongsTo(MediaFile::class, 'cover_id');
    }

    /**
     * Get the cases for this service
     */
    public function cases(): HasMany
    {
        return $this->hasMany(CaseItem::class);
    }
}
