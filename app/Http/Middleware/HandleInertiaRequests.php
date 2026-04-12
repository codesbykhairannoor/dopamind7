<?php

namespace App\Http\Middleware;

use App\Models\Habit;
use App\Models\HabitLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root view that is loaded on the first page visit.
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        $manifestPath = public_path('build/manifest.json');
        return file_exists($manifestPath) ? md5_file($manifestPath) : parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            // 1. DATA USER (Sudah rapi & aman)
            'auth' => [
                'user' => $request->user() ? [
                    'id'       => $request->user()->id,
                    'name'     => $request->user()->name,
                    'email'    => $request->user()->email,
                    'settings' => $request->user()->settings,
                    'timezone' => $request->user()->timezone ?? config('app.timezone'),
                    'avatar_url' => $request->user()->avatar_url,
                    'resume_text' => $request->user()->resume_text,
                    'resume_filename' => $request->user()->resume_filename,
                    'is_premium' => $request->user()->is_premium,
                    'plan_type'  => $request->user()->plan_type,
                    'premium_until' => $request->user()->premium_until,
                ] : null,
            ],

            // 2. CONFIG GLOBAL (Dibuat Guest-Safe agar tidak error pas belum login)
            'app_config' => [
                'name'        => config('app.name'),
                'currency'    => $request->user()?->settings['currency'] ?? 'IDR',
                'date_format' => $request->user()?->settings['date_format'] ?? 'Y-m-d',
            ],

            // 3. FLASH MESSAGES (Notifikasi)
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error'   => fn () => $request->session()->get('error'),
                'success' => fn () => $request->session()->get('success'),
            ],

            // 4. 🔥 BRIDGE BAHASA
            'locale' => function () {
                return app()->getLocale();
            },
            'csrf_token' => csrf_token(),
            'midtrans_is_production' => config('midtrans.is_production'),
            'session_id' => $request->session()->getId(),

            // 5. 🔥 GLOBAL HEADER: Habit streak & today progress
            // Optimized with Caching to prevent back-breaking DB loops on every request
            'today_streak' => function () use ($request) {
                if (!$request->user()) return 0;
                
                $userId = $request->user()->id;
                $cacheKey = "user_{$userId}_habit_streak_v3"; // Busting old cache again

                return \Illuminate\Support\Facades\Cache::remember($cacheKey, now()->addMinutes(10), function () use ($request, $userId) {
                    try {
                        $tz = $request->user()->timezone ?? 'Asia/Jakarta';
                        $today = \Carbon\Carbon::now($tz);
                        
                        // 1. Ambil ID habit user yang aktif (Hanya yang tidak diarsip)
                        $habitIds = \App\Models\Habit::where('user_id', $userId)
                             ->where('is_archived', false)
                             ->pluck('id');

                        if ($habitIds->isEmpty()) return 0;

                        // 2. Tarik tanggal log 'completed' saja
                        $completedDates = \App\Models\HabitLog::whereIn('habit_id', $habitIds)
                            ->where('date', '>=', $today->copy()->subDays(60)->format('Y-m-d'))
                            ->where('status', 'completed')
                            ->distinct()
                            ->pluck('date')
                            ->toArray();

                        if (empty($completedDates)) return 0;

                        $streak = 0;
                        $checkDate = $today->copy();
                        $completedSet = array_flip($completedDates);

                        for ($i = 0; $i < 60; $i++) {
                            $dateStr = $checkDate->format('Y-m-d');
                            if (isset($completedSet[$dateStr])) {
                                $streak++;
                                $checkDate->subDay();
                            } else {
                                if ($i === 0) {
                                    $checkDate->subDay();
                                    continue;
                                }
                                break;
                            }
                        }
                        return $streak;
                    } catch (\Exception $e) {
                        \Illuminate\Support\Facades\Log::error("Streak Calculation Error: " . $e->getMessage());
                        return 0;
                    }
                });
            },
        ]);
    }
}