<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';

const props = defineProps({
    calendarDays: Array
});

const emit = defineEmits(['open-detail']);
const page = usePage();

// 1. DINAMIS: Generate Hari Senin - Minggu berdasarkan bahasa User
const dynamicDaysOfWeek = computed(() => {
    const locale = page.props.locale || 'id';
    const days = [];
    for (let i = 1; i <= 7; i++) {
        days.push(dayjs().locale(locale).day(i).format('ddd')); 
    }
    return days;
});

// 2. FORMATTER: Ubah angka panjang jadi ringkas (Contoh: 150000 -> 150 rb / 150K)
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
    <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        
        <div class="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
            <div v-for="day in dynamicDaysOfWeek" :key="day" class="py-4 text-center text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">
                {{ day }}
            </div>
        </div>

        <div class="grid grid-cols-7 auto-rows-fr bg-slate-100 gap-px">
            
            <div v-for="(day, index) in calendarDays" :key="index" 
                @click="day.date ? emit('open-detail', day.date) : null"
                class="min-h-[110px] sm:min-h-[130px] flex flex-col bg-white p-1.5 sm:p-2.5 transition-all relative group"
                :class="[
                    !day.isCurrentMonth ? 'bg-slate-50/50 opacity-50' : 'hover:bg-indigo-50/30 cursor-pointer',
                ]"
            >
                <div v-if="day.date" class="flex justify-end mb-1.5">
                    <span class="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-[11px] sm:text-xs font-black transition-all"
                        :class="day.isToday ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 group-hover:text-indigo-600 group-hover:bg-indigo-100'">
                        {{ day.dayNumber }}
                    </span>
                </div>

                <div v-if="day.date" class="flex flex-col flex-1 gap-1 w-full overflow-hidden">
                    
                    <div v-for="event in day.events.slice(0, 2)" :key="event.id" 
                        class="text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded truncate text-white shadow-sm w-full leading-tight"
                        :style="`background-color: ${event.color}`">
                        {{ event.title }}
                    </div>
                    <div v-if="day.events.length > 2" class="text-[8px] font-bold text-slate-400 px-1 truncate">
                        +{{ day.events.length - 2 }} {{ $t('calendar_more', 'lagi') }}
                    </div>

                    <div class="flex flex-wrap gap-1 mt-auto pt-1 pb-0.5">
                        
                        <div v-if="day.hasJournal" 
                            class="flex items-center justify-center bg-purple-50 text-purple-600 border border-purple-100/50 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded shrink-0" 
                            :title="$t('journal_filled', 'Jurnal telah ditulis')">
                            📓
                        </div>
                        
                        <div v-if="day.habitDone > 0" 
                            class="flex items-center gap-0.5 bg-blue-50 text-blue-600 border border-blue-100 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded shrink-0 leading-none" 
                            :title="`${day.habitDone} ${$t('habit_completed', 'Habit selesai')}`">
                            🌱 <span>{{ day.habitDone }}</span>
                        </div>

                        <div v-if="day.planner && day.planner.total > 0" 
                            class="flex items-center gap-0.5 border text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded shrink-0 leading-none" 
                            :class="day.planner.done === day.planner.total ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'"
                            :title="`${day.planner.done}/${day.planner.total} ${$t('calendar_tasks', 'Tugas')}`">
                            <span v-if="day.planner.done === day.planner.total">✅</span>
                            <span v-else>⏳</span>
                            <span>{{ day.planner.done }}/{{ day.planner.total }}</span>
                        </div>

                        <div v-if="day.expense > 0" 
                            class="flex items-center gap-0.5 bg-rose-50 text-rose-600 border border-rose-100 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded shrink-0 leading-none" 
                            :title="`${$t('calendar_expense', 'Pengeluaran')}: ${day.expense}`">
                            💸 <span>{{ compactCurrency(day.expense) }}</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    </div>
</template>