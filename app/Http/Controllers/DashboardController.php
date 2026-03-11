<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(private DashboardService $dashboardService)
    {
    }

    public function __invoke(Request $request)
    {
        $user = Auth::user();
        $timezone = $user->timezone ?? 'Asia/Jakarta';

        $synergy = $this->dashboardService->getTodaySynergy($user->id, $timezone);

        return Inertia::render('Dashboard', [
            'synergy' => $this->dashboardService->getTodaySynergy($user->id, $timezone),
            'stats' => [
                'is_premium' => (bool)($user->is_premium ?? false),
            ],
        ]);
    }
}