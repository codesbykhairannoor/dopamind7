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

                <div class="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-white/50">
                    <div class="px-6 py-6 sm:px-8 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-transparent"></div>
                        <div class="relative z-10 flex items-center gap-4">
                            <div class="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-indigo-200 font-black">
                                {{ dayjs(props.date).format('DD') }}
                            </div>
                            <div>
                                <p class="text-indigo-600 text-[10px] sm:text-xs font-black tracking-widest uppercase mb-0.5">{{ $t('calendar_day_overview', 'Pusat Komando') }}</p>
                                <h2 class="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">{{ displayDate }}</h2>
                            </div>
                        </div>
                        <button @click="emit('close')" class="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors active:scale-90">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50">
                        <div class="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                            
                            <div class="lg:col-span-3 space-y-6">
                                <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                                    <h3 class="text-sm font-black uppercase tracking-widest text-slate-800 flex items-center gap-2">
                                        <span>📅</span> {{ $t('calendar_events_schedule', 'Jadwal Acara') }}
                                    </h3>
                                    <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">{{ dayData?.events.length || 0 }} {{ $t('calendar_events_count', 'Acara') }}</span>
                                </div>
                                
                                <div v-if="dayData?.events.length === 0" class="bg-white rounded-3xl p-10 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
                                    <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-3xl">🍃</div>
                                    <h4 class="text-base font-black text-slate-700 mb-1">{{ $t('calendar_no_events_title', 'Hari Kosong') }}</h4>
                                    <p class="text-sm font-medium text-slate-400 max-w-[250px]">{{ $t('calendar_no_events_desc', 'Gunakan waktu ini untuk istirahat atau fokus pada Life OS kamu.') }}</p>
                                </div>

                                <div v-else class="relative border-l-2 border-slate-100 ml-4 space-y-6">
                                    <div class="absolute -top-2 -left-[5px] w-2 h-2 rounded-full bg-slate-200"></div>

                                    <div v-for="ev in dayData.events" :key="ev.id" class="relative pl-6 group">
                                        <div class="absolute top-1.5 -left-[7px] w-3 h-3 rounded-full border-2 border-white shadow-sm ring-2 ring-slate-100 transition-transform group-hover:scale-125" :style="`background-color: ${ev.color}`"></div>
                                        
                                        <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow relative overflow-hidden">
                                            <div class="absolute top-0 left-0 w-1 h-full" :style="`background-color: ${ev.color}`"></div>
                                            
                                            <div class="flex justify-between items-start gap-4">
                                                <div>
                                                    <h4 class="font-black text-slate-800 text-base leading-tight">{{ ev.title }}</h4>
                                                    <div class="flex items-center gap-3 mt-2">
                                                        <span v-if="ev.start_time" class="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded flex items-center gap-1">
                                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                            {{ ev.start_time }} <span v-if="ev.end_time">- {{ ev.end_time }}</span>
                                                        </span>
                                                        <span v-else-if="ev.is_all_day" class="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">Seharian</span>
                                                    </div>
                                                    <p v-if="ev.description" class="text-sm text-slate-500 mt-3 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{{ ev.description }}</p>
                                                </div>
                                                
                                                <div class="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button @click="emit('edit-event', props.date, ev)" class="w-8 h-8 flex items-center justify-center bg-slate-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-colors">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                    </button>
                                                    <button @click="emit('delete-event', ev.id)" class="w-8 h-8 flex items-center justify-center bg-slate-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-colors">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="lg:col-span-2 space-y-4">
                                <div class="border-b border-slate-200 pb-3 mb-2">
                                    <h3 class="text-sm font-black uppercase tracking-widest text-slate-800 flex items-center gap-2">
                                        <span>⚡</span> {{ $t('calendar_life_os_summary', 'Aktivitas Life OS') }}
                                    </h3>
                                </div>

                                <div class="grid grid-cols-2 gap-3 sm:gap-4">
                                    <Link :href="route('planner.index', { date: props.date })" class="col-span-2 bg-blue-500 rounded-3xl p-5 text-white relative overflow-hidden group shadow-lg shadow-blue-200 hover:-translate-y-1 transition-transform">
                                        <div class="absolute -right-4 -top-4 text-7xl opacity-20 group-hover:rotate-12 transition-transform">✅</div>
                                        <div class="relative z-10">
                                            <div class="flex justify-between items-center mb-4">
                                                <span class="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">{{ $t('calendar_planner', 'Tugas Planner') }}</span>
                                                <svg class="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </div>
                                            <div v-if="dailyPlanner && dailyPlanner.total_tasks > 0">
                                                <div class="flex items-end gap-2 mb-2">
                                                    <span class="text-4xl font-black leading-none">{{ dailyPlanner.completed_tasks }}</span>
                                                    <span class="text-blue-200 font-bold mb-1">/ {{ dailyPlanner.total_tasks }} {{ $t('calendar_tasks_done', 'Selesai') }}</span>
                                                </div>
                                                <div class="w-full bg-blue-700/50 rounded-full h-2.5 mt-2 overflow-hidden">
                                                    <div class="bg-white h-2.5 rounded-full transition-all duration-1000" :style="{ width: `${plannerProgress}%` }"></div>
                                                </div>
                                            </div>
                                            <div v-else class="py-2">
                                                <p class="text-sm font-bold text-blue-100">{{ $t('calendar_empty_planner', 'Belum ada tugas dicatat.') }}</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link :href="route('habits.index')" class="bg-emerald-50 border border-emerald-100 rounded-3xl p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-sm">
                                        <div class="absolute -right-2 -bottom-2 text-5xl opacity-10 group-hover:scale-110 transition-transform">🌱</div>
                                        <span class="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2 block">{{ $t('calendar_habits', 'Habit') }}</span>
                                        <div v-if="dailyHabitCount > 0" class="mt-2">
                                            <span class="text-4xl font-black text-emerald-600 block leading-none mb-1">{{ dailyHabitCount }}</span>
                                            <span class="text-xs font-bold text-emerald-400">{{ $t('calendar_habits_done', 'Tuntas hari ini') }}</span>
                                        </div>
                                        <div v-else class="mt-4">
                                            <p class="text-xs font-bold text-slate-400">{{ $t('calendar_empty_habit', 'Tidak ada habit diselesaikan.') }}</p>
                                        </div>
                                    </Link>

                                    <Link :href="route('finance.index')" class="bg-rose-50 border border-rose-100 rounded-3xl p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-sm flex flex-col justify-between">
                                        <div class="absolute -right-2 -bottom-2 text-5xl opacity-10 group-hover:scale-110 transition-transform">💸</div>
                                        <span class="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-2 block">{{ $t('calendar_finance', 'Pengeluaran') }}</span>
                                        <div v-if="dailyFinance > 0" class="mt-2">
                                            <span class="text-lg sm:text-xl font-black text-rose-600 block leading-tight">{{ formatCurrency(dailyFinance) }}</span>
                                        </div>
                                        <div v-else class="mt-4">
                                            <p class="text-xs font-bold text-slate-400">{{ $t('calendar_empty_finance', 'Tidak ada transaksi.') }}</p>
                                        </div>
                                    </Link>

                                    <Link :href="route('journal.index')" class="col-span-2 bg-purple-50 border border-purple-100 rounded-3xl p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-sm">
                                        <div class="absolute -right-2 top-2 text-5xl opacity-10 group-hover:rotate-12 transition-transform">📓</div>
                                        <div class="flex justify-between items-center mb-3">
                                            <span class="text-[10px] font-black uppercase tracking-widest text-purple-500">{{ $t('calendar_journal', 'Jurnal Pribadi') }}</span>
                                        </div>
                                        <div v-if="dailyJournal" class="bg-white p-3 rounded-2xl border border-purple-100 shadow-sm flex gap-3 items-center">
                                            <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl shrink-0">
                                                {{ dailyJournal.mood === 'Happy' ? '😊' : dailyJournal.mood === 'Sad' ? '😢' : dailyJournal.mood === 'Angry' ? '😠' : '😌' }}
                                            </div>
                                            <div class="overflow-hidden">
                                                <h4 class="font-black text-slate-800 text-sm truncate">{{ dailyJournal.title || 'Catatan Harian' }}</h4>
                                                <p class="text-[10px] font-bold text-purple-400 mt-0.5 uppercase tracking-wide">Mood: {{ dailyJournal.mood || 'Netral' }}</p>
                                            </div>
                                        </div>
                                        <div v-else class="mt-2">
                                            <p class="text-sm font-bold text-slate-400">{{ $t('calendar_empty_journal', 'Kamu belum menulis jurnal di hari ini.') }}</p>
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