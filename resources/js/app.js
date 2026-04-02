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

const appName = import.meta.env.VITE_APP_NAME || 'Oneformind';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue')
        ),

    setup({ el, App, props, plugin }) {
        const activeLang = props.initialPage.props.locale || 'id';

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

    progress: false,
});

/**
 * 🔥 NPROGRESS PERFORMANCE CONFIG
 */
NProgress.configure({
    showSpinner: false,
    speed: 300,         // Smooth transition
    minimum: 0.3,       // Start at 30% for responsive feel
    trickleSpeed: 150,  // Natural progress speed
    easing: 'ease',
});

let nprogressTimeout = null;

router.on('start', () => {
    // Gunakan delay sangat kecil (50ms) untuk mencegah flicker pada page yang "kembali" (cache)
    // tapi tetap terasa instan untuk loading beneran.
    nprogressTimeout = setTimeout(() => NProgress.start(), 50);
});

router.on('finish', () => {
    clearTimeout(nprogressTimeout);
    NProgress.done();
});

router.on('error', () => {
    clearTimeout(nprogressTimeout);
    NProgress.done();
});

router.on('navigate', (event) => {
    if (typeof gtag !== 'undefined' && window.GA_MEASUREMENT_ID) {
        gtag('config', window.GA_MEASUREMENT_ID, {
            page_path: event.detail.page.url,
            page_title: document.title
        });
    }
});