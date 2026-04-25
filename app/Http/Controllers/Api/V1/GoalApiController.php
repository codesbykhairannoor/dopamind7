<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGoalRequest;
use App\Http\Requests\UpdateGoalRequest;
use App\Http\Resources\GoalResource;
use App\Models\Goal;
use App\Services\GoalService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GoalApiController extends Controller
{
    public function __construct(private GoalService $goalService)
    {
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status', 'all');
        $type = $request->input('type', 'all');
        $perPage = $request->input('per_page', 20);

        $goals = $this->goalService->getGoalsWithFilters(
            Auth::id(),
            $search,
            $status,
            $type,
            $perPage
        );

        return GoalResource::collection($goals);
    }

    public function stats()
    {
        return response()->json([
            'data' => $this->goalService->getGoalStats(Auth::id())
        ]);
    }

    public function store(StoreGoalRequest $request)
    {
        $data = $request->validated();
        $data['milestones'] = $request->input('milestones', []);

        $goal = $this->goalService->createGoal(Auth::id(), $data);

        return new GoalResource($goal);
    }

    public function show(Goal $goal)
    {
        $this->authorize('view', $goal);
        return new GoalResource($goal->load('milestones'));
    }

    public function update(UpdateGoalRequest $request, Goal $goal)
    {
        $this->authorize('update', $goal);

        $data = $request->validated();
        $data['milestones'] = $request->input('milestones', []);

        $goal = $this->goalService->updateGoal($goal, $data);

        return new GoalResource($goal);
    }

    public function destroy(Goal $goal)
    {
        $this->authorize('delete', $goal);
        $this->goalService->deleteGoal($goal);

        return response()->json(['message' => 'Goal deleted successfully']);
    }
}
