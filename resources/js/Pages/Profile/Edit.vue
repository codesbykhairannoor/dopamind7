<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head } from '@inertiajs/vue3';

// 🔥 1. Tangkap props hasPassword dari ProfileController
defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
    hasPassword: {
        type: Boolean,
    },
    midtrans_client_key: {
        type: String,
    }
});

import PremiumSubscriptionForm from './Partials/PremiumSubscriptionForm.vue';
</script>

<template>
    <Head title="Profile" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateProfileInformationForm
                        :must-verify-email="mustVerifyEmail"
                        :status="status"
                        class="max-w-xl"
                    />
                </div>

                <div v-if="hasPassword" class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdatePasswordForm class="max-w-xl" />
                </div>
                
                <div v-else class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <section>
                        <header>
                            <h2 class="text-lg font-black text-slate-800 uppercase tracking-widest">
                                {{ $t('password_title', 'Kata Sandi') }}
                            </h2>
                            <p class="mt-1 text-sm text-slate-500 font-medium">
                                {{ $t('google_auth_message', 'Akun ini terhubung menggunakan Google. Anda tidak memerlukan kata sandi untuk masuk ke aplikasi.') }}
                            </p>
                        </header>
                        <div class="mt-6 flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-sm border border-indigo-100">
                            <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
                            </svg>
                            Login via Google Aktif
                        </div>
                    </section>
                </div>

                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <PremiumSubscriptionForm :midtrans-client-key="midtrans_client_key" />
                </div>

                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <DeleteUserForm class="max-w-xl" />
                </div>
                
            </div>
        </div>
    </AuthenticatedLayout>
</template>