<script setup>
import { ref } from 'vue';
import JobDatePicker from './JobDatePicker.vue';
import JobStatusDropdown from './JobStatusDropdown.vue';

const props = defineProps({ jobs: Array, selectedJobs: Array });
const emit = defineEmits(['toggleSelection', 'selectAll', 'autoSave', 'delete', 'shiftSelect']);

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

const handleCheckboxClick = (e, jobId, index) => {
    if (e.shiftKey) {
        emit('shiftSelect', index, jobId);
    } else {
        emit('toggleSelection', jobId, index);
    }
};

// --- MULTI-SELECT GESTURES (TOUCH & RIGHT-CLICK) ---
let touchTimer = null;

const handleRightClick = (e, jobId, index) => {
    emit('toggleSelection', jobId, index);
    
    // Provide slight visual feedback that row was selected via right click
    const targetRow = e.currentTarget;
    targetRow.classList.add('bg-indigo-100/70', 'transition-none');
    setTimeout(() => {
        targetRow.classList.remove('bg-indigo-100/70', 'transition-none');
    }, 150);
};

const handlePointerDown = (e, jobId, index) => {
    // Only detect long press for touch devices to avoid interfering with mouse text selection
    if (e.pointerType !== 'touch') return;
    
    clearTimeout(touchTimer);
    touchTimer = setTimeout(() => {
        emit('toggleSelection', jobId, index);
        // Haptic feedback if supported on mobile
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
    }, 500); // 500ms long press threshold
};

const handlePointerUp = (e) => {
    if (e.pointerType !== 'touch') return;
    clearTimeout(touchTimer);
};
</script>

<template>
    <div class="relative">
        <!-- ==================== MOBILE LAYOUT (<sm) ==================== -->
        <div class="sm:hidden space-y-4">
            <div v-for="(job, index) in jobs" :key="job._key"
                class="group relative overflow-hidden transition-all duration-300 active:scale-[0.99]"
            >
                <!-- Glass Background -->
                <div class="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[2rem] -z-10 border border-white/60"></div>
                
                <div 
                    class="bg-white/70 backdrop-blur-md rounded-[2rem] border border-slate-200/60 p-5 shadow-sm transition-all duration-300"
                    :class="{'ring-2 ring-indigo-500 bg-white/90': selectedJobs.includes(job.id)}"
                >
                    <div class="flex items-start gap-4">
                        <!-- Multi-select checkbox -->
                        <div class="flex items-center h-10 shrink-0">
                            <input type="checkbox" :checked="selectedJobs.includes(job.id)"
                                @click="handleCheckboxClick($event, job.id, index)" 
                                class="rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5 transition-transform active:scale-125" />
                        </div>

                        <div class="flex-1 min-w-0 space-y-4">
                            <!-- Main Info: Company & Title -->
                            <div class="space-y-1">
                                <input v-model="job.company" type="text" 
                                    @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                    class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-black text-lg text-slate-800 placeholder-slate-300"
                                    :placeholder="$t('job_ph_company', 'Perusahaan')" />
                                <input v-model="job.title" type="text" 
                                    @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                    class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-bold text-sm text-slate-600 placeholder-slate-300"
                                    :placeholder="$t('job_ph_title', 'Posisi Pekerjaan')" />
                            </div>

                            <div class="h-px bg-slate-100 -mx-4"></div>

                            <!-- Details Grid -->
                            <div class="grid grid-cols-2 gap-4">
                                <!-- Location -->
                                <div class="space-y-1">
                                    <label class="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                                        📍 {{ $t('job_col_location', 'Lokasi') }}
                                    </label>
                                    <input v-model="job.location" type="text" 
                                        @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                        class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-bold text-xs text-slate-700 placeholder-slate-300"
                                        :placeholder="$t('job_ph_location', 'Remote / ID')" />
                                </div>
                                <!-- Salary -->
                                <div class="space-y-1">
                                    <label class="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                                        💰 {{ $t('job_col_salary', 'Gaji') }}
                                    </label>
                                    <input v-model="job.salary" type="number" 
                                        @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                        class="w-full p-0 bg-transparent border-none outline-none focus:ring-0 font-bold text-xs font-mono text-slate-700 placeholder-slate-300"
                                        placeholder="0" />
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
                        </div>

                        <!-- Delete Button -->
                        <button @click="emit('delete', job.id, job.is_new)"
                            class="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Empty State -->
            <div v-if="jobs.length === 0" class="py-20 text-center bg-white rounded-[2rem] border border-slate-200/60 shadow-sm">
                <div class="flex flex-col items-center gap-4">
                    <span class="text-5xl text-slate-300 animate-bounce">📥</span>
                    <p class="text-sm font-bold text-slate-400 px-8">
                        {{ $t('job_empty_table', 'Belum ada data. Tambahkan baris baru di pojok kanan atas.') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- ==================== DESKTOP LAYOUT (>=sm) ==================== -->
        <div class="hidden sm:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            <div class="overflow-x-auto custom-scrollbar min-h-[500px]" ref="tableRef">
                <table class="w-full text-sm border-collapse whitespace-nowrap text-left relative select-none sm:select-text">
                    <thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-20 shadow-sm">
                        <tr>
                            <th class="border-r border-slate-200 px-4 py-3.5 w-12 text-center relative group">
                                <input type="checkbox" :checked="selectedJobs.length === jobs.length && jobs.length > 0"
                                    @change="emit('selectAll')" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4 peer" />
                                <div class="absolute inset-0 bg-indigo-500/10 opacity-0 peer-checked:opacity-100 peer-hover:opacity-50 transition-opacity pointer-events-none"></div>
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
                        <tr v-for="(job, index) in jobs" :key="job._key" 
                            @contextmenu.prevent="handleRightClick($event, job.id, index)"
                            @pointerdown="handlePointerDown($event, job.id, index)"
                            @pointerup="handlePointerUp"
                            @pointerleave="handlePointerUp"
                            @pointercancel="handlePointerUp"
                            class="border-b border-slate-100 hover:bg-indigo-50/10 focus-within:bg-indigo-50/30 transition-colors group relative"
                            :class="{'bg-indigo-50/50 hover:bg-indigo-50/70': selectedJobs.includes(job.id)}">
                            
                            <td class="border-r border-slate-100 px-4 py-0 text-center align-middle bg-slate-50/40 group-focus-within:bg-transparent"
                                :class="{'!bg-indigo-100/50': selectedJobs.includes(job.id)}">
                                <input type="checkbox" :checked="selectedJobs.includes(job.id)"
                                    @click="handleCheckboxClick($event, job.id, index)" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4" />
                            </td>

                            <td class="border-r border-slate-100 p-0 relative">
                                <input v-model="job.company" type="text" @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                    @keydown="handleKeyDown($event, index, 0)" :data-nav-row="index" data-nav-col="0"
                                    class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 placeholder-slate-300 transition-all font-sans"
                                    :placeholder="$t('job_ph_company', 'Ketik perusahaan...')" />
                            </td>

                            <td class="border-r border-slate-100 p-0 relative">
                                <input v-model="job.title" type="text" @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                    @keydown="handleKeyDown($event, index, 1)" :data-nav-row="index" data-nav-col="1"
                                    class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-bold text-slate-800 placeholder-slate-300 transition-all font-sans"
                                    :placeholder="$t('job_ph_title', 'Cth: Frontend Dev')" />
                            </td>

                            <td class="border-r border-slate-100 p-0 relative">
                                <input v-model="job.location" type="text" @blur="emit('autoSave', job)" @keyup.enter="$event.target.blur()"
                                    @keydown="handleKeyDown($event, index, 2)" :data-nav-row="index" data-nav-col="2"
                                    class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-medium text-slate-600 placeholder-slate-300 transition-all font-sans"
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
                                    @keydown="handleKeyDown($event, index, 3)" :data-nav-row="index" data-nav-col="3"
                                    class="w-full h-full min-h-[56px] px-5 py-0 bg-transparent border-none outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-mono font-medium text-slate-600 placeholder-slate-300 transition-all"
                                    placeholder="0" />
                            </td>

                            <td class="p-0 text-center align-middle">
                                <button @click="emit('delete', job.id, job.is_new)" tabindex="-1"
                                    class="w-full h-full min-h-[56px] flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-200">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </td>
                        </tr>
                        
                        <tr v-if="jobs.length === 0">
                            <td colspan="8" class="px-4 py-20 text-center text-slate-400 bg-slate-50/30 font-medium">
                                <div class="flex flex-col items-center gap-3">
                                    <span class="text-4xl text-slate-300 animate-bounce mt-2">📥</span>
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
    border: 3px solid white; /* Memberi efek margin pada scrollbar */
}
.custom-scrollbar::-webkit-scrollbar-track { 
    background: transparent; 
}
</style>