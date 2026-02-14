<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <meta name="description" content="OneForMind - Your ultimate personal development and productivity tracker.">

        <title inertia>{{ config('app.name', 'OneForMind') }}</title>

        <link rel="icon" type="image/x-icon" href="/favicon.svg?v=2">
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.svg?v=2">

        <link rel="preconnect" href="https://fonts.bunny.net">
        
        <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" />
<link rel="stylesheet" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" media="print" onload="this.media='all'" />

        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
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
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>