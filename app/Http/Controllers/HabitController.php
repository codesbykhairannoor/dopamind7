<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Period;
use Illuminate\Support\Facades\Auth;

class HabitController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Cari Periode Aktif, TAPI cuma ambil tracker tipe 'habit'
        $period = Period::with(['trackers' => function($query) {
            $query->where('type', 'habit')->with(['entries' => function($q) {
                // Ambil data 7 hari terakhir
                $q->where('date', '>=', now()->subDays(7));
            }]);
        }])
        ->where('user_id', $user->id)
        ->where('is_active', true)
        ->first();

        return Inertia::render('Habits/Index', [
            'period' => $period,
            'user' => $user
        ]);
    }
}