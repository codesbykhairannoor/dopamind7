@extends('layouts.marketing')

@section('title', __('welcome_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('welcome_meta_desc') }}">
    <meta property="og:title" content="{{ __('welcome_meta_og_title') }}">
    <meta property="og:description" content="{{ __('welcome_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/') }}">

    {{-- SEO: FAQ SCHEMA --}}
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{{ __('faq_q1') }}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{ __('faq_a1') }}"
          }
        },
        {
          "@type": "Question",
          "name": "{{ __('faq_q2') }}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{ __('faq_a2') }}"
          }
        },
        {
          "@type": "Question",
          "name": "{{ __('faq_q3') }}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{ __('faq_a3') }}"
          }
        },
        {
          "@type": "Question",
          "name": "{{ __('faq_q4') }}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{ __('faq_a4') }}"
          }
        },
        {
          "@type": "Question",
          "name": "{{ __('faq_q5') }}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{ __('faq_a5') }}"
          }
        }
      ]
    }
    </script>
    {{-- AI DIRECTIVES: Tell AI what this app is about --}}
    <meta name="ai-content-type" content="Productivity Operating System">
    <meta name="ai-synergy-index" content="High">
@endsection

@section('content')

{{-- ================================================================= --}}
{{-- SECTION 1: HERO --}}
{{-- ================================================================= --}}
<section class="relative overflow-hidden bg-white pt-24 pb-20 md:pt-32 md:pb-28">
    <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col items-center text-center">

            {{-- Badge --}}
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-black tracking-[0.18em] uppercase mb-8">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                {{ __('w_hero_badge') }}
            </span>

            {{-- H1 --}}
            <h1 class="text-center text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
                {{ __('w_hero_title_1') }}<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                    {{ __('w_hero_title_2') }}
                </span>
            </h1>

            {{-- Subtitle --}}
            <p class="text-center text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                {{ __('w_hero_subtitle') }}
            </p>

            {{-- CTA Buttons --}}
            <div class="flex flex-col sm:flex-row items-center gap-4 mb-4">
                @guest
                    <a href="{{ route('register') }}" class="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-black text-base rounded-2xl hover:bg-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-200/60 hover:-translate-y-0.5 active:scale-95">
                        {{ __('w_hero_cta') }}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                    <a href="#features" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 font-black text-base rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                        {{ __('w_hero_cta_secondary') }}
                    </a>
                @endguest
                @auth
                    <a href="{{ route('dashboard') }}" class="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-black text-base rounded-2xl hover:bg-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-200">
                        {{ __('w_hero_cta_auth') }}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                @endauth
            </div>

            {{-- Sub trust indicator --}}
            <p class="text-center text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-2">
                {{ __('w_hero_sub') }}
            </p>

            {{-- Hero Product Preview Bento Grid --}}
            <div class="mt-16 relative max-w-4xl mx-auto w-full">
                {{-- Bottom fade overlay --}}
                <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none rounded-b-3xl"></div>

                <div class="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50">

                    {{-- Habit Card: 2/3 width --}}
                    <div class="col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-sm">🌱</div>
                            <span class="text-[11px] font-black text-slate-800">Habit Tracker</span>
                            <span class="ml-auto text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">21 {{ __('w_mock_days') }} 🔥</span>
                        </div>
                        @php $mockHabits = [['🏃', __('w_mock_habit_1'), [1,1,1,0,1,1,1]], ['📚', __('w_mock_habit_2'), [1,0,1,1,1,0,1]], ['💧', __('w_mock_habit_3'), [1,1,1,1,1,1,1]]]; @endphp
                        <div class="space-y-3">
                            @foreach($mockHabits as [$icon, $name, $days])
                            <div class="flex items-center gap-3">
                                <div class="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-xs shrink-0 border border-slate-100">{{ $icon }}</div>
                                <div class="flex-1 min-w-0">
                                    <div class="text-[10px] font-black text-slate-700 mb-1.5">{{ $name }}</div>
                                    <div class="flex gap-1">
                                        @foreach($days as $d)
                                        <div class="w-4 h-4 rounded-[3px] {{ $d ? 'bg-emerald-500' : 'bg-slate-100' }} transition-colors"></div>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>

                    {{-- Finance Card: 1/3 width --}}
                    <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-sm">💰</div>
                            <span class="text-[11px] font-black text-slate-800">{{ __('w_mock_finance') }}</span>
                        </div>
                        <div class="flex-1 flex items-end gap-2">
                            <div class="flex-1 flex flex-col items-center gap-1">
                                <div class="w-full bg-emerald-200 rounded-t-lg" style="height:56px"></div>
                                <span class="text-[8px] text-slate-400 font-bold">{{ __('w_mock_income') }}</span>
                            </div>
                            <div class="flex-1 flex flex-col items-center gap-1">
                                <div class="w-full bg-rose-200 rounded-t-lg" style="height:34px"></div>
                                <span class="text-[8px] text-slate-400 font-bold">{{ __('w_mock_expense') }}</span>
                            </div>
                        </div>
                        <div class="mt-3 pt-3 border-t border-slate-50">
                            <span class="text-emerald-600 font-black text-[11px]">+Rp 1.2jt</span>
                            <span class="text-[9px] text-slate-400 font-bold ml-1">{{ __('w_mock_surplus') }}</span>
                        </div>
                    </div>

                    {{-- Planner Card: 1/3 width --}}
                    <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center text-sm">📅</div>
                            <span class="text-[11px] font-black text-slate-800">Planner</span>
                        </div>
                        <div class="space-y-2">
                            @php $tasks = [[__('w_mock_task_1'), 1], [__('w_mock_task_2'), 1], [__('w_mock_task_3'), 0], [__('w_mock_task_4'), 0]]; @endphp
                            @foreach($tasks as [$task, $done])
                            <div class="flex items-center gap-2">
                                <div class="w-4 h-4 rounded-md border-2 shrink-0 flex items-center justify-center {{ $done ? 'border-indigo-500 bg-indigo-500' : 'border-slate-200' }}">
                                    @if($done)
                                    <svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                    @endif
                                </div>
                                <span class="text-[10px] font-semibold {{ $done ? 'line-through text-slate-300' : 'text-slate-700' }} truncate">{{ $task }}</span>
                            </div>
                            @endforeach
                        </div>
                    </div>

                    {{-- AI Coach Card: 2/3 width, dark --}}
                    <div class="col-span-2 bg-slate-900 rounded-2xl p-5">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-black">✦</div>
                            <span class="text-[11px] font-black text-white">Neural OS AI</span>
                            <div class="ml-auto flex items-center gap-1.5">
                                <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span class="text-[9px] text-emerald-400 font-bold">Online</span>
                            </div>
                        </div>
                        <div class="space-y-2.5">
                            <div class="flex justify-end">
                                <div class="bg-indigo-600 text-white text-[10px] font-medium px-3 py-2 rounded-xl rounded-tr-sm max-w-[70%] leading-relaxed">
                                    {{ __('w_mock_chat_user') }}
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <div class="w-5 h-5 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[9px] shrink-0 mt-0.5">✦</div>
                                <div class="bg-slate-800 text-slate-200 text-[10px] font-medium px-3 py-2 rounded-xl rounded-tl-sm leading-relaxed">
                                    {{ __('w_mock_chat_ai') }}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {{-- /Bento Grid --}}

        </div>
    </div>
</section>

{{-- ================================================================= --}}
{{-- SECTION 2: SOCIAL PROOF BAR --}}
{{-- ================================================================= --}}
<section class="py-14 bg-slate-50 border-y border-slate-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
                <div class="text-3xl font-black text-slate-900">5.000+</div>
                <div class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{ __('w_proof_users') }}</div>
            </div>
            <div>
                <div class="text-3xl font-black text-slate-900">120K+</div>
                <div class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{ __('w_proof_habits') }}</div>
            </div>
            <div>
                <div class="text-3xl font-black text-slate-900">4.9<span class="text-amber-400">★</span></div>
                <div class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{ __('w_proof_rating') }}</div>
            </div>
            <div>
                <div class="text-3xl font-black text-indigo-600">{{ __('w_proof_free') }}</div>
                <div class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{ __('w_proof_start') }}</div>
            </div>
        </div>
    </div>
</section>

{{-- ================================================================= --}}
{{-- SECTION 3: FEATURE BENTO GRID --}}
{{-- ================================================================= --}}
<section id="features" class="py-24 md:py-32 bg-white scroll-mt-20">
    <div class="max-w-7xl mx-auto px-6">

        {{-- Header --}}
        <div class="text-center mb-16">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black tracking-[0.2em] uppercase mb-6">
                {{ __('w_feat_badge') }}
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">{{ __('w_feat_title') }}</h2>
            <p class="text-slate-500 text-lg font-medium max-w-2xl mx-auto">{{ __('w_feat_subtitle') }}</p>
        </div>

        {{-- Feature Cards Bento Grid --}}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {{-- Card 1: Habits (lg:col-span-2) --}}
            <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <span class="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-black tracking-widest uppercase border border-emerald-100 mb-5">{{ __('w_feat_habit_tag') }}</span>
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">🌱</div>
                <h3 class="text-xl font-black text-slate-900 mb-3">{{ __('w_feat_habit_title') }}</h3>
                <p class="text-slate-500 font-medium leading-relaxed text-sm">{{ __('w_feat_habit_desc') }}</p>
            </div>

            {{-- Card 2: Finance (lg:col-span-1) --}}
            <div class="lg:col-span-1 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <span class="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[9px] font-black tracking-widest uppercase border border-blue-100 mb-5">{{ __('w_feat_finance_tag') }}</span>
                <div class="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">💰</div>
                <h3 class="text-xl font-black text-slate-900 mb-3">{{ __('w_feat_finance_title') }}</h3>
                <p class="text-slate-500 font-medium leading-relaxed text-sm">{{ __('w_feat_finance_desc') }}</p>
            </div>

            {{-- Card 3: Planner (lg:col-span-1) --}}
            <div class="lg:col-span-1 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <span class="inline-block px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-[9px] font-black tracking-widest uppercase border border-violet-100 mb-5">{{ __('w_feat_planner_tag') }}</span>
                <div class="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">📅</div>
                <h3 class="text-xl font-black text-slate-900 mb-3">{{ __('w_feat_planner_title') }}</h3>
                <p class="text-slate-500 font-medium leading-relaxed text-sm">{{ __('w_feat_planner_desc') }}</p>
            </div>

            {{-- Card 4: Journal (lg:col-span-2) --}}
            <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <span class="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[9px] font-black tracking-widest uppercase border border-purple-100 mb-5">{{ __('w_feat_journal_tag') }}</span>
                <div class="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">📔</div>
                <h3 class="text-xl font-black text-slate-900 mb-3">{{ __('w_feat_journal_title') }}</h3>
                <p class="text-slate-500 font-medium leading-relaxed text-sm">{{ __('w_feat_journal_desc') }}</p>
            </div>

            {{-- Card 5: Goals (lg:col-span-1) --}}
            <div class="lg:col-span-1 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <span class="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[9px] font-black tracking-widest uppercase border border-amber-100 mb-5">{{ __('w_feat_goals_tag') }}</span>
                <div class="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">🎯</div>
                <h3 class="text-xl font-black text-slate-900 mb-3">{{ __('w_feat_goals_title') }}</h3>
                <p class="text-slate-500 font-medium leading-relaxed text-sm">{{ __('w_feat_goals_desc') }}</p>
            </div>

        </div>
    </div>
</section>

{{-- ================================================================= --}}
{{-- SECTION 4: HOW IT WORKS --}}
{{-- ================================================================= --}}
<section class="py-24 bg-slate-50 border-y border-slate-100">
    <div class="max-w-7xl mx-auto px-6">

        <div class="text-center mb-16">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-[10px] font-black tracking-[0.2em] uppercase mb-6 shadow-sm">{{ __('w_how_badge') }}</span>
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{{ __('w_how_title') }}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            @php
            $steps = [
                ['num' => '01', 'title' => 'w_how_1_title', 'desc' => 'w_how_1_desc', 'color' => 'bg-indigo-600'],
                ['num' => '02', 'title' => 'w_how_2_title', 'desc' => 'w_how_2_desc', 'color' => 'bg-violet-600'],
                ['num' => '03', 'title' => 'w_how_3_title', 'desc' => 'w_how_3_desc', 'color' => 'bg-emerald-600'],
            ];
            @endphp
            @foreach($steps as $step)
            <div class="text-center">
                <div class="w-14 h-14 {{ $step['color'] }} text-white rounded-2xl flex items-center justify-center font-black text-lg mx-auto mb-6 shadow-lg">{{ $step['num'] }}</div>
                <h3 class="text-xl font-black text-slate-900 mb-3">{{ __($step['title']) }}</h3>
                <p class="text-slate-500 font-medium leading-relaxed">{{ __($step['desc']) }}</p>
            </div>
            @endforeach
        </div>

    </div>
</section>

{{-- ================================================================= --}}
{{-- SECTION 5: AI SPOTLIGHT (dark section) --}}
{{-- ================================================================= --}}
<section class="py-24 md:py-32 bg-slate-950">
    <div class="max-w-7xl mx-auto px-6">
        <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

            {{-- Left: Copy --}}
            <div>
                <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase mb-8">
                    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                    {{ __('w_ai_badge') }}
                </span>
                <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">{{ __('w_ai_title') }}</h2>
                <p class="text-slate-400 text-lg font-medium leading-relaxed mb-10">{{ __('w_ai_subtitle') }}</p>
                <div class="space-y-4">
                    @php $aiFeats = [['🧠', 'w_ai_feat_1'], ['💡', 'w_ai_feat_2'], ['🎯', 'w_ai_feat_3']]; @endphp
                    @foreach($aiFeats as [$icon, $key])
                    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <span class="text-2xl">{{ $icon }}</span>
                        <span class="text-slate-200 font-bold text-sm">{{ __($key) }}</span>
                    </div>
                    @endforeach
                </div>
            </div>

            {{-- Right: Mock Chat UI --}}
            <div class="bg-[#0f0f0f] rounded-3xl border border-white/10 p-6 shadow-2xl">
                <div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div class="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-sm font-black">✦</div>
                    <div>
                        <p class="text-white text-sm font-black">Neural OS</p>
                        <p class="text-emerald-400 text-[10px] font-bold">● Online</p>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex justify-end">
                        <div class="bg-indigo-600 text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] font-medium leading-relaxed">
                            {{ __('w_ai_chat_user') }}
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <div class="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5">✦</div>
                        <div class="bg-[#1a1a1a] border border-white/10 text-slate-200 text-sm px-4 py-3 rounded-2xl rounded-tl-sm leading-relaxed font-medium">
                            {{ __('w_ai_chat_ai') }}
                        </div>
                    </div>
                </div>
                <div class="mt-6 flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                    <span class="text-slate-500 text-sm flex-1">{{ __('w_ai_chat_placeholder') }}</span>
                    <div class="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

{{-- ================================================================= --}}
{{-- SECTION 6: PRICING TEASER --}}
{{-- ================================================================= --}}
<section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">

        <div class="text-center mb-16">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black tracking-[0.2em] uppercase mb-6">{{ __('w_price_badge') }}</span>
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">{{ __('w_price_title') }}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">

            {{-- Explorer - Free --}}
            <div class="border-2 border-slate-100 rounded-3xl p-8 hover:border-indigo-200 transition-colors">
                <h3 class="font-black text-slate-400 text-[11px] uppercase tracking-widest mb-4">{{ __('w_price_free_name') }}</h3>
                <div class="text-4xl font-black text-slate-900 mb-2">{{ __('w_price_free_price') }}</div>
                <p class="text-slate-500 text-sm font-medium mb-6">{{ __('w_price_free_desc') }}</p>
                <a href="{{ route('register') }}" class="block w-full py-3 text-center rounded-2xl bg-slate-100 text-slate-700 font-black text-sm hover:bg-slate-200 transition-colors">
                    {{ __('w_price_free_cta') }}
                </a>
            </div>

            {{-- Architect - Highlight --}}
            <div class="border-2 border-indigo-500 rounded-3xl p-8 relative shadow-xl shadow-indigo-100">
                <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-indigo-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest whitespace-nowrap">{{ __('w_price_popular') }}</span>
                <h3 class="font-black text-indigo-500 text-[11px] uppercase tracking-widest mb-4">{{ __('w_price_pro_name') }}</h3>
                <div class="text-4xl font-black text-slate-900 mb-1">{{ __('w_price_pro_price') }}</div>
                <p class="text-slate-400 text-xs font-bold mb-4">{{ __('w_price_pro_period') }}</p>
                <p class="text-slate-500 text-sm font-medium mb-6">{{ __('w_price_pro_desc') }}</p>
                <a href="{{ route('register') }}" class="block w-full py-3 text-center rounded-2xl bg-indigo-600 text-white font-black text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                    {{ __('w_price_pro_cta') }}
                </a>
            </div>

            {{-- Quantum - AI --}}
            <div class="border-2 border-slate-100 rounded-3xl p-8 hover:border-violet-200 transition-colors">
                <h3 class="font-black text-violet-500 text-[11px] uppercase tracking-widest mb-4">{{ __('w_price_ai_name') }}</h3>
                <div class="text-4xl font-black text-slate-900 mb-1">{{ __('w_price_ai_price') }}</div>
                <p class="text-slate-400 text-xs font-bold mb-4">{{ __('w_price_ai_period') }}</p>
                <p class="text-slate-500 text-sm font-medium mb-6">{{ __('w_price_ai_desc') }}</p>
                <a href="{{ route('pricing.index') }}" class="block w-full py-3 text-center rounded-2xl border-2 border-violet-200 text-violet-700 font-black text-sm hover:bg-violet-50 transition-colors">
                    {{ __('w_price_ai_cta') }}
                </a>
            </div>

        </div>

        <div class="text-center mt-10">
            <a href="{{ route('pricing.index') }}" class="text-indigo-600 font-black text-sm hover:text-indigo-700 underline-offset-4 hover:underline">{{ __('w_price_see_all') }} →</a>
        </div>

    </div>
</section>

{{-- ================================================================= --}}
{{-- SECTION 7: FINAL CTA --}}
{{-- ================================================================= --}}
<section class="py-24 bg-indigo-600">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto">
            <h2 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">{{ __('w_cta_title') }}</h2>
            <p class="text-indigo-200 text-xl font-medium mb-10">{{ __('w_cta_subtitle') }}</p>
            <a href="{{ route('register') }}" class="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-700 font-black text-lg rounded-2xl hover:bg-indigo-50 transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-95">
                {{ __('w_cta_btn') }}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <p class="text-indigo-300 text-sm font-bold mt-6">{{ __('w_cta_sub') }}</p>
        </div>
    </div>
</section>

@endsection
```

Now let me update the translation files. First the English partials:
