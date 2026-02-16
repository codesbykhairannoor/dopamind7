<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    {{-- 1. META DESCRIPTION DINAMIS (All-in-One) --}}
    <meta name="description" content="{{ app()->getLocale() === 'id' 
        ? 'OneForMind: Satu aplikasi produktivitas terpadu untuk kelola keuangan, kebiasaan, dan rencana harian dalam satu dashboard minimalis.' 
        : 'OneForMind: The unified productivity OS to manage finances, habits, and daily plans in one minimalist dashboard.' 
    }}">

    {{-- 2. TITLE DINAMIS --}}
    <title>@yield('title') — {{ app()->getLocale() === 'id' ? 'Satu Aplikasi Produktivitas Terpadu' : 'All-in-One Productivity OS' }}</title>

    {{-- 3. OPEN GRAPH (Biar kalau dishare ke WA/FB tampilannya cakep) --}}
    <meta property="og:title" content="OneForMind — {{ app()->getLocale() === 'id' ? 'Satu Aplikasi Produktivitas Terpadu' : 'The Unified Productivity OS' }}">
    <meta property="og:description" content="{{ app()->getLocale() === 'id' ? 'Kelola hidup lebih tertata dengan OneForMind.' : 'Master your life with OneForMind.' }}">
    <meta property="og:image" content="{{ asset('favicon.svg') }}">
    
    {{-- Tempat buat suntikan meta tambahan dari tiap page (canonical, alternate, dll) --}}
    @yield('meta')

    <link rel="icon" type="image/x-icon" href="/favicon.svg?v=2">
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.svg?v=2">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" />
    <link rel="stylesheet" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" media="print" onload="this.media='all'" />

    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    @vite(['resources/css/app.css'])

    <style>
        body { top: 0px !important; position: static !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    </style>
</head>
<body class="bg-white text-gray-900 font-sans antialiased selection:bg-brand-500 selection:text-white flex flex-col min-h-screen">

    <div x-data="{ mobileMenuOpen: false }">
        
        <nav class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
            <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative">
                
                <a href="{{ route('home') }}" class="group text-2xl font-black text-indigo-600 tracking-tighter flex items-center gap-2 hover:opacity-80 transition z-20">
                    <img 
                        src="/favicon.svg?v=2" 
                        alt="OneForMind Logo" 
                        width="32" 
                        height="32" 
                        class="w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
                    />
                    <span>OneForMind<span class="text-indigo-400">.</span></span>
                </a>

                <div class="hidden md:flex items-center gap-2 font-medium text-sm absolute left-1/2 -translate-x-1/2">
                    <a href="{{ route('home') }}" class="px-5 py-2.5 rounded-full transition-all duration-300 {{ request()->routeIs('home') ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm ring-1 ring-indigo-100' : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50' }}">
                        {{ __('nav_home') }}
                    </a>

                    <a href="{{ route('about') }}" class="px-5 py-2.5 rounded-full transition-all duration-300 {{ request()->routeIs('about') ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm ring-1 ring-indigo-100' : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50' }}">
                        {{ __('nav_about') }}
                    </a>
                </div>

                <div class="hidden md:flex items-center gap-5 z-20">
                    <div class="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                        <a href="{{ route('lang.switch', 'id') }}" class="px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 {{ app()->getLocale() === 'id' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-600' }}">
                            ID
                        </a>
                        <a href="{{ route('lang.switch', 'en') }}" class="px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 {{ app()->getLocale() === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-600' }}">
                            EN
                        </a>
                    </div>

                    <div class="h-6 w-px bg-gray-200"></div> 

                    @auth
                        <a href="{{ route('dashboard') }}" class="text-sm font-bold text-indigo-600 border border-indigo-100 px-5 py-2.5 rounded-full hover:bg-indigo-50 transition shadow-sm hover:shadow-md">
                            {{ __('nav_dashboard') }} →
                        </a>
                    @else
                        <div class="flex items-center gap-3">
                            <a href="{{ route('login') }}" class="px-4 py-2 text-sm font-bold text-gray-900 hover:text-indigo-600 transition">
                                {{ __('nav_login') }}
                            </a>
                            <a href="{{ route('register') }}" class="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5 active:scale-95">
                                {{ __('nav_register') }}
                            </a>
                        </div>
                    @endauth
                </div>

                <button 
                    @click="mobileMenuOpen = !mobileMenuOpen" 
                    class="md:hidden text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition z-20"
                    aria-label="Toggle mobile menu"
                >
                    <svg x-show="!mobileMenuOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    <svg x-show="mobileMenuOpen" x-cloak class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div x-show="mobileMenuOpen" x-transition x-cloak class="md:hidden bg-white border-b border-gray-100 p-6 shadow-xl">
                 <div class="flex flex-col gap-4 text-center font-bold text-gray-600">
                     <a href="{{ route('home') }}" class="py-2 rounded-xl transition {{ request()->routeIs('home') ? 'bg-indigo-50 text-indigo-600' : '' }}">
                         {{ __('nav_home') }}
                     </a>
                     <a href="{{ route('about') }}" class="py-2 rounded-xl transition {{ request()->routeIs('about') ? 'bg-indigo-50 text-indigo-600' : '' }}">
                         {{ __('nav_about') }}
                     </a>
                     
                     <hr class="border-gray-100 my-2">

                     <div class="flex justify-center gap-4 py-2">
                         <a href="{{ route('lang.switch', 'id') }}" class="{{ app()->getLocale() === 'id' ? 'text-indigo-600 font-bold' : 'text-gray-600' }}">🇮🇩 ID</a>
                         <span class="text-gray-200">|</span>
                         <a href="{{ route('lang.switch', 'en') }}" class="{{ app()->getLocale() === 'en' ? 'text-indigo-600 font-bold' : 'text-gray-600' }}">🇬🇧 EN</a>
                     </div>
                     
                     @auth
                         <a href="{{ route('dashboard') }}" class="block py-3 bg-indigo-50 text-indigo-600 rounded-xl">{{ __('nav_dashboard') }}</a>
                     @else
                         <div class="flex flex-col gap-3">
                            <a href="{{ route('login') }}" class="py-2 text-gray-900">{{ __('nav_login') }}</a>
                            <a href="{{ route('register') }}" class="py-3 bg-indigo-600 text-white rounded-xl shadow-lg">{{ __('nav_register') }}</a>
                         </div>
                     @endauth
                 </div>
            </div>
        </nav>

        <main class="flex-grow pt-20">
            @yield('content')
        </main>

    <footer class="bg-white border-t border-gray-100 py-10 mt-auto" x-data="{ showLegal: false }">
    <div class="max-w-7xl mx-auto px-6 text-center">
        <div class="flex flex-col md:flex-row justify-center items-center gap-4 text-gray-600 text-sm mb-4">
            <p>&copy; {{ date('Y') }} OneForMind. {{ __('footer_rights') }}</p>
            <span class="hidden md:inline text-gray-200">|</span>
            <button @click="showLegal = true" class="hover:text-indigo-600 transition-colors cursor-pointer font-medium">
                {{ __('footer_legal') }}
            </button>
        </div>
    </div>

    <div 
        x-show="showLegal" 
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        class="fixed inset-0 z-[100] overflow-y-auto" 
        style="display: none;"
    >
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" @click="showLegal = false"></div>

        <div class="relative min-h-screen flex items-center justify-center p-4">
            <div 
                class="relative bg-white max-w-3xl w-full rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
                @click.away="showLegal = false"
            >
                <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <h2 class="text-xl font-bold text-gray-800">{{ __('legal_title') }}</h2>
                    <button @click="showLegal = false" class="text-gray-600 hover:text-gray-600 p-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="p-8 overflow-y-auto text-left prose prose-slate max-w-none">
                    
                    <div class="mb-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <p class="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-1">{{ __('legal_ref') }}</p>
                        <a href="https://www.privacypolicies.com/live/43c87685-eb88-487d-a449-535e2ded4cac" 
                           target="_blank" 
                           class="text-sm break-all font-semibold hover:text-indigo-800 transition-colors">
                            https://www.privacypolicies.com/live/43c87685-eb88-487d-a449-535e2ded4cac
                        </a>
                    </div>

                    <h1>{{ __('privacy_title') }}</h1>
                    <p>{{ __('privacy_p1') }}</p>
                    
                    <h2>{{ __('privacy_consent_title') }}</h2>
                    <p>{{ __('privacy_consent_p') }}</p>

                    <h2>{{ __('privacy_info_title') }}</h2>
                    <p>{{ __('privacy_info_p') }}</p>

                    <hr class="my-8">

                    <h1>{{ __('tos_title') }}</h1>
                    <p>{{ __('tos_intro') }}</p>
                    
                    <ul>
                        <li><strong>{{ __('tos_service_title') }}:</strong> {{ __('tos_service_p') }}</li>
                        <li><strong>{{ __('tos_data_title') }}:</strong> {{ __('tos_data_p') }}</li>
                        <li><strong>{{ __('tos_security_title') }}:</strong> {{ __('tos_security_p') }}</li>
                        <li><strong>{{ __('tos_termination_title') }}:</strong> {{ __('tos_termination_p') }}</li>
                    </ul>
                </div>

                <div class="px-8 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <button @click="showLegal = false" class="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                        {{ __('legal_close') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</footer>
    </div>
</body>
</html>