<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { Head, usePage, router, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

// Tab Components
import GeneralTab from './Partials/GeneralTab.vue';
import ProfileTab from './Partials/ProfileTab.vue';
import AppearanceTab from './Partials/AppearanceTab.vue';
import SecurityTab from './Partials/SecurityTab.vue';
import BillingTab from './Partials/BillingTab.vue';
import LegalTab from './Partials/LegalTab.vue';

const props = defineProps({
    userSettings: Object,
    mustVerifyEmail: Boolean,
    status: String,
    hasPassword: Boolean,
    midtrans_client_key: String
});

const page = usePage();
const user = computed(() => page.props.auth.user);
const currentLocale = computed(() => page.props.locale);

const activeTab = ref('general');

const tabs = [
    { id: 'general', name: 'Umum', icon: '🌐', desc: 'Bahasa & Lokasi', tName: 'settings_tab_general', tDesc: 'settings_tab_general_desc' },
    { id: 'profile', name: 'Profil Saya', icon: '👤', desc: 'Info Akun & Foto', tName: 'settings_tab_profile', tDesc: 'settings_tab_profile_desc' },
    { id: 'appearance', name: 'Tampilan', icon: '🧩', desc: 'Aktivasi Modul', tName: 'settings_tab_appearance', tDesc: 'settings_tab_appearance_desc' },
    { id: 'security', name: 'Keamanan', icon: '🔒', desc: 'Password & Privasi', tName: 'settings_tab_security', tDesc: 'settings_tab_security_desc' },
    { id: 'billing', name: 'Langganan', icon: '💎', desc: 'Upgrade Premium', tName: 'settings_tab_billing', tDesc: 'settings_tab_billing_desc' },
    { id: 'legal', name: 'Legal', icon: '📄', desc: 'Syarat & Ketentuan', tName: 'settings_tab_legal', tDesc: 'settings_tab_legal_desc' },
];

const currentTabComponent = computed(() => {
    switch (activeTab.value) {
        case 'general': return GeneralTab;
        case 'profile': return ProfileTab;
        case 'appearance': return AppearanceTab;
        case 'security': return SecurityTab;
        case 'billing': return BillingTab;
        case 'legal': return LegalTab;
        default: return GeneralTab;
    }
});

const switchLang = (lang) => {
    if (lang === currentLocale.value) return;
    router.get(route('lang.switch', { locale: lang }));
};

const confirmLogout = () => {
    router.post(route('logout'));
};
</script>

<template>
    <Head :title="$t('settings_title', 'Account Settings')" />

    <AuthenticatedLayout>
        <div class="max-w-6xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-40 transition-all duration-500">
            <!-- Header Section -->
            <div class="mb-12 text-center md:text-left">
                <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500">{{ $t('settings_header', 'Account Settings') }}</h1>
                <p class="text-slate-400 dark:text-slate-500 font-bold mt-2 transition-colors duration-500">{{ $t('settings_subheader', 'Customize your productivity experience') }}</p>
            </div>

            <!-- Profile Overview Card -->
            <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-indigo-500/5 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 mb-10 relative overflow-hidden group transition-all duration-500">
                <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                
                <div class="relative shrink-0">
                    <img v-if="user?.avatar_url" :src="user.avatar_url" alt="Avatar" class="w-24 h-24 rounded-full object-cover shadow-2xl border-4 border-white dark:border-slate-800" />
                    <div v-else class="w-24 h-24 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-black text-4xl shadow-2xl border-4 border-white dark:border-slate-800">
                        {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
                    </div>
                </div>
                
                <div class="flex-1 text-center md:text-left min-w-0">
                    <h2 class="text-3xl font-black text-slate-800 dark:text-slate-100 truncate leading-tight transition-colors duration-500">{{ user?.name || 'User' }}</h2>
                    <p class="text-slate-400 dark:text-slate-500 font-bold mt-1 transition-colors duration-500">{{ user?.email }}</p>
                    <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                        <span class="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black transition-colors duration-500">Platinum User</span>
                        <span class="px-4 py-1.5 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 rounded-full text-[10px] font-black transition-colors duration-500">Member #{{ user?.id }}</span>
                    </div>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- 📱 MOBILE TABS NAVIGATION -->
                <div v-if="isMobile" class="w-full flex overflow-x-auto no-scrollbar gap-2 pb-4 pt-2 -mx-2 px-2 sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md z-40">
                    <button 
                        v-for="tab in tabs" 
                        :key="tab.id"
                        :id="'mobile-tab-' + tab.id"
                        @click="activeTab = tab.id"
                        class="whitespace-nowrap px-6 py-3 rounded-2xl font-black text-xs transition-all border flex items-center gap-2"
                        :class="activeTab === tab.id 
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-200 dark:shadow-none' 
                            : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800'"
                    >
                        <span>{{ tab.icon }}</span>
                        {{ $t(tab.tName, tab.name) }}
                    </button>
                </div>

                <!-- 🖥️ DESKTOP SIDEBAR -->
                <aside v-else class="w-full lg:w-80 shrink-0">
                    <div class="space-y-6 pt-2">
                        <nav id="desktop-settings-nav" class="space-y-1.5 p-3 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative z-10 transition-all duration-500">
                            <button 
                                v-for="tab in tabs" 
                                :key="tab.id"
                                :id="'tab-' + tab.id"
                                @click="activeTab = tab.id"
                                class="w-full flex items-center gap-4 p-4 rounded-[1.8rem] transition-all duration-300 group text-left"
                                :class="activeTab === tab.id 
                                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 dark:shadow-indigo-900/40 border border-indigo-500' 
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'"
                            >
                                <span class="text-2xl transition-transform group-hover:scale-110">{{ tab.icon }}</span>
                                <div class="text-left">
                                    <h4 class="text-sm font-black leading-none" :class="activeTab === tab.id ? 'text-white' : 'text-slate-800 dark:text-slate-200'">{{ $t(tab.tName, tab.name) }}</h4>
                                    <p class="text-[10px] font-bold mt-1 opacity-70" :class="activeTab === tab.id ? 'text-indigo-100' : 'text-slate-400'">{{ $t(tab.tDesc, tab.desc) }}</p>
                                </div>
                            </button>
                        </nav>

                        <div class="bg-white dark:bg-slate-900 rounded-[2.2rem] p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3 transition-all duration-500">
                            <div class="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-[1.5rem] border border-slate-100/50 dark:border-slate-700/50 transition-colors duration-500">
                                <span class="font-black text-slate-800 dark:text-slate-200 text-xs transition-colors duration-500">{{ $t('settings_lang_label', 'Language') }}</span>
                                <div class="flex gap-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-inner transition-colors duration-500">
                                    <button id="lang-switch-id" @click="switchLang('id')" :class="currentLocale === 'id' ? 'bg-indigo-600 text-white shadow-lg dark:shadow-none' : 'text-slate-400 dark:text-slate-500'" class="px-4 py-1.5 rounded-lg text-[9px] font-black transition-all">ID</button>
                                    <button id="lang-switch-en" @click="switchLang('en')" :class="currentLocale === 'en' ? 'bg-indigo-600 text-white shadow-lg dark:shadow-none' : 'text-slate-400 dark:text-slate-500'" class="px-4 py-1.5 rounded-lg text-[9px] font-black transition-all">EN</button>
                                </div>
                            </div>
                            
                            <button id="logout-btn" @click="confirmLogout" class="w-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 font-black py-4 rounded-[1.5rem] border border-rose-100 dark:border-rose-500/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-rose-100/50 dark:hover:bg-rose-500/20">
                                <OneForMindIcon name="logout" size="18" stroke-width="2.5" />
                                <span class="text-[10px] font-black">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </aside>

                <!-- Content Area -->
                <main class="flex-grow bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-sm min-h-[600px] transition-all duration-500 relative">
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
                                :userSettings="userSettings"
                                :mustVerifyEmail="mustVerifyEmail"
                                :status="status"
                                :hasPassword="hasPassword"
                                :midtransClientKey="midtrans_client_key"
                            />
                        </transition>
                    </div>

                    <!-- 📱 MOBILE SYSTEM CONTROLS (At bottom of content) -->
                    <div v-if="isMobile" class="mt-12 space-y-4 pt-12 border-t border-slate-100 dark:border-slate-800">
                        <div class="flex items-center justify-between p-5 bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700">
                            <span class="font-black text-slate-800 dark:text-slate-200 text-xs">{{ $t('settings_lang_label') }}</span>
                            <div class="flex gap-1 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                                <button @click="switchLang('id')" :class="currentLocale === 'id' ? 'bg-indigo-600 text-white' : 'text-slate-400'" class="px-5 py-2 rounded-xl text-[10px] font-black transition-all">ID</button>
                                <button @click="switchLang('en')" :class="currentLocale === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-400'" class="px-5 py-2 rounded-xl text-[10px] font-black transition-all">EN</button>
                            </div>
                        </div>
                        <button @click="confirmLogout" class="w-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 font-black py-5 rounded-3xl border border-rose-100 dark:border-rose-500/20 flex items-center justify-center gap-3">
                            <OneForMindIcon name="logout" size="20" stroke-width="2.5" />
                            <span class="text-xs font-black">Sign Out</span>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script>
export default {
    data() {
        return {
            isMobile: false
        }
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    unmounted() {
        window.removeEventListener('resize', this.checkMobile);
    },
    methods: {
        checkMobile() {
            this.isMobile = window.innerWidth < 1024;
        }
    }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>