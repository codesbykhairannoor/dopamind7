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
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const activeLang = props.initialPage.props.locale || 'id'; 
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
    // 2. WAJIB FALSE: Karena kita ambil alih kontrolnya manual di bawah
    progress: false, 
});

/**
 * 🔥 LOGIC PROGRESS BAR (THE REAL FIX)
 */

// Konfigurasi tambahan biar makin smooth (opsional)
NProgress.configure({ 
    showSpinner: false, 
    speed: 400, 
    minimum: 0.2 
});

router.on('start', (event) => {
    const method = event.detail.visit.method.toLowerCase();

    // RULE: Hanya jalan kalau navigasi biasa (GET)
    // POST, PUT, PATCH, DELETE (Proses CRUD) dicuekin
    if (method === 'get') {
        NProgress.start();
    }
});

// WAJIB: Biar barnya ilang pas halaman selesai loading
router.on('finish', () => {
    NProgress.done();
});