<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3'; 
import { useTheme } from '@/Composables/useTheme';

// --- DATA USER & HALAMAN ---
const page = usePage();
const user = computed(() => page.props.auth.user);

// --- STATE NAVIGASI MOBILE & MODAL ---
const showingNavigationDropdown = ref(false);
const showLogoutModal = ref(false);

// 🔥 STATE SIDEBAR DESKTOP COLLAPSE
const isSidebarCollapsed = ref(false);

const { initTheme } = useTheme();


onMounted(() => {
     initTheme();
    const savedState = localStorage.getItem('sidebar_collapsed');
    if (savedState !== null) {
        isSidebarCollapsed.value = savedState === 'true';
    }
});

const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
    localStorage.setItem('sidebar_collapsed', isSidebarCollapsed.value);
};

const showModule = (moduleName) => {
    return user.value?.settings?.modules?.[moduleName] !== false;
};

const confirmLogout = () => { 
    router.post(route('logout'));
};

watch(() => page.url, () => {
    showingNavigationDropdown.value = false;
});
</script>

<template>
    <div class="flex h-screen bg-slate-50 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white relative">
        
        <aside 
            class="bg-white dark:bg-slate-900 border-r border-slate-100 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 transition-all duration-300 ease-in-out relative"
            :class="isSidebarCollapsed ? 'w-24' : 'w-72'"
        >
            <button @click="toggleSidebar" class="absolute -right-3 top-8 w-6 h-6 bg-white dark:bg-slate-900 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 shadow-sm transition-all z-30">
                <svg v-if="!isSidebarCollapsed" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path></svg>
                <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path></svg>
            </button>
            
            <div class="h-24 flex items-center px-6" :class="isSidebarCollapsed ? 'justify-center' : 'justify-start px-8'">
                <Link :href="route('dashboard')" class="group flex items-center gap-3">
                    <div class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-200 shrink-0">
                        <img src="/favicon.svg?v=2" alt="Logo" class="w-6 h-6 brightness-0 invert" />
                    </div>
                    <Transition name="fade">
                        <span v-if="!isSidebarCollapsed" class="text-xl font-black tracking-tighter text-slate-900 whitespace-nowrap">
                            OneForMind<span class="text-indigo-600">.</span>
                        </span>
                    </Transition>
                </Link>
            </div>

            <nav class="flex-1 px-4 space-y-2 overflow-y-auto py-6 custom-scrollbar" :class="isSidebarCollapsed ? 'px-4' : 'px-6'">
                <Link :href="route('dashboard')"
                    class="flex items-center rounded-2xl transition-all duration-300 group relative"
                    :class="[
                        route().current('dashboard') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-3 justify-center' : 'px-4 py-3.5 gap-4'
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_dashboard') : ''"
                >
                    <span class="text-xl shrink-0">🏠</span>
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap">{{ $t('nav_dashboard') }}</span>
                    <div v-if="route().current('dashboard') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('habit')" :href="route('habits.index')"
                    class="flex items-center rounded-2xl transition-all duration-300 group relative"
                    :class="[
                        route().current('habits.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-3 justify-center' : 'px-4 py-3.5 gap-4'
                    ]"
                    :title="isSidebarCollapsed ? $t('habit_page_title') : ''"
                >
                    <span class="text-xl shrink-0">🌱</span>
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap">{{ $t('habit_page_title') }}</span>
                    <div v-if="route().current('habits.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('planner')" :href="route('planner.index')"
                    class="flex items-center rounded-2xl transition-all duration-300 group relative"
                    :class="[
                        route().current('planner.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-3 justify-center' : 'px-4 py-3.5 gap-4'
                    ]"
                    :title="isSidebarCollapsed ? 'Daily Planner' : ''"
                >
                    <span class="text-xl shrink-0">📋</span>
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap">Daily Planner</span>
                    <div v-if="route().current('planner.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('finance')" :href="route('finance.index')"
                    class="flex items-center rounded-2xl transition-all duration-300 group relative"
                    :class="[
                        route().current('finance.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-3 justify-center' : 'px-4 py-3.5 gap-4'
                    ]"
                    :title="isSidebarCollapsed ? 'Finance' : ''"
                >
                    <span class="text-xl shrink-0">💸</span>
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap">Finance</span>
                    <div v-if="route().current('finance.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('journal')" :href="route('journal.index')"
                    class="flex items-center rounded-2xl transition-all duration-300 group relative"
                    :class="[
                        route().current('journal.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-3 justify-center' : 'px-4 py-3.5 gap-4'
                    ]"
                    :title="isSidebarCollapsed ? 'Journal' : ''"
                >
                    <span class="text-xl shrink-0">📓</span>
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap">Journal</span>
                    <div v-if="route().current('journal.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"></div>
                </Link>

                 <Link v-if="showModule('calendar')" :href="route('calendar.index')"
                    class="flex items-center rounded-2xl transition-all duration-300 group relative"
                    :class="[
                        route().current('calendar.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-3 justify-center' : 'px-4 py-3.5 gap-4'
                    ]"
                    :title="isSidebarCollapsed ? 'Calendar' : ''"
                >
                    <span class="text-xl shrink-0">📅</span>
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap">Calendar</span>
                    <div v-if="route().current('calendar.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"></div>
                </Link>
            </nav>

            <div class="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2" :class="isSidebarCollapsed ? 'px-3' : 'px-4'">
                
                <Link :href="route('settings.index')"
                    class="flex items-center rounded-2xl transition-all duration-300 group"
                    :class="[
                        route().current('settings.*') ? 'bg-white dark:bg-slate-900 shadow-sm border border-slate-200 text-indigo-600 font-bold' : 'border border-transparent text-slate-500 hover:bg-white dark:bg-slate-900 hover:border-slate-200 hover:shadow-sm hover:text-slate-800',
                        isSidebarCollapsed ? 'p-3 justify-center' : 'px-4 py-3 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_settings', 'Pengaturan') : ''"
                >
                    <span class="text-xl shrink-0">⚙️</span>
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap">{{ $t('nav_settings', 'Pengaturan') }}</span>
                </Link>

                <div class="flex items-center justify-between group" :class="isSidebarCollapsed ? 'flex-col gap-2' : 'p-2'">
                    <Link :href="route('profile.edit')" class="flex items-center gap-3 hover:opacity-80 transition min-w-0" :title="isSidebarCollapsed ? $t('edit_profile', 'Edit Profil') : ''">
                        <img v-if="user?.avatar_url" :src="user.avatar_url" alt="Avatar" class="w-10 h-10 rounded-full object-cover shadow-sm border-2 border-white shrink-0" />
                        <div v-else class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shrink-0">
                            {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
                        </div>
                        
                        <div v-if="!isSidebarCollapsed" class="flex-1 min-w-0 overflow-hidden">
                            <p class="text-xs font-black text-slate-800 truncate">{{ user?.name || 'User' }}</p>
                            <p class="text-[10px] font-bold text-slate-400 truncate">{{ $t('edit_profile', 'Edit Profil') }}</p>
                        </div>
                    </Link>

                    <button @click="showLogoutModal = true" type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors shrink-0" :title="$t('nav_logout', 'Keluar')">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </button>
                </div>
            </div>
        </aside>

        <main class="flex-1 overflow-y-auto relative w-full bg-slate-50/50 custom-scrollbar">
            
            <div class="md:hidden bg-white dark:bg-slate-900/90 backdrop-blur-xl h-16 flex items-center justify-between px-6 border-b border-slate-100 sticky top-0 z-50 shadow-sm">
                  <Link :href="route('dashboard')" class="group flex items-center gap-3">
                    <div class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
                        <img src="/favicon.svg?v=2" alt="Logo" class="w-6 h-6 brightness-0 invert" />
                    </div>
                    <span class="text-lg font-black tracking-tighter text-slate-900">OneForMind<span class="text-indigo-600">.</span></span>
                </Link>
                <button @click="showingNavigationDropdown = !showingNavigationDropdown" class="text-slate-500 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-slate-50">
                    <span v-if="!showingNavigationDropdown" class="text-2xl">☰</span>
                    <span v-else class="text-2xl font-bold">✕</span>
                </button>
            </div>

            <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
                <div v-show="showingNavigationDropdown" class="md:hidden fixed inset-0 top-16 z-40 bg-white dark:bg-slate-900/95 backdrop-blur-lg overflow-y-auto">
                    <div class="p-4 space-y-2 pb-24">
                        <Link :href="route('dashboard')" class="block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg" :class="route().current('dashboard') ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'" @click="showingNavigationDropdown = false">
                            <span>🏠</span> {{ $t('nav_dashboard', 'Dashboard') }}
                        </Link>
                        <Link :href="route('settings.index')" class="block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg" :class="route().current('settings.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'" @click="showingNavigationDropdown = false">
                            <span>⚙️</span> {{ $t('nav_settings', 'Pengaturan') }}
                        </Link>
                        <Link :href="route('profile.edit')" class="block px-4 py-4 rounded-2xl font-bold transition flex items-center gap-3 text-lg text-slate-600 hover:bg-slate-50" @click="showingNavigationDropdown = false">
                            <span>👤</span> {{ $t('edit_profile', 'Profil') }}
                        </Link>
                        <div class="border-t border-slate-100 my-4 pt-4">
                            <button @click="showLogoutModal = true; showingNavigationDropdown = false" type="button" class="w-full text-center py-4 text-rose-500 font-bold bg-rose-50 rounded-2xl hover:bg-rose-100 transition flex items-center justify-center gap-2">
                                <span>🚪</span> {{ $t('nav_logout', 'Keluar') }}
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>

            <div class="w-full relative z-0">
                <slot />
            </div>
        </main>

        <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showLogoutModal = false"></div>
                <div class="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
                    <div class="p-8 text-center">
                        <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">👋</div>
                        <h3 class="text-2xl font-black text-slate-800 tracking-tight mb-2">{{ $t('modal_logout_title', 'Keluar Akun?') }}</h3>
                        <p class="text-slate-500 text-sm font-medium leading-relaxed">{{ $t('modal_logout_subtitle', 'Sesi Anda akan diakhiri.') }}</p>
                    </div>
                    <div class="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-3">
                        <button @click="confirmLogout" class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 hover:bg-rose-600 active:scale-[0.98] transition-all">{{ $t('modal_logout_confirm', 'Ya, Keluar') }}</button>
                        <button @click="showLogoutModal = false" class="w-full bg-white dark:bg-slate-900 text-slate-500 font-bold py-4 rounded-2xl border border-slate-200 hover:bg-slate-100 active:scale-[0.98] transition-all">{{ $t('modal_logout_cancel', 'Batal') }}</button>
                    </div>
                </div>
            </div>
        </Transition>

    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>