<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected ?string $apiKey;
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
        $this->apiKey = config('services.gemini.key') ?: env('GEMINI_API_KEY');
        $this->version = config('services.gemini.version') ?: env('GEMINI_API_VERSION', 'v1beta');
    }

    /**
     * 🔥 CORE EXECUTION ENGINE WITH MULTI-MODEL FALLBACK
     */
    private function executeRequest(string $payloadType, array $payload, int $timeout = 30): ?string
    {
        if (!$this->apiKey) {
            Log::error('Gemini API key is not configured.');
            return null;
        }

        foreach ($this->models as $modelName) {
            try {
                $url = "https://generativelanguage.googleapis.com/{$this->version}/models/{$modelName}:generateContent?key={$this->apiKey}";
                $response = Http::timeout($timeout)->post($url, $payload);

                if ($response->successful()) {
                    $candidates = $response->json('candidates');
                    if (!empty($candidates)) {
                        return $candidates[0]['content']['parts'][0]['text'] ?? null;
                    }
                    continue; // Empty candidates, try next model
                }

                // If quota exceeded (429) or Forbidden (403), try next model
                if (in_array($response->status(), [429, 403, 404])) {
                    Log::warning("GEMINI_FALLBACK: Model {$modelName} failed with status {$response->status()}. Trying next...");
                    continue;
                }

                // Other errors might be payload related, log and stop
                Log::error("GEMINI_API_ERROR ({$modelName}): " . $response->status() . ' | ' . $response->body());
                break; 

            } catch (\Exception $e) {
                Log::error("Gemini Exception ({$modelName}): " . $e->getMessage());
                continue;
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
}
