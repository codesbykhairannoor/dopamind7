<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
const user = usePage().props.auth.user;
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-brand-500 selection:text-white">
        
        <nav class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
            <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                <Link :href="route('home')" class="text-2xl font-black text-brand-600 tracking-tighter flex items-center gap-2 hover:opacity-80 transition">
                    <span class="text-3xl">✦</span> DopMyMind.
                </Link>

                <div class="hidden md:flex items-center gap-8 font-medium text-gray-500 text-sm">
                    <Link :href="route('home')" class="transition" :class="route().current('home') ? 'text-brand-600 font-bold' : 'hover:text-brand-600'">Home</Link>
                    <Link :href="route('about')" class="transition" :class="route().current('about') ? 'text-brand-600 font-bold' : 'hover:text-brand-600'">Tentang Kami</Link>
                </div>

                <div class="hidden md:flex items-center gap-3">
                    <div v-if="user">
                        <Link :href="route('dashboard')" class="text-sm font-bold text-brand-600 border border-brand-100 px-4 py-2 rounded-full hover:bg-brand-50 transition">Dashboard →</Link>
                    </div>
                    <div v-else class="flex items-center gap-2">
                        <Link :href="route('login')" class="px-4 py-2 text-sm font-bold text-gray-900 hover:text-brand-600 transition">Log in</Link>
                        <Link :href="route('register')" class="px-6 py-2.5 text-sm font-bold text-white bg-brand-600 rounded-full hover:bg-brand-900 shadow-lg shadow-brand-100 transition transform hover:-translate-y-0.5">Mulai Gratis</Link>
                    </div>
                </div>

                <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-gray-600 hover:text-brand-600">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>

            <div v-show="mobileMenuOpen" class="md:hidden bg-white border-b border-gray-100 p-4 shadow-xl animate-fade-in-down">
                <div class="flex flex-col gap-4 text-center">
                    <Link :href="route('home')" class="py-2" :class="route().current('home') ? 'text-brand-600 font-bold' : 'text-gray-600'">Home</Link>
                    <Link :href="route('about')" class="py-2" :class="route().current('about') ? 'text-brand-600 font-bold' : 'text-gray-600'">Tentang Kami</Link>
                    <hr class="border-gray-100">
                    <div v-if="user">
                        <Link :href="route('dashboard')" class="block w-full bg-brand-50 text-brand-600 font-bold py-3 rounded-xl">Dashboard</Link>
                    </div>
                    <div v-else class="flex flex-col gap-3">
                        <Link :href="route('login')" class="block w-full text-gray-600 font-bold py-2">Log in</Link>
                        <Link :href="route('register')" class="block w-full bg-brand-600 text-white font-bold py-3 rounded-xl">Mulai Gratis</Link>
                    </div>
                </div>
            </div>
        </nav>

        <main class="flex-grow pt-20">
            <slot />
        </main>

        <footer class="bg-white border-t border-gray-100 py-10 mt-auto">
            <div class="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
                <p>&copy; 2026 DopMyMind. One Month, One System.</p>
            </div>
        </footer>
    </div>
</template>