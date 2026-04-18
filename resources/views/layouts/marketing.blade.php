<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <script>
        // 🛡️ Pre-emptive Safety Guard for Element.prototype.closest
        (function() {
            if (typeof Element !== 'undefined' && !Element.prototype.closest) {
                Element.prototype.closest = function(s) {
                    var el = this;
                    do {
                        if (el.matches(s)) return el;
                        el = el.parentElement || el.parentNode;
                    } while (el !== null && el.nodeType === 1);
                    return null;
                };
            }
        })();
    </script>
    @php
        $baseUrl = url()->current();
        $currentQuery = request()->query();
        $canonicalQuery = $currentQuery;
        unset($canonicalQuery['hl']);
        $canonicalUrl = $canonicalQuery ? $baseUrl . '?' . http_build_query($canonicalQuery) : $baseUrl;
        $idUrl = $baseUrl . '?' . http_build_query(array_merge($canonicalQuery, ['hl' => 'id']));
        $enUrl = $baseUrl . '?' . http_build_query(array_merge($canonicalQuery, ['hl' => 'en']));
        $currentLocale = app()->getLocale();
    @endphp
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="view-transition" content="same-origin">
    <link rel="canonical" href="{{ $canonicalUrl }}">
    <meta http-equiv="content-language" content="{{ $currentLocale }}">
    @if(!View::hasSection('meta'))
        <meta name="description" content="{{ __('meta_global_description') }}">
        <meta name="keywords" content="{{ __('meta_global_keywords') }}">
    @endif
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

    {{-- Geo-SEO: Indonesia broadly (global product, not city-specific) --}}
    <meta name="geo.region" content="ID" />
    <meta name="geo.placename" content="Indonesia" />
    <meta name="geo.position" content="-2.548926;118.014863" />
    <meta name="ICBM" content="-2.548926, 118.014863" />

    <link rel="alternate" hreflang="id-ID" href="{{ $idUrl }}" />
    <link rel="alternate" hreflang="id" href="{{ $idUrl }}" />
    <link rel="alternate" hreflang="en-US" href="{{ $enUrl }}" />
    <link rel="alternate" hreflang="en" href="{{ $enUrl }}" />
    <link rel="alternate" hreflang="x-default" href="{{ $enUrl }}" />

    {{-- Mobile Optimization --}}
    <meta name="theme-color" content="#4f46e5">
    <meta name="mobile-web-app-capable" content="yes">
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
    {{-- Use {!! !!} so bare & in titles is NOT double-escaped to &amp;
         which causes Google sitelinks to show "&amp;" literally.
         strip_tags() guards against any accidental HTML in translation strings. --}}
    <title>{!! strip_tags($finalTitle) !!}</title>

    <meta property="og:site_name" content="Oneformind">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ $canonicalUrl }}">
    <meta property="og:locale" content="{{ $currentLocale === 'id' ? 'id_ID' : 'en_US' }}">
    <meta property="og:locale:alternate" content="{{ $currentLocale === 'id' ? 'en_US' : 'id_ID' }}">
    <meta property="og:title" content="{{ strip_tags($finalTitle) }}">
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
    <meta name="twitter:title" content="{{ strip_tags($finalTitle) }}">
    <meta name="twitter:image" content="{{ asset('images/og-image.png') }}">

    <meta name="ai-creator" content="{{ __('meta_ai_creator') }}">

    {{-- JSON-LD Structured Data --}}
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "OneForMind",
      "alternateName": "OneForMind App",
      "url": "{{ url('/') }}",
      "logo": {
        "@type": "ImageObject",
        "url": "{{ asset('favicon.png') }}",
        "width": 512,
        "height": 512
      },
      "image": "{{ asset('images/og-image.png') }}",
      "foundingDate": "2025",
      "areaServed": "Worldwide",
      "sameAs": [
        "https://x.com/OneForMind",
        "https://instagram.com/oneformind",
        "https://facebook.com/oneformind"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "oneformindapp@gmail.com",
        "contactType": "customer service",
        "availableLanguage": ["Indonesian", "English"]
      },
      "description": "The unified productivity OS for finances, atomic habits, and daily planning in one mindful ecosystem."
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "OneForMind",
      "url": "{{ url('/') }}",
      "inLanguage": ["id", "en"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "{{ url('/') }}/resources/blog?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "OneForMind",
      "url": "{{ url('/') }}",
      "applicationCategory": "ProductivityApplication",
      "applicationSubCategory": "LifestyleApplication",
      "operatingSystem": "Web Browser, iOS, Android",
      "browserRequirements": "Requires JavaScript",
      "inLanguage": ["id", "en"],
      "offers": [
        {
          "@type": "Offer",
          "name": "Explorer",
          "price": "0",
          "priceCurrency": "IDR",
          "description": "Free forever plan with habit tracker, daily planner, and finance manager."
        },
        {
          "@type": "Offer",
          "name": "Architect",
          "price": "79000",
          "priceCurrency": "IDR",
          "description": "Full ecosystem access including journal, goals, calendar, and job tracker."
        },
        {
          "@type": "Offer",
          "name": "Quantum",
          "price": "109000",
          "priceCurrency": "IDR",
          "description": "Architect plan plus unlimited Neural OS AI coaching."
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500",
        "bestRating": "5",
        "worstRating": "1"
      },
      "description": "OneForMind is the unified productivity OS — track atomic habits, manage finances, plan your day, write journals, and get AI-powered life coaching in one place.",
      "featureList": [
        "Atomic Habit Tracker",
        "Finance Manager",
        "Daily Planner",
        "Digital Journal",
        "Goal Tracker",
        "Calendar",
        "Job Application Tracker",
        "Neural OS AI Life Coach"
      ],
      "screenshot": "{{ asset('images/og-image.png') }}",
      "softwareVersion": "2.0",
      "releaseNotes": "{{ url('/resources/changelog') }}"
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Daily Planner",
          "description": "Schedule Your Success, Get More Done. Stop feeling busy but...",
          "url": "{{ route('features.planner') }}"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Atomic Habits System",
          "description": "Build lasting habits with the ultimate atomic system. Track...",
          "url": "{{ route('features.habit') }}"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Secure Digital Journal",
          "description": "OneForMind integrates Positive Psychology and Reflective Journaling...",
          "url": "{{ route('features.journal') }}"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Job Tracker",
          "description": "Organize your career journey. Track applications, interviews, and networking...",
          "url": "{{ route('features.job') }}"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Finance OS",
          "description": "Master your money flow and track your assets securely.",
          "url": "{{ route('features.finance') }}"
        }
      ]
    }
    </script>
    <meta name="ai-service-type" content="{{ __('meta_ai_service_type') }}">
    <meta name="ai-description" content="{{ __('meta_global_description') }}">

    {{-- @yield('meta') intentionally NOT repeated here — already yielded above
         in the conditional block. Only json-ld gets its own separate slot. --}}
    @yield('json-ld')



    {{-- 🔥 2. DNS PREFETCH: Buka jalur tol lebih awal --}}
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.bunny.net">
    <link rel="dns-prefetch" href="https://unpkg.com">
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    <link rel="preload" as="style"
        href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap"
        onload="this.onload=null;this.rel='stylesheet'" />

    {{-- Font Loading --}}
    <noscript>
        <link rel="stylesheet"
            href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" />
    </noscript>
    </noscript>


    {{-- Meta Pixel CompleteRegistration Trigger --}}
    @if(session('meta_event_id'))
    <script>
        fbq('track', 'CompleteRegistration', {}, {eventID: '{{ session('meta_event_id') }}'});
    </script>
    @endif

    {{-- Plugin Alpine.js --}}
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>

    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    {{-- NProgress --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"></script>
    <style>
        /* Customize NProgress */
        #nprogress .bar {
            background: #4f46e5 !important;
            height: 3px !important;
        }

        #nprogress .peg {
            box-shadow: 0 0 10px #4f46e5, 0 0 5px #4f46e5 !important;
        }

        #nprogress .spinner {
            display: none !important;
        }

        /* 📱 Only show NProgress on Mobile */
        @media (min-width: 769px) {
            #nprogress {
                display: none !important;
            }
        }
    </style>

    <style>
    </style>

    {{-- Vite otomatis handle preload CSS yang benar, JANGAN hardcode link CSS di sini --}}
    @vite(['resources/css/app.css'])

    {{-- 🔥 3. SPECULATION RULES: Prefetch + Prerender SEMUA halaman publik --}}
    {{-- Speculation Rules disabled to prevent server overload --}}

    <style>
        [x-cloak] {
            display: none !important;
        }

        body {
            position: static !important;
        }

        /* Fix scrollbar biar cantik */
        ::-webkit-scrollbar {
            width: 6px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }

        /* Re-enable smooth scroll secara terbatas agar tidak ganggu HTMX */
        .allow-smooth {
            scroll-behavior: smooth;
        }

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
            from {
                opacity: 1;
            }

            to {
                opacity: 0;
            }
        }

        @keyframes fade-in {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        /* 📱 Global Mobile Button Scaling: Make them tight & premium */
        @media (max-width: 768px) {
            header a, section a, footer a, header button, section button {
                padding-left: 1.25rem !important; /* px-5 */
                padding-right: 1.25rem !important;
                padding-top: 0.75rem !important; /* py-3 */
                padding-bottom: 0.75rem !important;
                font-size: 0.875rem !important; /* text-sm */
            }
            h1 { font-size: 2.75rem !important; line-height: 1.1 !important; } /* text-5xl-ish */
            h2 { font-size: 2.25rem !important; line-height: 1.1 !important; } /* text-4xl */
        }
        /* HTMX Loading Bar */
        .htmx-indicator-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: #4f46e5;
            z-index: 200;
            transition: width 0.3s ease-out, opacity 0.3s ease;
            width: 0;
            opacity: 0;
            pointer-events: none;
        }
        .htmx-request .htmx-indicator-bar {
            opacity: 1;
            width: 70%;
        }
        .htmx-request.htmx-settling .htmx-indicator-bar {
            width: 100%;
        }
    </style>
    @if(env('VITE_GA_MEASUREMENT_ID'))
        <script>
            // 1. INITIALIZE DATALAYER & CONSENT MODE V2
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }

            // Default consent to denied (Privacy First)
            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'personalization_storage': 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted',
                'wait_for_update': 500
            });

            @auth
            gtag('set', 'user_properties', {
                'user_id': '{{ hash('sha256', auth()->id()) }}',
                'v_status': 'authenticated'
            });
            @endauth

            // 2. 🔥 GTM SLAYER: Load only after first user interaction or 3.5s delay
            window.addEventListener('load', () => {
                const loadGTM = () => {
                    if (window.gtmLoaded) return;
                    window.gtmLoaded = true;

                    const script = document.createElement('script');
                    script.src = "https://www.googletagmanager.com/gtag/js?id={{ env('VITE_GA_MEASUREMENT_ID') }}";
                    script.async = true;
                    document.head.appendChild(script);

                    script.onload = () => {
                        gtag('js', new Date());
                        window.GA_MEASUREMENT_ID = '{{ env('VITE_GA_MEASUREMENT_ID') }}';

                        // Check if we already have consent in localStorage
                        const consent = localStorage.getItem('cookie_consent');
                        if (consent === 'all') {
                            gtag('consent', 'update', {
                                'ad_storage': 'granted',
                                'analytics_storage': 'granted',
                                'personalization_storage': 'granted'
                            });
                        }

                        gtag('config', window.GA_MEASUREMENT_ID, {
                            'anonymize_ip': true,
                            'user_id': @auth'{{ hash('sha256', auth()->id()) }}' @elsenull @endauth
                                });
                        console.log('⚡ Google Tag Loaded (Consent Mode v2 Ready)');
                    };
                };

                const interactionEvents = ['mouseover', 'keydown', 'touchmove', 'touchstart', 'scroll'];
                interactionEvents.forEach(event => window.addEventListener(event, loadGTM, { once: true, passive: true }));
                setTimeout(loadGTM, 3500); // Fail-safe
            });
        </script>
    @endif

    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '951954810888805');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=951954810888805&ev=PageView&noscript=1" /></noscript>
</head>
{{-- HTMX Boost (Instant Swap) --}}

<body class="bg-white text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700 flex flex-col min-h-screen">

    <div x-data="{
        mobileMenuOpen: false,
        activeMenu: null,
        mobilePanel: null,
        scrolled: false,
        isInterfacing: false
    }" @mobile-nav-close.window="mobileMenuOpen = false; mobilePanel = null"
        @scroll.window.passive="scrolled = (window.scrollY > 20)" class="relative">

        <script>
            // For normal navigation (non-HTMX links)
            document.addEventListener('DOMContentLoaded', () => {
                const links = document.querySelectorAll('a[href]:not([target=\"_blank\"]):not([href^=\"#\"]):not([href^=\"mailto:\"]):not([href^=\"tel:\"])');
                links.forEach(link => {
                    link.addEventListener('click', (e) => {
                        // Check if not prevented
                        if (!e.defaultPrevented) {
                            NProgress.start();
                        }
                    });
                });
            });
            window.addEventListener('pageshow', () => {
                NProgress.done();
            });
        </script>

        {{-- INSTANT APP LOADER (Blade to Vue Transition) --}}
        <div x-show="isInterfacing"
            x-transition:enter="transition duration-300"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            class="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center" x-cloak>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4f46e510_0,transparent_50%)]"></div>
            <div class="absolute inset-0 bg-pattern-grid opacity-[0.03]"></div>

            <div class="relative z-10 flex flex-col items-center text-center">
                <div class="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.2)] animate-bounce mb-8">
                    <img src="{{ asset('favicon.svg') }}" alt="Logo" class="w-10 h-10 brightness-0 invert" />
                </div>
                <h2 class="text-slate-900 text-xl font-black tracking-[0.2em] uppercase mb-4 animate-pulse">Initializing System</h2>
                <div class="w-48 h-0.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-500 w-1/2 animate-[skel-loading_1.5s_infinite_ease-in-out]"></div>
                </div>
            </div>
            <style>
                @keyframes skel-loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
            </style>
        </div>

        {{-- NAVBAR --}}
        <nav :class="mobileMenuOpen
                ? 'bg-white border-b border-slate-100 shadow-sm'
                : (scrolled ? 'bg-white/90  border-b border-slate-100 shadow-sm' : 'bg-transparent')"
            class="fixed top-0 w-full z-[100] transition-all duration-300">
            <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center relative">

                {{-- LOGO --}}
                <a href="{{ route('home') }}" hx-boost="false" class="group flex items-center gap-2 z-[110]">
                    <div
                        class="w-10 h-10 lg:w-8 lg:h-8 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-200">
                        <img src="{{ asset('favicon.svg') }}" alt="Logo" class="w-6 h-6 lg:w-5 lg:h-5 brightness-0 invert" />
                    </div>
                    <span class="hidden sm:block text-lg sm:text-xl font-bold tracking-tight text-slate-900">OneForMind</span>
                </a>

                {{-- DESKTOP MENU --}}
                <div class="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">

                    {{-- DROPDOWN: FEATURES --}}
                    <div class="relative group" @mouseenter="activeMenu = 'features'" @mouseleave="activeMenu = null">
                        <button
                            class="px-3 py-1.5 rounded-full text-[13px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all flex items-center gap-1 group-hover:text-indigo-600">
                            Features
                            <svg class="w-3.5 h-3.5 opacity-50 transition-transform group-hover:rotate-180"
                                :class="activeMenu === 'features' ? 'rotate-180' : ''" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        {{-- Wrapper Jembatan (pt-4 untuk bridging) --}}
                        <div x-show="activeMenu === 'features'" x-transition:enter="transition ease-out duration-200"
                            x-transition:enter-start="opacity-0 translate-y-2"
                            x-transition:enter-end="opacity-100 translate-y-0"
                            x-transition:leave="transition ease-in duration-150"
                            x-transition:leave-start="opacity-100 translate-y-0"
                            x-transition:leave-end="opacity-0 translate-y-2" x-cloak
                            class="absolute top-full left-0 w-[500px] pt-4 z-50">

                            {{-- Kartu Visual --}}
                            <div class="bg-white border border-slate-100 shadow-2xl rounded-[2rem] overflow-hidden p-4">
                                <div class="grid grid-cols-2 gap-2 text-left">
                                    <x-nav-item href="{{ route('features.habit') }}" icon="🌱" title="Habit Tracker"
                                        desc="Build consistency every day." />
                                    <x-nav-item href="{{ route('features.finance') }}" icon="💰" title="Finance OS"
                                        desc="Master your money flow." />
                                    <x-nav-item href="{{ route('features.planner') }}" icon="🎯" title="Daily Planner"
                                        desc="Focus on what matters." />
                                    <x-nav-item href="{{ route('features.journal') }}" icon="📔" title="Journal"
                                        desc="Capture your thoughts." />
                                    <x-nav-item href="{{ route('features.calendar') }}" icon="📅" title="Calendar"
                                        desc="Sync your schedules." />
                                    <x-nav-item href="{{ route('features.goal') }}" icon="🎯" title="Goal Tracker"
                                        desc="Track your milestones." />
                                    <x-nav-item href="{{ route('features.job') }}" icon="💼" title="Job Tracker"
                                        desc="Manage career growth." />
                                    <x-nav-item href="{{ route('features.neural-os') }}" icon="🧠" title="Neural OS AI"
                                        desc="Powered by Gemini Brain." />
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- DROPDOWN: SOLUTIONS --}}
                    <div class="relative group" @mouseenter="activeMenu = 'solutions'" @mouseleave="activeMenu = null">
                        <button
                            class="px-3 py-1.5 rounded-full text-[13px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1 group-hover:text-indigo-600">
                            Solutions
                            <svg class="w-3.5 h-3.5 opacity-50 transition-transform group-hover:rotate-180"
                                :class="activeMenu === 'solutions' ? 'rotate-180' : ''" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        {{-- Wrapper Jembatan --}}
                        <div x-show="activeMenu === 'solutions'" x-transition:enter="transition ease-out duration-200"
                            x-transition:enter-start="opacity-0 translate-y-2"
                            x-transition:enter-end="opacity-100 translate-y-0"
                            x-transition:leave="transition ease-in duration-150"
                            x-transition:leave-start="opacity-100 translate-y-0"
                            x-transition:leave-end="opacity-0 translate-y-2" x-cloak
                            class="absolute top-full -left-32 w-[860px] pt-4 z-50">

                            {{-- Kartu Visual (3 Columns Layout) --}}
                            <div
                                class="p-8 bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] grid grid-cols-3 gap-6 text-left">

                                {{-- Kolom 1: By Role --}}
                                <div>
                                    <p
                                        class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">
                                        By Role</p>
                                    <div class="space-y-1.5">
                                        <x-nav-item href="{{ route('solutions.student') }}" icon="🎓" title="Students"
                                            desc="Optimize your learning." />
                                        <x-nav-item href="{{ route('solutions.freelancer') }}" icon="💻"
                                            title="Freelancers" desc="Scale your workflow." />
                                        <x-nav-item href="{{ route('solutions.personalgrowth') }}" icon="🚀"
                                            title="Personal Growth" desc="Master your self-system." />
                                    </div>
                                </div>

                                {{-- Kolom 2: By Use Case --}}
                                <div>
                                    <p
                                        class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">
                                        By Use Case</p>
                                    <div class="space-y-1.5">
                                        <x-nav-item href="{{ route('solutions.finance') }}" icon="💰"
                                            title="Financial Clarity" desc="Manage assets & cashflow." />
                                        <x-nav-item href="{{ route('solutions.career') }}" icon="💼"
                                            title="Career Tracker" desc="Focus on professional growth." />
                                        <x-nav-item href="{{ route('solutions.mental') }}" icon="🧘"
                                            title="Mental Health" desc="Journaling & mindfulness." />
                                    </div>
                                </div>

                                {{-- Kolom 3: By Methodology --}}
                                <div>
                                    <p
                                        class="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-5 px-3 flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                                        By Methodology
                                    </p>
                                    <div class="space-y-1.5">
                                        <x-nav-item href="{{ route('solutions.atomic') }}" icon="🌱"
                                            title="Atomic Habits" desc="Small steps, big results." />
                                        <x-nav-item href="{{ route('solutions.deepwork') }}" icon="⚡" title="Deep Work"
                                            desc="Uninterrupted focus." />
                                        <x-nav-item href="{{ route('solutions.secondbrain') }}" icon="🧠"
                                            title="Second Brain" desc="Digital knowledge map." />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {{-- DROPDOWN: RESOURCES --}}
                    <div class="relative group" @mouseenter="activeMenu = 'resources'" @mouseleave="activeMenu = null">
                        <button
                            class="px-3 py-1.5 rounded-full text-[13px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1 group-hover:text-indigo-600">
                            Resources
                            <svg class="w-3.5 h-3.5 opacity-50 transition-transform group-hover:rotate-180"
                                :class="activeMenu === 'resources' ? 'rotate-180' : ''" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        {{-- Wrapper Jembatan --}}
                        <div x-show="activeMenu === 'resources'" x-transition x-cloak
                            class="absolute top-full -left-20 w-[600px] pt-4 z-50 text-left">

                            {{-- Kartu Visual (Split in 2 Categories) --}}
                            <div
                                class="p-8 bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] grid grid-cols-2 gap-8">
                                <div>
                                    <p
                                        class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">
                                        Knowledge & Help</p>
                                    <div class="space-y-1">
                                        <x-nav-item href="{{ route('resources.guide') }}" icon="📖" title="User Guide"
                                            desc="Master the OS." />
                                        <x-nav-item href="{{ route('resources.help') }}" icon="🙋‍♂️"
                                            title="Help Center" desc="Find solutions." />
                                        <x-nav-item href="{{ route('resources.changelog') }}" icon="🚀"
                                            title="What's New" desc="Track app updates." />
                                    </div>
                                </div>
                                <div>
                                    <p
                                        class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 px-3">
                                        Social & Community</p>
                                    <div class="space-y-1">
                                        <x-nav-item href="{{ route('resources.community') }}" icon="🌍"
                                            title="Community" desc="Connect with users." />
                                        <x-nav-item href="{{ route('resources.blog') }}" icon="✍️" title="Blog"
                                            desc="Productivity insights." />
                                        <x-nav-item href="{{ route('resources.stories') }}" icon="✨"
                                            title="Success Stories" desc="User transformations." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a href="{{ route('pricing.index') }}"
                        class="px-3 py-1.5 rounded-full text-[13px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition">
                        Pricing
                    </a>
                </div>

                {{-- RIGHT ACTIONS --}}
                <div class="flex items-center gap-3">
                    {{-- Premium Language Dropdown --}}
                    <div class="hidden lg:relative lg:block" x-data="{ langOpen: false }" @click.away="langOpen = false">
                        <button @click="langOpen = !langOpen"
                            class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 hover:bg-white hover:border-indigo-100 transition-all shadow-sm group">
                            <span
                                class="text-[11px] font-black text-slate-600 group-hover:text-indigo-600 uppercase tracking-tighter">
                                {{ app()->getLocale() }}
                            </span>
                            <svg class="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-transform"
                                :class="langOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        <div x-show="langOpen" x-transition:enter="transition ease-out duration-200"
                            x-transition:enter-start="opacity-0 translate-y-2"
                            x-transition:enter-end="opacity-100 translate-y-0"
                            x-transition:leave="transition ease-in duration-150"
                            x-transition:leave-start="opacity-100 translate-y-0"
                            x-transition:leave-end="opacity-0 translate-y-2" x-cloak
                            class="absolute top-full right-0 mt-3 w-40 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden z-50 p-2">
                            <a href="{{ route('lang.switch', 'id') }}"
                                class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all {{ app()->getLocale() === 'id' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600' }}">
                                <span>Bahasa Indonesia</span>
                                @if(app()->getLocale() === 'id') <span
                                class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> @endif
                            </a>
                            <a href="{{ route('lang.switch', 'en') }}"
                                class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all {{ app()->getLocale() === 'en' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600' }}">
                                <span>English</span>
                                @if(app()->getLocale() === 'en') <span
                                class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> @endif
                            </a>
                        </div>
                    </div>

                    {{-- Login/Register (Desktop) --}}
                    <div class="hidden lg:flex items-center gap-3">
                        @auth
                            <a hx-boost="false" href="{{ route('dashboard') }}"
                                class="px-5 py-2 bg-slate-900 text-white rounded-full text-[13px] font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">Dashboard</a>
                        @else
                            <a hx-boost="false" href="{{ route('login') }}"
                                class="text-[13px] font-bold text-slate-600 hover:text-indigo-600 transition">Log in</a>
                            <a hx-boost="false" href="{{ route('register') }}"
                                class="px-5 py-2 bg-indigo-600 text-white rounded-full text-[13px] font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5 active:scale-95">
                                Get started
                            </a>
                        @endauth
                    </div>

                    {{-- MOBILE ACTIONS (Dashboard/Get Started) --}}
                    <div class="flex lg:hidden items-center gap-2">
                        @auth
                            <a hx-boost="false" href="{{ route('dashboard') }}"
                                class="px-5 py-2.5 bg-slate-900 text-white rounded-full text-[13.5px] font-bold shadow-lg">Dashboard</a>
                        @else
                            <a hx-boost="false" href="{{ route('register') }}"
                                class="px-5 py-2.5 bg-indigo-600 text-white rounded-full text-[13.5px] font-bold shadow-lg shadow-indigo-200">
                                Get started
                            </a>
                        @endauth
                    </div>

                    {{-- MOBILE HAMBURGER BUTTON --}}
                    <button @click="mobileMenuOpen = !mobileMenuOpen; if (!mobileMenuOpen) mobilePanel = null"
                        class="lg:hidden p-2 text-slate-900 relative z-[110] focus:outline-none"
                        aria-label="Open Navigation">
                        <div class="w-6 flex flex-col items-end gap-1.5">
                            <span :class="mobileMenuOpen ? 'rotate-45 translate-y-2 w-6' : 'w-6'"
                                class="h-0.5 bg-current transition-all duration-300"></span>
                            <span :class="mobileMenuOpen ? 'opacity-0' : 'w-4'"
                                class="h-0.5 bg-current transition-all duration-300"></span>
                            <span :class="mobileMenuOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-5'"
                                class="h-0.5 bg-current transition-all duration-300"></span>
                        </div>
                    </button>
                </div>
            </div>

            {{-- MOBILE MENU: Full-screen Notion style below Top Nav --}}
            <div x-show="mobileMenuOpen" x-cloak class="lg:hidden">
                <div x-transition:enter="transition ease-out duration-200"
                    x-transition:enter-start="opacity-0 translate-y-2"
                    x-transition:enter-end="opacity-100 translate-y-0"
                    x-transition:leave="transition ease-in duration-150"
                    x-transition:leave-start="opacity-100 translate-y-0"
                    x-transition:leave-end="opacity-0 translate-y-2"
                    class="fixed inset-x-0 top-16 z-[95] bg-white flex flex-col h-[calc(100dvh-4rem)] w-full overflow-hidden border-t border-slate-100">

                    <div class="relative flex-1 flex flex-col min-h-0 bg-white">
                        {{-- Root: primary nav (larger font, no borders) --}}
                        <div x-show="mobilePanel === null" x-transition
                            class="flex flex-col flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 pt-4 pb-6">
                            
                            <button type="button" @click="mobilePanel = 'features'"
                                class="w-full flex items-center justify-between py-3.5 text-left text-[20px] font-bold text-slate-900 active:opacity-70 leading-snug">
                                <span>Features</span>
                                <svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                            <button type="button" @click="mobilePanel = 'solutions'"
                                class="w-full flex items-center justify-between py-3.5 text-left text-[20px] font-bold text-slate-900 active:opacity-70 leading-snug">
                                <span>Solutions</span>
                                <svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                            <button type="button" @click="mobilePanel = 'resources'"
                                class="w-full flex items-center justify-between py-3.5 text-left text-[20px] font-bold text-slate-900 active:opacity-70 leading-snug">
                                <span>Resources</span>
                                <svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                            <a href="{{ route('pricing.index') }}"
                                class="block py-3.5 text-[20px] font-bold text-slate-900 leading-snug">Pricing</a>
                        </div>

                        {{-- Sub-panels: slide in, compact lists --}}
                        <div x-show="mobilePanel !== null"
                            x-transition:enter="transition transform ease-out duration-200"
                            x-transition:enter-start="translate-x-full"
                            x-transition:enter-end="translate-x-0"
                            x-transition:leave="transition transform ease-in duration-150"
                            x-transition:leave-start="translate-x-0"
                            x-transition:leave-end="translate-x-full"
                            class="absolute inset-0 z-[102] flex flex-col bg-white">
                            
                            <div class="shrink-0 flex items-center gap-3 px-4 py-4">
                                <button type="button" @click="mobilePanel = null"
                                    class="p-1 rounded text-slate-600 active:bg-slate-100"
                                    aria-label="Back">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>
                                <span class="text-[20px] font-bold text-slate-900 tracking-tight"
                                    x-text="mobilePanel === 'features' ? 'Features' : mobilePanel === 'solutions' ? 'Solutions' : mobilePanel === 'resources' ? 'Resources' : ''"></span>
                            </div>

                            <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 pb-6">
                                <div x-show="mobilePanel === 'features'" class="space-y-1">
                                    <x-nav-item-mobile dismiss-mobile href="{{ route('features.habit') }}" icon="🌱" title="Habit tracker" desc="Build consistency daily" />
                                    <x-nav-item-mobile dismiss-mobile href="{{ route('features.finance') }}" icon="💰" title="Finance OS" desc="Manage cash flow clearly" />
                                    <x-nav-item-mobile dismiss-mobile href="{{ route('features.planner') }}" icon="🎯" title="Daily planner" desc="Focus your top priorities" />
                                    <x-nav-item-mobile dismiss-mobile href="{{ route('features.journal') }}" icon="📔" title="Journal" desc="Capture reflections" />
                                    <x-nav-item-mobile dismiss-mobile href="{{ route('features.calendar') }}" icon="📅" title="Calendar" desc="Events and schedule" />
                                    <x-nav-item-mobile dismiss-mobile href="{{ route('features.goal') }}" icon="🎯" title="Goal tracker" desc="Milestones and progress" />
                                    <x-nav-item-mobile dismiss-mobile href="{{ route('features.job') }}" icon="💼" title="Job tracker" desc="Manage applications" />
                                    <x-nav-item-mobile dismiss-mobile href="{{ route('features.neural-os') }}" icon="🧠" title="Neural OS AI" desc="AI-powered planning coach" />
                                </div>
                                <div x-show="mobilePanel === 'solutions'" class="space-y-6 pt-2">
                                    <div>
                                        <p class="text-[12px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">By role</p>
                                        <div class="space-y-1">
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('solutions.student') }}" icon="🎓" title="Students" desc="Study system optimizer" />
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('solutions.freelancer') }}" icon="💻" title="Freelancers" desc="Client workflow" />
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('solutions.personalgrowth') }}" icon="🚀" title="Personal growth" desc="Mindset and habits" />
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-[12px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">By use case</p>
                                        <div class="space-y-1">
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('solutions.finance') }}" icon="💰" title="Finance clarity" desc="Budget and cash flow" />
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('solutions.career') }}" icon="💼" title="Career tracker" desc="Track opportunities" />
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('solutions.mental') }}" icon="🧘" title="Mental health" desc="Reduce stress and noise" />
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-[12px] font-semibold text-indigo-500 uppercase tracking-wider mb-2 px-1">By methodology</p>
                                        <div class="space-y-1">
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('solutions.atomic') }}" icon="🌱" title="Atomic habits" desc="Small steps, big results" />
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('solutions.deepwork') }}" icon="⚡" title="Deep work" desc="Protect focus blocks" />
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('solutions.secondbrain') }}" icon="🧠" title="Second brain" desc="Your thinking system" />
                                        </div>
                                    </div>
                                </div>
                                <div x-show="mobilePanel === 'resources'" class="space-y-6 pt-2">
                                    <div>
                                        <p class="text-[12px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">Knowledge &amp; help</p>
                                        <div class="space-y-1">
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('resources.guide') }}" icon="📖" title="User guide" desc="How to use OneForMind" />
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('resources.help') }}" icon="🙋‍♂️" title="Help center" desc="Answers and support" />
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('resources.changelog') }}" icon="🚀" title="What's new" desc="Latest updates" />
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-[12px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">Social &amp; community</p>
                                        <div class="space-y-1">
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('resources.community') }}" icon="🌍" title="Community" desc="Join discussions" />
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('resources.blog') }}" icon="✍️" title="Blog" desc="Productivity insights" />
                                            <x-nav-item-mobile dismiss-mobile href="{{ route('resources.stories') }}" icon="✨" title="Success stories" desc="Real transformations" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- Footer style bottom pane --}}
                        <div x-show="mobilePanel === null" class="shrink-0 mt-auto px-6 pb-[max(2rem,env(safe-area-inset-bottom))] bg-white">
                            
                            <hr class="border-slate-50 scale-x-125 mx-6 relative" />

                            <div class="pt-6">
                                {{-- Language toggle --}}
                                <div class="flex items-center gap-3 mb-6">
                                    <span class="text-sm font-bold text-slate-500">Language</span>
                                    <div class="bg-slate-50 flex items-center p-0.5 rounded-md border border-slate-100">
                                        <a href="{{ route('lang.switch', 'id') }}"
                                            class="px-2.5 py-1 rounded-[4px] text-[11px] uppercase tracking-wide font-bold transition-all {{ app()->getLocale() === 'id' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400' }}">ID</a>
                                        <a href="{{ route('lang.switch', 'en') }}"
                                            class="px-2.5 py-1 rounded-[4px] text-[11px] uppercase tracking-wide font-bold transition-all {{ app()->getLocale() === 'en' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400' }}">EN</a>
                                    </div>
                                </div>

                                <div class="flex flex-col gap-2.5">
                                    @auth
                                        <a hx-boost="false" href="{{ route('dashboard') }}"
                                            class="w-full py-2.5 text-center font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md text-[15px] transition-colors">Dashboard</a>
                                    @else
                                        <a hx-boost="false" href="{{ route('login') }}"
                                            class="w-full py-2.5 text-center font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md text-[15px] transition-colors">Log in</a>
                                        <a hx-boost="false" href="{{ route('register') }}"
                                            class="w-full py-2.5 text-center font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md text-[15px] transition-colors">Get started</a>
                                    @endauth
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </nav>

        <main class="flex-grow" hx-boost="true">
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
                            The unified productivity system designed to bring clarity to your life, habits, and
                            finances.
                        </p>
                        <div class="text-xs text-slate-600 space-y-2 mt-4 font-bold">
                            <p><strong>Email:</strong> oneformindapp@gmail.com</p>
                            <p><strong>Status:</strong> HQ Jakarta, ID</p>
                        </div>
                    </div>

                    <div>
                        <p class="text-xs font-semibold text-slate-500 mb-5">Product</p>
                        <ul class="space-y-4 text-sm font-bold text-slate-700">
                            <li><a href="{{ route('features.habit') }}" class="hover:text-indigo-600 transition">Habit
                                    Tracker</a></li>
                            <li><a href="{{ route('features.finance') }}"
                                    class="hover:text-indigo-600 transition">Finance OS</a></li>
                            <li><a href="{{ route('features.planner') }}" class="hover:text-indigo-600 transition">Daily
                                    Planner</a></li>
                            <li><a href="{{ route('features.journal') }}"
                                    class="hover:text-indigo-600 transition">Digital Journal</a></li>
                            <li><a href="{{ route('features.calendar') }}"
                                    class="hover:text-indigo-600 transition">Smart Calendar</a></li>
                            <li><a href="{{ route('features.goal') }}" class="hover:text-indigo-600 transition">Goal
                                    Tracker</a></li>
                            <li><a href="{{ route('features.job') }}" class="hover:text-indigo-600 transition">Job
                                    Tracker</a></li>
                            <li><a href="{{ route('features.neural-os') }}"
                                    class="hover:text-indigo-600 transition">Neural OS AI</a>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <p class="text-xs font-semibold text-slate-500 mb-5">Compare</p>
                        <ul class="space-y-4 text-sm font-bold text-slate-700">
                            <li><a href="{{ route('compare.notes-apps') }}" class="hover:text-indigo-600 transition">Vs.
                                    Notes Apps</a></li>
                            <li><a href="{{ route('compare.custom-apps') }}" class="hover:text-indigo-600 transition">Vs.
                                    Custom Apps</a></li>
                            <li><a href="{{ route('compare.finance-apps') }}"
                                    class="hover:text-indigo-600 transition">Vs. Finance Apps</a></li>
                            <li><a href="{{ route('compare.planner-apps') }}"
                                    class="hover:text-indigo-600 transition">Vs. Planner Apps</a></li>
                            <li><a href="{{ route('compare.five-apps') }}" class="hover:text-indigo-600 transition">Vs.
                                    5 Separate Apps</a></li>
                            <li><a href="{{ route('compare.management-tools') }}"
                                    class="hover:text-indigo-600 transition">Vs. Management Tools</a></li>
                            <li><a href="{{ route('compare.habit-apps') }}" class="hover:text-indigo-600 transition">Vs.
                                    Habit Apps</a></li>
                        </ul>
                    </div>

                    <div>
                        <p class="text-xs font-semibold text-slate-500 mb-5">Resources</p>
                        <ul class="space-y-4 text-sm font-bold text-slate-700">
                            <li><a href="{{ route('resources.help') }}" class="hover:text-indigo-600 transition">Help
                                    Center</a></li>
                            <li><a href="{{ route('resources.blog') }}"
                                    class="hover:text-indigo-600 transition">Blog</a></li>
                            <li><a href="{{ route('resources.changelog') }}"
                                    class="hover:text-indigo-600 transition">Changelog</a></li>
                            <li><a href="{{ route('resources.community') }}"
                                    class="hover:text-indigo-600 transition">Community</a></li>
                            <li><a href="{{ route('resources.stories') }}"
                                    class="hover:text-indigo-600 transition">Success Stories</a></li>
                            <li><a href="{{ route('resources.guide') }}" class="hover:text-indigo-600 transition">User
                                    Guide</a></li>
                            <li><a href="{{ route('resources.ai-trust') }}" class="hover:text-indigo-600 transition">AI
                                    Transparency</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p class="text-xs font-semibold text-slate-500 mb-5">Company</p>
                        <ul class="space-y-4 text-sm font-bold text-slate-700">
                            <li><a href="{{ route('company.privacy') }}"
                                    class="hover:text-indigo-600 transition">Privacy policy</a></li>
                            <li><a href="{{ route('company.terms') }}"
                                    class="hover:text-indigo-600 transition">Terms of service</a></li>
                            <li><a href="{{ route('company.refund') }}"
                                    class="hover:text-indigo-600 transition">Refund policy</a></li>
                            <li><a href="{{ route('company.contact') }}"
                                    class="hover:text-indigo-600 transition">Contact us</a></li>
                            <li><a href="{{ route('company.security') }}"
                                    class="hover:text-indigo-600 transition">Security</a></li>
                            <li><a href="{{ route('about') }}"
                                    class="hover:text-indigo-600 transition">About us</a></li>
                            <li><a href="{{ route('company.status') }}"
                                    class="hover:text-indigo-600 transition">System status</a></li>
                        </ul>
                    </div>


                    <div>
                        <p class="text-xs font-semibold text-slate-500 mb-5">Connect</p>
                        <div class="flex gap-4">
                            <a href="https://x.com/OneForMind" target="_blank" rel="noopener noreferrer"
                                class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm"
                                aria-label="Follow us on X">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 3.239h-2.19L17.607 20.65z" />
                                </svg>
                            </a>
                            <a href="https://instagram.com/oneformind" target="_blank" rel="noopener noreferrer"
                                class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm"
                                aria-label="Follow us on Instagram">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="https://facebook.com/oneformind" target="_blank" rel="noopener noreferrer"
                                class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm"
                                aria-label="Follow us on Facebook">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {{-- 🔥 FIX CONTRAST: Ganti slate-600 jadi slate-700 --}}
                <div
                    class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-700">
                    <p>&copy; {{ date('Y') }} OneForMind. All rights reserved.</p>
                    <p>Made with ❤️ for better focus.</p>
                </div>
            </div>
        </footer>
    </div>

    {{-- 3. Load Library --}}
    <script src="https://unpkg.com/htmx.org@1.9.10" defer></script>

    {{-- 4. NAVIGATION ENGINE --}}
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // HTMX Integration
            document.body.addEventListener('htmx:beforeSwap', (event) => {
                // If it's a boosted navigation, handle scroll
                if (event.detail.boosted) {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }
            });

            document.body.addEventListener('htmx:afterSwap', (event) => {
                // Tracking
                if (typeof fbq !== 'undefined') fbq('track', 'PageView');
                
                // Close menu just in case
                if (window.Alpine) {
                    // We can't easily access the scope here without a reference, 
                    // but our @click on links already handles this.
                }
            });
        });
    </script>
    <!-- Cookie Banner -->
    <x-cookie-banner />
    @stack('scripts')
</body>

</html>
