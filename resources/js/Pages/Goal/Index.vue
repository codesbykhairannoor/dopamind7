<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useGoals } from '@/Composables/Goal/useGoals';
import GoalGrid from './GoalGrid.vue';
import GoalStats from './GoalStats.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    goals: Array,
    stats: Object,
    filters: Object,
    pagination: Object,
    // Add standard Inertia props to avoid Vue warnings about extraneous attributes
    auth: Object,
    errors: Object,
    flash: Object,
    app_config: Object,
    locale: String
});

defineOptions({ layout: AuthenticatedLayout });

const {
    localGoals, selectedGoals, localStats,
    addEmptyRow, autoSaveRow, deleteGoal,
    toggleSelection, selectAll, bulkDelete,
    addMilestone, saveMilestone, toggleMilestone, deleteMilestone
} = useGoals(props);

const todayDate = computed(() => {
    const locale = usePage().props.locale || 'id';
    return dayjs().locale(locale).format('dddd, D MMMM YYYY');
});
</script>

<template>
    <div class="goal-tracker-page">
        <Head :title="$t('goal_page_title', 'Goal Tracker')" />

        <div class="min-h-screen bg-[#f8fafc] pb-24">
            <!-- STICKY HEADER -->
            <div class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
                <div class="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 flex items-center justify-center text-white bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 shrink-0">
                                <OneForMindIcon name="goal" size="28" />
                            </div>
                            <div>
                                <h1 class="text-xl font-black leading-tight tracking-tight text-slate-800 flex items-center gap-2">
                                    {{ $t('goal_page_title', 'Goal Tracker') }}
                                    <span v-if="pagination?.total" class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                        {{ pagination.total }}
                                    </span>
                                </h1>
                                <p class="mt-0.5 text-xs font-bold uppercase tracking-wider text-slate-400">{{ todayDate }}</p>
                            </div>
                        </div>
                        
                        <button @click="addEmptyRow"
                            class="ml-auto bg-indigo-600 text-white font-bold py-3 px-8 rounded-[1.5rem] shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-[0.98] transition-all flex items-center gap-2 shrink-0">
                            <OneForMindIcon name="plus" size="18" stroke-width="3" /> {{ $t('goal_add_row') }}
                        </button>
                    </div>
                </div>
            </div>

            <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
                <GoalStats v-if="localStats" :stats="localStats" />

                <!-- BULK ACTIONS -->
                <transition enter-active-class="duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4" leave-active-class="duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0 -translate-y-4">
                    <div v-if="selectedGoals.length > 0" class="mb-8 bg-slate-900 text-white rounded-[2.5rem] p-4 shadow-2xl flex items-center justify-between sticky top-24 z-30">
                        <div class="flex items-center gap-4 ml-4">
                            <span class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-black text-sm text-white shadow-lg shadow-indigo-500/20">{{ selectedGoals.length }}</span>
                            <span class="font-black text-sm uppercase tracking-wider">{{ $t('goal_bulk_selected') }}</span>
                        </div>
                        <div class="flex items-center gap-3 pr-2">
                            <button @click="bulkDelete" class="px-8 py-3 bg-rose-500 hover:bg-rose-400 active:scale-95 text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-rose-500/20">
                                <OneForMindIcon name="trash" size="16" /> {{ $t('goal_bulk_delete') }}
                            </button>
                            <button @click="selectAll" class="p-3 text-slate-400 hover:text-white transition-colors" title="Batal Pilih Semua">
                                <OneForMindIcon name="x" size="24" stroke-width="2.5" />
                            </button>
                        </div>
                    </div>
                </transition>

                <!-- GRID OF PROJECTS -->
                <GoalGrid
                    :goals="localGoals"
                    :selected-goals="selectedGoals"
                    :on-toggle-selection="toggleSelection"
                    :on-auto-save="autoSaveRow"
                    :on-delete="deleteGoal"
                    :on-add-milestone="addMilestone"
                    :on-save-milestone="saveMilestone"
                    :on-toggle-milestone="toggleMilestone"
                    :on-delete-milestone="deleteMilestone"
                />
                
                <div class="mt-12 flex items-center justify-start">
                    <p class="text-[0.7rem] text-slate-400 font-black uppercase tracking-[0.2em] flex items-center gap-3 bg-white px-8 py-4 rounded-full border-2 border-slate-50 shadow-sm shadow-slate-200/50">
                        <OneForMindIcon name="goal" size="20" class="text-indigo-500" /> {{ $t('goal_tips', 'SET TARGET LU & SELESAIKAN LANGKAH DEMI LANGKAH.') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
