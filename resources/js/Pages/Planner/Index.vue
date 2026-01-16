<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { usePlanner } from '@/Composables/Planner/usePlanner';

// Import semua komponen anak
import PlannerHeader from './PlannerHeader.vue';
import PlannerSidebar from './PlannerSidebar.vue';
import PlannerTimeline from './PlannerTimeline.vue';
import PlannerModal from './PlannerModal.vue';
import SimpleModal from './SimpleModal.vue'; // 🔥 Import Modal Baru

const props = defineProps({ 
    tasks: Array, 
    dailyLog: Object 
});

// Panggil Logic Manajer
const {
    scheduledTasks, inboxTasks, timeSlots, stats,
    form, isModalOpen, isEditing, activeModalType, // 🔥 Ambil variable activeModalType
    openModal, submitTask, deleteTask, resetBoard, toggleComplete,
    onDragStart, onDrop, getTypeColor,
    localNotes, localMeals
} = usePlanner(props);
</script>

<template>
    <Head title="Daily Planner" />

    <AuthenticatedLayout>
        <div class="max-w-[1600px] mx-auto p-4 md:p-6 h-[calc(100vh-80px)] flex flex-col font-sans">
            
            <PlannerHeader 
                :openModal="openModal" 
                :resetBoard="resetBoard"
                :stats="stats"
                class="flex-shrink-0" 
            />

            <div class="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden mt-4">
                
                <PlannerSidebar 
                    :inboxTasks="inboxTasks"
                    :stats="stats"
                    v-model:localNotes="localNotes"
                    v-model:localMeals="localMeals"
                    :onDragStart="onDragStart"
                    :openModal="openModal"
                    :toggleComplete="toggleComplete"
                    :getTypeColor="getTypeColor"
                />

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
            :close="() => isModalOpen = false"
            :submit="submitTask"
            :remove="deleteTask"
        />

    </AuthenticatedLayout>
</template>