<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cookie;

class MetaCapiService
{
    protected $pixelId;
    protected $accessToken;
    protected $apiVersion = 'v19.0';

    public function __construct()
    {
        $this->pixelId = '951954810888805'; // Hardcoded as per master prompt
        $this->accessToken = 'EAAS9kh4mxv4BRGME3fl1vZA6pPbZBMEbl4pNov86ICfSRE1nkNDBXXizbFTUOpulQVVnxPIHBcKhLBYDeghBRT10qCxuGAgGAdGm2DfmMqrBzWJEKSzrE5SQZBn1C9t3ieh2JPYUHaqff7RS01GzDesZCVMfOGJDCwrX3xsN8JdEgRXjPE6M2l5leq1omHbdDgZDZD';
    }

    /**
     * Helper untuk generate user_data standar
     */
    private function buildUserData(array $user = []): array
    {
        $request = request();
        $userData = [
            'client_ip_address' => $request->ip(),
            'client_user_agent' => $request->userAgent(),
        ];

        // IPv6 Optimasi: Jika format IP ada, kita pertahankan
        
        if (!empty($user['email'])) {
            $userData['em'] = [hash('sha256', strtolower(trim($user['email'])))];
        }

        if (!empty($user['first_name'])) {
            $userData['fn'] = [hash('sha256', strtolower(trim($user['first_name'])))];
        }

        if (!empty($user['id'])) {
            $userData['external_id'] = [(string) $user['id']];
        }

        // Ambil fbp & fbc dari Cookie
        $fbp = Cookie::get('_fbp');
        $fbc = Cookie::get('_fbc');

        if ($fbp) $userData['fbp'] = $fbp;
        if ($fbc) $userData['fbc'] = $fbc;

        return $userData;
    }

    /**
     * Core method untuk menembak CAPI
     */
    private function sendEvent(string $eventName, array $user, array $customData = [], string $eventId = null)
    {
        if (!$this->pixelId || !$this->accessToken) {
            return;
        }

        $eventId = $eventId ?? 'ofm-' . strtolower($eventName) . '-' . time();
        $url = "https://graph.facebook.com/{$this->apiVersion}/{$this->pixelId}/events";

        $payload = [
            'data' => [
                [
                    'event_name' => $eventName,
                    'event_time' => time(),
                    'action_source' => 'website',
                    'event_id' => $eventId,
                    'event_source_url' => url()->current(),
                    'user_data' => $this->buildUserData($user),
                ]
            ],
            'access_token' => $this->accessToken,
        ];

        if (!empty($customData)) {
            $payload['data'][0]['custom_data'] = $customData;
        }

        try {
            // Gunakan timeout agar tidak memblokir aplikasi (Error 500 mitigation)
            Http::timeout(5)->post($url, $payload);
        } catch (\Exception $e) {
            Log::error("Meta CAPI Exception ({$eventName}): " . $e->getMessage());
        }
    }

    // ==========================================
    // 8 PERISTIWA (EVENTS) SESUAI BLUEPRINT
    // ==========================================

    public function completeRegistration(array $user, string $eventId = null)
    {
        $this->sendEvent('CompleteRegistration', $user, [
            'currency' => 'IDR',
            'value' => 0.00
        ], $eventId);
    }

    public function startTrial(array $user, string $eventId = null)
    {
        $this->sendEvent('StartTrial', $user, [
            'currency' => 'IDR',
            'value' => 0.00
        ], $eventId);
    }

    public function subscribe(array $user, float $value, string $subscriptionId = null, string $eventId = null)
    {
        $customData = [
            'currency' => 'IDR',
            'value' => $value,
        ];
        if ($subscriptionId) {
            $customData['subscription_id'] = $subscriptionId;
        }
        $this->sendEvent('Subscribe', $user, $customData, $eventId);
    }

    public function initiateCheckout(array $user, float $value, string $eventId = null)
    {
        $this->sendEvent('InitiateCheckout', $user, [
            'currency' => 'IDR',
            'value' => $value
        ], $eventId);
    }

    public function purchase(array $user, float $value, string $subscriptionId = null, string $eventId = null)
    {
        $customData = [
            'currency' => 'IDR',
            'value' => $value,
        ];
        if ($subscriptionId) {
            $customData['subscription_id'] = $subscriptionId;
        }
        $this->sendEvent('Purchase', $user, $customData, $eventId);
    }

    public function addPaymentInfo(array $user, string $eventId = null)
    {
        $this->sendEvent('AddPaymentInfo', $user, [], $eventId);
    }

    public function search(array $user, string $searchString, string $eventId = null)
    {
        $this->sendEvent('Search', $user, [
            'search_string' => $searchString
        ], $eventId);
    }

    public function viewContent(array $user, string $contentName, string $eventId = null)
    {
        $this->sendEvent('ViewContent', $user, [
            'content_name' => $contentName
        ], $eventId);
    }
}
