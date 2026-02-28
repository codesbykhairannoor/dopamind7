<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import { usePage } from '@inertiajs/vue3';

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

const displayDate = computed(() => {
    const locale = page.props.locale || 'id';
    return props.date ? dayjs(props.date).locale(locale).format('dddd, DD MMMM YYYY') : '';
});

const formatCurrency = (angka) => {
    const locale = page.props.locale || 'id';
    return new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', { style: 'currency', currency: locale === 'id' ? 'IDR' : 'USD', maximumFractionDigits: 0 }).format(angka);
};
</script>

<template>
    <Teleport to="body">
        <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                
                <div class="absolute inset-0 bg-indigo-900/40 backdrop-blur-md transition-opacity" @click="emit('close')"></div>

                <transition
                    enter-active-class="transform transition ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-8 scale-95"
                    enter-to-class="opacity-100 translate-y-0 scale-100"
                    leave-active-class="transform transition ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 scale-100"
                    leave-to-class="opacity-0 translate-y-8 scale-95"
                >
                    <div v-if="show" class="relative w-full max-w-2xl bg-slate-50/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(79,70,229,0.4)] overflow-hidden flex flex-col max-h-[90vh]">
                        
                        <div class="px-6 py-6 sm:px-8 bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative overflow-hidden shrink-0">
                            <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white dark:bg-slate-900/10 rounded-full blur-2xl"></div>
                            <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-indigo-900/20 rounded-full blur-xl"></div>
                            
                            <div class="flex items-center justify-between relative z-10">
                                <div>
                                    <p class="text-indigo-200 text-[10px] sm:text-xs font-black tracking-widest uppercase mb-1">{{ $t('calendar_day_summary') }}</p>
                                    <h2 class="text-xl sm:text-3xl font-black tracking-tight drop-shadow-sm">{{ displayDate }}</h2>
                                </div>
                                <button @click="emit('close')" class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-900/10 hover:bg-white dark:bg-slate-900/20 border border-white/10 backdrop-blur-sm transition-all text-white active:scale-90">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                        </div>

                        <div class="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar relative z-10">
                            
                            <div v-if="dayData" class="space-y-8">
                                
                                <div>
                                    <h3 class="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3 flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        {{ $t('calendar_life_os_summary') }}
                                    </h3>
                                    
                                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                        
                                        <div class="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                                            <div class="absolute -right-2 -top-2 text-4xl opacity-5 group-hover:scale-110 transition-transform">📓</div>
                                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{{ $t('calendar_journal') }}</p>
                                            <div v-if="dayData.hasJournal" class="flex items-center gap-1.5 text-purple-600">
                                                <div class="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-xs">✓</div>
                                                <span class="text-xs font-bold leading-none">{{ $t('calendar_journal_written') }}</span>
                                            </div>
                                            <p v-else class="text-xs font-bold text-slate-300">-</p>
                                        </div>

                                        <div class="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                                            <div class="absolute -right-2 -top-2 text-4xl opacity-5 group-hover:scale-110 transition-transform">💸</div>
                                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{{ $t('calendar_expense_short') }}</p>
                                            <p class="text-sm sm:text-base font-black text-rose-500 truncate" :title="formatCurrency(dayData.expense)">
                                                {{ dayData.expense > 0 ? formatCurrency(dayData.expense) : '-' }}
                                            </p>
                                        </div>

                                        <div class="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                                            <div class="absolute -right-2 -top-2 text-4xl opacity-5 group-hover:scale-110 transition-transform">🌱</div>
                                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{{ $t('calendar_habits') }}</p>
                                            <div v-if="dayData.habitDone > 0" class="flex items-baseline gap-1">
                                                <span class="text-xl font-black text-blue-600 leading-none">{{ dayData.habitDone }}</span>
                                                <span class="text-[9px] text-slate-400 font-bold uppercase">{{ $t('calendar_habits_done') }}</span>
                                            </div>
                                            <p v-else class="text-xs font-bold text-slate-300">-</p>
                                        </div>

                                        <div class="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                                            <div class="absolute -right-2 -top-2 text-4xl opacity-5 group-hover:scale-110 transition-transform">📅</div>
                                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{{ $t('calendar_tasks') }}</p>
                                            <div v-if="dayData.planner" class="flex items-baseline gap-1">
                                                <span class="text-xl font-black" :class="Number(dayData.planner.done) >= Number(dayData.planner.total) ? 'text-emerald-500' : 'text-slate-800'">
                                                    {{ dayData.planner.done }}
                                                </span>
                                                <span class="text-xs text-slate-400 font-bold">/{{ dayData.planner.total }}</span>
                                            </div>
                                            <p v-else class="text-xs font-bold text-slate-300">-</p>
                                        </div>

                                    </div>
                                </div>

                                <div>
                                    <div class="flex items-center justify-between mb-4">
                                        <h3 class="text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            {{ $t('calendar_events_schedule') }}
                                        </h3>
                                    </div>
                                    
                                    <div v-if="dayData.events.length === 0" class="bg-white dark:bg-slate-900 rounded-[1.5rem] p-8 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                                        <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3 text-2xl">🍃</div>
                                        <h4 class="text-sm font-black text-slate-600 mb-1">{{ $t('calendar_no_events_title') }}</h4>
                                        <p class="text-xs font-medium text-slate-400">{{ $t('calendar_no_events_desc') }}</p>
                                    </div>

                                    <div v-else class="space-y-3">
                                        <div v-for="ev in dayData.events" :key="ev.id" class="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 shadow-sm flex items-start gap-4 group hover:shadow-md transition-shadow">
                                            <div class="w-2 h-full min-h-[40px] rounded-full shrink-0" :style="`background-color: ${ev.color}`"></div>
                                            <div class="flex-1 py-0.5">
                                                <h4 class="font-black text-slate-800 leading-tight text-sm sm:text-base">{{ ev.title }}</h4>
                                                <p v-if="ev.description" class="text-[11px] sm:text-xs text-slate-500 mt-1.5 leading-relaxed">{{ ev.description }}</p>
                                            </div>
                                            
                                            <div class="flex flex-col sm:flex-row gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button @click="emit('edit-event', props.date, ev)" class="w-8 h-8 flex items-center justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-colors">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                </button>
                                                <button @click="emit('delete-event', ev.id)" class="w-8 h-8 flex items-center justify-center bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-colors">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </transition>
            </div>
        </transition>
    </Teleport>
</template>