<script>
import BlankLayout from '@/Layouts/GuestLayout.vue'; // You might not even need a layout if you want it completely raw, but usually we need one to avoid inheriting the persistent layout
import { defineComponent } from 'vue';

export default defineComponent({
    layout: null // Explicitly disable any persistent layouts like AuthenticatedLayout
});
</script>

<script setup>
import { computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import { trans } from 'laravel-vue-i18n';

const props = defineProps({ status: Number });

const title = computed(() => {
    return {
        503: trans('error_title_503'),
        500: trans('error_title_500'),
        404: trans('error_title_404'),
        403: trans('error_title_403'),
    }[props.status] || trans('error_title_default');
});

const description = computed(() => {
    return {
        503: trans('error_desc_503'),
        500: trans('error_desc_500'),
        404: trans('error_desc_404'),
        403: trans('error_desc_403'),
    }[props.status] || trans('error_desc_default');
});
</script>

<template>
    <Head :title="title" />
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        
        <div class="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-indigo-100 dark:shadow-none max-w-md border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div class="text-7xl mb-6 relative z-10 drop-shadow-xl">{{ props.status === 404 ? '🛸' : '🛠️' }}</div>
            <h1 class="text-3xl font-black text-slate-800 dark:text-white mb-3 tracking-tight relative z-10">{{ title }}</h1>
            <p class="text-slate-500 dark:text-slate-400 font-bold mb-10 leading-relaxed relative z-10">
                {{ description }}
            </p>
            <a href="/" class="relative z-10 inline-block w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95 transition-all">
                {{ $t('error_btn_back', 'Kembali ke Beranda') }}
            </a>
        </div>
        
    </div>
</template>