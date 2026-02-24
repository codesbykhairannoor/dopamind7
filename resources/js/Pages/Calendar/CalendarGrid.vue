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
    <div class="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        
        <div class="grid grid-cols-7 bg-slate-100 border-b border-slate-200">
            <div v-for="day in dynamicDaysOfWeek" :key="day" class="py-3 sm:py-4 text-center text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">
                {{ day }}
            </div>
        </div>

        <div class="grid grid-cols-7 auto-rows-fr bg-slate-200 gap-px">
            
            <div v-for="(day, index) in calendarDays" :key="index" 
                @click="day.date ? emit('open-detail', day.date) : null"
                class="min-h-[130px] sm:min-h-[160px] flex flex-col bg-white transition-colors relative group overflow-hidden"
                :class="[
                    !day.isCurrentMonth ? 'bg-slate-50/70 text-slate-300' : 'hover:bg-indigo-50/40 cursor-pointer',
                ]"
            >
                <template v-if="day.date">
                    
                    <div class="flex justify-between items-center px-2 py-1.5 mb-1" :class="day.isToday ? 'bg-indigo-600' : 'bg-slate-50'">
                        <span v-if="day.isToday" class="text-[8px] sm:text-[9px] font-black text-indigo-200 uppercase tracking-widest">{{ $t('calendar_today') }}</span>
                        <span v-else class="text-[8px] sm:text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{{ $t('calendar_open') }}</span>
                        
                        <span class="flex items-center justify-center text-xs sm:text-sm font-black transition-all"
                            :class="day.isToday ? 'text-white' : 'text-slate-700'">
                            {{ day.dayNumber }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-1 px-1.5 flex-1 overflow-hidden">
                        <div v-for="event in day.events.slice(0, 2)" :key="event.id" 
                            class="text-[9px] sm:text-[10px] font-bold px-1.5 py-1 rounded-[4px] truncate text-white shadow-sm w-full leading-none"
                            :style="`background-color: ${event.color}`">
                            {{ event.title }}
                        </div>
                        <div v-if="day.events.length > 2" class="text-[8px] sm:text-[9px] font-bold text-slate-400 px-1 truncate mt-0.5">
                            +{{ day.events.length - 2 }} {{ $t('calendar_more_events') }}
                        </div>
                        
                        <div v-if="day.events.length === 0 && !day.hasJournal && !day.habitDone && !day.planner && !day.expense" 
                            class="flex-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span class="text-2xl opacity-10 grayscale">+</span>
                        </div>
                    </div>

                    <div class="flex flex-col mt-auto w-full border-t border-slate-100 pt-px gap-px bg-slate-100">
                        
                        <div v-if="day.hasJournal" 
                            class="flex justify-between items-center px-2 py-1 bg-purple-50 text-purple-700 w-full" 
                            :title="$t('journal_filled')">
                            <span class="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold truncate">{{ $t('calendar_journal') }}</span>
                            <span class="text-[10px]">📓</span>
                        </div>
                        
                        <div v-if="day.habitDone > 0" 
                            class="flex justify-between items-center px-2 py-1 bg-blue-50 text-blue-700 w-full" 
                            :title="`${day.habitDone} ${$t('habit_completed')}`">
                            <span class="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold truncate">{{ $t('calendar_habits') }}</span>
                            <span class="text-[9px] sm:text-[10px] font-black">🌱 {{ day.habitDone }}</span>
                        </div>

                        <div v-if="day.planner && day.planner.total > 0" 
                            class="flex justify-between items-center px-2 py-1 w-full transition-colors" 
                            :class="Number(day.planner.done) >= Number(day.planner.total) ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'">
                            <span class="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold truncate">{{ $t('calendar_tasks') }}</span>
                            <div class="flex items-center gap-1">
                                <span v-if="Number(day.planner.done) >= Number(day.planner.total)" class="text-[8px]">✅</span>
                                <span v-else class="text-[8px]">⏳</span>
                                <span class="text-[9px] sm:text-[10px] font-black">{{ day.planner.done }}/{{ day.planner.total }}</span>
                            </div>
                        </div>

                        <div v-if="day.expense > 0" 
                            class="flex justify-between items-center px-2 py-1 bg-rose-50 text-rose-700 w-full" 
                            :title="`${$t('calendar_expense_label')}: ${day.expense}`">
                            <span class="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold truncate">{{ $t('calendar_expense_short') }}</span>
                            <span class="text-[9px] sm:text-[10px] font-black">💸 {{ compactCurrency(day.expense) }}</span>
                        </div>

                    </div>

                </template>
            </div>

        </div>
    </div>
</template>