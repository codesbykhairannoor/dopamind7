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
            const rootDir = process.cwd();
            const partialsBaseDir = path.resolve(rootDir, 'lang/partials');
            
            if (!fs.existsSync(partialsBaseDir)) return;

            // Deteksi semua folder bahasa secara dinamis (id, en, dll)
            const langs = fs.readdirSync(partialsBaseDir).filter(f => 
                fs.statSync(path.join(partialsBaseDir, f)).isDirectory()
            );

            langs.forEach(lang => {
                const partialsDir = path.join(partialsBaseDir, lang);
                const outputFile = path.resolve(rootDir, `lang/${lang}.json`);

                let mergedContent = {};
                // Ambil semua file JSON, sortir biar urutan merge konsisten (abjad)
                const files = fs.readdirSync(partialsDir).filter(f => f.endsWith('.json')).sort();

                files.forEach(file => {
                    try {
                        const content = fs.readFileSync(path.join(partialsDir, file), 'utf-8');
                        const json = JSON.parse(content);
                        mergedContent = { ...mergedContent, ...json };
                    } catch (e) {
                        console.error(`❌ Gagal membaca/parse JSON: ${lang}/${file}`, e);
                    }
                });

                // Tulis hasil merge ke file utama
                fs.writeFileSync(outputFile, JSON.stringify(mergedContent, null, 4));
            });
            
            console.log(`[i18n] ✅ ${new Date().toLocaleTimeString()} - Merged partials for: ${langs.join(', ')}`);
        } catch (error) {
            console.error('❌ Plugin merge-translations gagal!', error);
        }
    };

    return {
        name: 'merge-translations',
        // 1. Tambahkan watcher manual biar Vite mantau folder partials
        configureServer(server) {
            server.watcher.add(path.resolve(process.cwd(), 'lang/partials/**'));
        },
        // 2. Jalankan saat build atau dev start
        buildStart() {
            mergeFiles();
        },
        // 3. Jalankan saat ada file di partials yang di-edit
        handleHotUpdate({ file, server }) {
            const normalizedPath = file.replace(/\\/g, '/');
            if (normalizedPath.includes('lang/partials/')) {
                mergeFiles();
                // Paksa reload browser agar i18n memuat ulang JSON terbaru
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
            refresh: [
                'resources/views/**',
                'routes/**',
                'lang/*.json', // Pantau file hasil merge juga biar aman
            ],
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