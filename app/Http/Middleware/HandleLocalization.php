<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class HandleLocalization
{
    public function handle(Request $request, Closure $next): Response
    {
        // 1. PRIORITAS UTAMA: Jika session sudah ada, pakai itu dan LANGSUNG LANJUT.
        // Ini mencegah "bahasa mental balik ke English" setelah 1 detik di Production.
        if (Session::has('locale')) {
            App::setLocale(Session::get('locale'));
            return $next($request); 
        }

        // 2. Jika BELUM ADA Session (Pengunjung Baru), baru deteksi lokasi
        try {
            $detectedLocale = 'en'; // Default
            $ip = $request->ip();

            // Skip deteksi jika di localhost
            if ($ip !== '127.0.0.1' && $ip !== '::1') {
                // Gunakan HTTPS (Wajib di Railway)
                $response = Http::timeout(2)->get("https://ipapi.co/{$ip}/json/");

                if ($response->successful()) {
                    $data = $response->json();
                    // ipapi.co menggunakan 'country_code'
                    if (isset($data['country_code']) && $data['country_code'] === 'ID') {
                        $detectedLocale = 'id';
                    }
                }
            }

            // 3. Simpan hasil deteksi ke Session agar request berikutnya gak nembak API lagi
            Session::put('locale', $detectedLocale);
            Session::save(); // Paksa tulis ke storage
            App::setLocale($detectedLocale);

        } catch (\Exception $e) {
            App::setLocale('en');
        }

        return $next($request);
    }
}