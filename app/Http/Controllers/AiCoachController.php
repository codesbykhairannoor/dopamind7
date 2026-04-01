<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\FinanceTransaction;
use App\Models\PlannerTask;
use App\Models\AiChat;
use App\Services\GeminiService;
use App\Services\NeuralSynergyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AiCoachController extends Controller
{
    public function __construct(
        private GeminiService $geminiService,
        private NeuralSynergyService $neuralSynergy
    ) {}

    public function index(Request $request)
    {
        $user = Auth::user();
        $currentSessionId = $request->query('session');
        
        // Load sessions list
        $sessions = AiChat::where('user_id', $user->id)
            ->whereNotNull('session_id')
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('session_id')
            ->map(function ($msgs, $sid) {
                $firstMsg = $msgs->first(fn($m) => $m->role === 'user') ?? $msgs->first();
                return [
                    'id' => $sid,
                    'title' => Str::limit($firstMsg?->content ?? 'New Conversation', 30),
                    'date' => $msgs->first()->created_at->diffForHumans()
                ];
            })
            ->values();

        // If no session specified, take latest or start new
        // If no session specified and no 'new' flag, redirect to latest
        if (!$currentSessionId && !$request->has('new') && $sessions->isNotEmpty()) {
            return redirect()->route('coach.index', ['session' => $sessions->first()['id']]);
        }

        // Context for opener (only if starting fresh)
        $context = [
            'name' => $user->name,
            'recent_habits' => Habit::ofUser($user->id)->latest()->take(3)->get()->map(fn($h) => ['name' => $h->name]),
            'tasks_today' => PlannerTask::ofUser($user->id)->forDate(now()->format('Y-m-d'))->get()->map(fn($t) => ['name' => $t->name]),
            'finance_month' => [
                'income' => FinanceTransaction::where('user_id', $user->id)->where('type', 'income')->whereMonth('date', now()->month)->sum('amount'),
                'expense' => FinanceTransaction::where('user_id', $user->id)->where('type', 'expense')->whereMonth('date', now()->month)->sum('amount'),
            ]
        ];

        // Load messages for current session
        $messages = [];
        if ($currentSessionId) {
            $messages = AiChat::where('user_id', $user->id)
                ->where('session_id', $currentSessionId)
                ->oldest()
                ->get()
                ->map(fn($chat) => [
                    'role' => $chat->role,
                    'content' => $chat->content
                ]);
        }

        // If even with session ID it's empty, or no session ID at all
        if (empty($messages) || !$currentSessionId) {
            $newSid = $currentSessionId ?? (string) Str::uuid();
            
            // [AI OPENER REMOVED for On-Demand]
            // We use a static welcome to save Gemini tokens.
            $opener = "Halo {$user->name}, apa kabar hari ini? Saya siap membantu menganalisis progres hidupmu. Apa yang ingin kita bahas?";
            
            AiChat::create([
                'user_id' => $user->id,
                'session_id' => $newSid,
                'role' => 'assistant',
                'content' => $opener
            ]);

            if (!$currentSessionId) {
                return redirect()->route('coach.index', ['session' => $newSid]);
            }

            $messages = [[ 'role' => 'assistant', 'content' => $opener ]];
        }

        return Inertia::render('AiCoach/Index', [
            'sessions' => $sessions,
            'currentSessionId' => $currentSessionId,
            'initialMessages' => $messages,
            'userName' => $user->name
        ]);
    }

    public function chat(Request $request)
    {
        $request->validate([
            'session_id' => 'required|string',
            'messages' => 'required|array',
            'messages.*.role' => 'required|in:user,assistant',
            'messages.*.content' => 'required|string',
        ]);

        $user = Auth::user();
        $allMessages = $request->input('messages');
        $lastMessage = end($allMessages);

        // Save User Message
        AiChat::create([
            'user_id' => $user->id,
            'session_id' => $request->session_id,
            'role' => 'user',
            'content' => $lastMessage['content']
        ]);

        \Illuminate\Support\Facades\Log::info("AI_COACH_CHAT_REQUEST: " . $lastMessage['content']);

        // --- CONTEXT INJECTION (The Secret Sauce) ---
        $habits = Habit::ofUser($user->id)->get()->map(fn($h) => "{$h->name} ({$h->period})");
        $tasks = PlannerTask::ofUser($user->id)->forDate(now()->format('Y-m-d'))->get()->map(fn($t) => $t->title . ($t->is_completed ? " [SELESAI]" : " [BELUM]"));
        $income = FinanceTransaction::where('user_id', $user->id)->where('type', 'income')->whereMonth('date', now()->month)->sum('amount');
        $expense = FinanceTransaction::where('user_id', $user->id)->where('type', 'expense')->whereMonth('date', now()->month)->sum('amount');

        $systemContext = "Anda adalah OneForMind Neural OS Life Coach. Anda memiliki akses ke data user:
        Nama: {$user->name}
        Daftar Habits: " . $habits->implode(', ') . "
        Tugas Hari Ini: " . $tasks->implode(', ') . "
        Keuangan Bulan Ini: Masukan Rp" . number_format($income) . ", Pengeluaran Rp" . number_format($expense) . ".
        
        Gunakan data ini jika user bertanya tentang progres, habit, atau tugas mereka. Tetaplah ramah, tegas, dan memotivasi dalam bahasa Indonesia.";

        $response = $this->geminiService->chat($allMessages, $systemContext);

        if ($response) {
            // Save Assistant Response
            AiChat::create([
                'user_id' => $user->id,
                'session_id' => $request->session_id,
                'role' => 'assistant',
                'content' => $response
            ]);
        } else {
             \Illuminate\Support\Facades\Log::error("AI_COACH_CHAT_FAILED for session: " . $request->session_id);
        }

        return response()->json([
            'content' => $response ?? "Maaf, sepertinya asisten sedang beristirahat sejenak karena terlalu banyak permintaan. Silakan tunggu 1 menit dan coba lagi."
        ]);
    }

    public function synergy(Request $request)
    {
        $request->validate(['module' => 'required|string']);
        $synergy = $this->neuralSynergy->getModuleSynergy(Auth::id(), $request->module);
        return response()->json($synergy);
    }
}
