<script setup>
import { computed } from 'vue';

const props = defineProps({
    timeSlots: Array, // ["06:00", "07:00", ...]
    scheduledTasks: Array,
    onDrop: Function, // Kita disable drop di mode absolute sementara biar ga bug
    onDragStart: Function, // Kita disable drag sementara
    openModal: Function,
    toggleComplete: Function,
    getTypeColor: Function
});

// --- KONFIGURASI GRID ---
const START_HOUR = 6; // Jam mulai (06:00)
const HOUR_HEIGHT = 128; // Tinggi 1 jam dalam pixel (Gedein biar lega)

// Fungsi Hitung Posisi & Tinggi
const getTaskStyle = (task) => {
    // Parsing Jam Mulai
    const [startH, startM] = task.start_time.split(':').map(Number);
    
    // Parsing Jam Selesai (Default +1 jam kalau kosong)
    let endH, endM;
    if (task.end_time) {
        [endH, endM] = task.end_time.split(':').map(Number);
    } else {
        endH = startH + 1;
        endM = startM;
    }

    // Hitung menit dari jam 06:00
    const startMinutesFromBase = (startH - START_HOUR) * 60 + startM;
    const endMinutesFromBase = (endH - START_HOUR) * 60 + endM;
    const durationMinutes = endMinutesFromBase - startMinutesFromBase;

    // Konversi ke Pixel
    const topPx = (startMinutesFromBase / 60) * HOUR_HEIGHT;
    const heightPx = (durationMinutes / 60) * HOUR_HEIGHT;

    return {
        top: `${topPx}px`,
        height: `${heightPx}px`,
        position: 'absolute',
        left: '60px', // Geser dikit dari label jam
        right: '10px', // Kasih margin kanan
        zIndex: 10
    };
};

// Helper Label Kategori
const getCategoryLabel = (type) => {
    if (type === 1) return { text: '💼 WORK', bg: 'bg-blue-100 text-blue-700' };
    if (type === 2) return { text: '🧘 NORMAL', bg: 'bg-emerald-100 text-emerald-700' };
    if (type === 3) return { text: '🔥 URGENT', bg: 'bg-rose-100 text-rose-700' };
    return { text: 'OTHER', bg: 'bg-slate-100 text-slate-700' };
};
</script>

<template>
    <div class="w-full md:w-[70%] bg-white rounded-3xl flex flex-col shadow-lg border border-slate-100 h-full overflow-hidden">
        
        <div class="p-5 border-b border-slate-50 flex justify-between items-center bg-white z-20 shadow-sm">
            <h3 class="font-bold text-slate-800 text-lg flex items-center gap-2">
                <span>📅</span> Timeline View
            </h3>
            <div class="text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                1 Jam = {{ HOUR_HEIGHT }}px
            </div>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar relative bg-slate-50/30">
            
            <div class="relative" :style="{ height: `${timeSlots.length * HOUR_HEIGHT}px` }">
                
                <div 
                    v-for="(time, index) in timeSlots" 
                    :key="time" 
                    class="absolute w-full border-b border-slate-200/60 flex group"
                    :style="{ top: `${index * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }"
                    @click.self="openModal(null, time)"
                >
                    <div class="w-[60px] text-xs font-bold text-slate-400 pt-2 text-center bg-white/50 backdrop-blur-sm border-r border-slate-100">
                        {{ time }}
                    </div>
                    
                    <div class="absolute w-full border-b border-dashed border-slate-100 top-1/2 left-[60px] pointer-events-none"></div>
                    
                    <div class="hidden group-hover:flex absolute inset-0 items-center justify-center pointer-events-none pl-[60px]">
                        <span class="text-slate-300 font-bold opacity-0 group-hover:opacity-100 transition text-sm">
                            + Klik untuk tambah di {{ time }}
                        </span>
                    </div>
                </div>

                <div 
                    v-for="task in scheduledTasks" 
                    :key="task.id"
                    @click="openModal(task)"
                    :style="getTaskStyle(task)"
                    :class="[
                        'rounded-xl border shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all flex flex-col overflow-hidden',
                        getTypeColor(task.type),
                        task.is_completed ? 'opacity-50 grayscale' : 'shadow-md'
                    ]"
                >
                    <div class="px-3 py-2 flex justify-between items-start bg-white/40 backdrop-blur-sm border-b border-black/5">
                        <div class="flex gap-2 items-center">
                            <span :class="['text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider', getCategoryLabel(task.type).bg]">
                                {{ getCategoryLabel(task.type).text }}
                            </span>
                            <span class="text-[10px] font-mono font-bold opacity-70">
                                {{ task.start_time }} - {{ task.end_time || '??:??' }}
                            </span>
                        </div>
                        
                        <button @click.stop="toggleComplete(task)" class="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center hover:bg-black/10 transition bg-white/50">
                            <span v-if="task.is_completed" class="text-[10px] font-bold">✓</span>
                        </button>
                    </div>

                    <div class="px-3 py-2 flex-1 flex flex-col justify-center">
                        <h4 class="font-bold text-sm leading-tight" :class="{'line-through': task.is_completed}">
                            {{ task.title }}
                        </h4>
                        <p v-if="task.notes" class="text-[10px] mt-1 opacity-80 line-clamp-2 italic">
                            {{ task.notes }}
                        </p>
                    </div>
                </div>

            </div>
            
            <div class="h-20"></div> </div>
    </div>
</template>