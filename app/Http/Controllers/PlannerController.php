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
use Illuminate\Support\Facades\Cache;
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
        $date = $request->getValidDate($user->timezone);

        $activeDate = \Carbon\Carbon::parse($date);
        $startOfYear = $activeDate->copy()->startOfYear()->format('Y-m-d');
        $endOfYear = $activeDate->copy()->endOfYear()->format('Y-m-d');

        $cacheKeyTasks = "planner_tasks_{$user->id}_{$startOfYear}_{$endOfYear}";
        $cacheKeyLogs = "planner_logs_{$user->id}_{$startOfYear}_{$endOfYear}";

        // Fetch all tasks for the year to allow instant frontend navigation (Cached)
        $tasks = Cache::remember($cacheKeyTasks, now()->addDays(7), function () use ($user, $startOfYear, $endOfYear) {
            return PlannerTask::ofUser($user->id)
                ->whereBetween('date', [$startOfYear, $endOfYear])
                ->ordered()
                ->get();
        });

        // Fetch all daily logs for the year (Cached)
        $dailyLogs = Cache::remember($cacheKeyLogs, now()->addDays(7), function () use ($user, $startOfYear, $endOfYear) {
            return DailyLog::where('user_id', $user->id)
                ->whereBetween('date', [$startOfYear, $endOfYear])
                ->get();
        });

        $tasksResource = PlannerTaskResource::collection($tasks)->resolve();
        $logsResource = DailyLogResource::collection($dailyLogs)->resolve();

        if ($request->wantsJson()) {
            return response()->json([
                'tasks' => $tasksResource,
                'dailyLogs' => $logsResource,
                'currentDate' => $date
            ]);
        }

        return Inertia::render('Planner/Index', [
            'tasks'       => $tasksResource,
            'dailyLogs'    => $logsResource,
            'currentDate' => $date,
        ]);
    }

    public function dashboard(PlannerDateRequest $request)
    {
        $user = Auth::user();
        $date = $request->getValidDate($user->timezone);

        $activeDate = \Carbon\Carbon::parse($date);
        $startOfYear = $activeDate->copy()->startOfYear()->format('Y-m-d');
        $endOfYear = $activeDate->copy()->endOfYear()->format('Y-m-d');

        $cacheKeyTasks = "planner_tasks_{$user->id}_{$startOfYear}_{$endOfYear}";
        $cacheKeyLogs = "planner_logs_{$user->id}_{$startOfYear}_{$endOfYear}";

        // Fetch all tasks for the year to allow instant frontend navigation (Cached)
        $tasks = Cache::remember($cacheKeyTasks, now()->addDays(7), function () use ($user, $startOfYear, $endOfYear) {
            return PlannerTask::ofUser($user->id)
                ->whereBetween('date', [$startOfYear, $endOfYear])
                ->get();
        });

        // Fetch all daily logs for the year (Cached)
        $dailyLogs = Cache::remember($cacheKeyLogs, now()->addDays(7), function () use ($user, $startOfYear, $endOfYear) {
            return DailyLog::where('user_id', $user->id)
                ->whereBetween('date', [$startOfYear, $endOfYear])
                ->get();
        });

        $tasksResource = PlannerTaskResource::collection($tasks)->resolve();
        $logsResource = DailyLogResource::collection($dailyLogs)->resolve();

        if ($request->wantsJson()) {
            return response()->json([
                'tasks' => $tasksResource,
                'dailyLogs' => $logsResource,
                'currentDate' => $date
            ]);
        }

        return Inertia::render('Planner/Dashboard', [
            'tasks'       => $tasksResource,
            'dailyLogs'    => $logsResource,
            'currentDate' => $date,
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = Auth::user()->plannerTasks()->create($request->validated());
        $this->clearPlannerCache(Auth::id(), $task->date);

        if ($request->wantsJson()) return response()->json(['message' => 'Task created', 'data' => new PlannerTaskResource($task)], 201);
        return back();
    }

    public function update(UpdateTaskRequest $request, PlannerTask $plannerTask)
    {
        $plannerTask->update($request->validated());
        $this->clearPlannerCache($plannerTask->user_id, $plannerTask->date);

        if ($request->wantsJson()) return response()->json(['message' => 'Task updated', 'data' => new PlannerTaskResource($plannerTask)]);
        return back();
    }

    public function toggle(PlannerTask $plannerTask)
    {
        if ($plannerTask->user_id !== Auth::id()) abort(403);
        $plannerTask->update(['is_completed' => !$plannerTask->is_completed]);
        $this->clearPlannerCache($plannerTask->user_id, $plannerTask->date);

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
        $this->clearPlannerCache($user->id, $date);

        return back()->with('success', count($request->tasks) . ' activities added successfully!');
    }

    public function updateLog(UpdateLogRequest $request)
    {
        $timezone = Auth::user()->timezone ?? 'Asia/Jakarta';
        $date = $request->input('date', now()->timezone($timezone)->format('Y-m-d'));

        $log = $this->plannerService->updateDailyLog(Auth::id(), $date, $request->validated());
        $this->clearPlannerCache(Auth::id(), $date);

        if ($request->wantsJson()) return response()->json(['message' => 'Log updated', 'data' => new DailyLogResource($log)]);
        return back();
    }

    public function destroy(PlannerTask $plannerTask)
    {
        if ($plannerTask->user_id !== Auth::id()) abort(403);
        $plannerTask->delete();
        $this->clearPlannerCache($plannerTask->user_id, $plannerTask->date);

        if (request()->wantsJson()) return response()->json(['message' => 'Task deleted']);
        return back();
    }

    public function resetBoard(PlannerDateRequest $request)
    {
        $date = $request->getValidDate(Auth::user()->timezone);
        $this->plannerService->resetBoard(Auth::id(), $date);
        $this->clearPlannerCache(Auth::id(), $date);

        if (request()->wantsJson()) return response()->json(['message' => 'Board reset successful']);
        return back();
    }

    private function clearPlannerCache($userId, $date)
    {
        $activeDate = \Carbon\Carbon::parse($date);
        $startOfYear = $activeDate->copy()->startOfYear()->format('Y-m-d');
        $endOfYear = $activeDate->copy()->endOfYear()->format('Y-m-d');

        Cache::forget("planner_tasks_{$userId}_{$startOfYear}_{$endOfYear}");
        Cache::forget("planner_logs_{$userId}_{$startOfYear}_{$endOfYear}");
    }
}
