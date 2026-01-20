<script setup>
defineProps({
    inboxTasks: {
        type: Array,
        default: () => []
    },
    stats: {
        type: Object,
        default: () => ({ percent: 0, completed: 0, total: 0 })
    }, 
    localNotes: String, 
    localMeals: {
        type: Object,
        default: () => ({ breakfast: '', lunch: '', dinner: '' })
    },
    onDragStart: Function,
    openModal: Function, 
    toggleComplete: Function,
    getTypeColor: Function
});

const emit = defineEmits(['update:localNotes', 'update:localMeals']);

// Logic Warna & Ikon
const getTaskStyle = (type) => {
    switch (type) {
        case 1: return { bg: 'bg-rose-50', border: 'border-l-rose-500', text: 'text-rose-700', icon: '🔥', badge: 'bg-rose-100 text-rose-600' };
        case 2: return { bg: 'bg-white', border: 'border-l-indigo-500', text: 'text-slate-700', icon: '⚡', badge: 'bg-indigo-50 text-indigo-600' };
        case 3: return { bg: 'bg-slate-50', border: 'border-l-slate-400', text: 'text-slate-500', icon: '☕', badge: 'bg-slate-200 text-slate-500' };
        default: return { bg: 'bg-white', border: 'border-l-slate-200', text: 'text-slate-700', icon: '📝', badge: 'bg-slate-100 text-slate-400' };
    }
};
</script>

<template>
    <div class="w-full md:w-[30%] flex flex-col gap-4 h-[calc(100vh-100px)] md:h-full overflow-y-auto custom-scrollbar pr-1 pb-24 md:pb-10">
        
        <div class="flex-shrink-0 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500"></div>

            <div class="flex justify-between items-end mb-3 relative z-10">
                <div>
                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {{ $t('sidebar_inbox_focus') || 'FOCUS' }}
                    </h3>
                    <div class="flex items-baseline gap-1">
                        <span class="text-3xl font-black text-slate-800 tracking-tight">
                            {{ stats?.percent || 0 }}<span class="text-lg text-slate-400">%</span>
                        </span>
                    </div>
                </div>
                
                <div class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                    :class="(stats?.percent || 0) === 100 ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-50 text-indigo-600'">
                    <span class="text-xl">{{ (stats?.percent || 0) === 100 ? '🏆' : '🔥' }}</span>
                </div>
            </div>

            <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div 
                    class="h-full rounded-full transition-all duration-1000 ease-out relative"
                    :class="(stats?.percent || 0) === 100 ? 'bg-emerald-500' : 'bg-indigo-500'"
                    :style="{ width: (stats?.percent || 0) + '%' }"
                ></div>
            </div>

            <div class="flex justify-between items-center text-xs">
                <span class="font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    {{ stats?.completed || 0 }} / {{ stats?.total || 0 }} {{ $t('sidebar_tasks_unit') || 'Tasks' }}
                </span>
            </div>
        </div>

        <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex-1 min-h-[350px] flex flex-col relative overflow-hidden flex-shrink-0">
            <div class="flex justify-between items-center mb-5 relative z-10">
                <div class="flex items-center gap-2">
                    <span class="text-xl bg-indigo-50 w-8 h-8 flex items-center justify-center rounded-lg">📥</span>
                    <h3 class="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
                        {{ $t('sidebar_inbox_title') || 'Inbox' }}
                    </h3>
                    <span class="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {{ inboxTasks?.length || 0 }}
                    </span>
                </div>
                <button 
                    @click="openModal(null, null, 'simple')" 
                    class="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all active:scale-95 flex items-center gap-1 shadow-sm"
                >
                    <span>+</span> {{ $t('btn_add') || 'Add' }}
                </button>
            </div>

            <div v-if="!inboxTasks || inboxTasks.length === 0" class="flex-1 flex flex-col items-center justify-center text-slate-300 gap-3 border-2 border-dashed border-slate-50 rounded-2xl m-2">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-3xl opacity-50">🍃</div>
                <p class="text-xs font-medium italic text-center">{{ $t('sidebar_inbox_empty') || 'No tasks yet' }}</p>
            </div>

            <div v-else class="space-y-3 overflow-y-auto custom-scrollbar pr-1 pb-2 -mr-2 flex-1 h-full">
                <div 
                    v-for="task in inboxTasks" :key="task.id"
                    draggable="true"
                    @dragstart="onDragStart($event, task)"
                    class="group relative flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200 cursor-grab active:cursor-grabbing hover:shadow-md"
                    :class="[
                        getTaskStyle(task.type).bg, 
                        task.is_completed ? 'border-slate-100 opacity-60 grayscale' : 'border-slate-100 hover:border-indigo-200'
                    ]"
                >
                    <div :class="['absolute left-0 top-3 bottom-3 w-1 rounded-r-full', getTaskStyle(task.type).border]"></div>

                    <button 
                        @click="toggleComplete(task)"
                        class="w-6 h-6 ml-2 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all shadow-sm"
                        :class="task.is_completed ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white border-slate-200 hover:border-indigo-400'"
                    >
                        <svg v-if="task.is_completed" class="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </button>
                    
                    <div class="flex-1 min-w-0" @click="openModal(task, null, 'simple')">
                        <div class="flex items-center gap-2 mb-0.5">
                            <span class="text-xs">{{ getTaskStyle(task.type).icon }}</span>
                            <p 
                                class="text-sm font-bold text-slate-700 truncate transition cursor-pointer hover:text-indigo-600 leading-snug" 
                                :class="{'line-through text-slate-400': task.is_completed}"
                            >
                                {{ task.title }}
                            </p>
                        </div>
                        <p v-if="task.notes" class="text-[10px] text-slate-400 truncate pl-6">{{ task.notes }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-shrink-0 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span>🍽️</span> {{ $t('sidebar_meals_title') || 'Meals' }}
            </h3>
            <div class="space-y-2">
                <div class="flex items-center gap-3 p-2 rounded-xl bg-orange-50/50 border border-orange-100/50">
                    <span class="text-lg">🍳</span>
                    <input :value="localMeals?.breakfast" @input="$emit('update:localMeals', { ...localMeals, breakfast: $event.target.value })" class="w-full text-xs font-medium border-0 focus:ring-0 p-0 bg-transparent text-slate-600" :placeholder="$t('meal_breakfast') || 'Breakfast'" />
                </div>
                <div class="flex items-center gap-3 p-2 rounded-xl bg-orange-50/50 border border-orange-100/50">
                    <span class="text-lg">🍱</span>
                    <input :value="localMeals?.lunch" @input="$emit('update:localMeals', { ...localMeals, lunch: $event.target.value })" class="w-full text-xs font-medium border-0 focus:ring-0 p-0 bg-transparent text-slate-600" :placeholder="$t('meal_lunch') || 'Lunch'" />
                </div>
                <div class="flex items-center gap-3 p-2 rounded-xl bg-orange-50/50 border border-orange-100/50">
                    <span class="text-lg">🥗</span>
                    <input :value="localMeals?.dinner" @input="$emit('update:localMeals', { ...localMeals, dinner: $event.target.value })" class="w-full text-xs font-medium border-0 focus:ring-0 p-0 bg-transparent text-slate-600" :placeholder="$t('meal_dinner') || 'Dinner'" />
                </div>
            </div>
        </div>

        <div class="flex-shrink-0 bg-yellow-50/80 p-5 rounded-3xl shadow-sm border border-yellow-200 relative group hover:bg-yellow-100/50 transition-colors">
            <div class="absolute -top-3 -right-3 bg-yellow-400 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md transform rotate-12 group-hover:rotate-0 transition-transform">
                ✏️
            </div>
            <h3 class="text-[10px] font-bold text-yellow-700 uppercase tracking-widest mb-2">
                {{ $t('sidebar_notes_title') || 'Notes' }}
            </h3>
            <textarea 
                :value="localNotes" 
                @input="$emit('update:localNotes', $event.target.value)" 
                class="w-full bg-transparent border-0 focus:ring-0 text-xs font-medium text-slate-700 p-0 h-20 resize-none leading-relaxed placeholder-yellow-600/40" 
                :placeholder="$t('sidebar_notes_placeholder') || 'Type notes...'">
            </textarea>
        </div>

    </div>
</template>