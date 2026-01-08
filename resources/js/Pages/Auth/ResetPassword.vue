<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, useForm } from '@inertiajs/vue3';

const props = defineProps({
    email: { type: String, required: true },
    token: { type: String, required: true },
});

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Reset Password" />

        <div class="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-50/70 rounded-full blur-[100px] -z-10"></div>

            <div class="w-full max-w-[450px] bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 relative z-10">
                
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                        ✨
                    </div>
                    <h2 class="text-2xl font-black text-gray-900">Password Baru</h2>
                    <p class="text-gray-500 mt-2 text-sm">Silakan buat password baru yang aman.</p>
                </div>

                <form @submit.prevent="submit" class="space-y-5">
                    <div>
                        <InputLabel for="email" value="Email" class="font-bold text-gray-700 ml-1 mb-1" />
                        <TextInput id="email" type="email" class="mt-1 block w-full rounded-xl bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed py-3" v-model="form.email" required readonly />
                        <InputError class="mt-2" :message="form.errors.email" />
                    </div>

                    <div>
                        <InputLabel for="password" value="Password Baru" class="font-bold text-gray-700 ml-1 mb-1" />
                        <TextInput id="password" type="password" class="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3" v-model="form.password" required autofocus autocomplete="new-password" placeholder="Min. 8 karakter" />
                        <InputError class="mt-2" :message="form.errors.password" />
                    </div>

                    <div>
                        <InputLabel for="password_confirmation" value="Ulangi Password Baru" class="font-bold text-gray-700 ml-1 mb-1" />
                        <TextInput id="password_confirmation" type="password" class="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 py-3" v-model="form.password_confirmation" required autocomplete="new-password" />
                        <InputError class="mt-2" :message="form.errors.password_confirmation" />
                    </div>

                    <button class="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-green-700 transition transform hover:-translate-y-0.5 disabled:opacity-75" :disabled="form.processing">
                        Simpan Password
                    </button>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>