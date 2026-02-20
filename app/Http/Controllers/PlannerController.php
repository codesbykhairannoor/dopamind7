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
     * Menampilkan Halaman Planner (Date Based Concept)
     */
    public function index(Request $request)
    {
        $userId = Auth::id();
        
        // 🔥 TANGKAP TANGGAL DARI URL (Default hari ini jika kosong)
        $date = $request->query('date', now()->format('Y-m-d'));

        // 1. Ambil Task TANGGAL TERSEBUT
        $tasks = PlannerTask::where('user_id', $userId)
            ->where('date', $date) // 🔥 Filter Date
            ->orderBy('start_time', 'asc')
            ->get();

        // 2. Ambil Data Harian TANGGAL TERSEBUT (Termasuk Water & TaskBox)
        $dailyLog = DailyLog::firstOrCreate(
            ['user_id' => $userId, 'date' => $date], // Cari / Buat berdasarkan Date
            [
                'meals'    => ['breakfast' => '', 'lunch' => '', 'dinner' => ''], 
                'notes'    => '',
                'water'    => 0, // Default Water
                'task_box' => [] // Default Task Box
            ]
        );

        $tasksResource = PlannerTaskResource::collection($tasks);
        $logResource = new DailyLogResource($dailyLog);

        if ($request->wantsJson()) {
            return response()->json([
                'tasks'       => $tasksResource,
                'dailyLog'    => $logResource,
                'currentDate' => $date
            ]);
        }

        return Inertia::render('Planner/Index', [
            'tasks'       => $tasksResource->resolve(),
            'dailyLog'    => $logResource->resolve(),
            'currentDate' => $date, // 🔥 Kirim tanggal ke Vue
        ]);
    }

    /**
     * Simpan Task Baru
     */
    public function store(StoreTaskRequest $request)
    {
        $task = PlannerTask::create(array_merge(
            ['user_id' => Auth::id()],
            $request->validated() // Pastikan form/request ngirim 'date'
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
        
        // Tangkap tanggal untuk disematkan ke semua batch insert
        $date = $request->input('date', now()->format('Y-m-d'));

        foreach ($request->validated()['tasks'] as $task) {
            $tasksData[] = [
                'user_id'      => $userId,
                'date'         => $date,
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

        DB::transaction(function () use ($tasksData) {
            PlannerTask::insert($tasksData);
        });

        return back()->with('success', count($tasksData) . ' activities added successfully!');
    }

    /**
     * Update Notes / Meals / Water / TaskBox
     */
    public function updateLog(UpdateLogRequest $request)
    {
        // 🔥 Harus ambil tanggal dari request, agar tidak numpuk di log hari ini
        $date = $request->input('date', now()->format('Y-m-d'));

        $log = DailyLog::firstOrCreate(
            ['user_id' => Auth::id(), 'date' => $date], // Cari log di tanggal tersebut
            [
                'meals'    => ['breakfast' => '', 'lunch' => '', 'dinner' => ''], 
                'notes'    => '',
                'water'    => 0,
                'task_box' => []
            ]
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
    public function resetBoard(Request $request)
    {
        $userId = Auth::id();
        
        // Tangkap tanggal board mana yang mau dihapus
        $date = $request->input('date', now()->format('Y-m-d'));

        // Eksekusi pembersihan serentak (Hanya HAPUS DATA DI TANGGAL TERSEBUT)
        DB::transaction(function () use ($userId, $date) {
            PlannerTask::where('user_id', $userId)
                ->where('date', $date)
                ->delete();

            DailyLog::where('user_id', $userId)
                ->where('date', $date)
                ->update([
                    'notes'    => '',
                    'meals'    => ['breakfast' => '', 'lunch' => '', 'dinner' => ''],
                    'water'    => 0,   // 🔥 Kosongin juga water-nya
                    'task_box' => []   // 🔥 Kosongin juga task box-nya
                ]);
        });

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Board reset successful']);
        }

        return back();
    }
}