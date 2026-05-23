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
        'semester',
        'sks',
        'file_name',
        'file_path',
        'grade',
        'extracted_text',
        'metadata',
        'status',
        'embed_url',
        'rich_text',
        'context_data',
        'artifact_data',
    ];

    protected $casts = [
        'metadata' => 'array',
        'context_data' => 'array',
        'artifact_data' => 'array',
        'grade' => 'float',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
