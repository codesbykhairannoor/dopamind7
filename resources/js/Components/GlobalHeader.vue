<script setup>
import { computed } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import { useGating } from '@/Composables/useGating';
import { useAppearance } from '@/Composables/useAppearance';

const page = usePage();
const { isExplorer, user } = useGating();
const { isDark, toggleTheme } = useAppearance();

const props = defineProps({
    title: String,
    icon: String,
    isSidebarCollapsed: Boolean,
});

const emit = defineEmits(['toggle-sidebar']);

// Breadcrumb Logic
const currentTitle = computed(() => {
    if (props.title) return props.title;
    const routeName = route().current();
    if (routeName.startsWith('habits')) return page.props.words?.nav_item_habit || 'Habit Tracker';
    if (routeName.startsWith('finance')) return page.props.words?.nav_item_finance || 'Finance Plan';
    if (routeName.startsWith('planner')) return page.props.words?.nav_item_planner || 'Daily Planner';
    if (routeName.startsWith('journal')) return page.props.words?.nav_item_journal || 'Journal';
    if (routeName.startsWith('calendar')) return page.props.words?.nav_item_calendar || 'Calendar';
    if (routeName.startsWith('goals')) return page.props.words?.nav_item_goals || 'Goals';
    if (routeName.startsWith('jobs')) return page.props.words?.nav_item_jobs || 'Job Tracker';
    if (routeName === 'dashboard') return page.props.words?.nav_item_dashboard || 'Dashboard';
    return '';
});

const currentIcon = computed(() => {
    if (props.icon) return props.icon;
    const routeName = route().current();
    if (routeName.startsWith('habits')) return 'habit';
    if (routeName.startsWith('finance')) return 'finance';
    if (routeName.startsWith('planner')) return 'planner';
    if (routeName.startsWith('journal')) return 'journal';
    if (routeName.startsWith('calendar')) return 'calendar';
    if (routeName.startsWith('goals')) return 'goal';
    if (routeName.startsWith('jobs')) return 'job';
    return 'dashboard';
});

const currentLocale = computed(() => page.props.locale);

const switchLang = (lang) => {
    if (lang === currentLocale.value) return;
    router.get(route('lang.switch', { locale: lang }));
};
</script>

<template>
    <header class="h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[70] transition-colors duration-500">
        <div class="h-full px-4 flex items-center justify-between gap-4">
            
            <!-- LEFT SECTION: HAMBURGER + LOGO + BREADCRUMBS -->
            <div class="flex items-center gap-3 min-w-0">
                <!-- Hamburger Menu (Aligned to the very left) -->
                <button 
                    @click="emit('toggle-sidebar')"
                    class="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
                    title="Toggle Sidebar"
                >
                    <OneForMindIcon name="menu" size="20" stroke-width="2.5" />
                </button>

                <!-- Brand Logo (Right next to Hamburger as requested) -->
                <Link :href="route('dashboard')" class="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                    <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none shrink-0 transition-transform duration-500">
                        <img src="/favicon.svg" alt="Logo" class="w-5 h-5 brightness-0 invert" />
                    </div>
                    <span class="text-sm font-black text-slate-800 dark:text-white tracking-tighter hidden md:block">OneForMind</span>
                </Link>

                <!-- Divider -->
                <div class="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

                <!-- Simplified Breadcrumbs (Icon Only if needed, but user said ga perlu ngasih tau page yg lagi kebuka) -->
                <div class="flex items-center gap-2 min-w-0">
                    <!-- Removed currentTitle and icon as requested -->
                </div>
            </div>

            <!-- MIDDLE: GLOBAL SEARCH -->
            <div class="hidden md:flex items-center flex-1 max-w-lg group">
                <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        class="block w-full pl-10 pr-12 py-2 bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-700 transition-all outline-none transition-colors duration-500" 
                        placeholder="Search anything..."
                    >
                </div>
            </div>

            <!-- RIGHT SECTION: UPGRADE + UTILITIES + PROFILE -->
            <div class="flex items-center gap-1 sm:gap-3">
                
                <!-- See Plan / Upgrade Button (Monday Style) -->
                <Link v-if="isExplorer" :href="route('billing')" class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-sm active:scale-95 group">
                    <span class="text-[10px] font-black capitalize tracking-wide">{{ $t('nav_see_plan', 'See Plan') }}</span>
                    <OneForMindIcon name="premium" size="14" class="animate-pulse" />
                </Link>

                <!-- Utilities -->
                <div class="flex items-center gap-0.5">
                    <!-- Neural OS AI Quick Access (Icon Only) -->
                    <button class="flex items-center justify-center w-9 h-9 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:scale-[1.05] transition-all relative overflow-hidden group shadow-lg active:scale-95 mr-1" title="Neural OS AI">
                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <OneForMindIcon name="sparkles" size="18" class="text-indigo-400 dark:text-indigo-600 animate-pulse" />
                    </button>

                    <button class="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 transition-all relative" title="Notifications">
                        <OneForMindIcon name="notification" size="18" stroke-width="2.5" />
                        <span class="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    </button>

                    <button class="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 transition-all" title="Help">
                        <OneForMindIcon name="help" size="18" stroke-width="2.5" />
                    </button>
                </div>

                <!-- Enhanced Profile Dropdown -->
                <Dropdown align="right" width="60">
                    <template #trigger>
                        <button class="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shrink-0 group">
                            <div class="relative">
                                <img v-if="user?.avatar_url" :src="user.avatar_url" class="w-8 h-8 rounded-lg border border-white dark:border-slate-800 shadow-sm" />
                                <div v-else class="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-50 text-white dark:text-indigo-600 flex items-center justify-center text-[10px] font-black capitalize shadow-sm">
                                    {{ user?.name?.charAt(0) }}
                                </div>
                                <div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                            </div>
                            <div class="hidden lg:block text-left leading-none px-1">
                                <p class="text-[11px] font-black text-slate-800 dark:text-slate-100 truncate max-w-[100px]">{{ user?.name }}</p>
                            </div>
                            <OneForMindIcon name="chevron-down" size="12" stroke-width="4" class="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                        </button>
                    </template>

                    <template #content>
                        <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                            <p class="text-[10px] font-black text-slate-400 capitalize tracking-wide mb-1">{{ $t('account_active') }}</p>
                            <p class="text-xs font-black text-slate-800 dark:text-white truncate">{{ user?.name }}</p>
                            <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate">{{ user?.email }}</p>
                        </div>

                        <!-- Language Switcher -->
                        <div class="p-2 border-b border-slate-100 dark:border-slate-800">
                            <p class="px-2 pb-1.5 text-[9px] font-bold text-slate-400 capitalize tracking-wide">{{ $t('nav_language') }}</p>
                            <div class="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-lg border border-slate-200/50 dark:border-slate-800/50">
                                <button 
                                    @click="switchLang('id')"
                                    class="flex-1 py-1.5 rounded-md text-[10px] font-black transition-all capitalize"
                                    :class="currentLocale === 'id' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black' : 'text-slate-400 hover:text-slate-600'"
                                >
                                    {{ $t('lang_id', 'Bahasa') }}
                                </button>
                                <button 
                                    @click="switchLang('en')"
                                    class="flex-1 py-1.5 rounded-md text-[10px] font-black transition-all capitalize"
                                    :class="currentLocale === 'en' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black' : 'text-slate-400 hover:text-slate-600'"
                                >
                                    {{ $t('lang_en', 'English') }}
                                </button>
                            </div>
                        </div>

                        <!-- Theme Toggle (Premium Switch) -->
                        <div class="p-1">
                            <button 
                                @click="toggleTheme"
                                class="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group"
                            >
                                <div class="flex items-center gap-3">
                                    <div class="w-7 h-7 rounded-lg flex items-center justify-center transition-colors" :class="isDark ? 'bg-amber-500/10 text-amber-500' : 'bg-indigo-500/10 text-indigo-500'">
                                        <OneForMindIcon :name="isDark ? 'sun' : 'moon'" size="16" stroke-width="2.5" />
                                    </div>
                                    <span class="text-[11px] font-black text-slate-700 dark:text-slate-200 capitalize tracking-tight">
                                        {{ isDark ? $t('theme_light') : $t('theme_dark') }}
                                    </span>
                                </div>
                                <div class="w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700 relative transition-colors" :class="isDark ? 'bg-indigo-500/30' : ''">
                                    <div class="absolute top-0.5 bottom-0.5 w-3 h-3 rounded-full transition-all duration-300 shadow-sm" :class="isDark ? 'bg-indigo-500 right-0.5' : 'bg-white left-0.5'"></div>
                                </div>
                            </button>
                        </div>

                        <div class="border-t border-slate-100 dark:border-slate-800 p-1">
                            <DropdownLink :href="route('settings.index')" class="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all">
                                <OneForMindIcon name="settings" size="16" stroke-width="2.5" class="text-slate-400" />
                                <span class="text-[11px] font-black text-slate-700 dark:text-slate-200 capitalize tracking-tight">{{ $t('nav_item_settings') }}</span>
                            </DropdownLink>

                            <button 
                                @click="router.post(route('logout'))"
                                class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-500 hover:text-rose-600 rounded-lg transition-all text-left"
                            >
                                <OneForMindIcon name="logout" size="16" stroke-width="3" class="text-slate-400 group-hover:text-rose-500" />
                                <span class="text-[11px] font-black capitalize tracking-tight">{{ $t('nav_logout', 'Keluar') }}</span>
                            </button>
                        </div>
                    </template>
                </Dropdown>

            </div>
        </div>
    </header>
</template>
