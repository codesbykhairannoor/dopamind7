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
            'current_semester' => 'nullable|integer|min:1|max:20'
        ]);

        $user = Auth::user();
        $settings = $user->settings ?? [];
        $settings['education_level'] = $request->education_level;
        $settings['major'] = $request->major;
        $settings['student_id'] = $request->student_id;
        $settings['current_semester'] = $request->current_semester;
        $user->settings = $settings;
        $user->save();

        return redirect()->back();
    }

    public function academicIndex()
    {
        $user = Auth::user();
        $academicRecords = \App\Models\AcademicRecord::with('archives')
            ->where('user_id', $user->id)
            ->orderBy('semester', 'desc')
            ->get();

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
                if ($record->grade >= 85) $gradePoint = 4.0;
                elseif ($record->grade >= 70) $gradePoint = 3.0;
                elseif ($record->grade >= 60) $gradePoint = 2.0;
                elseif ($record->grade >= 50) $gradePoint = 1.0;

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
            ],
        ]);
    }

    public function storeAcademicRecord(Request $request)
    {
        $request->validate([
            'course_name' => 'required|string|max:255',
            'semester' => 'required|integer|min:1|max:14',
            'sks' => 'required|integer|min:1|max:10',
            'grade' => 'nullable|numeric|min:0|max:100',
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
            'grade' => 'nullable|numeric|min:0|max:100',
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

    public function destroySemester($semester)
    {
        \App\Models\AcademicRecord::where('user_id', Auth::id())
            ->where('semester', $semester)
            ->delete();

        return redirect()->back();
    }

    public function destroyAcademicRecord($id)
    {
        $record = \App\Models\AcademicRecord::where('user_id', Auth::id())->findOrFail($id);
        
        // Also delete associated physical files
        foreach ($record->archives as $archive) {
            if ($archive->file_path && \Illuminate\Support\Facades\Storage::disk('public')->exists($archive->file_path)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($archive->file_path);
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

        // Ensure user owns the record
        $record = \App\Models\AcademicRecord::where('user_id', Auth::id())->findOrFail($request->academic_record_id);

        $fileName = null;
        $filePath = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $filePath = $file->store('academic_archives', 'public');
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

    public function destroyAcademicArchive($id)
    {
        $archive = \App\Models\AcademicArchive::findOrFail($id);
        
        // Ensure user owns the parent record
        $record = \App\Models\AcademicRecord::where('user_id', Auth::id())->findOrFail($archive->academic_record_id);

        if ($archive->file_path && \Illuminate\Support\Facades\Storage::disk('public')->exists($archive->file_path)) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($archive->file_path);
        }

        $archive->delete();
        return redirect()->back();
    }

    public function store(Request $request)
    {
        $request->validate([
            'course_name' => 'required|string|max:255',
            'week' => 'nullable|string|max:100',
            'grade' => 'nullable|numeric|min:0|max:100',
            'context_files.*' => 'nullable|file|mimes:pdf,docx,pptx|max:10240',
            'context_link' => 'nullable|url|max:2083',
            'context_text' => 'nullable|string|max:5000',
            'artifact_files.*' => 'nullable|file|mimes:pdf,docx,pptx|max:10240',
            'artifact_link' => 'nullable|url|max:2083',
            'artifact_text' => 'nullable|string|max:5000',
        ]);

        $user = Auth::user();
        
        // Enforce maximum 6 coursework materials limit
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

            if ($request->hasFile('context_files')) {
                foreach ($request->file('context_files') as $file) {
                    $path = $file->store('secure_study', 'local');
                    $filesData['context_files'][] = [
                        'name' => $file->getClientOriginalName(), 
                        'path' => $path, 
                        'ext' => strtolower($file->getClientOriginalExtension())
                    ];
                }
            }
            
            if ($request->hasFile('artifact_files')) {
                foreach ($request->file('artifact_files') as $file) {
                    $path = $file->store('secure_study', 'local');
                    $filesData['artifact_files'][] = [
                        'name' => $file->getClientOriginalName(), 
                        'path' => $path, 
                        'ext' => strtolower($file->getClientOriginalExtension())
                    ];
                }
            }

            $textData = [
                'context_link' => $request->context_link,
                'context_text' => $request->context_text,
                'artifact_link' => $request->artifact_link,
                'artifact_text' => $request->artifact_text,
            ];

            // Dispatch Background Job
            \App\Jobs\ProcessCoursework::dispatch($material->id, $filesData, $textData);

            // Save display settings if provided
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

        // Delete modern files
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
                    if (Storage::disk('cloudinary')->exists($item['path'])) {
                        Storage::disk('cloudinary')->delete($item['path']);
                    } elseif (Storage::disk('local')->exists($item['path'])) {
                        Storage::disk('local')->delete($item['path']);
                    }
                } catch (\Exception $e) {}
            }
        }

        $material->delete();

        // Recalculate
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
        $request->validate([
            'show_radar' => 'required|boolean',
            'show_archetypes' => 'required|boolean',
            'show_materials' => 'required|boolean',
            'career_target' => 'nullable|string|max:100',
            'show_career_target' => 'required|boolean',
        ]);

        $competency = StudyCompetency::firstOrCreate(['user_id' => $user->id]);
        $competency->settings = [
            'show_radar' => (bool) $request->show_radar,
            'show_archetypes' => (bool) $request->show_archetypes,
            'show_materials' => (bool) $request->show_materials,
            'career_target' => $request->career_target,
            'show_career_target' => (bool) $request->show_career_target,
        ];
        $competency->save();

        return redirect()->back()->with('success', 'Study profile settings updated.');
    }

    public function recalculateCompetencies($userId)
    {
        $materials = StudyMaterial::where('user_id', $userId)
            ->where('status', 'completed')
            ->get();

        if ($materials->isEmpty()) {
            StudyCompetency::where('user_id', $userId)->delete();
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
        $competency->verdict = "Profil dinamik telah dikalkulasi. Bidang studi utama: {$primaryField}. Diekstrak secara otomatis dari {$count} dokumen tugas/coursework.";
        $competency->save();
    }
}
