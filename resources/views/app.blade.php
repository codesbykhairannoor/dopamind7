<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'OneForMind') }}</title>

        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2">
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=2">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap" rel="stylesheet" />

        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead

        <style>
            /* Sembunyikan Top Bar Google */
            .goog-te-banner-frame.skiptranslate { display: none !important; }
            body { top: 0px !important; }
            
            /* Styling Dropdown Asli Google biar gak berantakan */
            .goog-te-gadget {
                font-family: 'Plus Jakarta Sans', sans-serif !important;
                font-size: 0px !important; /* Trik sembunyiin teks 'Powered by Google' */
                color: transparent !important;
            }
            
            .goog-te-gadget .goog-te-combo {
                color: #4f46e5; /* Text Indigo */
                background-color: white;
                border: 1px solid #e0e7ff;
                padding: 6px 10px;
                border-radius: 50px; /* Buletin biar cakep */
                font-weight: bold;
                font-size: 13px;
                cursor: pointer;
                outline: none;
                margin: 0 !important;
            }
        </style>
    </head>
    <body class="font-sans antialiased">
        @inertia
        
        <script type="text/javascript">
            function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                    pageLanguage: 'id', 
                    includedLanguages: 'en,id', // Cuma Inggris & Indo
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                }, 'google_translate_element');
            }
        </script>
        <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    </body>
</html>