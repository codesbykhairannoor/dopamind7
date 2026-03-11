<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3'; 
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

// --- DATA USER & HALAMAN ---
const page = usePage();
const user = computed(() => page.props.auth.user);

// --- STATE NAVIGASI MOBILE & MODAL ---
const showingNavigationDropdown = ref(false);
const showLogoutModal = ref(false);

// 🔥 STATE SIDEBAR DESKTOP COLLAPSE
const isSidebarCollapsed = ref(false);

onMounted(() => {
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
            class="bg-white border-r border-slate-100 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 transition-all duration-300 ease-in-out relative"
            :class="isSidebarCollapsed ? 'w-20' : 'w-64'"
        >
            <button @click="toggleSidebar" class="absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 shadow-sm transition-all z-30">
                <OneForMindIcon :name="!isSidebarCollapsed ? 'chevron-left' : 'chevron-right'" size="14" stroke-width="3" />
            </button>
            
            <div class="h-20 flex items-center px-6 shrink-0" :class="isSidebarCollapsed ? 'justify-center' : 'justify-start px-8'">
                <Link :href="route('dashboard')" prefetch class="group flex items-center gap-2.5">
                    <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-100 shrink-0">
                        <img src="/favicon.svg?v=2" alt="Logo" class="w-5 h-5 brightness-0 invert" />
                    </div>
                    <Transition name="fade">
                        <span v-if="!isSidebarCollapsed" class="text-lg font-black tracking-tighter text-slate-900 whitespace-nowrap">
                            OneForMind<span class="text-indigo-600">.</span>
                        </span>
                    </Transition>
                </Link>
            </div>

            <nav class="flex-1 px-3 space-y-1 overflow-y-auto py-4 custom-scrollbar" :class="isSidebarCollapsed ? 'px-3' : 'px-4'">
                <Link :href="route('dashboard')" prefetch="hover"
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('dashboard') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_dashboard') : ''"
                >
                    <OneForMindIcon name="dashboard" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">{{ $t('nav_dashboard', 'Dashboard') }}</span>
                    <div v-if="route().current('dashboard') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('habit')" :href="route('habits.index')" prefetch="hover"
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('habits.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? $t('habit_page_title') : ''"
                >
                    <OneForMindIcon name="habit" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">{{ $t('habit_page_title', 'Habit Tracker') }}</span>
                    <div v-if="route().current('habits.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('planner')" :href="route('planner.index')" prefetch="hover"
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('planner.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? 'Daily Planner' : ''"
                >
                    <OneForMindIcon name="planner" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">Daily Planner</span>
                    <div v-if="route().current('planner.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('finance')" :href="route('finance.index')" prefetch="hover"
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('finance.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? 'Finance' : ''"
                >
                    <OneForMindIcon name="finance" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">Finance Plan</span>
                    <div v-if="route().current('finance.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('journal')" :href="route('journal.index')" prefetch="hover"
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('journal.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? 'Journal' : ''"
                >
                    <OneForMindIcon name="journal" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">Digital Journal</span>
                    <div v-if="route().current('journal.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('calendar')" :href="route('calendar.index')" prefetch="hover"
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('calendar.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? 'Calendar' : ''"
                >
                    <OneForMindIcon name="calendar" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">Calendar View</span>
                    <div v-if="route().current('calendar.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('job')" :href="route('jobs.index')" prefetch="hover"
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('jobs.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? $t('job_tracker') : ''"
                >
                    <OneForMindIcon name="job" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">Job Tracker</span>
                    <div v-if="route().current('jobs.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('goal')" :href="route('goals.index')" prefetch="hover"
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('goals.*') ? 'bg-indigo-50 text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? $t('goal_page_title') : ''"
                >
                    <OneForMindIcon name="goal" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">Goal Tracker</span>
                    <div v-if="route().current('goals.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>
            </nav>

            <div class="px-3 py-3 border-t border-slate-100 bg-slate-50/30 space-y-1 shrink-0">
                <Link :href="route('settings.index')" prefetch
                    class="flex items-center rounded-xl transition-all duration-300 group"
                    :class="[
                        route().current('settings.*') ? 'bg-white shadow-sm border border-slate-200 text-indigo-600 font-bold' : 'border border-transparent text-slate-500 hover:bg-white hover:border-slate-200 hover:shadow-sm hover:text-slate-800',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2 gap-2.5'
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_settings', 'Pengaturan') : ''"
                >
                    <OneForMindIcon name="settings" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-xs font-bold">{{ $t('nav_settings', 'Pengaturan') }}</span>
                </Link>

                <div class="flex items-center justify-between group" :class="isSidebarCollapsed ? 'flex-col gap-2' : 'px-2 py-1'">
                    <Link :href="route('profile.edit')" prefetch class="flex items-center gap-2.5 hover:opacity-80 transition min-w-0" :title="isSidebarCollapsed ? $t('edit_profile', 'Edit Profil') : ''">
                        <img v-if="user?.avatar_url" :src="user.avatar_url" alt="Avatar" class="w-8 h-8 rounded-full object-cover shadow-sm border border-white shrink-0" />
                        <div v-else class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shadow-md shrink-0">
                            {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
                        </div>
                        
                        <div v-if="!isSidebarCollapsed" class="flex-1 min-w-0 overflow-hidden">
                            <p class="text-[10px] font-black text-slate-800 truncate">{{ user?.name || 'User' }}</p>
                            <p class="text-[9px] font-bold text-slate-400 truncate">{{ $t('edit_profile', 'Edit Profil') }}</p>
                        </div>
                    </Link>

                    <button @click="showLogoutModal = true" type="button" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors shrink-0" :title="$t('nav_logout', 'Keluar')">
                        <OneForMindIcon name="logout" size="16" stroke-width="2.5" />
                    </button>
                </div>
            </div>
        </aside>

        <main class="flex-1 overflow-y-auto relative w-full bg-slate-50/50 custom-scrollbar">
            
            <div class="md:hidden bg-white/90 backdrop-blur-xl h-16 flex items-center justify-between px-6 border-b border-slate-100 sticky top-0 z-50 shadow-sm">
                <Link :href="route('dashboard')" prefetch class="group flex items-center gap-3">
                    <div class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
                        <img src="/favicon.svg?v=2" alt="Logo" class="w-6 h-6 brightness-0 invert" />
                    </div>
                    <span class="text-lg font-black tracking-tighter text-slate-900">OneForMind<span class="text-indigo-600">.</span></span>
                </Link>
                <button @click="showingNavigationDropdown = !showingNavigationDropdown" class="text-slate-500 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-slate-50 focus:outline-none">
                    <OneForMindIcon :name="!showingNavigationDropdown ? 'menu' : 'x'" size="24" stroke-width="2.5" />
                </button>
            </div>

            <Transition 
                enter-active-class="transition duration-300 ease-out" 
                enter-from-class="opacity-0 translate-y-[-20px]" 
                enter-to-class="opacity-100 translate-y-0" 
                leave-active-class="transition duration-200 ease-in" 
                leave-from-class="opacity-100 translate-y-0" 
                leave-to-class="opacity-0 translate-y-[-20px]"
            >
                <div v-show="showingNavigationDropdown" class="md:hidden fixed inset-0 top-16 z-40 bg-slate-50/95 backdrop-blur-2xl overflow-y-auto custom-scrollbar">
                    <div class="p-6 space-y-6 pb-32">
                        
                        <Link :href="route('profile.edit')" prefetch @click="showingNavigationDropdown = false" class="flex items-center gap-4 p-5 bg-white rounded-[2rem] shadow-sm border border-slate-100 active:scale-[0.98] transition-transform">
                            <img v-if="user?.avatar_url" :src="user.avatar_url" alt="Avatar" class="w-14 h-14 rounded-full object-cover shadow-sm border-2 border-white shrink-0" />
                            <div v-else class="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                                {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-base font-black text-slate-800 truncate leading-tight mb-1">{{ user?.name || 'User' }}</p>
                                <p class="text-[11px] font-bold uppercase tracking-widest text-indigo-500">{{ $t('edit_profile', 'Edit Profil') }}</p>
                            </div>
                            <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                <OneForMindIcon name="chevron-right" size="14" stroke-width="3" />
                            </div>
                        </Link>

                        <div class="bg-white rounded-[2rem] p-3 shadow-sm border border-slate-100 flex flex-col gap-1">
                            <Link :href="route('dashboard')" prefetch="mount" cacheFor="1m" class="px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base" :class="route().current('dashboard') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'" @click="showingNavigationDropdown = false">
                                <OneForMindIcon name="dashboard" size="20" /> {{ $t('nav_dashboard', 'Dashboard') }}
                            </Link>

                            <Link v-if="showModule('habit')" :href="route('habits.index')" prefetch="mount" cacheFor="1m" class="px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base" :class="route().current('habits.*') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'" @click="showingNavigationDropdown = false">
                                <OneForMindIcon name="habit" size="20" /> {{ $t('habit_page_title', 'Habit Tracker') }}
                            </Link>

                            <Link v-if="showModule('planner')" :href="route('planner.index')" prefetch="mount" cacheFor="1m" class="px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base" :class="route().current('planner.*') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'" @click="showingNavigationDropdown = false">
                                <OneForMindIcon name="planner" size="20" /> Daily Planner
                            </Link>

                            <Link v-if="showModule('finance')" :href="route('finance.index')" prefetch="mount" cacheFor="1m" class="px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base" :class="route().current('finance.*') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'" @click="showingNavigationDropdown = false">
                                <OneForMindIcon name="finance" size="20" /> Finance Plan
                            </Link>

                            <Link v-if="showModule('journal')" :href="route('journal.index')" prefetch="mount" cacheFor="1m" class="px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base" :class="route().current('journal.*') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'" @click="showingNavigationDropdown = false">
                                <OneForMindIcon name="journal" size="20" /> Digital Journal
                            </Link>

                            <Link v-if="showModule('calendar')" :href="route('calendar.index')" prefetch="mount" cacheFor="1m" class="px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base" :class="route().current('calendar.*') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'" @click="showingNavigationDropdown = false">
                                <OneForMindIcon name="calendar" size="20" /> Calendar View
                            </Link>

                            <Link v-if="showModule('job')" :href="route('jobs.index')" prefetch="mount" cacheFor="1m" class="px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base" :class="route().current('jobs.*') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'" @click="showingNavigationDropdown = false">
                                <OneForMindIcon name="job" size="20" /> Job Tracker
                            </Link>

                            <Link v-if="showModule('goal')" :href="route('goals.index')" prefetch="mount" cacheFor="1m" class="px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base" :class="route().current('goals.*') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'" @click="showingNavigationDropdown = false">
                                <OneForMindIcon name="goal" size="20" /> Goal Tracker
                            </Link>
                        </div>

                        <div class="bg-white rounded-[2rem] p-3 shadow-sm border border-slate-100 flex flex-col gap-1">
                            <Link :href="route('settings.index')" prefetch class="px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center gap-4 text-base" :class="route().current('settings.*') ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'" @click="showingNavigationDropdown = false">
                                <OneForMindIcon name="settings" size="20" /> {{ $t('nav_settings', 'Pengaturan') }}
                            </Link>
                            
                            <div class="h-px w-full bg-slate-100 my-1"></div>

                            <button @click="showLogoutModal = true; showingNavigationDropdown = false" type="button" class="w-full px-5 py-4 rounded-[1.5rem] font-bold transition-all flex items-center justify-center gap-3 text-base text-rose-500 bg-rose-50 hover:bg-rose-100 active:scale-[0.98]">
                                <OneForMindIcon name="logout" size="20" /> {{ $t('nav_logout', 'Keluar') }}
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
                <div class="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
                    <div class="p-8 text-center">
                        <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <OneForMindIcon name="logout" size="40" stroke-width="2.5" />
                        </div>
                        <h3 class="text-2xl font-black text-slate-800 tracking-tight mb-2">{{ $t('modal_logout_title', 'Keluar Akun?') }}</h3>
                        <p class="text-slate-500 text-sm font-medium leading-relaxed">{{ $t('modal_logout_subtitle', 'Sesi Anda akan diakhiri.') }}</p>
                    </div>
                    <div class="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-3">
                        <button @click="confirmLogout" class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 hover:bg-rose-600 active:scale-[0.98] transition-all">{{ $t('modal_logout_confirm', 'Ya, Keluar') }}</button>
                        <button @click="showLogoutModal = false" class="w-full bg-white text-slate-500 font-bold py-4 rounded-2xl border border-slate-200 hover:bg-slate-100 active:scale-[0.98] transition-all">{{ $t('modal_logout_cancel', 'Batal') }}</button>
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