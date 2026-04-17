<script setup>
import { computed, ref, watch } from 'vue';
import { Head, usePage } from '@inertiajs/vue3';
import NProgress from 'nprogress';

const props = defineProps({
    title:     { type: String, default: '' },
    subtitle:  { type: String, default: '' },
    activeTab: { type: String, default: null },
});

const emit = defineEmits(['update:activeTab']);

const page = usePage();

const tabs = [
    { id: 'general',       labelKey: 'settings_nav_general',       labelFallback: 'General' },
    { id: 'security',      labelKey: 'settings_nav_security',       labelFallback: 'Security' },
    { id: 'modules',       labelKey: 'settings_nav_modules',        labelFallback: 'Modules' },
    { id: 'notifications', labelKey: 'settings_nav_notifications',  labelFallback: 'Notifications' },
    { id: 'billing',       labelKey: 'settings_nav_billing',        labelFallback: 'Billing' },
    { id: 'privacy',       labelKey: 'settings_nav_privacy',        labelFallback: 'Data & privacy' },
    { id: 'help',          labelKey: 'settings_nav_help',           labelFallback: 'Help & Support' },
];

const detectTabFromUrl = () => {
    const url = page.url || '';
    for (const tab of tabs) {
        if (url.includes(`/settings/${tab.id}`)) return tab.id;
    }
    return 'general';
};

const currentTab = ref(props.activeTab || detectTabFromUrl());

watch(() => props.activeTab, (val) => { if (val) currentTab.value = val; });

/**
 * Tab switching: murni client-side, zero server request.
 * NProgress memberikan feedback visual instan seperti navigasi halaman biasa.
 */
const switchTab = (tabId) => {
    if (currentTab.value === tabId) return;

    NProgress.start();

    currentTab.value = tabId;
    emit('update:activeTab', tabId);

    // Update URL di browser history tanpa trigger Inertia/server
    window.history.pushState({}, '', route(`settings.${tabId}`));

    // Selesaikan progress bar setelah Vue selesai render frame berikutnya
    requestAnimationFrame(() => NProgress.done());
};

const isActive = (tabId) => currentTab.value === tabId;

const tabMeta = computed(() => tabs.find(t => t.id === currentTab.value) || tabs[0]);
</script>

<template>
    <Head :title="props.title || tabMeta.labelFallback" />

    <div class="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-10 pb-28">
        <div class="mb-6">
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {{ props.title }}
            </h1>
            <p v-if="props.subtitle" class="mt-2 text-slate-500 dark:text-slate-400 font-medium">
                {{ props.subtitle }}
            </p>
        </div>

        <!-- Tab bar — pure client-side switching, zero server requests -->
        <div class="relative z-20 -mx-3 sm:mx-0 mb-6 sm:mb-8">
            <div class="px-3 sm:px-0">
                <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-sm">
                    <nav class="flex items-center gap-1 overflow-x-auto no-scrollbar px-2 py-2">
                        <button
                            v-for="tab in tabs"
                            :key="tab.id"
                            type="button"
                            class="shrink-0 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all"
                            :class="isActive(tab.id)
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/30 dark:shadow-none'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'"
                            @click="switchTab(tab.id)"
                        >
                            {{ $t(tab.labelKey, tab.labelFallback) }}
                        </button>
                    </nav>
                </div>
            </div>
        </div>

        <!-- Content slot -->
        <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-sm">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
