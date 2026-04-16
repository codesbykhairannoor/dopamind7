<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'password' => ['required', Rules\Password::defaults()],
                'g-recaptcha-response' => 'required|string',
            ], [
                'g-recaptcha-response.required' => 'Verifikasi reCAPTCHA diperlukan.'
            ]);

            // Validate reCAPTCHA
            $recaptchaResponse = \Illuminate\Support\Facades\Http::timeout(5)->asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => config('services.recaptcha.secret'),
                'response' => $request->input('g-recaptcha-response'),
                'remoteip' => $request->ip()
            ]);

            if (!$recaptchaResponse->json('success')) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'g-recaptcha-response' => 'Verifikasi reCAPTCHA gagal atau invalid.'
                ]);
            }

            // Create User (Remove has_used_trial for PostgreSQL compatibility)
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'timezone' => $request->input('timezone', 'Asia/Jakarta'),
                'settings' => [
                    'modules' => [
                        'habit' => true,
                        'planner' => true,
                        'finance' => true,
                    ],
                    'currency' => 'IDR',
                    'timezone' => $request->input('timezone', 'Asia/Jakarta')
                ],
            ]);

            // Meta Pixel & CAPI Deduplication ID
            $metaEventId = (string) \Illuminate\Support\Str::uuid();

            // Paksa kirim email verifikasi secara langsung
            try {
                $user->sendEmailVerificationNotification();
                \Illuminate\Support\Facades\Log::info('Direct verification email triggered for: ' . $user->email);
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::error('Direct verification email FAILED: ' . $e->getMessage());
            }

            Auth::login($user);
            \Illuminate\Support\Facades\Log::info('User registered and logged in: ' . $user->id);

            // Send Server-Side Event (CAPI)
            try {
                $metaCapi = new \App\Services\MetaCapiService();
                $metaCapi->completeRegistration([
                    'id' => $user->id,
                    'email' => $user->email,
                    'first_name' => explode(' ', trim($user->name))[0] ?? $user->name,
                ], $metaEventId);
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::error('Meta CAPI Error on Registration: ' . $e->getMessage());
            }

            return redirect()->route('verification.notice')
                ->with('meta_event_id', $metaEventId)
                ->with('registration_success', true);

        } catch (\Illuminate\Validation\ValidationException $e) {
            throw $e;
        } catch (\Throwable $e) {
            // TAMPILKAN FULL ERROR JELAS DILAYAR TEPAT SEPERTI PERMINTAAN USER
            return back()->withErrors([
                'g-recaptcha-response' => 'CRITICAL ERROR: ' . $e->getMessage() . ' (File: ' . basename($e->getFile()) . ' Line: ' . $e->getLine() . ')'
            ])->withInput();
        }
    }
}
