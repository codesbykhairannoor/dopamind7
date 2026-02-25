<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\PlannerTask;
use App\Models\FinanceTransaction;
use App\Models\Habit;
use App\Http\Requests\StoreJournalRequest;
use App\Http\Requests\UploadJournalImageRequest;
use App\Http\Resources\JournalResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JournalController extends Controller
{
    /**
     * Helper untuk mengambil data Synergy & Hari ini
     */
    private function getSynergyData($user)
    {
        $todayStr = now()->timezone($user->timezone ?? 'Asia/Jakarta')->format('Y-m-d');
        
        $plannerTasks = PlannerTask::where('user_id', $user->id)->where('date', $todayStr)->get();
        $financeTotal = FinanceTransaction::where('user_id', $user->id)->where('date', $todayStr)->where('type', 'expense')->sum('amount');
        
        $habitsCompleted = Habit::where('user_id', $user->id)->whereHas('logs', function ($q) use ($todayStr) {
            $q->where('date', $todayStr)->where('status', 'completed');
        })->count();

        return [
            'todayDate' => $todayStr,
            'synergy' => [
                'tasks_completed'  => $plannerTasks->where('is_completed', true)->count(),
                'tasks_total'      => $plannerTasks->count(),
                'expense_total'    => $financeTotal,
                'habits_completed' => $habitsCompleted,
            ]
        ];
    }

    public function index()
    {
        $user = Auth::user();
        $journals = Journal::where('user_id', $user->id)->latest()->get();
        $synergyData = $this->getSynergyData($user);

        return Inertia::render('Journal/Index', array_merge([
            // 🔥 Tambahkan ->resolve() di sini agar Vue menerima bentuk Array [...] bukan Object {"data": [...]}
            'journals' => JournalResource::collection($journals)->resolve(),
        ], $synergyData));
    }

    public function write($id = null)
    {
        $user = Auth::user();
        $journal = $id ? Journal::where('user_id', $user->id)->findOrFail($id) : null;
        $synergyData = $this->getSynergyData($user);

        return Inertia::render('Journal/Write', array_merge([
            // 🔥 Tambahkan ->resolve() di sini juga
            'journal' => $journal ? (new JournalResource($journal))->resolve() : null,
            'date'    => $journal ? $journal->date : $synergyData['todayDate'],
        ], $synergyData));
    }

    public function store(StoreJournalRequest $request)
    {
        // Validasi sudah otomatis tertangani oleh StoreJournalRequest
        $journal = Journal::create([
            'user_id' => Auth::id(),
            'date'    => now()->timezone(Auth::user()->timezone ?? 'Asia/Jakarta')->format('Y-m-d'),
            'title'   => $request->title,
            'content' => $request->content,
            'mood'    => $request->mood,
        ]);

        return redirect()->route('journal.write', $journal->id);
    }

    public function update(StoreJournalRequest $request, $id)
    {
        $journal = Journal::where('user_id', Auth::id())->findOrFail($id);
        
        // Fitur Pembersih Otomatis
        if (empty($request->title) && empty(trim(strip_tags($request->content))) && empty($request->mood) && empty($journal->image_path)) {
            $journal->delete();
            return redirect()->route('journal.index');
        }

        $journal->update($request->validated());
        return back();
    }

    public function destroy($id)
    {
        $journal = Journal::where('user_id', Auth::id())->findOrFail($id);
        if ($journal->image_path) {
            Storage::disk('public')->delete($journal->image_path);
        }
        $journal->delete();
        
        return redirect()->route('journal.index');
    }

    public function uploadImage(UploadJournalImageRequest $request)
    {
        $journal = $request->id 
            ? Journal::where('user_id', Auth::id())->findOrFail($request->id) 
            : Journal::create(['user_id' => Auth::id(), 'date' => now()->format('Y-m-d')]);

        // Hapus gambar lama jika ada
        if ($journal->image_path) {
            Storage::disk('public')->delete($journal->image_path);
        }
        
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