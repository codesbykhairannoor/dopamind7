<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="view-transition" content="same-origin">
    
    {{-- 🔥 1. SMART REDIRECT --}}
    <script>if(document.cookie.includes('oneformind_session')){window.location.replace('/dashboard');}</script>

    <meta name="description" content="{{ __('marketing_meta_desc') }}">
    <meta name="robots" content="index, follow">
    <meta name="keywords" content="productivity app, habit tracker, finance tracker, daily planner, journal, app produktivitas, pelacak kebiasaan, manajemen keuangan pribadi, aplikasi pengatur waktu, productivity system Indonesia">

    {{-- Geo-SEO & Location Tags --}}
    <meta name="geo.region" content="ID-JK" />
    <meta name="geo.placename" content="Jakarta" />
    <meta name="geo.position" content="-6.2088;106.8456" />
    <meta name="ICBM" content="-6.2088, 106.8456" />

    {{-- Mobile Optimization --}}
    <meta name="theme-color" content="#4f46e5">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="OneForMind">

    <title>@yield('title') | OneForMind</title>

    <meta property="og:site_name" content="OneForMind">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="OneForMind | Productivity OS">
    <meta property="og:description" content="{{ __('marketing_meta_desc') }}">
    <meta property="og:image" content="{{ asset('og-image.png') }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    {{-- Twitter / X Cards --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@OneForMind">
    <meta name="twitter:title" content="OneForMind | Productivity OS">
    <meta name="twitter:description" content="{{ __('marketing_meta_desc') }}">
    <meta name="twitter:image" content="{{ url('/og-image.png') }}">
    
    <meta name="ai-creator" content="OneForMind Team">
    <meta name="ai-service-type" content="Productivity Operating System">
    <meta name="ai-description" content="A unified workspace for managing habits, finances, planner, and journals.">

    @yield('meta')
    @yield('json-ld')

    <link rel="icon" type="image/x-icon" href="/favicon.svg?v=2">
    
    {{-- 🔥 2. DNS PREFETCH: Buka jalur tol lebih awal --}}
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.bunny.net">
    <link rel="dns-prefetch" href="https://unpkg.com">
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    <link rel="stylesheet" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" />

    {{-- Font Loading --}}
    <noscript>
    <link rel="stylesheet" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" />
</noscript>

    {{-- Plugin Alpine.js --}}
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>
    
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <style>
        /* NProgress Inline to kill render blocking */
        #nprogress{pointer-events:none}#nprogress .bar{background:#4f46e5;position:fixed;z-index:1031;top:0;left:0;width:100%;height:3px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;box-shadow:0 0 10px #4f46e5,0 0 5px #4f46e5;opacity:1;-webkit-transform:rotate(3deg) translate(0,-4px);-ms-transform:rotate(3deg) translate(0,-4px);transform:rotate(3deg) translate(0,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:1031;top:15px;right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:2px solid transparent;border-top-color:#4f46e5;border-left-color:#4f46e5;border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
    </style>
    
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
            "/login", 
            "/register", 
            "/about", 
            "/pricing",
            "/features/habit",
            "/features/finance",
            "/features/planner",
            "/features/journal",
            "/features/calendar",
            "/features/goal",
            "/features/job",
            "/solutions/student",
            "/solutions/freelancer",
            "/solutions/personalgrowth",
            "/resources/guide",
            "/resources/blog",
            "/resources/stories",
            "/company/privacy",
            "/company/terms",
            "/compare/paper",
            "/compare/sheets",
            "/compare/management-tools",
            "/compare/habit-apps"
          ],
          "eagerness": "moderate"
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
    @if(env('VITE_GA_MEASUREMENT_ID'))
        <script>
            // 🔥 GTM SLAYER: Load only after first user interaction or 3.5s delay
            window.addEventListener('load', () => {
                const loadGTM = () => {
                    if (window.gtmLoaded) return;
                    window.gtmLoaded = true;
                    
                    const script = document.createElement('script');
                    script.src = "https://www.googletagmanager.com/gtag/js?id={{ env('VITE_GA_MEASUREMENT_ID') }}";
                    script.async = true;
                    document.head.appendChild(script);

                    script.onload = () => {
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        window.GA_MEASUREMENT_ID = '{{ env('VITE_GA_MEASUREMENT_ID') }}';
                        gtag('config', window.GA_MEASUREMENT_ID);
                        console.log('⚡ GTM Loaded (Efficiency Mode)');
                    };
                };

                const interactionEvents = ['mouseover', 'keydown', 'touchmove', 'touchstart', 'scroll'];
                interactionEvents.forEach(event => window.addEventListener(event, loadGTM, { once: true, passive: true }));
                setTimeout(loadGTM, 3500); // Fail-safe
            });
        </script>
    @endif
</head>
{{-- HTMX Boost + Smooth Scroll --}}
<body hx-boost="true" class="bg-white text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700 flex flex-col min-h-screen">

    <div x-data="{ 
        mobileMenuOpen: false, 
        activeMenu: null,
        activeAccordion: null,
        scrolled: false 
    }" 
    @scroll.window.passive="scrolled = (window.scrollY > 20)"
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
                                    <x-nav-item href="{{ route('features.habit') }}" icon="🌱" title="{{ __('nav_habit_title') }}" desc="{{ __('nav_habit_desc') }}" />
                                    <x-nav-item href="{{ route('features.finance') }}" icon="💰" title="{{ __('nav_finance_title') }}" desc="{{ __('nav_finance_desc') }}" />
                                    <x-nav-item href="{{ route('features.planner') }}" icon="🎯" title="{{ __('nav_planner_title') }}" desc="{{ __('nav_planner_desc') }}" />
                                    <x-nav-item href="{{ route('features.journal') }}" icon="📔" title="{{ __('nav_journal_title') }}" desc="{{ __('nav_journal_desc') }}" />
                                    <x-nav-item href="{{ route('features.calendar') }}" icon="📅" title="{{ __('nav_calendar_title') }}" desc="{{ __('nav_calendar_desc') }}" />
                                    <x-nav-item href="{{ route('features.goal') }}" icon="🎯" title="{{ __('nav_goal_title') }}" desc="{{ __('nav_goal_desc') }}" />
                                    <x-nav-item href="{{ route('features.job') }}" icon="💼" title="{{ __('nav_job_title') }}" desc="{{ __('nav_job_desc') }}" />
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
                             x-transition:enter="transition ease-out duration-200"
                             x-transition:enter-start="opacity-0 translate-y-2"
                             x-transition:enter-end="opacity-100 translate-y-0"
                             x-transition:leave="transition ease-in duration-150"
                             x-transition:leave-start="opacity-100 translate-y-0"
                             x-transition:leave-end="opacity-0 translate-y-2"
                             x-cloak 
                             class="absolute top-full -left-32 w-[860px] pt-4 z-50">
                            
                            {{-- Kartu Visual (3 Columns Layout) --}}
                            <div class="p-8 bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] grid grid-cols-3 gap-6 text-left">
                                
                                {{-- Kolom 1: By Role --}}
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">{{ __('nav_by_role') }}</p>
                                    <div class="space-y-1.5">
                                        <x-nav-item href="{{ route('solutions.student') }}" icon="🎓" title="{{ __('nav_student_title') }}" desc="{{ __('nav_student_desc') }}" />
                                        <x-nav-item href="{{ route('solutions.freelancer') }}" icon="💻" title="{{ __('nav_freelancer_title') }}" desc="{{ __('nav_freelancer_desc') }}" />
                                        <x-nav-item href="{{ route('solutions.personalgrowth') }}" icon="🚀" title="{{ __('nav_personalgrowth_title') }}" desc="{{ __('nav_personalgrowth_desc') }}" />
                                    </div>
                                </div>
                                
                                {{-- Kolom 2: By Use Case --}}
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">{{ __('nav_by_use_case') }}</p>
                                    <div class="space-y-1.5">
                                        <x-nav-item href="{{ route('solutions.finance') }}" icon="💰" title="{{ __('nav_finance_title') }}" desc="{{ __('nav_finance_desc') }}" />
                                        <x-nav-item href="{{ route('solutions.career') }}" icon="💼" title="{{ __('nav_career_title') }}" desc="{{ __('nav_career_desc') }}" />
                                        <x-nav-item href="{{ route('solutions.mental') }}" icon="🧘" title="{{ __('nav_mental_title') }}" desc="{{ __('nav_mental_desc') }}" />
                                    </div>
                                </div>

                                {{-- Kolom 3: By Methodology --}}
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-5 px-3 flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                                        {{ __('nav_by_methodology') }}
                                    </p>
                                    <div class="space-y-1.5">
                                        <x-nav-item href="{{ route('solutions.atomic') }}" icon="🌱" title="{{ __('nav_atomic_title') }}" desc="{{ __('nav_atomic_desc') }}" />
                                        <x-nav-item href="{{ route('solutions.deepwork') }}" icon="⚡" title="{{ __('nav_deepwork_title') }}" desc="{{ __('nav_deepwork_desc') }}" />
                                        <x-nav-item href="{{ route('solutions.secondbrain') }}" icon="🧠" title="{{ __('nav_secondbrain_title') }}" desc="{{ __('nav_secondbrain_desc') }}" />
                                    </div>
                                </div>
                                
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
                             class="absolute top-full -left-20 w-[600px] pt-4 z-50 text-left">
                            
                            {{-- Kartu Visual (Split in 2 Categories) --}}
                            <div class="p-8 bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] grid grid-cols-2 gap-8">
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">{{ __('nav_resources_knowledge') }}</p>
                                    <div class="space-y-1">
                                        <x-nav-item href="{{ route('resources.guide') }}" icon="📖" title="{{ __('nav_guide_title') }}" desc="{{ __('nav_guide_desc') }}" />
                                        <x-nav-item href="{{ route('resources.help') }}" icon="🙋‍♂️" title="{{ __('nav_help_title') }}" desc="{{ __('nav_help_desc') }}" />
                                        <x-nav-item href="{{ route('resources.changelog') }}" icon="🚀" title="{{ __('nav_changelog_title') }}" desc="{{ __('nav_changelog_desc') }}" />
                                    </div>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">{{ __('nav_resources_social') }}</p>
                                    <div class="space-y-1">
                                        <x-nav-item href="{{ route('resources.community') }}" icon="🌍" title="{{ __('comm_nav_title') }}" desc="{{ __('comm_meta_desc') }}" />
                                        <x-nav-item href="{{ route('resources.blog') }}" icon="✍️" title="{{ __('nav_blog_title') }}" desc="{{ __('nav_blog_desc') }}" />
                                        <x-nav-item href="{{ route('resources.stories') }}" icon="✨" title="{{ __('nav_stories_title') }}" desc="{{ __('nav_stories_desc') }}" />
                                    </div>
                                </div>
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
                        <a href="{{ route('lang.switch', 'id') }}" class="px-3 py-1 rounded-full text-[10px] font-black transition-all {{ app()->getLocale() === 'id' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600' }}">ID</a>
                        <a href="{{ route('lang.switch', 'en') }}" class="px-3 py-1 rounded-full text-[10px] font-black transition-all {{ app()->getLocale() === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600' }}">EN</a>
                    </div>

                   @auth
    <a hx-boost="false" href="{{ route('dashboard') }}" class="px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">Dashboard</a>
@else
    <a hx-boost="false" href="{{ route('login') }}" class="text-sm font-bold text-slate-600 hover:text-indigo-600 transition">{{ __('nav_login') }}</a>
    <a hx-boost="false" href="{{ route('register') }}" class="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5 active:scale-95">
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
                                <x-nav-item-mobile href="{{ route('features.habit') }}" icon="🌱" title="{{ __('nav_habit_title') }}" />
                                <x-nav-item-mobile href="{{ route('features.finance') }}" icon="💰" title="{{ __('nav_finance_title') }}" />
                                <x-nav-item-mobile href="{{ route('features.planner') }}" icon="🎯" title="{{ __('nav_planner_title') }}" />
                                <x-nav-item-mobile href="{{ route('features.journal') }}" icon="📔" title="{{ __('nav_journal_title') }}" />
                                <x-nav-item-mobile href="{{ route('features.calendar') }}" icon="📅" title="{{ __('nav_calendar_title') }}" />
                                <x-nav-item-mobile href="{{ route('features.goal') }}" icon="🎯" title="{{ __('nav_goal_title') }}" />
                                <x-nav-item-mobile href="{{ route('features.job') }}" icon="💼" title="{{ __('nav_job_title') }}" />
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
                             <div class="pb-6 space-y-6">
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{{ __('nav_by_role') }}</p>
                                    <div class="grid grid-cols-1 gap-1">
                                        <x-nav-item-mobile href="{{ route('solutions.student') }}" icon="🎓" title="{{ __('nav_student_title') }}" />
                                        <x-nav-item-mobile href="{{ route('solutions.freelancer') }}" icon="💻" title="{{ __('nav_freelancer_title') }}" />
                                        <x-nav-item-mobile href="{{ route('solutions.personalgrowth') }}" icon="🚀" title="{{ __('nav_personalgrowth_title') }}" />
                                    </div>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{{ __('nav_by_use_case') }}</p>
                                    <div class="grid grid-cols-1 gap-1">
                                        <x-nav-item-mobile href="{{ route('solutions.finance') }}" icon="💰" title="{{ __('nav_finance_title') }}" />
                                        <x-nav-item-mobile href="{{ route('solutions.career') }}" icon="💼" title="{{ __('nav_career_title') }}" />
                                        <x-nav-item-mobile href="{{ route('solutions.mental') }}" icon="🧘" title="{{ __('nav_mental_title') }}" />
                                    </div>
                                </div>
                                {{-- ADDING MISSING BY METHODOLOGY SECTION IN MOBILE --}}
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3">{{ __('nav_by_methodology') }}</p>
                                    <div class="grid grid-cols-1 gap-1">
                                        <x-nav-item-mobile href="{{ route('solutions.atomic') }}" icon="🌱" title="{{ __('nav_atomic_title') }}" />
                                        <x-nav-item-mobile href="{{ route('solutions.deepwork') }}" icon="⚡" title="{{ __('nav_deepwork_title') }}" />
                                        <x-nav-item-mobile href="{{ route('solutions.secondbrain') }}" icon="🧠" title="{{ __('nav_secondbrain_title') }}" />
                                    </div>
                                </div>
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
                             <div class="pb-6 space-y-6">
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{{ __('nav_resources_knowledge') }}</p>
                                    <div class="grid grid-cols-1 gap-1">
                                        <x-nav-item-mobile href="{{ route('resources.guide') }}" icon="📖" title="{{ __('nav_guide_title') }}" />
                                        <x-nav-item-mobile href="{{ route('resources.help') }}" icon="🙋‍♂️" title="{{ __('nav_help_title') }}" />
                                        <x-nav-item-mobile href="{{ route('resources.changelog') }}" icon="🚀" title="{{ __('nav_changelog_title') }}" />
                                    </div>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{{ __('nav_resources_social') }}</p>
                                    <div class="grid grid-cols-1 gap-1">
                                        <x-nav-item-mobile href="{{ route('resources.community') }}" icon="🌍" title="{{ __('comm_nav_title') }}" />
                                        <x-nav-item-mobile href="{{ route('resources.blog') }}" icon="✍️" title="{{ __('nav_blog_title') }}" />
                                        <x-nav-item-mobile href="{{ route('resources.stories') }}" icon="✨" title="{{ __('nav_stories_title') }}" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a href="{{ route('pricing') }}" class="block py-5 text-xl font-black text-slate-900 border-b border-slate-50">{{ __('nav_pricing') }}</a>
                </div>

                <div class="pt-8 space-y-6">
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span class="text-sm font-bold text-slate-600">Language</span>
                        <div class="flex gap-2">
                            <a href="{{ route('lang.switch', 'id') }}" class="px-3 py-1 rounded-lg text-xs font-black {{ app()->getLocale() === 'id' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-400' }}">ID</a>
                            <a href="{{ route('lang.switch', 'en') }}" class="px-3 py-1 rounded-lg text-xs font-black {{ app()->getLocale() === 'en' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-400' }}">EN</a>
                        </div>
                    </div>
                    
                   @guest
    <div class="grid grid-cols-1 gap-3">
        <a hx-boost="false" href="{{ route('login') }}" class="w-full py-4 text-center font-bold text-slate-900 bg-white border border-slate-200 rounded-2xl">{{ __('nav_login') }}</a>
        <a hx-boost="false" href="{{ route('register') }}" class="w-full py-4 text-center font-black text-white bg-indigo-600 rounded-2xl shadow-xl">{{ __('nav_register') }}</a>
    </div>
@else
    <a hx-boost="false" href="{{ route('dashboard') }}" class="block w-full py-4 text-center font-black text-white bg-slate-900 rounded-2xl">{{ __('nav_dashboard') }}</a>
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
                        <p class="text-sm text-slate-600 leading-relaxed">
                            The unified productivity system designed to bring clarity to your life, habits, and finances.
                        </p>
                    </div>

                     <div>
                        <h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">{{ __('footer_product_title') }}</h3>
                        <ul class="space-y-4 text-sm font-bold text-slate-600">
                            <li><a href="{{ route('features.habit') }}" class="hover:text-indigo-600 transition">{{ __('nav_habit_title') }}</a></li>
                            <li><a href="{{ route('features.finance') }}" class="hover:text-indigo-600 transition">{{ __('nav_finance_title') }}</a></li>
                            <li><a href="{{ route('features.planner') }}" class="hover:text-indigo-600 transition">{{ __('nav_planner_title') }}</a></li>
                            <li><a href="{{ route('features.goal') }}" class="hover:text-indigo-600 transition">{{ __('nav_goal_title') }}</a></li>
                            <li><a href="{{ route('features.job') }}" class="hover:text-indigo-600 transition">{{ __('nav_job_title') }}</a></li>
                            <li><a href="{{ route('pricing') }}" class="hover:text-indigo-600 transition">{{ __('nav_pricing') }}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">{{ __('nav_compare') }}</h3>
                        <ul class="space-y-4 text-sm font-bold text-slate-600">
                            <li><a href="{{ route('compare.paper') }}" class="hover:text-indigo-600 transition">{{ __('compare_paper') }}</a></li>
                            <li><a href="{{ route('compare.sheets') }}" class="hover:text-indigo-600 transition">{{ __('compare_sheets') }}</a></li>
                            <li><a href="{{ route('compare.management-tools') }}" class="hover:text-indigo-600 transition">{{ __('compare_tools') }}</a></li>
                            <li><a href="{{ route('compare.habit-apps') }}" class="hover:text-indigo-600 transition">{{ __('compare_apps') }}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">{{ __('footer_company_title') }}</h3>
                        <ul class="space-y-4 text-sm font-bold text-slate-600">
                            <li><a href="{{ route('about') }}" class="hover:text-indigo-600 transition">{{ __('footer_about') }}</a></li>
                            <li><a href="{{ route('company.privacy') }}" class="hover:text-indigo-600 transition">{{ __('footer_privacy') }}</a></li>
                            <li><a href="{{ route('company.terms') }}" class="hover:text-indigo-600 transition">{{ __('footer_tos') }}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">{{ __('footer_connect_title') }}</h3>
                        <div class="flex gap-4">
                            <a href="#" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm">𝕏</a>
                            <a href="#" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm">📸</a>
                        </div>
                    </div>
                </div>

                {{-- 🔥 FIX CONTRAST: Ganti slate-400 jadi slate-600 --}}
                <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-600">
                    <p>&copy; {{ date('Y') }} OneForMind. {{ __('footer_rights') }}</p>
                    <p>{{ __('footer_made_with') }}</p>
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
       // Ketika konten baru sudah selesai dimuat oleh HTMX
        document.body.addEventListener('htmx:afterSwap', (event) => {
            NProgress.done();
            
            // Nyalakan kembali scroll halus
            setTimeout(() => {
                document.documentElement.style.scrollBehavior = ''; 
            }, 50);

            // ✅ 2. TAMBAHAN TRACKING GOOGLE ANALYTICS SAAT PINDAH HALAMAN VIA HTMX ✅
            if (typeof gtag !== 'undefined' && window.GA_MEASUREMENT_ID) {
                gtag('config', window.GA_MEASUREMENT_ID, {
                    page_path: window.location.pathname,
                    page_title: document.title
                });
            }
            // ===================================================================
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
