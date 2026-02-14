import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { i18nVue } from 'laravel-vue-i18n';

// 🔥 1. IMPORT PETA RUTE YANG BARU DIBIKIN
import { Ziggy } from './ziggy.js';

const appName = import.meta.env.VITE_APP_NAME || 'OneForMind';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
        setup({ App, props, plugin }) {
            const activeLang = page.props.locale || 'id';

            // 🔥 2. GABUNGKAN PETA RUTE DENGAN URL SAAT INI
            const ziggyConfig = {
                ...Ziggy,
                location: new URL(page.props.ziggy?.location || 'https://oneformind.com'),
            };

            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                // 🔥 3. MASUKIN CONFIG-NYA KE ZIGGYVUE
                .use(ZiggyVue, ziggyConfig)
                .use(i18nVue, {
                    lang: activeLang,
                    resolve: lang => {
                        const langs = import.meta.glob('../../lang/*.json', { eager: true });
                        return langs[`../../lang/${lang}.json`].default;
                    }
                });
        },
    })
);