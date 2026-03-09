@extends('layouts.marketing')

@section('title', __('job_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('job_meta_desc') }}">
    <meta property="og:title" content="{{ __('job_meta_og_title') }}">
    <meta property="og:description" content="{{ __('job_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/features/job') }}">
@endsection

@section('json-ld')
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "OneForMind Job Tracker",
  "applicationCategory": "ProductivityApplication",
  "description": "Professional job application tracker and CRM for career management.",
  "featureList": [
    "Application Pipeline Management",
    "Interview Scheduling",
    "Salary Range Tracking",
    "Spreadsheet-style Data Entry"
  ]
}
</script>
@endsection

@section('content')

   {{-- SECTION 1: HERO (CENTERED LAYOUT + FLOATING JOB MOCKUP) --}}
    <header class="pt-32 pb-32 px-6 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-gray-50 relative border-b border-gray-100">
        {{-- Background Glow --}}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>

        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider shadow-sm border border-indigo-200">
                    <span class="text-lg">💼</span> {{ __('job_hero_badge') }}
                </div>
                
                <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">
                    {{ __('job_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('job_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                    {{ __('job_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        {{ __('job_hero_cta_1') }}
                    </a>
                    <a href="#how-it-works" class="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-full font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition">
                        {{ __('job_hero_cta_2') }}
                    </a>
                </div>
            </div>

            {{-- Floating Mockup Centered --}}
            <div class="relative w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
                <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-20"></div>
                <div class="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-8 md:p-10 transform transition hover:scale-[1.02] duration-500">
                    
                    <div class="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                        <div class="text-left">
                            <h3 class="font-black text-gray-900 text-2xl mb-1">{{ __('job_mockup_title') }}</h3>
                        </div>
                        <div class="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl border border-indigo-100 flex items-center gap-3">
                            <span class="text-2xl">📊</span>
                            <div class="text-left">
                                <span class="text-[10px] font-bold uppercase block leading-none opacity-70 mb-0.5">{{ __('job_mockup_status_label') }}</span>
                                <span class="font-black text-lg leading-tight">{{ __('job_mockup_streak') }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        {{-- Job 1 --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-2xl transition border border-gray-100 hover:border-indigo-100 cursor-pointer bg-gray-50/50">
                            <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-bold">G</div>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-gray-900">{{ __('job_mockup_task_1') }}</p>
                                <p class="text-xs font-bold text-orange-600 uppercase tracking-wider">{{ __('job_mockup_time_1') }}</p>
                            </div>
                            <div class="text-right">
                                <span class="text-xs font-bold text-gray-400">{{ __('job_mockup_time_ago_1') }}</span>
                            </div>
                        </div>
                        
                        {{-- Job 2 --}}
                        <div class="flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-2xl transition border border-gray-100 hover:border-indigo-100 cursor-pointer bg-gray-50/50">
                            <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">S</div>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-gray-900">{{ __('job_mockup_task_2') }}</p>
                                <p class="text-xs font-bold text-indigo-600 uppercase tracking-wider">{{ __('job_mockup_time_2') }}</p>
                            </div>
                            <div class="text-right">
                                <span class="text-xs font-bold text-gray-400">{{ __('job_mockup_time_ago_2') }}</span>
                            </div>
                        </div>

                        {{-- Job 3 (Highlight) --}}
                        <div class="flex items-center gap-4 p-4 bg-white rounded-2xl transition border-2 border-green-200 hover:border-green-400 cursor-pointer shadow-sm transform scale-[1.02]">
                            <div class="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl font-bold">A</div>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-green-900">{{ __('job_mockup_task_3') }}</p>
                                <p class="text-xs font-bold text-green-600 uppercase tracking-wider">{{ __('job_mockup_time_3') }}</p>
                            </div>
                            <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-sm shadow-green-400"></div>
                        </div>
                    </div>

                    {{-- Floating Element --}}
                    <div class="absolute -right-8 -bottom-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20 animate-bounce duration-[3000ms]">
                        <div class="h-6 w-24 bg-indigo-600/20 rounded-lg flex items-center justify-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                            <div class="h-1.5 w-12 bg-indigo-300 rounded-full"></div>
                        </div>
                        <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{{ __('job_mockup_alert_1') }}</p>
                                <p class="font-black text-indigo-900 text-sm">{{ __('job_mockup_alert_2') }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>
    
    {{-- NEW SECTION 2: OPPORTUNITY FUNNEL (PIPELINE VISUAL) --}}
    <section class="py-24 bg-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row gap-24 items-center">
                <div class="flex-1 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-sm border border-indigo-100">
                        {{ __('job_funnel_badge') }}
                    </div>
                    <h2 class="text-5xl md:text-7xl font-black text-gray-900 mb-10 leading-[1.1] tracking-tight">
                        {{ __('job_funnel_title') }}
                    </h2>
                    <p class="text-gray-500 text-xl mb-12 leading-relaxed font-medium">
                        {{ __('job_funnel_desc') }}
                    </p>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl transition duration-500">
                            <div class="flex items-center gap-6">
                                <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-xl group-hover:rotate-6 transition">📩</div>
                                <span class="font-black text-gray-900 uppercase tracking-tighter">{{ __('job_funnel_label_1') }}</span>
                            </div>
                            <span class="text-2xl font-black text-indigo-600">42</span>
                        </div>
                        <div class="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl transition duration-500">
                            <div class="flex items-center gap-6">
                                <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl group-hover:rotate-6 transition">🤝</div>
                                <span class="font-black text-gray-900 uppercase tracking-tighter">{{ __('job_funnel_label_2') }}</span>
                            </div>
                            <span class="text-2xl font-black text-purple-600">8</span>
                        </div>
                    </div>
                </div>
                <div class="flex-1 w-full relative">
                    {{-- Horizontal Funnel Visual --}}
                    <div class="relative py-12 flex flex-col items-center">
                         {{-- Funnel Stages --}}
                         <div class="w-full space-y-4 relative z-10">
                             {{-- Applied Stage --}}
                             <div class="w-full bg-indigo-600 p-8 rounded-[2.5rem] shadow-2xl transform hover:scale-[1.02] transition duration-500 relative overflow-hidden group">
                                 <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                                 <div class="flex justify-between items-center text-white">
                                     <div class="text-left">
                                         <h4 class="text-xs font-black uppercase tracking-widest opacity-70 mb-2">{{ __('job_funnel_stage_1_label') }}</h4>
                                         <p class="text-2xl font-black tracking-tight">{{ __('job_funnel_stage_1_title') }}</p>
                                     </div>
                                     <span class="text-5xl font-black opacity-30 italic">24</span>
                                 </div>
                             </div>
                             {{-- Interview Stage --}}
                             <div class="w-[90%] mx-auto bg-purple-600 p-8 rounded-[2.5rem] shadow-xl transform hover:scale-[1.02] transition duration-500 relative overflow-hidden group">
                                 <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                                 <div class="flex justify-between items-center text-white">
                                     <div class="text-left">
                                         <h4 class="text-xs font-black uppercase tracking-widest opacity-70 mb-2">{{ __('job_funnel_stage_2_label') }}</h4>
                                         <p class="text-2xl font-black tracking-tight">{{ __('job_funnel_stage_2_title') }}</p>
                                     </div>
                                     <span class="text-5xl font-black opacity-30 italic">6</span>
                                 </div>
                             </div>
                             {{-- Final Stage --}}
                             <div class="w-[75%] mx-auto bg-emerald-600 p-8 rounded-[2.5rem] shadow-lg transform hover:scale-[1.02] transition duration-500 relative overflow-hidden group">
                                 <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                                 <div class="flex justify-between items-center text-white">
                                     <div class="text-left">
                                         <h4 class="text-xs font-black uppercase tracking-widest opacity-70 mb-2">{{ __('job_funnel_stage_3_label') }}</h4>
                                         <p class="text-2xl font-black tracking-tight">{{ __('job_funnel_stage_3_title') }}</p>
                                     </div>
                                     <span class="text-5xl font-black opacity-30 italic">2</span>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- NEW SECTION 3: DECISION MATRIX (COMPARISON GRID) --}}
    <section class="py-32 bg-slate-50 relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="flex flex-col lg:flex-row gap-24 items-center">
                <div class="flex-1 order-2 lg:order-1">
                    <div class="grid grid-cols-2 gap-6 relative">
                        {{-- Axis Labels --}}
                        <div class="absolute -top-12 left-1/2 -translate-x-1/2 font-black text-xs uppercase tracking-[0.3em] text-gray-400">{{ __('job_matrix_axis_y_top') }}</div>
                        <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 font-black text-xs uppercase tracking-[0.3em] text-gray-400">{{ __('job_matrix_axis_y_bottom') }}</div>
                        <div class="absolute top-1/2 -left-12 -translate-y-1/2 font-black text-xs uppercase tracking-[0.3em] text-gray-400 transform -rotate-90">{{ __('job_matrix_axis_x_left') }}</div>
                        <div class="absolute top-1/2 -right-12 -translate-y-1/2 font-black text-xs uppercase tracking-[0.3em] text-gray-400 transform rotate-90">{{ __('job_matrix_axis_x_right') }}</div>
                        
                        {{-- Matrix Cells --}}
                        <div class="aspect-square bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 p-8 flex flex-col items-center justify-center text-center group hover:border-indigo-200 transition">
                            <span class="text-4xl mb-4 group-hover:scale-125 transition">🏢</span>
                            <p class="text-xs font-black uppercase text-gray-400">{{ __('job_matrix_cell_1') }}</p>
                        </div>
                        <div class="aspect-square bg-indigo-600 rounded-[2.5rem] shadow-2xl p-8 flex flex-col items-center justify-center text-center transform scale-105 relative">
                             <div class="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">{{ __('job_matrix_cell_highlight') }}</div>
                            <span class="text-4xl mb-4 text-white">🚀</span>
                            <p class="text-xs font-black uppercase text-indigo-100">{{ __('job_matrix_cell_2') }}</p>
                        </div>
                        <div class="aspect-square bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 p-8 flex flex-col items-center justify-center text-center group hover:border-indigo-200 transition">
                            <span class="text-4xl mb-4 group-hover:scale-125 transition">🏡</span>
                             <p class="text-xs font-black uppercase text-gray-400">{{ __('job_matrix_cell_3') }}</p>
                        </div>
                        <div class="aspect-square bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 p-8 flex flex-col items-center justify-center text-center group hover:border-indigo-200 transition">
                            <span class="text-4xl mb-4 group-hover:scale-125 transition">🧪</span>
                             <p class="text-xs font-black uppercase text-gray-400">{{ __('job_matrix_cell_4') }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex-1 order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-2xl">
                        {{ __('job_matrix_badge') }}
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-tight tracking-tight">
                        {{ __('job_matrix_title') }}
                    </h2>
                    <p class="text-gray-600 text-xl mb-12 leading-relaxed">
                        {{ __('job_matrix_desc') }}
                    </p>
                    <div class="grid gap-8">
                         <div class="flex items-start gap-6 group">
                             <div class="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition">⚖️</div>
                             <div class="text-left">
                                 <h4 class="font-black text-gray-900 uppercase tracking-tighter mb-2">{{ __('job_matrix_feature_title') }}</h4>
                                 <p class="text-gray-500 text-sm font-medium leading-relaxed">{{ __('job_matrix_feature_desc') }}</p>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION 4: THE SUCCESS QUOTE --}}
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center animate-in zoom-in-95 fade-in duration-1000">
            <div class="text-9xl text-indigo-50 mb-4 font-serif leading-none italic select-none">"</div>
            <h2 class="text-3xl md:text-5xl font-black text-gray-900 leading-[1.4] mb-12 tracking-tight italic font-serif">
                {{ __('job_quote_text') }}
            </h2>
            <div class="flex flex-col items-center">
                <div class="w-24 h-2 bg-indigo-600 mb-8 rounded-full shadow-lg shadow-indigo-200"></div>
                <p class="text-indigo-600 font-black tracking-[0.5em] uppercase text-xs">{{ __('job_quote_author') }}</p>
            </div>
        </div>
    </section>

    {{-- SECTION 7: BOTTOM CTA --}}
    <section class="py-24 px-6 text-center">
        <div class="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse duration-[5000ms]"></div>
            
            <div class="relative z-10">
                <h2 class="text-4xl md:text-5xl font-black mb-6">{{ __('job_cta_title') }}</h2>
                <p class="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                    {{ __('job_cta_desc') }}
                </p>
                <a href="{{ route('register') }}" class="bg-white text-indigo-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl inline-block">
                {{ __('job_cta_btn') }}
            </a>
            <p class="text-indigo-100 mt-8 text-sm font-medium opacity-80">{{ __('job_cta_note') }}</p>
        </div>
    </section>
@endsection
