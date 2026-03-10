@extends('layouts.marketing')

@section('title', __('plan_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('plan_meta_desc') }}">
    <meta property="og:title" content="{{ __('plan_meta_og_title') }}">
    <meta property="og:description" content="{{ __('plan_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/compare/planner-apps') }}">
@endsection

@section('content')

    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO (THE CONTEXT REVOLUTION) --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 relative border-b border-gray-100">
        {{-- Background Blobs --}}
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-200/30 to-indigo-200/30 rounded-full blur-[100px] -z-10 animate-pulse duration-[8000ms]"></div>
        
        <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {{-- Left: Copywriting --}}
            <div class="lg:col-span-6 animate-in fade-in slide-in-from-left-12 duration-1000 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-blue-200">
                    🎯 {{ __('plan_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('plan_hero_title_1') }}<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{{ __('plan_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-lg">
                    {!! __('plan_hero_desc') !!}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    {{-- BUTTON TETAP INDIGO SESUAI BRANDING --}}
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1 text-center">
                        {{ __('plan_hero_cta') }} →
                    </a>
                    <p class="py-4 text-sm text-gray-400 font-bold self-center">{{ __('plan_hero_note') }}</p>
                </div>
            </div>

            {{-- Right: Visual Metaphor (Infinite List vs Strategic Vision) --}}
            <div class="lg:col-span-6 relative h-[500px] flex items-center justify-center animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 fill-mode-both">
                
                {{-- Element 1: The "To-Do List Cage" (Competitors) --}}
                <div class="absolute top-10 right-0 w-64 bg-gray-900 border-4 border-gray-800 rounded-xl p-6 transform rotate-12 opacity-80 shadow-2xl z-0 font-mono">
                    <div class="text-center text-red-500 text-[10px] mb-2 animate-pulse">🔴 45 OVERDUE TASKS</div>
                    <div class="space-y-3">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 border border-gray-700 rounded-sm"></div>
                            <div class="h-1.5 bg-gray-700 rounded w-full"></div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 border border-gray-700 rounded-sm"></div>
                            <div class="h-1.5 bg-gray-700 rounded w-[70%]"></div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 border border-gray-700 rounded-sm"></div>
                            <div class="h-1.5 bg-gray-700 rounded w-[90%]"></div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 border border-gray-700 rounded-sm"></div>
                            <div class="h-1.5 bg-gray-700 rounded w-[50%]"></div>
                        </div>
                    </div>
                </div>

                {{-- Element 2: The OFM Planner Card (Front) --}}
                <div class="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 w-80 z-20 transform hover:scale-105 transition duration-500">
                    <div class="flex justify-between items-center mb-6">
                        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">⚡</div>
                        <span class="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">{{ __('plan_mockup_status') }}</span>
                    </div>
                    <h3 class="font-black text-2xl text-gray-900 mb-2">{{ __('plan_mockup_title') }}</h3>
                    <p class="text-gray-400 text-sm mb-6">{{ __('plan_mockup_desc') }}</p>
                    
                    {{-- Strategic Context Indicator --}}
                    <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div class="relative w-16 h-16 shrink-0 flex items-center justify-center">
                             <div class="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse"></div>
                             <div class="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                             </div>
                        </div>
                        <div>
                            <p class="font-bold text-gray-900 text-sm">{{ __('plan_mockup_stat_1') }}</p>
                            <p class="text-xs text-blue-600 font-bold">{{ __('plan_mockup_stat_2') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: THE CYCLE -> "THE INFINITE LIST TRAP" --}}
    {{-- ================================================================= --}}
    <section class="py-24 bg-white relative overflow-hidden border-b border-gray-100">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                <h2 class="text-3xl md:text-5xl font-black mb-6 text-gray-900">{{ __('plan_cycle_title') }}</h2>
                <p class="text-xl text-gray-500">{{ __('plan_cycle_desc') }}</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 items-center">
                {{-- Card 1: The Overload --}}
                <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition duration-300 relative group md:rotate-[-4deg] hover:rotate-0 z-10 text-center">
                    <div class="text-5xl mb-6 group-hover:scale-125 transition duration-500">📝</div>
                    <h3 class="text-xl font-bold mb-3 text-gray-900">{{ __('plan_cycle_1_title') }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ __('plan_cycle_1_desc') }}</p>
                </div>
                
                {{-- Card 2: The Guilt --}}
                <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-xl border-indigo-100 transition duration-300 relative group z-20 scale-110 text-center">
                    <div class="absolute -top-4 -right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">15 TASKS LEFT</div>
                    <div class="text-5xl mb-6 group-hover:scale-125 transition duration-500">😫</div>
                    <h3 class="text-xl font-bold mb-3 text-gray-900">{{ __('plan_cycle_2_title') }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ __('plan_cycle_2_desc') }}</p>
                </div>

                {{-- Card 3: The Stagnation --}}
                <div class="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-400 transition duration-300 relative group md:rotate-[4deg] hover:rotate-0 z-10 text-center">
                    <div class="text-5xl mb-6 group-hover:scale-125 transition duration-500">🔄</div>
                    <h3 class="text-xl font-bold mb-3 text-gray-900">{{ __('plan_cycle_3_title') }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ __('plan_cycle_3_desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: THE PROBLEM -> "CHECKLIST FATIGUE" --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-gray-50 overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            
            {{-- Text Side --}}
            <div class="order-2 lg:order-1 animate-in slide-in-from-bottom-12 fade-in duration-1000">
                <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-blue-200">🏁</div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                    {{ __('plan_prob_title_1') }} <span class="text-blue-600 decoration-blue-200 underline decoration-4 underline-offset-4">{{ __('plan_prob_title_highlight') }}</span>.
                </h2>
                <p class="text-gray-500 text-xl leading-relaxed mb-8">
                    {{ __('plan_prob_desc') }}
                </p>
                <ul class="space-y-4 font-bold text-gray-600">
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('plan_prob_point_1') }}
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('plan_prob_point_2') }}
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</span>
                        {{ __('plan_prob_point_3') }}
                    </li>
                </ul>
            </div>

            {{-- Visual Side (Overdue Chaos) --}}
            <div class="order-1 lg:order-2 relative h-[500px] flex items-center justify-center animate-in slide-in-from-right-12 fade-in duration-1000 delay-200">
                <div class="relative w-80 bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
                    {{-- Stacked Overdue Notifications --}}
                    <div class="space-y-3 opacity-90">
                        <div class="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3">
                            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div class="h-2 bg-red-200 rounded w-24"></div>
                        </div>
                        <div class="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 translate-x-2">
                            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div class="h-2 bg-red-200 rounded w-20"></div>
                        </div>
                        <div class="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 translate-x-4">
                            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div class="h-2 bg-red-200 rounded w-28"></div>
                        </div>
                        <div class="bg-white border border-gray-100 p-4 rounded-2xl flex items-center gap-3 translate-x-6 opacity-40">
                            <div class="w-2 h-2 bg-gray-200 rounded-full"></div>
                            <div class="h-2 bg-gray-100 rounded w-16"></div>
                        </div>
                    </div>

                    <div class="mt-12 text-center">
                        <p class="text-7xl mb-4">🔔</p>
                        <p class="text-xs font-black text-red-600 uppercase tracking-widest leading-loose">
                            You have 45 overdue tasks.<br>Are you even trying?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: THE SOLUTION -> "CONTEXT-FIRST" --}}
    {{-- ================================================================= --}}
    <section class="py-32 border-y border-blue-50 overflow-hidden bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-20 max-w-3xl mx-auto">
                <div class="inline-block p-4 bg-blue-50 rounded-full shadow-md mb-6 animate-bounce">
                    🧠
                </div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                    {{ __('plan_sol_title_1') }} <span class="text-blue-600">{{ __('plan_sol_title_highlight') }}</span>.
                </h2>
                <p class="text-gray-500 text-xl">
                    {{ __('plan_sol_desc') }}
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {{-- Box 1: The Context Logic --}}
                <div class="bg-blue-600 p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-blue-200">
                    <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    <div class="relative z-10">
                        <h3 class="text-2xl font-black mb-6">{{ __('plan_sol_box_title') }}</h3>
                        <p class="text-blue-100 text-lg leading-relaxed mb-8">
                            {!! __('plan_sol_box_desc') !!}
                        </p>
                        <div class="flex flex-wrap gap-3">
                            <span class="px-4 py-2 bg-white/20 rounded-full text-xs font-bold border border-white/20">Habit-Linked</span>
                            <span class="px-4 py-2 bg-white/20 rounded-full text-xs font-bold border border-white/20">Goal-Oriented</span>
                            <span class="px-4 py-2 bg-white/20 rounded-full text-xs font-bold border border-white/20">Energy-Aware</span>
                        </div>
                    </div>
                </div>

                {{-- Box 2: The Calm Execution --}}
                <div class="bg-gray-50 p-12 rounded-[3rem] border border-gray-100 flex flex-col justify-center">
                    <div class="space-y-8">
                        <div class="flex items-start gap-6">
                            <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0">🌱</div>
                            <div>
                                <h4 class="font-bold text-gray-900 mb-1">Growth Focused</h4>
                                <p class="text-sm text-gray-500">Every task moves your needle.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-6">
                            <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0">🧘</div>
                            <div>
                                <h4 class="font-bold text-gray-900 mb-1">Zero Guilt</h4>
                                <p class="text-sm text-gray-500">Intelligent rescheduling that respects your capacity.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 5: COMPARISON -> "LIST VS SYSTEM" --}}
    {{-- ================================================================= --}}
    <section class="py-32 bg-white">
        <div class="max-w-5xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6">{{ __('plan_compare_title') }}</h2>
                <p class="text-gray-500 text-xl">{{ __('plan_compare_desc') }}</p>
            </div>

            <div class="overflow-hidden rounded-[3rem] border border-gray-100 shadow-2xl">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-900 text-white">
                            <th class="p-8 text-sm font-black uppercase tracking-widest">{{ __('plan_table_head_1') }}</th>
                            <th class="p-8 text-sm font-black uppercase tracking-widest opacity-50">{{ __('plan_table_head_2') }}</th>
                            <th class="p-8 text-sm font-black uppercase tracking-widest text-blue-400">OneForMind</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        @foreach([1, 2, 3, 4] as $i)
                        <tr class="{{ $i % 2 == 0 ? 'bg-gray-50' : 'bg-white' }} border-b border-gray-100 transition hover:bg-blue-50/30">
                            <td class="p-8 font-black text-gray-900">{{ __("plan_table_row_{$i}_title") }}</td>
                            <td class="p-8 text-gray-400 font-medium italic opacity-60">{{ __("plan_table_row_{$i}_col_1") }}</td>
                            <td class="p-8 font-black text-blue-600">
                                <div class="flex items-center gap-3">
                                    <span class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-[10px]">✨</span>
                                    {{ __("plan_table_row_{$i}_col_2") }}
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 6: CTA --}}
    {{-- ================================================================= --}}
    <section class="pt-32 pb-40 px-6 bg-blue-950 relative overflow-hidden">
        {{-- Modern Grid Overlay --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:32px_32px] opacity-10"></div>
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-blue-900/50 to-transparent -z-0"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl text-4xl mb-10 border border-white/10 shadow-2xl">🚀</div>
            <h2 class="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight leading-tight">
                {!! __('plan_cta_title') !!}
            </h2>
            <p class="text-blue-200 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
                {{ __('plan_cta_desc') }}
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="{{ route('register') }}" class="w-full sm:w-auto bg-white text-blue-950 px-12 py-5 rounded-full font-black text-xl hover:bg-blue-50 transition transform hover:-translate-y-2 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                    {{ __('plan_cta_btn') }}
                </a>
                <a href="{{ route('features.planner') }}" class="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-white/10 transition">
                    Explore Planner OS
                </a>
            </div>
            <p class="mt-8 text-xs text-blue-400 font-bold uppercase tracking-[0.3em]">{{ __('plan_cta_sub') }}</p>
        </div>
    </section>

@endsection
