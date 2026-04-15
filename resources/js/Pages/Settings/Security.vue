<script setup>
import SettingsLayout from './Layout.vue';
import SecurityTab from './Partials/SecurityTab.vue';

defineProps({
    hasPassword: Boolean,
});
</script>

<template>
    <SettingsLayout
        :title="$t('settings_page_security_title', 'Security')"
        :subtitle="$t('settings_page_security_subtitle', 'Password, account protection, and sessions.')"
    >
        <div class="space-y-10">
            <!-- Password + danger zone -->
            <SecurityTab :has-password="hasPassword" />

            <!-- Sessions placeholder (surprise: SaaS-grade roadmap card) -->
            <div class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 p-6">
                <div class="flex items-start justify-between gap-6">
                    <div class="space-y-1">
                        <h3 class="text-base font-semibold text-slate-900 dark:text-white">
                            {{ $t('settings_sessions_title', 'Active sessions') }}
                        </h3>
                        <p class="text-sm text-slate-500 dark:text-slate-400">
                            {{ $t('settings_sessions_desc', 'See devices signed into your account and log out suspicious sessions.') }}
                        </p>
                    </div>
                    <span class="shrink-0 rounded-full bg-slate-200/70 dark:bg-slate-700/60 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {{ $t('settings_coming_soon', 'Coming soon') }}
                    </span>
                </div>
            </div>
        </div>
    </SettingsLayout>
</template>

