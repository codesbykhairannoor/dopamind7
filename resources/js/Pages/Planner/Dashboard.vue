<script setup>
import { ref, computed } from 'vue';
import { Head, router, Link } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, CheckCircle2, Droplets, Inbox, Maximize2, Sparkles } from 'lucide-vue-next';
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
    
    // Meals
    let mealsData = null;
    if (dayLog && dayLog.meals) {
        mealsData = dayLog.meals;
    }

    let notesData = '';
    if (dayLog && dayLog.notes) {
        notesData = dayLog.notes;
    }

    return {
        date: date,
        dateStr: dateStr,
        dayNumber: date.date(),
        isCurrentMonth,
        isToday,
        tasks: { completed: completedTasks, total: totalTasks, items: dayTasks },
        water: waterLevel,
        inbox: { items: inboxItems },
        meals: mealsData,
        notes: notesData
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

    <div class="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 md:p-6 lg:p-10 relative overflow-hidden">
        
        <!-- Background Ambient Gradients -->
        <div class="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-900/10 dark:to-transparent pointer-events-none -z-10"></div>
        <div class="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-400/20 dark:bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div class="fixed bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <!-- Menggunakan full width max-w-[1800px] -->
        <div class="w-full max-w-[1800px] mx-auto space-y-10 relative z-10">
            
            <!-- Premium Header -->
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div class="flex items-center gap-5">
                    <div class="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 transform hover:scale-105 transition-transform">
                        <Sparkles :size="32" stroke-width="2.5" />
                    </div>
                    <div>
                        <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{{ trans('planner_dashboard', 'Planner Dashboard') }}</h1>
                        <p class="text-slate-500 dark:text-slate-400 mt-1.5 font-medium text-lg">{{ trans('planner_dashboard_desc', 'Gambaran besar produktivitasmu bulan ini.') }}</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-[1.5rem] shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200/50 dark:border-slate-700/50">
                    <button @click="previousMonth" class="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 hover:shadow-sm">
                        <ChevronLeft :size="20" stroke-width="2.5" />
                    </button>
                    <span class="font-black text-slate-800 dark:text-white min-w-[160px] text-center text-lg uppercase tracking-wider">{{ currentMonth }}</span>
                    <button @click="nextMonth" class="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 hover:shadow-sm">
                        <ChevronRight :size="20" stroke-width="2.5" />
                    </button>
                </div>
            </div>

            <!-- Premium Calendar Grid -->
            <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/40 dark:shadow-none border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
                
                <!-- Weekdays Header -->
                <div class="grid grid-cols-7 border-b border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-950/50">
                    <div v-for="day in weekDays" :key="day" class="p-5 text-center font-black text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        {{ day }}
                    </div>
                </div>

                <!-- Calendar Body -->
                <div class="grid grid-cols-7">
                    <div 
                        v-for="day in calendarDays" 
                        :key="day.dateStr"
                        @click="openPreview(day)"
                        class="min-h-[160px] p-4 border-b border-r border-slate-100/80 dark:border-slate-800/80 relative group cursor-pointer transition-all duration-300"
                        :class="[
                            !day.isCurrentMonth ? 'bg-slate-50/30 dark:bg-slate-950/20 hover:bg-slate-100/50 dark:hover:bg-slate-800/30' : 'bg-transparent hover:bg-white/50 dark:hover:bg-slate-800/50 hover:shadow-lg hover:shadow-indigo-500/5 hover:z-10',
                            day.isToday ? 'bg-indigo-50/30 dark:bg-indigo-900/10 ring-2 ring-inset ring-indigo-500 z-10' : ''
                        ]"
                    >
                        <!-- Date Number & Quick Actions -->
                        <div class="flex items-center justify-between mb-4 relative z-10">
                            <span 
                                class="w-9 h-9 flex items-center justify-center rounded-full font-black text-sm transition-all duration-300"
                                :class="[
                                    day.isToday ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30 transform scale-110' : 'text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-800/50 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
                                    !day.isCurrentMonth && !day.isToday ? 'opacity-30' : ''
                                ]"
                            >
                                {{ day.dayNumber }}
                            </span>

                            <!-- Quick Open Daily Planner Button -->
                            <button 
                                @click.stop="goToDailyPlanner(day.dateStr)"
                                class="w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white dark:bg-slate-800 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 shadow-md border border-slate-100 dark:border-slate-700 transform translate-x-2 group-hover:translate-x-0"
                                :title="trans('planner_open_detail', 'Buka Daily Planner')"
                            >
                                <Maximize2 :size="16" />
                            </button>
                        </div>

                        <!-- Data Summaries -->
                        <div class="space-y-2 relative z-10" :class="{ 'opacity-40': !day.isCurrentMonth }">
                            
                            <!-- Tasks -->
                            <div v-if="day.tasks.total > 0" class="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold transition-all hover:scale-[1.02]">
                                <div class="flex items-center gap-2">
                                    <CheckCircle2 :size="14" />
                                    <span class="hidden xl:inline">{{ trans('planner_tasks', 'Tasks') }}</span>
                                </div>
                                <span>{{ day.tasks.completed }}/{{ day.tasks.total }}</span>
                            </div>
                            
                            <!-- Water -->
                            <div v-if="day.water > 0" class="flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-50/80 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-bold transition-all hover:scale-[1.02]">
                                <div class="flex items-center gap-2">
                                    <Droplets :size="14" />
                                    <span class="hidden xl:inline">{{ trans('planner_water', 'Air') }}</span>
                                </div>
                                <span>{{ day.water }}/8</span>
                            </div>
                            
                            <!-- Inbox -->
                            <div v-if="day.inbox?.items?.length > 0" class="flex items-center justify-between px-3 py-2 rounded-xl bg-orange-50/80 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs font-bold transition-all hover:scale-[1.02]">
                                <div class="flex items-center gap-2">
                                    <Inbox :size="14" />
                                    <span class="hidden xl:inline">{{ trans('planner_inbox', 'Inbox') }}</span>
                                </div>
                                <span>{{ day.inbox.items.length }}</span>
                            </div>
                            
                            <!-- Meals Indicator -->
                            <div v-if="day.meals && (day.meals.breakfast || day.meals.lunch || day.meals.dinner)" class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50/80 dark:bg-rose-500/10 transition-all hover:scale-[1.02]">
                                <div v-if="day.meals.breakfast" class="w-2 h-2 rounded-full bg-rose-400"></div>
                                <div v-if="day.meals.lunch" class="w-2 h-2 rounded-full bg-amber-400"></div>
                                <div v-if="day.meals.dinner" class="w-2 h-2 rounded-full bg-indigo-400"></div>
                            </div>

                        </div>
                        
                        <!-- Hover Highlight Effect -->
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
