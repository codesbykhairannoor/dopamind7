<script setup>
import { computed, ref } from 'vue';
import { Head, Link, useForm, router } from '@inertiajs/vue3';
import { Sparkles, ArrowLeft, Link2, Copy, RefreshCw, CheckCircle2, Plus, X } from 'lucide-vue-next';
import StudyUploadForm from '../StudyUploadForm.vue';
import StudyMaterialList from '../StudyMaterialList.vue';
import StudyCompetencyRadar from '../StudyCompetencyRadar.vue';
import StudyArchetypeMatches from '../StudyArchetypeMatches.vue';

const props = defineProps({
    materials: { type: Array, default: () => [] },
    competency: { type: Object, default: null },
    user: { type: Object, required: true }
});

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

const hasPendingFiles = computed(() => props.materials.some(m => m.status === 'processing'));

const openUploadModal = () => {
    isUploadModalOpen.value = true;
};

const closeUploadModal = () => {
    isUploadModalOpen.value = false;
};
</script>

<template>
    <Head :title="$t('study_neural_portfolio_title', 'Neural Portfolio')" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors">
        
        <!-- Header -->
        <header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
            <div class="flex items-center gap-4">
                <Link :href="route('study.index')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                    <ArrowLeft class="h-5 w-5" />
                </Link>
                <div>
                    <h1 class="text-xl font-black text-slate-800 dark:text-white leading-none mb-1">{{ $t('study_neural_portfolio_title', 'Neural Portfolio') }}</h1>
                    <p class="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">{{ $t('study_portfolio_subtitle', 'AI Competency Showcase') }}</p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <!-- Global Refresh Button -->
                <button @click="refreshData" :disabled="isRefreshing" 
                    class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs transition-all active:scale-95 disabled:opacity-50 shadow-sm">
                    <RefreshCw class="h-4 w-4" :class="{'animate-spin text-indigo-500': isRefreshing || hasPendingFiles}" />
                    <span class="hidden sm:inline">{{ hasPendingFiles ? $t('study_analyzing') : $t('study_refresh_data') }}</span>
                </button>

                <!-- New Analysis Button -->
                <button @click="openUploadModal"
                    class="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-xs transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
                    <Plus class="h-4 w-4" />
                    <span>{{ $t('study_new_analysis', 'Input Card') }}</span>
                </button>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 py-8">
            
            <!-- URL Identity Banner -->
            <div class="mb-8 p-8 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                
                <div class="flex items-center gap-6 relative z-10">
                    <div class="p-4 bg-white/20 rounded-[1.5rem] backdrop-blur-md border border-white/20 shadow-inner">
                        <Link2 class="h-10 w-10 text-white" />
                    </div>
                    <div>
                        <h3 class="text-2xl font-black leading-tight mb-1">{{ $t('study_public_url', 'Public URL') }}</h3>
                        <p class="text-indigo-50 text-sm font-medium opacity-90">{{ $t('study_portfolio_url_desc', 'Atur identitas unik Anda untuk menampilkan keahlian terverifikasi kepada rekruter.') }}</p>
                    </div>
                </div>

                <div class="w-full md:w-auto bg-black/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/10 relative z-10">
                    <form v-if="!props.user.username" @submit.prevent="updateUsername" class="flex items-center gap-2">
                        <input v-model="usernameForm.username" type="text" :placeholder="$t('study_username_placeholder', 'Username...')" required
                            class="bg-white/10 text-white placeholder-white/40 border-none rounded-xl text-sm focus:ring-2 focus:ring-white/50 w-full sm:w-48" />
                        <button type="submit" class="bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-black text-xs hover:bg-indigo-50 transition-colors shadow-lg active:scale-95">
                            {{ $t('study_claim_url', 'Claim URL') }}
                        </button>
                    </form>
                    
                    <div v-else class="flex items-center gap-3 px-4 py-1.5">
                        <a :href="publicUrl" target="_blank" class="text-sm font-black hover:underline text-white truncate max-w-[200px] md:max-w-xs tracking-tight">
                            {{ publicUrl }}
                        </a>
                        <div class="flex items-center gap-1">
                            <button @click="copyLink" class="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all active:scale-90 border border-white/10" :title="$t('study_copy_link', 'Salin Link')">
                                <Copy v-if="!copied" class="h-4 w-4 text-white" />
                                <CheckCircle2 v-else class="h-4 w-4 text-emerald-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Layout Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                <!-- Left Column: Materials -->
                <div class="lg:col-span-2">
                    <!-- Material List Component -->
                    <StudyMaterialList :materials="props.materials" />
                    
                    <!-- Empty State CTA -->
                    <div v-if="props.materials.length === 0" class="mt-8 text-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <div class="h-20 w-20 bg-indigo-50 dark:bg-indigo-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Plus class="h-10 w-10 text-indigo-500" />
                        </div>
                        <h3 class="text-xl font-black text-slate-700 dark:text-slate-200 mb-2">{{ $t('study_get_started', 'Ready to verify your skills?') }}</h3>
                        <p class="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto mb-8 font-medium">{{ $t('study_empty_portfolio_desc', 'Upload your coursework materials to let our AI analyze and build your competency profile.') }}</p>
                        <button @click="openUploadModal" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1">
                            {{ $t('study_start_analysis', 'Start AI Analysis') }}
                        </button>
                    </div>
                </div>

                <!-- Right Column: AI Analysis -->
                <div class="lg:col-span-1 space-y-10">
                    <div class="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]">
                        <StudyCompetencyRadar :competency="props.competency" />
                    </div>

                    <div v-if="props.competency?.archetype_matches?.length > 0" class="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]">
                        <StudyArchetypeMatches :matches="props.competency.archetype_matches" />
                    </div>
                </div>

            </div>

        </div>

        <!-- ─── PREMIUM UPLOAD MODAL ─── -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
            >
                <div v-if="isUploadModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeUploadModal"></div>
                    
                    <!-- Modal Content -->
                    <div class="relative w-full max-w-5xl max-h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col custom-scrollbar">
                        <!-- Modal Header -->
                        <div class="sticky top-0 z-10 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                                    <Sparkles class="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 class="text-xl font-black text-slate-800 dark:text-white leading-tight">{{ $t('study_input_material', 'Input Study Material') }}</h2>
                                    <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{{ $t('study_neural_analysis', 'Neural AI Analysis') }}</p>
                                </div>
                            </div>
                            <button @click="closeUploadModal" class="p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-2xl transition-colors text-slate-500">
                                <X class="h-6 w-6" />
                            </button>
                        </div>

                        <!-- Modal Body -->
                        <div class="p-8">
                            <StudyUploadForm :materials="props.materials" @close="closeUploadModal" />
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
</style>

