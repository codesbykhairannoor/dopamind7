<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="view-transition" content="same-origin">
    
    {{-- 🔥 1. SMART REDIRECT (Trik ClickUp): Cek cookie, langsung lempar ke dashboard --}}
    <script>
        if (document.cookie.includes('oneformind_session')) {
            window.location.replace('/dashboard');
        }
    </script>

    <meta name="description" content="{{ app()->getLocale() === 'id' 
        ? 'OneForMind: Satu aplikasi produktivitas terpadu untuk kelola keuangan, kebiasaan, dan rencana harian dalam satu dashboard minimalis.' 
        : 'OneForMind: The unified productivity OS to manage finances, habits, and daily plans in one minimalist dashboard.' 
    }}">

    <title>@yield('title') — OneForMind</title>

    <meta property="og:title" content="OneForMind | Productivity OS">
    <meta property="og:image" content="{{ asset('favicon.svg') }}">
    
    @yield('meta')

    <link rel="icon" type="image/x-icon" href="/favicon.svg?v=2">
    
    {{-- 🔥 2. DNS PREFETCH: Buka jalur tol lebih awal --}}
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.bunny.net">
    <link rel="dns-prefetch" href="https://unpkg.com">
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" />
    <link rel="stylesheet" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" media="print" onload="this.media='all'" />

    {{-- Font Loading --}}
    <noscript>
    <link rel="stylesheet" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" />
</noscript>

    {{-- Plugin Alpine.js --}}
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>
    
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
    
    {{-- Vite otomatis handle preload CSS yang benar, JANGAN hardcode link CSS di sini --}}
    @vite(['resources/css/app.css'])

    {{-- 🔥 3. SPECULATION RULES: Prerender halaman penting (0ms load) --}}
   {{-- 🔥 3. SPECULATION RULES: Prerender SEMUA halaman publik (Teleportasi Mode) --}}
    <script type="speculationrules">
    {
      "prerender": [
        {
          "source": "list",
          "urls": [
            /* --- CORE --- */
            "/login", 
            "/register", 
            "/about", 
            "/pricing",

            /* --- FEATURES --- */
            "/features/habit",
            "/features/finance",
            "/features/planner",
            "/features/journal",
            "/features/calendar",

            /* --- SOLUTIONS --- */
            "/solutions/student",
            "/solutions/freelancer",
            "/solutions/personalgrowth",

            /* --- RESOURCES --- */
            "/resources/guide",
            "/resources/blog",
            "/resources/stories",

            /* --- COMPANY --- */
            "/company/privacy",
            "/company/terms",

            /* --- COMPARE --- */
            "/compare/paper",
            "/compare/sheets",
            "/compare/management-tools",
            "/compare/habit-apps"
          ]
        }
      ]
    }
    </script>

    <style>
        [x-cloak] { display: none !important; }
        body { position: static !important; }
        /* Fix scrollbar biar cantik */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        
        /* 3. 🔥 CUSTOM NPROGRESS COLOR (Indigo 600) */
        #nprogress .bar {
            background: #4f46e5 !important;
            height: 3px !important;
        }
        #nprogress .peg {
            box-shadow: 0 0 10px #4f46e5, 0 0 5px #4f46e5 !important;
        }

        /* Fix scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        
        /* Re-enable smooth scroll secara terbatas agar tidak ganggu HTMX */
        .allow-smooth { scroll-behavior: smooth; }
    </style>
</head>
{{-- HTMX Boost + Smooth Scroll --}}
<body hx-boost="true" class="bg-white text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700 flex flex-col min-h-screen">

    <div x-data="{ 
        mobileMenuOpen: false, 
        activeMenu: null,
        activeAccordion: null,
        scrolled: false 
    }" 
    @scroll.window="scrolled = (window.pageYOffset > 20)"
    class="relative">
        
        {{-- NAVBAR --}}
        {{-- NAVBAR --}}
        <nav 
            :class="(scrolled || mobileMenuOpen) ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm' : 'bg-transparent'"
            class="fixed top-0 w-full z-[100] transition-all duration-300"
        >
            <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative">
                
                {{-- LOGO --}}
                <a href="{{ route('home') }}" class="group flex items-center gap-2.5 z-[110]">
                    <div class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-200">
                        <img src="/favicon.svg?v=2" alt="Logo" class="w-6 h-6 brightness-0 invert" />
                    </div>
                    <span class="text-xl font-black tracking-tighter text-slate-900">OneForMind<span class="text-indigo-600">.</span></span>
                </a>

                {{-- DESKTOP MENU --}}
                <div class="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    
                    {{-- DROPDOWN: FEATURES --}}
                    <div class="relative group" @mouseenter="activeMenu = 'features'" @mouseleave="activeMenu = null">
                        <button class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all flex items-center gap-1 group-hover:text-indigo-600">
                            {{ __('nav_features') }}
                            <svg class="w-4 h-4 opacity-50 transition-transform group-hover:rotate-180" :class="activeMenu === 'features' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        
                        {{-- Wrapper Jembatan (pt-4 untuk bridging) --}}
                        <div x-show="activeMenu === 'features'" 
                             x-transition:enter="transition ease-out duration-200"
                             x-transition:enter-start="opacity-0 translate-y-2"
                             x-transition:enter-end="opacity-100 translate-y-0"
                             x-transition:leave="transition ease-in duration-150"
                             x-transition:leave-start="opacity-100 translate-y-0"
                             x-transition:leave-end="opacity-0 translate-y-2"
                             x-cloak 
                             class="absolute top-full left-0 w-[500px] pt-4 z-50">
                            
                            {{-- Kartu Visual --}}
                            <div class="bg-white border border-slate-100 shadow-2xl rounded-[2rem] overflow-hidden p-4">
                                <div class="grid grid-cols-2 gap-2 text-left">
                                    <x-nav-item href="{{ route('features.habit') }}" icon="🌱" title="Habit Tracker" desc="Build consistency every day." />
                                    <x-nav-item href="{{ route('features.finance') }}" icon="💰" title="Finance" desc="Master your cash flow." />
                                    <x-nav-item href="{{ route('features.planner') }}" icon="🎯" title="Planner" desc="Organize your daily tasks." />
                                    <x-nav-item href="{{ route('features.journal') }}" icon="📔" title="Journal" desc="Clear your mental clutter." />
                                    <x-nav-item href="{{ route('features.calendar') }}" icon="📅" title="Calendar" desc="Visual time management." />
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- DROPDOWN: SOLUTIONS --}}
                    <div class="relative group" @mouseenter="activeMenu = 'solutions'" @mouseleave="activeMenu = null">
                        <button class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1 group-hover:text-indigo-600">
                            {{ __('nav_solutions') }}
                            <svg class="w-4 h-4 opacity-50 transition-transform group-hover:rotate-180" :class="activeMenu === 'solutions' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        
                        {{-- Wrapper Jembatan --}}
                        <div x-show="activeMenu === 'solutions'" 
                             x-transition 
                             x-cloak 
                             class="absolute top-full left-0 w-[280px] pt-4 z-50">
                            
                            {{-- Kartu Visual --}}
                            <div class="p-3 bg-white border border-slate-100 shadow-2xl rounded-[1.5rem]">
                                <x-nav-item href="{{ route('solutions.student') }}" icon="🎓" title="For Students" desc="Manage studies and life." />
                                <x-nav-item href="{{ route('solutions.freelancer') }}" icon="💻" title="For Freelancers" desc="Track projects and income." />
                                <x-nav-item href="{{ route('solutions.personalgrowth') }}" icon="🚀" title="Personal Growth" desc="Unlock your best self." />
                            </div>
                        </div>
                    </div>

                    {{-- DROPDOWN: RESOURCES --}}
                    <div class="relative group" @mouseenter="activeMenu = 'resources'" @mouseleave="activeMenu = null">
                        <button class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1 group-hover:text-indigo-600">
                            {{ __('nav_resources') }}
                            <svg class="w-4 h-4 opacity-50 transition-transform group-hover:rotate-180" :class="activeMenu === 'resources' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>

                        {{-- Wrapper Jembatan --}}
                        <div x-show="activeMenu === 'resources'" 
                             x-transition 
                             x-cloak 
                             class="absolute top-full left-0 w-[280px] pt-4 z-50 text-left">
                            
                            {{-- Kartu Visual --}}
                            <div class="p-3 bg-white border border-slate-100 shadow-2xl rounded-[1.5rem]">
                                <x-nav-item href="{{ route('resources.guide') }}" icon="📖" title="User Guide" desc="Learn the system." />
                                <x-nav-item href="{{ route('resources.blog') }}" icon="✍️" title="Blog" desc="Tips and stories." />
                                <x-nav-item href="{{ route('resources.stories') }}" icon="✨" title="User Stories" desc="Success community." />
                            </div>
                        </div>
                    </div>

                    <a href="{{ route('pricing') }}" class="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition">
                        {{ __('nav_pricing') }}
                    </a>
                </div>

                {{-- RIGHT ACTIONS --}}
                <div class="hidden lg:flex items-center gap-4">
                    <div class="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 mr-2">
                        <a href="{{ route('lang.switch', 'id') }}" class="px-3 py-1 rounded-full text-[10px] font-black transition-all {{ app()->getLocale() === 'id' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500' }}">ID</a>
                        <a href="{{ route('lang.switch', 'en') }}" class="px-3 py-1 rounded-full text-[10px] font-black transition-all {{ app()->getLocale() === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500' }}">EN</a>
                    </div>

                    @auth
                        <a href="{{ route('dashboard') }}" class="px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}" class="text-sm font-bold text-slate-600 hover:text-indigo-600 transition">{{ __('nav_login') }}</a>
                        <a href="{{ route('register') }}" class="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5 active:scale-95">
                            {{ __('nav_register') }}
                        </a>
                    @endauth
                </div>

                {{-- MOBILE HAMBURGER BUTTON --}}
                <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden p-2 text-slate-900 relative z-[110] focus:outline-none" aria-label="Open Navigation">
                    <div class="w-6 flex flex-col items-end gap-1.5">
                        <span :class="mobileMenuOpen ? 'rotate-45 translate-y-2 w-6' : 'w-6'" class="h-0.5 bg-current transition-all duration-300"></span>
                        <span :class="mobileMenuOpen ? 'opacity-0' : 'w-4'" class="h-0.5 bg-current transition-all duration-300"></span>
                        <span :class="mobileMenuOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-5'" class="h-0.5 bg-current transition-all duration-300"></span>
                    </div>
                </button>
            </div>

            {{-- MOBILE MENU OVERLAY (Isi sama dengan kodemu, aman) --}}
            <div x-show="mobileMenuOpen" 
                 x-transition:enter="transition ease-out duration-300"
                 x-transition:enter-start="opacity-0 translate-y-4"
                 x-transition:enter-end="opacity-100 translate-y-0"
                 x-cloak 
                 class="lg:hidden fixed inset-0 top-0 bg-white z-[100] pt-24 px-6 pb-10 flex flex-col h-screen overflow-y-auto">
                
                <div class="flex-grow space-y-2">
                    {{-- Mobile Features Accordion --}}
                    <div class="border-b border-slate-50">
                        <button @click="activeAccordion === 'features' ? activeAccordion = null : activeAccordion = 'features'" class="w-full py-5 flex justify-between items-center text-xl font-black text-slate-900">
                            <span>{{ __('nav_features') }}</span>
                            <svg :class="activeAccordion === 'features' ? 'rotate-180' : ''" class="w-5 h-5 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div x-show="activeAccordion === 'features'" x-collapse>
                            <div class="grid grid-cols-1 gap-1 pb-4">
                                <x-nav-item-mobile href="{{ route('features.habit') }}" icon="🌱" title="Habit Tracker" />
                                <x-nav-item-mobile href="{{ route('features.finance') }}" icon="💰" title="Finance Tracker" />
                                <x-nav-item-mobile href="{{ route('features.planner') }}" icon="🎯" title="Daily Planner" />
                                <x-nav-item-mobile href="{{ route('features.journal') }}" icon="📔" title="Mindful Journal" />
                                <x-nav-item-mobile href="{{ route('features.calendar') }}" icon="📅" title="Calendar" />
                            </div>
                        </div>
                    </div>

                    {{-- Mobile Solutions Accordion --}}
                    <div class="border-b border-slate-50">
                        <button @click="activeAccordion === 'solutions' ? activeAccordion = null : activeAccordion = 'solutions'" class="w-full py-5 flex justify-between items-center text-xl font-black text-slate-900">
                            <span>{{ __('nav_solutions') }}</span>
                            <svg :class="activeAccordion === 'solutions' ? 'rotate-180' : ''" class="w-5 h-5 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div x-show="activeAccordion === 'solutions'" x-collapse>
                            <div class="grid grid-cols-1 gap-1 pb-4 text-left">
                                <x-nav-item-mobile href="{{ route('solutions.student') }}" icon="🎓" title="For Students" />
                                <x-nav-item-mobile href="{{ route('solutions.freelancer') }}" icon="💻" title="For Freelancers" />
                                <x-nav-item-mobile href="{{ route('solutions.personalgrowth') }}" icon="🚀" title="Personal Growth" />
                            </div>
                        </div>
                    </div>

                    {{-- Mobile Resources Accordion --}}
                    <div class="border-b border-slate-50">
                        <button @click="activeAccordion === 'resources' ? activeAccordion = null : activeAccordion = 'resources'" class="w-full py-5 flex justify-between items-center text-xl font-black text-slate-900">
                            <span>{{ __('nav_resources') }}</span>
                            <svg :class="activeAccordion === 'resources' ? 'rotate-180' : ''" class="w-5 h-5 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div x-show="activeAccordion === 'resources'" x-collapse>
                            <div class="grid grid-cols-1 gap-1 pb-4 text-left">
                                <x-nav-item-mobile href="{{ route('resources.guide') }}" icon="📖" title="User Guide" />
                                <x-nav-item-mobile href="{{ route('resources.blog') }}" icon="✍️" title="Blog" />
                                <x-nav-item-mobile href="{{ route('resources.stories') }}" icon="✨" title="User Stories" />
                            </div>
                        </div>
                    </div>

                    <a href="{{ route('pricing') }}" class="block py-5 text-xl font-black text-slate-900 border-b border-slate-50">{{ __('nav_pricing') }}</a>
                </div>

                <div class="pt-8 space-y-6">
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span class="text-sm font-bold text-slate-500">Language</span>
                        <div class="flex gap-2">
                            <a href="{{ route('lang.switch', 'id') }}" class="px-3 py-1 rounded-lg text-xs font-black {{ app()->getLocale() === 'id' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-400' }}">ID</a>
                            <a href="{{ route('lang.switch', 'en') }}" class="px-3 py-1 rounded-lg text-xs font-black {{ app()->getLocale() === 'en' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-400' }}">EN</a>
                        </div>
                    </div>
                    
                    @guest
                        <div class="grid grid-cols-1 gap-3">
                            <a href="{{ route('login') }}" class="w-full py-4 text-center font-bold text-slate-900 bg-white border border-slate-200 rounded-2xl">Log in</a>
                            <a href="{{ route('register') }}" class="w-full py-4 text-center font-black text-white bg-indigo-600 rounded-2xl shadow-xl">Get Started free</a>
                        </div>
                    @else
                        <a href="{{ route('dashboard') }}" class="block w-full py-4 text-center font-black text-white bg-slate-900 rounded-2xl">Go to Dashboard</a>
                    @endguest
                </div>
            </div>
        </nav>

        <main class="flex-grow">
            @yield('content')
        </main>

        {{-- FOOTER --}}
        <footer class="bg-slate-50 border-t border-slate-100 pt-20 pb-10">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16 text-left">
                    <div class="col-span-2 md:col-span-1">
                        <a href="{{ route('home') }}" class="flex items-center gap-2 mb-6">
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
                            <li><a href="{{ route('features.habit') }}" class="hover:text-indigo-600 transition">Habit Tracker</a></li>
                            <li><a href="{{ route('features.finance') }}" class="hover:text-indigo-600 transition">Finance Tracker</a></li>
                            <li><a href="{{ route('features.planner') }}" class="hover:text-indigo-600 transition">Daily Planner</a></li>
                            <li><a href="{{ route('pricing') }}" class="hover:text-indigo-600 transition">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Compare</h3>
                        <ul class="space-y-4 text-sm font-bold text-slate-500">
                            <li><a href="{{ route('compare.paper') }}" class="hover:text-indigo-600 transition">vs Paper Planner</a></li>
                            <li><a href="{{ route('compare.sheets') }}" class="hover:text-indigo-600 transition">vs Spreadsheets</a></li>
                            <li><a href="{{ route('compare.management-tools') }}" class="hover:text-indigo-600 transition">vs Task Tools</a></li>
                            <li><a href="{{ route('compare.habit-apps') }}" class="hover:text-indigo-600 transition">vs Habit Apps</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Company</h3>
                        <ul class="space-y-4 text-sm font-bold text-slate-500">
                            <li><a href="{{ route('about') }}" class="hover:text-indigo-600 transition">About Us</a></li>
                            <li><a href="{{ route('company.privacy') }}" class="hover:text-indigo-600 transition">Privacy Policy</a></li>
                            <li><a href="{{ route('company.terms') }}" class="hover:text-indigo-600 transition">Terms of Service</a></li>
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

                {{-- 🔥 FIX CONTRAST: Ganti slate-400 jadi slate-600 --}}
                <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-600">
                    <p>&copy; {{ date('Y') }} OneForMind. All rights reserved.</p>
                    <p>Made with ✨ by Dopamind7 Team</p>
                </div>
            </div>
        </footer>
    </div>
    
    {{-- 3. Load Library --}}
    <script src="https://unpkg.com/htmx.org@1.9.10" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"></script>
    <script src="//instant.page/5.2.0" type="module"></script>

    {{-- 4. 🔥 SCRIPT "JEMBATAN" (Blade rasa Vue) --}}
  <script>
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Inisialisasi NProgress untuk Halaman Blade
        NProgress.configure({ 
            showSpinner: false, 
            speed: 400,
            minimum: 0.3,
            trickle: true,
            trickleSpeed: 200
        });

        // 2. Integrasi NProgress dengan HTMX
        // Ketika HTMX mulai mengambil halaman baru
        document.body.addEventListener('htmx:configRequest', (event) => {
            NProgress.start();
        });

        // FIX SLIDING MOBILE: Matikan scroll halus TEPAT SEBELUM konten ditukar
        document.body.addEventListener('htmx:beforeSwap', (event) => {
            document.documentElement.style.scrollBehavior = 'auto'; // Matikan animasi
            
            // JIKA BUKAN REQUEST KE TAB ATAU MODAL (Ganti halaman penuh)
            if (event.detail.target === document.body || event.detail.target.tagName === 'MAIN') {
                 window.scrollTo(0, 0); // "Teleportasi" instan ke atas
            }
        });

        // Ketika konten baru sudah selesai dimuat oleh HTMX
        document.body.addEventListener('htmx:afterSwap', (event) => {
            NProgress.done();
            
            // Nyalakan kembali scroll halus (opsional, jika kamu pakai anchor link #)
            setTimeout(() => {
                document.documentElement.style.scrollBehavior = ''; // Kembalikan ke default CSS
            }, 50);
        });

        // Tangani error atau interupsi
        document.body.addEventListener('htmx:onLoadError', () => NProgress.done());
        document.body.addEventListener('htmx:historyRestore', () => {
            NProgress.remove(); // Bersihkan bar saat tombol back ditekan
            document.documentElement.style.scrollBehavior = '';
        });

        // 3. Fallback: Navigasi keluar dari sistem HTMX (misal klik "Dashboard" ke Inertia)
        document.addEventListener('click', (event) => {
            let link = event.target.closest('a');
            
            if (link && 
                link.href && 
                !link.hasAttribute('hx-boost') && 
                link.href.startsWith(window.location.origin) && 
                !link.href.includes('#') &&
                link.target !== '_blank'
            ) {
                NProgress.start();
                document.documentElement.style.scrollBehavior = 'auto'; // Matikan scroll halus
            }
        });
    });
    </script>
</body>
</html>