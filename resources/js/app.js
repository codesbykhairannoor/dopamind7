import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp, router } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { i18nVue, trans } from 'laravel-vue-i18n';
import NProgress from 'nprogress';

window.trans = trans;

const appName = import.meta.env.VITE_APP_NAME || 'OneForMind';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue')
        ),

    // 🔥 MAGIC FIX 1: Hapus kata 'async' dari setup. Kita buat jalannya synchronous.
    setup({ el, App, props, plugin }) { 
        const activeLang = props.initialPage.props.locale || 'id';

        const vueApp = createApp({
            render: () => h(App, props),
        });

        vueApp
            .use(plugin)
            .use(ZiggyVue, window.Ziggy)
            .use(i18nVue, {
                lang: activeLang,
                fallbackLang: 'id', // Opsional tapi bagus: jaga-jaga kalau bahasa hilang
                // 🔥 MAGIC FIX 2: Tambahkan { eager: true } pada import.meta.glob
                // Ini memaksa Vite untuk memasukkan JSON langsung ke dalam bundle JS,
                // sehingga tidak ada delay/loading yang bikin teks berubah jadi key.
                resolve: lang => {
                    const langs = import.meta.glob('../../lang/*.json', { eager: true });
                    return langs[`../../lang/${lang}.json`].default;
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
    speed: 500,         // Kecepatan animasi pas bar nambah (ms)
    minimum: 0.3,       // Langsung mulai di 30% biar kerasa "ngebut"
    trickle: true,      // WAJIB: Bar bakal jalan terus meskipun server belum respon
    trickleSpeed: 200,  // Setiap 0.2 detik bar bakal nambah dikit secara otomatis
});

router.on('start', (event) => {
    if (event.detail.visit.method.toLowerCase() === 'get') {
        NProgress.start();
    }
});

// Gunakan 'finish' untuk stop
router.on('finish', (event) => {
    NProgress.done();
});

// Opsional: Kalau ada error, matiin bar-nya juga
router.on('error', () => {
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