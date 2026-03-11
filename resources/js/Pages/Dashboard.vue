<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage, Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const user = usePage().props.auth.user;
const props = defineProps({
    synergy: Object,
    stats: Object,
});

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
    return Math.round((props.synergy.habits.percent + props.synergy.planner.percent) / 2);
});
</script>

<template>
    <Head :title="$t('nav_dashboard')" />

    <div class="w-full lg:max-w-[96%] mx-auto p-4 md:p-6 lg:p-8 space-y-6 lg:space-y-8 pb-24">
        
        <div v-if="synergy" class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-indigo-600 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border border-indigo-700/50 group">
            <div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px] group-hover:bg-indigo-400/40 transition-colors duration-1000"></div>
            <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/5 rounded-full blur-[80px]"></div>
            
            <div class="relative z-10 w-full md:w-2/3">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 text-sm font-bold text-indigo-100 tracking-wide">
                    <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                    {{ synergy.date_formatted }}
                </div>
                <h2 class="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-white to-white bg-clip-text text-transparent drop-shadow-sm">
                    {{ $t(greetingKey) }}, <br class="hidden md:block" /> {{ user.name }}! 👋
                </h2>
                <p class="text-white text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                    {{ $t('dash_hero_subtitle') }}
                </p>
            </div>
            
            <div class="relative z-10 w-full md:w-auto flex justify-start md:justify-end">
                <div class="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <svg class="absolute inset-0 w-full h-full -rotate-90 p-4" viewBox="0 0 36 36">
                        <path class="text-white/10" stroke-width="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path class="text-indigo-400 transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]" stroke-dasharray="100, 100" :stroke-dashoffset="100 - overallScore" stroke-linecap="round" stroke-width="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div class="text-center">
                        <span class="block text-4xl md:text-5xl font-black text-white drop-shadow-md">{{ overallScore }}<span class="text-xl text-indigo-300">%</span></span>
                        <span class="block text-[10px] uppercase tracking-widest text-indigo-200 font-bold mt-1">{{ $t('dash_synergy_today') }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Skeleton Header -->
        <div v-else class="h-64 md:h-80 bg-slate-200 rounded-[2.5rem] animate-pulse flex items-center px-12">
            <div class="space-y-4 w-2/3">
                <div class="h-8 w-48 bg-slate-300 rounded-full"></div>
                <div class="h-16 w-full bg-slate-300 rounded-2xl"></div>
                <div class="h-8 w-3/4 bg-slate-300 rounded-xl"></div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            
            <template v-if="synergy">
                <Link :href="route('habits.index')" class="col-span-1 md:col-span-6 lg:col-span-4 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 text-8xl -mt-6 -mr-6 grayscale group-hover:grayscale-0">
                        <OneForMindIcon name="habit" size="120" stroke-width="1.5" />
                    </div>
                    <div class="relative z-10">
                        <div class="flex justify-between items-start mb-6">
                            <div class="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 border border-indigo-100">
                                <OneForMindIcon name="habit" size="32" />
                            </div>
                            <div class="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black tracking-wider shadow-inner">{{ synergy.habits.completed }} / {{ synergy.habits.total }}</div>
                        </div>
                        <h3 class="text-2xl font-black text-slate-800 mb-2">{{ $t('dash_habit_title') }}</h3>
                        <p class="text-slate-500 text-sm font-medium leading-relaxed">{{ $t('dash_habit_desc') }}</p>
                    </div>
                    <div class="relative z-10 mt-8">
                        <div class="flex justify-between text-xs font-bold mb-3">
                            <span class="text-slate-400 uppercase tracking-wider">{{ $t('dash_progress') }}</span>
                            <span class="text-indigo-600">{{ synergy.habits.percent }}%</span>
                        </div>
                        <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                            <div class="bg-indigo-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" :style="`width: ${synergy.habits.percent}%`">
                                <div class="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link :href="route('planner.index')" prefetch="hover" class="col-span-1 md:col-span-6 lg:col-span-5 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-center mb-6">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:-rotate-12 transition-transform duration-300 border border-slate-200">
                                    <OneForMindIcon name="planner" size="32" />
                                </div>
                                <div>
                                    <h3 class="text-2xl font-black text-slate-800">{{ $t('dash_planner_title') }}</h3>
                                    <p class="text-slate-500 text-sm font-medium mt-1">{{ synergy.planner.completed }} {{ $t('dash_from') }} {{ synergy.planner.total }} {{ $t('dash_tasks_done') }}</p>
                                </div>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-slate-50/80 rounded-[1.5rem] p-5 mt-2 border border-slate-100/50">
                        <p class="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">{{ $t('dash_upcoming') }}</p>
                        <div v-if="synergy.planner.upcoming.length > 0" class="space-y-3">
                            <div v-for="(task, index) in synergy.planner.upcoming" :key="task.id" class="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:border-indigo-100 transition-colors" :style="`transition-delay: ${index * 75}ms`">
                                <span class="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg shrink-0 border border-indigo-100/50">{{ task.start_time || '--:--' }}</span>
                                <span class="text-sm font-bold text-slate-700 truncate">{{ task.title }}</span>
                            </div>
                        </div>
                        <div v-else class="flex flex-col items-center justify-center py-6 text-center">
                            <div class="text-4xl mb-3 drop-shadow-sm">✨</div>
                            <p class="text-slate-500 font-bold text-sm">{{ $t('dash_all_tasks_done') }}</p>
                        </div>
                    </div>
                </Link>

                <Link :href="route('finance.index')" prefetch="hover" class="col-span-1 md:col-span-12 lg:col-span-3 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[2rem] p-8 text-white shadow-lg shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between">
                    <div class="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <OneForMindIcon name="finance" size="160" stroke-width="1.5" />
                    </div>
                    <div class="relative z-10">
                        <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform">
                            <OneForMindIcon name="finance" size="28" />
                        </div>
                        <h3 class="text-xl font-black mb-1">{{ $t('dash_finance_title') }}</h3>
                        <p class="text-indigo-100 text-sm font-medium opacity-90">{{ $t('dash_finance_desc') }}</p>
                    </div>
                    <div class="relative z-10 mt-8 space-y-4">
                        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 shadow-inner">
                            <p class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">{{ $t('dash_expense') }}</p>
                            <h4 class="text-2xl font-black text-white truncate">{{ formatRupiah(synergy.finance.expense) }}</h4>
                        </div>
                        <div v-if="synergy.finance.income > 0" class="bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/5 flex items-center justify-between">
                            <span class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">{{ $t('dash_income') }}</span>
                            <span class="text-sm font-black text-emerald-400 drop-shadow-sm">+ {{ formatRupiah(synergy.finance.income) }}</span>
                        </div>
                    </div>
                </Link>

                <Link :href="synergy.journal.is_written ? route('journal.write', synergy.journal.id) : route('journal.index')" prefetch="hover" class="col-span-1 md:col-span-7 lg:col-span-7 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative">
                    <div class="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-indigo-50/80 to-white/0 pointer-events-none"></div>
                    <div class="absolute right-0 bottom-0 p-8 opacity-20 translate-x-4 translate-y-4 group-hover:rotate-12 transition-transform duration-700">
                        <OneForMindIcon name="journal" size="120" stroke-width="1.5" />
                    </div>

                    <div class="p-8 md:p-10 flex flex-col justify-between h-full relative z-10">
                        <div>
                            <div class="w-14 h-14 bg-white text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform duration-300 border border-slate-100 shadow-sm">
                                <OneForMindIcon name="journal" size="32" />
                            </div>
                            <h3 class="text-3xl font-black text-slate-800 mb-3">{{ $t('dash_journal_title') }}</h3>
                        </div>
                        
                        <div class="mt-4">
                            <div v-if="synergy.journal.is_written" class="bg-indigo-50/50 border border-indigo-100/50 p-6 rounded-2xl backdrop-blur-sm">
                                <p class="text-slate-600 font-medium leading-relaxed">
                                    {{ $t('dash_journal_written') }} <span class="text-2xl ml-2 align-middle drop-shadow-sm">{{ synergy.journal.mood === 'happy' ? '😄' : '✨' }}</span>
                                </p>
                                <div class="mt-4 inline-flex items-center text-sm font-black text-indigo-600 tracking-wide uppercase">
                                    {{ $t('dash_journal_continue') }} <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                            <div v-else class="bg-slate-50 border border-slate-100 p-6 rounded-2xl group-hover:bg-indigo-50/50 group-hover:border-indigo-100/50 transition-colors">
                                <p class="text-slate-600 font-medium leading-relaxed italic">
                                    {{ $t('dash_journal_prompt') }}
                                </p>
                                <div class="mt-4 inline-flex items-center text-sm font-black text-indigo-600 tracking-wide uppercase">
                                    {{ $t('dash_journal_start') }} <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link :href="route('calendar.index')" prefetch="hover" class="col-span-1 md:col-span-5 lg:col-span-5 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-center mb-8">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-indigo-100">
                                    <OneForMindIcon name="calendar" size="32" />
                                </div>
                                <div>
                                    <h3 class="text-2xl font-black text-slate-800">{{ $t('dash_calendar_title') }}</h3>
                                    <p class="text-slate-500 text-sm font-medium mt-1">{{ $t('dash_calendar_desc') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-slate-50/80 rounded-[1.5rem] p-5 border border-slate-100/50 h-full">
                        <div v-if="synergy.events.length > 0" class="space-y-4">
                            <div v-for="(evt, i) in synergy.events" :key="evt.id" class="flex gap-4 items-start bg-white p-3.5 rounded-xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:border-indigo-100 transition-colors" :style="`transition-delay: ${i * 100}ms`">
                                <div class="w-3 h-3 rounded-full bg-indigo-500 mt-1.5 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.6)] animate-pulse"></div>
                                <div>
                                    <p class="text-sm font-black text-slate-700 leading-snug">{{ evt.title }}</p>
                                    <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">{{ evt.start_date === evt.end_date ? $t('dash_today_only') : $t('dash_ongoing') }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="h-full flex flex-col items-center justify-center py-6 text-center">
                            <div class="text-4xl mb-3 opacity-50 grayscale drop-shadow-sm group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">🏖️</div>
                            <p class="text-slate-500 font-bold text-sm">{{ $t('dash_no_events') }}</p>
                        </div>
                    </div>
                </Link>
            </template>

            <!-- Grid Skeletons -->
            <template v-else>
                <div v-for="i in 5" :key="i" 
                    :class="[
                        'bg-slate-200 rounded-[2rem] animate-pulse p-8 border border-white shadow-sm',
                        i === 1 ? 'col-span-1 md:col-span-6 lg:col-span-4 h-80' : 
                        i === 2 ? 'col-span-1 md:col-span-6 lg:col-span-5 h-80' :
                        i === 3 ? 'col-span-1 md:col-span-12 lg:col-span-3 h-80' :
                        i === 4 ? 'col-span-1 md:col-span-7 lg:col-span-7 h-80' :
                        'col-span-1 md:col-span-5 lg:col-span-5 h-80'
                    ]"
                >
                    <div class="w-14 h-14 bg-slate-300 rounded-2xl mb-6"></div>
                    <div class="h-8 w-1/2 bg-slate-300 rounded-lg mb-4"></div>
                    <div class="h-20 w-full bg-slate-300 rounded-xl"></div>
                </div>
            </template>

        </div>
    </div>
</template>

<style scoped>
/* Shimmer Effect for Progress Bar */
@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

/* Transisi halus untuk Progress Bar SVG Radar */
path {
    transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>