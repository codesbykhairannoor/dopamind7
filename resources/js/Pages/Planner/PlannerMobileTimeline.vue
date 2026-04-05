<script setup>
import { computed } from 'vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    scheduledTasks: { type: Array, default: () => [] },
    openModal: { type: Function, required: true },
    toggleComplete: { type: Function, required: true },
    getTypeColor: { type: Function, default: () => '' }
});

const sortedTasks = computed(() => {
    return [...props.scheduledTasks].sort((a, b) => a.start_time.localeCompare(b.start_time));
});

const getTaskTheme = (type) => {
    const t = parseInt(type);
    switch (t) {
        case 1: // URGENT
            return { 
                icon: '🔥',
                bg: 'bg-rose-50 dark:bg-rose-500/10',
                border: 'border-rose-100 dark:border-rose-500/20',
                accent: 'bg-rose-500',
                text: 'text-rose-900 dark:text-rose-100',
                subtext: 'text-rose-600/60 dark:text-rose-400/60'
            };
        case 2: // WORK
            return { 
                icon: '⚡',
                bg: 'bg-indigo-50 dark:bg-indigo-500/10',
                border: 'border-indigo-100 dark:border-indigo-500/20',
                accent: 'bg-indigo-600',
                text: 'text-indigo-900 dark:text-indigo-100',
                subtext: 'text-indigo-600/60 dark:text-indigo-400/60'
            };
        case 3: // NORMAL
            return { 
                icon: '🍃',
                bg: 'bg-emerald-50 dark:bg-emerald-500/10',
                border: 'border-emerald-100 dark:border-emerald-500/20',
                accent: 'bg-emerald-500',
                text: 'text-emerald-900 dark:text-emerald-100',
                subtext: 'text-emerald-600/60 dark:text-emerald-400/60'
            };
        default:
            return { 
                icon: '📝',
                bg: 'bg-white dark:bg-slate-900',
                border: 'border-slate-100 dark:border-slate-800',
                accent: 'bg-slate-400',
                text: 'text-slate-800 dark:text-slate-200',
                subtext: 'text-slate-400'
            };
    }
};
</script>

<template>
    <div class="relative pl-4 pr-2">
        <!-- Vertical Track -->
        <div class="absolute left-[31px] top-6 bottom-6 w-[2px] bg-slate-100 dark:bg-slate-800 pointer-events-none"></div>

        <div v-if="sortedTasks.length === 0" class="py-20 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-4">
            <span class="text-5xl animate-bounce">✨</span>
            <p class="text-xs font-black text-slate-400 dark:text-slate-500 px-10">
                {{ $t('dash_all_tasks_done', 'Belum ada agenda hari ini. Tambah satu yuk!') }}
            </p>
            <button @click="openModal(null, null, 'full')" class="mt-2 bg-indigo-600 text-white font-black py-3 px-8 rounded-2xl shadow-lg active:scale-95 transition-all outline-none">
                + {{ $t('btn_add_task', 'Tambah Agenda') }}
            </button>
        </div>

        <div v-else class="space-y-8 relative">
            <div v-for="(task, index) in sortedTasks" :key="task.id" class="relative flex gap-6 group">
                
                <!-- Time & Node -->
                <div class="flex flex-col items-center shrink-0 w-10 py-1">
                    <span class="text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 tabular-nums">{{ task.start_time }}</span>
                    <div class="w-4 h-4 rounded-full border-4 bg-white dark:bg-slate-950 z-10 transition-transform group-hover:scale-125" :class="getTaskTheme(task.type).border" :style="{ borderColor: task.is_completed ? '#10b981' : '' }"></div>
                    <!-- Connector line logic if needed for gaps -->
                </div>

                <!-- Task Card -->
                <div @click="openModal(task)" 
                    class="flex-1 bg-white dark:bg-slate-900 p-5 rounded-[2rem] border transition-all active:scale-[0.98] shadow-sm relative overflow-hidden" 
                    :class="[
                        getTaskTheme(task.type).border,
                        task.is_completed ? 'opacity-60 bg-slate-50/50 dark:bg-slate-800/50' : ''
                    ]">
                    
                    <div class="flex items-center justify-between gap-4 mb-3">
                        <div class="flex items-center gap-2">
                             <div class="w-8 h-8 rounded-xl flex items-center justify-center text-sm" :class="getTaskTheme(task.type).bg">
                                {{ getTaskTheme(task.type).icon }}
                             </div>
                             <span class="text-[10px] font-black uppercase tracking-widest opacity-40">{{ task.end_time ? task.end_time : '??:??' }}</span>
                        </div>

                        <!-- Completion Checkbox -->
                        <button @click.stop="toggleComplete(task)" 
                            class="w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all shadow-sm"
                            :class="task.is_completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'">
                            <OneForMindIcon v-if="task.is_completed" name="check" size="18" stroke-width="4" />
                            <div v-else class="w-2.5 h-2.5 rounded-full" :class="getTaskTheme(task.type).accent"></div>
                        </button>
                    </div>

                    <div>
                        <h4 class="text-base font-black leading-tight flex flex-wrap items-center gap-2" :class="[getTaskTheme(task.type).text, task.is_completed ? 'line-through' : '']">
                            {{ task.title }}
                        </h4>
                        <p v-if="task.notes" class="mt-2 text-xs font-medium leading-relaxed opacity-60" :class="getTaskTheme(task.type).text">
                            {{ task.notes }}
                        </p>
                    </div>

                    <!-- Subtle Type Tag -->
                    <div class="mt-4 flex items-center gap-2">
                         <span class="text-[8px] font-black px-2 py-0.5 rounded-md border" :class="getTaskTheme(task.type).badge">
                            {{ $t(getTaskTheme(task.type).labelKey) }}
                         </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
