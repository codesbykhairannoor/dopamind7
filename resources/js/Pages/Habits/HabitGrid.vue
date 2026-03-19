<script setup>
import { ref, watch, computed, nextTick, onMounted } from 'vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import EmptyState from '@/Components/EmptyState.vue';
import draggable from 'vuedraggable';
import dayjs from 'dayjs';

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

// Draggable list for desktop
const draggableList = ref([...props.localHabits]);
watch(() => props.localHabits, (newVal) => {
    draggableList.value = [...newVal];
}, { deep: true });

const handleDragEnd = () => {
    if (props.saveHabitOrder) props.saveHabitOrder(draggableList.value);
};

// ===== MOBILE: Day Selector State =====
const todayStr = dayjs().format('YYYY-MM-DD');
const selectedDate = ref(todayStr);
const dayStripRef = ref(null);

// Long Press Logic for Mobile
let longPressTimer = null;
const isLongPressed = ref(false);

const handleTouchStart = (habit, date) => {
    isLongPressed.value = false;
    longPressTimer = setTimeout(() => {
        isLongPressed.value = true;
        if (props.toggleStatus) props.toggleStatus(habit.id, date, 'skipped');
        // Vibrate if available
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
    }, 600); // 600ms hold for skip
};

const handleTouchEnd = () => {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
};

const handleMobileClick = (habit, date) => {
    // Only toggle if it wasn't a long press
    if (!isLongPressed.value) {
        if (props.toggleStatus) props.toggleStatus(habit.id, date);
    }
    isLongPressed.value = false;
};

// Find today in monthDates
const todayInMonth = computed(() => props.monthDates.find(d => d.dateString === todayStr));

watch(() => props.monthDates, () => {
    // If selected date is no longer in the grid (e.g. month changed), reset to today or last date
    if (!props.monthDates.find(d => d.dateString === selectedDate.value)) {
        selectedDate.value = todayInMonth.value?.dateString || props.monthDates[props.monthDates.length - 1]?.dateString;
    }
    nextTick(() => scrollToSelected());
});

const selectedDay = computed(() => props.monthDates.find(d => d.dateString === selectedDate.value));

const selectDay = (dateString) => {
    selectedDate.value = dateString;
    nextTick(() => scrollToSelected());
};

const scrollToSelected = () => {
    if (!dayStripRef.value) return;
    const active = dayStripRef.value.querySelector('.day-active');
    if (active) {
        active.scrollIntoView({ 
            behavior: 'smooth', 
            inline: 'center', 
            block: 'nearest' 
        });
    }
};

onMounted(() => {
    setTimeout(() => scrollToSelected(), 300);
});
</script>

<template>
    <div class="w-full md:max-w-[95%] mx-auto md:px-2 pt-2 md:pt-8 pb-20">

        <!-- ==================== MOBILE LAYOUT (<md) ==================== -->
        <div v-if="localHabits.length > 0" class="md:hidden">

        </div>

        <!-- Empty State Mobile -->
        <div v-else class="md:hidden flex flex-col items-center">
            <EmptyState 
                title="Mulai Habit Pertamamu" 
                description="Habit tracker yang konsisten adalah kunci perubahan besar. Yuk tambahkan habit pertamamu!" 
                image="habits"
                actionLabel="Tambah Habit"
                @click="openCreateModal"
            />
        </div>

        <!-- ==================== DESKTOP LAYOUT (≥md) ==================== -->
        <div v-if="localHabits.length > 0" class="hidden md:block bg-white md:rounded-[2.5rem] shadow-sm md:shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
            <div class="overflow-x-auto custom-scrollbar relative select-none">

                    <div class="sticky top-0 z-30 bg-white border-b border-slate-100 flex shadow-sm">
                        <div class="sticky left-0 z-40 bg-white w-72 border-r border-slate-100 p-4 flex items-center font-bold text-slate-400 text-xs uppercase tracking-wider">
                            <div class="w-8 shrink-0"></div> 
                            <span class="truncate"> {{ $t('habit_name') }}</span>
                        </div>
                        <div class="flex items-center px-4 py-3 gap-1.5">
                            <div v-for="day in monthDates" :key="day.dateString" class="w-8 flex flex-col items-center gap-1">
                                <span class="text-[10px] font-bold text-slate-400 capitalize">{{ day.dayName }}</span>
                                <span class="text-xs font-black text-slate-600" :class="day.isToday ? 'text-indigo-600 bg-indigo-50 px-1.5 rounded' : ''">{{ day.dayNumber }}</span>
                            </div>
                        </div>
                        <div class="flex sticky right-0 z-40 bg-white w-32 p-4 border-l border-slate-100 items-center justify-end font-bold text-slate-400 text-xs uppercase tracking-wider shadow-[-10px_0_20px_rgba(255,255,255,0.8)]">
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

                                <div class="sticky left-0 z-20 w-72 bg-inherit border-r border-slate-100 p-4 flex items-center gap-3 flex-shrink-0">
                                    <div class="drag-handle cursor-grab active:cursor-grabbing text-slate-300 hover:text-indigo-500 opacity-30 group-hover:opacity-100 transition-opacity p-1 -ml-2 shrink-0">
                                        <OneForMindIcon name="menu" size="20" />
                                    </div>
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-50 border border-slate-100 shrink-0" :style="{ color: habit.color }">
                                        {{ habit.icon }}
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <h4 class="font-bold text-slate-700 truncate text-sm flex items-center gap-1.5">
                                            {{ habit.name }}
                                            <span v-if="habit.streak > 1" class="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black animate-pulse shadow-sm border border-orange-100/50">
                                                {{ habit.streak }} <span class="text-xs">🔥</span>
                                            </span>
                                        </h4>
                                        <div class="flex items-center gap-1 text-[10px] font-medium text-slate-400 mb-1.5 mt-0.5">
                                            <span>🎯 Target: {{ habit.monthly_target }}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <div class="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                                <div class="h-full rounded-full transition-all duration-300" :style="{ width: habit.progress_percent + '%', backgroundColor: habit.color }"></div>
                                            </div>
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

                                <div class="flex items-center px-4 py-3 gap-1.5 pointer-events-auto">
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
                                            class="scroll-mt-32 w-8 h-8 rounded-lg flex items-center justify-center relative outline-none transition-all duration-200 hover:scale-110 hover:z-20 active:scale-75 focus:ring-4 focus:ring-indigo-400 focus:z-30 focus:shadow-lg" 
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
                                            <span v-if="getStatus(habit, day.dateString) === 'skipped'" class="text-xs font-bold animate-in fade-in duration-300">-</span>
                                        </button>
                                    </div>
                                </div>

                                <div class="flex sticky right-0 z-20 w-32 bg-inherit border-l border-slate-100 p-4 flex-col justify-center shadow-[-10px_0_20px_rgba(255,255,255,0.8)]">
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

        <!-- DESKTOP EMPTY STATE (≥md) -->
        <div v-if="localHabits.length === 0" class="hidden md:flex justify-center w-full px-4">
            <div class="w-full max-w-4xl bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-12 mt-6">
                <EmptyState 
                    title="Belum ada Habit di bulan ini" 
                    description="Sepertinya kamu belum merencanakan kebiasaan baik untuk bulan ini. Mulai sekarang dan jadilah versi terbaikmu!" 
                    image="habits"
                    actionLabel="Tambah Habit Baru"
                    @click="openCreateModal"
                />
                <div v-if="hasPrevHabits" class="mt-8 flex justify-center">
                    <button @click="openCopyModal" class="px-6 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition">📂 {{ $t('habit_salin_btn') }}</button>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
/* GLASSMORPHISM SUPPORT */
@supports (backdrop-filter: blur(1px)) {
  .backdrop-blur-md {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
}

.custom-scrollbar::-webkit-scrollbar { height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
button { -webkit-tap-highlight-color: transparent; }

/* Sticky Header on Mobile */
@media (max-width: 767px) {
  .sticky {
    position: sticky;
  }
}
</style>