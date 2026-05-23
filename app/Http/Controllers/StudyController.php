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
        $inputMode = $request->input('input_mode', 'file');

        $rules = [
            'input_mode' => 'required|string|in:file,link,text',
            'type' => 'required|string|in:context,artifact',
            'course_name' => 'required|string|max:255',
            'week' => 'nullable|string|max:50',
            'grade' => 'nullable|numeric|min:0|max:100',
        ];

        if ($inputMode === 'file') {
            $rules['file'] = 'required|file|mimes:pdf|max:10240';
        } elseif ($inputMode === 'link') {
            $rules['embed_url'] = 'required|url|max:2083';
        } elseif ($inputMode === 'text') {
            $rules['rich_text'] = [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $words = preg_split('/\s+/', trim($value));
                    $wordCount = count(array_filter($words));
                    if ($wordCount > 500) {
                        $fail("The reflective text must not exceed 500 words (currently: {$wordCount} words).");
                    }
                }
            ];
        }

        $request->validate($rules);

        $user = Auth::user();
        
        // Enforce maximum 6 coursework materials limit
        $existingCount = StudyMaterial::where('user_id', $user->id)->count();
        if ($existingCount >= 6) {
            $errorField = $inputMode === 'file' ? 'file' : ($inputMode === 'link' ? 'embed_url' : 'rich_text');
            return redirect()->back()->withErrors([$errorField => 'Limit reached. You cannot upload more than 6 coursework cards. Please delete an existing card first.']);
        }

        $fileName = null;
        $path = null;
        $embedUrl = null;
        $richText = null;

        if ($inputMode === 'file') {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            
            try {
                // Use default cloud disk for persistent storage (Cloudinary)
                $path = $file->store('secure_study', 'cloudinary');
            } catch (\Exception $e) {
                Log::warning("Cloudinary storage failed, falling back to local: " . $e->getMessage());
                $path = $file->store('secure_study', 'local');
            }
        } elseif ($inputMode === 'link') {
            $embedUrl = $request->input('embed_url');
            $fileName = parse_url($embedUrl, PHP_URL_HOST) ?: 'External Link';
        } elseif ($inputMode === 'text') {
            $richText = $request->input('rich_text');
            $fileName = 'Text Content';
        }

        $material = StudyMaterial::create([
            'user_id' => $user->id,
            'type' => $request->type,
            'course_name' => $request->course_name,
            'week' => $request->week,
            'file_name' => $fileName,
            'file_path' => $path,
            'grade' => $request->grade,
            'status' => 'processing',
            'embed_url' => $embedUrl,
            'rich_text' => $richText,
        ]);

        // Process Content
        try {
            $extractedText = '';

            if ($inputMode === 'file') {
                // Use the temporary uploaded file directly to bypass Vercel read-only local storage limits
                $fullPath = $request->file('file')->getRealPath();
                $ext = strtolower($request->file('file')->getClientOriginalExtension());

                // Try native PHP extraction first for DOCX/PPTX to bypass Vercel Python limits
                if ($ext === 'docx') {
                    $extractedText = $this->extractDocxText($fullPath);
                } elseif ($ext === 'pptx') {
                    $extractedText = $this->extractPptxText($fullPath);
                }
                
                // If native extraction didn't yield much, or it's a PDF, try Python then Gemini
                if (empty($extractedText)) {
                    try {
                        $pythonOutput = $this->runPython([
                            base_path('python_pipeline/pipeline.py'),
                            '--action',
                            'extract',
                            '--file',
                            $fullPath
                        ]);
                        $outputJson = json_decode($pythonOutput, true);
                        if (isset($outputJson['text']) && !empty($outputJson['text'])) {
                            $extractedText = $outputJson['text'];
                        } else {
                            throw new \Exception("Python extraction returned empty text or error: " . ($outputJson['error'] ?? 'Unknown error'));
                        }
                    } catch (\Throwable $e) {
                        Log::warning("Python extraction failed, falling back to Gemini API: " . $e->getMessage());
                        
                        if ($ext === 'pdf') {
                            // Fallback: Use Gemini Multimodal PDF Reader ONLY for PDF
                            $base64 = base64_encode(file_get_contents($fullPath));
                            $extractedText = $this->geminiService->extractResumeText($base64);
                        }
                        
                        if (empty($extractedText)) {
                            throw new \Exception("All extraction methods failed or returned empty text for this file.");
                        }
                    }
                }
            } elseif ($inputMode === 'text') {
                $extractedText = $richText;
            } elseif ($inputMode === 'link') {
                $scrapedContent = null;
                if (str_contains($embedUrl, 'github.com')) {
                    try {
                        $parsedUrl = parse_url($embedUrl);
                        $path = trim($parsedUrl['path'] ?? '', '/');
                        $parts = explode('/', $path);
                        if (count($parts) >= 2) {
                            $owner = $parts[0];
                            $repo = preg_replace('/\.git$/', '', $parts[1]);

                            $client = new \GuzzleHttp\Client(['timeout' => 8.0]);
                            
                            $readmeUrl = "https://raw.githubusercontent.com/{$owner}/{$repo}/main/README.md";
                            try {
                                $response = $client->get($readmeUrl);
                                $scrapedContent = $response->getBody()->getContents();
                            } catch (\Throwable $e) {
                                $readmeUrl = "https://raw.githubusercontent.com/{$owner}/{$repo}/master/README.md";
                                $response = $client->get($readmeUrl);
                                $scrapedContent = $response->getBody()->getContents();
                            }
                        }
                    } catch (\Throwable $e) {
                        Log::warning("Failed scraping GitHub README for URL {$embedUrl}: " . $e->getMessage());
                    }
                }

                if (!empty($scrapedContent)) {
                    $cleanScraped = substr($scrapedContent, 0, 15000);
                    $promptLink = "You are a professional ML data assistant. A student has submitted a GitHub repository for the course \"{$request->course_name}\". The URL is: {$embedUrl}.\n\nHere is the scraped README.md content from the repository:\n---\n{$cleanScraped}\n---\nBased on this README content, generate a detailed technical summary of the project. Focus on: 1. Programming languages, frameworks, and technologies used. 2. The core concepts, engineering challenges, or algorithms implemented. 3. Specific developer competencies this project demonstrates. Output a professional and concise technical summary paragraph.";
                } else {
                    $promptLink = "You are a professional ML data assistant. A student has submitted a link for the course \"{$request->course_name}\". The URL is: {$embedUrl}. Based on this URL and the course name, generate a summary of the technical skills, programming languages, and concepts that this coursework or syllabus represents. Output a paragraph describing this technical context.";
                }

                $extractedText = $this->geminiService->generate($promptLink) ?: "Course name: {$request->course_name}, link: {$embedUrl}";
            }

            // Save extracted text
            $material->extracted_text = $extractedText;

            // 2. Extract keywords/skills using Gemini
            $prompt = "You are a professional ML feature extractor. Analyze the following course syllabus/laporan text:\n---\n" . substr($extractedText, 0, 50000) . "\n---\nExtract the key technical skills, programming languages, technologies, frameworks, and programming concepts found in the text. Output a clean, valid JSON object containing an array of keywords. Do not include any markdown format or surrounding code blocks (e.g. do not wrap in ```json). Format:\n{\n  \"keywords\": [\"Python\", \"PostgreSQL\", \"Data Pipeline\", \"Docker\"]\n}";

            $geminiResponse = $this->geminiService->generate($prompt);
            $keywords = [];

            if ($geminiResponse) {
                // Clean markdown format if present
                $cleanedResponse = trim($geminiResponse);
                if (str_starts_with($cleanedResponse, '```')) {
                    $cleanedResponse = preg_replace('/^```(?:json)?\s*/', '', $cleanedResponse);
                    $cleanedResponse = preg_replace('/\s*```$/', '', $cleanedResponse);
                }
                $jsonObj = json_decode(trim($cleanedResponse), true);
                if (isset($jsonObj['keywords'])) {
                    $keywords = $jsonObj['keywords'];
                }
            }

            $material->metadata = ['keywords' => $keywords];
            $material->status = 'completed';
            $material->save();

            // 3. Recalculate User Competency and Archetypes
            $this->recalculateCompetencies($user->id);

            return redirect()->back()->with('success', 'Study material uploaded and parsed successfully.');

        } catch (\Throwable $e) {
            Log::error("Failed processing study material ID {$material->id}: " . $e->getMessage());
            $material->status = 'failed';
            $material->save();

            $errorField = $inputMode === 'file' ? 'file' : ($inputMode === 'link' ? 'embed_url' : 'rich_text');
            return redirect()->back()->withErrors([$errorField => 'Failed to process document: ' . $e->getMessage()]);
        }
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
        // Gather all text from completed study materials of this user
        $materials = StudyMaterial::where('user_id', $userId)
            ->where('status', 'completed')
            ->get();

        if ($materials->isEmpty()) {
            // Delete or reset competency profile
            StudyCompetency::where('user_id', $userId)->delete();
            return;
        }

        $combinedText = '';
        foreach ($materials as $m) {
            $combinedText .= ($m->extracted_text ?? '') . "\n";
            // Include keywords from metadata as well to weight them
            if (isset($m->metadata['keywords'])) {
                $combinedText .= implode(' ', $m->metadata['keywords']) . "\n";
            }
        }

        $competency = StudyCompetency::firstOrNew(['user_id' => $userId]);

        try {
            // Run Python predictor script
            $pythonOutput = $this->runPython([
                base_path('python_pipeline/pipeline.py'),
                '--action',
                'predict',
            ], $combinedText); // Send text via standard input

            $outputJson = json_decode($pythonOutput, true);

            if (isset($outputJson['competencies']) && isset($outputJson['archetypes'])) {
                $competency->competencies = $outputJson['competencies'];
                $competency->archetypes = $outputJson['archetypes'];
                $competency->verdict = $outputJson['verdict'] ?? '';
                $competency->save();
                return;
            }
        } catch (\Throwable $e) {
            Log::error("Python prediction execution failed: " . $e->getMessage());
        }

        // Fallback calculation directly in PHP if Python predictor fails
        $archetypeKeywords = [
            "Data Engineer" => ["sql", "python", "spark", "etl", "hadoop", "kafka", "pipeline", "database", "warehousing", "airflow", "postgresql", "mysql"],
            "Frontend Architect" => ["vue", "react", "javascript", "css", "html", "tailwind", "typescript", "webpack", "vite", "ui", "ux", "frontend"],
            "Machine Learning Engineer" => ["python", "pytorch", "tensorflow", "scikit-learn", "sklearn", "pandas", "numpy", "deep learning", "ml", "model", "neural", "nlp", "ai"],
            "Backend Specialist" => ["php", "laravel", "node", "express", "go", "api", "rest", "postgres", "mysql", "redis", "docker", "mvc", "backend"],
            "DevOps Engineer" => ["aws", "docker", "kubernetes", "ci/cd", "git", "terraform", "linux", "cloud", "nginx", "jenkins"]
        ];

        $competencyKeywords = [
            "Python Programming" => ["python", "pip", "py"],
            "Database Systems" => ["sql", "database", "postgres", "mysql", "query", "nosql", "mongodb"],
            "Software Engineering" => ["git", "api", "mvc", "php", "laravel", "javascript", "code", "architecture"],
            "Data Analytics" => ["pandas", "numpy", "excel", "visualization", "tableau", "powerbi", "analysis"],
            "Machine Learning" => ["scikit-learn", "pytorch", "tensorflow", "model", "training", "supervised", "unsupervised"],
            "Web Development" => ["html", "css", "vue", "react", "tailwind", "frontend", "http", "js"]
        ];

        $textLower = strtolower($combinedText);
        $archetypes = [];
        foreach ($archetypeKeywords as $arch => $kws) {
            $matches = 0;
            foreach ($kws as $kw) {
                if (str_contains($textLower, $kw)) {
                    $matches++;
                }
            }
            $base = $matches > 0 ? 40 : 10;
            $archetypes[$arch] = min(98, round($base + ($matches / count($kws)) * 60));
        }

        $competencies = [];
        foreach ($competencyKeywords as $comp => $kws) {
            $matches = 0;
            foreach ($kws as $kw) {
                $matches += substr_count($textLower, $kw);
            }
            if ($matches == 0) {
                $score = 40;
            } elseif ($matches == 1) {
                $score = 65;
            } elseif ($matches == 2) {
                $score = 80;
            } else {
                $score = min(98, 80 + $matches * 2);
            }
            $competencies[$comp] = $score;
        }

        $bestArchetype = array_keys($archetypes, max($archetypes))[0];
        $bestScore = $archetypes[$bestArchetype];
        $verdict = "Competency profile dynamically analyzed. Showing high alignment with {$bestArchetype} ({$bestScore}%) based on keyword mapping.";

        $competency->competencies = $competencies;
        $competency->archetypes = $archetypes;
        $competency->verdict = $verdict;
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
