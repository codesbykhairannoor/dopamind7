<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { usePlanner } from '@/Composables/Planner/usePlanner';
import { usePlannerBatch } from '@/Composables/Planner/usePlannerBatch'; // 👈 Import Baru

// Components
import PlannerHeader from './PlannerHeader.vue';
import PlannerSidebar from './PlannerSidebar.vue';
import PlannerTimeline from './PlannerTimeline.vue';
import PlannerModal from './PlannerModal.vue';
import SimpleModal from './SimpleModal.vue';
import PlannerBatchModal from './PlannerBatchModal.vue'; // 👈 Import Baru

const props = defineProps({ tasks: Array, dailyLog: Object });

// Logic Single (Existing)
const {
    scheduledTasks, inboxTasks, timeSlots, scheduledStats, inboxStats,
    form, isModalOpen, isEditing, activeModalType,
    openModal, submitTask, deleteTask, resetBoard, toggleComplete,
    onDragStart, onDrop, getTypeColor, localNotes, localMeals, conflictError
} = usePlanner(props);

// Logic Batch (Baru)
const {
    isBatchModalOpen, batchForm, openBatchModal,
    addBatchRow, removeBatchRow, submitBatch
} = usePlannerBatch();

// Helper Switcher antar Modal
const switchToBatch = () => {
    isModalOpen.value = false;
    openBatchModal();
};

const switchToSingle = () => {
    isBatchModalOpen.value = false;
    openModal();
};
</script>

<template>
    <Head title="Daily Planner" />

    <AuthenticatedLayout>
        <div class="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PlannerHeader 
                    :openModal="openModal" 
                    :resetBoard="resetBoard"
                    :stats="scheduledStats" 
                />
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                <div class="lg:col-span-1">
                    <PlannerSidebar 
                        :inboxTasks="inboxTasks"
                        :stats="inboxStats"
                        v-model:localNotes="localNotes"
                        v-model:localMeals="localMeals"
                        :onDragStart="onDragStart"
                        :openModal="openModal"
                        :toggleComplete="toggleComplete"
                        :getTypeColor="getTypeColor"
                    />
                </div>

                <div class="lg:col-span-2">
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

            </div>
        </div>

        <SimpleModal 
            v-if="activeModalType === 'simple'" 
            :show="isModalOpen" :form="form" :isEditing="isEditing" 
            :close="() => isModalOpen = false" :submit="submitTask" :remove="deleteTask" 
        />
    
        <PlannerModal 
            v-else
            :show="isModalOpen" :form="form" :isEditing="isEditing" :conflictError="conflictError" 
            :close="() => isModalOpen = false" :submit="submitTask" :remove="deleteTask"
            @switch-to-batch="switchToBatch" 
        />

        <PlannerBatchModal 
            :show="isBatchModalOpen" 
            :form="batchForm" 
            :close="() => isBatchModalOpen = false" 
            :submit="submitBatch" 
            :addRow="addBatchRow" 
            :removeRow="removeBatchRow"
            :switchToSingle="switchToSingle"
        />

    </AuthenticatedLayout>
</template>