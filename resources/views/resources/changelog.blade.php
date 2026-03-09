@extends('layouts.marketing')

@section('title', __('cl_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('cl_meta_desc') }}">
    <meta property="og:title" content="{{ __('cl_meta_title') }}">
    <meta property="og:description" content="{{ __('cl_meta_desc') }}">
    <meta property="og:url" content="{{ url('/resources/changelog') }}">
@endsection

@section('content')

    {{-- SECTION 1: HIGH-CONTRAST DARK HERO --}}
    <header class="pt-48 pb-32 px-6 relative bg-slate-950 overflow-hidden">
        {{-- Animated Background Elements --}}
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both">
                {{-- Luxury Version Badge --}}
                <div class="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-white font-black text-[12px] mb-12 uppercase tracking-[0.4em] shadow-2xl">
                    <span class="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]"></span>
                    Latest Release: v2.4
                </div>

                <h1 class="text-7xl md:text-9xl font-black mb-12 leading-[0.9] text-white tracking-tighter">
                    {!! __('cl_hero_title') !!}
                </h1>

                <p class="text-2xl text-slate-400 mb-16 leading-relaxed max-w-3xl mx-auto font-medium">
                    {{ __('cl_hero_desc') }}
                </p>
                
                {{-- Scroll Indicator --}}
                <div class="flex flex-col items-center gap-4 animate-bounce opacity-40">
                    <span class="text-[10px] font-black uppercase tracking-widest text-white">The Evolution Map</span>
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: ENHANCED SIDE-BY-SIDE TIMELINE --}}
    <section class="py-40 bg-white relative">
        <div class="max-w-7xl mx-auto px-6 relative">
            
            {{-- Central Spine (Desktop) --}}
            <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-slate-200 to-transparent transform md:-translate-x-1/2 opacity-40"></div>

            <div class="space-y-40">
                
                @foreach([
                    ['v' => '1', 'align' => 'right', 'color' => 'indigo'],
                    ['v' => '2', 'align' => 'left', 'color' => 'slate'],
                    ['v' => '3', 'align' => 'right', 'color' => 'blue'],
                    ['v' => '4', 'align' => 'left', 'color' => 'purple'],
                    ['v' => '5', 'align' => 'right', 'color' => 'gray']
                ] as $item)
                
                @php
                    $vMatch = $item['v'];
                    $align = $item['align'];
                    $color = $item['color'];
                @endphp

                <div class="relative flex flex-col md:flex-row items-start md:items-center gap-12 group">
                    {{-- Timeline Dot --}}
                    <div class="absolute left-0 md:left-1/2 w-16 h-16 bg-white rounded-3xl border-4 border-{{ $color }}-600 shadow-2xl shadow-{{ $color }}-100 transform -translate-x-1/2 md:-translate-x-1/2 z-20 transition-all duration-700 group-hover:rotate-45 flex items-center justify-center">
                        <span class="text-{{ $color }}-600 font-black text-xs rotate-0 group-hover:-rotate-45 transition duration-700">v2.{{ 5 - $vMatch }}</span>
                    </div>

                    {{-- Card Layout Logic --}}
                    @if($align === 'right')
                        {{-- Left: Date --}}
                        <div class="hidden md:block md:w-1/2 text-right pr-24 animate-in fade-in slide-in-from-left-8 duration-1000">
                            <span class="text-lg font-black text-{{ $color }}-600 uppercase tracking-widest">{{ __("cl_item_{$vMatch}_date") }}</span>
                        </div>
                        {{-- Right: Content --}}
                        <div class="pl-12 md:pl-24 md:w-1/2 w-full animate-in fade-in slide-in-from-right-8 duration-1000">
                            <div class="p-12 rounded-[4rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all duration-700 transform group-hover:-translate-y-4 border-l-8 border-l-{{ $color }}-500">
                                <span class="md:hidden block text-xs font-black text-{{ $color }}-600 mb-6 uppercase tracking-widest">{{ __("cl_item_{$vMatch}_date") }}</span>
                                <h3 class="text-4xl font-black text-slate-900 mb-10 tracking-tighter">{{ __("cl_item_{$vMatch}_title") }}</h3>
                                <div class="grid gap-6">
                                    @for($f = (($vMatch-1)*3+1); $f <= ($vMatch*3); $f++)
                                    <div class="flex items-start gap-6 group/item">
                                        <div class="w-8 h-8 rounded-2xl bg-{{ $color }}-50 text-{{ $color }}-600 flex items-center justify-center flex-shrink-0 shadow-sm transition group-hover/item:rotate-12">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <p class="text-xl font-bold text-slate-500 leading-snug group-hover/item:text-slate-900 transition">{{ __("cl_feat_{$f}") }}</p>
                                    </div>
                                    @endfor
                                </div>
                            </div>
                        </div>
                    @else
                        {{-- Reverse side --}}
                        <div class="pl-12 md:pr-24 md:w-1/2 w-full order-2 md:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
                            <div class="p-12 rounded-[4rem] bg-white border border-slate-100 shadow-xl hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all duration-700 transform group-hover:-translate-y-4 border-r-8 border-r-{{ $color }}-500 text-right">
                                <span class="md:hidden block text-xs font-black text-{{ $color }}-600 mb-6 uppercase tracking-widest text-left">{{ __("cl_item_{$vMatch}_date") }}</span>
                                <h3 class="text-4xl font-black text-slate-900 mb-10 tracking-tighter">{{ __("cl_item_{$vMatch}_title") }}</h3>
                                <div class="grid gap-6">
                                    @for($f = (($vMatch-1)*3+1); $f <= ($vMatch*3); $f++)
                                    <div class="flex flex-row-reverse items-start gap-6 group/item">
                                        <div class="w-8 h-8 rounded-2xl bg-{{ $color }}-50 text-{{ $color }}-600 flex items-center justify-center flex-shrink-0 shadow-sm transition group-hover/item:-rotate-12">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <p class="text-xl font-bold text-slate-500 leading-snug group-hover/item:text-slate-900 transition">{{ __("cl_feat_{$f}") }}</p>
                                    </div>
                                    @endfor
                                </div>
                            </div>
                        </div>
                        {{-- Right: Date --}}
                        <div class="hidden md:block md:w-1/2 text-left pl-24 order-1 md:order-2 animate-in fade-in slide-in-from-right-8 duration-1000">
                            <span class="text-lg font-black text-{{ $color }}-600 uppercase tracking-widest">{{ __("cl_item_{$vMatch}_date") }}</span>
                        </div>
                    @endif
                </div>
                @endforeach

            </div>
        </div>
    </section>

    {{-- SECTION 3: MILESTONE STATS --}}
    <section class="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                <div>
                    <div class="text-6xl font-black mb-4">50+</div>
                    <p class="text-slate-400 font-bold uppercase tracking-widest text-xs">Features Shipped</p>
                </div>
                <div>
                    <div class="text-6xl font-black mb-4">5</div>
                    <p class="text-slate-400 font-bold uppercase tracking-widest text-xs">Major Releases</p>
                </div>
                <div>
                    <div class="text-6xl font-black mb-4">99%</div>
                    <p class="text-slate-400 font-bold uppercase tracking-widest text-xs">Uptime Verified</p>
                </div>
                <div>
                    <div class="text-6xl font-black mb-4">12k</div>
                    <p class="text-slate-400 font-bold uppercase tracking-widest text-xs">Community Members</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: CONTACT & FEEDBACK --}}
    <section class="py-32 px-6 bg-white">
        <div class="max-w-5xl mx-auto rounded-[5rem] bg-indigo-600 p-20 md:p-40 text-center relative overflow-hidden shadow-2xl">
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div class="relative z-10">
                <h2 class="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter">Have a Feature Idea?</h2>
                <p class="text-indigo-100 text-2xl mb-16 max-w-2xl mx-auto font-medium">We build OneForMind based on your feedback. Let's shape the future together.</p>
                <div class="flex flex-col sm:flex-row justify-center gap-6">
                    <a href="#" class="bg-white text-indigo-600 px-16 py-8 rounded-[2.5rem] font-black shadow-2xl hover:scale-105 transition transform active:scale-95 text-xl">
                        Submit Request
                    </a>
                </div>
            </div>
        </div>
    </section>

@endsection
