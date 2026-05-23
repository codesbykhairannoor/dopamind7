<script setup>
import { useForm, router } from '@inertiajs/vue3';
import { ref, computed, reactive } from 'vue';
import { 
    Sparkles, Loader2, Link2, BookOpen, FileText, PlusCircle,
    Upload, Trash2, CheckCircle2, XCircle, AlertTriangle, Files,
    Info, File
} from 'lucide-vue-next';

const props = defineProps({
    materialsCount: { type: Number, default: 0 }
});

const isLimitReached = computed(() => props.materialsCount >= 6);
const slotsLeft = computed(() => Math.max(0, 6 - props.materialsCount));

// ─── Shared Meta (Global for both panels) ─────────────────────────────────────
const sharedMeta = reactive({
    course_name: '',
    week: '',
    grade: ''
});

// ─── Factory: create a clean panel state ──────────────────────────────────────
const makePanel = (type) => ({
    type,
    input_mode: 'file',       // 'file' | 'link' | 'text'
    embed_url: '',
    rich_text: '',
    // Multi-file queue (for PDF/DOCX/PPTX)
    fileQueue: [],            // [{ file, name, size, status: 'pending'|'uploading'|'done'|'error', error }]
    dragOver: false,
});

const contextPanel = reactive(makePanel('context'));
const artifactPanel = reactive(makePanel('artifact'));

const contextFileInput = ref(null);
const artifactFileInput = ref(null);

const isSubmittingAll = ref(false);

// ─── Computed ─────────────────────────────────────────────────────────────────
const wordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
};

const maxWords = 500;

// ─── File handling ────────────────────────────────────────────────────────────
const allowedExtensions = ['.pdf', '.docx', '.pptx'];
const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

const addFilesToQueue = (panel, files) => {
    if (!files || files.length === 0) return;
    for (const file of files) {
        const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        
        if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(ext)) {
            alert(`"${file.name}" is not supported. Only PDF, DOCX, and PPTX are allowed.`);
            continue;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert(`"${file.name}" exceeds the 10MB limit.`);
            continue;
        }
        // Check if already in queue
        const alreadyAdded = panel.fileQueue.some(q => q.name === file.name && q.size === file.size);
        if (!alreadyAdded) {
            panel.fileQueue.push({ file, name: file.name, size: file.size, status: 'pending', error: null });
        }
    }
};

const removeFromQueue = (panel, index) => {
    panel.fileQueue.splice(index, 1);
};

const handleDragOver = (panel, e) => { e.preventDefault(); panel.dragOver = true; };
const handleDragLeave = (panel) => { panel.dragOver = false; };
const handleDrop = (panel, e) => {
    e.preventDefault();
    panel.dragOver = false;
    addFilesToQueue(panel, e.dataTransfer.files);
};

const triggerFileInput = (panelType) => {
    if (panelType === 'context' && contextFileInput.value) contextFileInput.value.click();
    if (panelType === 'artifact' && artifactFileInput.value) artifactFileInput.value.click();
};

const handleFileSelect = (panel, e) => {
    addFilesToQueue(panel, e.target.files);
    e.target.value = ''; // Reset input so same file can be re-added after removal
};

// ─── Submit ───────────────────────────────────────────────────────────────────
const submitSingleFile = (panel, queueItem) => {
    return new Promise((resolve) => {
        queueItem.status = 'uploading';
        queueItem.error = null;

        const form = useForm({
            input_mode: 'file',
            file: queueItem.file,
            type: panel.type,
            course_name: sharedMeta.course_name,
            week: sharedMeta.week,
            grade: sharedMeta.grade || null,
        });

        form.post(route('study.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                queueItem.status = 'done';
                resolve(true);
            },
            onError: (errors) => {
                queueItem.status = 'error';
                queueItem.error = Object.values(errors)[0] || 'Upload failed.';
                resolve(false);
            },
        });
    });
};

const submitLinkOrText = (panel) => {
    return new Promise((resolve) => {
        const formData = {
            input_mode: panel.input_mode,
            type: panel.type,
            course_name: sharedMeta.course_name,
            week: sharedMeta.week,
            grade: sharedMeta.grade || null,
        };
        if (panel.input_mode === 'link') formData.embed_url = panel.embed_url;
        if (panel.input_mode === 'text') formData.rich_text = panel.rich_text;

        const form = useForm(formData);
        form.post(route('study.store'), {
            preserveScroll: true,
            onSuccess: () => resolve(true),
            onError: () => resolve(false),
        });
    });
};

const submitPanel = async (panel) => {
    if (panel.input_mode === 'link' && !panel.embed_url.trim()) return;
    if (panel.input_mode === 'text' && (!panel.rich_text.trim() || wordCount(panel.rich_text) > maxWords)) return;
    if (panel.input_mode === 'file' && panel.fileQueue.filter(f => f.status === 'pending').length === 0) return;

    if (panel.input_mode === 'file') {
        const pending = panel.fileQueue.filter(f => f.status === 'pending');
        for (const item of pending) {
            if (props.materialsCount >= 6) {
                item.status = 'error';
                item.error = 'Card limit (6) reached.';
                break;
            }
            await submitSingleFile(panel, item);
        }
        setTimeout(() => {
            panel.fileQueue = panel.fileQueue.filter(f => f.status !== 'done');
        }, 3000);
    } else {
        await submitLinkOrText(panel);
        panel.embed_url = '';
        panel.rich_text = '';
    }
};

const submitAll = async () => {
    if (!sharedMeta.course_name.trim()) {
        alert('Please enter a Course Name first.');
        return;
    }
    if (isLimitReached.value) {
        alert('Upload limit reached (Max 6 Cards).');
        return;
    }
    
    // Check if there's anything to submit at all
    const hasContext = hasPendingItems(contextPanel);
    const hasArtifact = hasPendingItems(artifactPanel);
    
    if (!hasContext && !hasArtifact) {
        alert('Please add at least one context or artifact file/link to analyze.');
        return;
    }

    isSubmittingAll.value = true;

    if (hasContext) await submitPanel(contextPanel);
    if (hasArtifact) await submitPanel(artifactPanel);

    isSubmittingAll.value = false;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatBytes = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

const hasPendingItems = (panel) => {
    if (panel.input_mode === 'file') return panel.fileQueue.some(f => f.status === 'pending');
    if (panel.input_mode === 'link') return !!panel.embed_url.trim();
    if (panel.input_mode === 'text') return !!panel.rich_text.trim() && wordCount(panel.rich_text) <= maxWords;
    return false;
};

const globalHasPending = computed(() => {
    return hasPendingItems(contextPanel) || hasPendingItems(artifactPanel);
});
</script>

<template>
    <!-- Global limit banner -->
    <div v-if="isLimitReached" class="mb-6 p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 flex items-start gap-3">
        <AlertTriangle class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
            <h4 class="text-xs font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Upload Limit Reached (Max 6 Cards)</h4>
            <p class="text-[11px] text-amber-600/80 dark:text-amber-500 mt-1 font-semibold">Delete an existing card to add more materials.</p>
        </div>
    </div>

    <!-- Slots left indicator -->
    <div v-else class="mb-5 flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500">
        <Files class="h-3.5 w-3.5" />
        <span>{{ slotsLeft }} card slot{{ slotsLeft !== 1 ? 's' : '' }} remaining</span>
        <div class="flex gap-1 ml-1">
            <span v-for="i in 6" :key="i"
                class="h-1.5 w-5 rounded-full transition"
                :class="i <= props.materialsCount ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'"
            ></span>
        </div>
    </div>

    <!-- ─── SHARED COURSE DETAILS (Top Section) ──────────────────────────────── -->
    <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/80 shadow-[0_10px_45px_-4px_rgba(0,0,0,0.03)] mb-6">
        <div class="flex items-center gap-3 mb-6">
            <div class="h-10 w-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center border border-indigo-100/50 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 shadow-sm">
                <Info class="h-5 w-5" />
            </div>
            <div>
                <h3 class="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">Course Information</h3>
                <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Set the basic details for the materials you are uploading below.</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
            <!-- Course Name -->
            <div class="md:col-span-6">
                <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('study_course_name', 'Course Name') }} *</label>
                <input v-model="sharedMeta.course_name" type="text"
                    placeholder="e.g. Algoritma Pemrograman, Machine Learning"
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
            </div>
            
            <!-- Week -->
            <div class="md:col-span-3">
                <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('study_week', 'Week / Period') }}</label>
                <input v-model="sharedMeta.week" type="text" placeholder="e.g. Week 4"
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
            </div>

            <!-- Grade -->
            <div class="md:col-span-3">
                <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('study_grade', 'Grade / Score') }}</label>
                <input v-model="sharedMeta.grade" type="number" min="0" max="100" step="0.01" placeholder="85.50"
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
            </div>
        </div>
    </div>

    <!-- Two-panel layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <!-- ── CONTEXT PANEL (Left / Blue) ─────────────────────────────────── -->
        <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-[2.5rem] border border-blue-100/60 dark:border-blue-900/30 shadow-[0_10px_45px_-4px_rgba(59,130,246,0.06)] overflow-hidden">
            <!-- Panel Header -->
            <div class="px-6 pt-6 pb-4 border-b border-blue-50 dark:border-blue-950/50">
                <div class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center border border-blue-200/50 dark:border-blue-800/30">
                        <BookOpen class="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h2 class="text-sm font-black text-slate-900 dark:text-white tracking-tight">Context</h2>
                        <p class="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Syllabus • Question Paper • Module</p>
                    </div>
                    <span class="ml-auto px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30">
                        Context
                    </span>
                </div>
            </div>

            <!-- Panel Form -->
            <div class="p-6 space-y-4">
                <!-- Input mode switcher -->
                <div class="flex gap-1 p-1 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 mb-6">
                    <button type="button" @click="contextPanel.input_mode = 'file'"
                        class="flex-1 py-2 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5"
                        :class="contextPanel.input_mode === 'file' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'">
                        <FileText class="h-3 w-3" /> File
                    </button>
                    <button type="button" @click="contextPanel.input_mode = 'link'"
                        class="flex-1 py-2 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5"
                        :class="contextPanel.input_mode === 'link' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'">
                        <Link2 class="h-3 w-3" /> Link
                    </button>
                    <button type="button" @click="contextPanel.input_mode = 'text'"
                        class="flex-1 py-2 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5"
                        :class="contextPanel.input_mode === 'text' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'">
                        <BookOpen class="h-3 w-3" /> Text
                    </button>
                </div>

                <!-- File Drop Zone -->
                <div v-if="contextPanel.input_mode === 'file'">
                    <input ref="contextFileInput" type="file" accept=".pdf,.docx,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation" multiple class="hidden"
                        @change="e => handleFileSelect(contextPanel, e)" />
                    <div
                        @dragover="e => handleDragOver(contextPanel, e)"
                        @dragleave="() => handleDragLeave(contextPanel)"
                        @drop="e => handleDrop(contextPanel, e)"
                        @click="triggerFileInput('context')"
                        class="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition duration-300 flex flex-col items-center gap-2"
                        :class="contextPanel.dragOver ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20' : 'border-slate-300 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 bg-slate-50/50 dark:bg-slate-950/30'"
                    >
                        <div class="h-10 w-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-sm text-xl">📥</div>
                        <span class="text-xs font-bold text-slate-600 dark:text-slate-400 mt-2">Drop files here or click to browse</span>
                        <span class="text-[10px] text-slate-400">PDF, DOCX, PPTX supported · Max 10MB each</span>
                    </div>

                    <!-- File Queue -->
                    <div v-if="contextPanel.fileQueue.length > 0" class="mt-4 space-y-2">
                        <div v-for="(item, idx) in contextPanel.fileQueue" :key="idx"
                            class="flex items-center gap-3 p-3 rounded-xl border transition"
                            :class="{
                                'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800': item.status === 'pending',
                                'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-900/30': item.status === 'uploading',
                                'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-900/30': item.status === 'done',
                                'bg-red-50/50 dark:bg-red-950/20 border-red-200/50 dark:border-red-900/30': item.status === 'error'
                            }"
                        >
                            <File class="h-4 w-4 shrink-0"
                                :class="{
                                    'text-slate-400': item.status === 'pending',
                                    'text-blue-500 animate-pulse': item.status === 'uploading',
                                    'text-emerald-500': item.status === 'done',
                                    'text-red-500': item.status === 'error'
                                }" />
                            <div class="flex-1 min-w-0">
                                <p class="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">{{ item.name }}</p>
                                <p v-if="item.status === 'error'" class="text-[10px] text-red-500 font-semibold">{{ item.error }}</p>
                                <p v-else class="text-[10px] text-slate-400">{{ formatBytes(item.size) }}</p>
                            </div>
                            <Loader2 v-if="item.status === 'uploading'" class="h-4 w-4 text-blue-500 animate-spin shrink-0" />
                            <CheckCircle2 v-else-if="item.status === 'done'" class="h-4 w-4 text-emerald-500 shrink-0" />
                            <XCircle v-else-if="item.status === 'error'" class="h-4 w-4 text-red-500 shrink-0" />
                            <button v-else type="button" @click="removeFromQueue(contextPanel, idx)"
                                class="h-6 w-6 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition flex items-center justify-center shrink-0">
                                <Trash2 class="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Link Mode -->
                <div v-else-if="contextPanel.input_mode === 'link'">
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Link2 class="h-4 w-4" /></span>
                        <input v-model="contextPanel.embed_url" type="url" placeholder="https://github.com/..."
                            class="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                    </div>
                </div>

                <!-- Text Mode -->
                <div v-else-if="contextPanel.input_mode === 'text'">
                    <div class="flex justify-between items-center mb-2">
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Reflective Notes</label>
                        <span class="text-[10px] font-bold" :class="wordCount(contextPanel.rich_text) > maxWords ? 'text-rose-500' : 'text-slate-400'">
                            {{ wordCount(contextPanel.rich_text) }}/{{ maxWords }}
                        </span>
                    </div>
                    <textarea v-model="contextPanel.rich_text" rows="5"
                        placeholder="Write or paste course reflections, conceptual summaries..."
                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                        :class="wordCount(contextPanel.rich_text) > maxWords ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'"
                    ></textarea>
                </div>
            </div>
        </div>

        <!-- ── ARTIFACT PANEL (Right / Emerald) ────────────────────────────── -->
        <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-[2.5rem] border border-emerald-100/60 dark:border-emerald-900/30 shadow-[0_10px_45px_-4px_rgba(16,185,129,0.06)] overflow-hidden">
            <!-- Panel Header -->
            <div class="px-6 pt-6 pb-4 border-b border-emerald-50 dark:border-emerald-950/50">
                <div class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/30">
                        <FileText class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <h2 class="text-sm font-black text-slate-900 dark:text-white tracking-tight">Artifact</h2>
                        <p class="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Task Report • Presentation • Code Project</p>
                    </div>
                    <span class="ml-auto px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30">
                        Artifact
                    </span>
                </div>
            </div>

            <!-- Panel Form -->
            <div class="p-6 space-y-4">
                <!-- Input mode switcher -->
                <div class="flex gap-1 p-1 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 mb-6">
                    <button type="button" @click="artifactPanel.input_mode = 'file'"
                        class="flex-1 py-2 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5"
                        :class="artifactPanel.input_mode === 'file' ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'">
                        <FileText class="h-3 w-3" /> File
                    </button>
                    <button type="button" @click="artifactPanel.input_mode = 'link'"
                        class="flex-1 py-2 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5"
                        :class="artifactPanel.input_mode === 'link' ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'">
                        <Link2 class="h-3 w-3" /> Link
                    </button>
                    <button type="button" @click="artifactPanel.input_mode = 'text'"
                        class="flex-1 py-2 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5"
                        :class="artifactPanel.input_mode === 'text' ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'">
                        <BookOpen class="h-3 w-3" /> Text
                    </button>
                </div>

                <!-- File Drop Zone -->
                <div v-if="artifactPanel.input_mode === 'file'">
                    <input ref="artifactFileInput" type="file" accept=".pdf,.docx,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation" multiple class="hidden"
                        @change="e => handleFileSelect(artifactPanel, e)" />
                    <div
                        @dragover="e => handleDragOver(artifactPanel, e)"
                        @dragleave="() => handleDragLeave(artifactPanel)"
                        @drop="e => handleDrop(artifactPanel, e)"
                        @click="triggerFileInput('artifact')"
                        class="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition duration-300 flex flex-col items-center gap-2"
                        :class="artifactPanel.dragOver ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20' : 'border-slate-300 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-700 bg-slate-50/50 dark:bg-slate-950/30'"
                    >
                        <div class="h-10 w-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-sm text-xl">📤</div>
                        <span class="text-xs font-bold text-slate-600 dark:text-slate-400 mt-2">Drop files here or click to browse</span>
                        <span class="text-[10px] text-slate-400">PDF, DOCX, PPTX supported · Max 10MB each</span>
                    </div>

                    <!-- File Queue -->
                    <div v-if="artifactPanel.fileQueue.length > 0" class="mt-4 space-y-2">
                        <div v-for="(item, idx) in artifactPanel.fileQueue" :key="idx"
                            class="flex items-center gap-3 p-3 rounded-xl border transition"
                            :class="{
                                'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800': item.status === 'pending',
                                'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-900/30': item.status === 'uploading',
                                'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300/50 dark:border-emerald-800/30': item.status === 'done',
                                'bg-red-50/50 dark:bg-red-950/20 border-red-200/50 dark:border-red-900/30': item.status === 'error'
                            }"
                        >
                            <File class="h-4 w-4 shrink-0"
                                :class="{
                                    'text-slate-400': item.status === 'pending',
                                    'text-emerald-500 animate-pulse': item.status === 'uploading',
                                    'text-emerald-500': item.status === 'done',
                                    'text-red-500': item.status === 'error'
                                }" />
                            <div class="flex-1 min-w-0">
                                <p class="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">{{ item.name }}</p>
                                <p v-if="item.status === 'error'" class="text-[10px] text-red-500 font-semibold">{{ item.error }}</p>
                                <p v-else class="text-[10px] text-slate-400">{{ formatBytes(item.size) }}</p>
                            </div>
                            <Loader2 v-if="item.status === 'uploading'" class="h-4 w-4 text-emerald-500 animate-spin shrink-0" />
                            <CheckCircle2 v-else-if="item.status === 'done'" class="h-4 w-4 text-emerald-500 shrink-0" />
                            <XCircle v-else-if="item.status === 'error'" class="h-4 w-4 text-red-500 shrink-0" />
                            <button v-else type="button" @click="removeFromQueue(artifactPanel, idx)"
                                class="h-6 w-6 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition flex items-center justify-center shrink-0">
                                <Trash2 class="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Link Mode -->
                <div v-else-if="artifactPanel.input_mode === 'link'">
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Link2 class="h-4 w-4" /></span>
                        <input v-model="artifactPanel.embed_url" type="url" placeholder="https://github.com/..."
                            class="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition" />
                    </div>
                </div>

                <!-- Text Mode -->
                <div v-else-if="artifactPanel.input_mode === 'text'">
                    <div class="flex justify-between items-center mb-2">
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Reflective Notes</label>
                        <span class="text-[10px] font-bold" :class="wordCount(artifactPanel.rich_text) > maxWords ? 'text-rose-500' : 'text-slate-400'">
                            {{ wordCount(artifactPanel.rich_text) }}/{{ maxWords }}
                        </span>
                    </div>
                    <textarea v-model="artifactPanel.rich_text" rows="5"
                        placeholder="Write or paste assignment reflections, project details..."
                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
                        :class="wordCount(artifactPanel.rich_text) > maxWords ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'"
                    ></textarea>
                </div>
            </div>
        </div>

    </div>

    <!-- SINGLE GLOBAL SUBMIT BUTTON -->
    <div class="flex justify-center mb-8">
        <button 
            type="button"
            @click="submitAll"
            :disabled="isSubmittingAll || isLimitReached || !globalHasPending"
            class="px-12 py-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-base rounded-3xl shadow-xl shadow-indigo-600/20 hover:shadow-2xl hover:shadow-indigo-600/30 transition-all flex items-center justify-center gap-3 group min-w-[300px]"
        >
            <Loader2 v-if="isSubmittingAll" class="h-6 w-6 animate-spin" />
            <span v-else class="flex items-center gap-2">
                Analyze Everything 
                <Sparkles class="h-5 w-5 group-hover:scale-110 transition-transform" />
            </span>
        </button>
    </div>

</template>
