<?php

namespace App\Jobs;

use App\Models\StudyMaterial;
use App\Models\StudyCompetency;
use App\Services\GeminiService;
use App\Http\Controllers\StudyController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Log;

class ProcessCoursework implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 300;

    public function __construct(
        public int $materialId,
        public array $filesData,
        public array $textData
    ) {}

    public function handle(GeminiService $geminiService)
    {
        $material = StudyMaterial::find($this->materialId);
        if (!$material) return;

        \Illuminate\Support\Facades\Cache::put('ml_pipeline_logs', "--- START OF ANALYSIS SESSION ---\n", 3600);
        $addLog = function(string $message) {
            $timestamp = now()->format('Y-m-d H:i:s.v');
            $line = "[{$timestamp}] {$message}\n";
            $current = \Illuminate\Support\Facades\Cache::get('ml_pipeline_logs', '');
            \Illuminate\Support\Facades\Cache::put('ml_pipeline_logs', $current . $line, 3600);
        };

        $addLog("🚀 Pipeline initialized: Processing Study Material #{$material->id} (Course: '{$material->course_name}')");

        try {
            $aggregatedContextText = "";
            $contextData = $material->context_data ?? [];
            if (!is_array($contextData)) {
                $contextData = [];
            }
            
            // AGGREGATE TEXT FOR AI
            if (!empty($this->filesData['context_files'])) {
                $addLog("📄 Context files detected: " . count($this->filesData['context_files']) . " file(s). Starting extraction...");
                foreach ($this->filesData['context_files'] as $fileData) {
                    $addLog("🔍 Extracting text from context file: '{$fileData['name']}' ({$fileData['ext']})");
                    $res = $this->extractFileText($fileData, $geminiService, $addLog);
                    $contextData['files'][] = [
                        'name' => $fileData['name'],
                        'path' => $fileData['path']
                    ];
                    $aggregatedContextText .= $res . "\n\n";
                    $addLog("✅ Extracted " . strlen($res) . " characters from context file: '{$fileData['name']}'");
                }
            }
            if (!empty($this->textData['context_link'])) {
                $link = trim($this->textData['context_link']);
                if (!empty($link)) {
                    $addLog("🌐 Crawling context link: '{$link}'");
                    $text = $this->processLink($link);
                    $contextData['link'] = $link;
                    $contextData['link_name'] = $this->textData['context_link_name'] ?? null;
                    $aggregatedContextText .= $text . "\n\n";
                    $addLog("✅ Scraped " . strlen($text) . " characters from link context");
                }
            }
            if (!empty($this->textData['context_text'])) {
                $addLog("✍️ Appending manual context text input (" . strlen($this->textData['context_text']) . " characters)...");
                $contextData['text'] = $this->textData['context_text'];
                $aggregatedContextText .= $this->textData['context_text'] . "\n\n";
            }
            
            $aggregatedArtifactText = "";
            $artifactData = $material->artifact_data ?? [];
            if (!is_array($artifactData)) {
                $artifactData = [];
            }

            if (!empty($this->filesData['artifact_files'])) {
                $addLog("📄 Artifact files detected: " . count($this->filesData['artifact_files']) . " file(s). Starting extraction...");
                foreach ($this->filesData['artifact_files'] as $fileData) {
                    $addLog("🔍 Extracting text from artifact file: '{$fileData['name']}' ({$fileData['ext']})");
                    $res = $this->extractFileText($fileData, $geminiService, $addLog);
                    $artifactData['files'][] = [
                        'name' => $fileData['name'],
                        'path' => $fileData['path']
                    ];
                    $aggregatedArtifactText .= $res . "\n\n";
                    $addLog("✅ Extracted " . strlen($res) . " characters from artifact file: '{$fileData['name']}'");
                }
            }
            if (!empty($this->textData['artifact_link'])) {
                $link = trim($this->textData['artifact_link']);
                if (!empty($link)) {
                    $addLog("🌐 Crawling artifact link: '{$link}'");
                    $text = $this->processLink($link);
                    $artifactData['link'] = $link;
                    $artifactData['link_name'] = $this->textData['artifact_link_name'] ?? null;
                    $aggregatedArtifactText .= $text . "\n\n";
                    $addLog("✅ Scraped " . strlen($text) . " characters from link artifact");
                }
            }
            if (!empty($this->textData['artifact_text'])) {
                $addLog("✍️ Appending manual artifact text input (" . strlen($this->textData['artifact_text']) . " characters)...");
                $artifactData['text'] = $this->textData['artifact_text'];
                $aggregatedArtifactText .= $this->textData['artifact_text'] . "\n\n";
            }

            $material->context_data = $contextData;
            $material->artifact_data = $artifactData;
            $material->extracted_text = "--- CONTEXT ---\n" . substr($aggregatedContextText, 0, 20000) . "\n\n--- ARTIFACT ---\n" . substr($aggregatedArtifactText, 0, 20000);

            // DYNAMIC HYBRID ML
            $metadata = null;
            try {
                $addLog("🧠 Phase 1: Running Scikit-Learn (Naive Bayes) classification pipeline on corpus...");
                $pythonOutput = $this->runPython([
                    base_path('python_pipeline/pipeline.py'),
                    '--action',
                    'predict'
                ], $aggregatedContextText . "\n" . $aggregatedArtifactText);
                
                $addLog("🤖 Python output received: " . trim($pythonOutput));
                $parsed = json_decode($pythonOutput, true);
                if (isset($parsed['archetypes'])) {
                    $addLog("🎯 Scikit-Learn prediction successful. Archetypes found: " . json_encode($parsed['archetypes']));
                    
                    $addLog("🧠 Phase 2: Sending aggregated text + Scikit-Learn archetype scores to Gemini API (LLM) for competency audit...");
                    $addLog("🤖 Prompting Gemini with student name: '{$material->user->name}', course: '{$material->course_name}'");
                    
                    $metadata = $geminiService->analyzeCourseworkCompetencies($aggregatedContextText, $aggregatedArtifactText, $material->course_name, $parsed['archetypes'], $material->user->name);
                    $metadata['source'] = 'hybrid_ml_gemini';
                    
                    $addLog("✅ Gemini Response parsed. Identified Field: '{$metadata['field_of_study']}'");
                    $addLog("📈 Competencies verified: " . json_encode($metadata['competencies'] ?? []));
                } else {
                    throw new \Exception("Invalid output format from Python ML: " . ($parsed['error'] ?? 'unknown'));
                }
            } catch (\Throwable $e) {
                $addLog("⚠️ Python ML/Scikit-Learn failed or returned low confidence: " . $e->getMessage());
                $addLog("🔄 Falling back 100% to Gemini API for both Archetype Classification & Competency Auditing...");
                
                $metadata = $geminiService->analyzeCourseworkCompetencies($aggregatedContextText, $aggregatedArtifactText, $material->course_name, null, $material->user->name);
                $metadata['source'] = 'gemini_api_only';
                
                $addLog("✅ Gemini Response parsed (Fallback Mode). Identified Field: '{$metadata['field_of_study']}'");
                $addLog("🎯 Career Archetypes identified: " . json_encode($metadata['archetypes'] ?? []));
                $addLog("📈 Competencies verified: " . json_encode($metadata['competencies'] ?? []));
            }

            // Append final logs to metadata (removed)
            $material->metadata = $metadata;
            $material->status = 'completed';
            $material->save();
            $addLog("🎉 Coursework analysis completed successfully!");

            // Recalculate Competencies
            try {
                $addLog("🔄 Recalculating global student competencies...");
                app(StudyController::class)->recalculateCompetencies($material->user_id);
                $addLog("✅ Global competency profiles updated.");
            } catch (\Throwable $e) {
                $addLog("⚠️ Global recalculate failed: " . $e->getMessage());
                Log::error("Recalculate failed: " . $e->getMessage());
            }

        } catch (\Throwable $e) {
            $addLog("❌ Fatal error in coursework analysis: " . $e->getMessage());
            Log::error("Failed processing study material ID {$material->id}: " . $e->getMessage() . "\n" . $e->getTraceAsString());
            
            // OPTIONAL FALLBACK: If everything failed, try a very simple Gemini analysis with just the Course Name
            try {
                $addLog("🚨 Attempting emergency fallback analysis for ID {$material->id} using course title only...");
                $geminiService = app(GeminiService::class);
                $metadata = $geminiService->analyzeCourseworkCompetencies(
                    "Fallback processing due to system error.", 
                    "No file text extracted.", 
                    $material->course_name, 
                    null, 
                    $material->user->name
                );
                $metadata['source'] = 'emergency_fallback';
                $material->metadata = $metadata;
                $material->status = 'completed';
                $material->save();
                $addLog("✅ Emergency fallback analysis completed successfully.");
                app(StudyController::class)->recalculateCompetencies($material->user_id);
            } catch (\Throwable $fallbackEx) {
                $addLog("❌ Emergency fallback also failed: " . $fallbackEx->getMessage());
                $material->status = 'failed';
                $metadata = $material->metadata ?? [];
                $material->metadata = $metadata;
                $material->save();
            }
        }
    }

    private function extractFileText(array $fileData, GeminiService $geminiService, ?callable $addLog = null)
    {
        $ext = $fileData['ext'];
        
        // Ensure path points to a readable local file.
        $disk = config('filesystems.default');
        
        if ($disk === 'local') {
            $fullPath = Storage::disk('local')->path($fileData['path']);
        } else {
            // Download to temporary location for processing
            if ($addLog) $addLog("☁️ File hosted on remote disk '{$disk}'. Downloading temporary file...");
            $tempPath = tempnam(sys_get_temp_dir(), 'study_');
            $content = Storage::disk($disk)->get($fileData['path']);
            
            if (is_string($content) && (str_starts_with($content, 'http://') || str_starts_with($content, 'https://'))) {
                Log::info("Fetching remote content for processing: " . substr($content, 0, 100) . "...");
                if ($addLog) $addLog("🌐 Fetching remote URL content via HTTP proxy...");
                
                if (str_contains($content, 'res.cloudinary.com') && class_exists(\Cloudinary\Cloudinary::class) && env('CLOUDINARY_URL')) {
                    try {
                        $cloudinary = new \Cloudinary\Cloudinary(env('CLOUDINARY_URL'));
                        $publicId = preg_replace('/\.([a-zA-Z0-9]+)$/', '', $fileData['path']);
                        $fileExt = pathinfo($fileData['path'], PATHINFO_EXTENSION);
                        $content = (string) $cloudinary->image($publicId)->extension($fileExt)->signUrl();
                    } catch (\Exception $e) {
                        Log::warning("Failed to sign Cloudinary URL in background job: " . $e->getMessage());
                    }
                }
                
                $response = \Illuminate\Support\Facades\Http::get($content);
                if ($response->successful()) {
                    $content = $response->body();
                } else {
                    Log::error("Failed to fetch remote content via HTTP: " . $response->status());
                    throw new \Exception("Could not fetch remote file content from URL.");
                }
            }
            
            file_put_contents($tempPath, $content);
            $fullPath = $tempPath;
        }
        
        if (!file_exists($fullPath) || filesize($fullPath) === 0) {
            Log::warning("File extraction resulted in empty file: " . ($fileData['path'] ?? 'unknown'));
            if ($addLog) $addLog("⚠️ File is empty or does not exist at path: " . $fullPath);
            return "";
        }

        $text = '';
        if ($ext === 'docx') {
            if ($addLog) $addLog("📄 Using native PHP ZipArchive XML reader for DOCX format...");
            $text = $this->extractDocxText($fullPath);
        } elseif ($ext === 'pptx') {
            if ($addLog) $addLog("📄 Using native PHP ZipArchive XML reader for PPTX format...");
            $text = $this->extractPptxText($fullPath);
        }

        if (empty($text)) {
            try {
                if ($addLog) $addLog("🐍 Invoking python_pipeline/pipeline.py --action extract on file...");
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
                    if ($addLog) $addLog("⚠️ Python extraction failed. Falling back to Gemini Vision OCR API to read PDF pages...");
                    $base64 = base64_encode(file_get_contents($fullPath));
                    $text = $geminiService->extractResumeText($base64);
                }
            }
        }
        
        return $text;
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
