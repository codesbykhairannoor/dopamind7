@extends('layouts.marketing')

@section('title', __('solve_career_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('solve_career_meta_desc') }}">
    <meta property="og:title" content="{{ __('solve_career_meta_og_title') }}">
    <meta property="og:description" content="{{ __('solve_career_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/career-accelerator') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (Tetap dipertahankan sesuai request) --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 relative border-b border-gray-100">
        <div class="mt-20 absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] [background-size:40px_40px] -z-10"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            <div class="lg:col-span-7 animate-in fade-in slide-in-from-left-12 duration-700 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950 text-indigo-100 font-bold text-xs mb-8 uppercase tracking-wider shadow-lg">
                    💼 {{ __('solve_career_hero_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] text-gray-900 tracking-tight">
                    {{ __('solve_career_hero_title_1') }}
                    <span class="block py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {{ __('solve_career_hero_title_2') }}
                    </span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-2xl">
                    {{ __('solve_career_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
                        {{ __('solve_career_hero_cta') }}
                    </a>
                </div>
            </div>

            <div class="lg:col-span-5 relative z-10 w-full animate-in fade-in slide-in-from-right-12 duration-1000">
                <div class="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-400 to-rose-400 rounded-[2.5rem] blur opacity-20 animate-pulse duration-[4000ms]"></div>
                <div class="relative bg-white rounded-[2.5rem] shadow-2xl border border-white flex flex-col h-[500px] overflow-hidden transform transition hover:scale-[1.01] duration-500 p-8">
                    <div class="space-y-6">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="font-black text-gray-900 text-sm">{{ __('solve_career_mockup_header') }}</h4>
                            <span class="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-full">Live Tracking</span>
                        </div>
                        
                        <div class="space-y-3">
                            <div class="p-4 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-2xl">
                                <div class="flex justify-between items-center">
                                    <p class="font-bold text-indigo-950 text-xs">Google - Senior UX</p>
                                    <span class="text-[10px] font-bold text-indigo-600">Interviewing</span>
                                </div>
                            </div>
                            <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-2xl">
                                <div class="flex justify-between items-center">
                                    <p class="font-bold text-emerald-950 text-xs">Stripe - Product Lead</p>
                                    <span class="text-[10px] font-bold text-emerald-600">Offer Received 🎉</span>
                                </div>
                            </div>
                            <div class="p-4 bg-gray-50 border-l-4 border-gray-300 rounded-r-2xl">
                                <div class="flex justify-between items-center">
                                    <p class="font-bold text-gray-900 text-xs">Airbnb - Designer</p>
                                    <span class="text-[10px] font-bold text-gray-400">Applied</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 p-5 bg-slate-900 rounded-3xl text-white">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">🎯</div>
                                <div>
                                    <p class="text-[10px] font-bold text-indigo-300 uppercase">Growth Plan</p>
                                    <p class="text-xs font-bold">Learn Advanced Framer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE PROBLEM (THE RESUME BLACK HOLE) --}}
    <section class="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/50 rounded-full blur-[120px] pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-20">
                <h2 class="text-4xl md:text-5xl font-black mb-6">{{ __('solve_career_prob_title') }}</h2>
                <p class="text-xl text-slate-400">{{ __('solve_career_prob_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                {{-- Issue 1 --}}
                <div class="bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-700 hover:border-rose-500/50 transition-colors duration-300">
                    <div class="text-4xl mb-6">🕳️</div>
                    <h3 class="text-xl font-bold mb-3 text-white">{{ __('solve_career_prob_1_title') }}</h3>
                    <p class="text-slate-400 leading-relaxed">{{ __('solve_career_prob_1_desc') }}</p>
                </div>
                {{-- Issue 2 --}}
                <div class="bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-700 hover:border-amber-500/50 transition-colors duration-300">
                    <div class="text-4xl mb-6">📊</div>
                    <h3 class="text-xl font-bold mb-3 text-white">{{ __('solve_career_prob_2_title') }}</h3>
                    <p class="text-slate-400 leading-relaxed">{{ __('solve_career_prob_2_desc') }}</p>
                </div>
                {{-- Issue 3 --}}
                <div class="bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-700 hover:border-indigo-500/50 transition-colors duration-300">
                    <div class="text-4xl mb-6">👻</div>
                    <h3 class="text-xl font-bold mb-3 text-white">{{ __('solve_career_prob_3_title') }}</h3>
                    <p class="text-slate-400 leading-relaxed">{{ __('solve_career_prob_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: THE SOLUTION (THE PIPELINE FRAMEWORK) --}}
    <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-20 items-center">
                {{-- Left: Text --}}
                <div>
                    <div class="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl text-2xl mb-6 shadow-sm border border-indigo-100">⚙️</div>
                    <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                        {{ __('solve_career_sol_title') }}
                    </h2>
                    <p class="text-gray-500 text-lg leading-relaxed mb-8">
                        {{ __('solve_career_sol_desc') }}
                    </p>
                    
                    <div class="space-y-6">
                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                            <div>
                                <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('solve_career_sol_step_1_title') }}</h4>
                                <p class="text-gray-500">{{ __('solve_career_sol_step_1_desc') }}</p>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">2</div>
                            <div>
                                <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('solve_career_sol_step_2_title') }}</h4>
                                <p class="text-gray-500">{{ __('solve_career_sol_step_2_desc') }}</p>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">3</div>
                            <div>
                                <h4 class="text-xl font-bold text-gray-900 mb-2">{{ __('solve_career_sol_step_3_title') }}</h4>
                                <p class="text-gray-500">{{ __('solve_career_sol_step_3_desc') }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Right: Visual Kanban --}}
                <div class="relative bg-gray-50 p-8 rounded-[3rem] border border-gray-100 shadow-inner h-[600px] flex flex-col gap-4 overflow-hidden">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-200/50 to-transparent rounded-full blur-3xl"></div>
                    
                    {{-- Fake Kanban Columns --}}
                    <div class="flex gap-4 h-full relative z-10 overflow-hidden">
                        {{-- Col 1 --}}
                        <div class="w-1/2 flex flex-col gap-4">
                            <h5 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Wishlist</h5>
                            <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 opacity-60">
                                <div class="w-1/2 h-2 bg-gray-200 rounded mb-2"></div>
                                <div class="w-3/4 h-2 bg-gray-100 rounded"></div>
                            </div>
                            <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 opacity-60">
                                <div class="w-2/3 h-2 bg-gray-200 rounded mb-2"></div>
                                <div class="w-1/2 h-2 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                        {{-- Col 2 --}}
                        <div class="w-1/2 flex flex-col gap-4 transform translate-y-12">
                            <h5 class="text-xs font-bold text-indigo-400 uppercase tracking-widest">Interview</h5>
                            <div class="bg-indigo-600 p-5 rounded-2xl shadow-xl border border-indigo-500 transform hover:scale-105 transition duration-300">
                                <span class="bg-indigo-500 text-white text-[10px] px-2 py-1 rounded mb-3 inline-block">Final Round</span>
                                <h6 class="text-white font-bold mb-1">Product Designer</h6>
                                <p class="text-indigo-200 text-xs mb-4">TechCorp Inc.</p>
                                <div class="flex justify-between items-center border-t border-indigo-500/50 pt-3">
                                    <span class="text-indigo-100 text-xs font-medium">Tomorrow, 10 AM</span>
                                    <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">👨‍💼</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE ARSENAL (FEATURES BENTO) --}}
    <section class="py-32 bg-indigo-50/30 border-t border-indigo-50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-20">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('solve_career_feat_title') }}</h2>
                <p class="text-xl text-gray-500">{{ __('solve_career_feat_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {{-- Feat 1 --}}
                <div class="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-6">📑</div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ __('solve_career_feat_1_title') }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __('solve_career_feat_1_desc') }}</p>
                </div>
                {{-- Feat 2 --}}
                <div class="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-slate-900 p-10 rounded-[2.5rem] text-white shadow-xl">
                    <div class="text-4xl mb-6">🧠</div>
                    <h3 class="text-2xl font-bold text-white mb-3">{{ __('solve_career_feat_2_title') }}</h3>
                    <p class="text-indigo-200 leading-relaxed">{{ __('solve_career_feat_2_desc') }}</p>
                </div>
                {{-- Feat 3 --}}
                <div class="lg:col-span-4 bg-indigo-100/50 p-10 rounded-[2.5rem] border border-indigo-100 text-center">
                    <h3 class="text-2xl font-bold text-indigo-950 mb-3">{{ __('solve_career_feat_3_title') }}</h3>
                    <p class="text-indigo-800/70 max-w-2xl mx-auto">{{ __('solve_career_feat_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: CTA --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto text-center relative z-10 px-6">
            <div class="text-6xl mb-8 animate-bounce">🚀</div>
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-gray-900 tracking-tight">{{ __('solve_career_cta_title') }}</h2>
            <p class="text-gray-500 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
                {{ __('solve_career_cta_desc') }}
            </p>
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-gray-900 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-600 transition-colors duration-300 shadow-2xl hover:shadow-indigo-500/50">
                {{ __('solve_career_cta_btn') }}
            </a>
        </div>
    </section>

@endsection