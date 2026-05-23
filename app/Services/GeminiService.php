<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected array $apiKeys = [];
    protected string $version;

    /**
     * 🔥 MODEL HIERARCHY (Latest 2026 -> Legacy Fallbacks)
     * We try these in order to find one with available quota.
     */
    protected array $models = [
        'gemini-3.1-pro',
        'gemini-3.1-flash',
        'gemini-3.1-flash-lite',
        'gemini-3-flash',
        'gemini-2.5-pro',
        'gemini-2.5-flash',
        'gemini-2.5-flash-lite',
        'gemini-1.5-flash-latest'
    ];

    public function __construct()
    {
        // Load all available Gemini API keys from environment
        $keys = [
            config('services.gemini.key') ?: env('GEMINI_API_KEY'),
            env('GEMINI_API_KEY_2'),
            env('GEMINI_API_KEY_3'),
            env('GEMINI_API_KEY_4'),
        ];
        
        // Filter out empty keys and re-index
        $this->apiKeys = array_values(array_filter($keys));
        
        $this->version = config('services.gemini.version') ?: env('GEMINI_API_VERSION', 'v1beta');
    }

    /**
     * 🔥 CORE EXECUTION ENGINE WITH MULTI-KEY AND MULTI-MODEL FALLBACK
     */
    private function executeRequest(string $payloadType, array $payload, int $timeout = 30): ?string
    {
        if (empty($this->apiKeys)) {
            Log::error('Gemini API keys are not configured.');
            return null;
        }

        // Loop through all available API keys
        foreach ($this->apiKeys as $keyIndex => $apiKey) {
            
            // For each key, loop through the model hierarchy
            foreach ($this->models as $modelName) {
                try {
                    $url = "https://generativelanguage.googleapis.com/{$this->version}/models/{$modelName}:generateContent?key={$apiKey}";
                    $response = Http::timeout($timeout)->post($url, $payload);

                    if ($response->successful()) {
                        $candidates = $response->json('candidates');
                        if (!empty($candidates)) {
                            return $candidates[0]['content']['parts'][0]['text'] ?? null;
                        }
                        continue; // Empty candidates, try next model
                    }

                    // If quota exceeded (429) or Forbidden (403), it's likely an API Key level issue.
                    // Break the model loop and try the NEXT API KEY.
                    if (in_array($response->status(), [429, 403])) {
                        Log::warning("GEMINI_FALLBACK: Key #" . ($keyIndex + 1) . " failed with status {$response->status()}. Trying next API KEY...");
                        break; 
                    }

                    // If Model Not Found (404), try the NEXT MODEL with the SAME API KEY.
                    if ($response->status() === 404) {
                        Log::warning("GEMINI_FALLBACK: Model {$modelName} not found (404) on Key #" . ($keyIndex + 1) . ". Trying next model...");
                        continue;
                    }

                    // Other errors (e.g. 400 Bad Request, payload issues), log and stop trying
                    Log::error("GEMINI_API_ERROR ({$modelName}): " . $response->status() . ' | ' . $response->body());
                    break 2; // Break out of BOTH loops

                } catch (\Exception $e) {
                    Log::error("Gemini Exception ({$modelName} on Key #" . ($keyIndex + 1) . "): " . $e->getMessage());
                    continue; // Try next model on network timeout/error
                }
            }
        }

        return null;
    }

    /**
     * Generate content based on prompt
     */
    public function generate(string $prompt): ?string
    {
        $payload = [
            'contents' => [['parts' => [['text' => $prompt]]]],
            'generationConfig' => [
                'temperature' => 0.7,
                'topK' => 40,
                'topP' => 0.95,
                'maxOutputTokens' => 2048,
            ],
            'safetySettings' => [
                ['category' => 'HARM_CATEGORY_HATE_SPEECH', 'threshold' => 'BLOCK_NONE'],
                ['category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold' => 'BLOCK_NONE'],
                ['category' => 'HARM_CATEGORY_HARASSMENT', 'threshold' => 'BLOCK_NONE'],
                ['category' => 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold' => 'BLOCK_NONE'],
            ]
        ];

        return $this->executeRequest('generate', $payload);
    }

    /**
     * Specialized prompt for Finance Audit
     */
    public function auditFinance(array $data, string $month): ?string
    {
        $userId = auth()->id();
        $cacheKey = "finance_audit_{$userId}_{$month}";

        return cache()->remember($cacheKey, now()->addHours(6), function() use ($data, $month) {
            $locale = app()->getLocale();
            $langName = ($locale === 'id') ? 'Indonesian' : 'English';

            $prompt = "As a professional financial auditor and life coach, analyze the following transactions for the month of $month.
            User Name: {$data['user_name']}
            Income Total: {$data['total_income']}
            Expense Total: {$data['total_expense']}
            Categories Summary: " . json_encode($data['categories']) . "
            
            Provide a concise, motivating financial audit (max 3-4 paragraphs). 
            LANGUAGE: MUST USE $langName language.
            Identify spending leaks, suggest areas for improvement, and end with a positive reinforcement. 
            Format your response in professional markdown with bold highlights.";

            return $this->generate($prompt);
        });
    }

    /**
     * Specialized prompt for Journal Sentiment
     */
    public function analyzeSentiment(string $journalContent): ?string
    {
        $contentHash = md5($journalContent);
        $cacheKey = "sentiment_analysis_{$contentHash}";

        return cache()->remember($cacheKey, now()->addDays(7), function() use ($journalContent) {
            $locale = app()->getLocale();
            $langName = ($locale === 'id') ? 'Indonesian' : 'English';

            $prompt = "Analyze the emotional sentiment and psychological state of this journal entry.
            Content: \"$journalContent\"
            
            Provide a short 2-sentence emotional analysis.
            LANGUAGE: MUST USE $langName language.
            Followed by a mood score from 1 to 10.
            Output format: [Sentiment Analysis] | [Score: X/10]";

            return $this->generate($prompt);
        });
    }
    
    /**
     * Specialized prompt for AI Life Coach Suggestions
     */
    public function getCoachSuggestions(array $context): ?string
    {
        $locale = app()->getLocale();
        $langName = ($locale === 'id') ? 'Indonesian' : 'English';

        $prompt = "You are OneForMind AI Life Coach. Based on current habits and task completion:
        " . json_encode($context) . "
        
        Provide 3 actionable tips for tomorrow to increase productivity and mental well-being.
        LANGUAGE: MUST USE $langName language.
        Keep it concise and extremely encouraging.";

        return $this->generate($prompt);
    }

    /**
     * Generate Opening Remark for AI Coach
     */
    public function generateOpeningRemark(array $context): ?string
    {
        $locale = app()->getLocale();
        $langName = ($locale === 'id') ? 'Indonesian' : 'English';

        $prompt = "You are OneForMind AI Life Coach. Proactively start a conversation with the user based on their data:
        Context: " . json_encode($context) . "
        
        Rules:
        1. Be specific (Misal: Sebutkan habit 'Olahraga' yang sudah 3 hari bolong).
        2. Sound human, caring, but firm (coach style).
        3. LANGUAGE: MUST USE $langName language.
        4. If they are doing great, praise them. If they are failing, ask 'why' gently.
        5. Keep it to 1-2 punchy sentences.";

        return $this->generate($prompt);
    }

    /**
     * Generic Chat Interaction with System Context
     */
    public function chat(array $messages, ?string $systemContext = null): ?string
    {
        $contents = [];
        foreach ($messages as $msg) {
            $parts = [];
            if (!empty($msg['content'])) {
                $parts[] = ['text' => $msg['content']];
            }

            if (!empty($msg['image'])) {
                if (preg_match('/data:(image\/[a-z]+);base64,(.*)/i', $msg['image'], $matches)) {
                    $parts[] = [
                        'inline_data' => [
                            'mime_type' => $matches[1],
                            'data' => $matches[2]
                        ]
                    ];
                }
            }

            $contents[] = [
                'role' => (isset($msg['role']) && $msg['role'] === 'user') ? 'user' : 'model',
                'parts' => $parts
            ];
        }

        $payload = [
            'contents' => $contents,
            'generationConfig' => [
                'temperature' => 0.7,
            ],
            'safetySettings' => [
                ['category' => 'HARM_CATEGORY_HATE_SPEECH', 'threshold' => 'BLOCK_NONE'],
                ['category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold' => 'BLOCK_NONE'],
                ['category' => 'HARM_CATEGORY_HARASSMENT', 'threshold' => 'BLOCK_NONE'],
                ['category' => 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold' => 'BLOCK_NONE'],
            ]
        ];

        if ($systemContext) {
            $payload['system_instruction'] = [
                'parts' => [['text' => $systemContext]]
            ];
        }

        return $this->executeRequest('chat', $payload);
    }
    
    /**
     * Extract structured text from a Resume PDF/Image using Gemini
     */
    public function extractResumeText($base64Data)
    {
        $mimeType = 'application/pdf';
        $data = $base64Data;

        if (str_contains($base64Data, ';base64,')) {
            $parts = explode(';base64,', $base64Data);
            $mimeType = str_replace('data:', '', $parts[0]);
            $data = $parts[1];
        }

        $payload = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => "Extract ALL information from this resume precisely. Return a clean, master text version of the resume including skills, experience, and contact info. No extra commentary."],
                        [
                            'inline_data' => [
                                'mime_type' => $mimeType,
                                'data' => $data
                            ]
                        ]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.1,
            ]
        ];

        return $this->executeRequest('extract', $payload, 180);
    }

    /**
     * Analyze a Resume (Text-based) against a Job Description
     */
    public function analyzeResumeProgress($resumeText, $jobDescription)
    {
        $locale = app()->getLocale();
        $langName = ($locale === 'id') ? 'Indonesian' : 'English';

        $payload = [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' => "Analyze ONLY THE MATCH PROBABILITY of this resume AGAINST the job description.
                            
                            RESUME TEXT:
                            $resumeText
                            
                            JOB DESCRIPTION:
                            $jobDescription
                            
                            TASK:
                            1. Calculate Match Percentage (0-100%).
                            2. Give a 1-sentence executive summary.
                            LANGUAGE: MUST USE $langName language.
                            
                            OUTPUT FORMAT (MARKDOWN):
                            # [PERCENTAGE]% MATCH
                            **Ringkasan Neural:** [Summary...]
                            "
                        ]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.4,
            ]
        ];

        return $this->executeRequest('analyze', $payload);
    }
    
    /**
     * Analyze Coursework for Dynamic Competencies and Archetypes
     */
    public function analyzeCourseworkCompetencies($contextText, $artifactText, $courseName, $mlArchetypes = null)
    {
        $locale = app()->getLocale();
        $langName = ($locale === 'id') ? 'Indonesian' : 'English';

        // Base prompt
        $prompt = "You are an expert academic evaluator and career counselor.
        Analyze this student's coursework submission for the course: \"{$courseName}\".
        
        CONTEXT (Instructions/Syllabus):
        " . substr($contextText, 0, 15000) . "
        
        ARTIFACT (Student's Submission/Answer):
        " . substr($artifactText, 0, 15000) . "
        
        Based strictly on the content provided:
        1. Identify the 'Field of Study' (e.g., Corporate Finance, Data Science, Graphic Design, Nursing).
        2. Identify 6-10 specific technical 'Competencies' demonstrated in the artifact. Score each competency from 0-100 based on the depth of knowledge shown.
        ";
        
        // If ML Archetypes are provided, instruct Gemini to adopt them. Otherwise, generate them.
        if ($mlArchetypes !== null) {
            $archetypesJson = json_encode($mlArchetypes);
            $prompt .= "3. The Machine Learning model has already predicted these 'Career Archetypes' with scores: {$archetypesJson}. DO NOT generate new archetypes. Output these exact archetypes and scores back in your JSON response.
        4. Provide a comprehensive 4-5 sentence 'Verdict' detailing their strengths and how they align with the predicted archetypes. CRITICAL LANGUAGE RULE: The Verdict MUST be written in the SAME language as the Student's Artifact text (e.g., if the artifact is in Indonesian, write the verdict in Indonesian).";
        } else {
            $prompt .= "3. Identify 3 'Career Archetypes' (Job Titles) that this coursework aligns with. Score them from 0-100.
        4. Provide a comprehensive 4-5 sentence 'Verdict' detailing their strengths. CRITICAL LANGUAGE RULE: The Verdict MUST be written in the SAME language as the Student's Artifact text (e.g., if the artifact is in Indonesian, write the verdict in Indonesian).";
        }

        $prompt .= "
        
        OUTPUT FORMAT (Strictly JSON, no markdown):
        {
          \"field_of_study\": \"Field Name\",
          \"competencies\": {\"Competency 1\": 85, \"Competency 2\": 90},
          \"archetypes\": {\"Job Title 1\": 85, \"Job Title 2\": 80},
          \"verdict\": \"The narrative verdict...\"
        }";

        $response = $this->generate($prompt);
        
        $default = [
            'field_of_study' => 'General Studies',
            'competencies' => ['Analysis' => 50, 'Comprehension' => 50],
            'archetypes' => ['Student' => 50],
            'verdict' => 'Unable to generate dynamic analysis. Defaulting to general metrics.'
        ];

        if (!$response) return $default;

        $cleaned = trim($response);
        if (str_starts_with($cleaned, '```')) {
            $cleaned = preg_replace('/^```(?:json)?\s*/', '', $cleaned);
            $cleaned = preg_replace('/\s*```$/', '', $cleaned);
        }

        $decoded = json_decode(trim($cleaned), true);
        return $decoded ?: $default;
    }
}
