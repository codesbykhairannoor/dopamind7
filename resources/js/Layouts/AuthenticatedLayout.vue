<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const user = usePage().props.auth.user;
const showingNavigationDropdown = ref(false); // Mobile toggle
</script>

<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans overflow-hidden">
        
        <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col z-20 shadow-sm flex-shrink-0">
            <div class="h-20 flex items-center px-8 border-b border-gray-100 dark:border-gray-700">
                <Link :href="route('dashboard')" class="text-2xl font-black text-brand-600 tracking-tighter hover:opacity-80">
                    DopMyMind.
                </Link>
            </div>

            <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <Link :href="route('dashboard')" class="flex items-center px-4 py-3 rounded-xl transition-all group" :class="route().current('dashboard') ? 'bg-brand-600 text-white shadow-lg shadow-brand-200' : 'text-gray-600 hover:bg-gray-50'">
                    <span class="font-bold">Dashboard</span>
                </Link>
                <Link :href="route('habits.index')" class="flex items-center px-4 py-3 rounded-xl transition-all group" :class="route().current('habits.*') ? 'bg-brand-600 text-white shadow-lg shadow-brand-200' : 'text-gray-600 hover:bg-gray-50'">
                    <span class="font-bold">Habit Tracker</span>
                </Link>
                <div class="px-4 py-3 text-sm text-gray-400 font-medium cursor-not-allowed flex justify-between">
                    Finance <span class="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded text-gray-500 uppercase">Soon</span>
                </div>
            </nav>

            <div class="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm shadow">
                        {{ user.name.charAt(0) }}
                    </div>
                    <div class="flex-1 overflow-hidden">
                        <p class="text-sm font-bold text-gray-900 truncate">{{ user.name }}</p>
                        <Link :href="route('logout')" method="post" as="button" class="text-xs text-red-500 hover:underline font-medium">Log Out</Link>
                    </div>
                </div>
            </div>
        </aside>

        <main class="flex-1 overflow-y-auto relative w-full">
            <div class="md:hidden bg-white h-16 flex items-center justify-between px-4 border-b sticky top-0 z-30 shadow-sm">
                <span class="font-bold text-brand-600 text-lg">DopMyMind</span>
                <button @click="showingNavigationDropdown = !showingNavigationDropdown" class="text-gray-500">
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
            </div>

            <div v-show="showingNavigationDropdown" class="md:hidden bg-white border-b p-4 space-y-2 shadow-lg">
                <Link :href="route('dashboard')" class="block py-2 font-bold text-brand-600">Dashboard</Link>
                <Link :href="route('habits.index')" class="block py-2 text-gray-600">Habit Tracker</Link>
                <Link :href="route('logout')" method="post" as="button" class="block py-2 text-red-500 w-full text-left">Log Out</Link>
            </div>

            <div class="p-6 md:p-10 max-w-7xl mx-auto">
                <slot />
            </div>
        </main>
    </div>
</template>