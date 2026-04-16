<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['nullable', 'boolean'],
            'g-recaptcha-response' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'g-recaptcha-response.required' => 'Verifikasi reCAPTCHA diperlukan.',
        ];
    }

    public function authenticate(): void
{
    $this->ensureIsNotRateLimited();

    // Validate reCAPTCHA
    $recaptchaResponse = \Illuminate\Support\Facades\Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
        'secret' => config('services.recaptcha.secret'),
        'response' => $this->input('g-recaptcha-response'),
        'remoteip' => $this->ip()
    ]);

    if (!$recaptchaResponse->json('success')) {
        throw ValidationException::withMessages([
            'g-recaptcha-response' => 'Verifikasi reCAPTCHA gagal atau invalid.',
        ]);
    }

    if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
        RateLimiter::hit($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.failed'),
        ]);
    }

    // --- LOGIKA UPDATE TIMEZONE GLOBAL ---
    $user = Auth::user();
    // Ambil timezone dari request (dikirim dari Vue tadi)
    $detectedTimezone = $this->input('timezone');

    // Validasi apakah timezone-nya valid, jika tidak pakai UTC
    if ($detectedTimezone && in_array($detectedTimezone, timezone_identifiers_list())) {
        $user->update(['timezone' => $detectedTimezone]);
    }

    RateLimiter::clear($this->throttleKey());
}
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    public function throttleKey(): string
    {
        // Menggabungkan email dan IP untuk kunci rate limit
        return Str::transliterate(Str::lower($this->input('email')).'|'.$this->ip());
    }
}