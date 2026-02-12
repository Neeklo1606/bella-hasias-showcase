<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class MediaFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'filename',
        'original_filename',
        'path',
        'mime_type',
        'size',
        'category',
        'alt',
        'user_id',
    ];

    /**
     * Get the user that uploaded the media file
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the URL for the media file
     */
    public function getUrlAttribute(): string
    {
        // If path is already a full URL, return as is
        if (str_starts_with($this->path, 'http://') || str_starts_with($this->path, 'https://')) {
            return $this->path;
        }
        
        // If path already starts with /storage/, return as is (avoid double /storage/)
        if (str_starts_with($this->path, '/storage/')) {
            return $this->path;
        }
        
        // Use Storage::url() which returns /storage/path
        $url = Storage::url($this->path);
        
        // Ensure no double slashes
        return str_replace('//', '/', $url);
    }
}
