<script setup>
import { defineProps } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { useHabits } from '@/Composables/useHabits';

// ✅ PERBAIKAN IMPORT: Gunakan './' karena file ada di folder yang sama
import HabitHeader from './HabitHeader.vue';
import HabitGrid from './HabitGrid.vue';
import HabitStats from './HabitStats.vue';
import HabitModals from './HabitModals.vue';

// Props TETAP DISINI
const props = defineProps({
    habits: Object,
    currentMonth: String,
    monthQuery: String, 
    hasPrevHabits: Boolean, 
    prevMonthQuery: String,
    savedMood: String
});

// Panggil Logic dari Composable
const {
    user, localHabits, showCreateModal, isEditing, todayDate, greetingKey,
    iconList, colorPalette, form, monthDates, todayProgress,
    totalCompletions, overallPercentage, changeMonth, getStatus,
    toggleStatus, openCreateModal, editHabit, closeModal, submitHabit,
    showDeleteModal, habitToDelete, confirmDelete, executeDelete, deleteFromEdit,
    showCopyModal, openCopyModal, executeCopy, handleGridNav,
    moodOptions, showMoodDropdown, currentMoodData, selectMood
} = useHabits(props);
</script>

<template>
    <Head title="Habit Tracker" />

    <AuthenticatedLayout>
        
        <HabitHeader
            :user="user"
            :greetingKey="greetingKey"
            :todayDate="todayDate"
            :currentMonth="props.currentMonth"
            :todayProgress="todayProgress"
            :changeMonth="changeMonth"
            :openCreateModal="openCreateModal"
        />

        <HabitGrid 
            :localHabits="localHabits"
            :monthDates="monthDates"
            :hasPrevHabits="props.hasPrevHabits"
            :toggleStatus="toggleStatus"
            :handleGridNav="handleGridNav"
            :getStatus="getStatus"
            :editHabit="editHabit"
            :confirmDelete="confirmDelete"
            :openCreateModal="openCreateModal"
            :openCopyModal="openCopyModal"
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
        />

    </AuthenticatedLayout>
</template>

<style>
/* Style global buat scrollbar di semua komponen anak */
.custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>