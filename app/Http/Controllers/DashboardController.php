<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Period;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Ambil periode aktif user (Bulan ini)
        // Kita juga load tracker habit & finance-nya
        $period = Period::with(['trackers.entries' => function($query) {
            $query->where('date', '>=', now()->subDays(7));
        }])
        ->where('user_id', $user->id)
        ->where('is_active', true)
        ->first();

        // Kirim data ke Frontend (Dashboard.vue)
        return Inertia::render('Dashboard', [
            'period' => $period,
            'user' => $user
        ]);
    }
}