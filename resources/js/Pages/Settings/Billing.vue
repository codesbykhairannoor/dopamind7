<script setup>
import SettingsLayout from './Layout.vue';
import BillingTab from './Partials/BillingTab.vue';
</script>

<template>
    <SettingsLayout
        :title="$t('settings_page_billing_title', 'Billing & plan')"
        :subtitle="$t('settings_page_billing_subtitle', 'Current plan, renewal, and upgrade options.')"
    >
        <BillingTab />
    </SettingsLayout>
</template>

