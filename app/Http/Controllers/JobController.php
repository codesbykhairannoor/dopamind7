<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use App\Http\Resources\JobResource;
use App\Models\Job;
use App\Services\JobService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobController extends Controller
{
    public function __construct(private JobService $jobService)
    {
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status', 'all');
        $days = $request->input('days') ? (int)$request->input('days') : null;
        $perPage = $request->input('per_page', 50);

        $jobs = $this->jobService->getJobsWithFilters(
            Auth::id(),
            $search,
            $status,
            $days,
            $perPage
        );

        $stats = $this->jobService->getJobStats(Auth::id());
        $uniqueTitles = $this->jobService->getUniqueTitles(Auth::id());

        return Inertia::render('Job/Index', [
            'jobs' => JobResource::collection($jobs)->resolve(),
            'stats' => $stats,
            'uniqueTitles' => $uniqueTitles,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'days' => $days,
            ],
            'pagination' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'per_page' => $jobs->perPage(),
                'total' => $jobs->total(),
            ],
        ]);
    }

    public function store(StoreJobRequest $request)
    {
        $job = $this->jobService->createJob(Auth::id(), $request->validated());

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Job created successfully',
                'data' => new JobResource($job)
            ], 201);
        }

        return back()->with('success', 'Job created successfully');
    }

    public function update(UpdateJobRequest $request, Job $job)
    {
        $this->authorize('update', $job);

        $job = $this->jobService->updateJob($job, $request->validated());

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Job updated successfully',
                'data' => new JobResource($job)
            ]);
        }

        return back()->with('success', 'Job updated successfully');
    }

    public function destroy(Job $job)
    {
        $this->authorize('delete', $job);

        $this->jobService->deleteJob($job);

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Job deleted successfully']);
        }

        return back()->with('success', 'Job deleted successfully');
    }

    public function bulkUpdateStatus(Request $request)
    {
        $request->validate([
            'job_ids' => ['required', 'array'],
            'job_ids.*' => ['required', 'integer', 'exists:jobs,id'],
            'status' => ['required', 'in:wishlist,applied,interview,offer,rejected,accepted'],
        ]);

        $count = $this->jobService->bulkUpdateStatus(
            Auth::id(),
            $request->input('job_ids'),
            $request->input('status')
        );

        return back()->with('success', "{$count} jobs updated successfully");
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'job_ids' => ['required', 'array'],
            'job_ids.*' => ['required', 'integer', 'exists:jobs,id'],
        ]);

        $count = $this->jobService->bulkDelete(
            Auth::id(),
            $request->input('job_ids')
        );

        return back()->with('success', "{$count} jobs deleted successfully");
    }
}
