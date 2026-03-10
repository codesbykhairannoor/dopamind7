@extends('layouts.marketing')

@section('title', __('comm_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('comm_meta_desc') }}">
    <meta property="og:title" content="{{ __('comm_meta_title') }}">
    <meta property="og:description" content="{{ __('comm_meta_desc') }}">
    <meta property="og:url" content="{{ url('/resources/community') }}">
@endsection

@section('content')

        <header class="pt-48 pb-32 px-6 relative bg-white">
        {{-- Elegant Minimalist Background --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] [background-size:64px_64px] -z-10"></div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both">
                {{-- Luxury Status Badge --}}
                <div class="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-50 text-slate-900 font-black text-[10px] mb-12 uppercase tracking-[0.3em] border border-slate-100 shadow-sm">
                    <span class="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                    {{ __('comm_hero_badge') }}
                </div>

                <h1 class="text-6xl md:text-9xl font-black mb-12 leading-[0.95] text-slate-900 tracking-tighter">
                    {!! __('comm_hero_title') !!}
                </h1>

                <p class="text-2xl text-slate-400 mb-20 leading-relaxed max-w-3xl mx-auto font-medium italic">
                    {{ __('comm_hero_desc') }}
                </p>

                {{-- Premium Avatars Pile --}}
                <div class="flex flex-col items-center gap-6">
                    <div class="flex items-center justify-center -space-x-5">
                        @foreach([1, 2, 3, 4, 5, 6] as $i)
                        <div class="w-16 h-16 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-xl transform hover:-translate-y-2 hover:scale-110 transition duration-500">
                            <img src="https://i.pravatar.cc/150?u=user_{{ $i }}" alt="User">
                        </div>
                        @endforeach
                        <div class="w-16 h-16 rounded-full border-4 border-white bg-slate-900 flex items-center justify-center text-white text-[10px] font-black shadow-xl">
                            12k+
                        </div>
                    </div>
                    <p class="text-xs font-black text-slate-500 uppercase tracking-widest opacity-50">{{ __('comm_hero_social') }}</p>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE HUB (Discord / TG) --}}
    <section class="py-24 bg-slate-50 border-y border-slate-100">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid md:grid-cols-2 gap-10">
                
                {{-- DISCORD LUXURY CARD --}}
                <div class="group p-16 rounded-[4rem] bg-indigo-600 text-white relative overflow-hidden shadow-2xl shadow-indigo-100 transform hover:-translate-y-2 transition-all duration-700">
                    <div class="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <div class="relative z-10">
                        <div class="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-10 border border-white/20 backdrop-blur-md group-hover:rotate-12 transition">
                            <span class="text-4xl">💬</span>
                        </div>
                        <h2 class="text-5xl font-black mb-6 tracking-tight">{{ __('comm_discord_title') }}</h2>
                        <p class="text-indigo-100 text-xl mb-12 leading-relaxed opacity-80">{{ __('comm_discord_desc') }}</p>
                        <a href="#" class="inline-flex items-center gap-4 bg-white text-indigo-600 px-12 py-6 rounded-[2rem] font-black text-xl hover:shadow-2xl transition transform active:scale-95 shadow-lg shadow-indigo-900/20">
                            {{ __('comm_btn_discord') }} <span>→</span>
                        </a>
                    </div>
                </div>

                {{-- TELEGRAM LUXURY CARD --}}
                <div class="group p-16 rounded-[4rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2">
                    <div class="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-10 border border-blue-100 group-hover:-rotate-12 transition">
                        <span class="text-4xl">✈️</span>
                    </div>
                    <h2 class="text-5xl font-black text-slate-900 mb-6 tracking-tight">{{ __('comm_tg_title') }}</h2>
                    <p class="text-slate-500 text-xl mb-12 leading-relaxed opacity-70">{{ __('comm_tg_desc') }}</p>
                    <a href="#" class="inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-slate-800 transition transform active:scale-95 shadow-xl shadow-slate-200">
                        {{ __('comm_btn_tg') }} <span>→</span>
                    </a>
                </div>

            </div>
        </div>
    </section>

    {{-- SECTION 3: GUIDELINES & EVENTS --}}
    <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-32">
            
            {{-- GUIDELINES --}}
            <div>
                <div class="mb-16">
                    <h2 class="text-5xl font-black text-slate-900 mb-6 tracking-tight">{{ __('comm_guidelines_title') }}</h2>
                    <div class="w-24 h-2 bg-indigo-600 rounded-full"></div>
                </div>
                <div class="space-y-8">
                    @foreach([1, 2, 3] as $g)
                    <div class="flex items-start gap-8 p-10 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                        <div class="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black flex-shrink-0 shadow-lg group-hover:rotate-12 transition">
                            0{{ $g }}
                        </div>
                        <div>
                            <h4 class="text-2xl font-black text-slate-900 mb-3">{{ __("comm_guide_{$g}") }}</h4>
                            <p class="text-slate-500 text-lg leading-relaxed opacity-80">{{ __("comm_guide_{$g}_desc") }}</p>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>

            {{-- EVENTS --}}
            <div>
                <div class="mb-16">
                    <h2 class="text-5xl font-black text-slate-900 mb-6 tracking-tight">{{ __('comm_events_title') }}</h2>
                    <div class="w-24 h-2 bg-slate-900 rounded-full"></div>
                </div>
                <div class="space-y-6">
                    @foreach([1, 2] as $e)
                    <div class="p-10 rounded-[3rem] border-2 border-slate-50 bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 group">
                        <div class="flex items-center justify-between mb-8">
                            <span class="px-5 py-2 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">{{ __('comm_event_badge') }}</span>
                            <span class="text-sm font-bold text-slate-300">{{ __('comm_event_date') }}</span>
                        </div>
                        <h4 class="text-3xl font-black text-slate-900 mb-8 group-hover:text-indigo-600 transition">{{ __("comm_event_{$e}") }}</h4>
                        <a href="#" class="inline-flex items-center gap-3 text-lg font-black text-slate-900 group-hover:gap-6 transition-all duration-300">
                            {{ __('comm_event_cta') }} <span>→</span>
                        </a>
                    </div>
                    @endforeach
                </div>

                {{-- MEMBER SPOTLIGHT --}}
                <div class="mt-16 p-12 bg-slate-900 rounded-[3.5rem] text-white overflow-hidden relative shadow-2xl">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-6 mb-8">
                            <div class="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                                <span class="text-4xl">👑</span>
                            </div>
                            <div>
                                <h3 class="text-2xl font-black">{{ __('comm_spotlight_title') }}</h3>
                                <p class="text-indigo-300 font-bold text-sm">{{ __('comm_spotlight_sub') }}</p>
                            </div>
                        </div>
                        <p class="text-indigo-100/60 text-lg leading-relaxed mb-6 font-medium">{{ __('comm_spotlight_desc') }}</p>
                        <div class="h-2 w-full bg-white/5 rounded-full">
                            <div class="w-1/3 h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    {{-- SECTION 4: FINAL SOCIAL PROOF --}}
    <section class="py-32 bg-slate-50">
        <div class="max-w-4xl mx-auto text-center px-6">
            <h2 class="text-4xl font-black text-slate-900 mb-12 tracking-tight">{{ __('comm_cta_title') }}</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
                <span class="text-2xl font-black italic tracking-tighter">Mindful.</span>
                <span class="text-2xl font-black italic tracking-tighter">Productive.</span>
                <span class="text-2xl font-black italic tracking-tighter">Connected.</span>
                <span class="text-2xl font-black italic tracking-tighter">OneForMind.</span>
            </div>
        </div>
    </section>

@endsection
