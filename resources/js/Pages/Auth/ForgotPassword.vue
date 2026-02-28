<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, useForm, Link } from '@inertiajs/vue3';

defineProps({
    status: { type: String },
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <GuestLayout>
        <Head title="Reset Password" />

        <div class="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-50/70 rounded-full blur-[100px] -z-10"></div>

            <div class="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10 text-center">
                
                <div class="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                    🔐
                </div>

                <h2 class="text-2xl font-black text-indigo-950 mb-2">{{ $t('auth_reset_title') }}</h2>
                <p class="text-gray-500 text-sm mb-8 leading-relaxed">
                   {{ $t('auth_reset_desc') }}
                </p>

                <div v-if="status" class="mb-6 font-medium text-sm text-green-700 bg-green-50 p-4 rounded-xl border border-green-100">
                    {{ status }}
                </div>

                <form @submit.prevent="submit" class="text-left space-y-5">
                    <div>
                        <InputLabel for="email" :value="$t('auth_label_email')" class="font-bold text-gray-700 ml-1 mb-1" />
                        <TextInput id="email" type="email" class="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3" v-model="form.email" required autofocus :placeholder="$t('auth_placeholder_email')" />
                        <InputError class="mt-2" :message="form.errors.email" />
                    </div>

                    <button class="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 disabled:opacity-75" :disabled="form.processing">
                        {{ $t('auth_btn_reset') }}
                    </button>
                    
                    <div class="text-center mt-6">
                        <Link :href="route('login')" class="text-sm text-gray-500 font-bold hover:text-gray-900">
                           {{ $t('auth_back_login') }}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>