<?php

namespace App\Http\Controllers\Api;

use App\Models\PlannerTask;
use Illuminate\Http\Request;

class PlannerApiController extends ApiController
{
    /**
     * Get tasks for a specific date
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $date = $request->query('date', now()->toDateString());

        $tasks = PlannerTask::where('user_id', $user->id)
            ->where('date', $date)
            ->orderBy('start_time')
            ->get();

        return $this->success([
            'date' => $date,
            'tasks' => $tasks
        ]);
    }

    /**
     * Store a new task
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'start_time' => 'nullable|string',
            'end_time' => 'nullable|string',
            'priority' => 'nullable|in:low,medium,high',
        ]);

        $task = PlannerTask::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'priority' => $request->priority ?? 'medium',
        ]);

        return $this->success($task, 'Task created successfully', 201);
    }

    /**
     * Toggle task completion
     */
    public function toggle(Request $request, PlannerTask $plannerTask)
    {
        if ($plannerTask->user_id !== $request->user()->id) {
            return $this->error('Unauthorized', 403);
        }

        $plannerTask->update([
            'completed_at' => $plannerTask->completed_at ? null : now()
        ]);

        return $this->success($plannerTask, 'Task status updated');
    }
}
