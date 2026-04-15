<script setup>
import SettingsLayout from './Layout.vue';
import ProfileTab from './Partials/ProfileTab.vue';

defineProps({
    mustVerifyEmail: Boolean,
    status: String,
    hasPassword: Boolean,
    userSettings: Object,
});
</script>

<template>
    <SettingsLayout
        :title="$t('settings_page_general_title', 'General')"
        :subtitle="$t('settings_page_general_subtitle', 'Basic account info and profile.')"
    >
        <ProfileTab />
    </SettingsLayout>
</template>

