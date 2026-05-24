<script setup>
import { Sparkles } from 'lucide-vue-next';
import { computed } from 'vue';
import { trans } from 'laravel-vue-i18n';

const props = defineProps({
    competency: {
        type: Object,
        default: null
    }
});

const parsedVerdict = computed(() => {
    if (!props.competency?.verdict) return '';
    try {
        const data = JSON.parse(props.competency.verdict);
        return trans('study_dynamic_profile_verdict', { field: data.field, count: data.count });
    } catch (e) {
        return props.competency.verdict;
    }
});
</script>

<template>
    <div class="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/80 shadow-[0_10px_45px_-4px_rgba(0,0,0,0.03)] hover:shadow-2xl transition duration-500">
        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles class="h-5 w-5 text-indigo-500" />
            {{ $t('study_archetype_title', 'Career Archetypes Match') }}
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-xs font-medium mb-6">
            {{ $t('study_archetype_subtitle', 'Predicted by our Scikit-Learn local classifier models') }}
        </p>

        <!-- Archetypes Alignment -->
        <div v-if="competency?.archetypes && Object.keys(competency.archetypes).length > 0" class="space-y-5 mb-8 mt-2">
            <div 
                v-for="(score, archetype) in competency.archetypes" 
                :key="archetype"
                class="space-y-2.5"
            >
                <div class="flex items-center justify-between text-sm md:text-base font-black">
                    <span class="text-slate-800 dark:text-slate-200">{{ archetype }}</span>
                    <span class="text-indigo-600 dark:text-indigo-400">{{ score }}%</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-3 md:h-4 overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-inner">
                    <div 
                        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-700 shadow-sm" 
                        :style="`width: ${score}%`"
                    ></div>
                </div>
            </div>
        </div>

        <!-- Empty state archetypes -->
        <div v-else class="py-10 text-center text-slate-400 dark:text-slate-600 text-sm font-semibold border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl mb-6">
            {{ $t('study_upload_to_run_ml', 'Upload coursework data to run ML archetype prediction.') }}
        </div>

        <!-- Card: Model Verdict -->
        <div v-if="competency?.verdict" class="p-6 md:p-8 rounded-[1.5rem] bg-gradient-to-br from-indigo-50/50 to-purple-50/30 dark:from-indigo-950/20 dark:to-purple-900/10 border border-indigo-100/60 dark:border-indigo-800/30 flex items-start gap-4 shadow-sm">
            <span class="text-3xl md:text-4xl select-none shrink-0">🤖</span>
            <div>
                <h4 class="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1.5">{{ $t('study_classifier_verdict', 'Classifier Verdict') }}</h4>
                <p class="text-sm md:text-base text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                    "{{ parsedVerdict }}"
                </p>
            </div>
        </div>
    </div>
</template>
