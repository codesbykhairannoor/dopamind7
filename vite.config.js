import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({

    server: {
        host: '127.0.0.1',
        port: 5173,
    },
    plugins: [
        laravel({
           input: [
                'resources/css/app.css', 
                'resources/js/app.js'
            ],
            ssr: 'resources/js/ssr.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    build: {
        // 🔥 STRATEGI BARU: Pecah Vendor jadi Spesifik
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // Pisahkan Vue & kawan-kawannya
                        if (id.includes('@vue') || id.includes('vue')) {
                            return 'vendor-vue';
                        }
                        // Pisahkan Inertia
                        if (id.includes('@inertiajs')) {
                            return 'vendor-inertia';
                        }
                        // Pisahkan library lain (misal lodash, axios, sweetalert)
                        if (id.includes('axios') || id.includes('lodash') || id.includes('sweetalert')) {
                            return 'vendor-utils';
                        }
                        // Sisanya masuk ke vendor-core
                        return 'vendor-core';
                    }
                }
            }
        }
    }
});