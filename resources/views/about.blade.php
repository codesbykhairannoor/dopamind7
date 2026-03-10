@extends('layouts.marketing')

@section('title', (app()->getLocale() === 'id' ? 'Tentang Kami | Satu Aplikasi Pelacak Produktivitas' : 'About Us | All in One Productivity OS'))

@section('meta')
    <meta name="description" content="{{ app()->getLocale() === 'id' ? 'Misi OneForMind: Membangun sistem operasi hidup terpadu untuk para profesional dan visioner.' : 'OneForMind Mission: Building the unified life operating system for high performers and visionaries.' }}">
    
    <meta property="og:title" content="{{ app()->getLocale() === 'id' ? 'Tentang OneForMind - Visi & Misi' : 'About OneForMind - The Vision' }}">
    <meta property="og:description" content="{{ app()->getLocale() === 'id' ? 'Temukan kolektif di balik OneForMind. Kami membangun sistem operasi hidup terpadu untuk masa depan produktivitas.' : 'Discover the collective behind OneForMind. We are building the unified life OS for the future of productivity.' }}">
    <meta property="og:type" content="website"> 
    <meta property="og:url" content="{{ url('/about') }}">

    <link rel="alternate" hreflang="id" href="{{ url('/lang/id') }}" />
    <link rel="alternate" hreflang="en" href="{{ url('/lang/en') }}" />
    <link rel="alternate" hreflang="x-default" href="{{ url('/about') }}" />
    <link rel="canonical" href="{{ url('/about') }}" />
@endsection

@section('json-ld')
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "OneForMind",
    "description": "Building the unified life operating system for modern high performers.",
    "vision": "Empowering humanity to manage life in one frictionless system."
  }
}
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
    {{-- STORY SECTION (FRICTION CRISIS) --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 space-y-32">
            
            <div class="grid lg:grid-cols-2 gap-20 items-center">
                <div class="animate-in slide-in-from-left-12 fade-in duration-700 fill-mode-both">
                    <h2 class="text-4xl md:text-5xl font-black mb-8 text-slate-900 leading-tight">{{ __('story_1_title') }}</h2>
                    <p class="text-slate-500 text-lg leading-relaxed mb-8 font-medium">{{ __('story_1_p1') }}</p>
                    <p class="text-slate-500 text-lg leading-relaxed mb-10 font-black italic">
                        "{{ __('story_1_p2') }}"
                    </p>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-indigo-50 p-6 rounded-[2.5rem] border border-indigo-100/50 hover:shadow-xl transition duration-500">
                            <div class="text-3xl mb-4">🧠</div>
                            <div class="font-black text-indigo-900 text-xs uppercase tracking-widest">{{ __('story_1_card_1') }}</div>
                        </div>
                        <div class="bg-indigo-50 p-6 rounded-[2.5rem] border border-indigo-100/50 hover:shadow-xl transition duration-500 delay-75">
                            <div class="text-3xl mb-4">📡</div>
                            <div class="font-black text-indigo-900 text-xs uppercase tracking-widest">{{ __('story_1_card_2') }}</div>
                        </div>
                    </div>
                </div>
                
                <div class="relative h-[500px] bg-slate-900 rounded-[4rem] border border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden animate-in slide-in-from-right-12 fade-in duration-700 delay-100 fill-mode-both">
                    <div class="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 opacity-40"></div>
                    <div class="relative z-10 px-8 text-center flex flex-col items-center">
                         <div class="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center text-4xl mb-8 animate-bounce shadow-2xl shadow-indigo-500/50">
                            🌌
                         </div>
                         <div class="space-y-3 w-64 max-w-full">
                            <div class="h-2 bg-indigo-100/20 rounded-full w-full"></div>
                            <div class="h-2 bg-indigo-100/20 rounded-full w-3/4 mx-auto"></div>
                            <div class="h-2 bg-indigo-100/20 rounded-full w-1/2 mx-auto"></div>
                         </div>
                    </div>
                </div>
            </div>

            {{-- SECOND STORY: FLOW --}}
            <div class="grid lg:grid-cols-2 gap-20 items-center">
                <div class="order-2 lg:order-1 relative h-96 bg-slate-50 rounded-[4rem] border border-slate-100 flex items-center justify-center overflow-hidden animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both">
                    <div class="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50"></div>
                    <div class="text-8xl relative z-10 filter drop-shadow-2xl">🌱</div>
                </div>

                <div class="order-1 lg:order-2 animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both">
                    <h2 class="text-4xl md:text-5xl font-black mb-8 text-slate-900 leading-tight">{{ __('story_2_title') }}</h2>
                    <p class="text-slate-500 text-lg leading-relaxed mb-8 font-medium">{{ __('story_2_p1') }}</p>
                    <div class="border-l-[6px] border-indigo-600 pl-8 py-6 bg-indigo-50/50 rounded-r-[2rem] mb-10 shadow-sm shadow-indigo-100">
                        <p class="text-indigo-950 font-black italic text-xl leading-relaxed">
                            "{{ __('story_2_quote') }}"
                        </p>
                    </div>
                    <p class="text-slate-500 text-lg leading-relaxed font-medium">{{ __('story_2_p2') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- MANIFESTO SECTION --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-slate-900 relative overflow-hidden rounded-[4rem] mx-6">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[140px] opacity-20 -mr-20 -mt-20"></div>

        <div class="max-w-7xl mx-auto px-10 relative z-10 text-center">
            <div class="mb-20">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-indigo-400 font-black text-[10px] mb-6 uppercase tracking-widest border border-white/5">
                    {{ __('manifesto_badge') }}
                </div>
                <h2 class="text-4xl md:text-6xl font-black text-white leading-tight">
                    {{ __('manifesto_title') }}
                </h2>
            </div>

            <div class="grid md:grid-cols-3 gap-8 text-left">
                @php
                    $manifesto = [
                        ['icon' => '🛡️', 'title' => 'manifesto_1_title', 'desc' => 'manifesto_1_desc'],
                        ['icon' => '🔄', 'title' => 'manifesto_2_title', 'desc' => 'manifesto_2_desc'],
                        ['icon' => '✨', 'title' => 'manifesto_3_title', 'desc' => 'manifesto_3_desc']
                    ];
                @endphp
                @foreach($manifesto as $pillar)
                <div class="bg-white/5 p-10 rounded-[3rem] border border-white/5 hover:border-indigo-500 hover:bg-white/10 transition duration-500 group">
                    <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-indigo-600 group-hover:scale-110 transition shadow-xl">
                        {{ $pillar['icon'] }}
                    </div>
                    <h3 class="text-2xl font-black text-white mb-4 tracking-tight">{{ __($pillar['title']) }}</h3>
                    <p class="text-indigo-100/70 font-semibold leading-relaxed text-sm">{{ __($pillar['desc']) }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- TEAM SECTION (THE COLLECTIVE) --}}
    {{-- ================================================================= --}}
    <section class="py-40 max-w-7xl mx-auto px-6">
        <h2 class="text-5xl md:text-6xl font-black mb-24 text-center text-slate-900 tracking-tight">{{ __('team_title') }}</h2>
        
        <div class="grid md:grid-cols-2 gap-10">
            {{-- THE BUILDERS --}}
            <div class="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl shadow-indigo-50/50 hover:shadow-2xl hover:shadow-indigo-100 transition duration-700 group relative overflow-hidden">
                <div class="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-100 transition-colors"></div>
                
                <div class="relative z-10">
                    <div class="flex items-center gap-6 mb-10">
                        <div class="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl">
                            🏗️
                        </div>
                        <div>
                            <h3 class="text-3xl font-black text-slate-900 mb-2">{{ __('dev_name') }}</h3>
                            <span class="inline-block text-[10px] font-black tracking-widest text-indigo-600 uppercase bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                                {{ __('dev_role') }}
                            </span>
                        </div>
                    </div>
                    <p class="text-slate-500 leading-relaxed text-xl font-medium italic">
                        "{{ __('dev_desc') }}"
                    </p>
                </div>
            </div>

            {{-- THE VISIONARIES --}}
            <div class="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl shadow-purple-50/50 hover:shadow-2xl hover:shadow-purple-100 transition duration-700 group relative overflow-hidden">
                <div class="absolute bottom-0 left-0 w-40 h-40 bg-purple-50 rounded-full blur-3xl -ml-16 -mb-16 group-hover:bg-purple-100 transition-colors"></div>
                
                <div class="relative z-10">
                    <div class="flex items-center gap-6 mb-10">
                        <div class="w-20 h-20 bg-purple-600 text-white rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl">
                            🛰️
                        </div>
                        <div>
                            <h3 class="text-3xl font-black text-slate-900 mb-2">{{ __('user_name') }}</h3>
                            <span class="inline-block text-[10px] font-black tracking-widest text-purple-600 uppercase bg-purple-50 px-4 py-2 rounded-full border border-purple-100">
                                {{ __('user_role') }}
                            </span>
                        </div>
                    </div>
                    <p class="text-slate-500 leading-relaxed text-xl font-medium italic">
                        "{{ __('user_desc') }}"
                    </p>
                </div>
            </div>
        </div>

        <div class="mt-20 text-center">
            <p class="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                {{ __('team_connect') }} 
                <a href="https://twitter.com/OneForMind" class="text-indigo-600 hover:text-indigo-800 underline decoration-indigo-200 hover:decoration-indigo-600 transition underline-offset-8">𝕏 (@OneForMind)</a>
            </p>
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
                <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-14 py-6 rounded-[2.5rem] font-black text-xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition transform hover:-translate-y-2 active:scale-95">
                    {{ __('cta_about_btn') }}
                </a>
            </div>
            <p class="mt-8 text-[10px] font-black text-indigo-400 uppercase tracking-widest">{{ __('cta_about_sub') }}</p>
        </div>
        
        {{-- Background Blobs --}}
        <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-200 rounded-full blur-[100px] opacity-30"></div>
    </section>
@endsection
