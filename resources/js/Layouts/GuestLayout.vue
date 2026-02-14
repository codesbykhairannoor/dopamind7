<script setup>
import { Link, usePage, router } from '@inertiajs/vue3'; // <--- Tambah 'router' disini
import { ref, computed } from 'vue';
import { loadLanguageAsync } from 'laravel-vue-i18n'; 

const mobileMenuOpen = ref(false);
const user = usePage().props.auth.user;
const page = usePage();

// Ambil bahasa aktif dari Shared Props (default 'id')
const currentLang = computed(() => page.props.locale || 'id');

// --- FUNGSI GANTI BAHASA (FIXED) ---
const switchLang = (lang) => {
    // Kita pake 'router.visit' biar session PHP bener-bener kesimpen dulu
    // baru halaman otomatis reload.
    router.visit(route('lang.switch', lang), {
        method: 'get',
        preserveScroll: true, // Biar gak scroll ke atas lagi
        onSuccess: () => {
            // Setelah sukses reload dari server, baru ganti kamus di frontend
            loadLanguageAsync(lang);
        }
    });
};

const isActive = (routeName) => route().current(routeName);
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-brand-500 selection:text-white">
        
        <nav class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all animate-in slide-in-from-top-full duration-700">
            <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative">
                
                <Link :href="route('home')" class="group text-2xl font-black text-indigo-600 tracking-tighter flex items-center gap-2 hover:opacity-80 transition z-20">
    <img 
        src="/favicon.png?v=2" 
        alt="OneForMind Logo" 
        class="w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
    />
    
    <span>OneForMind<span class="text-indigo-400">.</span></span>
</Link>

                <div class="hidden md:flex items-center gap-2 font-medium text-sm absolute left-1/2 -translate-x-1/2">
                    <Link 
                        :href="route('home')" prefetch
                        class="px-5 py-2.5 rounded-full transition-all duration-300"
                        :class="isActive('home') 
                            ? 'bg-brand-50 text-brand-600 font-bold shadow-sm ring-1 ring-brand-100' 
                            : 'text-gray-500 hover:text-brand-600 hover:bg-gray-50'"
                    >
                        {{ $t('nav_home') }}
                    </Link>

                    <Link 
                        :href="route('about')" prefetch
                        class="px-5 py-2.5 rounded-full transition-all duration-300"
                        :class="isActive('about') 
                            ? 'bg-brand-50 text-brand-600 font-bold shadow-sm ring-1 ring-brand-100' 
                            : 'text-gray-500 hover:text-brand-600 hover:bg-gray-50'"
                    >
                        {{ $t('nav_about') }}
                    </Link>
                </div>

                <div class="hidden md:flex items-center gap-5 z-20">
                    
                    <div class="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                        <button
    @click="switchLang('id')" prefetch
    class="px-3 py-1 rounded-full text-xs font-bold transition-all duration-300"
    :class="currentLang === 'id' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'"
    aria-label="Switch language to Indonesian"
>
    ID 
</button>
<button
    @click="switchLang('en')" prefetch
    class="px-3 py-1 rounded-full text-xs font-bold transition-all duration-300"
    :class="currentLang === 'en' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'"
    aria-label="Switch language to English"
>
    EN
</button>
                        
                    </div>

                    <div class="h-6 w-px bg-gray-200"></div> 

                    <div v-if="user">
                        <Link :href="route('dashboard')" prefetch class="text-sm font-bold text-brand-600 border border-brand-100 px-5 py-2.5 rounded-full hover:bg-brand-50 transition shadow-sm hover:shadow-md">
                            {{ $t('nav_dashboard') }} →
                        </Link>
                    </div>
                    <div v-else class="flex items-center gap-3">
                        <Link :href="route('login')" prefetch class="px-4 py-2 text-sm font-bold text-gray-900 hover:text-brand-600 transition">
                            {{ $t('nav_login') }}
                        </Link>
                        <Link :href="route('register')" prefetch class="px-6 py-2.5 text-sm font-bold text-white bg-brand-600 rounded-full hover:bg-brand-700 shadow-lg shadow-brand-200 transition transform hover:-translate-y-0.5 active:scale-95">
                            {{ $t('nav_register') }}
                        </Link>
                    </div>
                </div>

               <button 
    @click="mobileMenuOpen = !mobileMenuOpen" 
    class="md:hidden text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition z-20"
    aria-label="Toggle mobile menu"
    :aria-expanded="mobileMenuOpen"
>
    <svg v-if="!mobileMenuOpen" aria-hidden="true" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    <svg v-else aria-hidden="true" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
</button>
            </div>
            
            <div v-show="mobileMenuOpen" class="md:hidden bg-white border-b border-gray-100 p-6 shadow-xl animate-in slide-in-from-top-5 duration-300">
                 <div class="flex flex-col gap-4 text-center font-bold text-gray-600">
                     <Link 
                        :href="route('home')" 
                        class="py-2 rounded-xl transition"
                        :class="isActive('home') ? 'bg-brand-50 text-brand-600' : ''"
                    >
                        {{ $t('nav_home') }}
                    </Link>
                     <Link 
                        :href="route('about')" 
                        class="py-2 rounded-xl transition"
                        :class="isActive('about') ? 'bg-brand-50 text-brand-600' : ''"
                    >
                        {{ $t('nav_about') }}
                    </Link>
                     
                     <hr class="border-gray-100 my-2">

                     <div class="flex justify-center gap-4 py-2">
                         <button @click="switchLang('id')" :class="currentLang === 'id' ? 'text-brand-600 font-bold' : 'text-gray-400'">🇮🇩 ID</button>
                         <span class="text-gray-200">|</span>
                         <button @click="switchLang('en')" :class="currentLang === 'en' ? 'text-brand-600 font-bold' : 'text-gray-400'">🇬🇧 EN</button>
                     </div>
                     
                     <div v-if="!user" class="flex flex-col gap-3">
                        <Link :href="route('login')" class="py-2 text-gray-900">{{ $t('nav_login') }}</Link>
                        <Link :href="route('register')" class="py-3 bg-brand-600 text-white rounded-xl shadow-lg">{{ $t('nav_register') }}</Link>
                     </div>
                     <div v-else>
                        <Link :href="route('dashboard')" class="block py-3 bg-brand-50 text-brand-600 rounded-xl">{{ $t('nav_dashboard') }}</Link>
                     </div>
                 </div>
             </div>
        </nav>

        <main class="flex-grow pt-20">
            <slot />
        </main>

        <footer class="bg-white border-t border-gray-100 py-10 mt-auto">
            <div class="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm animate-in fade-in duration-1000 delay-500">
                <p>&copy; 2026 OneForMind. {{ $t('footer_rights') }}</p>
            </div>
        </footer>
    </div>
</template>