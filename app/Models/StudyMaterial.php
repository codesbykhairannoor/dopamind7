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
        'context_data',
        'artifact_data',
    ];

    protected $casts = [
        'metadata' => 'array',
        'context_data' => 'array',
        'artifact_data' => 'array',
        'grade' => 'float',
    ];

    protected $appends = ['file_name', 'file_path'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getFilePathAttribute()
    {
        $contextData = is_string($this->context_data) ? json_decode($this->context_data, true) : ($this->context_data ?? []);
        $artifactData = is_string($this->artifact_data) ? json_decode($this->artifact_data, true) : ($this->artifact_data ?? []);

        // Priority to context
        if (isset($contextData['files'])) {
            foreach ($contextData['files'] as $f) {
                $ext = strtolower($f['ext'] ?? pathinfo($f['name'], PATHINFO_EXTENSION));
                if (in_array($ext, ['pdf', 'jpg', 'jpeg', 'png'])) {
                    return $f['path'];
                }
            }
        }
        
        // Fallback to artifact
        if (isset($artifactData['files'])) {
            foreach ($artifactData['files'] as $f) {
                $ext = strtolower($f['ext'] ?? pathinfo($f['name'], PATHINFO_EXTENSION));
                if ($ext === 'pdf') {
                    return $f['path'];
                }
            }
            if (count($artifactData['files']) > 0) {
                return $artifactData['files'][0]['path']; // Any file if no PDF found
            }
        }
        
        return null;
    }

    public function getFileNameAttribute()
    {
        $contextData = is_string($this->context_data) ? json_decode($this->context_data, true) : ($this->context_data ?? []);
        $artifactData = is_string($this->artifact_data) ? json_decode($this->artifact_data, true) : ($this->artifact_data ?? []);

        // Priority to context
        if (isset($contextData['files'])) {
            foreach ($contextData['files'] as $f) {
                $ext = strtolower($f['ext'] ?? pathinfo($f['name'], PATHINFO_EXTENSION));
                if (in_array($ext, ['pdf', 'jpg', 'jpeg', 'png'])) {
                    return $f['name'];
                }
            }
        }
        
        // Fallback to artifact
        if (isset($artifactData['files'])) {
            foreach ($artifactData['files'] as $f) {
                $ext = strtolower($f['ext'] ?? pathinfo($f['name'], PATHINFO_EXTENSION));
                if ($ext === 'pdf') {
                    return $f['name'];
                }
            }
            if (count($artifactData['files']) > 0) {
                return $artifactData['files'][0]['name'];
            }
        }
        
        return null;
    }
}
