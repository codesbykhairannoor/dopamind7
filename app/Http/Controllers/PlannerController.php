<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateLogRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\DailyLogResource;
use App\Http\Resources\PlannerTaskResource;
use App\Http\Requests\StoreBatchTaskRequest;
use App\Models\DailyLog;
use App\Models\PlannerTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PlannerController extends Controller
{
    /**
     * Menampilkan Halaman Planner
     */
    /**
     * Menampilkan Halaman Planner
     */
    public function index(Request $request)
    {
        // 1. Ambil Task
        $tasks = PlannerTask::where('user_id', Auth::id())
            ->orderBy('start_time', 'asc')
            ->get();

        // 2. Ambil Data Harian (Notes & Meals)
        $dailyLog = DailyLog::firstOrCreate(
            ['user_id' => Auth::id()],
            [
                'meals' => ['breakfast' => '', 'lunch' => '', 'dinner' => ''], // Pastikan ini array di model cast
                'notes' => '',
            ]
        );

        // Siapkan Resource
        $tasksResource = PlannerTaskResource::collection($tasks);
        $logResource = new DailyLogResource($dailyLog);

        // 📱 JIKA MOBILE / API (Tetap pakai format { data: ... })
        if ($request->wantsJson()) {
            return response()->json([
                'tasks' => $tasksResource,
                'dailyLog' => $logResource
            ]);
        }

        // 💻 JIKA WEB / INERTIA (Buka bungkusnya pakai ->resolve())
        // ✅ INI PERBAIKANNYA:
        return Inertia::render('Planner/Index', [
            'tasks' => $tasksResource->resolve(),     // Mengubah {data:[...]} kembali jadi [...]
            'dailyLog' => $logResource->resolve(),    // Mengubah {data:{...}} kembali jadi {...}
        ]);
    }

    /**
     * Simpan Task Baru
     */
    public function store(StoreTaskRequest $request)
    {
        $task = PlannerTask::create(array_merge(
            ['user_id' => Auth::id()],
            $request->validated()
        ));

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Task created',
                'data' => new PlannerTaskResource($task)
            ], 201);
        }

        return back();
    }

    /**
     * Update Task
     */
    public function update(UpdateTaskRequest $request, PlannerTask $plannerTask)
    {
        // Pastikan task milik user (Security Check)
        if ($plannerTask->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $plannerTask->update($request->validated());

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Task updated',
                'data' => new PlannerTaskResource($plannerTask)
            ]);
        }

        return back();
    }

    /**
     * Toggle Checklist (Selesai/Belum)
     */
    public function toggle(PlannerTask $plannerTask)
    {
        if ($plannerTask->user_id !== Auth::id()) {
            abort(403);
        }

        $plannerTask->update([
            'is_completed' => ! $plannerTask->is_completed,
        ]);

        if (request()->wantsJson()) {
            return response()->json([
                'message' => 'Status toggled',
                'data' => new PlannerTaskResource($plannerTask)
            ]);
        }

        return back();
    }

    /**
     * Save Notes / Meals
     */

    public function batchStore(StoreBatchTaskRequest $request)
    {
        $userId = auth()->id();
        $tasksData = [];
        $now = now();

        // Mapping data biar siap insert sekali jalan (Bulk Insert Query)
        foreach ($request->validated()['tasks'] as $task) {
            $tasksData[] = [
                'user_id'      => $userId,
                'title'        => $task['title'],
                'start_time'   => $task['start_time'],
                'end_time'     => $task['end_time'],
                'type'         => $task['type'],
                'notes'        => $task['notes'] ?? null,
                'is_completed' => false,
                'created_at'   => $now,
                'updated_at'   => $now,
            ];
        }

        // Insert sekaligus (Lebih cepat daripada loop create satu-satu)
        PlannerTask::insert($tasksData);

        return back()->with('success', count($tasksData) . ' activities added successfully!');
    }

    public function updateLog(UpdateLogRequest $request)
    {
        // Gunakan updateOrCreate untuk keamanan ekstra (jika user baru via API)
        $log = DailyLog::firstOrCreate(
            ['user_id' => Auth::id()],
            ['meals' => [], 'notes' => '']
        );

        // Update hanya field yang dikirim
        $log->update($request->validated());

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Log updated',
                'data' => new DailyLogResource($log)
            ]);
        }

        return back();
    }

    /**
     * Hapus Task
     */
    public function destroy(PlannerTask $plannerTask)
    {
        if ($plannerTask->user_id !== Auth::id()) {
            abort(403);
        }

        $plannerTask->delete();

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Task deleted']);
        }

        return back();
    }

    /**
     * Reset Board (Hapus Task + Bersihkan Notes/Meals)
     */
    public function resetBoard()
    {
        PlannerTask::where('user_id', Auth::id())->delete();

        DailyLog::where('user_id', Auth::id())->update([
            'notes' => '',
            'meals' => ['breakfast' => '', 'lunch' => '', 'dinner' => ''],
        ]);

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Board reset successful']);
        }

        return back();
    }
}