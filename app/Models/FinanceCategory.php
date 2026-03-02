<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinanceCategory extends Model
{

public function scopeOfUser($query, $userId) {
    return $query->where('user_id', $userId);
}
    use HasFactory;

    // 🔥 FIX: Guarded ID saja
    protected $guarded = ['id'];
}

