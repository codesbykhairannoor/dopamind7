<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <meta name="description" content="Oneformind - All-in-one tracker for habits, finances, and daily planning built for the exhausted high-achiever.">

        <title inertia>{{ config('app.name', 'Oneformind') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" />
        <link rel="stylesheet" href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" media="print" onload="this.media='all'" />

        @routes
        @vite(['resources/css/app.css', 'resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead

        <style>
            /* Fix Cumulative Layout Shift (CLS) */
            body { 
                top: 0px !important; 
                position: static !important;
                font-display: swap;
                -webkit-font-smoothing: antialiased;
            }
            
            /* UI Cleanup */
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: #f1f5f9; }
            ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
            ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        </style>
    </head>
    <body class="font-sans antialiased">
        @inertia
        
        <script type="text/javascript">
            function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                    pageLanguage: 'id', 
                    includedLanguages: 'en,id',
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                }, 'google_translate_element');
            }
        </script>
        <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async defer></script>
    </body>
</html>