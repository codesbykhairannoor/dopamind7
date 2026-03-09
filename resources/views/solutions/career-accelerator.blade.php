@extends('layouts.marketing')

@section('title', __('solve_career_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('solve_career_meta_desc') }}">
    <meta property="og:title" content="{{ __('solve_career_meta_og_title') }}">
    <meta property="og:description" content="{{ __('solve_career_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/solutions/career-accelerator') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO --}}
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
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
                        {{ __('solve_career_hero_cta') }}
                    </a>
                </div>
            </div>

            <div class="lg:col-span-5 relative z-10 w-full animate-in fade-in slide-in-from-right-12 duration-1000">
                <div class="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-400 to-rose-400 rounded-[2.5rem] blur opacity-20 animate-pulse duration-[4000ms]"></div>
                <div class="relative bg-white rounded-[2.5rem] shadow-2xl border border-white flex flex-col h-[500px] overflow-hidden transform transition hover:scale-[1.01] duration-500 p-8">
                    <div class="space-y-6">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="font-black text-gray-900 text-sm">Application Funnel</h4>
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

    {{-- SECTION 2: PROBLEMS --}}
    <section class="py-24 bg-white">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('solve_career_prob_title') }}</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="p-10 bg-indigo-50 rounded-[2.5rem] border border-indigo-100">
                    <h3 class="text-xl font-bold mb-4 text-indigo-950">{{ __('solve_career_feat_1_title') }}</h3>
                    <p class="text-indigo-900/70 leading-relaxed">{{ __('solve_career_feat_1_desc') }}</p>
                </div>
                <div class="p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-xl">
                    <h3 class="text-xl font-bold mb-4 text-indigo-300">{{ __('solve_career_feat_2_title') }}</h3>
                    <p class="text-slate-400 leading-relaxed">{{ __('solve_career_feat_2_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

@endsection
