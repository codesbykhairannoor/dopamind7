<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicArchive extends Model
{
    use HasFactory;

    protected $fillable = [
        'academic_record_id',
        'file_name',
        'file_path',
        'link_url',
        'meeting_tag',
        'type'
    ];

    public function academicRecord()
    {
        return $this->belongsTo(AcademicRecord::class);
    }
}
