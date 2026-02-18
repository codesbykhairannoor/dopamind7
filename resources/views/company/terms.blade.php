@extends('layouts.marketing')

@section('title', __('terms_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('terms_meta_desc') }}">
    <meta property="og:title" content="{{ __('terms_meta_og_title') }}">
    <meta property="og:description" content="{{ __('terms_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/company/terms') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (THE BLUEPRINT THEME) --}}
    <header class="relative pt-32 pb-24 px-6 bg-slate-50 border-b border-slate-200 overflow-hidden">
        {{-- Background Grid Pattern (Blueprint look) --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
        
        <div class="max-w-7xl mx-auto relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm">
                ⚖️ {{ __('terms_badge') }}
            </div>
            
            <h1 class="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
                {{ __('terms_title_1') }} <span class="text-indigo-600 decoration-4 underline decoration-indigo-200">{{ __('terms_title_2') }}</span>
            </h1>
            
            <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                {{ __('terms_subtitle') }}
            </p>

            <div class="mt-10 flex justify-center gap-2 text-sm font-mono text-slate-400">
                <span>DOC_ID: TOS-2026-V1</span>
                <span>•</span>
                <span>{{ __('terms_effective_date') }}</span>
            </div>
        </div>
    </header>

    {{-- SECTION 2: CONTENT WITH STICKY NAV --}}
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 relative">
            
            {{-- LEFT: Sticky Navigation --}}
            <aside class="hidden lg:block w-1/4 shrink-0 relative">
                <div class="sticky top-28 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 class="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">{{ __('terms_nav_title') }}</h3>
                    <nav class="space-y-1 font-medium text-sm text-slate-500" x-data="{ active: 'intro' }">
                        <a href="#intro" class="block px-4 py-2 rounded-lg transition hover:bg-white hover:text-indigo-600 hover:shadow-sm" :class="active === 'intro' ? 'bg-white text-indigo-600 shadow-sm font-bold' : ''" @click="active = 'intro'">1. Introduction</a>
                        <a href="#eligibility" class="block px-4 py-2 rounded-lg transition hover:bg-white hover:text-indigo-600 hover:shadow-sm" :class="active === 'eligibility' ? 'bg-white text-indigo-600 shadow-sm font-bold' : ''" @click="active = 'eligibility'">2. Eligibility</a>
                        <a href="#rules" class="block px-4 py-2 rounded-lg transition hover:bg-white hover:text-indigo-600 hover:shadow-sm" :class="active === 'rules' ? 'bg-white text-indigo-600 shadow-sm font-bold' : ''" @click="active = 'rules'">3. Code of Conduct</a>
                        <a href="#payment" class="block px-4 py-2 rounded-lg transition hover:bg-white hover:text-indigo-600 hover:shadow-sm" :class="active === 'payment' ? 'bg-white text-indigo-600 shadow-sm font-bold' : ''" @click="active = 'payment'">4. Payments</a>
                        <a href="#termination" class="block px-4 py-2 rounded-lg transition hover:bg-white hover:text-indigo-600 hover:shadow-sm" :class="active === 'termination' ? 'bg-white text-indigo-600 shadow-sm font-bold' : ''" @click="active = 'termination'">5. Termination</a>
                        <a href="#liability" class="block px-4 py-2 rounded-lg transition hover:bg-white hover:text-indigo-600 hover:shadow-sm" :class="active === 'liability' ? 'bg-white text-indigo-600 shadow-sm font-bold' : ''" @click="active = 'liability'">6. Liability</a>
                    </nav>
                </div>
            </aside>

            {{-- RIGHT: Content --}}
            <main class="w-full lg:w-3/4">
                
                <div class="prose prose-lg prose-slate max-w-none text-slate-600">
                    
                    {{-- 1. Intro --}}
                    <div id="intro" class="scroll-mt-32">
                        <p class="lead text-xl font-medium text-slate-800">{{ __('terms_intro_text') }}</p>
                        <p>{{ __('terms_intro_sub') }}</p>
                    </div>

                    <hr class="my-12 border-slate-100">

                    {{-- 2. Eligibility --}}
                    <h2 id="eligibility" class="scroll-mt-32 font-black text-slate-900">{{ __('terms_h2_eligibility') }}</h2>
                    <p>{{ __('terms_p_eligibility') }}</p>
                    <div class="not-prose grid sm:grid-cols-2 gap-4 mt-6 mb-10">
                        <div class="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-900 font-bold text-sm">
                            <span class="text-xl">🎂</span> {{ __('terms_eligibility_1') }}
                        </div>
                        <div class="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-900 font-bold text-sm">
                            <span class="text-xl">🤖</span> {{ __('terms_eligibility_2') }}
                        </div>
                    </div>

                    {{-- 3. Code of Conduct (SURPRISE VISUAL) --}}
                    <h2 id="rules" class="scroll-mt-32 font-black text-slate-900">{{ __('terms_h2_rules') }}</h2>
                    <p>{{ __('terms_p_rules') }}</p>
                    
                    {{-- Visual Do's and Don'ts --}}
                    <div class="not-prose grid md:grid-cols-2 gap-6 my-8">
                        {{-- DO's --}}
                        <div class="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                            <h4 class="text-emerald-800 font-black mb-4 flex items-center gap-2">
                                <span class="bg-emerald-200 text-emerald-700 rounded-full w-6 h-6 flex items-center justify-center text-xs">✓</span>
                                {{ __('terms_rules_do_title') }}
                            </h4>
                            <ul class="space-y-3 text-sm text-emerald-900/80 font-medium">
                                <li class="flex gap-2"><span>✓</span> {{ __('terms_rules_do_1') }}</li>
                                <li class="flex gap-2"><span>✓</span> {{ __('terms_rules_do_2') }}</li>
                                <li class="flex gap-2"><span>✓</span> {{ __('terms_rules_do_3') }}</li>
                            </ul>
                        </div>

                        {{-- DON'Ts --}}
                        <div class="bg-rose-50 rounded-2xl p-6 border border-rose-100">
                            <h4 class="text-rose-800 font-black mb-4 flex items-center gap-2">
                                <span class="bg-rose-200 text-rose-700 rounded-full w-6 h-6 flex items-center justify-center text-xs">✕</span>
                                {{ __('terms_rules_dont_title') }}
                            </h4>
                            <ul class="space-y-3 text-sm text-rose-900/80 font-medium">
                                <li class="flex gap-2"><span>✕</span> {{ __('terms_rules_dont_1') }}</li>
                                <li class="flex gap-2"><span>✕</span> {{ __('terms_rules_dont_2') }}</li>
                                <li class="flex gap-2"><span>✕</span> {{ __('terms_rules_dont_3') }}</li>
                            </ul>
                        </div>
                    </div>

                    {{-- 4. Payments --}}
                    <h2 id="payment" class="scroll-mt-32 font-black text-slate-900">{{ __('terms_h2_payment') }}</h2>
                    <p>{{ __('terms_p_payment') }}</p>
                    <ul>
                        <li><strong>{{ __('terms_li_payment_1_title') }}:</strong> {{ __('terms_li_payment_1_desc') }}</li>
                        <li><strong>{{ __('terms_li_payment_2_title') }}:</strong> {{ __('terms_li_payment_2_desc') }}</li>
                    </ul>

                    {{-- 5. Termination --}}
                    <h2 id="termination" class="scroll-mt-32 font-black text-slate-900">{{ __('terms_h2_termination') }}</h2>
                    <p>{{ __('terms_p_termination') }}</p>

                    {{-- 6. Liability --}}
                    <h2 id="liability" class="scroll-mt-32 font-black text-slate-900">{{ __('terms_h2_liability') }}</h2>
                    <div class="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-sm font-mono text-slate-600 uppercase tracking-tight">
                        {{ __('terms_legal_caps') }}
                    </div>

                </div>

                {{-- SURPRISE: SIGNATURE CTA --}}
                <div class="mt-16 pt-10 border-t border-slate-200">
                    <div class="bg-slate-900 rounded-[2rem] p-10 text-center relative overflow-hidden">
                        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        
                        <div class="relative z-10">
                            <h3 class="text-2xl font-black text-white mb-4">{{ __('terms_cta_title') }}</h3>
                            <p class="text-slate-400 mb-8 max-w-lg mx-auto">{{ __('terms_cta_desc') }}</p>
                            
                            <div class="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="{{ route('register') }}" class="px-8 py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-bold transition shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2">
                                    <span>✍️</span> {{ __('terms_cta_btn_agree') }}
                                </a>
                                <a href="{{ route('home') }}" class="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition flex items-center justify-center">
                                    {{ __('terms_cta_btn_decline') }}
                                </a>
                            </div>
                            <p class="text-xs text-slate-600 mt-6">{{ __('terms_cta_note') }}</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    </section>

@endsection