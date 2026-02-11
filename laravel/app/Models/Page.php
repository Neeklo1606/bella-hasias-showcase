<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'slug',
        'title',
        'blocks',
        'seo',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'blocks' => 'array',
            'seo' => 'array',
        ];
    }
}
