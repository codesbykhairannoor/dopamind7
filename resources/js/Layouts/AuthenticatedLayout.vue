<script setup>
import { ref, computed } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import { loadLanguageAsync } from 'laravel-vue-i18n';

// --- DATA USER & HALAMAN ---
const page = usePage();
const user = computed(() => page.props.auth.user);
const currentLang = computed(() => page.props.locale || 'id'); 

// --- STATE NAVIGASI MOBILE ---
const showingNavigationDropdown = ref(false);

// --- LOGIC CEK MODUL AKTIF ---
const showModule = (moduleName) => {
    return user.value.settings?.modules?.[moduleName] ?? true;
};

// --- FUNGSI GANTI BAHASA ---
const switchLang = (lang) => {
    router.visit(route('lang.switch', lang), {
        method: 'get',
        preserveScroll: true,
        onSuccess: () => {
            loadLanguageAsync(lang);
        }
    });
};

// --- HELPER ACTIVE LINK ---
const isActive = (routeName) => route().current(routeName);

// --- NAVIGASI CLEAN (Mencegah Partial Reload Leakage) ---
const navigateTo = (routeName) => {
    showingNavigationDropdown.value = false;
    router.get(route(routeName), {}, {
        preserveState: false, // Memastikan state halaman sebelumnya dibuang
        preserveScroll: false
    });
};
</script>

<template>
    <div class="flex h-screen bg-slate-50 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white">
        
        <aside class="w-72 bg-white border-r border-slate-100 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 transition-all duration-300">
            
            <div class="h-24 flex items-center px-8">
                <Link :href="route('dashboard')" class="group flex items-center gap-3">
                    <span class="text-3xl transition-transform duration-500 group-hover:rotate-180 text-indigo-600">✦</span>
                    <span class="text-2xl font-black text-indigo-950 tracking-tighter">DopaMind.</span>
                </Link>
            </div>

            <nav class="flex-1 px-6 space-y-2 overflow-y-auto py-6 custom-scrollbar">
                
                <Link 
                    :href="route('dashboard')" 
                    class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
                    :class="isActive('dashboard') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'"
                >
                    <span class="text-xl">🏠</span>
                    <span>{{ $t('nav_dashboard') }}</span>
                </Link>

                <Link 
                    v-if="showModule('habit')"
                    :href="route('habits.index')" 
                    class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
                    :class="isActive('habits.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'"
                >
                    <span class="text-xl">🌱</span>
                    <span>{{ $t('habit_page_title') }}</span>
                </Link>

                <Link 
                    v-if="showModule('planner')"
                    :href="route('planner.index')" 
                    class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
                    :class="isActive('planner.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'"
                >
                    <span class="text-xl">📅</span>
                    <span>Daily Planner</span>
                </Link>

                <Link 
                    v-if="showModule('finance')"
                    :href="route('finance.index')" 
                    class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
                    :class="isActive('finance.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'"
                >
                    <span class="text-xl">💸</span>
                    <span>Finance</span>
                </Link>
                
            </nav>

            <div class="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                
                <Link 
                    :href="route('settings.index')" 
                    class="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-indigo-600 hover:bg-white transition border border-transparent hover:border-slate-200 hover:shadow-sm"
                >
                    <span class="text-lg">⚙️</span>
                    <span>{{ $t('nav_settings') }}</span>
                </Link>

                <div class="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button @click="switchLang('id')" class="flex-1 py-1.5 text-xs font-bold rounded-lg transition-all" :class="currentLang === 'id' ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'">🇮🇩 ID</button>
                    <button @click="switchLang('en')" class="flex-1 py-1.5 text-xs font-bold rounded-lg transition-all" :class="currentLang === 'en' ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'">🇬🇧 EN</button>
                </div>

                <div class="flex items-center gap-3 pt-2 border-t border-slate-200/50">
                    <div class="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-200">
                        {{ user.name.charAt(0).toUpperCase() }}
                    </div>
                    <div class="flex-1 overflow-hidden">
                        <p class="text-xs font-bold text-indigo-950 truncate">{{ user.name }}</p>
                        <Link :href="route('logout')" method="post" as="button" class="text-[10px] text-rose-500 hover:text-rose-700 font-bold hover:underline transition uppercase tracking-wide">
                            {{ $t('nav_logout') }}
                        </Link>
                    </div>
                </div>
            </div>
        </aside>

        <main class="flex-1 overflow-y-auto relative w-full bg-slate-50/50">
            
            <div class="md:hidden bg-white/80 backdrop-blur-md h-16 flex items-center justify-between px-6 border-b border-slate-100 sticky top-0 z-30 shadow-sm">
                <Link :href="route('dashboard')" class="flex items-center gap-2">
                    <span class="text-2xl text-indigo-600">✦</span>
                    <span class="font-black text-indigo-950 text-lg tracking-tight">DopaMind.</span>
                </Link>
                <button @click="showingNavigationDropdown = !showingNavigationDropdown" class="text-slate-500 hover:text-indigo-600 transition">
                    <span v-if="!showingNavigationDropdown" class="text-2xl">☰</span>
                    <span v-else class="text-2xl">✕</span>
                </button>
            </div>

            <div v-show="showingNavigationDropdown" class="md:hidden bg-white border-b border-slate-100 p-4 shadow-xl space-y-2 animate-in slide-in-from-top-2 absolute w-full z-40">
                
                <Link 
                    :href="route('dashboard')" 
                    class="block px-4 py-3 rounded-xl font-bold transition" 
                    :class="isActive('dashboard') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'"
                    @click="showingNavigationDropdown = false"
                >
                    {{ $t('nav_dashboard') }}
                </Link>

                <Link 
                    v-if="showModule('habit')" 
                    :href="route('habits.index')" 
                    class="block px-4 py-3 rounded-xl font-bold transition" 
                    :class="isActive('habits.*') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'"
                    @click="showingNavigationDropdown = false"
                >
                    {{ $t('habit_page_title') }}
                </Link>

                <Link 
                    v-if="showModule('planner')" 
                    :href="route('planner.index')" 
                    class="block px-4 py-3 rounded-xl font-bold transition" 
                    :class="isActive('planner.*') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'"
                    @click="showingNavigationDropdown = false"
                >
                    Daily Planner
                </Link>

                <Link 
                    v-if="showModule('finance')" 
                    :href="route('finance.index')" 
                    class="block px-4 py-3 rounded-xl font-bold transition" 
                    :class="isActive('finance.*') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'"
                    @click="showingNavigationDropdown = false"
                >
                    Finance
                </Link>

                <Link 
                    :href="route('settings.index')" 
                    class="block px-4 py-3 rounded-xl font-bold transition" 
                    :class="isActive('settings.*') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'"
                    @click="showingNavigationDropdown = false"
                >
                    {{ $t('nav_settings') }}
                </Link>

                <hr class="border-slate-100 my-2">

                <div class="flex gap-2 px-2">
                    <button @click="switchLang('id')" class="flex-1 py-2 rounded-lg text-xs font-bold border transition" :class="currentLang === 'id' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-100 text-slate-400'">🇮🇩 INDO</button>
                    <button @click="switchLang('en')" class="flex-1 py-2 rounded-lg text-xs font-bold border transition" :class="currentLang === 'en' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-100 text-slate-400'">🇬🇧 ENG</button>
                </div>

                <div class="pt-2 border-t border-slate-100 px-4 flex justify-between items-center mt-2">
                    <span class="text-sm font-bold text-slate-700">{{ user.name }}</span>
                    <Link :href="route('logout')" method="post" as="button" class="text-sm text-rose-500 font-bold">
                        {{ $t('nav_logout') }}
                    </Link>
                </div>
            </div>

            <div class="w-full h-full">
                <slot />
            </div>
        </main>
    </div>
</template>