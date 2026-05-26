<?php

namespace App\Http\Controllers;

use App\Models\StudyMaterial;
use App\Models\StudyCompetency;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StudyController extends Controller
{
    public function __construct(protected GeminiService $geminiService)
    {
    }

    public function index()
    {
        $user = Auth::user();
        return Inertia::render('Study/Index', [
            'user' => [
                'name' => $user->name,
                'username' => $user->username,
            ]
        ]);
    }

    public function academicSetup(Request $request)
    {
        $request->validate([
            'education_level' => 'required|string|in:kuliah,sma,smp,sd,lainnya',
            'major' => 'nullable|string|max:255',
            'student_id' => 'nullable|string|max:255',
            'current_semester' => 'nullable|integer|min:1|max:20',
            'custom_term' => 'nullable|string|max:50'
        ]);

        $user = Auth::user();
        $settings = $user->settings ?? [];
        $settings['education_level'] = $request->education_level;
        $settings['major'] = $request->major;
        $settings['student_id'] = $request->student_id;
        $settings['current_semester'] = $request->current_semester;
        $settings['custom_term'] = $request->custom_term;
        $user->settings = $settings;
        $user->save();

        return redirect()->back();
    }

    public function academicIndex()
    {
        $user = Auth::user();
        $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');
        
        $academicRecords = \App\Models\AcademicRecord::with('archives')
            ->where('user_id', $user->id)
            ->orderBy('semester', 'desc')
            ->get()
            ->map(function ($record) use ($disk) {
                $record->archives->map(function ($archive) use ($disk) {
                    if ($archive->file_path) {
                        if (!str_starts_with($archive->file_path, 'http://') && !str_starts_with($archive->file_path, 'https://')) {
                            // Let the download route handle serving the file
                            // so we don't expose raw storage URLs that might 401 for PDFs
                        }
                    }
                    return $archive;
                });
                return $record;
            });

        $totalSks = 0;
        $totalPoints = 0;
        $semesters = [];

        foreach ($academicRecords as $record) {
            $sem = $record->semester ?: 1;
            if (!isset($semesters[$sem])) {
                $semesters[$sem] = [
                    'semester' => $sem,
                    'total_sks' => 0,
                    'total_points' => 0,
                    'ips' => 0,
                ];
            }

            if ($record->grade !== null && $record->sks > 0) {
                $sks = $record->sks;
                $gradePoint = 0;
                $gradeUpper = strtoupper(trim($record->grade));
                if (is_numeric($gradeUpper)) {
                    $gradeNumeric = floatval($gradeUpper);
                    if ($gradeNumeric >= 85) $gradePoint = 4.0;
                    elseif ($gradeNumeric >= 70) $gradePoint = 3.0;
                    elseif ($gradeNumeric >= 60) $gradePoint = 2.0;
                    elseif ($gradeNumeric >= 50) $gradePoint = 1.0;
                } else {
                    if ($gradeUpper === 'A+' || $gradeUpper === 'A') $gradePoint = 4.0;
                    elseif ($gradeUpper === 'A-') $gradePoint = 3.7;
                    elseif ($gradeUpper === 'B+') $gradePoint = 3.3;
                    elseif ($gradeUpper === 'B') $gradePoint = 3.0;
                    elseif ($gradeUpper === 'B-') $gradePoint = 2.7;
                    elseif ($gradeUpper === 'C+') $gradePoint = 2.3;
                    elseif ($gradeUpper === 'C') $gradePoint = 2.0;
                    elseif ($gradeUpper === 'D') $gradePoint = 1.0;
                    else $gradePoint = 0.0;
                }

                $points = $sks * $gradePoint;
                $totalSks += $sks;
                $totalPoints += $points;
                
                $semesters[$sem]['total_sks'] += $sks;
                $semesters[$sem]['total_points'] += $points;
            }
        }

        foreach ($semesters as &$semData) {
            if ($semData['total_sks'] > 0) {
                $semData['ips'] = round($semData['total_points'] / $semData['total_sks'], 2);
            }
        }

        krsort($semesters);
        $ipk = $totalSks > 0 ? round($totalPoints / $totalSks, 2) : 0;
        $currentSemester = count($semesters) > 0 ? max(array_keys($semesters)) : 1;

        return Inertia::render('Study/Academic/Index', [
            'academicRecords' => $academicRecords,
            'academicStats' => [
                'ipk' => $ipk,
                'total_sks' => $totalSks,
                'current_semester' => $currentSemester,
                'semesters' => array_values($semesters)
            ],
            'user' => [
                'name' => $user->name,
                'username' => $user->username,
                'settings' => $user->settings,
            ],
        ]);
    }

    public function portfolioIndex()
    {
        $user = Auth::user();
        $materials = StudyMaterial::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
        $competency = StudyCompetency::where('user_id', $user->id)->first();

        return Inertia::render('Study/Portfolio/Index', [
            'materials' => $materials,
            'competency' => $competency,
            'user' => [
                'name' => $user->name,
                'username' => $user->username,
                'settings' => $user->settings,
            ],
        ]);
    }

    public function update(Request $request, StudyMaterial $material)
    {
        if ($material->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'course_name' => 'required|string|max:255',
            'week' => 'nullable|string|max:255',
            'grade' => 'nullable|numeric|min:0|max:100',
            'context_link' => 'nullable|url|max:2083',
            'context_link_name' => 'nullable|string|max:255',
            'context_text' => 'nullable|string|max:5000',
            'artifact_link' => 'nullable|url|max:2083',
            'artifact_link_name' => 'nullable|string|max:255',
            'artifact_text' => 'nullable|string|max:5000',
            'show_radar' => 'boolean',
            'show_archetypes' => 'boolean',
            'show_materials' => 'boolean',
            'show_career_target' => 'boolean',
            'career_target' => 'nullable|string|max:255',
        ]);

        $material->update([
            'course_name' => $request->course_name,
            'week' => $request->week,
            'grade' => $request->grade,
        ]);

        $contextData = $material->context_data ?? [];
        if (!is_array($contextData)) {
            $contextData = is_string($contextData) ? json_decode($contextData, true) : [];
        }
        
        $artifactData = $material->artifact_data ?? [];
        if (!is_array($artifactData)) {
            $artifactData = is_string($artifactData) ? json_decode($artifactData, true) : [];
        }

        // Handle File Deletions
        if ($request->has('delete_files')) {
            $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');
            foreach ($request->delete_files as $del) {
                // Delete from context_data
                if (isset($contextData['files'])) {
                    foreach ($contextData['files'] as $key => $file) {
                        if ($file['path'] === $del) {
                            try { Storage::disk($disk)->delete($del); } catch (\Exception $e) {}
                            unset($contextData['files'][$key]);
                        }
                    }
                    $contextData['files'] = array_values($contextData['files']);
                }
                // Delete from artifact_data
                if (isset($artifactData['files'])) {
                    foreach ($artifactData['files'] as $key => $file) {
                        if ($file['path'] === $del) {
                            try { Storage::disk($disk)->delete($del); } catch (\Exception $e) {}
                            unset($artifactData['files'][$key]);
                        }
                    }
                    $artifactData['files'] = array_values($artifactData['files']);
                }
            }
        }

        // Handle New File Uploads
        $disk = config('filesystems.default');
        if ($request->hasFile('context_files')) {
            if (!isset($contextData['files'])) $contextData['files'] = [];
            foreach ($request->file('context_files') as $file) {
                $path = $file->store('secure_study', $disk);
                $contextData['files'][] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'ext' => strtolower($file->getClientOriginalExtension())
                ];
            }
        }
        if ($request->hasFile('artifact_files')) {
            if (!isset($artifactData['files'])) $artifactData['files'] = [];
            foreach ($request->file('artifact_files') as $file) {
                $path = $file->store('secure_study', $disk);
                $artifactData['files'][] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'ext' => strtolower($file->getClientOriginalExtension())
                ];
            }
        }

        $contextData['link'] = $request->context_link;
        $contextData['link_name'] = $request->context_link_name;
        $contextData['text'] = $request->context_text;
        $material->context_data = $contextData;

        $artifactData['link'] = $request->artifact_link;
        $artifactData['link_name'] = $request->artifact_link_name;
        $artifactData['text'] = $request->artifact_text;
        $material->artifact_data = $artifactData;

        $material->save();

        // If new files were uploaded, we might want to re-process (Optional, but good for UX)
        if ($request->hasFile('context_files') || $request->hasFile('artifact_files')) {
            $material->status = 'processing';
            $material->save();
            
            $filesData = ['context_files' => [], 'artifact_files' => []];
            // Re-map current files for the job
            foreach (($contextData['files'] ?? []) as $f) {
                if (!isset($f['ext'])) $f['ext'] = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
                $filesData['context_files'][] = $f;
            }
            foreach (($artifactData['files'] ?? []) as $f) {
                if (!isset($f['ext'])) $f['ext'] = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
                $filesData['artifact_files'][] = $f;
            }

            $textData = [
                'context_link' => $request->context_link,
                'context_link_name' => $request->context_link_name,
                'context_text' => $request->context_text,
                'artifact_link' => $request->artifact_link,
                'artifact_link_name' => $request->artifact_link_name,
                'artifact_text' => $request->artifact_text,
            ];
            // Background process will be triggered client-side via /process endpoint
        } else {
            $this->recalculateCompetencies($material->user_id);
        }

        $user = Auth::user();
        $settings = $user->settings ?? [];
        $settings['show_radar'] = $request->boolean('show_radar');
        $settings['show_archetypes'] = $request->boolean('show_archetypes');
        $settings['show_materials'] = $request->boolean('show_materials');
        $settings['show_career_target'] = $request->boolean('show_career_target');
        $settings['career_target'] = $request->career_target;
        
        $user->settings = $settings;
        $user->save();

        return back()->with('success', 'Material processed successfully.');
    }

    public function processMaterial(Request $request, $id)
    {
        $user = \Illuminate\Support\Facades\Auth::user();
        $material = \App\Models\StudyMaterial::where('user_id', $user->id)->findOrFail($id);
        
        $filesData = ['context_files' => [], 'artifact_files' => []];
        $contextData = $material->context_data ?? [];
        $artifactData = $material->artifact_data ?? [];

        foreach (($contextData['files'] ?? []) as $f) {
            if (!isset($f['ext'])) $f['ext'] = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
            $filesData['context_files'][] = $f;
        }
        foreach (($artifactData['files'] ?? []) as $f) {
            if (!isset($f['ext'])) $f['ext'] = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
            $filesData['artifact_files'][] = $f;
        }

        $textData = [
            'context_link' => $contextData['link'] ?? null,
            'context_link_name' => $contextData['link_name'] ?? null,
            'context_text' => $contextData['text'] ?? null,
            'artifact_link' => $artifactData['link'] ?? null,
            'artifact_link_name' => $artifactData['link_name'] ?? null,
            'artifact_text' => $artifactData['text'] ?? null,
        ];

        \App\Jobs\ProcessCoursework::dispatchSync($material->id, $filesData, $textData);

        return response()->json(['success' => true, 'status' => $material->fresh()->status]);
    }

    public function storeAcademicRecord(Request $request)
    {
        $request->validate([
            'course_name' => 'required|string|max:255',
            'semester' => 'required|integer|min:1|max:14',
            'sks' => 'required|integer|min:1|max:10',
            'grade' => 'nullable|string|max:50',
        ]);

        \App\Models\AcademicRecord::create([
            'user_id' => Auth::id(),
            'course_name' => $request->course_name,
            'semester' => $request->semester,
            'sks' => $request->sks,
            'grade' => $request->grade,
        ]);

        return redirect()->back();
    }

    
    public function updateAcademicRecord(Request $request, $id)
    {
        $request->validate([
            'course_name' => 'required|string|max:255',
            'semester' => 'required|integer|min:1|max:100',
            'sks' => 'required|integer|min:1|max:10',
            'grade' => 'nullable|string|max:50',
        ]);

        $record = \App\Models\AcademicRecord::where('user_id', Auth::id())->findOrFail($id);
        $record->update([
            'course_name' => $request->course_name,
            'semester' => $request->semester,
            'sks' => $request->sks,
            'grade' => $request->grade,
        ]);

        return redirect()->back();
    }

    public function destroySemester(Request $request, $semester)
    {
        $user = Auth::user();
        $semester = intval($semester);
        
        \Log::info("Deleting semester {$semester} for user {$user->id}");

        $records = \App\Models\AcademicRecord::with('archives')
            ->where('user_id', $user->id)
            ->where('semester', $semester)
            ->get();

        $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');

        foreach ($records as $record) {
            foreach ($record->archives as $archive) {
                if ($archive->file_path && \Illuminate\Support\Facades\Storage::disk($disk)->exists($archive->file_path)) {
                    \Illuminate\Support\Facades\Storage::disk($disk)->delete($archive->file_path);
                }
            }
            $record->delete();
        }

        $settings = $user->settings ?? [];
        $currentSem = isset($settings['current_semester']) ? intval($settings['current_semester']) : 1;

        if ($semester >= $currentSem) {
            $maxRemaining = \App\Models\AcademicRecord::where('user_id', $user->id)
                ->where('semester', '!=', $semester)
                ->max('semester');
            
            $newSem = $maxRemaining ? intval($maxRemaining) : max($semester - 1, 1);
            $settings['current_semester'] = $newSem;
            $user->settings = $settings;
            $user->save();
            \Log::info("Updated user current_semester to {$newSem}");
        }

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Semester berhasil dihapus!',
                'current_semester' => $settings['current_semester'] ?? 1
            ]);
        }

        return redirect()->back();
    }

    public function destroyAcademicRecord($id)
    {
        $record = \App\Models\AcademicRecord::where('user_id', Auth::id())->findOrFail($id);
        
        $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');
        foreach ($record->archives as $archive) {
            if ($archive->file_path && \Illuminate\Support\Facades\Storage::disk($disk)->exists($archive->file_path)) {
                \Illuminate\Support\Facades\Storage::disk($disk)->delete($archive->file_path);
            }
        }

        $record->delete();
        return redirect()->back();
    }

    public function storeAcademicArchive(Request $request)
    {
        $request->validate([
            'academic_record_id' => 'required|exists:academic_records,id',
            'file' => 'nullable|file|max:5120',
            'link_url' => 'nullable|url|max:2083',
            'meeting_tag' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:50',
        ]);

        $record = \App\Models\AcademicRecord::where('user_id', Auth::id())->findOrFail($request->academic_record_id);

        $fileName = null;
        $filePath = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');
            $filePath = $file->store('academic_archives', $disk);
        }

        \App\Models\AcademicArchive::create([
            'academic_record_id' => $record->id,
            'file_name' => $fileName,
            'file_path' => $filePath,
            'link_url' => $request->link_url,
            'meeting_tag' => $request->meeting_tag,
            'type' => $request->type ?? 'document',
        ]);

        return redirect()->back();
    }

    public function updateAcademicArchive(Request $request, $id)
    {
        $request->validate([
            'file_name' => 'nullable|string|max:255',
            'link_url' => 'nullable|url|max:2083',
            'meeting_tag' => 'required|string|max:255',
            'type' => 'required|string|max:50',
        ]);

        $archive = \App\Models\AcademicArchive::findOrFail($id);
        $record = \App\Models\AcademicRecord::where('user_id', Auth::id())->findOrFail($archive->academic_record_id);

        $archive->update([
            'file_name' => $request->file_name,
            'link_url' => $request->link_url,
            'meeting_tag' => $request->meeting_tag,
            'type' => $request->type,
        ]);

        return redirect()->back();
    }

    public function destroyAcademicArchive($id)
    {
        $archive = \App\Models\AcademicArchive::findOrFail($id);
        
        $record = \App\Models\AcademicRecord::where('user_id', Auth::id())->findOrFail($archive->academic_record_id);

        $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');
        if ($archive->file_path && \Illuminate\Support\Facades\Storage::disk($disk)->exists($archive->file_path)) {
            \Illuminate\Support\Facades\Storage::disk($disk)->delete($archive->file_path);
        }

        $archive->delete();
        return redirect()->back();
    }

    public function downloadAcademicArchive(Request $request, $id)
    {
        $archive = \App\Models\AcademicArchive::findOrFail($id);
        
        \App\Models\AcademicRecord::where('user_id', Auth::id())->findOrFail($archive->academic_record_id);

        return $this->serveFile($archive->file_path, $archive->file_name, $request->has('view'));
    }

    public function downloadFile(Request $request, StudyMaterial $material, $type, $index)
    {
        if ($material->user_id !== Auth::id()) {
            abort(403);
        }

        $data = $type === 'context' ? $material->context_data : $material->artifact_data;
        if (is_string($data)) {
            $data = json_decode($data, true) ?? [];
        }

        $file = null;
        if (isset($data['files']) && isset($data['files'][$index])) {
            $file = $data['files'][$index];
        } else if (is_array($data) && isset($data[$index]) && isset($data[$index]['type']) && $data[$index]['type'] === 'file') {
            $file = $data[$index];
        }

        if (!$file) {
            abort(404, 'File not found');
        }

        return $this->serveFile($file['path'], $file['name'], $request->has('view'));
    }

    private function serveFile($path, $name, $isView = false)
    {
        if (!$path) abort(404, 'Path is empty');

        $disk = config('filesystems.default') === 'local' ? 'public' : config('filesystems.default');

        try {
            Storage::disk($disk);
        } catch (\Exception $e) {
            Log::warning("Disk {$disk} configuration error, falling back to public.");
            $disk = 'public';
        }

        if (str_starts_with($path, 'http')) {
            return redirect($path);
        }

        if ($disk === 'cloudinary' || str_contains(env('FILESYSTEM_DISK', ''), 'cloudinary')) {
            $cloudinaryUrl = env('CLOUDINARY_URL', '');
            if (preg_match('/@([^\/]+)/', $cloudinaryUrl, $matches)) {
                $cloudName = $matches[1];
                $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
                
                // Cloudinary uses 'image' for images/pdfs usually, and 'raw' for docs
                $resourceType = in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf']) ? 'image' : 'raw';
                
                // For PDF we might need to specify .pdf, but $path already has it.
                $url = "https://res.cloudinary.com/{$cloudName}/{$resourceType}/upload/{$path}";
                
                if (!$isView) {
                    // Force download using Cloudinary fl_attachment flag
                    $url = "https://res.cloudinary.com/{$cloudName}/{$resourceType}/upload/fl_attachment/{$path}";
                }
                
                return redirect()->away($url);
            }
        }

        if (!Storage::disk($disk)->exists($path)) {
            if ($disk !== 'public' && Storage::disk('public')->exists($path)) {
                $disk = 'public';
            } else {
                abort(404, 'File not found in storage: ' . $path);
            }
        }

        $disposition = ($isView ? 'inline' : 'attachment') . '; filename="' . $name . '"';

        if ($disk === 's3') {
            try {
                $url = Storage::disk($disk)->url($path);
                if (str_starts_with($url, 'http://')) {
                    $url = str_replace('http://', 'https://', $url);
                }
                return redirect()->away($url);
            } catch (\Exception $e) {
                Log::warning("URL generation failed for disk {$disk}: " . $e->getMessage());
            }
        }

        return $this->proxyFile($disk, $path, $name, $disposition);
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

            $mime = Storage::disk($disk)->mimeType($path) ?: 'application/pdf';

            return response($content)
                ->header('Content-Type', $mime)
                ->header('Content-Disposition', $disposition)
                ->header('Cache-Control', 'private, max-age=3600');

        } catch (\Exception $e) {
            Log::error("Proxy failed for {$path}: " . $e->getMessage());
            return redirect(Storage::disk($disk)->url($path));
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'course_name' => 'required|string|max:255',
            'week' => 'nullable|string|max:100',
            'grade' => 'nullable|numeric|min:0|max:100',
            'context_files.*' => 'nullable|file|mimes:pdf,docx,pptx|max:10240',
            'context_link' => 'nullable|url|max:2083',
            'context_link_name' => 'nullable|string|max:255',
            'context_text' => 'nullable|string|max:5000',
            'artifact_files.*' => 'nullable|file|mimes:pdf,docx,pptx|max:10240',
            'artifact_link' => 'nullable|url|max:2083',
            'artifact_link_name' => 'nullable|string|max:255',
            'artifact_text' => 'nullable|string|max:5000',
        ]);

        $user = Auth::user();
        
        $existingCount = StudyMaterial::where('user_id', $user->id)->count();
        if ($existingCount >= 6) {
            return redirect()->back()->withErrors(['course_name' => 'Limit reached. You cannot upload more than 6 coursework cards. Please delete an existing card first.']);
        }

        $material = StudyMaterial::create([
            'user_id' => $user->id,
            'course_name' => $request->course_name,
            'week' => $request->week,
            'grade' => $request->grade,
            'status' => 'processing',
        ]);

        try {
            $filesData = ['context_files' => [], 'artifact_files' => []];

            $disk = config('filesystems.default');

            if ($request->hasFile('context_files')) {
                foreach ($request->file('context_files') as $file) {
                    $path = $file->store('secure_study', $disk);
                    $filesData['context_files'][] = [
                        'name' => $file->getClientOriginalName(), 
                        'path' => $path, 
                        'ext' => strtolower($file->getClientOriginalExtension())
                    ];
                }
            }
            
            if ($request->hasFile('artifact_files')) {
                foreach ($request->file('artifact_files') as $file) {
                    $path = $file->store('secure_study', $disk);
                    $filesData['artifact_files'][] = [
                        'name' => $file->getClientOriginalName(), 
                        'path' => $path, 
                        'ext' => strtolower($file->getClientOriginalExtension())
                    ];
                }
            }

            $textData = [
                'context_link' => $request->context_link,
                'context_link_name' => $request->context_link_name,
                'context_text' => $request->context_text,
                'artifact_link' => $request->artifact_link,
                'artifact_link_name' => $request->artifact_link_name,
                'artifact_text' => $request->artifact_text,
            ];

            // Background process will be triggered client-side via /process endpoint

            if ($request->has('show_radar')) {
                $competency = StudyCompetency::firstOrCreate(['user_id' => $user->id]);
                $competency->settings = [
                    'show_radar' => filter_var($request->show_radar, FILTER_VALIDATE_BOOLEAN),
                    'show_archetypes' => filter_var($request->show_archetypes, FILTER_VALIDATE_BOOLEAN),
                    'show_materials' => filter_var($request->show_materials, FILTER_VALIDATE_BOOLEAN),
                    'career_target' => $request->career_target,
                    'show_career_target' => filter_var($request->show_career_target, FILTER_VALIDATE_BOOLEAN),
                ];
                $competency->save();
            }

            return redirect()->back()->with('success', 'Berhasil diunggah! Sistem sedang menganalisis coursework Anda di latar belakang...');

        } catch (\Throwable $e) {
            Log::error("Failed to queue study material ID {$material->id}: " . $e->getMessage());
            $material->status = 'failed';
            $material->save();

            return redirect()->back()->withErrors(['course_name' => 'Failed to process documents: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $material = StudyMaterial::where('user_id', $user->id)->findOrFail($id);

        $contextData = $material->context_data ?? [];
        if (is_string($contextData)) {
            $contextData = json_decode($contextData, true) ?? [];
        }
        
        $artifactData = $material->artifact_data ?? [];
        if (is_string($artifactData)) {
            $artifactData = json_decode($artifactData, true) ?? [];
        }
        
        $allFiles = array_merge((array)$contextData, (array)$artifactData);
        foreach ($allFiles as $item) {
            if (isset($item['type']) && $item['type'] === 'file' && !empty($item['path'])) {
                try {
                    if (Storage::disk('local')->exists($item['path'])) {
                        Storage::disk('local')->delete($item['path']);
                    }
                } catch (\Exception $e) {}
            }
        }

        $material->delete();

        $this->recalculateCompetencies($user->id);

        return redirect()->back()->with('success', 'Study material deleted.');
    }

    public function updateUsername(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'username' => 'required|string|alpha_dash|min:3|max:30|unique:users,username,' . $user->id,
        ]);

        $user->username = strtolower($request->username);
        $user->save();

        return redirect()->back()->with('success', 'Public profile URL updated.');
    }

    public function updateSettings(Request $request)
    {
        $user = Auth::user();
        
        if ($request->has('current_semester')) {
            $settings = $user->settings ?? [];
            $settings['current_semester'] = intval($request->current_semester);
            $user->settings = $settings;
            $user->save();
            
            if ($request->wantsJson()) {
                return response()->json(['success' => true, 'current_semester' => $settings['current_semester']]);
            }
        }

        $request->validate([
            'show_radar' => 'nullable|boolean',
            'show_archetypes' => 'nullable|boolean',
            'show_materials' => 'nullable|boolean',
            'career_target' => 'nullable|string|max:100',
            'show_career_target' => 'nullable|boolean',
        ]);

        $competency = StudyCompetency::firstOrCreate(['user_id' => $user->id]);
        $compSettings = $competency->settings ?? [];
        
        if ($request->has('show_radar')) $compSettings['show_radar'] = (bool) $request->show_radar;
        if ($request->has('show_archetypes')) $compSettings['show_archetypes'] = (bool) $request->show_archetypes;
        if ($request->has('show_materials')) $compSettings['show_materials'] = (bool) $request->show_materials;
        if ($request->has('career_target')) $compSettings['career_target'] = $request->career_target;
        if ($request->has('show_career_target')) $compSettings['show_career_target'] = (bool) $request->show_career_target;
        
        $competency->settings = $compSettings;
        $competency->save();

        if ($request->wantsJson()) {
            return response()->json(['success' => true]);
        }

        return redirect()->back()->with('success', 'Study profile settings updated.');
    }

    public function recalculateCompetencies($userId)
    {
        $materials = StudyMaterial::where('user_id', $userId)
            ->where('status', 'completed')
            ->get();

        if ($materials->isEmpty()) {
            $competency = StudyCompetency::where('user_id', $userId)->first();
            if ($competency) {
                $competency->competencies = [];
                $competency->archetypes = [];
                $competency->verdict = null;
                $competency->save();
            }
            return;
        }

        $aggCompetencies = [];
        $aggArchetypes = [];
        $fieldsOfStudy = [];

        foreach ($materials as $m) {
            $meta = $m->metadata ?? [];
            if (isset($meta['competencies']) && is_array($meta['competencies'])) {
                foreach ($meta['competencies'] as $comp => $score) {
                    $aggCompetencies[$comp] = ($aggCompetencies[$comp] ?? 0) + $score;
                }
            }
            if (isset($meta['archetypes']) && is_array($meta['archetypes'])) {
                foreach ($meta['archetypes'] as $arch => $score) {
                    $aggArchetypes[$arch] = ($aggArchetypes[$arch] ?? 0) + $score;
                }
            }
            if (isset($meta['field_of_study'])) {
                $fieldsOfStudy[] = $meta['field_of_study'];
            }
        }

        // Average and slight boost based on frequency (flat +1% per material, max +5%)
        $count = $materials->count();
        $bonus = min(5, $count) * 1;
        
        foreach ($aggCompetencies as $k => $v) {
            $score = round(($v / $count) + $bonus);
            $aggCompetencies[$k] = min(98, $score); // Cap at 98%
        }
        foreach ($aggArchetypes as $k => $v) {
            $score = round(($v / $count) + $bonus);
            $aggArchetypes[$k] = min(98, $score); // Cap at 98%
        }

        arsort($aggCompetencies);
        arsort($aggArchetypes);

        $topField = !empty($fieldsOfStudy) ? array_count_values($fieldsOfStudy) : ['General Studies' => 1];
        arsort($topField);
        $primaryField = array_key_first($topField);

        $competency = StudyCompetency::firstOrNew(['user_id' => $userId]);
        $competency->competencies = array_slice($aggCompetencies, 0, 6, true);
        $competency->archetypes = array_slice($aggArchetypes, 0, 3, true);
        $competency->verdict = "Verified student expertise in " . $primaryField . " based on " . $count . " academic artifact(s) audited through IPoW protocol.";
        $competency->save();
    }

    public function submitFeedback(Request $request)
    {
        $request->validate([
            'material_id' => 'required|exists:study_materials,id',
            'correct_category' => 'required|string|max:255',
        ]);

        $user = Auth::user();
        $material = StudyMaterial::where('user_id', $user->id)->findOrFail($request->material_id);
        
        $text = $material->extracted_text ?? '';
        if (empty(trim($text))) {
            return redirect()->back()->withErrors(['feedback' => 'No text available for training.']);
        }

        // Jalankan background retrain.py
        try {
            // Kita jalankan secara async agar tidak memblokir UI
            // Menggunakan command OS bawaan atau Process facade
            $scriptPath = base_path('python_pipeline/retrain.py');
            $command = "python \"{$scriptPath}\" " . escapeshellarg(substr($text, 0, 5000)) . " " . escapeshellarg($request->correct_category);
            
            // Eksekusi asinkronus ke background
            if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                pclose(popen("start /B " . $command . " > NUL 2>&1", "r"));
            } else {
                exec($command . " > /dev/null 2>&1 &");
            }
            
            // Tandai material ini sudah divalidasi
            $metadata = $material->metadata ?? [];
            $metadata['user_validated_archetype'] = $request->correct_category;
            $material->metadata = $metadata;
            $material->save();
            
            Log::info("Continuous Learning feedback submitted for material {$material->id}: {$request->correct_category}");
            
            return redirect()->back()->with('success', 'Koreksi berhasil dikirim! AI sedang belajar dari masukan Anda di latar belakang.');
        } catch (\Exception $e) {
            Log::error("Failed to submit feedback for retrain: " . $e->getMessage());
            return redirect()->back()->withErrors(['feedback' => 'Gagal mengirim koreksi.']);
        }
    }


}
