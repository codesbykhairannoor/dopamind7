<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
   <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        <meta name="description" content="{{ app()->getLocale() === 'id' ? 'Satu aplikasi produktivitas untuk segalanya. Kelola keuangan, kebiasaan, dan rencana harian dalam satu dashboard minimalis.' : 'The only productivity app you need. Manage finances, habits, and daily plans in one unified, minimalist dashboard.' }}" inertia>

        <title inertia>Oneformind - {{ app()->getLocale() === 'id' ? 'Satu Aplikasi Produktivitas Terpadu' : 'All-in-One Productivity OS' }}</title>

        {{-- Geo-SEO & Location Tags --}}
        <meta name="geo.region" content="ID-JK" inertia />
        <meta name="geo.placename" content="Jakarta" inertia />
        <meta name="geo.position" content="-6.2088;106.8456" inertia />
        <meta name="ICBM" content="-6.2088, 106.8456" inertia />

        {{-- Mobile Optimization --}}
        <meta name="theme-color" content="#4f46e5" inertia>
        <meta name="apple-mobile-web-app-capable" content="yes" inertia>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" inertia>
        <meta name="apple-mobile-web-app-title" content="Oneformind" inertia>
        <link rel="apple-touch-icon" href="/favicon.png">
        
        {{-- PWA Splash Screens (iOS) --}}
        <link rel="apple-touch-startup-image" href="/favicon.png" inertia>
        
        <link rel="manifest" href="/build/manifest.webmanifest">

        <meta property="og:title" content="Oneformind — {{ app()->getLocale() === 'id' ? 'Satu Aplikasi Produktivitas Terpadu' : 'The Unified Productivity OS' }}" inertia>
        <meta property="og:description" content="{{ app()->getLocale() === 'id' ? 'Satu aplikasi produktivitas untuk segalanya. Kelola keuangan, kebiasaan, dan rencana harian dalam satu dashboard minimalis.' : 'The only productivity app you need. Manage finances, habits, and daily plans in one unified, minimalist dashboard.' }}" inertia>
        <meta property="og:image" content="{{ url('/favicon.svg') }}" inertia>

        <meta http-equiv="x-dns-prefetch-control" content="on">
        <link rel="dns-prefetch" href="https://fonts.bunny.net">

        <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon.png') }}">
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">

        <!-- 🔥 ANTI-FLICKER DARK MODE SCRIPT -->
        <script>
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        </script>

        <!-- Scripts -->
        <link rel="stylesheet" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" media="print" onload="this.media='all'" />

        <style>
            /* NProgress Inline */
            #nprogress{pointer-events:none}#nprogress .bar{background:#4f46e5;position:fixed;z-index:1031;top:0;left:0;width:100%;height:3px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;box-shadow:0 0 10px #4f46e5,0 0 5px #4f46e5;opacity:1;-webkit-transform:rotate(3deg) translate(0,-4px);-ms-transform:rotate(3deg) translate(0,-4px);transform:rotate(3deg) translate(0,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:1031;top:15px;right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:2px solid transparent;border-top-color:#4f46e5;border-left-color:#4f46e5;border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
        </style>

        @routes
        @vite(['resources/css/app.css', 'resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        
        @inertiaHead

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
                        function gtag(){dataLayer.push(arguments);}
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
        @inertia
    </body>
</html>
