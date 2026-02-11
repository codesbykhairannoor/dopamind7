import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { i18nVue, trans, loadLanguageAsync } from 'laravel-vue-i18n'; // 1. Import loadLanguageAsync

// Tempel ke window biar Composable bisa baca
window.trans = trans; 

const appName = import.meta.env.VITE_APP_NAME || 'DopaMind';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        // 2. Ambil locale dari props Inertia (pastikan backend kirim ini lewat HandleInertiaRequests middleware)
        // Kalau ga ada props locale, default ke 'id'
        const activeLang = props.initialPage.props.locale || 'id'; 
        
        // 3. Paksa load bahasa yang aktif
        loadLanguageAsync(activeLang); 

        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(i18nVue, {
                lang: activeLang, // Set default lang saat init
                resolve: async lang => {
                    const langs = import.meta.glob('../../lang/*.json');
                    return await langs[`../../lang/${lang}.json`]();
                }
            })
            .mount(el);
    },
   progress: {
        // Warna bar yang muncul di atas
        color: '#4f46e5', // Warna Indigo biar senada sama brand DopaMind
        // Apakah ingin menampilkan spinner di pojok?
        showSpinner: false,
    },
});