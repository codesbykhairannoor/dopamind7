<script setup>
import { ref, computed } from 'vue';
import { marked } from 'marked';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import axios from 'axios';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    show: Boolean,
    initialJobDescription: String,
    jobTitle: String,
    company: String
});

const emit = defineEmits(['close']);

const jobDescription = ref(props.initialJobDescription || '');

// Using Master CV from LocalStorage
const masterCvPreview = ref(localStorage.getItem('master_cv_preview'));
const masterCvName = ref(localStorage.getItem('master_cv_name'));

const isLoading = ref(false);
const analysisResult = ref('');
const error = ref('');

const runAnalysis = async () => {
    if (!masterCvPreview.value || !jobDescription.value) {
        error.value = 'Harap atur Master CV terlebih dahulu dan masukkan deskripsi pekerjaan.';
        return;
    }

    isLoading.value = true;
    error.value = '';

    try {
        const response = await axios.post(route('jobs.ai-scan'), {
            resume: masterCvPreview.value,
            job_description: jobDescription.value
        });
        analysisResult.value = response.data.analysis;
    } catch (e) {
        error.value = e.response?.data?.message || 'Gagal menganalisis CV. Coba lagi nanti.';
    } finally {
        isLoading.value = false;
    }
};

const htmlAnalysis = computed(() => {
    if (!analysisResult.value) return '';
    return marked.parse(analysisResult.value);
});

const close = () => {
    if (isLoading.value) return;
    emit('close');
};

const goToCoachLink = computed(() => {
    const msg = `Halo AI Coach, saya baru saja scan Master CV saya untuk posisi ${props.jobTitle} di ${props.company}. Berdasarkan scan, dapet skor ${analysisResult.value.match(/(\d+)%/)?.[0] || ''}. Bisa bantu saya optimalkan CV atau simulasi interview?`;
    return route('coach.index', { initial_message: msg });
});
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="close"></div>

        <div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            
            <div class="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                        <OneForMindIcon name="sparkles" size="20" />
                    </div>
                    <h2 class="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Neural Probability</h2>
                </div>
                <button @click="close" class="p-2 text-slate-400 hover:text-rose-500 transition-all">
                    <OneForMindIcon name="x" size="20" stroke-width="3" />
                </button>
            </div>

            <div class="p-8 space-y-6">
                <!-- Master CV Status -->
                <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all">
                    <div class="flex items-center gap-3 min-w-0">
                        <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                            <OneForMindIcon name="check" size="16" stroke-width="3" />
                        </div>
                        <span class="text-xs font-black text-slate-700 dark:text-slate-300 truncate">{{ masterCvName || 'Belum ada Master CV' }}</span>
                    </div>
                    <div v-if="!masterCvPreview" class="text-[10px] font-black text-rose-500 uppercase flex items-center gap-1">
                        <OneForMindIcon name="x" size="12" /> Perlu Setup
                    </div>
                </div>

                <!-- Job Description (Pre-filled/Editable) -->
                <div class="space-y-3">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi Pekerjaan / Title</label>
                    <textarea 
                        v-model="jobDescription"
                        class="w-full h-32 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-sm font-bold p-4 resize-none transition-all placeholder-slate-300 dark:placeholder-slate-700"
                        placeholder="Masukkan deskripsi kerja atau posisi..."
                    ></textarea>
                </div>

                <button 
                    @click="runAnalysis"
                    :disabled="isLoading || !masterCvPreview || !jobDescription"
                    class="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                >
                    <OneForMindIcon v-if="!isLoading" name="sparkles" size="16" stroke-width="3" />
                    <OneForMindIcon v-else name="refresh" size="16" class="animate-spin" />
                    <span>{{ isLoading ? 'Predicting Chance...' : 'Hitung Persentase Peluang' }}</span>
                </button>

                <!-- Result -->
                <div v-if="analysisResult" class="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 space-y-6">
                    <div class="prose prose-slate dark:prose-invert prose-sm max-w-none 
                        prose-h1:text-3xl prose-h1:text-indigo-600 dark:prose-h1:text-indigo-400 prose-h1:font-black
                        prose-p:font-bold prose-p:text-slate-700 dark:prose-p:text-slate-300"
                        v-html="htmlAnalysis"></div>
                    
                    <div class="h-px bg-indigo-100 dark:bg-indigo-500/20"></div>

                    <div class="flex flex-col gap-3">
                        <Link :href="goToCoachLink" class="w-full py-4 rounded-xl bg-indigo-600 text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none">
                            <OneForMindIcon name="premium" size="14" />
                            Diskusi Detail dengan AI Coach
                        </Link>
                        <p class="text-[9px] font-bold text-slate-400 text-center uppercase tracking-tighter">AI Coach akan memberimu simulasi interview & optimasi CV secara mendalam.</p>
                    </div>
                </div>

                <p v-if="error" class="text-center text-rose-500 text-xs font-bold">{{ error }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { 
    background: #e2e8f0; border-radius: 10px; 
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; }
</style>
