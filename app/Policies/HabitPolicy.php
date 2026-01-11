<?php

namespace App\Policies;

use App\Models\Habit;
use App\Models\User;

class HabitPolicy
{
    /**
     * Siapa yang boleh lihat detail habit ini?
     */
    public function view(User $user, Habit $habit): bool
    {
        return $user->id === $habit->user_id;
    }

    /**
     * Siapa yang boleh update/edit?
     */
    public function update(User $user, Habit $habit): bool
    {
        return $user->id === $habit->user_id;
    }

    /**
     * Siapa yang boleh hapus?
     */
    public function delete(User $user, Habit $habit): bool
    {
        return $user->id === $habit->user_id;
    }
    
    /**
     * Siapa yang boleh centang log harian?
     */
    public function log(User $user, Habit $habit): bool
    {
        return $user->id === $habit->user_id;
    }
}