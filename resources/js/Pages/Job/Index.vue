<script setup>
import { Head, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useJobs } from '@/Composables/Job/useJobs';
import { ref } from 'vue';
import JobTable from './JobTable.vue';
import JobStats from './JobStats.vue';

const props = defineProps({
    jobs: Array,
    stats: Object,
    filters: Object,
});

defineOptions({ layout: AuthenticatedLayout });

const {
    localJobs, selectedJobs, localStats, // Wajib tarik localStats dari composable
    addEmptyRow, autoSaveRow, deleteJob,
    toggleSelection, selectAll
} = useJobs(props);

const searchQuery = ref(props.filters.search || '');

const handleSearch = () => {
    router.get(route('jobs.index'), { search: searchQuery.value }, { preserveState: true, preserveScroll: true, replace: true });
};
</script>

<template>
    <Head :title="$t('job_page_title', 'Job Tracker')" />

    <div class="min-h-screen bg-[#f8fafc] pb-24">
        <div class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
            <div class="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 w-full md:w-auto">
                        <h1 class="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2 shrink-0">
                            💼 {{ $t('job_page_title', 'Job Tracker') }}
                        </h1>
                        <div class="h-6 w-px bg-slate-300 hidden sm:block"></div>
                        
                        <div class="relative w-full sm:w-72">
                            <input v-model="searchQuery" @keyup.enter="handleSearch" type="text" 
                                :placeholder="$t('job_search', 'Cari posisi/perusahaan...')"
                                class="w-full pl-10 pr-4 py-2 sm:py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 transition-all font-medium text-slate-700" />
                            <span class="absolute left-3 top-2.5 sm:top-3 text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </span>
                        </div>
                    </div>
                    
                    <button @click="addEmptyRow"
                        class="w-full md:w-auto justify-center bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center gap-2">
                        <span class="text-xl leading-none mb-0.5">+</span> {{ $t('job_add_row', 'Tambah Baris') }}
                    </button>
                </div>
            </div>
        </div>

        <div class="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            
            <JobStats v-if="localStats" :stats="localStats" />

            <JobTable
                :jobs="localJobs"
                :selected-jobs="selectedJobs"
                @toggle-selection="toggleSelection"
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