<script setup>
import { ref, onMounted } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import SettingsLayout from './Layout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

const page = usePage();
const user = page.props.auth.user;

const isSaving = ref(false);
const preferences = ref({
    habit: { enabled: true, time: '07:00' },
    planner: { enabled: true, time: '08:00' },
    journal: { enabled: false, time: '20:00' },
    finance: { enabled: false, time: '09:00' },
});

const modules = [
    { key: 'habit', label: 'Habit Tracker', icon: 'habit', color: 'text-orange-500' },
    { key: 'planner', label: 'Daily Planner', icon: 'planner', color: 'text-indigo-500' },
    { key: 'journal', label: 'Daily Journal', icon: 'journal', color: 'text-emerald-500' },
    { key: 'finance', label: 'Finance Manager', icon: 'finance', color: 'text-rose-500' },
];

onMounted(() => {
    if (user?.notification_preferences) {
        preferences.value = JSON.parse(JSON.stringify(user.notification_preferences));
    }
});

const save = () => {
    isSaving.value = true;
    router.post(
        route('notifications.update'),
        { preferences: preferences.value },
        {
            preserveScroll: true,
            onFinish: () => (isSaving.value = false),
        },
    );
};
</script>

<template>
    <SettingsLayout
        :title="$t('settings_page_notifications_title', 'Notifications')"
        :subtitle="$t('settings_page_notifications_subtitle', 'Email reminders to help you stay consistent.')"
    >
        <div class="space-y-6">
            <div class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-5">
                <p class="text-sm text-slate-600 dark:text-slate-300">
                    {{ $t('settings_notifications_hint', 'Set the time for daily email reminders (optional).') }}
                </p>
            </div>

            <div class="grid grid-cols-1 gap-3">
                <div
                    v-for="mod in modules"
                    :key="mod.key"
                    class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition"
                >
                    <div class="flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                <OneForMindIcon :name="mod.icon" size="18" :class="mod.color" />
                            </div>
                            <div class="min-w-0">
                                <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                                    {{ $t('settings_notification_module_' + mod.key, mod.label) }}
                                </p>
                                <p class="text-xs text-slate-500 dark:text-slate-400">
                                    {{ preferences[mod.key].enabled ? $t('settings_notifications_enabled', 'Enabled') : $t('settings_notifications_disabled', 'Disabled') }}
                                </p>
                            </div>
                        </div>

                        <label class="relative inline-flex cursor-pointer items-center shrink-0">
                            <input type="checkbox" v-model="preferences[mod.key].enabled" class="peer sr-only" />
                            <div class="peer h-5 w-10 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full" />
                        </label>
                    </div>

                    <div v-if="preferences[mod.key].enabled" class="mt-4 flex items-center gap-3 pl-13">
                        <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {{ $t('settings_notifications_time', 'Time') }}
                        </span>
                        <input
                            type="time"
                            v-model="preferences[mod.key].time"
                            class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        />
                    </div>
                </div>
            </div>

            <div class="pt-2">
                <button
                    type="button"
                    @click="save"
                    :disabled="isSaving"
                    class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 transition"
                >
                    {{ isSaving ? $t('saving', 'Saving…') : $t('save_changes', 'Save changes') }}
                </button>
            </div>
        </div>
    </SettingsLayout>
</template>

