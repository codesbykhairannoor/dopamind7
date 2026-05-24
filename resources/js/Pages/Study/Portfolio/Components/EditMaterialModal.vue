<script setup>
import { useForm } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import { 
    X, Save, Info, Clock, GraduationCap, 
    Layout, Radar, Brain, Target, Loader2
} from 'lucide-vue-next';

const props = defineProps({
    show: Boolean,
    material: Object,
    userSettings: Object
});

const emit = defineEmits(['close']);

const form = useForm({
    course_name: '',
    week: '',
    grade: '',
    context_link: '',
    artifact_link: '',
    show_radar: true,
    show_archetypes: true,
    show_materials: true,
    show_career_target: true,
    career_target: ''
});

watch(() => props.material, (newVal) => {
    if (newVal) {
        form.course_name = newVal.course_name || '';
        form.week = newVal.week || '';
        form.grade = newVal.grade || '';
        form.context_link = newVal.context_data?.link || '';
        form.artifact_link = newVal.artifact_data?.link || '';
        // Load settings from user settings
        form.show_radar = props.userSettings?.show_radar ?? true;
        form.show_archetypes = props.userSettings?.show_archetypes ?? true;
        form.show_materials = props.userSettings?.show_materials ?? true;
        form.show_career_target = props.userSettings?.show_career_target ?? true;
        form.career_target = props.userSettings?.career_target ?? '';
    }
}, { immediate: true });

const submit = () => {
    form.put(route('study.update', props.material.id), {
        onSuccess: () => emit('close'),
        preserveScroll: true
    });
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm" @click="emit('close')"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl overflow-hidden animate-scale-up">
            <!-- Header -->
            <div class="p-6 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center border border-indigo-100/50 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                        <GraduationCap class="h-5 w-5" />
                    </div>
                    <div>
                        <h3 class="text-lg font-black text-slate-900 dark:text-white">{{ $t('study_edit_material') }}</h3>
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{{ material?.course_name }}</p>
                    </div>
                </div>
                <button @click="emit('close')" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
                    <X class="h-5 w-5" />
                </button>
            </div>

            <form @submit.prevent="submit" class="p-8">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <!-- Course Name -->
                    <div class="md:col-span-12">
                        <label class="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                            <Info class="h-3 w-3" />
                            {{ $t('study_course_name') }}
                        </label>
                        <input v-model="form.course_name" type="text"
                            class="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                    </div>
                    
                    <!-- Week -->
                    <div class="md:col-span-6">
                        <label class="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                            <Clock class="h-3 w-3" />
                            {{ $t('study_week') }}
                        </label>
                        <input v-model="form.week" type="text"
                            class="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                    </div>

                    <!-- Grade -->
                    <div class="md:col-span-6">
                        <label class="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
                            <GraduationCap class="h-3 w-3" />
                            {{ $t('study_grade') }}
                        </label>
                        <input v-model="form.grade" type="number" min="0" max="100" step="0.01"
                            class="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                    </div>

                    <!-- Settings Section -->
                    <div class="md:col-span-12 pt-4 border-t border-slate-100 dark:border-slate-800/50 mt-2">
                        <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                            <Layout class="h-3 w-3" />
                            {{ $t('study_display_settings') }}
                        </h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label class="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-950/30 cursor-pointer group">
                                <div class="relative flex items-center">
                                    <input type="checkbox" v-model="form.show_radar" class="sr-only peer" />
                                    <div class="w-10 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                </div>
                                <span class="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                    <Radar class="h-3.5 w-3.5" />
                                    {{ $t('study_setting_radar') }}
                                </span>
                            </label>

                            <label class="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-950/30 cursor-pointer group">
                                <div class="relative flex items-center">
                                    <input type="checkbox" v-model="form.show_archetypes" class="sr-only peer" />
                                    <div class="w-10 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                </div>
                                <span class="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                    <Brain class="h-3.5 w-3.5" />
                                    {{ $t('study_setting_archetypes') }}
                                </span>
                            </label>

                            <label class="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-950/30 cursor-pointer group">
                                <div class="relative flex items-center">
                                    <input type="checkbox" v-model="form.show_materials" class="sr-only peer" />
                                    <div class="w-10 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                </div>
                                <span class="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                    <Layout class="h-3.5 w-3.5" />
                                    {{ $t('study_setting_materials') }}
                                </span>
                            </label>

                            <label class="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-950/30 cursor-pointer group">
                                <div class="relative flex items-center">
                                    <input type="checkbox" v-model="form.show_career_target" class="sr-only peer" />
                                    <div class="w-10 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                </div>
                                <span class="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                    <Target class="h-3.5 w-3.5" />
                                    {{ $t('study_setting_career_target') }}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div v-if="form.show_career_target" class="md:col-span-12">
                        <label class="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 block">{{ $t('study_career_target_input') }}</label>
                        <input v-model="form.career_target" type="text"
                            class="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="flex items-center justify-end gap-3 mt-10">
                    <button type="button" @click="emit('close')"
                        class="px-6 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                        {{ $t('btn_cancel') }}
                    </button>
                    <button type="submit" :disabled="form.processing"
                        class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2">
                        <Loader2 v-if="form.processing" class="h-4 w-4 animate-spin" />
                        <Save v-else class="h-4 w-4" />
                        {{ $t('study_update_material') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.animate-scale-up {
    animation: scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes scale-up {
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
</style>
