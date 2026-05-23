<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\StudyMaterial;
use App\Models\StudyCompetency;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicPortfolioController extends Controller
{
    public function show(string $username)
    {
        $user = User::where('username', strtolower($username))->firstOrFail();
        
        $competency = StudyCompetency::where('user_id', $user->id)->first();
        
        $materials = StudyMaterial::where('user_id', $user->id)
            ->where('status', 'completed')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('PublicPortfolio/Show', [
            'student' => [
                'name' => $user->name,
                'username' => $user->username,
                'avatar_url' => $user->avatar_url,
            ],
            'competency' => $competency,
            'materials' => $materials,
        ]);
    }

    public function showCard(string $username, int $id)
    {
        $user = User::where('username', strtolower($username))->firstOrFail();
        
        // Anti-crossover check: Ensure the study material belongs to this user and is completed
        $material = StudyMaterial::where('user_id', $user->id)
            ->where('id', $id)
            ->where('status', 'completed')
            ->firstOrFail();

        $competency = StudyCompetency::where('user_id', $user->id)->first();
        
        $materials = StudyMaterial::where('user_id', $user->id)
            ->where('status', 'completed')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('PublicPortfolio/ShowCard', [
            'student' => [
                'name' => $user->name,
                'username' => $user->username,
                'avatar_url' => $user->avatar_url,
            ],
            'competency' => $competency,
            'material' => $material,
            'materials' => $materials,
        ]);
    }

    public function streamFile(string $username, int $id)
    {
        $user = User::where('username', strtolower($username))->firstOrFail();
        
        $material = StudyMaterial::where('user_id', $user->id)
            ->where('id', $id)
            ->where('status', 'completed')
            ->firstOrFail();

        if (!Storage::disk('local')->exists($material->file_path)) {
            abort(404, 'File not found in secure storage.');
        }

        // Return inline PDF response
        return response()->file(storage_path('app/' . $material->file_path), [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $material->file_name . '"'
        ]);
    }
}
