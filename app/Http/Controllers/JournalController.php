<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\PlannerTask;
use App\Models\FinanceTransaction;
use App\Models\Habit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JournalController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $todayStr = now()->timezone($user->timezone ?? 'Asia/Jakarta')->format('Y-m-d');
        
        $journals = Journal::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

        $plannerTasks = PlannerTask::where('user_id', $user->id)->where('date', $todayStr)->get();
        $financeTotal = FinanceTransaction::where('user_id', $user->id)->where('date', $todayStr)->where('type', 'expense')->sum('amount');
        $habitsCompleted = Habit::where('user_id', $user->id)->whereHas('logs', function ($q) use ($todayStr) {
            $q->where('date', $todayStr)->where('status', 'completed');
        })->count();

        return Inertia::render('Journal/Index', [
            'journals' => $journals,
            'todayDate' => $todayStr,
            'synergy' => [
                'tasks_completed' => $plannerTasks->where('is_completed', true)->count(),
                'tasks_total' => $plannerTasks->count(),
                'expense_total' => $financeTotal,
                'habits_completed' => $habitsCompleted,
            ]
        ]);
    }

    public function write($id = null)
    {
        $user = Auth::user();
        $todayStr = now()->timezone($user->timezone ?? 'Asia/Jakarta')->format('Y-m-d');
        
        $journal = $id ? Journal::where('user_id', $user->id)->findOrFail($id) : null;

        $plannerTasks = PlannerTask::where('user_id', $user->id)->where('date', $todayStr)->get();
        $financeTotal = FinanceTransaction::where('user_id', $user->id)->where('date', $todayStr)->where('type', 'expense')->sum('amount');
        $habitsCompleted = Habit::where('user_id', $user->id)->whereHas('logs', function ($q) use ($todayStr) {
            $q->where('date', $todayStr)->where('status', 'completed');
        })->count();

        return Inertia::render('Journal/Write', [
            'journal' => $journal,
            'date' => $journal ? $journal->date : $todayStr,
            'synergy' => [
                'tasks_completed' => $plannerTasks->where('is_completed', true)->count(),
                'tasks_total' => $plannerTasks->count(),
                'expense_total' => $financeTotal,
                'habits_completed' => $habitsCompleted,
            ]
        ]);
    }

    // 🔥 FIX: Pake Redirect Langsung ke ID Jurnal Baru
    public function store(Request $request)
    {
        $request->validate(['title' => 'nullable|string', 'content' => 'nullable|string', 'mood' => 'nullable|string']);
        
        $journal = Journal::create([
            'user_id' => Auth::id(),
            'date' => now()->timezone(Auth::user()->timezone ?? 'Asia/Jakarta')->format('Y-m-d'),
            'title' => $request->title,
            'content' => $request->content,
            'mood' => $request->mood,
        ]);

        return redirect()->route('journal.write', $journal->id);
    }

    public function update(Request $request, $id)
    {
        $journal = Journal::where('user_id', Auth::id())->findOrFail($id);
        
        // Fitur Pembersih Otomatis (Kalau isinya diapus total sama user)
        if (empty($request->title) && empty(trim(strip_tags($request->content))) && empty($request->mood) && empty($journal->image_path)) {
            $journal->delete();
            return redirect()->route('journal.index');
        }

        $journal->update($request->only(['title', 'content', 'mood']));
        return back();
    }

    public function destroy($id)
    {
        $journal = Journal::where('user_id', Auth::id())->findOrFail($id);
        if ($journal->image_path) Storage::disk('public')->delete($journal->image_path);
        $journal->delete();
        return redirect()->route('journal.index');
    }

    public function uploadImage(Request $request)
    {
        $request->validate(['image' => 'required|image']);
        
        $journal = $request->id 
            ? Journal::findOrFail($request->id) 
            : Journal::create(['user_id' => Auth::id(), 'date' => now()->format('Y-m-d')]);

        if ($journal->image_path) Storage::disk('public')->delete($journal->image_path);
        $path = $request->file('image')->store('journals', 'public');
        $journal->update(['image_path' => $path]);

        if (!$request->id) {
            return redirect()->route('journal.write', $journal->id);
        }
        return back();
    }

    public function deleteImage($id)
    {
        $journal = Journal::where('user_id', Auth::id())->findOrFail($id);
        if ($journal->image_path) {
            Storage::disk('public')->delete($journal->image_path);
            $journal->update(['image_path' => null]);
        }
        return back();
    }
}