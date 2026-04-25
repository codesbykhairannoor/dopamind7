<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\GoalMilestoneResource;
use App\Models\Goal;
use App\Models\GoalMilestone;
use App\Services\GoalService;
use Illuminate\Http\Request;

class GoalMilestoneApiController extends Controller
{
    public function __construct(private GoalService $goalService)
    {
    }

    public function store(Request $request, Goal $goal)
    {
        $this->authorize('update', $goal);

        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'position' => ['nullable', 'integer'],
            'is_completed' => ['nullable', 'boolean'],
            'completed' => ['nullable', 'boolean'],
            'target_date' => ['nullable', 'date'],
        ]);

        $milestone = $this->goalService->addMilestone($goal, $request->all());

        return new GoalMilestoneResource($milestone);
    }

    public function update(Request $request, Goal $goal, GoalMilestone $milestone)
    {
        $this->authorize('update', $goal);

        $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'position' => ['nullable', 'integer'],
            'is_completed' => ['nullable', 'boolean'],
            'completed' => ['nullable', 'boolean'],
            'target_date' => ['nullable', 'date'],
        ]);

        $milestone = $this->goalService->updateMilestone($milestone, $request->all());

        return new GoalMilestoneResource($milestone);
    }

    public function toggle(Goal $goal, GoalMilestone $milestone)
    {
        $this->authorize('update', $goal);
        $milestone = $this->goalService->toggleMilestone($milestone);

        return new GoalMilestoneResource($milestone);
    }

    public function destroy(Goal $goal, GoalMilestone $milestone)
    {
        $this->authorize('update', $goal);
        $this->goalService->deleteMilestone($milestone);

        return response()->json(['message' => 'Milestone deleted successfully']);
    }
}
