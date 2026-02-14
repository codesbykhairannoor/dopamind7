import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, h } from 'vue';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy'; //
import { i18nVue } from 'laravel-vue-i18n'; //

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')), //
        setup({ App, props, plugin }) {
            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(ZiggyVue, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                })
                .use(i18nVue, {
                    lang: props.initialPage.props.locale || 'id',
                    resolve: async lang => {
                        const langs = import.meta.glob('../../lang/*.json');
                        return await langs[`../../lang/${lang}.json`]();
                    }
                });
        },
    })
);