<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { trans } from 'laravel-vue-i18n';
import { GraduationCap, ChevronRight, X } from 'lucide-vue-next';

const props = defineProps({
    user: { type: Object, required: true },
    hasCompletedSetup: { type: Boolean, required: true }
});

const emit = defineEmits(['setup-completed', 'fire-toast']);

const showSetupModal = ref(false);

const setupForm = useForm({ 
    education_level: 'kuliah',
    major: props.user.settings?.major || '',
    student_id: props.user.settings?.student_id || '',
    current_semester: props.user.settings?.current_semester || 1
});

const openSetup = () => {
    showSetupModal.value = true;
};

const submitSetup = () => {
    if (!setupForm.education_level) {
        return emit('fire-toast', 'error', trans('study_select_edu_level_alert'));
    }
    if (!setupForm.current_semester) {
        return emit('fire-toast', 'error', trans('study_semester_empty_alert'));
    }
    
    setupForm.post(route('study.academic.setup'), { 
        preserveScroll: true, 
        preserveState: true,
        onSuccess: () => {
            showSetupModal.value = false;
            emit('setup-completed', setupForm.education_level);
        }
    });
};
</script>

<template>
    <div v-if="!hasCompletedSetup" class="max-w-[1600px] w-full md:w-[95%] mx-auto px-4 sm:px-8 py-12">
        <div class="py-24 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 shadow-sm dark:shadow-none transition-all duration-500 max-w-4xl mx-auto mb-12">
            <div class="flex flex-col items-center gap-5">
                <span class="text-6xl animate-bounce mb-2">🎓</span>
                <h4 class="text-2xl font-black text-slate-800 dark:text-slate-100 transition-colors duration-500">{{ $t('study_profile_not_set', 'Profil Studi Belum Diatur') }}</h4>
                <p class="text-sm font-bold text-slate-400 dark:text-slate-500 px-8 max-w-lg mx-auto transition-colors duration-500 leading-relaxed">
                    {{ $t('study_profile_not_set_desc', 'Mulai organisasikan seluruh modul, tugas, dan target nilai Anda secara cerdas. Mari sesuaikan sistem ini dengan profil akademis Anda sekarang!') }}
                </p>
                <button @click="openSetup" class="mt-4 bg-indigo-600 text-white font-black py-3.5 px-8 rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all outline-none flex items-center gap-2">
                    {{ $t('study_start_setup', 'Mulai Setup') }} <ChevronRight class="h-5 w-5" />
                </button>
            </div>
        </div>

        <!-- Portfolio Banner di Bagian Bawah Layar Kosong -->
        <div class="max-w-[1600px] w-full mx-auto pb-12">
            <a :href="route('study.portfolio')" class="group relative flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 bg-white dark:bg-slate-900 overflow-hidden rounded-[2.5rem] border-2 border-indigo-50 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                <div class="flex items-center gap-6 mb-4 sm:mb-0">
                    <div class="h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                        <span class="text-3xl">✨</span>
                    </div>
                    <div class="text-center sm:text-left">
                        <h3 class="text-slate-800 dark:text-white font-black text-xl mb-1">Neural Portfolio</h3>
                        <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xl">{{ $t('study_portfolio_banner_desc') }}</p>
                    </div>
                </div>
                <div class="bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-xl text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center gap-2 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    {{ $t('study_explore_ai_space') }} <ChevronRight class="h-5 w-5" />
                </div>
            </a>
        </div>

        <!-- SETUP WIZARD MODAL -->
        <Teleport to="body">
            <div v-if="showSetupModal" class="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                <div class="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 transform animate-in zoom-in-95 duration-300 relative overflow-hidden flex flex-col max-h-[90vh]">
                    <div class="bg-indigo-600 p-6 text-center relative shrink-0">
                        <button @click="showSetupModal = false" class="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                            <X class="h-5 w-5" />
                        </button>
                        <GraduationCap class="h-12 w-12 text-white/90 mx-auto mb-2" />
                        <h2 class="text-2xl font-black text-white">{{ $t('study_profile_title') }}</h2>
                    </div>
                    
                    <form @submit.prevent="submitSetup" class="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">{{ $t('study_edu_level_label') }}</label>
                            <select v-model="setupForm.education_level" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="kuliah">{{ $t('study_edu_level_uni') }}</option>
                                <option value="sma">{{ $t('study_edu_level_hs') }}</option>
                                <option value="smp">{{ $t('study_edu_level_ms') }}</option>
                                <option value="sd">{{ $t('study_edu_level_es') }}</option>
                                <option value="lainnya">{{ $t('study_edu_level_other') }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">{{ $t('study_major_label') }}</label>
                            <input v-model="setupForm.major" type="text" :placeholder="$t('study_major_placeholder')" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">{{ $t('study_student_id_label') }}</label>
                                <input v-model="setupForm.student_id" type="text" :placeholder="$t('study_student_id_placeholder')" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-[11px] font-black capitalize tracking-wide text-slate-500 mb-2">{{ $t('study_semester_label') }}</label>
                                <input v-model="setupForm.current_semester" type="number" min="1" max="20" placeholder="1" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>

                        <button type="submit" :disabled="setupForm.processing" class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 mt-2">
                            {{ $t('study_save_start') }}
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
    </div>
</template>
