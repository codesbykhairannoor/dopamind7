<script setup>
import { Head, useForm, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { trans } from 'laravel-vue-i18n';
import { 
    GraduationCap, 
    Link2, 
    Copy,
    RefreshCw,
    Loader2,
    AlertCircle,
    Upload,
    LayoutGrid,
    BarChart3,
    Settings2,
    CheckCircle2
} from 'lucide-vue-next';
import InputError from '@/Components/InputError.vue';

import StudyUploadForm from './StudyUploadForm.vue';
import StudyMaterialList from './StudyMaterialList.vue';
import StudyCompetencyRadar from './StudyCompetencyRadar.vue';
import StudyArchetypeMatches from './StudyArchetypeMatches.vue';

const props = defineProps({
    materials: { type: Array, default: () => [] },
    competency: { type: Object, default: null },
    user: { type: Object, required: true }
});

// ─── Tab config ───────────────────────────────────────────────────────────────
// NOTE: Use trans() here (script setup), NOT $t() which is template-only
const activeTab = ref('portfolio');

const tabDefs = [
    { key: 'upload',    icon: Upload,      labelKey: 'study_tab_upload',    label: 'Add Materials' },
    { key: 'portfolio', icon: LayoutGrid,  labelKey: 'study_tab_portfolio', label: 'My Portfolio' },
];

const tabBadge = computed(() => ({
    upload:    null,
    portfolio: props.materials.length > 0 ? props.materials.length : null,
}));

const badgeColorClass = (key, isActive) => {
    if (isActive) return 'bg-white text-indigo-600';
    if (key === 'portfolio' && props.user?.username) return 'bg-emerald-500 text-white';
    if (key === 'portfolio' && !props.user?.username) return 'bg-amber-500 text-white';
    return 'bg-indigo-600 text-white';
};

// ─── Username / Public URL ─────────────────────────────────────────────────────
const copied = ref(false);

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

// ─── Refresh ───────────────────────────────────────────────────────────────────
const isRefreshing = ref(false);
const refreshData = () => {
    isRefreshing.value = true;
    router.reload({ preserveScroll: true, onFinish: () => { isRefreshing.value = false; } });
};

const hasPendingFiles = computed(() => props.materials.some(m => m.status === 'processing'));
</script>

<template>
    <Head :title="$t('nav_item_study', 'Study Console')" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors duration-500 relative overflow-hidden">
        <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/8 dark:bg-indigo-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/8 dark:bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

        <div class="relative mx-auto w-full max-w-[1600px] px-4 py-6 md:px-6 md:py-8 lg:px-8 z-10">

            <!-- PAGE HEADER -->
            <header class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] tracking-[0.2em] uppercase shadow-sm mb-3">
                        <span class="flex h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
                        {{ $t('study_ipow_protocol', 'IPoW Protocol') }}
                    </div>
                    <h1 class="text-3xl md:text-4xl font-[900] tracking-[-0.02em] text-slate-900 dark:text-white leading-[1.1] flex items-center gap-3">
                        <GraduationCap class="h-8 w-8 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        {{ $t('study_title', 'Interactive Study Console') }}
                    </h1>
                    <p class="mt-2 text-slate-500 dark:text-slate-400 max-w-xl text-sm font-medium">
                        {{ $t('study_subtitle', 'Upload syllabus context and course artifacts. Map your skills and verify career archetype fits.') }}
                    </p>
                </div>

                <button 
                    @click="refreshData"
                    class="self-start sm:self-auto shrink-0 p-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 transition shadow-sm flex items-center gap-2 text-xs font-bold"
                >
                    <RefreshCw class="h-4 w-4" :class="{'animate-spin': isRefreshing || hasPendingFiles}" />
                    <span class="hidden sm:inline">{{ $t('study_refresh', 'Refresh') }}</span>
                </button>
            </header>

            <!-- TAB BAR -->
            <div class="mb-8 flex items-center gap-1 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 rounded-[1.75rem] p-1.5 shadow-sm">
                <button
                    v-for="tab in tabDefs"
                    :key="tab.key"
                    @click="activeTab = tab.key"
                    class="relative flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[1.4rem] text-xs font-bold transition-all duration-300 focus:outline-none"
                    :class="activeTab === tab.key
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'"
                >
                    <component :is="tab.icon" class="h-3.5 w-3.5 shrink-0" />
                    <span class="hidden sm:inline">{{ $t(tab.labelKey, tab.label) }}</span>

                    <span 
                        v-if="tabBadge[tab.key]"
                        class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[9px] font-black flex items-center justify-center leading-none"
                        :class="badgeColorClass(tab.key, activeTab === tab.key)"
                    >
                        {{ tabBadge[tab.key] }}
                    </span>
                </button>
            </div>

            <!-- TAB PANELS -->
            <Transition name="tab-fade" mode="out-in">

                <!-- ADD MATERIALS TAB -->
                <div v-if="activeTab === 'upload'" key="upload" class="flex flex-col gap-8">
                    <StudyUploadForm :materials="props.materials" :settings="props.competency?.settings" />
                </div>

                <!-- MY PORTFOLIO TAB -->
                <div v-else-if="activeTab === 'portfolio'" key="portfolio" class="flex flex-col gap-8">
                    
                    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <StudyCompetencyRadar :competency="props.competency" />
                        <StudyArchetypeMatches :competency="props.competency" />
                    </div>

                    <!-- Public URL Card -->
                    <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/80 shadow-[0_10px_45px_-4px_rgba(0,0,0,0.03)]">
                        <div class="flex items-center gap-3 mb-5">
                            <div class="h-10 w-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center border border-indigo-100/50 dark:border-indigo-900/50 shadow-sm">
                                <Link2 class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h2 class="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                                    {{ $t('study_public_url', 'Public Portfolio URL') }}
                                </h2>
                                <p class="text-slate-500 dark:text-slate-400 text-xs font-medium mt-0.5">
                                    {{ $t('study_portfolio_url_desc', 'Configure your unique identifier to showcase your verified skills to recruiters.') }}
                                </p>
                            </div>
                        </div>

                        <div v-if="props.user?.username" class="mb-5 p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between gap-4">
                            <div class="min-w-0 flex items-center gap-2">
                                <CheckCircle2 class="h-4 w-4 text-emerald-500 shrink-0" />
                                <a :href="publicUrl" target="_blank" class="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 underline break-all">
                                    {{ publicUrl }}
                                </a>
                            </div>
                            <button 
                                @click="copyLink"
                                class="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-200 transition flex items-center gap-1.5 shrink-0 shadow-sm"
                            >
                                <Copy class="h-3.5 w-3.5" />
                                {{ copied ? $t('study_share_copied', 'Copied!') : $t('study_copy_url', 'Copy') }}
                            </button>
                        </div>
                        
                        <div v-else class="mb-5 p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 flex items-start gap-3">
                            <AlertCircle class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 class="text-sm font-bold text-amber-800 dark:text-amber-400">{{ $t('study_profile_not_live', 'Profile is not live yet') }}</h4>
                                <p class="text-xs text-amber-600/80 dark:text-amber-500 mt-1">{{ $t('study_profile_not_live_desc', 'Set a unique username below to enable your public recruiting view.') }}</p>
                            </div>
                        </div>

                        <form @submit.prevent="updateUsername" class="flex flex-col sm:flex-row gap-3">
                            <div class="relative flex-1">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold select-none pointer-events-none">oneformind.com/p/</span>
                                <input 
                                    v-model="usernameForm.username"
                                    type="text" 
                                    :placeholder="$t('study_username_placeholder', 'your-name')"
                                    class="w-full pl-[148px] pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                />
                            </div>
                            <button 
                                type="submit" 
                                :disabled="usernameForm.processing"
                                class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-md shadow-indigo-600/10 transition flex items-center justify-center gap-2 shrink-0"
                            >
                                <Loader2 v-if="usernameForm.processing" class="h-4 w-4 animate-spin" />
                                <span v-else>{{ $t('study_save_username', 'Save URL') }}</span>
                            </button>
                        </form>
                        <InputError :message="usernameForm.errors.username" class="mt-2 pl-2" />
                    </div>

                    <StudyMaterialList :materials="props.materials" :user="props.user" />
                </div>

            </Transition>
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
.tab-fade-enter-active,
.tab-fade-leave-active {
    transition: opacity 0.18s ease, transform 0.18s ease;
}
.tab-fade-enter-from {
    opacity: 0;
    transform: translateY(6px);
}
.tab-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
