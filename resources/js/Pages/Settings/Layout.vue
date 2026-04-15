<script setup>
import { computed } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';

const props = defineProps({
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
});

const page = usePage();
const currentUrl = computed(() => page.url || '');

const tabs = [
    { id: 'general', labelKey: 'settings_nav_general', labelFallback: 'General', href: route('settings.general') },
    { id: 'security', labelKey: 'settings_nav_security', labelFallback: 'Security', href: route('settings.security') },
    { id: 'modules', labelKey: 'settings_nav_modules', labelFallback: 'Modules', href: route('settings.modules') },
    { id: 'notifications', labelKey: 'settings_nav_notifications', labelFallback: 'Notifications', href: route('settings.notifications') },
    { id: 'billing', labelKey: 'settings_nav_billing', labelFallback: 'Billing', href: route('settings.billing') },
    { id: 'privacy', labelKey: 'settings_nav_privacy', labelFallback: 'Data & privacy', href: route('settings.privacy') },
];

const isActive = (href) => {
    // safest: match by pathname since Inertia page.url includes query.
    try {
        const path = new URL(href, window.location.origin).pathname;
        return currentUrl.value.startsWith(path);
    } catch {
        return currentUrl.value.startsWith(href);
    }
};
</script>

<template>
    <Head :title="props.title" />

    <div class="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-10 pb-28">
        <div class="mb-6">
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {{ props.title }}
            </h1>
            <p v-if="props.subtitle" class="mt-2 text-slate-500 dark:text-slate-400 font-medium">
                {{ props.subtitle }}
            </p>
        </div>

        <!-- Sticky sub-header tab bar (GitHub/Vercel style) -->
        <div class="sticky top-16 z-20 -mx-3 sm:mx-0 mb-6 sm:mb-8">
            <div class="px-3 sm:px-0">
                <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-sm">
                    <nav class="flex items-center gap-1 overflow-x-auto no-scrollbar px-2 py-2">
                        <Link
                            v-for="tab in tabs"
                            :key="tab.id"
                            :href="tab.href"
                            prefetch="hover"
                            class="shrink-0 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all"
                            :class="isActive(tab.href)
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/30 dark:shadow-none'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'"
                        >
                            {{ $t(tab.labelKey, tab.labelFallback) }}
                        </Link>
                    </nav>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-sm">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>

