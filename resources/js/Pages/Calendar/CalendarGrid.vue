<script setup>
import { computed, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';

const props = defineProps({
    calendarDays: Array
});

const emit = defineEmits(['open-detail']);
const page = usePage();

// 🔥 1. STATE UNTUK FILTER
const filters = ref({
    events: true,
    journal: true,
    habits: true,
    planner: true,
    finance: true
});

const toggleFilter = (key) => {
    filters.value[key] = !filters.value[key];
};

// 🔥 2. FUNGSI MENGHITUNG JUMLAH METRIK YANG AKTIF (Excluding Events)
const activeMetricsCount = (day) => {
    let count = 0;
    if (filters.value.journal && day.hasJournal) count++;
    if (filters.value.habits && day.habitDone > 0) count++;
    if (filters.value.planner && day.planner && day.planner.total > 0) count++;
    if (filters.value.finance && day.expense > 0) count++;
    return count;
};

// Cek apakah ada minimal 1 metrik yang muncul
const hasAnyMetric = (day) => {
    return activeMetricsCount(day) > 0;
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
</script>

<template>
    <div class="flex flex-col gap-4 sm:gap-6">
        
        <div class="flex flex-wrap gap-2.5 items-center justify-start px-2 sm:px-0">
            <span class="text-[10px] sm:text-xs font-black text-slate-400 mr-2 uppercase tracking-widest hidden md:inline flex-shrink-0">
                <svg class="w-4 h-4 inline-block -mt-0.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                {{ $t('calendar_focus', 'Fokus') }}
            </span>
            
            <button @click="toggleFilter('events')" class="px-3.5 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-sm font-bold transition-all duration-300 border flex items-center gap-2"
                :class="filters.events ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'">
                📅 <span class="hidden sm:inline">{{ $t('calendar_events') }}</span>
            </button>
            <button @click="toggleFilter('journal')" class="px-3.5 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-sm font-bold transition-all duration-300 border flex items-center gap-2"
                :class="filters.journal ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'">
                📓 <span class="hidden sm:inline">{{ $t('calendar_journal') }}</span>
            </button>
            <button @click="toggleFilter('habits')" class="px-3.5 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-sm font-bold transition-all duration-300 border flex items-center gap-2"
                :class="filters.habits ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'">
                🌱 <span class="hidden sm:inline">{{ $t('calendar_habits') }}</span>
            </button>
            <button @click="toggleFilter('planner')" class="px-3.5 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-sm font-bold transition-all duration-300 border flex items-center gap-2"
                :class="filters.planner ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'">
                ✅ <span class="hidden sm:inline">{{ $t('calendar_planner') }}</span>
            </button>
            <button @click="toggleFilter('finance')" class="px-3.5 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-sm font-bold transition-all duration-300 border flex items-center gap-2"
                :class="filters.finance ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-200' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'">
                💸 <span class="hidden sm:inline">{{ $t('calendar_finance') }}</span>
            </button>
        </div>

        <div class="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            
            <div class="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 lg:hidden"></div>

            <div class="overflow-x-auto w-full custom-horizontal-scrollbar">
                <div class="min-w-[1024px] lg:min-w-full flex flex-col p-3 sm:p-5 pb-5">
                    
                    <div class="grid grid-cols-7 mb-3 border-b border-slate-100 pb-3">
                        <div v-for="day in dynamicDaysOfWeek" :key="day" class="text-center text-xs sm:text-sm font-black text-slate-400 uppercase tracking-widest">
                            {{ day }}
                        </div>
                    </div>

                    <div class="grid grid-cols-7 auto-rows-fr gap-3">
                        
                        <div v-for="(day, index) in calendarDays" :key="index" 
                            @click="day.date ? emit('open-detail', day.date) : null"
                            class="min-h-[160px] sm:min-h-[180px] flex flex-col transition-all duration-300 relative group rounded-[1.25rem] overflow-hidden border"
                            :class="[
                                !day.date ? 'border-transparent' : 
                                !day.isCurrentMonth ? 'bg-slate-50/50 text-slate-400 border-slate-100 opacity-60' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 cursor-pointer z-10',
                                day.isToday ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                            ]"
                        >
                            <template v-if="day.date">
                                
                                <div class="flex justify-between items-start p-3 pb-1.5">
                                    <span class="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-sm sm:text-base font-black transition-all"
                                        :class="day.isToday ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-700 bg-slate-100 group-hover:bg-indigo-100 group-hover:text-indigo-700'">
                                        {{ day.dayNumber }}
                                    </span>
                                    <span v-if="day.isToday" class="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1 mr-1">{{ $t('calendar_today') }}</span>
                                </div>

                                <div class="flex flex-col flex-1 p-2.5 gap-2.5">
                                    
                                    <template v-if="filters.events && day.events.length > 0">
                                        <div class="flex flex-col gap-2 w-full shrink-0">
                                            <div v-for="event in day.events.slice(0, hasAnyMetric(day) ? 2 : 4)" :key="event.id" 
                                                class="px-2.5 py-1.5 rounded-r-lg border-l-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-bold leading-tight truncate transition-colors"
                                                :style="{ borderLeftColor: event.color }">
                                                {{ event.title }}
                                            </div>
                                            <div v-if="day.events.length > (hasAnyMetric(day) ? 2 : 4)" class="text-[10px] sm:text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md w-fit mt-0.5">
                                                +{{ day.events.length - (hasAnyMetric(day) ? 2 : 4) }} {{ $t('calendar_more_events') }}
                                            </div>
                                        </div>
                                    </template>

                                    <div class="flex-1"></div>

                                    <div v-if="hasAnyMetric(day)" class="grid gap-1.5 mt-auto pt-2 border-t border-slate-100/80"
                                        :class="activeMetricsCount(day) > 2 ? 'grid-cols-2' : 'grid-cols-1'">
                                        
                                        <div v-if="day.hasJournal && filters.journal" 
                                            class="flex items-center justify-between px-2.5 py-2 rounded-lg bg-purple-50 text-purple-700 transition-colors hover:bg-purple-100 border border-purple-100/50">
                                            <div class="flex items-center gap-1.5">
                                                <span class="text-xs sm:text-sm">📓</span>
                                                <span v-if="activeMetricsCount(day) <= 2" class="uppercase tracking-widest text-[9px] sm:text-[10px] font-black text-purple-500/80">{{ $t('calendar_journal') }}</span>
                                            </div>
                                            <span v-if="activeMetricsCount(day) <= 2" class="text-xs sm:text-sm font-black">✓</span>
                                        </div>
                                        
                                        <div v-if="day.habitDone > 0 && filters.habits" 
                                            class="flex items-center justify-between px-2.5 py-2 rounded-lg bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100 border border-emerald-100/50">
                                            <div class="flex items-center gap-1.5">
                                                <span class="text-xs sm:text-sm">🌱</span>
                                                <span v-if="activeMetricsCount(day) <= 2" class="uppercase tracking-widest text-[9px] sm:text-[10px] font-black text-emerald-500/80">{{ $t('calendar_habits') }}</span>
                                            </div>
                                            <span class="text-[11px] sm:text-xs font-black">{{ day.habitDone }}</span>
                                        </div>

                                        <div v-if="day.planner && day.planner.total > 0 && filters.planner" 
                                            class="flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors border" 
                                            :class="Number(day.planner.done) >= Number(day.planner.total) ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100/50' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'">
                                            <div class="flex items-center gap-1.5">
                                                <span v-if="Number(day.planner.done) >= Number(day.planner.total)" class="text-[10px] sm:text-xs">✅</span>
                                                <span v-else class="text-[10px] sm:text-xs opacity-70">⏳</span>
                                                <span v-if="activeMetricsCount(day) <= 2" class="uppercase tracking-widest text-[9px] sm:text-[10px] font-black" :class="Number(day.planner.done) >= Number(day.planner.total) ? 'text-blue-500/80' : 'text-slate-400'">{{ $t('calendar_tasks') }}</span>
                                            </div>
                                            <span class="text-[11px] sm:text-xs font-black">{{ day.planner.done }}/{{ day.planner.total }}</span>
                                        </div>

                                        <div v-if="day.expense > 0 && filters.finance" 
                                            class="flex items-center justify-between px-2.5 py-2 rounded-lg bg-rose-50 text-rose-700 transition-colors hover:bg-rose-100 border border-rose-100/50">
                                            <div class="flex items-center gap-1.5">
                                                <span class="text-xs sm:text-sm">💸</span>
                                                <span v-if="activeMetricsCount(day) <= 2" class="uppercase tracking-widest text-[9px] sm:text-[10px] font-black text-rose-500/80">{{ $t('calendar_finance') }}</span>
                                            </div>
                                            <span class="text-[11px] sm:text-xs font-black">{{ compactCurrency(day.expense) }}</span>
                                        </div>

                                    </div>

                                    <div v-if="day.events.length === 0 && !hasAnyMetric(day)" 
                                        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <span class="text-4xl font-light text-slate-200">+</span>
                                    </div>

                                </div>
                            </template>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-horizontal-scrollbar::-webkit-scrollbar {
    height: 8px;
}
.custom-horizontal-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-horizontal-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 10px;
}
.custom-horizontal-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: #94a3b8;
}
</style>