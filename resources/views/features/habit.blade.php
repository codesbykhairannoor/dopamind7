@extends('layouts.marketing')

@section('title', __('habit_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('habit_meta_desc') }}">
    <meta property="og:title" content="{{ __('habit_meta_og_title') }}">
    <meta property="og:description" content="{{ __('habit_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/features/habit') }}">
@endsection

@section('content')

   {{-- SECTION 1: HERO (CENTERED LAYOUT + FLOATING HABIT MOCKUP) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-gray-50 relative border-b border-gray-100">
        {{-- Background Glow --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>

        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    <span class="text-lg">🌱</span> {{ __('habit_hero_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('habit_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('habit_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                    {{ __('habit_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        {{ __('habit_hero_cta_1') }}
                    </a>
                    <a href="#how-it-works" class="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-full font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition">
                        {{ __('habit_hero_cta_2') }}
                    </a>
                </div>
            </div>

            {{-- Floating Mockup Centered --}}
            <div class="relative w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
                <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-20"></div>
                <div class="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-8 md:p-10 transform transition hover:scale-[1.02] duration-500">
                    
                    <div class="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                        <div class="text-left">
                            <h3 class="font-black text-gray-900 text-2xl mb-1">{{ __('habit_mockup_title') }} ☀️</h3>
                        </div>
                        <div class="bg-green-50 text-green-700 px-4 py-2 rounded-2xl border border-green-100 flex items-center gap-3">
                            <span class="text-2xl">🔥</span>
                            <div class="text-left">
                                <span class="text-[10px] font-bold uppercase block leading-none opacity-70 mb-0.5">Current Streak</span>
                                <span class="font-black text-lg leading-tight">{{ __('habit_mockup_streak') }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        {{-- Task 1 (Done) --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-2xl transition border border-gray-100 hover:border-indigo-100 cursor-pointer bg-gray-50/50">
                            <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm shadow-sm">✓</div>
                            <div class="flex-1 text-left opacity-60 line-through">
                                <p class="font-bold text-gray-900">{{ __('habit_mockup_task_1') }}</p>
                                <p class="text-sm text-gray-500">{{ __('habit_mockup_time_1') }}</p>
                            </div>
                        </div>
                        
                        {{-- Task 2 (Done) --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-2xl transition border border-gray-100 hover:border-indigo-100 cursor-pointer bg-gray-50/50">
                            <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm shadow-sm">✓</div>
                            <div class="flex-1 text-left opacity-60 line-through">
                                <p class="font-bold text-gray-900">{{ __('habit_mockup_task_2') }}</p>
                                <p class="text-sm text-gray-500">{{ __('habit_mockup_time_2') }}</p>
                            </div>
                        </div>

                        {{-- Task 3 (Active/Pending) --}}
                        <div class="flex items-center gap-4 p-4 bg-white rounded-2xl transition border-2 border-indigo-200 hover:border-indigo-400 cursor-pointer shadow-sm transform scale-[1.02]">
                            <div class="w-8 h-8 rounded-full border-2 border-indigo-300 flex items-center justify-center"></div>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-indigo-900">{{ __('habit_mockup_task_3') }}</p>
                                <p class="text-sm text-indigo-600">{{ __('habit_mockup_time_3') }}</p>
                            </div>
                            <div class="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-sm shadow-indigo-400"></div>
                        </div>
                    </div>

                    {{-- Floating Element (Level Up Badge) --}}
                    <div class="absolute -right-8 -bottom-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20 animate-bounce duration-[3000ms]">
                        <div class="flex items-center gap-3">
                            <div class="text-3xl">🏆</div>
                            <div class="text-left">
                                <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{{ __('habit_mockup_alert_1') }}</p>
                                <p class="font-black text-indigo-900 text-sm">{{ __('habit_mockup_alert_2') }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>
    
    {{-- SECTION 2: PROBLEM AWARENESS (Kenapa butuh fitur ini?) --}}
    <section class="py-24 bg-white">
        <div class="max-w-6xl mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-4xl font-black mb-16 text-gray-900 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                {{ __('habit_prob_title_1') }} <span class="text-red-500 line-through">{{ __('habit_prob_title_strike') }}</span> {{ __('habit_prob_title_2') }}
            </h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-red-50/50 p-8 rounded-[2rem] border border-red-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                    <div class="text-4xl mb-4">📉</div>
                    <h3 class="text-xl font-bold mb-2 text-gray-900">{{ __('habit_prob_1_title') }}</h3>
                    <p class="text-gray-500">{{ __('habit_prob_1_desc') }}</p>
                </div>
                <div class="bg-orange-50/50 p-8 rounded-[2rem] border border-orange-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
                    <div class="text-4xl mb-4">🥱</div>
                    <h3 class="text-xl font-bold mb-2 text-gray-900">{{ __('habit_prob_2_title') }}</h3>
                    <p class="text-gray-500">{{ __('habit_prob_2_desc') }}</p>
                </div>
                <div class="bg-gray-50 p-8 rounded-[2rem] border border-gray-200 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                    <div class="text-4xl mb-4">🤯</div>
                    <h3 class="text-xl font-bold mb-2 text-gray-900">{{ __('habit_prob_3_title') }}</h3>
                    <p class="text-gray-500">{{ __('habit_prob_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: ZIG-ZAG FEATURE 1 (Visual Kiri, Teks Kanan) --}}
    <section id="how-it-works" class="py-24 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="relative h-96 bg-indigo-100 rounded-[3rem] overflow-hidden flex items-center justify-center animate-in slide-in-from-left-12 fade-in duration-700 fill-mode-both">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 opacity-50"></div>
                <div class="text-8xl relative z-10 animate-pulse duration-[3000ms]">📊</div>
            </div>
            <div class="animate-in slide-in-from-right-12 fade-in duration-700 delay-100 fill-mode-both">
                <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🎯</div>
                <h2 class="text-3xl font-black mb-4 text-gray-900">{{ __('habit_feature_1_title') }}</h2>
                <p class="text-gray-500 text-lg leading-relaxed mb-6">
                    {{ __('habit_feature_1_desc') }}
                </p>
                <ul class="space-y-3 font-medium text-gray-600">
                    <li class="flex items-center gap-3"><span class="text-indigo-600">✓</span> {{ __('habit_feature_1_point_1') }}</li>
                    <li class="flex items-center gap-3"><span class="text-indigo-600">✓</span> {{ __('habit_feature_1_point_2') }}</li>
                </ul>
            </div>
        </div>
    </section>

    {{-- SECTION 4: ZIG-ZAG FEATURE 2 (Teks Kiri, Visual Kanan) --}}
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1 animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both">
                <div class="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🔥</div>
                <h2 class="text-3xl font-black mb-4 text-gray-900">{{ __('habit_feature_2_title') }}</h2>
                <p class="text-gray-500 text-lg leading-relaxed mb-6">
                    {{ __('habit_feature_2_desc') }}
                </p>
                <ul class="space-y-3 font-medium text-gray-600">
                    <li class="flex items-center gap-3"><span class="text-green-500">✓</span> {{ __('habit_feature_2_point_1') }}</li>
                    <li class="flex items-center gap-3"><span class="text-green-500">✓</span> {{ __('habit_feature_2_point_2') }}</li>
                </ul>
            </div>
            <div class="order-1 md:order-2 relative h-96 bg-green-50 rounded-[3rem] overflow-hidden flex items-center justify-center animate-in slide-in-from-right-12 fade-in duration-700 fill-mode-both">
                <div class="absolute inset-0 bg-gradient-to-tl from-green-200 to-emerald-100 opacity-50"></div>
                <div class="text-8xl relative z-10 transform hover:scale-110 transition duration-500 cursor-pointer">🔥🔥</div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: BENTO BOX GRID (Fitur Pelengkap ala Notion/ClickUp) --}}
    <section class="py-24 bg-gray-50 border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                <h2 class="text-3xl font-black text-gray-900 mb-4">{{ __('habit_bento_title') }}</h2>
                <p class="text-gray-500 text-lg">{{ __('habit_bento_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-6 auto-rows-[250px]">
                {{-- Bento 1: Lebar --}}
                <div class="md:col-span-2 bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm hover:shadow-lg transition group overflow-hidden relative">
                    <div class="absolute right-0 top-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition duration-500"></div>
                    <div class="text-3xl mb-4">🔔</div>
                    <h3 class="text-xl font-bold mb-2">{{ __('habit_bento_1_title') }}</h3>
                    <p class="text-gray-500 text-sm">{{ __('habit_bento_1_desc') }}</p>
                </div>
                
                {{-- Bento 2: Kotak --}}
                <div class="bg-indigo-950 text-white rounded-[2rem] p-8 shadow-xl hover:-translate-y-1 transition group relative overflow-hidden">
                    <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-600 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition"></div>
                    <div class="text-3xl mb-4 relative z-10">🌙</div>
                    <h3 class="text-xl font-bold mb-2 relative z-10">{{ __('habit_bento_2_title') }}</h3>
                    <p class="text-indigo-200 text-sm relative z-10">{{ __('habit_bento_2_desc') }}</p>
                </div>

                {{-- Bento 3: Kotak --}}
                <div class="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm hover:shadow-lg transition group">
                    <div class="text-3xl mb-4">🔗</div>
                    <h3 class="text-xl font-bold mb-2">{{ __('habit_bento_3_title') }}</h3>
                    <p class="text-gray-500 text-sm">{{ __('habit_bento_3_desc') }}</p>
                </div>

                {{-- Bento 4: Lebar --}}
                <div class="md:col-span-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-[2rem] p-8 border border-indigo-100 shadow-sm hover:shadow-lg transition group relative overflow-hidden">
                    <div class="text-3xl mb-4">📱</div>
                    <h3 class="text-xl font-bold mb-2 text-indigo-900">{{ __('habit_bento_4_title') }}</h3>
                    <p class="text-indigo-700/70 text-sm max-w-sm">{{ __('habit_bento_4_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: QUOTE / SOSIAL PROOF --}}
    <section class="py-24 bg-white">
        <div class="max-w-4xl mx-auto px-6 text-center animate-in zoom-in-95 fade-in duration-700 fill-mode-both">
            <div class="text-5xl text-indigo-200 mb-6">"</div>
            <h2 class="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-8">
                {{ __('habit_quote_text') }}
            </h2>
            <p class="text-gray-500 font-bold tracking-widest uppercase text-sm">{{ __('habit_quote_author') }}</p>
        </div>
    </section>

    {{-- SECTION 7: BOTTOM CTA --}}
    <section class="py-24 px-6 text-center">
        <div class="max-w-5xl mx-auto bg-indigo-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse duration-[5000ms]"></div>
            
            <div class="relative z-10">
                <h2 class="text-4xl md:text-5xl font-black mb-6">{{ __('habit_cta_title') }}</h2>
                <p class="text-indigo-200 text-lg mb-10 max-w-2xl mx-auto">
                    {{ __('habit_cta_desc') }}
                </p>
                <a href="{{ route('register') }}" class="inline-block bg-white text-indigo-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-50 hover:scale-105 transition transform shadow-xl">
                    {{ __('habit_cta_btn') }}
                </a>
                <p class="mt-6 text-sm text-indigo-300">{{ __('habit_cta_note') }}</p>
            </div>
        </div>
    </section>

@endsection