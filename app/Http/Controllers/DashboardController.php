<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use App\Services\NeuralSynergyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService,
        private NeuralSynergyService $neuralSynergy
    ) {
    }

    public function __invoke(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login');
        }
        $timezone = $user->timezone ?? 'Asia/Jakarta';
        $userId = $user->id;

        return Inertia::render('Dashboard', [
            'synergy' => Inertia::defer(fn () => Cache::remember("dash_synergy_{$userId}", 120, fn() => 
                $this->dashboardService->getTodaySynergy($userId, $timezone)
            )),
            'trend' => Inertia::defer(fn () => Cache::remember("dash_trend_{$userId}", 300, fn() => 
                $this->dashboardService->getWeeklyTrend($userId, $timezone)
            )),
            'stats' => [
                'is_premium' => (bool)($user->is_premium ?? false),
            ],
        ]);
    }

    public function getInsight()
    {
        $user = Auth::user();
        $insight = $this->neuralSynergy->generateGlobalSynergy($user->id);
        return response()->json($insight);
    }
}