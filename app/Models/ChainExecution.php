<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChainExecution extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "execution_uuid",
        "depth",
        "event_name",
        "source_type",
        "source_id",
        "status",
        "context",
    ];

    protected $casts = [
        "context" => "array",
    ];
}
