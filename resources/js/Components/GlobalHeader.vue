<script setup>
import { computed, ref } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NotificationSettings from '@/Components/NotificationSettings.vue';
import CommandPalette from '@/Components/CommandPalette.vue';
import { useGating } from '@/Composables/useGating';
import { useAppearance } from '@/Composables/useAppearance';
import { onMounted, onUnmounted } from 'vue';

const page = usePage();
const { isExplorer, user } = useGating();
const { isDark, toggleTheme } = useAppearance();

defineProps({
    title: String,
    icon: String,
    isSidebarCollapsed: Boolean,
});

const emit = defineEmits(['toggle-sidebar']);

// Working status — compact Monday-style row
const statusOptions = [
    { key: 'active',  label: 'Active',          dot: 'bg-emerald-500' },
    { key: 'away',    label: 'Away',            dot: 'bg-amber-400' },
    { key: 'busy',    label: 'Do Not Disturb',  dot: 'bg-rose-500' },
    { key: 'offline', label: 'Appear Offline',  dot: 'bg-slate-400' },
];
const workingStatus = ref('active');
const currentStatus = computed(() => statusOptions.find(s => s.key === workingStatus.value) ?? statusOptions[0]);

// 🔥 Today streak from shared Inertia props
const todayStreak = computed(() => page.props.today_streak ?? 0);

// 📅 Today pill: format tanggal pendek
const todayLabel = computed(() => {
    const now = new Date();
    return now.toLocaleDateString(page.props.locale === 'id' ? 'id-ID' : 'en-US', {
        weekday: 'short', day: 'numeric', month: 'short'
    });
});

const currentLocale = computed(() => page.props.locale);
const switchLang = (lang) => {
    if (lang === currentLocale.value) return;
    router.get(route('lang.switch', { locale: lang }), {}, { 
        preserveScroll: true,
        preserveState: true
    });
};

const showNotificationSettings = ref(false);
const showCommandPalette = ref(false);

const handleGlobalShortcuts = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        showCommandPalette.value = true;
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleGlobalShortcuts);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalShortcuts);
});
</script>

<template>
    <header class="h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 sticky top-top z-[70] transition-all duration-500">
        <div class="h-full px-4 flex items-center justify-between gap-4">
            
            <!-- LEFT: HAMBURGER + LOGO -->
            <div class="flex items-center gap-3 shrink-0">
                <button 
                    @click="emit('toggle-sidebar')"
                    class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all active:scale-90"
                    title="Toggle Sidebar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </button>

                <Link :href="route('dashboard')" prefetch="hover" class="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                    <div class="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none shrink-0">
                        <img src="/favicon.svg" alt="Logo" class="w-5 h-5 brightness-0 invert" />
                    </div>
                    <span class="text-base font-black text-slate-800 dark:text-white tracking-tight hidden lg:block">OneForMind</span>
                </Link>
            </div>

            <!-- MIDDLE: SEARCH TRIGGER (COMMAND PALETTE) -->
            <div class="hidden md:flex items-center flex-1 max-w-lg group px-2 relative">
                <button 
                    @click="showCommandPalette = !showCommandPalette"
                    class="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-100/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border-2 border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/20 rounded-2xl transition-all group shadow-sm shadow-transparent hover:shadow-indigo-100/30 dark:hover:shadow-none"
                >
                    <div class="flex items-center gap-3">
                        <OneForMindIcon name="search" size="14" class="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                        <span class="text-[13px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-slate-500 transition-colors">Search anything...</span>
                    </div>
                </button>

                <!-- Search Dropdown Anchored Here -->
                <CommandPalette 
                    :is-open="showCommandPalette" 
                    @close="showCommandPalette = false" 
                />
            </div>

            <!-- RIGHT: ACTIONS + PROFILE -->
            <div class="flex items-center gap-1 shrink-0">

                <div
                    class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-transparent transition-all group mr-1.5 shadow-sm"
                    title="Current Date"
                >
                    <svg class="text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span class="text-[11px] font-black text-slate-600 dark:text-slate-300 transition-colors whitespace-nowrap">{{ todayLabel }}</span>
                </div>

                <!-- 🔥 STREAK BADGE — only visible when streak > 0 -->
                <Link
                    v-if="todayStreak > 0"
                    :href="route('habits.index')"
                    prefetch="hover"
                    class="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 dark:hover:bg-orange-500/20 border border-orange-100 dark:border-orange-500/20 transition-all group mr-1"
                    title="Habit Streak"
                >
                    <span class="text-sm leading-none">🔥</span>
                    <span class="text-[11px] font-black text-orange-600 dark:text-orange-400">{{ todayStreak }}</span>
                </Link>
                <Link 
                    v-if="isExplorer" 
                    :href="route('billing')" 
                    prefetch="hover"
                    class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg transition-all shadow-sm shadow-indigo-200 dark:shadow-none active:scale-95 mr-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/></svg>
                    <span class="text-[10px] font-black capitalize tracking-wide">Upgrade</span>
                </Link>

                <!-- Notification -->
                <div class="relative">
                    <button 
                        @click="showNotificationSettings = !showNotificationSettings"
                        class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all relative" 
                        title="Notifications"
                    >
                        <OneForMindIcon name="notification" size="18" />
                        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border-[1.5px] border-white dark:border-slate-900 rounded-full flex items-center justify-center"></span>
                    </button>

                    <!-- Notification Dropdown -->
                    <NotificationSettings 
                        :is-open="showNotificationSettings" 
                        @close="showNotificationSettings = false" 
                    />
                </div>

                <!-- Help -->
                <button class="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all" title="Help">
                    <OneForMindIcon name="help" size="18" />
                </button>

                <!-- Theme -->
                <button 
                    @click="toggleTheme"
                    class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
                    :title="isDark ? 'Light Mode' : 'Dark Mode'"
                >
                    <OneForMindIcon v-if="isDark" name="sun" size="17" />
                    <OneForMindIcon v-else name="moon" size="17" />
                </button>

                <div class="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1.5"></div>

                <!-- =========================== -->
                <!-- PROFILE DROPDOWN — COMPACT  -->
                <!-- =========================== -->
                <Dropdown align="right" width="64">
                    <template #trigger>
                        <button class="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
                            <div class="relative">
                                <img v-if="user?.avatar_url" :src="user.avatar_url" class="w-7 h-7 rounded-lg border border-white dark:border-slate-700 shadow-sm object-cover" />
                                <div v-else class="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black capitalize shadow-sm">
                                    {{ user?.name?.charAt(0) }}
                                </div>
                                <div class="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-[1.5px] border-white dark:border-slate-900 transition-colors" :class="currentStatus.dot"></div>
                            </div>
                            <span class="hidden lg:block text-[12px] font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[80px]">{{ user?.name?.split(' ')[0] }}</span>
                            <svg class="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                    </template>

                    <template #content>

                        <!-- ① USER INFO HEADER -->
                        <div class="px-3.5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                            <div class="relative shrink-0">
                                <img v-if="user?.avatar_url" :src="user.avatar_url" class="w-8 h-8 rounded-lg border border-white dark:border-slate-700 object-cover" />
                                <div v-else class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[11px] font-black capitalize">{{ user?.name?.charAt(0) }}</div>
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="text-[12px] font-black text-slate-800 dark:text-white truncate leading-none">{{ user?.name }}</p>
                                <p class="text-[10px] text-slate-400 truncate mt-0.5">{{ user?.email }}</p>
                            </div>
                            <!-- Plan chip -->
                            <span class="shrink-0 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full"
                                :class="isExplorer ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' : 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'">
                                {{ user?.plan_type || 'Explorer' }}
                            </span>
                        </div>

                        <!-- ② WORKING STATUS — compact toggle row (Monday-style) -->
                        <div class="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Working Status</p>
                            <div class="flex items-center gap-1.5 flex-wrap">
                                <button 
                                    v-for="s in statusOptions" :key="s.key"
                                    @click="workingStatus = s.key"
                                    class="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all border"
                                    :class="workingStatus === s.key 
                                        ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white' 
                                        : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'"
                                >
                                    <span class="w-2 h-2 rounded-full shrink-0" :class="s.dot"></span>
                                    {{ s.label }}
                                </button>
                            </div>
                        </div>

                        <!-- ③ LANGUAGE — inline toggle -->
                        <div class="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                            <div class="flex items-center justify-between">
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-wider">Language</p>
                                <div class="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                                    <button 
                                        @click="switchLang('id')"
                                        class="px-2.5 py-1 rounded-md text-[10px] font-black transition-all"
                                        :class="currentLocale === 'id' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-400 hover:text-slate-700'"
                                    >ID</button>
                                    <button 
                                        @click="switchLang('en')"
                                        class="px-2.5 py-1 rounded-md text-[10px] font-black transition-all"
                                        :class="currentLocale === 'en' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-400 hover:text-slate-700'"
                                    >EN</button>
                                </div>
                            </div>
                        </div>

                        <!-- ④ MENU ITEMS -->
                        <div class="p-1.5 space-y-0.5">
                            <DropdownLink :href="route('profile.edit')" class="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group">
                                <svg class="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <span class="text-[12px] font-medium text-slate-700 dark:text-slate-200">My Profile</span>
                            </DropdownLink>

                            <DropdownLink :href="route('settings.index')" class="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group">
                                <svg class="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                                <span class="text-[12px] font-medium text-slate-700 dark:text-slate-200">{{ $t('nav_item_settings', 'Settings') }}</span>
                            </DropdownLink>

                            <!-- Theme toggle row -->
                            <button 
                                @click="toggleTheme"
                                class="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group"
                            >
                                <svg v-if="isDark" class="text-amber-500 shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                                <svg v-else class="text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                                <span class="text-[12px] font-medium text-slate-700 dark:text-slate-200">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
                            </button>
                        </div>

                        <!-- ⑤ UPGRADE CTA (Explorer) -->
                        <div v-if="isExplorer" class="px-2 pb-2">
                            <Link :href="route('billing')" class="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-black text-[11px] uppercase tracking-wide transition-all active:scale-95 shadow-sm shadow-indigo-200 dark:shadow-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/></svg>
                                Upgrade to Architect
                            </Link>
                        </div>

                        <!-- ⑥ LOGOUT -->
                        <div class="border-t border-slate-100 dark:border-slate-800 p-1.5">
                            <button 
                                @click="router.post(route('logout'))"
                                class="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all text-left group"
                            >
                                <svg class="text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                                <span class="text-[12px] font-medium text-slate-700 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{{ $t('nav_logout', 'Log Out') }}</span>
                            </button>
                        </div>

                    </template>
                </Dropdown>

            </div>
        </div>
    </header>
</template>
