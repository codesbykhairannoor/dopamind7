<script setup>
import { ref, onMounted } from 'vue';
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
import PlannerMobileTimeline from './PlannerMobileTimeline.vue';
import PlannerModal from './PlannerModal.vue';
import PlannerBatchModal from './PlannerBatchModal.vue';
import NeuralBridge from '@/Components/NeuralBridge.vue';
import { useGating } from '@/Composables/useGating';
import { router } from '@inertiajs/vue3';

// 🔥 TERIMA currentDate DARI CONTROLLER
const props = defineProps({ 
    tasks: Array, 
    dailyLog: Object,
    currentDate: String 
});

defineOptions({ layout: AuthenticatedLayout });

// 🔥 INIT CALENDAR LOGIC
const { currentDate, formattedDate, changeDate, changeDay } = usePlannerCalendar(props.currentDate);

// Init Gating
const { isExplorer, demandAccess } = useGating();

// Logic Single (Kirim props ke usePlanner)
const {
    localTasks,
    scheduledTasks, timeSlots, scheduledStats,
    form, isModalOpen, isEditing, conflictError,
    openModal, submitTask, deleteTask, resetBoard, toggleComplete,
    onDragStart, onDrop, getTypeColor, localNotes, localMeals, localWater, localTaskBox
} = usePlanner(props);

// Logic Batch
const {
    isBatchModalOpen, batchForm, openBatchModal,
    addBatchRow, removeBatchRow, submitBatch
} = usePlannerBatch(currentDate, localTasks);


const switchToBatch = () => { 
    if (demandAccess('planner_batch')) {
        isModalOpen.value = false; 
        openBatchModal(); 
    }
};
const switchToSingle = () => { isBatchModalOpen.value = false; openModal(); };

const handleFullReset = () => {
    resetBoard(); 
    window.dispatchEvent(new Event('reset-local-storage'));
};

const isMobile = ref(false);
onMounted(() => {
    isMobile.value = window.innerWidth < 1024;
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 1024;
    });
});
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
            :isExplorer="isExplorer"
        />

        <div class="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-500">
            
            <div v-if="!isMobile" class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                
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

            <div v-else class="space-y-12 pb-40 px-2">
                 <NeuralBridge id="mobile-planner-neural" module="Planner" />
                 <div id="mobile-wide-timeline" class="w-full overflow-hidden">
                    <div class="flex items-center justify-between px-2 mb-4">
                        <h3 class="text-xs font-black uppercase tracking-widest text-slate-400">Flow Timeline</h3>
                    </div>
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

                 <div id="mobile-daily-overview" class="space-y-6 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <div class="px-2">
                        <h3 class="text-xs font-black uppercase tracking-widest text-slate-400">Daily Overview</h3>
                    </div>
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