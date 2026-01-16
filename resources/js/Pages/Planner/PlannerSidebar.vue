<script setup>
defineProps({
    inboxTasks: Array,
    stats: Object,
    localNotes: String, 
    localMeals: Object,
    onDragStart: Function,
    openModal: Function, 
    toggleComplete: Function,
    getTypeColor: Function
});

const emit = defineEmits(['update:localNotes', 'update:localMeals']);

// Helper Warna Border untuk List Kiri
const getBorderColor = (type) => {
    if (type === 1) return 'border-l-blue-500';
    if (type === 2) return 'border-l-emerald-500';
    if (type === 3) return 'border-l-rose-500';
    return 'border-l-slate-300';
};
</script>

<template>
    <div class="w-full md:w-[30%] flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2 pb-20">
        
        <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <div class="flex items-end justify-between mb-2">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                <span class="text-2xl font-black text-indigo-600">{{ stats.percent }}%</span>
            </div>
            <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-indigo-500 transition-all duration-500" :style="{ width: `${stats.percent}%` }"></div>
            </div>
        </div>

        <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex-1 min-h-[300px]">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Inbox Tugas</h3>
                <button 
                    @click="openModal(null, null, 'simple')" 
                    class="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition"
                >
                    + Tambah
                </button>
            </div>

            <div v-if="inboxTasks.length === 0" class="text-center py-10 text-slate-300 text-sm italic">
                Semua tugas beres! 🎉
            </div>

            <div class="space-y-2">
                <div 
                    v-for="task in inboxTasks" :key="task.id"
                    draggable="true"
                    @dragstart="onDragStart($event, task)"
                    class="group flex items-center gap-3 p-3 bg-white border border-slate-100 hover:border-indigo-200 shadow-sm rounded-xl cursor-grab active:cursor-grabbing transition relative overflow-hidden"
                >
                    <div :class="['absolute left-0 top-0 bottom-0 w-1', getBorderColor(task.type)]"></div>

                    <button 
                        @click="toggleComplete(task)"
                        class="w-5 h-5 ml-2 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition"
                        :class="task.is_completed ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300 hover:border-indigo-500'"
                    >
                        <span v-if="task.is_completed" class="text-[10px] font-bold">✓</span>
                    </button>
                    
                    <div class="flex-1 min-w-0" @click="openModal(task, null, 'simple')">
                        <p 
                            class="text-sm font-bold text-slate-700 truncate transition cursor-pointer hover:text-indigo-600" 
                            :class="{'line-through text-slate-400': task.is_completed}"
                        >
                            {{ task.title }}
                        </p>
                    </div>

                    <div class="opacity-0 group-hover:opacity-100 text-slate-300">⋮⋮</div>
                </div>
            </div>
        </div>

        <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Menu Makan</h3>
            <div class="space-y-3">
                <div class="flex items-center gap-2">
                    <span class="text-lg">🍳</span>
                    <input :value="localMeals.breakfast" @input="$emit('update:localMeals', { ...localMeals, breakfast: $event.target.value })" class="w-full text-sm border-0 border-b border-slate-200 focus:ring-0 focus:border-indigo-500 px-0 py-1 bg-transparent placeholder-slate-300 font-medium" placeholder="Sarapan..." />
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-lg">🍱</span>
                    <input :value="localMeals.lunch" @input="$emit('update:localMeals', { ...localMeals, lunch: $event.target.value })" class="w-full text-sm border-0 border-b border-slate-200 focus:ring-0 focus:border-indigo-500 px-0 py-1 bg-transparent placeholder-slate-300 font-medium" placeholder="Makan Siang..." />
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-lg">🥗</span>
                    <input :value="localMeals.dinner" @input="$emit('update:localMeals', { ...localMeals, dinner: $event.target.value })" class="w-full text-sm border-0 border-b border-slate-200 focus:ring-0 focus:border-indigo-500 px-0 py-1 bg-transparent placeholder-slate-300 font-medium" placeholder="Makan Malam..." />
                </div>
            </div>
        </div>

        <div class="bg-yellow-50 p-5 rounded-3xl shadow-sm border border-yellow-100">
            <h3 class="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-2">Catatan / Ide</h3>
            <textarea :value="localNotes" @input="$emit('update:localNotes', $event.target.value)" class="w-full bg-transparent border-0 focus:ring-0 text-sm text-slate-700 p-0 h-32 resize-none leading-relaxed" placeholder="Tulis ide atau catatan hukuman disini..."></textarea>
        </div>

    </div>
</template>