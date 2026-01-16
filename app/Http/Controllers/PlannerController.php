<?php

namespace App\Http\Controllers;

use App\Models\DailyLog;
use App\Models\PlannerTask; // 🔥 Jangan lupa import ini (Model baru)
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PlannerController extends Controller
{
    public function index()
    {
        // 1. Ambil Task (Urutkan dari pagi ke malam)
        $tasks = PlannerTask::where('user_id', Auth::id())
            ->orderBy('start_time', 'asc')
            ->get();

        // 2. Ambil Data Harian (Notes & Meals)
        // Pakai firstOrCreate biar gak error kalau pengguna baru pertama kali buka
        $dailyLog = DailyLog::firstOrCreate(
            ['user_id' => Auth::id()],
            [
                'meals' => ['breakfast' => '', 'lunch' => '', 'dinner' => ''],
                'notes' => '',
            ]
        );

        return Inertia::render('Planner/Index', [
            'tasks' => $tasks,
            'dailyLog' => $dailyLog,
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'start_time' => 'nullable|date_format:H:i', // Format jam:menit
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'type' => 'required|integer|in:1,2,3', // 1=Work, 2=Personal, 3=Urgent
            'notes' => 'nullable|string',
        ]);

        // Simpan dengan User ID
        PlannerTask::create(array_merge(
            ['user_id' => Auth::id()],
            $validated
        ));

        return back();
    }

    public function update(Request $request, PlannerTask $plannerTask)
    {
        // Pastikan task milik user yang sedang login
        if ($plannerTask->user_id !== Auth::id()) {
            abort(403);
        }

        // Validasi 'sometimes' agar bisa update sebagian (misal cuma geser jam)
        $validated = $request->validate([
            'title' => 'sometimes|string|max:150',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'type' => 'sometimes|integer|in:1,2,3',
            'notes' => 'nullable|string',
        ]);

        $plannerTask->update($validated);

        return back();
    }

    // 🔥 LOGIC BARU: TOGGLE CHECKLIST (Selesai/Belum)
    public function toggle(PlannerTask $plannerTask)
    {
        if ($plannerTask->user_id !== Auth::id()) {
            abort(403);
        }

        $plannerTask->update([
            'is_completed' => ! $plannerTask->is_completed,
        ]);

        return back();
    }

    // 🔥 LOGIC BARU: SAVE NOTES / MEALS (Control Panel Kiri)
    public function updateLog(Request $request)
    {
        $log = DailyLog::where('user_id', Auth::id())->firstOrFail();

        if ($request->has('notes')) {
            $log->update(['notes' => $request->input('notes')]);
        }

        if ($request->has('meals')) {
            $log->update(['meals' => $request->input('meals')]);
        }

        return back();
    }

    public function destroy(PlannerTask $plannerTask)
    {
        if ($plannerTask->user_id !== Auth::id()) {
            abort(403);
        }

        $plannerTask->delete();

        return back();
    }

    // 🔥 RESET BOARD (Hapus Task + Bersihkan Notes/Meals)
    public function resetBoard()
    {
        // 1. Hapus semua task user
        PlannerTask::where('user_id', Auth::id())->delete();

        // 2. Reset Log Harian jadi kosong
        DailyLog::where('user_id', Auth::id())->update([
            'notes' => '',
            'meals' => ['breakfast' => '', 'lunch' => '', 'dinner' => ''],
        ]);

        return back();
    }
}
