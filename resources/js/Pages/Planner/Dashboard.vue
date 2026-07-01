<script setup>
import { ref, computed } from 'vue';
import { Head, router, Link } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, CheckCircle2, Droplets, Inbox, Maximize2 } from 'lucide-vue-next';
import { trans } from 'laravel-vue-i18n';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';

import DayPreviewModal from './DayPreviewModal.vue';

const props = defineProps({
    tasks: { type: Array, default: () => [] },
    dailyLogs: { type: Array, default: () => [] },
    currentDate: String
});

// Setup Initial State
const activeDate = ref(dayjs(props.currentDate));
const currentMonth = computed(() => activeDate.value.format('MMMM YYYY'));

// Modal State
const isPreviewOpen = ref(false);
const selectedDayData = ref(null);

const previousMonth = () => {
    activeDate.value = activeDate.value.subtract(1, 'month').startOf('month');
    fetchData();
};

const nextMonth = () => {
    activeDate.value = activeDate.value.add(1, 'month').startOf('month');
    fetchData();
};

const fetchData = () => {
    router.get(route('planner.dashboard'), { date: activeDate.value.format('YYYY-MM-DD') }, {
        preserveState: true,
        preserveScroll: true,
    });
};

// Generate Calendar Grid
const calendarDays = computed(() => {
    const startOfMonth = activeDate.value.startOf('month');
    const endOfMonth = activeDate.value.endOf('month');
    const startDay = startOfMonth.day(); // 0 is Sunday, 1 is Monday
    
    // We want Monday to be the first day of the week, so adjust startDay
    const adjustedStartDay = startDay === 0 ? 6 : startDay - 1; 
    
    const days = [];
    
    // Previous Month padding
    for (let i = 0; i < adjustedStartDay; i++) {
        const d = startOfMonth.subtract(adjustedStartDay - i, 'day');
        days.unshift(createDayObject(d, false));
    }
    
    // Current Month days
    for (let i = 1; i <= endOfMonth.date(); i++) {
        const d = startOfMonth.date(i);
        days.push(createDayObject(d, true));
    }
    
    // Next Month padding to fill 42 cells (6 rows)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
        const d = endOfMonth.add(i, 'day');
        days.push(createDayObject(d, false));
    }
    
    return days;
});

const createDayObject = (date, isCurrentMonth) => {
    const dateStr = date.format('YYYY-MM-DD');
    const isToday = dateStr === dayjs().format('YYYY-MM-DD');
    
    // Find Tasks
    const dayTasks = props.tasks.filter(t => t.date === dateStr);
    const completedTasks = dayTasks.filter(t => t.is_completed).length;
    const totalTasks = dayTasks.length;
    
    // Find DailyLog
    const dayLog = props.dailyLogs.find(l => l.date === dateStr);
    
    // Water
    let waterLevel = 0;
    if (dayLog && dayLog.water) {
        waterLevel = dayLog.water.level || 0;
    }
    
    // Inbox / Taskbox
    let inboxItems = [];
    if (dayLog && dayLog.task_box) {
        inboxItems = dayLog.task_box;
    }

    return {
        date: date,
        dateStr: dateStr,
        dayNumber: date.date(),
        isCurrentMonth,
        isToday,
        tasks: { completed: completedTasks, total: totalTasks, items: dayTasks },
        water: waterLevel,
        inbox: { items: inboxItems }
    };
};

const openPreview = (dayData) => {
    selectedDayData.value = dayData;
    isPreviewOpen.value = true;
};

const goToDailyPlanner = (dateStr) => {
    router.visit(route('planner.index', { date: dateStr }));
};

const weekDays = [
    trans('day_monday', 'Senin'), 
    trans('day_tuesday', 'Selasa'), 
    trans('day_wednesday', 'Rabu'), 
    trans('day_thursday', 'Kamis'), 
    trans('day_friday', 'Jumat'), 
    trans('day_saturday', 'Sabtu'), 
    trans('day_sunday', 'Minggu')
];
</script>

<template>
    <Head :title="trans('planner_dashboard', 'Planner Dashboard')" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
        <!-- Menggunakan full width max-w-[1800px] -->
        <div class="w-full max-w-[1800px] mx-auto space-y-8">
            
            <!-- Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-black text-slate-800 dark:text-white">{{ trans('planner_dashboard', 'Planner Dashboard') }}</h1>
                    <p class="text-slate-500 dark:text-slate-400 mt-1 font-medium">{{ trans('planner_dashboard_desc', 'Gambaran besar produktivitasmu bulan ini.') }}</p>
                </div>
                
                <div class="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <button @click="previousMonth" class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300">
                        <ChevronLeft :size="20" />
                    </button>
                    <span class="font-bold text-slate-800 dark:text-white min-w-[140px] text-center">{{ currentMonth }}</span>
                    <button @click="nextMonth" class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300">
                        <ChevronRight :size="20" />
                    </button>
                </div>
            </div>

            <!-- Calendar Grid -->
            <div class="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                
                <!-- Weekdays Header -->
                <div class="grid grid-cols-7 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div v-for="day in weekDays" :key="day" class="p-4 text-center font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {{ day }}
                    </div>
                </div>

                <!-- Calendar Body -->
                <div class="grid grid-cols-7">
                    <div 
                        v-for="day in calendarDays" 
                        :key="day.dateStr"
                        @click="openPreview(day)"
                        class="min-h-[150px] p-3 border-b border-r border-slate-100 dark:border-slate-800 relative group cursor-pointer transition-all duration-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10"
                        :class="[
                            !day.isCurrentMonth ? 'bg-slate-50/50 dark:bg-slate-950/30' : 'bg-white dark:bg-slate-900',
                            day.isToday ? 'ring-2 ring-inset ring-indigo-500' : ''
                        ]"
                    >
                        <!-- Date Number & Quick Actions -->
                        <div class="flex items-center justify-between mb-3">
                            <span 
                                class="w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm transition-colors"
                                :class="[
                                    day.isToday ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-700 dark:text-slate-300',
                                    !day.isCurrentMonth && !day.isToday ? 'opacity-30' : ''
                                ]"
                            >
                                {{ day.dayNumber }}
                            </span>

                            <!-- Quick Open Daily Planner Button -->
                            <button 
                                @click.stop="goToDailyPlanner(day.dateStr)"
                                class="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-800 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 shadow-sm border border-slate-100 dark:border-slate-700"
                                :title="trans('planner_open_detail', 'Buka Daily Planner')"
                            >
                                <Maximize2 :size="14" />
                            </button>
                        </div>

                        <!-- Data Summaries -->
                        <div class="space-y-1.5" :class="{ 'opacity-50': !day.isCurrentMonth }">
                            
                            <!-- Tasks -->
                            <div v-if="day.tasks.total > 0" class="flex items-center justify-between px-2 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                                <div class="flex items-center gap-1.5">
                                    <CheckCircle2 :size="12" />
                                    <span class="hidden xl:inline">{{ trans('planner_tasks', 'Tasks') }}</span>
                                </div>
                                <span>{{ day.tasks.completed }}/{{ day.tasks.total }}</span>
                            </div>
                            
                            <!-- Water -->
                            <div v-if="day.water > 0" class="flex items-center justify-between px-2 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                                <div class="flex items-center gap-1.5">
                                    <Droplets :size="12" />
                                    <span class="hidden xl:inline">{{ trans('planner_water', 'Air') }}</span>
                                </div>
                                <span>{{ day.water }}/8</span>
                            </div>
                            
                            <!-- Inbox -->
                            <div v-if="day.inbox?.items?.length > 0" class="flex items-center justify-between px-2 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs font-semibold">
                                <div class="flex items-center gap-1.5">
                                    <Inbox :size="12" />
                                    <span class="hidden xl:inline">{{ trans('planner_inbox', 'Inbox') }}</span>
                                </div>
                                <span>{{ day.inbox.items.length }}</span>
                            </div>

                        </div>
                        
                        <!-- Hover Overlay Effect -->
                        <div class="absolute inset-0 border-2 border-indigo-500 opacity-0 group-hover:opacity-100 rounded-[0.5rem] pointer-events-none transition-opacity"></div>
                    </div>
                </div>

            </div>

        </div>
    </div>

    <!-- Modal Preview Harian -->
    <DayPreviewModal 
        :show="isPreviewOpen" 
        :day="selectedDayData"
        @close="isPreviewOpen = false"
    />

</template>
