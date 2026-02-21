<script setup>
import { ref, computed, watch } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3'; 

// --- DATA USER & HALAMAN ---
const page = usePage();
const user = computed(() => page.props.auth.user);
const currentLang = computed(() => page.props.locale || 'id'); 

// --- STATE NAVIGASI MOBILE & MODAL ---
const showingNavigationDropdown = ref(false);
const showLogoutModal = ref(false); // 🔥 State baru buat buka/tutup modal

// Logic untuk filter menu (dengan null safety)
const showModule = (moduleName) => {
    return user.value?.settings?.modules?.[moduleName] !== false;
};

/**
 * 🔥 FIX GANTI BAHASA: Pake router.get
 * Ini bakal ngetrigger route '/lang/{locale}' di Laravel.
 * Karena Laravel balikin Inertia::location, browser bakal reload otomatis.
 */
const switchLang = (lang) => {
    router.get(route('lang.switch', lang), {}, {
        preserveState: false,
        preserveScroll: false,
        replace: true
    });
};

/**
 * 🔥 FIX LOGOUT: Konfirmasi Modal
 */
const confirmLogout = () => { 
    router.post(route('logout'));
};

// Tutup menu otomatis saat pindah halaman
watch(() => page.url, () => {
    showingNavigationDropdown.value = false;
});
</script>

<template>
    <div class="flex h-screen bg-slate-50 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white relative">
        
        <aside class="w-72 bg-white border-r border-slate-100 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 transition-all duration-300">
            <div class="h-24 flex items-center px-8">
                <Link :href="route('dashboard')" class="group flex items-center gap-3">
                    <span class="text-3xl transition-transform duration-500 group-hover:rotate-180 text-indigo-600">✦</span>
                    <span class="text-2xl font-black text-indigo-950 tracking-tighter">OneForMind.</span>
                </Link>
            </div>

            <nav class="flex-1 px-6 space-y-2 overflow-y-auto py-6 custom-scrollbar">
                <Link :href="route('dashboard')" prefetch="hover"
                    class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
                    :class="route().current('dashboard') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'">
                    <span class="text-xl">🏠</span>
                    <span>{{ $t('nav_dashboard') }}</span>
                </Link>

                <Link v-if="showModule('habit')" :href="route('habits.index')" prefetch="hover"
                    class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
                    :class="route().current('habits.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'">
                    <span class="text-xl">🌱</span>
                    <span>{{ $t('habit_page_title') }}</span>
                </Link>

                <Link v-if="showModule('planner')" :href="route('planner.index')" prefetch="hover"
                    class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
                    :class="route().current('planner.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'">
                    <span class="text-xl">📅</span>
                    <span>Daily Planner</span>
                </Link>

                <Link v-if="showModule('finance')" :href="route('finance.index')" prefetch="hover"
                    class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
                    :class="route().current('finance.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'">
                    <span class="text-xl">💸</span>
                    <span>Finance</span>
                </Link>
            </nav>

            <div class="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                <Link :href="route('settings.index')" prefetch="hover"
                    class="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-indigo-600 hover:bg-white transition border border-transparent hover:border-slate-200 hover:shadow-sm">
                    <span class="text-lg">⚙️</span>
                    <span>{{ $t('nav_settings') }}</span>
                </Link>

                <div class="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button @click="switchLang('id')" prefetch="hover" class="flex-1 py-1.5 text-xs font-bold rounded-lg transition-all" :class="currentLang === 'id' ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'">🇮🇩 ID</button>
                    <button @click="switchLang('en')" prefetch="hover" class="flex-1 py-1.5 text-xs font-bold rounded-lg transition-all" :class="currentLang === 'en' ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'">🇬🇧 EN</button>
                </div>

                <div class="flex items-center gap-3 pt-2 border-t border-slate-200/50">
                    <div class="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-200">
                        {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
                    </div>
                    <div class="flex-1 overflow-hidden">
                        <p class="text-xs font-bold text-indigo-950 truncate">{{ user?.name || 'User' }}</p>
                        <button @click="showLogoutModal = true" type="button" class="text-[10px] text-rose-500 hover:text-rose-700 font-bold hover:underline transition uppercase tracking-wide text-left">
                            {{ $t('nav_logout') }}
                        </button>
                    </div>
                </div>
            </div>
        </aside>

        <main class="flex-1 overflow-y-auto relative w-full bg-slate-50/50">
            
            <div class="md:hidden bg-white/90 backdrop-blur-xl h-16 flex items-center justify-between px-6 border-b border-slate-100 sticky top-0 z-50 shadow-sm">
                <Link :href="route('dashboard')" class="flex items-center gap-2">
                     <img 
                        src="/favicon.svg?v=2" 
                        alt="OneForMind Logo" 
                        class="w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
                    />
                    <span class="font-black text-indigo-950 text-lg tracking-tight">OneForMind.</span>
                </Link>
                <button @click="showingNavigationDropdown = !showingNavigationDropdown" class="text-slate-500 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-slate-50">
                    <span v-if="!showingNavigationDropdown" class="text-2xl">☰</span>
                    <span v-else class="text-2xl font-bold">✕</span>
                </button>
            </div>

            <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
            >
                <div v-show="showingNavigationDropdown" class="md:hidden fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-lg overflow-y-auto">
                    <div class="p-4 space-y-2 pb-24">
                        <Link :href="route('dashboard')" prefetch="hover"
                            class="block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg" 
                            :class="route().current('dashboard') ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'"
                            @click="showingNavigationDropdown = false">
                            <span>🏠</span> {{ $t('nav_dashboard') }}
                        </Link>

                        <Link v-if="showModule('habit')" :href="route('habits.index')" prefetch="hover"
                            class="block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg" 
                            :class="route().current('habits.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'"
                            @click="showingNavigationDropdown = false">
                            <span>🌱</span> {{ $t('habit_page_title') }}
                        </Link>

                        <Link v-if="showModule('planner')" :href="route('planner.index')" prefetch="hover"
                            class="block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg" 
                            :class="route().current('planner.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'"
                            @click="showingNavigationDropdown = false">
                            <span>📅</span> Daily Planner
                        </Link>

                        <Link v-if="showModule('finance')" :href="route('finance.index')" prefetch="hover"
                            class="block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg" 
                            :class="route().current('finance.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'"
                            @click="showingNavigationDropdown = false">
                            <span>💸</span> Finance Management
                        </Link>

                        <Link :href="route('settings.index')" prefetch="hover"
                            class="block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg" 
                            :class="route().current('settings.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'"
                            @click="showingNavigationDropdown = false">
                            <span>⚙️</span> {{ $t('nav_settings') }}
                        </Link>

                        <div class="border-t border-slate-100 my-4 pt-4">
                            <div class="flex gap-2 px-2 mb-6">
                                <button @click="switchLang('id')" prefetch="hover" class="flex-1 py-3 rounded-xl text-sm font-bold border transition" :class="currentLang === 'id' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-100 text-slate-400'">🇮🇩 INDONESIA</button>
                                <button @click="switchLang('en')" prefetch="hover" class="flex-1 py-3 rounded-xl text-sm font-bold border transition" :class="currentLang === 'en' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-100 text-slate-400'">🇬🇧 ENGLISH</button>
                            </div>

                            <button @click="showLogoutModal = true; showingNavigationDropdown = false" type="button" class="w-full text-center py-4 text-rose-500 font-bold bg-rose-50 rounded-2xl hover:bg-rose-100 transition flex items-center justify-center gap-2">
                                <span>🚪</span> {{ $t('nav_logout') }}
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>

            <div class="w-full relative z-0">
                <slot />
            </div>
        </main>

        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showLogoutModal = false"></div>

                <div class="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
    <div class="p-8 text-center">
        <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
            👋
        </div>
        <h3 class="text-2xl font-black text-slate-800 tracking-tight mb-2">
            {{ $t('modal_logout_title') }}
        </h3>
        <p class="text-slate-500 text-sm font-medium leading-relaxed">
            {{ $t('modal_logout_subtitle') }}
        </p>
    </div>

    <div class="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-3">
        <button 
            @click="confirmLogout"
            class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 hover:bg-rose-600 active:scale-[0.98] transition-all"
        >
            {{ $t('modal_logout_confirm') }}
        </button>
        <button 
            @click="showLogoutModal = false"
            class="w-full bg-white text-slate-500 font-bold py-4 rounded-2xl border border-slate-200 hover:bg-slate-100 active:scale-[0.98] transition-all"
        >
            {{ $t('modal_logout_cancel') }}
        </button>
    </div>
</div>
            </div>
        </Transition>

    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
</style>