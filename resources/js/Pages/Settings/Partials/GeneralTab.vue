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
            <h3 class="text-lg font-black text-slate-800 tracking-tight">{{ $t('settings_language_title', 'Bahasa Aplikasi') }}</h3>
            <p class="text-xs font-bold text-slate-400 mt-1">{{ $t('settings_language_desc', 'Pilih bahasa antarmuka aplikasi.') }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <button @click="switchLang('id')" 
                class="relative flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-300"
                :class="currentLang === 'id' ? 'border-indigo-600 bg-indigo-50/50 shadow-md' : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50'">
                <span class="text-4xl mb-3 drop-shadow-sm">🇮🇩</span>
                <span class="font-black text-sm" :class="currentLang === 'id' ? 'text-indigo-800' : 'text-slate-600'">Bahasa Indonesia</span>
                <div v-if="currentLang === 'id'" class="absolute top-4 right-4 text-indigo-600 bg-white rounded-full p-1 shadow-sm border border-indigo-100">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
            </button>
            
            <button @click="switchLang('en')" 
                class="relative flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-300"
                :class="currentLang === 'en' ? 'border-indigo-600 bg-indigo-50/50 shadow-md' : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50'">
                <span class="text-4xl mb-3 drop-shadow-sm">🇬🇧</span>
                <span class="font-black text-sm" :class="currentLang === 'en' ? 'text-indigo-800' : 'text-slate-600'">English (UK)</span>
                <div v-if="currentLang === 'en'" class="absolute top-4 right-4 text-indigo-600 bg-white rounded-full p-1 shadow-sm border border-indigo-100">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
            </button>
        </div>
    </div>
</template>
