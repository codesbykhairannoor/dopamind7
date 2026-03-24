@extends('layouts.marketing')

@section('title', __('calendar_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('calendar_meta_desc') }}">
    <meta property="og:title" content="{{ __('calendar_meta_og_title') }}">
    <meta property="og:description" content="{{ __('calendar_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/features/calendar') }}">

@endsection

@section('json-ld')
<script type="application/ld+json">
[
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{{ __('schema_calendar_name') }}",
  "applicationCategory": "ProductivityApplication",
  "description": "{{ __('schema_calendar_description') }}"
},
{
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
    "name": "{{ __('calendar_hero_badge') }}",
    "item": "{{ url('/features/calendar') }}"
  }]
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{ __('calendar_faq_q1') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('calendar_faq_a1') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('calendar_faq_q2') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('calendar_faq_a2') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('calendar_faq_q3') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('calendar_faq_a3') }}"
      }
    }
  ]
}
]
</script>
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
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        {{ __('calendar_hero_cta_1') }}
                    </a>
                    <a href="#how-it-works" class="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-full font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition">
                        {{ __('calendar_hero_cta_2') }}
                    </a>
                </div>
            </div>

            {{-- Floating Mockup Centered (Calendar View) --}}
            <div class="max-w-6xl mx-auto relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both" role="img" aria-label="Smart Calendar Dashboard Preview: Showing a unified view of Google Calendar events, deep work sessions, and personal availability in a clean monthly and daily agenda format.">
            <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20 h-full w-full pointer-events-none"></div>
            
            <div class="bg-white/80 backdrop-blur-xl rounded-t-[3rem] border-x border-t border-gray-100 p-6 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 overflow-hidden h-[500px]">
                    
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
                            <span>{{ __('calendar_days_s') }}</span><span>{{ __('calendar_days_s') }}</span><span>{{ __('calendar_days_t') }}</span><span>{{ __('calendar_days_w') }}</span><span>{{ __('calendar_days_t') }}</span><span>{{ __('calendar_days_f') }}</span><span>{{ __('calendar_days_s') }}</span>
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

    {{-- NEW SECTION 2: LAYERED TIME (3D STACK) --}}
    <section class="py-24 bg-white bg-pattern-dots relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row gap-24 items-center">
                <div class="flex-1 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-sm border border-indigo-100">
                        {{ __('calendar_layered_badge') }}
                    </div>
                    <h2 class="text-5xl md:text-7xl font-black text-gray-900 mb-10 leading-[1.1] tracking-tight">
                        {{ __('calendar_layered_title') }}
                    </h2>
                    <p class="text-gray-500 text-xl mb-12 leading-relaxed font-medium">
                        {{ __('calendar_layered_desc') }}
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition duration-500 group relative overflow-hidden">
                            <div class="absolute right-0 top-0 w-2 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition"></div>
                            <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">💼</div>
                            <h4 class="text-xl font-black text-gray-900 mb-2 uppercase tracking-tighter">{{ __('calendar_layered_feature_1_title') }}</h4>
                            <p class="text-sm text-gray-500 leading-relaxed">{{ __('calendar_layered_feature_1_desc') }}</p>
                        </div>
                         <div class="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition duration-500 group relative overflow-hidden">
                            <div class="absolute right-0 top-0 w-2 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition"></div>
                            <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">🌿</div>
                            <h4 class="text-xl font-black text-gray-900 mb-2 uppercase tracking-tighter">{{ __('calendar_layered_feature_2_title') }}</h4>
                            <p class="text-sm text-gray-500 leading-relaxed">{{ __('calendar_layered_feature_2_desc') }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex-1 w-full perspective-3000">
                    {{-- Layered Visual --}}
                    <div class="relative h-[550px] flex items-center justify-center group/visual">
                        {{-- Social Layer (Bottom) --}}
                        <div class="absolute w-full max-w-sm aspect-[4/3] bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-[3rem] transform -rotate-[15deg] translate-y-24 translate-x-24 group-hover/visual:translate-y-32 group-hover/visual:translate-x-32 transition duration-1000">
                             <div class="p-10 opacity-30">
                                <div class="w-1/2 h-6 bg-purple-500/30 rounded-full mb-6"></div>
                                <div class="w-full h-32 bg-purple-500/20 rounded-[2rem]"></div>
                             </div>
                        </div>
                        {{-- Personal Layer (Middle) --}}
                        <div class="absolute w-full max-w-sm aspect-[4/3] bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 rounded-[3rem] transform -rotate-[8deg] translate-y-12 translate-x-12 z-10 group-hover/visual:translate-y-16 group-hover/visual:translate-x-16 transition duration-1000 delay-75">
                            <div class="p-10 opacity-60">
                                <div class="w-1/3 h-6 bg-emerald-500/30 rounded-full mb-6"></div>
                                <div class="w-2/3 h-6 bg-emerald-500/10 rounded-full mb-10"></div>
                                <div class="flex gap-6">
                                    <div class="w-16 h-16 bg-emerald-500/30 rounded-2xl"></div>
                                    <div class="w-16 h-16 bg-emerald-500/30 rounded-2xl"></div>
                                </div>
                            </div>
                        </div>
                        {{-- Work Layer (Top) --}}
                        <div class="absolute w-full max-w-sm aspect-[4/3] bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.12)] border border-gray-100 z-20 p-12 transform hover:scale-105 transition duration-700 shadow-indigo-100/50">
                            <div class="flex justify-between items-center mb-12">
                                <h4 class="font-black text-gray-900 text-2xl tracking-tighter uppercase">{{ __('calendar_layered_card_title') }}</h4>
                                <div class="w-14 h-14 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-300 transform -rotate-12">💼</div>
                            </div>
                            <div class="space-y-8">
                                <div class="h-20 bg-blue-50/50 border-l-[6px] border-blue-500 p-6 rounded-r-2xl relative overflow-hidden">
                                     <div class="absolute right-4 top-4 w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                                    <div class="mb-2">
                                         <span class="text-[11px] font-black text-blue-600 uppercase tracking-widest">{{ __('calendar_layered_card_event_1_time') }}</span>
                                    </div>
                                    <p class="text-lg font-black text-blue-900 leading-none tracking-tight">{{ __('calendar_layered_card_event_1_title') }}</p>
                                </div>
                                <div class="h-20 bg-indigo-50/50 border-l-[6px] border-indigo-500 p-6 rounded-r-2xl opacity-40">
                                    <p class="text-[11px] font-black text-indigo-400 uppercase mb-2 tracking-widest">{{ __('calendar_layered_card_event_2_time') }}</p>
                                    <p class="text-lg font-black text-indigo-900 leading-none tracking-tight">{{ __('calendar_layered_card_event_2_title') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION 3: DEADLINE PULSE (DARK MODE URGENCY) --}}
    <section class="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:50px_50px] opacity-[0.05]"></div>
        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <span class="text-rose-500 font-black uppercase tracking-[0.5em] text-xs mb-6 block">{{ __('calendar_pulse_badge') }}</span>
                <h2 class="text-4xl md:text-7xl font-black mb-10 tracking-tight">{{ __('calendar_pulse_title') }}</h2>
                <p class="text-indigo-100 text-xl opacity-80 leading-relaxed font-medium">{{ __('calendar_pulse_desc') }}</p>
            </div>

            <div class="grid lg:grid-cols-2 gap-16 items-center">
                 {{-- Pulse List --}}
                 <div class="space-y-8">
                    {{-- Item 1: CRITICAL --}}
                    <div class="bg-white/5 backdrop-blur-2xl border-2 border-rose-500/40 rounded-[2.5rem] p-10 flex items-center justify-between group hover:bg-rose-500/10 transition duration-500 hover:shadow-[0_0_50px_rgba(244,63,94,0.15)] relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent"></div>
                        <div class="flex items-center gap-8 relative z-10">
                            <div class="relative">
                                <div class="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-30"></div>
                                <div class="w-20 h-20 bg-rose-500 text-white rounded-[2rem] flex items-center justify-center text-4xl font-black relative z-10 shadow-2xl shadow-rose-500/40 transform group-hover:rotate-12 transition group-hover:scale-110">!</div>
                            </div>
                            <div>
                                <h4 class="text-3xl font-black text-white mb-2">{{ __('calendar_pulse_item_1_title') }}</h4>
                                <p class="text-rose-400 font-black uppercase tracking-[0.2em] text-[11px] bg-rose-500/10 inline-block px-3 py-1 rounded-full border border-rose-500/20">{{ __('calendar_pulse_item_1_status') }}</p>
                            </div>
                        </div>
                        <div class="text-right hidden sm:block relative z-10">
                            <p class="text-4xl font-black text-white tabular-nums">{{ __('calendar_pulse_item_1_timer') }}</p>
                            <p class="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">{{ __('calendar_pulse_item_1_sub') }}</p>
                        </div>
                    </div>

                    {{-- Item 2: NORMAL --}}
                    <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 flex items-center justify-between group hover:bg-indigo-600/10 transition duration-500 border-l-4 border-l-indigo-500">
                        <div class="flex items-center gap-8 opacity-60 group-hover:opacity-100 transition">
                            <div class="w-20 h-20 bg-slate-800 text-slate-400 rounded-[2rem] flex items-center justify-center text-4xl font-black group-hover:bg-indigo-600 group-hover:text-white transition duration-700">?</div>
                            <div>
                                <h4 class="text-3xl font-black text-white mb-2 tracking-tight">{{ __('calendar_pulse_item_2_title') }}</h4>
                                <p class="text-indigo-400 font-black tracking-[0.2em] text-[11px] uppercase">{{ __('calendar_pulse_item_2_status') }}</p>
                            </div>
                        </div>
                        <div class="hidden sm:block text-right">
                             <span class="text-white/20 text-4xl">⚓</span>
                        </div>
                    </div>
                 </div>

                 {{-- Pulse Radar (Visual) --}}
                 <div class="relative hidden lg:flex items-center justify-center p-12">
                    <div class="w-full aspect-square max-md border-2 border-indigo-500/20 rounded-full flex items-center justify-center relative shadow-[0_0_100px_rgba(79,70,229,0.1)]">
                        <div class="absolute inset-0 bg-indigo-500/[0.02] rounded-full animate-pulse"></div>
                        <div class="w-3/4 h-3/4 border border-indigo-500/20 rounded-full flex items-center justify-center">
                            <div class="w-1/2 h-1/2 border-2 border-rose-500/30 rounded-full animate-ping duration-1000"></div>
                        </div>
                        
                        {{-- Radar Sweep --}}
                        <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 via-transparent to-transparent rounded-full animate-spin-slow opacity-40"></div>
                        
                        {{-- Blips --}}
                        <div class="absolute top-[15%] right-[25%] w-6 h-6 bg-rose-500 rounded-full shadow-[0_0_40px_rgba(244,63,94,1)] animate-pulse border-4 border-slate-950"></div>
                        <div class="absolute bottom-[30%] left-[20%] w-4 h-4 bg-indigo-400 rounded-full shadow-[0_0_20px_rgba(129,140,248,0.8)] border-2 border-slate-950"></div>
                    </div>
                 </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION 3.5: ECOSYSTEM SYNC (NETWORK GRAPH VISUAL) --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row gap-20 items-center">
                <div class="flex-1 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm border border-indigo-200">
                        {{ __('calendar_sync_badge') }}
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                        {{ __('calendar_sync_title') }}
                    </h2>
                    <p class="text-gray-600 text-xl mb-12 leading-relaxed font-medium">
                        {{ __('calendar_sync_desc') }}
                    </p>
                    
                    <div class="space-y-8">
                        {{-- Node Item 1 --}}
                        <div class="flex gap-6 group">
                            <div class="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-xl shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">💰</div>
                            <div>
                                <h4 class="font-black text-gray-900 uppercase tracking-tighter mb-1">{{ __('calendar_node_finance_title') }}</h4>
                                <p class="text-gray-500 text-sm font-medium">{{ __('calendar_node_finance_desc') }}</p>
                            </div>
                        </div>
                        {{-- Node Item 2 --}}
                        <div class="flex gap-6 group">
                            <div class="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">💼</div>
                            <div>
                                <h4 class="font-black text-gray-900 uppercase tracking-tighter mb-1">{{ __('calendar_node_job_title') }}</h4>
                                <p class="text-gray-500 text-sm font-medium">{{ __('calendar_node_job_desc') }}</p>
                            </div>
                        </div>
                        {{-- Node Item 3 --}}
                        <div class="flex gap-6 group">
                            <div class="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-xl shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">📔</div>
                            <div>
                                <h4 class="font-black text-gray-900 uppercase tracking-tighter mb-1">{{ __('calendar_node_journal_title') }}</h4>
                                <p class="text-gray-500 text-sm font-medium">{{ __('calendar_node_journal_desc') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="flex-1 w-full relative h-[500px] flex items-center justify-center">
                    {{-- Central Calendar Node --}}
                    <div class="relative z-20 w-32 h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-[0_0_60px_rgba(79,70,229,0.4)] animate-pulse border-4 border-white transform hover:scale-110 transition duration-500 cursor-pointer">
                        🗓️
                    </div>
                    
                    {{-- Orbiting Nodes --}}
                    <div class="absolute inset-0 flex items-center justify-center">
                        {{-- Connection Lines (SVG) --}}
                        <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 500 500">
                            <line x1="250" y1="250" x2="100" y2="150" stroke="#4f46e5" stroke-width="2" stroke-dasharray="8 8" class="animate-[dash_20s_linear_infinite]" />
                            <line x1="250" y1="250" x2="400" y2="100" stroke="#4f46e5" stroke-width="2" stroke-dasharray="8 8" class="animate-[dash_20s_linear_infinite]" />
                            <line x1="250" y1="250" x2="400" y2="400" stroke="#4f46e5" stroke-width="2" stroke-dasharray="8 8" class="animate-[dash_20s_linear_infinite]" />
                            <line x1="250" y1="250" x2="100" y2="400" stroke="#4f46e5" stroke-width="2" stroke-dasharray="8 8" class="animate-[dash_20s_linear_infinite]" />
                        </svg>
                        
                        {{-- Node: Finance --}}
                        <div class="absolute top-[15%] left-[20%] w-20 h-20 bg-white rounded-[1.5rem] shadow-xl flex items-center justify-center text-3xl border border-emerald-50 transform hover:-translate-y-2 transition duration-500 group cursor-pointer shadow-emerald-100/50">
                            <div class="absolute -inset-2 bg-emerald-400/10 rounded-[2rem] -z-10 animate-ping opacity-20"></div>
                            💰
                        </div>
                        
                        {{-- Node: Job --}}
                        <div class="absolute top-[10%] right-[15%] w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-4xl border border-indigo-50 transform hover:scale-105 transition duration-500 group cursor-pointer shadow-indigo-100/50">
                            <div class="absolute -inset-2 bg-indigo-400/10 rounded-[2.5rem] -z-10 animate-pulse"></div>
                            💼
                        </div>
                        
                        {{-- Node: Journal --}}
                        <div class="absolute bottom-[10%] right-[15%] w-20 h-20 bg-white rounded-[1.5rem] shadow-xl flex items-center justify-center text-3xl border border-purple-50 transform hover:rotate-12 transition duration-500 group cursor-pointer shadow-purple-100/50">
                            <div class="absolute -inset-1 bg-purple-400/10 rounded-[2rem] -z-10"></div>
                            📔
                        </div>
                        
                        {{-- Node: Habits --}}
                        <div class="absolute bottom-[15%] left-[20%] w-20 h-20 bg-white rounded-[1.5rem] shadow-xl flex items-center justify-center text-3xl border border-amber-50 transform hover:-rotate-12 transition duration-500 group cursor-pointer shadow-amber-100/50">
                            🌱
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            @keyframes dash {
                to { stroke-dashoffset: -100; }
            }
        </style>
    </section>

    {{-- SECTION 4: THE PHILOSOPHY (QUOTE) --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center animate-in zoom-in-95 fade-in duration-1000">
            <div class="text-9xl text-indigo-50 mb-4 font-serif leading-none italic select-none">"</div>
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 leading-[1.4] mb-12 tracking-tight italic font-serif">
                {{ __('calendar_quote_text') }}
            </h2>
            <div class="flex flex-col items-center">
                <div class="w-24 h-2 bg-indigo-600 mb-8 rounded-full shadow-lg shadow-indigo-200"></div>
                <p class="text-indigo-600 font-black tracking-[0.5em] uppercase text-xs">{{ __('calendar_quote_author') }}</p>
            </div>
        </div>
    </section>


    {{-- NEW SECTION: SCIENTIFIC PILLAR (E-E-A-T) - 3D ORBITAL TIME STYLE --}}
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="flex flex-col lg:flex-row gap-20 items-center">
                
                {{-- 3D Orbital Visual --}}
                <div class="flex-1 w-full relative h-[450px] flex items-center justify-center">
                    <div class="absolute inset-0 bg-gradient-to-tr from-indigo-100/20 to-transparent rounded-full blur-3xl shadow-2xl"></div>
                    <div class="relative w-64 h-64 bg-white border border-indigo-100 rounded-full flex items-center justify-center shadow-[0_30px_60px_rgba(79,70,229,0.15)] group">
                        <span class="text-6xl group-hover:scale-125 transition duration-700">🧬</span>
                        {{-- Orbiting Rings --}}
                        <div class="absolute -inset-8 border-2 border-dashed border-indigo-200 rounded-full animate-spin-slow"></div>
                        <div class="absolute -inset-16 border border-dotted border-indigo-100 rounded-full animate-spin-slow-reverse"></div>
                        {{-- Floating Particles --}}
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-xl animate-bounce">01</div>
                        <div class="absolute bottom-1/4 -right-12 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-lg animate-pulse">02</div>
                    </div>
                </div>

                <div class="flex-1 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-8 border border-indigo-100 rounded-full">
                        🧩 {{ __('calendar_science_badge') }}
                    </div>
                    
                    <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-tight">
                        {{ __('calendar_science_title') }}
                    </h2>
                    
                    <div class="bg-indigo-50/50 border-l-8 border-indigo-500 p-10 rounded-r-[2rem] shadow-sm mb-12">
                        <p class="text-gray-700 text-2xl leading-relaxed italic font-medium">
                            {{ __('calendar_science_desc') }}
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-4">
                        <div class="px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition cursor-default">
                             <span class="text-[10px] font-black text-indigo-500 uppercase block mb-1">Architecture</span>
                             <span class="font-bold text-gray-900">Cognitive Load Theory</span>
                        </div>
                        <div class="px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition cursor-default">
                             <span class="text-[10px] font-black text-purple-500 uppercase block mb-1">Biological Sync</span>
                             <span class="font-bold text-gray-900">Circadian Rhythm</span>
                        </div>
                        <div class="px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition cursor-default">
                             <span class="text-[10px] font-black text-emerald-500 uppercase block mb-1">Execution System</span>
                             <span class="font-bold text-gray-900">Time Blocking</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

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
            <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-white text-slate-900 px-12 py-5 rounded-full font-black text-lg hover:bg-indigo-50 hover:scale-105 transition transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                {{ __('calendar_cta_btn') }}
            </a>
            <p class="mt-8 text-sm text-slate-400 font-medium">{{ __('calendar_cta_note') }}</p>
        </div>
    </section>

    {{-- SECTION 8: INTERNAL LINKING (UNIFIED ECOSYSTEM) - OCEANIC FLOW STYLE --}}
    <section class="py-32 bg-slate-950 relative overflow-hidden">
        {{-- Deep Sea Bubbles --}}
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-1/4 left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
            <div class="absolute bottom-1/4 right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <h2 class="text-3xl md:text-5xl font-black text-white mb-20 text-center tracking-tight">
                {{ __('unified_ecosystem_title', ['feature' => __('calendar_hero_badge')]) }}
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                {{-- Flow 1: Planner --}}
                <a href="{{ url('/features/planner') }}" class="group bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-500/20 transition duration-500 flex flex-col items-center text-center">
                    <div class="w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:rotate-12 transition">📅</div>
                    <h4 class="text-xl font-black text-white mb-4">{{ __('ecosystem_planner_title') }}</h4>
                    <p class="text-indigo-300 text-[10px] font-black uppercase tracking-widest">{{ __('planner_meta_title') }}</p>
                </a>

                {{-- Flow 2: Notes --}}
                <a href="{{ url('/solutions/second-brain') }}" class="group bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 hover:shadow-2xl hover:shadow-amber-500/20 transition duration-500 flex flex-col items-center text-center">
                    <div class="w-20 h-20 bg-amber-600 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition">📝</div>
                    <h4 class="text-xl font-black text-white mb-4">{{ __('ecosystem_notes_title') }}</h4>
                    <p class="text-amber-300 text-[10px] font-black uppercase tracking-widest">{{ __('notes_meta_title') }}</p>
                </a>

                {{-- Flow 3: Habit --}}
                <a href="{{ url('/features/habit') }}" class="group bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 hover:shadow-2xl hover:shadow-emerald-500/20 transition duration-500 flex flex-col items-center text-center">
                    <div class="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:-rotate-12 transition">🌱</div>
                    <h4 class="text-xl font-black text-white mb-4">{{ __('ecosystem_habit_title') }}</h4>
                    <p class="text-emerald-300 text-[10px] font-black uppercase tracking-widest">{{ __('habit_meta_title') }}</p>
                </a>

                {{-- Flow 4: Job Tracker --}}
                <a href="{{ url('/features/job') }}" class="group bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/20 transition duration-500 flex flex-col items-center text-center">
                    <div class="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition">💼</div>
                    <h4 class="text-xl font-black text-white mb-4">{{ __('ecosystem_job_title') }}</h4>
                    <p class="text-blue-300 text-[10px] font-black uppercase tracking-widest">{{ __('job_meta_title') }}</p>
                </a>
            </div>

            <div class="mt-20 flex justify-center">
                <div class="inline-flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                    <span class="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></span>
                    <span class="text-white text-xs font-black uppercase tracking-[0.3em]">Deep Synchronization Active</span>
                </div>
            </div>
        </div>
    </section>

@endsection
