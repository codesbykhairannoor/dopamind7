@extends('layouts.marketing')

@section('title', __('help_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('help_meta_desc') }}">
    <meta property="og:title" content="{{ __('help_meta_title') }}">
    <meta property="og:description" content="{{ __('help_meta_desc') }}">
    <meta property="og:url" content="{{ url('/resources/help') }}">
@endsection

@section('content')

    {{-- SECTION 1: MINIMALIST LUXURY HERO --}}
    <header class="pt-48 pb-24 px-6 relative bg-white">
        {{-- Premium Background --}}
        <div class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both">
                {{-- Centered Premium Icon --}}
                <div class="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-12 shadow-2xl rotate-3 transform hover:rotate-0 transition duration-500">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9l-.707.707M16.243 4.757l-.707.707M12 21v-1m0-12v12"></path>
                    </svg>
                </div>

                {{-- Status Indicator --}}
                <div class="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] mb-10 uppercase tracking-[0.25em] border border-emerald-100/50">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {{ __('help_status_all_ok') }}
                </div>

                <h1 class="text-6xl md:text-8xl font-black mb-10 leading-[1] text-slate-900 tracking-tighter">
                    {{ __('help_hero_title_1') }}<br>
                    <span class="text-indigo-600">{{ __('help_hero_title_2') }}</span>
                </h1>

                <p class="text-xl text-slate-500 mb-16 leading-relaxed max-w-2xl mx-auto font-medium opacity-80">
                    {{ __('help_hero_desc') }}
                </p>

                {{-- Clean Search Bar --}}
                <div class="relative max-w-2xl mx-auto">
                    <div class="flex items-center bg-slate-50 rounded-[2.5rem] border border-slate-200 overflow-hidden p-2 group focus-within:bg-white focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 transition-all duration-500 shadow-sm">
                        <div class="pl-6 pr-2 opacity-30">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="text" placeholder="{{ __('help_search_placeholder') }}" class="w-full py-5 px-3 text-lg text-slate-900 bg-transparent border-none outline-none focus:ring-0 placeholder-slate-300 font-bold">
                        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-[1.8rem] font-black text-sm transition shadow-xl shadow-indigo-100 active:scale-95 ml-2">
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
                    ['name' => 'help_cat_1', 'icon' => 'M13 10V3L4 14h7v7l9-11h-7z', 'color' => 'bg-blue-50 text-blue-600'],
                    ['name' => 'help_cat_2', 'icon' => 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', 'color' => 'bg-purple-50 text-purple-600'],
                    ['name' => 'help_cat_3', 'icon' => 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', 'color' => 'bg-indigo-50 text-indigo-600'],
                    ['name' => 'help_cat_4', 'icon' => 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', 'color' => 'bg-emerald-50 text-emerald-600']
                ] as $cat)
                <a href="#" class="group p-10 rounded-[3rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/30 transition-all duration-500">
                    <div class="w-16 h-16 {{ $cat['color'] }} rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition duration-500 border border-current opacity-70 group-hover:opacity-100">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $cat['icon'] }}"></path></svg>
                    </div>
                    <h3 class="text-2xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition">{{ __($cat['name'].'_title') }}</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">{{ __($cat['name'].'_desc') }}</p>
                    <div class="mt-8 pt-8 border-t border-slate-100 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition duration-500">
                        Explorer <span>→</span>
                    </div>
                </a>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SECTION 3: TOP ARTICLES & FAQ SPLIT --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="grid lg:grid-cols-2 gap-24">
                
                {{-- TOP ARTICLES --}}
                <div>
                    <h2 class="text-4xl font-black text-slate-900 mb-12 tracking-tight">{{ __('help_popular_title') }}</h2>
                    <div class="grid gap-4">
                        @foreach([1, 2, 3, 4, 5, 6] as $p)
                        <a href="#" class="p-6 rounded-3xl bg-white border border-slate-100 hover:border-indigo-200 hover:translate-x-2 transition duration-300 flex items-center justify-between group">
                            <div class="flex items-center gap-5">
                                <span class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">0{{ $p }}</span>
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
                        <div class="bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all duration-300"
                             :class="active === {{ $i }} ? 'ring-2 ring-indigo-500 ring-offset-4' : ''">
                            <button @click="active = active === {{ $i }} ? null : {{ $i }}" 
                                    class="w-full px-8 py-8 flex items-center justify-between text-left">
                                <span class="text-xl font-bold text-slate-900">{{ __("help_faq_q{$i}") }}</span>
                                <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300" :class="active === {{ $i }} ? 'rotate-180 bg-indigo-50' : ''">
                                    <svg class="w-4 h-4 text-slate-400" :class="active === {{ $i }} ? 'text-indigo-600' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </button>
                            <div x-show="active === {{ $i }}" x-collapse class="px-8 pb-8">
                                <p class="text-slate-500 text-lg leading-relaxed pt-6 border-t border-slate-50">
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

    {{-- SECTION 4: CONTACT CTA --}}
    <section class="py-32 px-6 bg-white">
        <div class="max-w-5xl mx-auto rounded-[4rem] bg-indigo-600 p-16 md:p-32 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
            {{-- Abstract Shapes --}}
            <div class="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mt-48 blur-[100px]"></div>
            <div class="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full -mr-48 -mb-48 blur-[100px]"></div>
            
            <div class="relative z-10 animate-in fade-in zoom-in duration-1000">
                <h2 class="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">{{ __('help_cta_title') }}</h2>
                <p class="text-indigo-100 text-xl mb-16 max-w-xl mx-auto font-medium opacity-80 leading-relaxed">{{ __('help_cta_desc') }}</p>
                <div class="flex flex-col sm:flex-row justify-center gap-6">
                    <a href="mailto:support@oneformind.com" class="bg-white text-indigo-600 px-12 py-6 rounded-3xl font-black shadow-2xl hover:bg-slate-50 transition transform hover:-translate-y-1 active:scale-95 text-xl">
                        {{ __('help_cta_btn') }}
                    </a>
                    <a href="{{ route('resources.community') }}" class="bg-indigo-700/50 backdrop-blur-md text-white border-2 border-indigo-400/30 px-12 py-6 rounded-3xl font-black transition transform hover:-translate-y-1 active:scale-95 text-xl">
                        {{ __('help_cta_community') }}
                    </a>
                </div>
            </div>
        </div>
    </section>

@endsection
