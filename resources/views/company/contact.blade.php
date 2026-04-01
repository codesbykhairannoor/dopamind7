@extends('layouts.marketing')

@section('content')
<div class="pt-32 pb-24 px-4 bg-slate-50 dark:bg-slate-900/50 min-h-screen">
    <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-black text-[10px] mb-6 uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                ✨ {{ __('contact_title') }}
            </div>
            <h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                {{ __('contact_title') }}
            </h1>
            <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-bold">
                {{ __('contact_subtitle') }}
            </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Contact Info Sidebar -->
            <div class="lg:col-span-1 space-y-6">
                <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none animate-in fade-in slide-in-from-left-6 duration-700">
                    <h3 class="text-xl font-black text-slate-900 dark:text-white mb-8">{{ __('contact_info_title') }}</h3>
                    
                    <div class="space-y-8">
                        <div class="flex gap-4">
                            <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-xl shrink-0">
                                🏢
                            </div>
                            <div>
                                <h4 class="text-sm font-black text-slate-900 dark:text-white mb-1">{{ __('contact_info_hq') }}</h4>
                                <p class="text-xs text-slate-500 dark:text-slate-400 font-bold">{{ __('contact_info_jakarta') }}</p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-xl shrink-0">
                                ✉️
                            </div>
                            <div>
                                <h4 class="text-sm font-black text-slate-900 dark:text-white mb-1">{{ __('contact_info_support') }}</h4>
                                <p class="text-xs text-slate-500 dark:text-slate-400 font-bold">oneformindapp@gmail.com</p>
                            </div>
                        </div>

                        <div class="flex gap-4 text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-transform cursor-pointer">
                            <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-xl shrink-0">
                                💬
                            </div>
                            <div>
                                <h4 class="text-sm font-black mb-1">{{ __('contact_info_chat') }}</h4>
                                <p class="text-xs font-bold">{{ __('contact_info_chat_status') }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Quick FAQ Card --}}
                <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
                    <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                    <h3 class="text-lg font-black mb-4 relative z-10">{{ __('contact_faq_title') }}</h3>
                    <p class="text-xs text-slate-400 font-bold mb-6 relative z-10 leading-relaxed">
                        {{ __('contact_faq_desc') }}
                    </p>
                    <a href="/resources/guide" class="block w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-center text-xs font-black transition relative z-10">
                        {{ __('contact_faq_btn') }}
                    </a>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="lg:col-span-2">
                <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none animate-in fade-in slide-in-from-right-6 duration-700">
                    <form action="{{ route('contact.send') }}" method="POST" class="space-y-8">
                        @csrf
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                                    {{ __('contact_form_name') }}
                                </label>
                                <input name="name" type="text" required class="w-full px-6 py-4 rounded-3xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 font-bold text-sm transition" placeholder="John Doe">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                                    {{ __('contact_form_email') }}
                                </label>
                                <input name="email" type="email" required class="w-full px-6 py-4 rounded-3xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 font-bold text-sm transition" placeholder="john@example.com">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                                {{ __('contact_form_subject') }}
                            </label>
                            <select name="subject" class="w-full px-6 py-4 rounded-3xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 font-bold text-sm transition appearance-none cursor-pointer">
                                <option value="support">{{ __('contact_info_support') }}</option>
                                <option value="billing">{{ __('contact_info_billing') }}</option>
                                <option value="partnership">Business Partnership</option>
                                <option value="other">Lainnya</option>
                            </select>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                                {{ __('contact_form_message') }}
                            </label>
                            <textarea name="message" rows="6" required class="w-full px-6 py-4 rounded-3xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 font-bold text-sm transition resize-none" placeholder="{{ __('contact_form_message_placeholder') }}"></textarea>
                        </div>

                        <button type="submit" class="w-full md:w-auto px-12 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-black text-sm transition transform active:scale-95 shadow-xl shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-3">
                            {{ __('contact_btn_send') }}
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
