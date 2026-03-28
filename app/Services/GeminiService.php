<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected ?string $apiKey;
    protected string $model = 'gemini-2.5-flash';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key') ?: env('GEMINI_API_KEY');
    }

    /**
     * Generate content based on prompt
     */
    public function generate(string $prompt): ?string
    {
        if (!$this->apiKey) {
            Log::error('Gemini API key is not configured.');
            return null;
        }

        try {
            $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
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
            ]);

            if ($response->successful()) {
                $candidates = $response->json('candidates');
                if (!empty($candidates)) {
                    return $candidates[0]['content']['parts'][0]['text'] ?? null;
                } else {
                    Log::warning('GEMINI_EMPTY_CANDIDATES: Response was successful but candidates list is empty. Body: ' . $response->body());
                }
            } else {
                Log::error('GEMINI_API_ERROR: ' . $response->status() . ' | ' . $response->body());
            }

        } catch (\Exception $e) {
            Log::error('Gemini Exception: ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Specialized prompt for Finance Audit
     */
    public function auditFinance(array $data, string $month): ?string
    {
        $prompt = "As a professional financial auditor and life coach, analyze the following transactions for the month of $month.
        User Name: {$data['user_name']}
        Income Total: {$data['total_income']}
        Expense Total: {$data['total_expense']}
        Categories Summary: " . json_encode($data['categories']) . "
        
        Provide a concise, motivating financial audit (max 3-4 paragraphs) in Indonesian language. 
        Identify spending leaks, suggest areas for improvement, and end with a positive reinforcement. 
        Format your response in professional markdown with bold highlights.";

        return $this->generate($prompt);
    }

    /**
     * Specialized prompt for Journal Sentiment
     */
    public function analyzeSentiment(string $journalContent): ?string
    {
        $prompt = "Analyze the emotional sentiment and psychological state of this journal entry.
        Content: \"$journalContent\"
        
        Provide a short 2-sentence emotional analysis in Indonesian language, followed by a mood score from 1 to 10.
        Output format: [Sentiment Analysis] | [Score: X/10]";

        return $this->generate($prompt);
    }
    
    /**
     * Specialized prompt for AI Life Coach Suggestions
     */
    public function getCoachSuggestions(array $context): ?string
    {
        $prompt = "You are OneForMind AI Life Coach. Based on current habits and task completion:
        " . json_encode($context) . "
        
        Provide 3 actionable tips for tomorrow to increase productivity and mental well-being.
        Keep it concise, in Indonesian, and extremely encouraging.";

        return $this->generate($prompt);
    }
    /**
     * Generate Opening Remark for AI Coach
     */
    public function generateOpeningRemark(array $context): ?string
    {
        $prompt = "You are OneForMind AI Life Coach. Proactively start a conversation with the user based on their data:
        Context: " . json_encode($context) . "
        
        Rules:
        1. Be specific (Misal: Sebutkan habit 'Olahraga' yang sudah 3 hari bolong).
        2. Sound human, caring, but firm (coach style).
        3. Use Indonesian language.
        4. If they are doing great, praise them. If they are failing, ask 'why' gently.
        5. Keep it to 1-2 punchy sentences.";

        return $this->generate($prompt);
    }

    /**
     * Generic Chat Interaction with System Context
     */
    public function chat(array $messages, ?string $systemContext = null): ?string
    {
        // Formatting for Gemini - needs 'user' and 'model' roles
        $contents = [];
        foreach ($messages as $msg) {
            $parts = [];
            
            // Handle Text
            if (!empty($msg['content'])) {
                $parts[] = ['text' => $msg['content']];
            }

            // Handle Multimodal (Image)
            if (!empty($msg['image'])) {
                // Expecting base64 string like "data:image/jpeg;base64,..."
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
                'parts' => [
                    ['text' => $systemContext]
                ]
            ];
        }

        try {
            $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}", $payload);

            if ($response->successful()) {
                $candidates = $response->json('candidates');
                if (!empty($candidates)) {
                    return $candidates[0]['content']['parts'][0]['text'] ?? null;
                }
                Log::warning('GEMINI_CHAT_EMPTY: ' . $response->body());
            } else {
                Log::error('GEMINI_CHAT_ERROR: ' . $response->status() . ' | ' . $response->body());
            }
        } catch (\Exception $e) {
            Log::error('Gemini Chat Exception: ' . $e->getMessage());
        }

        return null;
    }
    
    public function analyzeResume(string $resumeBase64, string $jobDescription): ?string
    {
        return $this->analyzeResumeProgress($resumeBase64, $jobDescription);
    }

    /**
     * Extract structured text from a Resume PDF/Image using Gemini
     */
    public function extractResumeText($base64Data)
    {
        // Extract mime type and data
        $mimeType = 'application/pdf'; // Default to PDF as requested
        $data = $base64Data;

        if (str_contains($base64Data, ';base64,')) {
            $parts = explode(';base64,', $base64Data);
            $mimeType = str_replace('data:', '', $parts[0]);
            $data = $parts[1];
        }

        try {
            $response = Http::timeout(180)->withHeaders([
                'Content-Type' => 'application/json',
            ])->post("https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}", [
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
                    'temperature' => 0.1, // Low temp for extraction
                ]
            ]);

            if ($response->successful()) {
                return $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? '';
            }

            Log::error('Gemini Resume Extraction Failed: ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('Gemini Resume Extraction Exception: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Analyze a Resume (Text-based) against a Job Description
     */
    public function analyzeResumeProgress($resumeText, $jobDescription)
    {
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post("https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}", [
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
                            2. Give a 1-sentence executive summary (Indonesian).
                            
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
            ]);

            if ($response->successful()) {
                return $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? '';
            }

            return "Error analyzing scan.";
        } catch (\Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }

    // End of Service
}
