<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlannerDateRequest;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateLogRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\StoreBatchTaskRequest;
use App\Http\Resources\DailyLogResource;
use App\Http\Resources\PlannerTaskResource;
use App\Models\DailyLog;
use App\Models\PlannerTask;
use App\Services\PlannerService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PlannerController extends Controller
{
    public function __construct(private PlannerService $plannerService) 
    {
        // Inject Service otomatis
    }

    public function index(PlannerDateRequest $request)
    {
        $user = Auth::user();
        
        // 1. Ambil format tanggal yang sudah dibersihkan
        $date = $request->getValidDate($user->timezone);

        // 2. Tarik task memakai Scopes
        $tasks = PlannerTask::ofUser($user->id)->forDate($date)->ordered()->get();

        // 3. Ambil Log, buat virtual memory record (on-the-fly) jika hari ini kosong
        $dailyLog = DailyLog::where('user_id', $user->id)->where('date', $date)->first() 
            ?? new DailyLog([
                'user_id'  => $user->id, 
                'date'     => $date,
                'meals'    => ['breakfast' => '', 'lunch' => '', 'dinner' => ''], 
                'notes'    => '',
                'water'    => 0,
                'task_box' => []
            ]);

        $tasksResource = PlannerTaskResource::collection($tasks);
        $logResource = new DailyLogResource($dailyLog);

        if ($request->wantsJson()) {
            return response()->json(['tasks' => $tasksResource, 'dailyLog' => $logResource, 'currentDate' => $date]);
        }

        return Inertia::render('Planner/Index', [
            'tasks'       => $tasksResource->resolve(),
            'dailyLog'    => $logResource->resolve(),
            'currentDate' => $date,
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = Auth::user()->plannerTasks()->create($request->validated());

        if ($request->wantsJson()) return response()->json(['message' => 'Task created', 'data' => new PlannerTaskResource($task)], 201);
        return back();
    }

    public function update(UpdateTaskRequest $request, PlannerTask $plannerTask)
    {
        $plannerTask->update($request->validated());

        if ($request->wantsJson()) return response()->json(['message' => 'Task updated', 'data' => new PlannerTaskResource($plannerTask)]);
        return back();
    }

    public function toggle(PlannerTask $plannerTask)
    {
        if ($plannerTask->user_id !== Auth::id()) abort(403);
        $plannerTask->update(['is_completed' => !$plannerTask->is_completed]);

        if (request()->wantsJson()) return response()->json(['message' => 'Status toggled', 'data' => new PlannerTaskResource($plannerTask)]);
        return back();
    }

    public function batchStore(StoreBatchTaskRequest $request)
    {
        $user = Auth::user();
        
        if ($user->isExplorer()) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Batch mode is a Pro feature. Upgrade to Architect!'], 403);
            }
            return redirect()->route('billing')->with('error', 'Batch Mode is a Pro feature.');
        }

        $timezone = $user->timezone ?? 'Asia/Jakarta';
        $date = $request->input('date', now()->timezone($timezone)->format('Y-m-d'));

        $this->plannerService->batchStoreTasks($user->id, $date, $request->tasks, $timezone);

        return back()->with('success', count($request->tasks) . ' activities added successfully!');
    }

    public function updateLog(UpdateLogRequest $request)
    {
        $timezone = Auth::user()->timezone ?? 'Asia/Jakarta';
        $date = $request->input('date', now()->timezone($timezone)->format('Y-m-d'));

        $log = $this->plannerService->updateDailyLog(Auth::id(), $date, $request->validated());

        if ($request->wantsJson()) return response()->json(['message' => 'Log updated', 'data' => new DailyLogResource($log)]);
        return back();
    }

    public function destroy(PlannerTask $plannerTask)
    {
        if ($plannerTask->user_id !== Auth::id()) abort(403);
        $plannerTask->delete();

        if (request()->wantsJson()) return response()->json(['message' => 'Task deleted']);
        return back();
    }

    public function resetBoard(PlannerDateRequest $request)
    {
        $date = $request->getValidDate(Auth::user()->timezone);
        $this->plannerService->resetBoard(Auth::id(), $date);

        if (request()->wantsJson()) return response()->json(['message' => 'Board reset successful']);
        return back();
    }
}