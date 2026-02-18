<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { usePlanner } from '@/Composables/Planner/usePlanner';
import { usePlannerBatch } from '@/Composables/Planner/usePlannerBatch';

// Components
import PlannerHeader from './PlannerHeader.vue';
import PlannerSidebar from './PlannerSidebar.vue';
import PlannerTimeline from './PlannerTimeline.vue';
import PlannerModal from './PlannerModal.vue';
import PlannerBatchModal from './PlannerBatchModal.vue';

const props = defineProps({ tasks: Array, dailyLog: Object });
defineOptions({ layout: AuthenticatedLayout });
// Logic Single
const {
    scheduledTasks, timeSlots, scheduledStats,
    form, isModalOpen, isEditing,
    openModal, submitTask, deleteTask, resetBoard, toggleComplete,
    onDragStart, onDrop, getTypeColor, localNotes, localMeals, conflictError
} = usePlanner(props);

// Logic Batch
const {
    isBatchModalOpen, batchForm, openBatchModal,
    addBatchRow, removeBatchRow, submitBatch
} = usePlannerBatch();

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

        <PlannerHeader 
            :openModal="() => openModal(null, null, 'full')" 
            :resetBoard="handleFullReset"
            :stats="scheduledStats" 
        />

        <div class="w-full min-h-screen bg-slate-50/50 px-4 sm:px-6 lg:px-8 py-8">
            
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
                    <PlannerSidebar 
                        :stats="scheduledStats"
                        v-model:localNotes="localNotes"
                        v-model:localMeals="localMeals"
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
</template>