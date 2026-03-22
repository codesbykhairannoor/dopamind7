<script setup>
import { usePage, router } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const currentLang = computed(() => page.props.locale || 'id');

const switchLang = (lang) => {
    if (currentLang.value === lang) return;
    router.get(route('lang.switch', lang), {}, {
        preserveState: false,
        preserveScroll: false,
        replace: true
    });
};
</script>

<template>
    <div class="space-y-6">
        <div>
            <h3 class="text-lg font-black text-slate-800 dark:text-white tracking-tight transition-colors duration-500">{{ $t('settings_language_title', 'Bahasa Aplikasi') }}</h3>
            <p class="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 transition-colors duration-500">{{ $t('settings_language_desc', 'Pilih bahasa antarmuka aplikasi.') }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <button @click="switchLang('id')" 
                class="relative flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-300"
                :class="currentLang === 'id' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10 shadow-md dark:shadow-none' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800'">
                <span class="text-4xl mb-3 drop-shadow-sm">🇮🇩</span>
                <span class="font-black text-sm transition-colors duration-500" :class="currentLang === 'id' ? 'text-indigo-800 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'">Bahasa Indonesia</span>
                <div v-if="currentLang === 'id'" class="absolute top-4 right-4 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm dark:shadow-none border border-indigo-100 dark:border-indigo-500/30 transition-colors duration-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
            </button>
            
            <button @click="switchLang('en')" 
                class="relative flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-300"
                :class="currentLang === 'en' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10 shadow-md dark:shadow-none' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800'">
                <span class="text-4xl mb-3 drop-shadow-sm">🇬🇧</span>
                <span class="font-black text-sm transition-colors duration-500" :class="currentLang === 'en' ? 'text-indigo-800 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'">English (UK)</span>
                <div v-if="currentLang === 'en'" class="absolute top-4 right-4 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm dark:shadow-none border border-indigo-100 dark:border-indigo-500/30 transition-colors duration-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
            </button>
        </div>
    </div>
</template>
