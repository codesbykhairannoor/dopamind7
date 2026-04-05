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
                label: 'URGENT'
            };
        case 2: // WORK
            return { 
                icon: '⚡',
                bg: 'bg-indigo-50 dark:bg-indigo-500/10',
                border: 'border-indigo-100 dark:border-indigo-500/20',
                accent: 'bg-indigo-600',
                text: 'text-indigo-900 dark:text-indigo-100',
                label: 'WORK'
            };
        case 3: // NORMAL
            return { 
                icon: '🍃',
                bg: 'bg-emerald-50 dark:bg-emerald-500/10',
                border: 'border-emerald-100 dark:border-emerald-500/20',
                accent: 'bg-emerald-500',
                text: 'text-emerald-900 dark:text-emerald-100',
                label: 'TASKS'
            };
        default:
            return { 
                icon: '📝',
                bg: 'bg-white dark:bg-slate-900',
                border: 'border-slate-100 dark:border-slate-800',
                accent: 'bg-slate-400',
                text: 'text-slate-800 dark:text-slate-200',
                label: 'OTHER'
            };
    }
};
</script>

<template>
    <div id="planner-mobile-timeline" class="relative pl-6 pr-2">
        <!-- 🛤️ Vertical Flow Track -->
        <div class="absolute left-[39px] top-8 bottom-8 w-[2px] bg-slate-100 dark:bg-slate-800 pointer-events-none"></div>

        <div v-if="sortedTasks.length === 0" id="empty-planner-state" class="py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-6">
            <div class="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-5xl">✨</div>
            <div class="space-y-1 px-10">
                <p class="text-sm font-black text-slate-800 dark:text-white">Clear Canvas</p>
                <p class="text-xs font-bold text-slate-400">Ready to structure your day? Start adding tasks to build momentum.</p>
            </div>
            <button id="btn-add-initial-task" @click="openModal(null, null, 'full')" class="bg-indigo-600 text-white font-black py-4 px-10 rounded-[1.8rem] shadow-xl shadow-indigo-100 dark:shadow-none active:scale-95 transition-all outline-none">
                Begin Planning
            </button>
        </div>

        <div v-else class="space-y-10 relative">
            <div v-for="(task, index) in sortedTasks" :key="task.id" class="relative flex gap-8 group">
                
                <!-- 🕐 Time & Node Hub -->
                <div class="flex flex-col items-center shrink-0 w-12 py-2">
                    <span class="text-[10px] font-black text-slate-400 dark:text-slate-600 mb-3 tabular-nums">{{ task.start_time }}</span>
                    <!-- The Interactive Node -->
                    <div class="relative flex items-center justify-center w-5 h-5">
                        <div class="absolute inset-0 rounded-full border-4 bg-white dark:bg-slate-950 z-20 transition-all duration-500" 
                            :class="[getTaskTheme(task.type).border, task.is_completed ? 'border-emerald-500 scale-110 shadow-lg shadow-emerald-200' : '']">
                        </div>
                        <div v-if="task.is_completed" class="w-1.5 h-1.5 bg-emerald-500 rounded-full z-30 animate-pulse"></div>
                    </div>
                </div>

                <!-- 🎴 High-End Task Card -->
                <div :id="'task-card-' + task.id" @click="openModal(task)" 
                    class="flex-1 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border transition-all duration-300 active:scale-[0.98] shadow-sm relative overflow-hidden group/card" 
                    :class="[
                        getTaskTheme(task.type).border,
                        task.is_completed ? 'opacity-50 grayscale-[0.3]' : 'hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900'
                    ]">
                    
                    <div class="flex items-center justify-between gap-4 mb-5">
                        <div class="flex items-center gap-3">
                             <div class="w-10 h-10 rounded-2xl flex items-center justify-center text-xl transition-transform group-hover/card:rotate-12" :class="getTaskTheme(task.type).bg">
                                {{ getTaskTheme(task.type).icon }}
                             </div>
                             <div>
                                <span class="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.1em]">{{ task.end_time || '??:??' }} End</span>
                             </div>
                        </div>

                        <!-- Modern Check Toggle -->
                        <button :id="'toggle-task-' + task.id" @click.stop="toggleComplete(task)" 
                            class="w-11 h-11 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 shadow-sm"
                            :class="task.is_completed ? 'bg-emerald-500 border-emerald-500 text-white rotate-0' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 active:scale-90'">
                            <OneForMindIcon v-if="task.is_completed" name="check" size="20" stroke-width="4" />
                            <div v-else class="w-2.5 h-2.5 rounded-full" :class="getTaskTheme(task.type).accent"></div>
                        </button>
                    </div>

                    <div class="space-y-2">
                        <h4 class="text-lg font-black leading-tight tracking-tight pr-4 transition-colors" :class="[getTaskTheme(task.type).text, task.is_completed ? 'line-through text-slate-400' : '']">
                            {{ task.title }}
                        </h4>
                        <p v-if="task.notes" class="text-xs font-bold leading-relaxed opacity-50 line-clamp-2" :class="getTaskTheme(task.type).text">
                            {{ task.notes }}
                        </p>
                    </div>

                    <!-- Enhanced Footer Tags -->
                    <div class="mt-6 flex items-center gap-3">
                         <span class="text-[8px] font-black px-3 py-1.5 rounded-full border bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 shadow-sm">
                            {{ getTaskTheme(task.type).label }}
                         </span>
                         <div v-if="task.is_completed" class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span class="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Achieved</span>
                         </div>
                    </div>

                    <!-- Subtle Glass Highlight -->
                    <div class="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl pointer-events-none"></div>
                </div>
            </div>

            <!-- Add Task Anchor -->
            <div class="relative flex items-center gap-8 pl-12 h-16">
                 <button id="btn-add-footer" @click="openModal(null, null, 'full')" class="flex items-center gap-3 text-slate-300 hover:text-indigo-500 transition-colors group">
                    <div class="w-10 h-10 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:border-indigo-300 transition-colors">
                        <OneForMindIcon name="plus" size="18" />
                    </div>
                    <span class="text-xs font-black uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">Next Entry</span>
                 </button>
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

.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
