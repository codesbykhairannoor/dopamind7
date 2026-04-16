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

        return Inertia::render('Dashboard', [
            // synergy dikirim langsung — ini data utama yang user lihat pertama kali
            'synergy' => $this->dashboardService->getTodaySynergy($user->id, $timezone),
            // trend (chart 7 hari) tetap defer — tidak critical untuk first paint
            'trend'   => Inertia::defer(fn () => $this->dashboardService->getWeeklyTrend($user->id, $timezone)),
            'stats'   => [
                'is_premium' => (bool) ($user->is_premium ?? false),
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