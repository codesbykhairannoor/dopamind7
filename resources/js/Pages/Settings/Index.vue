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
        <div class="max-w-6xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-40">
            <!-- Header Section -->
            <div class="mb-12 text-center md:text-left">
                <h1 class="text-4xl font-black text-slate-900 tracking-tight">{{ $t('settings_header', 'Account Settings') }}</h1>
                <p class="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">{{ $t('settings_subheader', 'Customize your productivity experience') }}</p>
            </div>

            <!-- Profile Overview Card -->
            <div class="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row items-center gap-8 mb-10 relative overflow-hidden group">
                <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                
                <div class="relative shrink-0">
                    <img v-if="user?.avatar_url" :src="user.avatar_url" alt="Avatar" class="w-24 h-24 rounded-full object-cover shadow-2xl border-4 border-white" />
                    <div v-else class="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-4xl shadow-2xl border-4 border-white">
                        {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
                    </div>
                </div>
                
                <div class="flex-1 text-center md:text-left min-w-0">
                    <h2 class="text-3xl font-black text-slate-800 truncate leading-tight">{{ user?.name || 'User' }}</h2>
                    <p class="text-slate-400 font-bold mt-1">{{ user?.email }}</p>
                    <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                        <span class="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-wider">Platinum User</span>
                        <span class="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-wider">ID: #{{ user?.id }}</span>
                    </div>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Sidebar Navigation -->
                <aside class="w-full lg:w-80 shrink-0">
                    <div class="space-y-6 pt-2">
                        <!-- Navigation Menu -->
                        <nav class="space-y-1.5 p-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm relative z-10">
                            <button 
                                v-for="tab in tabs" 
                                :key="tab.id"
                                @click="activeTab = tab.id"
                                class="w-full flex items-center gap-4 p-4 rounded-[1.8rem] transition-all duration-300 group"
                                :class="activeTab === tab.id 
                                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                                    : 'text-slate-600 hover:bg-slate-50'"
                            >
                                <span class="text-2xl transition-transform group-hover:scale-110">{{ tab.icon }}</span>
                                <div class="text-left">
                                    <h4 class="text-sm font-black leading-none" :class="activeTab === tab.id ? 'text-white' : 'text-slate-800'">{{ $t(tab.tName, tab.name) }}</h4>
                                    <p class="text-[10px] font-bold mt-1 opacity-70" :class="activeTab === tab.id ? 'text-indigo-100' : 'text-slate-400'">{{ $t(tab.tDesc, tab.desc) }}</p>
                                </div>
                            </button>
                        </nav>

                        <!-- System Controls Page (Language & Logout) -->
                        <div class="bg-white rounded-[2.2rem] p-4 shadow-sm border border-slate-100 space-y-3">
                            <!-- Language Switcher -->
                            <div class="flex items-center justify-between p-4 bg-slate-50/50 rounded-[1.5rem] border border-slate-100/50">
                                <span class="font-black text-slate-800 text-xs uppercase tracking-widest">{{ $t('settings_lang_label', 'Language') }}</span>
                                <div class="flex gap-1 p-1 bg-white rounded-xl border border-slate-200/50 shadow-inner">
                                    <button @click="switchLang('id')" :class="currentLocale === 'id' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'" class="px-4 py-1.5 rounded-lg text-[9px] font-black transition-all">ID</button>
                                    <button @click="switchLang('en')" :class="currentLocale === 'en' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'" class="px-4 py-1.5 rounded-lg text-[9px] font-black transition-all">EN</button>
                                </div>
                            </div>
                            
                            <!-- Logout Button -->
                            <button @click="confirmLogout" class="w-full bg-rose-50 text-rose-500 font-black py-4 rounded-[1.5rem] border border-rose-100 flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-rose-100/50">
                                <OneForMindIcon name="logout" size="18" stroke-width="2.5" />
                                <span class="text-[10px] uppercase tracking-[0.2em] font-black">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </aside>

                <!-- Content Area -->
                <main class="flex-grow bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm min-h-[600px]">
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
                </main>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
/* No italics used as per request */
</style>