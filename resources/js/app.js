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
 * 🔥 NPROGRESS
 */


NProgress.configure({
    showSpinner: false,
    speed: 250,         // Even faster animation
    minimum: 0.6,       // Start at 60% for "instant" feel
    trickle: true,
    trickleSpeed: 100,  // Faster trickle
});

router.on('start', (event) => {
    if (event.detail.visit.method.toLowerCase() === 'get') {
        NProgress.start(); // Langsung mulai 0ms
    }
});

router.on('finish', (event) => {
    NProgress.done();
});

router.on('error', () => {
    clearTimeout(timeout);
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