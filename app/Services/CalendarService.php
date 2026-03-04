<?php

namespace App\Services;

use App\Models\CalendarEvent;
use App\Models\Journal;
use App\Models\FinanceTransaction;
use App\Models\PlannerTask;
use App\Models\HabitLog;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CalendarService
{
    /**
     * Mengumpulkan semua rekap data kalender (Events, Journals, Finances, Planners, Habits)
     */
    public function getMonthlyDashboardData(int $userId, string $monthQuery, string $timezone): array
    {
        // 1. Tentukan rentang waktu dengan aman
        try {
            $activeDate = Carbon::parse($monthQuery . '-01')->timezone($timezone);
        } catch (\Exception $e) {
            $activeDate = now()->timezone($timezone);
        }

        $startDate = $activeDate->copy()->startOfMonth()->format('Y-m-d');
        $endDate = $activeDate->copy()->endOfMonth()->format('Y-m-d');

        // 2. Ambil Events (Aman)
        $events = CalendarEvent::ofUser($userId)
            ->overlappingMonth($startDate, $endDate)
            ->orderBy('start_date', 'asc')
            ->get();

        // 3. Ambil Jurnal (Ambil kolom yang penting aja biar gak berat)
        $journals = Journal::where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate])
            ->select('id', 'date', 'title', 'mood') // Jangan ambil 'content' yang panjang!
            ->get()
            ->mapWithKeys(fn ($item) => [Carbon::parse($item->date)->format('Y-m-d') => $item]);

        // 4. Ambil Keuangan (Di-grouping dari database langsung)
        $finances = FinanceTransaction::where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate])
            ->where('type', 'expense')
            ->selectRaw('date, SUM(amount) as total_expense')
            ->groupBy('date')
            ->pluck('total_expense', 'date'); 

        // 5. Ambil Planner (BARIS 55 ERROR ADA DI SINI) 
        // FIX: Kita hindari penggunaan get() yang narik semua row, langsung count di database!
        $planners = PlannerTask::where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate])
            ->select(
                'date',
                DB::raw('COUNT(id) as total_tasks'),
                // Kompatibilitas untuk MySQL dan PostgreSQL
                DB::raw("SUM(CASE WHEN is_completed = 1 OR is_completed = 'true' THEN 1 ELSE 0 END) as completed_tasks")
            )
            ->groupBy('date')
            ->get() // Get di sini aman karena datanya udah jadi rekap (sedikit)
            ->mapWithKeys(fn ($item) => [
                Carbon::parse($item->date)->format('Y-m-d') => [
                    'total_tasks' => (int) $item->total_tasks,
                    'completed_tasks' => (int) $item->completed_tasks,
                ]
            ]);

        // 6. Ambil Habit (Pakai JOIN agar 10x lebih cepat daripada Closure Subquery)
        $habits = HabitLog::join('habits', 'habit_logs.habit_id', '=', 'habits.id')
            ->where('habits.user_id', $userId)
            ->whereBetween('habit_logs.date', [$startDate, $endDate])
            ->where('habit_logs.status', 'completed')
            ->selectRaw('habit_logs.date, COUNT(habit_logs.id) as completed_habits')
            ->groupBy('habit_logs.date')
            ->pluck('completed_habits', 'habit_logs.date')
            ->toArray();

        return [
            'currentMonth' => $activeDate->format('Y-m'),
            'events'       => $events,
            'journals'     => $journals,
            'finances'     => $finances,
            'planners'     => $planners,
            'habits'       => $habits,
        ];
    }
}