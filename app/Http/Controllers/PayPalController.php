<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use Illuminate\Support\Facades\Log;

class PayPalController extends Controller
{
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
        $description = "OneForMind " . ucfirst($plan) . " (" . ucfirst($billing) . ") Subscription";
        
        if ($plan === 'lifetime') {
            $description = "OneForMind Legendary Founder (Lifetime Access)";
        }

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        try {
            $paypalToken = $provider->getAccessToken();
        } catch (\Exception $e) {
            Log::error('PayPal Auth Error: ' . $e->getMessage());
            return response()->json(['error' => 'Gagal autentikasi PayPal. Periksa konfigurasi API.'], 500);
        }

        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('paypal.success', ['plan' => $plan, 'billing' => $billing]),
                "cancel_url" => route('billing'),
            ],
            "purchase_units" => [
                0 => [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => number_format($amount, 2, '.', '')
                    ],
                    "description" => $description
                ]
            ]
        ]);

        if (isset($response['id']) && $response['id'] != null) {
            foreach ($response['links'] as $links) {
                if ($links['rel'] == 'approve') {
                    return response()->json(['paymentUrl' => $links['href']]);
                }
            }
            return response()->json(['error' => 'Something went wrong with PayPal links.'], 500);
        } else {
            Log::error('PayPal Create Order Error:', $response);
            return response()->json(['error' => $response['message'] ?? 'Unable to create PayPal order.'], 500);
        }
    }

    /**
     * Capture the payment after user approval
     */
    public function success(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        
        $response = $provider->capturePaymentOrder($request['token']);

        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            $user = auth()->user();
            $planType = strtoupper($request->query('plan', 'ARCHITECT'));
            $billing = $request->query('billing', 'yearly');
            
            $duration = $billing === 'yearly' ? 12 : 1; 
            if ($planType === 'LIFETIME') {
                $duration = 1200; // 100 years
            }

            if ($user) {
                $user->update([
                    'is_premium' => true,
                    'premium_until' => now()->addMonths($duration),
                ]);
            }

            return redirect()
                ->route('settings.index', ['tab' => 'billing'])
                ->with('success', 'Transaction complete! Your account has been upgraded via PayPal.');
        } else {
            Log::error('PayPal Capture Error:', $response);
            return redirect()
                ->route('pricing.index')
                ->with('error', $response['message'] ?? 'Something went wrong with PayPal capture.');
        }
    }
}
