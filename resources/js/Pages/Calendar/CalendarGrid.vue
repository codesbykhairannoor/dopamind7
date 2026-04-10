<script setup>
import { computed, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import { useAppearance } from '@/Composables/useAppearance';

const { isDark } = useAppearance();

const props = defineProps({
    calendarDays: Array,
    selectedDate: String
});

const emit = defineEmits(['open-detail', 'open-event-modal']);
const page = usePage();

// 🔥 1. STATE UNTUK FILTER
const filters = ref({
    events: true,
    journal: true,
    habits: true,
    planner: true,
    finance: true,
    goals: true
});

const toggleFilter = (key) => {
    filters.value[key] = !filters.value[key];
};

// Data hari yang sedang dipilih
const selectedDay = computed(() => {
    return props.calendarDays.find(d => d.date === props.selectedDate);
});

// 🔥 2. FUNGSI MENGHITUNG JUMLAH METRIK YANG AKTIF (Excluding Events)
const activeMetricsCount = (day) => {
    let count = 0;
    if (filters.value.journal && day.hasJournal) count++;
    if (filters.value.habits && day.habitDone > 0) count++;
    if (filters.value.planner && day.planner && day.planner.total > 0) count++;
    if (filters.value.finance && day.expense > 0) count++;
    if (filters.value.goals && day.milestones?.length > 0) count++;
    return count;
};

// Cek apakah ada minimal 1 metrik yang muncul
const hasAnyMetric = (day) => {
    return activeMetricsCount(day) > 0 || (filters.value.events && day.events?.length > 0);
};

const dynamicDaysOfWeek = computed(() => {
    const locale = page.props.locale || 'id';
    const days = [];
    for (let i = 1; i <= 7; i++) {
        days.push(dayjs().locale(locale).day(i).format('ddd')); 
    }
    return days;
});

const compactCurrency = (value) => {
    if (!value) return '';
    const currentLocale = page.props.locale || 'id';
    return new Intl.NumberFormat(currentLocale === 'id' ? 'id-ID' : 'en-US', { 
        notation: 'compact', 
        maximumFractionDigits: 1 
    }).format(value);
};

// Mapping warna status untuk Goals/Milestones
const getStatusColor = (color) => {
    return color || '#6366f1'; // Default indigo
};
</script>

<template>
    <div class="flex flex-col gap-4 sm:gap-6">
           <!-- Filter Bar -->
        <div class="flex flex-wrap gap-2 sm:gap-3 items-center justify-start px-2 sm:px-0 scrollbar-hide overflow-x-auto pb-2 sm:pb-0">
            <span class="text-[11px] font-bold text-slate-400 mr-2 tracking-widest hidden md:inline shrink-0">
                <svg class="w-4 h-4 inline-block -mt-0.5 mr-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                {{ $t('calendar_focus', 'Focus') }}
            </span>
            
            <button @click="toggleFilter('events')" :class="[filters.events ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50', 'filter-btn']">
                <span>📅</span> <span class="text-[11px] font-bold tracking-tight">{{ $t('calendar_events') }}</span>
            </button>
            <button @click="toggleFilter('goals')" :class="[filters.goals ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-200 dark:shadow-none' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-500/50', 'filter-btn']">
                <span>🎯</span> <span class="text-[11px] font-bold tracking-tight">{{ $t('calendar_goals', 'Goals') }}</span>
            </button>
            <button @click="toggleFilter('journal')" :class="[filters.journal ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200 dark:shadow-none' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500/50', 'filter-btn']">
                <span>📓</span> <span class="text-[11px] font-bold tracking-tight">{{ $t('calendar_journal') }}</span>
            </button>
            <button @click="toggleFilter('habits')" :class="[filters.habits ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-200 dark:shadow-none' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-500/50', 'filter-btn']">
                <span>🌱</span> <span class="text-[11px] font-bold tracking-tight">{{ $t('calendar_habits') }}</span>
            </button>
            <button @click="toggleFilter('planner')" :class="[filters.planner ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-200 dark:shadow-none' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50', 'filter-btn']">
                <span>✅</span> <span class="text-[11px] font-bold tracking-tight">{{ $t('calendar_planner') }}</span>
            </button>
            <button @click="toggleFilter('finance')" :class="[filters.finance ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200 dark:shadow-none' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-500/50', 'filter-btn']">
                <span>💸</span> <span class="text-[11px] font-bold tracking-tight">{{ $t('calendar_finance') }}</span>
            </button>
        </div>

        <!-- ==================== MOBILE LAYOUT (<md) ==================== -->
        <div class="md:hidden space-y-8 px-2 sm:px-0">
            <!-- Compact Grid -->
            <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-5 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div class="grid grid-cols-7 mb-4">
                    <div v-for="day in dynamicDaysOfWeek" :key="day" class="text-center text-[10px] font-bold text-slate-400 tracking-[0.15em]">
                        {{ day }}
                    </div>
                </div>
                <div class="grid grid-cols-7 gap-2">
                    <div v-for="(day, index) in calendarDays" :key="index" 
                        @click="day.date ? emit('open-detail', day.date) : null"
                        class="aspect-square flex flex-col items-center justify-center rounded-2xl relative transition-all active:scale-90"
                        :class="[
                            !day.date ? 'opacity-0' : 
                            !day.isCurrentMonth ? 'text-slate-300 dark:text-slate-700' : 'text-slate-800 dark:text-slate-200',
                            props.selectedDate === day.date ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none scale-110 z-10' : 'bg-slate-50/50 dark:bg-slate-800/30'
                        ]"
                    >
                        <span class="text-sm font-black">{{ day.dayNumber }}</span>
                        <!-- Activity Dot -->
                        <div v-if="day.date && hasAnyMetric(day)" class="absolute bottom-1.5 flex gap-0.5">
                            <div v-if="filters.events && day.events?.length" class="w-1 h-1 rounded-full bg-indigo-400 shadow-sm"></div>
                            <div v-if="filters.goals && day.milestones?.length" class="w-1 h-1 rounded-full bg-orange-400 shadow-sm"></div>
                            <div v-if="filters.planner && day.planner?.total" class="w-1 h-1 rounded-full bg-blue-400 shadow-sm"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Agenda View -->
            <div class="space-y-6">
                <div class="flex items-center justify-between px-2">
                    <h3 class="text-sm font-black text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        Agenda: {{ dayjs(props.selectedDate).format('D MMM YYYY') }}
                    </h3>
                </div>

                <div v-if="selectedDay" class="space-y-4">
                    <!-- Events Section -->
                    <div v-if="filters.events && selectedDay.events?.length" class="space-y-3">
                        <div v-for="ev in selectedDay.events" :key="ev.id" 
                            class="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                            <div class="w-1.5 h-10 rounded-full" :style="{ backgroundColor: ev.color }"></div>
                            <div class="flex-1">
                                <p class="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">Event</p>
                                <p class="text-base font-bold text-slate-800 dark:text-slate-200 leading-tight">{{ ev.title }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Milestones Section (Checkable in Agenda!) -->
                    <div v-if="filters.goals && selectedDay.milestones?.length" class="space-y-3">
                        <div v-for="ms in selectedDay.milestones" :key="ms.id" 
                            class="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                            <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-50 dark:border-slate-800" :style="{ backgroundColor: ms.goal_color + '15', color: ms.goal_color }">
                                <span class="text-xl">🎯</span>
                            </div>
                            <div class="flex-1">
                                <p class="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">{{ ms.goal_title }}</p>
                                <p class="text-base font-bold text-slate-800 dark:text-slate-200 leading-tight">{{ ms.title }}</p>
                            </div>
                            <div v-if="ms.completed" class="bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
                                <span class="text-[10px] font-black text-emerald-600 dark:text-emerald-400 tracking-widest">Done</span>
                            </div>
                        </div>
                    </div>

                    <!-- Metrics Group -->
                    <div class="grid grid-cols-2 gap-4">
                        <div v-if="filters.journal && selectedDay.hasJournal" class="bg-purple-50/50 dark:bg-purple-500/5 p-5 rounded-[2rem] border border-purple-100/50 dark:border-purple-900/20 flex flex-col gap-2">
                             <div class="w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-xl shadow-sm">📓</div>
                             <div>
                                <p class="text-[10px] font-bold tracking-widest text-purple-400 mb-0.5">Journal</p>
                                <p class="text-sm font-bold text-slate-800 dark:text-slate-300">New entry written</p>
                             </div>
                        </div>
                        <div v-if="filters.habits && selectedDay.habitDone" class="bg-emerald-50/50 dark:bg-emerald-500/5 p-5 rounded-[2rem] border border-emerald-100/50 dark:border-emerald-900/20 flex flex-col gap-2">
                             <div class="w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-xl shadow-sm">🌱</div>
                             <div>
                                <p class="text-[10px] font-bold tracking-widest text-emerald-400 mb-0.5">Habits</p>
                                <p class="text-sm font-bold text-slate-800 dark:text-slate-300">{{ selectedDay.habitDone }} items done</p>
                             </div>
                        </div>
                        <div v-if="filters.planner && selectedDay.planner" class="bg-blue-50/50 dark:bg-blue-500/5 p-5 rounded-[2rem] border border-blue-100/50 dark:border-blue-900/20 flex flex-col gap-2">
                             <div class="w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-xl shadow-sm">
                                {{ selectedDay.planner.done >= selectedDay.planner.total ? '✅' : '⏳' }}
                             </div>
                             <div>
                                <p class="text-[10px] font-bold tracking-widest text-blue-400 mb-0.5">Tasks</p>
                                <p class="text-sm font-bold text-slate-800 dark:text-slate-300">{{ selectedDay.planner.done }}/{{ selectedDay.planner.total }} completed</p>
                             </div>
                        </div>
                        <div v-if="filters.finance && selectedDay.expense" class="bg-rose-50/50 dark:bg-rose-500/5 p-5 rounded-[2rem] border border-rose-100/50 dark:border-rose-900/20 flex flex-col gap-2">
                             <div class="w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-xl shadow-sm">💸</div>
                             <div>
                                <p class="text-[10px] font-bold tracking-widest text-rose-400 mb-0.5">Finance</p>
                                <p class="text-sm font-bold text-slate-800 dark:text-slate-300">{{ compactCurrency(selectedDay.expense) }} spent</p>
                             </div>
                        </div>
                    </div>

                    <!-- Empty Agenda -->
                    <div v-if="!hasAnyMetric(selectedDay)" class="py-16 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div class="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🎐</div>
                        <h4 class="text-base font-bold text-slate-800 dark:text-white mb-2">Steady winds ahead</h4>
                        <p class="text-sm font-medium text-slate-400 dark:text-slate-500">No activity recorded for this day yet.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ==================== DESKTOP LAYOUT (>=md) ==================== -->
        <div class="hidden md:block bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden transition-colors duration-500">
            <div class="flex flex-col p-8 pb-8">
                
                <div class="grid grid-cols-7 mb-6 border-b border-slate-50 dark:border-slate-800 pb-5">
                    <div v-for="day in dynamicDaysOfWeek" :key="day" class="text-center text-[11px] font-black text-slate-400 tracking-[0.2em]">
                        {{ day }}
                    </div>
                </div>

                <div class="grid grid-cols-7 auto-rows-fr gap-4">
                    <div v-for="(day, index) in calendarDays" :key="index" 
                        @click="day.date ? emit('open-detail', day.date) : null"
                        class="min-h-[220px] flex flex-col transition-all duration-500 relative group rounded-[2.5rem] overflow-hidden border transition-all"
                        :class="[
                            !day.date ? 'border-transparent' : 
                            !day.isCurrentMonth ? 'bg-slate-50/30 dark:bg-slate-900/30 text-slate-300 dark:text-slate-700 border-slate-50 dark:border-slate-800 opacity-40' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-none cursor-pointer z-10',
                            day.isToday ? 'ring-[3px] ring-indigo-500/20 ring-offset-4 dark:ring-offset-slate-900' : '',
                            props.selectedDate === day.date ? 'border-indigo-500 !bg-indigo-50/5 dark:!bg-indigo-500/5' : ''
                        ]"
                    >
                        <template v-if="day.date">
                            <div class="flex justify-between items-start p-5 pb-2">
                                <span class="w-11 h-11 flex items-center justify-center rounded-2xl text-lg font-black transition-all duration-500"
                                    :class="day.isToday ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none translate-y--1' : 'text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-indigo-500/30 group-hover:-translate-y-1'">
                                    {{ day.dayNumber }}
                                </span>
                                <div v-if="day.isToday" class="flex flex-col items-end">
                                    <span class="text-[10px] font-black text-indigo-500 tracking-widest">{{ $t('calendar_today') }}</span>
                                    <div class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shadow-sm"></div>
                                </div>
                            </div>

                            <div class="flex flex-col flex-1 p-4 pb-5 gap-3">
                                <!-- Events & Milestones Badge List -->
                                <div class="flex flex-col gap-2 w-full shrink-0">
                                    <template v-if="filters.events">
                                        <div v-for="event in day.events?.slice(0, 2)" :key="event.id" 
                                            class="px-3 py-1.5 rounded-xl border border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-sm text-slate-700 dark:text-slate-300 text-[11px] font-bold truncate flex items-center gap-2 group-hover:border-indigo-100 dark:group-hover:border-indigo-900/50 transition-all"
                                            >
                                            <div class="w-1.5 h-1.5 rounded-full shrink-0 shadow-sm" :style="{ backgroundColor: event.color }"></div>
                                            <span class="truncate">{{ event.title }}</span>
                                        </div>
                                    </template>
                                    <template v-if="filters.goals">
                                        <div v-for="ms in day.milestones?.slice(0, 1)" :key="ms.id" 
                                            class="px-3 py-1.5 rounded-xl border border-orange-100/50 dark:border-orange-900/30 bg-orange-50/20 dark:bg-orange-950/20 text-slate-700 dark:text-slate-300 text-[11px] font-bold truncate flex items-center gap-2 transition-all"
                                            >
                                            <div class="shrink-0">🎯</div>
                                            <span class="truncate">{{ ms.title }}</span>
                                        </div>
                                    </template>
                                    <div v-if="(day.events?.length + (day.milestones?.length || 0)) > 3" class="text-[9px] font-black text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-lg w-fit ml-1 border border-slate-100 dark:border-slate-800">
                                        +{{ (day.events?.length + day.milestones?.length) - 3 }} more
                                    </div>
                                </div>

                                               <!-- Metric Icons -->
                                <div v-if="hasAnyMetric(day)" class="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-100/50 dark:border-slate-800/50 transition-colors">
                                    <div v-if="day.hasJournal && filters.journal" class="w-7 h-7 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-[11px] border border-purple-100 dark:border-purple-800/40 shadow-sm" :title="$t('calendar_journal')">📓</div>
                                    <div v-if="day.habitDone > 0 && filters.habits" class="px-2 h-7 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40 shadow-sm" :title="$t('calendar_habits')">
                                        <span>🌱</span> <span class="font-black">{{ day.habitDone }}</span>
                                    </div>
                                    <div v-if="day.planner?.total > 0 && filters.planner" class="px-2 h-7 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center gap-1.5 text-[11px] font-bold text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 shadow-sm" :title="$t('calendar_planner')">
                                        <span>{{ day.planner.done >= day.planner.total ? '✅' : '⏳' }}</span> <span class="font-black">{{ day.planner.done }}</span>
                                    </div>
                                    <div v-if="day.expense > 0 && filters.finance" class="px-2 h-7 rounded-xl bg-rose-50 dark:bg-rose-900/20 flex items-center gap-1.5 text-[11px] font-bold text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800/40 shadow-sm" :title="$t('calendar_finance')">
                                        <span>💸</span> <span class="font-black">{{ compactCurrency(day.expense) }}</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter-btn {
    @apply px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl text-[11px] font-bold transition-all duration-500 border flex items-center gap-2.5 shrink-0 transform active:scale-95;
}
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>