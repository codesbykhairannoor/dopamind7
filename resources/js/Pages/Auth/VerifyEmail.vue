<script setup>
import { computed } from 'vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
    status: {
        type: String,
    },
});

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template>
    <GuestLayout>
        <Head title="Verifikasi Email" />

        <div class="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50/70 rounded-full blur-[100px] -z-10"></div>

            <div class="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10 text-center">
                
                <div class="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
                    📩
                </div>

                <h2 class="text-2xl font-black text-gray-900 mb-3">Cek Inbox Lo!</h2>
                
                <p class="text-gray-500 text-sm leading-relaxed mb-6">
                    Makasih udah daftar! Satu langkah lagi nih. <br>
                    Tolong klik link verifikasi yang baru aja kami kirim ke email lo biar akunnya aktif.
                </p>

                <div v-if="verificationLinkSent" class="mb-6 font-bold text-sm text-green-700 bg-green-50 p-4 rounded-xl border border-green-200">
                    ✨ Link verifikasi baru udah dikirim. Cek inbox atau folder spam ya!
                </div>

                <form @submit.prevent="submit" class="space-y-4">
                    <button 
                        class="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 disabled:opacity-75" 
                        :disabled="form.processing">
                        Kirim Ulang Verifikasi
                    </button>

                    <Link
                        :href="route('logout')"
                        method="post"
                        as="button"
                        class="text-sm text-gray-400 font-bold hover:text-gray-900 transition underline decoration-gray-300 underline-offset-4"
                    >
                        Log Out / Ganti Akun
                    </Link>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>