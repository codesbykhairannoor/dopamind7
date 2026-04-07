<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MetaCapiService
{
    protected $pixelId;
    protected $accessToken;
    protected $testEventCode;
    protected $apiVersion = 'v19.0';

    public function __construct()
    {
        $this->pixelId = env('META_PIXEL_ID');
        $this->accessToken = env('META_ACCESS_TOKEN');
        $this->testEventCode = env('META_TEST_EVENT_CODE');
    }

    /**
     * Send CompleteRegistration event to Meta Conversions API.
     */
    public function sendCompleteRegistration($userData, $eventId)
    {
        if (!$this->pixelId || !$this->accessToken) {
            Log::warning('Meta Pixel ID or Access Token is missing.');
            return;
        }

        $url = "https://graph.facebook.com/{$this->apiVersion}/{$this->pixelId}/events";

        $payload = [
            'data' => [
                [
                    'event_name' => 'CompleteRegistration',
                    'event_time' => time(),
                    'action_source' => 'website',
                    'event_id' => $eventId,
                    'event_source_url' => url()->current(),
                    'user_data' => [
                        'em' => [hash('sha256', strtolower(trim($userData['email'])))],
                        'client_ip_address' => request()->ip(),
                        'client_user_agent' => request()->userAgent(),
                    ],
                ]
            ],
            'access_token' => $this->accessToken,
        ];

        if ($this->testEventCode) {
            $payload['test_event_code'] = $this->testEventCode;
        }

        try {
            $response = Http::post($url, $payload);
            
            if ($response->failed()) {
                Log::error('Meta CAPI Error: ' . $response->body());
            }
        } catch (\Exception $e) {
            Log::error('Meta CAPI Exception: ' . $e->getMessage());
        }
    }
}
