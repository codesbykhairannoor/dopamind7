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

        try {
            // AGGREGATE TEXT FOR AI
            if (!empty($this->filesData['context_files'])) {
                foreach ($this->filesData['context_files'] as $fileData) {
                    $res = $this->extractFileText($fileData, $geminiService);
                    $contextData['files'][] = [
                        'name' => $fileData['name'],
                        'path' => $fileData['path']
                    ];
                    $aggregatedContextText .= $res . "\n\n";
                }
            }
            if (!empty($this->textData['context_link'])) {
                $link = trim($this->textData['context_link']);
                if (!empty($link)) {
                    $text = $this->processLink($link);
                    $contextData['link'] = $link;
                    $contextData['link_name'] = $this->textData['context_link_name'] ?? null;
                    $aggregatedContextText .= $text . "\n\n";
                }
            }
            if (!empty($this->textData['context_text'])) {
                $contextData['text'] = $this->textData['context_text'];
                $aggregatedContextText .= $this->textData['context_text'] . "\n\n";
            }
            
            if (!empty($this->filesData['artifact_files'])) {
                foreach ($this->filesData['artifact_files'] as $fileData) {
                    $res = $this->extractFileText($fileData, $geminiService);
                    $artifactData['files'][] = [
                        'name' => $fileData['name'],
                        'path' => $fileData['path']
                    ];
                    $aggregatedArtifactText .= $res . "\n\n";
                }
            }
            if (!empty($this->textData['artifact_link'])) {
                $link = trim($this->textData['artifact_link']);
                if (!empty($link)) {
                    $text = $this->processLink($link);
                    $artifactData['link'] = $link;
                    $artifactData['link_name'] = $this->textData['artifact_link_name'] ?? null;
                    $aggregatedArtifactText .= $text . "\n\n";
                }
            }
            if (!empty($this->textData['artifact_text'])) {
                $artifactData['text'] = $this->textData['artifact_text'];
                $aggregatedArtifactText .= $this->textData['artifact_text'] . "\n\n";
            }

            $material->context_data = $contextData;
            $material->artifact_data = $artifactData;
            $material->extracted_text = "--- CONTEXT ---\n" . substr($aggregatedContextText, 0, 20000) . "\n\n--- ARTIFACT ---\n" . substr($aggregatedArtifactText, 0, 20000);

            // DYNAMIC HYBRID ML
            $metadata = null;
            try {
                $pythonOutput = $this->runPython([
                    base_path('python_pipeline/pipeline.py'),
                    '--action',
                    'predict'
                ], $aggregatedContextText . "\n" . $aggregatedArtifactText);
                
                $parsed = json_decode($pythonOutput, true);
                if (isset($parsed['archetypes'])) {
                    $metadata = $geminiService->analyzeCourseworkCompetencies($aggregatedContextText, $aggregatedArtifactText, $material->course_name, $parsed['archetypes'], $material->user->name);
                    $metadata['source'] = 'hybrid_ml_gemini';
                } else {
                    throw new \Exception("Invalid output format from Python ML.");
                }
            } catch (\Throwable $e) {
                Log::warning("Python ML failed, falling back to 100% Gemini API: " . $e->getMessage());
                $metadata = $geminiService->analyzeCourseworkCompetencies($aggregatedContextText, $aggregatedArtifactText, $material->course_name, null, $material->user->name);
                $metadata['source'] = 'gemini_api_only';
            }

            $material->metadata = $metadata;
            $material->status = 'completed';
            $material->save();

            // Recalculate Competencies
            app(StudyController::class)->recalculateCompetencies($material->user_id);

        } catch (\Throwable $e) {
            Log::error("Failed processing study material ID {$material->id}: " . $e->getMessage());
            $material->status = 'failed';
            $material->save();
        }
    }

    private function extractFileText(array $fileData, GeminiService $geminiService)
    {
        $ext = $fileData['ext'];
        
        // Ensure path points to a readable local file.
        // If it was stored locally, Storage::disk('local')->path($fileData['path']) works.
        // If Cloudinary is used, we need to download it first or use URL. For this fix, let's assume local storage works or we stored it locally in Controller.
        $fullPath = Storage::disk('local')->path($fileData['path']);
        
        if (!file_exists($fullPath)) {
            return "";
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
