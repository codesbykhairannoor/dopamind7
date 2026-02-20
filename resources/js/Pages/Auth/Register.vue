<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    timezone: '', 
});

const submit = () => {
    form.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};

// 🔥 FIX ANTI-BAJAK HTMX/INERTIA
const loginWithGoogle = () => {
    window.location.href = '/auth/google';
};
</script>

<template>
    <GuestLayout>
        <Head title="Daftar Akun" />

        <div class="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50/70 rounded-full blur-[100px] -z-10"></div>

            <div class="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10">
                
                <div class="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">
                    🚀
                </div>

                <div class="text-center mb-8">
                    <h2 class="text-3xl font-black text-indigo-950 tracking-tight">{{ $t('auth_register_title') }}</h2>
                    <p class="text-gray-500 mt-2 text-sm">{{ $t('auth_register_subtitle') }}</p>
                </div>

                <form @submit.prevent="submit" class="space-y-5">
                    <div>
                        <InputLabel for="name" :value="$t('auth_label_name')" class="font-bold text-gray-700 ml-1 mb-1" />
                        <TextInput id="name" type="text" class="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3" v-model="form.name" required autofocus :placeholder="$t('auth_placeholder_name')" />
                        <InputError class="mt-2" :message="form.errors.name" />
                    </div>

                    <div>
                        <InputLabel for="email" :value="$t('auth_label_email')" class="font-bold text-gray-700 ml-1 mb-1" />
                        <TextInput id="email" type="email" class="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3" v-model="form.email" required :placeholder="$t('auth_placeholder_email')" />
                        <InputError class="mt-2" :message="form.errors.email" />
                    </div>

                    <div>
                        <InputLabel for="password" :value="$t('auth_label_password')" class="font-bold text-gray-700 ml-1 mb-1" />
                        <TextInput id="password" type="password" class="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3" v-model="form.password" required :placeholder="$t('auth_placeholder_pass')" />
                        <InputError class="mt-2" :message="form.errors.password" />
                    </div>

                    <div>
                        <InputLabel for="password_confirmation" :value="$t('auth_label_pass_confirm')" class="font-bold text-gray-700 ml-1 mb-1" />
                        <TextInput id="password_confirmation" type="password" class="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3" v-model="form.password_confirmation" required />
                        <InputError class="mt-2" :message="form.errors.password_confirmation" />
                    </div>

                    <button class="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 disabled:opacity-75" :disabled="form.processing">
                        {{ $t('auth_btn_register') }}
                    </button>
                </form>

                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
                    <div class="relative flex justify-center text-xs uppercase font-bold text-gray-400"><span class="px-2 bg-white">{{ $t('auth_divider') }}</span></div>
                </div>

                <button 
                   type="button" 
                   @click="loginWithGoogle"
                   class="flex items-center justify-center w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition group">
                    <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span class="font-bold text-gray-700">{{ $t('auth_btn_google_up') }}</span>
                </button>

                <div class="text-center mt-6 text-sm text-gray-500">
                    {{ $t('auth_has_account') }} <Link :href="route('login')" class="text-indigo-600 font-bold hover:underline">{{ $t('auth_link_login') }}</Link>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>