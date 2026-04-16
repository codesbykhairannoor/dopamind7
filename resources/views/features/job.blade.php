@extends('layouts.marketing')

@section('title', __('job_meta_title'))

{{-- 🔥 SEO & GEO INJECTION 🔥 --}}
@section('meta')
    <meta name="description" content="{{ __('job_meta_desc') }}">
    <meta property="og:title" content="{{ __('job_meta_og_title') }}">
    <meta property="og:description" content="{{ __('job_meta_og_desc') }}">
    <meta property="og:url" content="{{ url('/features/job') }}">
    <link rel="canonical" href="{{ url('/features/job') }}" />
@endsection

@section('json-ld')
<script type="application/ld+json">
[
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{{ __('schema_job_name') }}",
  "applicationCategory": "ProductivityApplication",
  "description": "{{ __('schema_job_description') }}",
  "featureList": [
    "Application Pipeline Management",
    "Interview Scheduling",
    "Salary Range Tracking",
    "Spreadsheet-style Data Entry"
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
    "name": "{{ __('job_hero_badge') }}",
    "item": "{{ url('/features/job') }}"
  }]
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{ __('job_faq_q1') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('job_faq_a1') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('job_faq_q2') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('job_faq_a2') }}"
      }
    },
    {
      "@type": "Question",
      "name": "{{ __('job_faq_q3') }}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ __('job_faq_a3') }}"
      }
    }
  ]
}
]
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
                
                <h1 class="text-6xl leading-[1.1] md:text-7xl mb-8 leading-[1.1] text-gray-900 tracking-tight font-black">
                    {{ __('job_hero_title_1') }} <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{{ __('job_hero_title_2') }}</span>
                </h1>
                
                <p class="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                    {{ __('job_hero_desc') }}
                </p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <a hx-boost="false" href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                        {{ __('job_hero_cta_1') }}
                    </a>
                    <a href="#how-it-works" class="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-full font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50 transition">
                        {{ __('job_hero_cta_2') }}
                    </a>
                </div>
            </div>

            {{-- Floating Mockup Centered --}}
            <div class="relative w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both" role="img" aria-label="Job Application Pipeline Preview: Showing a structured funnel for active job applications, including status tracking from Applied to Interview and Offer, with salary negotiation notes.">
                <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20 h-full w-full pointer-events-none"></div>
                <div class="bg-slate-900 rounded-[3rem] border border-slate-800 p-8 md:p-12 shadow-2xl overflow-hidden min-h-[400px]">
                    
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
                            <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-bold">{{ __('job_mockup_grade_1') }}</div>
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
                            <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">{{ __('job_mockup_grade_2') }}</div>
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
                            <div class="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl font-bold">{{ __('job_mockup_grade_3') }}</div>
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
    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6" role="img" aria-label="Career Momentum and Funnel Visualization: A vertical pipeline showing the conversion from initial discovery to successful job placement.">
            <div class="flex flex-col lg:flex-row gap-24 items-center">
                <div class="flex-1 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs uppercase tracking-[0.2em] mb-8 shadow-sm border border-indigo-100">
                        {{ __('job_funnel_badge') }}
                    </div>
                    <h2 class="text-6xl leading-[1.1] md:text-7xl text-gray-900 mb-10 leading-[1.1] tracking-tight font-black">
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
                            <span class="text-2xl text-indigo-600">{{ __('job_funnel_stat_1') }}</span>
                        </div>
                        <div class="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl transition duration-500">
                            <div class="flex items-center gap-6">
                                <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl group-hover:rotate-6 transition">🤝</div>
                                <span class="font-black text-gray-900 uppercase tracking-tighter">{{ __('job_funnel_label_2') }}</span>
                            </div>
                            <span class="text-2xl text-purple-600">{{ __('job_funnel_stat_2') }}</span>
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
                                         <h4 class="text-xs uppercase tracking-widest opacity-70 mb-2">{{ __('job_funnel_stage_1_label') }}</h4>
                                         <p class="text-2xl tracking-tight">{{ __('job_funnel_stage_1_title') }}</p>
                                     </div>
                                     <span class="text-5xl opacity-30 italic font-black">{{ __('job_funnel_stage_1_stat') }}</span>
                                 </div>
                             </div>
                             {{-- Interview Stage --}}
                             <div class="w-[90%] mx-auto bg-purple-600 p-8 rounded-[2.5rem] shadow-xl transform hover:scale-[1.02] transition duration-500 relative overflow-hidden group">
                                 <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                                 <div class="flex justify-between items-center text-white">
                                     <div class="text-left">
                                         <h4 class="text-xs uppercase tracking-widest opacity-70 mb-2">{{ __('job_funnel_stage_2_label') }}</h4>
                                         <p class="text-2xl tracking-tight">{{ __('job_funnel_stage_2_title') }}</p>
                                     </div>
                                     <span class="text-5xl opacity-30 italic font-black">{{ __('job_funnel_stage_2_stat') }}</span>
                                 </div>
                             </div>
                             {{-- Final Stage --}}
                             <div class="w-[75%] mx-auto bg-emerald-600 p-8 rounded-[2.5rem] shadow-lg transform hover:scale-[1.02] transition duration-500 relative overflow-hidden group">
                                 <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                                 <div class="flex justify-between items-center text-white">
                                     <div class="text-left">
                                         <h4 class="text-xs uppercase tracking-widest opacity-70 mb-2">{{ __('job_funnel_stage_3_label') }}</h4>
                                         <p class="text-2xl tracking-tight">{{ __('job_funnel_stage_3_title') }}</p>
                                     </div>
                                     <span class="text-5xl opacity-30 italic font-black">{{ __('job_funnel_stage_3_stat') }}</span>
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
                        <div class="absolute -top-12 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-gray-400">{{ __('job_matrix_axis_y_top') }}</div>
                        <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-gray-400">{{ __('job_matrix_axis_y_bottom') }}</div>
                        <div class="absolute top-1/2 -left-12 -translate-y-1/2 text-xs uppercase tracking-[0.3em] text-gray-400 transform -rotate-90">{{ __('job_matrix_axis_x_left') }}</div>
                        <div class="absolute top-1/2 -right-12 -translate-y-1/2 text-xs uppercase tracking-[0.3em] text-gray-400 transform rotate-90">{{ __('job_matrix_axis_x_right') }}</div>
                        
                        {{-- Matrix Cells --}}
                        <div class="aspect-square bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 p-8 flex flex-col items-center justify-center text-center group hover:border-indigo-200 transition">
                            <span class="text-4xl mb-4 group-hover:scale-125 transition font-black">🏢</span>
                            <p class="text-xs uppercase text-gray-400">{{ __('job_matrix_cell_1') }}</p>
                        </div>
                        <div class="aspect-square bg-indigo-600 rounded-[2.5rem] shadow-2xl p-8 flex flex-col items-center justify-center text-center transform scale-105 relative">
                             <div class="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter">{{ __('job_matrix_cell_highlight') }}</div>
                            <span class="text-4xl mb-4 text-white font-black">🚀</span>
                            <p class="text-xs uppercase text-indigo-100">{{ __('job_matrix_cell_2') }}</p>
                        </div>
                        <div class="aspect-square bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 p-8 flex flex-col items-center justify-center text-center group hover:border-indigo-200 transition">
                            <span class="text-4xl mb-4 group-hover:scale-125 transition font-black">🏡</span>
                             <p class="text-xs uppercase text-gray-400">{{ __('job_matrix_cell_3') }}</p>
                        </div>
                        <div class="aspect-square bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 p-8 flex flex-col items-center justify-center text-center group hover:border-indigo-200 transition">
                            <span class="text-4xl mb-4 group-hover:scale-125 transition font-black">🧪</span>
                             <p class="text-xs uppercase text-gray-400">{{ __('job_matrix_cell_4') }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex-1 order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs uppercase tracking-[0.2em] mb-8 shadow-2xl">
                        {{ __('job_matrix_badge') }}
                    </div>
                    <h2 class="text-5xl md:text-6xl text-gray-900 mb-10 leading-tight tracking-tight font-black">
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

    {{-- NEW SECTION 3.5: MARKET VALUE (SPLIT CONTENT) --}}
    <section class="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        
        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="flex flex-col lg:flex-row gap-20 items-center">
                <div class="flex-1 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] uppercase tracking-[0.2em] mb-8 border border-cyan-500/20">
                        {{ __('job_value_badge') }}
                    </div>
                    <h2 class="text-5xl md:text-6xl text-white mb-8 leading-tight tracking-tight font-black">
                        {{ __('job_value_title') }}
                    </h2>
                    <p class="text-slate-400 text-xl leading-relaxed font-medium mb-12">
                        {{ __('job_value_desc') }}
                    </p>
                    
                    <div class="space-y-12">
                        <div class="flex gap-8 group">
                            <div class="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl group-hover:bg-cyan-500 transition duration-500 font-black">📈</div>
                            <div>
                                <h4 class="text-xl mb-2 uppercase tracking-tight group-hover:text-cyan-400 transition">{{ __('job_insight_1_title') }}</h4>
                                <p class="text-slate-500 font-medium leading-relaxed">{{ __('job_insight_1_desc') }}</p>
                            </div>
                        </div>
                        <div class="flex gap-8 group">
                            <div class="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl group-hover:bg-indigo-500 transition duration-500 font-black">🏗️</div>
                            <div>
                                <h4 class="text-xl mb-2 uppercase tracking-tight group-hover:text-indigo-400 transition">{{ __('job_insight_2_title') }}</h4>
                                <p class="text-slate-500 font-medium leading-relaxed">{{ __('job_insight_2_desc') }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex-1 w-full bg-slate-800/50 rounded-[3rem] p-1 border border-slate-700 shadow-2xl animate-in zoom-in-95 duration-1000">
                    <div class="bg-slate-900 rounded-[2.8rem] p-10 overflow-hidden relative group">
                        <div class="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition duration-700"></div>
                        
                        <div class="flex justify-between items-center mb-10">
                            <h3 class="text-sm uppercase tracking-[0.2em] text-slate-500">{{ __('job_radar_title') }}</h3>
                            <div class="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-[10px] animate-pulse">{{ __('job_radar_live') }}</div>
                        </div>

                        <div class="space-y-6">
                            @foreach([
                                ['role' => __('job_radar_role_1'), 'prev' => __('job_radar_prev_1'), 'curr' => __('job_radar_curr_1'), 'gain' => __('job_radar_gain_1'), 'color' => 'cyan'],
                                ['role' => __('job_radar_role_2'), 'prev' => __('job_radar_prev_2'), 'curr' => __('job_radar_curr_2'), 'gain' => __('job_radar_gain_2'), 'color' => 'indigo'],
                                ['role' => __('job_radar_role_3'), 'prev' => __('job_radar_prev_3'), 'curr' => __('job_radar_curr_3'), 'gain' => __('job_radar_gain_3'), 'color' => 'purple']
                            ] as $item)
                                <div class="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-slate-500/50 transition duration-500">
                                    <div class="flex justify-between items-center mb-4">
                                        <span class="font-bold text-slate-300">{{ $item['role'] }}</span>
                                        <span class="text-{{ $item['color'] }}-400 text-xs">{{ $item['gain'] }}</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <span class="text-slate-500 text-xs line-through">Rp {{ $item['prev'] }}</span>
                                        <div class="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div class="w-full h-full bg-{{ $item['color'] }}-500 animate-[grow_2s_ease-out_infinite]"></div>
                                        </div>
                                        <span class="text-white">Rp {{ $item['curr'] }}</span>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            @keyframes grow {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        </style>
    </section>


    {{-- SECTION 4: THE SUCCESS QUOTE --}}
    {{-- Moved quotes down --}}

    {{-- NEW SECTION: SCIENTIFIC PILLAR (E-E-A-T) - TERMINAL COMMAND STYLE --}}
    <section class="py-32 bg-slate-900 relative overflow-hidden">
        {{-- Matrix Grid Overlay --}}
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        
        <div class="max-w-5xl mx-auto px-6 relative z-10">
            <div class="bg-black/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-1 shadow-2xl relative overflow-hidden group">
                
                {{-- Terminal Header --}}
                <div class="bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
                    <div class="flex gap-2">
                        <div class="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <div class="text-[10px] text-white/30 uppercase tracking-[0.3em]">Scientific_Core_Module.exe</div>
                    <div class="w-8"></div>
                </div>

                <div class="p-8 md:p-16">
                    <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] uppercase tracking-widest mb-10 border border-indigo-500/30">
                        🧬 {{ __('job_science_badge') }}
                    </div>

                    <h2 class="text-4xl md:text-5xl font-mono text-emerald-400 mb-10 leading-tight font-black">
                        <span class="text-white opacity-50 mr-4">></span>{{ __('job_science_title') }}<span class="animate-pulse">_</span>
                    </h2>

                    <div class="bg-black/40 border-l-4 border-emerald-500 p-8 rounded-r-2xl mb-12">
                         <p class="text-emerald-500/80 text-xl md:text-2xl font-mono leading-relaxed italic">
                            {{ __('job_science_desc') }}
                        </p>
                    </div>

                    {{-- System Parameters --}}
                    <div class="grid md:grid-cols-3 gap-8 text-left border-t border-white/10 pt-12">
                        <div>
                             <span class="text-[10px] font-mono text-white/40 uppercase block mb-4">Module_01: Architecture</span>
                             <h4 class="text-white font-mono text-lg mb-2">Systems Thinking</h4>
                             <p class="text-white/40 text-xs leading-relaxed font-mono">Optimizing the job search as a multi-stage deterministic framework for predictability.</p>
                        </div>
                        <div>
                             <span class="text-[10px] font-mono text-white/40 uppercase block mb-4">Module_02: Optimization</span>
                             <h4 class="text-white font-mono text-lg mb-2">Iterative Feedback</h4>
                             <p class="text-white/40 text-xs leading-relaxed font-mono">Continuous loop refinement based on recruiter interactions and pipeline velocity data.</p>
                        </div>
                        <div>
                             <span class="text-[10px] font-mono text-white/40 uppercase block mb-4">Module_03: Core_Logic</span>
                             <h4 class="text-white font-mono text-lg mb-2">Pipeline Management</h4>
                             <p class="text-white/40 text-xs leading-relaxed font-mono">Visualizing career transition as a funnel conversion process to maximize final placement ROI.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- NEURAL PROMO: JOB MATCHING --}}
    <section class="py-32 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
        <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-500/5 to-transparent"></div>
        <div class="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row-reverse items-center gap-16 text-left">
            <div class="lg:w-1/2">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-widest mb-8 border border-emerald-500/20">
                    🎯 {{ __('job_ai_promo_badge') }}
                </div>
                <h2 class="text-5xl md:text-6xl text-white mb-8 leading-tight tracking-tight font-black">
                    {{ __('job_ai_promo_title') }}
                </h2>
                <p class="text-slate-400 text-xl font-medium leading-relaxed mb-12">
                    {{ __('job_ai_promo_desc') }}
                </p>
                <a hx-boost="false" href="{{ route('features.neural-os') }}" class="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl text-lg hover:bg-emerald-700 transition transform hover:-translate-y-1">
                    {{ __('job_ai_promo_btn') }} <span>→</span>
                </a>
            </div>
            <div class="lg:w-1/2 relative w-full">
                <div class="bg-slate-800 p-8 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                     <div class="flex items-center justify-center mb-8">
                        <div class="w-32 h-32 rounded-full border-8 border-emerald-500/20 flex items-center justify-center relative">
                            <div class="absolute inset-0 border-8 border-emerald-500 rounded-full border-t-transparent animate-spin-slow"></div>
                            <span class="text-2xl text-white">96%</span>
                        </div>
                     </div>
                     <div class="space-y-4">
                        <div class="px-4 py-2 bg-white/5 rounded-lg border border-white/5 text-[10px] font-bold text-slate-400">Keyword Match: Structured Execution</div>
                        <div class="px-4 py-2 bg-white/5 rounded-lg border border-white/5 text-[10px] font-bold text-slate-400">Skill Alignment: High</div>
                     </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 bg-white bg-pattern-grid relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center animate-in zoom-in-95 fade-in duration-1000">
            <div class="text-9xl text-indigo-50 mb-4 font-serif leading-none italic select-none">"</div>
            <h2 class="text-4xl md:text-5xl text-gray-900 leading-[1.4] mb-12 tracking-tight italic font-serif font-black">
                {{ __('job_quote_text') }}
            </h2>
            <div class="flex flex-col items-center">
                <div class="w-24 h-2 bg-indigo-600 mb-8 rounded-full shadow-lg shadow-indigo-200"></div>
                <p class="text-indigo-600 tracking-[0.5em] uppercase text-xs">{{ __('job_quote_author') }}</p>
            </div>
        </div>
    </section>

    <section class="py-24 px-6 text-center">
        <div class="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse duration-[5000ms]"></div>
            
            <div class="relative z-10">
                <h2 class="text-5xl md:text-5xl mb-6 font-black">{{ __('job_cta_title') }}</h2>
                <p class="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                    {{ __('job_cta_desc') }}
                </p>
                <a hx-boost="false" href="{{ route('register') }}" class="bg-white text-indigo-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl inline-block">
                {{ __('job_cta_btn') }}
            </a>
                <p class="text-indigo-100 mt-8 text-sm font-medium opacity-80">{{ __('job_cta_note') }}</p>
            </div>
        </div>
    </section>
@endsection



