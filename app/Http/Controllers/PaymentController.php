<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function checkout(Request $request)
    {
        $user = auth()->user();

        $merchantCode = config('duitku.merchant_code');
        $apiKey = config('duitku.api_key');
        $env = config('duitku.env');

        $plan = $request->input('plan', 'architect');

        $paymentAmount = 25000;
        $productDetails = 'OneForMind Architect (Pro) Unlock';

        if ($plan === 'quantum') {
            $paymentAmount = 49000;
            $productDetails = 'OneForMind Quantum (AI) - 1 Bulan';
        }
        elseif ($plan === 'lifetime') {
            $paymentAmount = 249000;
            $productDetails = 'OneForMind Mind Master (Lifetime)';
        }

        $merchantOrderId = strtoupper($plan) . '-' . $user->id . '-' . time();
        $email = $user->email;
        $customerVaName = $user->name;
        $phoneNumber = '08123456789'; // Optional but recommended

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
            ? 'https://passport.duitku.com/webapi/api/merchant/createInvoice'
            : 'https://api-sandbox.duitku.com/api/merchant/createInvoice';

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'x-duitku-signature' => $signature,
                'x-duitku-timestamp' => $timestamp,
                'x-duitku-merchantcode' => $merchantCode
            ])->post($url, $params);
            $body = $response->body();
            $data = json_decode($body, true);

            if (is_array($data) && isset($data['paymentUrl'])) {
                return response()->json(['paymentUrl' => $data['paymentUrl']]);
            }
            else {
                Log::error('Duitku API Raw Body: ' . $body);
                return response()->json([
                    'error' => "Duitku returned " . $response->status() . ": " . substr($body, 0, 500)
                ], 400);
            }
        }
        catch (\Exception $e) {
            Log::error('Duitku Checkout Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Exception: ' . $e->getMessage()], 500);
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
        return redirect()->route('settings.index', ['tab' => 'billing'])->with('success', 'Transaksi sedang diproses atau berhasil! Status akun Anda akan segera diupdate.');
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
