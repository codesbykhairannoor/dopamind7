<script setup>
import { useForm, router } from '@inertiajs/vue3';
import { ref, computed, reactive } from 'vue';
import { 
    Sparkles, Loader2, Link2, BookOpen, FileText, PlusCircle,
    Upload, Trash2, CheckCircle2, XCircle, AlertTriangle, Files,
    Info, File
} from 'lucide-vue-next';

const props = defineProps({
    materials: { type: Array, default: () => [] },
    settings: { type: Object, default: () => ({}) }
});

const isLimitReached = computed(() => props.materials.length >= 6);
const slotsLeft = computed(() => Math.max(0, 6 - props.materials.length));

// ─── Shared Meta (Global for both panels) ─────────────────────────────────────
const sharedMeta = reactive({
    course_name: '',
    week: '',
    grade: '',
    show_radar: props.settings?.show_radar ?? true,
    show_archetypes: props.settings?.show_archetypes ?? true,
    show_materials: props.settings?.show_materials ?? true,
    show_career_target: props.settings?.show_career_target ?? true,
    career_target: props.settings?.career_target ?? ''
});

// ─── Factory: create a clean panel state ──────────────────────────────────────
const makePanel = (type) => ({
    type,
    embed_url: '',
    rich_text: '',
    fileQueue: [], // [{ file, name, size }]
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
        const alreadyAdded = panel.fileQueue.some(q => q.name === file.name && q.size === file.size);
        if (!alreadyAdded) {
            panel.fileQueue.push({ file, name: file.name, size: file.size });
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
const hasPendingItems = (panel) => {
    return panel.fileQueue.length > 0 || !!panel.embed_url.trim() || !!panel.rich_text.trim();
};

const submitAll = () => {
    if (!sharedMeta.course_name.trim()) {
        alert('Please enter a Course Name first.');
        return;
    }
    if (isLimitReached.value) {
        alert('Upload limit reached (Max 6 Cards).');
        return;
    }
    
    if (!hasPendingItems(contextPanel) && !hasPendingItems(artifactPanel)) {
        alert('Please add at least one context or artifact item to analyze.');
        return;
    }

    if (contextPanel.rich_text && wordCount(contextPanel.rich_text) > maxWords) {
        alert('Context text exceeds 500 words limit.'); return;
    }
    if (artifactPanel.rich_text && wordCount(artifactPanel.rich_text) > maxWords) {
        alert('Artifact text exceeds 500 words limit.'); return;
    }

    isSubmittingAll.value = true;

    // Use pure FormData to ensure arrays of files are handled properly
    const formData = new FormData();
    formData.append('course_name', sharedMeta.course_name);
    if (sharedMeta.week) formData.append('week', sharedMeta.week);
    if (sharedMeta.grade) formData.append('grade', sharedMeta.grade);

    if (contextPanel.embed_url) formData.append('context_link', contextPanel.embed_url);
    if (contextPanel.rich_text) formData.append('context_text', contextPanel.rich_text);
    contextPanel.fileQueue.forEach((q, i) => {
        formData.append(`context_files[${i}]`, q.file);
    });

    if (artifactPanel.embed_url) formData.append('artifact_link', artifactPanel.embed_url);
    if (artifactPanel.rich_text) formData.append('artifact_text', artifactPanel.rich_text);
    artifactPanel.fileQueue.forEach((q, i) => {
        formData.append(`artifact_files[${i}]`, q.file);
    });

    formData.append('show_radar', sharedMeta.show_radar);
    formData.append('show_archetypes', sharedMeta.show_archetypes);
    formData.append('show_materials', sharedMeta.show_materials);
    formData.append('show_career_target', sharedMeta.show_career_target);
    if (sharedMeta.career_target) formData.append('career_target', sharedMeta.career_target);

    router.post(route('study.store'), formData, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            contextPanel.fileQueue = [];
            contextPanel.embed_url = '';
            contextPanel.rich_text = '';
            artifactPanel.fileQueue = [];
            artifactPanel.embed_url = '';
            artifactPanel.rich_text = '';
            sharedMeta.course_name = '';
            sharedMeta.week = '';
            sharedMeta.grade = '';
            isSubmittingAll.value = false;
        },
        onError: (errors) => {
            isSubmittingAll.value = false;
            alert(Object.values(errors)[0] || 'Upload failed.');
        }
    });
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatBytes = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
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

            <!-- Settings Divider -->
            <div class="md:col-span-12 border-t border-slate-200/60 dark:border-slate-800/60 pt-4 mt-2">
                <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">{{ $t('study_display_settings', 'Display Settings') }}</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-3">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <div class="relative flex items-center">
                                <input type="checkbox" v-model="sharedMeta.show_radar" class="sr-only peer" />
                                <div class="w-10 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500"></div>
                            </div>
                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">{{ $t('study_setting_radar', 'Show Competency Radar') }}</span>
                        </label>

                        <label class="flex items-center gap-3 cursor-pointer group">
                            <div class="relative flex items-center">
                                <input type="checkbox" v-model="sharedMeta.show_archetypes" class="sr-only peer" />
                                <div class="w-10 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500"></div>
                            </div>
                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">{{ $t('study_setting_archetypes', 'Show Career Archetypes') }}</span>
                        </label>
                    </div>

                    <div class="flex flex-col gap-3">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <div class="relative flex items-center">
                                <input type="checkbox" v-model="sharedMeta.show_materials" class="sr-only peer" />
                                <div class="w-10 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500"></div>
                            </div>
                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">{{ $t('study_setting_materials', 'Show Coursework Materials') }}</span>
                        </label>

                        <label class="flex items-center gap-3 cursor-pointer group">
                            <div class="relative flex items-center">
                                <input type="checkbox" v-model="sharedMeta.show_career_target" class="sr-only peer" />
                                <div class="w-10 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-500"></div>
                            </div>
                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">{{ $t('study_setting_career_target', 'Show Career Target') }}</span>
                        </label>
                    </div>

                    <div v-if="sharedMeta.show_career_target" class="md:col-span-12 mt-2">
                        <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">{{ $t('study_career_target_input', 'Custom Career Goal') }}</label>
                        <input v-model="sharedMeta.career_target" type="text" placeholder="e.g. Machine Learning Engineer, Frontend Developer" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                    </div>
                </div>
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
            <div class="p-6 space-y-6">
                <!-- File Drop Zone -->
                <div>
                    <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Files</label>
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
                            class="flex items-center gap-3 p-3 rounded-xl border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition"
                        >
                            <File class="h-4 w-4 shrink-0 text-slate-400" />
                            <div class="flex-1 min-w-0">
                                <p class="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">{{ item.name }}</p>
                                <p class="text-[10px] text-slate-400">{{ formatBytes(item.size) }}</p>
                            </div>
                            <button type="button" @click.stop="removeFromQueue(contextPanel, idx)"
                                class="h-6 w-6 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition flex items-center justify-center shrink-0">
                                <Trash2 class="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Link Mode -->
                <div>
                    <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Link</label>
                    <div class="relative">
                        <span class="absolute left-4 top-4 text-slate-400"><Link2 class="h-4 w-4" /></span>
                        <textarea v-model="contextPanel.embed_url" rows="2" placeholder="https://github.com/...\n(Press Enter for multiple links)"
                            class="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"></textarea>
                    </div>
                </div>

                <!-- Text Mode -->
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <label class="text-[11px] font-black uppercase tracking-widest text-slate-400">Notes / Text</label>
                        <span class="text-[10px] font-bold" :class="wordCount(contextPanel.rich_text) > maxWords ? 'text-rose-500' : 'text-slate-400'">
                            {{ wordCount(contextPanel.rich_text) }}/{{ maxWords }}
                        </span>
                    </div>
                    <textarea v-model="contextPanel.rich_text" rows="4"
                        placeholder="Write or paste context details..."
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
            <div class="p-6 space-y-6">
                <!-- File Drop Zone -->
                <div>
                    <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Files</label>
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
                            class="flex items-center gap-3 p-3 rounded-xl border bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition"
                        >
                            <File class="h-4 w-4 shrink-0 text-slate-400" />
                            <div class="flex-1 min-w-0">
                                <p class="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">{{ item.name }}</p>
                                <p class="text-[10px] text-slate-400">{{ formatBytes(item.size) }}</p>
                            </div>
                            <button type="button" @click.stop="removeFromQueue(artifactPanel, idx)"
                                class="h-6 w-6 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition flex items-center justify-center shrink-0">
                                <Trash2 class="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Link Mode -->
                <div>
                    <label class="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Link</label>
                    <div class="relative">
                        <span class="absolute left-4 top-4 text-slate-400"><Link2 class="h-4 w-4" /></span>
                        <textarea v-model="artifactPanel.embed_url" rows="2" placeholder="https://github.com/...\n(Press Enter for multiple links)"
                            class="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"></textarea>
                    </div>
                </div>

                <!-- Text Mode -->
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <label class="text-[11px] font-black uppercase tracking-widest text-slate-400">Notes / Text</label>
                        <span class="text-[10px] font-bold" :class="wordCount(artifactPanel.rich_text) > maxWords ? 'text-rose-500' : 'text-slate-400'">
                            {{ wordCount(artifactPanel.rich_text) }}/{{ maxWords }}
                        </span>
                    </div>
                    <textarea v-model="artifactPanel.rich_text" rows="4"
                        placeholder="Write or paste artifact details..."
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
