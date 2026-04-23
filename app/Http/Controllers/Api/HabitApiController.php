<?php

namespace App\Http\Controllers\Api;

use App\Models\Habit;
use App\Models\HabitLog;
use Illuminate\Http\Request;

class HabitApiController extends ApiController
{
    /**
     * Get today's habits with log status
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $date = $request->query('date', now()->toDateString());

        $habits = Habit::where('user_id', $user->id)
            ->with(['logs' => function ($query) use ($date) {
                $query->where('date', $date);
            }])
            ->get()
            ->map(function ($habit) {
                return [
                    'id' => $habit->id,
                    'name' => $habit->name,
                    'icon' => $habit->icon,
                    'is_completed' => $habit->logs->isNotEmpty(),
                    'streak' => $habit->streak ?? 0,
                ];
            });

        return $this->success([
            'date' => $date,
            'habits' => $habits
        ]);
    }

    /**
     * Log a habit
     */
    public function log(Request $request, Habit $habit)
    {
        if ($habit->user_id !== $request->user()->id) {
            return $this->error('Unauthorized', 403);
        }

        $date = $request->input('date', now()->toDateString());

        $log = HabitLog::updateOrCreate(
            ['habit_id' => $habit->id, 'date' => $date],
            ['completed' => true]
        );

        return $this->success($log, 'Habit logged successfully');
    }
}
