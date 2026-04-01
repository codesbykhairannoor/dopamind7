<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="view-transition" content="same-origin">
    <link rel="canonical" href="{{ url()->current() }}">
    @if(!View::hasSection('meta'))
    <meta name="description" content="{{ __('meta_global_description') }}">
    <meta name="keywords" content="{{ __('meta_global_keywords') }}">
    @endif
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

    {{-- Geo-SEO & Location Tags --}}
    <meta name="geo.region" content="ID-JK" />
    <meta name="geo.placename" content="Jakarta" />
    <meta name="geo.position" content="-6.2088;106.8456" />
    <meta name="ICBM" content="-6.2088, 106.8456" />

    {{-- Language Alternates - Using query params to avoid 302 redirects in hreflang --}}
    <link rel="alternate" hreflang="id" href="{{ url()->current() }}{{ str_contains(url()->current(), '?') ? '&' : '?' }}hl=id" />
    <link rel="alternate" hreflang="en" href="{{ url()->current() }}{{ str_contains(url()->current(), '?') ? '&' : '?' }}hl=en" />
    <link rel="alternate" hreflang="x-default" href="{{ url()->current() }}" />

    {{-- Mobile Optimization --}}
    <meta name="theme-color" content="#4f46e5">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="OneForMind">
    <meta name="apple-touch-icon" content="{{ asset('favicon.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicon.png') }}">
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon.png') }}">
    @php
        $pageTitle = View::hasSection('title') ? trim(View::yieldContent('title')) : null;
        if ($pageTitle && !stripos($pageTitle, 'Oneformind') && !stripos($pageTitle, 'OneForMind')) {
            $finalTitle = $pageTitle . ' | Oneformind - The Unified Productivity OS';
        } else if ($pageTitle) {
            $finalTitle = $pageTitle;
        } else {
            $finalTitle = 'Oneformind - The Unified Productivity OS';
        }
    @endphp
    <title>{{ $finalTitle }}</title>

    <meta property="og:site_name" content="Oneformind">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="{{ $finalTitle }}">
    <meta property="og:image" content="{{ asset('images/og-image.png') }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    {{-- Fallback Meta if no page-specific meta section --}}
    @if(View::hasSection('meta'))
        @yield('meta')
    @else
        <meta name="description" content="{{ __('meta_global_description') }}">
        <meta name="keywords" content="{{ __('meta_global_keywords') }}">
        <meta property="og:description" content="{{ __('meta_global_description') }}">
    @endif

    {{-- Ensure Social Descriptions are present if not already in @yield('meta') --}}
    @if(!View::hasSection('meta'))
        <meta name="twitter:description" content="{{ __('meta_global_description') }}">
    @endif

    {{-- Twitter --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@Oneformind">
    <meta name="twitter:title" content="{{ $finalTitle }}">
    <meta name="twitter:image" content="{{ asset('images/og-image.png') }}">
    
    <meta name="ai-creator" content="{{ __('meta_ai_creator') }}">

    {{-- JSON-LD Structured Data --}}
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "OneForMind",
      "url": "{{ url('/') }}",
      "logo": "{{ asset('favicon.svg') }}",
      "sameAs": [
        "https://x.com/OneForMind",
        "https://instagram.com/oneformind",
        "https://facebook.com/oneformind"
      ],
      "description": "{{ __('meta_global_description') }}"
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "OneForMind",
      "url": "{{ url('/') }}",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "{{ url('/') }}/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
    <meta name="ai-service-type" content="{{ __('meta_ai_service_type') }}">
    <meta name="ai-description" content="{{ __('meta_global_description') }}">

    @yield('meta')
    @yield('json-ld')


    
    {{-- 🔥 2. DNS PREFETCH: Buka jalur tol lebih awal --}}
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.bunny.net">
    <link rel="dns-prefetch" href="https://unpkg.com">
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" onload="this.onload=null;this.rel='stylesheet'" />

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

    {{-- 🔥 3. SPECULATION RULES: Prefetch + Prerender SEMUA halaman publik --}}
    <script type="speculationrules">
    {
      "prefetch": [
        {
          "source": "document",
          "where": {
            "and": [
              { "href_matches": "/*" },
              { "not": { "href_matches": "/dashboard*" } },
              { "not": { "href_matches": "/api/*" } },
              { "not": { "selector_matches": "[hx-boost='false']" } }
            ]
          },
          "eagerness": "moderate"
        }
      ],
      "prerender": [
        {
          "source": "document",
          "where": {
            "and": [
              { "href_matches": "/*" },
              { "not": { "href_matches": "/dashboard*" } },
              { "not": { "href_matches": "/api/*" } },
              { "not": { "href_matches": "/login" } },
              { "not": { "href_matches": "/register" } },
              { "not": { "selector_matches": "[hx-boost='false']" } }
            ]
          },
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

        /* 🔥 View Transition API: Smooth cross-page morphing */
        @view-transition {
            navigation: auto;
        }
        ::view-transition-old(root) {
            animation: fade-out 120ms ease-out;
        }
        ::view-transition-new(root) {
            animation: fade-in 120ms ease-in;
        }
        @keyframes fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
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

    @if(env('FACEBOOK_PIXEL_ID'))
        <script>
            window.addEventListener('load', () => {
                const loadPixel = () => {
                    if (window.pixelLoaded) return;
                    window.pixelLoaded = true;

                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '{{ env('FACEBOOK_PIXEL_ID') }}');
                    fbq('track', 'PageView');
                    console.log('⚡ FB Pixel Loaded (Efficiency Mode)');
                };

                const interactionEvents = ['mouseover', 'keydown', 'touchmove', 'touchstart', 'scroll'];
                interactionEvents.forEach(event => window.addEventListener(event, loadPixel, { once: true, passive: true }));
                setTimeout(loadPixel, 4000);
            });
        </script>
        <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id={{ env('FACEBOOK_PIXEL_ID') }}&ev=PageView&noscript=1"/></noscript>
    @endif
</head>
{{-- HTMX Boost (Instant Swap) --}}
<body hx-boost="true" hx-swap="innerHTML" class="bg-white text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700 flex flex-col min-h-screen">

    <div x-data="{ 
        mobileMenuOpen: false, 
        activeMenu: null,
        activeAccordion: null,
        scrolled: false,
        isInterfacing: false
    }" 
    @htmx:before-request.window="if($event.detail.pathInfo.requestPath.includes('dashboard') || $event.detail.pathInfo.requestPath.includes('login') || $event.detail.pathInfo.requestPath.includes('register')) isInterfacing = true"
    @scroll.window.passive="scrolled = (window.scrollY > 20)"
    class="relative">
        
        {{-- NAVBAR --}}
        {{-- NAVBAR --}}
        <nav 
            :class="(scrolled || mobileMenuOpen) ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm' : 'bg-transparent'"
            class="fixed top-0 w-full z-[100] transition-all duration-300"
        >
            <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center relative">
                
                {{-- LOGO --}}
                <a href="{{ route('home') }}" hx-boost="false" class="group flex items-center gap-2 z-[110]">
                    <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-200">
                        <img src="{{ asset('favicon.svg') }}" alt="Logo" class="w-5 h-5 brightness-0 invert" />
                    </div>
                    <span class="text-lg font-black tracking-tighter text-slate-900">OneForMind</span>
                </a>

                {{-- DESKTOP MENU --}}
                <div class="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    
                    {{-- DROPDOWN: FEATURES --}}
                    <div class="relative group" @mouseenter="activeMenu = 'features'" @mouseleave="activeMenu = null">
                        <button class="px-3 py-1.5 rounded-full text-[13px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all flex items-center gap-1 group-hover:text-indigo-600">
                            Features
                            <svg class="w-3.5 h-3.5 opacity-50 transition-transform group-hover:rotate-180" :class="activeMenu === 'features' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
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
                                    <x-nav-item href="{{ route('features.finance') }}" icon="💰" title="Finance OS" desc="Master your money flow." />
                                    <x-nav-item href="{{ route('features.planner') }}" icon="🎯" title="Daily Planner" desc="Focus on what matters." />
                                    <x-nav-item href="{{ route('features.journal') }}" icon="📔" title="Journal" desc="Capture your thoughts." />
                                    <x-nav-item href="{{ route('features.calendar') }}" icon="📅" title="Calendar" desc="Sync your schedules." />
                                    <x-nav-item href="{{ route('features.goal') }}" icon="🎯" title="Goal Tracker" desc="Track your milestones." />
                                    <x-nav-item href="{{ route('features.job') }}" icon="💼" title="Job Tracker" desc="Manage career growth." />
                                    <x-nav-item href="{{ route('features.neural-os') }}" icon="🧠" title="Neural OS AI" desc="Powered by Gemini Brain." />
                                </div>
                            </div>
                        </div>
                    </div>

                  {{-- DROPDOWN: SOLUTIONS --}}
                    <div class="relative group" @mouseenter="activeMenu = 'solutions'" @mouseleave="activeMenu = null">
                        <button class="px-3 py-1.5 rounded-full text-[13px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1 group-hover:text-indigo-600">
                            Solutions
                            <svg class="w-3.5 h-3.5 opacity-50 transition-transform group-hover:rotate-180" :class="activeMenu === 'solutions' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
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
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">By Role</p>
                                    <div class="space-y-1.5">
                                        <x-nav-item href="{{ route('solutions.student') }}" icon="🎓" title="Students" desc="Optimize your learning." />
                                        <x-nav-item href="{{ route('solutions.freelancer') }}" icon="💻" title="Freelancers" desc="Scale your workflow." />
                                        <x-nav-item href="{{ route('solutions.personalgrowth') }}" icon="🚀" title="Personal Growth" desc="Master your self-system." />
                                    </div>
                                </div>
                                
                                {{-- Kolom 2: By Use Case --}}
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">By Use Case</p>
                                    <div class="space-y-1.5">
                                        <x-nav-item href="{{ route('solutions.finance') }}" icon="💰" title="Financial Clarity" desc="Manage assets & cashflow." />
                                        <x-nav-item href="{{ route('solutions.career') }}" icon="💼" title="Career Tracker" desc="Focus on professional growth." />
                                        <x-nav-item href="{{ route('solutions.mental') }}" icon="🧘" title="Mental Health" desc="Journaling & mindfulness." />
                                    </div>
                                </div>

                                {{-- Kolom 3: By Methodology --}}
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-5 px-3 flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                                        By Methodology
                                    </p>
                                    <div class="space-y-1.5">
                                        <x-nav-item href="{{ route('solutions.atomic') }}" icon="🌱" title="Atomic Habits" desc="Small steps, big results." />
                                        <x-nav-item href="{{ route('solutions.deepwork') }}" icon="⚡" title="Deep Work" desc="Uninterrupted focus." />
                                        <x-nav-item href="{{ route('solutions.secondbrain') }}" icon="🧠" title="Second Brain" desc="Digital knowledge map." />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    {{-- DROPDOWN: RESOURCES --}}
                    <div class="relative group" @mouseenter="activeMenu = 'resources'" @mouseleave="activeMenu = null">
                        <button class="px-3 py-1.5 rounded-full text-[13px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1 group-hover:text-indigo-600">
                            Resources
                            <svg class="w-3.5 h-3.5 opacity-50 transition-transform group-hover:rotate-180" :class="activeMenu === 'resources' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>

                        {{-- Wrapper Jembatan --}}
                        <div x-show="activeMenu === 'resources'" 
                             x-transition 
                             x-cloak 
                             class="absolute top-full -left-20 w-[600px] pt-4 z-50 text-left">
                            
                            {{-- Kartu Visual (Split in 2 Categories) --}}
                            <div class="p-8 bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] grid grid-cols-2 gap-8">
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">Knowledge & Help</p>
                                    <div class="space-y-1">
                                        <x-nav-item href="{{ route('resources.guide') }}" icon="📖" title="User Guide" desc="Master the OS." />
                                        <x-nav-item href="{{ route('resources.help') }}" icon="🙋‍♂️" title="Help Center" desc="Find solutions." />
                                        <x-nav-item href="{{ route('resources.changelog') }}" icon="🚀" title="What's New" desc="Track app updates." />
                                    </div>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">Social & Community</p>
                                    <div class="space-y-1">
                                        <x-nav-item href="{{ route('resources.community') }}" icon="🌍" title="Community" desc="Connect with users." />
                                        <x-nav-item href="{{ route('resources.blog') }}" icon="✍️" title="Blog" desc="Productivity insights." />
                                        <x-nav-item href="{{ route('resources.stories') }}" icon="✨" title="Success Stories" desc="User transformations." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a href="{{ route('pricing.index') }}" class="px-3 py-1.5 rounded-full text-[13px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition">
                        Pricing
                    </a>
                </div>

                {{-- RIGHT ACTIONS --}}
                <div class="flex items-center gap-3">
                    {{-- Premium Language Dropdown --}}
                    <div class="relative" x-data="{ langOpen: false }" @click.away="langOpen = false">
                        <button 
                            @click="langOpen = !langOpen"
                            class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 hover:bg-white hover:border-indigo-100 transition-all shadow-sm group"
                        >
                            <span class="text-[11px] font-black text-slate-600 group-hover:text-indigo-600 uppercase tracking-tighter">
                                {{ app()->getLocale() }}
                            </span>
                            <svg class="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-transform" :class="langOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                        </button>

                        <div 
                            x-show="langOpen"
                            x-transition:enter="transition ease-out duration-200"
                            x-transition:enter-start="opacity-0 translate-y-2"
                            x-transition:enter-end="opacity-100 translate-y-0"
                            x-transition:leave="transition ease-in duration-150"
                            x-transition:leave-start="opacity-100 translate-y-0"
                            x-transition:leave-end="opacity-0 translate-y-2"
                            x-cloak
                            class="absolute top-full right-0 mt-3 w-40 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden z-50 p-2"
                        >
                            <a 
                                href="{{ route('lang.switch', 'id') }}" 
                                class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all {{ app()->getLocale() === 'id' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600' }}"
                            >
                                <span>Bahasa Indonesia</span>
                                @if(app()->getLocale() === 'id') <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> @endif
                            </a>
                            <a 
                                href="{{ route('lang.switch', 'en') }}" 
                                class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all {{ app()->getLocale() === 'en' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600' }}"
                            >
                                <span>English</span>
                                @if(app()->getLocale() === 'en') <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> @endif
                            </a>
                        </div>
                    </div>

                    {{-- Login/Register (Desktop) --}}
                    <div class="hidden lg:flex items-center gap-3">
                        @auth
                            <a @click="isInterfacing = true" hx-boost="false" href="{{ route('dashboard') }}" class="px-5 py-2 bg-slate-900 text-white rounded-full text-[13px] font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">Dashboard</a>
                        @else
                            <a @click="isInterfacing = true" hx-boost="false" href="{{ route('login') }}" class="text-[13px] font-bold text-slate-600 hover:text-indigo-600 transition">Log In</a>
                            <a @click="isInterfacing = true" hx-boost="false" href="{{ route('register') }}" class="px-5 py-2 bg-indigo-600 text-white rounded-full text-[13px] font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5 active:scale-95">
                                Get Started
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
                            <span>Features</span>
                            <svg :class="activeAccordion === 'features' ? 'rotate-180' : ''" class="w-5 h-5 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div x-show="activeAccordion === 'features'" x-collapse>
                            <div class="grid grid-cols-1 gap-1 pb-4">
                                <x-nav-item-mobile href="{{ route('features.habit') }}" icon="🌱" title="Habit Tracker" />
                                <x-nav-item-mobile href="{{ route('features.finance') }}" icon="💰" title="Finance OS" />
                                <x-nav-item-mobile href="{{ route('features.planner') }}" icon="🎯" title="Daily Planner" />
                                <x-nav-item-mobile href="{{ route('features.journal') }}" icon="📔" title="Journal" />
                                <x-nav-item-mobile href="{{ route('features.calendar') }}" icon="📅" title="Calendar" />
                                <x-nav-item-mobile href="{{ route('features.goal') }}" icon="🎯" title="Goal Tracker" />
                                <x-nav-item-mobile href="{{ route('features.job') }}" icon="💼" title="Job Tracker" />
                                <x-nav-item-mobile href="{{ route('features.neural-os') }}" icon="🧠" title="Neural OS AI" />
                            </div>
                        </div>
                    </div>

                    {{-- Mobile Solutions Accordion --}}
                    <div class="border-b border-slate-50">
                        <button @click="activeAccordion === 'solutions' ? activeAccordion = null : activeAccordion = 'solutions'" class="w-full py-5 flex justify-between items-center text-xl font-black text-slate-900">
                            <span>Solutions</span>
                            <svg :class="activeAccordion === 'solutions' ? 'rotate-180' : ''" class="w-5 h-5 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div x-show="activeAccordion === 'solutions'" x-collapse>
                             <div class="pb-6 space-y-6">
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">By Role</p>
                                    <div class="grid grid-cols-1 gap-1">
                                        <x-nav-item-mobile href="{{ route('solutions.student') }}" icon="🎓" title="Students" />
                                        <x-nav-item-mobile href="{{ route('solutions.freelancer') }}" icon="💻" title="Freelancers" />
                                        <x-nav-item-mobile href="{{ route('solutions.personalgrowth') }}" icon="🚀" title="Personal Growth" />
                                    </div>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">By Use Case</p>
                                    <div class="grid grid-cols-1 gap-1">
                                        <x-nav-item-mobile href="{{ route('solutions.finance') }}" icon="💰" title="Finance Clarity" />
                                        <x-nav-item-mobile href="{{ route('solutions.career') }}" icon="💼" title="Career Tracker" />
                                        <x-nav-item-mobile href="{{ route('solutions.mental') }}" icon="🧘" title="Mental Health" />
                                    </div>
                                </div>
                                {{-- ADDING MISSING BY METHODOLOGY SECTION IN MOBILE --}}
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3">By Methodology</p>
                                    <div class="grid grid-cols-1 gap-1">
                                        <x-nav-item-mobile href="{{ route('solutions.atomic') }}" icon="🌱" title="Atomic Habits" />
                                        <x-nav-item-mobile href="{{ route('solutions.deepwork') }}" icon="⚡" title="Deep Work" />
                                        <x-nav-item-mobile href="{{ route('solutions.secondbrain') }}" icon="🧠" title="Second Brain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Mobile Resources Accordion --}}
                    <div class="border-b border-slate-50">
                        <button @click="activeAccordion === 'resources' ? activeAccordion = null : activeAccordion = 'resources'" class="w-full py-5 flex justify-between items-center text-xl font-black text-slate-900">
                            <span>Resources</span>
                            <svg :class="activeAccordion === 'resources' ? 'rotate-180' : ''" class="w-5 h-5 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div x-show="activeAccordion === 'resources'" x-collapse>
                             <div class="pb-6 space-y-6">
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Knowledge & Help</p>
                                    <div class="grid grid-cols-1 gap-1">
                                        <x-nav-item-mobile href="{{ route('resources.guide') }}" icon="📖" title="User Guide" />
                                        <x-nav-item-mobile href="{{ route('resources.help') }}" icon="🙋‍♂️" title="Help Center" />
                                        <x-nav-item-mobile href="{{ route('resources.changelog') }}" icon="🚀" title="What's New" />
                                    </div>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Social & Community</p>
                                    <div class="grid grid-cols-1 gap-1">
                                        <x-nav-item-mobile href="{{ route('resources.community') }}" icon="🌍" title="Community" />
                                        <x-nav-item-mobile href="{{ route('resources.blog') }}" icon="✍️" title="Blog" />
                                        <x-nav-item-mobile href="{{ route('resources.stories') }}" icon="✨" title="Success Stories" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a href="{{ route('pricing.index') }}" class="block py-5 text-xl font-black text-slate-900 border-b border-slate-50">Pricing</a>
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
        <a @click="isInterfacing = true" hx-boost="false" href="{{ route('login') }}" class="w-full py-4 text-center font-bold text-slate-900 bg-white border border-slate-200 rounded-2xl">Log In</a>
        <a @click="isInterfacing = true" hx-boost="false" href="{{ route('register') }}" class="w-full py-4 text-center font-black text-white bg-indigo-600 rounded-2xl shadow-xl">Get Started</a>
    </div>
@else
    <a @click="isInterfacing = true" hx-boost="false" href="{{ route('dashboard') }}" class="block w-full py-4 text-center font-black text-white bg-slate-900 rounded-2xl">Dashboard</a>
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
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-16 text-left">
                    <div class="col-span-2 md:col-span-1">
                        <a href="{{ route('home') }}" class="flex items-center gap-2 mb-6">
                            <img src="/favicon.svg" alt="Logo" class="w-7 h-7" />
                            <span class="text-lg font-black tracking-tighter">OneForMind</span>
                        </a>
                        <p class="text-sm text-slate-700 leading-relaxed mb-6">
                            The unified productivity system designed to bring clarity to your life, habits, and finances.
                        </p>
                        <div class="text-xs text-slate-600 space-y-2 mt-4 font-bold">
                            <p><strong>Email:</strong> oneformindapp@gmail.com</p>
                            <p><strong>Status:</strong> HQ Jakarta, ID</p>
                        </div>
                    </div>

                     <div>
                        <p class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Product</p>
                        <ul class="space-y-4 text-sm font-bold text-slate-700">
                            <li><a href="{{ route('features.habit') }}" class="hover:text-indigo-600 transition">Habit Tracker</a></li>
                            <li><a href="{{ route('features.finance') }}" class="hover:text-indigo-600 transition">Finance OS</a></li>
                            <li><a href="{{ route('features.planner') }}" class="hover:text-indigo-600 transition">Daily Planner</a></li>
                            <li><a href="{{ route('features.journal') }}" class="hover:text-indigo-600 transition">Digital Journal</a></li>
                            <li><a href="{{ route('features.calendar') }}" class="hover:text-indigo-600 transition">Smart Calendar</a></li>
                            <li><a href="{{ route('features.goal') }}" class="hover:text-indigo-600 transition">Goal Tracker</a></li>
                            <li><a href="{{ route('features.job') }}" class="hover:text-indigo-600 transition">Job Tracker</a></li>
                            <li><a href="{{ route('features.neural-os') }}" class="hover:text-indigo-600 transition text-indigo-600 font-black">Neural OS AI</a></li>
                        </ul>
                    </div>


                    <div>
                        <p class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Compare</p>
                        <ul class="space-y-4 text-sm font-bold text-slate-700">
                            <li><a href="{{ route('compare.paper') }}" class="hover:text-indigo-600 transition">Vs. Paper Planner</a></li>
                            <li><a href="{{ route('compare.sheets') }}" class="hover:text-indigo-600 transition">Vs. Excel/Sheets</a></li>
                            <li><a href="{{ route('compare.finance-apps') }}" class="hover:text-indigo-600 transition">Vs. Finance Apps</a></li>
                            <li><a href="{{ route('compare.planner-apps') }}" class="hover:text-indigo-600 transition">Vs. Planner Apps</a></li>
                            <li><a href="{{ route('compare.five-apps') }}" class="hover:text-indigo-600 transition">Vs. 5 Separate Apps</a></li>
                            <li><a href="{{ route('compare.management-tools') }}" class="hover:text-indigo-600 transition">Vs. General Tools</a></li>
                            <li><a href="{{ route('compare.habit-apps') }}" class="hover:text-indigo-600 transition">Vs. Habit Apps</a></li>
                        </ul>
                    </div>

                    <div>
                        <p class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Resources</p>
                        <ul class="space-y-4 text-sm font-bold text-slate-700">
                            <li><a href="{{ route('resources.help') }}" class="hover:text-indigo-600 transition">Help Center</a></li>
                            <li><a href="{{ route('resources.blog') }}" class="hover:text-indigo-600 transition">Blog</a></li>
                            <li><a href="{{ route('resources.changelog') }}" class="hover:text-indigo-600 transition">Changelog</a></li>
                            <li><a href="{{ route('resources.community') }}" class="hover:text-indigo-600 transition">Community</a></li>
                            <li><a href="{{ route('resources.stories') }}" class="hover:text-indigo-600 transition">Success Stories</a></li>
                            <li><a href="{{ route('resources.guide') }}" class="hover:text-indigo-600 transition">User Guide</a></li>
                        </ul>
                    </div>

                    <div>
                        <p class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Company</p>
                        <ul class="space-y-4 text-sm font-bold text-slate-700">
                            <li><a href="{{ route('company.privacy') }}" class="hover:text-indigo-600 transition">{{ __('Privacy Policy') }}</a></li>
                            <li><a href="{{ route('company.terms') }}" class="hover:text-indigo-600 transition">{{ __('Terms of Service') }}</a></li>
                            <li><a href="{{ route('company.refund') }}" class="hover:text-indigo-600 transition">{{ __('Refund Policy') }}</a></li>
                            <li><a href="{{ route('company.contact') }}" class="hover:text-indigo-600 transition">{{ __('Contact Us') }}</a></li>
                            <li><a href="{{ route('company.security') }}" class="hover:text-indigo-600 transition">{{ __('Security') }}</a></li>
                            <li><a href="{{ route('about') }}" class="hover:text-indigo-600 transition">{{ __('About Us') }}</a></li>
                            <li><a href="{{ route('company.status') }}" class="hover:text-indigo-600 transition">{{ __('System Status') }}</a></li>
                        </ul>
                    </div>


                    <div>
                        <p class="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Connect</p>
                        <div class="flex gap-4">
                            <a href="https://x.com/OneForMind" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm" aria-label="Follow us on X">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239h-2.19L17.607 20.65z"/></svg>
                            </a>
                            <a href="https://instagram.com/oneformind" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm" aria-label="Follow us on Instagram">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="https://facebook.com/oneformind" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm" aria-label="Follow us on Facebook">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {{-- 🔥 FIX CONTRAST: Ganti slate-600 jadi slate-700 --}}
                <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-700">
                    <p>&copy; {{ date('Y') }} OneForMind. All rights reserved.</p>
                    <p>Made with ❤️ for better focus.</p>
                </div>
            </div>
        </footer>
    </div>
    
    {{-- 3. Load Library --}}
    <script src="https://unpkg.com/htmx.org@1.9.10" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"></script>
    <script src="//instant.page/5.2.0" type="module"></script>

    {{-- 4. 🔥 TURBO NAVIGATION ENGINE --}}
  <script>
    document.addEventListener('DOMContentLoaded', () => {
        // 1. NProgress: Faster config
        NProgress.configure({ 
            showSpinner: false, 
            speed: 200,
            minimum: 0.2,
            trickle: true,
            trickleSpeed: 50
        });

        // 2. HTMX Integration
        document.body.addEventListener('htmx:configRequest', (event) => {
            NProgress.start();
        });

        document.body.addEventListener('htmx:beforeSwap', (event) => {
            document.documentElement.style.scrollBehavior = 'auto';
            if (event.detail.target === document.body || event.detail.target.tagName === 'MAIN') {
                 window.scrollTo(0, 0);
            }
        });

        document.body.addEventListener('htmx:afterSwap', (event) => {
            NProgress.done();
            setTimeout(() => {
                document.documentElement.style.scrollBehavior = ''; 
            }, 50);

            if (typeof gtag !== 'undefined' && window.GA_MEASUREMENT_ID) {
                gtag('config', window.GA_MEASUREMENT_ID, {
                    page_path: window.location.pathname,
                    page_title: document.title
                });
            }
        });

        document.body.addEventListener('htmx:onLoadError', () => NProgress.done());
        document.body.addEventListener('htmx:historyRestore', () => {
            NProgress.remove();
            document.documentElement.style.scrollBehavior = '';
        });

        // 3. Fallback NProgress for non-HTMX links
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
                document.documentElement.style.scrollBehavior = 'auto';
            }
        });

        // 4. 🔥 AGGRESSIVE PREFETCH ENGINE: Prefetch on hover (65ms threshold)
        const prefetchedUrls = new Set();
        const prefetchLink = (url) => {
            if (prefetchedUrls.has(url)) return;
            if (!url.startsWith(window.location.origin)) return;
            if (url.includes('/dashboard') || url.includes('/api/')) return;
            prefetchedUrls.add(url);
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            link.as = 'document';
            document.head.appendChild(link);
        };

        let hoverTimer = null;
        document.addEventListener('pointerenter', (e) => {
            const link = e.target.closest('a');
            if (!link || !link.href) return;
            if (link.target === '_blank' || link.hasAttribute('hx-boost')) return;
            hoverTimer = setTimeout(() => prefetchLink(link.href), 65);
        }, { capture: true, passive: true });

        document.addEventListener('pointerleave', (e) => {
            if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
        }, { capture: true, passive: true });

        // Also prefetch on touchstart for mobile
        document.addEventListener('touchstart', (e) => {
            const link = e.target.closest('a');
            if (link && link.href) prefetchLink(link.href);
        }, { capture: true, passive: true });

        // 5. 🔥 PRELOAD VISIBLE LINKS: Intersection Observer
        const linkObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const link = entry.target;
                    if (link.href) prefetchLink(link.href);
                    linkObserver.unobserve(link);
                }
            });
        }, { rootMargin: '200px' });

        // Observe all internal links in viewport
        document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]').forEach(link => {
            if (!link.target && link.target !== '_blank' && !link.hasAttribute('hx-boost')) {
                linkObserver.observe(link);
            }
        });
    });
    </script>
    <!-- Cookie Banner -->
    <x-cookie-banner />
    {{-- PREMIUM LOADER OVERLAY (Neural OS Booting) --}}
    <div 
        x-show="isInterfacing" 
        x-transition:enter="transition ease-out duration-500"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-cloak
        class="fixed inset-0 z-[999] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
    >
        {{-- Futuristic Grid Background --}}
        <div class="absolute inset-0 bg-pattern-grid opacity-10"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent"></div>
        
        <div class="relative z-10 flex flex-col items-center">
            {{-- Glowing Brain/Logo --}}
            <div class="relative mb-12">
                <div class="absolute inset-0 bg-indigo-500 rounded-full blur-[60px] opacity-20 animate-pulse"></div>
                <div class="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.3)] animate-bounce duration-[2000ms]">
                    <img src="{{ asset('favicon.svg') }}" alt="Logo" class="w-12 h-12 brightness-0 invert" />
                </div>
            </div>

            <div class="text-center">
                <h2 class="text-white text-2xl font-black tracking-widest uppercase mb-4 animate-pulse">
                    Initializing Neural Interface
                </h2>
                
                <div class="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-8">
                    <div class="h-full bg-indigo-500 w-1/3 animate-[loading_2s_infinite_ease-in-out]"></div>
                </div>

                <div class="space-y-2">
                    <p class="text-indigo-400 font-mono text-[10px] uppercase tracking-[0.3em] opacity-80" x-data="{ text: 'Syncing cognitive maps...', index: 0 }" x-init="setInterval(() => { index = (index + 1) % 3; text = ['Syncing cognitive maps...', 'Analyzing behavioral patterns...', 'Calibrating growth metrics...'][index] }, 800)" x-text="text"></p>
                </div>
            </div>
        </div>
        
        <style>
            @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(300%); }
            }
        </style>
    </div>

</body>
</html>
