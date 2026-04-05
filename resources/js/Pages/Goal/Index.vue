<script setup>
import { ref, onMounted, computed } from 'vue';
import { Head, usePage } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useGoals } from '@/Composables/Goal/useGoals';
import GoalStats from './GoalStats.vue';
import GoalCard from './GoalCard.vue';
import GoalModal from './GoalModal.vue';
import GoalHeader from './GoalHeader.vue';
import NeuralBridge from '@/Components/NeuralBridge.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import { Tag, Target, ChevronRight, CheckCircle2, Zap } from 'lucide-vue-next';

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

const isMobile = ref(false);
onMounted(() => {
    isMobile.value = window.innerWidth < 1024;
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 1024;
    });
});
</script>

<template>
    <div class="goal-tracker-page min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
        <Head :title="$t('goal_page_title', 'Goal Tracker')" />

        <GoalHeader :onAddClick="openCreateModal" />

        <div class="w-full lg:max-w-[96%] mx-auto p-4 md:p-6 lg:p-8 space-y-8 pb-24">
            <NeuralBridge module="Goal" />

            <!-- 🖥️ DESKTOP VIEW -->
            <template v-if="!isMobile">
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
            </template>

            <!-- 📱 MOBILE VIEW (Milestone Roadmap) -->
            <template v-else>
                <div class="space-y-6">
                    <div v-for="goal in localGoals" :key="goal.id" 
                        class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden"
                    >
                        <!-- Mobile Compact Goal Header -->
                        <div class="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between gap-4">
                            <div class="flex items-center gap-4 min-w-0">
                                <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" :style="{ backgroundColor: (goal.color || '#6366f1') + '20' }">
                                    <Target :size="24" :style="{ color: goal.color || '#6366f1' }" />
                                </div>
                                <div class="truncate">
                                    <h3 class="text-base font-black text-slate-800 dark:text-white truncate">{{ goal.title }}</h3>
                                    <div class="flex items-center gap-2 mt-0.5">
                                        <div class="h-1 w-20 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div class="h-full rounded-full transition-all duration-1000" :style="{ width: goal.progress + '%', backgroundColor: goal.color || '#6366f1' }"></div>
                                        </div>
                                        <span class="text-[9px] font-black text-slate-400 tabular-nums">{{ goal.progress || 0 }}%</span>
                                    </div>
                                </div>
                            </div>
                            <button @click="openEditModal(goal)" class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 active:scale-90 transition-all">
                                <ChevronRight :size="20" />
                            </button>
                        </div>

                        <!-- Mobile Roadmap (Milestones) -->
                        <div class="px-6 py-4 space-y-4 relative">
                            <div class="absolute left-[39px] top-8 bottom-8 w-[2px] bg-slate-100 dark:bg-slate-800 pointer-events-none"></div>
                            
                            <div v-for="(m, idx) in goal.milestones" :key="m.id" 
                                class="relative flex items-start gap-4 transition-all"
                                :class="m.is_completed ? 'opacity-50' : ''"
                            >
                                <button @click="toggleMilestone(goal, m)" 
                                    class="w-8 h-8 rounded-full border-2 z-10 shrink-0 flex items-center justify-center transition-all bg-white dark:bg-slate-900 shadow-sm"
                                    :class="m.is_completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-100 dark:border-slate-700'"
                                >
                                    <CheckCircle2 v-if="m.is_completed" :size="16" stroke-width="3" />
                                    <div v-else class="w-2 h-2 rounded-full" :style="{ backgroundColor: goal.color || '#6366f1' }"></div>
                                </button>
                                
                                <div class="pt-1 flex-1 min-w-0">
                                    <p class="text-xs font-black text-slate-700 dark:text-slate-200 leading-tight" :class="m.is_completed ? 'line-through' : ''">
                                        {{ m.title }}
                                    </p>
                                    <p v-if="m.notes" class="text-[10px] font-medium text-slate-400 mt-1 truncate">{{ m.notes }}</p>
                                </div>
                            </div>
                            
                            <div v-if="!goal.milestones?.length" class="py-6 text-center italic text-[10px] font-bold text-slate-300">
                                No milestones defined yet.
                            </div>
                        </div>

                        <!-- Focus Action -->
                        <div v-if="goal.reward && !goal.is_completed" class="bg-amber-50/50 dark:bg-amber-500/5 px-6 py-4 border-t border-amber-100/50 dark:border-amber-900/20 flex items-center gap-3">
                             <Zap :size="14" class="text-amber-500" />
                             <p class="text-[10px] font-black text-amber-600/80 truncate">Reward: {{ goal.reward }}</p>
                        </div>
                    </div>
                </div>
            </template>

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

            <!-- Mobile Sticky Floating Action Button (FAB) -->
            <button 
                @click="openCreateModal"
                class="fixed bottom-24 right-6 w-16 h-16 bg-indigo-600 dark:bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-[0_20px_50px_rgba(79,70,229,0.4)] dark:shadow-[0_20px_50px_rgba(79,70,229,0.2)] md:hidden z-[100] active:scale-90 transition-all duration-300 border border-white/20"
            >
                <Target :size="28" stroke-width="2.5" />
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full animate-ping"></span>
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full"></span>
            </button>
        </div>
    </div>
</template>
