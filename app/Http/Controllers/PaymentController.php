<?php

namespace App\Http\Controllers;

use Midtrans\Snap;
use Midtrans\Config;
use Midtrans\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function checkout(Request $request)
    {
        $user = auth()->user();
        
        $params = [
            'transaction_details' => [
                'order_id' => 'PREMIUM-' . $user->id . '-' . time(),
                'gross_amount' => 10000, // Harga premium Rp 10.000
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            return response()->json(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function webhook(Request $request)
    {
        try {
            $notification = new Notification();
            
            $transaction = $notification->transaction_status;
            $type = $notification->payment_type;
            $orderId = $notification->order_id;
            $fraud = $notification->fraud_status;

            // Extract user ID from order ID (PREMIUM-{id}-{time})
            $parts = explode('-', $orderId);
            $userId = $parts[1] ?? null;

            if (!$userId) {
                return response()->json(['message' => 'Invalid Order ID'], 400);
            }

            $user = User::query()->find($userId, ['*']);

            if ($transaction == 'capture') {
                if ($type == 'credit_card') {
                    if ($fraud == 'challenge') {
                        // Challenge by FDS
                    } else {
                        $this->activatePremium($user);
                    }
                }
            } else if ($transaction == 'settlement') {
                $this->activatePremium($user);
            } else if ($transaction == 'pending') {
                // Pending
            } else if ($transaction == 'deny') {
                // Deny
            } else if ($transaction == 'expire') {
                // Expire
            } else if ($transaction == 'cancel') {
                // Cancel
            }

            return response()->json(['message' => 'Webhook received']);
        } catch (\Exception $e) {
            Log::error('Midtrans Webhook Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    protected function activatePremium($user)
    {
        if ($user) {
            $user->update([
                'is_premium' => true,
                'premium_until' => now()->addMonth(), // Misal 1 bulan
            ]);
        }
    }

    public function finish(Request $request)
    {
        return redirect()->route('profile.edit')->with('success', 'Pembayaran berhasil dikonfirmasi! Akun Anda kini Premium.');
    }

    public function unfinish(Request $request)
    {
        return redirect()->route('profile.edit')->with('message', 'Pembayaran belum diselesaikan. Silakan cek kembali nanti.');
    }

    public function error(Request $request)
    {
        return redirect()->route('profile.edit')->with('error', 'Terjadi kesalahan pada proses pembayaran. Silakan coba lagi.');
    }
}
