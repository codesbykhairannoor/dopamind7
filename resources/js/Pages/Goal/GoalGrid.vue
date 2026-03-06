<script setup>
import GoalCard from './GoalCard.vue';

const props = defineProps({
    goals: Array,
    selectedGoals: Array,
    onToggleSelection: Function,
    onAutoSave: Function,
    onDelete: Function,
    onAddMilestone: Function,
    onSaveMilestone: Function,
    onToggleMilestone: Function,
    onDeleteMilestone: Function
});
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <GoalCard 
            v-for="goal in goals" 
            :key="goal._key"
            :goal="goal"
            :selected="selectedGoals.includes(goal.id)"
            :onToggleSelection="onToggleSelection"
            :onAutoSave="onAutoSave"
            :onDelete="onDelete"
            :onAddMilestone="onAddMilestone"
            :onSaveMilestone="onSaveMilestone"
            :onToggleMilestone="onToggleMilestone"
            :onDeleteMilestone="onDeleteMilestone"
        />

        <!-- Empty State in Grid -->
        <div v-if="goals.length === 0" class="col-span-full py-20 bg-white/50 border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-4">
            <div class="text-6xl">🚀</div>
            <div class="space-y-1">
                <h3 class="text-xl font-black text-slate-800">{{ $t('goal_empty_title', 'Belum ada target!') }}</h3>
                <p class="text-sm font-medium text-slate-400">{{ $t('goal_empty_desc', 'Mulai buat proyek perubahan lu sekarang.') }}</p>
            </div>
        </div>
    </div>
</template>
