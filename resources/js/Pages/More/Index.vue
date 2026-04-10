<script setup>
import { computed, ref } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { 
    Gem, ArrowRight, Target, Briefcase, 
    BookText, ShieldCheck, Search,
    LogOut, Info, ChevronRight,
    Layers, Zap, Calendar, TrendingUp
} from 'lucide-vue-next';
import { useGating } from '@/Composables/useGating';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const { isExplorer, isArchitect, isQuantum, isLegendary, demandAccess } = useGating();

const handleFeatureClick = (feature, targetRoute) => {
    demandAccess(feature, targetRoute);
};

const tierStatus = computed(() => {
    if (isLegendary.value) return 'legendary_os';
    if (isQuantum.value) return 'quantum_terminal';
    if (isArchitect.value) return 'architect_console';
    return 'explorer_core';
});

const ctaConfig = computed(() => {
    if (isLegendary.value) return null;
    if (isQuantum.value) return {
        label: 'Quantum Active',
        title: 'Neural access granted.',
        desc: 'You are operating within the full Neural Ecosystem.',
        btnText: 'Subscription Console',
        route: 'billing'
    };
    if (isArchitect.value) return {
        label: 'Enhance to Quantum',
        title: 'Unlock Synthetic Intelligence.',
        desc: 'Access neural forecasting and automated workflow manifest tools.',
        btnText: 'Quantum Upgrade',
        route: 'billing'
    };
    return {
        label: 'Architect Tier',
        title: 'Design Without Limits.',
        desc: 'Unlock the Platinum Suite and the high-performance ecosystem.',
        btnText: 'Initiate Upgrade',
        route: 'billing'
    };
});
</script>

<template>
    <Head :title="$t('nav_more')" />

    <AuthenticatedLayout>
        <div class="min-h-screen bg-white dark:bg-slate-950 pb-40 transition-colors duration-500">
            <!-- ⚡ MINIMALIST HEADER -->
            <div class="max-w-[700px] mx-auto pt-20 md:pt-32 px-6">
                
                <div class="mb-16">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                            <Layers :size="16" />
                        </div>
                        <p class="text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-[0.4em] text-[8px]">
                            {{ $t(tierStatus) }}
                        </p>
                    </div>
                    <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
                         {{ $t('more_launcher_title') }}
                    </h1>
                    <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">{{ $t('more_launcher_subtitle') }}</p>
                </div>

                <!-- ⚡ SEARCH BAR (Notion-esque) -->
                <div class="mb-16">
                    <div class="bg-indigo-50/30 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl flex items-center px-4 py-3 group focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
                        <Search :size="18" class="text-slate-300 mr-3" />
                        <input type="text" :placeholder="$t('quick_find')" class="bg-transparent border-none focus:ring-0 w-full text-sm font-bold text-slate-600 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-700 uppercase tracking-widest" />
                        <div class="ml-auto flex items-center gap-1 opacity-20 hidden sm:flex">
                            <span class="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px]">CMD</span>
                            <span class="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px]">K</span>
                        </div>
                    </div>
                </div>

                <!-- ⚡ MINIMALIST LIST LAYOUT -->
                <div class="space-y-16">
                    
                    <!-- [ARCHITECTURE SUITE] -->
                    <section>
                        <div class="flex items-center gap-3 mb-8 px-1">
                            <div class="w-1 h-3 bg-indigo-500 rounded-full"></div>
                            <h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{{ $t('section_architecture') }}</h2>
                        </div>
                        <div class="space-y-1">
                            <!-- Planner -->
                            <Link :href="route('planner.index')" class="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                                <div class="flex items-center gap-5">
                                    <div class="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-sm">
                                        <Zap :size="20" stroke-width="2.5" />
                                    </div>
                                    <div>
                                        <h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight">{{ $t('feature_planner_title') }}</h4>
                                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{{ $t('feature_planner_desc') }}</p>
                                    </div>
                                </div>
                                <ChevronRight :size="16" class="text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                            </Link>

                            <!-- Finance -->
                            <Link :href="route('finance.index')" class="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                                <div class="flex items-center gap-5">
                                    <div class="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
                                        <TrendingUp :size="20" stroke-width="2.5" />
                                    </div>
                                    <div>
                                        <h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight">{{ $t('feature_finance_title') }}</h4>
                                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{{ $t('feature_finance_desc') }}</p>
                                    </div>
                                </div>
                                <ChevronRight :size="16" class="text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                            </Link>

                            <!-- Goal Manifest -->
                            <div @click="handleFeatureClick('goal', route('goals.index'))" class="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                                <div class="flex items-center gap-5">
                                    <div class="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm">
                                        <Target :size="20" stroke-width="2.5" />
                                    </div>
                                    <div>
                                        <h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight">{{ $t('feature_goal_title') }}</h4>
                                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{{ $t('feature_goal_desc') }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <Gem v-if="isExplorer" :size="12" class="text-amber-500 opacity-30" />
                                    <ChevronRight :size="16" class="text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- [MANIFESTATION LAB] -->
                    <section>
                        <div class="flex items-center gap-3 mb-8 px-1">
                            <div class="w-1 h-3 bg-rose-500 rounded-full"></div>
                            <h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{{ $t('section_manifestation') }}</h2>
                        </div>
                        <div class="space-y-1">
                            <!-- Journal -->
                            <div @click="handleFeatureClick('journal', route('journal.index'))" class="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                                <div class="flex items-center gap-5">
                                    <div class="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-sm">
                                        <BookText :size="20" stroke-width="2.5" />
                                    </div>
                                    <div>
                                        <h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight">{{ $t('feature_journal_title') }}</h4>
                                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{{ $t('feature_journal_desc') }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <Gem v-if="isExplorer" :size="12" class="text-rose-500 opacity-30" />
                                    <ChevronRight :size="16" class="text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>

                             <!-- Calendar -->
                             <div @click="handleFeatureClick('calendar', route('calendar.index'))" class="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                                <div class="flex items-center gap-5">
                                    <div class="w-11 h-11 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shadow-sm">
                                        <Calendar :size="20" stroke-width="2.5" />
                                    </div>
                                    <div>
                                        <h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight">{{ $t('feature_calendar_title') }}</h4>
                                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{{ $t('feature_calendar_desc') }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <Gem v-if="isExplorer" :size="12" class="text-violet-500 opacity-30" />
                                    <ChevronRight :size="16" class="text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>

                            <!-- Career Pipeline -->
                            <div @click="handleFeatureClick('job', route('jobs.index'))" class="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                                <div class="flex items-center gap-5">
                                    <div class="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
                                        <Briefcase :size="20" stroke-width="2.5" />
                                    </div>
                                    <div>
                                        <h4 class="font-black text-slate-800 dark:text-white text-sm tracking-tight">{{ $t('feature_job_title') }}</h4>
                                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{{ $t('feature_job_desc') }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <Gem v-if="isExplorer" :size="12" class="text-blue-500 opacity-30" />
                                    <ChevronRight :size="16" class="text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- [SYSTEM CORE] -->
                    <section>
                        <div class="flex items-center gap-3 mb-8 px-1">
                            <div class="w-1 h-3 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                            <h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{{ $t('section_system') }}</h2>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Link :href="route('billing')" class="group flex items-center gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md">
                                <Gem :size="18" class="text-indigo-400" />
                                <span class="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{{ $t('sys_billing_title') }}</span>
                            </Link>
                            <Link :href="route('about')" class="group flex items-center gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md">
                                <Info :size="18" class="text-slate-400" />
                                <span class="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{{ $t('sys_help_title') }}</span>
                            </Link>
                            <Link :href="route('logout')" method="post" as="button" class="group flex items-center gap-4 p-5 rounded-2xl bg-rose-50 dark:bg-rose-500/5 border border-rose-100/50 dark:border-rose-500/10 transition-all hover:bg-rose-100 dark:hover:bg-rose-500/10 text-left">
                                <LogOut :size="18" class="text-rose-400" />
                                <span class="text-[10px] font-black text-rose-500 uppercase tracking-widest">{{ $t('sys_logout_title') }}</span>
                            </Link>
                        </div>
                    </section>
                </div>

                <!-- ⚡ CTA -->
                <div v-if="ctaConfig" class="mt-24 pt-12 border-t border-slate-100 dark:border-white/5">
                    <Link :href="route(ctaConfig.route)" class="group block p-8 rounded-[2.5rem] bg-slate-900 dark:bg-indigo-950 border border-white/5 relative overflow-hidden shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99]">
                        <div class="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-1000"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-2 mb-6">
                                <ShieldCheck :size="14" class="text-indigo-400" />
                                <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{{ ctaConfig.label }}</span>
                            </div>
                            <h3 class="text-2xl font-black text-white tracking-tight mb-2 leading-tight max-w-xs">{{ ctaConfig.title }}</h3>
                            <p class="text-xs font-bold text-slate-500 mb-8 max-w-xs leading-relaxed">{{ ctaConfig.desc }}</p>
                            <div class="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                                {{ ctaConfig.btnText }} <ArrowRight :size="14" class="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>

                <!-- FOOTER LOGO -->
                <div class="mt-24 pb-20 flex flex-col items-center opacity-10">
                    <OneForMindIcon name="logo" size="32" class="grayscale mb-4" />
                    <p class="text-[10px] font-black uppercase tracking-[0.5em]">OneForMind OS</p>
                </div>

            </div>
        </div>
    </AuthenticatedLayout>
</template>
