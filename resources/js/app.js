import './bootstrap';
import '../css/app.css';
import { registerSW } from 'virtual:pwa-register';

// PWA Service Worker Registration
registerSW({ immediate: true });

import { createApp, h } from 'vue';
import { createInertiaApp, router, Link } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { i18nVue, trans } from 'laravel-vue-i18n';
import NProgress from 'nprogress';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';

window.trans = trans;

const appName = window.document.getElementsByTagName('title')[0]?.innerText || import.meta.env.VITE_APP_NAME || 'Oneformind';

/**
 * 🔥 SUPER-ROBUST BOOT SEQUENCE
 * Menangani masalah di mana dataset.page mungkin null atau tidak terbaca karena 
 * batasan keamanan di environment tertentu (misal SES/Lockdown dari SDK Duitku).
 */
const el = document.getElementById('app');
let initialPage = null;

if (el) {
    try {
        // Coba baca lewat dataset dulu (standard), fallback ke getAttribute jika dataset diblokir
        const pageData = el.dataset.page || el.getAttribute('data-page');
        if (pageData) {
            initialPage = JSON.parse(pageData);
        }
    } catch (e) {
        console.error('[OneForMind] Failed to parse initial page data:', e);
    }
}

createInertiaApp({
    id: 'app',
    page: initialPage, // Berikan data awal secara eksplisit untuk menghindari internal failure di library
    title: (title) => `${title} - ${appName}`,

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue')
        ),

    setup({ el, App, props, plugin }) {
        // 🔥 Robust Locale Detection
        let activeLang = 'id';
        try {
            // Cek shared props dari data awal atau gunakan data-lang di root
            activeLang = props?.props?.locale || document.documentElement.lang || 'id';
        } catch (e) {
            console.warn('[OneForMind] Locale detection fallback used.', e);
        }

        const vueApp = createApp({
            render: () => h(App, props),
        });

        vueApp
            .use(plugin)
            .use(ZiggyVue, window.Ziggy)
            .component('Link', Link)
            .component('OneForMindIcon', OneForMindIcon)
            .use(i18nVue, {
                lang: activeLang,
                fallbackLang: 'id',
                resolve: lang => {
                    const langs = import.meta.glob('../../lang/*.json', { eager: true });
                    const langPath = `../../lang/${lang}.json`;
                    return langs[langPath] ? langs[langPath].default : {};
                },
            });

        vueApp.mount(el);
    },

    progress: {
        color: '#4f46e5',
        showSpinner: false,
        delay: 0,
    },
});

// Single Google Analytics tracking listener
router.on('navigate', (event) => {
    if (typeof gtag !== 'undefined' && window.GA_MEASUREMENT_ID) {
        gtag('config', window.GA_MEASUREMENT_ID, {
            page_path: event.detail.page.url,
            page_title: document.title
        });
    }
});