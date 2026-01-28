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

// Panggil Logic Composable
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