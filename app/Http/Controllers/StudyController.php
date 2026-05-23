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
            ->orderBy('created_at', 'desc')
            ->get();

        $competency = StudyCompetency::where('user_id', $user->id)->first();

        return Inertia::render('Study/Index', [
            'materials' => $materials,
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
            $contextData = [];
            $artifactData = [];
            $aggregatedContextText = '';
            $aggregatedArtifactText = '';

            // PROCESS CONTEXTS
            if ($request->hasFile('context_files')) {
                foreach ($request->file('context_files') as $file) {
                    $res = $this->processFile($file);
                    $contextData[] = [
                        'type' => 'file',
                        'name' => $res['name'],
                        'path' => $res['path']
                    ];
                    $aggregatedContextText .= $res['text'] . "\n\n";
                }
            }
            if ($request->filled('context_link')) {
                $link = $request->context_link;
                $text = $this->processLink($link);
                $contextData[] = ['type' => 'link', 'url' => $link];
                $aggregatedContextText .= $text . "\n\n";
            }
            if ($request->filled('context_text')) {
                $contextData[] = ['type' => 'text', 'content' => substr($request->context_text, 0, 100)];
                $aggregatedContextText .= $request->context_text . "\n\n";
            }

            // PROCESS ARTIFACTS
            if ($request->hasFile('artifact_files')) {
                foreach ($request->file('artifact_files') as $file) {
                    $res = $this->processFile($file);
                    $artifactData[] = [
                        'type' => 'file',
                        'name' => $res['name'],
                        'path' => $res['path']
                    ];
                    $aggregatedArtifactText .= $res['text'] . "\n\n";
                }
            }
            if ($request->filled('artifact_link')) {
                $link = $request->artifact_link;
                $text = $this->processLink($link);
                $artifactData[] = ['type' => 'link', 'url' => $link];
                $aggregatedArtifactText .= $text . "\n\n";
            }
            if ($request->filled('artifact_text')) {
                $artifactData[] = ['type' => 'text', 'content' => substr($request->artifact_text, 0, 100)];
                $aggregatedArtifactText .= $request->artifact_text . "\n\n";
            }

            $material->context_data = $contextData;
            $material->artifact_data = $artifactData;
            $material->extracted_text = "--- CONTEXT ---\n" . substr($aggregatedContextText, 0, 20000) . "\n\n--- ARTIFACT ---\n" . substr($aggregatedArtifactText, 0, 20000);

            // DYNAMIC ML USING PYTHON WITH GEMINI FALLBACK
            $metadata = null;
            try {
                $pythonOutput = $this->runPython([
                    base_path('python_pipeline/pipeline.py'),
                    '--action',
                    'predict'
                ], $aggregatedContextText . "\n" . $aggregatedArtifactText);
                
                $parsed = json_decode($pythonOutput, true);
                if (isset($parsed['competencies']) && isset($parsed['archetypes'])) {
                    $metadata = $parsed;
                    $metadata['source'] = 'python_ml';
                } else {
                    throw new \Exception("Invalid output format from Python ML.");
                }
            } catch (\Throwable $e) {
                // Fallback to Gemini if Python fails or is not available
                Log::warning("Python ML failed, falling back to Gemini API: " . $e->getMessage());
                $metadata = $this->geminiService->analyzeCourseworkCompetencies($aggregatedContextText, $aggregatedArtifactText, $request->course_name);
                $metadata['source'] = 'gemini_api';
            }

            $material->metadata = $metadata;
            $material->status = 'completed';
            $material->save();

            // Recalculate User Competency
            $this->recalculateCompetencies($user->id);

            return redirect()->back()->with('success', 'Coursework parsed successfully.');

        } catch (\Throwable $e) {
            Log::error("Failed processing study material ID {$material->id}: " . $e->getMessage());
            $material->status = 'failed';
            $material->save();

            return redirect()->back()->withErrors(['course_name' => 'Failed to process documents: ' . $e->getMessage()]);
        }
    }

    private function processFile($file)
    {
        $fileName = $file->getClientOriginalName();
        $ext = strtolower($file->getClientOriginalExtension());
        $fullPath = $file->getRealPath();

        try {
            $path = $file->store('secure_study', 'cloudinary');
        } catch (\Exception $e) {
            $path = $file->store('secure_study', 'local');
        }

        $text = '';
        if ($ext === 'docx') {
            $text = $this->extractDocxText($fullPath);
        } elseif ($ext === 'pptx') {
            $text = $this->extractPptxText($fullPath);
        }

        if (empty($text)) {
            try {
                $pythonOutput = $this->runPython([
                    base_path('python_pipeline/pipeline.py'),
                    '--action',
                    'extract',
                    '--file',
                    $fullPath
                ]);
                $outputJson = json_decode($pythonOutput, true);
                if (isset($outputJson['text'])) {
                    $text = $outputJson['text'];
                }
            } catch (\Throwable $e) {
                if ($ext === 'pdf') {
                    $base64 = base64_encode(file_get_contents($fullPath));
                    $text = $this->geminiService->extractResumeText($base64);
                }
            }
        }
        
        return ['name' => $fileName, 'path' => $path, 'text' => $text];
    }

    private function processLink($url)
    {
        $text = "Link: $url\n";
        if (str_contains($url, 'github.com')) {
            try {
                $parsed = parse_url($url);
                $parts = explode('/', trim($parsed['path'] ?? '', '/'));
                if (count($parts) >= 2) {
                    $owner = $parts[0];
                    $repo = preg_replace('/\.git$/', '', $parts[1]);
                    $client = new \GuzzleHttp\Client(['timeout' => 8.0]);
                    
                    try {
                        $response = $client->get("https://raw.githubusercontent.com/{$owner}/{$repo}/main/README.md");
                    } catch (\Throwable $e) {
                        $response = $client->get("https://raw.githubusercontent.com/{$owner}/{$repo}/master/README.md");
                    }
                    $text .= $response->getBody()->getContents();
                }
            } catch (\Throwable $e) {}
        }
        return $text;
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $material = StudyMaterial::where('user_id', $user->id)->findOrFail($id);

        // Delete file from disk
        if (Storage::disk('local')->exists($material->file_path)) {
            Storage::disk('local')->delete($material->file_path);
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

    private function recalculateCompetencies($userId)
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

        // Average and slight boost based on frequency
        $count = $materials->count();
        foreach ($aggCompetencies as $k => $v) {
            $aggCompetencies[$k] = min(100, round(($v / $count) * 1.3)); // Boost to reward consistency
        }
        foreach ($aggArchetypes as $k => $v) {
            $aggArchetypes[$k] = min(100, round(($v / $count) * 1.3));
        }

        arsort($aggCompetencies);
        arsort($aggArchetypes);

        $topField = !empty($fieldsOfStudy) ? array_count_values($fieldsOfStudy) : ['General Studies' => 1];
        arsort($topField);
        $primaryField = array_key_first($topField);

        $competency = StudyCompetency::firstOrNew(['user_id' => $userId]);
        $competency->competencies = array_slice($aggCompetencies, 0, 6, true);
        $competency->archetypes = array_slice($aggArchetypes, 0, 3, true);
        $competency->verdict = "Dynamic profile calculated. Primary field of study: {$primaryField}. Extracted from {$count} coursework materials.";
        $competency->save();
    }

    private function runPython(array $args, ?string $stdinInput = null): string
    {
        $pythonCmds = ['python', 'python3', 'py'];
        $lastException = null;

        foreach ($pythonCmds as $cmd) {
            try {
                $command = array_merge([$cmd], $args);
                
                if ($stdinInput !== null) {
                    $process = Process::input($stdinInput)->run($command);
                } else {
                    $process = Process::run($command);
                }

                if ($process->successful()) {
                    return $process->output();
                }
                
                $lastException = new \Exception("Process exited with code " . $process->exitCode() . ": " . $process->errorOutput());
            } catch (\Throwable $e) {
                $lastException = $e;
            }
        }

        throw $lastException ?: new \Exception("Could not execute python script.");
    }

    private function extractDocxText($filePath)
    {
        $text = '';
        $zip = new \ZipArchive;
        if ($zip->open($filePath) === true) {
            if (($index = $zip->locateName('word/document.xml')) !== false) {
                $data = $zip->getFromIndex($index);
                $xml = new \DOMDocument();
                $xml->loadXML($data, LIBXML_NOENT | LIBXML_XINCLUDE | LIBXML_NOERROR | LIBXML_NOWARNING);
                $text = strip_tags($xml->saveXML());
            }
            $zip->close();
        }
        return trim($text);
    }

    private function extractPptxText($filePath)
    {
        $text = '';
        $zip = new \ZipArchive;
        if ($zip->open($filePath) === true) {
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $name = $zip->getNameIndex($i);
                if (preg_match('/^ppt\/slides\/slide[0-9]+\.xml$/i', $name)) {
                    $data = $zip->getFromIndex($i);
                    $xml = new \DOMDocument();
                    $xml->loadXML($data, LIBXML_NOENT | LIBXML_XINCLUDE | LIBXML_NOERROR | LIBXML_NOWARNING);
                    $text .= strip_tags($xml->saveXML()) . " \n";
                }
            }
            $zip->close();
        }
        return trim($text);
    }
}
