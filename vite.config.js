import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'path';

// ==========================================================
// 🔥 MESIN AUTO-MERGE JSON TRANSLATIONS 🔥
// ==========================================================
function mergeTranslations() {
    const mergeFiles = () => {
        try {
            const langs = ['id', 'en']; // Daftar bahasa

            langs.forEach(lang => {
                const partialsDir = path.resolve(process.cwd(), `lang/partials/${lang}`);
                const outputFile = path.resolve(process.cwd(), `lang/${lang}.json`);

                if (fs.existsSync(partialsDir)) {
                    let mergedContent = {};
                    const files = fs.readdirSync(partialsDir).filter(f => f.endsWith('.json'));

                    files.forEach(file => {
                        const content = fs.readFileSync(path.join(partialsDir, file), 'utf-8');
                        try {
                            mergedContent = { ...mergedContent, ...JSON.parse(content) };
                        } catch (e) {
                            console.error(`❌ Gagal membaca file JSON: ${file}`, e);
                        }
                    });

                    fs.writeFileSync(outputFile, JSON.stringify(mergedContent, null, 4));
                }
            });
        } catch (error) {
            console.error('❌ Plugin merge-translations gagal!', error);
        }
    };

    return {
        name: 'merge-translations',
        // 1. Jalan otomatis saat lo ngetik 'npm run dev' atau 'npm run build'
        buildStart() {
            mergeFiles();
        },
        // 2. Jalan otomatis saat lo nge-save file di dalam folder 'lang/partials' (HMR)
        handleHotUpdate({ file, server }) {
            // Deteksi perubahan di folder partials (Bisa Windows '\' atau Mac/Linux '/')
            if (file.includes('lang/partials') || file.includes('lang\\partials')) {
                mergeFiles();
                // Paksa browser nge-refresh biar text barunya langsung muncul di layar
                server.ws.send({ type: 'full-reload' });
            }
        }
    };
}


// ==========================================================
// 🚀 KONFIGURASI UTAMA VITE 🚀
// ==========================================================
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
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
                cleanupOutdatedCaches: true,
                navigateFallback: null,
            },
            manifest: {
                name: 'OneForMind',
                short_name: 'OneForMind',
                description: 'Master Your Mind, Elevate Your Life.',
                theme_color: '#4f46e5',
                background_color: '#4f46e5',
                display: 'standalone',
                orientation: 'portrait',
                scope: '/',
                start_url: '/dashboard',
                icons: [
                    {
                        src: '/favicon.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: '/favicon.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    }
                ]
            }
        }),
        mergeTranslations(), // 🔥 PANGGIL MESIN TRANSLATION DI SINI
    ],
    // 🔥 BUILD SETTINGS (Standard)
});
