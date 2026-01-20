<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { usePlanner } from '@/Composables/Planner/usePlanner';

import PlannerHeader from './PlannerHeader.vue';
import PlannerSidebar from './PlannerSidebar.vue';
import PlannerTimeline from './PlannerTimeline.vue';
import PlannerModal from './PlannerModal.vue';
import SimpleModal from './SimpleModal.vue';

const props = defineProps({ 
    tasks: Array, 
    dailyLog: Object 
});

const {
    scheduledTasks, inboxTasks, timeSlots, 
    scheduledStats, inboxStats,
    form, isModalOpen, isEditing, activeModalType,
    openModal, submitTask, deleteTask, resetBoard, toggleComplete,
    onDragStart, onDrop, getTypeColor,
    localNotes, localMeals, conflictError
} = usePlanner(props);
</script>

<template>
    <Head title="Daily Planner" />

    <AuthenticatedLayout>
        <div class="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col font-sans h-auto md:h-[calc(100vh-80px)]">
            
            <PlannerHeader 
                :openModal="openModal" 
                :resetBoard="resetBoard"
                :stats="scheduledStats" 
                class="flex-shrink-0" 
            />

            <div class="flex flex-col md:flex-row gap-6 mt-4 h-auto md:flex-1 md:overflow-hidden">
                
                <PlannerSidebar 
                    :inboxTasks="inboxTasks"
                    :stats="inboxStats"
                    v-model:localNotes="localNotes"
                    v-model:localMeals="localMeals"
                    :onDragStart="onDragStart"
                    :openModal="openModal"
                    :toggleComplete="toggleComplete"
                    :getTypeColor="getTypeColor"
                    class="w-full md:w-[30%] flex-shrink-0"
                />

                <PlannerTimeline 
                    :timeSlots="timeSlots"
                    :scheduledTasks="scheduledTasks"
                    :onDrop="onDrop"
                    :onDragStart="onDragStart"
                    :openModal="openModal"
                    :toggleComplete="toggleComplete" 
                    :getTypeColor="getTypeColor"
                    class="w-full md:flex-1 min-h-[500px]"
                />

            </div>
        </div>

        <SimpleModal
            v-if="activeModalType === 'simple'"
            :show="isModalOpen"
            :form="form"
            :isEditing="isEditing"
            :close="() => isModalOpen = false"
            :submit="submitTask"
            :remove="deleteTask"
        />

        <PlannerModal 
            v-else
            :show="isModalOpen"
            :form="form"
            :isEditing="isEditing"
            :conflictError="conflictError"  :close="() => isModalOpen = false"
            :submit="submitTask"
            :remove="deleteTask"
        />

    </AuthenticatedLayout>
</template>