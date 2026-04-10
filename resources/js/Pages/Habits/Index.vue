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