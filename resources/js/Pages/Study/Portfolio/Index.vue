<script setup>
import { computed, ref, watch } from 'vue';
import { Head, Link, useForm, router } from '@inertiajs/vue3';
import { Sparkles, ArrowLeft, Link2, Copy, RefreshCw, CheckCircle2, Plus, X, ExternalLink, ShieldCheck } from 'lucide-vue-next';
import StudyUploadForm from '../StudyUploadForm.vue';
import StudyMaterialList from '../StudyMaterialList.vue';
import StudyCompetencyRadar from '../StudyCompetencyRadar.vue';
import StudyArchetypeMatches from '../StudyArchetypeMatches.vue';

const props = defineProps({
    materials: { type: Array, default: () => [] },
    competency: { type: Object, default: null },
    user: { type: Object, required: true }
});

const localMaterials = ref([...props.materials]);

watch(() => props.materials, (newVal) => {
    localMaterials.value = [...newVal];
}, { deep: true });

const handleOptimisticDelete = (id) => {
    localMaterials.value = localMaterials.value.filter(m => m.id !== id);
};

const handleOptimisticUpdate = (updatedMaterial) => {
    const index = localMaterials.value.findIndex(m => m.id === updatedMaterial.id);
    if (index !== -1) {
        localMaterials.value[index] = { ...localMaterials.value[index], ...updatedMaterial };
    }
};

const copied = ref(false);
const isUploadModalOpen = ref(false);

const usernameForm = useForm({
    username: props.user?.username || ''
});

const updateUsername = () => {
    usernameForm.post(route('study.username'), { preserveScroll: true });
};

const publicUrl = computed(() => {
    if (!props.user?.username) return '';
    return `${window.location.origin}/p/${props.user.username}`;
});

const copyLink = () => {
    if (!publicUrl.value) return;
    navigator.clipboard.writeText(publicUrl.value);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
};

const isRefreshing = ref(false);
const refreshData = () => {
    isRefreshing.value = true;
    router.reload({ preserveScroll: true, onFinish: () => { isRefreshing.value = false; } });
};

const hasPendingFiles = computed(() => localMaterials.value.some(m => m.status === 'processing'));

const openUploadModal = () => {
    isUploadModalOpen.value = true;
};

const closeUploadModal = () => {
    isUploadModalOpen.value = false;
};
</script>

<template>
    <Head :title="$t('study_neural_portfolio_title', 'Neural Portfolio')" />

    <div class="min-h-screen bg-white dark:bg-slate-950 pb-32 transition-colors overflow-x-hidden">
        <!-- Ambient Background Gradients -->
        <div class="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div class="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s"></div>
        </div>
        
        <!-- Header -->
        <header class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-5 flex items-center justify-between sticky top-0 z-50">
            <div class="flex items-center gap-5">
                <Link :href="route('study.index')" class="group p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-500 active:scale-90 border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                    <ArrowLeft class="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <h1 class="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1.5 tracking-tight">{{ $t('study_neural_portfolio_title', 'Neural Portfolio') }}</h1>
                    <div class="flex items-center gap-2">
                        <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p class="text-[10px] font-black text-indigo-500 tracking-[0.25em]">{{ $t('study_portfolio_subtitle', 'Ai Competency Showcase') }}</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <button @click="refreshData" :disabled="isRefreshing" 
                    class="flex items-center gap-2.5 px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-black text-[11px] tracking-wider transition-all active:scale-95 disabled:opacity-50 border border-slate-200/50 dark:border-slate-700/50 shadow-sm group">
                    <RefreshCw class="h-4 w-4" :class="{'animate-spin text-indigo-500': isRefreshing || hasPendingFiles, 'group-hover:rotate-180 transition-transform duration-500': !isRefreshing && !hasPendingFiles}" />
                    <span class="hidden md:inline">{{ hasPendingFiles ? $t('study_analyzing') : $t('study_refresh_data') }}</span>
                </button>

                <button @click="openUploadModal"
                    class="flex items-center gap-2.5 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-[11px] tracking-wider transition-all active:scale-95 shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 border border-indigo-500/50">
                    <Plus class="h-4 w-4" />
                    <span>{{ $t('study_new_analysis', 'Input Card') }}</span>
                </button>
            </div>
        </header>

        <main class="max-w-[1400px] mx-auto px-6 py-12 relative z-10">
            
            <!-- URL Identity Banner (Redesigned: "Neural Passport") -->
            <div class="mb-12 p-1 bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl shadow-indigo-500/5 border border-slate-200/50 dark:border-slate-800/50 overflow-hidden group">
                <div class="p-8 md:p-10 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-[3.25rem] flex flex-col md:flex-row items-center justify-between gap-10">
                    <div class="flex items-center gap-8">
                        <div class="relative">
                            <div class="h-20 w-20 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-600/30 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                <ShieldCheck class="h-10 w-10" />
                            </div>
                            <div class="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 flex items-center justify-center text-white">
                                <CheckCircle2 class="h-4 w-4" />
                            </div>
                        </div>
                        <div>
                            <h3 class="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{{ $t('study_public_url') }}</h3>
                            <p class="text-slate-500 dark:text-slate-400 text-sm font-semibold max-w-md">{{ $t('study_portfolio_url_desc') }}</p>
                        </div>
                    </div>

                    <div class="w-full md:w-auto min-w-[320px]">
                        <div v-if="!props.user.username" class="bg-slate-100 dark:bg-slate-800/50 p-2 rounded-[2rem] border border-slate-200 dark:border-slate-700/50">
                            <form @submit.prevent="updateUsername" class="flex items-center gap-2">
                                <input v-model="usernameForm.username" type="text" :placeholder="$t('study_username_placeholder')" required
                                    class="bg-transparent border-none rounded-2xl text-sm font-bold text-slate-800 dark:text-white placeholder-slate-400 focus:ring-0 w-full px-6" />
                                <button type="submit" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-[11px] tracking-widest shadow-lg active:scale-95 transition-all">
                                    {{ $t('study_save_username') }}
                                </button>
                            </form>
                        </div>
                        
                        <div v-else class="flex flex-col sm:flex-row items-center gap-4">
                            <div class="flex-1 bg-slate-100 dark:bg-slate-800/50 px-6 py-4 rounded-[2rem] border border-slate-200 dark:border-slate-700/50 flex items-center justify-between gap-4 group/url">
                                <span class="text-sm font-black text-slate-900 dark:text-white truncate max-w-[200px] tracking-tight">{{ publicUrl }}</span>
                                <button @click="copyLink" class="p-2.5 bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900 text-slate-400 hover:text-indigo-600 rounded-xl transition-all shadow-sm active:scale-90 border border-slate-100 dark:border-slate-600">
                                    <Copy v-if="!copied" class="h-4 w-4" />
                                    <CheckCircle2 v-else class="h-4 w-4 text-emerald-500" />
                                </button>
                            </div>
                            <a :href="publicUrl" target="_blank" class="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black text-[11px] tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3">
                                {{ $t('study_visit_link') }}
                                <ExternalLink class="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Layout Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                <!-- Left Column: Materials (8/12) -->
                <div class="lg:col-span-8">
                    <!-- Material List Component -->
                    <StudyMaterialList 
                        :materials="localMaterials" 
                        :user="props.user"
                        :userSettings="props.user.settings"
                        @optimistic-delete="handleOptimisticDelete"
                        @optimistic-update="handleOptimisticUpdate"
                    />
                    
                    <!-- Empty State CTA -->
                    <div v-if="localMaterials.length === 0" class="mt-12 text-center py-24 bg-slate-50/50 dark:bg-slate-900/30 rounded-[3.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 transition-all hover:bg-indigo-50/30 dark:hover:bg-indigo-950/10">
                        <div class="h-24 w-24 bg-white dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/10">
                            <Plus class="h-12 w-12 text-indigo-500" />
                        </div>
                        <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-3">{{ $t('study_get_started') }}</h3>
                        <p class="text-slate-500 dark:text-slate-400 text-base max-w-sm mx-auto mb-10 font-bold leading-relaxed">{{ $t('study_empty_portfolio_desc', 'Upload coursework materials to let our Ai build your verified neural competency profile.') }}</p>
                        <button @click="openUploadModal" class="px-12 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-black text-xs tracking-[0.2em] shadow-2xl shadow-indigo-600/30 transition-all hover:-translate-y-2 active:scale-95 border border-indigo-500/50">
                            {{ $t('study_start_analysis') }}
                        </button>
                    </div>
                </div>

                <!-- Right Column: AI Analysis (4/12) -->
                <div class="lg:col-span-4 space-y-12">
                    <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[3rem] border border-slate-200/50 dark:border-slate-800/50 p-10 shadow-2xl shadow-indigo-500/5">
                        <StudyCompetencyRadar :competency="props.competency" />
                    </div>

                    <div v-if="props.competency?.archetype_matches?.length > 0" class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[3rem] border border-slate-200/50 dark:border-slate-800/50 p-10 shadow-2xl shadow-indigo-500/5">
                        <StudyArchetypeMatches :matches="props.competency.archetype_matches" />
                    </div>
                </div>

            </div>

        </main>

        <!-- ─── PREMIUM UPLOAD MODAL ─── -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)"
                enter-from-class="opacity-0 scale-95 translate-y-10"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition duration-300 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-10"
            >
                <div v-if="isUploadModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-md" @click="closeUploadModal"></div>
                    
                    <!-- Modal Content -->
                    <div class="relative w-full max-w-6xl max-h-full overflow-hidden bg-white dark:bg-slate-950 rounded-[4rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col">
                        <!-- Modal Header -->
                        <div class="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl px-10 py-8 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                            <div class="flex items-center gap-5">
                                <div class="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-600/40 border border-indigo-500/50">
                                    <Sparkles class="h-7 w-7" />
                                </div>
                                <div>
                                    <h2 class="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">{{ $t('study_input_material', 'Analyze New Coursework') }}</h2>
                                    <div class="flex items-center gap-2">
                                        <span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                                        <p class="text-[10px] font-black text-slate-500 dark:text-slate-400 tracking-[0.3em]">{{ $t('study_neural_analysis', 'Neural Skill Mapping Engine') }}</p>
                                    </div>
                                </div>
                            </div>
                            <button @click="closeUploadModal" class="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-3xl transition-all text-slate-400 hover:text-slate-900 dark:hover:text-white active:scale-90">
                                <X class="h-8 w-8" />
                            </button>
                        </div>

                        <!-- Modal Body -->
                        <div class="flex-1 overflow-y-auto p-10 custom-scrollbar">
                            <div class="max-w-5xl mx-auto">
                                <StudyUploadForm :materials="localMaterials" @close="closeUploadModal" />
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-slate-200 dark:bg-slate-800 rounded-full;
}

@keyframes pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
}
.animate-pulse {
    animation: pulse 8s ease-in-out infinite;
}

.animate-scale-up {
    animation: scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes scale-up {
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
</style>

