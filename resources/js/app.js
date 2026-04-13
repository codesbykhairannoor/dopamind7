import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp, router, Link } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { i18nVue, trans } from 'laravel-vue-i18n';
import NProgress from 'nprogress';
import OneForMindIcon from '@/Components/OneForMindIcon.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

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

    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue')
        );

        // 🔥 PERSISTENT LAYOUT CONFIGURATION
        // All pages in Pages/Auth/ remain public (GuestLayout or no layout)
        // Others (Dashboard, Habits, etc.) automatically use AuthenticatedLayout
        if (page.default.layout === undefined && !name.startsWith('Auth/') && name !== 'Welcome') {
            page.default.layout = AuthenticatedLayout;
        }

        return page;
    },

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
        delay: 250,
        includeCSS: true,
    },
});

// Note: Standard NProgress start/done/finish is now handled internally by Inertia progress config above.

/**
 * Handle "Invalid" responses (e.g. 500 pages, session expirations, or 409 mismatch) 
 * that are not valid Inertia responses. This prevents the "NP progress then stop" dead-end.
 */
router.on('invalid', (event) => {
    const response = event?.detail?.response;
    const status = response?.status;

    console.warn('[OneForMind] Invalid Inertia response detected. Status:', status);

    if (NProgress.isStarted()) NProgress.done();

    // Specific feedback for the user (can be replaced with a Toast later)
    if (status === 409) {
        console.error('[OneForMind] Version mismatch detected. Refreshing...');
        window.location.reload();
        return;
    }

    if (status === 401 || status === 419) {
        alert('Sesi Anda telah berakhir. Silakan login kembali.');
        window.location.href = route('login');
        return;
    }

    const inertiaLocation =
        response?.headers?.get?.('X-Inertia-Location') ??
        response?.headers?.get?.('x-inertia-location');

    if (inertiaLocation) {
        window.location.href = inertiaLocation;
        return;
    }

    if (response?.url) {
        window.location.href = response.url;
        return;
    }

    // fallback reload for debugging
    // window.location.reload(); 
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
