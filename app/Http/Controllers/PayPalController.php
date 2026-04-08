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
        
        // Map Plans to USD Prices
        $prices = [
            'architect' => 4.99,
            'quantum'   => 6.99,
            'lifetime'  => 59.00
        ];

        $amount = $prices[$plan] ?? 4.99;
        $description = "OneForMind Subscription: " . ucfirst($plan);

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('paypal.success', ['plan' => $plan]),
                "cancel_url" => route('pricing.index'),
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
            
            $duration = 1; // Month
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
