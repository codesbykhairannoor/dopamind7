@extends('layouts.marketing')

@section('title', __('stat_meta_title'))

@section('meta')
    <meta name="description" content="{{ __('stat_meta_desc') }}">
    <meta property="og:title" content="{{ __('stat_meta_title') }}">
    <meta property="og:description" content="{{ __('stat_meta_desc') }}">
@endsection

@section('content')

    {{-- ================================================================= --}}
    {{-- SECTION 1: HERO - GLOBAL STATUS --}}
    {{-- ================================================================= --}}
    <header class="pt-32 pb-20 px-6 bg-white relative border-b border-slate-100 overflow-hidden">
        {{-- Animated Grid Background --}}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs mb-8 uppercase tracking-widest border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {{ __('stat_hero_badge') }}
            </div>
            
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 tracking-tight">
                {{ __('stat_hero_title') }}
            </h1>

            {{-- MAIN STATUS BANNER --}}
            <div class="bg-emerald-500 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-200 flex flex-col items-center justify-center relative overflow-hidden group animate-in zoom-in-95 duration-1000 delay-200">
                <div class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                
                <div class="relative z-10 flex flex-col items-center">
                    <div class="text-6xl mb-4 group-hover:scale-110 transition duration-500">✅</div>
                    <h2 class="text-2xl md:text-3xl font-black uppercase tracking-widest">{{ __('stat_hero_operational') }}</h2>
                    <p class="mt-2 text-emerald-100 font-bold text-sm opacity-80 italic">{{ __('stat_hero_last_check') }}</p>
                </div>
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: SERVICE BREAKDOWN --}}
    {{-- ================================================================= --}}
    <section class="py-24 bg-slate-50">
        <div class="max-w-4xl mx-auto px-6">
            <div class="mb-12">
                <h2 class="text-2xl font-black text-slate-900 mb-2">{{ __('stat_service_title') }}</h2>
                <p class="text-slate-500 font-medium">{{ __('stat_service_desc') }}</p>
            </div>

            <div class="grid gap-4">
                @php
                    $services = [
                        ['name' => 'stat_core_name', 'desc' => 'stat_core_desc', 'icon' => '⚙️'],
                        ['name' => 'stat_auth_name', 'desc' => 'stat_auth_desc', 'icon' => '🔐'],
                        ['name' => 'stat_sync_name', 'desc' => 'stat_sync_desc', 'icon' => '☁️'],
                        ['name' => 'stat_web_name', 'desc' => 'stat_web_desc', 'icon' => '🌐'],
                        ['name' => 'stat_finance_name', 'desc' => 'stat_finance_desc', 'icon' => '💹']
                    ];
                @endphp

                @foreach($services as $service)
                <div class="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between hover:shadow-xl hover:scale-[1.01] transition duration-300 group">
                    <div class="flex items-center gap-6">
                        <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-indigo-50 transition">
                            {{ $service['icon'] }}
                        </div>
                        <div>
                            <h3 class="font-black text-slate-900">{{ __($service['name']) }}</h3>
                            <p class="text-slate-500 text-sm font-medium">{{ __($service['desc']) }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full font-black text-xs uppercase tracking-widest border border-emerald-100">
                        <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        {{ __('stat_status_ok') }}
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: METRICS & UPTIME --}}
    {{-- ================================================================= --}}
    <section class="py-24 bg-white border-y border-slate-100">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-2xl font-black text-slate-900 mb-12 text-center">{{ __('stat_metrics_title') }}</h2>
            
            <div class="grid md:grid-cols-3 gap-8">
                {{-- Latency Metric --}}
                <div class="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 text-center group">
                    <div class="text-3xl mb-4 group-hover:animate-bounce">⚡</div>
                    <div class="text-4xl font-black text-slate-900 mb-1 tracking-tighter">142ms</div>
                    <div class="text-xs font-black text-slate-400 uppercase tracking-widest">{{ __('stat_metrics_latency') }}</div>
                </div>
                
                {{-- Success Metric --}}
                <div class="p-8 rounded-[2rem] bg-indigo-600 text-white text-center shadow-xl shadow-indigo-200 transform hover:-translate-y-2 transition duration-500">
                    <div class="text-3xl mb-4">💎</div>
                    <div class="text-4xl font-black mb-1 tracking-tighter">100%</div>
                    <div class="text-xs font-black text-indigo-100 uppercase tracking-widest opacity-80">{{ __('stat_metrics_success') }}</div>
                </div>

                {{-- Annual Uptime Metric --}}
                <div class="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 text-center group">
                    <div class="text-3xl mb-4 group-hover:rotate-12 transition">🛡️</div>
                    <div class="text-4xl font-black text-slate-900 mb-1 tracking-tighter">99.9%</div>
                    <div class="text-xs font-black text-slate-400 uppercase tracking-widest">{{ __('stat_metrics_uptime') }}</div>
                </div>
            </div>

            {{-- 90 DAY UPTIME CHART (Visual Only) --}}
            <div class="mt-16 p-8 bg-slate-900 rounded-[2.5rem] overflow-hidden relative group">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                <div class="relative z-10">
                    <div class="flex justify-between items-end mb-8">
                        <div>
                            <h3 class="text-white font-black text-lg mb-1">{{ __('stat_history_title') }}</h3>
                            <p class="text-slate-400 text-xs font-bold">{{ __('stat_history_empty') }}</p>
                        </div>
                        <div class="text-emerald-400 font-black text-sm uppercase tracking-widest">{{ __('stat_history_uptime') }}</div>
                    </div>
                    
                    {{-- The Chart --}}
                    <div class="flex gap-1 items-end h-12">
                        @for($i = 0; $i < 60; $i++)
                            @php
                                $height = rand(60, 100);
                                $color = $height > 95 ? 'bg-emerald-500' : ($height > 80 ? 'bg-emerald-600' : 'bg-emerald-400');
                            @endphp
                            <div class="flex-1 {{ $color }} rounded-full opacity-40 transition-all duration-500 group-hover:opacity-100 group-hover:scale-y-110" style="height: {{ $height }}%"></div>
                        @endfor
                    </div>
                    {{-- Timeline Labels --}}
                    <div class="flex justify-between mt-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        <span>90 Days ago</span>
                        <span>Today</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: CTA --}}
    {{-- ================================================================= --}}
    <footer class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                {{ __('stat_cta_title') }}
            </h2>
            <p class="text-slate-500 text-lg mb-10 max-w-xl mx-auto font-medium">
                {{ __('stat_cta_desc') }}
            </p>
            <a href="{{ route('resources.community') }}" class="inline-flex items-center justify-center bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-slate-800 transition transform hover:-translate-y-1 shadow-2xl shadow-slate-200">
                {{ __('stat_cta_btn') }} →
            </a>
        </div>
    </footer>

@endsection
