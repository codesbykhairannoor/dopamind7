<script setup>
import { computed, ref, onUnmounted } from 'vue';
import { trans } from 'laravel-vue-i18n'; // Pastikan i18n ter-import jika pakai helper lokal

const props = defineProps({
    stats: { type: Object, default: () => ({ percent: 0, completed: 0, total: 0 }) }, 
    localNotes: String, 
    localMeals: { type: Object, default: () => ({ breakfast: '', lunch: '', dinner: '' }) },
    localWater: { type: Number, default: 0 },
    localTaskBox: { type: Array, default: () => [] }
});

const emit = defineEmits(['update:localNotes', 'update:localMeals', 'update:localWater', 'update:localTaskBox']);

// Helper penerjemah lokal
const t = (key, fallback) => {
    const result = trans(key);
    return result !== key ? result : fallback;
};

/* ==========================================
   LOGIC: TASK INBOX
========================================== */
const cloneTasks = () => props.localTaskBox ? props.localTaskBox.map(t => ({ ...t })) : [];
const updateTaskBox = (newTasks) => emit('update:localTaskBox', newTasks);

const addNewTask = () => {
    const tasks = cloneTasks();
    tasks.unshift({ id: Date.now(), title: '', is_completed: false, type: 2 });
    updateTaskBox(tasks);
};

const removeTask = (id) => {
    const tasks = cloneTasks().filter(t => t.id !== id);
    updateTaskBox(tasks);
};

const cycleTaskType = (task) => {
    const tasks = cloneTasks();
    const target = tasks.find(t => t.id === task.id);
    if(target) {
        target.type = target.type >= 3 ? 1 : target.type + 1;
        updateTaskBox(tasks);
    }
};

const toggleTaskComplete = (task) => {
    const tasks = cloneTasks();
    const target = tasks.find(t => t.id === task.id);
    if(target) {
        target.is_completed = !target.is_completed;
        updateTaskBox(tasks);
    }
};

const updateTaskTitle = (task, title) => {
    const tasks = cloneTasks();
    const target = tasks.find(t => t.id === task.id);
    if(target) {
        target.title = title;
        updateTaskBox(tasks);
    }
};

// --- Fungsi Manipulasi Water ---
const updateWater = (glass) => {
    const newWater = glass === props.localWater ? glass - 1 : glass;
    emit('update:localWater', newWater);
};

const getTaskIcon = (type) => {
    switch (type) {
        case 1: return { icon: '🔥', style: 'bg-rose-50 text-rose-600 border-rose-100' };
        case 2: return { icon: '⚡', style: 'bg-indigo-50 text-indigo-600 border-indigo-100' };
        case 3: return { icon: '☕', style: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
        default: return { icon: '📝', style: 'bg-slate-50 text-slate-600 border-slate-100' };
    }
};

/* ==========================================
   🔥 LOGIC: POMODORO TIMER 
========================================== */
const pomodoroTime = ref(25 * 60); 
const isTimerRunning = ref(false);
let timerInterval = null;

const formattedTimer = computed(() => {
    const minutes = Math.floor(pomodoroTime.value / 60);
    const seconds = pomodoroTime.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const toggleTimer = () => {
    if (isTimerRunning.value) {
        clearInterval(timerInterval);
    } else {
        timerInterval = setInterval(() => {
            if (pomodoroTime.value > 0) pomodoroTime.value--;
            else {
                clearInterval(timerInterval);
                isTimerRunning.value = false;
                alert(t('sidebar_pomodoro_alert', "Waktu fokus selesai! Waktunya istirahat sebentar."));
                pomodoroTime.value = 25 * 60; 
            }
        }, 1000);
    }
    isTimerRunning.value = !isTimerRunning.value;
};

const resetTimer = () => {
    clearInterval(timerInterval);
    isTimerRunning.value = false;
    pomodoroTime.value = 25 * 60;
};

onUnmounted(() => clearInterval(timerInterval));
</script>

<template>
    <div class="flex flex-col gap-6 pb-10 select-none">
        
        <div class="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-200 relative overflow-hidden group">
            <div class="absolute -right-24 -top-24 w-64 h-64 border-[40px] border-slate-50 rounded-full pointer-events-none group-hover:scale-105 transition-transform duration-1000"></div>
            
            <div class="relative z-10 flex flex-col">
                <div class="w-full flex justify-between items-start mb-6">
                    <div>
                        <h3 class="font-black text-slate-800 text-sm tracking-tight flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full" :class="isTimerRunning ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'"></span>
                            {{ $t('sidebar_pomodoro_title', 'Focus Session') }}
                        </h3>
                    </div>
                    <button @click="resetTimer" :title="$t('sidebar_pomodoro_reset')" class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                </div>

                <div class="flex justify-center items-center py-4">
                    <div class="text-6xl md:text-7xl font-black text-slate-800 tracking-tighter tabular-nums" style="font-variant-numeric: tabular-nums;">
                        {{ formattedTimer }}
                    </div>
                </div>

                <div class="mt-6 flex justify-center">
                    <button @click="toggleTimer" 
                        class="w-full py-4 rounded-2xl font-black tracking-widest uppercase transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                        :class="isTimerRunning 
                            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'">
                        
                        <span v-if="isTimerRunning" class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                            {{ $t('sidebar_pomodoro_pause', 'Jeda') }}
                        </span>
                        <span v-else class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/></svg>
                            {{ $t('sidebar_pomodoro_start', 'Mulai Fokus') }}
                        </span>
                    </button>
                </div>
            </div>
            
           
        </div>

        <div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200">
            <div class="flex justify-between items-center mb-5">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">📥</div>
                    <div>
                        <h3 class="font-black text-slate-800 text-sm tracking-tight">{{ $t('sidebar_inbox_title') }}</h3>
                        <p class="text-[9px] text-slate-400 font-bold uppercase tracking-tighter italic">{{ $t('sidebar_persistent') }}</p>
                    </div>
                </div>
                <button @click="addNewTask" class="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition-all active:scale-90 shadow-md">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M12 4v16m8-8H4" /></svg>
                </button>
            </div>
            <div v-if="!(localTaskBox || []).length" class="text-center py-10 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
                <p class="text-xs text-slate-400 font-black italic tracking-widest">{{ $t('sidebar_inbox_empty') }}</p>
            </div>
            <div v-else class="space-y-3 max-h-[350px] overflow-y-auto pr-1 scrollbar-none">
                <div v-for="task in localTaskBox" :key="task.id" 
                    class="group flex items-center justify-between gap-3 p-3 rounded-2xl border-2 border-slate-50 bg-white hover:border-indigo-100 transition-all"
                    :class="{'opacity-50 grayscale-[0.5] bg-slate-50': task.is_completed}">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                        <button @click="toggleTaskComplete(task)" 
                            class="w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all"
                            :class="task.is_completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 hover:border-indigo-400'">
                            <svg v-if="task.is_completed" class="w-4 h-4 stroke-[4]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                        </button>
                        <button @click="cycleTaskType(task)" class="w-8 h-8 rounded-xl border flex items-center justify-center text-sm transition active:scale-90 flex-shrink-0" :class="getTaskIcon(task.type).style">
                            {{ getTaskIcon(task.type).icon }}
                        </button>
                        <input :value="task.title" @input="updateTaskTitle(task, $event.target.value)" 
                            class="flex-1 bg-transparent border-0 focus:ring-0 p-0 text-sm font-black text-slate-700 placeholder-slate-300 truncate" 
                            :class="{'line-through text-slate-400': task.is_completed}" placeholder="..." />
                    </div>
                    <button @click="removeTask(task.id)" class="opacity-0 group-hover:opacity-100 text-rose-300 hover:text-rose-600 transition-all flex-shrink-0">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="bg-yellow-50 p-1 rounded-[2.5rem] shadow-sm border border-yellow-200 transform rotate-1 transition-transform hover:rotate-0 duration-500">
            <div class="bg-yellow-100/50 p-6 rounded-[2.2rem] border-dashed border-2 border-yellow-200/60">
                <h3 class="text-[10px] font-black text-yellow-700/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                    📌 {{ $t('sidebar_notes_title') }}
                </h3>
                <textarea 
                    :value="localNotes"
                    @input="$emit('update:localNotes', $event.target.value)"
                    class="w-full bg-transparent border-0 focus:ring-0 text-sm font-medium text-slate-700 p-0 h-32 resize-none leading-[24px]" 
                    style="background-image: linear-gradient(transparent, transparent 23px, #eab30820 24px); background-size: 100% 24px;"
                    :placeholder="$t('sidebar_notes_placeholder')"></textarea>
            </div>
        </div>

        <div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span class="bg-orange-100 text-orange-600 p-1.5 rounded-lg text-xs">🍽️</span> {{ $t('sidebar_meal_title') }}
            </h3>
            <div class="space-y-3">
                <div v-for="(icon, key) in { breakfast: '🍳', lunch: '🍱', dinner: '🥗' }" :key="key" 
                    class="flex items-center gap-3 p-3 rounded-2xl bg-orange-50/30 border border-orange-50 focus-within:bg-white focus-within:border-orange-200 transition-all">
                    <span class="text-xl flex-shrink-0">{{ icon }}</span>
                    <input :value="localMeals?.[key]" @input="$emit('update:localMeals', { ...localMeals, [key]: $event.target.value })" 
                        class="w-full text-xs font-black border-0 focus:ring-0 p-0 bg-transparent text-slate-700 placeholder-orange-200" 
                        :placeholder="$t('placeholder_' + key)" />
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span class="bg-blue-100 text-blue-600 p-1.5 rounded-lg text-xs">💧</span> {{ $t('sidebar_water_title') }}
                </h3>
                <span class="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{{ localWater }} / 8</span>
            </div>
            <div class="grid grid-cols-4 gap-2 p-1 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                <button v-for="glass in 8" :key="glass" type="button"
                    @click="updateWater(glass)"
                    class="h-10 flex items-center justify-center transition-all duration-300 transform active:scale-75 rounded-xl"
                    :class="glass <= localWater ? 'bg-white shadow-md' : 'opacity-20 grayscale'">
                    <span class="text-lg">💧</span>
                </button>
            </div>
        </div>

    </div>
</template>