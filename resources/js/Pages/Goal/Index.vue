<script setup>
import { Head, usePage } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useGoals } from '@/Composables/Goal/useGoals';
import GoalGrid from './GoalGrid.vue';
import GoalStats from './GoalStats.vue';
import GoalCard from './GoalCard.vue';
import GoalModal from './GoalModal.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import { computed } from 'vue';
import { Target, Plus } from 'lucide-vue-next';

const props = defineProps({
    goals: Array,
    stats: Object,
    filters: Object,
    pagination: Object,
    auth: Object,
    errors: Object,
    flash: Object,
    app_config: Object,
    locale: String
});

defineOptions({ layout: AuthenticatedLayout });

const {
    localGoals, localStats,
    isModalOpen, editingGoal,
    openCreateModal, openEditModal, closeModal, saveGoal,
    uploadCoverImage, deleteGoal,
    addMilestone, saveMilestone, toggleMilestone, deleteMilestone
} = useGoals(props);

const todayDate = computed(() => {
    const locale = usePage().props.locale || 'id';
    return dayjs().locale(locale).format('dddd, D MMMM YYYY');
});
</script>

<template>
    <div class="goal-tracker-page w-full lg:max-w-[96%] mx-auto p-4 md:p-6 lg:p-8 space-y-8 pb-24">
        <Head :title="$t('goal_page_title', 'Goal Tracker')" />

        <!-- Header Section -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div class="flex items-center gap-5">
                <div class="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-indigo-600/30">
                    <Target :size="32" stroke-width="2.5" />
                </div>
                <div>
                    <h1 class="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">{{ $t('goal_title', 'Goal Tracker') }}</h1>
                    <p class="text-slate-500 font-bold mt-1">{{ $t('goal_subtitle', 'Manifest your future, one milestone at a time.') }}</p>
                </div>
            </div>

            <div class="flex items-center gap-3 w-full md:w-auto">
                <button @click="openCreateModal" class="flex-1 md:flex-none bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                    <Plus :size="18" stroke-width="3" />
                    {{ $t('goal_btn_add', 'Set New Goal') }}
                </button>
            </div>
        </div>

        <!-- Global Stats Section -->
        <GoalStats :stats="localStats" />

        <!-- Goals Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div v-for="goal in localGoals" :key="goal._key">
                <GoalCard
                    :goal="goal"
                    @edit="openEditModal(goal)"
                    @delete="deleteGoal(goal.id)"
                    @add-milestone="addMilestone(goal)"
                    @save-milestone="(m) => saveMilestone(goal, m)"
                    @toggle-milestone="(m) => toggleMilestone(goal, m)"
                    @delete-milestone="(mId) => deleteMilestone(goal, mId)"
                />
            </div>
        </div>

        <!-- Goal Modal -->
        <GoalModal
            :show="isModalOpen"
            :goal="editingGoal"
            @close="closeModal"
            @save="saveGoal"
            :onUploadImage="uploadCoverImage"
        />
    </div>
</template>
