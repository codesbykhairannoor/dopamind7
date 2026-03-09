@extends('layouts.marketing')

@section('title', __('cl_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('cl_meta_desc') }}">
    <meta property="og:title" content="{{ __('cl_meta_og_title') }}">
    <meta property="og:description" content="{{ __('cl_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/resources/changelog') }}">
@endsection

@section('content')

    {{-- SECTION 1: HERO (CENTERED LIGHT MODE - INDIGO VIBE) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white relative border-b border-gray-100">
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] -z-10"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {{-- Icon / Gambar Dulu --}}
            <div class="flex justify-center mb-8">
                <div class="w-24 h-24 bg-white border border-indigo-100 rounded-3xl shadow-xl shadow-indigo-100 flex items-center justify-center text-4xl transform -rotate-3 hover:rotate-0 transition duration-300">
                    ✨
                </div>
            </div>

            {{-- Badge --}}
            <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-6 uppercase tracking-widest border border-indigo-100 shadow-sm">
                <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                {{ __('cl_hero_badge') }}
            </div>
            
            {{-- Teks Utama --}}
            <h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight text-gray-900 tracking-tight">
                {{ __('cl_hero_title_1') }}<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
                    {{ __('cl_hero_title_2') }}
                </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
                {{ __('cl_hero_desc') }}
            </p>
            
            {{-- CTA & Scroll Indicator --}}
            <div class="flex flex-col items-center justify-center gap-8 mb-24">
                <a href="#timeline" class="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-[0_15px_30px_rgba(79,70,229,0.2)] transition transform hover:-translate-y-1">
                    {{ __('cl_hero_cta') }}
                </a>
            </div>

            {{-- Visual Bawah (Lebar - Mockup Release Note) --}}
            <div class="relative w-full max-w-4xl mx-auto rounded-[2.5rem] bg-white p-3 shadow-2xl border border-gray-100 text-left transform perspective-1000 rotate-x-6 hover:rotate-x-0 transition-transform duration-700">
                <div class="absolute inset-0 bg-indigo-500 rounded-[2.5rem] blur-2xl opacity-10 -z-10"></div>
                <div class="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-gray-100 overflow-hidden relative flex flex-col md:flex-row gap-8">
                    
                    <div class="flex-1 space-y-6 z-10">
                        <div class="flex items-center gap-4 border-b border-gray-200 pb-6">
                            <div class="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-black">2.4</div>
                            <div>
                                <h4 class="font-black text-gray-900 text-xl">{{ __('cl_mockup_title') }}</h4>
                                <p class="text-gray-500 text-sm font-medium">{{ __('cl_mockup_desc') }}</p>
                            </div>
                        </div>
                        <ul class="space-y-3">
                            <li class="flex items-center gap-3">
                                <span class="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded uppercase">New</span>
                                <span class="text-gray-700 font-medium">Methodology Frameworks added to Solutions.</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase">Improved</span>
                                <span class="text-gray-700 font-medium">Pomodoro Timer sync speed increased by 40%.</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase">Fixed</span>
                                <span class="text-gray-700 font-medium">Journal entry date parsing bug resolved.</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </header>

    {{-- SECTION 2: STATS BANNERS (MENGGANTIKAN STATS GELAP SEBELUMNYA) --}}
    <section class="py-20 bg-indigo-600 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                <div>
                    <div class="text-5xl font-black mb-2">{{ __('cl_stat_1_val') }}</div>
                    <p class="text-indigo-200 font-bold uppercase tracking-widest text-xs">{{ __('cl_stat_1_label') }}</p>
                </div>
                <div>
                    <div class="text-5xl font-black mb-2">{{ __('cl_stat_2_val') }}</div>
                    <p class="text-indigo-200 font-bold uppercase tracking-widest text-xs">{{ __('cl_stat_2_label') }}</p>
                </div>
                <div>
                    <div class="text-5xl font-black mb-2">{{ __('cl_stat_3_val') }}</div>
                    <p class="text-indigo-200 font-bold uppercase tracking-widest text-xs">{{ __('cl_stat_3_label') }}</p>
                </div>
                <div>
                    <div class="text-5xl font-black mb-2">{{ __('cl_stat_4_val') }}</div>
                    <p class="text-indigo-200 font-bold uppercase tracking-widest text-xs">{{ __('cl_stat_4_label') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 3: EVOLUTION TIMELINE (CLEAN & ELEGANT) --}}
    <section id="timeline" class="py-32 bg-slate-50 relative">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-24">
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900">{{ __('cl_timeline_title') }}</h2>
                <p class="text-xl text-gray-500 max-w-2xl mx-auto">{{ __('cl_timeline_desc') }}</p>
            </div>

            <div class="relative">
                {{-- Central Spine --}}
                <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-indigo-100 transform md:-translate-x-1/2 rounded-full"></div>

                <div class="space-y-24">
                    {{-- Loop Timeline items (Bergantian warna aksen Indigo/Slate) --}}
                    @foreach([
                        ['v' => '1', 'align' => 'right', 'color' => 'indigo'],
                        ['v' => '2', 'align' => 'left', 'color' => 'slate'],
                        ['v' => '3', 'align' => 'right', 'color' => 'indigo'],
                        ['v' => '4', 'align' => 'left', 'color' => 'slate']
                    ] as $item)
                    
                    @php
                        $vMatch = $item['v'];
                        $align = $item['align'];
                        $color = $item['color'];
                        $badgeColor = $color === 'indigo' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white';
                    @endphp

                    <div class="relative flex flex-col md:flex-row items-start md:items-center gap-8 group">
                        
                        {{-- Timeline Dot --}}
                        <div class="absolute left-6 md:left-1/2 w-12 h-12 {{ $badgeColor }} rounded-full shadow-lg shadow-{{$color}}-200 transform -translate-x-1/2 md:-translate-x-1/2 z-20 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center border-4 border-white">
                            <span class="font-black text-xs">v2.{{ 5 - $vMatch }}</span>
                        </div>

                        {{-- Card Layout Logic --}}
                        @if($align === 'right')
                            {{-- Left Space (Empty for Desktop) --}}
                            <div class="hidden md:block md:w-1/2 pr-16 text-right">
                                <span class="text-lg font-black text-{{$color}}-500 uppercase tracking-widest">{{ __("cl_item_{$vMatch}_date") }}</span>
                            </div>
                            {{-- Right Content --}}
                            <div class="pl-20 md:pl-16 md:w-1/2 w-full">
                                <div class="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                                    <span class="md:hidden block text-xs font-black text-{{$color}}-500 mb-4 uppercase tracking-widest">{{ __("cl_item_{$vMatch}_date") }}</span>
                                    <h3 class="text-2xl font-black text-gray-900 mb-6">{{ __("cl_item_{$vMatch}_title") }}</h3>
                                    <ul class="space-y-4">
                                        @for($f = (($vMatch-1)*3+1); $f <= ($vMatch*3); $f++)
                                        <li class="flex items-start gap-4">
                                            <span class="text-{{$color}}-500 mt-1">✓</span>
                                            <span class="text-gray-600 font-medium">{{ __("cl_feat_{$f}") }}</span>
                                        </li>
                                        @endfor
                                    </ul>
                                </div>
                            </div>
                        @else
                            {{-- Left Content (Reverse) --}}
                            <div class="pl-20 md:pl-0 md:pr-16 md:w-1/2 w-full order-2 md:order-1 text-left md:text-right">
                                <div class="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                                    <span class="md:hidden block text-xs font-black text-{{$color}}-500 mb-4 uppercase tracking-widest">{{ __("cl_item_{$vMatch}_date") }}</span>
                                    <h3 class="text-2xl font-black text-gray-900 mb-6">{{ __("cl_item_{$vMatch}_title") }}</h3>
                                    <ul class="space-y-4 text-left md:text-right inline-block w-full">
                                        @for($f = (($vMatch-1)*3+1); $f <= ($vMatch*3); $f++)
                                        <li class="flex items-start md:flex-row-reverse gap-4">
                                            <span class="text-{{$color}}-500 mt-1">✓</span>
                                            <span class="text-gray-600 font-medium">{{ __("cl_feat_{$f}") }}</span>
                                        </li>
                                        @endfor
                                    </ul>
                                </div>
                            </div>
                            {{-- Right Space (Empty for Desktop) --}}
                            <div class="hidden md:block md:w-1/2 pl-16 text-left order-1 md:order-2">
                                <span class="text-lg font-black text-{{$color}}-500 uppercase tracking-widest">{{ __("cl_item_{$vMatch}_date") }}</span>
                            </div>
                        @endif
                    </div>
                    @endforeach

                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE ROADMAP (TAMBAHAN SECTION BIAR PANJANG) --}}
    <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-4xl font-black mb-4 text-gray-900">{{ __('cl_roadmap_title') }}</h2>
                <p class="text-xl text-gray-500">{{ __('cl_roadmap_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                {{-- Column 1: Doing --}}
                <div class="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100">
                    <div class="flex items-center gap-3 mb-8">
                        <span class="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></span>
                        <h3 class="font-black text-indigo-900 uppercase tracking-widest text-sm">{{ __('cl_roadmap_col_1') }}</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-white p-5 rounded-2xl shadow-sm border border-indigo-50"><p class="font-bold text-gray-800">{{ __('cl_road_1') }}</p></div>
                        <div class="bg-white p-5 rounded-2xl shadow-sm border border-indigo-50"><p class="font-bold text-gray-800">{{ __('cl_road_2') }}</p></div>
                    </div>
                </div>

                {{-- Column 2: Next --}}
                <div class="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200">
                    <div class="flex items-center gap-3 mb-8">
                        <span class="w-3 h-3 rounded-full bg-slate-400"></span>
                        <h3 class="font-black text-slate-700 uppercase tracking-widest text-sm">{{ __('cl_roadmap_col_2') }}</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100"><p class="font-bold text-gray-700">{{ __('cl_road_3') }}</p></div>
                        <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100"><p class="font-bold text-gray-700">{{ __('cl_road_4') }}</p></div>
                    </div>
                </div>

                {{-- Column 3: Later --}}
                <div class="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-200">
                    <div class="flex items-center gap-3 mb-8">
                        <span class="w-3 h-3 rounded-full bg-gray-300"></span>
                        <h3 class="font-black text-gray-500 uppercase tracking-widest text-sm">{{ __('cl_roadmap_col_3') }}</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"><p class="font-bold text-gray-600">{{ __('cl_road_5') }}</p></div>
                        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"><p class="font-bold text-gray-600">{{ __('cl_road_6') }}</p></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 5: CTA (DESAIN LEGA & TIDAK MEPET) --}}
    <section class="py-32 px-6 bg-slate-50 relative overflow-hidden border-t border-gray-200">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-indigo-100/50 to-transparent rounded-t-full -z-10"></div>
        
        <div class="max-w-6xl mx-auto bg-white rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl border border-gray-100">
            {{-- Decorative glow inside card --}}
            <div class="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px]"></div>
            <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]"></div>

            <div class="relative z-10">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full text-4xl mb-8 shadow-inner">
                    💡
                </div>
                <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">{{ __('cl_cta_title') }}</h2>
                <p class="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">{{ __('cl_cta_desc') }}</p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-6">
                    <a href="mailto:support@oneformind.com" class="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-[0_15px_30px_rgba(79,70,229,0.3)] transition transform hover:-translate-y-1">
                        {{ __('cl_cta_btn') }}
                    </a>
                </div>
                <p class="mt-10 text-sm font-bold text-gray-400 uppercase tracking-widest">{{ __('cl_cta_note') }}</p>
            </div>
        </div>
    </section>

@endsection