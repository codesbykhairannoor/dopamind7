<script setup>
import { ref, computed, onMounted } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import { useAppearance } from '@/Composables/useAppearance';

const page = usePage();
const user = computed(() => page.props.auth.user);
const { initTheme } = useAppearance();

const isLoading = ref(false);
const isSidebarCollapsed = ref(false);

const navItems = [
    { name: 'Blog Overview', icon: 'dashboard', route: 'admin.blog.index', active: 'admin.blog.index' },
    { name: 'Write Post', icon: 'journal', route: 'admin.blog.create', active: 'admin.blog.create' },
    { name: 'User Directory', icon: 'goal', route: 'admin.users.index', active: 'admin.users.index' },
];

const logout = () => {
    router.post(route('logout'));
};

const startLoading = () => { isLoading.value = true; };
const stopLoading = () => { isLoading.value = false; };

onMounted(() => {
    initTheme();
    router.on('start', startLoading);
    router.on('finish', stopLoading);
    router.on('error', stopLoading);
});
</script>

<template>
    <div class="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden transition-colors duration-500">
        
        <!-- MODERN CLEAN SIDEBAR -->
        <aside class="w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col z-20 shadow-sm relative">
            <!-- Header -->
            <div class="h-24 flex items-center px-8 border-b border-slate-100 dark:border-slate-700/50">
                <Link :href="route('dashboard')" class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none">
                        <OneForMindIcon name="sparkles" size="20" class="text-white" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-lg font-bold text-slate-900 dark:text-white tracking-tight">OneForMind</span>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none">Admin Console</span>
                    </div>
                </Link>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
                <div v-for="item in navItems" :key="item.name">
                    <Link :href="route(item.route)"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group font-medium"
                        :class="[
                            route().current(item.active) 
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
                        ]"
                    >
                        <OneForMindIcon :name="item.icon" size="18" :class="route().current(item.active) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-slate-600'" />
                        <span class="text-sm truncate">{{ item.name }}</span>
                    </Link>
                </div>
            </nav>

            <!-- Bottom Section -->
            <div class="p-4 border-t border-slate-100 dark:border-slate-700/50">
                <div class="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 flex items-center gap-3 border border-slate-200/50 dark:border-slate-700/30">
                     <img :src="user.avatar_url" class="w-10 h-10 rounded-xl object-cover shadow-sm" />
                     <div class="flex-1 min-w-0">
                        <p class="text-slate-900 dark:text-white text-xs font-bold truncate">{{ user.name }}</p>
                        <p class="text-[10px] text-slate-500 font-medium truncate italic">System Admin</p>
                     </div>
                     <button @click="logout" class="p-2 text-slate-400 hover:text-rose-500 transition-colors" title="Keluar">
                        <OneForMindIcon name="logout" size="18" />
                     </button>
                </div>
                
                <Link :href="route('dashboard')" class="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 dark:bg-slate-700 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-slate-800 transition-all shadow-md">
                    <OneForMindIcon name="chevron-left" size="12" />
                    Exit to App
                </Link>
            </div>
        </aside>

        <!-- MAIN AREA -->
        <main class="flex-1 flex flex-col min-w-0 overflow-hidden relative">
            <!-- Loading Overlay -->
            <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="isLoading" class="absolute inset-0 z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                    <div class="flex flex-col items-center gap-4">
                        <div class="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                        <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest animate-pulse">Syncing...</span>
                    </div>
                </div>
            </Transition>

            <!-- Top bar -->
            <header class="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between px-10 shrink-0">
                <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Session Control</h2>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Operational</span>
                    </div>
                </div>
            </header>

            <!-- Dashboard Content -->
            <div class="flex-1 overflow-y-auto p-10 bg-slate-50/50 dark:bg-slate-900">
                <slot />
            </div>
        </main>
    </div>
</template>
