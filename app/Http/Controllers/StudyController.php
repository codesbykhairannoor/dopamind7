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
        $materials = StudyMaterial::where('user_id', $user->id)
            ->orderBy('semester', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        $competency = StudyCompetency::where('user_id', $user->id)->first();

        // Calculate IPK and Group by Semester
        $totalSks = 0;
        $totalPoints = 0;
        $materialsBySemester = [];

        foreach ($materials as $m) {
            $sem = $m->semester ?: 1;
            if (!isset($materialsBySemester[$sem])) {
                $materialsBySemester[$sem] = [
                    'semester' => $sem,
                    'total_sks' => 0,
                    'total_points' => 0,
                    'ips' => 0,
                    'materials' => []
                ];
            }

            $materialsBySemester[$sem]['materials'][] = $m;

            if ($m->grade !== null && $m->sks > 0) {
                $sks = $m->sks;
                $gradePoint = 0;
                if ($m->grade >= 85) $gradePoint = 4.0;
                elseif ($m->grade >= 70) $gradePoint = 3.0;
                elseif ($m->grade >= 60) $gradePoint = 2.0;
                elseif ($m->grade >= 50) $gradePoint = 1.0;

                $points = $sks * $gradePoint;
                $totalSks += $sks;
                $totalPoints += $points;
                
                $materialsBySemester[$sem]['total_sks'] += $sks;
                $materialsBySemester[$sem]['total_points'] += $points;
            }
        }

        foreach ($materialsBySemester as &$semData) {
            if ($semData['total_sks'] > 0) {
                $semData['ips'] = round($semData['total_points'] / $semData['total_sks'], 2);
            }
        }

        krsort($materialsBySemester);
        $groupedMaterials = array_values($materialsBySemester);
        $ipk = $totalSks > 0 ? round($totalPoints / $totalSks, 2) : 0;
        $currentSemester = count($materialsBySemester) > 0 ? max(array_keys($materialsBySemester)) : 1;

        return Inertia::render('Study/Index', [
            'materials' => $materials,
            'groupedMaterials' => $groupedMaterials,
            'academicStats' => [
                'ipk' => $ipk,
                'total_sks' => $totalSks,
                'current_semester' => $currentSemester
            ],
            'competency' => $competency,
            'user' => [
                'name' => $user->name,
                'username' => $user->username,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'course_name' => 'required|string|max:255',
            'semester' => 'required|integer|min:1|max:14',
            'sks' => 'required|integer|min:1|max:10',
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
            'semester' => $request->semester,
            'sks' => $request->sks,
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
