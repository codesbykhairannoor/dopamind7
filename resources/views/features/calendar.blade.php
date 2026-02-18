@extends('layouts.marketing')

@section('title', __('calendar_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('calendar_meta_desc') }}">
    <meta property="og:title" content="{{ __('calendar_meta_og_title') }}">
    <meta property="og:description" content="{{ __('calendar_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/features/calendar') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (CENTERED LAYOUT + FLOATING CALENDAR MOCKUP) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-gray-50 relative border-b border-gray-100">
        {{-- Background Glow --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>

        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    <span class="text-lg">🗓️</span> {{ __('calendar_hero_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('calendar_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('calendar_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                    {{ __('calendar_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        {{ __('calendar_hero_cta_1') }}
                    </a>
                    <a href="#how-it-works" class="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-full font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition">
                        {{ __('calendar_hero_cta_2') }}
                    </a>
                </div>
            </div>

            {{-- Floating Mockup Centered (Calendar View) --}}
            <div class="relative w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
                <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-20"></div>
                <div class="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-6 md:p-8 transform transition hover:scale-[1.02] duration-500 flex flex-col md:flex-row gap-8">
                    
                    {{-- Left Side: Mini Calendar --}}
                    <div class="w-full md:w-1/3 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div class="flex justify-between items-center mb-6">
                            <h4 class="font-bold text-gray-900">{{ __('calendar_mockup_month') }}</h4>
                            <div class="flex gap-2 text-gray-400">
                                <span class="hover:text-indigo-600 cursor-pointer">◀</span>
                                <span class="hover:text-indigo-600 cursor-pointer">▶</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 mb-2">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>
                        <div class="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-700">
                            {{-- Skeleton Dates --}}
                            <span class="text-gray-300">28</span><span class="text-gray-300">29</span><span class="text-gray-300">30</span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer">1</span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer">2</span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer">3</span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer relative">4 <span class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full"></span></span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer">5</span>
                            <span class="p-1 bg-indigo-600 text-white rounded-lg cursor-pointer shadow-md shadow-indigo-200 font-bold">6</span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer relative">7 <span class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"></span></span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer">8</span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer">9</span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer relative">10 <span class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></span></span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer">11</span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer">12</span>
                            <span class="p-1 hover:bg-indigo-100 rounded-lg cursor-pointer">13</span>
                        </div>
                    </div>

                    {{-- Right Side: Daily Agenda --}}
                    <div class="w-full md:w-2/3 flex flex-col">
                        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                            <div>
                                <h3 class="font-black text-gray-900 text-2xl">{{ __('calendar_mockup_today') }}</h3>
                                <p class="text-sm text-gray-500">{{ __('calendar_mockup_date') }}</p>
                            </div>
                            <div class="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl border border-indigo-100 font-bold text-sm">
                                3 Events
                            </div>
                        </div>

                        <div class="space-y-4 flex-1">
                            {{-- Event 1 (Morning) --}}
                            <div class="flex gap-4 group cursor-pointer">
                                <div class="text-right w-16 shrink-0 pt-1">
                                    <p class="text-xs font-bold text-gray-900">09:00</p>
                                    <p class="text-[10px] text-gray-400">10:30</p>
                                </div>
                                <div class="flex-1 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-2xl rounded-bl-lg group-hover:bg-blue-100 transition">
                                    <p class="font-bold text-blue-900 text-sm">{{ __('calendar_mockup_event_1') }}</p>
                                    <p class="text-xs text-blue-700/70 mt-1 flex items-center gap-1">📍 {{ __('calendar_mockup_location_1') }}</p>
                                </div>
                            </div>

                            {{-- Event 2 (Current) --}}
                            <div class="flex gap-4 group cursor-pointer relative">
                                <div class="absolute left-16 top-4 w-full h-[1px] bg-rose-500 z-0"></div>
                                <div class="absolute left-14 top-[14px] w-2 h-2 bg-rose-500 rounded-full z-10 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse"></div>
                                
                                <div class="text-right w-16 shrink-0 pt-1">
                                    <p class="text-xs font-bold text-gray-900">13:00</p>
                                    <p class="text-[10px] text-gray-400">14:00</p>
                                </div>
                                <div class="flex-1 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-2xl rounded-bl-lg relative z-10 shadow-sm transform scale-[1.02]">
                                    <p class="font-bold text-rose-900 text-sm">{{ __('calendar_mockup_event_2') }}</p>
                                    <p class="text-xs text-rose-700/70 mt-1 flex items-center gap-1">🎥 {{ __('calendar_mockup_location_2') }}</p>
                                </div>
                            </div>

                            {{-- Event 3 (Evening) --}}
                            <div class="flex gap-4 group cursor-pointer">
                                <div class="text-right w-16 shrink-0 pt-1">
                                    <p class="text-xs font-bold text-gray-900">19:00</p>
                                    <p class="text-[10px] text-gray-400">20:00</p>
                                </div>
                                <div class="flex-1 bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-2xl rounded-bl-lg group-hover:bg-gray-100 transition">
                                    <p class="font-bold text-gray-700 text-sm">{{ __('calendar_mockup_event_3') }}</p>
                                    <p class="text-xs text-gray-500 mt-1 flex items-center gap-1">🧘‍♂️ {{ __('calendar_mockup_location_3') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Floating Alert --}}
                    <div class="absolute -right-6 -bottom-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20 animate-bounce duration-[3000ms]">
                        <div class="flex items-center gap-3">
                            <div class="text-3xl">🔔</div>
                            <div class="text-left">
                                <p class="text-[10px] text-rose-500 font-bold uppercase tracking-wider">{{ __('calendar_mockup_alert_1') }}</p>
                                <p class="font-black text-gray-900 text-sm">{{ __('calendar_mockup_alert_2') }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: PROBLEM AWARENESS (TIMELINE CARDS) --}}
    <section class="py-32 bg-gray-50 border-b border-gray-100 overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-3xl md:text-5xl font-black mb-16 text-center text-gray-900 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                {{ __('calendar_prob_title_1') }} <span class="text-gray-300 line-through decoration-rose-500 decoration-4">{{ __('calendar_prob_title_strike') }}</span> {{ __('calendar_prob_title_2') }}
            </h2>

            <div class="grid md:grid-cols-3 gap-8 relative">
                {{-- Decorative Timeline Line behind cards (Desktop only) --}}
                <div class="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 border-t-2 border-dashed border-gray-300 rounded-full"></div>

                <div class="bg-white p-8 rounded-[2rem] border-2 border-transparent hover:border-indigo-100 shadow-sm hover:shadow-xl transition duration-300 animate-in slide-in-from-bottom-8 fade-in delay-100 fill-mode-both group">
                    <div class="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm transform group-hover:-rotate-12 transition">⏱️</div>
                    <h3 class="text-xl font-bold mb-3 text-gray-900">{{ __('calendar_prob_1_title') }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __('calendar_prob_1_desc') }}</p>
                </div>

                <div class="bg-white p-8 rounded-[2rem] border-2 border-transparent hover:border-indigo-100 shadow-sm hover:shadow-xl transition duration-300 animate-in slide-in-from-bottom-8 fade-in delay-200 fill-mode-both group">
                    <div class="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm transform group-hover:scale-110 transition">🤯</div>
                    <h3 class="text-xl font-bold mb-3 text-gray-900">{{ __('calendar_prob_2_title') }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __('calendar_prob_2_desc') }}</p>
                </div>

                <div class="bg-white p-8 rounded-[2rem] border-2 border-transparent hover:border-indigo-100 shadow-sm hover:shadow-xl transition duration-300 animate-in slide-in-from-bottom-8 fade-in delay-300 fill-mode-both group">
                    <div class="w-14 h-14 bg-gray-100 text-gray-500 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm transform group-hover:rotate-12 transition">👥</div>
                    <h3 class="text-xl font-bold mb-3 text-gray-900">{{ __('calendar_prob_3_title') }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ __('calendar_prob_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3 & 4: FEATURES (ZIG-ZAG WITH TIME-BLOCKING VISUALS) --}}
    <section id="how-it-works" class="py-32 bg-white">
        <div class="max-w-6xl mx-auto px-6 space-y-32">
            
            {{-- Feature 1: Universal Sync --}}
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div class="animate-in fade-in slide-in-from-left-12 duration-700 fill-mode-both">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl mb-8 border border-indigo-100">🔄</div>
                    <h2 class="text-4xl font-black mb-6 text-gray-900">{{ __('calendar_feature_1_title') }}</h2>
                    <p class="text-gray-500 text-lg leading-relaxed mb-8">
                        {{ __('calendar_feature_1_desc') }}
                    </p>
                    <div class="flex gap-4">
                        <span class="px-4 py-2 bg-gray-50 rounded-xl font-bold text-gray-700 border border-gray-100 flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full bg-blue-500"></span> Google
                        </span>
                        <span class="px-4 py-2 bg-gray-50 rounded-xl font-bold text-gray-700 border border-gray-100 flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full bg-sky-500"></span> Outlook
                        </span>
                        <span class="px-4 py-2 bg-gray-50 rounded-xl font-bold text-gray-700 border border-gray-100 flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full bg-gray-800"></span> Apple
                        </span>
                    </div>
                </div>
                <div class="relative h-[400px] bg-slate-900 rounded-[3rem] p-8 flex items-center justify-center overflow-hidden border border-slate-800 animate-in fade-in slide-in-from-right-12 duration-700 fill-mode-both">
                    <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                    
                    {{-- Floating Integration Badges --}}
                    <div class="relative w-full h-full flex items-center justify-center">
                        <div class="w-24 h-24 bg-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center text-4xl text-white z-20 border-4 border-slate-900 absolute">OFM</div>
                        
                        <div class="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl absolute -mt-40 -ml-40 animate-pulse duration-[4000ms]">📅</div>
                        <div class="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl absolute mt-40 ml-40 animate-pulse duration-[3500ms]">📧</div>
                        <div class="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl absolute mt-20 -ml-48 animate-pulse duration-[4500ms]">🍏</div>
                        
                        {{-- Dashed connecting lines SVG --}}
                        <svg class="absolute inset-0 w-full h-full z-10" pointer-events="none">
                            <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#6366f1" stroke-width="2" stroke-dasharray="6 6" class="animate-[dash_3s_linear_infinite]"/>
                            <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#6366f1" stroke-width="2" stroke-dasharray="6 6" class="animate-[dash_3s_linear_infinite]"/>
                            <line x1="50%" y1="50%" x2="20%" y2="60%" stroke="#6366f1" stroke-width="2" stroke-dasharray="6 6" class="animate-[dash_3s_linear_infinite]"/>
                        </svg>
                    </div>
                </div>
            </div>

            {{-- Feature 2: Time Blocking --}}
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div class="order-2 lg:order-1 relative h-[450px] bg-indigo-50 rounded-[3rem] p-8 flex items-center justify-center overflow-hidden border border-indigo-100 animate-in fade-in slide-in-from-left-12 duration-700 fill-mode-both">
                    {{-- Time Block Visual --}}
                    <div class="w-full bg-white rounded-2xl shadow-lg p-4 relative z-10 transform -rotate-2 hover:rotate-0 transition duration-500">
                        <div class="space-y-2 relative">
                            <div class="absolute left-10 top-0 bottom-0 w-px bg-gray-100"></div>
                            
                            <div class="flex gap-4 items-start">
                                <span class="text-xs font-bold text-gray-400 w-8 pt-2">08:00</span>
                                <div class="h-16 flex-1 bg-amber-100 border border-amber-200 rounded-xl p-3">
                                    <p class="text-xs font-bold text-amber-900">Deep Work: Coding</p>
                                </div>
                            </div>
                            <div class="flex gap-4 items-start">
                                <span class="text-xs font-bold text-gray-400 w-8 pt-2">10:00</span>
                                <div class="h-12 flex-1 bg-blue-100 border border-blue-200 rounded-xl p-3">
                                    <p class="text-xs font-bold text-blue-900">Team Sync</p>
                                </div>
                            </div>
                            <div class="flex gap-4 items-start">
                                <span class="text-xs font-bold text-gray-400 w-8 pt-2">11:00</span>
                                <div class="h-24 flex-1 bg-emerald-100 border border-emerald-200 rounded-xl p-3">
                                    <p class="text-xs font-bold text-emerald-900">Project Review</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="order-1 lg:order-2 animate-in fade-in slide-in-from-right-12 duration-700 fill-mode-both">
                    <div class="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center text-3xl mb-8 border border-amber-100">⏳</div>
                    <h2 class="text-4xl font-black mb-6 text-gray-900">{{ __('calendar_feature_2_title') }}</h2>
                    <p class="text-gray-500 text-lg leading-relaxed mb-8">
                        {{ __('calendar_feature_2_desc') }}
                    </p>
                    <ul class="space-y-4 font-bold text-gray-700">
                        <li class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100"><span class="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm">✓</span> {{ __('calendar_feature_2_point_1') }}</li>
                        <li class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100"><span class="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm">✓</span> {{ __('calendar_feature_2_point_2') }}</li>
                    </ul>
                </div>
            </div>

        </div>
    </section>

    {{-- SECTION 5: BENTO BOX GRID --}}
    <section class="py-32 bg-gray-50 border-t border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">{{ __('calendar_bento_title') }}</h2>
                <p class="text-gray-500 text-xl max-w-2xl mx-auto">{{ __('calendar_bento_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-4 gap-6 auto-rows-[220px]">
                {{-- Box 1: Wide --}}
                <div class="md:col-span-2 bg-indigo-900 text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition duration-500">
                    <div class="absolute right-0 top-0 w-48 h-48 bg-indigo-500 rounded-bl-[150px] opacity-40 group-hover:scale-110 transition duration-500"></div>
                    <div class="text-3xl mb-4 relative z-10">🌍</div>
                    <h3 class="text-2xl font-black mb-2 relative z-10">{{ __('calendar_bento_1_title') }}</h3>
                    <p class="text-indigo-200 text-sm relative z-10 max-w-xs">{{ __('calendar_bento_1_desc') }}</p>
                </div>
                
                {{-- Box 2: Square --}}
                <div class="md:col-span-1 bg-white rounded-[2.5rem] p-8 border border-gray-200 shadow-sm hover:shadow-lg transition group">
                    <div class="text-3xl mb-4">🎨</div>
                    <h3 class="text-xl font-black mb-2 text-gray-900">{{ __('calendar_bento_2_title') }}</h3>
                    <p class="text-gray-500 text-sm">{{ __('calendar_bento_2_desc') }}</p>
                </div>

                {{-- Box 3: Square --}}
                <div class="md:col-span-1 bg-white rounded-[2.5rem] p-8 border border-gray-200 shadow-sm hover:shadow-lg transition group">
                    <div class="text-3xl mb-4">🔔</div>
                    <h3 class="text-xl font-black mb-2 text-gray-900">{{ __('calendar_bento_3_title') }}</h3>
                    <p class="text-gray-500 text-sm">{{ __('calendar_bento_3_desc') }}</p>
                </div>

                {{-- Box 4: Full Wide --}}
                <div class="md:col-span-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[2.5rem] p-8 md:p-10 border border-blue-100 shadow-sm hover:shadow-lg transition flex flex-col sm:flex-row items-center justify-between gap-8 group">
                    <div class="flex items-center gap-6">
                        <div class="w-16 h-16 bg-white text-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:rotate-12 transition">👥</div>
                        <div>
                            <h3 class="text-2xl font-black mb-2 text-indigo-950">{{ __('calendar_bento_4_title') }}</h3>
                            <p class="text-indigo-800/70 text-sm max-w-lg">{{ __('calendar_bento_4_desc') }}</p>
                        </div>
                    </div>
                    <div class="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap">
                        One-Click Share
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 6: QUOTE --}}
    <section class="py-24 bg-white relative">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-8">
                "{{ __('calendar_quote_text') }}"
            </h2>
            <p class="text-indigo-600 font-bold tracking-widest uppercase text-sm">{{ __('calendar_quote_author') }}</p>
        </div>
    </section>

    {{-- SECTION 7: BOTTOM CTA (CALENDAR GRID FADE) --}}
    <section class="pt-32 pb-40 bg-slate-900 px-6 relative overflow-hidden">
        {{-- Background Grid Illusion --}}
        <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] opacity-30"></div>
        
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

        <div class="max-w-3xl mx-auto text-center relative z-10">
            <div class="w-20 h-20 bg-indigo-600/20 border border-indigo-500/30 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-8 backdrop-blur-sm">🗓️</div>
            <h2 class="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight">{{ __('calendar_cta_title') }}</h2>
            <p class="text-indigo-200 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                {{ __('calendar_cta_desc') }}
            </p>
            <a href="{{ route('register') }}" class="inline-block bg-white text-slate-900 px-12 py-5 rounded-full font-black text-lg hover:bg-indigo-50 hover:scale-105 transition transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                {{ __('calendar_cta_btn') }}
            </a>
            <p class="mt-8 text-sm text-slate-400 font-medium">{{ __('calendar_cta_note') }}</p>
        </div>
    </section>

@endsection