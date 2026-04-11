<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { usePage, router } from '@inertiajs/vue3'; 
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useAppearance } from '@/Composables/useAppearance';
import { useGating } from '@/Composables/useGating';
import GlobalHeader from '@/Components/GlobalHeader.vue';
import NeuralBridge from '@/Components/NeuralBridge.vue';

// --- DATA USER & HALAMAN ---
const page = usePage();
const { isExplorer, isAiEnabled, canUse, demandAccess, user } = useGating();

// --- STATE NAVIGASI MOBILE & MODAL ---
const showLogoutModal = ref(false);

// 🔥 STATE SIDEBAR DESKTOP COLLAPSE
const isSidebarCollapsed = ref(false);

const { initTheme } = useAppearance();

onMounted(() => {
    // 🛡️ SAFETY GUARD
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

watch(() => page.url, () => {
    // Handle URL changes if needed
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
            
            <!-- SIDEBAR (Asana Style - Streamlined) -->
            <aside 
                class="bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 hidden md:flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none flex-shrink-0 transition-all duration-300 ease-in-out relative"
                :class="isSidebarCollapsed ? 'w-20' : 'w-64'"
            >
                <nav class="flex-1 px-3 space-y-0.5 overflow-y-auto py-6 custom-scrollbar transition-all duration-500" :class="isSidebarCollapsed ? 'px-3' : 'px-4'">
                    
                    <!-- CORE NAVIGATION -->
                    <div class="px-3 pt-1 pb-2 flex items-center gap-2">
                        <div v-if="isSidebarCollapsed" class="h-px bg-slate-100 dark:bg-slate-800 w-full mb-2 transition-colors duration-500"></div>
                        <span v-if="!isSidebarCollapsed" class="text-[9px] font-black text-slate-400 dark:text-slate-600 capitalize tracking-widest ml-1 transition-colors duration-500">{{ $t('nav_core_modules', 'Core System') }}</span>
                    </div>

                    <Link :href="route('dashboard')" prefetch
                        class="flex items-center rounded-xl transition-all duration-300 group relative mb-1"
                        :class="[
                            route().current('dashboard') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm dark:shadow-none font-black' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold',
                            isSidebarCollapsed ? 'p-2 justify-center' : 'px-3 py-1.5 gap-3'
                        ]"
                        :title="isSidebarCollapsed ? $t('nav_item_dashboard') : ''"
                    >
                        <OneForMindIcon name="dashboard" size="18" class="shrink-0" />
                        <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-xs capitalize tracking-tight">{{ $t('nav_item_dashboard') }}</span>
                        <div v-if="route().current('dashboard') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                    </Link>

                    <Link v-if="showModule('habit')" :href="route('habits.index')" prefetch
                        class="flex items-center rounded-xl transition-all duration-300 group relative mb-1"
                        :class="[
                            route().current('habits.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold',
                            isSidebarCollapsed ? 'p-2 justify-center' : 'px-3 py-1.5 gap-3'
                        ]"
                        :title="isSidebarCollapsed ? $t('nav_item_habit') : ''"
                    >
                        <OneForMindIcon name="habit" size="18" class="shrink-0" />
                        <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-xs capitalize tracking-tight">{{ $t('nav_item_habit') }}</span>
                        <div v-if="route().current('habits.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                    </Link>

                    <Link v-if="showModule('planner')" :href="route('planner.index')" prefetch
                        class="flex items-center rounded-xl transition-all duration-300 group relative mb-1"
                        :class="[
                            route().current('planner.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold',
                            isSidebarCollapsed ? 'p-2 justify-center' : 'px-3 py-1.5 gap-2.5'
                        ]"
                        :title="isSidebarCollapsed ? $t('nav_item_planner') : ''"
                    >
                        <OneForMindIcon name="planner" size="18" class="shrink-0" />
                        <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-xs capitalize tracking-tight">{{ $t('nav_item_planner') }}</span>
                        <div v-if="route().current('planner.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                    </Link>

                    <Link v-if="showModule('finance')" :href="route('finance.index')" prefetch
                        class="flex items-center rounded-xl transition-all duration-300 group relative mb-1"
                        :class="[
                            route().current('finance.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold',
                            isSidebarCollapsed ? 'p-1.5 justify-center' : 'px-3 py-1.5 gap-2.5'
                        ]"
                        :title="isSidebarCollapsed ? $t('nav_item_finance') : ''"
                    >
                        <OneForMindIcon name="finance" size="18" class="shrink-0" />
                        <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-xs capitalize tracking-tight">{{ $t('nav_item_finance') }}</span>
                        <div v-if="route().current('finance.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                    </Link>

                    <!-- PLATINUM SUITE SECTIONS -->
                    <div class="px-3 pt-6 pb-2">
                        <div v-if="isSidebarCollapsed" class="h-px bg-slate-100 dark:bg-slate-800 w-full mb-2 transition-colors duration-500"></div>
                        <span v-if="!isSidebarCollapsed" class="text-[9px] font-black text-slate-400 dark:text-slate-600 capitalize tracking-widest ml-1 transition-colors duration-500">{{ $t('nav_platinum_suite', 'Platinum Suite') }}</span>
                    </div>

                    <div v-if="showModule('journal')"
                        @click="demandAccess('journal', route('journal.index'))"
                        class="flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer mb-1"
                        :class="[
                            route().current('journal.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold',
                            isSidebarCollapsed ? 'p-1.5 justify-center' : 'px-3 py-1.5 gap-2.5',
                            !canUse('journal') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''
                        ]"
                        :title="isSidebarCollapsed ? $t('nav_item_journal') : ''"
                    >
                        <OneForMindIcon name="journal" size="18" class="shrink-0" />
                        <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-xs capitalize tracking-tight flex items-center justify-between w-full">
                            {{ $t('nav_item_journal') }}
                            <div v-if="!canUse('journal')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                        </span>
                        <div v-if="route().current('journal.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                    </div>

                    <div v-if="showModule('calendar')"
                        @click="demandAccess('calendar', route('calendar.index'))"
                        class="flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer mb-1"
                        :class="[
                            route().current('calendar.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold',
                            isSidebarCollapsed ? 'p-1.5 justify-center' : 'px-3 py-1.5 gap-2.5',
                            !canUse('calendar') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''
                        ]"
                        :title="isSidebarCollapsed ? $t('nav_item_calendar') : ''"
                    >
                        <OneForMindIcon name="calendar" size="18" class="shrink-0" />
                        <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-xs capitalize tracking-tight flex items-center justify-between w-full">
                            {{ $t('nav_item_calendar') }}
                            <div v-if="!canUse('calendar')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                        </span>
                        <div v-if="route().current('calendar.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                    </div>

                    <div v-if="showModule('job')"
                        @click="demandAccess('job', route('jobs.index'))"
                        class="flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer mb-1"
                        :class="[
                            route().current('jobs.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold',
                            isSidebarCollapsed ? 'p-1.5 justify-center' : 'px-3 py-1.5 gap-2.5',
                            !canUse('job') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''
                        ]"
                        :title="isSidebarCollapsed ? $t('nav_item_jobs') : ''"
                    >
                        <OneForMindIcon name="job" size="18" class="shrink-0" />
                        <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-xs capitalize tracking-tight flex items-center justify-between w-full">
                            {{ $t('nav_item_jobs') }}
                            <div v-if="!canUse('job')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                        </span>
                        <div v-if="route().current('jobs.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                    </div>

                    <div v-if="showModule('goal')"
                        @click="demandAccess('goal', route('goals.index'))"
                        class="flex items-center rounded-xl transition-all duration-300 group relative cursor-pointer mb-1"
                        :class="[
                            route().current('goals.*') ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm font-black' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 font-bold',
                            isSidebarCollapsed ? 'p-1.5 justify-center' : 'px-3 py-1.5 gap-2.5',
                            !canUse('goal') ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''
                        ]"
                        :title="isSidebarCollapsed ? $t('nav_item_goals') : ''"
                    >
                        <OneForMindIcon name="goal" size="18" class="shrink-0" />
                        <span v-if="!isSidebarCollapsed" class="whitespace-nowrap text-xs capitalize tracking-tight flex items-center justify-between w-full">
                            {{ $t('nav_item_goals') }}
                            <div v-if="!canUse('goal')" class="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                        </span>
                        <div v-if="route().current('goals.*') && !isSidebarCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full"></div>
                    </div>

                </nav>

                <div class="p-4 shrink-0 space-y-4">
                    <!-- Support Link (Natural Look) -->
                    <div v-if="!isSidebarCollapsed" class="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-indigo-300 transition-all">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-indigo-500 shadow-sm">
                                <OneForMindIcon name="help" size="14" />
                            </div>
                            <div>
                                <p class="text-[10px] font-black text-slate-700 dark:text-slate-200 leading-none">Help Center</p>
                                <p class="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Support & Docs</p>
                            </div>
                        </div>
                        <OneForMindIcon name="chevron-right" size="12" class="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>

                    <NeuralBridge v-if="!isSidebarCollapsed" module="Dashboard" />
                    <div v-else class="w-12 h-12 mx-auto bg-slate-900 dark:bg-white rounded-[1.2rem] flex items-center justify-center text-white dark:text-slate-900 shadow-xl shadow-indigo-100/20 active:scale-95 transition-all cursor-pointer group">
                        <OneForMindIcon name="sparkles" size="20" class="group-hover:rotate-12 transition-transform" />
                    </div>
                </div>
            </aside>

            <!-- MAIN CONTENT AREA -->
            <main class="flex-1 overflow-y-auto relative w-full bg-slate-50 dark:bg-slate-950 pb-32 md:pb-0 transition-colors duration-500 custom-scrollbar">
                <div class="w-full relative z-0 px-0 pb-8 md:pb-10">
                    <slot />
                </div>
            </main>
        </div>

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
                <!-- Outer Glow -->
                <div class="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                
                <!-- Main Button -->
                <div class="relative w-16 h-16 bg-slate-900 dark:bg-indigo-600 rounded-[1.8rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 active:scale-95 ring-4 ring-white dark:ring-slate-950 group-hover:ring-indigo-50 dark:group-hover:ring-indigo-500/20 overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <OneForMindIcon name="sparkles" size="28" stroke-width="2" class="text-white group-hover:rotate-[20deg] transition-transform duration-500 relative z-10" />
                    
                    <!-- Notification/Active Dot -->
                    <span class="absolute top-4 right-4 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse z-20"></span>
                </div>
                
                <!-- Hover Label -->
                <div class="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-5 py-3 rounded-2xl whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-2xl border border-white/10 flex items-center gap-2">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    {{ $t('nav_neural_active') }}
                </div>
            </div>
        </button>


    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>