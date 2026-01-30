<script setup>
// 🔥 IMPORT useForm dan usePage biar nggak error 'not defined'
import { Head, Link, useForm, usePage } from '@inertiajs/vue3'; 
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { ref, computed } from 'vue';

defineProps({ canRegister: Boolean });

// State buat FAQ Accordion
const activeFaq = ref(null);
const toggleFaq = (index) => {
    activeFaq.value = activeFaq.value === index ? null : index;
};

// --- LOGIC WAITLIST ---
const form = useForm({
    email: ''
});

// 🔥 Gunakan usePage() yang sudah diimport di atas
const successMessage = computed(() => usePage().props.flash?.success);

const submitWaitlist = () => {
    form.post(route('waitlist.store'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
};
</script>

<template>
    <Head title="Monthly Life Operating System" />
    <GuestLayout>
        
        <header class="pt-32 pb-24 px-6 text-center relative overflow-hidden">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/80 to-white rounded-full blur-[100px] -z-10 animate-pulse duration-[5000ms]"></div>
            
            <div class="max-w-5xl mx-auto">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-600 font-bold text-xs mb-8 uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {{ $t('hero_badge') }}
                </div>
                
                <h1 class="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight text-gray-900 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                    {{ $t('hero_title_1') }}<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {{ $t('hero_title_2') }}
                    </span>
                </h1>
                
                <p class="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-3xl mx-auto font-light animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
                    {{ $t('hero_desc') }}
                </p>
                
                <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                    <div v-if="!$page.props.auth.user" class="flex flex-col sm:flex-row justify-center gap-4">
                        <Link :href="route('register')" class="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition transform hover:-translate-y-1">
                            {{ $t('hero_cta_primary') }}
                        </Link>
                        <Link :href="route('about')" class="bg-white text-gray-700 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition">
                            {{ $t('hero_cta_secondary') }}
                        </Link>
                    </div>
                    <div v-else>
                        <Link :href="route('dashboard')" class="inline-block bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-xl transition">
                            {{ $t('nav_dashboard') }} →
                        </Link>
                    </div>
                </div>
            </div>
        </header>

        <section class="py-24 bg-gray-50 border-y border-gray-200">
            <div class="max-w-7xl mx-auto px-6">
                <div class="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                    <h2 class="text-indigo-600 font-bold tracking-widest uppercase mb-4 text-sm">{{ $t('eco_badge') }}</h2>
                    <h3 class="text-4xl md:text-5xl font-black text-gray-900 mb-6">{{ $t('eco_title') }}</h3>
                    <p class="text-xl text-gray-500">
                        {{ $t('eco_desc') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="col-span-1 sm:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-green-100 transition"></div>
                        <div class="relative z-10">
                            <div class="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🌱</div>
                            <h4 class="text-xl font-bold mb-2 text-gray-900">{{ $t('eco_habit_title') }}</h4>
                            <p class="text-gray-500 text-sm leading-relaxed">{{ $t('eco_habit_desc') }}</p>
                        </div>
                    </div>

                    <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
                        <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">💸</div>
                        <h4 class="text-xl font-bold mb-2 text-gray-900">{{ $t('eco_finance_title') }}</h4>
                        <p class="text-gray-500 text-sm">{{ $t('eco_finance_desc') }}</p>
                    </div>

                    <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                        <div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6">📝</div>
                        <h4 class="text-xl font-bold mb-2 text-gray-900">{{ $t('eco_daily_title') }}</h4>
                        <p class="text-gray-500 text-sm">{{ $t('eco_daily_desc') }}</p>
                    </div>

                    <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 fill-mode-both">
                        <div class="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🎯</div>
                        <h4 class="text-xl font-bold mb-2 text-gray-900">{{ $t('eco_goal_title') }}</h4>
                        <p class="text-gray-500 text-sm">{{ $t('eco_goal_desc') }}</p>
                    </div>

                    <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
                        <div class="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center text-3xl mb-6">📔</div>
                        <h4 class="text-xl font-bold mb-2 text-gray-900">{{ $t('eco_journal_title') }}</h4>
                        <p class="text-gray-500 text-sm">{{ $t('eco_journal_desc') }}</p>
                    </div>

                    <div class="col-span-1 sm:col-span-2 bg-indigo-950 text-white p-8 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-600 fill-mode-both">
                        <div class="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[80px] opacity-40"></div>
                        
                        <div class="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div class="flex-1">
                                <div class="flex gap-4 mb-4">
                                    <span class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">💼</span>
                                    <span class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">🎨</span>
                                </div>
                                <h4 class="text-xl font-bold mb-2">{{ $t('eco_job_title') }}</h4>
                                <p class="text-indigo-200 text-sm">{{ $t('eco_job_desc') }}</p>
                            </div>
                            <div class="bg-white/10 px-4 py-2 rounded-lg text-xs font-bold text-indigo-200 border border-white/10">
                                {{ $t('eco_coming_soon') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 bg-white overflow-hidden">
            <div class="max-w-6xl mx-auto px-6 space-y-32">
                
                <div class="grid md:grid-cols-2 gap-16 items-center">
                    <div class="animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both">
                        <div class="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6">📉</div>
                        <h2 class="text-4xl font-black mb-6 text-gray-900">{{ $t('prob_1_title') }}</h2>
                        <p class="text-gray-500 text-lg leading-relaxed mb-6">{{ $t('prob_1_desc') }}</p>
                        <ul class="space-y-3 text-gray-600 font-medium">
                            <li class="flex items-center gap-3"><span class="text-red-500">✕</span> {{ $t('prob_1_point_1') }}</li>
                            <li class="flex items-center gap-3"><span class="text-red-500">✕</span> {{ $t('prob_1_point_2') }}</li>
                        </ul>
                    </div>
                    <div class="relative h-[400px] bg-gray-50 rounded-[3rem] border border-gray-100 p-8 flex items-center justify-center overflow-hidden animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both">
                        <div class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                        <div class="bg-white p-4 rounded-xl shadow-lg border border-red-100 absolute top-20 left-10 transform -rotate-6 w-48 animate-pulse">
                            <div class="h-2 bg-red-200 w-1/2 rounded mb-2"></div>
                            <div class="text-xs text-red-500 font-bold">⚠️ Overdue 12 days</div>
                        </div>
                        <div class="bg-white p-4 rounded-xl shadow-lg border border-gray-100 absolute bottom-20 right-10 transform rotate-3 w-56">
                            <div class="h-2 bg-gray-200 w-3/4 rounded mb-2"></div>
                            <div class="text-xs text-gray-400">Task from 2024...</div>
                        </div>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-16 items-center">
                    <div class="order-2 md:order-1 relative h-[400px] bg-indigo-900 rounded-[3rem] p-8 flex items-center justify-center overflow-hidden animate-in slide-in-from-left-12 fade-in duration-700 delay-100 fill-mode-both">
                        <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-40"></div>
                        <div class="grid grid-cols-2 gap-4 w-64">
                            <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center"><div class="text-2xl mb-2">💰</div><div class="text-xs text-white/70">Excel</div></div>
                            <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center"><div class="text-2xl mb-2">✅</div><div class="text-xs text-white/70">Todo</div></div>
                            <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center col-span-2"><div class="text-2xl mb-2">🤯</div><div class="text-xs text-white/70">Chaos</div></div>
                        </div>
                    </div>
                    <div class="order-1 md:order-2 animate-in slide-in-from-right-12 fade-in duration-700 delay-200 fill-mode-both">
                        <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🧩</div>
                        <h2 class="text-4xl font-black mb-6 text-gray-900">{{ $t('prob_2_title') }}</h2>
                        <p class="text-gray-500 text-lg leading-relaxed mb-6">{{ $t('prob_2_desc') }}</p>
                        <p class="text-indigo-600 font-bold text-lg">{{ $t('prob_2_solution') }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-32 bg-gray-50 border-y border-gray-200">
            <div class="max-w-7xl mx-auto px-6">
                <div class="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                    <h2 class="text-indigo-600 font-bold tracking-widest uppercase mb-4 text-sm">{{ $t('sol_badge') }}</h2>
                    <h3 class="text-4xl font-black mb-6 text-gray-900">{{ $t('sol_title') }}</h3>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                        <div class="w-16 h-16 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center text-3xl mb-8">🌱</div>
                        <h4 class="text-2xl font-bold mb-4 text-gray-900">{{ $t('sol_card_1_title') }}</h4>
                        <p class="text-gray-500 leading-relaxed">{{ $t('sol_card_1_desc') }}</p>
                    </div>

                    <div class="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
                        <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-3xl mb-8">💸</div>
                        <h4 class="text-2xl font-bold mb-4 text-gray-900">{{ $t('sol_card_2_title') }}</h4>
                        <p class="text-gray-500 leading-relaxed">{{ $t('sol_card_2_desc') }}</p>
                    </div>

                    <div class="bg-indigo-600 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-200 text-white relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                        <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition"></div>
                        <div class="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-3xl mb-8">🔄</div>
                        <h4 class="text-2xl font-bold mb-4">{{ $t('sol_card_3_title') }}</h4>
                        <p class="text-indigo-100 leading-relaxed">{{ $t('sol_card_3_desc') }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 bg-white">
            <div class="max-w-3xl mx-auto px-6">
                <h2 class="text-3xl font-black text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">{{ $t('faq_title') }}</h2>
                
                <div class="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                    <div v-for="(faq, index) in [1, 2, 3]" :key="index" class="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300" :class="activeFaq === faq ? 'bg-gray-50 shadow-md' : 'bg-white'">
                        <button @click="toggleFaq(faq)" class="flex justify-between items-center w-full p-6 text-left font-bold text-gray-900 hover:text-indigo-600 transition">
                            <span>{{ $t(`faq_q${faq}`) }}</span>
                            <span class="text-indigo-600 transition-transform" :class="activeFaq === faq ? 'rotate-180' : ''">▼</span>
                        </button>
                        <div v-show="activeFaq === faq" class="px-6 pb-6 text-gray-500 leading-relaxed animate-in slide-in-from-top-2 duration-200">
                            {{ $t(`faq_a${faq}`) }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

<section class="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
            <div class="max-w-7xl mx-auto px-6">
                <div class="relative bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-indigo-100 border border-indigo-50 overflow-hidden flex flex-col md:flex-row items-center gap-12">
                    
                    <div class="absolute -right-20 -top-20 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
                    
                    <div class="w-full md:w-1/2 relative flex justify-center">
                        <div class="relative w-64 h-[500px] bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden transform md:-rotate-6 hover:rotate-0 transition-transform duration-500">
                            <div class="absolute top-0 w-full h-6 bg-slate-800 flex justify-center items-center">
                                <div class="w-16 h-4 bg-slate-900 rounded-full"></div>
                            </div>
                            <div class="p-4 mt-8 space-y-4">
                                <div class="h-32 bg-indigo-600/20 rounded-2xl animate-pulse"></div>
                                <div class="space-y-2">
                                    <div class="h-4 w-3/4 bg-slate-700 rounded-full"></div>
                                    <div class="h-4 w-1/2 bg-slate-700 rounded-full"></div>
                                </div>
                                <div class="grid grid-cols-2 gap-2 mt-8">
                                    <div class="h-20 bg-emerald-500/20 rounded-xl"></div>
                                    <div class="h-20 bg-blue-500/20 rounded-xl"></div>
                                </div>
                            </div>
                            <div class="absolute bottom-8 w-full px-6">
                                <div class="h-12 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/50 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-widest">DopaMind App</div>
                            </div>
                        </div>
                        <div class="absolute top-10 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-indigo-50 animate-bounce">
                            <span class="text-2xl">📱</span>
                        </div>
                    </div>

                    <div class="w-full md:w-1/2 text-center md:text-left relative z-10">
                        <span class="inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            Coming Soon
                        </span>
                        <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            {{ $t('waitlist_title') }}
                        </h2>
                        <p class="text-gray-500 text-lg mb-10 leading-relaxed">
                            {{ $t('waitlist_desc') }}
                        </p>

                        <form @submit.prevent="submitWaitlist" class="flex flex-col sm:flex-row gap-3">
                            <div class="flex-1">
                                <input 
                                    v-model="form.email"
                                    type="email" 
                                    :placeholder="$t('waitlist_input_placeholder')"
                                    class="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-medium transition-all"
                                    :class="{'border-red-500 bg-red-50': form.errors.email}"
                                    required
                                />
                                <div v-if="form.errors.email" class="text-red-500 text-xs mt-1 ml-2 font-bold text-left">{{ form.errors.email }}</div>
                            </div>
                            
                            <button 
                                :disabled="form.processing"
                                class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                {{ form.processing ? 'Sending...' : $t('waitlist_btn') }}
                            </button>
                        </form>

                        <div v-if="successMessage" class="mt-4 p-4 bg-green-50 border border-green-100 text-green-700 rounded-2xl font-bold text-sm animate-in fade-in slide-in-from-bottom-2">
                            ✅ {{ successMessage }}
                        </div>

                        <p class="mt-4 text-xs text-gray-400 font-medium">
                            {{ $t('waitlist_note') }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 px-6 text-center">
            <div class="max-w-5xl mx-auto bg-indigo-950 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-1000 delay-200 fill-mode-both">
                <div class="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse duration-[4000ms]"></div>
                <div class="absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse duration-[4000ms]"></div>

                <div class="relative z-10">
                    <h2 class="text-4xl md:text-6xl font-black mb-8 leading-tight">{{ $t('cta_final_title') }}</h2>
                    <p class="text-indigo-200 text-xl mb-12 max-w-2xl mx-auto">
                        {{ $t('cta_final_desc') }}
                    </p>
                    <Link :href="route('register')" class="inline-block bg-white text-indigo-950 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl">
                        {{ $t('cta_final_btn') }}
                    </Link>
                    <p class="mt-8 text-sm text-indigo-300 font-medium">{{ $t('cta_final_sub') }}</p>
                </div>
            </div>
        </section>

    </GuestLayout>
</template>