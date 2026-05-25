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

        // If it's a valid URL (like Cloudinary absolute URL), redirect to it directly
        if (filter_var($material->file_path, FILTER_VALIDATE_URL)) {
            return redirect($material->file_path);
        }

        // Otherwise try local storage (fallback for local dev)
        if (Storage::disk('local')->exists($material->file_path)) {
            return response()->file(storage_path('app/' . $material->file_path), [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline; filename="' . $material->file_name . '"'
            ]);
        }
        
        // If it's stored on Cloudinary but returned as a public ID
        try {
            // Manual construction to bypass broken SDK
            $cloudName = env('CLOUDINARY_CLOUD_NAME', 'dxbgpakk1');
            return redirect("https://res.cloudinary.com/{$cloudName}/image/upload/{$material->file_path}");
        } catch (\Exception $e) {
            // Ignore
        }

        abort(404, 'File not found or not accessible.');
    }

    public function downloadFile(\Illuminate\Http\Request $request, string $username)
    {
        $path = $request->query('path');
        if (!$path) abort(404);
        
        if (!str_starts_with($path, 'secure_study/')) {
            abort(403, 'Unauthorized access.');
        }

        $user = User::where('username', strtolower($username))->firstOrFail();
        
        $materials = StudyMaterial::where('user_id', $user->id)
            ->get();
            
        $found = false;
        foreach ($materials as $m) {
            $ctx = is_string($m->context_data) ? json_decode($m->context_data, true) : ($m->context_data ?? []);
            $art = is_string($m->artifact_data) ? json_decode($m->artifact_data, true) : ($m->artifact_data ?? []);
            foreach (array_merge((array)$ctx, (array)$art) as $item) {
                if (isset($item['type']) && $item['type'] === 'file' && $item['path'] === $path) {
                    $found = true;
                    break 2;
                }
            }
        }
        
        if (!$found) abort(404, 'File not found or not accessible.');
        
        if (Storage::disk('local')->exists($path)) {
            return response()->download(storage_path('app/' . $path));
        }
        
        abort(404, 'File not found on disk.');
    }
}
