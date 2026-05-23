<script setup>
import { Head, useForm, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { 
    GraduationCap, 
    Link2, 
    Copy,
    RefreshCw,
    Loader2,
    AlertCircle
} from 'lucide-vue-next';
import InputError from '@/Components/InputError.vue';

// Import subcomponents
import StudyUploadForm from './StudyUploadForm.vue';
import StudyMaterialList from './StudyMaterialList.vue';
import StudyCompetencyRadar from './StudyCompetencyRadar.vue';
import StudyArchetypeMatches from './StudyArchetypeMatches.vue';
import StudySettingsForm from './StudySettingsForm.vue';

const props = defineProps({
    materials: {
        type: Array,
        default: () => []
    },
    competency: {
        type: Object,
        default: null
    },
    user: {
        type: Object,
        required: true
    }
});

const copied = ref(false);

const usernameForm = useForm({
    username: props.user?.username || ''
});

const updateUsername = () => {
    usernameForm.post(route('study.username'), {
        preserveScroll: true
    });
};

const refreshData = () => {
    router.reload({ preserveScroll: true });
};

// Computations
const publicUrl = computed(() => {
    if (!props.user?.username) return '';
    return `${window.location.origin}/p/${props.user.username}`;
});

const copyLink = () => {
    if (!publicUrl.value) return;
    navigator.clipboard.writeText(publicUrl.value);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
};

const hasPendingFiles = computed(() => {
    return props.materials.some(m => m.status === 'processing');
});
</script>

<template>
    <Head :title="$t('nav_item_study', 'Study Console')" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors duration-500 relative overflow-hidden">
        <!-- Floating Glow effects for premium aesthetic -->
        <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

        <div class="relative mx-auto w-full max-w-[1600px] px-4 py-8 md:px-6 lg:px-8 z-10">
            
            <!-- Header Section -->
            <header class="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] tracking-[0.2em] uppercase shadow-sm mb-3">
                        <span class="flex h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
                        IPoW Protocol
                    </div>
                    <h1 class="text-3xl md:text-4xl font-[900] tracking-[-0.02em] text-slate-900 dark:text-white leading-[1.1] flex items-center gap-3">
                        <GraduationCap class="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                        {{ $t('study_title', 'Interactive Study Console') }}
                    </h1>
                    <p class="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl text-sm font-medium">
                        {{ $t('study_subtitle', 'Upload syllabus context and course artifacts. Map your skills and verify career archetype fits.') }}
                    </p>
                </div>

                <div class="flex items-center gap-3 self-start lg:self-auto">
                    <button 
                        @click="refreshData"
                        class="p-3 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 transition shadow-sm flex items-center justify-center gap-2 text-sm font-semibold"
                        :class="{'animate-spin': hasPendingFiles}"
                        title="Refresh data"
                    >
                        <RefreshCw class="h-4 w-4" />
                        <span class="hidden sm:inline">Refresh Status</span>
                    </button>
                </div>
            </header>

            <!-- Grid: Bento Style Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <!-- COLUMN 1: LEFT AREA (Upload & Materials) -->
                <div class="lg:col-span-7 flex flex-col gap-8">
                    
                    <!-- Card: Share & Username Configuration -->
                    <div class="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/80 shadow-[0_10px_45px_-4px_rgba(0,0,0,0.03)] hover:shadow-2xl transition duration-500">
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <Link2 class="h-5 w-5 text-indigo-500" />
                            {{ $t('study_public_url', 'Public Portfolio URL') }}
                        </h2>
                        <p class="text-slate-500 dark:text-slate-400 text-xs font-medium mb-6">
                            Configure your unique identifier to showcase your verified skills and coursework artifact audits to recruiters.
                        </p>

                        <!-- Share Link Indicator -->
                        <div v-if="props.user?.username" class="mb-6 p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/40 flex items-center justify-between gap-4">
                            <div class="min-w-0">
                                <span class="text-[10px] uppercase font-bold tracking-widest text-indigo-500 dark:text-indigo-400 block mb-1">Your Portfolio Page</span>
                                <a :href="publicUrl" target="_blank" class="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 underline break-all flex items-center gap-1">
                                    {{ publicUrl }}
                                    <span class="inline-block">↗</span>
                                </a>
                            </div>
                            <button 
                                @click="copyLink"
                                class="px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-200 transition-all flex items-center gap-2 shrink-0 shadow-sm"
                            >
                                <Copy class="h-3.5 w-3.5" />
                                {{ copied ? 'Copied!' : 'Copy' }}
                            </button>
                        </div>
                        
                        <div v-else class="mb-6 p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 flex items-start gap-3">
                            <AlertCircle class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 class="text-sm font-bold text-amber-800 dark:text-amber-400">Profile is not live yet</h4>
                                <p class="text-xs text-amber-600/80 dark:text-amber-500 mt-1">Set a unique username below to enable public recruiting view and stream materials.</p>
                            </div>
                        </div>

                        <!-- Form Username -->
                        <form @submit.prevent="updateUsername" class="flex flex-col sm:flex-row gap-3">
                            <div class="relative flex-1">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold select-none">oneformind.com/p/</span>
                                <input 
                                    v-model="usernameForm.username"
                                    type="text" 
                                    placeholder="your-name"
                                    class="w-full pl-[135px] pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                />
                            </div>
                            <button 
                                type="submit" 
                                :disabled="usernameForm.processing"
                                class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-md shadow-indigo-600/10 hover:shadow-lg transition duration-300 flex items-center justify-center gap-2 shrink-0"
                            >
                                <span v-if="usernameForm.processing"><Loader2 class="h-4 w-4 animate-spin" /></span>
                                <span v-else>{{ $t('study_save_username', 'Save URL') }}</span>
                            </button>
                        </form>
                        <InputError :message="usernameForm.errors.username" class="mt-2 pl-2" />
                    </div>

                    <!-- Component: Display Settings -->
                    <StudySettingsForm :settings="props.competency?.settings" />

                    <!-- Component: Upload Form -->
                    <StudyUploadForm :materials-count="props.materials.length" />

                    <!-- Component: List of Uploaded Materials -->
                    <StudyMaterialList :materials="props.materials" :user="props.user" />

                </div>

                <!-- COLUMN 2: RIGHT AREA (Competency & Match Archetypes) -->
                <div class="lg:col-span-5 flex flex-col gap-8">
                    
                    <!-- Component: Competency Radar Chart -->
                    <StudyCompetencyRadar :competency="props.competency" />

                    <!-- Component: Career Archetype Matches -->
                    <StudyArchetypeMatches :competency="props.competency" />

                </div>

            </div>

        </div>
    </div>
</template>

<style scoped>
@keyframes pulse-slow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.4; }
}
.animate-pulse-slow {
    animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
