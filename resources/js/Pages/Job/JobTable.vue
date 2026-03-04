<script setup>
const props = defineProps({
    jobs: Array,
    selectedJobs: Array,
});

const emit = defineEmits(['toggleSelection', 'selectAll', 'edit', 'delete']);

const getStatusColor = (status) => {
    const colors = {
        wishlist: 'bg-blue-100 text-blue-700 border-blue-200',
        applied: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        interview: 'bg-purple-100 text-purple-700 border-purple-200',
        offer: 'bg-green-100 text-green-700 border-green-200',
        rejected: 'bg-red-100 text-red-700 border-red-200',
        accepted: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    return colors[status] || 'bg-slate-100 text-slate-700 border-slate-200';
};

const formatSalary = (salary) => {
    if (!salary) return '-';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(salary);
};

const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
};
</script>

<template>
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th class="px-4 py-3 text-left">
                            <input type="checkbox"
                                :checked="selectedJobs.length === jobs.length && jobs.length > 0"
                                @change="emit('selectAll')"
                                class="rounded border-slate-300" />
                        </th>
                        <th class="px-4 py-3 text-left text-xs font-black text-slate-600 uppercase">Title</th>
                        <th class="px-4 py-3 text-left text-xs font-black text-slate-600 uppercase">Company</th>
                        <th class="px-4 py-3 text-left text-xs font-black text-slate-600 uppercase">Status</th>
                        <th class="px-4 py-3 text-left text-xs font-black text-slate-600 uppercase">Salary</th>
                        <th class="px-4 py-3 text-left text-xs font-black text-slate-600 uppercase">Applied</th>
                        <th class="px-4 py-3 text-left text-xs font-black text-slate-600 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="job in jobs" :key="job.id"
                        class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td class="px-4 py-4">
                            <input type="checkbox"
                                :checked="selectedJobs.includes(job.id)"
                                @change="emit('toggleSelection', job.id)"
                                class="rounded border-slate-300" />
                        </td>
                        <td class="px-4 py-4">
                            <div class="font-bold text-slate-800">{{ job.title }}</div>
                            <div v-if="job.location" class="text-xs text-slate-500">📍 {{ job.location }}</div>
                        </td>
                        <td class="px-4 py-4 font-medium text-slate-700">{{ job.company }}</td>
                        <td class="px-4 py-4">
                            <span class="px-3 py-1 rounded-full text-xs font-bold border"
                                :class="getStatusColor(job.status)">
                                {{ job.status }}
                            </span>
                        </td>
                        <td class="px-4 py-4 text-sm font-medium text-slate-600">{{ formatSalary(job.salary) }}</td>
                        <td class="px-4 py-4 text-sm text-slate-600">{{ formatDate(job.applied_date) }}</td>
                        <td class="px-4 py-4">
                            <div class="flex gap-2">
                                <button @click="emit('edit', job)"
                                    class="text-indigo-600 hover:text-indigo-800 font-bold text-sm">
                                    Edit
                                </button>
                                <button @click="emit('delete', job.id)"
                                    class="text-rose-600 hover:text-rose-800 font-bold text-sm">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="jobs.length === 0">
                        <td colspan="7" class="px-4 py-12 text-center text-slate-500">
                            No jobs found. Click "Add Job" to get started!
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
