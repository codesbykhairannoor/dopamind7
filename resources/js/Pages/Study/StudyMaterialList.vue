<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { 
    BookOpen, 
    Clock, 
    Link2, 
    FileText, 
    Loader2, 
    CheckCircle2, 
    XCircle, 
    Trash2,
    AlertTriangle
} from 'lucide-vue-next';

const props = defineProps({
    materials: {
        type: Array,
        default: () => []
    },
    user: {
        type: Object,
        required: true
    }
});

const showDeleteModal = ref(false);
const materialToDelete = ref(null);

const openDeleteModal = (id) => {
    materialToDelete.value = id;
    showDeleteModal.value = true;
};

const confirmDelete = () => {
    if (materialToDelete.value) {
        router.delete(route('study.destroy', materialToDelete.value), {
            preserveScroll: true,
            onSuccess: () => {
                showDeleteModal.value = false;
                materialToDelete.value = null;
            }
        });
    }
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    materialToDelete.value = null;
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
        const parts = [];
        if (data.files && data.files.length) parts.push(`${data.files.length} file(s)`);
        if (data.link) parts.push('1 link');
        if (data.text) parts.push('Notes');
        return parts.length ? parts.join(', ') : 'None';
    };
</script>

<template>
    <div class="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/80 shadow-[0_10px_45px_-4px_rgba(0,0,0,0.03)] hover:shadow-2xl transition duration-500">
        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen class="h-5 w-5 text-indigo-500" />
            {{ $t('study_coursework_materials', 'Coursework Materials') }}
        </h2>

        <!-- Empty State -->
        <div v-if="materials.length === 0" class="py-16 text-center">
            <div class="h-16 w-16 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] flex items-center justify-center text-4xl mb-4 mx-auto animate-bounce-slow">
                📚
            </div>
            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{{ $t('study_no_academic_docs', 'No Academic Documents') }}</h3>
            <p class="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto px-4">
                {{ $t('study_empty_state', 'No study materials uploaded yet. Upload your syllabus or task reports to begin building your neural competency profile.') }}
            </p>
        </div>

        <!-- Materials List -->
        <div v-else class="space-y-4">
            <div 
                v-for="material in materials" 
                :key="material.id"
                class="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900/40 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div class="min-w-0">
                    <!-- Badge Header -->
                    <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span v-if="material.metadata?.field_of_study" class="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/40">
                            {{ material.metadata.field_of_study }}
                        </span>

                        <!-- Period/Week -->
                        <span v-if="material.week" class="text-[10px] text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1">
                            <Clock class="h-3 w-3" />
                            {{ material.week }}
                        </span>

                        <!-- Grade/Score -->
                        <span v-if="material.grade !== null" class="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">
                            Grade: {{ material.grade }}
                        </span>
                    </div>

                    <h3 class="text-sm font-extrabold text-slate-800 dark:text-slate-200 truncate">
                        {{ material.course_name }}
                    </h3>
                    
                    <div class="mt-2 text-xs text-slate-400 dark:text-slate-500 flex flex-col gap-1">
                        <div v-if="material.context_data" class="flex items-center gap-2">
                            <span class="text-[9px] font-bold uppercase text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 px-1.5 py-0.5 rounded">Context</span>
                            <span class="truncate">{{ getMaterialSummary(material.context_data) }}</span>
                        </div>
                        <div v-if="material.artifact_data" class="flex items-center gap-2">
                            <span class="text-[9px] font-bold uppercase text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 px-1.5 py-0.5 rounded">Artifact</span>
                            <span class="truncate">{{ getMaterialSummary(material.artifact_data) }}</span>
                        </div>
                    </div>

                    <!-- Competencies tags -->
                    <div v-if="material.metadata?.competencies" class="flex flex-wrap gap-1.5 mt-3">
                        <span 
                            v-for="(score, comp) in Object.entries(material.metadata.competencies).slice(0, 4).reduce((acc, [k,v]) => ({...acc, [k]:v}), {})" 
                            :key="comp"
                            class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-bold border border-slate-200/30 dark:border-slate-700/30"
                        >
                            {{ comp }}
                        </span>
                        <span v-if="Object.keys(material.metadata.competencies).length > 4" class="text-[9px] text-slate-400 dark:text-slate-500 font-bold self-center pl-1">
                            +{{ Object.keys(material.metadata.competencies).length - 4 }} more
                        </span>
                    </div>
                </div>

                <div class="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-900/40">
                    <!-- Status Indicator -->
                    <div class="flex items-center gap-1.5 text-xs font-bold">
                        <template v-if="material.status === 'processing'">
                            <Loader2 class="h-3.5 w-3.5 text-indigo-500 animate-spin" />
                            <span class="text-indigo-500 text-[11px]">{{ $t('study_processing', 'Processing...') }}</span>
                        </template>
                        <template v-else-if="material.status === 'completed'">
                            <CheckCircle2 class="h-3.5 w-3.5 text-emerald-500" />
                            <span class="text-slate-500 dark:text-slate-400 text-[11px] hidden sm:inline">{{ $t('study_status_completed', 'Parsed') }}</span>
                        </template>
                        <template v-else>
                            <XCircle class="h-3.5 w-3.5 text-red-500" />
                            <span class="text-red-500 text-[11px]">{{ $t('study_status_failed', 'Failed') }}</span>
                        </template>
                    </div>

                    <!-- Share Card Action -->
                    <button 
                        v-if="material.status === 'completed'"
                        @click="copyCardLink(material.id)"
                        class="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-xl transition relative"
                        :title="user?.username ? $t('study_share_card', 'Copy Shareable Link') : $t('study_share_no_username', 'Set a username to share this card')"
                        :disabled="!user?.username"
                        :class="{'opacity-40 cursor-not-allowed': !user?.username}"
                    >
                        <Link2 class="h-4 w-4" />
                        <span v-if="copiedCardId === material.id" class="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-[10px] rounded font-bold shadow-md whitespace-nowrap z-20">
                            {{ $t('study_share_copied', 'Copied!') }}
                        </span>
                    </button>

                    <!-- Delete Action -->
                    <button 
                        @click="openDeleteModal(material.id)"
                        class="p-2 bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-xl transition"
                        title="Delete Material"
                    >
                        <Trash2 class="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Custom Delete Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm" @click="closeDeleteModal"></div>

            <!-- Modal Content -->
            <div class="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center animate-scale-up">
                <div class="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center mx-auto mb-4 text-red-500">
                    <AlertTriangle class="h-8 w-8" />
                </div>
                <h3 class="text-lg font-black text-slate-900 dark:text-white mb-2">{{ $t('study_delete_confirm_title', 'Delete Coursework?') }}</h3>
                <p class="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6">
                    {{ $t('study_delete_confirm_desc', 'Are you sure you want to delete this material? This will recalculate your competency profile and AI insights.') }}
                </p>
                <div class="flex items-center gap-3 w-full">
                    <button 
                        @click="closeDeleteModal"
                        class="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm transition"
                    >
                        {{ $t('study_delete_cancel', 'No, Keep it') }}
                    </button>
                    <button 
                        @click="confirmDelete"
                        class="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-500/20 transition"
                    >
                        {{ $t('study_delete_yes', 'Yes, Delete') }}
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
    50% { transform: translateY(-8px); }
}
</style>
