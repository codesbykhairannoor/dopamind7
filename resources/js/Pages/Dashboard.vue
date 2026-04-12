<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage, Link, router } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useGating } from '@/Composables/useGating';
import { 
    Sparkles, Target, Zap, TrendingUp, Brain, ArrowRight, Gem, 
    Plus, Clock, ChevronRight, LayoutDashboard, Wallet 
} from 'lucide-vue-next';

const { isExplorer, isArchitect, isQuantum, isLegendary, demandAccess } = useGating();

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

// Hitung overall score hari ini
const overallScore = computed(() => {
    if (!props.synergy) return 0;
    
    let scores = [props.synergy.habits.percent, props.synergy.planner.percent];
    
    if (!isExplorer.value) {
        if (props.synergy.goals.top_goal) scores.push(props.synergy.goals.top_goal.percent);
        scores.push(props.synergy.journal.is_written ? 100 : 0);
    }
    
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
});

const isMobile = ref(false);

onMounted(() => {
    isMobile.value = window.innerWidth < 768;
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768;
    });
    
    if (!isExplorer.value) {
        fetchInsight();
    }
});
</script>

<template>
    <Head :title="$t('nav_dashboard')" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 transition-colors duration-500">
        
        <!-- Premium Background Glow -->
        <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div class="w-full lg:max-w-[1400px] mx-auto p-4 md:p-8 lg:p-12">
            
            <!-- ⚡ TOP COMMAND BAR (Greeting & Overall Status) -->
            <header class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pt-8">
                <div>
                    <div class="flex items-center gap-2 mb-3">
                        <span class="w-8 h-[2px] bg-indigo-500 rounded-full"></span>
                        <p class="text-indigo-500 dark:text-indigo-400 font-black tracking-widest text-[9px]">{{ synergy?.date_formatted }}</p>
                    </div>
                    <h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                        {{ $t(greetingKey) }},<br class="md:hidden">
                        <span class="text-indigo-600 dark:text-indigo-400">
                            {{ user.name.split(' ')[0] }}
                        </span>
                    </h1>
                </div>

                <!-- Main Pulse Score -->
                <div class="flex items-center gap-6 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-700 active:scale-95 group cursor-default ultra-shadow">
                    <div class="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        <svg class="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="6" class="text-slate-50 dark:text-slate-800" />
                            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" 
                                :stroke-dasharray="276" :stroke-dashoffset="276 - (276 * overallScore / 100)"
                                class="text-indigo-500 dark:text-indigo-400 transition-all duration-[2000ms]" />
                        </svg>
                        <span class="text-xl md:text-2xl font-black text-slate-900 dark:text-white">{{ overallScore }}%</span>
                    </div>
                    <div>
                        <p class="text-[10px] font-black text-slate-400 tracking-wide leading-none mb-1.5">{{ $t('dash_synergy') }}</p>
                        <p class="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">
                            System Balance<br>Optimized
                        </p>
                    </div>
                </div>
            </header>

            <!-- ⚡ QUICK ACTION BAR (Modern Utility) -->
            <div class="mb-12 overflow-x-auto no-scrollbar scroll-smooth">
                <div class="flex items-center gap-3 w-max">
                    <Link :href="route('planner.index')" class="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3.5 rounded-2xl font-black text-[10px] tracking-wide hover:scale-105 transition-all shadow-lg active:scale-95">
                        <Plus :size="14" stroke-width="3" /> {{ $t('btn_add_task', 'New Task') }}
                    </Link>
                    <Link :href="route('finance.index')" class="flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-indigo-400 px-5 py-3.5 rounded-2xl font-black text-[10px] tracking-wide border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-indigo-500/10 transition-all shadow-sm active:scale-95">
                        <TrendingUp :size="14" stroke-width="3" /> {{ $t('btn_log_expense', 'Record Cash') }}
                    </Link>
                    <Link :href="route('habits.index')" class="flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-indigo-300 px-5 py-3.5 rounded-2xl font-black text-[10px] tracking-wide border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-indigo-500/10 transition-all shadow-sm active:scale-95">
                        <Zap :size="14" stroke-width="3" /> {{ $t('btn_check_habit', 'Daily Streak') }}
                    </Link>
                    <div v-if="!isExplorer" @click="demandAccess('journal', route('journal.index'))" class="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 px-5 py-3.5 rounded-2xl font-black text-[10px] tracking-wide border border-indigo-100 dark:border-indigo-500/20 hover:bg-indigo-100 transition-all cursor-pointer shadow-sm active:scale-95">
                        <Brain :size="14" stroke-width="3" /> {{ $t('btn_journal', 'Self Reflect') }}
                    </div>
                </div>
            </div>

            <!-- ⚡ THE BENTO GRID (Main Body) -->
            <div class="grid grid-cols-12 gap-6 md:gap-8">
                
                <!-- [BLOCK 1] THE FOCUS (Main Widget) -->
                <div class="col-span-12 lg:col-span-8 space-y-8">
                    
                    <!-- Current Schedule Block -->
                    <div class="bento-card p-8 md:p-10 relative overflow-hidden group">
                        <div class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                        
                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-10">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 bg-slate-900 dark:bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 dark:shadow-none">
                                        <Clock :size="24" />
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-black text-slate-900 dark:text-white tracking-tighter">{{ $t('dash_schedule') }}</h3>
                                        <p class="text-[10px] font-bold text-slate-400 tracking-wide">{{ synergy?.planner.total }} Active Protocols</p>
                                    </div>
                                </div>
                                <Link :href="route('planner.index')" class="w-10 h-10 rounded-full border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                    <ArrowRight :size="16" />
                                </Link>
                            </div>

                            <div v-if="synergy?.planner.upcoming.length > 0" class="space-y-4">
                                <div v-for="task in synergy.planner.upcoming" :key="task.id" class="flex items-center justify-between p-5 bg-slate-50/50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-white/10 transition-all">
                                    <div class="flex items-center gap-4">
                                        <div class="w-2 h-10 bg-indigo-500 rounded-full"></div>
                                        <div>
                                            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{{ task.start_time || '--:--' }}</p>
                                            <h4 class="font-black text-slate-800 dark:text-white tracking-tight">{{ task.task }}</h4>
                                        </div>
                                    </div>
                                    <div class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-wide px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
                                        In Progress
                                    </div>
                                </div>
                            </div>
                            <div v-else class="py-12 text-center">
                                <p class="text-sm font-bold text-slate-400">{{ $t('dash_all_tasks_done') }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Neural Hub (Pro feature) -->
                    <div v-if="!isExplorer" class="bento-card p-10 bg-slate-900 dark:bg-indigo-950 text-white relative overflow-hidden group cursor-pointer" @click="demandAccess('ai_coach', route('coach.index'))">
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
                        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                            <div class="max-w-xl">
                                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-indigo-300 text-[9px] font-black mb-6 tracking-widest backdrop-blur-md border border-white/5 animate-pulse">
                                    <Sparkles :size="12" />
                                    <span>{{ $t('dash_neural_active') }}</span>
                                </div>
                                <h4 class="text-3xl font-black mb-4 tracking-tighter leading-tight group-hover:translate-x-1 transition-transform">
                                    {{ globalInsight?.summary || $t('dash_neural_default_summary') }}
                                </h4>
                                <p class="text-indigo-200/60 text-xs font-bold tracking-wide">Tap to open Neural Hub <ArrowRight :size="10" class="inline ml-1" /></p>
                            </div>
                            <div class="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center border border-white/10 group-hover:rotate-12 transition-all duration-700">
                                <Brain :size="40" class="text-indigo-300" />
                            </div>
                        </div>
                    </div>

                    <!-- Explorer Rank Message -->
                    <div v-else class="bento-card p-10 flex flex-col items-center text-center group">
                        <div class="w-16 h-16 bg-slate-50 dark:bg-indigo-500/10 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 dark:group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 mb-6 shrink-0">
                            <LayoutDashboard :size="32" />
                        </div>
                        <h4 class="text-2xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter">{{ $t('dash_explorer_rank') }}</h4>
                        <p class="text-sm font-bold text-slate-400 dark:text-slate-500 max-w-sm mb-8">{{ $t('dash_explorer_desc') }}</p>
                        <Link :href="route('billing')" class="px-8 py-3.5 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-black text-[10px] tracking-wide shadow-xl shadow-indigo-100 dark:shadow-none transition-all active:scale-95">
                            {{ $t('dash_upgrade_tier') }}
                        </Link>
                    </div>
                </div>

                <!-- [BLOCK 2] SIDE WIDGETS (Stats & Metrics) -->
                <div class="col-span-12 lg:col-span-4 space-y-6 md:space-y-8">
                    
                    <!-- Habit Systems Block -->
                    <div class="bento-card p-8 group">
                        <div class="flex items-center justify-between mb-8">
                            <div class="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Zap :size="20" />
                            </div>
                            <span class="text-[9px] font-black text-slate-400 tracking-wide">{{ synergy?.habits.completed }}/{{ synergy?.habits.total }} Done</span>
                        </div>
                        <h4 class="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">{{ $t('dash_habit_systems') }}</h4>
                        <p class="text-xs font-bold text-slate-400 mb-8">{{ $t('dash_habit_systems_desc') }}</p>
                        
                        <!-- Progress Arc -->
                        <div class="w-full h-2 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden mb-2">
                            <div class="h-full bg-indigo-600 transition-all duration-[1500ms]" :style="`width: ${synergy?.habits.percent}%`"></div>
                        </div>
                    </div>

                    <!-- Finance Tracker Block -->
                    <div @click="demandAccess('finance_trends', route('finance.index'))" 
                            class="bento-card p-8 group cursor-pointer active:scale-[0.98]">
                        <div class="flex items-center justify-between mb-8">
                            <div class="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Wallet :size="20" />
                            </div>
                            <TrendingUp :size="16" class="text-slate-300" />
                        </div>
                        <h4 class="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">{{ $t('dash_finance_overview') }}</h4>
                        
                        <div v-if="!isExplorer" class="space-y-4">
                            <div>
                                <p class="text-[9px] font-black text-slate-400 tracking-wide mb-1">{{ $t('dash_total_expenses') }}</p>
                                <p class="text-2xl font-black text-slate-900 dark:text-white tabular-nums">{{ formatRupiah(synergy?.finance.expense) }}</p>
                            </div>
                        </div>
                        <div v-else class="space-y-4">
                            <div class="h-20 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center opacity-40">
                                <Gem :size="24" class="text-indigo-500 animate-pulse" />
                            </div>
                            <p class="text-[9px] font-black text-indigo-500 tracking-wide">{{ $t('dash_unlock_arch') }}</p>
                        </div>
                    </div>

                    <!-- Goals & Missions Block -->
                    <div v-if="!isExplorer" @click="demandAccess('goal', route('goals.index'))" class="bento-card p-8 group cursor-pointer active:scale-[0.98]">
                            <div class="flex items-center justify-between mb-8">
                            <div class="w-10 h-10 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Target :size="20" />
                            </div>
                            <ChevronRight :size="16" class="text-slate-300" />
                        </div>
                        <h4 class="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">{{ $t('dash_goal_progress') }}</h4>
                        <div v-if="synergy?.goals.top_goal" class="space-y-3">
                                <p class="text-xs font-bold text-slate-400 line-clamp-1">{{ synergy.goals.top_goal.title }}</p>
                                <div class="w-full h-1.5 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden">
                                <div class="h-full bg-amber-500 transition-all duration-[2000ms]" :style="`width: ${synergy.goals.top_goal.percent}%`"></div>
                                </div>
                        </div>
                        <p v-else class="text-xs font-bold text-slate-400">Assemble your first mission lab.</p>
                    </div>

                </div>
            </div>

            <!-- ⚡ UPGRADE PRO BANNER -->
            <div v-if="isExplorer" class="mt-12 group">
                <Link :href="route('billing')" class="block bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-12 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden active:scale-[0.99] ultra-shadow">
                    <div class="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/5 to-transparent hidden md:block"></div>
                    <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                        <div class="flex items-center gap-6">
                            <div class="w-16 h-16 bg-indigo-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none shrink-0 group-hover:rotate-12 transition-transform duration-700">
                                <OneForMindIcon name="premium" size="32" />
                            </div>
                            <div>
                                <h3 class="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter mb-2">{{ $t('dash_upgrade_tier_title') }}</h3>
                                <p class="text-sm font-bold text-slate-400 dark:text-slate-500 max-w-md leading-relaxed">{{ $t('dash_upgrade_tier_desc') }}</p>
                            </div>
                        </div>
                        <div class="px-10 py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-[1.5rem] font-black text-[11px] tracking-widest shadow-xl flex items-center gap-3 transition-transform group-hover:scale-105">
                            {{ $t('dash_view_new_plans') }}
                            <ArrowRight :size="16" stroke-width="3" />
                        </div>
                    </div>
                </Link>
            </div>

        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
