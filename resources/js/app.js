import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp, router } from '@inertiajs/vue3'; 
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { i18nVue, trans, loadLanguageAsync } from 'laravel-vue-i18n';

// 1. IMPORT NPROGRESS MANUAL
import NProgress from 'nprogress';

window.trans = trans; 

const appName = import.meta.env.VITE_APP_NAME || 'OneForMind';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    
    // 🔥 PERFORMANCE: Code Splitting (Lazy Loading)
    // Tanpa 'eager: true' agar JS di-load hanya saat halaman dibuka.
    resolve: (name) => resolvePageComponent(
        `./Pages/${name}.vue`, 
        import.meta.glob('./Pages/**/*.vue') 
    ),

    setup({ el, App, props, plugin }) {
        // 🔥 BRIDGE BAHASA: Ambil locale yang dikirim Laravel via HandleInertiaRequests
        const activeLang = props.initialPage.props.locale || 'id'; 
        
        // Pastikan bahasa dimuat sebelum app di-mount
        loadLanguageAsync(activeLang); 

        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(i18nVue, {
                lang: activeLang,
                resolve: async lang => {
                    const langs = import.meta.glob('../../lang/*.json');
                    return await langs[`../../lang/${lang}.json`]();
                }
            })
            .mount(el);
    },

    // 2. WAJIB FALSE: Karena pakai NProgress manual untuk kontrol penuh
    progress: false, 
});

/**
 * 🔥 LOGIC PROGRESS BAR (THE REAL FIX)
 * Konfigurasi ini memastikan loading bar muncul saat pindah halaman
 */
NProgress.configure({ 
    showSpinner: false, 
    speed: 400, 
    minimum: 0.2 
});

// Jalankan NProgress hanya pada navigasi internal (GET)
router.on('start', (event) => {
    const method = event.detail.visit.method.toLowerCase();
    if (method === 'get') {
        NProgress.start();
    }
});

router.on('finish', () => {
    NProgress.done();
});