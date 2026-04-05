<?php

namespace App\Http\Controllers;

use App\Models\FinanceSaving;
use App\Services\FinanceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FinanceSavingController extends Controller
{
    public function __construct(private FinanceService $financeService) {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:0',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:20',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['current_amount'] = 0;

        FinanceSaving::create($validated);

        return back()->with('success', 'Saving goal created!');
    }

    public function update(Request $request, FinanceSaving $financeSaving)
    {
        if ($financeSaving->user_id !== Auth::id()) abort(403);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:0',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:20',
        ]);

        $financeSaving->update($validated);

        return back()->with('success', 'Saving goal updated!');
    }

    public function destroy(FinanceSaving $financeSaving)
    {
        if ($financeSaving->user_id !== Auth::id()) abort(403);
        $financeSaving->delete();
        return back();
    }

    public function deposit(Request $request, FinanceSaving $financeSaving)
    {
        if ($financeSaving->user_id !== Auth::id()) abort(403);

        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'date' => 'required|date'
        ]);

        $user = Auth::user();
        try {
            $this->financeService->depositToSaving(
                $user->id, 
                $financeSaving->id, 
                $validated['amount'], 
                $validated['date'],
                $user->timezone ?? 'Asia/Jakarta'
            );
            return back()->with('success', 'Money added to vault!');
        } catch (\Exception $e) {
            return back()->withErrors(['amount' => $e->getMessage()]);
        }
    }

    public function withdraw(Request $request, FinanceSaving $financeSaving)
    {
        if ($financeSaving->user_id !== Auth::id()) abort(403);

        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'date' => 'required|date'
        ]);

        $user = Auth::user();
        try {
            $this->financeService->withdrawFromSaving(
                $user->id, 
                $financeSaving->id, 
                $validated['amount'], 
                $validated['date'],
                $user->timezone ?? 'Asia/Jakarta'
            );
            return back()->with('success', 'Money withdrawn from vault!');
        } catch (\Exception $e) {
            return back()->withErrors(['amount' => $e->getMessage()]);
        }
    }
}
