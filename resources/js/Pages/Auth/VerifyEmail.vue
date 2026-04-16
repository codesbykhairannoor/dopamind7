<script setup>
import { computed } from 'vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';

const props = defineProps({
    status: {
        type: String,
    },
});

const page = usePage();
const userEmail = computed(() => page.props.auth.user?.email || '...');

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template>
    <GuestLayout>
        <Head :title="$t('auth_verify_title', 'Verifikasi Email')" />

        <div class="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50/70 rounded-full blur-[100px] -z-10"></div>

            <div class="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10 text-center">
                
                <div class="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
                    📩
                </div>

                <h2 class="text-2xl font-black text-gray-900 mb-3">{{ $t('auth_verify_header', 'Cek Inbox Lo!') }}</h2>
                
                <p class="text-gray-500 text-sm leading-relaxed mb-2">
                    {{ $t('auth_verify_p1', 'Makasih udah daftar! Satu langkah lagi nih.') }}
                </p>

                <p class="mb-6">
                    <span class="inline-block px-3 py-1 bg-slate-100 text-slate-600 font-bold rounded-full text-xs border border-slate-200">
                        {{ userEmail }}
                    </span>
                </p>

                <p class="text-gray-500 text-sm leading-relaxed mb-6">
                    {{ $t('auth_verify_p2', 'Tolong klik link verifikasi yang baru saja kami kirim ke email di atas biar akunnya aktif.') }}
                </p>

                <div v-if="verificationLinkSent" class="mb-6 font-bold text-sm text-indigo-700 bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                    ✨ {{ $t('auth_verify_resent_success', 'Link verifikasi baru sudah dikirim. Cek inbox atau folder spam ya!') }}
                </div>

                <div v-if="$page.props.flash?.error" class="mb-6 font-bold text-sm text-red-700 bg-red-50 p-4 rounded-xl border border-red-200 animate-shake">
                    ⚠️ {{ $page.props.flash.error }}
                </div>

                <form @submit.prevent="submit" class="space-y-4">
                    <button 
                        class="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                        :disabled="form.processing">
                        <template v-if="form.processing">
                             <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>{{ $t('auth_processing', 'Mengirim...') }}</span>
                        </template>
                        <template v-else>
                            <span>{{ $t('auth_verify_btn_resend', 'Kirim Ulang Verifikasi') }}</span>
                        </template>
                    </button>

                    <Link
                        :href="route('logout')"
                        method="post"
                        as="button"
                        class="text-sm text-gray-400 font-bold hover:text-gray-900 transition underline decoration-gray-300 underline-offset-4"
                    >
                        {{ $t('auth_verify_logout', 'Log Out / Ganti Akun') }}
                    </Link>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>