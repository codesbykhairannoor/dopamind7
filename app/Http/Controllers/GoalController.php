<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGoalRequest;
use App\Http\Requests\UpdateGoalRequest;
use App\Http\Resources\GoalResource;
use App\Models\Goal;
use App\Models\GoalMilestone;
use App\Services\GoalService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GoalController extends Controller
{
    public function __construct(private GoalService $goalService)
    {
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status', 'all');
        $type = $request->input('type', 'all');
        $perPage = $request->input('per_page', 50);

        $goals = $this->goalService->getGoalsWithFilters(
            Auth::id(),
            $search,
            $status,
            $type,
            $perPage
        );

        $stats = $this->goalService->getGoalStats(Auth::id());

        return Inertia::render('Goal/Index', [
            'goals' => GoalResource::collection($this->goalService->getGoalsWithFilters(
                Auth::id(),
                $search,
                $status,
                $type,
                $perPage
            ))->resolve(),
            'stats' => $this->goalService->getGoalStats(Auth::id()),
            'filters' => [
                'search' => $search,
                'status' => $status,
                'type' => $type,
            ],
            'pagination' => [
                'current_page' => $goals->currentPage(),
                'last_page' => $goals->lastPage(),
                'per_page' => $goals->perPage(),
                'total' => $goals->total(),
            ],
        ]);
    }

    public function store(StoreGoalRequest $request)
    {
        // Paksakan data milestones masuk dari form request!
        $data = $request->validated();
        $data['milestones'] = $request->input('milestones', []);

        $goal = $this->goalService->createGoal(Auth::id(), $data);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Goal created successfully',
                'data' => new GoalResource($goal)
            ], 201);
        }

        return back()->with('success', 'Goal created successfully');
    }

    public function update(UpdateGoalRequest $request, Goal $goal)
    {
        $this->authorize('update', $goal);

        // Paksakan data milestones masuk dari form request!
        $data = $request->validated();
        $data['milestones'] = $request->input('milestones', []);

        $goal = $this->goalService->updateGoal($goal, $data);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Goal updated successfully',
                'data' => new GoalResource($goal)
            ]);
        }

        return back()->with('success', 'Goal updated successfully');
    }

    public function destroy(Goal $goal)
    {
        $this->authorize('delete', $goal);

        $this->goalService->deleteGoal($goal);

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Goal deleted successfully']);
        }

        return back()->with('success', 'Goal deleted successfully');
    }

    public function bulkUpdateStatus(Request $request)
    {
        $request->validate([
            'goal_ids' => ['required', 'array'],
            'goal_ids.*' => ['required', 'integer', 'exists:goals,id'],
            'status' => ['required', 'in:active,completed,paused,cancelled'],
        ]);

        $count = $this->goalService->bulkUpdateStatus(
            Auth::id(),
            $request->input('goal_ids'),
            $request->input('status')
        );

        return back()->with('success', "{$count} goals updated successfully");
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'goal_ids' => ['required', 'array'],
            'goal_ids.*' => ['required', 'integer', 'exists:goals,id'],
        ]);

        $count = $this->goalService->bulkDelete(
            Auth::id(),
            $request->input('goal_ids')
        );

        return back()->with('success', "{$count} goals deleted successfully");
    }

    public function storeMilestone(Request $request, Goal $goal)
    {
        $this->authorize('update', $goal);

        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'integer'], // Ganti order jadi position, biar sinkron sama Vue
            'is_completed' => ['nullable', 'boolean'], // TAMBAHAN PENTING
        ]);

        $data = $request->all();
        // Fallback untuk antisipasi perbedaan nama field
        if ($request->has('completed')) {
            $data['is_completed'] = $request->completed;
        }

        $milestone = $this->goalService->addMilestone($goal, $data);

        return response()->json([
            'message' => 'Milestone added successfully',
            'data' => new \App\Http\Resources\GoalMilestoneResource($milestone) // Kirim via resource!
        ]);
    }

    public function updateMilestone(Request $request, Goal $goal, GoalMilestone $milestone)
    {
        $this->authorize('update', $goal);

        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'target_date' => ['nullable', 'date'],
            'is_completed' => ['nullable', 'boolean'],
        ]);

        $data = $request->all();
        if ($request->has('completed')) {
            $data['is_completed'] = $request->completed;
        }

        $milestone = $this->goalService->updateMilestone($milestone, $data);

        return response()->json([
            'message' => 'Milestone updated successfully',
            'data' => new \App\Http\Resources\GoalMilestoneResource($milestone) // Kirim via resource!
        ]);
    }

    public function toggleMilestone(Goal $goal, GoalMilestone $milestone)
    {
        $this->authorize('update', $goal);

        $milestone = $this->goalService->toggleMilestone($milestone);

        return response()->json([
            'message' => 'Milestone toggled successfully',
            'data' => new \App\Http\Resources\GoalMilestoneResource($milestone)
        ]);
    }

    public function destroyMilestone(int $goalId, int $milestoneId)
    {
        $milestone = GoalMilestone::findOrFail($milestoneId);
        $this->goalService->deleteMilestone($milestone);

        return response()->json([
            'message' => 'Milestone deleted successfully'
        ]);
    }

    public function uploadCoverImage(Request $request)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'id' => 'nullable|exists:goals,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        if ($validator->fails()) {
            \Illuminate\Support\Facades\Log::error('Goal image upload validation failed:', $validator->errors()->toArray());
            \Illuminate\Support\Facades\Log::error('Request data:', $request->all());
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();
        $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');

        $goal = $request->id
            ?Goal::ofUser($user->id)->findOrFail($request->id)
            : new Goal(['user_id' => $user->id]);

        // Delete old image if exists
        if (!empty($goal->cover_image_path)) {
            \Illuminate\Support\Facades\Storage::disk($disk)->delete($goal->cover_image_path);
        }

        $path = $request->file('image')->store('goals', $disk);

        if ($goal->exists) {
            $goal->update(['cover_image_path' => $path]);
        }

        return response()->json([
            'success' => true,
            'path' => $path,
            'url' => asset(\Illuminate\Support\Facades\Storage::disk($disk)->url($path)),
            'id' => $goal->id
        ]);
    }

    public function deleteCoverImage($id)
    {
        $goal = Goal::ofUser(Auth::id())->findOrFail($id);
        if (!empty($goal->cover_image_path)) {
            $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');
            \Illuminate\Support\Facades\Storage::disk($disk)->delete($goal->cover_image_path);
            $goal->update(['cover_image_path' => null]);
        }

        return response()->json(['success' => true]);
    }
}
