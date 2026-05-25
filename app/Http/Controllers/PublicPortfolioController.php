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

        // Proxy the stream through server to bypass 401 and other Cloudinary delivery issues
        $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');
        return $this->proxyFile($disk, $material->file_path, $material->file_name, 'inline; filename="' . $material->file_name . '"');
    }

    private function proxyFile($disk, $path, $name, $disposition)
    {
        try {
            $content = Storage::disk($disk)->get($path);
            
            if (is_string($content) && (str_starts_with($content, 'http://') || str_starts_with($content, 'https://'))) {
                $response = \Illuminate\Support\Facades\Http::get($content);
                if ($response->successful()) {
                    $content = $response->body();
                } else {
                    return redirect($content); 
                }
            }

            $mime = 'application/pdf'; // Most coursework is PDF, fallback to PDF
            try {
                $mime = Storage::disk($disk)->mimeType($path) ?: 'application/pdf';
            } catch (\Exception $e) {}

            return response($content)
                ->header('Content-Type', $mime)
                ->header('Content-Disposition', $disposition)
                ->header('Cache-Control', 'private, max-age=3600');

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("Public Proxy failed for {$path}: " . $e->getMessage());
            abort(404, 'File could not be streamed.');
        }
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
        
        // Use proxy for download too to ensure it works with Cloudinary
        $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');
        $fileName = basename($path);
        return $this->proxyFile($disk, $path, $fileName, 'attachment; filename="' . $fileName . '"');
    }
}
