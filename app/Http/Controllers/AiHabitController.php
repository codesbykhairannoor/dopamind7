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
        $habits = Habit::ofUser($user->id)->where('is_archived', false)->latest()->take(5)->get();
        $tasks = PlannerTask::where('user_id', $user->id)->whereDate('date', now())->take(10)->get();

        $prompt = "You are OneForMind Neural OS. User wants a 'Habit Stack' recommendation.
        ONLY USE the data below. If data is empty, give a generic but high-quality dopamine-fasting stack.
        
        Current Habits: " . ($habits->isEmpty() ? 'NONE' : $habits->pluck('name')->implode(', ')) . "
        Current Tasks for Today: " . ($tasks->isEmpty() ? 'NONE' : $tasks->pluck('title')->implode(', ')) . "
        
        Suggest 1 powerful Habit Stack using the formula: 'After [Existing Anchor], I will [Target Action]'. 
        The anchor MUST be something the user already DOES (from habits or tasks).
        
        Return in JSON format: { \"stack\": \"...\", \"reason\": \"...\" } in Indonesian language.";

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

        $prompt = "User is feeling '{$request->mood}' today. 
        Current Habits: {$habits->pluck('name')->implode(', ')}.
        
        As OneForMind Neural OS, suggest how to adapt these habits for today only. 
        If mood is low, suggest 'Atomic' (smaller) versions. 
        If mood is high, suggest 'Elite' (extra mile) versions.
        Keep it coaching-style, empathetic, and premium. Use Indonesian language.
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
        
        $prompt = "User missed their habit: '{$habit->name}'. 
        As OneForMind Neural OS, perform a 'Friction Audit'. 
        Ask 1-2 sharp questions to identify if it was a Time, Energy, or Priority issue.
        Then provide 1 immediate solution to reduce friction for tomorrow.
        Use Indonesian language.
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

        if ($stagnantHabits->isEmpty()) {
            return response()->json(['message' => 'Luar biasa! Tidak ada habit yang terbengkalai 7 hari terakhir. Pertahankan momentummu!']);
        }

        $prompt = "You are OneForMind Neural OS. DETECTING DORMANT HABITS.
        Stagnant Habits (0 logs in 7 days): " . $stagnantHabits->pluck('name')->implode(', ') . ".
        
        Provide 1 'Wakeup Call' insight. Be sharp, a bit tough but still a life coach. 
        Explain the 'Cost of Inaction' and suggest 1 micro-step to restart today.
        Use Indonesian language.
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
