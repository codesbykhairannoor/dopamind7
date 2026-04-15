<script setup>
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { Head, usePage, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { useGating } from '@/Composables/useGating';

import ProfileTab from './Partials/ProfileTab.vue';
import AppearanceTab from './Partials/AppearanceTab.vue';
import SecurityTab from './Partials/SecurityTab.vue';
import BillingTab from './Partials/BillingTab.vue';
import LegalTab from './Partials/LegalTab.vue';

const { isExplorer, PLAN_LABELS } = useGating();

defineProps({
    userSettings: Object,
    mustVerifyEmail: Boolean,
    status: String,
    hasPassword: Boolean,
});

const page = usePage();
const user = computed(() => page.props.auth.user);

const activeTab = ref('profile');

const tabs = [
    { id: 'profile', name: 'Profil Saya', icon: '👤', desc: 'Info Akun & Foto', tName: 'settings_tab_profile', tDesc: 'settings_tab_profile_desc' },
    { id: 'appearance', name: 'Modul', icon: '🧩', desc: 'Sidebar', tName: 'settings_tab_appearance', tDesc: 'settings_tab_appearance_desc' },
    { id: 'security', name: 'Keamanan', icon: '🔒', desc: 'Password & Privasi', tName: 'settings_tab_security', tDesc: 'settings_tab_security_desc' },
    { id: 'billing', name: 'Langganan', icon: '💎', desc: 'Paket', tName: 'settings_tab_billing', tDesc: 'settings_tab_billing_desc' },
    { id: 'legal', name: 'Legal', icon: '📄', desc: 'Syarat & Ketentuan', tName: 'settings_tab_legal', tDesc: 'settings_tab_legal_desc' },
];

const planLabel = computed(() => {
    const pt = user.value?.plan_type;
    if (pt && PLAN_LABELS[pt]) return PLAN_LABELS[pt];
    return 'Explorer';
});

const currentTabComponent = computed(() => {
    switch (activeTab.value) {
        case 'profile':
            return ProfileTab;
        case 'appearance':
            return AppearanceTab;
        case 'security':
            return SecurityTab;
        case 'billing':
            return BillingTab;
        case 'legal':
            return LegalTab;
        default:
            return ProfileTab;
    }
});

const confirmLogout = () => {
    router.post(route('logout'));
};
</script>

<template>
    <Head :title="$t('settings_title', 'Account Settings')" />

    <div class="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32 transition-all duration-500">
        <!-- Header -->
        <div class="mb-8 sm:mb-10 text-center md:text-left">
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {{ $t('settings_header', 'Account Settings') }}
            </h1>
            <p class="text-slate-500 dark:text-slate-400 font-medium mt-2 text-sm sm:text-base">
                {{ $t('settings_subheader', 'Customize your productivity experience') }}
            </p>
            <p
                class="mt-3 text-xs sm:text-sm text-slate-400 dark:text-slate-500 max-w-2xl leading-relaxed"
            >
                {{ $t('settings_toolbar_hint', 'Tip: change language and theme from the top bar — no need to duplicate them here.') }}
            </p>
        </div>

        <!-- Profile strip -->
        <div
            class="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6 mb-8 sm:mb-10 relative overflow-hidden"
        >
            <div class="relative shrink-0">
                <img
                    v-if="user?.avatar_url"
                    :src="user.avatar_url"
                    alt="Avatar"
                    class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg border-2 border-slate-100 dark:border-slate-700"
                />
                <div
                    v-else
                    class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold text-3xl shadow-lg border-2 border-slate-100 dark:border-slate-700"
                >
                    {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
                </div>
            </div>

            <div class="flex-1 text-center md:text-left min-w-0">
                <h2 class="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 truncate">
                    {{ user?.name || 'User' }}
                </h2>
                <p class="text-slate-500 dark:text-slate-400 font-medium mt-1 text-sm truncate">
                    {{ user?.email }}
                </p>
                <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                    <span
                        class="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold"
                    >
                        {{ planLabel }}
                    </span>
                    <span
                        class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium"
                    >
                        ID · {{ user?.id }}
                    </span>
                </div>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
            <aside class="w-full lg:w-72 shrink-0">
                <div class="space-y-4">
                    <nav
                        id="desktop-settings-nav"
                        class="space-y-1 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
                    >
                        <button
                            v-for="tab in tabs"
                            :key="tab.id"
                            :id="'tab-' + tab.id"
                            type="button"
                            class="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left"
                            :class="[
                                activeTab === tab.id
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800',
                                tab.id === 'billing' && isExplorer && activeTab !== 'billing'
                                    ? 'ring-2 ring-indigo-200 dark:ring-indigo-800'
                                    : '',
                            ]"
                            @click="activeTab = tab.id"
                        >
                            <span class="text-xl">{{ tab.icon }}</span>
                            <div class="text-left min-w-0">
                                <h4
                                    class="text-sm font-semibold leading-tight truncate"
                                    :class="activeTab === tab.id ? 'text-white' : 'text-slate-800 dark:text-slate-200'"
                                >
                                    {{ $t(tab.tName, tab.name) }}
                                </h4>
                                <p
                                    class="text-[11px] mt-0.5 truncate opacity-80"
                                    :class="activeTab === tab.id ? 'text-indigo-100' : 'text-slate-400'"
                                >
                                    {{ $t(tab.tDesc, tab.desc) }}
                                </p>
                            </div>
                        </button>
                    </nav>

                    <div
                        class="bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-sm border border-slate-100 dark:border-slate-800"
                    >
                        <button
                            id="logout-btn"
                            type="button"
                            class="w-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold py-3 rounded-xl border border-rose-100 dark:border-rose-500/20 flex items-center justify-center gap-2 active:scale-[0.99] transition hover:bg-rose-100/50 dark:hover:bg-rose-500/20 text-sm"
                            @click="confirmLogout"
                        >
                            <OneForMindIcon name="logout" size="18" stroke-width="2.5" />
                            {{ $t('nav_logout', 'Sign out') }}
                        </button>
                    </div>
                </div>
            </aside>

            <main
                class="flex-grow bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-sm min-h-[520px] transition-all duration-500"
            >
                <div class="max-w-3xl">
                    <transition
                        mode="out-in"
                        enter-active-class="transition duration-300 ease-out"
                        enter-from-class="opacity-0 translate-x-4"
                        enter-to-class="opacity-100 translate-x-0"
                        leave-active-class="transition duration-200 ease-in"
                        leave-from-class="opacity-100 translate-x-0"
                        leave-to-class="opacity-0 -translate-x-4"
                    >
                        <component
                            :is="currentTabComponent"
                            :user-settings="userSettings"
                            :must-verify-email="mustVerifyEmail"
                            :status="status"
                            :has-password="hasPassword"
                        />
                    </transition>
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
