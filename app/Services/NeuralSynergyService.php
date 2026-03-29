<?php

namespace App\Services;

use App\Models\Habit;
use App\Models\PlannerTask;
use App\Models\FinanceTransaction;
use App\Models\Journal;
use App\Models\Goal;
use App\Models\Job;
use Illuminate\Support\Facades\App;

class NeuralSynergyService
{
    public function __construct(private GeminiService $gemini)
    {
    }

    public function generateGlobalSynergy(int $userId): ?array
    {
        $locale = App::getLocale();
        $langName = ($locale === 'id') ? 'Indonesian' : 'English';

        // Gather all module data for context
        $todayStr = now()->toDateString();
        
        $habits = Habit::where('user_id', $userId)->where('is_archived', false)->ordered()->get();
        $compHabits = $habits->filter(fn($h) => $h->logs()->where('date', $todayStr)->where('status', 'completed')->exists());
        
        $tasks = PlannerTask::where('user_id', $userId)->whereDate('date', $todayStr)->get();
        $compTasks = $tasks->where('is_completed', true);
        
        $finance = FinanceTransaction::where('user_id', $userId)->where('date', $todayStr)->get();
        $journal = Journal::where('user_id', $userId)->where('date', $todayStr)->first();
        
        $goals = Goal::where('user_id', $userId)->where('status', 'active')->with('milestones')->get();
        $jobs = Job::where('user_id', $userId)->whereIn('status', ['applied', 'interviewing'])->get();

        $context = [
            'habits' => [
                'total' => $habits->count(),
                'completed' => $compHabits->count(),
                'names' => $habits->pluck('name')->toArray(),
            ],
            'planner' => [
                'total' => $tasks->count(),
                'completed' => $compTasks->count(),
                'titles' => $tasks->pluck('title')->toArray(),
            ],
            'finance' => [
                'expense' => $finance->where('type', 'expense')->sum('amount'),
                'income' => $finance->where('type', 'income')->sum('amount'),
            ],
            'journal' => [
                'written' => (bool)$journal,
                'mood' => $journal?->mood,
                'sentiment' => $journal?->sentiment_analysis,
            ],
            'goals' => $goals->map(fn($g) => [
                'title' => $g->title,
                'progress' => $g->milestones->count() > 0 ? round(($g->milestones->where('completed', true)->count() / $g->milestones->count()) * 100) : 0,
            ])->toArray(),
            'jobs' => $jobs->map(fn($j) => [
                'company' => $j->company,
                'status' => $j->status,
            ])->toArray(),
        ];

        $exampleJson = $locale === 'id' ? 
            "{ \"headline\": \"Judul Keren\", \"overall\": \"Penjelasan panjang...\", \"categories\": { \"habits\": \"Saran habit...\", \"finance\": \"Saran dana...\", \"planner\": \"Saran tugas...\", \"career\": \"Saran karir...\" }, \"command\": \"Perintah aksi...\" }" :
            "{ \"headline\": \"Cool Title\", \"overall\": \"Long insight...\", \"categories\": { \"habits\": \"Habit tip...\", \"finance\": \"Money tip...\", \"planner\": \"Task tip...\", \"career\": \"Job tip...\" }, \"command\": \"Action command...\" }";

        $cacheKey = "neural_synergy_{$userId}_{$locale}";
        
        return \Cache::remember($cacheKey, now()->addMinutes(10), function() use ($context, $langName, $exampleJson, $locale) {
            $prompt = "You are OneForMind Neural OS. Analyze the user's data and return a JSON response in $langName language.
            
            DATA: " . json_encode($context) . "
            
            TASK: Connect different life modules with unique logic. (e.g. Habit -> Finance).
            
            LANGUAGE RULE: Only values are in $langName. Keys MUST BE English as defined below.
            CRITICAL: Return ONLY JSON. No explanations. Use these keys: headline, overall, categories, command, habits, finance, planner, career.
            
            REQUIRED FORMAT EXAMPLE:
            $exampleJson";

            try {
                $response = $this->gemini->generate($prompt);
                $parsed = $this->parseJson($response);
                
                if (!$parsed) {
                    \Log::warning("NeuralSynergy RE-TRY ($locale)");
                    $response = $this->gemini->generate("PLEASE RETURN THIS EXACT JSON STRUCTURE IN $langName BUT WITH REAL VALUES BASED ON THE PREVIOUS CONTEXT: $exampleJson");
                    $parsed = $this->parseJson($response);
                }
                
                return $parsed;
            } catch (\Exception $e) {
                \Log::error("NeuralSynergy Error ($locale): " . $e->getMessage());
                return null;
            }
        });
    }

    public function getModuleSynergy(int $userId, string $module): ?array
    {
        $locale = App::getLocale();
        $langName = ($locale === 'id') ? 'Indonesian' : 'English';
        $cacheKey = "module_synergy_{$userId}_{$module}_{$locale}";

        return \Cache::remember($cacheKey, now()->addMinutes(10), function() use ($userId, $module, $langName) {
            $context = $this->getGlobalContext($userId);

            $prompt = "You are OneForMind Neural OS. Helping user in $module.
            GLOBAL: " . json_encode($context) . "
            TASK: 1 Synergy Bridge in $langName.
            FORMAT: { \"bridge\": \"...\" }";

            try {
                $response = $this->gemini->generate($prompt);
                return $this->parseJson($response);
            } catch (\Exception $e) {
                return null;
            }
        });
    }

    private function getGlobalContext(int $userId): array
    {
        $todayStr = now()->toDateString();
        $habits = Habit::where('user_id', $userId)->where('is_archived', false)->ordered()->get();
        $compHabits = $habits->filter(fn($h) => $h->logs()->where('date', $todayStr)->where('status', 'completed')->exists());
        $tasks = PlannerTask::where('user_id', $userId)->whereDate('date', $todayStr)->get();
        $finance = FinanceTransaction::where('user_id', $userId)->where('date', $todayStr)->get();
        $journal = Journal::where('user_id', $userId)->where('date', $todayStr)->first();
        $goals = Goal::where('user_id', $userId)->where('status', 'active')->with('milestones')->get();
        $jobs = Job::where('user_id', $userId)->whereIn('status', ['applied', 'interviewing'])->get();

        return [
            'habits' => $habits->count() . " active, " . $compHabits->count() . " done today.",
            'planner' => $tasks->count() . " tasks, " . $tasks->where('is_completed', true)->count() . " done.",
            'finance' => "Exp: " . $finance->where('type', 'expense')->sum('amount') . ", Inc: " . $finance->where('type', 'income')->sum('amount'),
            'journal' => $journal ? "Mood: " . $journal->mood : "Not written today",
            'goals' => $goals->pluck('title')->toArray(),
            'jobs' => $jobs->count() . " active applications",
        ];
    }

    private function parseJson($content): ?array
    {
        if (!$content) return null;
        
        // Robust JSON extraction: Find the first { and the last }
        $startPos = strpos($content, '{');
        $endPos = strrpos($content, '}');
        
        if ($startPos === false || $endPos === false) {
            return null;
        }
        
        $json = substr($content, $startPos, $endPos - $startPos + 1);
        $data = json_decode($json, true);
        
        return is_array($data) ? $data : null;
    }
}
