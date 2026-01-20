<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

// Props dari Parent
const props = defineProps({
    timeSlots: Array, 
    scheduledTasks: Array,
    onDrop: Function,
    onDragStart: Function,
    openModal: Function,
    toggleComplete: Function,
    getTypeColor: Function
});

// --- KONFIGURASI TAMPILAN (REVISI TOTAL) ---
const START_HOUR = 6; 
const isMobile = window.innerWidth < 768;

// 🔥 CONFIG BARU:
// Desktop: 80px (Lebih PADAT, biar gak capek scroll di layar gede)
// HP: 100px (Lebih LEGA, biar jempol masuk & tulisan muat)
const HOUR_HEIGHT = isMobile ? 100 : 80; 

// Lebar kolom jam
const TIME_COL_WIDTH = isMobile ? 60 : 80; 

// --- STATE: WAKTU SEKARANG ---
const now = ref(new Date());
let timerInterval;

onMounted(() => {
    timerInterval = setInterval(() => now.value = new Date(), 60000);
});
onUnmounted(() => clearInterval(timerInterval));

// Posisi Garis Merah (Current Time)
const currentTimeIndicatorStyle = computed(() => {
    const currentH = now.value.getHours();
    const currentM = now.value.getMinutes();
    if (currentH < START_HOUR) return { display: 'none' };

    const minutesFromStart = (currentH - START_HOUR) * 60 + currentM;
    const topPx = (minutesFromStart / 60) * HOUR_HEIGHT;

    return {
        top: `${topPx}px`,
        left: `${TIME_COL_WIDTH}px`, 
        right: '0px'
    };
});

// Logic Posisi Task & Height
const getTaskStyle = (task) => {
    const [startH, startM] = task.start_time.split(':').map(Number);
    let endH, endM;

    // Hitung waktu selesai default kalo null (default 1 jam)
    if (task.end_time) {
        [endH, endM] = task.end_time.split(':').map(Number);
    } else {
        endH = startH + 1; 
        endM = startM;
    }

    const startMinutesFromBase = (startH - START_HOUR) * 60 + startM;
    const endMinutesFromBase = (endH - START_HOUR) * 60 + endM;
    const durationMinutes = endMinutesFromBase - startMinutesFromBase;

    const topPx = (startMinutesFromBase / 60) * HOUR_HEIGHT;
    const heightPx = (durationMinutes / 60) * HOUR_HEIGHT;

    return {
        top: `${topPx}px`,
        // Minimal tinggi 50px biar tulisan range jam tetep muat
        height: `${Math.max(heightPx, 55)}px`, 
        position: 'absolute',
        left: `${TIME_COL_WIDTH + (isMobile ? 4 : 10)}px`, 
        right: '10px', 
        zIndex: 10
    };
};

// Helper Format Jam "08:00 - 09:30"
const formatTimeRange = (task) => {
    let endTime = task.end_time;
    if (!endTime) {
        // Kalo gak ada end_time, hitung manual +1 jam buat display
        const [h, m] = task.start_time.split(':').map(Number);
        const endH = h + 1;
        endTime = `${endH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }
    return `${task.start_time} - ${endTime}`;
};

const getCategoryBadge = (type) => {
    if (type === 1) return { icon: '💼', key: 'cat_work', class: 'bg-blue-100 text-blue-700 border-blue-200' };
    if (type === 2) return { icon: '🧘', key: 'cat_life', class: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    if (type === 3) return { icon: '🔥', key: 'cat_urgent', class: 'bg-rose-100 text-rose-700 border-rose-200' };
    return { icon: '📝', key: 'cat_other', class: 'bg-slate-100 text-slate-600 border-slate-200' };
};
</script>

<template>
    <div class="w-full md:w-[70%] bg-white md:rounded-3xl flex flex-col shadow-xl shadow-slate-200/50 border border-slate-100 h-[calc(100vh-180px)] min-h-[500px] md:min-h-0 md:h-full overflow-hidden relative">
        
        <div class="px-4 py-3 md:px-5 md:py-4 border-b border-slate-100 flex justify-between items-center bg-white/95 backdrop-blur-xl z-30 absolute top-0 w-full h-[60px] md:h-[70px]">
            <h3 class="font-black text-slate-800 text-lg md:text-xl flex items-center gap-2 tracking-tight">
                <span class="text-xl md:text-2xl">📅</span> 
                {{ $t('planner_title') }}
            </h3>
            
            <div class="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 shadow-sm">
                <div class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                <span class="text-xs md:text-sm font-bold text-slate-600 font-mono">
                    {{ now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                </span>
            </div>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar relative bg-slate-50/30 mt-[60px] md:mt-[70px] pb-20 scroll-smooth">
            
            <div class="relative min-h-full" :style="{ height: `${Math.max(timeSlots.length * HOUR_HEIGHT, 600)}px` }">
                
                <div 
                    v-for="(time, index) in timeSlots" 
                    :key="time" 
                    class="absolute w-full flex group pointer-events-none"
                    :style="{ top: `${index * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }"
                >
                    <div 
                        class="flex flex-col items-center justify-start pt-2 md:pt-3 border-r border-slate-200 bg-white sticky left-0 z-20"
                        :style="{ width: `${TIME_COL_WIDTH}px` }"
                    >
                        <span class="text-sm md:text-base font-black text-slate-500 font-mono tracking-tighter">
                            {{ time }}
                        </span>
                    </div>
                    
                    <div class="flex-1 relative border-b border-slate-100">
                        <div class="absolute w-full top-1/2 border-b border-dashed border-slate-200/50"></div>
                        <div 
                            class="absolute inset-0 hover:bg-indigo-50/40 transition-colors cursor-pointer pointer-events-auto z-0"
                            @click="openModal(null, time)"
                        ></div>
                    </div>
                </div>

                <div class="absolute z-20 flex items-center pointer-events-none" :style="currentTimeIndicatorStyle">
                    <div class="w-3 h-3 -ml-1.5 rounded-full bg-rose-600 shadow-sm ring-2 ring-white"></div>
                    <div class="h-[2px] w-full bg-rose-500 shadow-sm"></div>
                </div>

                <div 
                    v-for="task in scheduledTasks" 
                    :key="task.id"
                    @click="openModal(task)"
                    :style="getTaskStyle(task)"
                    class="group absolute rounded-lg md:rounded-xl border-[1.5px] transition-all duration-200 ease-out flex flex-col overflow-hidden select-none cursor-pointer hover:z-50"
                    :class="[
                        getTypeColor(task.type),
                        task.is_completed 
                            ? 'opacity-60 grayscale-[0.6] bg-slate-100 border-slate-300' 
                            : 'shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:ring-2 hover:ring-indigo-300'
                    ]"
                >
                    <div class="px-3 py-2 md:px-4 md:py-2 flex justify-between items-center h-full gap-3">
                        
                        <div class="flex flex-col justify-center min-w-0 flex-1 h-full">
                             <h4 
                                class="font-extrabold text-sm md:text-base text-slate-800 leading-tight line-clamp-1 mb-0.5"
                                :class="{'line-through text-slate-500 decoration-2': task.is_completed}"
                            >
                                {{ task.title }}
                            </h4>
                            
                            <div class="flex items-center gap-2">
                                <div class="bg-white/60 px-1.5 py-0.5 rounded text-[11px] md:text-xs font-bold font-mono text-slate-700 border border-black/5 whitespace-nowrap">
                                    {{ formatTimeRange(task) }}
                                </div>
                                
                                <span 
                                    class="w-2.5 h-2.5 rounded-full ring-1 ring-black/10" 
                                    :class="getCategoryBadge(task.type).class.split(' ')[0].replace('bg-', 'bg-')"
                                ></span>
                            </div>

                            <p 
                                v-if="task.notes && parseInt(getTaskStyle(task).height) > 70" 
                                class="text-[10px] md:text-xs text-slate-600 mt-1 line-clamp-1 italic"
                            >
                                {{ task.notes }}
                            </p>
                        </div>

                        <button 
                            @click.stop="toggleComplete(task)" 
                            class="w-8 h-8 md:w-9 md:h-9 rounded-lg border-2 border-slate-300 bg-white/80 hover:border-indigo-600 hover:bg-indigo-600 transition-all flex items-center justify-center flex-shrink-0 shadow-sm"
                            :class="{'!bg-indigo-600 !border-indigo-600': task.is_completed}"
                        >
                            <svg v-if="task.is_completed" class="w-5 h-5 text-white stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #94a3b8; border-radius: 10px; }
</style>