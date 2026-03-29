<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\Mood;
use App\Models\PlannerTask;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AiHabitController extends Controller
{
    public function __construct(private GeminiService $gemini) {}

    /**
     * IDEA 2: Habit Alchemy (Smart Stacking)
     * Suggests a "Habit Stack" based on current habits and planner tasks.
     */
    public function suggestStack(Request $request)
    {
        $user = Auth::user();
        $habits = Habit::ofUser($user->id)->where('is_archived', false)->ordered()->get();
        $tasks = PlannerTask::where('user_id', $user->id)->whereDate('date', now())->take(10)->get();

        // Count performance in last 14 days
        $startDate = now()->subDays(14)->toDateString();
        $habitStats = [];
        foreach ($habits as $h) {
            $comp = $h->logs()->whereBetween('date', [$startDate, now()->toDateString()])->where('status', 'completed')->count();
            $missed = $h->logs()->whereBetween('date', [$startDate, now()->toDateString()])->where('status', 'missed')->count();
            $empty = 14 - $h->logs()->whereBetween('date', [$startDate, now()->toDateString()])->count();
            $habitStats[] = "- {$h->name}: {$comp} Done, {$missed} Missed, {$empty} Empty/Gaps";
        }

        $locale = app()->getLocale();
        $langName = ($locale === 'id') ? 'Indonesian' : 'English';

        $prompt = "You are OneForMind Neural OS. Analyze the user's habit performance and suggest a 'Habit Stack'.
        
        USER DATA (Last 14 Days):
        " . implode("\n", $habitStats) . "
        
        TASKS TODAY:
        " . ($tasks->isEmpty() ? 'NONE' : $tasks->pluck('title')->implode(', ')) . "
        
        GOAL:
        1. Identify the 'Problem' (why there are many empty/missed gaps like 'bolong-bolong').
        2. Provide 1 'Atomic Suggestion' for the problem.
        3. Suggest 1 'Habit Stack' using: 'After [Existing Anchor], I will [Target Action]'.
        
        TONE: Premium, empathetic but firm life coach.
        LANGUAGE: MUST USE $langName language.
        OUTPUT: JSON format { \"stack\": \"...\", \"reason\": \"...\" }
        The 'reason' field MUST include the analysis of the gaps/bolong-bolong and the specific advice.";

        $response = $this->gemini->generate($prompt);
        return response()->json($this->parseJson($response));
    }

    /**
     * IDEA 4: Mood-Adaptive Habits
     * Adjusts habit intensity based on current mood.
     */
    public function adaptToMood(Request $request)
    {
        $request->validate(['mood' => 'required|string']);
        $user = Auth::user();
        $habits = Habit::ofUser($user->id)->where('is_archived', false)->get();

        $locale = app()->getLocale();
        $langName = ($locale === 'id') ? 'Indonesian' : 'English';

        $prompt = "User is feeling '{$request->mood}' today. 
        Current Habits: {$habits->pluck('name')->implode(', ')}.
        
        As OneForMind Neural OS, suggest how to adapt these habits for today only. 
        If mood is low, suggest 'Atomic' (smaller) versions. 
        If mood is high, suggest 'Elite' (extra mile) versions.
        Keep it coaching-style, empathetic, and premium.
        LANGUAGE: MUST USE $langName language.
        Return in JSON format: { \"message\": \"...\", \"suggestions\": [ { \"habit\": \"...\", \"adjustment\": \"...\" } ] }";

        $response = $this->gemini->generate($prompt);
        return response()->json($this->parseJson($response));
    }

    /**
     * IDEA 7: Friction Analysis (Miss Audit)
     * Analyzes why a habit was missed and suggests solutions.
     */
    public function auditFriction(Request $request)
    {
        $request->validate(['habit_id' => 'required|exists:habits,id']);
        $habit = Habit::findOrFail($request->habit_id);
        
        $locale = app()->getLocale();
        $langName = ($locale === 'id') ? 'Indonesian' : 'English';

        $prompt = "User missed their habit: '{$habit->name}'. 
        As OneForMind Neural OS, perform a 'Friction Audit'. 
        Ask 1-2 sharp questions to identify if it was a Time, Energy, or Priority issue.
        Then provide 1 immediate solution to reduce friction for tomorrow.
        LANGUAGE: MUST USE $langName language.
        Return in JSON format: { \"audit_question\": \"...\", \"solution\": \"...\" }";

        $response = $this->gemini->generate($prompt);
        return response()->json($this->parseJson($response));
    }

    /**
     * NEW: Stagnant Habit Warning
     * Detects habits with 0 logs in last 7 days.
     */
    public function auditStagnation(Request $request)
    {
        $user = Auth::user();
        $stagnantHabits = Habit::ofUser($user->id)
            ->where('is_archived', false)
            ->withCount(['logs' => function($q) {
                $q->where('date', '>=', now()->subDays(7));
            }])
            ->having('logs_count', '=', 0)
            ->get();

        $locale = app()->getLocale();
        $langName = ($locale === 'id') ? 'Indonesian' : 'English';

        if ($stagnantHabits->isEmpty()) {
            $msg = ($locale === 'id') 
                ? 'Luar biasa! Tidak ada habit yang terbengkalai 7 hari terakhir. Pertahankan momentummu!'
                : 'Excellent! No stagnant habits in the last 7 days. Keep up the momentum!';
            return response()->json(['message' => $msg]);
        }

        $prompt = "You are OneForMind Neural OS. DETECTING DORMANT HABITS.
        Stagnant Habits (0 logs in 7 days): " . $stagnantHabits->pluck('name')->implode(', ') . ".
        
        Provide 1 'Wakeup Call' insight. Be sharp, a bit tough but still a life coach. 
        Explain the 'Cost of Inaction' and suggest 1 micro-step to restart today.
        LANGUAGE: MUST USE $langName language.
        Return JSON: { \"title\": \"Dormant Alert!\", \"message\": \"...\", \"action\": \"...\" }";

        $response = $this->gemini->generate($prompt);
        return response()->json($this->parseJson($response));
    }

    private function parseJson($text)
    {
        // Cleaning potential markdown backticks
        $clean = preg_replace('/^```json\s*|\s*```$/i', '', trim($text));
        return json_decode($clean, true) ?? ['error' => 'Failed to parse AI response', 'raw' => $text];
    }
}
