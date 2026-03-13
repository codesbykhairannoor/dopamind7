@extends('layouts.marketing')

@section('title', __('habit_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('habit_meta_desc') }}">
    <meta property="og:title" content="{{ __('habit_meta_og_title') }}">
    <meta property="og:description" content="{{ __('habit_meta_og_desc') }}">
@endsection

@section('json-ld')
<script type="application/ld+json">
[
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{{ __('schema_habit_name') }}",
  "applicationCategory": "ProductivityApplication",
  "description": "{{ __('schema_habit_description') }}",
  "featureList": [
    "{{ __('schema_habit_feature_1') }}",
    "{{ __('schema_habit_feature_2') }}",
    "{{ __('schema_habit_feature_3') }}",
    "{{ __('schema_habit_feature_4') }}"
  ]
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
    "name": "{{ __('habit_hero_badge') }}",
    "item": "{{ url('/features/habit') }}"
  }]
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{ __('habit_faq_q1') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('habit_faq_a1') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('habit_faq_q2') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('habit_faq_a2') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('habit_faq_q3') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('habit_faq_a3') }}"
      }
    }
  ]
}
]
</script>
@endsection

@section('content')

   {{-- SECTION 1: HERO (CENTERED LAYOUT + FLOATING HABIT MOCKUP) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-gray-50 relative border-b border-gray-100">
        {{-- Background Glow --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>

        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    <span class="text-lg">🌱</span> {{ __('habit_hero_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('habit_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('habit_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                    {{ __('habit_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        {{ __('habit_hero_cta_1') }}
                    </a>
                    <a href="#how-it-works" class="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-full font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition">
                        {{ __('habit_hero_cta_2') }}
                    </a>
                </div>
            </div>

            {{-- Floating Mockup Centered --}}
            <div class="relative w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both" role="img" aria-label="Habit Tracker Mobile Interface Preview: Showing a clean daily check-list, current streak of 7 days, and automated progress alerts.">
                <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-20"></div>
                <div class="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-8 md:p-10 transform transition hover:scale-[1.02] duration-500">
                    
                    <div class="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                        <div class="text-left">
                            <h3 class="font-black text-gray-900 text-2xl mb-1">{{ __('habit_mockup_title') }} ☀️</h3>
                        </div>
                        <div class="bg-green-50 text-green-700 px-4 py-2 rounded-2xl border border-green-100 flex items-center gap-3">
                            <span class="text-2xl">🔥</span>
                            <div class="text-left">
                                <span class="text-[10px] font-bold uppercase block leading-none opacity-70 mb-0.5">{{ __('habit_mockup_streak_label') }}</span>
                                <span class="font-black text-lg leading-tight">{{ __('habit_mockup_streak') }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        {{-- Task 1 (Done) --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-2xl transition border border-gray-100 hover:border-indigo-100 cursor-pointer bg-gray-50/50">
                            <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm shadow-sm">✓</div>
                            <div class="flex-1 text-left opacity-60 line-through">
                                <p class="font-bold text-gray-900">{{ __('habit_mockup_task_1') }}</p>
                                <p class="text-sm text-gray-500">{{ __('habit_mockup_time_1') }}</p>
                            </div>
                        </div>
                        
                        {{-- Task 2 (Done) --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-2xl transition border border-gray-100 hover:border-indigo-100 cursor-pointer bg-gray-50/50">
                            <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm shadow-sm">✓</div>
                            <div class="flex-1 text-left opacity-60 line-through">
                                <p class="font-bold text-gray-900">{{ __('habit_mockup_task_2') }}</p>
                                <p class="text-sm text-gray-500">{{ __('habit_mockup_time_2') }}</p>
                            </div>
                        </div>

                        {{-- Task 3 (Active/Pending) --}}
                        <div class="flex items-center gap-4 p-4 bg-white rounded-2xl transition border-2 border-indigo-200 hover:border-indigo-400 cursor-pointer shadow-sm transform scale-[1.02]">
                            <div class="w-8 h-8 rounded-full border-2 border-indigo-300 flex items-center justify-center"></div>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-indigo-900">{{ __('habit_mockup_task_3') }}</p>
                                <p class="text-sm text-indigo-600">{{ __('habit_mockup_time_3') }}</p>
                            </div>
                            <div class="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-sm shadow-indigo-400"></div>
                        </div>
                    </div>

                    {{-- Floating Element (Level Up Badge) --}}
                    <div class="absolute -right-8 -bottom-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20 animate-bounce duration-[3000ms]">
                        <div class="flex items-center gap-3">
                            <div class="text-3xl">🏆</div>
                            <div class="text-left">
                                <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{{ __('habit_mockup_alert_1') }}</p>
                                <p class="font-black text-indigo-900 text-sm">{{ __('habit_mockup_alert_2') }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>
    
    {{-- NEW SECTION 2: THE CONSISTENCY GRID --}}
    <section class="py-24 bg-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col md:flex-row gap-16 items-center">
                <div class="flex-1 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                        {{ __('habit_heatmap_badge') }}
                    </div>
                    <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                        {{ __('habit_heatmap_title') }}
                    </h2>
                    <p class="text-gray-600 text-lg mb-8 leading-relaxed">
                        {{ __('habit_heatmap_desc') }}
                    </p>
                    <div class="flex items-center gap-6">
                        <div class="flex flex-col">
                            <span class="text-3xl font-black text-emerald-600">{{ __('habit_mockup_days') }}</span>
                            <span class="text-xs font-bold text-gray-400 uppercase">{{ __('habit_heatmap_label_1') }}</span>
                        </div>
                        <div class="w-px h-10 bg-gray-100"></div>
                        <div class="flex flex-col">
                            <span class="text-3xl font-black text-indigo-600">{{ __('habit_mockup_percent') }}</span>
                            <span class="text-xs font-bold text-gray-400 uppercase">{{ __('habit_heatmap_label_2') }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex-1 bg-gray-50 rounded-[3.5rem] p-8 md:p-12 border border-blue-50/50 shadow-inner relative group animate-in fade-in slide-in-from-right-8 duration-700 delay-200" role="img" aria-label="Habit Consistency Heatmap Preview: A grid visualization showing daily habit completion streaks over 14 weeks, similar to a GitHub contribution graph.">
                    {{-- Simulated Heatmap Grid --}}
                    <div class="grid grid-cols-10 sm:grid-cols-14 gap-2">
                        @for ($i = 0; $i < 98; $i++)
                            @php
                                $opacityArr = [20, 40, 60, 80, 100];
                                $opacity = $opacityArr[rand(0, 4)];
                                $color = $i % 8 == 0 ? 'bg-gray-200' : ($opacity > 60 ? 'bg-indigo-600' : 'bg-indigo-400');
                            @endphp
                            <div class="aspect-square rounded-sm {{ $color }} opacity-{{ $opacity }} hover:scale-150 transition cursor-default group/cell relative">
                                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[8px] rounded opacity-0 group-hover/cell:opacity-100 transition whitespace-nowrap z-20 pointer-events-none">
                                    {{ __('habit_heatmap_day') }} {{ $i+1 }}: {{ __('habit_heatmap_status') }}
                                </div>
                            </div>
                        @endfor
                    </div>
                    <div class="mt-8 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>{{ __('habit_heatmap_less') }}</span>
                        <div class="flex gap-1.5">
                            <div class="w-2.5 h-2.5 rounded-sm bg-gray-200"></div>
                            <div class="w-2.5 h-2.5 rounded-sm bg-indigo-200"></div>
                            <div class="w-2.5 h-2.5 rounded-sm bg-indigo-400"></div>
                            <div class="w-2.5 h-2.5 rounded-sm bg-indigo-600"></div>
                        </div>
                        <span>{{ __('habit_heatmap_more') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>


    {{-- NEW SECTION 3: STREAK MOMENTUM TIMELINE --}}
    <section class="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 blur-[120px] rounded-full"></div>
        
        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <span class="text-indigo-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{{ __('habit_streak_badge') }}</span>
                <h2 class="text-4xl md:text-5xl font-black mb-6">{{ __('habit_streak_title') }}</h2>
                <p class="text-indigo-100 text-lg opacity-80">{{ __('habit_streak_desc') }}</p>
            </div>

            <div class="relative mt-32">
                {{-- Vertical Line --}}
                <div class="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent -translate-x-1/2 opacity-30 hidden md:block"></div>
                
                <div class="space-y-40">
                    {{-- Level 1 --}}
                    <div class="flex flex-col md:flex-row items-center gap-12 md:gap-0 relative">
                        <div class="flex-1 md:text-right md:pr-16 animate-in slide-in-from-left-12 duration-700">
                            <h3 class="text-3xl font-black mb-4 text-indigo-400">{{ __('habit_level_1_title') }}</h3>
                            <p class="text-white/60 text-lg">{{ __('habit_level_1_desc') }}</p>
                        </div>
                        <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-600 border-4 border-slate-900 shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center justify-center text-3xl z-10 transform rotate-12 group hover:rotate-0 transition duration-500">🚀</div>
                        <div class="flex-1 md:pl-16 animate-in slide-in-from-right-12 duration-700">
                             <div class="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition duration-500">
                                <div class="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6">🔧</div>
                                <span class="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-2 block">{{ __('habit_bento_action_label') }}</span>
                                <p class="text-white text-lg">{{ __('habit_bento_action_desc') }}</p>
                             </div>
                        </div>
                    </div>

                    {{-- Level 2 --}}
                    <div class="flex flex-col md:flex-row items-center gap-12 md:gap-0 relative">
                         <div class="flex-1 order-2 md:order-1 md:text-right md:pr-16 animate-in slide-in-from-left-12 duration-700">
                             <div class="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition duration-500 text-left">
                                <div class="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">☯️</div>
                                <span class="text-xs font-bold text-purple-300 uppercase tracking-widest mb-2 block">{{ __('habit_level_2_shift_label') }}</span>
                                <p class="text-white text-lg">{{ __('habit_level_2_shift_desc') }}</p>
                             </div>
                        </div>
                        <div class="w-16 h-16 rounded-[1.5rem] bg-purple-600 border-4 border-slate-900 shadow-[0_0_30px_rgba(147,51,234,0.4)] flex items-center justify-center text-3xl z-10 -rotate-12 group hover:rotate-0 transition duration-500 order-1 md:order-2">⚡</div>
                        <div class="flex-1 order-3 md:pl-16 animate-in slide-in-from-right-12 duration-700">
                            <h3 class="text-3xl font-black mb-4 text-purple-400">{{ __('habit_level_2_title') }}</h3>
                            <p class="text-white/60 text-lg">{{ __('habit_level_2_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION 4: MOOD CORRELATION --}}
    <section class="py-24 bg-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
             <div class="relative animate-in zoom-in-95 duration-700">
                <div class="absolute -inset-4 bg-indigo-50 rounded-[4rem] -z-10 animate-pulse duration-[5000ms]"></div>
                <div class="grid grid-cols-2 gap-6 relative">
                    <div class="bg-yellow-50 p-8 rounded-[2.5rem] border border-yellow-100 flex flex-col items-center text-center shadow-sm transform hover:-translate-y-2 transition duration-500">
                        <span class="text-5xl mb-6">😊</span>
                        <span class="text-lg font-bold text-yellow-800">{{ __('habit_mood_stat_1_title') }}</span>
                        <span class="text-xs text-yellow-600/70 mt-2">{{ __('habit_mood_stat_1_desc') }}</span>
                    </div>
                    <div class="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 flex flex-col items-center text-center shadow-sm transform hover:-translate-y-2 transition duration-500 delay-100">
                        <span class="text-5xl mb-6">💤</span>
                        <span class="text-lg font-bold text-blue-800">{{ __('habit_mood_stat_2_title') }}</span>
                        <span class="text-xs text-blue-600/70 mt-2">{{ __('habit_mood_stat_2_desc') }}</span>
                    </div>
                    <div class="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100 flex flex-col items-center text-center col-span-2 shadow-sm">
                        <div class="w-full flex justify-between items-center mb-6">
                             <div class="text-left">
                                <span class="text-2xl font-black text-indigo-900 leading-tight block">{{ __('habit_mood_correlation_title') }}</span>
                                <span class="text-xs text-indigo-600 uppercase font-black tracking-widest mt-1">{{ __('habit_mood_correlation_badge') }}</span>
                             </div>
                             <span class="text-xl font-black bg-white text-indigo-600 px-4 py-2 rounded-2xl shadow-sm">+24%</span>
                        </div>
                        <div class="w-full h-3 bg-indigo-200 rounded-full overflow-hidden mb-6">
                            <div class="w-[85%] h-full bg-indigo-600 animate-in slide-in-from-left duration-1000 delay-500 fill-mode-both"></div>
                        </div>
                        <p class="text-sm text-indigo-800/80 font-medium italic">"{{ __('habit_mood_insight') }}"</p>
                    </div>
                </div>
             </div>
             <div class="animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
                <div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm">🧠</div>
                <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">{{ __('habit_mood_title') }}</h2>
                <p class="text-gray-600 text-xl mb-10 leading-relaxed">
                    {{ __('habit_mood_desc') }}
                </p>
                <div class="flex flex-col gap-6">
                    <div class="flex items-center gap-4">
                        <div class="flex -space-x-3">
                            @for($i=1; $i<=5; $i++)
                                <div class="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-sm shadow-sm">👤</div>
                            @endfor
                        </div>
                        <p class="text-gray-500 font-bold text-sm">{{ __('habit_mood_social_proof') }}</p>
                    </div>
                </div>
             </div>
        </div>
    </section>

  {{-- NEW SECTION 3.5: IDENTITY BRIDGE (STACKED CARDS) --}}
<section class="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            {{-- Left Side: Copywriting --}}
            <div class="flex-1 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-700">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 lg:mb-8 shadow-sm border border-orange-200">
                    {{ __('habit_identity_badge') }}
                </div>
                <h2 class="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 lg:mb-8 leading-tight tracking-tight">
                    {{ __('habit_identity_title') }}
                </h2>
                <p class="text-gray-600 text-lg lg:text-xl leading-relaxed font-medium mb-10 lg:mb-12">
                    {{ __('habit_identity_desc') }}
                </p>
                
                {{-- Side Cards List --}}
                <div class="grid gap-4 lg:gap-6 text-left">
                    <div class="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 lg:gap-6 items-center group hover:bg-orange-600 transition duration-500 hover:shadow-xl hover:scale-[1.02] lg:hover:scale-105">
                        <div class="w-12 h-12 bg-orange-50 rounded-xl flex-shrink-0 flex items-center justify-center text-xl group-hover:bg-white/20 group-hover:text-white transition">🏠</div>
                        <div>
                            <h4 class="font-black text-gray-900 group-hover:text-white transition text-sm lg:text-base">{{ __('habit_card_1_title') }}</h4>
                            <p class="text-gray-500 text-xs lg:text-sm font-medium group-hover:text-orange-100 transition">{{ __('habit_card_1_desc') }}</p>
                        </div>
                    </div>
                    <div class="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 lg:gap-6 items-center group hover:bg-orange-600 transition duration-500 hover:shadow-xl hover:scale-[1.02] lg:hover:scale-105">
                        <div class="w-12 h-12 bg-orange-50 rounded-xl flex-shrink-0 flex items-center justify-center text-xl group-hover:bg-white/20 group-hover:text-white transition">⏱️</div>
                        <div>
                            <h4 class="font-black text-gray-900 group-hover:text-white transition text-sm lg:text-base">{{ __('habit_card_2_title') }}</h4>
                            <p class="text-gray-500 text-xs lg:text-sm font-medium group-hover:text-orange-100 transition">{{ __('habit_card_2_desc') }}</p>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Right Side: Visual Stack --}}
            <div class="flex-1 relative w-full h-[350px] lg:h-[500px] mt-10 lg:mt-0">
                <div class="absolute inset-0 flex items-center justify-center">
                    
                    {{-- Card 3 (Bottom) --}}
                    <div class="absolute w-[85%] lg:w-[80%] h-56 lg:h-64 bg-white rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl border border-gray-100 transform rotate-[-4deg] lg:rotate-[-6deg] translate-y-12 lg:translate-y-20 opacity-40 blur-[2px] lg:blur-sm"></div>
                    
                    {{-- Card 2 (Middle) --}}
                    <div class="absolute w-[90%] lg:w-[85%] h-56 lg:h-64 bg-white rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl border border-gray-100 transform rotate-[-2deg] lg:rotate-[-3deg] translate-y-6 lg:translate-y-10 opacity-70"></div>
                    
                    {{-- Card 1 (Top) --}}
                    <div class="absolute w-full lg:w-[90%] h-56 lg:h-64 bg-white rounded-[2.5rem] lg:rounded-[3.5rem] shadow-[0_20px_50px_rgba(249,115,22,0.12)] lg:shadow-[0_30px_60px_rgba(249,115,22,0.15)] border border-orange-100 flex flex-col items-center justify-center p-8 lg:p-12 text-center group hover:-translate-y-2 lg:hover:-translate-y-4 transition duration-700 z-10">
                        <div class="w-16 h-16 lg:w-20 lg:h-20 bg-orange-500 rounded-2xl lg:rounded-3xl flex items-center justify-center text-3xl lg:text-4xl text-white mb-4 lg:mb-6 shadow-xl shadow-orange-200 group-hover:rotate-12 transition duration-500">
                            ⭐
                        </div>
                        <h3 class="text-xl lg:text-2xl font-black text-gray-900 mb-2">{{ __('habit_card_3_title') }}</h3>
                        <p class="text-gray-500 text-sm lg:text-base font-medium leading-relaxed">{{ __('habit_card_3_desc') }}</p>
                        
                        {{-- Sparkle Decorations --}}
                        <div class="absolute top-6 right-6 lg:top-8 lg:right-8 text-orange-400 animate-pulse text-lg">✨</div>
                        <div class="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 text-orange-400 animate-pulse delay-700 text-lg">✨</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

    <section class="py-32 bg-gray-50 border-y border-gray-100">
        <div class="max-w-4xl mx-auto px-6 text-center animate-in zoom-in-95 fade-in duration-700">
            <div class="text-9xl text-indigo-50 mb-4 font-serif leading-none italic select-none">"</div>
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 leading-[1.4] mb-12 tracking-tight italic font-serif">
                {{ __('habit_quote_text') }}
            </h2>
            <div class="flex flex-col items-center">
                <div class="w-24 h-2 bg-indigo-600 mb-8 rounded-full shadow-lg shadow-indigo-200"></div>
                <p class="text-indigo-600 font-black tracking-[0.5em] uppercase text-xs">{{ __('habit_quote_author') }}</p>
            </div>
        </div>
    </section>

    {{-- NEW SECTION: SCIENTIFIC PILLAR (E-E-A-T) - ATOMIC PROGRESS STYLE --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="flex flex-col items-center">
                {{-- Atomic Connector Visualization --}}
                <div class="flex items-center justify-center mb-16 relative">
                    <div class="w-24 h-24 rounded-full bg-indigo-600/10 flex items-center justify-center animate-pulse">
                        <div class="w-16 h-16 rounded-full bg-indigo-600/20 flex items-center justify-center">
                            <div class="w-8 h-8 rounded-full bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.6)]"></div>
                        </div>
                    </div>
                    {{-- Floating Atoms --}}
                    <div class="absolute -top-6 -left-12 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 animate-bounce duration-[3000ms]"></div>
                    <div class="absolute -bottom-8 -right-10 w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 animate-bounce duration-[4000ms]"></div>
                </div>

                <div class="max-w-4xl w-full bg-white border-l-8 border-indigo-500 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] p-12 md:p-20 rounded-r-[3rem] relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-[10rem] -z-10 opacity-50"></div>
                    
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-8">
                        🧬 {{ __('habit_science_badge') }}
                    </div>
                    
                    <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                        {{ __('habit_science_title') }}
                    </h2>
                    
                    <p class="text-gray-600 text-xl leading-relaxed mb-12 italic font-medium opacity-80 border-b border-gray-100 pb-12">
                        {{ __('habit_science_desc') }}
                    </p>
                    
                    <div class="flex flex-wrap items-center gap-4">
                        <span class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-full mb-2">Verified Methods:</span>
                        <div class="px-6 py-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-black text-xs shadow-sm hover:scale-110 transition">James Clear</div>
                        <div class="px-6 py-3 rounded-full bg-purple-50 border border-purple-100 text-purple-700 font-black text-xs shadow-sm hover:scale-110 transition">BJ Fogg</div>
                        <div class="px-6 py-3 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-black text-xs shadow-sm hover:scale-110 transition">Charles Duhigg</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-24 px-6 text-center">
        <div class="max-w-5xl mx-auto bg-indigo-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse duration-[5000ms]"></div>
            
            <div class="relative z-10">
                <h2 class="text-4xl md:text-5xl font-black mb-6">{{ __('habit_cta_title') }}</h2>
                <p class="text-indigo-200 text-lg mb-10 max-w-2xl mx-auto">
                    {{ __('habit_cta_desc') }}
                </p>
                <a hx-boost="false" href="{{ route('register') }}" class="inline-block bg-white text-indigo-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-50 hover:scale-105 transition transform shadow-xl">
                    {{ __('habit_cta_btn') }}
                </a>
                <p class="mt-6 text-sm text-indigo-300">{{ __('habit_cta_note') }}</p>
            </div>
        </div>
    </section>

    {{-- SECTION 8: INTERNAL LINKING (UNIFIED ECOSYSTEM) - IDENTITY CHAIN STYLE --}}
    <section class="py-32 bg-slate-900 relative overflow-hidden">
        {{-- Animated Background Particles --}}
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-10 left-10 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
            <div class="absolute bottom-20 right-20 w-3 h-3 bg-purple-500 rounded-full animate-ping delay-700"></div>
            <div class="absolute top-1/2 left-1/4 w-1 h-1 bg-emerald-500 rounded-full animate-ping delay-300"></div>
        </div>
        
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <h2 class="text-3xl md:text-5xl font-black text-white mb-20 text-center tracking-tight">
                {{ __('unified_ecosystem_title', ['feature' => __('habit_hero_badge')]) }}
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                {{-- Link 1: Journal --}}
                <a href="{{ url('/features/journal') }}" class="group relative p-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] hover:from-indigo-500/40 hover:to-purple-500/40 transition duration-500">
                    <div class="bg-slate-800 p-8 rounded-[2.4rem] h-full flex flex-col items-center text-center">
                        <div class="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">📔</div>
                        <h4 class="font-black text-white text-lg mb-2">{{ __('ecosystem_journal_title') }}</h4>
                        <p class="text-slate-400 text-xs leading-relaxed uppercase tracking-widest font-bold">Reflection Hub</p>
                    </div>
                    <div class="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block text-slate-700 text-2xl font-black">──</div>
                </a>

                {{-- Link 2: Planner --}}
                <a href="{{ url('/features/planner') }}" class="group relative p-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-[2.5rem] hover:from-purple-500/40 hover:to-pink-500/40 transition duration-500">
                    <div class="bg-slate-800 p-8 rounded-[2.4rem] h-full flex flex-col items-center text-center">
                        <div class="w-16 h-16 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">📅</div>
                        <h4 class="font-black text-white text-lg mb-2">{{ __('ecosystem_planner_title') }}</h4>
                        <p class="text-slate-400 text-xs leading-relaxed uppercase tracking-widest font-bold">Execution Layer</p>
                    </div>
                    <div class="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block text-slate-700 text-2xl font-black">──</div>
                </a>

                {{-- Link 3: Goal --}}
                <a href="{{ url('/features/goal') }}" class="group relative p-1 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-[2.5rem] hover:from-pink-500/40 hover:to-orange-500/40 transition duration-500">
                    <div class="bg-slate-800 p-8 rounded-[2.4rem] h-full flex flex-col items-center text-center">
                        <div class="w-16 h-16 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">🎯</div>
                        <h4 class="font-black text-white text-lg mb-2">{{ __('ecosystem_goal_title') }}</h4>
                        <p class="text-slate-400 text-xs leading-relaxed uppercase tracking-widest font-bold">Vision Target</p>
                    </div>
                    <div class="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block text-slate-700 text-2xl font-black">──</div>
                </a>

                {{-- Link 4: Notes --}}
                <a href="{{ url('/solutions/second-brain') }}" class="group relative p-1 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-[2.5rem] hover:from-orange-500/40 hover:to-yellow-500/40 transition duration-500">
                    <div class="bg-slate-800 p-8 rounded-[2.4rem] h-full flex flex-col items-center text-center">
                        <div class="w-16 h-16 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">📝</div>
                        <h4 class="font-black text-white text-lg mb-2">{{ __('ecosystem_notes_title') }}</h4>
                        <p class="text-slate-400 text-xs leading-relaxed uppercase tracking-widest font-bold">Knowledge Base</p>
                    </div>
                </a>
            </div>
            
            <p class="text-center mt-16 text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                {{ __('ecosystem_synergy_footer') }}
            </p>
        </div>
    </section>

@endsection
