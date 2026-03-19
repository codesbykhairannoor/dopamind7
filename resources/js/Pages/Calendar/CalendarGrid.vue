<script setup>
import { computed, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';

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
        <div class="flex flex-wrap gap-2 sm:gap-2.5 items-center justify-start px-2 sm:px-0">
            <span class="text-[10px] sm:text-xs font-black text-slate-400 mr-2 uppercase tracking-widest hidden md:inline shrink-0">
                <svg class="w-4 h-4 inline-block -mt-0.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                {{ $t('calendar_focus', 'Fokus') }}
            </span>
            
            <button @click="toggleFilter('events')" :class="[filters.events ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50', 'filter-btn']">
                📅 <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">{{ $t('calendar_events') }}</span>
            </button>
            <button @click="toggleFilter('goals')" :class="[filters.goals ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-100' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50', 'filter-btn']">
                🎯 <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">{{ $t('calendar_goals', 'Goals') }}</span>
            </button>
            <button @click="toggleFilter('journal')" :class="[filters.journal ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50', 'filter-btn']">
                📓 <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">{{ $t('calendar_journal') }}</span>
            </button>
            <button @click="toggleFilter('habits')" :class="[filters.habits ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-100' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50', 'filter-btn']">
                🌱 <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">{{ $t('calendar_habits') }}</span>
            </button>
            <button @click="toggleFilter('planner')" :class="[filters.planner ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-100' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50', 'filter-btn']">
                ✅ <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">{{ $t('calendar_planner') }}</span>
            </button>
            <button @click="toggleFilter('finance')" :class="[filters.finance ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-100' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50', 'filter-btn']">
                💸 <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">{{ $t('calendar_finance') }}</span>
            </button>
        </div>

        <!-- ==================== MOBILE LAYOUT (<md) ==================== -->
        <div class="md:hidden space-y-6">
            <!-- Compact Grid -->
            <div class="bg-white rounded-[2rem] border border-slate-200 p-4 shadow-sm">
                <div class="grid grid-cols-7 mb-2">
                    <div v-for="day in dynamicDaysOfWeek" :key="day" class="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {{ day }}
                    </div>
                </div>
                <div class="grid grid-cols-7 gap-1">
                    <div v-for="(day, index) in calendarDays" :key="index" 
                        @click="day.date ? emit('open-detail', day.date) : null"
                        class="aspect-square flex flex-col items-center justify-center rounded-xl relative transition-all"
                        :class="[
                            !day.date ? 'opacity-0' : 
                            !day.isCurrentMonth ? 'text-slate-300' : 'text-slate-700',
                            props.selectedDate === day.date ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-110 z-10' : ''
                        ]"
                    >
                        <span class="text-xs font-black">{{ day.dayNumber }}</span>
                        <!-- Activity Dot -->
                        <div v-if="day.date && hasAnyMetric(day)" class="absolute bottom-1.5 flex gap-0.5">
                            <div v-if="filters.events && day.events?.length" class="w-1 h-1 rounded-full bg-indigo-400"></div>
                            <div v-if="filters.goals && day.milestones?.length" class="w-1 h-1 rounded-full bg-orange-400"></div>
                            <div v-if="filters.planner && day.planner?.total" class="w-1 h-1 rounded-full bg-blue-400"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Agenda View -->
            <div class="space-y-4">
                <div class="flex items-center justify-between px-2">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">
                        📅 Agenda: {{ dayjs(props.selectedDate).format('D MMM YYYY') }}
                    </h3>
                </div>

                <div v-if="selectedDay" class="space-y-3">
                    <!-- Events Section -->
                    <div v-if="filters.events && selectedDay.events?.length" class="space-y-2">
                        <div v-for="ev in selectedDay.events" :key="ev.id" 
                            class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                            <div class="w-1 h-8 rounded-full" :style="{ backgroundColor: ev.color }"></div>
                            <div class="flex-1">
                                <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Event</p>
                                <p class="text-sm font-bold text-slate-800">{{ ev.title }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Milestones Section (Checkable in Agenda!) -->
                    <div v-if="filters.goals && selectedDay.milestones?.length" class="space-y-2">
                        <div v-for="ms in selectedDay.milestones" :key="ms.id" 
                            class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                            <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :style="{ backgroundColor: ms.goal_color + '20', color: ms.goal_color }">
                                🎯
                            </div>
                            <div class="flex-1">
                                <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">{{ ms.goal_title }}</p>
                                <p class="text-sm font-bold text-slate-800">{{ ms.title }}</p>
                            </div>
                            <div v-if="ms.completed" class="text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">DONE</div>
                        </div>
                    </div>

                    <!-- Metrics Group -->
                    <div class="grid grid-cols-2 gap-3">
                        <div v-if="filters.journal && selectedDay.hasJournal" class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-purple-100 flex items-center gap-3">
                            <span class="text-xl">📓</span>
                            <div>
                                <p class="text-[9px] font-black uppercase tracking-widest text-purple-400">Journal</p>
                                <p class="text-xs font-bold text-slate-700">Wrote!</p>
                            </div>
                        </div>
                        <div v-if="filters.habits && selectedDay.habitDone" class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
                            <span class="text-xl">🌱</span>
                            <div>
                                <p class="text-[9px] font-black uppercase tracking-widest text-emerald-400">Habits</p>
                                <p class="text-xs font-bold text-slate-700">{{ selectedDay.habitDone }} Done</p>
                            </div>
                        </div>
                        <div v-if="filters.planner && selectedDay.planner" class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
                            <span class="text-xl">{{ selectedDay.planner.done >= selectedDay.planner.total ? '✅' : '⏳' }}</span>
                            <div>
                                <p class="text-[9px] font-black uppercase tracking-widest text-blue-400">Tasks</p>
                                <p class="text-xs font-bold text-slate-700">{{ selectedDay.planner.done }}/{{ selectedDay.planner.total }}</p>
                            </div>
                        </div>
                        <div v-if="filters.finance && selectedDay.expense" class="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-rose-100 flex items-center gap-3">
                            <span class="text-xl">💸</span>
                            <div>
                                <p class="text-[9px] font-black uppercase tracking-widest text-rose-400">Expense</p>
                                <p class="text-xs font-bold text-slate-700">{{ compactCurrency(selectedDay.expense) }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Empty Agenda -->
                    <div v-if="!hasAnyMetric(selectedDay)" class="py-12 text-center bg-white rounded-3xl border border-slate-100">
                        <span class="text-3xl mb-2 block">🎐</span>
                        <p class="text-xs font-bold text-slate-400 italic">No activity for this day.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ==================== DESKTOP LAYOUT (>=md) ==================== -->
        <div class="hidden md:block bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            <div class="flex flex-col p-5 pb-5">
                
                <div class="grid grid-cols-7 mb-4 border-b border-slate-100 pb-3">
                    <div v-for="day in dynamicDaysOfWeek" :key="day" class="text-center text-sm font-black text-slate-400 uppercase tracking-widest">
                        {{ day }}
                    </div>
                </div>

                <div class="grid grid-cols-7 auto-rows-fr gap-3">
                    <div v-for="(day, index) in calendarDays" :key="index" 
                        @click="day.date ? emit('open-detail', day.date) : null"
                        class="min-h-[180px] flex flex-col transition-all duration-300 relative group rounded-[1.5rem] overflow-hidden border"
                        :class="[
                            !day.date ? 'border-transparent' : 
                            !day.isCurrentMonth ? 'bg-slate-50/50 text-slate-400 border-slate-100 opacity-60' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 cursor-pointer z-10',
                            day.isToday ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                            props.selectedDate === day.date ? 'border-indigo-500 bg-indigo-50/10' : ''
                        ]"
                    >
                        <template v-if="day.date">
                            <div class="flex justify-between items-start p-3 pb-1.5">
                                <span class="w-9 h-9 flex items-center justify-center rounded-full text-base font-black transition-all"
                                    :class="day.isToday ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-700 bg-slate-100 group-hover:bg-indigo-100 group-hover:text-indigo-700'">
                                    {{ day.dayNumber }}
                                </span>
                                <span v-if="day.isToday" class="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1 mr-1">{{ $t('calendar_today') }}</span>
                            </div>

                            <div class="flex flex-col flex-1 p-2.5 gap-2">
                                <!-- Events & Milestones Badge List -->
                                <div class="flex flex-col gap-1.5 w-full shrink-0">
                                    <template v-if="filters.events">
                                        <div v-for="event in day.events?.slice(0, 2)" :key="event.id" 
                                            class="px-2.5 py-1 rounded-r-lg border-l-[3px] bg-indigo-50/30 text-slate-700 text-[10px] font-bold truncate transition-colors"
                                            :style="{ borderLeftColor: event.color }">
                                            {{ event.title }}
                                        </div>
                                    </template>
                                    <template v-if="filters.goals">
                                        <div v-for="ms in day.milestones?.slice(0, 1)" :key="ms.id" 
                                            class="px-2.5 py-1 rounded-r-lg border-l-[3px] bg-orange-50/30 text-slate-700 text-[10px] font-bold truncate transition-colors"
                                            :style="{ borderLeftColor: ms.goal_color }">
                                            🎯 {{ ms.title }}
                                        </div>
                                    </template>
                                    <div v-if="(day.events?.length + day.milestones?.length) > 3" class="text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded w-fit">
                                        +{{ (day.events?.length + day.milestones?.length) - 3 }} more
                                    </div>
                                </div>

                                <div class="flex-1"></div>

                                <!-- Metric Icons -->
                                <div v-if="hasAnyMetric(day)" class="flex flex-wrap gap-1 mt-auto pt-2 border-t border-slate-100/80">
                                    <div v-if="day.hasJournal && filters.journal" class="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-[10px] border border-purple-100">📓</div>
                                    <div v-if="day.habitDone > 0 && filters.habits" class="px-1.5 h-6 rounded-lg bg-emerald-50 flex items-center gap-1 text-[10px] font-black text-emerald-700 border border-emerald-100">
                                        🌱 <span>{{ day.habitDone }}</span>
                                    </div>
                                    <div v-if="day.planner?.total > 0 && filters.planner" class="px-1.5 h-6 rounded-lg bg-blue-50 flex items-center gap-1 text-[10px] font-black text-blue-700 border border-blue-100">
                                        {{ day.planner.done >= day.planner.total ? '✅' : '⏳' }} <span>{{ day.planner.done }}</span>
                                    </div>
                                    <div v-if="day.expense > 0 && filters.finance" class="px-1.5 h-6 rounded-lg bg-rose-50 flex items-center gap-1 text-[10px] font-black text-rose-700 border border-rose-100">
                                        💸 <span>{{ compactCurrency(day.expense) }}</span>
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
    @apply px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-sm font-bold transition-all duration-300 border flex items-center gap-2 shrink-0;
}
</style>