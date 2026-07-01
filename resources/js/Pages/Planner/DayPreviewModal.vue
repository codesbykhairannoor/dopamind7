<script setup>
import { ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import { X, CheckCircle2, Droplets, Inbox, Calendar, ArrowRight } from 'lucide-vue-next';
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
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        
        <!-- Backdrop -->
        <div 
            class="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm transition-opacity"
            @click="closeModal"
        ></div>

        <!-- Modal Content -->
        <div 
            class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transform transition-all border border-slate-100 dark:border-slate-800"
            @click.stop
        >
            
            <!-- Header -->
            <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                        <Calendar :size="20" />
                    </div>
                    <div>
                        <h3 class="text-sm font-black text-slate-800 dark:text-white">{{ trans('planner_preview_title', 'Preview Harian') }}</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">{{ formatDayStr(day?.date) }}</p>
                    </div>
                </div>
                <button @click="closeModal" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <X :size="18" />
                </button>
            </div>

            <!-- Body (Scrollable) -->
            <div class="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">
                
                <!-- Tasks Section -->
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <CheckCircle2 :size="14" class="text-emerald-500" />
                            {{ trans('planner_tasks', 'Tugas') }}
                        </h4>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            {{ day?.tasks?.completed || 0 }}/{{ day?.tasks?.total || 0 }} Selesai
                        </span>
                    </div>

                    <div v-if="day?.tasks?.items?.length > 0" class="space-y-2">
                        <div 
                            v-for="task in day.tasks.items" 
                            :key="task.id"
                            class="flex items-start gap-3 p-3 rounded-2xl border transition-colors"
                            :class="task.is_completed ? 'bg-slate-50 border-transparent dark:bg-slate-800/50 opacity-60' : 'bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800'"
                        >
                            <div class="mt-0.5">
                                <CheckCircle2 :size="16" :class="task.is_completed ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold truncate" :class="task.is_completed ? 'text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200'">{{ task.title }}</p>
                                <p v-if="task.start_time" class="text-xs text-slate-400 mt-0.5">{{ task.start_time }} {{ task.end_time ? '- ' + task.end_time : '' }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center py-6 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                        <p class="text-xs text-slate-400 font-medium">{{ trans('planner_no_tasks', 'Belum ada tugas dijadwalkan') }}</p>
                    </div>
                </div>

                <!-- Inbox Section -->
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Inbox :size="14" class="text-orange-500" />
                            {{ trans('planner_inbox', 'Kotak Masuk') }}
                        </h4>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                            {{ day?.inbox?.items?.length || 0 }} Item
                        </span>
                    </div>

                    <div v-if="day?.inbox?.items?.length > 0" class="space-y-2">
                        <div 
                            v-for="(item, index) in day.inbox.items" 
                            :key="index"
                            class="p-3 rounded-2xl bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800"
                        >
                            <p class="text-sm text-slate-600 dark:text-slate-300">{{ item.text }}</p>
                        </div>
                    </div>
                    <div v-else class="text-center py-4 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                        <p class="text-xs text-slate-400 font-medium">{{ trans('planner_empty_inbox', 'Inbox kosong') }}</p>
                    </div>
                </div>

                <!-- Water Section -->
                <div>
                     <div class="flex items-center justify-between mb-3">
                        <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Droplets :size="14" class="text-blue-500" />
                            {{ trans('planner_water', 'Air Minum') }}
                        </h4>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                            {{ day?.water || 0 }}/8 Gelas
                        </span>
                    </div>
                    
                    <div class="flex items-center gap-1">
                        <div 
                            v-for="i in 8" 
                            :key="i"
                            class="h-8 flex-1 rounded-lg transition-all"
                            :class="i <= (day?.water || 0) ? 'bg-blue-400' : 'bg-slate-100 dark:bg-slate-800'"
                        ></div>
                    </div>
                </div>

            </div>

            <!-- Footer -->
            <div class="p-6 pt-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <button 
                    @click="openDailyPlanner"
                    class="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors group shadow-lg shadow-indigo-200 dark:shadow-none"
                >
                    <span>{{ trans('planner_open_detail', 'Buka Daily Planner') }}</span>
                    <ArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
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
    background-color: #334155;
}
</style>
