<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudyMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'course_name',
        'week',
        'file_name',
        'file_path',
        'grade',
        'extracted_text',
        'metadata',
        'status',
        'embed_url',
        'rich_text',
    ];

    protected $casts = [
        'metadata' => 'array',
        'grade' => 'float',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
