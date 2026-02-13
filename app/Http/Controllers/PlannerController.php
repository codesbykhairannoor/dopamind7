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
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PlannerController extends Controller
{
    /**
     * Menampilkan Halaman Planner (Single Board Concept)
     */
    public function index(Request $request)
    {
        $userId = Auth::id();

        // 1. Ambil Task (Sangat kencang karena tidak perlu filter tanggal)
        $tasks = PlannerTask::where('user_id', $userId)
            ->orderBy('start_time', 'asc')
            ->get();

        // 2. Ambil Data Harian (Satu user murni hanya punya 1 row DailyLog)
        $dailyLog = DailyLog::firstOrCreate(
            ['user_id' => $userId],
            [
                'meals' => ['breakfast' => '', 'lunch' => '', 'dinner' => ''], 
                'notes' => '',
            ]
        );

        $tasksResource = PlannerTaskResource::collection($tasks);
        $logResource = new DailyLogResource($dailyLog);

        if ($request->wantsJson()) {
            return response()->json([
                'tasks' => $tasksResource,
                'dailyLog' => $logResource
            ]);
        }

        return Inertia::render('Planner/Index', [
            'tasks' => $tasksResource->resolve(),
            'dailyLog' => $logResource->resolve(),
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
        if ($plannerTask->user_id !== Auth::id()) abort(403);

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
        if ($plannerTask->user_id !== Auth::id()) abort(403);

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
     * Simpan Task Massal (Super Fast Bulk Insert)
     */
    public function batchStore(StoreBatchTaskRequest $request)
    {
        $userId = Auth::id();
        $tasksData = [];
        $now = now();

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

        // Bungkus dengan Transaction agar DB mengeksekusi Bulk Insert dalam 1 nafas
        DB::transaction(function () use ($tasksData) {
            PlannerTask::insert($tasksData);
        });

        return back()->with('success', count($tasksData) . ' activities added successfully!');
    }

    /**
     * Update Notes / Meals
     */
    public function updateLog(UpdateLogRequest $request)
    {
        $log = DailyLog::firstOrCreate(
            ['user_id' => Auth::id()],
            ['meals' => ['breakfast' => '', 'lunch' => '', 'dinner' => ''], 'notes' => '']
        );

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
     * Hapus Task Tunggal
     */
    public function destroy(PlannerTask $plannerTask)
    {
        if ($plannerTask->user_id !== Auth::id()) abort(403);

        $plannerTask->delete();

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Task deleted']);
        }

        return back();
    }

    /**
     * Reset Board (Nuke the whiteboard!)
     */
    public function resetBoard()
    {
        $userId = Auth::id();

        // Eksekusi pembersihan serentak di level DB (Jauh lebih cepat dari looping)
        DB::transaction(function () use ($userId) {
            PlannerTask::where('user_id', $userId)->delete();

            DailyLog::where('user_id', $userId)->update([
                'notes' => '',
                'meals' => ['breakfast' => '', 'lunch' => '', 'dinner' => ''],
            ]);
        });

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Board reset successful']);
        }

        return back();
    }
}