<script setup>
import { useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { 
    Sparkles, 
    Loader2, 
    Link2, 
    BookOpen, 
    FileText,
    PlusCircle
} from 'lucide-vue-next';
import InputError from '@/Components/InputError.vue';

const props = defineProps({
    materialsCount: {
        type: Number,
        default: 0
    }
});

const isLimitReached = computed(() => {
    return props.materialsCount >= 6;
});

const dragOver = ref(false);
const fileInput = ref(null);
const uploadStatus = ref(null);

const uploadForm = useForm({
    input_mode: 'file', // 'file' | 'link' | 'text'
    file: null,
    embed_url: '',
    rich_text: '',
    type: 'artifact', // Default to coursework/artifact
    course_name: '',
    week: '',
    grade: null
});

const maxWords = 500;

const wordCount = computed(() => {
    if (!uploadForm.rich_text) return 0;
    const words = uploadForm.rich_text.trim().split(/\s+/);
    return words.filter(w => w.length > 0).length;
});

const isTextExceeded = computed(() => {
    return wordCount.value > maxWords;
});

const handleDragOver = (e) => {
    e.preventDefault();
    dragOver.value = true;
};

const handleDragLeave = () => {
    dragOver.value = false;
};

const handleDrop = (e) => {
    e.preventDefault();
    dragOver.value = false;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type === 'application/pdf') {
            uploadForm.file = file;
        } else {
            alert('Only PDF files are supported.');
        }
    }
};

const triggerFileSelect = () => {
    fileInput.value.click();
};

const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
        uploadForm.file = e.target.files[0];
    }
};

const submitMaterial = () => {
    if (isLimitReached.value) return;
    if (uploadForm.input_mode === 'file' && !uploadForm.file) return;
    if (uploadForm.input_mode === 'link' && !uploadForm.embed_url) return;
    if (uploadForm.input_mode === 'text' && !uploadForm.rich_text) return;
    
    uploadStatus.value = 'uploading';
    uploadForm.post(route('study.store'), {
        forceFormData: true,
        onSuccess: () => {
            uploadForm.reset();
            uploadStatus.value = null;
        },
        onError: () => {
            uploadStatus.value = null;
        }
    });
};
</script>

<template>
    <div class="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/80 shadow-[0_10px_45px_-4px_rgba(0,0,0,0.03)] hover:shadow-2xl transition duration-500">
        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <PlusCircle class="h-5 w-5 text-indigo-500" />
            Add Course Material
        </h2>

        <form @submit.prevent="submitMaterial" class="space-y-6">
            <!-- Warning Limit Reached Banner -->
            <div v-if="isLimitReached" class="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 flex items-start gap-3">
                <span class="text-amber-500 text-base mt-0.5">⚠️</span>
                <div>
                    <h4 class="text-xs font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Upload Limit Reached (Max 6 Cards)</h4>
                    <p class="text-[11px] text-amber-600/80 dark:text-amber-500 mt-1 font-semibold leading-relaxed">
                        You have reached the maximum limit of 6 coursework cards. Please delete an existing card first to add new materials.
                    </p>
                </div>
            </div>

            <fieldset :disabled="isLimitReached" class="space-y-6 border-0 p-0 m-0">
                <!-- Input Format Tabs Selector -->
            <div>
                <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Input Format</label>
                <div class="grid grid-cols-3 gap-2 p-1 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                    <button 
                        type="button"
                        @click="uploadForm.input_mode = 'file'"
                        class="py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5"
                        :class="uploadForm.input_mode === 'file' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700/50' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'"
                    >
                        <FileText class="h-3.5 w-3.5" />
                        PDF File
                    </button>
                    <button 
                        type="button"
                        @click="uploadForm.input_mode = 'link'"
                        class="py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5"
                        :class="uploadForm.input_mode === 'link' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700/50' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'"
                    >
                        <Link2 class="h-3.5 w-3.5" />
                        Web Link
                    </button>
                    <button 
                        type="button"
                        @click="uploadForm.input_mode = 'text'"
                        class="py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5"
                        :class="uploadForm.input_mode === 'text' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700/50' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'"
                    >
                        <BookOpen class="h-3.5 w-3.5" />
                        Reflective Text
                    </button>
                </div>
            </div>

            <!-- Document Type Toggle -->
            <div>
                <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Material Category</label>
                <div class="grid grid-cols-2 gap-3 p-1 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                    <button 
                        type="button"
                        @click="uploadForm.type = 'context'"
                        class="py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2"
                        :class="uploadForm.type === 'context' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700/50' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'"
                    >
                        <BookOpen class="h-3.5 w-3.5" />
                        Context (Syllabus/Question)
                    </button>
                    <button 
                        type="button"
                        @click="uploadForm.type = 'artifact'"
                        class="py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2"
                        :class="uploadForm.type === 'artifact' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700/50' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'"
                    >
                        <FileText class="h-3.5 w-3.5" />
                        Artifact (Task Report/PPT)
                    </button>
                </div>
            </div>

            <!-- Course Name Input -->
            <div>
                <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">{{ $t('study_course_name', 'Course Name') }} *</label>
                <input 
                    v-model="uploadForm.course_name"
                    type="text" 
                    placeholder="e.g. Algoritma Pemrograman, Machine Learning"
                    required
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
                <InputError :message="uploadForm.errors.course_name" class="mt-1" />
            </div>

            <!-- Row: Period & Grade -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">{{ $t('study_week', 'Week / Period (Optional)') }}</label>
                    <input 
                        v-model="uploadForm.week"
                        type="text" 
                        placeholder="e.g. Week 4, Midterm Exam"
                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                    <InputError :message="uploadForm.errors.week" class="mt-1" />
                </div>
                <div>
                    <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">{{ $t('study_grade', 'Lecturer Grade / Score (Optional)') }}</label>
                    <input 
                        v-model="uploadForm.grade"
                        type="number" 
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="e.g. 85.50"
                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                    <InputError :message="uploadForm.errors.grade" class="mt-1" />
                </div>
            </div>

            <!-- Conditional Input Modes -->
            
            <!-- Mode 1: PDF Upload -->
            <div v-if="uploadForm.input_mode === 'file'" class="space-y-2">
                <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Upload Course PDF *</label>
                <div 
                    @dragover="handleDragOver"
                    @dragleave="handleDragLeave"
                    @drop="handleDrop"
                    @click="triggerFileSelect"
                    class="border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition duration-300 flex flex-col items-center justify-center gap-3 bg-slate-50/50 dark:bg-slate-950/30"
                    :class="[
                        dragOver ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30' : 'border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700',
                        uploadForm.file ? 'border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/10' : ''
                    ]"
                >
                    <input 
                        ref="fileInput"
                        type="file" 
                        accept="application/pdf"
                        class="hidden"
                        @change="handleFileSelect"
                    />
                    
                    <div v-if="!uploadForm.file" class="flex flex-col items-center gap-2">
                        <div class="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-sm text-slate-400 group-hover:scale-110 transition">
                            📥
                        </div>
                        <span class="text-sm font-bold text-slate-700 dark:text-slate-300">Drag & drop your PDF file here</span>
                        <span class="text-xs text-slate-400 dark:text-slate-500">or click to browse from files (Max 10MB)</span>
                    </div>
                    
                    <div v-else class="flex items-center gap-3">
                        <div class="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg font-bold">
                            ✓
                        </div>
                        <div class="text-left">
                            <p class="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[250px] md:max-w-[400px]">{{ uploadForm.file.name }}</p>
                            <p class="text-xs text-slate-400 dark:text-slate-500">{{ (uploadForm.file.size / 1024 / 1024).toFixed(2) }} MB</p>
                        </div>
                    </div>
                </div>
                <InputError :message="uploadForm.errors.file" class="mt-1" />
            </div>

            <!-- Mode 2: Web Link Embed -->
            <div v-if="uploadForm.input_mode === 'link'" class="space-y-2">
                <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Course Web Link (GitHub, Figma, YouTube, website) *</label>
                <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 select-none">
                        <Link2 class="h-4 w-4" />
                    </span>
                    <input 
                        v-model="uploadForm.embed_url"
                        type="url" 
                        placeholder="https://github.com/username/project or https://figma.com/..."
                        required
                        class="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>
                <p class="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                    Embed web demo, repository, or designs. Our ML classifier analyzes this content's meta tags.
                </p>
                <InputError :message="uploadForm.errors.embed_url" class="mt-1" />
            </div>

            <!-- Mode 3: Reflective Text Content -->
            <div v-if="uploadForm.input_mode === 'text'" class="space-y-2">
                <div class="flex justify-between items-center mb-1">
                    <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Reflective Text Content / Course Notes *</label>
                    <span class="text-xs font-bold" :class="isTextExceeded ? 'text-rose-500 animate-pulse' : 'text-slate-400 dark:text-slate-500'">
                        {{ wordCount }} / {{ maxWords }} words
                    </span>
                </div>
                <textarea 
                    v-model="uploadForm.rich_text"
                    rows="6"
                    placeholder="Write or paste assignment reflections, conceptual summaries, or project details..."
                    required
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-y"
                    :class="isTextExceeded ? 'border-rose-500 dark:border-rose-950 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800'"
                ></textarea>
                <p class="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                    Submit reflections, code notes, or markdown (Max 500 words). Our pipeline parses technical keywords directly.
                </p>
                <InputError :message="uploadForm.errors.rich_text" class="mt-1" />
            </div>

            <!-- Inertia upload progress -->
            <div v-if="uploadForm.progress" class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div class="bg-indigo-600 dark:bg-indigo-400 h-2.5 rounded-full transition-all duration-300" :style="`width: ${uploadForm.progress.percentage}%`"></div>
            </div>

            <!-- Submit Button -->
            <button 
                type="submit" 
                :disabled="uploadForm.processing || 
                           (uploadForm.input_mode === 'file' && !uploadForm.file) || 
                           (uploadForm.input_mode === 'link' && !uploadForm.embed_url) || 
                           (uploadForm.input_mode === 'text' && (!uploadForm.rich_text || isTextExceeded))"
                class="w-full py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                <span v-if="uploadForm.processing || uploadStatus === 'uploading'"><Loader2 class="h-4 w-4 animate-spin" /></span>
                <span v-else class="flex items-center gap-1.5">
                    Analyze with Machine Learning 
                    <Sparkles class="h-4 w-4 text-indigo-500 group-hover:animate-pulse" />
                </span>
            </button>
            </fieldset>
        </form>
    </div>
</template>
