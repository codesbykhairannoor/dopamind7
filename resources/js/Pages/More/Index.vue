<script setup>
import { computed, ref, onMounted } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { 
    Gem, Sparkles, ArrowRight, Zap, Target, Briefcase, 
    Calendar, BookText, Settings, ShieldCheck, Search,
    LayoutGrid, Beaker, UserCircle, LogOut, Info
} from 'lucide-vue-next';
import { useGating } from '@/Composables/useGating';

const { isExplorer, isArchitect, isQuantum, isLegendary, canUse, demandAccess } = useGating();

const handleFeatureClick = (feature, targetRoute) => {
    demandAccess(feature, targetRoute);
};

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

onMounted(() => {
    // Animation trigger could go here
});
</script>

<template>
    <Head :title="$t('nav_more')" />

    <AuthenticatedLayout>
        <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 transition-colors duration-500 px-4 md:px-8">
            
            <!-- ⚡ HEADER & COMMAND BAR -->
            <div class="max-w-[1200px] mx-auto pt-16 md:pt-24 lg:pt-32 pb-16">
                
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
                    <div>
                        <div class="flex items-center gap-2 mb-4">
                            <span class="w-8 h-[2px] bg-indigo-500 rounded-full"></span>
                            <p class="text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-[0.4em] text-[9px]">
                                {{ isLegendary ? 'Legendary OS' : isQuantum ? 'Quantum Terminal' : isArchitect ? 'Architect Console' : 'Explorer Core' }}
                            </p>
                        </div>
                        <h1 class="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-500">
                             Launchpad
                        </h1>
                    </div>

                    <!-- Search Bar Placeholder (Notion-esque) -->
                    <div class="w-full md:w-80 group cursor-text">
                        <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm rounded-2xl flex items-center px-4 py-3.5 group-hover:shadow-md dark:group-hover:border-indigo-500/20 transition-all">
                            <Search :size="18" class="text-slate-400 mr-3" />
                            <span class="text-sm font-bold text-slate-400 uppercase tracking-widest">Quick Find...</span>
                            <div class="ml-auto flex items-center gap-1 opacity-20">
                                <span class="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px]">CMD</span>
                                <span class="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px]">K</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ⚡ EXPLORATION GRID -->
                <div class="space-y-20">
                    
                    <!-- [SECTION 1] CORE WORKSPACE -->
                    <section>
                        <div class="flex items-center gap-3 mb-8 px-2">
                             <LayoutGrid :size="16" class="text-slate-400" />
                             <h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Core Workspace</h2>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <!-- Habits -->
                            <Link :href="route('habits.index')" class="bento-card bento-card-hover p-8 flex flex-col items-start gap-12 group">
                                <div class="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center transition-all duration-300">
                                    <OneForMindIcon name="habit" size="28" />
                                </div>
                                <div class="w-full flex items-end justify-between">
                                    <div>
                                        <h3 class="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-1">Habit Systems</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Identity Building</p>
                                    </div>
                                    <ArrowRight :size="16" class="text-slate-300 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>

                            <!-- Planner -->
                            <Link :href="route('planner.index')" class="bento-card bento-card-hover p-8 flex flex-col items-start gap-12 group">
                                <div class="w-14 h-14 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center transition-all duration-300">
                                    <OneForMindIcon name="planner" size="28" />
                                </div>
                                <div class="w-full flex items-end justify-between">
                                    <div>
                                        <h3 class="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-1">Daily Flow</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Task Execution</p>
                                    </div>
                                    <ArrowRight :size="16" class="text-slate-300 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>

                            <!-- Finance -->
                            <Link :href="route('finance.index')" class="bento-card bento-card-hover p-8 flex flex-col items-start gap-12 group">
                                <div class="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center transition-all duration-300">
                                    <OneForMindIcon name="finance" size="28" />
                                </div>
                                <div class="w-full flex items-end justify-between">
                                    <div>
                                        <h3 class="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-1">Asset Lab</h3>
                                        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Resources & Flow</p>
                                    </div>
                                    <ArrowRight :size="16" class="text-slate-300 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </section>

                    <!-- [SECTION 2] THE NEURAL LAB (PRO/QUANTUM) -->
                    <section>
                        <div class="flex items-center gap-3 mb-8 px-2">
                             <Beaker :size="16" class="text-slate-400" />
                             <h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Scientific Pillar</h2>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            <!-- Goal Lab -->
                            <div @click="handleFeatureClick('goal', route('goals.index'))" class="bento-card bento-card-hover p-6 md:p-8 flex flex-col gap-6 cursor-pointer group">
                                <div class="flex items-center justify-between">
                                    <div class="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center">
                                        <Target :size="20" />
                                    </div>
                                    <Gem v-if="isExplorer" :size="14" class="text-amber-500/30" />
                                </div>
                                <div>
                                    <h4 class="font-black text-slate-800 dark:text-white text-sm mb-1 line-clamp-1">Grand Missions</h4>
                                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Goal Engine</p>
                                </div>
                            </div>

                            <!-- Journal -->
                            <div @click="handleFeatureClick('journal', route('journal.index'))" class="bento-card bento-card-hover p-6 md:p-8 flex flex-col gap-6 cursor-pointer group">
                                <div class="flex items-center justify-between">
                                    <div class="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center">
                                        <BookText :size="20" />
                                    </div>
                                    <Gem v-if="isExplorer" :size="14" class="text-rose-500/30" />
                                </div>
                                <div>
                                    <h4 class="font-black text-slate-800 dark:text-white text-sm mb-1 line-clamp-1">Personal Logs</h4>
                                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Deep Review</p>
                                </div>
                            </div>

                            <!-- Career -->
                            <div @click="handleFeatureClick('job', route('jobs.index'))" class="bento-card bento-card-hover p-6 md:p-8 flex flex-col gap-6 cursor-pointer group">
                                <div class="flex items-center justify-between">
                                    <div class="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                                        <Briefcase :size="20" />
                                    </div>
                                    <Gem v-if="isExplorer" :size="14" class="text-blue-500/30" />
                                </div>
                                <div>
                                    <h4 class="font-black text-slate-800 dark:text-white text-sm mb-1 line-clamp-1">Career Transmissions</h4>
                                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Market Opt.</p>
                                </div>
                            </div>

                            <!-- Neural Hub -->
                            <div @click="handleFeatureClick('ai_coach', route('coach.index'))" class="bento-card bento-card-hover p-6 md:p-8 flex flex-col gap-6 cursor-pointer group border-indigo-500/20 bg-indigo-50/10 dark:bg-indigo-500/5">
                                <div class="flex items-center justify-between">
                                    <div class="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none">
                                        <Sparkles :size="20" />
                                    </div>
                                    <Gem v-if="!isQuantum" :size="14" class="text-indigo-500/30" />
                                </div>
                                <div>
                                    <h4 class="font-black text-indigo-600 dark:text-indigo-400 text-sm mb-1 line-clamp-1">Neural Hub</h4>
                                    <p class="text-[9px] font-bold text-indigo-400/60 uppercase tracking-widest">AI Synthesis</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- [SECTION 3] SYSTEM CORE -->
                    <section>
                        <div class="flex items-center gap-3 mb-8 px-2">
                             <Settings :size="16" class="text-slate-400" />
                             <h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">System Manifest</h2>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <!-- Settings -->
                            <Link :href="route('profile.edit')" class="bento-card hover:bg-slate-50 dark:hover:bg-white/5 p-6 flex flex-col gap-4">
                                <div class="text-slate-400"><UserCircle :size="18" /></div>
                                <h4 class="text-xs font-black text-slate-800 dark:text-white tracking-widest uppercase">{{ $t('profile_settings') }}</h4>
                            </Link>

                            <!-- Billing -->
                            <Link :href="route('billing')" class="bento-card hover:bg-slate-50 dark:hover:bg-white/5 p-6 flex flex-col gap-4">
                                <div class="text-slate-400"><Gem :size="18" /></div>
                                <h4 class="text-xs font-black text-slate-800 dark:text-white tracking-widest uppercase">Tier Console</h4>
                            </Link>

                            <!-- About/Help -->
                            <Link :href="route('about')" class="bento-card hover:bg-slate-50 dark:hover:bg-white/5 p-6 flex flex-col gap-4">
                                <div class="text-slate-400"><Info :size="18" /></div>
                                <h4 class="text-xs font-black text-slate-800 dark:text-white tracking-widest uppercase">Knowledge Base</h4>
                            </Link>

                            <!-- Logout -->
                            <Link :href="route('logout')" method="post" as="button" class="bento-card hover:bg-rose-50 dark:hover:bg-rose-500/10 p-6 flex flex-col gap-4 text-left">
                                <div class="text-rose-400"><LogOut :size="18" /></div>
                                <h4 class="text-xs font-black text-rose-500 tracking-widest uppercase">Terminate Session</h4>
                            </Link>
                        </div>
                    </section>
                </div>

                <!-- ⚡ PREMIUM LIFECYCLE CTA -->
                <div v-if="ctaConfig" class="mt-32">
                     <Link :href="route(ctaConfig.route)" class="block bg-slate-900 dark:bg-indigo-950 rounded-[3rem] p-12 text-white relative overflow-hidden group shadow-2xl ultra-shadow border border-white/10 active:scale-[0.98] transition-all">
                        <div class="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-br from-indigo-600/30 via-transparent to-transparent opacity-60"></div>
                        <div class="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>

                        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
                            <div class="max-w-xl">
                                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-black mb-10 uppercase tracking-[0.2em] backdrop-blur-md border border-indigo-500/30">
                                    <ShieldCheck :size="12" />
                                    <span>{{ ctaConfig.label }}</span>
                                </div>
                                <h4 class="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">{{ ctaConfig.title }}</h4>
                                <p class="text-indigo-200/60 text-base font-bold leading-relaxed">{{ ctaConfig.desc }}</p>
                            </div>
                            
                            <div class="px-12 py-6 bg-white text-slate-900 rounded-2xl font-black text-sm shadow-2xl hover:bg-indigo-50 transition-all flex items-center gap-4 group-hover:translate-x-1">
                                {{ ctaConfig.btnText }}
                                <ArrowRight :size="20" stroke-width="3" />
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.bento-card {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
