import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression'; // 🔥 1. Import plugin kompresinya

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
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
        // 🔥 2. Panggil pluginnya di sini biar Vite bikin file .gz otomatis
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
        }),
    ],
    // 🔥 3. THE MAGIC TRICK: Vendor Splitting
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Kalau kode itu berasal dari folder node_modules (Vue, Inertia, SweetAlert, dll)
                    if (id.includes('node_modules')) {
                        // Pisahkan jadi file bernama 'vendor.js'
                        return 'vendor'; 
                    }
                }
            }
        }
    }
});