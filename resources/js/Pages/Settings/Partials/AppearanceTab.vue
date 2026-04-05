<script setup>
import { useForm } from '@inertiajs/vue3';
import { useAppearance } from '@/Composables/useAppearance';

const props = defineProps({ userSettings: Object });
const { isDark, toggleTheme } = useAppearance();

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
        }
    }
});

const saveSettings = () => {
    form.post(route('settings.update'), { 
        preserveScroll: true,
    });
};
</script>

<template>
    <div class="space-y-12 pb-20">
        <!-- Theme Section -->
        <div>
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h3 class="text-lg font-black text-slate-800 dark:text-white tracking-tight transition-colors duration-500">{{ $t('settings_theme_title', 'Tema Aplikasi') }}</h3>
                    <p class="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 transition-colors duration-500">{{ $t('settings_theme_desc', 'Pilih mode tampilan yang paling nyaman untuk matamu.') }}</p>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <button id="theme-light-btn" @click="isDark && toggleTheme()" 
                    class="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-[2.2rem] border-2 transition-all duration-500 group overflow-hidden"
                    :class="!isDark ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-100/50' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700'">
                    <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="w-14 h-14 sm:w-16 sm:h-16 bg-amber-50 rounded-2xl sm:rounded-[1.5rem] flex items-center justify-center text-2xl sm:text-3xl mb-4 shadow-inner group-hover:scale-110 transition-transform relative z-10">☀️</div>
                    <span class="font-black text-xs sm:text-sm transition-colors duration-500 relative z-10" :class="!isDark ? 'text-indigo-600' : 'text-slate-500 dark:text-slate-400'">{{ $t('theme_light', 'Light Mode') }}</span>
                    <div v-if="!isDark" class="absolute top-4 right-4 text-indigo-600 bg-indigo-50 rounded-full p-1.5 shadow-sm z-10">
                        <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                </button>

                <button id="theme-dark-btn" @click="!isDark && toggleTheme()" 
                    class="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-[2.2rem] border-2 transition-all duration-500 group overflow-hidden"
                    :class="isDark ? 'border-indigo-500 bg-slate-800 shadow-xl shadow-slate-950/40' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700'">
                    <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="w-14 h-14 sm:w-16 sm:h-16 bg-slate-900 rounded-2xl sm:rounded-[1.5rem] flex items-center justify-center text-2xl sm:text-3xl mb-4 shadow-inner group-hover:scale-110 transition-transform relative z-10">🌙</div>
                    <span class="font-black text-xs sm:text-sm transition-colors duration-500 relative z-10" :class="isDark ? 'text-indigo-400' : 'text-slate-500 dark:text-slate-400'">{{ $t('theme_dark', 'Dark Mode') }}</span>
                    <div v-if="isDark" class="absolute top-4 right-4 text-indigo-400 bg-slate-900 rounded-full p-1.5 shadow-sm border border-slate-700 z-10">
                        <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                </button>
            </div>
        </div>

        <!-- Modules Section -->
        <div>
            <div class="mb-8">
                <h3 class="text-lg font-black text-slate-800 dark:text-white tracking-tight transition-colors duration-500">{{ $t('settings_modules_title', 'Modul Aplikasi') }}</h3>
                <p class="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 transition-colors duration-500">{{ $t('settings_modules_desc', 'Aktifkan atau nonaktifkan fitur yang ingin kamu gunakan.') }}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="(enabled, key) in form.settings.modules" :key="key" 
                    :id="'module-card-' + key"
                    class="group flex items-center justify-between p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-indigo-500/40 hover:shadow-lg transition-all duration-300">
                    <div class="flex items-center gap-4">
                        <div class="w-11 h-11 sm:w-12 sm:h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-sm dark:shadow-none group-hover:scale-110 transition-transform">
                            <template v-if="key === 'habit'">🌱</template>
                            <template v-else-if="key === 'planner'">📋</template>
                            <template v-else-if="key === 'finance'">💸</template>
                            <template v-else-if="key === 'journal'">📓</template>
                            <template v-else-if="key === 'calendar'">📅</template>
                            <template v-else-if="key === 'job'">💼</template>
                            <template v-else-if="key === 'goal'">🎯</template>
                        </div>
                        <div>
                            <h4 class="font-black text-slate-700 dark:text-slate-200 text-sm capitalize transition-colors duration-500">{{ $t(key) }}</h4>
                            <p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-500">{{ $t('module_status_active') }}</p>
                        </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input :id="'module-toggle-' + key" type="checkbox" v-model="form.settings.modules[key]" class="sr-only peer" @change="saveSettings">
                        <div class="w-10 h-5 sm:w-11 sm:h-6 bg-slate-100 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] sm:after:top-[4px] after:left-[2px] sm:after:left-[4px] after:bg-white after:border-gray-300 dark:after:border-slate-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 shadow-inner dark:shadow-none border border-slate-100 dark:border-slate-700"></div>
                    </label>
                </div>
            </div>
        </div>

        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="form.recentlySuccessful" class="text-center bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20 shadow-sm dark:shadow-none shadow-emerald-100/50 flex items-center justify-center gap-2">
                <span>✨</span> {{ $t('settings_saved', 'Tersimpan!') }}
            </div>
        </transition>
    </div>
</template>

