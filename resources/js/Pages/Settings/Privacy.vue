<script setup>
import SettingsLayout from './Layout.vue';
import LegalTab from './Partials/LegalTab.vue';
import { Download } from 'lucide-vue-next';
</script>

<template>
    <SettingsLayout
        :title="$t('settings_page_privacy_title', 'Data & privacy')"
        :subtitle="$t('settings_page_privacy_subtitle', 'Privacy, terms, and exporting your data.')"
    >
        <div class="space-y-10">
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

