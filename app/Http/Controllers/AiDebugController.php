<?php

namespace App\Http\Controllers;

use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiDebugController extends Controller
{
    public function testGemini(GeminiService $gemini)
    {
        $apiKey = env('GEMINI_API_KEY');
        $model = 'gemini-1.5-flash';
        
        $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";
        
        $response = Http::post($url, [
            'contents' => [
                [
                    'parts' => [
                        ['text' => 'Hello, are you online? Respond with "ONLINE"']
                    ]
                ]
            ]
        ]);

        return response()->json([
            'status' => $response->status(),
            'body' => $response->json(),
            'raw' => $response->body(),
            'url_used' => "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key=" . substr($apiKey, 0, 5) . "...",
        ]);
    }
}
