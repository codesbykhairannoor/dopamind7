<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { ref, computed, onMounted, onUnmounted } from 'vue';

// --- STATE NAVIGASI & USER ---
const mobileMenuOpen = ref(false);
const activeMenu = ref(null); // Untuk Dropdown Desktop
const activeAccordion = ref(null); // Untuk Dropdown Mobile
const scrolled = ref(false);

const page = usePage();
const user = computed(() => page.props.auth?.user);
const currentLang = computed(() => page.props.locale || 'id');

// --- FUNGSI SCROLL ---
const handleScroll = () => {
    scrolled.value = window.scrollY > 20;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

// --- FUNGSI GANTI BAHASA ---
const switchLang = (lang) => {
    window.location.href = route('lang.switch', lang);
};
</script>

<template>
    <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 relative">
        
        <nav 
            :class="(scrolled || mobileMenuOpen) ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm' : 'bg-transparent'"
            class="fixed top-0 w-full z-[100] transition-all duration-300"
        >
            <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative">
                
                <a :href="route('home')" class="group flex items-center gap-2.5 z-[110]">
                    <div class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-200">
                        <img src="/favicon.svg?v=2" alt="Logo" class="w-6 h-6 brightness-0 invert" />
                    </div>
                    <span class="text-xl font-black tracking-tighter text-slate-900">OneForMind<span class="text-indigo-600">.</span></span>
                </a>

                <div class="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    
                    <div class="relative group" @mouseenter="activeMenu = 'features'" @mouseleave="activeMenu = null">
                        <button class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all flex items-center gap-1 group-hover:text-indigo-600">
                            {{ $t('nav_features', 'Features') }}
                            <svg class="w-4 h-4 opacity-50 transition-transform duration-200" :class="activeMenu === 'features' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        
                        <Transition
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 translate-y-2"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-2"
                        >
                            <div v-show="activeMenu === 'features'" class="absolute top-full left-0 w-[500px] pt-4 z-50">
                                <div class="bg-white border border-slate-100 shadow-2xl rounded-[2rem] overflow-hidden p-4">
                                    <div class="grid grid-cols-2 gap-2 text-left">
                                        <a :href="route('features.habit')" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item">
                                            <span class="text-xl group-hover/item:scale-110 transition-transform">🌱</span>
                                            <div><h4 class="font-bold text-slate-900 text-sm">Habit Tracker</h4><p class="text-[11px] font-medium text-slate-500">Build consistency every day.</p></div>
                                        </a>
                                        <a :href="route('features.finance')" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item">
                                            <span class="text-xl group-hover/item:scale-110 transition-transform">💰</span>
                                            <div><h4 class="font-bold text-slate-900 text-sm">Finance</h4><p class="text-[11px] font-medium text-slate-500">Master your cash flow.</p></div>
                                        </a>
                                        <a :href="route('features.planner')" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item">
                                            <span class="text-xl group-hover/item:scale-110 transition-transform">🎯</span>
                                            <div><h4 class="font-bold text-slate-900 text-sm">Planner</h4><p class="text-[11px] font-medium text-slate-500">Organize your daily tasks.</p></div>
                                        </a>
                                        <a :href="route('features.journal')" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item">
                                            <span class="text-xl group-hover/item:scale-110 transition-transform">📔</span>
                                            <div><h4 class="font-bold text-slate-900 text-sm">Journal</h4><p class="text-[11px] font-medium text-slate-500">Clear your mental clutter.</p></div>
                                        </a>
                                        <a :href="route('features.calendar')" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item">
                                            <span class="text-xl group-hover/item:scale-110 transition-transform">📅</span>
                                            <div><h4 class="font-bold text-slate-900 text-sm">Calendar</h4><p class="text-[11px] font-medium text-slate-500">Visual time management.</p></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <div class="relative group" @mouseenter="activeMenu = 'solutions'" @mouseleave="activeMenu = null">
                        <button class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1 group-hover:text-indigo-600">
                            {{ $t('nav_solutions', 'Solutions') }}
                            <svg class="w-4 h-4 opacity-50 transition-transform duration-200" :class="activeMenu === 'solutions' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        
                        <Transition
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 translate-y-2"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-2"
                        >
                            <div v-show="activeMenu === 'solutions'" class="absolute top-full left-0 w-[280px] pt-4 z-50">
                                <div class="p-3 bg-white border border-slate-100 shadow-2xl rounded-[1.5rem] flex flex-col gap-1 text-left">
                                    <a :href="route('solutions.student')" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item">
                                        <span class="text-lg group-hover/item:scale-110 transition-transform">🎓</span>
                                        <div><h4 class="font-bold text-slate-900 text-sm">For Students</h4></div>
                                    </a>
                                    <a :href="route('solutions.freelancer')" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item">
                                        <span class="text-lg group-hover/item:scale-110 transition-transform">💻</span>
                                        <div><h4 class="font-bold text-slate-900 text-sm">For Freelancers</h4></div>
                                    </a>
                                    <a :href="route('solutions.personalgrowth')" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item">
                                        <span class="text-lg group-hover/item:scale-110 transition-transform">🚀</span>
                                        <div><h4 class="font-bold text-slate-900 text-sm">Personal Growth</h4></div>
                                    </a>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <div class="relative group" @mouseenter="activeMenu = 'resources'" @mouseleave="activeMenu = null">
                        <button class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1 group-hover:text-indigo-600">
                            {{ $t('nav_resources', 'Resources') }}
                            <svg class="w-4 h-4 opacity-50 transition-transform duration-200" :class="activeMenu === 'resources' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>

                        <Transition
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 translate-y-2"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-2"
                        >
                            <div v-show="activeMenu === 'resources'" class="absolute top-full left-0 w-[280px] pt-4 z-50 text-left">
                                <div class="p-3 bg-white border border-slate-100 shadow-2xl rounded-[1.5rem] flex flex-col gap-1">
                                    <a :href="route('resources.guide')" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item">
                                        <span class="text-lg group-hover/item:scale-110 transition-transform">📖</span>
                                        <div><h4 class="font-bold text-slate-900 text-sm">User Guide</h4></div>
                                    </a>
                                    <a :href="route('resources.blog')" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item">
                                        <span class="text-lg group-hover/item:scale-110 transition-transform">✍️</span>
                                        <div><h4 class="font-bold text-slate-900 text-sm">Blog</h4></div>
                                    </a>
                                    <a :href="route('resources.stories')" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group/item">
                                        <span class="text-lg group-hover/item:scale-110 transition-transform">✨</span>
                                        <div><h4 class="font-bold text-slate-900 text-sm">User Stories</h4></div>
                                    </a>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <a :href="route('pricing')" class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition">
                        {{ $t('nav_pricing', 'Pricing') }}
                    </a>
                </div>

                <div class="hidden lg:flex items-center gap-4">
                    <div class="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 mr-2">
                        <button @click="switchLang('id')" class="px-3 py-1 rounded-full text-[10px] font-black transition-all" :class="currentLang === 'id' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'">ID</button>
                        <button @click="switchLang('en')" class="px-3 py-1 rounded-full text-[10px] font-black transition-all" :class="currentLang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'">EN</button>
                    </div>

                    <div v-if="user">
                        <Link :href="route('dashboard')" class="px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">Dashboard</Link>
                    </div>
                    <div v-else class="flex items-center gap-3">
                        <Link :href="route('login')" class="text-sm font-bold text-slate-600 hover:text-indigo-600 transition">{{ $t('nav_login', 'Log in') }}</Link>
                        <Link :href="route('register')" class="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5 active:scale-95">
                            {{ $t('nav_register', 'Get Started') }}
                        </Link>
                    </div>
                </div>

                <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden p-2 text-slate-900 relative z-[110] focus:outline-none">
                    <div class="w-6 flex flex-col items-end gap-1.5">
                        <span :class="mobileMenuOpen ? 'rotate-45 translate-y-2 w-6' : 'w-6'" class="h-0.5 bg-current transition-all duration-300"></span>
                        <span :class="mobileMenuOpen ? 'opacity-0' : 'w-4'" class="h-0.5 bg-current transition-all duration-300"></span>
                        <span :class="mobileMenuOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-5'" class="h-0.5 bg-current transition-all duration-300"></span>
                    </div>
                </button>
            </div>

            <Transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
            >
                <div v-show="mobileMenuOpen" class="lg:hidden fixed inset-0 top-0 bg-white z-[100] pt-24 px-6 pb-10 flex flex-col h-screen overflow-y-auto">
                    
                    <div class="flex-grow space-y-2">
                        <div class="border-b border-slate-50">
                            <button @click="activeAccordion = activeAccordion === 'features' ? null : 'features'" class="w-full py-5 flex justify-between items-center text-xl font-black text-slate-900">
                                <span>{{ $t('nav_features', 'Features') }}</span>
                                <svg :class="activeAccordion === 'features' ? 'rotate-180' : ''" class="w-5 h-5 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div v-show="activeAccordion === 'features'" class="grid grid-cols-1 gap-1 pb-4">
                                <a :href="route('features.habit')" class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">🌱 Habit Tracker</a>
                                <a :href="route('features.finance')" class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">💰 Finance Tracker</a>
                                <a :href="route('features.planner')" class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">🎯 Daily Planner</a>
                                <a :href="route('features.journal')" class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">📔 Mindful Journal</a>
                                <a :href="route('features.calendar')" class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">📅 Calendar</a>
                            </div>
                        </div>

                        <div class="border-b border-slate-50">
                            <button @click="activeAccordion = activeAccordion === 'solutions' ? null : 'solutions'" class="w-full py-5 flex justify-between items-center text-xl font-black text-slate-900">
                                <span>{{ $t('nav_solutions', 'Solutions') }}</span>
                                <svg :class="activeAccordion === 'solutions' ? 'rotate-180' : ''" class="w-5 h-5 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div v-show="activeAccordion === 'solutions'" class="grid grid-cols-1 gap-1 pb-4 text-left">
                                <a :href="route('solutions.student')" class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">🎓 For Students</a>
                                <a :href="route('solutions.freelancer')" class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">💻 For Freelancers</a>
                                <a :href="route('solutions.personalgrowth')" class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">🚀 Personal Growth</a>
                            </div>
                        </div>

                        <div class="border-b border-slate-50">
                            <button @click="activeAccordion = activeAccordion === 'resources' ? null : 'resources'" class="w-full py-5 flex justify-between items-center text-xl font-black text-slate-900">
                                <span>{{ $t('nav_resources', 'Resources') }}</span>
                                <svg :class="activeAccordion === 'resources' ? 'rotate-180' : ''" class="w-5 h-5 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div v-show="activeAccordion === 'resources'" class="grid grid-cols-1 gap-1 pb-4 text-left">
                                <a :href="route('resources.guide')" class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">📖 User Guide</a>
                                <a :href="route('resources.blog')" class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">✍️ Blog</a>
                                <a :href="route('resources.stories')" class="flex items-center gap-3 p-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50">✨ User Stories</a>
                            </div>
                        </div>

                        <a :href="route('pricing')" class="block py-5 text-xl font-black text-slate-900 border-b border-slate-50">{{ $t('nav_pricing', 'Pricing') }}</a>
                    </div>

                    <div class="pt-8 space-y-6">
                        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <span class="text-sm font-bold text-slate-500">Language</span>
                            <div class="flex gap-2">
                                <button @click="switchLang('id')" class="px-3 py-1 rounded-lg text-xs font-black transition-all" :class="currentLang === 'id' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-400'">ID</button>
                                <button @click="switchLang('en')" class="px-3 py-1 rounded-lg text-xs font-black transition-all" :class="currentLang === 'en' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-400'">EN</button>
                            </div>
                        </div>
                        
                        <div v-if="!user" class="grid grid-cols-1 gap-3">
                            <Link :href="route('login')" class="w-full py-4 text-center font-bold text-slate-900 bg-white border border-slate-200 rounded-2xl">{{ $t('nav_login', 'Log in') }}</Link>
                            <Link :href="route('register')" class="w-full py-4 text-center font-black text-white bg-indigo-600 rounded-2xl shadow-xl">{{ $t('nav_register', 'Get Started free') }}</Link>
                        </div>
                        <div v-else>
                            <Link :href="route('dashboard')" class="block w-full py-4 text-center font-black text-white bg-slate-900 rounded-2xl">Go to Dashboard</Link>
                        </div>
                    </div>
                </div>
            </Transition>
        </nav>

        <main class="flex-grow pt-20">
            <slot />
        </main>

        <footer class="bg-slate-50 border-t border-slate-100 pt-20 pb-10 mt-auto">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16 text-left">
                    <div class="col-span-2 md:col-span-1">
                        <a :href="route('home')" class="flex items-center gap-2 mb-6">
                            <img src="/favicon.svg?v=2" alt="Logo" class="w-7 h-7" />
                            <span class="text-lg font-black tracking-tighter">OneForMind</span>
                        </a>
                        <p class="text-sm text-slate-500 leading-relaxed">
                            The unified productivity system designed to bring clarity to your life, habits, and finances.
                        </p>
                    </div>

                    <div>
                        <h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Product</h3>
                        <ul class="space-y-4 text-sm font-bold text-slate-500">
                            <li><a :href="route('features.habit')" class="hover:text-indigo-600 transition">Habit Tracker</a></li>
                            <li><a :href="route('features.finance')" class="hover:text-indigo-600 transition">Finance Tracker</a></li>
                            <li><a :href="route('features.planner')" class="hover:text-indigo-600 transition">Daily Planner</a></li>
                            <li><a :href="route('pricing')" class="hover:text-indigo-600 transition">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Compare</h3>
                        <ul class="space-y-4 text-sm font-bold text-slate-500">
                            <li><a :href="route('compare.paper')" class="hover:text-indigo-600 transition">vs Paper Planner</a></li>
                            <li><a :href="route('compare.sheets')" class="hover:text-indigo-600 transition">vs Spreadsheets</a></li>
                            <li><a :href="route('compare.management-tools')" class="hover:text-indigo-600 transition">vs Task Tools</a></li>
                            <li><a :href="route('compare.habit-apps')" class="hover:text-indigo-600 transition">vs Habit Apps</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Company</h3>
                        <ul class="space-y-4 text-sm font-bold text-slate-500">
                            <li><a :href="route('about')" class="hover:text-indigo-600 transition">About Us</a></li>
                            <li><a :href="route('company.privacy')" class="hover:text-indigo-600 transition">Privacy Policy</a></li>
                            <li><a :href="route('company.terms')" class="hover:text-indigo-600 transition">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Connect</h3>
                        <div class="flex gap-4">
                            <a href="#" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm">𝕏</a>
                            <a href="#" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm">📸</a>
                        </div>
                    </div>
                </div>

                <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-600">
                    <p>&copy; {{ new Date().getFullYear() }} OneForMind. All rights reserved.</p>
                    <p>Made with ✨ by Dopamind7 Team</p>
                </div>
            </div>
        </footer>
    </div>
</template>