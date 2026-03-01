<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useHabits } from '@/Composables/useHabits';

// Component Anak
import HabitHeader from './HabitHeader.vue';
import HabitGrid from './HabitGrid.vue';
import HabitStats from './HabitStats.vue';
import HabitModals from './HabitModals.vue';

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
    
    // 🔥 Modal Batch Habit (INI YANG KEMARIN KELUPAAN DIAMBIL)
    showBatchModal, batchForm, openBatchModal, closeBatchModal, 
    addBatchRow, removeBatchRow, submitBatchHabit, switchToBatch, switchToSingle, handleMouseDown, handleMouseEnter, isCellSelected, 
    saveHabitOrder
} = useHabits(props);

</script>

<template>
    <div class="min-h-screen bg-slate-50/50">
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
            />

           <HabitGrid 
    :localHabits="localHabits"
    :monthDates="monthDates"
    :hasPrevHabits="hasPrevHabits"
    :toggleStatus="toggleStatus"
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

            <HabitStats 
                :localHabits="localHabits"
                :overallPercentage="overallPercentage"
                :totalCompletions="totalCompletions"
                :currentMoodData="currentMoodData"
                :moodOptions="moodOptions"
                :savedMood="props.savedMood"
                :selectMood="selectMood"
            />

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
            />
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