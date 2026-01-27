<script setup>
// 1. Hapus import 'defineProps' (tidak perlu di-import manual di <script setup>)
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'; // Import Layout
import { useHabits } from '@/Composables/useHabits';

// Component Anak
import HabitHeader from './HabitHeader.vue';
import HabitGrid from './HabitGrid.vue';
import HabitStats from './HabitStats.vue';
import HabitModals from './HabitModals.vue';

// 🔥 RAHASIA 1: PERSISTENT LAYOUT
// Ini memberitahu Vue: "Jangan hancurkan Layout ini saat pindah halaman, update slot-nya saja."
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
    <Head title="Habit Tracker" />

    <div class="space-y-6 pb-12"> <HabitHeader
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
        
    </div>
</template>

<style>
/* Style global scrollbar tetap aman disini */
.custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>