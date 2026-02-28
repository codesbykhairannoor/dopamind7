<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => form.reset(),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Konfirmasi Password" />

        <div class="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-50/70 rounded-full blur-[100px] -z-10"></div>

            <div class="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10 text-center">
                
                <div class="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">
                    🔒
                </div>

                <h2 class="text-2xl font-black text-indigo-950 mb-2">{{ $t('auth_confirm_title') }}</h2>
                <p class="text-gray-500 text-sm leading-relaxed mb-8">
                    {{ $t('auth_confirm_desc') }}
                </p>

                <form @submit.prevent="submit" class="text-left space-y-5">
                    <div>
                        <InputLabel for="password" :value="$t('auth_label_password')" class="font-bold text-gray-700 ml-1 mb-1" />
                        <TextInput
                            id="password"
                            type="password"
                            class="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 py-3"
                            v-model="form.password"
                            required
                            autocomplete="current-password"
                            autofocus
                            :placeholder="$t('auth_placeholder_pass')"
                        />
                        <InputError class="mt-2" :message="form.errors.password" />
                    </div>

                    <button 
                        class="w-full bg-indigo-950 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-900 transition transform hover:-translate-y-0.5 disabled:opacity-75" 
                        :disabled="form.processing">
                        {{ $t('auth_btn_confirm') }}
                    </button>
                </form>

            </div>
        </div>
    </GuestLayout>
</template>