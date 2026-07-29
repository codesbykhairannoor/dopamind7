<script setup>
import { ref, watch, onMounted } from 'vue';
import { router, Link, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import { 
    BookOpen, Clock, Link2, FileText, Loader2, CheckCircle2, 
    XCircle, Trash2, AlertTriangle, Edit3, ExternalLink, Download,
    FileSearch
} from 'lucide-vue-next';
import EditMaterialModal from './Portfolio/Components/EditMaterialModal.vue';

const props = defineProps({
    materials: { type: Array, default: () => [] },
    user: { type: Object, required: true },
    userSettings: { type: Object, default: () => ({}) }
});

const page = usePage();
const processedIds = ref(new Set());

const checkAndProcessMaterials = () => {
    let hasProcessing = false;
    
    props.materials.forEach(material => {
        if (material.status === 'processing') {
            hasProcessing = true;
            if (!processedIds.value.has(material.id)) {
                processedIds.value.add(material.id);
                // Trigger the background processing, which now returns immediately
                axios.post(route('study.portfolio.process', material.id)).catch(err => {
                    console.error('Processing trigger failed', err);
                });
            }
        }
    });

    // If there are materials still processing, poll the backend every 10 seconds instead of 3 to reduce DB load
    if (hasProcessing) {
        setTimeout(() => {
            router.reload({ 
                only: ['materials', 'competency'], 
                preserveScroll: true, 
                onSuccess: () => {
                    // Check again after reload
                    checkAndProcessMaterials();
                }
            });
        }, 10000);
    }
};

onMounted(() => {
    checkAndProcessMaterials();
});

watch(() => props.materials, (newMaterials, oldMaterials) => {
    checkAndProcessMaterials();
}, { deep: true });

const emit = defineEmits(['optimistic-delete', 'optimistic-update']);

const showDeleteModal = ref(false);
const materialToDeleteId = ref(null);
const showEditModal = ref(false);
const materialToEdit = ref(null);

const openDeleteModal = (id) => {
    materialToDeleteId.value = id;
    showDeleteModal.value = true;
};

const confirmDelete = () => {
    if (materialToDeleteId.value) {
        const id = materialToDeleteId.value;
        emit('optimistic-delete', id);
        showDeleteModal.value = false;
        
        router.delete(route('study.destroy', id), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => {
                materialToDeleteId.value = null;
            }
        });
    }
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    materialToDeleteId.value = null;
};

const openEditModal = (material) => {
    materialToEdit.value = material;
    showEditModal.value = true;
};

const copiedCardId = ref(null);

const copyCardLink = (id) => {
    if (!props.user?.username) return;
    const url = `${window.location.origin}/p/${props.user.username}/card/${id}`;
    navigator.clipboard.writeText(url);
    copiedCardId.value = id;
    setTimeout(() => {
        copiedCardId.value = null;
    }, 2000);
};

const getMaterialSummary = (data) => {
    if (!data) return 'None';
    
    // In case the backend sends it as a raw JSON string
    if (typeof data === 'string') {
        try { data = JSON.parse(data); } 
        catch (e) { return 'None'; }
    }
    
    const parts = [];
    if (data.files && data.files.length) parts.push(`${data.files.length} file(s)`);
    if (data.link) parts.push('1 link');
    if (data.text) parts.push('Notes');
    
    // For backward compatibility if it's an array of items
    if (Array.isArray(data)) {
        const fileCount = data.filter(i => i.type === 'file').length;
        const linkCount = data.filter(i => i.type === 'link').length;
        const hasText = data.some(i => i.type === 'text');
        if (fileCount) parts.push(`${fileCount} file(s)`);
        if (linkCount) parts.push(`${linkCount} link(s)`);
        if (hasText) parts.push('Notes');
    }
    return parts.length ? parts.join(', ') : 'None';
};

const parseData = (data) => {
    if (!data) return {};
    if (typeof data === 'string') {
        try { return JSON.parse(data); } catch(e) { return {}; }
    }
    return data;
};

const currentPdfStreamUrl = ref(null);
const currentViewerTitle = ref('');
const currentMaterialId = ref(null);
const isLoadingPdf = ref(false);

const viewFile = (materialId, type, index, name) => {
    const url = route('study.file.download', { material: materialId, type: type, index: index, view: 1 });
    window.open(url, '_blank');
};
</script>

<template>
    <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-10 rounded-[3rem] border border-slate-200/50 dark:border-slate-800/80 shadow-[0_10px_50px_-10px_rgba(0,0,0,0.05)] transition-all">
        <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <div class="h-10 w-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center border border-indigo-100/50 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                    <BookOpen class="h-5 w-5" />
                </div>
                {{ $t('study_coursework_materials') }}
            </h2>
            <div v-if="materials.length > 0" class="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500">
                {{ materials.length }} / 6 {{ $t('study_tab_cards') }}
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="materials.length === 0" class="py-20 text-center">
            <div class="h-20 w-20 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] flex items-center justify-center text-5xl mb-6 mx-auto animate-bounce-slow">
                📚
            </div>
            <h3 class="text-lg font-black text-slate-800 dark:text-slate-200 mb-2">{{ $t('study_no_coursework_materials') }}</h3>
            <p class="text-sm text-slate-400 dark:text-slate-500 max-w-sm mx-auto font-medium">
                {{ $t('study_empty_state') }}
            </p>
        </div>

        <!-- Materials List -->
        <div v-else class="grid grid-cols-1 gap-6">
            <div 
                v-for="material in materials" 
                :key="material.id"
                class="group p-6 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-900/40 rounded-[2.5rem] hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 relative overflow-hidden"
            >
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                    <div class="min-w-0 flex-1">
                        <!-- Badge Header -->
                        <div class="flex items-center gap-2 mb-3 flex-wrap">
                            <span v-if="material.metadata?.field_of_study" class="px-2.5 py-1 rounded-lg text-[9px] font-black tracking-wider bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/40">
                                {{ material.metadata.field_of_study }}
                            </span>

                            <!-- Period/Week -->
                            <span v-if="material.week" class="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-[9px] text-slate-400 dark:text-slate-500 font-black tracking-wider flex items-center gap-1.5">
                                <Clock class="h-3 w-3" />
                                {{ material.week }}
                            </span>

                            <!-- Grade/Score -->
                            <span v-if="material.grade !== null" class="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[9px] font-black tracking-wider border border-emerald-100/50 dark:border-emerald-900/40">
                                {{ $t('study_grade') }}: {{ material.grade }}
                            </span>
                        </div>

                        <h3 class="text-xl font-black text-slate-900 dark:text-white truncate mb-4">
                            {{ material.course_name }}
                        </h3>
                        
                        <!-- Content Details -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <!-- Context Section -->
                            <div v-if="material.context_data" class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50">
                                <div class="flex items-center gap-2 mb-3">
                                    <span class="text-[9px] font-black tracking-widest text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-1 rounded-md">{{ $t('study_context_badge') }}</span>
                                    <span class="text-[10px] font-bold text-slate-400">{{ getMaterialSummary(material.context_data) }}</span>
                                </div>
                                <div class="space-y-2">
                                    <template v-for="ctx in [parseData(material.context_data)]" :key="material.id + 'ctx'">
                                        <!-- New Object Structure -->
                                        <template v-if="!Array.isArray(ctx)">
                                            <a v-if="ctx.link" :href="ctx.link" target="_blank" class="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition">
                                                <ExternalLink class="h-3.5 w-3.5" /> {{ ctx.link_name || ctx.link }}
                                            </a>
                                            <div v-if="ctx.files && ctx.files.length" class="space-y-1.5">
                                                <div v-for="(file, idx) in ctx.files" :key="idx" class="flex items-center justify-between gap-2 p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 shadow-sm">
                                                    <span class="text-[10px] font-bold text-slate-500 truncate flex items-center gap-1.5">
                                                        <FileText class="h-3 w-3 text-slate-400" /> {{ file.name }}
                                                    </span>
                                                    <div class="flex items-center gap-1">
                                                        <button @click.prevent="viewFile(material.id, 'context', idx, file.name)" class="p-1.5 text-slate-400 hover:text-indigo-500 transition" :title="$t('study_view_pdf')">
                                                            <FileSearch class="h-3.5 w-3.5" />
                                                        </button>
                                                        <a :href="route('study.file.download', { material: material.id, type: 'context', index: idx })" download class="p-1.5 text-slate-400 hover:text-emerald-500 transition" :title="$t('study_download_pdf')">
                                                            <Download class="h-3.5 w-3.5" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                        <!-- Old Array Structure fallback -->
                                        <template v-else>
                                            <div v-for="(item, idx) in ctx" :key="idx">
                                                <a v-if="item.type === 'link'" :href="item.url" target="_blank" class="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition">
                                                    <ExternalLink class="h-3.5 w-3.5" /> {{ item.url }}
                                                </a>
                                                <div v-if="item.type === 'file'" class="flex items-center justify-between gap-2 p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 shadow-sm">
                                                    <span class="text-[10px] font-bold text-slate-500 truncate flex items-center gap-1.5">
                                                        <FileText class="h-3 w-3 text-slate-400" /> {{ item.name }}
                                                    </span>
                                                    <div class="flex items-center gap-1">
                                                        <button @click.prevent="viewFile(material.id, 'context', idx, item.name)" class="p-1.5 text-slate-400 hover:text-indigo-500 transition" :title="$t('study_view_pdf')">
                                                            <FileSearch class="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </template>
                                </div>
                            </div>

                            <!-- Artifact Section -->
                            <div v-if="material.artifact_data" class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50">
                                <div class="flex items-center gap-2 mb-3">
                                    <span class="text-[9px] font-black tracking-widest text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-md">{{ $t('study_artifact_badge') }}</span>
                                    <span class="text-[10px] font-bold text-slate-400">{{ getMaterialSummary(material.artifact_data) }}</span>
                                </div>
                                <div class="space-y-2">
                                    <template v-for="art in [parseData(material.artifact_data)]" :key="material.id + 'art'">
                                        <!-- New Object Structure -->
                                        <template v-if="!Array.isArray(art)">
                                            <a v-if="art.link" :href="art.link" target="_blank" class="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition">
                                                <ExternalLink class="h-3.5 w-3.5" /> {{ art.link_name || art.link }}
                                            </a>
                                            <div v-if="art.files && art.files.length" class="space-y-1.5">
                                                <div v-for="(file, idx) in art.files" :key="idx" class="flex items-center justify-between gap-2 p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 shadow-sm">
                                                    <span class="text-[10px] font-bold text-slate-500 truncate flex items-center gap-1.5">
                                                        <FileText class="h-3 w-3 text-slate-400" /> {{ file.name }}
                                                    </span>
                                                    <div class="flex items-center gap-1">
                                                        <button @click.prevent="viewFile(material.id, 'artifact', idx, file.name)" class="p-1.5 text-slate-400 hover:text-emerald-500 transition" :title="$t('study_view_pdf')">
                                                            <FileSearch class="h-3.5 w-3.5" />
                                                        </button>
                                                        <a :href="route('study.file.download', { material: material.id, type: 'artifact', index: idx })" download class="p-1.5 text-slate-400 hover:text-emerald-500 transition" :title="$t('study_download_pdf')">
                                                            <Download class="h-3.5 w-3.5" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                        <!-- Old Array Structure fallback -->
                                        <template v-else>
                                            <div v-for="(item, idx) in art" :key="idx">
                                                <a v-if="item.type === 'link'" :href="item.url" target="_blank" class="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition">
                                                    <ExternalLink class="h-3.5 w-3.5" /> {{ item.url }}
                                                </a>
                                                <div v-if="item.type === 'file'" class="flex items-center justify-between gap-2 p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 shadow-sm">
                                                    <span class="text-[10px] font-bold text-slate-500 truncate flex items-center gap-1.5">
                                                        <FileText class="h-3 w-3 text-slate-400" /> {{ item.name }}
                                                    </span>
                                                    <div class="flex items-center gap-1">
                                                        <button @click.prevent="viewFile(material.id, 'artifact', idx, item.name)" class="p-1.5 text-slate-400 hover:text-emerald-500 transition" :title="$t('study_view_pdf')">
                                                            <FileSearch class="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </div>


                        <!-- Competencies tags -->
                        <div v-if="material.metadata?.competencies" class="flex flex-wrap gap-2 mt-6">
                            <span 
                                v-for="(score, comp) in Object.entries(material.metadata.competencies).slice(0, 5).reduce((acc, [k,v]) => ({...acc, [k]:v}), {})" 
                                :key="comp"
                                class="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-black tracking-wider border border-slate-100 dark:border-slate-800 shadow-sm"
                            >
                                {{ comp }}
                            </span>
                            <span v-if="Object.keys(material.metadata.competencies).length > 5" class="text-[10px] text-slate-400 dark:text-slate-500 font-black self-center pl-2">
                                +{{ Object.keys(material.metadata.competencies).length - 5 }}
                            </span>
                        </div>
                    </div>

                    <div class="flex lg:flex-col items-center justify-between lg:justify-center gap-4 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-10 border-slate-100 dark:border-slate-900/60 min-w-[140px]">
                        <!-- Status Indicator -->
                        <div class="flex flex-col items-center gap-1">
                            <template v-if="material.status === 'processing'">
                                <Loader2 class="h-6 w-6 text-indigo-500 animate-spin" />
                                <span class="text-indigo-500 text-[10px] font-black tracking-widest">{{ $t('study_processing') }}</span>
                            </template>
                            <template v-else-if="material.status === 'completed'">
                                <CheckCircle2 class="h-6 w-6 text-emerald-500" />
                                <span class="text-slate-400 text-[10px] font-black tracking-widest">{{ $t('study_status_completed') }}</span>
                            </template>
                            <template v-else>
                                <XCircle class="h-6 w-6 text-red-500" />
                                <span class="text-red-500 text-[10px] font-black tracking-widest">{{ $t('study_status_failed') }}</span>
                            </template>
                        </div>

                        <!-- Actions Group -->
                        <div class="flex items-center gap-2">
                            <!-- Share -->
                            <button 
                                v-if="material.status === 'completed'"
                                @click="copyCardLink(material.id)"
                                class="p-3 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-2xl transition-all relative group/share"
                                :title="user?.username ? $t('study_share_card') : $t('study_share_no_username')"
                                :disabled="!user?.username"
                                :class="{'opacity-40 cursor-not-allowed': !user?.username}"
                            >
                                <Link2 class="h-5 w-5" />
                                <span v-if="copiedCardId === material.id" class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-[10px] rounded-xl font-black shadow-xl whitespace-nowrap z-20">
                                    {{ $t('study_share_copied') }}
                                </span>
                            </button>


                            <!-- Edit -->
                            <button 
                                @click="openEditModal(material)"
                                class="p-3 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-2xl transition-all"
                                :title="$t('study_edit')"
                            >
                                <Edit3 class="h-5 w-5" />
                            </button>

                            <!-- Delete -->
                            <button 
                                @click="openDeleteModal(material.id)"
                                class="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl transition-all"
                                :title="$t('study_delete')"
                            >
                                <Trash2 class="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Subtle Decorative Background -->
                <div class="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                    <BookOpen class="h-40 w-40" />
                </div>
            </div>
        </div>

        <!-- Modals -->
        <EditMaterialModal 
            :show="showEditModal"
            :material="materialToEdit"
            :userSettings="userSettings"
            @close="showEditModal = false"
            @optimistic-update="emit('optimistic-update', $event)"
        />

        <div v-if="showDeleteModal" class="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm" @click="closeDeleteModal"></div>
            <div class="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center animate-scale-up">
                <div class="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center mx-auto mb-6 text-red-500 shadow-inner">
                    <AlertTriangle class="h-10 w-10" />
                </div>
                <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">{{ $t('study_delete_confirm_title') }}</h3>
                <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                    {{ $t('study_delete_confirm_desc') }}
                </p>
                <div class="flex items-center gap-3">
                    <button @click="closeDeleteModal" class="flex-1 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-black text-xs tracking-widest transition">
                        {{ $t('btn_cancel') }}
                    </button>
                    <button @click="confirmDelete" class="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-red-500/20 transition active:scale-95">
                        {{ $t('study_delete_yes') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-bounce-slow {
    animation: bounce-slow 4s ease-in-out infinite;
}
@keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
}
.animate-scale-up {
    animation: scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes scale-up {
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
</style>
