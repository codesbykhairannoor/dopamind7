<script setup>
/** Master CV Management with Large PDF Support and Text Extraction */
import { ref, computed, onMounted } from 'vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import axios from 'axios';
import { usePage, router } from '@inertiajs/vue3';
import { trans } from 'laravel-vue-i18n';

const props = defineProps({
    show: Boolean
});

const emit = defineEmits(['close', 'saved']);

const user = computed(() => usePage().props.auth.user);
const cvInput = ref(null);
const filePreview = ref(null);
const fileName = ref(user.value.resume_filename || '');
const selectedFile = ref(null);
const isLoading = ref(false);
const error = ref('');

onMounted(() => {
    console.log('[MasterCV] Initial State - Filename:', user.value.resume_filename);
    console.log('[MasterCV] Initial State - Has Text:', !!user.value.resume_text);
});

const triggerFileInput = () => {
    cvInput.value?.click();
};

const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
        // Validate size (15MB)
        if (file.size > 15 * 1024 * 1024) {
            error.value = 'Ukuran file terlalu besar (Max 15MB)';
            return;
        }

        selectedFile.value = file;
        fileName.value = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            filePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const save = async () => {
    if (!filePreview.value) {
        console.warn('[MasterCV] No file preview found, aborting save.');
        return;
    }

    isLoading.value = true;
    error.value = '';
    console.log('[MasterCV] Starting upload for file:', fileName.value);

    try {
        const response = await axios.post(route('jobs.master-cv'), {
            resume: filePreview.value,
            filename: fileName.value
        });
        
        console.log('[MasterCV] Upload Success:', response.data);
        
        router.reload({ 
            only: ['auth'],
            onSuccess: () => {
                console.log('[MasterCV] Data Refreshed from Server. Current resume_text exists?', !!usePage().props.auth.user.resume_text);
                emit('saved');
                emit('close');
            }
        });
    } catch (e) {
        console.error('[MasterCV] Critical Upload Failure:', e);
        const status = e.response?.status;
        const msg = e.response?.data?.message;
        
        console.error('[MasterCV] Error Status:', status);
        console.error('[MasterCV] Error Message:', msg);
        
        error.value = msg || `${trans('job_master_cv_error_save')} (Status: ${status})`;
        
        if (status === 413) {
            error.value = 'File terlalu besar untuk server PHP kamu (Limit: 8MB). Silakan naikkan limit di php.ini.';
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="emit('close')"></div>
        
        <div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                        <OneForMindIcon name="job" size="20" />
                    </div>
                    <h2 class="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">
                        {{ $t('job_master_cv_setup', 'Master CV Setup') }}
                    </h2>
                </div>
                <button @click="emit('close')" class="p-2 text-slate-400 hover:text-rose-500 transition-all">
                    <OneForMindIcon name="x" size="20" stroke-width="3" />
                </button>
            </div>

            <div class="space-y-6">
                <!-- Dropzone / Status -->
                <div 
                    @click="triggerFileInput"
                    class="relative h-48 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all overflow-hidden"
                    :class="[
                        user.resume_text ? 'border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-500/5' : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-500'
                    ]"
                >
                    <input type="file" ref="cvInput" class="hidden" accept=".pdf,image/*" @change="handleFile" />
                    
                    <template v-if="!filePreview && !user.resume_text">
                        <OneForMindIcon name="plus" size="32" class="text-slate-300" />
                        <p class="text-[10px] font-black text-slate-500 uppercase">
                            {{ $t('job_master_cv_upload_label', 'Upload PDF atau Gambar (Max 15MB)') }}
                        </p>
                    </template>
                    <template v-else-if="user.resume_text && !filePreview">
                        <div class="relative z-10 text-center">
                            <div class="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                                <OneForMindIcon name="check" size="28" class="text-emerald-500" />
                            </div>
                            <p class="text-xs font-black text-slate-800 dark:text-white truncate px-4 max-w-[250px]">{{ user.resume_filename || 'Master CV Active' }}</p>
                            <p class="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase mt-1 tracking-widest">
                                Intelligence Connected
                            </p>
                        </div>
                    </template>
                    <template v-else>
                        <div class="relative z-10 text-center">
                            <OneForMindIcon name="refresh" size="32" class="text-indigo-500 mx-auto mb-2 animate-spin-slow" />
                            <p class="text-xs font-black text-slate-800 dark:text-white truncate px-4 max-w-[250px]">{{ fileName }}</p>
                            <p class="text-[9px] font-bold text-indigo-500 uppercase mt-1">
                                Ready to Intelligence-Sync
                            </p>
                        </div>
                    </template>
                </div>

                <div class="space-y-3">
                    <button 
                        @click="save" 
                        :disabled="isLoading || !filePreview"
                        class="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        :class="[
                            filePreview ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        ]"
                    >
                        <OneForMindIcon v-if="isLoading" name="refresh" class="animate-spin" size="16" />
                        <span>
                            {{ 
                                isLoading ? $t('job_master_cv_extracting', 'Extracting Text Intelligence...') : 
                                (user.resume_text ? $t('job_master_cv_update', 'Replace / Update CV') : $t('job_master_cv_save', 'Save & Extract CV'))
                            }}
                        </span>
                    </button>
                    
                    <p v-if="error" class="text-[10px] text-rose-500 font-bold text-center uppercase">{{ error }}</p>

                    <!-- Text Intelligence Preview (New) -->
                    <div v-if="user.resume_text && !filePreview" class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                        <p class="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest flex items-center gap-2">
                             <OneForMindIcon name="sparkles" size="10" /> Extracted Intelligence Preview
                        </p>
                        <div class="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-h-24 overflow-y-auto custom-scrollbar">
                            {{ user.resume_text }}
                        </div>
                    </div>
                    
                    <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-900/30">
                        <p class="text-[10px] text-slate-400 font-bold text-center italic leading-relaxed">
                            💡 {{ $t('job_master_cv_storage_tip', 'Storage Optimization: Large PDF files (MB) will be compressed by AI into pure text data (KB) for database efficiency & analysis speed.') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
