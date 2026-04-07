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
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs mb-8 uppercase tracking-widest border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span class="relative flex h-2.5 w-2.5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                {{ __('stat_hero_badge') }}
            </div>
            
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-10 text-slate-900 tracking-tight leading-tight">
                {{ __('stat_hero_title') }}
            </h1>

            {{-- MAIN STATUS BANNER (Mobile Optimized) --}}
            <div class="bg-emerald-500 text-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-emerald-200/50 flex flex-col items-center justify-center relative overflow-hidden group animate-in zoom-in-95 duration-1000 delay-200 w-full max-w-2xl mx-auto">
                <div class="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                
                <div class="relative z-10 flex flex-col items-center">
                    <div class="text-[36px] leading-[1.1] font-black md:text-6xl mb-4 md:mb-6 group-hover:scale-110 transition duration-500 transform">✅</div>
                    <h2 class="text-2xl md:text-4xl font-black uppercase tracking-widest text-center">{{ __('stat_hero_operational') }}</h2>
                    <p class="mt-3 text-emerald-100 font-bold text-xs md:text-sm opacity-90 text-center">{{ __('stat_hero_last_check') }}</p>
                </div>
            </div>
        </div>
    </header>

    {{-- ================================================================= --}}
    {{-- SECTION 2: METRICS & UPTIME (Moved up for immediate info) --}}
    {{-- ================================================================= --}}
    <section class="py-16 md:py-24 bg-white border-b border-slate-100">
        <div class="max-w-5xl mx-auto px-6">
            <h2 class="text-xl md:text-2xl font-black text-slate-900 mb-8 md:mb-12 text-center">{{ __('stat_metrics_title') }}</h2>
            
            {{-- Metrics Grid (Responsive) --}}
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {{-- Latency Metric --}}
                <div class="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 border border-slate-100 text-center group flex flex-col justify-center items-center">
                    <div class="text-2xl md:text-3xl mb-3 group-hover:animate-bounce">⚡</div>
                    <div class="text-3xl md:text-4xl font-black text-slate-900 mb-1 tracking-tighter">142<span class="text-xl md:text-2xl text-slate-500">ms</span></div>
                    <div class="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{{ __('stat_metrics_latency') }}</div>
                </div>
                
                {{-- Success Metric --}}
                <div class="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-indigo-600 text-white text-center shadow-xl shadow-indigo-200 transform hover:-translate-y-1 transition duration-500 flex flex-col justify-center items-center relative overflow-hidden">
                    <div class="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                    <div class="text-2xl md:text-3xl mb-3 relative z-10">💎</div>
                    <div class="text-3xl md:text-4xl font-black mb-1 tracking-tighter relative z-10">100%</div>
                    <div class="text-[10px] md:text-xs font-black text-indigo-200 uppercase tracking-widest mt-1 relative z-10">{{ __('stat_metrics_success') }}</div>
                </div>

                {{-- Annual Uptime Metric (Full width on mobile) --}}
                <div class="col-span-2 md:col-span-1 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 border border-slate-100 text-center group flex flex-col justify-center items-center">
                    <div class="text-2xl md:text-3xl mb-3 group-hover:rotate-12 transition transform origin-bottom">🛡️</div>
                    <div class="text-3xl md:text-4xl font-black text-slate-900 mb-1 tracking-tighter">99.9%</div>
                    <div class="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{{ __('stat_metrics_uptime') }}</div>
                </div>
            </div>

            {{-- 90 DAY UPTIME CHART (Visual Only - Mobile Optimized) --}}
            <div class="mt-8 md:mt-16 p-6 md:p-8 bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative group">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none"></div>
                <div class="relative z-10">
                    <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-2 md:gap-0 mb-6 md:mb-8">
                        <div>
                            <h3 class="text-white font-black text-base md:text-lg mb-1">{{ __('stat_history_title') }}</h3>
                            <p class="text-slate-400 text-xs font-bold">{{ __('stat_history_empty') }}</p>
                        </div>
                        <div class="text-emerald-400 font-black text-xs md:text-sm uppercase tracking-widest">{{ __('stat_history_uptime') }}</div>
                    </div>
                    
                    {{-- The Chart Container (Scrollable horizontally on very small screens if needed, but flex-1 handles it well) --}}
                    <div class="flex gap-[2px] md:gap-1 items-end h-10 md:h-12 w-full">
                        {{-- Rendering fewer bars on mobile could be done via CSS display, but for simplicity we rely on flex-1 to shrink them --}}
                        @for($i = 0; $i < 60; $i++)
                            @php
                                $height = rand(60, 100);
                                $color = $height > 95 ? 'bg-emerald-500' : ($height > 80 ? 'bg-emerald-600' : 'bg-emerald-400');
                            @endphp
                            <div class="flex-1 {{ $color }} rounded-t-sm md:rounded-full opacity-50 transition-all duration-500 group-hover:opacity-100 md:group-hover:scale-y-110 origin-bottom" style="height: {{ $height }}%"></div>
                        @endfor
                    </div>
                    {{-- Timeline Labels --}}
                    <div class="flex justify-between mt-3 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span>90 Days ago</span>
                        <span>Today</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 3: SERVICE BREAKDOWN (Mobile Optimized List) --}}
    {{-- ================================================================= --}}
    <section class="py-16 md:py-24 bg-slate-50">
        <div class="max-w-4xl mx-auto px-6">
            <div class="mb-10 md:mb-12 text-center md:text-left">
                <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-3">{{ __('stat_service_title') }}</h2>
                <p class="text-slate-500 font-medium text-sm md:text-base">{{ __('stat_service_desc') }}</p>
            </div>

            <div class="grid gap-3 md:gap-4">
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
                {{-- Responsive Card Structure --}}
                <div class="bg-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-lg hover:border-indigo-100 transition duration-300 group">
                    
                    {{-- Left: Icon & Text --}}
                    <div class="flex items-start sm:items-center gap-4 md:gap-6">
                        <div class="w-12 h-12 shrink-0 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-2xl group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                            {{ $service['icon'] }}
                        </div>
                        <div>
                            <h3 class="font-black text-slate-900 text-base md:text-lg leading-tight">{{ __($service['name']) }}</h3>
                            <p class="text-slate-500 text-xs md:text-sm font-medium mt-1 pr-4 sm:pr-0">{{ __($service['desc']) }}</p>
                        </div>
                    </div>
                    
                    {{-- Right: Status Badge (Self-aligns on mobile) --}}
                    <div class="self-end sm:self-auto shrink-0 flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-emerald-50 text-emerald-700 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest border border-emerald-100">
                        <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        {{ __('stat_status_ok') }}
                    </div>

                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ================================================================= --}}
    {{-- SECTION 4: CTA --}}
    {{-- ================================================================= --}}
    <footer class="py-24 md:py-32 bg-white relative overflow-hidden border-t border-slate-100">
        <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
        
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                {{ __('stat_cta_title') }}
            </h2>
            <p class="text-slate-500 text-base md:text-lg mb-10 max-w-xl mx-auto font-medium">
                {{ __('stat_cta_desc') }}
            </p>
            <a href="{{ route('resources.community') }}" class="inline-flex items-center justify-center bg-slate-900 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-[2rem] font-black text-base md:text-lg hover:bg-indigo-600 transition-colors transform hover:-translate-y-1 shadow-xl hover:shadow-indigo-500/30">
                {{ __('stat_cta_btn') }} →
            </a>
        </div>
    </footer>

@endsection