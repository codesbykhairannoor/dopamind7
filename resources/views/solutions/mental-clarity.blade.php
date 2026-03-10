@extends('layouts.marketing')

@section('title', __('solve_mental_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('solve_mental_meta_desc') }}">
    <meta property="og:title" content="{{ __('solve_mental_meta_og_title') }}">
    <meta property="og:description" content="{{ __('solve_mental_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/mental-clarity') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (Dipertahankan sesuai template lo) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 relative border-b border-gray-100">
        <div class="mt-20 absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] [background-size:40px_40px] -z-10"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            <div class="lg:col-span-7 animate-in fade-in slide-in-from-left-12 duration-700 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950 text-indigo-100 font-bold text-xs mb-8 uppercase tracking-wider shadow-lg">
                    🧘 {{ __('solve_mental_hero_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] text-gray-900 tracking-tight">
                    {{ __('solve_mental_hero_title_1') }}
                    <span class="block py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {{ __('solve_mental_hero_title_2') }}
                    </span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-2xl">
                    {{ __('solve_mental_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
                        {{ __('solve_mental_hero_cta') }}
                    </a>
                </div>
            </div>

            <div class="lg:col-span-5 relative z-10 w-full animate-in fade-in slide-in-from-right-12 duration-1000">
                <div class="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-400 to-rose-400 rounded-[2.5rem] blur opacity-20 animate-pulse duration-[4000ms]"></div>
                <div class="relative bg-white rounded-[2.5rem] shadow-2xl border border-white flex flex-col h-[500px] overflow-hidden transform transition hover:scale-[1.01] duration-500 p-8">
                    <div class="flex-grow flex flex-col justify-center">
                        <div class="text-center mb-8">
                            <h4 class="font-serif italic text-2xl text-gray-800 mb-2">"Find stillness in the movement."</h4>
                            <p class="text-xs uppercase tracking-widest text-gray-400">Zen Journal Entry #42</p>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                                <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl">🧘</div>
                                <div>
                                    <p class="text-xs font-bold text-indigo-950">Meditation</p>
                                    <p class="text-[10px] text-indigo-600">Daily Streak: 12 Days</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                                <div class="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-xl">📔</div>
                                <div>
                                    <p class="text-xs font-bold text-purple-950">Gratitude Journal</p>
                                    <p class="text-[10px] text-purple-600">Morning routine complete</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-xl">✨</div>
                                <div>
                                    <p class="text-xs font-bold text-emerald-950">Current Mood</p>
                                    <p class="text-[10px] text-emerald-600">Feeling: Calibrated</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (THE BRAIN FOG) --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900">{{ __('solve_mental_prob_title') }}</h2>
            <p class="text-xl text-gray-500 mb-16 leading-relaxed">
                {{ __('solve_mental_prob_desc') }}
            </p>

            <div class="grid md:grid-cols-2 gap-6 text-left">
                <div class="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                    <div class="text-3xl mb-4">🌪️</div>
                    <h3 class="text-lg font-bold mb-2 text-gray-900">{{ __('solve_mental_prob_1_title') }}</h3>
                    <p class="text-gray-500 text-sm">{{ __('solve_mental_prob_1_desc') }}</p>
                </div>
                <div class="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                    <div class="text-3xl mb-4">📱</div>
                    <h3 class="text-lg font-bold mb-2 text-gray-900">{{ __('solve_mental_prob_2_title') }}</h3>
                    <p class="text-gray-500 text-sm">{{ __('solve_mental_prob_2_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION (THE SANCTUARY / ZEN CARDS) --}}
    <section class="py-32 bg-slate-900 text-white relative">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="grid lg:grid-cols-12 gap-12">
                {{-- Text Content --}}
                <div class="lg:col-span-5 flex flex-col justify-center">
                    <h2 class="text-4xl md:text-5xl font-black mb-6 leading-tight">
                        {{ __('solve_mental_sol_title') }}
                    </h2>
                    <p class="text-indigo-200 text-lg leading-relaxed mb-8">
                        {{ __('solve_mental_sol_desc') }}
                    </p>
                    <ul class="space-y-6">
                        <li class="flex items-start gap-4">
                            <span class="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">1</span>
                            <div>
                                <h4 class="font-bold text-white">{{ __('solve_mental_sol_step_1_title') }}</h4>
                                <p class="text-sm text-slate-400 mt-1">{{ __('solve_mental_sol_step_1_desc') }}</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <span class="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">2</span>
                            <div>
                                <h4 class="font-bold text-white">{{ __('solve_mental_sol_step_2_title') }}</h4>
                                <p class="text-sm text-slate-400 mt-1">{{ __('solve_mental_sol_step_2_desc') }}</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <span class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">3</span>
                            <div>
                                <h4 class="font-bold text-white">{{ __('solve_mental_sol_step_3_title') }}</h4>
                                <p class="text-sm text-slate-400 mt-1">{{ __('solve_mental_sol_step_3_desc') }}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {{-- Visual Content (Glassmorphism Cards) --}}
                <div class="lg:col-span-7 relative h-[600px] perspective-1000 flex items-center justify-center">
                    {{-- Back Card (Blurry) --}}
                    <div class="absolute w-80 h-96 bg-white/5 backdrop-blur-sm rounded-[3rem] border border-white/10 transform -rotate-6 translate-x-12 translate-y-8 p-8 flex flex-col justify-end">
                        <div class="w-full h-2 bg-white/10 rounded-full mb-3"></div>
                        <div class="w-2/3 h-2 bg-white/10 rounded-full"></div>
                    </div>
                    
                    {{-- Front Card (Journal Entry) --}}
                    <div class="absolute w-80 md:w-96 h-auto bg-white/10 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition duration-500 z-10">
                        <div class="flex justify-between items-start mb-8">
                            <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">🖋️</div>
                            <span class="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-200">Daily Dump</span>
                        </div>
                        <p class="font-serif text-xl italic text-white/90 leading-relaxed mb-6">
                            "Feeling overwhelmed by the sheer amount of tasks today. Writing this down to let it out. I will focus on just ONE thing right now."
                        </p>
                        <div class="flex gap-2">
                            <span class="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">Relieved</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE TOOLKIT (BENTO GRID) --}}
    <section class="py-32 bg-indigo-50/50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('solve_mental_feat_title') }}</h2>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8">
                <div class="p-12 bg-white rounded-[3rem] border border-indigo-100 shadow-sm group hover:-translate-y-2 transition duration-300">
                    <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6">📝</div>
                    <h3 class="text-2xl font-bold mb-4 text-gray-900">{{ __('solve_mental_feat_1_title') }}</h3>
                    <p class="text-gray-500 leading-relaxed text-lg">{{ __('solve_mental_feat_1_desc') }}</p>
                </div>
                <div class="p-12 bg-indigo-950 rounded-[3rem] text-white shadow-xl group hover:-translate-y-2 transition duration-300">
                    <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6">📉</div>
                    <h3 class="text-2xl font-bold mb-4 text-indigo-300">{{ __('solve_mental_feat_2_title') }}</h3>
                    <p class="text-indigo-100/70 leading-relaxed text-lg">{{ __('solve_mental_feat_2_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: CTA --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-purple-100 to-transparent rounded-full blur-3xl opacity-50 -z-10"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10 px-6">
            <div class="text-6xl mb-8 animate-pulse duration-3000">🕊️</div>
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-gray-900 tracking-tight">{{ __('solve_mental_cta_title') }}</h2>
            <p class="text-gray-500 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
                {{ __('solve_mental_cta_desc') }}
            </p>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-indigo-950 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-800 transition-colors duration-300 shadow-2xl">
                {{ __('solve_mental_cta_btn') }}
            </a>
        </div>
    </section>

@endsection