<script setup>
import { ref, watch, computed, nextTick, onMounted } from 'vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import EmptyState from '@/Components/EmptyState.vue';
import draggable from 'vuedraggable';
import dayjs from 'dayjs';
import { useAppearance } from '@/Composables/useAppearance';

const { isDark } = useAppearance();

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
        <div v-if="localHabits.length > 0" class="md:hidden space-y-6">
            <!-- Day Selector (Scrolling Strip) -->
            <div class="relative">
                <div ref="dayStripRef" class="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth px-4 py-2">
                    <button 
                        v-for="day in monthDates" 
                        :key="day.dateString"
                        @click="selectDay(day.dateString)"
                        class="flex-shrink-0 w-12 py-3 rounded-2xl flex flex-col items-center gap-1 transition-all duration-300"
                        :class="[
                            selectedDate === day.dateString 
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none scale-110 day-active' 
                                : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700'
                        ]"
                    >
                        <span class="text-[10px] font-bold uppercase tracking-tighter opacity-80">{{ day.dayName }}</span>
                        <span class="text-sm font-black">{{ day.dayNumber }}</span>
                    </button>
                </div>
            </div>

            <!-- Habits List for Selected Day -->
            <div class="space-y-3 px-4">
                <div v-for="habit in localHabits" :key="habit.id" 
                    class="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-all active:scale-[0.98]"
                    :class="{ 'opacity-60 grayscale-[0.4] scale-[0.97]': habit.is_stagnant }"
                    @touchstart="handleTouchStart(habit, selectedDate)"
                    @touchend="handleTouchEnd"
                >
                    <!-- Icon -->
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform" 
                        :class="{ 'rotate-12': habit.is_stagnant }"
                        :style="{ backgroundColor: habit.color + '15', color: habit.color }">
                        {{ habit.icon }}
                    </div>

                    <!-- Name & Progress -->
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2">
                            <h4 class="font-bold text-sm flex items-center flex-wrap gap-1.5"
                                :class="habit.is_stagnant ? 'text-slate-400 dark:text-slate-50' : 'text-slate-700 dark:text-white'">
                                <span class="line-clamp-2 break-words leading-tight">{{ habit.name }}</span>
                                <span v-if="habit.is_stagnant" class="text-[8px] font-black bg-rose-50 text-rose-500 px-1 rounded-md">Dormant</span>
                            </h4>
                            <!-- Mobile Delete/Edit Mini Menu -->
                            <div class="flex items-center gap-1 opacity-100">
                                <button @click.stop="confirmDelete(habit)" class="p-2 text-slate-300 dark:text-slate-600 hover:text-rose-500 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                    <OneForMindIcon name="trash" size="14" />
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <div class="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-500" 
                                    :style="{ width: habit.progress_percent + '%', backgroundColor: habit.color }">
                                </div>
                            </div>
                            <span class="text-[10px] font-black text-slate-400 dark:text-slate-500">{{ Math.round(habit.progress_percent) }}%</span>
                        </div>
                    </div>

                    <!-- Toggle Button -->
                    <button 
                        @click="handleMobileClick(habit, selectedDate)"
                        class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden"
                        :class="[
                            getStatus(habit, selectedDate) === 'completed'
                                ? 'shadow-lg text-white'
                                : getStatus(habit, selectedDate) === 'skipped'
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                                    : 'bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600',
                            habit.is_stagnant && getStatus(habit, selectedDate) === 'empty' ? 'shake-infinite' : ''
                        ]"
                        :style="getStatus(habit, selectedDate) === 'completed' ? { backgroundColor: habit.color, boxShadow: (getStatus(habit, selectedDate) === 'completed' && !isDark) ? `0 8px 16px ${habit.color}30` : 'none' } : {}"
                    >
                        <div v-if="habit.is_stagnant && getStatus(habit, selectedDate) === 'empty'" class="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                        <OneForMindIcon v-if="getStatus(habit, selectedDate) === 'completed'" name="check" size="20" stroke-width="4" />
                        <span v-else-if="getStatus(habit, selectedDate) === 'skipped'" class="text-xl font-black">-</span>
                        <OneForMindIcon v-else name="plus" size="20" stroke-width="3" />
                    </button>
                </div>
            </div>

            <!-- Hint -->
            <p class="text-[10px] text-center text-slate-400 font-medium px-10 leading-relaxed">
                💡 {{ $t('habit_mobile_hint', 'Tekan sekali untuk SELESAI, tahan (hold) untuk SKIP keesokan harinya.') }}
            </p>
        </div>

        <!-- Empty State Mobile -->
        <!-- Empty State Mobile (Job Tracker Style) -->
        <div v-else class="md:hidden py-16 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col items-center gap-4">
            <span class="text-5xl animate-bounce">🌱</span>
            <p class="text-xs font-bold text-slate-400 dark:text-slate-500 px-10">
                {{ $t('habit_empty', 'Belum ada habit aktif. Tambah satu yuk!') }}
            </p>
            <button @click="openCreateModal" class="mt-2 bg-indigo-600 text-white font-black py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all outline-none">
                + {{ $t('habit_btn_add', 'Tambah Habit') }}
            </button>
        </div>

        <!-- ==================== DESKTOP LAYOUT (≥md) ==================== -->
        <div v-if="localHabits.length > 0" class="hidden md:block bg-white dark:bg-slate-900 md:rounded-[2.5rem] shadow-sm md:shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden relative">
            <div class="overflow-x-auto custom-scrollbar relative select-none">

                    <div class="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex shadow-sm">
                        <div class="sticky left-0 z-40 bg-white dark:bg-slate-900 w-72 shrink-0 border-r border-slate-100 dark:border-slate-800 p-4 flex items-center font-bold text-slate-400 dark:text-slate-500 text-xs capitalize shadow-[10px_0_20px_rgba(0,0,0,0.02)] dark:shadow-[10px_0_20px_rgba(0,0,0,0.2)]">
                            <div class="w-8 shrink-0"></div> 
                            <span class="truncate"> {{ $t('habit_name') }}</span>
                        </div>
                        <div class="flex items-center px-4 py-3 gap-1.5">
                            <div v-for="day in monthDates" :key="day.dateString" class="w-8 shrink-0 flex flex-col items-center gap-1">
                                <span class="text-[10px] font-bold text-slate-400 capitalize">{{ day.dayName }}</span>
                                <span class="text-xs font-black text-slate-600 dark:text-slate-300" :class="day.isToday ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 rounded' : ''">{{ day.dayNumber }}</span>
                            </div>
                        </div>
                        <div class="flex shrink-0 sticky right-0 z-40 bg-white dark:bg-slate-900 w-32 p-4 border-l border-slate-100 dark:border-slate-800 items-center justify-end font-bold text-slate-400 dark:text-slate-500 text-xs capitalize shadow-[-10px_0_20px_rgba(255,255,255,0.8)] dark:shadow-[-10px_0_20px_rgba(15,23,42,0.8)]">
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
                        class="divide-y divide-slate-50 dark:divide-slate-800"
                    >
                        <template #item="{ element: habit, index: hIndex }">
                            <div class="flex transition-colors duration-200 group relative bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800">

                                <div class="sticky left-0 z-30 w-72 shrink-0 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 border-r border-slate-100 dark:border-slate-800 p-4 flex items-center gap-3 flex-shrink-0 shadow-[10px_0_20px_rgba(0,0,0,0.02)] dark:shadow-[10px_0_20px_rgba(0,0,0,0.2)]">
                                    <div class="drag-handle cursor-grab active:cursor-grabbing text-slate-300 dark:text-slate-700 hover:text-indigo-500 opacity-30 group-hover:opacity-100 transition-opacity p-1 -ml-2 shrink-0">
                                        <OneForMindIcon name="menu" size="20" />
                                    </div>
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 shrink-0" :style="{ color: habit.color }">
                                        {{ habit.icon }}
                                    </div>

                                    <!-- Action Bubble (Desktop) -->
                                    <div class="flex items-center gap-1 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-1.5 py-1 rounded-full absolute right-2 top-2 shadow-xl border border-slate-200/50 dark:border-slate-700 z-50 transition-all opacity-0 scale-90 translate-x-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0">
                                        <button @click="editHabit(habit)" class="p-1.5 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-full transition" title="Edit">
                                            <OneForMindIcon name="planner" size="14" stroke-width="2.5" />
                                        </button>
                                        <button @click="confirmDelete(habit)" class="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full transition" title="Hapus">
                                            <OneForMindIcon name="trash" size="14" stroke-width="2.5" />
                                        </button>
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <h4 class="font-bold truncate text-sm flex items-center gap-1.5"
                                            :class="habit.is_stagnant ? 'text-slate-400 line-through decoration-rose-500/30' : 'text-slate-700 dark:text-slate-200'">
                                            {{ habit.name }}
                                            <span v-if="habit.streak > 1" class="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-[10px] font-black animate-pulse shadow-sm border border-orange-100/50 dark:border-orange-500/20">
                                                {{ habit.streak }} <span class="text-xs">🔥</span>
                                            </span>
                                            <span v-if="habit.is_stagnant" class="text-[8px] font-black bg-rose-50 text-rose-500 px-1.5 py-0.5 rounded-md">Dormant</span>
                                        </h4>
                                        <div class="flex items-center gap-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 mb-1.5 mt-0.5">
                                            <span>🎯 Target: {{ habit.monthly_target }}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <div class="h-1.5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div class="h-full rounded-full transition-all duration-300" :style="{ width: habit.progress_percent + '%', backgroundColor: habit.color }"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center px-4 py-3 gap-1.5 pointer-events-auto">
                                    <div v-for="(day, dIndex) in monthDates" :key="day.dateString" class="w-8 shrink-0 flex justify-center">
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
                                                    'ring-4 ring-indigo-400 scale-110 z-20 shadow-lg !bg-indigo-50 dark:!bg-indigo-500/10 !border-indigo-400': isCellSelected && isCellSelected(habit.id, day.dateString),
                                                    'shadow-md text-white border-transparent z-10': getStatus(habit, day.dateString) === 'completed' && !(isCellSelected && isCellSelected(habit.id, day.dateString)),
                                                    'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700': getStatus(habit, day.dateString) === 'skipped' && !(isCellSelected && isCellSelected(habit.id, day.dateString)),
                                                    'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400': getStatus(habit, day.dateString) === 'empty' && !day.isFuture && !(isCellSelected && isCellSelected(habit.id, day.dateString)),
                                                    'bg-slate-50 dark:bg-slate-950 border-slate-50 dark:border-slate-900 opacity-30 cursor-not-allowed': day.isFuture,
                                                    'ring-2 ring-indigo-600 ring-offset-2': day.isToday && getStatus(habit, day.dateString) !== 'completed' && !(isCellSelected && isCellSelected(habit.id, day.dateString))
                                                }"
                                                :style="getStatus(habit, day.dateString) === 'completed' && !(isCellSelected && isCellSelected(habit.id, day.dateString)) ? { backgroundColor: habit.color, boxShadow: (getStatus(habit, day.dateString) === 'completed' && !isDark) ? `0 4px 12px ${habit.color}30` : 'none' } : {}"
                                            >
                                            <OneForMindIcon v-if="getStatus(habit, day.dateString) === 'completed'" name="check" size="14" stroke-width="4" class="text-white animate-in zoom-in duration-300" />
                                            <span v-if="getStatus(habit, day.dateString) === 'skipped'" class="text-xs font-bold animate-in fade-in duration-300">-</span>
                                        </button>
                                    </div>
                                </div>

                                <div class="flex shrink-0 sticky right-0 z-30 w-32 bg-white dark:bg-slate-900 group-hover:bg-slate-50 group-hover:dark:bg-slate-800/80 border-l border-slate-100 dark:border-slate-800 p-4 flex-col justify-center shadow-[-10px_0_20px_rgba(255,255,255,0.8)] dark:shadow-[-10px_0_20px_rgba(15,23,42,0.8)]">
                                    <div class="flex justify-between items-end mb-1">
                                        <span class="text-lg font-black text-slate-700 dark:text-slate-200">{{ habit.progress_count }}</span>
                                        <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1">{{ Math.round(habit.progress_percent) }}%</span>
                                    </div>
                                    <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
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
            <!-- Simple Empty State (Job Tracker Style) -->
            <div class="py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-sm mt-4 w-full max-w-4xl">
                <div class="flex flex-col items-center gap-4">
                    <span class="text-5xl animate-bounce">🌱</span>
                    <p class="text-sm font-bold text-slate-400 dark:text-slate-500 px-8">
                        {{ $t('habit_empty', 'Belum ada habit aktif. Tambah satu yuk!') }}
                    </p>
                    <button @click="openCreateModal" class="mt-2 bg-indigo-600 text-white font-black py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all outline-none">
                        + {{ $t('habit_btn_add', 'Tambah Habit') }}
                    </button>
                </div>
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
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; }
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

.shake-infinite {
  animation: shake 2s infinite;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>