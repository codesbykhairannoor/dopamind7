<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3'; 
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import ThemeToggle from '@/Components/ThemeToggle.vue';
import { useAppearance } from '@/Composables/useAppearance';
import { useGating } from '@/Composables/useGating';
import FeatureLockModal from '@/Components/FeatureLockModal.vue';

// --- DATA USER & HALAMAN ---
const page = usePage();
const { isExplorer, isArchitect, isAiEnabled, canUse, demandAccess, user } = useGating();

// --- STATE NAVIGASI MOBILE & MODAL ---
const showLogoutModal = ref(false);
const showingNavigationDropdown = ref(false);

// 🔥 STATE SIDEBAR DESKTOP COLLAPSE
const isSidebarCollapsed = ref(false);

const { initTheme, isDark } = useAppearance();

onMounted(() => {
    // 🛡️ SAFETY GUARD: If somehow user is null in an authenticated layout, force redirect to login.
    if (!user.value) {
        window.location.href = route('login');
        return;
    }

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

// --- LOCALE / BAHASA ---
const currentLocale = computed(() => page.props.locale);

const switchLang = (lang) => {
    if (lang === currentLocale.value) return;
    router.get(route('lang.switch', { locale: lang }));
};

watch(() => page.url, () => {
    showingNavigationDropdown.value = false;
});

</script>

<template>
    <div class="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white relative transition-colors duration-500">
        
        <aside 
            class="bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none flex-shrink-0 transition-all duration-300 ease-in-out relative"
            :class="isSidebarCollapsed ? 'w-20' : 'w-64'"
        >
            <button @click="toggleSidebar" class="absolute -right-3 top-8 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 shadow-sm dark:shadow-none transition-all z-30">
                <OneForMindIcon :name="!isSidebarCollapsed ? 'chevron-left' : 'chevron-right'" size="14" stroke-width="3" />
            </button>
            
            <div class="h-20 flex items-center px-6 shrink-0" :class="isSidebarCollapsed ? 'justify-center' : 'justify-start px-8'">
                <Link :href="route('dashboard')" prefetch class="group flex items-center gap-2.5">
                    <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-100 dark:shadow-none shrink-0">
                        <img src="/favicon.svg" alt="Logo" class="w-5 h-5 brightness-0 invert" />
                    </div>
                    <Transition name="fade">
                        <span v-if="!isSidebarCollapsed" class="text-lg font-black tracking-tighter text-slate-900 dark:text-white whitespace-nowrap">
                            OneForMind
                        </span>
                    </Transition>
                </Link>
            </div>

            <nav class="flex-1 px-3 space-y-0.5 overflow-y-auto py-2 custom-scrollbar transition-all duration-500" :class="isSidebarCollapsed ? 'px-3' : 'px-4'">
                <!-- CORE SECTIONS -->
                <div class="px-3 pt-1 pb-1">
                    <span class="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">{{ $t('nav_core_modules') }}</span>
                </div>

                <Link :href="route('dashboard')" prefetch
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('dashboard') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm dark:shadow-none font-bold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium',
                        isSidebarCollapsed ? 'p-2 justify-center' : 'px-3 py-1.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_item_dashboard') : ''"
                >
                    <OneForMindIcon name="dashboard" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">{{ $t('nav_item_dashboard') }}</span>
                    <div v-if="route().current('dashboard') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('habit')" :href="route('habits.index')" prefetch
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('habits.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium',
                        isSidebarCollapsed ? 'p-2 justify-center' : 'px-3 py-1.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_item_habit') : ''"
                >
                    <OneForMindIcon name="habit" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">{{ $t('nav_item_habit') }}</span>
                    <div v-if="route().current('habits.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('planner')" :href="route('planner.index')" prefetch
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('planner.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_item_planner') : ''"
                >
                    <OneForMindIcon name="planner" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">{{ $t('nav_item_planner') }}</span>
                    <div v-if="route().current('planner.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <Link v-if="showModule('finance')" :href="route('finance.index')" prefetch
                    class="flex items-center rounded-xl transition-all duration-300 group relative"
                    :class="[
                        route().current('finance.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3'
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_item_finance') : ''"
                >
                    <OneForMindIcon name="finance" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm">{{ $t('nav_item_finance') }}</span>
                    <div v-if="route().current('finance.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </Link>

                <!-- PLATINUM SUITE SECTIONS -->
                <div class="px-3 pt-4 pb-1">
                    <span class="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">{{ $t('nav_platinum_suite') }}</span>
                </div>

                <div v-if="showModule('journal')"
                    @click="demandAccess('journal', route('journal.index'))"
                    class="flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer"
                    :class="[
                        route().current('journal.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3',
                        !canUse('journal') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_item_journal') : ''"
                >
                    <OneForMindIcon name="journal" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm flex items-center justify-between w-full">
                        {{ $t('nav_item_journal') }}
                        <div v-if="!canUse('journal')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                    </span>
                    <div v-if="route().current('journal.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </div>

                <div v-if="showModule('calendar')"
                    @click="demandAccess('calendar', route('calendar.index'))"
                    class="flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer"
                    :class="[
                        route().current('calendar.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3',
                        !canUse('calendar') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_item_calendar') : ''"
                >
                    <OneForMindIcon name="calendar" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm flex items-center justify-between w-full">
                        {{ $t('nav_item_calendar') }}
                        <div v-if="!canUse('calendar')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                    </span>
                    <div v-if="route().current('calendar.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </div>

                <div v-if="showModule('job')"
                    @click="demandAccess('job', route('jobs.index'))"
                    class="flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer"
                    :class="[
                        route().current('jobs.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3',
                        !canUse('job') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_item_jobs') : ''"
                >
                    <OneForMindIcon name="job" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm flex items-center justify-between w-full">
                        {{ $t('nav_item_jobs') }}
                        <div v-if="!canUse('job')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                    </span>
                    <div v-if="route().current('jobs.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </div>

                <div v-if="showModule('goal')"
                    @click="demandAccess('goal', route('goals.index'))"
                    class="flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer"
                    :class="[
                        route().current('goals.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-bold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-3',
                        !canUse('goal') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_item_goals') : ''"
                >
                    <OneForMindIcon name="goal" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-sm flex items-center justify-between w-full">
                        {{ $t('nav_item_goals') }}
                        <div v-if="!canUse('goal')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                    </span>
                    <div v-if="route().current('goals.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                </div>

            </nav>
            
            <div class="px-4 py-3 shrink-0">
                <ThemeToggle :collapsed="isSidebarCollapsed" />
            </div>

            <div class="px-3 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 space-y-1 shrink-0">
                <div 
                    class="flex items-center p-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl mb-4 border border-slate-200/50 dark:border-slate-700/50 shadow-inner"
                    :class="isSidebarCollapsed ? 'flex-col gap-1 w-10 mx-auto' : 'mx-1 gap-1'"
                >
                    <button 
                        @click="switchLang('id')" 
                        class="flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all duration-300"
                        :class="currentLocale === 'id' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md dark:shadow-none ring-1 ring-slate-200/50' : 'text-slate-400 hover:text-slate-600'"
                        :title="isSidebarCollapsed ? 'Bahasa Indonesia' : ''"
                    >
                        ID
                    </button>
                    <button 
                        @click="switchLang('en')" 
                        class="flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all duration-300"
                        :class="currentLocale === 'en' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md dark:shadow-none ring-1 ring-slate-200/50' : 'text-slate-400 hover:text-slate-600'"
                        :title="isSidebarCollapsed ? 'English' : ''"
                    >
                        EN
                    </button>
                </div>


                <!-- GO PRO / UPGRADE BUTTON (Explorer Only) -->
                <Link v-if="isExplorer" :href="route('billing')" 
                    class="flex items-center rounded-xl transition-all duration-500 group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none mb-2"
                    :class="isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2.5 gap-2.5'"
                    title="Upgrade to Architect"
                >
                    <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <OneForMindIcon name="premium" size="18" class="shrink-0 relative z-10 animate-pulse" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-[10px] font-black uppercase tracking-widest relative z-10">{{ $t('nav_upgrade_pro') }}</span>
                </Link>

                <Link :href="route('settings.index')" prefetch
                    class="flex items-center rounded-xl transition-all duration-300 group"
                    :class="[
                        route().current('settings.*') ? 'bg-white dark:bg-slate-800 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 font-bold' : 'border border-transparent text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm dark:hover:shadow-none hover:text-slate-800 dark:hover:text-slate-100',
                        isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2 gap-2.5'
                    ]"
                    :title="isSidebarCollapsed ? $t('nav_item_settings') : ''"
                >
                    <OneForMindIcon name="settings" size="18" class="shrink-0" />
                    <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-xs font-bold">{{ $t('nav_item_settings') }}</span>
                </Link>

                <div class="flex items-center justify-between group" :class="isSidebarCollapsed ? 'flex-col gap-2' : 'px-2 py-1'">
                    <div class="flex items-center gap-2.5 min-w-0" :title="isSidebarCollapsed ? user?.name : ''">
                        <img v-if="user?.avatar_url" :src="user.avatar_url" :alt="$t('nav_avatar', 'Avatar')" class="w-8 h-8 rounded-full object-cover shadow-sm dark:shadow-none border border-white shrink-0" />
                        <div v-else class="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-50 text-white flex items-center justify-center font-bold text-[10px] shadow-md dark:shadow-none shrink-0">
                            {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
                        </div>
                        
                        <div v-if="!isSidebarCollapsed" class="flex-1 min-w-0 overflow-hidden">
                            <p class="text-[10px] font-bold text-slate-800 dark:text-slate-200 truncate">{{ user?.name || $t('nav_user_fallback') }}</p>
                            <p class="text-[9px] font-bold text-slate-400 truncate uppercase tracking-widest">{{ $t('nav_active_account') }}</p>
                        </div>
                    </div>

                    <button @click="showLogoutModal = true" type="button" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors shrink-0" :title="$t('nav_logout', 'Keluar')">
                        <OneForMindIcon name="logout" size="16" stroke-width="2.5" />
                    </button>
                </div>
            </div>
        </aside>

        <main class="flex-1 overflow-y-auto relative w-full bg-slate-50/50 dark:bg-slate-950 custom-scrollbar pb-32 md:pb-0 transition-colors duration-500">
            
            <!-- Mobile Top Bar Removed for cleaner look -->


            <!-- REFINED MOBILE BOTTOM NAVIGATION BAR -->
            <div class="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border-t border-slate-100 dark:border-slate-800 safe-area-pb transition-colors duration-500 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
                <div class="flex items-center justify-around h-20 px-2 pt-1 pb-2">
                    <!-- Dashboard -->
                    <Link :href="route('dashboard')" prefetch
                          class="flex flex-col items-center justify-center gap-1 transition-all flex-1"
                          :class="route().current('dashboard') ? 'text-indigo-600' : 'text-slate-400'">
                        <OneForMindIcon name="dashboard" :size="20" stroke-width="2.5" />
                        <span class="text-[9px] font-black">{{ $t('nav_item_dashboard') }}</span>
                    </Link>
                    
                    <!-- Habits -->
                    <Link v-if="showModule('habit')" :href="route('habits.index')" prefetch 
                          class="flex flex-col items-center justify-center gap-1 transition-all flex-1"
                          :class="route().current('habits.*') ? 'text-indigo-600' : 'text-slate-400'">
                        <OneForMindIcon name="habit" :size="20" stroke-width="2.5" />
                        <span class="text-[9px] font-black">{{ $t('nav_item_habit') }}</span>
                    </Link>

                    <!-- AI COACH (CENTER - PROTRUDING) -->
                    <button @click="demandAccess('ai_coach', route('coach.index'))"
                          class="relative -top-3 lg:-top-5 flex-1 flex flex-col items-center transition-all duration-500"
                          :class="!isAiEnabled && !isExplorer ? 'opacity-40 grayscale' : ''">
                        <div class="w-14 h-14 lg:w-[4.25rem] lg:h-[4.25rem] bg-slate-900 dark:bg-indigo-600 rounded-2xl lg:rounded-[1.75rem] flex items-center justify-center shadow-lg transition-all active:scale-90 border-[4px] border-white dark:border-slate-950 overflow-hidden group">
                           <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <OneForMindIcon name="sparkles" :size="20" class="text-white relative z-10" />
                        </div>
                        <div class="flex items-center gap-1 mt-1">
                            <span class="text-[8px] font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">{{ isAiEnabled ? 'Neural OS' : 'Platinum OS' }}</span>
                        </div>
                    </button>

                    <!-- More Launcher -->
                    <Link :href="route('more.index')" prefetch 
                          class="flex flex-col items-center justify-center gap-1 transition-all flex-1"
                          :class="route().current('more.index') ? 'text-indigo-600' : 'text-slate-400'">
                        <OneForMindIcon name="menu" :size="20" stroke-width="2.5" />
                        <span class="text-[9px] font-black">{{ $t('nav_item_more') }}</span>
                    </Link>

                    <!-- Settings -->
                    <Link :href="route('settings.index')" prefetch 
                          class="flex flex-col items-center justify-center gap-1 transition-all flex-1"
                          :class="route().current('settings.*') ? 'text-indigo-600' : 'text-slate-400'">
                        <OneForMindIcon name="settings" :size="20" stroke-width="2.5" />
                        <span class="text-[9px] font-black">{{ $t('nav_item_settings') }}</span>
                    </Link>
                </div>
            </div>

            <div class="w-full relative z-0">
                <slot />
            </div>
        </main>

        <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <div class="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm" @click="showLogoutModal = false"></div>
                <div class="relative bg-white dark:bg-slate-900 w-full max-sm rounded-[2.5rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
                    <div class="p-8 text-center">
                        <div class="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <OneForMindIcon name="logout" size="40" stroke-width="2.5" />
                        </div>
                        <h3 class="text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2">{{ $t('modal_logout_title', 'Keluar Akun?') }}</h3>
                        <p class="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{{ $t('modal_logout_subtitle', 'Sesi Anda akan diakhiri.') }}</p>
                    </div>
                    <div class="p-6 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                        <button @click="confirmLogout" class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-600 active:scale-[0.98] transition-all">{{ $t('modal_logout_confirm', 'Ya, Keluar') }}</button>
                        <button @click="showLogoutModal = false" class="w-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold py-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-[0.98] transition-all">{{ $t('modal_logout_cancel', 'Batal') }}</button>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- FLOATING AI COACH BUTTON (DESKTOP ONLY) -->
        <button 
            v-if="!route().current('coach.*')"
            @click="demandAccess('ai_coach', route('coach.index'))"
            class="hidden md:block fixed bottom-10 right-10 z-[100] group"
        >
            <div class="relative">
                <!-- Outer Glow -->
                <div class="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                
                <!-- Main Button -->
                <div class="relative w-16 h-16 bg-slate-900 dark:bg-indigo-600 rounded-[1.8rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 active:scale-95 ring-4 ring-white dark:ring-slate-950 group-hover:ring-indigo-50 dark:group-hover:ring-indigo-500/20 overflow-hidden"
                     :class="!isAiEnabled && !isExplorer ? 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100' : ''">
                    <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <OneForMindIcon name="sparkles" size="28" stroke-width="2" class="text-white group-hover:rotate-[20deg] transition-transform duration-500 relative z-10" />
                    
                    <!-- Notification/Locked Dot -->
                    <span v-if="isAiEnabled" class="absolute top-4 right-4 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse z-20"></span>
                    <span v-else class="absolute top-4 right-4 w-2 h-2 bg-indigo-400 border border-white dark:border-slate-900 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.5)] z-20"></span>
                </div>
                
                <!-- Hover Label -->
                <div class="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-5 py-3 rounded-2xl whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-2xl border border-white/10 flex items-center gap-2">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    {{ $t('nav_neural_active') }}
                </div>
            </div>
        </button>

        <FeatureLockModal />
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>