<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { usePlanner } from '@/Composables/Planner/usePlanner';
import { usePlannerBatch } from '@/Composables/Planner/usePlannerBatch';
import { usePlannerCalendar } from '@/Composables/Planner/usePlannerCalendar'; 
import EmptyState from '@/Components/EmptyState.vue';

// Components
import PlannerHeader from './PlannerHeader.vue';
import PlannerSidebar from './PlannerSidebar.vue';
import PlannerTimeline from './PlannerTimeline.vue';
import PlannerModal from './PlannerModal.vue';
import PlannerBatchModal from './PlannerBatchModal.vue';
import NeuralBridge from '@/Components/NeuralBridge.vue';

// 🔥 TERIMA currentDate DARI CONTROLLER
const props = defineProps({ 
    tasks: Array, 
    dailyLog: Object,
    currentDate: String 
});

defineOptions({ layout: AuthenticatedLayout });

// 🔥 INIT CALENDAR LOGIC
const { currentDate, formattedDate, changeDate, changeDay } = usePlannerCalendar(props.currentDate);

// Logic Single (Kirim props ke usePlanner)
const {
    localTasks, // 🔥 FIX 1: Keluarkan localTasks dari sini
    scheduledTasks, timeSlots, scheduledStats,
    form, isModalOpen, isEditing, conflictError, // pastikan conflictError juga diekstrak
    openModal, submitTask, deleteTask, resetBoard, toggleComplete,
    onDragStart, onDrop, getTypeColor, localNotes, localMeals, localWater, localTaskBox
} = usePlanner(props);

// Logic Batch (Kirim ref currentDate dan localTasks agar Optimistic UI jalan!)
const {
    isBatchModalOpen, batchForm, openBatchModal,
    addBatchRow, removeBatchRow, submitBatch
} = usePlannerBatch(currentDate, localTasks); // 🔥 FIX 2: Masukkan localTasks sebagai parameter kedua!

const switchToBatch = () => { isModalOpen.value = false; openBatchModal(); };
const switchToSingle = () => { isBatchModalOpen.value = false; openModal(); };

// Fungsi Reset
const handleFullReset = () => {
    resetBoard(); 
    window.dispatchEvent(new Event('reset-local-storage'));
};
</script>

<template>
    <Head title="Daily Planner" />

    <div>
        <PlannerHeader
            :currentDate="currentDate"
            :formattedDate="formattedDate"
            :tasks="tasks"
            @change-date="changeDate"
            @change-day="changeDay"
            :openModal="() => openModal(null, null, 'full')"
            :resetBoard="handleFullReset"
            :stats="scheduledStats"
        />

        <div class="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-500">
            
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                
                <div class="lg:col-span-3 order-1 lg:order-2 w-full">
                    <PlannerTimeline 
                        :timeSlots="timeSlots"
                        :scheduledTasks="scheduledTasks"
                        :onDrop="onDrop"
                        :onDragStart="onDragStart"
                        :openModal="openModal"
                        :toggleComplete="toggleComplete" 
                        :getTypeColor="getTypeColor"
                    />
                </div>

                <div class="lg:col-span-2 order-2 lg:order-1 w-full space-y-6 md:sticky md:top-24">
                    <NeuralBridge module="Planner" />
                    <PlannerSidebar 
                        :stats="scheduledStats"
                        v-model:localNotes="localNotes"
    v-model:localMeals="localMeals"
    v-model:localWater="localWater"
    v-model:localTaskBox="localTaskBox"
/>
                </div>

            </div>
        </div>

        <PlannerModal
            :show="isModalOpen" :form="form" :isEditing="isEditing" :conflictError="conflictError"
            :close="() => isModalOpen = false" :submit="submitTask" :remove="deleteTask"
            @switch-to-batch="switchToBatch"
        />

        <PlannerBatchModal
            :show="isBatchModalOpen"
            :form="batchForm"
            :conflictError="conflictError"
            :close="() => isBatchModalOpen = false"
            :submit="submitBatch"
            :addRow="addBatchRow"
            :removeRow="removeBatchRow"
            :switchToSingle="switchToSingle"
        />
    </div>
</template>