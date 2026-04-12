<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3'; 
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useAppearance } from '@/Composables/useAppearance';
import { useGating } from '@/Composables/useGating';
import GlobalHeader from '@/Components/GlobalHeader.vue';

// --- DATA USER & HALAMAN ---
const page = usePage();
const { isExplorer, isAiEnabled, canUse, demandAccess, user } = useGating();

// --- STATE NAVIGASI ---
const showLogoutModal = ref(false);

// 🔥 STATE SIDEBAR DESKTOP COLLAPSE
const isSidebarCollapsed = ref(false);

// 🔥 STATE SECTION COLLAPSE (Monday.com style)
const coreExpanded = ref(true);
const platinumExpanded = ref(true);

const { initTheme } = useAppearance();

onMounted(() => {
    if (!user.value) {
        window.location.href = route('login');
        return;
    }
    initTheme();

    const savedState = localStorage.getItem('sidebar_collapsed');
    if (savedState !== null) isSidebarCollapsed.value = savedState === 'true';

    const savedCore = localStorage.getItem('sidebar_core_expanded');
    if (savedCore !== null) coreExpanded.value = savedCore !== 'false';

    const savedPlatinum = localStorage.getItem('sidebar_platinum_expanded');
    if (savedPlatinum !== null) platinumExpanded.value = savedPlatinum !== 'false';
});

const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
    localStorage.setItem('sidebar_collapsed', isSidebarCollapsed.value);
};

const toggleCore = () => {
    if (isSidebarCollapsed.value) return;
    coreExpanded.value = !coreExpanded.value;
    localStorage.setItem('sidebar_core_expanded', coreExpanded.value);
};

const togglePlatinum = () => {
    if (isSidebarCollapsed.value) return;
    platinumExpanded.value = !platinumExpanded.value;
    localStorage.setItem('sidebar_platinum_expanded', platinumExpanded.value);
};

const showModule = (moduleName) => {
    return user.value?.settings?.modules?.[moduleName] !== false;
};

// Active indicator helper
const isActive = (pattern) => route().current(pattern);
</script>

<template>
    <div class="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white relative transition-colors duration-500">
        
        <!-- GLOBAL HEADER (Full Width Top Bar) -->
        <GlobalHeader 
            :is-sidebar-collapsed="isSidebarCollapsed"
            @toggle-sidebar="toggleSidebar"
        />

        <div class="flex flex-1 overflow-hidden relative">
            
            <!-- ====================================== -->
            <!-- SIDEBAR (Monday.com Inspired) -->
            <!-- ====================================== -->
            <aside 
                class="bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none flex-shrink-0 transition-all duration-300 ease-in-out relative"
                :class="isSidebarCollapsed ? 'w-[68px]' : 'w-[232px]'"
            >
                <!-- ---- SCROLLABLE NAV AREA ---- -->
                <nav class="flex-1 overflow-y-auto py-3 custom-scrollbar space-y-0.5" :class="isSidebarCollapsed ? 'px-2' : 'px-2.5'">

                    <!-- ============================================ -->
                    <!-- SECTION 1: CORE SYSTEM (Collapsible) -->
                    <!-- ============================================ -->

                    <!-- Section Header -->
                    <button 
                        @click="toggleCore"
                        class="w-full flex items-center justify-between px-2 py-1.5 mb-0.5 rounded-lg group transition-all duration-200"
                        :class="isSidebarCollapsed ? 'justify-center' : ''"
                    >
                        <div v-if="isSidebarCollapsed" class="h-px bg-slate-100 dark:bg-slate-800 w-full my-2"></div>
                        <template v-else>
                            <span class="text-[9px] font-black text-slate-400 dark:text-slate-600 tracking-wide ml-1 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                                {{ $t('nav_core_modules', 'System Core') }}
                            </span>
                            <div class="flex items-center justify-center w-4 h-4 text-slate-300 transition-transform duration-200" :class="coreExpanded ? '' : '-rotate-90'">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </template>
                    </button>

                    <!-- Core Nav Items -->
                    <Transition 
                        enter-active-class="transition-all duration-200 ease-out overflow-hidden"
                        enter-from-class="opacity-0 max-h-0"
                        enter-to-class="opacity-100 max-h-96"
                        leave-active-class="transition-all duration-150 ease-in overflow-hidden"
                        leave-from-class="opacity-100 max-h-96"
                        leave-to-class="opacity-0 max-h-0"
                    >
                        <div v-show="coreExpanded || isSidebarCollapsed" class="space-y-0.5">
                            
                            <!-- Dashboard -->
                            <Link :href="route('dashboard')" prefetch="hover" view-transition
                                class="nav-item group"
                                :class="[
                                    isActive('dashboard') ? 'nav-item-active' : 'nav-item-default',
                                    isSidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-2.5 py-2 gap-3'
                                ]"
                                :title="isSidebarCollapsed ? $t('nav_item_dashboard') : ''"
                            >
                                <div class="nav-icon shrink-0" :class="isActive('dashboard') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'">
                                    <OneForMindIcon name="dashboard" size="18" />
                                </div>
                                <span v-if="!isSidebarCollapsed" class="text-[12px] font-semibold tracking-tight truncate">{{ $t('nav_item_dashboard') }}</span>
                                <div v-if="isActive('dashboard') && !isSidebarCollapsed" class="nav-active-bar"></div>
                            </Link>

                            <!-- Habits -->
                            <Link v-if="showModule('habit')" :href="route('habits.index')" prefetch="hover" view-transition
                                class="nav-item group"
                                :class="[
                                    isActive('habits.*') ? 'nav-item-active' : 'nav-item-default',
                                    isSidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-2.5 py-2 gap-3'
                                ]"
                                :title="isSidebarCollapsed ? $t('nav_item_habit') : ''"
                            >
                                <div class="nav-icon shrink-0" :class="isActive('habits.*') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'">
                                    <OneForMindIcon name="habit" size="18" />
                                </div>
                                <span v-if="!isSidebarCollapsed" class="text-[12px] font-semibold tracking-tight truncate">{{ $t('nav_item_habit') }}</span>
                                <div v-if="isActive('habits.*') && !isSidebarCollapsed" class="nav-active-bar"></div>
                            </Link>

                            <!-- Planner -->
                            <Link v-if="showModule('planner')" :href="route('planner.index')" prefetch="hover" view-transition
                                class="nav-item group"
                                :class="[
                                    isActive('planner.*') ? 'nav-item-active' : 'nav-item-default',
                                    isSidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-2.5 py-2 gap-3'
                                ]"
                                :title="isSidebarCollapsed ? $t('nav_item_planner') : ''"
                            >
                                <div class="nav-icon shrink-0" :class="isActive('planner.*') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'">
                                    <OneForMindIcon name="planner" size="18" />
                                </div>
                                <span v-if="!isSidebarCollapsed" class="text-[12px] font-semibold tracking-tight truncate">{{ $t('nav_item_planner') }}</span>
                                <div v-if="isActive('planner.*') && !isSidebarCollapsed" class="nav-active-bar"></div>
                            </Link>

                            <!-- Finance -->
                            <Link v-if="showModule('finance')" :href="route('finance.index')" prefetch="hover" view-transition
                                class="nav-item group"
                                :class="[
                                    isActive('finance.*') ? 'nav-item-active' : 'nav-item-default',
                                    isSidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-2.5 py-2 gap-3'
                                ]"
                                :title="isSidebarCollapsed ? $t('nav_item_finance') : ''"
                            >
                                <div class="nav-icon shrink-0" :class="isActive('finance.*') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'">
                                    <OneForMindIcon name="finance" size="18" />
                                </div>
                                <span v-if="!isSidebarCollapsed" class="text-[12px] font-semibold tracking-tight truncate">{{ $t('nav_item_finance') }}</span>
                                <div v-if="isActive('finance.*') && !isSidebarCollapsed" class="nav-active-bar"></div>
                            </Link>

                        </div>
                    </Transition>

                    <!-- Spacer -->
                    <div class="h-3"></div>

                    <!-- ============================================ -->
                    <!-- SECTION 2: PLATINUM SUITE (Collapsible) -->
                    <!-- ============================================ -->

                    <button 
                        @click="togglePlatinum"
                        class="w-full flex items-center justify-between px-2 py-1.5 mb-0.5 rounded-lg group transition-all duration-200"
                        :class="isSidebarCollapsed ? 'justify-center' : ''"
                    >
                        <div v-if="isSidebarCollapsed" class="h-px bg-slate-100 dark:bg-slate-800 w-full my-2"></div>
                        <template v-else>
                            <div class="flex items-center gap-1.5 ml-1">
                                <span class="text-[9px] font-black text-slate-400 dark:text-slate-600 tracking-wide group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                                    {{ $t('nav_platinum_suite', 'Platinum Suite') }}
                                </span>
                                <!-- Lock icon if Explorer -->
                                <div v-if="isExplorer" class="w-3 h-3 text-slate-300 dark:text-slate-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                </div>
                            </div>
                            <div class="flex items-center justify-center w-4 h-4 text-slate-300 transition-transform duration-200" :class="platinumExpanded ? '' : '-rotate-90'">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </template>
                    </button>

                    <Transition 
                        enter-active-class="transition-all duration-200 ease-out overflow-hidden"
                        enter-from-class="opacity-0 max-h-0"
                        enter-to-class="opacity-100 max-h-96"
                        leave-active-class="transition-all duration-150 ease-in overflow-hidden"
                        leave-from-class="opacity-100 max-h-96"
                        leave-to-class="opacity-0 max-h-0"
                    >
                        <div v-show="platinumExpanded || isSidebarCollapsed" class="space-y-0.5">

                            <!-- Journal -->
                            <div v-if="showModule('journal')"
                                @click="demandAccess('journal', route('journal.index'))"
                                class="nav-item group cursor-pointer"
                                :class="[
                                    isActive('journal.*') ? 'nav-item-active' : 'nav-item-default',
                                    isSidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-2.5 py-2 gap-3',
                                    !canUse('journal') ? 'opacity-60' : ''
                                ]"
                                :title="isSidebarCollapsed ? $t('nav_item_journal') : ''"
                            >
                                <div class="nav-icon shrink-0" :class="isActive('journal.*') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'">
                                    <OneForMindIcon name="journal" size="18" />
                                </div>
                                <span v-if="!isSidebarCollapsed" class="text-[12px] font-semibold tracking-tight truncate flex-1">{{ $t('nav_item_journal') }}</span>
                                <div v-if="!canUse('journal') && !isSidebarCollapsed" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]"></div>
                                <div v-if="isActive('journal.*') && !isSidebarCollapsed" class="nav-active-bar"></div>
                            </div>

                            <!-- Calendar -->
                            <div v-if="showModule('calendar')"
                                @click="demandAccess('calendar', route('calendar.index'))"
                                class="nav-item group cursor-pointer"
                                :class="[
                                    isActive('calendar.*') ? 'nav-item-active' : 'nav-item-default',
                                    isSidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-2.5 py-2 gap-3',
                                    !canUse('calendar') ? 'opacity-60' : ''
                                ]"
                                :title="isSidebarCollapsed ? $t('nav_item_calendar') : ''"
                            >
                                <div class="nav-icon shrink-0" :class="isActive('calendar.*') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'">
                                    <OneForMindIcon name="calendar" size="18" />
                                </div>
                                <span v-if="!isSidebarCollapsed" class="text-[12px] font-semibold tracking-tight truncate flex-1">{{ $t('nav_item_calendar') }}</span>
                                <div v-if="!canUse('calendar') && !isSidebarCollapsed" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]"></div>
                                <div v-if="isActive('calendar.*') && !isSidebarCollapsed" class="nav-active-bar"></div>
                            </div>

                            <!-- Jobs -->
                            <div v-if="showModule('job')"
                                @click="demandAccess('job', route('jobs.index'))"
                                class="nav-item group cursor-pointer"
                                :class="[
                                    isActive('jobs.*') ? 'nav-item-active' : 'nav-item-default',
                                    isSidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-2.5 py-2 gap-3',
                                    !canUse('job') ? 'opacity-60' : ''
                                ]"
                                :title="isSidebarCollapsed ? $t('nav_item_jobs') : ''"
                            >
                                <div class="nav-icon shrink-0" :class="isActive('jobs.*') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'">
                                    <OneForMindIcon name="job" size="18" />
                                </div>
                                <span v-if="!isSidebarCollapsed" class="text-[12px] font-semibold tracking-tight truncate flex-1">{{ $t('nav_item_jobs') }}</span>
                                <div v-if="!canUse('job') && !isSidebarCollapsed" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]"></div>
                                <div v-if="isActive('jobs.*') && !isSidebarCollapsed" class="nav-active-bar"></div>
                            </div>

                            <!-- Goals -->
                            <div v-if="showModule('goal')"
                                @click="demandAccess('goal', route('goals.index'))"
                                class="nav-item group cursor-pointer"
                                :class="[
                                    isActive('goals.*') ? 'nav-item-active' : 'nav-item-default',
                                    isSidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-2.5 py-2 gap-3',
                                    !canUse('goal') ? 'opacity-60' : ''
                                ]"
                                :title="isSidebarCollapsed ? $t('nav_item_goals') : ''"
                            >
                                <div class="nav-icon shrink-0" :class="isActive('goals.*') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'">
                                    <OneForMindIcon name="goal" size="18" />
                                </div>
                                <span v-if="!isSidebarCollapsed" class="text-[12px] font-semibold tracking-tight truncate flex-1">{{ $t('nav_item_goals') }}</span>
                                <div v-if="!canUse('goal') && !isSidebarCollapsed" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_6px_rgba(129,140,248,0.6)]"></div>
                                <div v-if="isActive('goals.*') && !isSidebarCollapsed" class="nav-active-bar"></div>
                            </div>

                        </div>
                    </Transition>

                    <!-- Spacer -->
                    <div class="h-3"></div>

                    <!-- ============================================ -->
                    <!-- SECTION 3: NEURAL OS (AI Section - Monday Style) -->
                    <!-- ============================================ -->
                    <template v-if="!isExplorer">
                        <div class="px-2 py-1.5 mb-0.5">
                            <div v-if="isSidebarCollapsed" class="h-px bg-slate-100 dark:bg-slate-800 w-full my-2"></div>
                             <span v-else class="text-[9px] font-black text-indigo-400/80 dark:text-indigo-600/80 tracking-wide ml-1">
                                Neural OS
                            </span>
                        </div>

                        <!-- AI Coach -->
                        <div
                            @click="demandAccess('ai_coach', route('coach.index'))"
                            class="nav-item group cursor-pointer relative overflow-hidden"
                            :class="[
                                isActive('coach.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 hover:text-indigo-700 dark:hover:text-indigo-300',
                                isSidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-2.5 py-2 gap-3',
                            ]"
                            :title="isSidebarCollapsed ? $t('nav_item_coach', 'AI Coach') : ''"
                        >
                            <div class="shrink-0 text-indigo-500">
                                <OneForMindIcon name="sparkles" size="18" />
                            </div>
                            <span v-if="!isSidebarCollapsed" class="text-[12px] font-semibold tracking-tight truncate flex-1">{{ $t('nav_item_coach', 'AI Coach') }}</span>
                            <span v-if="!isSidebarCollapsed" class="text-[8px] font-black text-indigo-500 uppercase bg-indigo-100 dark:bg-indigo-500/20 px-1.5 py-0.5 rounded-full shrink-0">AI</span>
                            <div v-if="isActive('coach.*') && !isSidebarCollapsed" class="nav-active-bar bg-indigo-500"></div>
                        </div>
                    </template>

                </nav>
            </aside>

            <!-- MAIN CONTENT AREA -->
            <main class="flex-1 overflow-y-auto relative w-full bg-slate-50 dark:bg-slate-950 pb-32 md:pb-0 transition-colors duration-500 custom-scrollbar">
                <div class="w-full relative z-0 px-0 pb-8 md:pb-10">
                    <slot />
                </div>
            </main>
        </div>

        <!-- LOGOUT MODAL -->
        <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <div class="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm" @click="showLogoutModal = false"></div>
                <div class="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div class="p-8 text-center">
                        <div class="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <OneForMindIcon name="logout" size="40" stroke-width="2.5" />
                        </div>
                        <h3 class="text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2">{{ $t('modal_logout_title', 'Keluar Akun?') }}</h3>
                        <p class="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{{ $t('modal_logout_subtitle', 'Sesi Anda akan diakhiri.') }}</p>
                    </div>
                    <div class="p-6 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                        <button @click="router.post(route('logout'))" class="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-600 active:scale-[0.98] transition-all">{{ $t('modal_logout_confirm', 'Ya, Keluar') }}</button>
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
                <div class="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                <div class="relative w-14 h-14 bg-slate-900 dark:bg-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 active:scale-95 ring-4 ring-white dark:ring-slate-950 group-hover:ring-indigo-50 dark:group-hover:ring-indigo-500/20 overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <OneForMindIcon name="sparkles" size="24" stroke-width="2" class="text-white group-hover:rotate-[20deg] transition-transform duration-500 relative z-10" />
                    <span class="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse z-20"></span>
                </div>
                <div class="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-4 py-2.5 rounded-2xl whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-2xl border border-white/10 flex items-center gap-2">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    {{ $t('nav_neural_active') }}
                </div>
            </div>
        </button>

    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; }

/* Nav item base */
.nav-item {
    @apply flex items-center w-full rounded-xl transition-all duration-150 relative;
}

/* Active state */
.nav-item-active {
    @apply bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold;
}

/* Default/hover state */
.nav-item-default {
    @apply text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-medium;
}

/* Active left bar indicator */
.nav-active-bar {
    @apply absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-600 rounded-r-full;
}

/* Nav icon wrapper */
.nav-icon {
    @apply flex items-center justify-center transition-colors;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>