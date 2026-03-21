<script setup>
import { Head, usePage } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useGoals } from '@/Composables/Goal/useGoals';
import GoalStats from './GoalStats.vue';
import GoalCard from './GoalCard.vue';
import GoalModal from './GoalModal.vue';
import GoalHeader from './GoalHeader.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import { computed } from 'vue';

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
    isModalOpen, editingGoal, isSaving, errors,
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
    <div class="goal-tracker-page min-h-screen bg-slate-50/50">
        <Head :title="$t('goal_page_title', 'Goal Tracker')" />

        <GoalHeader :onAddClick="openCreateModal" />

        <div class="w-full lg:max-w-[96%] mx-auto p-4 md:p-6 lg:p-8 space-y-8 pb-24">
            <!-- Global Stats Section -->
            <GoalStats :stats="localStats" :goals="localGoals" />

            <!-- Goals Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <div v-for="goal in localGoals" :key="goal._key">
                    <GoalCard
                        :goal="goal"
                        :onEdit="openEditModal"
                        :onDelete="deleteGoal"
                        :onAddMilestone="addMilestone"
                        :onSaveMilestone="saveMilestone"
                        :onToggleMilestone="toggleMilestone"
                        :onDeleteMilestone="deleteMilestone"
                    />
                </div>
            </div>

            <!-- Goal Modal -->
            <GoalModal
                :show="isModalOpen"
                :goal="editingGoal"
                :processing="isSaving"
                :errors="errors"
                @close="closeModal"
                @save="saveGoal"
                :onUploadImage="uploadCoverImage"
            />
        </div>
    </div>
</template>
