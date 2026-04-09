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
import LockedFeatureWall from '@/Components/LockedFeatureWall.vue';
import PremiumPreviewModal from '@/Components/PremiumPreviewModal.vue';
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
    addMilestone, saveMilestone, toggleMilestone, deleteMilestone,
    isExplorer
} = useGoals(props);

import { Image, Layers, Sparkles } from 'lucide-vue-next';
const goalPremiumFeatures = [
    {
        title: 'Vision Board Covers',
        desc: 'Unggah gambar kustom untuk memvisualisasikan manifestasi goal Anda secara nyata.',
        icon: Image,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10'
    },
    {
        title: 'Advanced Milestones',
        desc: 'Breakdown goal besar Anda menjadi puluhan langkah mikro untuk eksekusi presisi.',
        icon: Layers,
        color: 'text-orange-500',
        bg: 'bg-orange-500/10'
    },
    {
        title: 'AI Goal Strategist',
        desc: 'Dapatkan strategi pemecahan masalah otomatis dari Neural OS saat goal Anda terhambat.',
        icon: Sparkles,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10'
    }
];

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

const isPreviewOpen = ref(false);
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

            <!-- 📱 MOBILE VIEW: PREMIUM VISION ROADMAP -->
            <template v-else>
                <div class="space-y-12 pb-32">
                    <div v-for="goal in localGoals" :key="goal.id" :id="'mobile-goal-card-' + goal.id"
                        class="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden group active:scale-[0.98] transition-all duration-500"
                    >
                        <!-- Premium Mobile Goal Header (Visual First) -->
                        <div class="relative h-40 overflow-hidden">
                            <template v-if="goal.cover_image_url">
                                <img :src="goal.cover_image_url" class="w-full h-full object-cover" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            </template>
                            <div v-else class="w-full h-full flex items-center justify-center relative" 
                                 :style="{ background: `radial-gradient(at 0% 0%, ${goal.color || '#6366f1'}33 0px, transparent 50%), radial-gradient(at 100% 100%, ${goal.color || '#6366f1'}33 0px, transparent 50%), ${goal.color || '#6366f1'}05` }">
                                <div class="absolute inset-0 backdrop-blur-[2px]"></div>
                                <div class="relative z-10 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl">
                                    <Target :size="28" stroke-width="2.5" :style="{ color: goal.color || '#6366f1' }" />
                                </div>
                            </div>

                            <div class="absolute inset-x-6 bottom-5">
                                <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-white/10 text-white border border-white/20 backdrop-blur-md mb-2 inline-block">
                                    {{ goal.priority || 'Important' }}
                                </span>
                                <h3 class="text-xl font-black text-white truncate drop-shadow-md">{{ goal.title }}</h3>
                            </div>

                            <button @click="openEditModal(goal)" class="absolute top-5 right-5 w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
                                <Edit3 :size="16" />
                            </button>
                        </div>

                        <!-- Progress & Roadmap -->
                        <div class="p-6 space-y-6">
                            <div class="flex items-center justify-between px-1">
                                <div class="flex flex-col">
                                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ $t('goal_manifestation', 'Manifestation') }}</span>
                                    <span class="text-xs font-black text-slate-800 dark:text-white tabular-nums">{{ goal.progress || 0 }}% Complete</span>
                                </div>
                                <div class="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div class="h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.2)]" :style="{ width: (goal.progress || 0) + '%', backgroundColor: goal.color || '#6366f1' }"></div>
                                </div>
                            </div>

                            <!-- Mobile Roadmap Timeline -->
                            <div class="space-y-4 relative pl-2">
                                <div class="absolute left-[13px] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800 pointer-events-none"></div>
                                
                                <div v-for="(m, idx) in goal.milestones" :key="m.id" 
                                    class="relative flex items-center gap-4 group/ms"
                                    :class="m.is_completed ? 'opacity-40' : ''"
                                >
                                    <button @click="toggleMilestone(goal, m)" 
                                        class="w-7 h-7 rounded-full border-2 z-10 shrink-0 flex items-center justify-center transition-all bg-white dark:bg-slate-900 shadow-sm"
                                        :class="m.is_completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-100 dark:border-slate-800'"
                                    >
                                        <CheckCircle2 v-if="m.is_completed" :size="14" stroke-width="3" />
                                        <div v-else class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: goal.color || '#6366f1' }"></div>
                                    </button>
                                    
                                    <p class="text-xs font-black text-slate-700 dark:text-slate-200 flex-1 min-w-0" :class="m.is_completed ? 'line-through' : ''">
                                        {{ m.title }}
                                    </p>
                                </div>
                                
                                <div v-if="!goal.milestones?.length" class="py-4 text-center">
                                    <p class="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">{{ $t('goal_no_steps', 'No mastery steps') }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Mobile Footer Action (Reward) -->
                        <div v-if="goal.reward" class="bg-amber-50/30 dark:bg-amber-500/5 px-6 py-4 border-t border-amber-100/50 dark:border-amber-900/20 flex items-center gap-3">
                             <Award :size="14" class="text-amber-500" />
                             <p class="text-[9px] font-black text-amber-600/80 uppercase tracking-widest truncate">Reward: {{ goal.reward }}</p>
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

            <LockedFeatureWall 
                :isExplorer="isExplorer"
                title="Complete Your Vision"
                description="Unlock the full potential of your goal-setting system with Architect features."
                :features="goalPremiumFeatures"
                @show-preview="isPreviewOpen = true"
            />
        </div>

        <PremiumPreviewModal 
            :isOpen="isPreviewOpen"
            module="Goal"
            @close="isPreviewOpen = false"
        />
    </div>
</template>
