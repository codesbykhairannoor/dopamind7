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

    <div class="w-full lg:max-w-[96%] mx-auto p-4 md:p-8 space-y-6 lg:space-y-12 pb-32">
        
        <!-- 📱 PREMIUM MOBILE BENTO EXPERIENCE -->
        <template v-if="isMobile && synergy">
            <!-- 💍 Synergy Ring & Header -->
            <header id="mobile-dash-header" class="pt-8 pb-4">
                <div class="flex items-center justify-between gap-6 mb-12">
                    <div class="space-y-1 py-1">
                        <!-- TIER BADGE -->
                        <div class="mb-3">
                            <div v-if="isExplorer" @click="openPremiumPreview('Coach')" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl cursor-pointer active:scale-95 transition-all">
                                <Sparkles :size="10" class="text-indigo-400" />
                                <span class="text-[8px] font-black text-white uppercase tracking-[0.2em]">Upgrade OS</span>
                            </div>
                            <div v-else-if="isArchitect" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 shadow-sm">
                                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                <span class="text-[8px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Architect</span>
                            </div>
                            <div v-else-if="isQuantum" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950 border border-violet-100 dark:border-violet-900 shadow-sm">
                                <span class="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
                                <span class="text-[8px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest">Quantum AI</span>
                            </div>
                        </div>

                        <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-1">{{ synergy.date_formatted }}</p>
                        <h1 class="text-4xl font-black text-slate-900 dark:text-white leading-[1] tracking-tighter">
                            {{ $t(greetingKey) }},<br />
                            <span class="text-indigo-600 dark:text-indigo-400">{{ user.name.split(' ')[0] }}</span>
                        </h1>
                    </div>
                    
                    <div class="relative group active:scale-95 transition-transform duration-500 shrink-0">
                        <div class="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-2xl animate-pulse"></div>
                        <div class="relative w-32 h-32 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                            <svg class="absolute w-[92%] h-[92%] -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="4.5" class="text-slate-50 dark:text-slate-800" />
                                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" 
                                    :stroke-dasharray="276" :stroke-dashoffset="276 - (276 * overallScore / 100)"
                                    :class="isQuantum ? 'text-violet-600 dark:text-violet-500' : 'text-indigo-600 dark:text-indigo-500'" 
                                    class="transition-all duration-[2000ms]" />
                            </svg>
                            <div class="text-center z-10">
                                <span class="block text-4xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">{{ overallScore }}%</span>
                                <span class="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase">SYNERGY</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 🧠 NEURAL HUB: SKELETAL PREVIEW FOR EXPLORERS -->
                <div id="tier-hub" class="mb-10">
                    <div v-if="isExplorer" @click="openPremiumPreview('Coach')" class="bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden group/discovery cursor-pointer active:scale-[0.98] transition-all shadow-2xl">
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent"></div>
                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-6">
                                <div class="flex items-center gap-3">
                                    <div class="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
                                        <Sparkles :size="18" class="animate-pulse" />
                                    </div>
                                    <span class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Neural Intelligence</span>
                                </div>
                                <div class="px-3 py-1 bg-white/10 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10">Explorer</div>
                            </div>
                            
                            <!-- Skeletal Insight Lines -->
                            <div class="space-y-3 blur-[1.5px] opacity-30 group-hover/discovery:opacity-60 transition-all">
                                <div class="h-2 w-full bg-slate-700 rounded-full"></div>
                                <div class="h-2 w-5/6 bg-slate-700 rounded-full"></div>
                                <div class="h-2 w-4/6 bg-slate-700 rounded-full"></div>
                            </div>
                            
                            <div class="mt-8 flex items-center justify-between">
                                <span class="text-xs font-bold text-slate-400">Sync with AI for life insights</span>
                                <ArrowRight :size="16" class="text-indigo-400 group-hover/discovery:translate-x-2 transition-transform" />
                            </div>
                        </div>
                        <OneForMindIcon name="platinum" size="140" class="absolute -right-6 -bottom-6 opacity-5 rotate-12" />
                    </div>

                    <div v-else-if="isQuantum" class="bg-violet-600 dark:bg-violet-900/60 p-8 rounded-[3rem] text-white shadow-xl border border-violet-400/20 relative overflow-hidden">
                        <div class="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl font-black"></div>
                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-3">
                                    <Sparkles :size="20" class="animate-pulse" />
                                    <span class="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-none">Neural Active Insight</span>
                                </div>
                            </div>
                            <p v-if="loadingInsight" class="text-lg font-black animate-pulse italic tracking-tighter">Calibrating...</p>
                            <p v-else class="text-xl font-black leading-tight tracking-tight">{{ globalInsight?.summary || "Synergy looks stable. Focus on deep work today." }}</p>
                        </div>
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
                <!-- 💰 Prime Finance (Full Width Card) - TIER DIFFERENTIATED -->
                <div 
                    id="widget-finance"
                    @click="isExplorer ? openPremiumPreview('Finance') : router.visit(route('finance.index'))" 
                    class="col-span-12 group p-10 rounded-[3rem] transition-all relative overflow-hidden cursor-pointer"
                    :class="isExplorer ? 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm' : 'bg-indigo-600 shadow-xl shadow-indigo-100 dark:shadow-none text-white'"
                >
                    <template v-if="!isExplorer">
                        <!-- Decorative Circles -->
                        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div class="absolute -left-4 -bottom-10 w-24 h-24 bg-black/10 rounded-full"></div>
                        <OneForMindIcon name="finance" size="200" class="absolute -right-16 -top-16 opacity-10 group-hover:rotate-12 transition-transform duration-[2000ms]" />

                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-8">
                                <h3 class="text-3xl font-black tracking-tighter uppercase leading-none">Monetary OS</h3>
                                <div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                                    <OneForMindIcon name="finance" size="20" />
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-8">
                                <div class="space-y-1">
                                    <p class="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] opacity-80">Expenses</p>
                                    <p class="text-2xl font-black tracking-tight truncate tabular-nums">{{ formatRupiah(synergy.finance.expense) }}</p>
                                </div>
                                <div class="space-y-1">
                                    <p class="text-[10px] font-black text-emerald-200 uppercase tracking-[0.2em] opacity-80">Income</p>
                                    <p class="text-2xl font-black text-emerald-300 tracking-tight truncate tabular-nums">+{{ formatRupiah(synergy.finance.income) }}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                         <!-- INTEGRATED SKELETAL FINANCE PREVIEW -->
                         <div class="flex flex-col gap-6">
                             <div class="flex items-center justify-between">
                                 <div>
                                     <h3 class="text-xl font-black text-slate-800 dark:text-white leading-none mb-2">Neural Wealth Forecast</h3>
                                     <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Architect Premium Insight</p>
                                 </div>
                                 <div class="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 flex items-center justify-center">
                                     <TrendingUp :size="24" />
                                 </div>
                             </div>

                             <!-- Skeletal Forecast Chart -->
                             <div class="h-20 flex items-end gap-1.5 opacity-20 blur-[1px] group-hover:opacity-40 transition-opacity">
                                 <div v-for="h in [30, 50, 40, 70, 90, 60, 100, 80]" :key="h" 
                                      :style="{ height: h + '%' }" 
                                      class="flex-1 bg-indigo-500 rounded-t-lg"></div>
                             </div>

                             <div class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                                 Unlock Predictive AI <ArrowRight :size="14" />
                             </div>
                         </div>
                    </template>
                </div>

                <!-- 🎯 Goal Tracker (Wide Mini) -->
                <div 
                    id="widget-goals"
                    @click="isExplorer ? openPremiumPreview('Goal') : router.visit(route('goals.index'))" 
                    class="col-span-12 group bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all flex flex-col gap-6 cursor-pointer"
                >
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center gap-5">
                            <div class="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 border border-emerald-100 dark:border-emerald-500/20">
                                <Target :size="28" stroke-width="2.5" />
                            </div>
                            <div>
                                <h4 class="text-xl font-black text-slate-900 dark:text-white leading-tight mb-1">Strategic Milestones</h4>
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ synergy.goals.active }} Active Operations</p>
                            </div>
                        </div>
                        <div v-if="synergy.goals.top_goal" class="px-5 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                             <div class="text-sm font-black text-emerald-600 dark:text-emerald-400 tabular-nums">{{ synergy.goals.top_goal.percent }}%</div>
                        </div>
                    </div>

                    <!-- INTEGRATED SKELETAL STRATEGIC PATH FOR EXPLORERS -->
                    <div v-if="isExplorer" class="w-full space-y-3 pt-2">
                        <div class="flex items-center gap-3">
                            <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            <span class="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">AI Strategic Forecast</span>
                        </div>
                        <div class="grid grid-cols-4 gap-2 px-1 blur-[1.5px] opacity-20 group-hover:opacity-40 transition-all">
                            <div v-for="i in 4" :key="i" class="h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full" :style="{ width: (100 - (i*10)) + '%' }"></div>
                        </div>
                    </div>
                </div>
            </div>

            <PremiumPreviewModal 
                :isOpen="isPreviewOpen"
                :module="activePreviewModule"
                @close="isPreviewOpen = false"
            />
        </template>

        <!-- 🖥️ DESKTOP REFINED BENTO -->
        <template v-else-if="synergy">
            <div class="max-w-[1600px] mx-auto px-10 py-16">
                <!-- 🏗️ ARCHITECTURAL HEADER -->
                <header class="flex items-end justify-between mb-20">
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div v-if="isExplorer" @click="openPremiumPreview('Coach')" class="px-4 py-2 bg-slate-900 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl cursor-pointer active:scale-95 transition-all flex items-center gap-2">
                                <Sparkles :size="12" class="text-indigo-400" />
                                Upgrade System
                            </div>
                            <div v-else class="px-4 py-2 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 rounded-2xl text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                <Gem :size="12" />
                                {{ isQuantum ? 'Quantum AI Active' : 'Architect Core' }}
                            </div>
                            <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{{ synergy.date_formatted }}</span>
                        </div>
                        <h1 class="text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
                            {{ $t(greetingKey) }},<br />
                            <span class="text-indigo-600 dark:text-indigo-400">{{ user.name }}</span>
                        </h1>
                    </div>

                    <!-- LARGE SYNERGY COMMAND -->
                    <div class="relative group cursor-default">
                        <div class="absolute inset-0 bg-indigo-500/10 rounded-full blur-[80px] animate-pulse"></div>
                        <div class="relative w-56 h-56 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800/50 shadow-2xl">
                            <svg class="absolute w-[94%] h-[94%] -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="3" class="text-slate-50 dark:text-slate-800" />
                                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" 
                                    :stroke-dasharray="276" :stroke-dashoffset="276 - (276 * overallScore / 100)"
                                    :class="isQuantum ? 'text-violet-600 dark:text-violet-500' : 'text-indigo-600 dark:text-indigo-500'" 
                                    class="transition-all duration-[2500ms]" />
                            </svg>
                            <div class="text-center">
                                <span class="block text-6xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">{{ overallScore }}%</span>
                                <span class="text-[11px] font-black text-slate-400 tracking-[0.3em] uppercase">Life Synergy</span>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- 🧩 MAIN BENTO GRID -->
                <div class="grid grid-cols-12 gap-8">
                    <!-- LEFT COLUMN: NEURAL COMMAND & TASKS -->
                    <div class="col-span-12 lg:col-span-4 space-y-8">
                        <!-- NEURAL INSIGHT WIDGET -->
                        <div v-if="isExplorer" @click="openPremiumPreview('Coach')" class="bg-slate-900 p-10 rounded-[4rem] text-white relative overflow-hidden group/neural cursor-pointer active:scale-[0.99] transition-all shadow-2xl">
                            <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-transparent to-transparent opacity-0 group-hover/neural:opacity-100 transition-opacity"></div>
                            <div class="relative z-10">
                                <div class="flex items-center gap-4 mb-8">
                                    <div class="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
                                        <Brain :size="24" />
                                    </div>
                                    <span class="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Neural Commander</span>
                                </div>
                                
                                <h3 class="text-2xl font-black mb-4 tracking-tight">Access Proactive Intelligence</h3>
                                <div class="space-y-4 opacity-20 blur-[1.5px]">
                                    <div class="h-2.5 w-full bg-slate-700 rounded-full"></div>
                                    <div class="h-2.5 w-3/4 bg-slate-700 rounded-full"></div>
                                    <div class="h-2.5 w-5/6 bg-slate-700 rounded-full"></div>
                                </div>
                                <div class="mt-10 flex items-center justify-between text-indigo-400 font-black text-xs uppercase tracking-widest">
                                    Unlock System <ArrowRight :size="16" class="group-hover/neural:translate-x-2 transition-transform" />
                                </div>
                            </div>
                            <OneForMindIcon name="platinum" size="200" class="absolute -right-10 -bottom-10 opacity-5 rotate-12" />
                        </div>

                        <div v-else-if="isQuantum" class="bg-violet-600 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                             <div class="relative z-10">
                                <div class="flex items-center gap-4 mb-6">
                                    <Sparkles :size="24" class="text-violet-200 animate-pulse" />
                                    <span class="text-[11px] font-black uppercase tracking-[0.3em] text-violet-200">Neural Sync Active</span>
                                </div>
                                <p class="text-2xl font-black leading-tight tracking-tight">{{ globalInsight?.summary || "System fully synchronized. High momentum detected in your routine." }}</p>
                             </div>
                        </div>

                        <!-- TASKS/HABIT QUICK LIST -->
                        <div @click="router.visit(route('habits.index'))" class="bg-white dark:bg-slate-950 p-10 rounded-[4rem] border border-slate-100 dark:border-slate-800/50 shadow-sm group cursor-pointer hover:shadow-xl transition-all">
                            <div class="flex items-center justify-between mb-8">
                                <h3 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">Habit Momentum</h3>
                                <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600">
                                    <Zap :size="24" />
                                </div>
                            </div>
                            <div class="space-y-6">
                                <div class="flex items-end justify-between">
                                    <span class="text-4xl font-black text-slate-900 dark:text-white tabular-nums">{{ synergy.habits.percent }}<span class="text-xl opacity-30">%</span></span>
                                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Status</span>
                                </div>
                                <div class="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div class="h-full bg-indigo-600 transition-all duration-1000" :style="{ width: synergy.habits.percent + '%' }"></div>
                                </div>
                                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ synergy.habits.done }} of {{ synergy.habits.total }} synchronized</p>
                            </div>
                        </div>
                    </div>

                    <!-- MIDDLE COLUMN: FINANCE & GOALS -->
                    <div class="col-span-12 lg:col-span-8 flex flex-col gap-8">
                        <!-- FINANCE COMMAND -->
                        <div 
                            @click="isExplorer ? openPremiumPreview('Finance') : router.visit(route('finance.index'))"
                            class="group relative h-[380px] rounded-[4rem] overflow-hidden cursor-pointer"
                        >
                            <div v-if="!isExplorer" class="absolute inset-0 bg-indigo-600 text-white p-12 transition-transform duration-700 group-hover:scale-[1.02]">
                                <OneForMindIcon name="finance" size="400" class="absolute -right-20 -top-20 opacity-10 rotate-12" />
                                <div class="relative z-10 h-full flex flex-col justify-between">
                                    <div class="flex items-start justify-between">
                                        <div class="space-y-2">
                                            <h3 class="text-5xl font-black tracking-tighter uppercase leading-none">Monetary OS</h3>
                                            <p class="text-sm font-bold text-indigo-200 uppercase tracking-[0.2em] opacity-80">Advanced Wealth Tracking</p>
                                        </div>
                                        <div class="bg-white/20 backdrop-blur-md p-4 rounded-3xl border border-white/20">
                                            <TrendingUp :size="32" />
                                        </div>
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-12">
                                        <div class="space-y-3">
                                            <p class="text-xs font-black text-indigo-200 uppercase tracking-widest opacity-60">Revenue Current</p>
                                            <p class="text-5xl font-black tracking-tighter tabular-nums">{{ formatRupiah(synergy.finance.income) }}</p>
                                        </div>
                                        <div class="space-y-3">
                                            <p class="text-xs font-black text-indigo-200 uppercase tracking-widest opacity-60">Burn Current</p>
                                            <p class="text-5xl font-black tracking-tighter tabular-nums">{{ formatRupiah(synergy.finance.expense) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="absolute inset-0 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50 p-12">
                                <div class="h-full flex flex-col justify-between">
                                    <div class="flex items-center justify-between">
                                        <div class="space-y-2">
                                            <h3 class="text-4xl font-black text-slate-800 dark:text-white tracking-tighter uppercase leading-none">Neural Wealth Engine</h3>
                                            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Architect Exclusive Feature</p>
                                        </div>
                                        <div class="w-16 h-16 rounded-[2rem] bg-indigo-50 dark:bg-slate-900 text-indigo-600 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/30">
                                            <TrendingUp :size="32" />
                                        </div>
                                    </div>

                                    <!-- SKELETAL CHART LARGE -->
                                    <div class="flex items-end gap-3 h-32 opacity-20 blur-[2px] group-hover:opacity-40 transition-all">
                                        <div v-for="h in [40, 60, 50, 80, 100, 70, 90, 60, 110, 80]" :key="h" 
                                             :style="{ height: h + '%' }" 
                                             class="flex-1 bg-indigo-500 rounded-t-2xl"></div>
                                    </div>

                                    <div class="flex items-center gap-4 text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase tracking-[0.2em]">
                                        Unlock Predictive Projections <ArrowRight :size="20" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- GOAL MINI WIDE -->
                        <div 
                            @click="isExplorer ? openPremiumPreview('Goal') : router.visit(route('goals.index'))"
                            class="bg-white dark:bg-slate-950 p-10 rounded-[4rem] border border-slate-100 dark:border-slate-800/50 shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-xl transition-all"
                        >
                            <div class="flex items-center gap-8">
                                <div class="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-[2rem] flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20 transition-transform group-hover:scale-110">
                                    <Target :size="36" />
                                </div>
                                <div class="space-y-1">
                                    <h4 class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Strategic Ambitions</h4>
                                    <p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.22em]">{{ synergy.goals.active }} Active Missions</p>
                                </div>
                            </div>
                            
                            <div v-if="synergy.goals.top_goal || isExplorer" class="flex items-center gap-10">
                                <div v-if="isExplorer" class="space-y-2 text-right">
                                    <p class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Neural Strategic Path</p>
                                    <div class="flex gap-1.5 blur-[1.5px] opacity-30">
                                        <div v-for="i in 5" :key="i" class="w-8 h-1.5 bg-indigo-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div v-if="synergy.goals.top_goal" class="px-8 py-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-3xl border border-emerald-100 dark:border-emerald-500/20">
                                    <span class="text-3xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">{{ synergy.goals.top_goal.percent || 0 }}<span class="text-lg opacity-40">%</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
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