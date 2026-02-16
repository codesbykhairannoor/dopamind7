import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import forms from '@tailwindcss/typography'; // Tambahan plugin untuk styling konten teks panjang seperti artikel, deskripsi, dll.

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Opsional: Biar aman kalau nanti mau main Dark Mode

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                // Set Default Font ke Plus Jakarta Sans
                sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Warna Brand OneForMind
                brand: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe', // Tambahan shading biar lengkap
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1', // Indigo standard
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                }
            }
        },
    },

    // BAGIAN PENTING: Plugins digabung jadi SATU array di sini
    plugins: [
        forms,
        require("tailwindcss-animate"), 
    ],
};