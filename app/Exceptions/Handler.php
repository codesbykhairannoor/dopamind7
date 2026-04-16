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
            \Illuminate\Support\Facades\Log::error('Exception Captured in Handler:', [
                'message' => $e->getMessage(),
                'class' => get_class($e),
                'trace' => $e->getTraceAsString()
            ]);
        });

        // 🔥 TAMBAHKAN LOGIC INI DISINI
        $this->renderable(function (Throwable $e, $request) {
            // JANGAN menyentuh error validasi atau auth (biarkan Laravel redirect balik dengan error)
            if ($e instanceof \Illuminate\Validation\ValidationException || 
                $e instanceof \Illuminate\Auth\AuthenticationException) {
                return null;
            }

            $status = $this->isHttpException($e) ? $e->getStatusCode() : 500;

            // 🔥 HANYA render halaman Error cantik jika kita sedanga di PRODUCTION (Debug False)
            if (!config('app.debug')) {
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