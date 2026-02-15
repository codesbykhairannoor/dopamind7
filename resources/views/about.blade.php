@extends('layouts.marketing')

@section('title', __('about_badge') . ' - OneForMind')

@section('content')
    <div class="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto overflow-hidden">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-8 uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
            {{ __('about_badge') }}
        </div>
        
        <h1 class="text-5xl md:text-7xl font-black mb-6 text-gray-900 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
            {{ __('about_title_1') }}
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">{{ __('about_title_2') }}</span>
        </h1>
        
        <p class="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
            {{ __('about_desc') }}
        </p>
    </div>

    <div class="max-w-6xl mx-auto px-6 pb-24 space-y-24 overflow-hidden">
        
        <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1 animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both">
                <h2 class="text-3xl font-black mb-6 text-gray-900">{{ __('story_1_title') }}</h2>
                <p class="text-gray-500 text-lg leading-relaxed mb-6">{{ __('story_1_p1') }}</p>
                <p class="text-gray-500 text-lg leading-relaxed mb-6">
                    <strong>{{ __('story_1_p2') }}</strong>
                </p>
                
                <div class="flex gap-4 mt-8">
                    <div class="bg-red-50 p-4 rounded-2xl w-full text-center border border-red-100 hover:-translate-y-1 transition duration-300">
                        <div class="text-2xl mb-2">🤯</div>
                        <div class="font-bold text-red-800 text-sm">{{ __('story_1_card_1') }}</div>
                    </div>
                     <div class="bg-orange-50 p-4 rounded-2xl w-full text-center border border-orange-100 hover:-translate-y-1 transition duration-300 delay-75">
                        <div class="text-2xl mb-2">🔔</div>
                        <div class="font-bold text-orange-800 text-sm">{{ __('story_1_card_2') }}</div>
                    </div>
                </div>
            </div>
            
            <div class="order-1 md:order-2 relative h-96 bg-gray-100 rounded-[3rem] overflow-hidden flex items-center justify-center animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both">
                <div class="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 opacity-50"></div>
                <div class="relative z-10 text-center transform rotate-3 transition hover:rotate-0 duration-500">
                    <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs mx-auto animate-pulse duration-[4000ms]">
                        <div class="flex justify-between text-xs text-gray-500 mb-4 font-bold tracking-widest uppercase">My To-Do List</div>
                        <div class="space-y-3">
                            <div class="h-3 bg-red-200 rounded w-full"></div>
                            <div class="h-3 bg-red-200 rounded w-3/4"></div>
                            <div class="h-3 bg-red-200 rounded w-5/6"></div>
                        </div>
                        <div class="mt-4 text-red-500 font-bold text-sm">⚠️ Overdue (99+)</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="relative h-96 bg-gray-100 rounded-[3rem] overflow-hidden flex items-center justify-center animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-100 opacity-50"></div>
                <div class="text-9xl relative z-10 animate-bounce duration-[3000ms]">🧘‍♂️</div>
            </div>

            <div class="animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both">
                <h2 class="text-3xl font-black mb-6 text-gray-900">{{ __('story_2_title') }}</h2>
                <p class="text-gray-500 text-lg leading-relaxed mb-6">{{ __('story_2_p1') }}</p>
                <div class="border-l-4 border-indigo-600 pl-6 py-4 bg-indigo-50/50 rounded-r-xl mb-6">
                    <p class="text-indigo-900 font-bold italic text-lg">"{{ __('story_2_quote') }}"</p>
                </div>
                <p class="text-gray-500 text-lg leading-relaxed">{{ __('story_2_p2') }}</p>
            </div>
        </div>
    </div>

    <div class="bg-indigo-950 text-white py-24 rounded-t-[3rem] md:rounded-[3rem] md:mx-6 mb-24 relative overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-100 fill-mode-both">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-30 -mr-20 -mt-20 animate-pulse duration-[5000ms]"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
                <h2 class="text-indigo-400 font-bold tracking-widest uppercase mb-2 text-sm">{{ __('manifesto_badge') }}</h2>
                <h3 class="text-4xl md:text-5xl font-black">{{ __('manifesto_title') }}</h3>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-indigo-500 hover:bg-white/10 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                    <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition">🛡️</div>
                    <h4 class="text-xl font-bold mb-3">{{ __('manifesto_1_title') }}</h4>
                    <p class="text-indigo-200 leading-relaxed">{{ __('manifesto_1_desc') }}</p>
                </div>

                <div class="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-indigo-500 hover:bg-white/10 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 fill-mode-both">
                    <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition">🔄</div>
                    <h4 class="text-xl font-bold mb-3">{{ __('manifesto_2_title') }}</h4>
                    <p class="text-indigo-200 leading-relaxed">{{ __('manifesto_2_desc') }}</p>
                </div>

                <div class="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-indigo-500 hover:bg-white/10 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
                    <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 transition">🌱</div>
                    <h4 class="text-xl font-bold mb-3">{{ __('manifesto_3_title') }}</h4>
                    <p class="text-indigo-200 leading-relaxed">{{ __('manifesto_3_desc') }}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-6xl mx-auto px-6 pb-32 pt-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
        <h2 class="text-3xl md:text-4xl font-black mb-16 text-center text-indigo-950">{{ __('team_title') }}</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
            
            <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-2 transition duration-300 group relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-indigo-100 transition"></div>
                
                <div class="relative z-10">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                            👨‍💻
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-indigo-950">{{ __('dev_name') }}</h3>
                            <span class="text-xs font-bold tracking-wider text-indigo-500 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                {{ __('dev_role') }}
                            </span>
                        </div>
                    </div>
                    <p class="text-slate-600 leading-relaxed text-lg">
                        "{{ __('dev_desc') }}"
                    </p>
                </div>
            </div>

            <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-100 hover:-translate-y-2 transition duration-300 group relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-100 transition"></div>
                
                <div class="relative z-10">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                            🚀
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-indigo-950">{{ __('user_name') }}</h3>
                            <span class="text-xs font-bold tracking-wider text-purple-500 uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                                {{ __('user_role') }}
                            </span>
                        </div>
                    </div>
                    <p class="text-slate-600 leading-relaxed text-lg">
                        "{{ __('user_desc') }}"
                    </p>
                </div>
            </div>

        </div>

        <div class="mt-12 text-center">
            <p class="text-slate-400 text-sm font-medium">
                {{ __('team_connect') }} 
                <a href="#" class="text-indigo-600 hover:text-indigo-800 underline decoration-indigo-200 hover:decoration-indigo-600 transition underline-offset-4">
                    Say Hi on Twitter/X
                </a>
            </p>
        </div>
    </div>

    <div class="bg-indigo-50 border-t border-indigo-100 py-24 text-center overflow-hidden">
        <div class="max-w-3xl mx-auto px-6 animate-in zoom-in-95 fade-in duration-700 delay-100 fill-mode-both">
            <h2 class="text-4xl font-black mb-6 text-indigo-900">{{ __('cta_about_title') }}</h2>
            <p class="text-xl text-indigo-700/70 mb-10">{{ __('cta_about_desc') }}</p>
            <div class="flex justify-center gap-4">
                <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                    {{ __('cta_about_btn') }}
                </a>
            </div>
            <p class="mt-6 text-sm text-indigo-400">{{ __('cta_about_sub') }}</p>
        </div>
    </div>
@endsection