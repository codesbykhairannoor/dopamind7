<script setup>
import { computed, ref } from 'vue';
import { Head, Link, useForm, router } from '@inertiajs/vue3';
import { Sparkles, ArrowLeft, Link2, Copy, RefreshCw, CheckCircle2 } from 'lucide-vue-next';
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
</script>

<template>
    <Head title="{{ $t('study_neural_portfolio_title', 'Neural Portfolio') }}" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors">
        
        <!-- Header -->
        <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
            <div class="flex items-center gap-4">
                <Link :href="route('study.index')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                    <ArrowLeft class="h-5 w-5" />
                </Link>
                <div>
                    <h1 class="text-xl font-black text-slate-800 dark:text-white">{{ $t('study_neural_portfolio_title', 'Neural Portfolio') }}</h1>
                    <p class="text-xs font-bold text-indigo-500 uppercase tracking-widest">{{ $t('study_portfolio_subtitle', 'AI Competency Showcase') }}</p>
                </div>
            </div>

            <!-- Global Refresh Button -->
            <button @click="refreshData" :disabled="isRefreshing" 
                class="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs transition-colors disabled:opacity-50">
                <RefreshCw class="h-4 w-4" :class="{'animate-spin text-indigo-500': isRefreshing || hasPendingFiles}" />
                <span class="hidden md:inline">{{ hasPendingFiles ? 'Sedang Menganalisis...' : $t('study_refresh_data', 'Refresh Data') }}</span>
            </button>
        </header>

        <div class="max-w-7xl mx-auto px-4 py-8">
            
            <!-- URL Identity Banner -->
            <div class="mb-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-4">
                    <div class="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <Link2 class="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h3 class="text-lg font-black leading-tight">{{ $t('study_public_url', 'URL Portofolio Publik') }}</h3>
                        <p class="text-indigo-100 text-sm">{{ $t('study_portfolio_url_desc', 'Atur identitas unik Anda untuk menampilkan keahlian terverifikasi kepada rekruter.') }}</p>
                    </div>
                </div>

                <div class="w-full md:w-auto bg-white/10 p-2 rounded-2xl backdrop-blur-sm border border-white/20">
                    <form v-if="!props.user.username" @submit.prevent="updateUsername" class="flex items-center gap-2">
                        <input v-model="usernameForm.username" type="text" :placeholder="$t('study_username_placeholder', 'Masukkan username unik')" required
                            class="bg-black/20 text-white placeholder-white/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-white" />
                        <button type="submit" class="bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-50 transition">
                            {{ $t('study_claim_url', 'Klaim URL') }}
                        </button>
                    </form>
                    
                    <div v-else class="flex items-center gap-3 px-3 py-1">
                        <a :href="publicUrl" target="_blank" class="text-sm font-semibold hover:underline text-white truncate max-w-[200px] md:max-w-xs">
                            {{ publicUrl }}
                        </a>
                        <button @click="copyLink" class="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition" :title="$t('study_copy_link', 'Salin Link')">
                            <Copy v-if="!copied" class="h-4 w-4 text-white" />
                            <CheckCircle2 v-else class="h-4 w-4 text-emerald-300" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Main Layout Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <!-- Left Column: Upload & Materials -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Upload Form Component -->
                    <StudyUploadForm />
                    
                    <!-- Material List Component -->
                    <StudyMaterialList :materials="props.materials" />
                </div>

                <!-- Right Column: AI Analysis -->
                <div class="lg:col-span-1 space-y-8">
                    <div class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <StudyCompetencyRadar :competency="props.competency" />
                    </div>

                    <div v-if="props.competency?.archetype_matches?.length > 0" class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <StudyArchetypeMatches :matches="props.competency.archetype_matches" />
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
