<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useAppearance } from '@/Composables/useAppearance';
import { useGating } from '@/Composables/useGating';
import GlobalHeader from '@/Components/GlobalHeader.vue';
import AppSidebarNav from '@/Components/AppSidebarNav.vue';

// --- DATA USER & HALAMAN ---
const page = usePage();
const { demandAccess, user } = useGating();

// --- STATE NAVIGASI ---
const showLogoutModal = ref(false);

// 🔥 STATE SIDEBAR DESKTOP COLLAPSE
const isSidebarCollapsed = ref(false);

const isMdUp = ref(false);
const isMobileDrawerOpen = ref(false);
let mediaQueryListener;
let mdMediaQuery;

const syncBreakpoint = () => {
    if (typeof window === 'undefined') {
        return;
    }
    const mq = window.matchMedia('(min-width: 768px)');
    isMdUp.value = mq.matches;
    if (mq.matches) {
        isMobileDrawerOpen.value = false;
    }
};

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

    syncBreakpoint();
    mdMediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQueryListener = () => syncBreakpoint();
    mdMediaQuery.addEventListener('change', mediaQueryListener);
});

onUnmounted(() => {
    mdMediaQuery?.removeEventListener('change', mediaQueryListener);
    document.body.style.overflow = '';
});

const closeMobileDrawer = () => {
    isMobileDrawerOpen.value = false;
};

const toggleSidebar = () => {
    if (isMdUp.value) {
        isSidebarCollapsed.value = !isSidebarCollapsed.value;
        localStorage.setItem('sidebar_collapsed', isSidebarCollapsed.value);
    } else {
        isMobileDrawerOpen.value = !isMobileDrawerOpen.value;
    }
};

const toggleCore = () => {
    if (isMdUp.value && isSidebarCollapsed.value) {
        return;
    }
    coreExpanded.value = !coreExpanded.value;
    localStorage.setItem('sidebar_core_expanded', coreExpanded.value);
};

const togglePlatinum = () => {
    if (isMdUp.value && isSidebarCollapsed.value) {
        return;
    }
    platinumExpanded.value = !platinumExpanded.value;
    localStorage.setItem('sidebar_platinum_expanded', platinumExpanded.value);
};

watch(() => page.url, () => {
    closeMobileDrawer();
});

watch(isMobileDrawerOpen, (open) => {
    if (typeof document === 'undefined') {
        return;
    }
    document.body.style.overflow = open ? 'hidden' : '';
});
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
                    <AppSidebarNav
                        variant="sidebar"
                        :collapsed="isSidebarCollapsed"
                        :core-expanded="coreExpanded"
                        :platinum-expanded="platinumExpanded"
                        @toggle-core="toggleCore"
                        @toggle-platinum="togglePlatinum"
                    />
                </nav>
            </aside>

            <!-- Mobile navigation drawer (< md) -->
            <Teleport to="body">
                <div class="md:hidden">
                    <Transition name="mobile-drawer-backdrop">
                        <div
                            v-if="isMobileDrawerOpen"
                            class="fixed inset-0 top-16 z-[60] bg-slate-950/50 backdrop-blur-sm"
                            aria-hidden="true"
                            @click="closeMobileDrawer"
                        ></div>
                    </Transition>
                    <Transition name="mobile-drawer-panel">
                        <aside
                            v-if="isMobileDrawerOpen"
                            class="fixed left-0 top-16 z-[61] flex h-[calc(100dvh-4rem)] w-[min(300px,92vw)] flex-col border-r border-slate-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
                        >
                        <div class="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                            <span class="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                {{ $t('nav_menu_title') }}
                            </span>
                            <button
                                type="button"
                                class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                :aria-label="$t('nav_close_menu')"
                                @click="closeMobileDrawer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                            </button>
                        </div>
                        <nav class="custom-scrollbar flex-1 overflow-y-auto py-2">
                            <AppSidebarNav
                                variant="drawer"
                                :collapsed="false"
                                :core-expanded="coreExpanded"
                                :platinum-expanded="platinumExpanded"
                                @toggle-core="toggleCore"
                                @toggle-platinum="togglePlatinum"
                                @navigate="closeMobileDrawer"
                            />
                        </nav>
                        </aside>
                    </Transition>
                </div>
            </Teleport>

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

.mobile-drawer-backdrop-enter-active,
.mobile-drawer-backdrop-leave-active {
    transition: opacity 0.2s ease;
}
.mobile-drawer-backdrop-enter-from,
.mobile-drawer-backdrop-leave-to {
    opacity: 0;
}

.mobile-drawer-panel-enter-active,
.mobile-drawer-panel-leave-active {
    transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.2s ease;
}
.mobile-drawer-panel-enter-from,
.mobile-drawer-panel-leave-to {
    transform: translateX(-100%);
    opacity: 0.85;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>