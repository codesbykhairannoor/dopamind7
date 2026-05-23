<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudyCompetency extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'competencies',
        'archetypes',
        'verdict',
        'settings',
    ];

    protected $casts = [
        'competencies' => 'array',
        'archetypes' => 'array',
        'settings' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
