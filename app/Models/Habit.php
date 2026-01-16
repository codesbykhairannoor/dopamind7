<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany; // 👈 1. Import Ini
use Illuminate\Database\Eloquent\Relations\HasOne;  // 👈 2. Import Ini juga

/**
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $period
 * @property string $icon
 * @property string $color
 * @property int $monthly_target
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\HabitLog[] $logs
 */
class Habit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'period', 'name', 'icon', 'color', 'monthly_target', 'is_archived',
    ];

    // 🔥 3. Tambahkan ': HasMany' (Ini Kuncinya!)
    public function logs(): HasMany
    {
        return $this->hasMany(HabitLog::class);
    }

    // 🔥 4. Tambahkan ': HasOne' sekalian biar rapi
    public function todayLog(): HasOne
    {
        return $this->hasOne(HabitLog::class)->where('date', date('Y-m-d'));
    }
}
