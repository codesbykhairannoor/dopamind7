<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    inboxTasks: { type: Array, default: () => [] },
    stats: { type: Object, default: () => ({ percent: 0, completed: 0, total: 0 }) }, 
    localNotes: String, 
    localMeals: { type: Object, default: () => ({ breakfast: '', lunch: '', dinner: '' }) },
    onDragStart: Function, 
    openModal: Function, 
    toggleComplete: Function, 
    getTypeColor: Function
});

const emit = defineEmits(['update:localNotes', 'update:localMeals']);

/* =========================
   LOGIC: PERSISTENT STATE (Local Storage)
   Data ini bakal awet di browser, gak ilang pas refresh.
========================= */
const waterIntake = ref(0);
const energyLevel = ref(0);
const gratitudeText = ref('');

onMounted(() => {
    // Ambil data pas komponen muncul
    waterIntake.value = Number(localStorage.getItem('p_water')) || 0;
    energyLevel.value = Number(localStorage.getItem('p_energy')) || 0;
    gratitudeText.value = localStorage.getItem('p_gratitude') || '';
});

// Watcher buat Auto-Save tiap ada perubahan
watch(waterIntake, (v) => localStorage.setItem('p_water', v));
watch(energyLevel, (v) => localStorage.setItem('p_energy', v));
watch(gratitudeText, (v) => localStorage.setItem('p_gratitude', v));

// Helper Label
const getTaskLabel = (type) => {
    switch (type) {
        case 1: return { textKey: 'label_urgent', icon: '🔥', style: 'bg-rose-100 text-rose-700 border-rose-200' };
        case 2: return { textKey: 'label_routine', icon: '⚡', style: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
        case 3: return { textKey: 'label_chill', icon: '☕', style: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
        default: return { textKey: 'label_todo', icon: '📝', style: 'bg-slate-100 text-slate-600 border-slate-200' };
    }
};
</script>

<template>
    <div class="flex flex-col gap-6 pb-10">
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
            <div class="flex justify-between items-end mb-4 relative z-10">
                <div>
                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{{ $t('sidebar_daily_focus') }}</h3>
                    <div class="flex items-baseline gap-1">
                        <span class="text-4xl font-black text-slate-800 tracking-tighter">{{ stats?.percent || 0 }}<span class="text-xl text-slate-400 font-bold">%</span></span>
                    </div>
                </div>
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-indigo-50 text-indigo-600 shadow-sm">
                    <span class="text-2xl animate-bounce" style="animation-duration: 3s;">{{ (stats?.percent || 0) === 100 ? '🏆' : '🔥' }}</span>
                </div>
            </div>
            <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3 border border-slate-50">
                <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.5)]" :style="{ width: (stats?.percent || 0) + '%' }"></div>
            </div>
            <div class="flex justify-between items-center text-xs font-medium">
                <span class="text-slate-400">{{ $t('sidebar_target_daily') }}</span>
                <span class="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {{ stats?.completed || 0 }} / {{ stats?.total || 0 }} {{ $t('sidebar_done_suffix') }}
                </span>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div class="flex justify-between items-center mb-5">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">📥</div>
                    <div>
                        <h3 class="font-bold text-slate-800 text-sm leading-tight">{{ $t('sidebar_inbox_title') }}</h3>
                        <p class="text-[10px] text-slate-400 font-medium">{{ $t('sidebar_inbox_subtitle') }}</p>
                    </div>
                </div>
                <button @click="openModal(null, null, 'simple')" class="text-xs font-bold text-white bg-slate-900 hover:bg-indigo-600 px-3 py-2 rounded-lg transition-all flex items-center gap-1">
                    <span>+</span> {{ $t('btn_add_task_short') }}
                </button>
            </div>
            <div v-if="!inboxTasks?.length" class="text-center py-8 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                <p class="text-xs text-slate-400 font-medium italic">{{ $t('sidebar_inbox_empty') }}</p>
            </div>
            <div v-else class="space-y-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
                <div v-for="task in inboxTasks" :key="task.id" draggable="true" @dragstart="onDragStart($event, task)"
                    class="group relative flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-indigo-300 transition-all cursor-grab active:cursor-grabbing"
                    :class="{'opacity-60 bg-slate-50': task.is_completed}">
                    <button @click="toggleComplete(task)" class="mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors z-10 bg-white"
                        :class="task.is_completed ? '!bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-indigo-400'">
                        <svg v-if="task.is_completed" class="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                    </button>
                    <div class="flex-1 min-w-0" @click="openModal(task, null, 'simple')">
                        <span class="text-[9px] font-black px-1.5 py-0.5 rounded border uppercase tracking-wide inline-flex items-center gap-1 mb-1" :class="getTaskLabel(task.type).style">
                            {{ getTaskLabel(task.type).icon }} {{ $t(getTaskLabel(task.type).textKey) }}
                        </span>
                        <p class="text-sm font-bold text-slate-700 leading-snug group-hover:text-indigo-700" :class="{'line-through text-slate-400': task.is_completed}">{{ task.title }}</p>
                    </div>
                </div>
            </div>
        </div>

         <div class="bg-yellow-50 p-1 rounded-2xl shadow-sm border border-yellow-200 transform rotate-1">
            <div class="bg-yellow-100/50 p-5 rounded-xl border-dashed border-2 border-yellow-200/60">
                <h3 class="text-[10px] font-black text-yellow-700/70 uppercase tracking-widest mb-2 flex items-center gap-2">📌 {{ $t('sidebar_notes_title') }}</h3>
                <textarea :value="localNotes" @input="$emit('update:localNotes', $event.target.value)" 
                    class="w-full bg-transparent border-0 focus:ring-0 text-sm font-handwriting text-slate-700 p-0 h-32 resize-none leading-[24px]" 
                    style="background-image: linear-gradient(transparent, transparent 23px, #eab30820 24px); background-size: 100% 24px;"
                    :placeholder="$t('placeholder_notes')"></textarea>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span class="bg-orange-100 text-orange-600 p-1 rounded">🍽️</span> {{ $t('sidebar_meal_title') }}
            </h3>
            <div class="space-y-3">
                <div v-for="(icon, key) in { breakfast: '🍳', lunch: '🍱', dinner: '🥗' }" :key="key" 
                    class="flex items-center gap-3 p-2 rounded-xl bg-orange-50/50 border border-orange-100 focus-within:bg-white focus-within:border-orange-300 transition-all">
                    <span class="text-lg">{{ icon }}</span>
                    <input :value="localMeals?.[key]" @input="$emit('update:localMeals', { ...localMeals, [key]: $event.target.value })" 
                        class="w-full text-xs font-semibold border-0 focus:ring-0 p-0 bg-transparent text-slate-700" 
                        :placeholder="$t('placeholder_' + key)" />
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span class="bg-blue-100 text-blue-600 p-1 rounded">💧</span> Water Intake
                </h3>
                <span class="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{{ waterIntake }} / 8</span>
            </div>
            <div class="flex justify-between p-1 bg-slate-50 rounded-2xl border border-slate-100">
                <button v-for="glass in 8" :key="glass" type="button"
                    @click="waterIntake = (glass === waterIntake ? glass - 1 : glass)"
                    class="flex-1 py-3 flex items-center justify-center transition-all duration-300 transform active:scale-75"
                    :class="glass <= waterIntake ? 'bg-white shadow-sm rounded-xl' : 'opacity-30 hover:opacity-100'">
                    <span class="text-lg">💧</span>
                </button>
            </div>
        </div>

    </div>
</template>