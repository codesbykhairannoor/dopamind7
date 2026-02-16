<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
     <meta name="description" content="{{ app()->getLocale() === 'id' ? 'Satu aplikasi produktivitas untuk segalanya. Kelola keuangan, kebiasaan, dan rencana harian dalam satu dashboard minimalis.' : 'The only productivity app you need. Manage finances, habits, and daily plans in one unified, minimalist dashboard.' }}" inertia>
        
        <meta property="og:title" content="{{ config('app.name', 'OneForMind') }} — {{ app()->getLocale() === 'id' ? 'Satu Aplikasi Produktivitas Terpadu' : 'The Unified Productivity OS' }}" inertia>
        <meta property="og:description" content="{{ app()->getLocale() === 'id' ? 'Satu aplikasi produktivitas untuk segalanya. Kelola keuangan, kebiasaan, dan rencana harian dalam satu dashboard minimalis.' : 'The only productivity app you need. Manage finances, habits, and daily plans in one unified, minimalist dashboard.' }}" inertia>
        <meta property="og:image" content="{{ asset('favicon.svg') }}" inertia>
        
        <title inertia>{{ config('app.name', 'OneForMind') }} — {{ app()->getLocale() === 'id' ? 'Satu Aplikasi Produktivitas Terpadu' : 'The Unified Productivity OS' }}</title>

        <link rel="icon" type="image/x-icon" href="/favicon.svg?v=2">
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.svg?v=2">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" />
        <link rel="stylesheet" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" media="print" onload="this.media='all'" />

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
    <body class="font-sans antialiased selection:bg-indigo-500 selection:text-white">
        @inertia
    </body>
</html>