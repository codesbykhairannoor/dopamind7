@extends('layouts.marketing')

@section('title', (app()->getLocale() === 'id' ? 'Tentang Kami | Satu Aplikasi Pelacak Produktivitas' : 'About Us | All in One Productivity OS'))

@section('meta')
    <meta name="description" content="{{ __('about_meta_desc') }}">
    <meta property="og:title" content="{{ __('about_meta_og_title') }}">
    <meta property="og:description" content="{{ __('about_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/about') }}">

@endsection

@section('json-ld')
<script type="application/ld+json">
[{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "{{ __('schema_about_name') }}",
  "description": "{{ __('schema_about_description') }}",
  "mainEntity": {
    "@type": "Organization",
    "name": "OneForMind",
    "description": "Building the unified life operating system for modern high performers.",
    "vision": "Empowering humanity to manage life in one frictionless system."
  }
},{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "OneForMind",
    "item": "{{ url('/') }}"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "{{ app()->getLocale() === 'id' ? 'Tentang' : 'About' }}",
    "item": "{{ url('/about') }}"
  }]
}]
</script>
@endsection

@section('content')
    {{-- ================================================================= --}}
    {{-- HERO SECTION --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-24 px-6 text-center max-w-5xl mx-auto relative overflow-hidden">
        {{-- Background Accents --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -z-10 animate-pulse"></div>

        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-black text-[10px] mb-10 uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-700 border border-indigo-100">
            {{ __('about_badge') }}
        </div>
        
        <h1 class="text-5xl md:text-8xl font-black mb-10 text-slate-900 leading-[0.95] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {{ __('about_title_1') }}<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-900">
                {{ __('about_title_2') }}
            </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
            {{ __('about_desc') }}
        </p>
    </header>

    {{-- ================================================================= --}}
    {{-- STORY SECTION (FRICTION CRISIS) - OVERHAULED --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-slate-50 relative overflow-hidden">
        {{-- Indigo Accents --}}
        <div class="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/5 -skew-x-12 translate-x-1/2"></div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="grid lg:grid-cols-2 gap-32 items-center">
                <div class="space-y-10">
                    <div class="h-1 w-20 bg-indigo-600"></div>
                    <h2 class="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                        {{ __('story_1_title') }}
                    </h2>
                    <div class="space-y-6">
                        <p class="text-slate-600 text-xl leading-relaxed font-medium">
                            {{ __('story_1_p1') }}
                        </p>
                        <p class="text-indigo-600 text-2xl leading-tight font-black italic">
                            "{{ __('story_1_p2') }}"
                        </p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-6 pt-10">
                        <div class="group">
                            <div class="text-5xl mb-4 group-hover:-rotate-12 transition duration-500">🧠</div>
                            <div class="h-px w-full bg-slate-200 mb-4 group-hover:bg-indigo-600 transition"></div>
                            <div class="font-black text-slate-900 text-xs uppercase tracking-widest">{{ __('story_1_card_1') }}</div>
                        </div>
                        <div class="group">
                            <div class="text-5xl mb-4 group-hover:rotate-12 transition duration-500">📡</div>
                            <div class="h-px w-full bg-slate-200 mb-4 group-hover:bg-indigo-600 transition"></div>
                            <div class="font-black text-slate-900 text-xs uppercase tracking-widest">{{ __('story_1_card_2') }}</div>
                        </div>
                    </div>
                </div>
                
                <div class="relative">
                    <div class="aspect-square bg-slate-900 rounded-[5rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700 border-[12px] border-white">
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 via-slate-900 to-indigo-950 opacity-60"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                             <div class="w-32 h-32 bg-indigo-600 text-white rounded-full flex items-center justify-center text-5xl animate-pulse shadow-[0_0_50px_rgba(79,70,229,0.5)]">
                                🌌
                             </div>
                        </div>
                        {{-- Schematic Overlay --}}
                        <div class="absolute bottom-10 left-10 p-8 border border-white/10 rounded-3xl backdrop-blur-md bg-white/5">
                            <div class="text-[10px] text-white/40 font-black uppercase tracking-[0.4em] mb-2">System Status</div>
                            <div class="flex gap-1">
                                @foreach(range(1,5) as $i)
                                    <div class="w-1 h-4 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: {{ $i * 0.1 }}s"></div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- STORY SECTION (FLOW) - OVERHAULED --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-32 items-center">
                <div class="order-2 lg:order-1 relative">
                    <div class="aspect-[4/3] bg-indigo-600 rounded-[5rem] overflow-hidden -rotate-3 hover:rotate-0 transition-all duration-700 border-[12px] border-slate-50 shadow-2xl">
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-400 via-indigo-600 to-indigo-900 opacity-80"></div>
                        <div class="absolute inset-0 flex items-center justify-center text-9xl">🌱</div>
                        {{-- Floating Tags --}}
                        <div class="absolute top-10 right-10 bg-white px-4 py-2 rounded-full shadow-xl font-black text-[10px] text-indigo-600 uppercase tracking-widest">Growth</div>
                        <div class="absolute bottom-20 left-10 bg-white px-4 py-2 rounded-full shadow-xl font-black text-[10px] text-indigo-600 uppercase tracking-widest">Clarity</div>
                    </div>
                </div>

                <div class="order-1 lg:order-2 space-y-10">
                    <div class="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">The Transition</div>
                    <h2 class="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">{{ __('story_2_title') }}</h2>
                    <p class="text-slate-600 text-xl leading-relaxed font-medium">{{ __('story_2_p1') }}</p>
                    <div class="p-12 bg-indigo-600 rounded-[4rem] text-white shadow-2xl relative group overflow-hidden">
                        {{-- Decorative --}}
                        <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition duration-1000"></div>
                        <p class="text-2xl font-black italic leading-tight relative z-10">
                            "{{ __('story_2_quote') }}"
                        </p>
                    </div>
                    <p class="text-slate-500 text-lg leading-relaxed font-bold">{{ __('story_2_p2') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- MANIFESTO SECTION - OVERHAULED --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-indigo-600 relative overflow-hidden rounded-[5rem] mx-6">
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] opacity-10 -mr-40 -mt-40"></div>
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400 rounded-full blur-[150px] opacity-10 -ml-20 -mb-20"></div>

        <div class="max-w-7xl mx-auto px-10 relative z-10">
            <div class="text-center mb-32">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-black text-[10px] mb-8 uppercase tracking-[0.4em] border border-white/20">
                    {{ __('manifesto_badge') }}
                </div>
                <h2 class="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
                    {{ __('manifesto_title') }}
                </h2>
            </div>

            <div class="grid md:grid-cols-3 gap-10">
                @php
                    $manifesto = [
                        ['icon' => '🛡️', 'title' => 'manifesto_1_title', 'desc' => 'manifesto_1_desc'],
                        ['icon' => '🔄', 'title' => 'manifesto_2_title', 'desc' => 'manifesto_2_desc'],
                        ['icon' => '✨', 'title' => 'manifesto_3_title', 'desc' => 'manifesto_3_desc']
                    ];
                @endphp
                @foreach($manifesto as $pillar)
                <div class="bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 hover:border-white transition-all duration-500 group">
                    <div class="w-20 h-20 bg-white text-indigo-600 rounded-3xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 group-hover:rotate-12 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        {{ $pillar['icon'] }}
                    </div>
                    <h3 class="text-3xl font-black text-white mb-6 tracking-tight uppercase">{{ __($pillar['title']) }}</h3>
                    <p class="text-indigo-100/70 font-bold leading-relaxed text-lg">{{ __($pillar['desc']) }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- CORE PHILOSOPHY - OVERHAULED --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-white relative">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row gap-20 items-end mb-32">
                <div class="lg:w-2/3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        📚 {{ __('about_philosophy_badge') }}
                    </div>
                    <h2 class="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">{{ __('about_philosophy_title') }}</h2>
                </div>
                <div class="lg:w-1/3 pb-4">
                    <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-indigo-600 w-1/3"></div>
                    </div>
                </div>
            </div>

            <div class="space-y-12">
                @php
                    $laws = [
                        ['id' => '01', 'title' => 'about_philosophy_law1_title', 'desc' => 'about_philosophy_law1_desc'],
                        ['id' => '02', 'title' => 'about_philosophy_law2_title', 'desc' => 'about_philosophy_law2_desc'],
                        ['id' => '03', 'title' => 'about_philosophy_law3_title', 'desc' => 'about_philosophy_law3_desc'],
                    ];
                @endphp
                
                @foreach($laws as $law)
                <div class="group flex flex-col md:flex-row gap-16 items-start p-16 rounded-[5rem] border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-700">
                    <div class="text-8xl font-black text-indigo-100 group-hover:text-indigo-600 transition-colors duration-500 leading-none">
                        {{ $law['id'] }}
                    </div>
                    <div class="space-y-6 pt-4">
                        <h3 class="text-4xl font-black text-slate-900 uppercase tracking-tight">{{ __($law['title']) }}</h3>
                        <p class="text-slate-500 font-bold text-xl leading-relaxed max-w-3xl">{{ __($law['desc']) }}</p>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- TEAM SECTION (BOARD OF VISIONARIES) - OVERHAULED --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-slate-950 relative overflow-hidden">
        {{-- High-tech bg --}}
        <div class="absolute inset-0 opacity-10 pointer-events-none">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <h2 class="text-4xl md:text-6xl font-black mb-32 text-center text-white tracking-tighter uppercase italic">{{ __('team_title') }}</h2>
            
            <div class="grid md:grid-cols-2 gap-12">
                {{-- THE BUILDER --}}
                <div class="bg-white/5 border border-white/10 p-16 rounded-[5rem] backdrop-blur-xl group hover:bg-white/10 transition duration-700 overflow-hidden relative">
                    <div class="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] group-hover:opacity-40 transition"></div>
                    
                    <div class="relative z-10">
                        <div class="flex items-center gap-8 mb-12">
                            <div class="w-24 h-24 bg-indigo-600 text-white rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl shadow-indigo-500/50">
                                🏗️
                            </div>
                            <div>
                                <h3 class="text-4xl font-black text-white mb-2">{{ __('dev_name') }}</h3>
                                <div class="inline-block px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full">
                                    <span class="text-[10px] font-black tracking-[0.4em] text-indigo-400 uppercase">
                                        {{ __('dev_role') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p class="text-indigo-100/60 leading-relaxed text-2xl font-black italic">
                            "{{ __('dev_desc') }}"
                        </p>
                    </div>
                </div>

                {{-- THE VISIONARY --}}
                <div class="bg-white/5 border border-white/10 p-16 rounded-[5rem] backdrop-blur-xl group hover:bg-white/10 transition duration-700 overflow-hidden relative">
                    <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] group-hover:opacity-40 transition"></div>
                    
                    <div class="relative z-10">
                        <div class="flex items-center gap-8 mb-12">
                            <div class="w-24 h-24 bg-purple-600 text-white rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl shadow-purple-500/50">
                                🛰️
                            </div>
                            <div>
                                <h3 class="text-4xl font-black text-white mb-2">{{ __('user_name') }}</h3>
                                <div class="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full">
                                    <span class="text-[10px] font-black tracking-[0.4em] text-purple-400 uppercase">
                                        {{ __('user_role') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p class="text-purple-100/60 leading-relaxed text-2xl font-black italic">
                            "{{ __('user_desc') }}"
                        </p>
                    </div>
                </div>
            </div>

            <div class="mt-32 text-center">
                <a href="https://twitter.com/OneForMind" class="inline-flex items-center gap-4 text-white hover:text-indigo-400 transition-all duration-500 group">
                    <span class="text-[10px] font-black uppercase tracking-[0.5em]">{{ __('team_connect') }}</span>
                    <span class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-indigo-600 transition">𝕏</span>
                </a>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- PRODUCT EVOLUTION (ROADMAP) - OVERHAULED --}}
    {{-- ================================================================= --}}
    <section class="py-40 bg-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-40">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                    🗺️ {{ __('about_roadmap_badge') }}
                </div>
                <h2 class="text-5xl md:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter uppercase">{{ __('about_roadmap_title') }}</h2>
            </div>

            <div class="relative max-w-5xl mx-auto">
                {{-- Timeline Line --}}
                <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 hidden md:block overflow-hidden">
                    <div class="h-1/2 w-full bg-indigo-600 animate-pulse"></div>
                </div>

                <div class="space-y-40">
                    @php
                        $roadmap = [
                            ['phase' => '01', 'title' => 'about_roadmap_v1_title', 'desc' => 'about_roadmap_v1_desc', 'status' => 'active', 'icon' => '🏗️'],
                            ['phase' => '02', 'title' => 'about_roadmap_v2_title', 'desc' => 'about_roadmap_v2_desc', 'status' => 'next', 'icon' => '⚡'],
                            ['phase' => '03', 'title' => 'about_roadmap_v3_title', 'desc' => 'about_roadmap_v3_desc', 'status' => 'future', 'icon' => '🧠'],
                        ];
                    @endphp

                    @foreach($roadmap as $index => $item)
                    <div class="relative flex flex-col md:flex-row items-center gap-20 {{ $index % 2 != 0 ? 'md:flex-row-reverse' : '' }}">
                        {{-- Content --}}
                        <div class="md:w-1/2 {{ $index % 2 != 0 ? 'md:text-right text-center' : 'md:text-left text-center' }}">
                            <div class="relative group">
                                <div class="text-indigo-600 font-black text-7xl mb-6 opacity-20 group-hover:opacity-100 transition duration-700">{{ $item['phase'] }}</div>
                                <div class="text-4xl mb-6">{{ $item['icon'] }}</div>
                                <h3 class="text-4xl font-black text-slate-900 mb-6 tracking-tight uppercase leading-none">{{ __($item['title']) }}</h3>
                                <p class="text-slate-500 font-bold leading-relaxed text-xl">{{ __($item['desc']) }}</p>
                            </div>
                        </div>

                        {{-- Final Node --}}
                        <div class="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-[6px] border-white shadow-2xl hidden md:flex items-center justify-center z-10
                            {{ $item['status'] === 'active' ? 'bg-indigo-600 scale-125' : 'bg-slate-200' }}">
                            @if($item['status'] === 'active')
                                <div class="w-3 h-3 bg-white rounded-full animate-ping"></div>
                            @endif
                        </div>

                        {{-- Placeholder for balance --}}
                        <div class="md:w-1/2 hidden md:block"></div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- FINAL CTA --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-indigo-50 border-t border-indigo-100 text-center relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 relative z-10 animate-in zoom-in-95 fade-in duration-1000">
            <h2 class="text-5xl md:text-6xl font-black mb-8 text-indigo-950 tracking-tight">{{ __('cta_about_title') }}</h2>
            <p class="text-2xl text-indigo-700/70 mb-14 font-medium max-w-2xl mx-auto">{{ __('cta_about_desc') }}</p>
            <div class="flex justify-center flex-col sm:flex-row gap-5">
                <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-14 py-6 rounded-[2.5rem] font-black text-xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition transform hover:-translate-y-2 active:scale-95">
                    {{ __('cta_about_btn') }}
                </a>
            </div>
            <p class="mt-8 text-[10px] font-black text-indigo-400 uppercase tracking-widest">{{ __('cta_about_sub') }}</p>
        </div>
        
        {{-- Background Blobs --}}
        <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-200 rounded-full blur-[100px] opacity-30"></div>
    </section>
@endsection
