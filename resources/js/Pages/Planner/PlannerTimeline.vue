<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    timeSlots: Array, scheduledTasks: Array, onDrop: Function, onDragStart: Function,
    openModal: Function, toggleComplete: Function, getTypeColor: Function
});

const START_HOUR = 6; 
const HOUR_HEIGHT = 80; 
const TIME_COL_WIDTH = 80; 

const now = ref(new Date());
let timerInterval;

onMounted(() => { timerInterval = setInterval(() => now.value = new Date(), 60000); });
onUnmounted(() => clearInterval(timerInterval));

// SINKRONISASI ID: 1=Urgent, 2=Work, 3=Normal/Break
const getTaskMeta = (type) => {
    const t = parseInt(type);
    switch (t) {
        case 1: return { icon: '🔥', labelKey: 'priority_urgent', textClass: 'text-rose-700', bgClass: 'bg-rose-50' };
        case 2: return { icon: '⚡', labelKey: 'priority_work', textClass: 'text-indigo-700', bgClass: 'bg-indigo-50' };
        case 3: return { icon: '☕', labelKey: 'priority_normal', textClass: 'text-emerald-700', bgClass: 'bg-emerald-50' };
        default: return { icon: '📝', labelKey: 'label_todo', textClass: 'text-slate-700', bgClass: 'bg-slate-50' };
    }
};

const currentTimeIndicatorStyle = computed(() => {
    const currentH = now.value.getHours();
    const currentM = now.value.getMinutes();
    if (currentH < START_HOUR) return { display: 'none' };
    const minutesFromStart = (currentH - START_HOUR) * 60 + currentM;
    const topPx = (minutesFromStart / 60) * HOUR_HEIGHT;
    return { top: `${topPx}px`, left: `${TIME_COL_WIDTH}px`, right: '0px' };
});

const getTaskStyle = (task) => {
    const [startH, startM] = task.start_time.split(':').map(Number);
    let endH, endM;
    if (task.end_time) { [endH, endM] = task.end_time.split(':').map(Number); } 
    else { endH = startH + 1; endM = startM; }

    const startMinutesFromBase = (startH - START_HOUR) * 60 + startM;
    const endMinutesFromBase = (endH - START_HOUR) * 60 + endM;
    const heightPx = ((endMinutesFromBase - startMinutesFromBase) / 60) * HOUR_HEIGHT;
    const topPx = (startMinutesFromBase / 60) * HOUR_HEIGHT;

    return {
        top: `${topPx}px`,
        height: `${Math.max(heightPx, 55)}px`, 
        position: 'absolute',
        left: `${TIME_COL_WIDTH + 16}px`,  
        right: '16px', 
        zIndex: 10
    };
};

const formatTimeRange = (task) => {
    let endTime = task.end_time;
    if (!endTime) {
        const [h, m] = task.start_time.split(':').map(Number);
        endTime = `${(h + 1).toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }
    return `${task.start_time} - ${endTime}`;
};
</script>

<template>
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-30 shadow-sm">
            <h3 class="font-bold text-slate-800 text-lg flex items-center gap-2">
                <span class="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg text-sm">📅</span> {{ $t('timeline_title') }}
            </h3>
            <div class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg shadow-md">
                <div class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                <span class="text-xs font-bold font-mono tracking-widest">{{ now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</span>
            </div>
        </div>
        
        <div class="relative w-full bg-white" :style="{ height: `${Math.max(timeSlots.length * HOUR_HEIGHT, 600)}px` }">
            
            <div v-for="(time, index) in timeSlots" :key="time" 
                class="absolute w-full flex pointer-events-none group"
                :style="{ top: `${index * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }">
                
                <div class="flex flex-col items-center justify-start pt-3 border-r border-slate-100 bg-slate-50/50 w-[80px]">
                    <span class="text-xs font-bold text-slate-400 font-mono">{{ time }}</span>
                </div>
                
                <div class="flex-1 relative">
                    <div class="absolute w-full top-0 border-t border-slate-100"></div>
                    <div class="absolute w-full top-1/2 border-t border-dashed border-slate-50"></div>
                    
                    <div class="absolute inset-0 hover:bg-indigo-50/40 transition-colors cursor-pointer pointer-events-auto z-0 flex items-center justify-center opacity-0 hover:opacity-100" 
                        @click="openModal(null, time)">
                        <span class="text-indigo-400 text-xs font-bold bg-white/80 px-2 py-1 rounded">+ {{ $t('btn_add_schedule') }}</span>
                    </div>
                </div>
            </div>

            <div class="absolute z-20 flex items-center pointer-events-none w-full opacity-80" :style="currentTimeIndicatorStyle">
                <div class="w-[80px] text-right pr-2">
                    <span class="text-[10px] font-bold text-rose-500 bg-rose-50 px-1 rounded">{{ $t('timeline_now') }}</span>
                </div>
                <div class="w-2 h-2 -ml-1 rounded-full bg-rose-500 ring-2 ring-white shadow-sm"></div>
                <div class="h-[2px] w-full bg-gradient-to-r from-rose-500 to-transparent"></div>
            </div>

            <div v-for="task in scheduledTasks" :key="task.id" @click="openModal(task)" :style="getTaskStyle(task)"
                class="group absolute rounded-xl border-l-[4px] border-t border-r border-b transition-all duration-200 flex flex-col overflow-hidden cursor-pointer hover:z-50 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                :class="[getTypeColor(task.type), task.is_completed ? 'opacity-60 grayscale bg-slate-50 !border-slate-300' : 'bg-white']">
                
                <div class="px-4 py-2 flex justify-between items-start h-full gap-3 relative overflow-hidden">
                    <div class="absolute -right-2 -bottom-2 text-6xl opacity-[0.03] pointer-events-none select-none">
                        {{ getTaskMeta(task.type).icon }}
                    </div>

                    <div class="flex flex-col min-w-0 flex-1 h-full z-10">
                        <div class="flex items-center gap-1.5 mb-0.5">
                            <span class="text-[10px] font-black uppercase tracking-wider px-1.5 rounded-sm"
                                :class="[getTaskMeta(task.type).bgClass, getTaskMeta(task.type).textClass]">
                                {{ $t(getTaskMeta(task.type).labelKey) }}
                            </span>
                        </div>

                        <h4 class="font-bold text-sm text-slate-800 leading-tight truncate" 
                            :class="{'line-through text-slate-400': task.is_completed}">
                            {{ task.title }}
                        </h4>
                        
                        <div class="flex items-center gap-2 mt-auto pt-1">
                            <span class="text-[10px] font-bold font-mono text-slate-500 flex items-center gap-1 bg-slate-100/80 px-1.5 py-0.5 rounded">
                                🕒 {{ formatTimeRange(task) }}
                            </span>
                        </div>
                    </div>

                    <button @click.stop="toggleComplete(task)" class="w-6 h-6 rounded-lg border border-slate-200 bg-white hover:border-indigo-500 hover:text-indigo-500 transition-all flex items-center justify-center flex-shrink-0 shadow-sm z-20"
                        :class="{'!bg-emerald-500 !border-emerald-500 !text-white': task.is_completed}">
                        <svg v-if="task.is_completed" class="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>