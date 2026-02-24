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
    <transition
        enter-active-class="transition ease-in-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div v-if="show" class="fixed inset-0 z-[100] overflow-hidden">
            
            <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="emit('close')"></div>

            <div class="fixed inset-y-0 right-0 max-w-md w-full flex">
                <transition
                    enter-active-class="transform transition ease-in-out duration-300 sm:duration-500"
                    enter-from-class="translate-x-full"
                    enter-to-class="translate-x-0"
                    leave-active-class="transform transition ease-in-out duration-300 sm:duration-500"
                    leave-from-class="translate-x-0"
                    leave-to-class="translate-x-full"
                >
                    <div v-if="show" class="w-screen max-w-md">
                        <div class="h-full flex flex-col bg-slate-50 shadow-2xl">
                            
                            <div class="px-6 py-6 sm:px-8 bg-indigo-600 text-white relative overflow-hidden shrink-0">
                                <div class="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                                <div class="flex items-center justify-between relative z-10">
                                    <div>
                                        <p class="text-indigo-200 text-xs font-black tracking-widest uppercase mb-1">{{ $t('calendar_day_summary', 'Rangkuman Hari') }}</p>
                                        <h2 class="text-xl sm:text-2xl font-black tracking-tight">{{ displayDate }}</h2>
                                    </div>
                                    <button @click="emit('close')" class="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-700 hover:bg-indigo-800 transition-colors text-white">
                                        ✕
                                    </button>
                                </div>
                            </div>

                            <div class="flex-1 relative overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
                                
                                <div v-if="dayData">
                                    
                                    <div class="mb-8">
                                        <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                            <span>🗓️</span> {{ $t('calendar_events_schedule', 'Acara / Jadwal') }}
                                        </h3>
                                        
                                        <div v-if="dayData.events.length === 0" class="bg-white rounded-2xl p-4 border border-dashed border-slate-200 text-center text-slate-400 text-sm font-medium">
                                            {{ $t('calendar_no_events', 'Tidak ada acara hari ini.') }}
                                        </div>

                                        <div v-else class="space-y-3">
                                            <div v-for="ev in dayData.events" :key="ev.id" class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-start gap-4 group">
                                                <div class="w-1.5 h-10 rounded-full mt-1 shrink-0" :style="`background-color: ${ev.color}`"></div>
                                                <div class="flex-1">
                                                    <h4 class="font-bold text-slate-800 leading-tight">{{ ev.title }}</h4>
                                                    <p v-if="ev.description" class="text-xs text-slate-500 mt-1 line-clamp-2">{{ ev.description }}</p>
                                                </div>
                                                <div class="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button @click="emit('edit-event', props.date, ev)" class="text-[10px] bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 px-2 py-1 rounded font-bold">{{ $t('btn_edit', 'Edit') }}</button>
                                                    <button @click="emit('delete-event', ev.id)" class="text-[10px] bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-600 px-2 py-1 rounded font-bold">{{ $t('btn_delete', 'Hapus') }}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                            <span>⚡</span> {{ $t('calendar_life_os_summary', 'Life OS Summary') }}
                                        </h3>
                                        
                                        <div class="grid grid-cols-2 gap-4">
                                            
                                            <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                                <div class="text-xl mb-2">📓</div>
                                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ $t('calendar_journal', 'Jurnal') }}</p>
                                                <p v-if="dayData.hasJournal" class="text-sm font-bold text-purple-600 flex items-center gap-1">{{ $t('calendar_journal_written', '✓ Sudah Ditulis') }}</p>
                                                <p v-else class="text-sm font-bold text-slate-400">{{ $t('calendar_empty', 'Kosong') }}</p>
                                            </div>

                                            <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                                <div class="text-xl mb-2">💸</div>
                                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ $t('calendar_expense', 'Pengeluaran') }}</p>
                                                <p class="text-sm font-black text-rose-500 font-mono">{{ formatCurrency(dayData.expense) }}</p>
                                            </div>

                                            <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm col-span-2 flex items-center justify-between">
                                                <div class="flex items-center gap-3">
                                                    <div class="text-xl">🌱</div>
                                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ $t('calendar_habits', 'Habit') }}</p>
                                                </div>
                                                <div class="text-right">
                                                    <div v-if="dayData.habitDone > 0">
                                                        <span class="text-2xl font-black text-blue-600">{{ dayData.habitDone }}</span>
                                                        <span class="text-sm text-slate-400 font-bold"> {{ $t('calendar_habits_done', 'Tuntas') }}</span>
                                                    </div>
                                                    <p v-else class="text-sm font-bold text-slate-400">{{ $t('calendar_empty', 'Kosong') }}</p>
                                                </div>
                                            </div>

                                            <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm col-span-2 flex items-center justify-between">
                                                <div class="flex items-center gap-3">
                                                    <div class="text-xl">📅</div>
                                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ $t('calendar_daily_tasks', 'Tugas Harian') }}</p>
                                                </div>
                                                <div class="text-right">
                                                    <div v-if="dayData.planner">
                                                        <span class="text-2xl font-black text-slate-800">{{ dayData.planner.done }}</span>
                                                        <span class="text-sm text-slate-400 font-bold">/{{ dayData.planner.total }} {{ $t('calendar_tasks_done', 'Selesai') }}</span>
                                                    </div>
                                                    <p v-else class="text-sm font-bold text-slate-400">{{ $t('calendar_no_tasks', 'Tidak ada tugas') }}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </transition>
</template>