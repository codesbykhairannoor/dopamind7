<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use App\Http\Resources\JobResource;
use App\Models\Job;
use App\Services\JobService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobApiController extends Controller
{
    public function __construct(private JobService $jobService)
    {
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status', 'all');
        $days = $request->input('days') ? (int)$request->input('days') : null;
        $perPage = $request->input('per_page', 20);

        $jobs = $this->jobService->getJobsWithFilters(
            Auth::id(),
            $search,
            $status,
            $days,
            $perPage
        );

        return JobResource::collection($jobs);
    }

    public function stats()
    {
        return response()->json([
            'data' => $this->jobService->getJobStats(Auth::id())
        ]);
    }

    public function store(StoreJobRequest $request)
    {
        $job = $this->jobService->createJob(Auth::id(), $request->validated());
        return new JobResource($job);
    }

    public function show(Job $job)
    {
        $this->authorize('view', $job);
        return new JobResource($job);
    }

    public function update(UpdateJobRequest $request, Job $job)
    {
        $this->authorize('update', $job);
        $job = $this->jobService->updateJob($job, $request->validated());
        return new JobResource($job);
    }

    public function destroy(Job $job)
    {
        $this->authorize('delete', $job);
        $this->jobService->deleteJob($job);

        return response()->json(['message' => 'Job deleted successfully']);
    }

    public function titles()
    {
        return response()->json([
            'data' => $this->jobService->getUniqueTitles(Auth::id())
        ]);
    }
}
