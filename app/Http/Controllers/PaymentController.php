<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function showCheckout(Request $request)
    {
        $planSlug = strtolower($request->query('plan', 'architect'));
        $billing = $request->query('billing', 'yearly');

        $plansData = [
            'architect' => [
                'name' => 'Architect',
                'price' => $billing === 'yearly' ? 'Rp 79.000' : 'Rp 99.000',
                'features' => ['All Pro Habit Features', 'Wealth Lab Access', 'Advanced Planner Mode', 'Cloud Sync']
            ],
            'quantum' => [
                'name' => 'Quantum',
                'price' => $billing === 'yearly' ? 'Rp 109.000' : 'Rp 159.000',
                'features' => ['Neural OS AI Companion', 'AI Habit Alchemy', 'Predictive Wealth Insights', 'Priority AI Support']
            ],
            'lifetime' => [
                'name' => 'Legendary',
                'price' => 'Rp 899.000',
                'features' => ['Lifetime Unlimited Access', 'Founder Badge', 'All Future Neural Modules', 'Infinite Storage']
            ]
        ];

        $selected = $plansData[$planSlug] ?? $plansData['architect'];

        return \Inertia\Inertia::render('Checkout/Index', [
            'plan' => $selected['name'],
            'price' => $selected['price'],
            'features' => $selected['features']
        ]);
    }

    public function checkout(Request $request)
    {
        $user = auth()->user();

        $merchantCode = trim(config('duitku.merchant_code'));
        $apiKey = trim(config('duitku.api_key'));
        $env = config('duitku.env');

        $plan = $request->input('plan', 'architect');
        $billing = $request->input('billing', 'yearly'); // New param to handle price correctly

        // Map Plan + Billing to Price (IDR)
        $prices = [
            'architect' => [
                'yearly' => 79000,
                'monthly' => 99000
            ],
            'quantum' => [
                'yearly' => 109000,
                'monthly' => 159000
            ],
            'lifetime' => [
                'yearly' => 899000,
                'monthly' => 899000
            ]
        ];

        $paymentAmount = $prices[$plan][$billing] ?? 79000;
        $productDetails = "OneForMind " . ucfirst($plan) . " (" . ucfirst($billing) . ") Subscription";

        if ($plan === 'lifetime') {
            $productDetails = 'OneForMind Legendary Founder Edition (Lifetime)';
        }

        $merchantOrderId = strtoupper($plan) . '-' . $user->id . '-' . time();
        $email = $user->email;
        $customerVaName = $user->name;
        $phoneNumber = '081234567890'; // Fixed to potentially more valid 12 digits for production vs dummy 11

        $callbackUrl = url('/callback');
        $returnUrl = url('/payment/finish');

        $timestamp = round(microtime(true) * 1000);
        $signature = hash('sha256', $merchantCode . $timestamp . $apiKey);

        $itemDetails = [
            [
                'name' => $productDetails,
                'price' => (int)$paymentAmount,
                'quantity' => 1
            ]
        ];

        $params = [
            'merchantCode' => $merchantCode,
            'paymentAmount' => (int)$paymentAmount,
            'paymentMethod' => '', // Blank to show all payment methods
            'merchantOrderId' => (string)$merchantOrderId,
            'productDetails' => $productDetails,
            'additionalParam' => '',
            'merchantUserInfo' => (string)$user->id,
            'customerVaName' => $customerVaName,
            'email' => $email,
            'phoneNumber' => $phoneNumber,
            'itemDetails' => $itemDetails,
            'callbackUrl' => $callbackUrl,
            'returnUrl' => $returnUrl,
            'expiryPeriod' => 60 // In minutes
        ];

        $url = $env === 'production'
            ? 'https://passport.duitku.com/webapi/api/merchant/createinvoice'
            : 'https://api-sandbox.duitku.com/webapi/api/merchant/createinvoice';

        try {
            Log::info('Duitku Request:', [
                'url' => $url,
                'merchantCode' => $merchantCode,
                'merchantOrderId' => $merchantOrderId,
                'paymentAmount' => $paymentAmount
            ]);

            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'x-duitku-signature' => $signature,
                'x-duitku-timestamp' => $timestamp,
                'x-duitku-merchantcode' => $merchantCode
            ])->post($url, $params);
            
            $status = $response->status();
            $body = $response->body();
            $data = json_decode($body, true);

            if ($status === 200 && is_array($data) && isset($data['paymentUrl'])) {
                return response()->json(['paymentUrl' => $data['paymentUrl']]);
            }
            else {
                Log::error('Duitku Gateway Error:', [
                    'status' => $status,
                    'body' => $body,
                    'merchantCode' => $merchantCode,
                    'merchantOrderId' => $merchantOrderId
                ]);

                return response()->json([
                    'error' => "Duitku returned " . $status . ": " . (json_decode($body)->Message ?? substr($body, 0, 100))
                ], 400);
            }
        }
        catch (\Exception $e) {
            Log::error('Duitku Checkout Exception: ' . $e->getMessage(), [
                'merchantCode' => $merchantCode,
                'params' => $params
            ]);
            return response()->json(['error' => 'Connection Exception: ' . $e->getMessage()], 500);
        }
    }

    public function callback(Request $request)
    {
        try {
            $merchantCode = config('duitku.merchant_code');
            $apiKey = config('duitku.api_key');

            $amount = $request->input('amount');
            $merchantOrderId = $request->input('merchantOrderId');
            $signature = $request->input('signature');
            $resultCode = $request->input('resultCode');

            if (!$amount || !$merchantOrderId || !$signature || !$resultCode) {
                return response()->json(['message' => 'Invalid parameters'], 400);
            }

            $calcSignature = md5($merchantCode . $amount . $merchantOrderId . $apiKey);

            if ($signature !== $calcSignature) {
                return response()->json(['message' => 'Bad Signature'], 400);
            }

            if ($resultCode === '00') {
                $parts = explode('-', $merchantOrderId);
                $planType = $parts[0] ?? 'ARCHITECT';
                $userId = $parts[1] ?? null;

                if ($userId) {
                    $user = User::find($userId);
                    if ($user) {
                        $duration = 1;
                        if ($planType === 'LIFETIME') {
                            $duration = 1200; // 100 years
                        }

                        $user->update([
                            'is_premium' => true,
                            'premium_until' => now()->addMonths($duration),
                        ]);
                    }
                }
            }

            return response()->json(['message' => 'Callback processed']);
        }
        catch (\Exception $e) {
            Log::error('Duitku Callback Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // removed old activatePremium helper

    public function finish(Request $request)
    {
        $user = auth()->user();
        return \Inertia\Inertia::render('Payment/Success', [
            'plan' => $user->plan_type ?? 'Pro',
            'userName' => $user->name
        ]);
    }

    public function unfinish(Request $request)
    {
        return redirect()->route('settings.index', ['tab' => 'billing'])->with('message', 'Pembayaran belum diselesaikan. Silakan coba lagi.');
    }

    public function error(Request $request)
    {
        return redirect()->route('settings.index', ['tab' => 'billing'])->with('error', 'Terjadi kesalahan pada proses pembayaran. Silakan coba lagi.');
    }
}
