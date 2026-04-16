<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class PayPalController extends Controller
{
    private function getPayPalCredentials()
    {
        $mode = config('paypal.mode', 'sandbox');
        $clientId = config("paypal.{$mode}.client_id");
        $clientSecret = config("paypal.{$mode}.client_secret");
        $baseUrl = $mode === 'live' 
            ? 'https://api-m.paypal.com' 
            : 'https://api-m.sandbox.paypal.com';

        return [$clientId, $clientSecret, $baseUrl];
    }

    private function getAccessToken($clientId, $clientSecret, $baseUrl)
    {
        $credentials = base64_encode("{$clientId}:{$clientSecret}");
        
        $response = Http::withHeaders([
            'Authorization' => "Basic {$credentials}",
        ])
        ->asForm()
        ->post("{$baseUrl}/v1/oauth2/token", [
            'grant_type' => 'client_credentials'
        ]);

        if ($response->successful()) {
            return $response->json('access_token');
        }

        Log::error('PayPal Auth Error:', [
            'status' => $response->status(),
            'body' => $response->body()
        ]);
        throw new \Exception('Failed to authenticate with PayPal.');
    }

    /**
     * Create a PayPal order
     */
    public function createOrder(Request $request)
    {
        $plan = $request->input('plan', 'architect');
        $billing = $request->input('billing', 'yearly');
        
        // Map Plan + Billing to USD Prices
        $prices = [
            'architect' => [
                'yearly' => 4.99,
                'monthly' => 6.99
            ],
            'quantum' => [
                'yearly' => 6.99,
                'monthly' => 9.99
            ],
            'lifetime' => [
                'yearly' => 59.00,
                'monthly' => 59.00
            ]
        ];

        $amount = $prices[$plan][$billing] ?? 4.99;
        
        // Final Billing Logic: If yearly, multiply monthly price by 12 (except for lifetime)
        if ($billing === 'yearly' && $plan !== 'lifetime') {
            $amount *= 12;
            $description = "OneForMind " . ucfirst($plan) . " Annual (12 Months) Subscription";
        } else {
            $description = "OneForMind " . ucfirst($plan) . " (" . ucfirst($billing) . ") Subscription";
        }
        
        if ($plan === 'lifetime') {
            $description = "OneForMind Legendary Founder (Lifetime Access)";
        }

        [$clientId, $clientSecret, $baseUrl] = $this->getPayPalCredentials();

        if (empty($clientId) || empty($clientSecret)) {
            return response()->json(['error' => 'Gagal autentikasi PayPal. Periksa konfigurasi API.'], 500);
        }
        
        $user = auth()->user();
        
        // Meta Pixel CAPI Event: InitiateCheckout
        try {
            $metaCapi = new \App\Services\MetaCapiService();
            $metaCapi->initiateCheckout([
                'id' => $user->id,
                'email' => $user->email,
                'first_name' => explode(' ', trim($user->name))[0] ?? $user->name,
            ], (float)$amount);
        } catch (\Exception $e) {
            Log::error('Meta CAPI Error on Initiate Checkout PayPal: ' . $e->getMessage());
        }

        try {
            $token = $this->getAccessToken($clientId, $clientSecret, $baseUrl);
            Log::info('PayPal Token acquired successfully via API.');

            $response = Http::withToken($token)->post("{$baseUrl}/v2/checkout/orders", [
                "intent" => "CAPTURE",
                "application_context" => [
                    "return_url" => route('paypal.success', ['plan' => $plan, 'billing' => $billing]),
                    "cancel_url" => route('settings.index', ['tab' => 'billing']),
                ],
                "purchase_units" => [
                    [
                        "amount" => [
                            "currency_code" => "USD",
                            "value" => number_format($amount, 2, '.', '')
                        ],
                        "description" => $description
                    ]
                ]
            ]);

            $data = $response->json();

            if (isset($data['id'])) {
                return response()->json(['id' => $data['id']]);
            } else {
                Log::error('PayPal Gateway Error Response:', [
                    'full_response' => $data,
                    'plan' => $plan,
                    'amount' => $amount
                ]);
                
                $errorMessage = $data['message'] ?? ($data['error']['message'] ?? 'Unable to create PayPal order.');
                return response()->json(['error' => $errorMessage], 500);
            }

        } catch (\Exception $e) {
            Log::error('PayPal Auth Exception:', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Gagal autentikasi PayPal. Periksa konfigurasi API.'], 500);
        }
    }

    /**
     * Capture the payment after user approval
     */
    public function success(Request $request)
    {
        $token = $request->input('token') ?? $request->query('token');
        if (!$token) {
            if ($request->wantsJson()) return response()->json(['success' => false, 'error' => 'Invalid token from PayPal.'], 400);
            return redirect()->route('settings.index', ['tab' => 'billing'])->with('error', 'Invalid token from PayPal.');
        }

        [$clientId, $clientSecret, $baseUrl] = $this->getPayPalCredentials();

        try {
            $accessToken = $this->getAccessToken($clientId, $clientSecret, $baseUrl);

            $response = Http::withToken($accessToken)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post("{$baseUrl}/v2/checkout/orders/{$token}/capture");

            $data = $response->json();

            if (isset($data['status']) && $data['status'] === 'COMPLETED') {
                $user = auth()->user();
                $planType = strtoupper($request->input('plan', 'ARCHITECT'));
                $billing = $request->input('billing', 'yearly');
                
                $duration = $billing === 'yearly' ? 12 : 1; 
                if ($planType === 'LIFETIME') {
                    $duration = 1200; // 100 years
                }

                if ($user) {
                    $user->update([
                        'is_premium' => 'true',
                        'premium_until' => now()->addMonths($duration),
                    ]);
                    
                    // Meta Pixel CAPI Event: Purchase & Subscribe
                    try {
                        // Using approximate conversion rate for logging purposes 1 USD = 15000 IDR
                        $amountInIDR = (float)($data['purchase_units'][0]['amount']['value'] ?? 0) * 15000;
                        $metaCapi = new \App\Services\MetaCapiService();
                        $userData = [
                            'id' => $user->id,
                            'email' => $user->email,
                            'first_name' => explode(' ', trim($user->name))[0] ?? $user->name,
                        ];
                        $metaCapi->purchase($userData, $amountInIDR, $token);
                        $metaCapi->subscribe($userData, $token);
                    } catch (\Exception $e) {
                        Log::error('Meta CAPI Error on Purchase Callback PayPal: ' . $e->getMessage());
                    }
                }

                if ($request->wantsJson()) {
                    $request->session()->flash('success', 'Transaction complete! Your account has been upgraded via PayPal.');
                    return response()->json(['success' => true]);
                }
                return redirect()
                    ->route('settings.index', ['tab' => 'billing'])
                    ->with('success', 'Transaction complete! Your account has been upgraded via PayPal.');
            } else {
                Log::error('PayPal Capture Error:', $data);
                if ($request->wantsJson()) return response()->json(['success' => false, 'error' => $data['message'] ?? 'Something went wrong with PayPal capture.'], 400);
                return redirect()
                    ->route('settings.index', ['tab' => 'billing'])
                    ->with('error', $data['message'] ?? 'Something went wrong with PayPal capture.');
            }

        } catch (\Exception $e) {
            Log::error('PayPal Capture Exception:', ['message' => $e->getMessage()]);
            if ($request->wantsJson()) return response()->json(['success' => false, 'error' => 'Gagal memproses pembayaran PayPal.'], 500);
            return redirect()
                ->route('settings.index', ['tab' => 'billing'])
                ->with('error', 'Gagal memproses pembayaran PayPal.');
        }
    }
}
