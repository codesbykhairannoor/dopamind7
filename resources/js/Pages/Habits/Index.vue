<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useHabits } from '@/Composables/useHabits';

// Component Anak
import HabitHeader from './HabitHeader.vue';
import HabitGrid from './HabitGrid.vue';
import HabitStats from './HabitStats.vue';
import HabitModals from './HabitModals.vue';
import NeuralHabitInsight from './NeuralHabitInsight.vue';
import NeuralBridge from '@/Components/NeuralBridge.vue';
import PremiumPreviewModal from '@/Components/PremiumPreviewModal.vue';

// PERSISTENT LAYOUT
defineOptions({
    layout: AuthenticatedLayout
});

const props = defineProps({
    habits: Object,
    currentMonth: String,
    monthQuery: String, 
    hasPrevHabits: Boolean, 
    prevMonthQuery: String,
    savedMood: String
});

const neuralOs = ref(null);

// 🔥 FIX UTAMA: Ekstrak SEMUA state dan action Batch dari useHabits
const {
    // Data Utama
    user, localHabits, todayDate, greetingKey, monthDates, todayProgress,
    totalCompletions, overallPercentage, changeMonth, getStatus, toggleStatus, handleGridNav,
    moodOptions, showMoodDropdown, currentMoodData, selectMood,
    
    // Modal Single Habit
    iconList, colorPalette, form,
    showCreateModal, isEditing, openCreateModal, editHabit, closeModal, submitHabit,
    
    // Modal Delete & Copy
    showDeleteModal, habitToDelete, confirmDelete, executeDelete, deleteFromEdit,
    showCopyModal, openCopyModal, executeCopy,
    
    // 🔥 Modal Batch Habit
    showBatchModal, batchForm, openBatchModal, closeBatchModal, 
    addBatchRow, removeBatchRow, submitBatchHabit, switchToBatch, switchToSingle, handleMouseDown, handleMouseEnter, isCellSelected, 
    saveHabitOrder,
    isExplorer, habitsCount
} = useHabits(props);

const isPreviewOpen = ref(false);
const activePreviewModule = ref('Habits');

const openPremiumPreview = (module = 'Habits') => {
    activePreviewModule.value = module;
    isPreviewOpen.value = true;
};

// Intercept Mood Selection for AI
const handleMoodSelect = async (mood) => {
    selectMood(mood);
    if (neuralOs.value) {
        neuralOs.value.getMoodAdvisory(mood);
    }
};

// Intercept Toggle for Audit
const handleToggleProxy = async (habitId, date, forceStatus) => {
    toggleStatus(habitId, date, forceStatus);
    
    // Disable Neural Audit popup on right-click (skipped) per user request
    // if (forceStatus === 'skipped' && neuralOs.value) {
    //     neuralOs.value.runAudit(habitId);
    // }
};

import { Sparkles, Activity, PieChart } from 'lucide-vue-next';
const habitPremiumFeatures = [
    {
        title: 'Habit Alchemy',
        desc: 'Sistem stacking otomatis untuk membangun momentum habit tanpa hambatan.',
        icon: Sparkles,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10'
    },
    {
        title: 'Neural friction Audit',
        desc: 'Audit cerdas untuk menemukan alasan kenapa Anda gagal di suatu habit.',
        icon: Activity,
        color: 'text-rose-500',
        bg: 'bg-rose-500/10'
    },
    {
        title: 'Atomic Analytics',
        desc: 'Heatmap & visualisasi data habit yang mendalam untuk progres jangka panjang.',
        icon: PieChart,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10'
    }
];
</script>

<template>
    <div class="min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
        <Head title="Habit Tracker" />

        <div class="space-y-6 pb-12"> 
            <HabitHeader
                :user="user"
                :greetingKey="greetingKey"
                :todayDate="todayDate"
                :currentMonth="props.currentMonth"
                :currentMonthValue="props.monthQuery" 
                :todayProgress="todayProgress"
                :changeMonth="changeMonth"
                :openCreateModal="openCreateModal"
                :isExplorer="isExplorer"
                :habitsCount="habitsCount"
            />

            <HabitGrid 
                :localHabits="localHabits"
                :monthDates="monthDates"
                :hasPrevHabits="hasPrevHabits"
                :toggleStatus="handleToggleProxy"
                :handleGridNav="handleGridNav"
                :getStatus="getStatus"
                :editHabit="editHabit"
                :confirmDelete="confirmDelete"
                :openCreateModal="openCreateModal"
                :openCopyModal="openCopyModal"
                :handleMouseDown="handleMouseDown"
                :handleMouseEnter="handleMouseEnter"
                :isCellSelected="isCellSelected"
                :saveHabitOrder="saveHabitOrder"
            />

            <div class="px-4 md:px-8">
                <NeuralBridge module="Habits" />
            </div>

            <HabitStats 
                :localHabits="localHabits"
                :overallPercentage="overallPercentage"
                :totalCompletions="totalCompletions"
                :currentMoodData="currentMoodData"
                :moodOptions="moodOptions"
                :savedMood="props.savedMood"
                :selectMood="handleMoodSelect"
            />

            <!-- NEW AI SECTION (Hidden for Explorer in main flow, teased in Wall) -->
            <NeuralHabitInsight v-if="!isExplorer" ref="neuralOs" :currentMood="savedMood" />

            <!-- 🧠 NEW: NEURAL CONSISTENCY SKELETAL UI (FOR EXPLORERS) -->
            <div v-if="isExplorer" @click="openPremiumPreview('Habits')" 
                 class="mx-4 md:mx-8 p-6 rounded-[2.5rem] bg-slate-900 border border-indigo-500/20 relative overflow-hidden group/habit-mastery cursor-pointer hover:scale-[1.01] transition-all duration-500 shadow-2xl">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-transparent"></div>
                
                <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                            <Activity :size="24" />
                        </div>
                        <div>
                             <h4 class="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">Neural Consistency Lab</h4>
                             <p class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Analyze your identity shifts with AI</p>
                        </div>
                    </div>

                    <!-- Skeletal Heatmap Grid -->
                    <div class="flex gap-1.5 blur-[1.5px] opacity-30 group-hover:opacity-60 transition-all">
                        <div v-for="i in 12" :key="i" class="w-3 h-3 rounded-[3px]" :class="i % 3 === 0 ? 'bg-indigo-500' : 'bg-slate-700'"></div>
                    </div>

                     <div class="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest">
                        Unlock Analytics <ArrowRight :size="14" />
                    </div>
                </div>
            </div>

            <HabitModals 
                :showDeleteModal="showDeleteModal"
                :showCopyModal="showCopyModal"
                :showCreateModal="showCreateModal"
                :isEditing="isEditing"
                :form="form"
                :habitToDelete="habitToDelete"
                :iconList="iconList"
                :colorPalette="colorPalette"
                :closeModal="closeModal"
                :submitHabit="submitHabit"
                :executeDelete="executeDelete"
                :executeCopy="executeCopy"
                :deleteFromEdit="deleteFromEdit"
                
                :showBatchModal="showBatchModal"
                :batchForm="batchForm"
                :closeBatchModal="closeBatchModal"
                :submitBatchHabit="submitBatchHabit"
                :addBatchRow="addBatchRow"
                :removeBatchRow="removeBatchRow"
                :switchToBatch="switchToBatch"
                :switchToSingle="switchToSingle"
                :isExplorer="isExplorer"
                :habitsCount="habitsCount"
            />

<!-- Removed LockedFeatureWall -->
        </div>

        <PremiumPreviewModal 
            :isOpen="isPreviewOpen"
            :module="activePreviewModule"
            @close="isPreviewOpen = false"
        />
    </div>
</template>

<style>
/* Style global scrollbar */
.custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

/* Menghilangkan scrollbar pada elemen tertentu jika perlu */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>