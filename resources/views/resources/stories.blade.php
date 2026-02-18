@extends('layouts.marketing')

@section('title', __('stories_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('stories_meta_desc') }}">
    <meta property="og:title" content="{{ __('stories_meta_og_title') }}">
    <meta property="og:description" content="{{ __('stories_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/resources/stories') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (THE SOCIAL PROOF SPOTLIGHT) --}}
    <header class="pt-32 pb-24 px-6 relative overflow-hidden bg-white">
        {{-- Background Soft Glows --}}
        <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-[100px] -z-10"></div>

        <div class="max-w-6xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-widest border border-indigo-100">
                ⭐ {{ __('stories_hero_badge') }}
            </div>
            
            <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                {{ __('stories_hero_title_1') }} <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('stories_hero_title_2') }}</span>
            </h1>
            
            <p class="text-xl text-gray-500 mb-16 leading-relaxed max-w-2xl mx-auto font-medium">
                {{ __('stories_hero_desc') }}
            </p>

            {{-- Main Featured Story (KHAYRAN) --}}
            <div class="max-w-4xl mx-auto relative animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both">
                <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[3rem] blur opacity-20"></div>
                <div class="relative bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 text-left">
                    <div class="w-48 h-48 md:w-64 md:h-64 shrink-0 relative">
                        <div class="absolute inset-0 bg-indigo-100 rounded-2xl rotate-6"></div>
                        <img src="https://github.com/codesbykhairannoor.png" alt="Khairan Noor" class="relative z-10 w-full h-full object-cover rounded-2xl shadow-lg border-2 border-white">
                        <div class="absolute -bottom-4 -right-4 bg-indigo-600 text-white p-3 rounded-xl shadow-xl z-20">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">
                            "{{ __('stories_main_quote') }}"
                        </h3>
                        <p class="text-gray-500 text-lg mb-6 leading-relaxed">
                            {{ __('stories_main_body') }}
                        </p>
                        <div class="flex flex-col">
                            <span class="font-black text-indigo-600 text-lg">Khairan Noor F.</span>
                            <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">Founder & Developer, OneForMind</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: THE "WALL OF LOVE" GRID (BENTO STYLE) --}}
    <section class="py-24 bg-gray-50 border-y border-gray-100">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-4">{{ __('stories_wall_title') }}</h2>
                <p class="text-gray-500 text-lg">{{ __('stories_wall_desc') }}</p>
            </div>

            <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {{-- Story 1 --}}
                <div class="break-inside-avoid bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 group">
                    <div class="flex items-center gap-4 mb-6">
                        <img src="https://ui-avatars.com/api/?name=Rauja&background=indigo&color=fff" class="w-12 h-12 rounded-full" alt="User">
                        <div>
                            <p class="font-bold text-gray-900">Rauja</p>
                            <p class="text-xs text-gray-400 font-bold uppercase">UMKM Outreach</p>
                        </div>
                    </div>
                    <p class="text-gray-600 leading-relaxed italic">"{{ __('stories_user_1_text') }}"</p>
                </div>

                {{-- Story 2 (Highlight - Purple) --}}
                <div class="break-inside-avoid bg-indigo-600 p-8 rounded-3xl shadow-xl text-white group relative overflow-hidden">
                    <div class="absolute -right-4 -top-4 text-white/10 text-8xl font-black opacity-20">“</div>
                    <div class="flex items-center gap-4 mb-6">
                        <img src="https://ui-avatars.com/api/?name=Agi&background=white&color=indigo" class="w-12 h-12 rounded-full" alt="User">
                        <div>
                            <p class="font-bold">Agi</p>
                            <p class="text-xs text-indigo-200 font-bold uppercase">Social Media Specialist</p>
                        </div>
                    </div>
                    <p class="leading-relaxed font-medium">"{{ __('stories_user_2_text') }}"</p>
                </div>

                {{-- Story 3 --}}
                <div class="break-inside-avoid bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300">
                    <div class="flex items-center gap-4 mb-6">
                        <img src="https://ui-avatars.com/api/?name=Sarah+J&background=emerald&color=fff" class="w-12 h-12 rounded-full" alt="User">
                        <div>
                            <p class="font-bold text-gray-900">Sarah J.</p>
                            <p class="text-xs text-gray-400 font-bold uppercase">Freelance Designer</p>
                        </div>
                    </div>
                    <p class="text-gray-600 leading-relaxed italic">"{{ __('stories_user_3_text') }}"</p>
                </div>

                {{-- Story 4 --}}
                <div class="break-inside-avoid bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300">
                    <div class="flex items-center gap-4 mb-6">
                        <img src="https://ui-avatars.com/api/?name=Budi+W&background=amber&color=fff" class="w-12 h-12 rounded-full" alt="User">
                        <div>
                            <p class="font-bold text-gray-900">Budi W.</p>
                            <p class="text-xs text-gray-400 font-bold uppercase">College Student</p>
                        </div>
                    </div>
                    <p class="text-gray-600 leading-relaxed italic">"{{ __('stories_user_4_text') }}"</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: METRICS OF SUCCESS (SURPRISE COUNTER) --}}
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                <div class="text-center animate-in zoom-in-95 fade-in duration-700 delay-100 fill-mode-both">
                    <h3 class="text-5xl md:text-6xl font-black text-indigo-600 mb-2">10k+</h3>
                    <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">{{ __('stories_stat_1') }}</p>
                </div>
                <div class="text-center animate-in zoom-in-95 fade-in duration-700 delay-200 fill-mode-both">
                    <h3 class="text-5xl md:text-6xl font-black text-indigo-600 mb-2">500k</h3>
                    <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">{{ __('stories_stat_2') }}</p>
                </div>
                <div class="text-center animate-in zoom-in-95 fade-in duration-700 delay-300 fill-mode-both">
                    <h3 class="text-5xl md:text-6xl font-black text-indigo-600 mb-2">98%</h3>
                    <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">{{ __('stories_stat_3') }}</p>
                </div>
                <div class="text-center animate-in zoom-in-95 fade-in duration-700 delay-400 fill-mode-both">
                    <h3 class="text-5xl md:text-6xl font-black text-indigo-600 mb-2">4.9/5</h3>
                    <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">{{ __('stories_stat_4') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: SHARE YOUR STORY CTA (IMMERSIF) --}}
    <section class="py-24 px-6">
        <div class="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            {{-- Modern Geometric Background Decoration --}}
            <div class="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L100 100M100 0L0 100" stroke="white" stroke-width="2" vector-effect="non-scaling-stroke"/>
                </svg>
            </div>
            <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
            
            <div class="relative z-10">
                <h2 class="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight">{{ __('stories_cta_title') }}</h2>
                <p class="text-indigo-200 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                    {{ __('stories_cta_desc') }}
                </p>
                <a href="mailto:stories@oneformind.com" class="inline-block bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl">
                    {{ __('stories_cta_btn') }}
                </a>
                <p class="mt-8 text-sm text-slate-500 font-bold uppercase tracking-widest">{{ __('stories_cta_note') }}</p>
            </div>
        </div>
    </section>

@endsection