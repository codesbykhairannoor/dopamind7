<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_name',
        'semester',
        'sks',
        'grade',
        'file_name',
        'file_path',
        'link_url',
    ];
}
