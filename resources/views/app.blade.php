<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <meta name="description" content="{{ app()->getLocale() === 'id' ? 'Satu aplikasi produktivitas untuk segalanya. Kelola keuangan, kebiasaan, dan rencana harian dalam satu dashboard minimalis.' : 'The only productivity app you need. Manage finances, habits, and daily plans in one unified, minimalist dashboard.' }}" inertia>
        <title inertia>{{ config('app.name', 'OneForMind') }} — {{ app()->getLocale() === 'id' ? 'Satu Aplikasi Produktivitas Terpadu' : 'All-in-One Productivity OS' }}</title>

        <script>
            if (localStorage.getItem('oneformind_theme') === 'dark' || (!('oneformind_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        </script>

        <link rel="icon" type="image/x-icon" href="/favicon.svg?v=2">
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.svg?v=2">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" />
        <link rel="stylesheet" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" media="print" onload="this.media='all'" />

        @routes
        @vite(['resources/css/app.css', 'resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        
        @inertiaHead

        <style>
            body { top: 0px !important; position: static !important; }
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: #f1f5f9; }
            /* Mode Gelap Scrollbar Track */
            html.dark ::-webkit-scrollbar-track { background: #0f172a; }
            ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
            ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        </style>
    </head>
    
    @if(env('VITE_GA_MEASUREMENT_ID'))
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ env('VITE_GA_MEASUREMENT_ID') }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            window.GA_MEASUREMENT_ID = '{{ env('VITE_GA_MEASUREMENT_ID') }}';
            gtag('config', window.GA_MEASUREMENT_ID);
        </script>
    @endif
    
    <body class="font-sans antialiased selection:bg-indigo-500 selection:text-white dark:bg-slate-900 transition-colors duration-300">
        @inertia
    </body>
</html>