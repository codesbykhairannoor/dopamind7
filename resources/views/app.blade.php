<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- 🛰️ PRIMARY SEO & AI AGENTS (Crawler First Priority) --}}
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" inertia>
    <meta name="googlebot" content="index, follow" inertia>
    <link rel="canonical" href="{{ url()->current() }}" inertia>
    <link rel="alternate" hreflang="id" href="{{ url()->current() }}?lang=id" inertia>
    <link rel="alternate" hreflang="en" href="{{ url()->current() }}?lang=en" inertia>
    <link rel="alternate" hreflang="x-default" href="{{ url()->current() }}" inertia>
    
    {{-- 🏷️ CORE BRANDING --}}
    <title inertia>OneForMind - {{ app()->getLocale() === 'id' ? 'Satu Aplikasi Produktivitas Terpadu' : 'Unified Productivity OS' }}</title>
    <meta name="description" content="{{ app()->getLocale() === 'id' ? 'OneForMind: Satu aplikasi produktivitas terpadu untuk keuangan, kebiasaan, dan rencana harian dalam satu dashboard minimalis.' : 'OneForMind: The unified productivity OS for finances, atomic habits, and daily planning in one minimalist dashboard.' }}" inertia>

    {{-- ⚡ PERFORMANCE HINTS --}}
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link rel="dns-prefetch" href="https://res.cloudinary.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    {{-- GLOBAL GEOGRAPHIC TAGS (Non-Country Specific for Global Reach) --}}
    <meta name="geo.region" content="ID" inertia />
    <meta name="geo.placename" content="Indonesia" inertia />
    <meta name="ICBM" content="-6.200000, 106.816666" inertia />

    <meta name="theme-color" content="#4f46e5" inertia>
    <meta name="mobile-web-app-capable" content="yes" inertia>
    <meta name="apple-mobile-web-app-capable" content="yes" inertia>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" inertia>
    <meta name="apple-mobile-web-app-title" content="Oneformind" inertia>
    <link rel="apple-touch-icon" href="/favicon.png">

    {{-- PWA Splash Screens (iOS) --}}
    <link rel="apple-touch-startup-image" href="/favicon.png" inertia>

    <link rel="manifest" href="/build/manifest.webmanifest">

    <meta property="og:title"
        content="Oneformind — {{ app()->getLocale() === 'id' ? 'Satu Aplikasi Produktivitas Terpadu' : 'The Unified Productivity OS' }}"
        inertia>
    <meta property="og:description"
        content="{{ app()->getLocale() === 'id' ? 'Satu aplikasi produktivitas untuk segalanya. Kelola keuangan, kebiasaan, dan rencana harian dalam satu dashboard minimalis.' : 'The only productivity app you need. Manage finances, habits, and daily plans in one unified, minimalist dashboard.' }}"
        inertia>
    <meta property="og:image" content="{{ url('/favicon.svg') }}" inertia>

    <meta http-equiv="x-dns-prefetch-control" content="on">

    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon.png') }}">

    <!-- Fonts Optimasi: Single Request + Swap -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
        rel="stylesheet" media="print" onload="this.media='all'">
    <noscript>
        <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
            rel="stylesheet">
    </noscript>

    <!-- 🔥 ANTI-FLICKER DARK MODE SCRIPT -->
    <script>
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    </script>

    <!-- Scripts -->
    <link rel="stylesheet" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap"
        media="print" onload="this.media='all'" />

    <style>
        /* NProgress Inline */
        #nprogress {
            pointer-events: none
        }

        #nprogress .bar {
            background: #4f46e5;
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px
        }

        #nprogress .peg {
            display: block;
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px #4f46e5, 0 0 5px #4f46e5;
            opacity: 1;
            -webkit-transform: rotate(3deg) translate(0, -4px);
            -ms-transform: rotate(3deg) translate(0, -4px);
            transform: rotate(3deg) translate(0, -4px)
        }

        #nprogress .spinner {
            display: block;
            position: fixed;
            z-index: 1031;
            top: 15px;
            right: 15px
        }

        #nprogress .spinner-icon {
            width: 18px;
            height: 18px;
            box-sizing: border-box;
            border: 2px solid transparent;
            border-top-color: #4f46e5;
            border-left-color: #4f46e5;
            border-radius: 50%;
            -webkit-animation: nprogress-spinner 400ms linear infinite;
            animation: nprogress-spinner 400ms linear infinite
        }

        .nprogress-custom-parent {
            overflow: hidden;
            position: relative
        }

        .nprogress-custom-parent #nprogress .bar,
        .nprogress-custom-parent #nprogress .spinner {
            position: absolute
        }

        @-webkit-keyframes nprogress-spinner {
            0% {
                -webkit-transform: rotate(0)
            }

            100% {
                -webkit-transform: rotate(360deg)
            }
        }

        @keyframes nprogress-spinner {
            0% {
                transform: rotate(0)
            }

            100% {
                transform: rotate(360deg)
            }
        }
    </style>

    @routes
    @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])

    @inertiaHead

    {{-- 🧩 STRUCTURED DATA (Sitelinks & Organization) --}}
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "OneForMind",
      "url": "{{ url('/') }}",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "{{ url('/') }}/resources/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
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
          "name": "{{ app()->getLocale() === 'id' ? 'Harga & Paket' : 'Pricing' }}",
          "url": "{{ route('pricing.index') }}"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "{{ app()->getLocale() === 'id' ? 'Masuk' : 'Login' }}",
          "url": "{{ route('login') }}"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "{{ app()->getLocale() === 'id' ? 'Daftar Sekarang' : 'Sign Up' }}",
          "url": "{{ route('register') }}"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Blog & Resources",
          "url": "{{ route('resources.blog') }}"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Habit Tracker",
          "url": "{{ route('features.habit') }}"
        }
      ]
    }
    </script>

    <style>
        /* Reset body top dari sisa-sisa Google Translate */
        body {
            top: 0px !important;
            position: static !important;
        }

        /* Custom scrollbar supaya senada dengan desain app */
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

        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
    </style>

    <!-- Duitku POP SDK -->
    @if(config('duitku.env') === 'production')
        <script src="https://passport.duitku.com/lib/js/duitku.js"></script>
    @else
        <script src="https://app-sandbox.duitku.com/lib/js/duitku.js"></script>
    @endif
</head>
@if(env('VITE_GA_MEASUREMENT_ID'))
    <script>
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
                    function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());
                    window.GA_MEASUREMENT_ID = '{{ env('VITE_GA_MEASUREMENT_ID') }}';
                    gtag('config', window.GA_MEASUREMENT_ID);
                };
            };
            const interactionEvents = ['mouseover', 'keydown', 'touchmove', 'touchstart', 'scroll'];
            interactionEvents.forEach(event => window.addEventListener(event, loadGTM, { once: true, passive: true }));
            setTimeout(loadGTM, 3500);
        });
    </script>
@endif

<body class="font-sans antialiased selection:bg-indigo-500 selection:text-white">
    @if(request()->routeIs('dashboard'))
        {{-- PREMIUM LOADER (Booting Effect) --}}
        <div id="neuro-loader"
            class="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-700">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4f46e510_0,transparent_50%)]"></div>
            <div class="absolute inset-0 bg-pattern-grid opacity-[0.03]"></div>

            <div class="relative z-10 flex flex-col items-center text-center">
                <div
                    class="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.2)] animate-bounce mb-8">
                    <img src="{{ asset('favicon.svg') }}" alt="Logo" class="w-10 h-10 brightness-0 invert" />
                </div>
                <h2 class="text-slate-900 text-xl font-black tracking-[0.2em] uppercase mb-4 animate-pulse">Initializing
                    System</h2>
                <div class="w-48 h-0.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-500 w-1/2 animate-[loading_1.5s_infinite_ease-in-out]"></div>
                </div>
            </div>
            <style>
                @keyframes loading {
                    0% {
                        transform: translateX(-100%);
                    }

                    100% {
                        transform: translateX(400%);
                    }
                }
            </style>
        </div>
    @endif

    @inertia

    <script>
        // Hapus loader saat Inertia selesai render komponen pertama
        document.addEventListener('inertia:finish', function () {
            const loader = document.getElementById('neuro-loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 700);
            }
        }, { once: true });

        // Fallback: Jika terjadi error atau loading terlalu lama
        window.addEventListener('load', function () {
            setTimeout(() => {
                const loader = document.getElementById('neuro-loader');
                if (loader && loader.style.opacity !== '0') {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 700);
                }
            }, 3000);
        });
    </script>
</body>

</html>