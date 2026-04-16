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
        if (page.default.layout === undefined && !name.startsWith('Auth/') && name !== 'Welcome' && name !== 'Error') {
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
    // If the server tells us our assets are outdated (409 Conflict), auto-reload!
    if (event.detail.response && event.detail.response.status === 409) {
        event.preventDefault();
        console.warn('[OneForMind] Asset version mismatch detected. Auto-refreshing...');
        window.location.reload();
        return;
    }

    // Sometimes Vite/Inertia throws 404 when chunks are missing due to a new deploy
    if (event.detail.response && event.detail.response.status === 404) {
        event.preventDefault();
        console.warn('[OneForMind] Chunk/Page not found (404). Likely a new deployment. Auto-refreshing...');
        window.location.reload();
        return;
    }
    
    const response = event?.detail?.response;
    const status = response?.status;

    console.warn('[OneForMind] Invalid Inertia response detected. Status:', status);

    if (NProgress.isStarted()) NProgress.done();

    // Specific feedback for the user (can be replaced with a Toast later)
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

// Single Google Analytics & Meta Pixel tracking listener
router.on('navigate', (event) => {
    const url = event.detail.page.url;
    const pageTitle = document.title;

    // Google Analytics
    if (typeof gtag !== 'undefined' && window.GA_MEASUREMENT_ID) {
        gtag('config', window.GA_MEASUREMENT_ID, {
            page_path: url,
            page_title: pageTitle
        });
    }

    // Meta Pixel Tracking
    if (typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
        
        // 1. Awareness: ViewContent (Detailed lookup)
        if (url.includes('/features/')) {
            window.fbq('track', 'ViewContent', { content_name: pageTitle, content_category: 'Features', content_type: 'product' });
        } else if (url.includes('/pricing')) {
            window.fbq('track', 'ViewContent', { content_name: 'Pricing Plans', content_category: 'Pricing' });
        }

        // 2. Awareness: Search tracking (Catatan journal / data finance)
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('q') || searchParams.has('search')) {
            const query = searchParams.get('q') || searchParams.get('search');
            window.fbq('track', 'Search', { search_string: query });
        }

        // 3. Acquisition: CompleteRegistration (Detection after redirect from register)
        // Note: Usually triggered once, can be passed via session in a flash message
        if (event.detail.page.props.flash?.registration_success) {
            window.fbq('track', 'CompleteRegistration', { status: 'free_tier' });
        }
        
        // 4. Funnel: InitiateCheckout
        if (url.includes('/payment') && !url.includes('/status')) {
            window.fbq('track', 'InitiateCheckout', { currency: 'IDR' });
        }

        // 4b. Funnel: StartTrial (Detect from success message)
        const flashSuccess = event.detail.page.props.flash?.success;
        if (flashSuccess && (flashSuccess.includes('Masa percobaan') || flashSuccess.includes('Trial started'))) {
            window.fbq('track', 'StartTrial', { content_name: 'Architect Trial', days: 10 });
        }

        // 5. Revenue: Purchase & Subscribe (On status page / success)
        if (url.includes('/payment/status') || url.includes('tab=billing')) {
            const paymentSuccess = event.detail.page.props.flash?.success || event.detail.page.props.flash?.payment_success;
            // Hanya track jika ini adalah event sukses pembayaran baru (biasanya ada flash message)
            if (paymentSuccess && (paymentSuccess.includes('complete') || paymentSuccess.includes('berhasil') || paymentSuccess.includes('upgraded'))) {
                // Approximate values - the server CAPI will be more accurate, but browser helps deduplication
                window.fbq('track', 'Purchase', { currency: 'IDR' });
                window.fbq('track', 'Subscribe', { status: 'active' });
            }
        }
    }
});
