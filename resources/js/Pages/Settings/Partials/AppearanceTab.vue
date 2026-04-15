<script setup>
import { useForm } from '@inertiajs/vue3';
import { Info } from 'lucide-vue-next';

const props = defineProps({ userSettings: Object });

const form = useForm({
    settings: {
        modules: {
            habit: props.userSettings?.modules?.habit ?? true,
            planner: props.userSettings?.modules?.planner ?? true,
            finance: props.userSettings?.modules?.finance ?? true,
            journal: props.userSettings?.modules?.journal ?? true,
            calendar: props.userSettings?.modules?.calendar ?? true,
            job: props.userSettings?.modules?.job ?? true,
            goal: props.userSettings?.modules?.goal ?? true,
        },
    },
});

const saveSettings = () => {
    form.post(route('settings.update'), {
        preserveScroll: true,
    });
};
</script>

<template>
    <div class="space-y-10 pb-12">
        <!-- Language & theme live in global header (Notion / ClickUp pattern) -->
        <div
            class="flex gap-3 rounded-2xl border border-indigo-100 dark:border-indigo-500/30 bg-indigo-50/60 dark:bg-indigo-500/10 px-4 py-3 text-sm text-indigo-900 dark:text-indigo-200"
        >
            <Info class="w-5 h-5 shrink-0 opacity-80 mt-0.5" />
            <p class="leading-relaxed">
                {{ $t('settings_modules_header_hint', 'Language and light/dark theme are controlled from the top bar — same as Notion and ClickUp.') }}
            </p>
        </div>

        <!-- Modules -->
        <div>
            <div class="mb-6">
                <h3 class="text-lg font-bold text-slate-800 dark:text-white tracking-tight">
                    {{ $t('settings_modules_title', 'Modules') }}
                </h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {{ $t('settings_modules_desc', 'Choose which areas appear in your sidebar and navigation.') }}
                </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                    v-for="(enabled, key) in form.settings.modules"
                    :key="key"
                    :id="'module-card-' + key"
                    class="group flex items-center justify-between p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-indigo-500/40 hover:shadow-md transition-all"
                >
                    <div class="flex items-center gap-3 min-w-0">
                        <div
                            class="w-11 h-11 sm:w-12 sm:h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform"
                        >
                            <template v-if="key === 'habit'">🌱</template>
                            <template v-else-if="key === 'planner'">📋</template>
                            <template v-else-if="key === 'finance'">💸</template>
                            <template v-else-if="key === 'journal'">📓</template>
                            <template v-else-if="key === 'calendar'">📅</template>
                            <template v-else-if="key === 'job'">💼</template>
                            <template v-else-if="key === 'goal'">🎯</template>
                        </div>
                        <div class="min-w-0">
                            <h4 class="font-semibold text-slate-800 dark:text-slate-200 text-sm capitalize">
                                {{ $t(key) }}
                            </h4>
                            <p class="text-[11px] text-slate-400 dark:text-slate-500">
                                {{ $t('module_status_active') }}
                            </p>
                        </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                            :id="'module-toggle-' + key"
                            v-model="form.settings.modules[key]"
                            type="checkbox"
                            class="sr-only peer"
                            @change="saveSettings"
                        />
                        <div
                            class="w-11 h-6 bg-slate-100 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-slate-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner border border-slate-100 dark:border-slate-700"
                        />
                    </label>
                </div>
            </div>
        </div>

        <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="form.recentlySuccessful"
                class="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20"
            >
                <span>✨</span> {{ $t('settings_saved', 'Saved') }}
            </div>
        </transition>
    </div>
</template>
