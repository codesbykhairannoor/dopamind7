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

// 🔥 2. FUNGSI CERDAS: MENGHITUNG MODE TAMPILAN
const getDisplayMode = (day) => {
    let metricsCount = 0;
    if (filters.value.journal && day.hasJournal) metricsCount++;
    if (filters.value.habits && day.habitDone > 0) metricsCount++;
    if (filters.value.planner && day.planner && day.planner.total > 0) metricsCount++;
    if (filters.value.finance && day.expense > 0) metricsCount++;

    const hasEvents = filters.value.events && (day.events?.length > 0);
    const totalItems = metricsCount + (hasEvents ? 1 : 0);

    // Jika total item di layar hanya 1 atau 2, biarkan mereka mengisi ruang sepenuhnya secara proporsional
    if (totalItems === 1 || totalItems === 2) return 'balanced';
    
    return 'compact'; // Jika > 2, tumpuk rapi agar muat
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
        
        <div class="flex flex-wrap gap-2 items-center justify-start px-2 sm:px-0">
            <span class="text-[9px] sm:text-[10px] font-black text-slate-400 mr-1 uppercase tracking-widest hidden sm:inline">{{ $t('calendar_focus') }}:</span>
            
            <button @click="toggleFilter('events')" class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 border"
                :class="filters.events ? 'bg-slate-800 text-white border-slate-800 shadow-md scale-105' : 'bg-transparent text-slate-400 border-slate-200 hover:bg-slate-50'">
                📅 <span class="hidden sm:inline">{{ $t('calendar_events') }}</span>
            </button>
            <button @click="toggleFilter('journal')" class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 border"
                :class="filters.journal ? 'bg-purple-50 text-purple-600 border-purple-200 shadow-sm scale-105' : 'bg-transparent text-slate-400 border-slate-200 hover:bg-slate-50'">
                📓 <span class="hidden sm:inline">{{ $t('calendar_journal') }}</span>
            </button>
            <button @click="toggleFilter('habits')" class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 border"
                :class="filters.habits ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm scale-105' : 'bg-transparent text-slate-400 border-slate-200 hover:bg-slate-50'">
                🌱 <span class="hidden sm:inline">{{ $t('calendar_habits') }}</span>
            </button>
            <button @click="toggleFilter('planner')" class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 border"
                :class="filters.planner ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm scale-105' : 'bg-transparent text-slate-400 border-slate-200 hover:bg-slate-50'">
                ✅ <span class="hidden sm:inline">{{ $t('calendar_planner') }}</span>
            </button>
            <button @click="toggleFilter('finance')" class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 border"
                :class="filters.finance ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-sm scale-105' : 'bg-transparent text-slate-400 border-slate-200 hover:bg-slate-50'">
                💸 <span class="hidden sm:inline">{{ $t('calendar_finance') }}</span>
            </button>
        </div>

        <div class="bg-slate-50/50 p-2 sm:p-5 rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100">
            
            <div class="grid grid-cols-7 mb-2 sm:mb-3">
                <div v-for="day in dynamicDaysOfWeek" :key="day" class="text-center text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">
                    {{ day }}
                </div>
            </div>

            <div class="grid grid-cols-7 auto-rows-fr gap-1 sm:gap-3">
                
                <div v-for="(day, index) in calendarDays" :key="index" 
                    @click="day.date ? emit('open-detail', day.date) : null"
                    class="min-h-[85px] sm:min-h-[140px] flex flex-col transition-all duration-500 relative group rounded-xl sm:rounded-[1.25rem] overflow-hidden border border-transparent"
                    :class="[
                        !day.date ? '' : 
                        !day.isCurrentMonth ? 'bg-white/40 text-slate-300 border-slate-50' : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 cursor-pointer hover:-translate-y-1 z-10',
                    ]"
                >
                    <template v-if="day.date">
                        
                        <div class="flex justify-between items-start p-1.5 sm:p-2.5">
                            <span class="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-[10px] sm:text-sm font-black transition-all"
                                :class="day.isToday ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 group-hover:text-indigo-600 bg-slate-50/50 group-hover:bg-indigo-50'">
                                {{ day.dayNumber }}
                            </span>
                            <span v-if="day.isToday" class="hidden sm:inline text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1 mr-1">{{ $t('calendar_today') }}</span>
                        </div>

                        <div class="flex flex-col flex-1 px-1 pb-1 sm:px-1.5 sm:pb-1.5 gap-1" :class="getDisplayMode(day) === 'balanced' ? '' : 'justify-end'">
                            
                            <template v-if="filters.events && day.events.length > 0">
                                <div class="w-full shrink-0" :class="getDisplayMode(day) === 'balanced' ? 'flex-1 flex flex-col justify-center' : ''">
                                    
                                    <div class="flex sm:hidden flex-row flex-wrap gap-1 justify-center sm:justify-start px-1">
                                        <div v-for="event in day.events" :key="'mob-'+event.id" class="w-1.5 h-1.5 rounded-full" :style="`background-color: ${event.color}`"></div>
                                    </div>

                                    <div class="hidden sm:flex flex-col gap-0.5" :class="getDisplayMode(day) === 'balanced' && day.events.length === 1 ? 'items-center scale-110' : ''">
                                        <div v-for="event in day.events.slice(0, 3)" :key="event.id" class="flex items-center gap-1.5 px-1 py-0.5 hover:bg-slate-50 rounded-md">
                                            <span class="w-1.5 h-1.5 rounded-full shrink-0" :style="`background-color: ${event.color}`"></span>
                                            <span class="text-[10px] text-slate-600 font-medium truncate">{{ event.title }}</span>
                                        </div>
                                        <div v-if="day.events.length > 3" class="text-[8px] font-bold text-slate-400 px-1 mt-0.5">
                                            +{{ day.events.length - 3 }} {{ $t('calendar_more_events') }}
                                        </div>
                                    </div>

                                </div>
                            </template>

                            <div class="flex gap-0.5 sm:gap-1 w-full" :class="getDisplayMode(day) === 'balanced' ? 'flex-col sm:flex-row flex-1' : 'flex-col'">
                                
                                <div v-if="day.hasJournal && filters.journal" 
                                    class="flex transition-all duration-500 rounded-lg sm:rounded-xl overflow-hidden" 
                                    :class="getDisplayMode(day) === 'balanced' ? 'flex-col items-center justify-center bg-purple-50/50 border border-purple-100/50 flex-1 py-1' : 'justify-center sm:justify-between items-center px-1 sm:px-2 py-1 bg-slate-50'">
                                    <span class="hidden sm:block uppercase font-black text-purple-400" :class="getDisplayMode(day) === 'balanced' ? 'text-[9px] tracking-widest mb-1' : 'text-[8px] tracking-wider'">{{ $t('calendar_journal_short') }}</span>
                                    <span :class="getDisplayMode(day) === 'balanced' ? 'text-xl sm:text-2xl drop-shadow-sm transition-transform group-hover:scale-110' : 'text-[10px]'">📓</span>
                                </div>
                                
                                <div v-if="day.habitDone > 0 && filters.habits" 
                                    class="flex transition-all duration-500 rounded-lg sm:rounded-xl overflow-hidden" 
                                    :class="getDisplayMode(day) === 'balanced' ? 'flex-col items-center justify-center bg-emerald-50/50 border border-emerald-100/50 flex-1 py-1' : 'justify-between items-center px-1 sm:px-2 py-1 bg-slate-50'">
                                    <span class="hidden sm:block uppercase font-black text-emerald-500" :class="getDisplayMode(day) === 'balanced' ? 'text-[9px] tracking-widest mb-1' : 'text-[8px] tracking-wider'">{{ $t('calendar_habits_short') }}</span>
                                    <div class="flex items-center gap-1 font-black text-emerald-600" :class="getDisplayMode(day) === 'balanced' ? 'flex-col text-[10px] sm:text-xs' : 'text-[8px] sm:text-[9px]'">
                                        <span :class="getDisplayMode(day) === 'balanced' ? 'text-xl sm:text-2xl drop-shadow-sm transition-transform group-hover:scale-110' : ''">🌱</span>
                                        <span>{{ day.habitDone }}</span>
                                    </div>
                                </div>

                                <div v-if="day.planner && day.planner.total > 0 && filters.planner" 
                                    class="flex transition-all duration-500 rounded-lg sm:rounded-xl overflow-hidden" 
                                    :class="[
                                        getDisplayMode(day) === 'balanced' ? 'flex-col items-center justify-center border flex-1 py-1' : 'justify-between items-center px-1 sm:px-2 py-1',
                                        Number(day.planner.done) >= Number(day.planner.total) ? 'bg-blue-50/50 text-blue-600 border-blue-100/50' : 'bg-slate-50 text-slate-600 border-transparent'
                                    ]">
                                    <span class="hidden sm:block uppercase font-black" 
                                        :class="[getDisplayMode(day) === 'balanced' ? 'text-[9px] tracking-widest mb-1' : 'text-[8px] tracking-wider', Number(day.planner.done) >= Number(day.planner.total) ? 'text-blue-400' : 'text-slate-400']">
                                        {{ $t('calendar_tasks_short') }}
                                    </span>
                                    <div class="flex items-center gap-0.5 sm:gap-1 font-black" :class="getDisplayMode(day) === 'balanced' ? 'flex-col text-[10px] sm:text-xs' : 'text-[8px] sm:text-[9px]'">
                                        <span v-if="Number(day.planner.done) >= Number(day.planner.total)" :class="getDisplayMode(day) === 'balanced' ? 'text-xl sm:text-2xl drop-shadow-sm transition-transform group-hover:scale-110' : ''">✅</span>
                                        <span v-else :class="getDisplayMode(day) === 'balanced' ? 'text-xl sm:text-2xl drop-shadow-sm opacity-50' : ''">⏳</span>
                                        <span>{{ day.planner.done }}/{{ day.planner.total }}</span>
                                    </div>
                                </div>

                                <div v-if="day.expense > 0 && filters.finance" 
                                    class="flex transition-all duration-500 rounded-lg sm:rounded-xl overflow-hidden" 
                                    :class="getDisplayMode(day) === 'balanced' ? 'flex-col items-center justify-center bg-rose-50/50 border border-rose-100/50 flex-1 py-1' : 'justify-between items-center px-1 sm:px-2 py-1 bg-slate-50'">
                                    <span class="hidden sm:block uppercase font-black text-rose-400" :class="getDisplayMode(day) === 'balanced' ? 'text-[9px] tracking-widest mb-1' : 'text-[8px] tracking-wider'">{{ $t('calendar_expense_short') }}</span>
                                    <div class="flex items-center gap-1 font-black text-rose-600" :class="getDisplayMode(day) === 'balanced' ? 'flex-col text-[10px] sm:text-xs' : 'text-[8px] sm:text-[9px]'">
                                        <span :class="getDisplayMode(day) === 'balanced' ? 'text-xl sm:text-2xl drop-shadow-sm transition-transform group-hover:scale-110' : ''">💸</span>
                                        <span>{{ compactCurrency(day.expense) }}</span>
                                    </div>
                                </div>

                            </div>

                            <div v-if="getDisplayMode(day) === 'compact' && day.events.length === 0 && !day.hasJournal && !day.habitDone && (!day.planner || day.planner.total === 0) && !day.expense" 
                                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <span class="text-2xl sm:text-3xl font-light text-slate-300">+</span>
                            </div>

                        </div>
                    </template>
                </div>

            </div>
        </div>
    </div>
</template>