<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage, Link } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useGating } from '@/Composables/useGating';

const { isExplorer, isArchitect, isQuantum, isLegendary } = useGating();

const user = usePage().props.auth.user;
const props = defineProps({
    synergy: Object,
    trend: Array,
    stats: Object,
});

const globalInsight = ref(null);
const loadingInsight = ref(false);

const fetchInsight = async () => {
    if (loadingInsight.value) return;
    
    loadingInsight.value = true;
    try {
        const response = await axios.get(route('dashboard.insight'));
        globalInsight.value = response.data;
    } catch (error) {
        console.error('Failed to fetch neural insight:', error);
    } finally {
        loadingInsight.value = false;
    }
};

defineOptions({ layout: AuthenticatedLayout });

const greetingKey = computed(() => {
    const hour = new Date().getHours();
    if (hour < 11) return 'dash_greet_morning';
    if (hour < 15) return 'dash_greet_afternoon';
    if (hour < 19) return 'dash_greet_evening';
    return 'dash_greet_night';
});

const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
};

// Hitung overall score hari ini (rata-rata dari habit dan planner)
const overallScore = computed(() => {
    if (!props.synergy) return 0;
    let scores = [props.synergy.habits.percent, props.synergy.planner.percent];
    if (props.synergy.goals.top_goal) scores.push(props.synergy.goals.top_goal.percent);
    scores.push(props.synergy.journal.is_written ? 100 : 0);
    
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
});

// 🔥 MOBILE DETECTION
const isMobile = ref(false);
onMounted(() => {
    isMobile.value = window.innerWidth < 768;
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768;
    });
});
</script>

<template>
    <Head :title="$t('nav_dashboard')" />

    <div class="w-full lg:max-w-[96%] mx-auto p-4 md:p-8 space-y-6 lg:space-y-12 pb-32">
        
        <!-- 📱 PREMIUM MOBILE BENTO EXPERIENCE -->
        <template v-if="isMobile && synergy">
            <!-- 💍 Synergy Ring & Header -->
            <header id="mobile-dash-header" class="pt-6 pb-4">
                <div class="flex items-center justify-between gap-6 mb-10">
                    <div class="space-y-1 py-2">
                        <!-- TIER BADGE -->
                        <div v-if="isExplorer" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            <span class="text-[8px] font-black text-slate-500 uppercase tracking-widest">Explorer</span>
                        </div>
                        <div v-else-if="isArchitect" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 mb-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                            <span class="text-[8px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Architect</span>
                        </div>
                        <div v-else-if="isQuantum" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950 border border-violet-100 dark:border-violet-900 mb-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
                            <span class="text-[8px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest">Quantum AI</span>
                        </div>
                        <div v-else-if="isLegendary" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 mb-2 shadow-sm">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            <span class="text-[8px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">Legendary</span>
                        </div>

                        <p id="dash-date" class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{{ synergy.date_formatted }}</p>
                        <h1 id="dash-greeting" class="text-3xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                            {{ $t(greetingKey) }},<br />
                            <span class="text-indigo-600 dark:text-indigo-400">{{ user.name.split(' ')[0] }}</span>
                        </h1>
                    </div>
                    
                    <div id="synergy-ring-container" class="relative group active:scale-95 transition-transform duration-500 shrink-0">
                        <!-- Glow Effect -->
                        <div class="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-2xl animate-pulse"></div>
                        
                        <!-- The Ring -->
                        <div class="relative w-28 h-28 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none">
                            <svg class="absolute w-[90%] h-[90%] -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="5" class="text-slate-50 dark:text-slate-800" />
                                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" 
                                    :stroke-dasharray="276" :stroke-dashoffset="276 - (276 * overallScore / 100)"
                                    :class="isQuantum ? 'text-violet-600 dark:text-violet-500' : 'text-indigo-600 dark:text-indigo-500'" 
                                    class="transition-all duration-[2000ms]" />
                            </svg>
                            <div class="text-center z-10">
                                <span class="block text-3xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">{{ overallScore }}%</span>
                                <span class="text-[8px] font-bold text-slate-400 tracking-widest uppercase">SYNERGY</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 🧠 TIER SPECIFIC HUB -->
                <div id="tier-hub" class="mb-6">
                    <!-- EXPLORER: Discovery Hub -->
                    <Link v-if="isExplorer" :href="route('billing')" class="block bg-slate-900 p-6 rounded-[2rem] text-white relative overflow-hidden group active:scale-[0.98] transition-all">
                        <div class="absolute -right-4 -bottom-4 opacity-20">
                            <OneForMindIcon name="platinum" size="100" />
                        </div>
                        <div class="relative z-10 space-y-3">
                            <div class="flex items-center gap-2">
                                <OneForMindIcon name="sparkles" size="14" class="text-indigo-400" />
                                <span class="text-[9px] font-black uppercase tracking-widest text-indigo-400">Upgrade Discovery</span>
                            </div>
                            <h4 class="text-lg font-black leading-tight">Unlock Neural Intelligence</h4>
                            <p class="text-[10px] font-medium text-slate-400">Upgrade to Architect to sync your life with AI Insights.</p>
                        </div>
                    </Link>

                    <!-- ARCHITECT: Productivity Hub -->
                    <div v-else-if="isArchitect" class="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                <OneForMindIcon name="habit" size="20" />
                            </div>
                            <div>
                                <span class="block text-xs font-black text-indigo-900 dark:text-indigo-100">Architect Mode</span>
                                <span class="text-[9px] font-bold text-indigo-600/60 dark:text-indigo-400/60">Managing {{ synergy.habits.total }} Active Habits</span>
                            </div>
                        </div>
                        <div class="text-right">
                             <div class="text-[10px] font-black text-indigo-600">{{ synergy.habits.percent }}%</div>
                             <div class="text-[8px] font-bold text-slate-400 uppercase tracking-tight">MOMENTUM</div>
                        </div>
                    </div>

                    <!-- QUANTUM: Neural AI Hub -->
                    <div v-else-if="isQuantum" class="bg-violet-600 dark:bg-violet-900/60 p-6 rounded-[2.2rem] text-white shadow-xl shadow-violet-200 dark:shadow-none border border-violet-400/20 relative overflow-hidden">
                        <div class="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-3">
                                    <OneForMindIcon name="sparkles" size="18" class="animate-pulse" />
                                    <span class="text-[10px] font-black uppercase tracking-widest opacity-80">Neural Active Insight</span>
                                </div>
                                <div class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[8px] font-black uppercase tracking-widest border border-white/10">SYNCED</div>
                            </div>
                            <p v-if="loadingInsight" class="text-sm font-bold animate-pulse italic">Calibrating Neural Sync...</p>
                            <p v-else class="text-base font-black leading-tight tracking-tight drop-shadow-sm">{{ globalInsight?.summary || "Synergy looks stable. Focus on your top habit to maximize momentum." }}</p>
                        </div>
                    </div>

                    <!-- LEGENDARY: Monolith Hub -->
                    <div v-else-if="isLegendary" class="bg-white dark:bg-black p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center shadow-lg">
                        <div class="w-12 h-12 bg-amber-50 dark:bg-amber-950 rounded-2xl mx-auto flex items-center justify-center text-amber-500 mb-4 border border-amber-100 dark:border-amber-900">
                            <OneForMindIcon name="platinum" size="24" />
                        </div>
                        <h4 class="text-xl font-black text-slate-900 dark:text-amber-100 tracking-tighter mb-1">Monolith Performance</h4>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lifetime mastery in progress</p>
                    </div>
                </div>
            </header>

            <!-- 🍱 Main Content Bento Grid -->
            <div class="grid grid-cols-12 gap-4">
                <!-- 📋 Next Up Widget (Large) -->
                <Link 
                    id="widget-planner"
                    :href="route('planner.index')" 
                    class="col-span-12 group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all relative overflow-hidden"
                >
                    <div class="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                        <OneForMindIcon name="planner" size="140" />
                    </div>
                    
                    <div class="flex items-center justify-between mb-6 relative z-10">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center">
                                <OneForMindIcon name="planner" size="24" />
                            </div>
                            <h3 class="text-xl font-black text-slate-900 dark:text-white leading-none">Schedule</h3>
                        </div>
                        <span class="text-[10px] font-black px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-full border border-slate-100 dark:border-slate-700 uppercase">{{ synergy.planner.upcoming.length }} Pending</span>
                    </div>

                    <div class="space-y-3 relative z-10">
                        <div v-if="synergy.planner.upcoming.length > 0" class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100/50 dark:border-white/5">
                            <span class="text-xs font-black text-indigo-600 dark:text-indigo-400 tabular-nums">{{ synergy.planner.upcoming[0].start_time }}</span>
                            <span class="text-sm font-black text-slate-700 dark:text-slate-200 truncate">{{ synergy.planner.upcoming[0].title }}</span>
                        </div>
                        <div v-else class="text-center py-4 text-slate-400 text-xs font-bold bg-slate-50 dark:bg-black/10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                            {{ $t('dash_all_tasks_done') }}
                        </div>
                    </div>
                </Link>

                <!-- 🌱 Habit Pulse (Mini Card) -->
                <Link 
                    id="widget-habits"
                    :href="route('habits.index')" 
                    class="col-span-6 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all"
                >
                    <div class="w-11 h-11 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-4">
                        <OneForMindIcon name="habit" size="22" />
                    </div>
                    <div class="space-y-1">
                        <h4 class="text-base font-black text-slate-900 dark:text-white leading-tight">Habits</h4>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ synergy.habits.completed }}/{{ synergy.habits.total }} Done</p>
                    </div>
                    <div class="mt-4 flex items-center gap-2">
                        <div class="flex-grow bg-slate-50 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-indigo-600 h-full rounded-full transition-all duration-1000" :style="`width: ${synergy.habits.percent}%`"></div>
                        </div>
                        <span class="text-[10px] font-black text-indigo-600">{{ synergy.habits.percent }}%</span>
                    </div>
                </Link>

                <!-- 📓 Insight Slot (Mini Card) -->
                <Link 
                    id="widget-journal"
                    :href="synergy.journal.is_written ? route('journal.write', synergy.journal.id) : route('journal.index')" 
                    class="col-span-6 bg-slate-900 p-6 rounded-[2.5rem] shadow-lg active:scale-[0.98] transition-all relative overflow-hidden"
                >
                    <div class="relative z-10 h-full flex flex-col justify-between">
                        <div class="w-11 h-11 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-4">
                            <OneForMindIcon name="journal" size="22" />
                        </div>
                        <div class="space-y-1">
                            <h4 class="text-base font-black text-white leading-tight">Journal</h4>
                            <p class="text-[10px] font-bold" :class="synergy.journal.is_written ? 'text-emerald-400' : 'text-slate-400 uppercase tracking-widest'">
                                {{ synergy.journal.is_written ? 'Written' : 'Empty' }}
                            </p>
                        </div>
                    </div>
                    <OneForMindIcon name="journal" size="100" class="absolute -right-8 -bottom-8 opacity-5 text-white" />
                </Link>

                <!-- 💰 Prime Finance (Full Width Card) - TIER DIFFERENTIATED -->
                <Link 
                    id="widget-finance"
                    :href="route('finance.index')" 
                    class="col-span-12 group p-8 rounded-[2.8rem] transition-all relative overflow-hidden"
                    :class="isExplorer ? 'bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800' : 'bg-indigo-600 shadow-xl shadow-indigo-100 dark:shadow-none text-white'"
                >
                    <template v-if="!isExplorer">
                        <!-- Decorative Circles -->
                        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div class="absolute -left-4 -bottom-10 w-24 h-24 bg-black/10 rounded-full"></div>
                        <OneForMindIcon name="finance" size="200" class="absolute -right-16 -top-16 opacity-10 group-hover:rotate-12 transition-transform duration-[2000ms]" />

                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-8">
                                <h3 class="text-2xl font-black tracking-tight">Finance Ops</h3>
                                <div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                                    <span class="text-xs font-black">{{ $t('dash_income') }}</span>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-6">
                                <div class="space-y-1">
                                    <p class="text-[10px] font-bold text-indigo-100 uppercase tracking-widest opacity-80">Expenses</p>
                                    <p class="text-xl font-black tracking-tight truncate">{{ formatRupiah(synergy.finance.expense) }}</p>
                                </div>
                                <div class="space-y-1">
                                    <p class="text-[10px] font-bold text-emerald-100 uppercase tracking-widest opacity-80">Income</p>
                                    <p class="text-xl font-black text-emerald-300 tracking-tight truncate">+{{ formatRupiah(synergy.finance.income) }}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                         <!-- Discovery Mode for Explorer -->
                         <div class="flex items-center justify-between gap-6">
                             <div class="space-y-2">
                                 <h3 class="text-xl font-black text-slate-900 dark:text-white leading-tight">Monetary Intelligence</h3>
                                 <p class="text-[10px] font-medium text-slate-500">Track your cashflow with Architect premium analytics.</p>
                                 <div class="pt-2">
                                     <span class="px-3 py-1 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest rounded-lg">Upgrade Now</span>
                                 </div>
                             </div>
                             <div class="w-20 h-20 bg-white dark:bg-slate-900 rounded-[2rem] flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 dark:border-slate-800 shrink-0">
                                 <OneForMindIcon name="finance" size="32" />
                             </div>
                         </div>
                    </template>
                </Link>

                <!-- 🎯 Goal Tracker (Wide Mini) -->
                <Link 
                    id="widget-goals"
                    :href="route('goals.index')" 
                    class="col-span-12 group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all flex items-center justify-between gap-4"
                >
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                            <OneForMindIcon name="goal" size="24" />
                        </div>
                        <div>
                            <h4 class="text-base font-black text-slate-800 dark:text-white leading-tight">Goal Milestones</h4>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ synergy.goals.active }} Active Ambitions</p>
                        </div>
                    </div>
                    <div v-if="synergy.goals.top_goal" class="text-right shrink-0">
                         <div class="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full">{{ synergy.goals.top_goal.percent }}%</div>
                    </div>
                </Link>
            </div>
        </template>

        <!-- 🖥️ DESKTOP REFINED BENTO -->
        <template v-else-if="synergy">
            <!-- Original Desktop Dashboard Content (Refined Typography) -->
            <header class="relative group">
                <div class="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-14 border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none transition-all duration-500">
                    <div class="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]"></div>
                    
                    <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div class="flex-1 space-y-5 text-center md:text-left">
                            <div class="flex items-center justify-center md:justify-start gap-4">
                                <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span class="text-xs font-bold text-slate-500 dark:text-slate-400">{{ synergy.date_formatted }}</span>
                                </div>
                                <!-- TIER LABEL -->
                                <div v-if="isExplorer" class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 py-1.5 px-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                                    Discovery Mode
                                </div>
                                <div v-else-if="isQuantum" class="text-[9px] font-black uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 py-1.5 px-4 bg-violet-50 dark:bg-violet-950/40 rounded-xl border border-violet-100 dark:border-violet-900/50">
                                    Neural Active
                                </div>
                            </div>
                            
                            <h1 class="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                                {{ $t(greetingKey) }},<br />
                                <span :class="isQuantum ? 'text-violet-600 dark:text-violet-400' : 'text-indigo-600 dark:text-indigo-400'">{{ user.name }}</span>
                            </h1>
                        </div>

                        <!-- Synergy Score -->
                        <div class="flex flex-col items-center gap-6" :class="{ 'md:order-first': isQuantum }">
                            <div class="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
                                <svg class="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="4" class="text-slate-50 dark:text-slate-800" />
                                    <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" 
                                        :stroke-dasharray="276" :stroke-dashoffset="276 - (276 * overallScore / 100)"
                                        :class="isQuantum ? 'text-violet-600 dark:text-violet-500' : 'text-indigo-600 dark:text-indigo-500'" 
                                        class="transition-all duration-[1500ms]" />
                                </svg>
                                <div class="text-center">
                                    <span class="block text-5xl md:text-6xl font-black text-slate-900 dark:text-white tabular-nums">{{ overallScore }}%</span>
                                    <span class="text-xs font-bold text-slate-400">{{ $t('dash_synergy_today') }}</span>
                                </div>
                            </div>

                            <button v-if="!isExplorer && !globalInsight && !loadingInsight" @click="fetchInsight" class="group/btn relative px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg transition-all active:scale-95 overflow-hidden">
                                <div class="flex items-center gap-3 relative z-10">
                                    <OneForMindIcon name="sparkles" size="16" :class="isQuantum ? 'text-violet-600' : 'text-indigo-600'" />
                                    <span class="text-xs font-black text-slate-700 dark:text-slate-300">Neural Sync Engine</span>
                                </div>
                            </button>

                            <!-- Explorer Upsell -->
                            <Link v-else-if="isExplorer" :href="route('billing')" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 py-2 px-6 border border-indigo-100 rounded-xl hover:bg-indigo-50 transition-all">
                                Unlock Neural Insights
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Bento Grid (Desktop only) -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
                <!-- HABITS -->
                <Link :href="route('habits.index')" 
                    class="col-span-1 md:col-span-6 lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between overflow-hidden relative"
                >
                    <div class="relative z-10 space-y-6">
                        <div class="flex justify-between items-start">
                            <div class="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 group-hover:scale-110 transition-transform">
                                <OneForMindIcon name="habit" size="28" stroke-width="3" />
                            </div>
                            <div class="bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 px-4 py-1.5 rounded-xl text-xs font-black">{{ synergy.habits.completed }} / {{ synergy.habits.total }}</div>
                        </div>
                        
                        <h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{{ $t('dash_habit_title') }}</h3>

                        <!-- Neural Insight (Subtle Card) -->
                        <div v-if="loadingInsight || globalInsight?.categories?.habits" 
                            class="p-5 rounded-2xl border"
                            :class="isQuantum ? 'bg-violet-500/10 border-violet-500/20 backdrop-blur-md' : 'bg-indigo-50/50 dark:bg-indigo-500/5 border-indigo-100/50 dark:border-indigo-500/10'"
                        >
                            <div class="flex items-center gap-2 mb-2">
                                <OneForMindIcon name="sparkles" size="14" :class="[isQuantum ? 'text-violet-400' : 'text-indigo-500', { 'animate-spin': loadingInsight }]" />
                                <span class="text-[9px] font-black uppercase tracking-widest" :class="isQuantum ? 'text-violet-400' : 'text-indigo-400'">Neural Sync</span>
                            </div>
                            <p v-if="loadingInsight" class="text-xs font-bold text-slate-400 animate-pulse tracking-tight italic">Calibrating routines...</p>
                            <p v-else class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug">{{ globalInsight?.categories?.habits }}</p>
                        </div>
                    </div>

                    <div class="mt-8 space-y-3">
                        <div class="w-full bg-slate-50 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                            <div class="bg-indigo-600 h-full rounded-full transition-all duration-1000" :style="`width: ${synergy.habits.percent}%`"></div>
                        </div>
                        <div class="flex justify-between text-[10px] font-black text-slate-400">
                            <span>{{ $t('dash_progress') }}</span>
                            <span class="text-indigo-600">{{ synergy.habits.percent }}%</span>
                        </div>
                    </div>
                </Link>

                <!-- PLANNER -->
                <Link :href="route('planner.index')"
                    class="col-span-1 md:col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between overflow-hidden relative"
                >
                    <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="space-y-6">
                            <div class="flex items-center gap-5">
                                <div class="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <OneForMindIcon name="planner" size="28" stroke-width="3" />
                                </div>
                                <div>
                                    <h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{{ $t('dash_planner_title') }}</h3>
                                    <p class="text-sm font-bold text-slate-400">{{ synergy.planner.completed }} / {{ synergy.planner.total }} {{ $t('dash_tasks_done') }}</p>
                                </div>
                            </div>

                            <!-- Neural Insight (Subtle) -->
                            <div v-if="loadingInsight || globalInsight?.categories?.planner" class="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100/50 dark:border-emerald-500/10 p-5 rounded-2xl">
                                 <div class="flex items-center gap-2 mb-2">
                                    <OneForMindIcon name="sparkles" size="14" class="text-emerald-500" :class="{ 'animate-spin': loadingInsight }" />
                                    <span class="text-[9px] font-black text-emerald-500/70">Efficiency Boost</span>
                                </div>
                                <p v-if="loadingInsight" class="text-xs font-bold text-slate-400 animate-pulse tracking-tight italic">Analyzing task density...</p>
                                <p v-else class="text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug">{{ globalInsight?.categories?.planner }}</p>
                            </div>
                        </div>

                        <div class="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 h-full">
                            <h4 class="text-[10px] font-black text-slate-400 mb-4">{{ $t('dash_upcoming') }}</h4>
                            <div v-if="synergy.planner.upcoming.length > 0" class="space-y-3">
                                <div v-for="task in synergy.planner.upcoming" :key="task.id" class="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-transparent hover:border-indigo-100 transition-all truncate text-left">
                                    <span class="text-xs font-black text-indigo-600 tabular-nums">{{ task.start_time || '--:--' }}</span>
                                    <span class="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{{ task.title }}</span>
                                </div>
                            </div>
                            <div v-else class="text-center py-6 text-slate-400 text-xs font-bold">
                                {{ $t('dash_all_tasks_done') }}
                            </div>
                        </div>
                    </div>
                </Link>

                <!-- FINANCE -->
                <Link :href="route('finance.index')" 
                    class="col-span-1 md:col-span-12 lg:col-span-5 rounded-[2.5rem] p-10 shadow-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
                    :class="isExplorer ? 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white' : 'bg-indigo-600 text-white'"
                >
                    <template v-if="!isExplorer">
                        <div class="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                            <OneForMindIcon name="finance" size="240" />
                        </div>
                        <div class="relative z-10 flex flex-col gap-6 text-left">
                            <div class="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                                <OneForMindIcon name="finance" size="28" stroke-width="3" />
                            </div>
                            <div class="space-y-4">
                                <h3 class="text-3xl font-black tracking-tighter">{{ $t('dash_finance_title') }}</h3>
                                
                                <div v-if="loadingInsight || globalInsight?.categories?.finance" class="bg-black/20 p-5 rounded-2xl border border-white/10">
                                    <p v-if="loadingInsight" class="text-xs font-bold text-indigo-200 animate-pulse tracking-tight italic">Auditing variables...</p>
                                    <p v-else class="text-sm font-bold leading-snug italic">{{ globalInsight?.categories?.finance }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="relative z-10 mt-10 grid grid-cols-2 gap-4">
                            <div class="bg-white/10 rounded-2xl p-6 border border-white/5">
                                <p class="text-[9px] font-bold text-indigo-200 mb-1">{{ $t('dash_expense') }}</p>
                                <h4 class="text-2xl font-black truncate">{{ formatRupiah(synergy.finance.expense) }}</h4>
                            </div>
                            <div class="bg-white/10 rounded-2xl p-6 border border-white/5">
                                <p class="text-[9px] font-bold text-indigo-200 mb-1">{{ $t('dash_income') }}</p>
                                <h4 class="text-2xl font-black text-emerald-300 tabular-nums lining-nums">+{{ formatRupiah(synergy.finance.income) }}</h4>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <!-- Discovery Hub for Explorer -->
                        <div class="relative z-10 flex flex-col justify-center items-center text-center h-full space-y-6">
                            <div class="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none mb-4">
                                <OneForMindIcon name="finance" size="40" />
                            </div>
                            <div class="space-y-2">
                                <h3 class="text-3xl font-black tracking-tighter">Finance Intelligence</h3>
                                <p class="max-w-[280px] mx-auto text-sm font-bold text-slate-500 dark:text-slate-400">Master your cashflow and unlock predictive analytics with the Platinum Suite.</p>
                            </div>
                            <Link :href="route('billing')" class="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-md hover:scale-105 transition-all">
                                Upgrade Account
                            </Link>
                        </div>
                    </template>
                </Link>

                <!-- JOURNAL -->
                <Link :href="synergy.journal.is_written ? route('journal.write', synergy.journal.id) : route('journal.index')" 
                    class="col-span-1 md:col-span-7 lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-lg hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative"
                >
                    <div class="p-4 flex flex-col justify-between h-full relative z-10 space-y-8 text-left">
                        <div class="space-y-6">
                            <div class="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                <OneForMindIcon name="journal" size="28" stroke-width="3" />
                            </div>
                            <h3 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{{ $t('dash_journal_title') }}</h3>
                        </div>
                        
                        <div class="flex-1 flex flex-col justify-end">
                            <div v-if="synergy.journal.is_written" class="bg-emerald-500 text-white p-6 rounded-2xl shadow-lg">
                                <p class="font-bold text-lg leading-snug">{{ $t('dash_journal_written') }} ✨</p>
                            </div>
                            <div v-else class="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100">
                                 <p class="font-bold text-lg italic text-slate-500">{{ $t('dash_journal_prompt') }}</p>
                            </div>
                        </div>
                    </div>
                </Link>

                <!-- CAREER & GOALS -->
                <div class="col-span-1 md:col-span-5 lg:col-span-3 space-y-6">
                    <Link :href="route('jobs.index')" class="block bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-lg hover:bg-slate-50 transition-all text-left">
                         <div class="flex items-center gap-4 mb-6">
                            <div class="w-10 h-10 bg-indigo-50 dark:bg-slate-800 text-indigo-600 rounded-xl flex items-center justify-center">
                                <OneForMindIcon name="job" size="20" stroke-width="3" />
                            </div>
                            <h3 class="text-xl font-black text-slate-900 dark:text-white">Career</h3>
                        </div>
                        <div class="flex gap-4 text-center">
                            <div class="flex-1 p-4 bg-slate-50 dark:bg-black rounded-2xl">
                                 <p class="text-[9px] font-black text-slate-400 mb-1">Active</p>
                                 <p class="text-2xl font-black text-slate-900 dark:text-white">{{ synergy.jobs.active }}</p>
                            </div>
                            <div class="flex-1 p-4 bg-indigo-600 rounded-2xl text-white">
                                 <p class="text-[9px] font-black text-indigo-200 mb-1">Interview</p>
                                 <p class="text-2xl font-black">{{ synergy.jobs.interviews }}</p>
                            </div>
                        </div>
                    </Link>

                    <Link :href="route('goals.index')" class="block bg-slate-900 dark:bg-black rounded-3xl p-8 text-white shadow-xl hover:-translate-x-2 transition-all">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-black">Goals</h3>
                            <span class="text-[9px] font-black bg-emerald-500 px-3 py-1 rounded-full">{{ synergy.goals.active }} Active</span>
                        </div>
                        <div v-if="synergy.goals.top_goal">
                            <p class="text-xs font-bold text-slate-400 mb-2 truncate">{{ synergy.goals.top_goal.title }}</p>
                            <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                 <div class="bg-emerald-400 h-full" :style="`width: ${synergy.goals.top_goal.percent}%`"></div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </template>

        <!-- Skeleton -->
        <div v-else class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            <div v-for="i in 3" :key="i" class="bg-white dark:bg-slate-900 rounded-[2rem] animate-pulse p-10 h-80 col-span-12 lg:col-span-4">
                <div class="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8"></div>
                <div class="h-10 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6"></div>
                <div class="h-24 w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl"></div>
            </div>
        </div>

    </div>
</template>

<style scoped>
/* Path transition */
path, circle {
    transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>