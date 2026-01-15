<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Http; // 🔥 Kita butuh ini buat nembak API
use Symfony\Component\HttpFoundation\Response;

class HandleLocalization
{
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Cek apakah session locale SUDAH ADA?
        if (Session::has('locale')) {
            // Kalau ada (user pernah ganti manual atau sudah dideteksi sebelumnya), pakai itu.
            App::setLocale(Session::get('locale'));
        } 
        else {
            // 2. Kalau BELUM ADA (Pengunjung Baru), kita deteksi lokasinya
            try {
                // Default bahasa Inggris dulu
                $detectedLocale = 'en';

                // Ambil IP User
                $ip = $request->ip();

                // ⚠️ PENTING: Kalau di Localhost (127.0.0.1), IP API gak bisa deteksi.
                // Jadi kita skip request API kalau di localhost biar gak error.
                if ($ip !== '127.0.0.1' && $ip !== '::1') {
                    
                    // Tembak API gratisan (ip-api.com)
                    // Timeout 2 detik aja, biar kalau API mati, web kita gak ikut lemot
                    $response = Http::timeout(2)->get("http://ip-api.com/json/{$ip}");

                    if ($response->successful()) {
                        $data = $response->json();
                        
                        // Cek Country Code-nya
                        if (isset($data['countryCode']) && $data['countryCode'] === 'ID') {
                            $detectedLocale = 'id';
                        }
                    }
                }

                // 3. Simpan hasil deteksi ke Session & App
                Session::put('locale', $detectedLocale);
                App::setLocale($detectedLocale);

            } catch (\Exception $e) {
                // Kalau ada error (internet putus/API down), fallback ke Inggris aman
                Session::put('locale', 'en');
                App::setLocale('en');
            }
        }

        return $next($request);
    }
}