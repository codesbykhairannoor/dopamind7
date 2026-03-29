<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use App\Services\NeuralSynergyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        $synergy = $this->dashboardService->getTodaySynergy($user->id, $timezone);
        $globalInsight = $this->neuralSynergy->generateGlobalSynergy($user->id);

        return Inertia::render('Dashboard', [
            'synergy' => $synergy,
            'globalInsight' => $globalInsight,
            'trend' => $this->dashboardService->getWeeklyTrend($user->id, $timezone),
            'stats' => [
                'is_premium' => (bool)($user->is_premium ?? false),
            ],
        ]);
    }
}