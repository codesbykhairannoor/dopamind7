<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useJobs } from '@/Composables/Job/useJobs';
import JobTable from './JobTable.vue';
import JobStats from './JobStats.vue';
import JobFilterBar from './JobFilterBar.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const props = defineProps({
    jobs:         Array,
    stats:        Object,
    filters:      Object,
    uniqueTitles: Array,
    pagination:   Object,
});

defineOptions({ layout: AuthenticatedLayout });

const {
    localJobs, selectedJobs, localStats,
    addEmptyRow, autoSaveRow, deleteJob,
    toggleSelection, selectAll, shiftSelect,
    bulkDelete, bulkDuplicate
} = useJobs(props);

const todayDate = computed(() => {
    const locale = usePage().props.locale || 'id';
    return dayjs().locale(locale).format('dddd, D MMMM YYYY');
});
</script>

<template>
    <Head :title="$t('job_page_title', 'Job Tracker')" />

    <div class="min-h-screen bg-[#f8fafc] pb-24">
        <!-- STICKY HEADER: Title + Add Button only -->
        <div class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-sm">
            <div class="w-full px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5">
                <div class="flex items-center justify-between gap-4">
                    <!-- Left: Icon + Title + Date -->
                    <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100 shrink-0">
                            <OneForMindIcon name="job" size="24" :stroke-width="3" />
                        </div>
                        <div class="min-w-0">
                            <h1 class="text-lg sm:text-2xl font-black leading-tight tracking-tight text-slate-800 flex items-center gap-1.5 sm:gap-2">
                                <span class="truncate">{{ $t('job_page_title', 'Job Tracker') }}</span>
                                <span v-if="pagination?.total" class="text-[10px] sm:text-sm font-black text-indigo-600 bg-indigo-50 px-2 sm:px-2.5 py-0.5 rounded-full shrink-0">
                                    {{ pagination.total }}
                                </span>
                            </h1>
                            <p class="mt-0.5 text-[10px] sm:text-sm font-black uppercase tracking-widest text-slate-400 truncate">{{ todayDate }}</p>
                        </div>
                    </div>
                    
                    <!-- Right: Add Button -->
                    <button @click="addEmptyRow"
                        class="bg-indigo-600 text-white font-black py-2.5 px-4 sm:px-6 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2 shrink-0">
                        <OneForMindIcon name="plus" size="18" stroke-width="4" />
                        <span class="hidden sm:inline">{{ $t('job_add_row', 'Tambah Baris') }}</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            
            <JobStats v-if="localStats" :stats="localStats" />

            <!-- SMART FILTER BAR (above table) -->
            <JobFilterBar
                :filters="filters"
                :unique-titles="uniqueTitles || []"
                :local-jobs="localJobs"
                :total-count="pagination?.total || localJobs.length"
            />

            <!-- BULK ACTIONS FLOATING BAR -->
            <transition 
                enter-active-class="transition duration-300 ease-out" 
                enter-from-class="opacity-0 -translate-y-4" 
                enter-to-class="opacity-100 translate-y-0" 
                leave-active-class="transition duration-200 ease-in" 
                leave-from-class="opacity-100 translate-y-0" 
                leave-to-class="opacity-0 -translate-y-4"
            >
                <div v-if="selectedJobs.length > 0" class="mb-5 bg-indigo-600 text-white rounded-2xl p-4 shadow-lg shadow-indigo-200 flex items-center justify-between sticky top-24 z-30">
                    <div class="flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black">{{ selectedJobs.length }}</span>
                        <span class="font-bold text-sm sm:text-base tracking-wide">{{ $t('job_bulk_selected', 'Baris Terpilih') }}</span>
                    </div>
                    <div class="flex items-center gap-2 sm:gap-4">
                        <button @click="bulkDuplicate" class="px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
                            <OneForMindIcon name="planner" size="16" /> <span class="hidden sm:inline">{{ $t('job_bulk_copy', 'Duplikat') }}</span>
                        </button>
                        <button @click="bulkDelete" class="px-3 sm:px-4 py-2 bg-rose-500 hover:bg-rose-400 active:scale-95 text-white shadow-md shadow-rose-500/30 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
                            <OneForMindIcon name="trash" size="16" /> <span class="hidden sm:inline">{{ $t('job_bulk_delete', 'Hapus Sekaligus') }}</span>
                        </button>
                        <div class="w-px h-6 bg-white/20 mx-1"></div>
                        <button @click="selectAll" class="p-2 text-indigo-200 hover:text-white transition-colors" title="Batal Pilih Semua">
                            <OneForMindIcon name="x" size="20" stroke-width="2.5" />
                        </button>
                    </div>
                </div>
            </transition>

            <JobTable
                :jobs="localJobs"
                :selected-jobs="selectedJobs"
                @toggle-selection="toggleSelection"
                @shift-select="shiftSelect"
                @select-all="selectAll"
                @auto-save="autoSaveRow"
                @delete="deleteJob"
            />
            
            <div class="mt-5 flex items-center justify-start">
                <p class="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-2 bg-indigo-50/50 px-4 py-2.5 rounded-xl border border-indigo-100 shadow-sm">
                    <span class="text-indigo-500 text-base">💡</span> {{ $t('job_tips', 'Tips: Klik sel pada tabel untuk mengedit. Data otomatis tersimpan saat berpindah sel.') }}
                </p>
            </div>
        </div>
    </div>
</template>