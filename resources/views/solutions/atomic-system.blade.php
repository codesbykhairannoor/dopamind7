@extends('layouts.marketing')

@section('title', __('atomic_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('atomic_meta_desc') }}">
    <meta property="og:title" content="{{ __('atomic_meta_og_title') }}">
    <meta property="og:description" content="{{ __('atomic_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/atomic-system') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (CENTERED LAYOUT - INDIGO) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white relative border-b border-gray-100">
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] -z-10"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-400/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {{-- Icon / Gambar Dulu --}}
            <div class="flex justify-center mb-8">
                <div class="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] shadow-2xl shadow-indigo-200 flex items-center justify-center text-4xl transform rotate-3 hover:rotate-0 transition duration-300">
                    🌱
                </div>
            </div>

            {{-- Badge --}}
            <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-6 uppercase tracking-widest border border-indigo-100 shadow-sm">
                {{ __('atomic_hero_badge') }}
            </div>
            
            {{-- Teks Utama --}}
            <h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight text-gray-900 tracking-tight">
                {{ __('atomic_hero_title_1') }}<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {{ __('atomic_hero_title_2') }}
                </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
                {{ __('atomic_hero_desc') }}
            </p>
            
            {{-- CTA --}}
            <div class="flex justify-center gap-4 mb-24">
                <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.4)] transition transform hover:-translate-y-1">
                    {{ __('atomic_hero_cta') }}
                </a>
            </div>

            {{-- Visual Bawah (Lebar & Interactive Vibe) --}}
            <div class="relative w-full max-w-4xl mx-auto rounded-[2.5rem] bg-white p-3 shadow-2xl border border-gray-100 transform perspective-1000 rotate-x-6 hover:rotate-x-0 transition-transform duration-700">
                <div class="absolute inset-0 bg-indigo-500 rounded-[2.5rem] blur-2xl opacity-10 -z-10"></div>
                <div class="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-gray-100 overflow-hidden relative text-left flex flex-col md:flex-row gap-8 items-center">
                    
                    <div class="flex-1 space-y-4 z-10">
                        <h4 class="font-black text-gray-900 text-2xl">{{ __('atomic_mockup_title') }}</h4>
                        <p class="text-gray-500 font-medium">{{ __('atomic_mockup_desc') }}</p>
                        <div class="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200">
                            <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            <span class="text-xs font-bold text-gray-700">Day 14 Streak</span>
                        </div>
                    </div>

                    <div class="flex-1 w-full relative h-40 border-b-2 border-l-2 border-gray-200 flex items-end justify-between gap-1 px-2 pt-4">
                        {{-- Grafik Compounding Indigo --}}
                        @for($i = 1; $i <= 15; $i++)
                            <div class="w-full bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t-sm opacity-{{ min($i * 5 + 20, 100) }} hover:opacity-100 transition-opacity cursor-pointer group relative" style="height: {{ pow(1.18, $i) * 2.5 }}px">
                                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-20">Day {{ $i }}</div>
                            </div>
                        @endfor
                        <div class="absolute -right-4 -top-6 bg-white px-4 py-2 rounded-xl shadow-xl font-bold text-indigo-600 text-sm border border-indigo-50 flex items-center gap-2 transform rotate-3">
                            🚀 +37x Returns
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM --}}
    <section class="py-32 bg-white relative">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900">{{ __('atomic_prob_title') }}</h2>
                <p class="text-xl text-gray-500 max-w-2xl mx-auto">{{ __('atomic_prob_desc') }}</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12">
                <div class="bg-rose-50/50 p-12 rounded-[3rem] border border-rose-100 text-center hover:shadow-xl transition-shadow duration-300">
                    <div class="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm text-4xl mb-6">📉</div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ __('atomic_prob_1_title') }}</h3>
                    <p class="text-gray-600 leading-relaxed text-lg">{{ __('atomic_prob_1_desc') }}</p>
                </div>
                <div class="bg-gray-50 p-12 rounded-[3rem] border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
                    <div class="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm text-4xl mb-6">🔁</div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ __('atomic_prob_2_title') }}</h3>
                    <p class="text-gray-600 leading-relaxed text-lg">{{ __('atomic_prob_2_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE FRAMEWORK (DARK INDIGO MODE) --}}
    <section class="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="text-center mb-24">
                <h2 class="text-4xl md:text-6xl font-black mb-6">{{ __('atomic_sol_title') }}</h2>
                <p class="text-indigo-200 text-xl max-w-2xl mx-auto">{{ __('atomic_sol_desc') }}</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-slate-800/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-700 hover:-translate-y-2 transition-transform duration-300">
                    <span class="text-indigo-400 font-black text-5xl mb-6 block opacity-50">01</span>
                    <h4 class="text-2xl font-bold text-white mb-4">{{ __('atomic_step_1_title') }}</h4>
                    <p class="text-slate-400 leading-relaxed">{{ __('atomic_step_1_desc') }}</p>
                </div>
                <div class="bg-slate-800/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-700 hover:-translate-y-2 transition-transform duration-300 delay-100">
                    <span class="text-indigo-400 font-black text-5xl mb-6 block opacity-50">02</span>
                    <h4 class="text-2xl font-bold text-white mb-4">{{ __('atomic_step_2_title') }}</h4>
                    <p class="text-slate-400 leading-relaxed">{{ __('atomic_step_2_desc') }}</p>
                </div>
                <div class="bg-indigo-600 p-10 rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-transform duration-300 delay-200 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-6 opacity-20 text-8xl">💎</div>
                    <span class="text-indigo-300 font-black text-5xl mb-6 block">03</span>
                    <h4 class="text-2xl font-bold text-white mb-4">{{ __('atomic_step_3_title') }}</h4>
                    <p class="text-indigo-100 leading-relaxed">{{ __('atomic_step_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: CTA --}}
    <section class="py-40 bg-white text-center px-6 relative overflow-hidden">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-indigo-50 to-white rounded-t-full -z-10"></div>
        
        <div class="max-w-4xl mx-auto">
            <h2 class="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">{{ __('atomic_cta_title') }}</h2>
            <p class="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">{{ __('atomic_cta_desc') }}</p>
            <a href="{{ route('register') }}" class="inline-block bg-indigo-950 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-800 shadow-2xl transition transform hover:-translate-y-1">
                {{ __('atomic_cta_btn') }}
            </a>
        </div>
    </section>
@endsection