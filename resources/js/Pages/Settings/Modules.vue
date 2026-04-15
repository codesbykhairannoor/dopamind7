<script setup>
import SettingsLayout from './Layout.vue';
import AppearanceTab from './Partials/AppearanceTab.vue';

defineProps({
    userSettings: Object,
});
</script>

<template>
    <SettingsLayout
        :title="$t('settings_page_modules_title', 'Workspace & modules')"
        :subtitle="$t('settings_page_modules_subtitle', 'Show or hide areas to keep your sidebar focused.')"
    >
        <AppearanceTab :user-settings="userSettings" />
    </SettingsLayout>
</template>

