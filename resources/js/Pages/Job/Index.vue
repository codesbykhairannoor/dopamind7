<script setup>
import { Head, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { useJobs } from '@/Composables/Job/useJobs';
import { ref, computed } from 'vue';
import JobTable from './JobTable.vue';
import JobForm from './JobForm.vue';

const props = defineProps({
    jobs: Array,
    stats: Object,
    filters: Object,
    pagination: Object,
});

defineOptions({ layout: AuthenticatedLayout });

const {
    localJobs, isFormOpen, isEditing, form, selectedJobs,
    openForm, closeForm, submitJob, deleteJob,
    toggleSelection, selectAll, bulkUpdateStatus, bulkDelete
} = useJobs(props);

const searchQuery = ref(props.filters.search || '');
const statusFilter = ref(props.filters.status || 'all');

const handleSearch = () => {
    router.get(route('jobs.index'), {
        search: searchQuery.value,
        status: statusFilter.value,
    }, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
};

const handleStatusFilter = (status) => {
    statusFilter.value = status;
    handleSearch();
};

const statusOptions = [
    { value: 'all', label: 'All Jobs', color: 'slate' },
    { value: 'wishlist', label: 'Wishlist', color: 'blue' },
    { value: 'applied', label: 'Applied', color: 'yellow' },
    { value: 'interview', label: 'Interview', color: 'purple' },
    { value: 'offer', label: 'Offer', color: 'green' },
    { value: 'rejected', label: 'Rejected', color: 'red' },
    { value: 'accepted', label: 'Accepted', color: 'emerald' },
];
</script>

<template>
    <Head title="Job Tracker" />

    <div class="min-h-screen bg-slate-50/50">
        <!-- Header -->
        <div class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 class="text-3xl font-black text-slate-800">💼 Job Tracker</h1>
                        <p class="text-sm text-slate-500 font-medium mt-1">Track your job applications</p>
                    </div>
                    <button @click="openForm()"
                        class="bg-indigo-600 text-white font-black py-3 px-6 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
                        + Add Job
                    </button>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-6">
                    <div v-for="stat in statusOptions" :key="stat.value"
                        @click="handleStatusFilter(stat.value)"
                        class="bg-slate-50 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
                        :class="statusFilter === stat.value ? 'ring-2 ring-indigo-500 bg-indigo-50' : ''">
                        <div class="text-2xl font-black" :class="`text-${stat.color}-600`">
                            {{ stat.value === 'all' ? stats.total : stats[stat.value] || 0 }}
                        </div>
                        <div class="text-xs font-bold text-slate-500 mt-1">{{ stat.label }}</div>
                    </div>
                </div>

                <!-- Search & Filters -->
                <div class="flex gap-3 mt-6">
                    <input v-model="searchQuery" @keyup.enter="handleSearch"
                        type="text" placeholder="Search jobs..."
                        class="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    <button @click="handleSearch"
                        class="bg-slate-800 text-white font-bold py-2 px-6 rounded-xl hover:bg-slate-700 transition-all">
                        Search
                    </button>
                </div>

                <!-- Bulk Actions -->
                <div v-if="selectedJobs.length > 0" class="flex gap-2 mt-4">
                    <span class="text-sm font-bold text-slate-600">{{ selectedJobs.length }} selected</span>
                    <button @click="bulkUpdateStatus('applied')" class="text-xs font-bold text-yellow-600 hover:underline">Mark Applied</button>
                    <button @click="bulkUpdateStatus('interview')" class="text-xs font-bold text-purple-600 hover:underline">Mark Interview</button>
                    <button @click="bulkUpdateStatus('rejected')" class="text-xs font-bold text-red-600 hover:underline">Mark Rejected</button>
                    <button @click="bulkDelete" class="text-xs font-bold text-rose-600 hover:underline">Delete</button>
                </div>
            </div>
        </div>

        <!-- Job Table -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <JobTable
                :jobs="localJobs"
                :selected-jobs="selectedJobs"
                @toggle-selection="toggleSelection"
                @select-all="selectAll"
                @edit="openForm"
                @delete="deleteJob"
            />

            <!-- Pagination -->
            <div v-if="pagination.last_page > 1" class="flex justify-center gap-2 mt-6">
                <button v-for="page in pagination.last_page" :key="page"
                    @click="router.get(route('jobs.index', { page, search: searchQuery, status: statusFilter }))"
                    class="px-4 py-2 rounded-lg font-bold transition-all"
                    :class="page === pagination.current_page
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100'">
                    {{ page }}
                </button>
            </div>
        </div>

        <!-- Job Form -->
        <JobForm
            :show="isFormOpen"
            :is-editing="isEditing"
            :form="form"
            @close="closeForm"
            @submit="submitJob"
        />
    </div>
</template>
