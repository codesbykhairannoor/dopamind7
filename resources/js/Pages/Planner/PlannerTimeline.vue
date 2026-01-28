<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
    scheduledTasks: Array, 
    onDrop: Function, 
    onDragStart: Function,
    openModal: Function, 
    toggleComplete: Function, 
    getTypeColor: Function
});

// KONFIGURASI VIEWPORT
const VIEW_LIMIT = 14; 
const HOUR_HEIGHT = 80; 
const TIME_COL_WIDTH = 80; 

// STATE: Jam Mulai (Persistent)
const startHour = ref(6); 

onMounted(() => {
    const savedStart = localStorage.getItem('planner_start_time');
    if (savedStart) startHour.value = parseInt(savedStart);
});

watch(startHour, (val) => {
    localStorage.setItem('planner_start_time', val);
});

// GENERATE SLOTS
const visibleTimeSlots = computed(() => {
    const slots = [];
    for (let i = 0; i < VIEW_LIMIT; i++) {
        const h = (startHour.value + i) % 24;
        slots.push(`${h.toString().padStart(2, '0')}:00`);
    }
    return slots;
});

const now = ref(new Date());
let timerInterval;
onMounted(() => { timerInterval = setInterval(() => now.value = new Date(), 60000); });
onUnmounted(() => clearInterval(timerInterval));

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
    
    let diff = currentH - startHour.value;
    if (diff < 0) diff += 24; 

    if (diff >= VIEW_LIMIT) return { display: 'none' };
    
    const minutesFromStart = (diff * 60) + currentM;
    const topPx = (minutesFromStart / 60) * HOUR_HEIGHT;
    return { top: `${topPx}px`, left: `${TIME_COL_WIDTH}px`, right: '0px' };
});

// --- PERBAIKAN LOGIC DISINI ---
const getTaskStyle = (task) => {
    const [startH, startM] = task.start_time.split(':').map(Number);
    let [endH, endM] = task.end_time ? task.end_time.split(':').map(Number) : [startH + 1, startM];

    let diffStart = startH - startHour.value;
    if (diffStart < 0) diffStart += 24;

    if (diffStart >= VIEW_LIMIT) return { display: 'none' };

    const startMinutes = (diffStart * 60) + startM;
    
    // Hitung Durasi Real
    let durationMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    if (durationMinutes < 0) durationMinutes += 1440; 

    // Hitung tinggi berdasarkan waktu
    const timeHeight = (durationMinutes / 60) * HOUR_HEIGHT;

    // MINIMUM VISUAL HEIGHT: 
    // Kita paksa tinggi minimal 110px agar konten (Badge + Judul + Waktu) muat
    // meskipun durasi aslinya pendek (misal 30 menit / 1 jam).
    const visualHeight = Math.max(timeHeight, 110);

    return {
        top: `${(startMinutes / 60) * HOUR_HEIGHT}px`,
        height: `${visualHeight}px`, 
        position: 'absolute',
        left: `${TIME_COL_WIDTH + 16}px`,  
        right: '16px', 
        // Z-Index trick: Task pendek dikasih z-index lebih tinggi biar kalau numpuk dia ada di atas
        zIndex: durationMinutes < 60 ? 20 : 10 
    };
};

const formatTimeRange = (task) => {
    if (!task.end_time) {
        const [h, m] = task.start_time.split(':').map(Number);
        const end = `${((h + 1) % 24).toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        return `${task.start_time} - ${end}`;
    }
    return `${task.start_time} - ${task.end_time}`;
};
</script>

<template>
    <div class="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        <div class="px-6 py-5 border-b border-slate-100 flex flex-wrap justify-between items-center bg-white sticky top-0 z-30 gap-4">
            <div class="flex items-center gap-4">
                <h3 class="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <span class="bg-indigo-600 text-white p-1.5 rounded-lg text-xs shadow-lg shadow-indigo-200">📅</span> 
                    {{ $t('timeline_title') }}
                </h3>
                
                <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <span class="text-[10px] font-black text-slate-400 px-2 uppercase tracking-tighter">Start at</span>
                    <select v-model="startHour" class="bg-white border-none text-xs font-bold rounded-lg py-1 pl-2 pr-8 focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer">
                        <option v-for="h in 24" :key="h-1" :value="h-1">
                            {{ (h-1).toString().padStart(2, '0') }}:00
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-200">
                    <div class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                    <span class="text-xs font-bold font-mono tracking-widest">{{ now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</span>
                </div>
            </div>
        </div>
        
        <div class="relative w-full bg-white transition-all duration-500" :style="{ height: `${VIEW_LIMIT * HOUR_HEIGHT}px` }">
            
            <div v-for="(time, index) in visibleTimeSlots" :key="time" 
                class="absolute w-full flex group border-b border-slate-50"
                :style="{ top: `${index * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }">
                
                <div class="flex flex-col items-center justify-start pt-3 border-r border-slate-100 bg-slate-50/50 w-[80px] shrink-0">
                    <span class="text-xs font-black text-slate-400 font-mono group-hover:text-indigo-500 transition-colors">{{ time }}</span>
                </div>
                
                <div class="flex-1 relative group/zone">
                    <div class="absolute w-full top-1/2 border-t border-dashed border-slate-100/50"></div>
                    
                    <div class="absolute inset-2 rounded-xl hover:bg-indigo-50/60 transition-all cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 border-2 border-dashed border-indigo-200" 
                        @click="openModal(null, time)">
                        <span class="text-indigo-600 text-[10px] font-black uppercase tracking-widest">+ Add to {{ time }}</span>
                    </div>
                </div>
            </div>

            <div class="absolute z-20 flex items-center pointer-events-none w-full" :style="currentTimeIndicatorStyle">
                <div class="w-[80px] text-right pr-2">
                    <span class="text-[10px] font-black text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-200">NOW</span>
                </div>
                <div class="w-3 h-3 -ml-1.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20 shadow-sm shadow-rose-500/50"></div>
                <div class="h-0.5 w-full bg-rose-500/40 shadow-[0_0_8px_rgba(244,63,94,0.3)]"></div>
            </div>

            <div v-for="task in scheduledTasks" :key="task.id" @click="openModal(task)" :style="getTaskStyle(task)"
                class="group absolute rounded-2xl border-l-[6px] border border-slate-200 transition-all duration-300 flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-1 bg-white"
                :class="[
                    getTypeColor(task.type), 
                    task.is_completed ? 'opacity-40 grayscale !border-slate-300' : '',
                    // Gunakan overflow-visible saat hover agar tooltip/isi panjang tetap terlihat jika perlu
                    'overflow-hidden hover:overflow-visible' 
                ]">
                
                <div class="px-4 py-3 flex flex-col h-full gap-1 relative justify-between">
                    <div class="flex justify-between items-start shrink-0">
                        <span class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg shadow-sm"
                            :class="[getTaskMeta(task.type).bgClass, getTaskMeta(task.type).textClass]">
                            {{ getTaskMeta(task.type).icon }} {{ $t(getTaskMeta(task.type).labelKey) }}
                        </span>
                        
                        <button @click.stop="toggleComplete(task)" 
                            class="w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all shadow-sm z-20 shrink-0"
                            :class="task.is_completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-100 text-slate-300 hover:border-indigo-400 hover:text-indigo-400'">
                            <svg v-if="task.is_completed" class="w-4 h-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                        </button>
                    </div>

                    <h4 class="font-black text-sm text-slate-800 leading-snug py-1" 
                        :class="{'line-through text-slate-400': task.is_completed}">
                        {{ task.title }}
                    </h4>
                    
                    <div class="mt-auto shrink-0">
                        <span class="text-[10px] font-bold font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-lg inline-block">
                            🕒 {{ formatTimeRange(task) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>``