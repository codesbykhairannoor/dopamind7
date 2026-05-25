<script setup>
import { useForm } from '@inertiajs/vue3';
import { ref, watch, reactive } from 'vue';
import { 
    X, Save, Info, Clock, GraduationCap, 
    Layout, Radar, Brain, Target, Loader2,
    BookOpen, FileText, Link2, PlusCircle, Trash2,
    File, Upload, AlertTriangle
} from 'lucide-vue-next';

const props = defineProps({
    show: Boolean,
    material: Object,
    userSettings: Object
});

const emit = defineEmits(['close', 'optimistic-update']);

const form = useForm({
    course_name: '',
    week: '',
    grade: '',
    context_link: '',
    context_link_name: '',
    context_text: '',
    artifact_link: '',
    artifact_link_name: '',
    artifact_text: '',
    context_files: [],
    artifact_files: [],
    delete_files: [], 
    show_radar: true,
    show_archetypes: true,
    show_materials: true,
    show_career_target: true,
    career_target: ''
});

const currentFiles = ref({
    context: [],
    artifact: []
});

const fileQueue = reactive({
    context: [], // [{file, name, size}]
    artifact: []
});

const contextFileInput = ref(null);
const artifactFileInput = ref(null);

watch(() => props.material, (newVal) => {
    if (newVal) {
        form.course_name = newVal.course_name || '';
        form.week = newVal.week || '';
        form.grade = newVal.grade || '';
        
        const getFiles = (data) => {
            if (!data) return [];
            let parsed = data;
            if (typeof data === 'string') {
                try { parsed = JSON.parse(data); } catch (e) { return []; }
            }
            return Array.isArray(parsed) ? parsed : (parsed.files || []);
        };

        const ctx = newVal.context_data || {};
        form.context_link = typeof ctx === 'string' ? '' : (ctx.link || '');
        form.context_link_name = typeof ctx === 'string' ? '' : (ctx.link_name || '');
        form.context_text = typeof ctx === 'string' ? '' : (ctx.text || '');
        currentFiles.value.context = getFiles(ctx);
        
        const art = newVal.artifact_data || {};
        form.artifact_link = typeof art === 'string' ? '' : (art.link || '');
        form.artifact_link_name = typeof art === 'string' ? '' : (art.link_name || '');
        form.artifact_text = typeof art === 'string' ? '' : (art.text || '');
        currentFiles.value.artifact = getFiles(art);

        form.context_files = [];
        form.artifact_files = [];
        form.delete_files = [];
        fileQueue.context = [];
        fileQueue.artifact = [];

        form.show_radar = props.userSettings?.show_radar ?? true;
        form.show_archetypes = props.userSettings?.show_archetypes ?? true;
        form.show_materials = props.userSettings?.show_materials ?? true;
        form.show_career_target = props.userSettings?.show_career_target ?? true;
        form.career_target = props.userSettings?.career_target ?? '';
    }
}, { immediate: true });

const addFilesToQueue = (type, files) => {
    if (!files) return;
    for (const file of files) {
        fileQueue[type].push({ file, name: file.name, size: file.size });
    }
    if (type === 'context') form.context_files = fileQueue.context.map(q => q.file);
    if (type === 'artifact') form.artifact_files = fileQueue.artifact.map(q => q.file);
};

const removeFromQueue = (type, index) => {
    fileQueue[type].splice(index, 1);
    if (type === 'context') form.context_files = fileQueue.context.map(q => q.file);
    if (type === 'artifact') form.artifact_files = fileQueue.artifact.map(q => q.file);
};

const toggleFileDeletion = (path) => {
    const idx = form.delete_files.indexOf(path);
    if (idx > -1) form.delete_files.splice(idx, 1);
    else form.delete_files.push(path);
};

const submit = () => {
    form.transform((data) => ({
        ...data,
        _method: 'PUT'
    })).post(route('study.update', props.material.id), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => emit('close'),
        onError: (err) => console.error('Update failed:', err)
    });
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/90 backdrop-blur-md" @click="emit('close')"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-5xl bg-white dark:bg-slate-950 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">
            
            <!-- Header -->
            <div class="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                <div class="flex items-center gap-4">
                    <div class="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center border border-indigo-100 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400">
                        <GraduationCap class="h-6 w-6" />
                    </div>
                    <div>
                        <h3 class="text-xl font-black text-slate-900 dark:text-white">{{ $t('study_edit_material') }}</h3>
                        <p class="text-xs font-bold text-slate-400 tracking-widest">{{ material?.course_name }} • IPoW Edit Mode</p>
                    </div>
                </div>
                <button @click="emit('close')" class="p-3 text-slate-400 hover:text-red-500 transition-colors">
                    <X class="h-6 w-6" />
                </button>
            </div>

            <div class="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <!-- Meta Info (Horizontal Row) -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <div class="md:col-span-6">
                        <label class="block text-[10px] font-black tracking-widest text-slate-400 mb-2">{{ $t('study_course_name') }}</label>
                        <input v-model="form.course_name" type="text" class="w-full px-5 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 transition" />
                    </div>
                    <div class="md:col-span-3">
                        <label class="block text-[10px] font-black tracking-widest text-slate-400 mb-2">{{ $t('study_week') }}</label>
                        <input v-model="form.week" type="text" class="w-full px-5 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 transition" />
                    </div>
                    <div class="md:col-span-3">
                        <label class="block text-[10px] font-black tracking-widest text-slate-400 mb-2">{{ $t('study_grade') }}</label>
                        <input v-model="form.grade" type="number" step="0.01" class="w-full px-5 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 transition" />
                    </div>
                </div>

                <!-- Two Panels -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    
                    <!-- Context Panel -->
                    <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-blue-100/60 dark:border-blue-900/30 overflow-hidden flex flex-col">
                        <div class="px-6 py-4 bg-blue-50/50 dark:bg-blue-950/20 border-b border-blue-100 dark:border-blue-900/30 flex items-center gap-3">
                            <BookOpen class="h-4 w-4 text-blue-500" />
                            <span class="text-xs font-black tracking-widest text-blue-600 dark:text-blue-400">{{ $t('study_context_evidence', 'Context Evidence') }}</span>
                        </div>
                        <div class="p-6 space-y-6 flex-1">
                            <div>
                                <label class="block text-[10px] font-black tracking-widest text-slate-400 mb-2">{{ $t('study_add_more_files', 'Add More Files') }}</label>
                                <input ref="contextFileInput" type="file" multiple class="hidden" @change="e => addFilesToQueue('context', e.target.files)" />
                                <div @click="contextFileInput.click()" class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center cursor-pointer hover:border-blue-400 transition bg-slate-50/50 dark:bg-slate-950/30">
                                    <Upload class="h-5 w-5 text-slate-400 mx-auto mb-2" />
                                    <span class="text-[11px] font-bold text-slate-500">{{ $t('study_drop_files_click', 'Drop files or click to browse') }}</span>
                                </div>
                                <div v-if="fileQueue.context.length > 0" class="mt-4 space-y-2">
                                    <div v-for="(f, i) in fileQueue.context" :key="i" class="flex items-center justify-between p-2.5 bg-blue-50/30 dark:bg-blue-950/20 rounded-xl border border-blue-100/50 dark:border-blue-900/30">
                                        <div class="flex items-center gap-2 overflow-hidden">
                                            <File class="h-3.5 w-3.5 text-blue-500" />
                                            <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate">{{ f.name }}</span>
                                        </div>
                                        <button @click="removeFromQueue('context', i)" class="text-red-500 p-1 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"><X class="h-3.5 w-3.5" /></button>
                                    </div>
                                </div>
                            </div>

                            <div v-if="currentFiles.context.length > 0">
                                <label class="block text-[10px] font-black tracking-widest text-slate-400 mb-2">{{ $t('study_current_evidence', 'Current Evidence (Saved)') }}</label>
                                <div class="space-y-2">
                                    <div v-for="file in currentFiles.context" :key="file.path" 
                                        class="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950"
                                        :class="{'opacity-50 line-through bg-red-50/10 border-red-200/50': form.delete_files.includes(file.path)}"
                                    >
                                        <div class="flex items-center gap-2 overflow-hidden flex-1">
                                            <a :href="route('study.file.download', { material: props.material.id, type: 'context', index: currentFiles.context.indexOf(file), view: 1 })" target="_blank" class="flex items-center gap-2 hover:text-indigo-500 transition max-w-full">
                                                <FileText class="h-3.5 w-3.5 text-slate-400" />
                                                <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 truncate">{{ file.name }}</span>
                                            </a>
                                        </div>
                                        <button type="button" @click="toggleFileDeletion(file.path)" class="text-[10px] font-black px-3 py-1 rounded-lg transition shrink-0" :class="form.delete_files.includes(file.path) ? 'text-blue-500' : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30'">
                                            {{ form.delete_files.includes(file.path) ? $t('study_restore', 'Restore') : $t('study_remove', 'Remove') }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <label class="block text-[10px] font-black tracking-widest text-slate-400 mb-2">{{ $t('study_reference_link', 'Reference Link') }}</label>
                                <div class="space-y-3">
                                    <input v-model="form.context_link" type="url" placeholder="https://..." class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold transition focus:ring-1 focus:ring-blue-500" />
                                    <input v-model="form.context_link_name" type="text" :placeholder="$t('study_context_link_name')" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold transition focus:ring-1 focus:ring-blue-500" />
                                </div>
                            </div>
                            
                            <!-- Text Mode -->
                            <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div class="flex justify-between items-center mb-2">
                                    <label class="block text-[10px] font-black tracking-widest text-slate-400">{{ $t('study_notes_label', 'Notes / Text') }}</label>
                                </div>
                                <textarea v-model="form.context_text" rows="4"
                                    :placeholder="$t('study_context_text_placeholder')"
                                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold transition focus:ring-1 focus:ring-blue-500 resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Artifact Panel -->
                    <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-emerald-100/60 dark:border-emerald-900/30 overflow-hidden flex flex-col">
                        <div class="px-6 py-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30 flex items-center gap-3">
                            <FileText class="h-4 w-4 text-emerald-500" />
                            <span class="text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400">{{ $t('study_artifact_deliverables', 'Artifact Deliverables') }}</span>
                        </div>
                        <div class="p-6 space-y-6 flex-1">
                            <div>
                                <label class="block text-[10px] font-black tracking-widest text-slate-400 mb-2">{{ $t('study_add_more_files', 'Add More Files') }}</label>
                                <input ref="artifactFileInput" type="file" multiple class="hidden" @change="e => addFilesToQueue('artifact', e.target.files)" />
                                <div @click="artifactFileInput.click()" class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center cursor-pointer hover:border-emerald-400 transition bg-slate-50/50 dark:bg-slate-950/30">
                                    <Upload class="h-5 w-5 text-slate-400 mx-auto mb-2" />
                                    <span class="text-[11px] font-bold text-slate-500">{{ $t('study_drop_files_click', 'Drop files or click to browse') }}</span>
                                </div>
                                <div v-if="fileQueue.artifact.length > 0" class="mt-4 space-y-2">
                                    <div v-for="(f, i) in fileQueue.artifact" :key="i" class="flex items-center justify-between p-2.5 bg-emerald-50/30 dark:bg-emerald-950/20 rounded-xl border border-emerald-100/50 dark:border-emerald-900/30">
                                        <div class="flex items-center gap-2 overflow-hidden">
                                            <File class="h-3.5 w-3.5 text-emerald-500" />
                                            <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate">{{ f.name }}</span>
                                        </div>
                                        <button @click="removeFromQueue('artifact', i)" class="text-red-500 p-1 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"><X class="h-3.5 w-3.5" /></button>
                                    </div>
                                </div>
                            </div>

                            <div v-if="currentFiles.artifact.length > 0">
                                <label class="block text-[10px] font-black tracking-widest text-slate-400 mb-2">{{ $t('study_current_artifacts', 'Current Artifacts (Saved)') }}</label>
                                <div class="space-y-2">
                                    <div v-for="file in currentFiles.artifact" :key="file.path" 
                                        class="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950"
                                        :class="{'opacity-50 line-through bg-red-50/10 border-red-200/50': form.delete_files.includes(file.path)}"
                                    >
                                        <div class="flex items-center gap-2 overflow-hidden">
                                            <FileText class="h-3.5 w-3.5 text-slate-400" />
                                            <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 truncate">{{ file.name }}</span>
                                        </div>
                                        <button type="button" @click="toggleFileDeletion(file.path)" class="text-[10px] font-black px-3 py-1 rounded-lg transition" :class="form.delete_files.includes(file.path) ? 'text-emerald-500' : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30'">
                                            {{ form.delete_files.includes(file.path) ? $t('study_restore', 'Restore') : $t('study_remove', 'Remove') }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <label class="block text-[10px] font-black tracking-widest text-slate-400 mb-2">{{ $t('study_deliverable_link', 'Deliverable Link') }}</label>
                                <div class="space-y-3">
                                    <input v-model="form.artifact_link" type="url" placeholder="https://github.com/..." class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold transition focus:ring-1 focus:ring-emerald-500" />
                                    <input v-model="form.artifact_link_name" type="text" :placeholder="$t('study_artifact_link_name')" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold transition focus:ring-1 focus:ring-emerald-500" />
                                </div>
                            </div>
                            
                            <!-- Text Mode -->
                            <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div class="flex justify-between items-center mb-2">
                                    <label class="block text-[10px] font-black tracking-widest text-slate-400">{{ $t('study_notes_label', 'Notes / Text') }}</label>
                                </div>
                                <textarea v-model="form.artifact_text" rows="4"
                                    :placeholder="$t('study_artifact_text_placeholder')"
                                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold transition focus:ring-1 focus:ring-emerald-500 resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Display Settings -->
                <div class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 mb-4">
                    <h4 class="text-[10px] font-black tracking-widest text-slate-400 mb-6">Visibility & Career Targets</h4>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <label v-for="setting in ['show_radar', 'show_archetypes', 'show_materials', 'show_career_target']" :key="setting" class="flex items-center gap-3 p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:border-indigo-300 transition group">
                            <div class="relative flex items-center">
                                <input type="checkbox" v-model="form[setting]" class="sr-only peer" />
                                <div class="w-9 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                            </div>
                            <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 tracking-tight group-hover:text-indigo-500 transition">{{ setting.replace('show_', '').replace('_', ' ') }}</span>
                        </label>
                    </div>
                    <div v-if="form.show_career_target" class="mt-6">
                        <label class="block text-[10px] font-black tracking-widest text-slate-400 mb-2">Custom Career Goal</label>
                        <input v-model="form.career_target" type="text" class="w-full px-5 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 transition" />
                    </div>
                </div>
            </div>

            <!-- Footer Actions -->
            <div class="p-6 md:p-8 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                <button type="button" @click="emit('close')" class="px-8 py-4 rounded-2xl text-sm font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition tracking-widest">
                    {{ $t('btn_cancel') }}
                </button>
                <button @click="submit" :disabled="form.processing" class="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-600/20 transition-all flex items-center gap-3 group">
                    <Loader2 v-if="form.processing" class="h-5 w-5 animate-spin" />
                    <Save v-else class="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>SAVE AUDIT DATA</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-scale-up {
    animation: scale-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes scale-up {
    0% { transform: scale(0.9) translateY(20px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #1e293b;
}
</style>
