<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoalMilestone extends Model
{
    use HasFactory;

    protected $fillable = ['goal_id', 'title', 'completed', 'order', 'target_date'];

    protected $casts = [
        'completed' => 'boolean',
        'order' => 'integer',
        'target_date' => 'date',
    ];

    public function goal()
    {
        return $this->belongsTo(Goal::class);
    }
}
?>
