<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage, Link } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useGating } from '@/Composables/useGating';
import PremiumPreviewModal from '@/Components/PremiumPreviewModal.vue';
import { Sparkles, Target, Zap, TrendingUp, Brain, ArrowRight } from 'lucide-vue-next';

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
const isPreviewOpen = ref(false);
const activePreviewModule = ref('Finance');

const openPremiumPreview = (module = 'Finance') => {
    activePreviewModule.value = module;
    isPreviewOpen.value = true;
};

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

    <div class="w-full lg:max-w-[1600px] mx-auto p-4 md:p-10 pb-32">
        
        <!-- 📱 MOBILE EXPERIENCE (Minimalist) -->
        <template v-if="isMobile && synergy">
            <!-- Header -->
            <header class="pt-8 pb-6">
                <div class="mb-6">
                    <p class="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2">{{ synergy.date_formatted }}</p>
                    <h1 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {{ $t(greetingKey) }},<br />
                        <span class="text-indigo-600 dark:text-indigo-400">{{ user.name.split(' ')[0] }}</span>
                    </h1>
                </div>

                <!-- Status Summary -->
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <!-- Synergy Card -->
                    <div class="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                        <div class="relative w-16 h-16 mb-2 flex items-center justify-center">
                            <svg class="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="6" class="text-slate-50 dark:text-slate-800" />
                                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" 
                                    :stroke-dasharray="276" :stroke-dashoffset="276 - (276 * overallScore / 100)"
                                    :class="isQuantum ? 'text-violet-500' : 'text-indigo-500'" 
                                    class="transition-all duration-[2000ms]" />
                            </svg>
                            <span class="text-lg font-bold text-slate-900 dark:text-white">{{ overallScore }}%</span>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Synergy</span>
                    </div>

                    <!-- Tier Card -->
                    <div @click="isExplorer ? openPremiumPreview('Coach') : null" class="bg-slate-900 p-5 rounded-3xl text-white flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-all">
                        <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-2">
                            <Sparkles v-if="isExplorer" :size="18" class="text-indigo-400" />
                            <Gem v-else :size="18" class="text-indigo-400" />
                        </div>
                        <span class="text-[10px] font-bold text-white uppercase tracking-widest">{{ isExplorer ? 'Upgrade' : (isQuantum ? 'Quantum' : 'Architect') }}</span>
                    </div>
                </div>

                <!-- Neural Hub (Integrated Preview) -->
                <div v-if="isExplorer" @click="openPremiumPreview('Coach')" class="mb-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 cursor-pointer active:scale-[0.98] transition-all">
                    <div class="flex items-center justify-between mb-4 text-slate-400">
                        <div class="flex items-center gap-2">
                            <Brain :size="14" />
                            <span class="text-[10px] font-bold uppercase tracking-widest">Neural insight</span>
                        </div>
                        <ArrowRight :size="14" />
                    </div>
                    <div class="space-y-2 opacity-30">
                        <div class="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                        <div class="h-1.5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                    </div>
                    <p class="mt-4 text-[10px] font-semibold text-slate-400">Unlock AI Coaching projections</p>
                </div>
                
                <div v-else-if="isQuantum" class="mb-8 bg-violet-600 p-6 rounded-3xl text-white relative overflow-hidden">
                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-3">
                            <Sparkles :size="14" class="animate-pulse" />
                            <span class="text-[10px] font-bold uppercase tracking-widest opacity-80">Neural Active</span>
                        </div>
                        <p class="text-lg font-bold leading-tight">{{ globalInsight?.summary || "Your synergy is optimized for deep focus today." }}</p>
                    </div>
                </div>
            </header>

            <!-- Bento Grid -->
            <div class="grid grid-cols-12 gap-4">
                <!-- Planner -->
                <Link :href="route('planner.index')" class="col-span-12 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-indigo-500">
                            <OneForMindIcon name="planner" size="20" />
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900 dark:text-white">Schedule</h3>
                            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ synergy.planner.upcoming.length }} Pending</p>
                        </div>
                    </div>
                    <ArrowRight :size="16" class="text-slate-300" />
                </Link>

                <!-- Habits -->
                <Link :href="route('habits.index')" class="col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div class="w-9 h-9 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-xl flex items-center justify-center mb-4">
                        <Zap :size="18" />
                    </div>
                    <h4 class="font-bold text-slate-900 dark:text-white">Habits</h4>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ synergy.habits.completed }}/{{ synergy.habits.total }} done</p>
                </Link>

                <!-- Journal -->
                <Link :href="route('journal.index')" class="col-span-6 bg-slate-900 dark:bg-slate-800/50 p-6 rounded-3xl shadow-sm text-white">
                    <div class="w-9 h-9 bg-white/10 text-white rounded-xl flex items-center justify-center mb-4">
                        <Brain :size="18" />
                    </div>
                    <h4 class="font-bold">Journal</h4>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ synergy.journal.is_written ? 'Written' : 'Log now' }}</p>
                </Link>

                <!-- Finance -->
                <div @click="isExplorer ? openPremiumPreview('Finance') : router.visit(route('finance.index'))" class="col-span-12 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Finance status</h3>
                        <TradingUp :size="18" class="text-indigo-500" />
                    </div>
                    <div v-if="!isExplorer" class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Expense</p>
                            <p class="text-xl font-bold tabular-nums">{{ formatRupiah(synergy.finance.expense) }}</p>
                        </div>
                        <div>
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Income</p>
                            <p class="text-xl font-bold tabular-nums text-emerald-500">{{ formatRupiah(synergy.finance.income) }}</p>
                        </div>
                    </div>
                    <div v-else class="space-y-3">
                        <div class="h-10 flex items-end gap-1 px-1 opacity-10">
                            <div v-for="h in [30, 50, 40, 70, 90, 60]" :key="h" :style="{ height: h + '%' }" class="flex-1 bg-slate-400 rounded-t-sm"></div>
                        </div>
                        <p class="text-[10px] font-bold text-indigo-500 capitalize">Unlock Architect projections <ArrowRight :size="10" /></p>
                    </div>
                </div>

                <!-- Goals -->
                <div @click="isExplorer ? openPremiumPreview('Goal') : router.visit(route('goals.index'))" class="col-span-12 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <Target :size="18" class="text-emerald-500" />
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Goal progress</h3>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ synergy.goals.active }} Active</span>
                    </div>
                    <div v-if="synergy.goals.top_goal" class="w-full bg-slate-50 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-500 transition-all duration-1000" :style="`width: ${synergy.goals.top_goal.percent}%`"></div>
                    </div>
                </div>
            </div>
        </template>

        <!-- 🖥️ DESKTOP EXPERIENCE (Minimalist) -->
        <template v-else-if="synergy">
            <header class="mb-16">
                <div class="flex items-center gap-3 mb-4 text-slate-400">
                    <Brain :size="16" />
                    <span class="text-xs font-semibold uppercase tracking-widest">{{ synergy.date_formatted }}</span>
                </div>
                <h1 class="text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {{ $t(greetingKey) }}, {{ user.name.split(' ')[0] }}
                </h1>
            </header>

            <div class="grid grid-cols-12 gap-8">
                <!-- Left Column (4 cols) -->
                <div class="col-span-4 space-y-8">
                    <!-- Status Card -->
                    <div class="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">Life synergy status</h3>
                        <div class="flex items-center gap-10">
                            <div class="relative w-32 h-32 flex items-center justify-center">
                                <svg class="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="6" class="text-slate-50 dark:text-slate-800" />
                                    <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" 
                                        :stroke-dasharray="276" :stroke-dashoffset="276 - (276 * overallScore / 100)"
                                        :class="isQuantum ? 'text-violet-500' : 'text-indigo-500'" 
                                        class="transition-all duration-[2000ms]" />
                                </svg>
                                <span class="text-4xl font-bold tabular-nums text-slate-900 dark:text-white">{{ overallScore }}%</span>
                            </div>
                            <div class="space-y-1">
                                <p class="text-lg font-bold text-slate-900 dark:text-white">Productivity pulse</p>
                                <p class="text-sm text-slate-400 leading-relaxed">System balance is currently optimized for performance.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Hub Card -->
                    <div @click="isExplorer ? openPremiumPreview('Coach') : null" class="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer group active:scale-[0.99] transition-all">
                        <div class="flex items-center justify-between mb-8">
                            <div class="flex items-center gap-3">
                                <Brain :size="20" class="text-indigo-500" />
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">Neural coach</h3>
                            </div>
                            <div v-if="isExplorer" class="px-2 py-1 bg-indigo-50 text-[10px] font-bold text-indigo-600 rounded">PRO</div>
                        </div>
                        <div v-if="isExplorer" class="space-y-3 opacity-30">
                            <div class="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                            <div class="h-2 w-4/5 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                        </div>
                        <p v-else class="text-sm text-slate-500 leading-relaxed">{{ globalInsight?.summary || "Neural engine active and monitoring your workflows." }}</p>
                        <div class="mt-8 flex items-center gap-2 text-indigo-600 text-xs font-bold">
                            {{ isExplorer ? 'Unlock coaching insights' : 'Open Neural Hub' }}
                            <ArrowRight :size="14" />
                        </div>
                    </div>
                </div>

                <!-- Right Column (8 cols) -->
                <div class="col-span-8 grid grid-cols-2 gap-8">
                    <!-- Finance (Wide) -->
                    <div @click="isExplorer ? openPremiumPreview('Finance') : router.visit(route('finance.index'))" class="col-span-2 bg-slate-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden group cursor-pointer shadow-xl">
                        <div class="relative z-10 flex items-center justify-between">
                            <div class="space-y-8">
                                <h3 class="text-2xl font-bold tracking-tight">Finance overview</h3>
                                <div class="flex gap-16">
                                    <div>
                                        <p class="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Total expenses</p>
                                        <p class="text-4xl font-bold tabular-nums">{{ formatRupiah(synergy.finance.expense) }}</p>
                                    </div>
                                    <div>
                                        <p class="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">Current balance</p>
                                        <p class="text-4xl font-bold text-emerald-400 tabular-nums">+{{ formatRupiah(synergy.finance.income - synergy.finance.expense) }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-700">
                                <TrendingUp :size="40" class="text-indigo-400" />
                            </div>
                        </div>
                        <OneForMindIcon name="finance" size="300" class="absolute -right-20 -bottom-20 opacity-5" />
                    </div>

                    <!-- Goals -->
                    <div @click="isExplorer ? openPremiumPreview('Goal') : router.visit(route('goals.index'))" class="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm group cursor-pointer hover:shadow-md transition-all">
                        <div class="flex items-center justify-between mb-10">
                            <div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center">
                                <Target :size="24" />
                            </div>
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ synergy.goals.active }} Active targets</span>
                        </div>
                        <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Goal progress</h4>
                        <p class="text-sm text-slate-400 mb-8">Tracking your strategic milestones across all categories.</p>
                        <div v-if="synergy.goals.top_goal" class="w-full bg-slate-50 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div class="h-full bg-emerald-500 transition-all duration-1000" :style="`width: ${synergy.goals.top_goal.percent}%`"></div>
                        </div>
                    </div>

                    <!-- Habits -->
                    <div @click="router.visit(route('habits.index'))" class="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm group cursor-pointer hover:shadow-md transition-all">
                        <div class="flex items-center justify-between mb-10">
                            <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-2xl flex items-center justify-center">
                                <Zap :size="24" />
                            </div>
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ synergy.habits.completed }} / {{ synergy.habits.total }} Today</span>
                        </div>
                        <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Habit systems</h4>
                        <p class="text-sm text-slate-400 mb-8">Maintain your streaks and build long-term consistency.</p>
                        <div class="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full bg-indigo-500 transition-all duration-1000" :style="`width: ${synergy.habits.percent}%`"></div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <!-- Loading Skeleton -->
        <div v-else class="grid grid-cols-12 gap-8">
            <div v-for="i in 3" :key="i" class="col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 animate-pulse h-80">
                <div class="w-12 h-12 bg-slate-100 rounded-xl mb-8"></div>
                <div class="h-8 w-3/4 bg-slate-100 rounded-lg mb-4"></div>
                <div class="h-20 w-full bg-slate-50 rounded-2xl"></div>
            </div>
        </div>

        <!-- Premium Preview Modal -->
        <PremiumPreviewModal 
            :isOpen="isPreviewOpen"
            :module="activePreviewModule"
            @close="isPreviewOpen = false"
        />

    </div>
</template>

<style scoped>
/* Path transition */
path, circle {
    transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>