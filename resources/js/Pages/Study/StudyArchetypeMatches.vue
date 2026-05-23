<script setup>
import { Sparkles } from 'lucide-vue-next';

defineProps({
    competency: {
        type: Object,
        default: null
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
        <div v-if="competency?.archetypes && Object.keys(competency.archetypes).length > 0" class="space-y-4 mb-6">
            <div 
                v-for="(score, archetype) in competency.archetypes" 
                :key="archetype"
                class="space-y-1.5"
            >
                <div class="flex items-center justify-between text-xs font-bold">
                    <span class="text-slate-700 dark:text-slate-300">{{ archetype }}</span>
                    <span class="text-indigo-600 dark:text-indigo-400">{{ score }}%</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                    <div 
                        class="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500" 
                        :style="`width: ${score}%`"
                    ></div>
                </div>
            </div>
        </div>

        <!-- Empty state archetypes -->
        <div v-else class="py-6 text-center text-slate-400 dark:text-slate-600 text-xs font-semibold">
            {{ $t('study_upload_to_run_ml', 'Upload coursework data to run ML archetype prediction.') }}
        </div>

        <!-- Card: Model Verdict -->
        <div v-if="competency?.verdict" class="p-4 rounded-3xl bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 flex items-start gap-3">
            <span class="text-2xl mt-0.5 select-none">🤖</span>
            <div>
                <h4 class="text-xs font-extrabold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">{{ $t('study_classifier_verdict', 'Classifier Verdict') }}</h4>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium leading-relaxed">
                    {{ competency.verdict }}
                </p>
            </div>
        </div>
    </div>
</template>
