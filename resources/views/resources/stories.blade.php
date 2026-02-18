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

 <header class="pt-32 pb-32 px-6 relative overflow-hidden bg-white border-b border-gray-100">
    {{-- Subtle Background: Grid tetap ada tapi lebih tipis agar tetap 'clean' --}}
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -z-20"></div>

    <div class="max-w-4xl mx-auto text-center relative z-10">
        <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
            {{-- Badge gaya kedua (Indigo-100) --}}
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                ⭐ {{ __('stories_hero_badge') }}
            </div>
            
            {{-- Headline diturunkan ke 7xl agar lebih stabil --}}
            <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                {{ __('stories_hero_title_1') }} <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('stories_hero_title_2') }}</span>
            </h1>
            
            {{-- Deskripsi dengan max-w yang lebih disiplin --}}
            <p class="text-xl text-gray-500 mb-16 leading-relaxed max-w-2xl mx-auto font-medium">
                {{ __('stories_hero_desc') }}
            </p>
        </div>

        {{-- Featured Story Card: Mengikuti gaya Mockup di bagian kedua --}}
        <div class="relative w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
            <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-15"></div>
            
            <div class="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-8 md:p-10 transform transition hover:scale-[1.01] duration-500">
                
                {{-- Header Kartu (Gaya Mockup) --}}
                <div class="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                    <div class="text-left">
                        <h3 class="font-black text-gray-900 text-2xl mb-1">Featured Story</h3>
                        <p class="text-sm text-gray-400 font-bold uppercase tracking-widest">Early Adopter Spotlight</p>
                    </div>
                    <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                </div>
                
                {{-- Konten Utama (Gaya List yang Stabil) --}}
                <div class="space-y-6 text-left">
                    <div class="relative">
                        {{-- Icon Kutipan Besar tapi Subtle --}}
                        <span class="absolute -top-4 -left-2 text-6xl text-indigo-100 font-serif opacity-50">“</span>
                        <p class="text-xl md:text-2xl font-bold text-gray-800 leading-snug relative z-10 pl-6">
                            {{ __('stories_main_quote') }}
                        </p>
                    </div>

                    <div class="p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                        <p class="text-gray-600 leading-relaxed italic">
                            {{ __('stories_main_body') }}
                        </p>
                    </div>
                </div>

                {{-- Footer Kartu --}}
                <div class="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-200 to-purple-200 flex items-center justify-center font-black text-indigo-700">
                        JD
                    </div>
                    <div class="text-left">
                        <p class="font-black text-gray-900 leading-none">Verified User</p>
                        <p class="text-sm text-indigo-600 font-bold mt-1">OneForMind Power User</p>
                    </div>
                </div>

                {{-- Floating Badge (🏆 gaya Habit) --}}
                <div class="absolute -right-6 -bottom-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 z-20 animate-bounce duration-[4000ms] hidden md:block">
                    <div class="flex items-center gap-3">
                        <div class="text-2xl">✨</div>
                        <div class="text-left">
                            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Status</p>
                            <p class="font-black text-indigo-900 text-sm">Top Contributor</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>

    {{-- SECTION 2: THE "WALL OF LOVE" GRID (CLEAN DASHBOARD STYLE) --}}
    <section class="py-24 bg-gray-50 border-y border-gray-100">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-4">{{ __('stories_wall_title') }}</h2>
                <p class="text-gray-500 text-lg">{{ __('stories_wall_desc') }}</p>
            </div>

            <div class="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                
                {{-- Card 1 --}}
                <div class="break-inside-avoid bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 relative group">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-lg">RJ</div>
                        <div>
                            <p class="font-bold text-gray-900">Verified User</p>
                            <p class="text-[10px] text-gray-400 font-black uppercase tracking-widest">Digital Strategist</p>
                        </div>
                    </div>
                    <p class="text-gray-600 leading-relaxed font-medium">"{{ __('stories_user_1_text') }}"</p>
                </div>

                {{-- Card 2 (Inverted) --}}
                <div class="break-inside-avoid bg-slate-900 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
                    <div class="absolute -right-4 -top-4 text-white/5 text-8xl font-black italic">“</div>
                    <div class="flex items-center gap-4 mb-6 relative z-10">
                        <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg">AG</div>
                        <div>
                            <p class="font-bold">Verified User</p>
                            <p class="text-[10px] text-indigo-300 font-black uppercase tracking-widest">Creative Director</p>
                        </div>
                    </div>
                    <p class="leading-relaxed font-medium relative z-10 text-slate-300">"{{ __('stories_user_2_text') }}"</p>
                </div>

                {{-- Card 3 --}}
                <div class="break-inside-avoid bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-lg">SJ</div>
                        <div>
                            <p class="font-bold text-gray-900">Verified User</p>
                            <p class="text-[10px] text-gray-400 font-black uppercase tracking-widest">Product Designer</p>
                        </div>
                    </div>
                    <p class="text-gray-600 leading-relaxed font-medium">"{{ __('stories_user_3_text') }}"</p>
                </div>

                {{-- Card 4 --}}
                <div class="break-inside-avoid bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-lg">BW</div>
                        <div>
                            <p class="font-bold text-gray-900">Verified User</p>
                            <p class="text-[10px] text-gray-400 font-black uppercase tracking-widest">Fullstack Engineer</p>
                        </div>
                    </div>
                    <p class="text-gray-600 leading-relaxed font-medium">"{{ __('stories_user_4_text') }}"</p>
                </div>

            </div>
        </div>
    </section>

    {{-- SECTION 3: METRICS OF IMPACT (CLEAN MINIMALIST) --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                <div class="space-y-2">
                    <h3 class="text-6xl font-black text-gray-900 tracking-tighter">10k<span class="text-indigo-600">+</span></h3>
                    <p class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{{ __('stories_stat_1') }}</p>
                </div>
                <div class="space-y-2">
                    <h3 class="text-6xl font-black text-gray-900 tracking-tighter">500k</h3>
                    <p class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{{ __('stories_stat_2') }}</p>
                </div>
                <div class="space-y-2">
                    <h3 class="text-6xl font-black text-gray-900 tracking-tighter">98<span class="text-indigo-600">%</span></h3>
                    <p class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{{ __('stories_stat_3') }}</p>
                </div>
                <div class="space-y-2">
                    <h3 class="text-6xl font-black text-gray-900 tracking-tighter">4.9<span class="text-indigo-600">/5</span></h3>
                    <p class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{{ __('stories_stat_4') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: SHARE YOUR STORY CTA (MODERN NEOMORPHISM) --}}
    <section class="py-24 px-6 bg-gray-50">
        <div class="max-w-6xl mx-auto bg-indigo-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl border border-indigo-500">
            {{-- Abstract Shapes --}}
            <div class="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-50 animate-pulse"></div>
            <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full blur-[100px] opacity-50 animate-pulse delay-1000"></div>

            <div class="relative z-10">
                <h2 class="text-4xl md:text-7xl font-black mb-8 text-white tracking-tight leading-none">
                    {{ __('stories_cta_title') }}
                </h2>
                <p class="text-indigo-100 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium">
                    {{ __('stories_cta_desc') }}
                </p>
                <div class="flex justify-center">
                    <a href="mailto:stories@oneformind.com" class="bg-white text-indigo-600 px-12 py-5 rounded-full font-black text-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl flex items-center gap-3">
                        {{ __('stories_cta_btn') }}
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                </div>
                <p class="mt-8 text-sm text-indigo-300 font-bold uppercase tracking-[0.2em]">{{ __('stories_cta_note') }}</p>
            </div>
        </div>
    </section>

@endsection