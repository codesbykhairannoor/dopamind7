<script setup>
import { computed } from 'vue';
import { Head } from '@inertiajs/vue3';

const props = defineProps({ status: Number });

const title = computed(() => {
    return {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[props.status] || 'Error';
});

const description = computed(() => {
    return {
        503: 'Maaf bro, server lagi maintenance sebentar. Balik lagi nanti ya!',
        500: 'Waduh, ada kabel putus di server kita. Tim OneForMind lagi benerin!',
        404: 'Halaman yang lu cari nggak ada bro, mungkin nyasar.',
        403: 'Eits, lu nggak punya akses masuk ke sini!',
    }[props.status] || 'Ada kendala teknis yang nggak terduga.';
});
</script>

<template>
    <Head :title="title" />
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div class="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl max-w-md border border-slate-100 animate-in zoom-in-95 duration-300">
            <div class="text-7xl mb-6">🛠️</div>
            <h1 class="text-3xl font-black text-slate-800 mb-2">{{ title }}</h1>
            <p class="text-slate-500 font-bold mb-8 leading-relaxed">
                {{ description }}
            </p>
            <a href="/dashboard" class="inline-block w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 active:scale-95 transition-all">
                Gaskeun Balik ke Dashboard!
            </a>
        </div>
    </div>
</template>