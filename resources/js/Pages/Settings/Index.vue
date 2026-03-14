<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
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
</script>

<template>
    <Head :title="$t('settings_title', 'Pengaturan')" />

    <AuthenticatedLayout>
        <div class="max-w-6xl mx-auto py-12 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <!-- Header -->
            <div class="mb-10 text-center md:text-left">
                <h1 class="text-4xl font-black text-slate-800 tracking-tighter italic">{{ $t('settings_header', 'Pusat Kendali Akun') }}</h1>
                <p class="text-sm font-bold text-slate-400 mt-2 italic">{{ $t('settings_subheader', 'Atur segalanya tentang pengalaman produktivitas Anda di sini.') }}</p>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Sidebar Navigation -->
                <aside class="w-full lg:w-72 shrink-0">
                    <nav class="space-y-1.5 p-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-8">
                        <button 
                            v-for="tab in tabs" 
                            :key="tab.id"
                            @click="activeTab = tab.id"
                            class="w-full flex items-center gap-4 p-4 rounded-[2rem] transition-all duration-300 group"
                            :class="activeTab === tab.id 
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                                : 'text-slate-600 hover:bg-slate-50'"
                        >
                            <span class="text-xl transition-transform group-hover:scale-110">{{ tab.icon }}</span>
                            <div class="text-left">
                                <h4 class="text-sm font-black leading-none" :class="activeTab === tab.id ? 'text-white' : 'text-slate-800'">{{ $t(tab.tName, tab.name) }}</h4>
                                <p class="text-[10px] font-bold mt-1 opacity-70 italic" :class="activeTab === tab.id ? 'text-indigo-100' : 'text-slate-400'">{{ $t(tab.tDesc, tab.desc) }}</p>
                            </div>
                            
                            <div v-if="activeTab === tab.id" class="ml-auto">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                        </button>
                    </nav>
                </aside>

                <!-- Content Area -->
                <main class="flex-grow bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm min-h-[500px]">
                    <div class="max-w-2xl">
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