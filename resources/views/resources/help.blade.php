@extends('layouts.marketing')

@section('title', __('help_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('help_meta_desc') }}">
    <meta property="og:title" content="{{ __('help_meta_title') }}">
    <meta property="og:description" content="{{ __('help_meta_desc') }}">
    <meta property="og:url" content="{{ url('/resources/help') }}">
@endsection

@section('content')

    {{-- SECTION 1: LUXURY LIGHT HERO (CENTERED) --}}
    <header class="pt-48 pb-32 px-6 relative bg-white overflow-hidden border-b border-gray-100">
        {{-- Premium Background --}}
        <div class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both">
                
                {{-- Centered Premium Icon --}}
                <div class="w-20 h-20 bg-white border border-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-indigo-100/50 transform rotate-3 hover:rotate-0 transition duration-500">
                    <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                </div>

                {{-- Status Indicator --}}
                <div class="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] mb-8 uppercase tracking-[0.25em] border border-emerald-100/50 shadow-sm">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {{ __('help_status_all_ok') }}
                </div>

                <h1 class="text-6xl md:text-8xl font-black mb-10 leading-[1] text-slate-900 tracking-tighter">
                    {{ __('help_hero_title_1') }}<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">{{ __('help_hero_title_2') }}</span>
                </h1>

                <p class="text-xl md:text-2xl text-slate-500 mb-16 leading-relaxed max-w-2xl mx-auto font-medium opacity-80">
                    {{ __('help_hero_desc') }}
                </p>

                {{-- Modern Search Bar --}}
                <div class="relative max-w-2xl mx-auto mb-16 group">
                    <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-[2.8rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                    <div class="relative flex items-center bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden p-2 shadow-sm transition-all duration-500">
                        <div class="pl-6 pr-2 text-slate-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="text" placeholder="{{ __('help_search_placeholder') }}" class="w-full py-5 px-3 text-lg text-slate-900 bg-transparent border-none outline-none focus:ring-0 placeholder-slate-300 font-bold">
                        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-[1.8rem] font-black text-sm transition shadow-xl shadow-indigo-200 active:scale-95 ml-2">
                            Search
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </header>

    {{-- SECTION 2: ICONIC CATEGORIES --}}
    <section class="py-24 bg-white border-t border-slate-50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                @foreach([
                    ['name' => 'help_cat_1', 'icon' => 'M13 10V3L4 14h7v7l9-11h-7z', 'color' => 'bg-indigo-50 text-indigo-600'],
                    ['name' => 'help_cat_2', 'icon' => 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', 'color' => 'bg-indigo-50 text-indigo-600'],
                    ['name' => 'help_cat_3', 'icon' => 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', 'color' => 'bg-indigo-50 text-indigo-600'],
                    ['name' => 'help_cat_4', 'icon' => 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', 'color' => 'bg-indigo-50 text-indigo-600']
                ] as $cat)
                <a href="#" class="group p-10 rounded-[3rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/30 transition-all duration-500">
                    <div class="w-16 h-16 {{ $cat['color'] }} rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition duration-500 border border-current opacity-70 group-hover:opacity-100">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $cat['icon'] }}"></path></svg>
                    </div>
                    <h3 class="text-2xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition">{{ __($cat['name'].'_title') }}</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">{{ __($cat['name'].'_desc') }}</p>
                    <div class="mt-8 pt-8 border-t border-slate-100 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition duration-500">
                        Explore <span>→</span>
                    </div>
                </a>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SECTION 3: POPULAR & FAQ SPLIT --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="grid lg:grid-cols-2 gap-24">
                
                {{-- TOP ARTICLES --}}
                <div>
                    <h2 class="text-4xl font-black text-slate-900 mb-12 tracking-tight">{{ __('help_popular_title') }}</h2>
                    <div class="grid gap-4">
                        @foreach([1, 2, 3, 4, 5, 6] as $p)
                        <a href="#" class="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:translate-x-2 transition duration-300 flex items-center justify-between group">
                            <div class="flex items-center gap-5">
                                <span class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition">0{{ $p }}</span>
                                <span class="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">{{ __("help_popular_q{$p}") }}</span>
                            </div>
                            <svg class="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path></svg>
                        </a>
                        @endforeach
                    </div>
                </div>

                {{-- FAQ ACCORDION --}}
                <div>
                    <h2 class="text-4xl font-black text-slate-900 mb-12 tracking-tight">{{ __('help_faq_title') }}</h2>
                    <div class="space-y-4" x-data="{ active: 1 }">
                        @foreach([1, 2, 3] as $i)
                        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden transition-all duration-300 shadow-sm"
                             :class="active === {{ $i }} ? 'ring-2 ring-indigo-500' : ''">
                            <button @click="active = active === {{ $i }} ? null : {{ $i }}" 
                                    class="w-full px-8 py-8 flex items-center justify-between text-left">
                                <span class="text-xl font-bold text-slate-900">{{ __("help_faq_q{$i}") }}</span>
                                <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300" :class="active === {{ $i }} ? 'rotate-180 bg-indigo-600 text-white' : ''">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </button>
                            <div x-show="active === {{ $i }}" x-collapse class="px-8 pb-8">
                                <p class="text-slate-500 text-lg leading-relaxed pt-6 border-t border-slate-100">
                                    {{ __("help_faq_a{$i}") }}
                                </p>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>

            </div>
        </div>
    </section>

    {{-- SECTION 4: PRODUCT SUPPORT (TAMBAHAN BIAR PANJANG) --}}
    <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('help_support_title') }}</h2>
                <p class="text-xl text-gray-500">{{ __('help_support_desc') }}</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-10 rounded-[2.5rem] bg-indigo-50/50 border border-indigo-100 text-center group hover:bg-white hover:shadow-2xl transition duration-500">
                    <div class="text-4xl mb-6 transform group-hover:scale-110 transition">🎥</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __('help_support_1_title') }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ __('help_support_1_desc') }}</p>
                </div>
                <div class="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 text-center group hover:bg-white hover:shadow-2xl transition duration-500">
                    <div class="text-4xl mb-6 transform group-hover:scale-110 transition">📖</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __('help_support_2_title') }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ __('help_support_2_desc') }}</p>
                </div>
                <div class="p-10 rounded-[2.5rem] bg-indigo-50/50 border border-indigo-100 text-center group hover:bg-white hover:shadow-2xl transition duration-500">
                    <div class="text-4xl mb-6 transform group-hover:scale-110 transition">🔧</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ __('help_support_3_title') }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ __('help_support_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: CONTACT CTA (DESAIN BARU - LUAS & ELEGAN) --}}
    <section class="py-32 px-6 bg-slate-50 relative overflow-hidden border-t border-gray-200">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white -z-10"></div>
        
        <div class="max-w-6xl mx-auto bg-indigo-950 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl">
            {{-- Decorative background in CTA --}}
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            <div class="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"></div>
            
            <div class="relative z-10">
                <div class="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md rounded-[2rem] text-4xl mb-10 border border-white/20 shadow-inner">
                    🆘
                </div>
                <h2 class="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
                    {{ __('help_cta_title') }}
                </h2>
                <p class="text-lg md:text-2xl text-indigo-200 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
                    {{ __('help_cta_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row justify-center items-center gap-8">
                    <a href="mailto:support@oneformind.com" class="inline-flex items-center justify-center gap-4 bg-white text-indigo-950 px-12 py-6 rounded-3xl font-black text-xl hover:bg-indigo-50 shadow-2xl transition transform hover:-translate-y-1 w-full sm:w-auto active:scale-95">
                        {{ __('help_cta_btn') }}
                        <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                    <a href="{{ route('resources.community') }}" class="text-white font-black text-xl hover:text-indigo-300 transition-colors py-4">
                        {{ __('help_cta_community') }} →
                    </a>
                </div>
                
                <p class="mt-12 text-sm font-bold text-indigo-400/50 uppercase tracking-[0.3em]">{{ __('help_cta_note') }}</p>
            </div>
        </div>
    </section>

@endsection