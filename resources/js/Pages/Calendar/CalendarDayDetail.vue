<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import { usePage, Link } from '@inertiajs/vue3';

const props = defineProps({
    show: Boolean,
    date: String,
    calendarDays: Array
});

const emit = defineEmits(['close', 'edit-event', 'delete-event']);
const page = usePage();

const dayData = computed(() => {
    if (!props.date) return null;
    return props.calendarDays.find(d => d.date === props.date) || null;
});

const rawData = computed(() => page.props.data || {});

const dailyJournal = computed(() => rawData.value.journals?.[props.date] || null);
const dailyFinance = computed(() => rawData.value.finances?.[props.date] || 0);
const dailyHabitCount = computed(() => rawData.value.habits?.[props.date] || 0);
const dailyPlanner = computed(() => {
    if (!rawData.value.planners) return null;
    return rawData.value.planners[props.date] || null;
});
const dailyMilestones = computed(() => rawData.value.milestones?.[props.date] || []);

const displayDate = computed(() => {
    const locale = page.props.locale || 'id';
    return props.date ? dayjs(props.date).locale(locale).format('dddd, DD MMMM YYYY') : '';
});

const formatCurrency = (angka) => {
    const locale = page.props.locale || 'id';
    return new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', { style: 'currency', currency: locale === 'id' ? 'IDR' : 'USD', maximumFractionDigits: 0 }).format(angka);
};

const plannerProgress = computed(() => {
    if (!dailyPlanner.value || dailyPlanner.value.total_tasks === 0) return 0;
    return Math.round((dailyPlanner.value.completed_tasks / dailyPlanner.value.total_tasks) * 100);
});
</script>

<template>
    <Teleport to="body">
        <transition 
            enter-active-class="transition duration-300 ease-out" 
            enter-from-class="opacity-0 scale-95" 
            enter-to-class="opacity-100 scale-100" 
            leave-active-class="transition duration-200 ease-in" 
            leave-from-class="opacity-100 scale-100" 
            leave-to-class="opacity-0 scale-95"
        >
            <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                
                <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" @click="emit('close')"></div>

                <div class="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl dark:shadow-none overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-white/50 dark:ring-slate-800 transition-colors duration-500">
                    <div class="px-6 py-6 sm:px-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 relative overflow-hidden transition-colors duration-500">
                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-50/50 dark:from-indigo-900/10 to-transparent"></div>
                        <div class="relative z-10 flex items-center gap-5">
                            <div class="w-14 h-14 bg-indigo-600 text-white rounded-[1.25rem] flex items-center justify-center text-2xl shadow-xl shadow-indigo-200 dark:shadow-none font-black transition-all duration-500 transform hover:scale-105">
                                {{ dayjs(props.date).format('DD') }}
                            </div>
                            <div>
                                <p class="text-indigo-600 dark:text-indigo-400 text-[11px] font-bold tracking-widest mb-1 transition-colors duration-500">{{ $t('calendar_day_overview', 'Command center') }}</p>
                                <h2 class="text-xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-none transition-colors duration-500">{{ displayDate }}</h2>
                            </div>
                        </div>
                        <button @click="emit('close')" class="relative z-10 w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 shadow-sm hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950/50 transition-colors duration-500">
                        <div class="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
                            
                            <div class="lg:col-span-3 space-y-10">
                                <div class="flex items-center justify-between border-b border-slate-100/80 dark:border-slate-800/80 pb-5 transition-colors duration-500">
                                    <h3 class="text-base font-black text-slate-800 dark:text-white flex items-center gap-3 transition-colors duration-500">
                                        <span class="text-xl">📅</span> {{ $t('calendar_events_schedule', 'Events schedule') }}
                                    </h3>
                                    <span class="text-[11px] font-black text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-sm transition-colors duration-500 tracking-widest">{{ dayData?.events.length || 0 }} {{ $t('calendar_events_count', 'events') }}</span>
                                </div>
                                
                                <div v-if="dayData?.events.length === 0" class="bg-white dark:bg-slate-900 rounded-[3rem] p-16 border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-none transition-colors duration-500">
                                    <div class="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6 text-5xl transition-colors duration-500">🍃</div>
                                    <h4 class="text-lg font-black text-slate-800 dark:text-white mb-2 transition-colors duration-500">{{ $t('calendar_no_events_title', 'Empty day') }}</h4>
                                    <p class="text-sm font-bold text-slate-400 dark:text-slate-500 max-w-[280px] leading-relaxed transition-colors duration-500">{{ $t('calendar_no_events_desc', 'Use this time to rest or focus on your personal life OS.') }}</p>
                                </div>

                                <div v-else class="relative border-l-[3px] border-slate-100 dark:border-slate-800 ml-6 space-y-10 transition-colors duration-500">
                                    <div class="absolute -top-3 -left-[6.5px] w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-500"></div>

                                    <div v-for="ev in dayData.events" :key="ev.id" class="relative pl-10 group">
                                        <div class="absolute top-2 -left-[9px] w-4 h-4 rounded-full border-[3px] border-white dark:border-slate-950 shadow-xl ring-4 ring-slate-100/50 dark:ring-slate-800/50 transition-all duration-500 group-hover:scale-125" :style="`background-color: ${ev.color}`"></div>
                                        
                                        <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none group-hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden">
                                            <div class="absolute top-0 left-0 w-2 h-full" :style="`background-color: ${ev.color}`"></div>
                                            
                                            <div class="flex justify-between items-start gap-6">
                                                <div class="flex-1">
                                                    <h4 class="font-black text-slate-800 dark:text-white text-lg sm:text-xl leading-tight transition-colors duration-500">{{ ev.title }}</h4>
                                                    <div class="flex items-center gap-4 mt-3">
                                                        <span v-if="ev.start_time" class="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2 transition-colors duration-500">
                                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                            {{ ev.start_time }} <span v-if="ev.end_time" class="mx-1.5 opacity-50">•</span> {{ ev.end_time }}
                                                        </span>
                                                        <span v-else-if="ev.is_all_day" class="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-500/20 transition-colors duration-500 tracking-widest">All day</span>
                                                    </div>
                                                    <div v-if="ev.description" class="mt-5 text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-800/50 p-5 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 transition-colors duration-500">
                                                        {{ ev.description }}
                                                    </div>
                                                </div>
                                                
                                                <div class="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                    <button @click="emit('edit-event', props.date, ev)" class="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-100 dark:border-slate-700 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white rounded-2xl shadow-sm transition-all active:scale-95">
                                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                    </button>
                                                    <button @click="emit('delete-event', ev.id)" class="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-slate-100 dark:border-slate-700 hover:bg-rose-600 dark:hover:bg-rose-500 hover:text-white rounded-2xl shadow-sm transition-all active:scale-95">
                                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="lg:col-span-2 space-y-6">
                                <div class="border-b border-slate-100/80 dark:border-slate-800/80 pb-5 mb-3 transition-colors duration-500">
                                    <h3 class="text-base font-black text-slate-800 dark:text-white flex items-center gap-3 transition-colors duration-500">
                                        <span class="text-xl">⚡</span> {{ $t('calendar_life_os_summary', 'Life OS summary') }}
                                    </h3>
                                </div>

                                <div class="grid grid-cols-1 gap-5">
                                    <Link :href="route('goals.index')" class="bg-orange-500 rounded-[3rem] p-6 text-white relative overflow-hidden group shadow-2xl shadow-orange-200 dark:shadow-none hover:-translate-y-2 transition-all duration-500">
                                        <div class="absolute -right-6 -top-6 text-9xl opacity-20 group-hover:rotate-12 transition-transform duration-700">🎯</div>
                                        <div class="relative z-10">
                                            <div class="flex justify-between items-center mb-4 md:mb-6">
                                                <span class="text-[10px] sm:text-[11px] font-black tracking-widest bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/20">{{ $t('calendar_goals', 'Goals & milestones') }}</span>
                                                <div class="w-8 h-8 rounded-full bg-white/20 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-orange-500 transition-all duration-500">
                                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                </div>
                                            </div>
                                            <div v-if="dailyMilestones.length > 0">
                                                <div class="space-y-3">
                                                    <div v-for="ms in dailyMilestones" :key="ms.id" class="bg-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl flex items-center justify-between border border-white/10 group-hover:border-white/30 transition-all shadow-lg">
                                                        <div class="min-w-0 pr-4">
                                                            <p class="text-[10px] font-bold tracking-widest text-orange-100/80 mb-0.5 leading-none">{{ ms.goal_title }}</p>
                                                            <p class="text-[13px] font-black text-white truncate leading-tight">{{ ms.title }}</p>
                                                        </div>
                                                        <span v-if="ms.completed" class="text-[10px] font-black bg-emerald-500/80 text-white px-2 py-1 rounded-lg ml-2 shrink-0 shadow-sm">DONE</span>
                                                        <span v-else class="text-[10px] font-black bg-white/20 text-white px-2 py-1 rounded-lg ml-2 shrink-0">PENDING</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else class="py-4">
                                                <p class="text-sm font-bold text-orange-50 leading-relaxed">{{ $t('calendar_empty_goals', 'No milestones due for this date.') }}</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link :href="route('planner.index', { date: props.date })" class="bg-blue-600 rounded-[3rem] p-6 text-white relative overflow-hidden group shadow-2xl shadow-blue-200 dark:shadow-none hover:-translate-y-2 transition-all duration-500">
                                        <div class="absolute -right-6 -top-6 text-9xl opacity-20 group-hover:rotate-12 transition-transform duration-700">✅</div>
                                        <div class="relative z-10">
                                            <div class="flex justify-between items-center mb-4 md:mb-6">
                                                <span class="text-[10px] sm:text-[11px] font-black tracking-widest bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/20">{{ $t('calendar_planner', 'Daily planner') }}</span>
                                                <div class="w-8 h-8 rounded-full bg-white/20 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all duration-500">
                                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                </div>
                                            </div>
                                            <div v-if="dailyPlanner && dailyPlanner.total_tasks > 0">
                                                <div class="flex items-end gap-3 mb-4">
                                                    <span class="text-5xl font-black leading-none drop-shadow-md">{{ dailyPlanner.completed_tasks }}</span>
                                                    <span class="text-blue-100 font-bold mb-1.5 text-base">/ {{ dailyPlanner.total_tasks }} tasks completed</span>
                                                </div>
                                                <div class="w-full bg-white/20 rounded-full h-4 mt-4 overflow-hidden border border-white/10 backdrop-blur-sm">
                                                    <div class="bg-white h-4 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.5)]" :style="{ width: `${plannerProgress}%` }"></div>
                                                </div>
                                            </div>
                                            <div v-else class="py-4">
                                                <p class="text-sm font-bold text-blue-50 leading-relaxed">{{ $t('calendar_empty_planner', 'No tasks recorded for this period.') }}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    
                                    <div class="grid grid-cols-2 gap-5">
                                        <Link :href="route('habits.index')" class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-slate-200/20 dark:shadow-none min-h-[160px] flex flex-col justify-between">
                                            <div class="absolute -right-3 -bottom-3 text-6xl opacity-[0.05] group-hover:scale-125 transition-transform duration-700">🌱</div>
                                            <div>
                                                <span class="text-[10px] sm:text-[11px] font-black tracking-widest text-emerald-500 mb-2 md:mb-3 block leading-none">{{ $t('calendar_habits', 'Habits') }}</span>
                                                <div v-if="dailyHabitCount > 0">
                                                    <span class="text-5xl font-black text-slate-800 dark:text-white block leading-none mb-2">{{ dailyHabitCount }}</span>
                                                    <span class="text-[11px] font-bold text-slate-400 tracking-wide">{{ $t('calendar_habits_done', 'Items completed') }}</span>
                                                </div>
                                                <div v-else class="mt-4">
                                                    <p class="text-xs font-bold text-slate-400 leading-relaxed">{{ $t('calendar_empty_habit', 'No habits logged.') }}</p>
                                                </div>
                                            </div>
                                        </Link>

                                        <Link :href="route('finance.index')" class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-slate-200/20 dark:shadow-none min-h-[160px] flex flex-col justify-between">
                                            <div class="absolute -right-3 -bottom-3 text-6xl opacity-[0.05] group-hover:scale-125 transition-transform duration-700">💸</div>
                                            <div>
                                                <span class="text-[10px] sm:text-[11px] font-black tracking-widest text-rose-500 mb-2 md:mb-3 block leading-none">{{ $t('calendar_finance', 'Finance') }}</span>
                                                <div v-if="dailyFinance > 0">
                                                    <h4 class="text-xl font-black text-slate-800 dark:text-white leading-tight mb-1 truncate">{{ formatCurrency(dailyFinance) }}</h4>
                                                    <span class="text-[11px] font-bold text-slate-400 tracking-wide">Daily spend</span>
                                                </div>
                                                <div v-else class="mt-4">
                                                    <p class="text-xs font-bold text-slate-400 leading-relaxed">{{ $t('calendar_empty_finance', 'No transactions.') }}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <Link :href="route('journal.index')" class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-slate-200/20 dark:shadow-none min-h-[160px]">
                                        <div class="absolute -right-3 -bottom-3 text-8xl opacity-[0.05] group-hover:rotate-12 transition-transform duration-700">📓</div>
                                        <div class="flex justify-between items-center mb-5">
                                            <span class="text-[11px] font-black tracking-widest text-purple-500 leading-none">{{ $t('calendar_journal', 'Personal journal') }}</span>
                                            <div v-if="dailyJournal" class="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-lg shadow-sm border border-purple-100 dark:border-purple-800/50">
                                                {{ dailyJournal.mood === 'Happy' ? '😊' : dailyJournal.mood === 'Sad' ? '😢' : dailyJournal.mood === 'Angry' ? '😠' : '😌' }}
                                            </div>
                                        </div>
                                        <div v-if="dailyJournal" class="relative z-10">
                                            <h4 class="font-black text-slate-800 dark:text-white text-lg truncate mb-1 leading-tight transition-colors duration-500">{{ dailyJournal.title || 'Daily Entry' }}</h4>
                                            <p class="text-[11px] font-bold text-purple-400 dark:text-purple-300 tracking-widest transition-colors duration-500">Mood score: {{ dailyJournal.mood || 'Neutral' }}</p>
                                        </div>
                                        <div v-else class="mt-4">
                                            <p class="text-sm font-bold text-slate-400 leading-relaxed">{{ $t('calendar_empty_journal', 'Empty page. Time to reflect?') }}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>