<script setup>
import JobDatePicker from './JobDatePicker.vue';
import JobStatusDropdown from './JobStatusDropdown.vue';

const props = defineProps({ jobs: Array, selectedJobs: Array });
const emit = defineEmits(['toggleSelection', 'selectAll', 'autoSave', 'delete']);
</script>

<template>
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 relative">
        
        <div class="overflow-x-auto custom-scrollbar min-h-[400px] sm:min-h-[500px]">
            <table class="w-full text-sm border-collapse whitespace-nowrap text-left relative">
                <thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-20 shadow-sm">
                    <tr>
                        <th class="border-r border-slate-200 px-4 py-3.5 w-12 text-center">
                            <input type="checkbox" :checked="selectedJobs.length === jobs.length && jobs.length > 0"
                                @change="emit('selectAll')" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4" />
                        </th>
                        <th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[220px]">{{ $t('job_col_company', 'Perusahaan') }} <span class="text-rose-500">*</span></th>
                        <th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[220px]">{{ $t('job_col_title', 'Pekerjaan') }} <span class="text-rose-500">*</span></th>
                        <th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[180px]">{{ $t('job_col_location', 'Lokasi') }}</th>
                        <th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[160px]">{{ $t('job_col_applied', 'Tgl Melamar') }}</th>
                        <th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[160px]">{{ $t('job_col_status', 'Status') }}</th>
                        <th class="border-r border-slate-200 px-5 py-3.5 font-extrabold text-slate-600 min-w-[180px]">{{ $t('job_col_salary', 'Gaji (Opsional)') }}</th>
                        <th class="px-4 py-3.5 text-center font-extrabold text-slate-400 w-14">🗑️</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="job in jobs" :key="job._key" 
                        class="border-b border-slate-100 hover:bg-indigo-50/10 focus-within:bg-indigo-50/30 transition-colors group">
                        
                        <td class="border-r border-slate-100 px-4 py-0 text-center align-middle bg-slate-50/40 group-focus-within:bg-transparent">
                            <input type="checkbox" :checked="selectedJobs.includes(job.id)"
                                @change="emit('toggleSelection', job.id)" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4" />
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <input v-model="job.company" type="text" @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 placeholder-slate-300 transition-all"
                                :placeholder="$t('job_ph_company', 'Ketik perusahaan...')" />
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <input v-model="job.title" type="text" @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 placeholder-slate-300 transition-all"
                                :placeholder="$t('job_ph_title', 'Cth: Frontend Dev')" />
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <input v-model="job.location" type="text" @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-slate-600 placeholder-slate-300 transition-all"
                                :placeholder="$t('job_ph_location', 'Remote / ID')" />
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <JobDatePicker v-model="job.applied_date" @save="emit('autoSave', job)" />
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <JobStatusDropdown v-model="job.status" @save="emit('autoSave', job)" />
                        </td>

                        <td class="border-r border-slate-100 p-0 relative">
                            <input v-model="job.salary" type="number" @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-mono font-medium text-slate-600 placeholder-slate-300 transition-all"
                                placeholder="0" />
                        </td>

                        <td class="p-0 text-center align-middle">
                            <button @click="emit('delete', job.id, job.is_new)" tabindex="-1"
                                class="w-full h-full min-h-[56px] flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </td>
                    </tr>
                    
                    <tr v-if="jobs.length === 0">
                        <td colspan="8" class="px-4 py-20 text-center text-slate-400 bg-slate-50/30 font-medium">
                            <div class="flex flex-col items-center gap-3">
                                <span class="text-4xl">📄</span>
                                {{ $t('job_empty_table', 'Belum ada data. Klik tombol "+ Tambah Baris" di atas.') }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
/* Scrollbar di Windows/Android dibikin lebih kalem */
.custom-scrollbar::-webkit-scrollbar { 
    height: 10px; 
    width: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb { 
    background: #cbd5e1; 
    border-radius: 20px; 
    border: 3px solid white; /* Memberi efek margin pada scrollbar */
}
.custom-scrollbar::-webkit-scrollbar-track { 
    background: transparent; 
}
</style>