<script setup>
import { useForm } from '@inertiajs/vue3';
import { ref, watch, onMounted } from 'vue';
import { 
    Settings, 
    Loader2, 
    Save, 
    Eye, 
    EyeOff,
    Target 
} from 'lucide-vue-next';

const props = defineProps({
    settings: {
        type: Object,
        default: null
    }
});

const form = useForm({
    show_radar: true,
    show_archetypes: true,
    show_materials: true,
    career_target: '',
    show_career_target: false
});

// Set default values or props on load
onMounted(() => {
    if (props.settings) {
        form.show_radar = props.settings.show_radar !== false;
        form.show_archetypes = props.settings.show_archetypes !== false;
        form.show_materials = props.settings.show_materials !== false;
        form.career_target = props.settings.career_target || '';
        form.show_career_target = props.settings.show_career_target === true;
    }
});

// Watch settings prop changes
watch(() => props.settings, (newSettings) => {
    if (newSettings) {
        form.show_radar = newSettings.show_radar !== false;
        form.show_archetypes = newSettings.show_archetypes !== false;
        form.show_materials = newSettings.show_materials !== false;
        form.career_target = newSettings.career_target || '';
        form.show_career_target = newSettings.show_career_target === true;
    }
}, { deep: true });

const saveSettings = () => {
    form.post(route('study.settings'), {
        preserveScroll: true,
        onSuccess: () => {
            // Optional: show a quick saved indicator
        }
    });
};
</script>

<template>
    <div class="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/80 shadow-[0_10px_45px_-4px_rgba(0,0,0,0.03)] hover:shadow-2xl transition duration-500">
        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Settings class="h-5 w-5 text-indigo-500" />
            {{ $t('study_settings_title', 'Portfolio Display Settings') }}
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-xs font-medium mb-6">
            {{ $t('study_display_settings_desc') }}
        </p>

        <form @submit.prevent="saveSettings" class="space-y-6">
            <!-- Checklist Settings -->
            <div class="space-y-4">
                <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">{{ $t('study_visible_sections') }}</label>
                
                <!-- Toggle: Pemahaman Materi (Radar) -->
                <label class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-900 transition">
                    <div class="flex items-center gap-3">
                        <span class="text-lg">📊</span>
                        <div class="text-left">
                            <span class="text-sm font-bold text-slate-800 dark:text-slate-200 block">{{ $t('study_setting_radar') }}</span>
                            <span class="text-xs text-slate-400 dark:text-slate-500">{{ $t('study_setting_radar_desc') }}</span>
                        </div>
                    </div>
                    <input 
                        type="checkbox" 
                        v-model="form.show_radar"
                        class="h-5 w-5 rounded-md border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 transition cursor-pointer"
                    />
                </label>

                <!-- Toggle: Kesiapan Karir (Archetypes) -->
                <label class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-900 transition">
                    <div class="flex items-center gap-3">
                        <span class="text-lg">🎯</span>
                        <div class="text-left">
                            <span class="text-sm font-bold text-slate-800 dark:text-slate-200 block">{{ $t('study_setting_archetypes') }}</span>
                            <span class="text-xs text-slate-400 dark:text-slate-500">{{ $t('study_setting_archetypes_desc') }}</span>
                        </div>
                    </div>
                    <input 
                        type="checkbox" 
                        v-model="form.show_archetypes"
                        class="h-5 w-5 rounded-md border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 transition cursor-pointer"
                    />
                </label>

                <!-- Toggle: Coursework Materials -->
                <label class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-900 transition">
                    <div class="flex items-center gap-3">
                        <span class="text-lg">📚</span>
                        <div class="text-left">
                            <span class="text-sm font-bold text-slate-800 dark:text-slate-200 block">{{ $t('study_setting_materials') }}</span>
                            <span class="text-xs text-slate-400 dark:text-slate-500">{{ $t('study_setting_materials_desc') }}</span>
                        </div>
                    </div>
                    <input 
                        type="checkbox" 
                        v-model="form.show_materials"
                        class="h-5 w-5 rounded-md border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 transition cursor-pointer"
                    />
                </label>
            </div>

            <!-- Custom Career Target Section -->
            <div class="pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-4">
                <div class="flex items-center justify-between">
                    <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">{{ $t('study_career_target_input') }}</label>
                    
                    <!-- Toggle: Target career visible -->
                    <label class="flex items-center gap-2 cursor-pointer select-none">
                        <span class="text-xs text-slate-400 dark:text-slate-500 font-semibold">{{ $t('study_setting_career_target') }}</span>
                        <input 
                            type="checkbox" 
                            v-model="form.show_career_target"
                            class="h-4 w-4 rounded border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 transition cursor-pointer"
                        />
                    </label>
                </div>

                <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Target class="h-4 w-4" />
                    </span>
                    <input 
                        v-model="form.career_target"
                        type="text" 
                        :placeholder="$t('study_career_goal_placeholder')"
                        class="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>
                <p class="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                    {{ $t('study_career_target_desc') }}
                </p>
            </div>

            <!-- Submit Settings Button -->
            <button 
                type="submit" 
                :disabled="form.processing"
                class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/10 hover:shadow-xl transition flex items-center justify-center gap-2"
            >
                <span v-if="form.processing"><Loader2 class="h-4 w-4 animate-spin" /></span>
                <span v-else class="flex items-center gap-1.5">
                    {{ $t('study_save_settings') }}
                    <Save class="h-4 w-4" />
                </span>
            </button>
        </form>
    </div>
</template>
