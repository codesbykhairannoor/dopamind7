<script setup>
import { ref } from 'vue';
import JobDatePicker from './JobDatePicker.vue';
import JobStatusDropdown from './JobStatusDropdown.vue';

const props = defineProps({ jobs: Array });
const emit = defineEmits(['autoSave', 'delete', 'scan']);

const tableRef = ref(null);

const handleKeyDown = (e, rowIndex, colIndex) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

    const input = e.target;
    if (e.key === 'ArrowLeft' && input.selectionStart > 0) return;
    if (e.key === 'ArrowRight' && input.selectionEnd < input.value.length) return;

    e.preventDefault();

    let nextRow = rowIndex;
    let nextCol = colIndex;

    const totalCols = 4;
    const totalRows = props.jobs.length;

    if (e.key === 'ArrowUp') nextRow = Math.max(0, rowIndex - 1);
    else if (e.key === 'ArrowDown') nextRow = Math.min(totalRows - 1, rowIndex + 1);
    else if (e.key === 'ArrowLeft') nextCol = Math.max(0, colIndex - 1);
    else if (e.key === 'ArrowRight') nextCol = Math.min(totalCols - 1, colIndex + 1);

    const nextInput = tableRef.value?.querySelector(`input[data-nav-row="${nextRow}"][data-nav-col="${nextCol}"]`);
    if (nextInput) {
        nextInput.focus();
        setTimeout(() => nextInput.select(), 10);
    }
};

</script>

<template>
    <div class="relative">
        <!-- ==================== MOBILE LAYOUT (<sm) ==================== -->
        <div class="sm:hidden space-y-4">
            <div v-for="(job, index) in jobs" :key="job._key"
                class="group relative transition-all duration-300 active:scale-[0.99] z-10 hover:z-20 focus-within:z-30"
            >
                <!-- Glass Background -->
                <div class="absolute inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md rounded-[2.5rem] -z-10 border border-white/60 dark:border-slate-800 transition-colors duration-500"></div>
                
                <div 
                    class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-[2rem] border border-slate-200/60 dark:border-slate-800 p-5 shadow-sm transition-all duration-300"
                >
                    <div class="flex items-start gap-4">
                        <div class="flex-1 min-w-0 space-y-4">
                            <!-- Main Info: Company & Title -->
                            <div class="space-y-1">
                                <input v-model="job.company" type="text" 
                                    @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                    class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-black text-lg text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 transition-colors duration-500"
                                    :placeholder="$t('job_ph_company', 'Perusahaan')" />
                                <input v-model="job.title" type="text" 
                                    @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                    class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-bold text-sm text-slate-600 dark:text-slate-400 placeholder-slate-300 dark:placeholder-slate-700 transition-colors duration-500"
                                    :placeholder="$t('job_ph_title', 'Posisi Pekerjaan')" />
                            </div>
 
                            <div class="h-px bg-slate-100 dark:bg-slate-800 -mx-4 transition-colors duration-500"></div>

                            <!-- Details Grid -->
                            <div class="grid grid-cols-1 gap-4">
                                <!-- Location -->
                                <div class="space-y-1">
                                    <label class="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1 transition-colors duration-500">
                                        📍 {{ $t('job_col_location', 'Lokasi') }}
                                    </label>
                                    <input v-model="job.location" type="text" 
                                        @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                        class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-bold text-xs text-slate-700 dark:text-slate-300 placeholder-slate-300 dark:placeholder-slate-700 transition-colors duration-500"
                                        :placeholder="$t('job_ph_location', 'Remote / ID')" />
                                </div>
                            </div>

                            <!-- Integrated Pickers -->
                            <div class="flex items-center gap-2 pt-1 overflow-visible">
                                <div class="flex-1 min-w-0">
                                    <JobStatusDropdown v-model="job.status" @save="emit('autoSave', job)" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <JobDatePicker v-model="job.applied_date" @save="emit('autoSave', job)" />
                                </div>
                            </div>
                            
                            <!-- AI SCAN BUTTON (Mobile) -->
                            <button @click="emit('scan', job)"
                                class="w-full py-3 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                                <OneForMindIcon name="sparkles" size="14" stroke-width="3" />
                                AI Resume Match Scan
                            </button>
                        </div>

                        <!-- Delete Button -->
                        <button @click="emit('delete', job.id, job.is_new)"
                            class="p-2 text-slate-300 dark:text-slate-700 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Empty State -->
            <div v-if="jobs.length === 0" class="py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-sm transition-colors duration-500">
                <div class="flex flex-col items-center gap-4">
                    <span class="text-5xl text-slate-300 dark:text-slate-700 animate-bounce">📥</span>
                    <p class="text-sm font-bold text-slate-400 dark:text-slate-500 px-8 transition-colors duration-500">
                        {{ $t('job_empty_table', 'Belum ada data. Tambahkan baris baru di pojok kanan atas.') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- ==================== DESKTOP LAYOUT (>=sm) ==================== -->
        <div class="hidden sm:block bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative transition-colors duration-500">
            <div class="overflow-x-auto custom-scrollbar min-h-[500px]" ref="tableRef">
                <table class="w-full text-sm border-collapse whitespace-nowrap text-left relative select-none sm:select-text">
                    <thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-20 shadow-sm transition-colors duration-500">
                        <tr>
                            <th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-slate-600 dark:text-slate-300 min-w-[220px]">{{ $t('job_col_company', 'Perusahaan') }} <span class="text-rose-500">*</span></th>
                            <th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-slate-600 dark:text-slate-300 min-w-[220px]">{{ $t('job_col_title', 'Pekerjaan') }} <span class="text-rose-500">*</span></th>
                            <th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-slate-600 dark:text-slate-300 min-w-[180px]">{{ $t('job_col_location', 'Lokasi') }}</th>
                            <th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-slate-600 dark:text-slate-300 min-w-[160px]">{{ $t('job_col_applied', 'Tgl Melamar') }}</th>
                             <th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-slate-600 dark:text-slate-300 min-w-[160px]">{{ $t('job_col_status', 'Status') }}</th>
                             <th class="border-r border-slate-200 dark:border-slate-700 px-5 py-3.5 font-extrabold text-indigo-600 dark:text-indigo-400 min-w-[100px] text-center">Neural</th>
                            <th class="px-4 py-3.5 text-center font-extrabold text-slate-400 dark:text-slate-500 w-14">🗑️</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(job, index) in jobs" :key="job._key" 
                            class="border-b border-slate-100 dark:border-slate-800 hover:bg-indigo-50/10 dark:hover:bg-indigo-500/5 focus-within:bg-indigo-50/30 dark:focus-within:bg-indigo-500/10 transition-colors group relative"
                        >
                            <td class="border-r border-slate-100 dark:border-slate-800 p-0 relative">
                                <input v-model="job.company" type="text" @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                    @keydown="handleKeyDown($event, index, 0)" :data-nav-row="index" data-nav-col="0"
                                    class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 transition-all font-sans"
                                    :placeholder="$t('job_ph_company', 'Ketik perusahaan...')" />
                            </td>

                            <td class="border-r border-slate-100 dark:border-slate-800 p-0 relative">
                                <input v-model="job.title" type="text" @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                    @keydown="handleKeyDown($event, index, 1)" :data-nav-row="index" data-nav-col="1"
                                    class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 transition-all font-sans"
                                    :placeholder="$t('job_ph_title', 'Cth: Frontend Dev')" />
                            </td>

                            <td class="border-r border-slate-100 dark:border-slate-800 p-0 relative">
                                <input v-model="job.location" type="text" @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                    @keydown="handleKeyDown($event, index, 2)" :data-nav-row="index" data-nav-col="2"
                                    class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-slate-600 dark:text-slate-400 placeholder-slate-300 dark:placeholder-slate-700 transition-all font-sans"
                                    :placeholder="$t('job_ph_location', 'Remote / ID')" />
                            </td>

                            <td class="border-r border-slate-100 dark:border-slate-800 p-0 relative">
                                <JobDatePicker v-model="job.applied_date" @save="emit('autoSave', job)" />
                            </td>

                            <td class="border-r border-slate-100 dark:border-slate-800 p-0 relative">
                                <JobStatusDropdown v-model="job.status" @save="emit('autoSave', job)" />
                            </td>


                            <td class="border-r border-slate-100 dark:border-slate-800 p-0 relative text-center align-middle">
                                <button @click="emit('scan', job)"
                                    class="w-full h-full min-h-[56px] flex items-center justify-center text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all">
                                    <OneForMindIcon name="sparkles" size="18" stroke-width="2.5" />
                                </button>
                            </td>

                            <td class="p-0 text-center align-middle">
                                <button @click="emit('delete', job.id, job.is_new)" tabindex="-1"
                                    class="w-full h-full min-h-[56px] flex items-center justify-center text-slate-300 dark:text-slate-700 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-200">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </td>
                        </tr>
                        
                        <tr v-if="jobs.length === 0">
                            <td colspan="7" class="px-4 py-20 text-center text-slate-400 dark:text-slate-500 bg-slate-50/30 dark:bg-slate-800/20 font-medium transition-colors duration-500">
                                <div class="flex flex-col items-center gap-3">
                                    <span class="text-4xl text-slate-300 dark:text-slate-700 animate-bounce mt-2">📥</span>
                                    {{ $t('job_empty_table', 'Belum ada data. Tambahkan baris baru di pojok kanan atas.') }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
    border: 3px solid transparent; 
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #334155;
}
.custom-scrollbar::-webkit-scrollbar-track { 
    background: transparent; 
}
</style>