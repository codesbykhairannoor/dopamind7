<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mood extends Model
{
    use HasFactory;

    // 🔥 WAJIB ADA BIAR BISA DISIMPAN 🔥
    protected $fillable = [
        'user_id',
        'period',
        'mood_code'
    ];
}