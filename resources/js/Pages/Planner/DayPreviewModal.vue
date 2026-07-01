<script setup>
import { ref, watch, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import { X, CheckCircle2, Droplets, Inbox, Calendar, ArrowRight, Flame, Coffee, Circle, Utensils, UtensilsCrossed } from 'lucide-vue-next';
import { trans } from 'laravel-vue-i18n';
import dayjs from 'dayjs';

const props = defineProps({
    show: Boolean,
    day: Object
});

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};

const openDailyPlanner = () => {
    if (props.day && props.day.dateStr) {
        router.visit(route('planner.index', { date: props.day.dateStr }));
    }
};

const formatDayStr = (dateObj) => {
    if (!dateObj) return '';
    return dateObj.format('dddd, D MMMM YYYY');
};

const getPriorityIcon = (type) => {
    switch (Number(type)) {
        case 3: return Flame;
        case 2: return Circle;
        case 1: return Coffee;
        default: return Circle;
    }
};

const getPriorityColor = (type) => {
    switch (Number(type)) {
        case 3: return 'text-rose-500';
        case 2: return 'text-amber-500';
        case 1: return 'text-sky-500';
        default: return 'text-slate-400';
    }
};

const meals = computed(() => {
    if (!props.day || !props.day.meals) return null;
    return props.day.meals;
});
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        
        <!-- Backdrop with strong blur for premium feel -->
        <div 
            class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md transition-all duration-300"
            @click="closeModal"
        ></div>

        <!-- Modal Content -->
        <div 
            class="relative w-full max-w-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 overflow-hidden flex flex-col max-h-[90vh] transform transition-all border border-white/50 dark:border-slate-700/50"
            @click.stop
        >
            
            <!-- Premium Header Gradient -->
            <div class="px-8 py-6 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-between relative overflow-hidden">
                <!-- Abstract circles -->
                <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl transform -translate-x-1/2 translate-y-1/2"></div>
                
                <div class="flex items-center gap-4 relative z-10">
                    <div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md border border-white/30 shadow-inner">
                        <Calendar :size="24" />
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-white/80 uppercase tracking-wider">{{ trans('planner_preview_title', 'Preview Harian') }}</h3>
                        <p class="text-xl font-black text-white drop-shadow-sm">{{ formatDayStr(day?.date) }}</p>
                    </div>
                </div>
                <button @click="closeModal" class="relative z-10 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors backdrop-blur-md">
                    <X :size="20" />
                </button>
            </div>

            <!-- Body (Scrollable) -->
            <div class="p-8 overflow-y-auto space-y-8 custom-scrollbar flex-1">
                
                <!-- Tasks Section -->
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <h4 class="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <CheckCircle2 :size="16" class="text-indigo-500" />
                            {{ trans('planner_tasks', 'Tugas Utama') }}
                        </h4>
                        <span class="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                            {{ day?.tasks?.completed || 0 }}/{{ day?.tasks?.total || 0 }} {{ trans('header_done_suffix', 'Selesai') }}
                        </span>
                    </div>

                    <div v-if="day?.tasks?.items?.length > 0" class="space-y-3">
                        <div 
                            v-for="task in day.tasks.items" 
                            :key="task.id"
                            class="group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 hover:shadow-md"
                            :class="task.is_completed ? 'bg-slate-50 border-transparent dark:bg-slate-800/50 opacity-60' : 'bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800'"
                        >
                            <div class="mt-0.5">
                                <CheckCircle2 :size="20" :class="task.is_completed ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between gap-2">
                                    <p class="text-base font-bold truncate transition-colors" :class="task.is_completed ? 'text-slate-500 line-through' : 'text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'">{{ task.title }}</p>
                                    <component :is="getPriorityIcon(task.type)" :size="14" :class="getPriorityColor(task.type)" stroke-width="3" />
                                </div>
                                <div class="flex items-center gap-3 mt-1">
                                    <p v-if="task.start_time" class="text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">{{ task.start_time }} {{ task.end_time ? '- ' + task.end_time : '' }}</p>
                                </div>
                                <p v-if="task.notes" class="text-xs text-slate-500 dark:text-slate-400 mt-2 italic bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700/50">"{{ task.notes }}"</p>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center py-8 bg-slate-50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                        <p class="text-sm text-slate-400 font-medium">{{ trans('planner_no_tasks', 'Hari yang santai! Belum ada tugas.') }}</p>
                    </div>
                </div>

                <!-- Inbox Section -->
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <h4 class="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <Inbox :size="16" class="text-orange-500" />
                            {{ trans('planner_inbox', 'Kotak Masuk') }}
                        </h4>
                        <span class="text-xs font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                            {{ day?.inbox?.items?.length || 0 }} Item
                        </span>
                    </div>

                    <div v-if="day?.inbox?.items?.length > 0" class="space-y-3">
                        <div 
                            v-for="(item, index) in day.inbox.items" 
                            :key="index"
                            class="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100/50 dark:from-slate-800 dark:to-slate-900 dark:border-slate-800 shadow-sm relative overflow-hidden"
                        >
                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-500"></div>
                            <p class="text-sm font-medium text-slate-700 dark:text-slate-200 ml-2">{{ item.text }}</p>
                        </div>
                    </div>
                    <div v-else class="text-center py-5 bg-slate-50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                        <p class="text-sm text-slate-400 font-medium">{{ trans('planner_empty_inbox', 'Inbox kosong, pikiran tenang.') }}</p>
                    </div>
                </div>
                
                <!-- Meals Section -->
                <div v-if="meals && (meals.breakfast || meals.lunch || meals.dinner)">
                    <div class="flex items-center justify-between mb-4">
                        <h4 class="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <UtensilsCrossed :size="16" class="text-rose-500" />
                            {{ trans('planner_meals', 'Menu Makan') }}
                        </h4>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div v-if="meals.breakfast" class="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                            <p class="text-xs font-bold text-rose-500 mb-1 uppercase tracking-wider">Breakfast</p>
                            <p class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ meals.breakfast }}</p>
                        </div>
                        <div v-if="meals.lunch" class="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                            <p class="text-xs font-bold text-amber-500 mb-1 uppercase tracking-wider">Lunch</p>
                            <p class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ meals.lunch }}</p>
                        </div>
                        <div v-if="meals.dinner" class="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
                            <p class="text-xs font-bold text-indigo-500 mb-1 uppercase tracking-wider">Dinner</p>
                            <p class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ meals.dinner }}</p>
                        </div>
                    </div>
                </div>

                <!-- Water Section -->
                <div>
                     <div class="flex items-center justify-between mb-4">
                        <h4 class="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <Droplets :size="16" class="text-cyan-500" />
                            {{ trans('planner_water', 'Air Minum') }}
                        </h4>
                        <span class="text-xs font-bold px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-500/20">
                            {{ day?.water || 0 }}/8 {{ trans('sidebar_tasks_unit', 'Gelas') }}
                        </span>
                    </div>
                    
                    <div class="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div 
                            v-for="i in 8" 
                            :key="i"
                            class="h-10 flex-1 rounded-xl transition-all duration-500 relative overflow-hidden"
                            :class="i <= (day?.water || 0) ? 'bg-gradient-to-t from-cyan-500 to-blue-400 shadow-inner' : 'bg-slate-200 dark:bg-slate-700 shadow-inner'"
                        >
                            <!-- Water ripple effect for filled items -->
                            <div v-if="i <= (day?.water || 0)" class="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Premium Footer -->
            <div class="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 backdrop-blur-xl">
                <button 
                    @click="openDailyPlanner"
                    class="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-black text-lg tracking-wide flex items-center justify-center gap-3 transition-all group shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1"
                >
                    <span>{{ trans('planner_open_detail', 'Buka Daily Planner') }}</span>
                    <ArrowRight :size="20" class="group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #475569;
}
</style>
