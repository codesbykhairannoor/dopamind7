<script setup>
import { Head, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useJobs } from '@/Composables/Job/useJobs';
import JobTable from './JobTable.vue';
import JobStats from './JobStats.vue';
import JobFilterBar from './JobFilterBar.vue';
import ResumeAiModal from './ResumeAiModal.vue';
import MasterCvModal from './MasterCvModal.vue';
import NeuralBridge from '@/Components/NeuralBridge.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { ref, computed, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useGating } from '@/Composables/useGating';
const { isExplorer, isArchitect, isQuantum, canUse } = useGating();

const props = defineProps({
    jobs:         Array,
    stats:        Object,
    filters:      Object,
    uniqueTitles: Array,
    pagination:   Object,
});

defineOptions({ layout: AuthenticatedLayout });

const {
    localJobs, localStats,
    addEmptyRow, autoSaveRow, deleteJob,
} = useJobs(props);

const todayDate = computed(() => {
    const locale = usePage().props.locale || 'id';
    return dayjs().locale(locale).format('dddd, D MMMM YYYY');
});

const isAiModalOpen = ref(false);
const activeJobForScan = ref(null);
const isMasterModalOpen = ref(false);

const user = computed(() => usePage().props.auth.user);
const hasMasterCv = computed(() => !!user.value.resume_text);

const handleOpenScan = (job) => {
    activeJobForScan.value = job;
    isAiModalOpen.value = true;
};

const onMasterSaved = () => {
    // Re-sync with server is handled by Inertia navigation/reload 
    // but in SPA we can just let computed reactive check it.
};

onMounted(() => {
    if (isExplorer.value) {
        router.visit(route('billing'));
    }
});
</script>

<template>
    <Head :title="$t('job_page_title', 'Job Tracker')" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors duration-500">
        <!-- COMPACT HEADER: Title + Add Button only -->
        <div class="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 relative z-50 transition-colors duration-500">
            <div class="w-full min-w-0 px-4 sm:px-6 lg:px-8 py-2">
                <div class="flex w-full min-w-0 flex-wrap items-center justify-between gap-3 md:flex-nowrap">
                    
                    <div class="flex min-w-0 flex-1 items-center gap-2 md:flex-initial md:max-w-[min(100%,28rem)]">
                        <p class="shrink-0 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">
                            {{ $t('job_page_title', 'Job Tracker') }}
                        </p>
                        <div class="flex min-w-0 flex-1 items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50 overflow-hidden">
                            <OneForMindIcon name="job" size="14" class="text-indigo-500 shrink-0" />
                            <span class="min-w-0 truncate text-[11px] font-bold text-slate-600 dark:text-slate-300 capitalize">{{ todayDate }}</span>
                            <span v-if="pagination?.total" class="shrink-0 ml-1 text-[9px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded-full transition-colors duration-500">
                                {{ pagination.total }}
                            </span>
                        </div>
                    </div>
                    
                    
                    <!-- Right: Actions -->
                    <div class="flex shrink-0 items-center gap-2 sm:gap-3">
                        <!-- Master CV Button -->
                        <button @click="isMasterModalOpen = true"
                            class="px-4 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2 group relative">
                            <OneForMindIcon name="job" size="16" :class="hasMasterCv ? 'text-emerald-500' : 'text-slate-400'" />
                            <span class="text-[10px] font-bold hidden lg:inline">
                                {{ hasMasterCv ? $t('job_master_cv_ready', 'CV Ready') : $t('job_master_cv_needs_setup', 'Setup Master CV') }}
                            </span>
                            <div v-if="!hasMasterCv" class="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
                        </button>

                        <button @click="addEmptyRow"
                            class="bg-indigo-600 h-11 text-white font-black px-4 sm:px-6 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 shrink-0 relative overflow-hidden group">
                            <OneForMindIcon name="plus" size="16" stroke-width="4" />
                            <span class="hidden sm:inline text-[11px] font-bold">{{ $t('job_add_row', 'Tambah Baris') }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full max-w-[98%] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 min-w-0 overflow-x-hidden transition-all duration-500">
            <NeuralBridge module="Job" />
            
            <JobStats v-if="localStats" :stats="localStats" />

            <!-- SMART FILTER BAR (above table) -->
            <JobFilterBar
                :filters="filters"
                :unique-titles="uniqueTitles || []"
                :local-jobs="localJobs"
                :total-count="pagination?.total || localJobs.length"
            />

            <JobTable
                :jobs="localJobs"
                @auto-save="autoSaveRow"
                @delete="deleteJob"
                @scan="handleOpenScan"
            />
            
            <ResumeAiModal
                v-if="isAiModalOpen"
                :show="isAiModalOpen"
                :initial-job-description="activeJobForScan?.notes || activeJobForScan?.title"
                :job-title="activeJobForScan?.title"
                :company="activeJobForScan?.company"
                @close="isAiModalOpen = false"
            />

            <MasterCvModal
                v-if="isMasterModalOpen"
                :show="isMasterModalOpen"
                @close="isMasterModalOpen = false"
                @saved="onMasterSaved"
            />
            
            <div class="mt-5 flex items-center justify-start">
                <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 bg-indigo-50/50 dark:bg-indigo-500/10 px-4 py-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/30 shadow-sm transition-all duration-500">
                    <span class="text-indigo-500 dark:text-indigo-400 text-base">💡</span> {{ $t('job_tips', 'Tips: Klik sel pada tabel untuk mengedit. Data otomatis tersimpan saat berpindah sel.') }}
                </p>
            </div>
        </div>

    </div>
</template>