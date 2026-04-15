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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class ,
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'settings' => [
                'modules' => [
                    'habit' => true,
                    'planner' => true,
                    'finance' => true,
                ],
                'currency' => 'IDR',
                'timezone' => 'Asia/Jakarta'
            ],
        ]);

        // Meta Pixel & CAPI Deduplication ID
        $metaEventId = (string) \Illuminate\Support\Str::uuid();

        try {
            event(new Registered($user));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Registration Email Error: ' . $e->getMessage());
        }

        Auth::login($user);

        // Send Server-Side Event (CAPI)
        try {
            $metaCapi = new \App\Services\MetaCapiService();
            $metaCapi->completeRegistration([
                'id' => $user->id,
                'email' => $user->email,
                'first_name' => explode(' ', trim($user->name))[0] ?? $user->name,
            ], $metaEventId);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Meta CAPI Error on Registration: ' . $e->getMessage());
        }

        return redirect(RouteServiceProvider::HOME)->with('meta_event_id', $metaEventId);
    }
}
