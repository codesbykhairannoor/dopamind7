<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head } from '@inertiajs/vue3';

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});
</script>

<template>
    <Head :title="$t('profile_settings', 'Pengaturan Profil')" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-lg shadow-indigo-200 shadow-lg">
                    ⚙️
                </div>
                <h2 class="font-black text-xl text-slate-800 leading-tight tracking-tight">
                    {{ $t('profile_settings', 'Pengaturan Profil') }}
                </h2>
            </div>
        </template>

        <div class="py-12 bg-slate-50/50 min-h-screen">
            <div class="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-8">
                
                <div class="p-6 sm:p-8 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 rounded-[2.5rem] relative overflow-hidden">
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none"></div>
                    <UpdateProfileInformationForm
                        :must-verify-email="mustVerifyEmail"
                        :status="status"
                        class="max-w-2xl relative z-10"
                    />
                </div>

                <div class="p-6 sm:p-8 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 rounded-[2.5rem]">
                    <UpdatePasswordForm class="max-w-2xl" />
                </div>

                <div class="p-6 sm:p-8 bg-rose-50/30 shadow-sm border border-rose-100 rounded-[2.5rem]">
                    <DeleteUserForm class="max-w-2xl" />
                </div>

            </div>
        </div>
    </AuthenticatedLayout>
</template>