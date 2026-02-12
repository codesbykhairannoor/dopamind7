<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia; // 🔥 Import Inertia

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        // 🔥 TAMBAHKAN LOGIC INI DISINI
        $this->renderable(function (Throwable $e, $request) {
            // Cek jika aplikasi tidak sedang dalam mode debug (Production)
            // Dan cek jika ini adalah request dari Inertia
            if (!config('app.debug')) {
                $status = $this->isHttpException($e) ? $e->getStatusCode() : 500;

                // Hanya tangkap error berat (500, 503, 404, 403)
                if (in_array($status, [500, 503, 404, 403])) {
                    return Inertia::render('Error', [
                        'status' => $status
                    ])->toResponse($request)->setStatusCode($status);
                }
            }

            return null;
        });
    }
}