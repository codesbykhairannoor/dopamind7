<script setup>
/**
 * Settings/Index.vue — Single-page Settings dengan tab switching client-side.
 *
 * Sebelumnya: 6 route terpisah → 6 server round-trip setiap pindah tab.
 * Sekarang:   1 route, semua tab di-render di client, KeepAlive menjaga state.
 *
 * Deep-link tetap berfungsi: /settings/security langsung buka tab Security.
 */
import { ref, computed, watch } from 'vue';
import { Head, usePage } from '@inertiajs/vue3';
import SettingsLayout from './Layout.vue';

// Tab content components
import ProfileTab       from './Partials/ProfileTab.vue';
import SecurityTab      from './Partials/SecurityTab.vue';
import AppearanceTab    from './Partials/AppearanceTab.vue';
import NotificationsTab from './Notifications.vue';
import BillingTab       from './Partials/BillingTab.vue';
import LegalTab         from './Partials/LegalTab.vue';
import HelpSupportTab   from './Partials/HelpSupportTab.vue';
import { Download, HelpCircle }     from 'lucide-vue-next';

const props = defineProps({
    mustVerifyEmail: Boolean,
    status: String,
    hasPassword: Boolean,
    userSettings: Object,
    // initialTab: dikirim dari controller berdasarkan URL yang diakses
    initialTab: { type: String, default: 'general' },
});

const page = usePage();

// Detect tab dari URL saat pertama load (support deep-link)
const detectTab = () => {
    const url = page.url || '';
    const segments = ['general', 'security', 'modules', 'notifications', 'billing', 'privacy', 'help'];
    for (const seg of segments) {
        if (url.includes(`/settings/${seg}`)) return seg;
    }
    return props.initialTab || 'general';
};

const currentTab = ref(detectTab());

// Tab metadata untuk title
const tabTitles = {
    general:       { titleKey: 'settings_page_general_title',       titleFallback: 'General',          subtitleKey: 'settings_page_general_subtitle',       subtitleFallback: 'Basic account info and profile.' },
    security:      { titleKey: 'settings_page_security_title',      titleFallback: 'Security',         subtitleKey: 'settings_page_security_subtitle',      subtitleFallback: 'Password, account protection, and sessions.' },
    modules:       { titleKey: 'settings_page_modules_title',       titleFallback: 'Workspace & modules', subtitleKey: 'settings_page_modules_subtitle',    subtitleFallback: 'Show or hide areas to keep your sidebar focused.' },
    notifications: { titleKey: 'settings_page_notifications_title', titleFallback: 'Notifications',    subtitleKey: 'settings_page_notifications_subtitle', subtitleFallback: 'Email reminders to help you stay consistent.' },
    billing:       { titleKey: 'settings_page_billing_title',       titleFallback: 'Billing & plan',   subtitleKey: 'settings_page_billing_subtitle',       subtitleFallback: 'Current plan, renewal, and upgrade options.' },
    privacy:       { titleKey: 'settings_page_privacy_title',       titleFallback: 'Data & privacy',   subtitleKey: 'settings_page_privacy_subtitle',       subtitleFallback: 'Privacy, terms, and exporting your data.' },
    help:          { titleKey: 'settings_page_help_title',          titleFallback: 'Help & Support',   subtitleKey: 'settings_page_help_subtitle',          subtitleFallback: 'Get help, send feedback or contact support.' },
};

const activeMeta = computed(() => tabTitles[currentTab.value] || tabTitles.general);

// Saat tab berubah, update URL (history only, no server request)
watch(currentTab, (tab) => {
    const targetRoute = route(`settings.${tab}`);
    // Hanya update URL di browser history, tidak trigger Inertia request
    window.history.pushState({}, '', targetRoute);
});
</script>

<template>
    <Head :title="$t(activeMeta.titleKey, activeMeta.titleFallback)" />

    <SettingsLayout
        :title="$t(activeMeta.titleKey, activeMeta.titleFallback)"
        :subtitle="$t(activeMeta.subtitleKey, activeMeta.subtitleFallback)"
        :active-tab="currentTab"
        @update:active-tab="currentTab = $event"
    >
        <!-- KeepAlive: komponen yang sudah dibuka tidak di-destroy, state tetap ada -->
        <KeepAlive>
            <component
                :is="currentTab === 'general'       ? ProfileTab
                   : currentTab === 'security'      ? SecurityTab
                   : currentTab === 'modules'       ? AppearanceTab
                   : currentTab === 'notifications' ? NotificationsTab
                   : currentTab === 'billing'       ? BillingTab
                   : currentTab === 'help'          ? HelpSupportTab
                   : null"
                :key="currentTab"
                :has-password="hasPassword"
                :user-settings="userSettings"
            />
        </KeepAlive>

        <!-- Privacy tab (tidak pakai component karena inline content) -->
        <div v-if="currentTab === 'privacy'" class="space-y-10">
            <div class="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <div class="flex items-start justify-between gap-6">
                    <div>
                        <h3 class="text-base font-semibold text-slate-900 dark:text-white">
                            {{ $t('settings_export_title', 'Export your data') }}
                        </h3>
                        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {{ $t('settings_export_desc', 'Download a copy of your data (JSON/CSV) for backup and portability.') }}
                        </p>
                    </div>
                    <button
                        type="button"
                        disabled
                        class="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    >
                        <Download class="w-4 h-4" />
                        {{ $t('settings_export_btn', 'Export') }}
                    </button>
                </div>
                <p class="mt-4 text-xs text-slate-400 dark:text-slate-500">
                    {{ $t('settings_coming_soon', 'Coming soon') }}
                </p>
            </div>
            <LegalTab />
        </div>
    </SettingsLayout>
</template>
