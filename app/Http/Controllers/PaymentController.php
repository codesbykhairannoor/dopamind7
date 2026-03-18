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

        $paymentAmount = 25000; // Harga premium unlock Rp 25.000
        $merchantOrderId = 'PREMIUM-' . $user->id . '-' . time();
        $productDetails = 'OneForMind Pro Ecosystem Unlock';
        $email = $user->email;
        $customerVaName = $user->name;
        $phoneNumber = '08123456789'; // Optional but recommended

        $callbackUrl = url('/callback');
        $returnUrl = url('/payment/finish');

        $signature = md5($merchantCode . $paymentAmount . $merchantOrderId . $apiKey);

        $params = [
            'merchantCode' => $merchantCode,
            'paymentAmount' => $paymentAmount,
            'paymentMethod' => '', // Blank to show all payment methods
            'merchantOrderId' => $merchantOrderId,
            'productDetails' => $productDetails,
            'additionalParam' => '',
            'merchantUserInfo' => (string)$user->id,
            'customerVaName' => $customerVaName,
            'email' => $email,
            'phoneNumber' => $phoneNumber,
            'callbackUrl' => $callbackUrl,
            'returnUrl' => $returnUrl,
            'signature' => $signature,
            'expiryPeriod' => 60 // In minutes
        ];

        $url = $env === 'production'
            ? 'https://passport.duitku.com/webapi/api/merchant/v2/inquiry'
            : 'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry';

        try {
            $response = Http::post($url, $params);
            $data = $response->json();

            if (isset($data['paymentUrl'])) {
                return response()->json(['paymentUrl' => $data['paymentUrl']]);
            }
            else {
                return response()->json(['error' => $data['statusMessage'] ?? 'Failed to contact Duitku server'], 400);
            }
        }
        catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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
                $userId = $parts[1] ?? null;

                if ($userId) {
                    $user = User::find($userId);
                    $this->activatePremium($user);
                }
            }

            return response()->json(['message' => 'Callback processed']);
        }
        catch (\Exception $e) {
            Log::error('Duitku Callback Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    protected function activatePremium($user)
    {
        if ($user) {
            $user->update([
                'is_premium' => true,
                'premium_until' => now()->addMonth(), // 1 Month trial unlock
            ]);
        }
    }

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
