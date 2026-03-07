<script setup>
import { ref, watch } from 'vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import draggable from 'vuedraggable';

const props = defineProps({
    localHabits: Array,
    monthDates: Array,
    hasPrevHabits: Boolean,
    toggleStatus: Function,
    handleGridNav: Function,
    getStatus: Function,
    editHabit: Function,
    confirmDelete: Function,
    openCreateModal: Function, 
    openCopyModal: Function, 
    
    handleMouseDown: Function,
    handleMouseEnter: Function,
    isCellSelected: Function,
    saveHabitOrder: Function,
});

// 🔥 FIX: 1. Buat referensi array lokal khusus untuk Draggable 
// (Agar tidak terjadi bentrok "Mutating Props" di Vue)
const draggableList = ref([...props.localHabits]);

// 🔥 FIX: 2. Jika ada penambahan/perubahan habit dari atas (parent), update list draggable-nya
watch(() => props.localHabits, (newVal) => {
    draggableList.value = [...newVal];
}, { deep: true });

// 🔥 FIX: 3. Eksekusi tembak API ke server HANYA KETIKA proses drag (geser) selesai
const handleDragEnd = () => {
    if (props.saveHabitOrder) {
        props.saveHabitOrder(draggableList.value);
    }
};
</script>

<template>
    <div class="w-full md:max-w-[95%] mx-auto md:px-2 pt-4 md:pt-8 pb-20">

        <div v-if="localHabits.length > 0" class="bg-white md:rounded-3xl shadow-sm md:shadow-[0_2px_20px_rgba(0,0,0,0.04)] border-y md:border border-slate-100 overflow-hidden relative">

            <div class="overflow-x-auto custom-scrollbar relative select-none">
                <div class="min-w-max">

                    <div class="sticky top-0 z-30 bg-white border-b border-slate-100 flex shadow-sm">
                        <div class="sticky left-0 z-40 bg-white w-40 md:w-72 border-r border-slate-100 p-3 md:p-4 flex items-center font-bold text-slate-400 text-[10px] md:text-xs uppercase tracking-wider">
                            <div class="w-6 md:w-8 shrink-0"></div> 
                            <span class="truncate"> {{ $t('habit_name') }}</span>
                        </div>
                        <div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5">
                            <div v-for="day in monthDates" :key="day.dateString" class="w-8 flex flex-col items-center gap-1">
                                <span class="text-[9px] md:text-[10px] font-bold text-slate-400 capitalize">{{ day.dayName }}</span>
                                <span class="text-[10px] md:text-xs font-black text-slate-600" :class="day.isToday ? 'text-indigo-600 bg-indigo-50 px-1.5 rounded' : ''">{{ day.dayNumber }}</span>
                            </div>
                        </div>
                        <div class="hidden md:flex sticky right-0 z-40 bg-white w-32 p-4 border-l border-slate-100 items-center justify-end font-bold text-slate-400 text-xs uppercase tracking-wider shadow-[-10px_0_20px_rgba(255,255,255,0.8)]">
                            {{ $t('habit_table_total') }}
                        </div>
                    </div>

                    <draggable 
                        v-model="draggableList"
                        @end="handleDragEnd"
                        item-key="id"
                        handle=".drag-handle"
                        animation="250"
                        ghost-class="opacity-40"
                        class="divide-y divide-slate-50"
                    >
                        <template #item="{ element: habit, index: hIndex }">
                            <div class="flex transition-colors duration-200 group relative bg-white hover:bg-slate-50/50">

                                <div class="sticky left-0 z-20 w-40 md:w-72 bg-inherit border-r border-slate-100 p-3 md:p-4 flex items-center gap-2 md:gap-3 flex-shrink-0">
                                    
                                    <div class="drag-handle cursor-grab active:cursor-grabbing text-slate-300 hover:text-indigo-500 opacity-30 group-hover:opacity-100 transition-opacity p-1 md:-ml-2 shrink-0">
                                        <OneForMindIcon name="menu" size="20" />
                                    </div>

                                    <div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center text-base md:text-xl bg-slate-50 border border-slate-100 shrink-0" :style="{ color: habit.color }">
                                        {{ habit.icon }}
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <h4 class="font-bold text-slate-700 truncate text-xs md:text-sm">{{ habit.name }}</h4>
                                        <div class="flex items-center gap-1 text-[10px] font-medium text-slate-400 mb-1.5 mt-0.5">
                                            <span>🎯 Target: {{ habit.monthly_target }}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <div class="h-1 md:h-1.5 w-10 md:w-16 bg-slate-100 rounded-full overflow-hidden">
                                                <div class="h-full rounded-full transition-all duration-300" :style="{ width: habit.progress_percent + '%', backgroundColor: habit.color }"></div>
                                            </div>
                                            
                                            <button @click="editHabit(habit)" class="md:hidden text-slate-400 hover:text-indigo-600 px-1 active:scale-95 transition">
                                                <OneForMindIcon name="planner" size="14" stroke-width="2.5" />
                                            </button>
                                            
                                            <div class="hidden md:flex opacity-0 group-hover:opacity-100 transition items-center gap-1 bg-white/80 backdrop-blur-sm px-1 rounded-md absolute right-2 top-1/2 -translate-y-1/2 shadow-sm border border-slate-100 z-50">
                                                <button @click="editHabit(habit)" class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="Edit">
                                                    <OneForMindIcon name="planner" size="14" stroke-width="2.5" />
                                                </button>
                                                <button @click="confirmDelete(habit)" class="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition" title="Hapus">
                                                    <OneForMindIcon name="trash" size="14" stroke-width="2.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center px-2 md:px-4 py-2 md:py-3 gap-1 md:gap-1.5 pointer-events-auto">
                                    <div v-for="(day, dIndex) in monthDates" :key="day.dateString" class="w-8 flex justify-center">
                                        <button 
                                            :id="`cell-${hIndex}-${dIndex}`"
                                            @click="toggleStatus(habit.id, day.dateString)" 
                                            @contextmenu.prevent="toggleStatus(habit.id, day.dateString, 'skipped')"
                                            @keydown="handleGridNav($event, hIndex, dIndex, habit.id, day.dateString)"
                                            @mousedown="handleMouseDown && handleMouseDown($event, habit.id, day.dateString)"
                                            @mouseenter="handleMouseEnter && handleMouseEnter(habit.id, day.dateString)"
                                            :disabled="day.isFuture"
                                            tabindex="0"
                                            class="scroll-mt-32 md:scroll-ml-72 w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg flex items-center justify-center relative outline-none transition-all duration-200 hover:scale-110 hover:z-20 active:scale-75 focus:ring-4 focus:ring-indigo-400 focus:z-30 focus:shadow-lg" 
                                            :class="{
                                                'ring-4 ring-indigo-400 scale-110 z-20 shadow-lg !bg-indigo-50 !border-indigo-400': isCellSelected && isCellSelected(habit.id, day.dateString),
                                                'shadow-md text-white border-transparent z-10': getStatus(habit, day.dateString) === 'completed' && !(isCellSelected && isCellSelected(habit.id, day.dateString)),
                                                'bg-slate-100 text-slate-400 border-slate-200': getStatus(habit, day.dateString) === 'skipped' && !(isCellSelected && isCellSelected(habit.id, day.dateString)),
                                                'bg-white border border-slate-200 hover:border-indigo-400': getStatus(habit, day.dateString) === 'empty' && !day.isFuture && !(isCellSelected && isCellSelected(habit.id, day.dateString)),
                                                'bg-slate-50 border-slate-50 opacity-30 cursor-not-allowed': day.isFuture,
                                                'ring-2 ring-indigo-600 ring-offset-2': day.isToday && getStatus(habit, day.dateString) !== 'completed' && !(isCellSelected && isCellSelected(habit.id, day.dateString))
                                            }"
                                            :style="getStatus(habit, day.dateString) === 'completed' && !(isCellSelected && isCellSelected(habit.id, day.dateString)) ? { backgroundColor: habit.color } : {}"
                                        >
                                            <OneForMindIcon v-if="getStatus(habit, day.dateString) === 'completed'" name="check" size="14" stroke-width="4" class="text-white animate-in zoom-in duration-300" />
                                            <span v-if="getStatus(habit, day.dateString) === 'skipped'" class="text-[10px] md:text-xs font-bold animate-in fade-in duration-300">-</span>
                                        </button>
                                    </div>
                                </div>

                                <div class="hidden md:flex sticky right-0 z-20 w-32 bg-inherit border-l border-slate-100 p-4 flex-col justify-center shadow-[-10px_0_20px_rgba(255,255,255,0.8)]">
                                    <div class="flex justify-between items-end mb-1">
                                        <span class="text-lg font-black text-slate-700">{{ habit.progress_count }}</span>
                                        <span class="text-[10px] font-bold text-slate-400 mb-1">{{ Math.round(habit.progress_percent) }}%</span>
                                    </div>
                                    <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                        <div class="h-full rounded-full transition-all duration-500" :style="{ width: habit.progress_percent + '%', backgroundColor: habit.color }"></div>
                                    </div>
                                </div>

                            </div>
                        </template>
                    </draggable>

                </div>
            </div>
        </div>

        <div v-else class="bg-white rounded-3xl p-8 md:p-12 text-center shadow-lg border border-slate-100 mt-6 mx-4 md:mx-0">
            <div class="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <OneForMindIcon name="habit" size="48" stroke-width="1.5" />
            </div>
            <h3 class="text-lg md:text-xl font-bold text-slate-800">{{ $t('habit_empty_title') }}</h3>
            <p class="text-sm md:text-base text-slate-500 mb-6">{{ $t('habit_empty_desc') }}</p>
            <div class="flex flex-col md:flex-row items-center justify-center gap-4">
                <button @click="openCreateModal" class="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition transform hover:-translate-y-1 flex items-center gap-2">
                    <OneForMindIcon name="plus" size="18" stroke-width="3" /> {{ $t('habit_btn_new') }}
                </button>
                <button v-if="hasPrevHabits" @click="openCopyModal" class="px-6 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition">📂 {{ $t('habit_salin_btn') }}</button>
            </div>
        </div>

    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
button { -webkit-tap-highlight-color: transparent; }
</style>